/*
  # Create Division Images Table

  1. New Tables
    - `division_images`
      - `division` (text, primary key) - Division name
      - `image_url` (text) - URL to the division image in storage
      - `created_at` (timestamp) - When the image was first added
      - `updated_at` (timestamp) - When the image was last updated

  2. Security
    - Enable RLS on division_images table
    - Add policy for admin access to manage images
    - Add policy for all users to view images
*/

-- Create division_images table
CREATE TABLE IF NOT EXISTS division_images (
  division text PRIMARY KEY,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE division_images ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage division images"
  ON division_images
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_auth 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "All users can view division images"
  ON division_images
  FOR SELECT
  TO authenticated
  USING (true);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_division_images_updated_at ON division_images;
CREATE TRIGGER update_division_images_updated_at
  BEFORE UPDATE ON division_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create storage folder for division images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'division-images',
  'division-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for division images
CREATE POLICY "Admins can upload division images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'division-images' AND
  EXISTS (
    SELECT 1 FROM member_auth 
    WHERE id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "All users can view division images"
ON storage.objects
FOR SELECT
TO authenticated, anon
USING (bucket_id = 'division-images');

CREATE POLICY "Admins can update division images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'division-images' AND
  EXISTS (
    SELECT 1 FROM member_auth 
    WHERE id = auth.uid() AND is_admin = true
  )
);

CREATE POLICY "Admins can delete division images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'division-images' AND
  EXISTS (
    SELECT 1 FROM member_auth 
    WHERE id = auth.uid() AND is_admin = true
  )
);