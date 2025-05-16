import React from 'react';
import { motion } from 'framer-motion';
const BackgroundGradient = () => {
  return <motion.div className="absolute inset-0 z-0" initial={{
    backgroundPosition: '0% 0%'
  }} animate={{
    backgroundPosition: ['0% 0%', '100% 100%']
  }} transition={{
    duration: 20,
    ease: 'linear',
    repeat: Infinity,
    repeatType: 'reverse'
  }} style={{
    background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
    filter: 'blur(60px)'
  }} />;
};
export default BackgroundGradient;