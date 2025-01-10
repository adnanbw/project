import React from 'react';
import { Layout } from '../components/Layout';
import { MetricsGrid } from '../components/analytics/MetricsGrid';
import { RevenueChart } from '../components/analytics/RevenueChart';
import type { AnalyticsMetric, RevenueData } from '../types/analytics';

// Sample data - In a real app, this would come from an API
const metrics: AnalyticsMetric[] = [
  {
    id: '1',
    label: 'Total Revenue',
    value: 75650,
    previousValue: 70000,
    change: 8.1,
    trend: 'up',
    currency: '$'
  },
  {
    id: '2',
    label: 'Active Projects',
    value: 12,
    previousValue: 10,
    change: 20,
    trend: 'up'
  },
  {
    id: '3',
    label: 'Outstanding Invoices',
    value: 23400,
    previousValue: 25000,
    change: -6.4,
    trend: 'down',
    currency: '$'
  },
  {
    id: '4',
    label: 'Client Satisfaction',
    value: 98,
    previousValue: 95,
    change: 3.2,
    trend: 'up'
  }
];

const revenueData: RevenueData[] = [
  { date: '2024-03-01', revenue: 45000, expenses: 32000, profit: 13000 },
  { date: '2024-03-02', revenue: 48000, expenses: 35000, profit: 13000 },
  { date: '2024-03-03', revenue: 52000, expenses: 36000, profit: 16000 },
  { date: '2024-03-04', revenue: 49000, expenses: 34000, profit: 15000 },
  { date: '2024-03-05', revenue: 53000, expenses: 37000, profit: 16000 },
  { date: '2024-03-06', revenue: 57000, expenses: 38000, profit: 19000 },
  { date: '2024-03-07', revenue: 60000, expenses: 40000, profit: 20000 }
];

export function AnalyticsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Analytics Dashboard
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Track your business performance and key metrics
          </p>
        </div>

        <MetricsGrid metrics={metrics} />
        
        <div className="space-y-6">
          <RevenueChart data={revenueData} />
        </div>
      </div>
    </Layout>
  );
}