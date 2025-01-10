import { supabase } from '../../lib/supabase';
import type { Client } from '../../types/client';
import { Project } from '../../types/project';

export async function getClients(): Promise<Client[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Client[];
}

export async function getClientDetails(clientId: string): Promise<{ client: Client; projects: Project[] }> {
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('*')
    .eq('id', clientId)
    .single();

  if (clientError) throw clientError;

  const { data: projects, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('client_id', clientId);

  if (projectError) throw projectError;

  return { client, projects };
}


export async function createClient(client: Omit<Client, 'id' | 'createdAt' | 'projects'>): Promise<Client> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('clients')
    .insert([{
      name: client.name,
      type: client.type,
      email: client.email,
      phone: client.phone,
      company: client.company,
      address: client.address,
      city: client.city,
      country: client.country,
      tax_id: client.taxId, // Explicitly map taxId to tax_id
      status: client.status,
      website: client.website,
      notes: client.notes,
      user_id: user.id, // Add user_id for ownership
    }])
    .select()
    .single();

  if (error) throw error;
  return data as Client;
}




export async function updateClient(client: Omit<Client, 'projects' | 'createdAt'>): Promise<Client> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('clients')
    .update({
      name: client.name,
      type: client.type,
      email: client.email,
      phone: client.phone,
      company: client.company,
      address: client.address,
      city: client.city,
      country: client.country,
      tax_id: client.taxId, // Explicitly map taxId to tax_id
      status: client.status,
      website: client.website,
      notes: client.notes,
    })
    .eq('id', client.id) // Identify the record by ID
    .eq('user_id', user.id) // Ensure ownership
    .select()
    .single();

  if (error) throw error;
  return data as Client;
}



export async function deleteClient(clientId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', clientId)
    .eq('user_id', user.id);

  if (error) throw error;
}
