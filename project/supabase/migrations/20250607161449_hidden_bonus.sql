/*
  # Add attendance data column to event_rsvps

  1. Changes
    - Add attendance_data column to store form submission data
    - Column stores JSON data with name, vehicle registration, camping type, and insurance confirmation

  2. Security
    - No changes to existing RLS policies needed
    - Data is protected by existing user-based policies
*/

-- Add attendance_data column to store form submission data
ALTER TABLE event_rsvps 
ADD COLUMN IF NOT EXISTS attendance_data jsonb;

-- Add comment to document the structure
COMMENT ON COLUMN event_rsvps.attendance_data IS 'JSON data containing: name, vehicleRegistration, campingType, insuranceConfirmed';