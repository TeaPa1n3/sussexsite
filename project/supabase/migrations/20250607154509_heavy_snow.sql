/*
  # Add comprehensive registration fields to member_auth table

  1. New Columns
    - `date_of_birth` (date)
    - `address` (text)
    - `postcode` (text)
    - `phone` (text)
    - `emergency_contact_name` (text)
    - `emergency_contact_phone` (text)
    - `group_division` (text with check constraint)
    - `allergies` (text)
    - `dietary_requirements` (text)
    - `criminal_convictions` (text)
    - `declaration_agreed` (boolean)
    - `declaration_date` (timestamp)

  2. Constraints
    - Check constraint for group_division values
    - Not null constraint for declaration_agreed
*/

-- Add new columns to member_auth table
ALTER TABLE member_auth 
ADD COLUMN IF NOT EXISTS date_of_birth date,
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS postcode text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS emergency_contact_name text,
ADD COLUMN IF NOT EXISTS emergency_contact_phone text,
ADD COLUMN IF NOT EXISTS group_division text,
ADD COLUMN IF NOT EXISTS allergies text,
ADD COLUMN IF NOT EXISTS dietary_requirements text,
ADD COLUMN IF NOT EXISTS criminal_convictions text,
ADD COLUMN IF NOT EXISTS declaration_agreed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS declaration_date timestamptz;

-- Add check constraint for group_division
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'member_auth_group_division_check' 
    AND table_name = 'member_auth'
  ) THEN
    ALTER TABLE member_auth 
    ADD CONSTRAINT member_auth_group_division_check 
    CHECK (group_division IN ('Lewes', 'Derby', 'Portsmouth', 'Routier'));
  END IF;
END $$;

-- Add index for group_division for efficient queries
CREATE INDEX IF NOT EXISTS member_auth_group_division_idx ON member_auth (group_division);