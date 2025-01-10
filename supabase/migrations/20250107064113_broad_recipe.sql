/*
  # Fix constraints and policies

  1. Changes
    - Add proper RLS policies for transactions
    - Fix employee email constraint
*/

-- Fix transaction policies
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can insert own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can update own transactions" ON transactions;

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions"
  ON transactions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Fix employee email constraint
ALTER TABLE employees 
  DROP CONSTRAINT IF EXISTS employees_email_key,
  DROP CONSTRAINT IF EXISTS employees_email_user_id_key;

ALTER TABLE employees
  ADD CONSTRAINT employees_email_user_id_key 
  UNIQUE (email, user_id);