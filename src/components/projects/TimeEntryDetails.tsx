import React from 'react';
import { Clock, User, Calendar } from 'lucide-react';
import type { TimeEntry } from '../../types/project';

interface TimeEntryDetailsProps {
  entry: TimeEntry;
  hourlyRate: number;
}

export function TimeEntryDetails({ entry, hourlyRate }: TimeEntryDetailsProps) {
  const cost = entry.hours * hourlyRate;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="mr-2 h-4 w-4" />
          Date
        </div>
        <div className="mt-1 text-sm text-gray-900">
          {new Date(entry.date).toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="mr-2 h-4 w-4" />
            Hours Worked
          </div>
          <div className="mt-1 text-sm text-gray-900">{entry.hours} hours</div>
        </div>
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <User className="mr-2 h-4 w-4" />
            Employee
          </div>
          <div className="mt-1 text-sm text-gray-900">{entry.employeeId}</div>
        </div>
      </div>

      <div>
        <div className="text-sm text-gray-500">Description</div>
        <div className="mt-1 text-sm text-gray-900">{entry.description}</div>
      </div>

      <div className="rounded-lg bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">Cost</span>
          <span className="text-sm font-medium text-gray-900">${cost.toFixed(2)}</span>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          Based on ${hourlyRate}/hour rate
        </div>
      </div>

      {entry.billable && (
        <div className="flex items-center">
          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
            Billable
          </span>
        </div>
      )}
    </div>
  );
}