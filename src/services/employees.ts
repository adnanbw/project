import { supabase } from '../lib/supabase';
import type { Employee } from '../types/employee';

export async function createEmployee(employee: Omit<Employee, 'id'>) {
  const { data, error } = await supabase
    .from('employees')
    .insert([{
      first_name: employee.firstName,
      last_name: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      position: employee.position,
      join_date: employee.joinDate,
      status: employee.status,
      manager_id: employee.managerId
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getEmployees() {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateEmployee(id: string, updates: Partial<Employee>) {
  const { data, error } = await supabase
    .from('employees')
    .update({
      first_name: updates.firstName,
      last_name: updates.lastName,
      email: updates.email,
      phone: updates.phone,
      department: updates.department,
      position: updates.position,
      join_date: updates.joinDate,
      status: updates.status,
      manager_id: updates.managerId
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}