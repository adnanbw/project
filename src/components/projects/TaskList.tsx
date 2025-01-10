import React from 'react';
import { Clock, User } from 'lucide-react';
import type { Task } from '../../types/project';

interface TaskListProps {
  tasks: Task[];
  onSelect: (task: Task) => void;
}

export function TaskList({ tasks, onSelect }: TaskListProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Task</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Assignee</th>
            <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Hours</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr
              key={task.id}
              onClick={() => onSelect(task)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="py-4 pl-4 pr-3 text-sm">
                <div className="font-medium text-gray-900">{task.name}</div>
                <div className="text-gray-500">{task.description}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>{task.assigneeId}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                <div className="flex items-center justify-end">
                  <Clock className="mr-1 h-4 w-4 text-gray-400" />
                  <span>
                    {task.actualHours}/{task.estimatedHours}
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                  ${task.status === 'completed' ? 'bg-green-50 text-green-700' :
                    task.status === 'in-progress' ? 'bg-blue-50 text-blue-700' :
                    task.status === 'review' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-gray-50 text-gray-700'}`}>
                  {task.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}