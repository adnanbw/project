import { SupabaseClient } from '@supabase/supabase-js';
import { getCurrentUser } from '../../lib/supabase/auth';

export async function createRecord<T extends { user_id?: string }>(
  supabase: SupabaseClient,
  table: string,
  data: Omit<T, 'id' | 'user_id'>,
  select = '*'
) {
  const user = await getCurrentUser();
  
  const { data: record, error } = await supabase
    .from(table)
    .insert([{ ...data, user_id: user.id }])
    .select(select)
    .single();

  if (error) throw error;
  return record;
}

export async function getRecords<T>(
  supabase: SupabaseClient,
  table: string,
  select = '*'
) {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from(table)
    .select(select)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as T[];
}