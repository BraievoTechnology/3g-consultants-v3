"use client";
import React from "react";

import SectionTitle from "../Components/ui/SectionTitle";
import Button from "../Components/ui/Button";
import {
  BuildingIcon,
  DropletIcon,
  LeafIcon,
  BriefcaseIcon,
  MapIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
const services = [
  {
    id: "procurement",
    title: "Procurement and Contracts",
    description:
      "Procurement involves making buying decisions under scarcity. Whereas, in order to secure and make the project a reality, it is vital to have a proper contract between parties. A contract is a legally binding agreement between at least two parties that defines and governs the rights and obligations of the two or many parties involved. A contract is legally enforceable since it fulfils the requirements and approval of the law. A sound Contract Administration will create a path to deliver the project to a definite success.",
    icon: <BriefcaseIcon size={48} className="text-yellow-500" />,
    link: "/services/procurement",
    image:
      "https://uploadthingy.s3.us-west-1.amazonaws.com/rmu9AdGC9E2rcS1QUJfteR/1.jpg",
  },
  {
    id: "highways",
    title: "Highways and Transportation Engineering",
    description:
      "Sri Lanka, been a developing country that has initiated many infrastructure developments projects, mainly in urban and rural road development projects together with other supportive infrastructure development projects such as earthwork & paving, electrification, landscaping, widening, up-gradation and drainage and beyond. This has created many opportunities for our firm to demonstrate our talent in recent Highways and Transportation projects.",
    icon: <div size={48} className="text-yellow-500" />,
    link: "/services/highways",
    image:
      "https://uploadthingy.s3.us-west-1.amazonaws.com/4uSRqgPmWzgHjbBK4u28DW/2.jpg",
  },
  {
    id: "water",
    title: "Water Resources Engineering",
    description:
      "It’s said that “Water is more precious than gold”. We at 3G Consultants (Pvt) Ltd. has always highly valued the conservation of natural resources such as water. Sustainable management of water resources has been a key concern of 3G Consultants (Pvt) Ltd. since the beginnings and has always been one of our focused areas of solution delivery thanks to the importance we have placed on Water Resource Engineering. Therefore, we always adhere and respect the international standards and regulations when it comes to water resource engineering.",
    icon: <DropletIcon size={48} className="text-yellow-500" />,
    link: "/services/water",
    image:
      "https://uploadthingy.s3.us-west-1.amazonaws.com/7qW7tVknySk7LQaiogGRZJ/3.jpg",
  },
  {
    id: "environmental",
    title: "Environmental and Climate Resilience Engineering",
    description:
      "Sri Lanka is an island nation, exhibiting remarkable biological diversity and considered to be the richest country in the Asian region in terms of species concentration. Ecological, climatic, soil and topographical variability across the country provides favourable conditions for many types of species of flora and fauna in most localities. We at 3G Consultants (Pvt) Ltd., believe that it’s our responsibility to protect the environment and we have always cherished the idea of sustainable development and conservation of the environment.",
    icon: <LeafIcon size={48} className="text-yellow-500" />,
    link: "/services/environmental",
    image:
      "https://uploadthingy.s3.us-west-1.amazonaws.com/paBfbAoUK3DgL22hJspd68/4.jpg",
  },
  {
    id: "urban",
    title: "Urban, Rural and Regional Development",
    description:
      "With the ever-increasing population and need of enhancing living standards, there are many Urban, Rural, and Regional development projects launched to support major developments in the country. When it comes to such projects, it’s not only crucial but also timely to consider the need for future expansion. We believe that a well-planned innovative design plays a pivotal role in such urban development projects.",
    icon: <MapIcon size={48} className="text-yellow-500" />,
    link: "/services/urban",
    image:
      "https://uploadthingy.s3.us-west-1.amazonaws.com/7Xj1Fs74eA2FTDKyEzdC1n/5.jpg",
  },
  {
    id: "housing",
    title: "Commercial and Housing Development",
    description:
      "It’s become a trend in most of the developing countries to imitate the western world by acquiring modern living standards with modern architectural features and latest technologies such as luxury housing developments, educational cities, IT parks, condominiums, waterfront developments, iconic buildings, luxury hotels, high rise buildings, townships, luxury Villas and more.",
    icon: <BuildingIcon size={48} className="text-yellow-500" />,
    link: "/services/housing",
    image:
      "https://uploadthingy.s3.us-west-1.amazonaws.com/tP7WEaVdh371WvA6QJsycM/6.jpg",
  },
];
const ServicesPage = () => {
  return (
    <>
      <Header />
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative bg-black text-white py-24">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
            }}
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl max-w-3xl">
              Comprehensive construction and engineering solutions tailored to
              meet your specific project needs.
            </p>
          </div>
        </section>
        {/* Services Overview */}
        <section className="py-16 bg-[#f5f5f5] relative overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, rgba(241, 194, 53, 0.08) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(241, 194, 53, 0.08) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, rgba(241, 194, 53, 0.08) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <SectionTitle
              title="What We Offer"
              subtitle="BuildConstruct provides a wide range of services across the construction and engineering spectrum."
              className="text-white [&>div>p]:text-black"
            />
            <div className="space-y-16">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="flex items-center mb-6">
                      {service.icon}
                      <h2 className="text-3xl font-bold text-[#f1c235] ml-4">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-black">{service.description}</p>
                  </div>
                  <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="rounded-lg shadow-lg w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-16 bg-[#f1c235]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-black mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-lg text-black mb-8 max-w-2xl mx-auto">
              Our team of experts can develop a tailored approach to meet your
              specific project requirements.
            </p>
            <Button to="/contactpage" variant="secondary">
              Contact Us for a Consultation
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
export default ServicesPage;
