export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  clientId: string;
  managerId: string;
}

export interface Task {
  id: string;
  projectId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  assigneeId: string;
  estimatedHours: number;
  actualHours: number;
  hourlyRate: number;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  employeeId: string;
  date: string;
  hours: number;
  description: string;
  billable: boolean;
}

export interface ProjectCost {
  id: string;
  projectId: string;
  category: 'labor' | 'material' | 'equipment' | 'other';
  description: string;
  amount: number;
  date: string;
  invoiced: boolean;
}

export interface ProjectShare {
  id: string;
  projectId: string;
  token: string;
  expiresAt: string;
  accessLevel: 'view' | 'comment';
}