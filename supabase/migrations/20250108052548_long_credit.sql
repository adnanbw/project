/*
  # Fix Transactions Table and RLS

  1. Changes
    - Drop and recreate transactions table with proper structure
    - Set up correct RLS policies
*/

-- First drop existing policies
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can insert own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can update own transactions" ON transactions;
DROP POLICY IF EXISTS "Users can delete own transactions" ON transactions;

-- Drop and recreate the transactions table
DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) NOT NULL,
    date date NOT NULL,
    description text NOT NULL,
    amount numeric(12,2) NOT NULL,
    type text NOT NULL CHECK (type IN ('credit', 'debit')),
    category text NOT NULL,
    reference text,
    status text NOT NULL CHECK (status IN ('pending', 'completed', 'void')),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create proper RLS policies
CREATE POLICY "Enable read for users based on user_id" ON transactions
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Enable insert for users based on user_id" ON transactions
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Enable update for users based on user_id" ON transactions
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Enable delete for users based on user_id" ON transactions
    FOR DELETE TO authenticated
    USING (user_id = auth.uid());