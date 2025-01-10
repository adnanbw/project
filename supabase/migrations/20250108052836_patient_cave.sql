/*
  # Create New Accounting Transactions Table
  
  1. New Tables
    - accounting_transactions: Fresh table for financial transactions
  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

CREATE TABLE accounting_transactions (
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
ALTER TABLE accounting_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Enable read for authenticated users" ON accounting_transactions
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Enable insert for authenticated users" ON accounting_transactions
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Enable update for authenticated users" ON accounting_transactions
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Enable delete for authenticated users" ON accounting_transactions
    FOR DELETE TO authenticated
    USING (user_id = auth.uid());