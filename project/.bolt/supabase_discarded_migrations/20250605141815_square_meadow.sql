-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  membership_number text UNIQUE,
  membership_status text DEFAULT 'Pending',
  join_date date DEFAULT CURRENT_DATE,
  division text,
  address text,
  postcode text,
  phone text,
  emergency_contact_name text,
  emergency_contact_address text,
  emergency_contact_email text,
  emergency_contact_phone text,
  date_of_birth date,
  medical_conditions text,
  allergies text,
  dietary_requirements text,
  criminal_offenses text,
  data_consent boolean DEFAULT false,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create member registrations table
CREATE TABLE IF NOT EXISTS member_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  signature text NOT NULL,
  signature_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Enable insert access for all users"
  ON profiles
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable select for users based on user_id"
  ON profiles
  FOR SELECT
  TO public
  USING (auth.uid() = id);

-- Create policies for member registrations
CREATE POLICY "Enable insert access for all users"
  ON member_registrations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable select for users based on profile_id"
  ON member_registrations
  FOR SELECT
  TO public
  USING (auth.uid() = profile_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();