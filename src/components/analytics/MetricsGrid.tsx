import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { AnalyticsMetric } from '../../types/analytics';

interface MetricsGridProps {
  metrics: AnalyticsMetric[];
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'text-green-700';
      case 'down':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.id} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium leading-6 text-gray-600">{metric.label}</p>
            {getTrendIcon(metric.trend)}
          </div>
          <p className="mt-2 flex items-baseline gap-x-2">
            <span className="text-2xl font-semibold tracking-tight text-gray-900">
              {metric.currency}{metric.value.toLocaleString()}
            </span>
            <span className={`text-sm ${getTrendColor(metric.trend)}`}>
              {metric.change > 0 ? '+' : ''}{metric.change}%
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}