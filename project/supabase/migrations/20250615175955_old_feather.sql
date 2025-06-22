/*
  # Fix Email Notifications Table

  1. Changes
    - Fix foreign key reference to use member_auth instead of auth.users
    - Update policies to work with custom auth system
    - Ensure proper indexing and constraints

  2. Security
    - Enable RLS on email_notifications table
    - Add policy for admins to view email logs
*/

-- Drop existing table if it exists to recreate with correct references
DROP TABLE IF EXISTS email_notifications;

-- Create email_notifications table with correct foreign key reference
CREATE TABLE email_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES member_auth(id) ON DELETE CASCADE,
  email_type text NOT NULL,
  recipient_email text NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  sent_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;

-- Create policies - only admins can view email logs
CREATE POLICY "Admins can view all email notifications"
  ON email_notifications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_auth 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Create indexes for better performance
CREATE INDEX email_notifications_user_id_idx ON email_notifications (user_id);
CREATE INDEX email_notifications_email_type_idx ON email_notifications (email_type);
CREATE INDEX email_notifications_status_idx ON email_notifications (status);
CREATE INDEX email_notifications_sent_at_idx ON email_notifications (sent_at);
CREATE INDEX email_notifications_created_at_idx ON email_notifications (created_at);

-- Add comment to document the table
COMMENT ON TABLE email_notifications IS 'Tracks all email notifications sent through the system for auditing and monitoring';