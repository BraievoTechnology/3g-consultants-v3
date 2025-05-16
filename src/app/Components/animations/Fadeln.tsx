import React from 'react'
import { motion } from 'framer-motion'
interface FadeInProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}
const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) => {
  const getDirectionOffset = () => {
    switch (direction) {
      case 'up':
        return {
          y: 20,
        }
      case 'down':
        return {
          y: -20,
        }
      case 'left':
        return {
          x: 20,
        }
      case 'right':
        return {
          x: -20,
        }
      default:
        return {
          y: 0,
        }
    }
  }
  return (
    <motion.div
      initial={{
        opacity: 0,
        ...getDirectionOffset(),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
export default FadeIn
