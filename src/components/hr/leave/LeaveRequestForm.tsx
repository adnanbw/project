import React, { useState } from 'react';
import type { Leave } from '../../../types/employee';

interface LeaveRequestFormProps {
  onSubmit: (leave: Omit<Leave, 'id' | 'status'>) => void;
  onCancel: () => void;
}

export function LeaveRequestForm({ onSubmit, onCancel }: LeaveRequestFormProps) {
  const [formData, setFormData] = useState({
    employeeId: '',
    startDate: '',
    endDate: '',
    type: 'annual' as const,
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Leave Type</label>
        <select
          value={formData.type}
          onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as Leave['type'] }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="annual">Annual Leave</option>
          <option value="sick">Sick Leave</option>
          <option value="personal">Personal Leave</option>
          <option value="unpaid">Unpaid Leave</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={e => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Reason</label>
        <textarea
          value={formData.reason}
          onChange={e => setFormData(prev => ({ ...prev, reason: e.target.value }))}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
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
          Submit Request
        </button>
      </div>
    </form>
  );
}