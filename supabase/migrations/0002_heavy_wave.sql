/*
  # Initial Schema Setup

  1. New Tables
    - clients
      - Basic client information
      - Contact details
      - Business information
    - employees
      - Employee information
      - Department and position
      - Contact details
    - projects
      - Project details
      - Budget and timeline
      - Client relationship
    - tasks
      - Task information
      - Project relationship
      - Assignment and tracking
    - invoices
      - Invoice details
      - Client relationship
      - Payment tracking
    - transactions
      - Financial transactions
      - Categories and types
      - Reference tracking

  2. Security
    - Enable RLS on all tables
    - Add basic security policies
*/

-- Clients Table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('client', 'vendor')),
  email text NOT NULL,
  phone text,
  company text NOT NULL,
  address text,
  city text,
  country text,
  tax_id text,
  status text NOT NULL CHECK (status IN ('active', 'inactive', 'pending')),
  website text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Employees Table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  department text NOT NULL,
  position text NOT NULL,
  join_date date NOT NULL,
  status text NOT NULL CHECK (status IN ('active', 'inactive', 'on_leave')),
  manager_id uuid REFERENCES employees(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  budget numeric(12,2) NOT NULL,
  status text NOT NULL CHECK (status IN ('planning', 'active', 'completed', 'on-hold')),
  client_id uuid REFERENCES clients(id) NOT NULL,
  manager_id uuid REFERENCES employees(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) NOT NULL,
  name text NOT NULL,
  description text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text NOT NULL CHECK (status IN ('todo', 'in-progress', 'review', 'completed')),
  assignee_id uuid REFERENCES employees(id),
  estimated_hours numeric(6,2) NOT NULL,
  actual_hours numeric(6,2) DEFAULT 0,
  hourly_rate numeric(8,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text NOT NULL UNIQUE,
  client_id uuid REFERENCES clients(id) NOT NULL,
  date date NOT NULL,
  due_date date NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'sent', 'paid', 'overdue')),
  subtotal numeric(12,2) NOT NULL,
  tax numeric(12,2) NOT NULL,
  total numeric(12,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Invoice Items Table
CREATE TABLE IF NOT EXISTS invoice_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid REFERENCES invoices(id) NOT NULL,
  description text NOT NULL,
  quantity numeric(10,2) NOT NULL,
  unit_price numeric(12,2) NOT NULL,
  total numeric(12,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Enable Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create basic policies (allow all operations for now)
DO $$ 
BEGIN
  -- Clients policies
  EXECUTE 'CREATE POLICY "Enable all operations for clients" ON clients FOR ALL USING (true)';
  
  -- Employees policies
  EXECUTE 'CREATE POLICY "Enable all operations for employees" ON employees FOR ALL USING (true)';
  
  -- Projects policies
  EXECUTE 'CREATE POLICY "Enable all operations for projects" ON projects FOR ALL USING (true)';
  
  -- Tasks policies
  EXECUTE 'CREATE POLICY "Enable all operations for tasks" ON tasks FOR ALL USING (true)';
  
  -- Invoices policies
  EXECUTE 'CREATE POLICY "Enable all operations for invoices" ON invoices FOR ALL USING (true)';
  
  -- Invoice items policies
  EXECUTE 'CREATE POLICY "Enable all operations for invoice items" ON invoice_items FOR ALL USING (true)';
  
  -- Transactions policies
  EXECUTE 'CREATE POLICY "Enable all operations for transactions" ON transactions FOR ALL USING (true)';
END $$;