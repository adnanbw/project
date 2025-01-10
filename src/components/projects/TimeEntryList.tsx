import React from 'react';
import { Clock, User, DollarSign } from 'lucide-react';
import type { TimeEntry } from '../../types/project';

interface TimeEntryListProps {
  entries: TimeEntry[];
  hourlyRate: number;
}

export function TimeEntryList({ entries, hourlyRate }: TimeEntryListProps) {
  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);
  const totalCost = totalHours * hourlyRate;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm font-medium text-gray-500">Total Hours</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">{totalHours}</span>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm font-medium text-gray-500">Total Cost</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">${totalCost}</span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Employee</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Hours</th>
              <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Billable</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                  {new Date(entry.date).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{entry.employeeId}</span>
                  </div>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">{entry.description}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-medium">
                  {entry.hours}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                  {entry.billable ? (
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700">
                      No
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}