import { supabase } from '../lib/supabase';
import type { Client } from '../types/client';

export async function createClient(client: Omit<Client, 'id' | 'createdAt'>) {
  const { data, error } = await supabase
    .from('clients')
    .insert([client])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateClient(id: string, updates: Partial<Client>) {
  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

