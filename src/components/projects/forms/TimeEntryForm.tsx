import React, { useState } from 'react';
import type { TimeEntry } from '../../../types/project';

interface TimeEntryFormProps {
  taskId: string;
  onSubmit: (entry: Omit<TimeEntry, 'id'>) => void;
  onCancel: () => void;
}

export function TimeEntryForm({ taskId, onSubmit, onCancel }: TimeEntryFormProps) {
  const [formData, setFormData] = useState({
    taskId,
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    hours: '',
    description: '',
    billable: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      hours: parseFloat(formData.hours)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Hours Worked</label>
        <input
          type="number"
          step="0.5"
          min="0.5"
          max="24"
          value={formData.hours}
          onChange={e => setFormData(prev => ({ ...prev, hours: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
          placeholder="What did you work on?"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.billable}
          onChange={e => setFormData(prev => ({ ...prev, billable: e.target.checked }))}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label className="ml-2 block text-sm text-gray-900">Billable hours</label>
      </div>

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
          Log Time
        </button>
      </div>
    </form>
  );
}