import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Client } from '../types/client';

interface ClientContextType {
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  getClientById: (id: string) => Client | undefined;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

// Sample initial data
const initialClients: Client[] = [
  {
    id: '1',
    name: 'Acme Corp',
    type: 'client',
    email: 'contact@acme.com',
    phone: '(555) 123-4567',
    company: 'Acme Corporation',
    address: '123 Business Ave',
    city: 'Tech City',
    country: 'USA',
    status: 'active',
    createdAt: '2024-01-01',
    website: 'https://acme.com'
  }
];

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>(initialClients);

  const addClient = (clientData: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...clientData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    setClients(prev => [newClient, ...prev]);
  };

  const updateClient = (id: string, clientData: Partial<Client>) => {
    setClients(prev =>
      prev.map(client =>
        client.id === id ? { ...client, ...clientData } : client
      )
    );
  };

  const getClientById = (id: string) => {
    return clients.find(client => client.id === id);
  };

  return (
    <ClientContext.Provider value={{ clients, addClient, updateClient, getClientById }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClients must be used within a ClientProvider');
  }
  return context;
}