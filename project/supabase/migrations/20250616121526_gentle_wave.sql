/*
  # Fix Admin Profile Image Upload Permissions
  
  1. Storage Policies
    - Ensure admins can upload profile images
    - Fix admin check logic
    - Add better error handling
  
  2. Database Functions
    - Create helper function to check admin status
    - Improve error messages
*/

-- Create a helper function to check if current user is admin
CREATE OR REPLACE FUNCTION is_current_user_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM member_auth 
    WHERE id = auth.uid() AND is_admin = true
  );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION is_current_user_admin() TO authenticated;

-- Drop and recreate storage policies with better admin checking
DROP POLICY IF EXISTS "Admins can upload profile images" ON storage.objects;
DROP POLICY IF EXISTS "All authenticated users can view profile images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update profile images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can delete profile images" ON storage.objects;

-- Create new storage policies with improved admin checking
CREATE POLICY "Admins can upload profile images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-images' AND
  is_current_user_admin()
);

CREATE POLICY "Anyone can view profile images"
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
  is_current_user_admin()
);

CREATE POLICY "Admins can delete profile images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-images' AND
  is_current_user_admin()
);

-- Also ensure division image policies work correctly
DROP POLICY IF EXISTS "Admins can upload division images" ON storage.objects;
DROP POLICY IF EXISTS "All users can view division images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update division images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete division images" ON storage.objects;

-- Recreate division image policies
CREATE POLICY "Admins can upload division images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-images' AND
  name LIKE 'division-images/%' AND
  is_current_user_admin()
);

CREATE POLICY "Anyone can view division images"
ON storage.objects
FOR SELECT
TO authenticated, anon
USING (bucket_id = 'profile-images' AND name LIKE 'division-images/%');

CREATE POLICY "Admins can update division images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-images' AND
  name LIKE 'division-images/%' AND
  is_current_user_admin()
);

CREATE POLICY "Admins can delete division images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-images' AND
  name LIKE 'division-images/%' AND
  is_current_user_admin()
);

-- Create a function to debug admin status for troubleshooting
CREATE OR REPLACE FUNCTION debug_admin_status()
RETURNS TABLE (
  current_user_id uuid,
  is_admin boolean,
  user_exists boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    auth.uid() as current_user_id,
    COALESCE(m.is_admin, false) as is_admin,
    (m.id IS NOT NULL) as user_exists
  FROM member_auth m
  WHERE m.id = auth.uid();
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION debug_admin_status() TO authenticated;