import React from "react";
import { motion } from "framer-motion";
import FadeIn from "@/app/Components/animations/Fadeln";
interface SectionTitleProps {
  title: ReactNode;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}
const SectionTitle = ({
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionTitleProps) => {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <FadeIn>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#ffbe00] mb-4"
          initial={{
            backgroundPosition: "0% 0%",
          }}
          whileInView={{
            backgroundPosition: ["0%", "100%"],
          }}
          transition={{
            duration: 2,
            ease: "linear",
          }}
        >
          {title}
        </motion.h2>
      </FadeIn>
      {subtitle && (
        <FadeIn delay={0.2}>
          <p
            className={`text-lg text-black ${
              centered ? "mx-auto" : ""
            } max-w-3xl`}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
};
export default SectionTitle;
