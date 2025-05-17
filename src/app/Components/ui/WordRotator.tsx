import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface WordRotatorProps {
  words: string[];
  variant?: "fade";
}
const WordRotator = ({ words }: WordRotatorProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);
  const containerVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };
  return (
    <span className="relative inline-block min-w-[120px] h-[1.5em] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={words[currentIndex]}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="absolute flex items-center justify-center"
          >
            <motion.span
              className="bg-[#ffbe00] text-blue-900 px-2 rounded whitespace-nowrap font-bold"
              layout
            >
              {words[currentIndex]}
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>
    </span>
  );
};
export default WordRotator;
