/*
  # Fix Schema Issues

  1. Changes
    - Add image_url column to employees table
    - Fix foreign key constraints for projects table
    - Add proper indexes for performance

  2. Security
    - Maintain existing RLS policies
*/

-- Add image_url to employees
ALTER TABLE employees ADD COLUMN IF NOT EXISTS image_url text;

-- Create indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_manager_id ON projects(manager_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee_id ON tasks(assignee_id);

-- Add ON DELETE SET NULL to optional foreign keys
ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_assignee_id_fkey;
ALTER TABLE tasks 
  ADD CONSTRAINT tasks_assignee_id_fkey 
  FOREIGN KEY (assignee_id) 
  REFERENCES employees(id) 
  ON DELETE SET NULL;

-- Add ON DELETE CASCADE to required foreign keys
ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_project_id_fkey;
ALTER TABLE tasks 
  ADD CONSTRAINT tasks_project_id_fkey 
  FOREIGN KEY (project_id) 
  REFERENCES projects(id) 
  ON DELETE CASCADE;