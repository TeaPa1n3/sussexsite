/*
  # Add Individual Attendance Form Columns

  1. New Columns
    - `name` (text) - Attendee's full name
    - `vehicle_registration` (text) - Vehicle registration number
    - `camping_type` (text) - Either 'authentic' or 'plastic'
    - `insurance_confirmed` (boolean) - Insurance confirmation status

  2. Data Migration
    - Extract existing data from attendance_data JSONB column
    - Populate new individual columns
    - Keep attendance_data for backward compatibility

  3. Constraints
    - Add check constraint for camping_type values
    - Update attendance data validation constraint
*/

-- Add individual columns for attendance form data
ALTER TABLE event_rsvps 
ADD COLUMN IF NOT EXISTS name text,
ADD COLUMN IF NOT EXISTS vehicle_registration text,
ADD COLUMN IF NOT EXISTS camping_type text CHECK (camping_type IN ('authentic', 'plastic')),
ADD COLUMN IF NOT EXISTS insurance_confirmed boolean DEFAULT false;

-- Migrate existing data from attendance_data JSONB to individual columns
UPDATE event_rsvps 
SET 
  name = attendance_data->>'name',
  vehicle_registration = attendance_data->>'vehicleRegistration',
  camping_type = attendance_data->>'campingType',
  insurance_confirmed = (attendance_data->>'insuranceConfirmed')::boolean
WHERE attendance_data IS NOT NULL;

-- Drop the old attendance_data constraint
ALTER TABLE event_rsvps DROP CONSTRAINT IF EXISTS event_rsvps_attendance_data_check;

-- Add new constraint to ensure attending RSVPs have required individual fields
ALTER TABLE event_rsvps 
ADD CONSTRAINT event_rsvps_attendance_fields_check 
CHECK (
  status = 'not-attending' OR 
  (status = 'attending' AND 
   name IS NOT NULL AND name != '' AND
   vehicle_registration IS NOT NULL AND vehicle_registration != '' AND
   camping_type IS NOT NULL AND
   insurance_confirmed = true)
);

-- Create indexes for the new columns for better query performance
CREATE INDEX IF NOT EXISTS event_rsvps_name_idx ON event_rsvps (name);
CREATE INDEX IF NOT EXISTS event_rsvps_camping_type_idx ON event_rsvps (camping_type);
CREATE INDEX IF NOT EXISTS event_rsvps_insurance_confirmed_idx ON event_rsvps (insurance_confirmed);

-- Update the table comment to reflect the new structure
COMMENT ON TABLE event_rsvps IS 'Event RSVPs with individual attendance form fields and legacy JSONB support';
COMMENT ON COLUMN event_rsvps.name IS 'Attendee full name from attendance form';
COMMENT ON COLUMN event_rsvps.vehicle_registration IS 'Vehicle registration number from attendance form';
COMMENT ON COLUMN event_rsvps.camping_type IS 'Camping preference: authentic (period-appropriate) or plastic (modern equipment)';
COMMENT ON COLUMN event_rsvps.insurance_confirmed IS 'Confirmation that attendee insurance is active';