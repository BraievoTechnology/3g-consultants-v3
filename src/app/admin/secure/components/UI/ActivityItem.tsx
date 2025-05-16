import React from 'react';
import { motion } from 'framer-motion';
import { ClockIcon } from 'lucide-react';
interface ActivityItemProps {
  title: string;
  category: string;
  categoryColor: string;
  time: string;
  index: number;
}
export const ActivityItem: React.FC<ActivityItemProps> = ({
  title,
  category,
  categoryColor,
  time,
  index
}) => {
  return <motion.div className="flex items-start py-3" initial={{
    opacity: 0,
    x: -20
  }} animate={{
    opacity: 1,
    x: 0
  }} transition={{
    duration: 0.3,
    delay: 0.1 * index
  }}>
      <div className="mr-3 mt-1">
        <ClockIcon size={18} className="text-gray-400" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <div className="flex items-center mt-1">
          <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColor}`}>
            {category}
          </span>
          <span className="text-xs text-gray-500 ml-2">{time}</span>
        </div>
      </div>
    </motion.div>;
};