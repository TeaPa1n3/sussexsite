/*
  # Fix Event RSVP Table Constraints and Add New Columns

  1. New Columns
    - `allergies` (text) - Attendee allergies and medical conditions
    - `dietary_requirements` (text) - Attendee dietary requirements

  2. Updated Constraints
    - Update camping_type constraint to include 'not-camping'
    - Update attendance fields constraint to include new required fields
    - Handle existing data that doesn't meet new constraints

  3. Data Migration
    - Set default values for existing attending RSVPs
    - Ensure all existing data meets new constraints before applying them

  4. Indexes
    - Add indexes for new columns for better performance
*/

-- Add new columns for allergies and dietary requirements
ALTER TABLE event_rsvps 
ADD COLUMN IF NOT EXISTS allergies text,
ADD COLUMN IF NOT EXISTS dietary_requirements text;

-- Update existing attending RSVPs to have default values for new required fields
-- This prevents constraint violations when we add the new constraint
UPDATE event_rsvps 
SET 
  allergies = COALESCE(allergies, 'None'),
  dietary_requirements = COALESCE(dietary_requirements, 'None')
WHERE status = 'attending' AND (allergies IS NULL OR dietary_requirements IS NULL);

-- Drop the existing camping_type constraint
ALTER TABLE event_rsvps DROP CONSTRAINT IF EXISTS event_rsvps_camping_type_check;

-- Add updated camping_type constraint to include 'not-camping'
ALTER TABLE event_rsvps 
ADD CONSTRAINT event_rsvps_camping_type_check 
CHECK (camping_type IN ('authentic', 'plastic', 'not-camping'));

-- Drop the existing attendance fields constraint
ALTER TABLE event_rsvps DROP CONSTRAINT IF EXISTS event_rsvps_attendance_fields_check;

-- Add updated constraint to include new required fields for attending RSVPs
-- Allow empty strings for allergies and dietary requirements if they contain 'None'
ALTER TABLE event_rsvps 
ADD CONSTRAINT event_rsvps_attendance_fields_check 
CHECK (
  status = 'not-attending' OR 
  (status = 'attending' AND 
   name IS NOT NULL AND name != '' AND
   vehicle_registration IS NOT NULL AND vehicle_registration != '' AND
   camping_type IS NOT NULL AND
   insurance_confirmed = true AND
   allergies IS NOT NULL AND allergies != '' AND
   dietary_requirements IS NOT NULL AND dietary_requirements != '')
);

-- Create indexes for the new columns for better query performance
CREATE INDEX IF NOT EXISTS event_rsvps_allergies_idx ON event_rsvps (allergies);
CREATE INDEX IF NOT EXISTS event_rsvps_dietary_requirements_idx ON event_rsvps (dietary_requirements);

-- Update table comments to reflect the new structure
COMMENT ON COLUMN event_rsvps.allergies IS 'Attendee allergies and medical conditions from attendance form';
COMMENT ON COLUMN event_rsvps.dietary_requirements IS 'Attendee dietary requirements from attendance form';
COMMENT ON COLUMN event_rsvps.camping_type IS 'Camping preference: authentic (period-appropriate), plastic (modern equipment), or not-camping (not staying overnight)';