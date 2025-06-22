/*
  # Fix Event RSVP Table Constraints and Add New Columns

  1. Schema Updates
    - Update camping_type constraint to include 'not-camping' option
    - Add allergies column for member allergy information
    - Add dietary_requirements column for member dietary needs
    - Update attendance validation constraint

  2. Data Migration
    - Safely update existing constraints
    - Add new columns with proper defaults

  3. Indexes
    - Add indexes for new columns for better performance
*/

-- Add new columns for allergies and dietary requirements
ALTER TABLE event_rsvps 
ADD COLUMN IF NOT EXISTS allergies text,
ADD COLUMN IF NOT EXISTS dietary_requirements text;

-- Drop the existing camping_type constraint
ALTER TABLE event_rsvps DROP CONSTRAINT IF EXISTS event_rsvps_camping_type_check;

-- Add updated camping_type constraint to include 'not-camping'
ALTER TABLE event_rsvps 
ADD CONSTRAINT event_rsvps_camping_type_check 
CHECK (camping_type IN ('authentic', 'plastic', 'not-camping'));

-- Drop the existing attendance fields constraint
ALTER TABLE event_rsvps DROP CONSTRAINT IF EXISTS event_rsvps_attendance_fields_check;

-- Add updated constraint to include new required fields for attending RSVPs
ALTER TABLE event_rsvps 
ADD CONSTRAINT event_rsvps_attendance_fields_check 
CHECK (
  status = 'not-attending' OR 
  (status = 'attending' AND 
   name IS NOT NULL AND name != '' AND
   vehicle_registration IS NOT NULL AND vehicle_registration != '' AND
   camping_type IS NOT NULL AND
   insurance_confirmed = true AND
   allergies IS NOT NULL AND
   dietary_requirements IS NOT NULL)
);

-- Create indexes for the new columns for better query performance
CREATE INDEX IF NOT EXISTS event_rsvps_allergies_idx ON event_rsvps (allergies);
CREATE INDEX IF NOT EXISTS event_rsvps_dietary_requirements_idx ON event_rsvps (dietary_requirements);

-- Update table comments to reflect the new structure
COMMENT ON COLUMN event_rsvps.allergies IS 'Attendee allergies and medical conditions from attendance form';
COMMENT ON COLUMN event_rsvps.dietary_requirements IS 'Attendee dietary requirements from attendance form';
COMMENT ON COLUMN event_rsvps.camping_type IS 'Camping preference: authentic (period-appropriate), plastic (modern equipment), or not-camping (not staying overnight)';