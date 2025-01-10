import React from 'react';
import { Calendar, Building2, FileText } from 'lucide-react';
import type { Invoice } from '../../../types/accounting';

interface InvoiceDetailsProps {
  invoice: Invoice;
}

export function InvoiceDetails({ invoice }: InvoiceDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <FileText className="mr-2 h-4 w-4" />
            Invoice Number
          </div>
          <div className="mt-1 text-lg font-medium text-gray-900">
            {invoice.number}
          </div>
        </div>
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <Building2 className="mr-2 h-4 w-4" />
            Client ID
          </div>
          <div className="mt-1 text-sm font-medium text-gray-900">
            {invoice.clientId}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="mr-2 h-4 w-4" />
            Issue Date
          </div>
          <div className="mt-1 text-sm text-gray-900">
            {new Date(invoice.date).toLocaleDateString()}
          </div>
        </div>
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="mr-2 h-4 w-4" />
            Due Date
          </div>
          <div className="mt-1 text-sm text-gray-900">
            {new Date(invoice.dueDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-gray-700 mb-2">Items</div>
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
              <th className="py-3.5 text-right text-sm font-semibold text-gray-900">Quantity</th>
              <th className="py-3.5 text-right text-sm font-semibold text-gray-900">Unit Price</th>
              <th className="py-3.5 text-right text-sm font-semibold text-gray-900">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoice.items.map((item) => (
              <tr key={item.id}>
                <td className="py-4 text-sm text-gray-900">{item.description}</td>
                <td className="py-4 text-right text-sm text-gray-900">{item.quantity}</td>
                <td className="py-4 text-right text-sm text-gray-900">${item.unitPrice.toFixed(2)}</td>
                <td className="py-4 text-right text-sm text-gray-900">${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={3} className="py-4 text-right text-sm font-normal text-gray-700">Subtotal</th>
              <td className="py-4 text-right text-sm text-gray-900">${invoice.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <th colSpan={3} className="py-4 text-right text-sm font-normal text-gray-700">Tax</th>
              <td className="py-4 text-right text-sm text-gray-900">${invoice.tax.toFixed(2)}</td>
            </tr>
            <tr>
              <th colSpan={3} className="py-4 text-right text-sm font-semibold text-gray-900">Total</th>
              <td className="py-4 text-right text-sm font-semibold text-gray-900">${invoice.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div>
          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
            ${invoice.status === 'paid' ? 'bg-green-50 text-green-700' : 
              invoice.status === 'overdue' ? 'bg-red-50 text-red-700' : 
              invoice.status === 'sent' ? 'bg-blue-50 text-blue-700' : 
              'bg-gray-50 text-gray-700'}`}>
            {invoice.status}
          </span>
        </div>
        <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          Download PDF
        </button>
      </div>
    </div>
  );
}