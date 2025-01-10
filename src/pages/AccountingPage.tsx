import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { TransactionList } from '../components/accounting/TransactionList';
import { InvoiceList } from '../components/accounting/InvoiceList';
import { Modal } from '../components/common/Modal';
import { TransactionForm } from '../components/accounting/forms/TransactionForm';
import { InvoiceForm } from '../components/accounting/forms/InvoiceForm';
import { TransactionDetails } from '../components/accounting/details/TransactionDetails';
import { InvoiceDetails } from '../components/accounting/details/InvoiceDetails';
import { createTransaction, getTransactions } from '../services/accounting/transactions';
import type { Transaction, Invoice } from '../types/accounting';

export function AccountingPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  React.useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load transactions');
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      loadTransactions();
    }
  }, [user]);

  if (!user) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Sign in Required</h2>
          <p className="mt-2 text-gray-600">Please sign in to access accounting features</p>
        </div>
      </Layout>
    );
  }

  const handleNewTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const newTransaction = await createTransaction(transaction);
      setTransactions(prev => [newTransaction, ...prev]);
      setIsNewTransactionModalOpen(false);
    } catch (error) {
      console.error('Failed to create transaction:', error);
      setError('Failed to create transaction. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Accounting
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage your transactions, invoices, and financial records
          </p>
        </div>

        <div className="space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Transactions</h3>
              <button
                onClick={() => setIsNewTransactionModalOpen(true)}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                New Transaction
              </button>
            </div>
            {error && (
              <div className="rounded-md bg-red-50 p-4 mb-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}
            {loading ? (
              <div className="text-gray-600">Loading transactions...</div>
            ) : (
              <TransactionList
                transactions={transactions}
                onSelect={setSelectedTransaction}
              />
            )}
          </section>
        </div>
      </div>

      <Modal
        isOpen={isNewTransactionModalOpen}
        onClose={() => setIsNewTransactionModalOpen(false)}
        title="New Transaction"
      >
        <TransactionForm
          onSubmit={handleNewTransaction}
          onCancel={() => setIsNewTransactionModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        title="Transaction Details"
      >
        {selectedTransaction && (
          <TransactionDetails transaction={selectedTransaction} />
        )}
      </Modal>
    </Layout>
  );
}