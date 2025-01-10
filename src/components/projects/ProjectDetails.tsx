import React from 'react';
import { Clock, DollarSign, Calendar } from 'lucide-react';
import type { Project } from '../../types/project';
import { useClients } from '../../context/ClientContext';

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const { getClientById } = useClients();
  const client = getClientById(project.clientId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
          <p className="text-sm text-gray-500">{project.description}</p>
        </div>
        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
          ${project.status === 'active' ? 'bg-green-50 text-green-700' :
            project.status === 'completed' ? 'bg-blue-50 text-blue-700' :
            project.status === 'on-hold' ? 'bg-yellow-50 text-yellow-700' :
            'bg-gray-50 text-gray-700'}`}>
          {project.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="mr-2 h-4 w-4" />
            Timeline
          </div>
          <div className="mt-1 text-sm text-gray-900">
            {new Date(project.startDate).toLocaleDateString()} - 
            {new Date(project.endDate).toLocaleDateString()}
          </div>
        </div>
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <DollarSign className="mr-2 h-4 w-4" />
            Budget
          </div>
          <div className="mt-1 text-sm text-gray-900">
            ${project.budget.toLocaleString()}
          </div>
        </div>
      </div>

      {client && (
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="text-sm font-medium text-gray-900">Client Information</h4>
          <dl className="mt-2 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-gray-500">Company</dt>
              <dd className="text-gray-900">{client.company}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Contact</dt>
              <dd className="text-gray-900">{client.email}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}