import React from 'react';
import { Users } from 'lucide-react';
import type { Employee } from '../../types/employee';

interface EmployeeListProps {
  employees: Employee[];
  onSelect: (employee: Employee) => void;
}

export function EmployeeList({ employees, onSelect }: EmployeeListProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Employee</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Department</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Position</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Join Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr
              key={employee.id}
              onClick={() => onSelect(employee)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                <div className="flex items-center">
                  <img
                    src={employee.imageUrl}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">
                      {employee.firstName} {employee.lastName}
                    </div>
                    <div className="text-gray-500">{employee.email}</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {employee.department}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {employee.position}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                  ${employee.status === 'active' ? 'bg-green-50 text-green-700' :
                    employee.status === 'inactive' ? 'bg-red-50 text-red-700' :
                    'bg-yellow-50 text-yellow-700'}`}>
                  {employee.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {new Date(employee.joinDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}