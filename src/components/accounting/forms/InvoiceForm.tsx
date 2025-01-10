import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Invoice, InvoiceItem } from '../../../types/accounting';

interface InvoiceFormProps {
  onSubmit: (invoice: Omit<Invoice, 'id' | 'number'>) => void;
  onCancel: () => void;
}

export function InvoiceForm({ onSubmit, onCancel }: InvoiceFormProps) {
  const [items, setItems] = useState<Omit<InvoiceItem, 'id'>[]>([
    { description: '', quantity: 1, unitPrice: 0, total: 0 }
  ]);

  const [formData, setFormData] = useState({
    clientId: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft' as const
  });

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      const item = { ...newItems[index] };
      
      // Handle numeric fields
      if (field === 'quantity' || field === 'unitPrice') {
        const numValue = field === 'quantity' ? 
          Math.max(1, parseInt(value.toString()) || 1) : // Quantity minimum 1
          Math.max(0, parseFloat(value.toString()) || 0); // Price minimum 0
        item[field] = numValue;
        item.total = item.quantity * item.unitPrice;
      } else {
        item[field] = value;
      }
      
      newItems[index] = item;
      return newItems;
    });
  };

  const addItem = () => {
    setItems(prev => [...prev, { description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1; // 10% tax rate
    return { subtotal, tax, total: subtotal + tax };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { subtotal, tax, total } = calculateTotals();
    onSubmit({
      ...formData,
      items: items as InvoiceItem[],
      subtotal,
      tax,
      total
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Client ID</label>
          <input
            type="text"
            value={formData.clientId}
            onChange={e => setFormData(prev => ({ ...prev, clientId: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-5">
                <input
                  type="text"
                  value={item.description}
                  onChange={e => updateItem(index, 'description', e.target.value)}
                  placeholder="Description"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => updateItem(index, 'quantity', e.target.value)}
                  placeholder="Qty"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={e => updateItem(index, 'unitPrice', e.target.value)}
                  placeholder="Price"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="col-span-2">
                <span className="block w-full text-sm text-gray-700">
                  ${item.total.toFixed(2)}
                </span>
              </div>
              <div className="col-span-1">
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button
          type="button"
          onClick={addItem}
          className="mt-4 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Item
        </button>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Create Invoice
          </button>
        </div>
      </div>
    </form>
  );
}