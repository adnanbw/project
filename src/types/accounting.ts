export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  reference?: string;
  status: 'pending' | 'completed' | 'void';
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  subtotal: number;
  tax: number;
  total: number;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  address: string;
  taxId?: string;
}