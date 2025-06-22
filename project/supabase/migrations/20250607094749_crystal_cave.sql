/*
  # Create member authentication table

  1. New Tables
    - `member_auth`
      - `id` (uuid, primary key)
      - `name` (text, not null) - Member's full name
      - `email` (text, unique, not null) - Login email
      - `password_hash` (text, not null) - Hashed password
      - `is_admin` (boolean, default false) - Admin privileges
      - `created_at` (timestamp with time zone, default now())
      - `updated_at` (timestamp with time zone, default now())
      - `last_login` (timestamp with time zone, nullable)

  2. Security
    - Enable RLS on `member_auth` table
    - Add policy for users to read their own data
    - Add policy for admins to read all data
    - Add policy for users to update their own data
    - Add policy for public registration (insert)

  3. Indexes
    - Unique index on email for fast lookups
    - Index on created_at for sorting

  4. Functions
    - Update trigger for updated_at timestamp
*/

-- Create the member_auth table
CREATE TABLE IF NOT EXISTS member_auth (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Enable Row Level Security
ALTER TABLE member_auth ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read their own auth data"
  ON member_auth
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can read all auth data"
  ON member_auth
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_auth 
      WHERE id::text = auth.uid()::text 
      AND is_admin = true
    )
  );

CREATE POLICY "Users can update their own auth data"
  ON member_auth
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

CREATE POLICY "Allow public registration"
  ON member_auth
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create indexes
CREATE UNIQUE INDEX IF NOT EXISTS member_auth_email_idx ON member_auth(email);
CREATE INDEX IF NOT EXISTS member_auth_created_at_idx ON member_auth(created_at);
CREATE INDEX IF NOT EXISTS member_auth_is_admin_idx ON member_auth(is_admin);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_member_auth_updated_at ON member_auth;
CREATE TRIGGER update_member_auth_updated_at
  BEFORE UPDATE ON member_auth
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password should be hashed in production)
INSERT INTO member_auth (id, name, email, password_hash, is_admin)
VALUES (
  gen_random_uuid(),
  'Administrator',
  'SMS2021',
  'Snooty', -- In production, this should be properly hashed
  true
) ON CONFLICT (email) DO NOTHING;