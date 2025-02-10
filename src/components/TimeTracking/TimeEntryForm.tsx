import React, { useState } from 'react'
import { TimeEntry, TimeEntryInput } from '../../types/timeTracking'

interface TimeEntryFormProps {
  entry?: TimeEntry
  onSubmit: (data: TimeEntryInput) => Promise<void>
  onCancel: () => void
}

export const TimeEntryForm: React.FC<TimeEntryFormProps> = ({
  entry,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<TimeEntryInput>({
    employee_id: entry?.employee_id || '',
    project_id: entry?.project_id || '',
    date: entry?.date || new Date().toISOString().split('T')[0],
    hours: entry?.hours || 0,
    description: entry?.description || '',
    billable: entry?.billable ?? true,
    start_time: entry?.start_time || '',
    end_time: entry?.end_time || ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Hours</label>
        <input
          type="number"
          step="0.25"
          value={formData.hours}
          onChange={e => setFormData(prev => ({ ...prev, hours: parseFloat(e.target.value) }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.billable}
          onChange={e => setFormData(prev => ({ ...prev, billable: e.target.checked }))}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label className="ml-2 block text-sm text-gray-700">Billable</label>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Save Entry
        </button>
      </div>
    </form>
  )
}
