/*
  # Fix Event RSVPs Table

  1. Tables
    - Ensure event_rsvps table exists with all required columns
    - Add attendance_data column for form data storage
    
  2. Security
    - Enable RLS on event_rsvps table
    - Add policies for user access and admin access
    
  3. Indexes
    - Add indexes for efficient queries
*/

-- Create event_rsvps table if it doesn't exist
CREATE TABLE IF NOT EXISTS event_rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES member_auth(id) ON DELETE CASCADE,
  event_id text NOT NULL,
  status text NOT NULL CHECK (status IN ('attending', 'not-attending')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  attendance_data jsonb,
  UNIQUE(user_id, event_id)
);

-- Add attendance_data column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'event_rsvps' AND column_name = 'attendance_data'
  ) THEN
    ALTER TABLE event_rsvps ADD COLUMN attendance_data jsonb;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Users can manage their own RSVPs" ON event_rsvps;
DROP POLICY IF EXISTS "Admins can view all RSVPs" ON event_rsvps;

-- Create policies
CREATE POLICY "Users can manage their own RSVPs"
  ON event_rsvps
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all RSVPs"
  ON event_rsvps
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_auth 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS event_rsvps_user_id_idx ON event_rsvps (user_id);
CREATE INDEX IF NOT EXISTS event_rsvps_event_id_idx ON event_rsvps (event_id);
CREATE INDEX IF NOT EXISTS event_rsvps_status_idx ON event_rsvps (status);
CREATE UNIQUE INDEX IF NOT EXISTS event_rsvps_user_id_event_id_key ON event_rsvps (user_id, event_id);

-- Create or replace the updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_event_rsvps_updated_at ON event_rsvps;
CREATE TRIGGER update_event_rsvps_updated_at
  BEFORE UPDATE ON event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comment to document the attendance_data structure
COMMENT ON COLUMN event_rsvps.attendance_data IS 'JSON data containing: name, vehicleRegistration, campingType, insuranceConfirmed';