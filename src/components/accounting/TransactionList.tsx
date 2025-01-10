import React from 'react';
import { Calendar, DollarSign } from 'lucide-react';
import type { Transaction } from '../../types/accounting';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Date</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
            <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Amount</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">{transaction.description}</td>
              <td className="px-3 py-4 text-sm text-gray-500">{transaction.category}</td>
              <td className="px-3 py-4 text-right text-sm">
                <div className={`flex items-center justify-end ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <DollarSign className="mr-1 h-4 w-4" />
                  {transaction.amount.toLocaleString()}
                </div>
              </td>
              <td className="px-3 py-4 text-sm">
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                  ${transaction.status === 'completed' ? 'bg-green-50 text-green-700' : 
                    transaction.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : 
                    'bg-gray-50 text-gray-700'}`}>
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}