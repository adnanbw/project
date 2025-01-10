import React from 'react';
import { Clock, User, Calendar } from 'lucide-react';
import type { Task } from '../../types/project';

interface TaskDetailsProps {
  task: Task;
  onLogTime: () => void;
}

export function TaskDetails({ task, onLogTime }: TaskDetailsProps) {
  const progress = (task.actualHours / task.estimatedHours) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{task.name}</h3>
          <p className="text-sm text-gray-500">{task.description}</p>
        </div>
        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
          ${task.status === 'completed' ? 'bg-green-50 text-green-700' :
            task.status === 'in-progress' ? 'bg-blue-50 text-blue-700' :
            task.status === 'review' ? 'bg-yellow-50 text-yellow-700' :
            'bg-gray-50 text-gray-700'}`}>
          {task.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="mr-2 h-4 w-4" />
            Timeline
          </div>
          <div className="mt-1 text-sm text-gray-900">
            {new Date(task.startDate).toLocaleDateString()} - 
            {new Date(task.endDate).toLocaleDateString()}
          </div>
        </div>
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="mr-2 h-4 w-4" />
            Hours
          </div>
          <div className="mt-1 text-sm text-gray-900">
            {task.actualHours} / {task.estimatedHours} hours
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-indigo-600"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onLogTime}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          <Clock className="mr-2 h-4 w-4" />
          Log Time
        </button>
      </div>
    </div>
  );
}