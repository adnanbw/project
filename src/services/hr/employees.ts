import { supabase } from '../../lib/supabase';
import type { Employee } from '../../types/employee';

export async function createEmployee(employee: Omit<Employee, 'id'>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

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
      image_url: employee.imageUrl,
      user_id: user.id
    }])
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    phone: data.phone,
    department: data.department,
    position: data.position,
    joinDate: data.join_date,
    status: data.status,
    imageUrl: data.image_url
  } as Employee;
}

export async function getEmployees() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map(record => ({
    id: record.id,
    firstName: record.first_name,
    lastName: record.last_name,
    email: record.email,
    phone: record.phone,
    department: record.department,
    position: record.position,
    joinDate: record.join_date,
    status: record.status,
    imageUrl: record.image_url
  })) as Employee[];
}