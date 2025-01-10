import { supabase } from '../../lib/supabase';
import type { Project } from '../../types/project';

export async function createProject(project: Omit<Project, 'id'>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('projects')
    .insert([{
      name: project.name,
      description: project.description,
      start_date: project.startDate,
      end_date: project.endDate,
      budget: project.budget,
      status: project.status,
      client_id: project.clientId,
      manager_id: project.managerId,
      user_id: user.id
    }])
    .select(`
      *,
      client:clients(*),
      manager:employees(*)
    `)
    .single();

  if (error) throw error;
  return data as Project;
}

export async function getProjects() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      client:clients(*),
      manager:employees(*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Project[];
}