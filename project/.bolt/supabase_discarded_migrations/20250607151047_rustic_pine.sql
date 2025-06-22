/*
  # Update member_auth table to remove password_hash

  1. Changes
    - Remove password_hash column from member_auth table (Supabase Auth handles passwords)
    - Update existing policies if needed
    - Ensure all necessary indexes and triggers exist

  2. Security
    - Maintains existing RLS policies
    - Ensures proper access control
*/

-- Remove password_hash column if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'member_auth' AND column_name = 'password_hash'
  ) THEN
    ALTER TABLE member_auth DROP COLUMN password_hash;
  END IF;
END $$;

-- Ensure the table exists with correct structure (in case it doesn't exist yet)
CREATE TABLE IF NOT EXISTS member_auth (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Enable Row Level Security (safe to run multiple times)
ALTER TABLE member_auth ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies to ensure they're correct
DROP POLICY IF EXISTS "Enable users to view their own data only" ON member_auth;
DROP POLICY IF EXISTS "Users can read own data" ON member_auth;
DROP POLICY IF EXISTS "Admins can read all auth data" ON member_auth;
DROP POLICY IF EXISTS "Users can update their own auth data" ON member_auth;
DROP POLICY IF EXISTS "Allow public registration" ON member_auth;

-- Create policies with correct names and logic
CREATE POLICY "Enable users to view their own data only"
  ON member_auth
  FOR SELECT
  TO authenticated
  USING (( SELECT uid() AS uid) = id);

CREATE POLICY "Admins can read all auth data"
  ON member_auth
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_auth member_auth_1
      WHERE ((member_auth_1.id)::text = (uid())::text) 
      AND (member_auth_1.is_admin = true)
    )
  );

CREATE POLICY "Users can update their own auth data"
  ON member_auth
  FOR UPDATE
  TO authenticated
  USING ((uid())::text = (id)::text)
  WITH CHECK ((uid())::text = (id)::text);

CREATE POLICY "Allow public registration"
  ON member_auth
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create indexes (safe to run multiple times with IF NOT EXISTS)
CREATE UNIQUE INDEX IF NOT EXISTS member_auth_email_idx ON member_auth(email);
CREATE INDEX IF NOT EXISTS member_auth_created_at_idx ON member_auth(created_at);
CREATE INDEX IF NOT EXISTS member_auth_is_admin_idx ON member_auth(is_admin);

-- Ensure updated_at trigger function exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at (drop first to avoid conflicts)
DROP TRIGGER IF EXISTS update_member_auth_updated_at ON member_auth;
CREATE TRIGGER update_member_auth_updated_at
  BEFORE UPDATE ON member_auth
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();