/*
  # Create Event RSVPs Table

  1. New Tables
    - `event_rsvps`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to member_auth)
      - `event_id` (text, event identifier)
      - `status` (text, attendance status)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `event_rsvps` table
    - Add policy for users to manage their own RSVPs
    - Add policy for admins to view all RSVPs

  3. Indexes
    - Add index on user_id for efficient queries
    - Add index on event_id for efficient queries
    - Add unique constraint on user_id + event_id combination
*/

-- Create event_rsvps table
CREATE TABLE IF NOT EXISTS event_rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES member_auth(id) ON DELETE CASCADE,
  event_id text NOT NULL,
  status text NOT NULL CHECK (status IN ('attending', 'not-attending')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, event_id)
);

-- Enable RLS
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;

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

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_event_rsvps_updated_at
  BEFORE UPDATE ON event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();