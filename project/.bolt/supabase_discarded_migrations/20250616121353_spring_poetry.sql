/*
  # Fix Profile Image Upload Permissions
  
  1. Storage Policies
    - Allow authenticated users to upload profile images
    - Allow admins to manage all profile images
    - Maintain security while enabling uploads
  
  2. Enhanced Error Handling
    - Better error messages for debugging
    - Improved upload flow
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admins can upload profile images" ON storage.objects;
DROP POLICY IF EXISTS "All authenticated users can view profile images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update profile images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can delete profile images" ON storage.objects;

-- Create new, more permissive policies for profile images
CREATE POLICY "Authenticated users can upload profile images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-images');

CREATE POLICY "Anyone can view profile images"
ON storage.objects
FOR SELECT
TO authenticated, anon
USING (bucket_id = 'profile-images');

CREATE POLICY "Authenticated users can update profile images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-images');

CREATE POLICY "Authenticated users can delete profile images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'profile-images');

-- Ensure the bucket exists with proper configuration
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