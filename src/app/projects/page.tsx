"use client";
import React, { useMemo, useState } from "react";
import SectionTitle from "../Components/ui/SectionTitle";
import { motion } from "framer-motion";
import { useProjects } from "../hooks/useProjects";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import { Project } from "@prisma/client";
const projectCategories = ["All", "Planning", "Ongoing", "Completed"];
const ProjectCard = ({ project }: { project: Project }) => {
  const normalizeStatus = (status: string) => {
    status = status.toLowerCase().replace(/\s+/g, "");
    return status === "inprogress" ? "ongoing" : status;
  };
  return (
    <motion.div
      className="relative group bg-black overflow-hidden rounded-xl cursor-pointer"
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
      whileHover={{
        scale: 1.02,
      }}
    >
      <div className="relative aspect-[4/3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${project.images[0]?.image_name}`}
          alt={project.project_name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300" />
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <span
                className={`inline-block text-sm font-medium px-3 py-1 rounded-full transition-transform duration-300 group-hover:-translate-y-1 ${
                  project.status === "Planning"
                    ? "bg-blue-500/90 text-white"
                    : project.status.toLowerCase() === "inprogress" ||
                      project.status === "Ongoing"
                    ? "bg-[#ffbe00]/90 text-black capitalize"
                    : "bg-green-500/90 text-white capitalize"
                }`}
              >
                {normalizeStatus(project.status)}
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2 transform transition-all duration-300 group-hover:translate-y-[-10px]">
              {project.project_name}
            </h3>
          </div>
        </div>
        <div className="absolute inset-0 bg-[#ffbe00] p-6 flex flex-col justify-between translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold text-black">
                {project.project_name}
              </h3>
            </div>
            <span className="text-sm font-medium text-black/80">
              {new Date(project.start_date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              {project.end_date &&
                ` - ${new Date(project.end_date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}`}
            </span>
            <br />
            <br />
            <p className="text-black/80 text-sm leading-relaxed line-clamp-4">
              {project.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="text-sm font-semibold text-black mb-1">
                Location
              </h4>
              <p className="text-black/80 text-sm">{project.location}</p>
            </div>
            {/* <div>
              <h4 className="text-sm font-semibold text-black mb-1">
                Budget (LKR)
              </h4>
              <p className="text-black/80 text-sm">{project.budget || "N/A"}</p>
            </div>*/}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
const ProjectsPage = () => {
  const { projects, loading, error } = useProjects();
  const [activeCategory, setActiveCategory] = useState("All");
  const normalizeStatus = (status: string) => {
    status = status.toLowerCase().replace(/\s+/g, "");
    return status === "inprogress" ? "ongoing" : status;
  };
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const status = project.status.toLowerCase();
        return !status.includes("on_hold") && !status.includes("on hold");
      })
      .filter((project) =>
        activeCategory === "All"
          ? true
          : normalizeStatus(project.status) === normalizeStatus(activeCategory)
      );
  }, [projects, activeCategory]);
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-xl text-[#ffbe00]">Loading projects...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-xl text-red">
          Error loading projects: {error.message}
        </div>
      </div>
    );
  }
  return (
    <>
      <Header />
      <div className="w-full">
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
              Our Projects
            </h1>
            <p className="text-xl max-w-3xl">
              Explore our portfolio of completed and ongoing projects across
              various sectors.
            </p>
          </div>
        </section>
        <section className="py-16 bg-[#f5f5f5]">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Project Portfolio"
              subtitle="Browse our diverse range of projects showcasing our expertise and innovation."
              centered={true}
            />
            <div className="flex flex-wrap justify-center mb-12 gap-2">
              {projectCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full transition-colors duration-200 ${
                    activeCategory === category
                      ? "bg-[#ffbe00] text-black"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
export default ProjectsPage;
