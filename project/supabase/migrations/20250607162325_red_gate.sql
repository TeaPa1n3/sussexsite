/*
  # Update Event RSVPs Table for Attendance Form

  1. Schema Updates
    - Ensure attendance_data jsonb column exists and is properly structured
    - Add indexes for better query performance
    - Update comments for documentation

  2. Data Structure
    - attendance_data will store: name, vehicleRegistration, campingType, insuranceConfirmed
    - Maintains flexibility for future form field additions
*/

-- Ensure the event_rsvps table exists with all required columns
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

-- Ensure attendance_data column exists
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

-- Drop and recreate policies to ensure they're correct
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS event_rsvps_user_id_idx ON event_rsvps (user_id);
CREATE INDEX IF NOT EXISTS event_rsvps_event_id_idx ON event_rsvps (event_id);
CREATE INDEX IF NOT EXISTS event_rsvps_status_idx ON event_rsvps (status);
CREATE UNIQUE INDEX IF NOT EXISTS event_rsvps_user_id_event_id_key ON event_rsvps (user_id, event_id);

-- Create GIN index for JSONB attendance_data for efficient querying
CREATE INDEX IF NOT EXISTS event_rsvps_attendance_data_gin_idx ON event_rsvps USING GIN (attendance_data);

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

-- Update comment to document the attendance_data structure
COMMENT ON COLUMN event_rsvps.attendance_data IS 'JSON data containing attendance form fields: name (string), vehicleRegistration (string), campingType ("authentic"|"plastic"), insuranceConfirmed (boolean)';

-- Add a check constraint to ensure attendance_data has required fields when status is 'attending'
-- This is optional but helps maintain data integrity
DO $$
BEGIN
  -- Drop constraint if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'event_rsvps_attendance_data_check' 
    AND table_name = 'event_rsvps'
  ) THEN
    ALTER TABLE event_rsvps DROP CONSTRAINT event_rsvps_attendance_data_check;
  END IF;

  -- Add constraint to ensure attending RSVPs have attendance data
  ALTER TABLE event_rsvps 
  ADD CONSTRAINT event_rsvps_attendance_data_check 
  CHECK (
    status = 'not-attending' OR 
    (status = 'attending' AND attendance_data IS NOT NULL AND 
     attendance_data ? 'name' AND 
     attendance_data ? 'vehicleRegistration' AND 
     attendance_data ? 'campingType' AND 
     attendance_data ? 'insuranceConfirmed')
  );
END $$;