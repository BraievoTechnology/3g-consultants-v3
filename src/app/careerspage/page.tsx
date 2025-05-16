"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  SearchIcon,
  MapPinIcon,
  ClockIcon,
  HeartIcon,
  GraduationCapIcon,
  UsersIcon,
  TrendingUpIcon,
} from "lucide-react";
import SectionTitle from "../Components/ui/SectionTitle";
import Button from "../Components/ui/Button";
import { useJobs } from "../hooks/useJobs";
import { Job } from "@/app/types/job";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
const employmentTypes = [
  "All",
  "Full Time",
  "Part Time",
  "Contract",
  "Internship",
];
const normalizeEmploymentType = (type: string): string => {
  const normalized = type.replace(/\s+/g, "").toUpperCase();
  switch (normalized) {
    case "FULLTIME":
      return "Full Time";
    case "PARTTIME":
      return "Part Time";
    case "CONTRACT":
      return "Contract";
    case "INTERNSHIP":
      return "Internship";
    default:
      return type;
  }
};
const benefits = [
  {
    icon: <HeartIcon className="w-6 h-6" />,
    title: "Health & Wellness",
    description:
      "Comprehensive medical, dental, and vision coverage for you and your family",
  },
  {
    icon: <GraduationCapIcon className="w-6 h-6" />,
    title: "Learning & Development",
    description: "Professional development programs and certification support",
  },
  {
    icon: <UsersIcon className="w-6 h-6" />,
    title: "Work-Life Balance",
    description: "Flexible working hours and paid time off",
  },
  {
    icon: <TrendingUpIcon className="w-6 h-6" />,
    title: "Career Growth",
    description: "Clear career progression paths and mentorship opportunities",
  },
];
const CareersPage = () => {
  const { jobs, loading, error } = useJobs();
  const [activeEmploymentType, setActiveEmploymentType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  useEffect(() => {
    const filtered = jobs
      .filter((job) => job.status === "ACTIVE")
      .filter((job) => {
        const matchesEmploymentType =
          activeEmploymentType === "All" ||
          normalizeEmploymentType(job.employment_type) === activeEmploymentType;
        const matchesSearch = job.job_title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesEmploymentType && matchesSearch;
      });
    setFilteredJobs(filtered);
  }, [activeEmploymentType, searchQuery, jobs]);
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black">
        <div className="text-xl text-[#f1c235]">
          Loading job opportunities...
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black">
        <div className="text-xl text-red-500">
          Error loading jobs: {error.message}
        </div>
      </div>
    );
  }
  return (
    <>
      <Header />
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative bg-black text-white py-24">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Join Our Team
              </h1>
              <p className="text-xl max-w-3xl">
                Build your career with a company that values innovation,
                sustainability, and excellence in engineering and construction.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Job Search Section */}
        <section className="py-16 bg-[#f5f5f5]">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Current Opportunities"
              subtitle="Explore our open positions and find your perfect role"
              centered={true}
            />
            <div className="mb-8">
              <div className="relative max-w-md mx-auto mb-8">
                <input
                  type="text"
                  placeholder="Search positions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-[#f1c235]"
                />
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#f1c235] mb-2">
                  Employment Type
                </h3>
                <div className="flex flex-wrap gap-2">
                  {employmentTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveEmploymentType(type)}
                      className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                        activeEmploymentType === type
                          ? "bg-yellow-500 text-black"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="flex-grow mb-4 md:mb-0 md:mr-8">
                      <h3 className="text-xl font-bold text-[#f1c235] mb-2">
                        {job.job_title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <BriefcaseIcon
                            size={16}
                            className="mr-2 text-yellow-500"
                          />
                          {job.department}
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon
                            size={16}
                            className="mr-2 text-yellow-500"
                          />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <ClockIcon
                            size={16}
                            className="mr-2 text-yellow-500"
                          />
                          {job.employment_type}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {job.job_description}
                      </p>
                      <div className="mt-4">
                        <h4 className="font-semibold text-black mb-2">
                          Requirements:
                        </h4>
                        <p className="text-gray-600">{job.requirements}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button
                        to={`/jobapplication/${job.id}`}
                        variant="primary"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {filteredJobs.length === 0 && !loading && (
                <div className="text-center text-white py-8">
                  <p>No open positions match your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-[#f5f5f5]">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Why Work With Us"
              subtitle="Join a team that values your growth and well-being"
              centered={true}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-black rounded-full flex items-center justify-center text-[#f1c235]">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-[#f5f5f5]">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Application Process"
              subtitle="Your journey to joining our team"
              centered={true}
            />
            <div className="max-w-3xl mx-auto mt-12">
              <div className="space-y-8">
                {[
                  "Submit your application with resume and cover letter",
                  "Initial screening and review by our HR team",
                  "Technical assessment and interviews",
                  "Final interview with department leaders",
                  "Job offer and onboarding",
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f1c235] text-black flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <p className="text-black font-medium">{step}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#f1c235] text-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join our team of passionate professionals and help us build a
              better future through innovative engineering and construction
              solutions.
            </p>
            <Button to="/contactpage" variant="secondary">
              Contact Our Recruitment Team
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
export default CareersPage;
