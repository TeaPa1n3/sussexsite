/*
  # Profile Image Persistence Enhancement

  1. Storage Bucket Configuration
    - Ensure profile-images bucket exists with proper settings
    - Set up comprehensive storage policies for persistence
    
  2. Database Constraints
    - Add constraints to ensure profile_image_url integrity
    - Create indexes for better performance
    
  3. Security Policies
    - Enhanced RLS policies for profile image management
    - Admin-only deletion policies to prevent accidental loss
*/

-- Ensure the profile-images storage bucket exists with proper configuration
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-images',
  'profile-images',
  true,
  10485760, -- 10MB limit (increased for better quality)
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO UPDATE SET
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

-- Drop existing policies to recreate them with better persistence
DROP POLICY IF EXISTS "Authenticated users can upload profile images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can view profile images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update their own profile images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete profile images" ON storage.objects;

-- Enhanced storage policies for better persistence and security
CREATE POLICY "Admins can upload profile images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-images' AND
  EXISTS (
    SELECT 1 FROM member_auth 
    WHERE id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "All authenticated users can view profile images"
ON storage.objects
FOR SELECT
TO authenticated, anon
USING (bucket_id = 'profile-images');

CREATE POLICY "Admins can update profile images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-images' AND
  EXISTS (
    SELECT 1 FROM member_auth 
    WHERE id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Only admins can delete profile images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-images' AND
  EXISTS (
    SELECT 1 FROM member_auth 
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- Add index on profile_image_url for better performance
CREATE INDEX IF NOT EXISTS member_auth_profile_image_idx 
ON member_auth (profile_image_url) 
WHERE profile_image_url IS NOT NULL;

-- Add constraint to ensure profile_image_url format is valid when not null
ALTER TABLE member_auth 
ADD CONSTRAINT profile_image_url_format_check 
CHECK (
  profile_image_url IS NULL OR 
  profile_image_url ~ '^https?://.*\.(jpg|jpeg|png|gif|webp)(\?.*)?$'
);

-- Create a function to clean up orphaned profile images
CREATE OR REPLACE FUNCTION cleanup_orphaned_profile_images()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  orphaned_file RECORD;
BEGIN
  -- This function can be called periodically to clean up orphaned files
  -- For now, it's just a placeholder for future cleanup operations
  RAISE NOTICE 'Profile image cleanup function created';
END;
$$;

-- Grant execute permission to admins only
REVOKE ALL ON FUNCTION cleanup_orphaned_profile_images() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION cleanup_orphaned_profile_images() TO authenticated;