/*
  # Add profile image support to member_auth table

  1. New Columns
    - `profile_image_url` (text) - URL to the user's profile image

  2. Security
    - No additional RLS policies needed as existing policies cover this column
*/

-- Add profile image URL column to member_auth table
ALTER TABLE member_auth 
ADD COLUMN IF NOT EXISTS profile_image_url text;

-- Add comment to document the column
COMMENT ON COLUMN member_auth.profile_image_url IS 'URL to the user profile image stored in Supabase Storage';

-- Create index for efficient queries (optional, but good for performance)
CREATE INDEX IF NOT EXISTS member_auth_profile_image_idx ON member_auth (profile_image_url) WHERE profile_image_url IS NOT NULL;