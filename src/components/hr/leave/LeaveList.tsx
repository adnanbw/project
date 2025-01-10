import React from 'react';
import { Calendar } from 'lucide-react';
import type { Leave } from '../../../types/employee';

interface LeaveListProps {
  leaves: Leave[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function LeaveList({ leaves, onApprove, onReject }: LeaveListProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Period</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Reason</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
            {(onApprove || onReject) && (
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                  <span>
                    {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                {leave.type}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">
                {leave.reason}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                  ${leave.status === 'approved' ? 'bg-green-50 text-green-700' :
                    leave.status === 'rejected' ? 'bg-red-50 text-red-700' :
                    'bg-yellow-50 text-yellow-700'}`}>
                  {leave.status}
                </span>
              </td>
              {(onApprove || onReject) && leave.status === 'pending' && (
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                  <div className="flex justify-end space-x-2">
                    {onApprove && (
                      <button
                        onClick={() => onApprove(leave.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Approve
                      </button>
                    )}
                    {onReject && (
                      <button
                        onClick={() => onReject(leave.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}