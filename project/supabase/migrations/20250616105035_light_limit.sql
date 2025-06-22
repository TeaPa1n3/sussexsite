/*
  # Fix Admin Panel Access to All Members

  1. New Functions
    - `get_all_members_for_admin()` - Function that bypasses RLS for admin users
    - Allows admins to view all registered members

  2. Security
    - Function checks if current user is admin before returning data
    - Maintains security while allowing proper admin functionality
*/

-- Create function to get all members for admin users
CREATE OR REPLACE FUNCTION get_all_members_for_admin()
RETURNS TABLE (
  id uuid,
  name text,
  email text,
  is_admin boolean,
  created_at timestamptz,
  last_login timestamptz,
  can_view_members_area boolean,
  date_of_birth date,
  address text,
  postcode text,
  phone text,
  emergency_contact_name text,
  emergency_contact_phone text,
  group_division text,
  allergies text,
  dietary_requirements text,
  criminal_convictions text,
  declaration_agreed boolean,
  declaration_date timestamptz,
  profile_image_url text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the current user is an admin
  IF NOT EXISTS (
    SELECT 1 FROM member_auth 
    WHERE member_auth.id = auth.uid() 
    AND member_auth.is_admin = true
  ) THEN
    RAISE EXCEPTION 'Access denied: Admin privileges required';
  END IF;

  -- Return all members if user is admin
  RETURN QUERY
  SELECT 
    m.id,
    m.name,
    m.email,
    m.is_admin,
    m.created_at,
    m.last_login,
    m.can_view_members_area,
    m.date_of_birth,
    m.address,
    m.postcode,
    m.phone,
    m.emergency_contact_name,
    m.emergency_contact_phone,
    m.group_division,
    m.allergies,
    m.dietary_requirements,
    m.criminal_convictions,
    m.declaration_agreed,
    m.declaration_date,
    m.profile_image_url
  FROM member_auth m
  ORDER BY m.created_at DESC;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_all_members_for_admin() TO authenticated;