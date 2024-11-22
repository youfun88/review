import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
}

export function StatsCard({ title, value, icon: Icon, change }: Props) {
  const isPositive = change.startsWith('+');

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <Icon className="text-indigo-600" size={24} />
      </div>
      <div className={`mt-4 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </div>
    </div>
  );
}