/*
  # Add admin role to profiles

  1. Changes
    - Add is_admin column to profiles table
    - Add policy for admin access
*/

-- Add is_admin column
ALTER TABLE profiles ADD COLUMN is_admin boolean DEFAULT false;

-- Create policy for admin access
CREATE POLICY "Admins can view all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (is_admin = true);

-- Create policy for admin updates
CREATE POLICY "Admins can update all profiles"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (is_admin = true)
  WITH CHECK (is_admin = true);