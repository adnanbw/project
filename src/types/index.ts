export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'accountant' | 'manager' | 'employee';
  avatar?: string;
}

export interface FinancialMetric {
  id: string;
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  currency?: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType;
  current: boolean;
}