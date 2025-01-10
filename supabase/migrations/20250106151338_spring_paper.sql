/*
  # Fix RLS policies and constraints

  1. Changes
    - Update email uniqueness constraint for employees to be scoped to user_id
    - Fix RLS policies for transactions and employees
    - Add missing RLS policies for invoice_items
*/

-- Drop existing email uniqueness constraint
ALTER TABLE employees DROP CONSTRAINT IF EXISTS employees_email_key;

-- Create new composite unique constraint scoped to user_id
ALTER TABLE employees 
  ADD CONSTRAINT employees_email_user_id_key 
  UNIQUE (email, user_id);

-- Fix transactions policies
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

-- Fix employees policies
DROP POLICY IF EXISTS "Users can view own employees" ON employees;
DROP POLICY IF EXISTS "Users can insert own employees" ON employees;
DROP POLICY IF EXISTS "Users can update own employees" ON employees;

CREATE POLICY "Users can view own employees"
  ON employees FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own employees"
  ON employees FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own employees"
  ON employees FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add missing invoice_items policies
CREATE POLICY "Users can view own invoice items"
  ON invoice_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM invoices
      WHERE invoices.id = invoice_items.invoice_id
      AND invoices.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own invoice items"
  ON invoice_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM invoices
      WHERE invoices.id = invoice_items.invoice_id
      AND invoices.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own invoice items"
  ON invoice_items FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM invoices
      WHERE invoices.id = invoice_items.invoice_id
      AND invoices.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM invoices
      WHERE invoices.id = invoice_items.invoice_id
      AND invoices.user_id = auth.uid()
    )
  );