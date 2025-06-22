/*
  # Create Email Notifications Table

  1. New Tables
    - `email_notifications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `email_type` (text) - Type of email (welcome, reminder, etc.)
      - `recipient_email` (text) - Email address
      - `subject` (text) - Email subject
      - `content` (text) - Email content
      - `status` (text) - sent, failed, pending
      - `sent_at` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on email_notifications table
    - Add policies for admin access only

  3. Indexes
    - Add indexes for efficient queries
*/

-- Create email_notifications table
CREATE TABLE IF NOT EXISTS email_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
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

-- Create indexes
CREATE INDEX IF NOT EXISTS email_notifications_user_id_idx ON email_notifications (user_id);
CREATE INDEX IF NOT EXISTS email_notifications_email_type_idx ON email_notifications (email_type);
CREATE INDEX IF NOT EXISTS email_notifications_status_idx ON email_notifications (status);
CREATE INDEX IF NOT EXISTS email_notifications_sent_at_idx ON email_notifications (sent_at);
CREATE INDEX IF NOT EXISTS email_notifications_created_at_idx ON email_notifications (created_at);

-- Add comment to document the table
COMMENT ON TABLE email_notifications IS 'Tracks all email notifications sent through the system for auditing and monitoring';