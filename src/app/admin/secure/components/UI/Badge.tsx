import React from 'react';
interface BadgeProps {
  text: string;
  color: 'green' | 'yellow' | 'blue' | 'red' | 'gray';
}
export const Badge: React.FC<BadgeProps> = ({
  text,
  color
}) => {
  const colorClasses = {
    green: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    yellow: 'bg-amber-100 text-amber-700 border border-amber-200',
    blue: 'bg-blue-100 text-blue-700 border border-blue-200',
    red: 'bg-red-100 text-red-700 border border-red-200',
    gray: 'bg-gray-100 text-gray-700 border border-gray-200'
  };
  return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClasses[color]}`}>
      {text}
    </span>;
};