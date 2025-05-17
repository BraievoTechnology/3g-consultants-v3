import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
interface WordCarouselProps {
  words: string[];
  interval?: number;
  className?: string;
}
const WordCarousel: React.FC<WordCarouselProps> = ({
  words,
  interval = 2000,
  className = "",
}) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const changeWord = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);
    return () => clearInterval(changeWord);
  }, [words.length, interval]);
  return (
    <div
      className={`inline-flex relative min-w-[80px] h-17 items-center justify-center bg-[#ffbe00] text-white font-medium rounded px-2 ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{
            y: 30,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -30,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
export default WordCarousel;
