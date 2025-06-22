/*
  # Add Members Area Permission System

  1. New Column
    - `can_view_members_area` (boolean, default false) - Controls access to members area content
  
  2. Performance
    - Index on permission column for faster queries
    
  3. Admin Access
    - Existing admins automatically get members area access
*/

-- Add the can_view_members_area column to member_auth table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_auth' AND column_name = 'can_view_members_area'
  ) THEN
    ALTER TABLE member_auth ADD COLUMN can_view_members_area boolean DEFAULT false;
  END IF;
END $$;

-- Create index for better performance on permission checks
CREATE INDEX IF NOT EXISTS member_auth_can_view_members_area_idx 
ON member_auth (can_view_members_area) 
WHERE can_view_members_area = true;

-- Update existing admin users to have members area access
UPDATE member_auth 
SET can_view_members_area = true 
WHERE is_admin = true;