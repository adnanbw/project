/*
  # Create Admin User
  
  1. Changes
    - Creates an admin user in auth.users if it doesn't exist
    - Adds corresponding profile entry
  
  Note: This migration assumes profiles table and its policies already exist
*/

-- Create admin user through auth schema
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Create admin user if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@example.com'
  ) THEN
    -- Generate UUID for consistency between auth.users and profiles
    admin_user_id := gen_random_uuid();
    
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      admin_user_id,
      'authenticated',
      'authenticated',
      'admin@example.com',
      crypt('admin', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"role":"admin"}',
      now(),
      now(),
      '',
      '',
      '',
      ''
    );

    -- Insert corresponding profile if it doesn't exist
    INSERT INTO profiles (id, email, role)
    VALUES (admin_user_id, 'admin@example.com', 'admin')
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;