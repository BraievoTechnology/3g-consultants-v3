import React from 'react';
import { motion } from 'framer-motion';
interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
  delay?: number;
}
export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  color,
  onClick,
  delay = 0
}) => {
  return <motion.button className={`${color} p-4 rounded-md flex flex-col items-center justify-center w-full`} onClick={onClick} whileHover={{
    scale: 1.03
  }} whileTap={{
    scale: 0.98
  }} initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3,
    delay
  }}>
      <div className="mb-2">{icon}</div>
      <span className="text-sm">{label}</span>
    </motion.button>;
};