import React from 'react';
import { motion } from 'framer-motion';
interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change?: string;
  color: string;
  delay?: number;
}
export const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  title,
  value,
  change,
  color,
  delay = 0
}) => {
  return <motion.div className="flex items-center rounded-lg bg-white p-4 shadow-sm sm:p-6" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay
  }}>
      <div className={`${color} mr-4 rounded-full p-3 sm:p-4`}>
        <div className="text-lg sm:text-xl lg:text-2xl">{icon}</div>
      </div>
      <div>
        <h3 className="text-sm text-gray-500 sm:text-base">{title}</h3>
        <div className="flex items-center">
          <p className="text-xl font-semibold sm:text-2xl lg:text-3xl">
            {value}
          </p>
          {change && <span className={`ml-2 text-xs sm:text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </span>}
        </div>
      </div>
    </motion.div>;
};