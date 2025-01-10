import React from 'react';
import { Clock } from 'lucide-react';
import type { Attendance } from '../../../types/attendance';

interface AttendanceListProps {
  attendance: Attendance[];
}

export function AttendanceList({ attendance }: AttendanceListProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Date</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Check In</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Check Out</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {attendance.map((record) => (
            <tr key={record.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                {new Date(record.date).toLocaleDateString()}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {record.checkIn}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {record.checkOut || '-'}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                  ${record.status === 'present' ? 'bg-green-50 text-green-700' :
                    record.status === 'absent' ? 'bg-red-50 text-red-700' :
                    record.status === 'late' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-orange-50 text-orange-700'}`}>
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}