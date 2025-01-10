import React from 'react';
import { Calendar, DollarSign, Users } from 'lucide-react';
import type { Project } from '../../types/project';

interface ProjectListProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

export function ProjectList({ projects, onSelect }: ProjectListProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Project</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Timeline</th>
            <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Budget</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {projects.map((project) => (
            <tr
              key={project.id}
              onClick={() => onSelect(project)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                <div className="font-medium text-gray-900">{project.name}</div>
                <div className="text-gray-500">{project.description}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>
                    {new Date(project.startDate).toLocaleDateString()} - 
                    {new Date(project.endDate).toLocaleDateString()}
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                <div className="flex items-center justify-end">
                  <DollarSign className="mr-1 h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-900">
                    {project.budget.toLocaleString()}
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                  ${project.status === 'active' ? 'bg-green-50 text-green-700' :
                    project.status === 'completed' ? 'bg-blue-50 text-blue-700' :
                    project.status === 'on-hold' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-gray-50 text-gray-700'}`}>
                  {project.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}