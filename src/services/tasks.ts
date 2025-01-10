import { supabase } from '../lib/supabase';
import type { Task } from '../types/project';

export async function createTask(task: Omit<Task, 'id'>) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{
      project_id: task.projectId,
      name: task.name,
      description: task.description,
      start_date: task.startDate,
      end_date: task.endDate,
      status: task.status,
      assignee_id: task.assigneeId,
      estimated_hours: task.estimatedHours,
      actual_hours: task.actualHours,
      hourly_rate: task.hourlyRate
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTasks(projectId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      assignee:employees(first_name, last_name)
    `)
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateTaskStatus(id: string, status: Task['status']) {
  const { data, error } = await supabase
    .from('tasks')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}