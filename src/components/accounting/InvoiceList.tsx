import React from 'react';
import { Calendar, FileText, Building2 } from 'lucide-react';
import type { Invoice } from '../../types/accounting';

interface InvoiceListProps {
  invoices: Invoice[];
  onSelect: (invoice: Invoice) => void;
}

export function InvoiceList({ invoices, onSelect }: InvoiceListProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Invoice</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Client ID</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Due Date</th>
            <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Total</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <tr 
              key={invoice.id} 
              onClick={() => onSelect(invoice)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-gray-400" />
                  <span className="text-indigo-600 hover:text-indigo-900">
                    {invoice.number}
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <div className="flex items-center">
                  <Building2 className="mr-2 h-4 w-4 text-gray-400" />
                  {invoice.clientId}
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {new Date(invoice.date).toLocaleDateString()}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {new Date(invoice.dueDate).toLocaleDateString()}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-900">
                ${invoice.total.toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                  ${invoice.status === 'paid' ? 'bg-green-50 text-green-700' : 
                    invoice.status === 'overdue' ? 'bg-red-50 text-red-700' : 
                    invoice.status === 'sent' ? 'bg-blue-50 text-blue-700' : 
                    'bg-gray-50 text-gray-700'}`}>
                  {invoice.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}