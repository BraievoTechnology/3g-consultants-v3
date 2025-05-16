import React from 'react';
import { motion } from 'framer-motion';
import { EyeIcon } from 'lucide-react';
interface ContentCardProps {
  title: string;
  category: string;
  views: number;
  index: number;
}
export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  category,
  views,
  index
}) => {
  return <motion.div className="flex items-start py-3 border-b border-gray-100 last:border-0" initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3,
    delay: 0.1 * index
  }}>
      <div className="flex-1">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <span className="text-xs text-gray-500">{category}</span>
      </div>
      <div className="flex items-center text-gray-500">
        <EyeIcon size={16} className="mr-1" />
        <span className="text-sm">{views}</span>
      </div>
    </motion.div>;
};