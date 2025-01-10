/*
  # Custom Profiles Table

  1. New Tables
    - `custom_profiles`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `role` (text)
      - `created_at` (timestamp)
      - `last_login` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS custom_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text,
  role text DEFAULT 'user' CHECK (role IN ('admin', 'user', 'manager')),
  created_at timestamptz DEFAULT now(),
  last_login timestamptz,
  avatar_url text
);

ALTER TABLE custom_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON custom_profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON custom_profiles
  FOR UPDATE
  USING (auth.uid() = id);