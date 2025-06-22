/*
  # Fix Profile Image Upload Issues

  1. Storage Configuration
    - Ensure profile-images bucket exists with proper settings
    - Set up clean storage policies for admin management

  2. Functions
    - Drop and recreate functions to avoid conflicts
    - Create reliable admin check functions
    - Add profile image update function

  3. Security
    - Admin-only upload/update/delete permissions
    - Public read access for images
    - Proper constraint validation
*/

-- Ensure the profile-images bucket exists with optimal configuration
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-images',
  'profile-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

-- Drop all existing storage policies to start fresh
DROP POLICY IF EXISTS "Admin upload profile images" ON storage.objects;
DROP POLICY IF EXISTS "Public read profile images" ON storage.objects;
DROP POLICY IF EXISTS "Admin update profile images" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete profile images" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload division images" ON storage.objects;
DROP POLICY IF EXISTS "Admin update division images" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete division images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can manage all images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view all images" ON storage.objects;

-- Create simple, reliable storage policies
CREATE POLICY "Admins can manage all images"
ON storage.objects
FOR ALL
TO authenticated
USING (
  bucket_id = 'profile-images' AND
  EXISTS (
    SELECT 1 FROM member_auth 
    WHERE id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Public can view all images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'profile-images');

-- Drop existing functions to avoid conflicts
DROP FUNCTION IF EXISTS check_admin_simple();
DROP FUNCTION IF EXISTS debug_admin_status();
DROP FUNCTION IF EXISTS update_profile_image(uuid, text);

-- Create a simple admin check function that won't hang
CREATE OR REPLACE FUNCTION check_admin_simple()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM member_auth WHERE id = auth.uid()),
    false
  );
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION check_admin_simple() TO authenticated;

-- Update the debug function to be more reliable
CREATE OR REPLACE FUNCTION debug_admin_status()
RETURNS TABLE (
  current_user_id uuid,
  is_admin boolean,
  user_exists boolean,
  auth_uid uuid
)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT 
    auth.uid() as current_user_id,
    COALESCE(m.is_admin, false) as is_admin,
    (m.id IS NOT NULL) as user_exists,
    auth.uid() as auth_uid
  FROM member_auth m
  RIGHT JOIN (SELECT auth.uid() as uid) auth_data ON m.id = auth_data.uid;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION debug_admin_status() TO authenticated;

-- Create a function to handle profile image updates safely
CREATE OR REPLACE FUNCTION update_profile_image(
  target_user_id uuid,
  new_image_url text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  is_admin_user boolean;
BEGIN
  -- Check if current user is admin
  SELECT is_admin INTO is_admin_user
  FROM member_auth 
  WHERE id = auth.uid();
  
  IF NOT COALESCE(is_admin_user, false) THEN
    RAISE EXCEPTION 'Only admins can update profile images';
  END IF;
  
  -- Update the profile image
  UPDATE member_auth 
  SET 
    profile_image_url = new_image_url,
    updated_at = now()
  WHERE id = target_user_id;
  
  RETURN true;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION update_profile_image(uuid, text) TO authenticated;

-- Ensure the member_auth table has proper constraints
ALTER TABLE member_auth 
DROP CONSTRAINT IF EXISTS profile_image_url_format_check;

-- Add a more lenient constraint for profile image URLs
ALTER TABLE member_auth 
ADD CONSTRAINT profile_image_url_format_check 
CHECK (
  profile_image_url IS NULL OR 
  profile_image_url ~ '^https?://.*'
);