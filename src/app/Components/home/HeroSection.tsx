"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import Button from "../ui/Button";
import BackgroundGradient from "../animations/BackgroundGradient";
import FadeIn from "../animations/Fadeln";
const HeroSection = () => {
  const scrollToContent = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <section className="relative bg-black text-white overflow-hidden h-screen">
      <BackgroundGradient />
      <div
        className="absolute inset-0 bg-cover mt-0 bg-center bg-no-repeat opacity-55"
        style={{
          backgroundImage:
            "url('https://uploadthingy.s3.us-west-1.amazonaws.com/nbLYs5g2CKBGCcA3GkeemP/Untitled_design_%281%29.jpg')",
        }}
      />
      <motion.div
        className="absolute inset-0"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-72 h-72 bg-[#f1c235] rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
              filter: "blur(100px)",
              opacity: 0.1,
            }}
            animate={{
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>
      <div className="container mx-auto px-4 h-full flex mt-[170px] relative z-10">
        <div className="max-w-3xl mt-20">
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#f1c235]">
              Engineering Excellence for Tomorrow's World
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              3G Consultants delivers innovative engineering solutions with
              precision, expertise, and sustainable practices.
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                <Button to="#projects" variant="primary">
                  Our Projects
                </Button>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                <Button to="#contact" variant="outline">
                  Consult Us
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
      <motion.div
        className="absolute bottom-[100px] left-[50%] md:left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        onClick={scrollToContent}
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: [0.4, 1, 0.4],
          y: [0, 8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.2,
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium mb-2 text-white/80">
            Scroll Down
          </span>
          <ChevronDownIcon
            className="w-8 h-8 text-white/80"
            style={{
              filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};
export default HeroSection;
