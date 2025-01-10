import { Building2, Mail, Phone, Pencil, Trash } from 'lucide-react';
import type { Client } from '../../types/client';

interface ClientListProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (clientId: string) => void;
  onSort: (field: keyof Client) => void;
  onViewDetails: (client: Client) => void;
  sortBy: keyof Client;
  sortDirection: 'asc' | 'desc';
}

export function ClientList({
  clients,
  onEdit,
  onDelete,
  onSort,
  sortBy,
  onViewDetails,
  sortDirection,
}: ClientListProps){
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              onClick={() => onSort('company')}
              className="cursor-pointer py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
            >
              Company {sortBy === 'company' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th
              onClick={() => onSort('email')}
              className="cursor-pointer px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Email {sortBy === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th
              onClick={() => onSort('type')}
              className="cursor-pointer px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Type {sortBy === 'type' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th
              onClick={() => onSort('status')}
              className="cursor-pointer px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Status {sortBy === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-200">
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-gray-400" />
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">{client.company}</div>
                    <div className="text-gray-500">{client.website}</div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-gray-400" />
                    {client.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-gray-400" />
                    {client.phone}
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                {client.type}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    client.status === 'active'
                      ? 'bg-green-50 text-green-700'
                      : client.status === 'inactive'
                      ? 'bg-red-50 text-red-700'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}
                >
                  {client.status}
                </span>
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">
              <div className="flex space-x-2">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => onViewDetails(client)}
                >
                  View Details
                </button> 
                </div>
                <div className="flex space-x-2">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => onEdit(client)}
                  >
                    <Pencil className="h-4 w-4" /> Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => onDelete(client.id)}
                  >
                    <Trash className="h-4 w-4" /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
