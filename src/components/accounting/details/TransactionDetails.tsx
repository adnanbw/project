import React from 'react';
import { Calendar, DollarSign, FileText, Tag } from 'lucide-react';
import type { Transaction } from '../../../types/accounting';

interface TransactionDetailsProps {
  transaction: Transaction;
}

export function TransactionDetails({ transaction }: TransactionDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="mr-2 h-4 w-4" />
            Date
          </div>
          <div className="mt-1 text-sm font-medium text-gray-900">
            {new Date(transaction.date).toLocaleDateString()}
          </div>
        </div>
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <Tag className="mr-2 h-4 w-4" />
            Status
          </div>
          <div className="mt-1">
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
              ${transaction.status === 'completed' ? 'bg-green-50 text-green-700' : 
                transaction.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : 
                'bg-gray-50 text-gray-700'}`}>
              {transaction.status}
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center text-sm text-gray-500">
          <FileText className="mr-2 h-4 w-4" />
          Description
        </div>
        <div className="mt-1 text-sm text-gray-900">
          {transaction.description}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <DollarSign className="mr-2 h-4 w-4" />
            Amount
          </div>
          <div className={`mt-1 text-lg font-medium ${
            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
          }`}>
            ${transaction.amount.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Category</div>
          <div className="mt-1 text-sm font-medium text-gray-900">
            {transaction.category}
          </div>
        </div>
      </div>

      {transaction.reference && (
        <div>
          <div className="text-sm text-gray-500">Reference</div>
          <div className="mt-1 text-sm text-gray-900">
            {transaction.reference}
          </div>
        </div>
      )}
    </div>
  );
}