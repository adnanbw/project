import { supabase } from '../lib/supabase';
import type { Transaction } from '../types/accounting';

export async function createTransaction(transaction: Omit<Transaction, 'id'>) {
  const { data, error } = await supabase
    .from('transactions')
    .insert([{
      date: transaction.date,
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      reference: transaction.reference,
      status: transaction.status
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTransactions() {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateTransactionStatus(id: string, status: Transaction['status']) {
  const { data, error } = await supabase
    .from('transactions')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}