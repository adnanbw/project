import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { RevenueData } from '../../types/analytics';
import { format, parseISO } from 'date-fns';

interface RevenueChartProps {
  data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="h-[400px] rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
      <h3 className="text-base font-semibold leading-6 text-gray-900">Revenue Overview</h3>
      <div className="mt-2 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => format(parseISO(date), 'MMM d')}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', border: 'none', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              labelFormatter={(date) => format(parseISO(date as string), 'MMM d, yyyy')}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#6366F1" 
              fill="url(#colorRevenue)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="expenses" 
              stroke="#EF4444" 
              fill="url(#colorExpenses)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="profit" 
              stroke="#10B981" 
              fill="url(#colorProfit)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}