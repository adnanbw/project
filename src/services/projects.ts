import { supabase } from '../lib/supabase';
import type { Project } from '../types/project';

export async function createProject(project: Omit<Project, 'id'>) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*, client:clients(name, company), manager:employees(first_name, last_name)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateProject(id: string, updates: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}