export interface AnalyticsMetric {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  currency?: string;
}

export interface RevenueData {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface ProjectStatus {
  status: string;
  count: number;
  color: string;
}

export interface DepartmentExpense {
  department: string;
  expenses: number;
  budget: number;
}