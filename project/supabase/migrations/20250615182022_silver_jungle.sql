/*
  # Remove Email Features

  1. Drop Tables
    - Drop email_notifications table completely
    
  2. Clean up
    - Remove all email-related functionality
*/

-- Drop the email_notifications table and all its dependencies
DROP TABLE IF EXISTS email_notifications CASCADE;