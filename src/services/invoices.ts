import { supabase } from '../lib/supabase';
import type { Invoice, InvoiceItem } from '../types/accounting';

export async function createInvoice(invoice: Omit<Invoice, 'id' | 'number'>) {
  // Start a transaction
  const { data: newInvoice, error: invoiceError } = await supabase
    .from('invoices')
    .insert([{
      client_id: invoice.clientId,
      date: invoice.date,
      due_date: invoice.dueDate,
      status: invoice.status,
      subtotal: invoice.subtotal,
      tax: invoice.tax,
      total: invoice.total
    }])
    .select()
    .single();

  if (invoiceError) throw invoiceError;

  // Insert invoice items
  const { error: itemsError } = await supabase
    .from('invoice_items')
    .insert(invoice.items.map(item => ({
      invoice_id: newInvoice.id,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total: item.total
    })));

  if (itemsError) throw itemsError;

  return newInvoice;
}

export async function getInvoices() {
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      client:clients(name, company),
      items:invoice_items(*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateInvoiceStatus(id: string, status: Invoice['status']) {
  const { data, error } = await supabase
    .from('invoices')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}