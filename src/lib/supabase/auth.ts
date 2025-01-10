import { supabase } from './client';

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!user) throw new Error('Not authenticated');
  return user;
}

export async function getUserId() {
  const user = await getCurrentUser();
  return user.id;
}