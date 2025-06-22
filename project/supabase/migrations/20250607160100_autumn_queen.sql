/*
  # Fix infinite recursion in member_auth RLS policy

  1. Security Policy Fix
    - Remove the problematic admin policy that causes infinite recursion
    - Simplify the policy structure to prevent circular dependencies
    - Ensure users can only access their own data
    - Admins will need to use service role for admin operations

  2. Changes
    - Drop the existing "Admins can read all auth data" policy
    - Keep the simple user-specific policies that work correctly
*/

-- Drop the problematic admin policy that causes infinite recursion
DROP POLICY IF EXISTS "Admins can read all auth data" ON member_auth;

-- The remaining policies should work correctly:
-- - "Enable users to view their own data only" with qual "(uid() = id)"
-- - "Allow public registration" 
-- - "Users can update their own auth data"

-- Note: For admin operations, use the service role key instead of relying on RLS policies
-- This prevents the infinite recursion issue while maintaining security