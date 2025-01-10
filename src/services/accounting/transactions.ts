import { supabase } from '../../lib/supabase';
import type { Transaction } from '../../types/accounting';

export async function createTransaction(transaction: Omit<Transaction, 'id'>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('accounting_transactions')  // Using new table name
    .insert([{
      user_id: user.id,
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

  if (error) {
    console.error('Transaction creation error:', error);
    throw error;
  }

  return data as Transaction;
}

export async function getTransactions() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('accounting_transactions')  // Using new table name
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Get transactions error:', error);
    throw error;
  }

  return data as Transaction[];
}