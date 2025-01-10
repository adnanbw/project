export type ClientType = 'client' | 'vendor';
export type ClientStatus = 'active' | 'inactive' | 'pending';

export interface Client {
  projects: any;
  id: string;
  name: string;
  type: ClientType;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  country: string;
  taxId?: string;
  status: ClientStatus;
  notes?: string;
  createdAt: string;
  website?: string;
  primaryContact?: string;
}

export interface ClientContact {
  id: string;
  clientId: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}