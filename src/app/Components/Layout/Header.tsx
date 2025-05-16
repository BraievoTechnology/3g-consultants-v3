"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MenuIcon,
  X as CloseIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BrandText from "@/app/Components/ui/BrandText";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  usePathname();
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleNavClick = (sectionId: string, path: string) => {
    setIsMenuOpen(false);
    if (location.pathname === "/" && sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
      return;
    }
    if (location.pathname !== "/" && sectionId) {
      router.push("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 100);
      return;
    }
    if (path && !sectionId) {
      router.push(path);
    }
  };
  const navItems = [
    {
      label: "Home",
      sectionId: "hero",
      path: "/",
    },
    {
      label: "About",
      sectionId: "about",
      path: "/about",
    },
    {
      label: "Services",
      sectionId: "services",
      path: "/services",
    },
    {
      label: "Projects",
      sectionId: "projects",
      path: "/projects",
    },
    {
      label: "News",
      sectionId: "news",
      path: "/news",
    },
    {
      label: "Careers",
      path: "../careerspage",
    },
    {
      label: "Contact",
      sectionId: "contact",
      path: "/contact",
    },
  ];
  const headerVariants = {
    initial: {
      y: -100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    exit: {
      y: -100,
      opacity: 0,
    },
  };
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 35,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 35,
      },
    },
  };
  const navItemVariants = {
    closed: {
      opacity: 0,
      y: 20,
    },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 35,
      },
    }),
  };
  return (
    <header className="sticky top-0 w-full z-50">
      <motion.div
        initial="initial"
        animate="animate"
        variants={headerVariants}
        className={`bg-black text-white py-2 transition-all duration-300`}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <div className="flex items-center">
              <PhoneIcon size={16} className="mr-2" />
              <span className="text-sm">011 283 5074</span>
            </div>
            <div className="flex items-center">
              <MailIcon size={16} className="mr-2" />
              <span className="text-sm">info@3gconsultants.com</span>
            </div>
          </div>
          <div className="flex items-center">
            <ClockIcon size={16} className="mr-2" />
            <span className="text-sm">Mon - Fri: 8:00AM - 5:00PM</span>
          </div>
        </div>
      </motion.div>
      <div
        className={`${
          hasScrolled ? "backdrop-blur-lg" : "bg-[#f5f5f5]"
        } shadow-md transition-all duration-300`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="relative flex items-center gap-3"
            >
              <div className="flex-shrink-0">
                <img
                  src="https://uploadthingy.s3.us-west-1.amazonaws.com/f1yqtq4t3Xjy4NfwYgbtYe/logo.jpg"
                  alt="3G Consultants Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <Link
                href="/"
                className="text-2xl font-bold text-[#f1c235] relative z-10 hidden md:block"
              >
                <BrandText />
              </Link>
            </motion.div>
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.path}
                  onClick={() =>
                    handleNavClick(item.sectionId || "", item.path || "")
                  }
                  className="text-[#f1c235] hover:text-black font-medium cursor-pointer"
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    },
                  }}
                  initial={{
                    opacity: 0,
                    y: -20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.1,
                    },
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-black focus:outline-none"
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <MenuIcon size={24} />
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden bg-white fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="p-4 flex justify-end">
              <motion.button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800 focus:outline-none"
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                <CloseIcon size={24} />
              </motion.button>
            </div>
            <div className="flex flex-col items-center space-y-6 p-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.path}
                  custom={index}
                  variants={navItemVariants}
                  onClick={() =>
                    handleNavClick(item.sectionId || "", item.path || "")
                  }
                  className="text-xl text-gray-800 hover:text-blue-700 font-medium"
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    },
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Header;
