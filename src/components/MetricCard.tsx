import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from 'lucide-react';
import type { FinancialMetric } from '../types';

interface MetricCardProps {
  metric: FinancialMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <ArrowUpIcon className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDownIcon className="h-4 w-4 text-red-500" />;
      default:
        return <MinusIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    switch (metric.trend) {
      case 'up':
        return 'text-green-700';
      case 'down':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium leading-6 text-gray-600">{metric.label}</p>
        {getTrendIcon()}
      </div>
      <p className="mt-2 flex items-baseline gap-x-2">
        <span className="text-2xl font-semibold tracking-tight text-gray-900">
          {metric.currency}{metric.value.toLocaleString()}
        </span>
        <span className={`text-sm ${getTrendColor()}`}>
          {metric.change > 0 ? '+' : ''}{metric.change}%
        </span>
      </p>
    </div>
  );
}