"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BuildingIcon,
  DropletIcon,
  LeafIcon,
  BuildingIcon as UrbanIcon,
  MapIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
const services = [
  {
    id: "procurement",
    title: "Procurement and Contracts",
    subtitle:
      "Procurement involves making purchasing decisions under conditions of scarcity. To ensure project success, a legally binding contract is essential, as it defines the rights and obligations of all parties involved. Effective Contract Administration is key to successfully delivering the project.",
    icon: <BuildingIcon className="w-8 h-8 text-black" />,
    link: "/servicespage/#procurement",
    image: "/assets/staticimages/1.jpg",
  },
  {
    id: "highways",
    title: "Highways and Transportation Engineering",
    subtitle:
      "Sri Lanka's ongoing infrastructure developments, particularly in roads and related works, have opened up valuable opportunities for the firm to demonstrate its expertise in recent Highways and Transportation projects.",
    icon: <MapIcon className="w-8 h-8 text-black" />,
    link: "/servicespage/#highways",
    image: "/assets/staticimages/2.jpg",
  },
  {
    id: "water",
    title: "Water Resources Engineering",
    subtitle:
      "3G Consultants (Pvt) Ltd. places high importance on water conservation and has consistently focused on sustainable water resource management, strictly following international standards in Water Resource Engineering.",
    icon: <DropletIcon className="w-8 h-8 text-black" />,
    link: "/servicespage/#water",
    image: "/assets/staticimages/3.jpg",
  },
  {
    id: "environmental",
    title: "Environmental and Climate Resilience Engineering",
    subtitle:
      "Sri Lanka, known for its rich biodiversity, offers ideal conditions for diverse flora and fauna. 3G Consultants (Pvt) Ltd. is committed to environmental protection and strongly values sustainable development and conservation.",
    icon: <LeafIcon className="w-8 h-8 text-black" />,
    link: "/servicespage/#environmental",
    image: "/assets/staticimages/4.jpg",
  },
  {
    id: "urban",
    title: "Urban, Rural and Regional Development",
    subtitle:
      "To meet the growing population and rising living standards, numerous Urban, Rural, and Regional development projects are being initiated. 3G Consultants (Pvt) Ltd. believes that well-planned, innovative design is essential for these projects, especially when considering future expansion needs.",
    icon: <MapIcon className="w-8 h-8 text-black" />,
    link: "/servicespage/#urban",
    image: "/assets/staticimages/5.jpg",
  },
  {
    id: "housing",
    title: "Commercial and Housing Development",
    subtitle:
      "In many developing countries, there is a growing trend to adopt modern living standards by embracing Western-inspired architectural styles and advanced technologies, seen in developments like luxury housing, IT parks, educational cities, waterfronts, high-rise buildings, and iconic structures.",
    icon: <UrbanIcon className="w-8 h-8 text-black" />,
    link: "/servicespage/#housing",
    image: "/assets/staticimages/6.jpg",
  },
];
const ServiceIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="mb-4 p-3 bg-[#ffbe00] rounded-lg w-fit"
      whileHover={{
        scale: 1.1,
        rotate: [0, -10, 10, -10, 10, 0],
        transition: {
          rotate: {
            duration: 0.5,
            ease: "easeInOut",
          },
        },
      }}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {children}
    </motion.div>
  );
};
const ServiceCard = ({ service }: { service: (typeof services)[0] }) => {
  return (
    <motion.div
      className="group relative flex-1 min-w-[200px] transition-all duration-500 rounded-none hover:rounded-[20px] overflow-hidden hover:flex-[1.5]"
      initial={{
        scale: 0.95,
      }}
      whileHover={{
        scale: 1,
      }}
      transition={{
        scale: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      style={{
        perspective: "1000px",
      }}
    >
      <Link href={service.link} className="block h-full">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${service.image})`,
            transformStyle: "preserve-3d",
          }}
          initial={{
            scale: 1,
          }}
          whileHover={{
            scale: [1, 1.3, 1.2],
          }}
          transition={{
            scale: {
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
        />
        <motion.div
          className="absolute inset-0"
          initial={{
            opacity: 0.7,
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.2) 80%, rgba(0, 0, 0, 0) 100%)",
          }}
          whileHover={{
            opacity: 0.9,
          }}
          transition={{
            duration: 0.3,
          }}
        />
        <div className="relative h-full p-6 md:p-8 flex flex-col justify-between z-10">
          <div className="text-white h-full flex flex-col">
            <ServiceIcon>{service.icon}</ServiceIcon>
            <div className="flex-grow flex items-start justify-center mt-[200px]">
              <h3 className="text-xl md:text-2xl font-bold text-center text-white">
                {service.title}
              </h3>
            </div>
          </div>
          <motion.div
            className="flex items-center text-[#ffbe00] font-medium text-xl "
            initial={{
              x: 0,
            }}
            whileHover={{
              x: 5,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            Learn more
            <motion.span
              className="ml-2"
              initial={{
                x: 0,
              }}
              whileHover={{
                x: 5,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              →
            </motion.span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};
const MobileServiceCard = ({
  service,
  isActive,
}: {
  service: (typeof services)[0];
  isActive: boolean;
}) => {
  return (
    <motion.div
      className={`absolute inset-0 w-full h-full ${isActive ? "z-20" : "z-10"}`}
      initial={{
        opacity: 0,
        x: 100,
      }}
      animate={{
        opacity: isActive ? 1 : 0,
        x: isActive ? 0 : -100,
      }}
      exit={{
        opacity: 0,
        x: -100,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <div className="relative h-full">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${service.image})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/90" />
        <div className="relative h-full p-6 pb-28 md:pb-6 flex flex-col justify-end z-10">
          <ServiceIcon>{service.icon}</ServiceIcon>
          <h3 className="text-2xl font-bold text-white mb-4">
            {service.title}
          </h3>
          <p className="text-white/90 mb-6 text-sm line-clamp-3">
            {service.subtitle}
          </p>
          <Link
            href={service.link}
            className="inline-flex items-center text-yellow-400 font-medium"
          >
            Learn more
            <ChevronRightIcon size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
const ServicesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };
  const [touchStart, setTouchStart] = useState(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };
  return (
    <section
      className="relative h-screen w-full overflow-hidden flex flex-col items-center"
      style={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <SectionTitle
        title="Our Services"
        subtitle="Explore our comprehensive range of engineering and construction solutions"
        centered={true}
      />
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(241, 194, 53, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(241, 194, 53, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(241, 194, 53, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, rgba(241, 194, 53, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(241, 194, 53, 0.08) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {isMobile ? (
        <div
          className="relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <MobileServiceCard
              key={currentSlide}
              service={services[currentSlide]}
              isActive={true}
            />
          </AnimatePresence>
          <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center items-center gap-4">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeftIcon size={24} />
            </button>
            <div className="flex gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-yellow-500" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRightIcon size={24} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-nowrap h-[80vh] w-full">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </section>
  );
};
export default ServicesSection;
