"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  SendIcon,
  ChevronRightIcon,
} from "lucide-react";
import BrandText from "../ui/BrandText";
const Footer = () => {
  const fadeInUpVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };
  const socialIconVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.2,
      rotate: 5,
    },
  };
  const linkVariants = {
    initial: {
      x: 0,
    },
    hover: {
      x: 5,
    },
  };
  const serviceLinks = [
    { name: "Procurement Contract", id: "procurement" },
    { name: "Highways & Transportation", id: "highways" },
    { name: "Water Resources", id: "water" },
    { name: "Environmental Engineering", id: "environmental" },
    { name: "Urban Development", id: "urban" },
  ];
  return (
    <footer className="relative bg-[#f5f5f5] text-black">
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, #f1c235 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, #f1c235 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, #f1c235 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div
            variants={fadeInUpVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <h3 className="text-2xl font-bold text-black mb-6">
              <BrandText />
            </h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Engineering excellence through innovation and expertise. Your
              trusted partner in construction and engineering solutions.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  Icon: FacebookIcon,
                  href: "https://www.facebook.com/3gconsultantslk/",
                  label: "Facebook",
                },
                // {
                //   Icon: TwitterIcon,
                //   href: '#',
                //   label: 'Twitter',
                // },
                // {
                //   Icon: InstagramIcon,
                //   href: '#',
                //   label: 'Instagram',
                // },
                {
                  Icon: LinkedinIcon,
                  href: "https://www.linkedin.com/company/3g-consultants-pvt-ltd/?originalSubdomain=lk",
                  label: "LinkedIn",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.href !== "#" ? "_blank" : undefined}
                  rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                  aria-label={`Visit our ${social.label} page`}
                  variants={socialIconVariants}
                  initial="initial"
                  whileHover="hover"
                  className="p-2 bg-[#ffbe00] rounded-lg text-black hover:text-white transition-colors"
                >
                  <social.Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUpVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
          >
            <h3 className="text-lg font-semibold text-black mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "about" },
                { label: "Services", path: "servicespage" },
                { label: "Projects", path: "projects" },
                { label: "Contact Us", path: "contactpage" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={linkVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <Link
                    href={`/${item.path.toLowerCase().replace(" ", "-")}`}
                    className="flex items-center text-gray-500 hover:text-[#ffbe00] transition-colors"
                  >
                    <ChevronRightIcon size={16} className="mr-2" />
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            variants={fadeInUpVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.4,
            }}
          >
            <h3 className="text-lg font-semibold text-black mb-6">
              Our Services
            </h3>

            <ul className="space-y-3">
              {serviceLinks.map((service, index) => (
                <motion.li
                  key={index}
                  variants={linkVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <Link
                    href={`/servicespage/#${service.id}`}
                    className="flex items-center text-gray-500 hover:text-[#ffbe00] transition-colors"
                  >
                    <ChevronRightIcon size={16} className="mr-2" />
                    {service.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            variants={fadeInUpVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.6,
            }}
          >
            <h3 className="text-lg font-semibold text-black mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <motion.li
                whileHover={{
                  x: 5,
                }}
                className="flex items-start text-gray-500"
              >
                <MapPinIcon
                  size={20}
                  className="mr-3 mt-1 flex-shrink-0 text-[#ffbe00]
"
                />
                <span>
                  19/B Jeswell Pl,
                  <br />
                  Nugegoda 10107,
                  <br /> Sri Lanka
                </span>
              </motion.li>
              <motion.li
                whileHover={{
                  x: 5,
                }}
                className="flex items-center text-gray-500"
              >
                <PhoneIcon
                  size={20}
                  className="mr-3 flex-shrink-0 text-[#ffbe00]
"
                />
                <span>011 283 5074</span>
              </motion.li>
              <motion.li
                whileHover={{
                  x: 5,
                }}
                className="flex items-center text-gray-500"
              >
                <MailIcon
                  size={20}
                  className="mr-3 flex-shrink-0 text-[#ffbe00]
"
                />
                <span>info@3gconsultants.lk</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>
      <div className="relative border-t border-[#ffbe00]">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
            className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm"
          >
            <p>
              © {new Date().getFullYear()} 3G Consultants (Pvt) Ltd. All rights
              reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
