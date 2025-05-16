"use client";
import React from "react";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import HeroSection from "@/app/Components/home/HeroSection";
import ServicesSection from "@/app/Components/home/ServicesSection";
import FeaturedProjects from "@/app/Components/home/FeaturedProjects";
import AboutPreview from "@/app/Components/home/AboutPreview";
import TestimonialsSection from "@/app/Components/home/TestimonialsSection";
import CtaSection from "@/app/Components/home/CtaSection";
import NewsPreviewSection from "@/app/Components/home/NewsPreviewSection";
import EventsPreviewSection from "@/app/Components/home/EventsPreviewSection";
/*const metadata = {
  title: "3G Consultants | Engineering Excellence",
  description:
    "Engineering Excellence for Tomorrow's World. 3G Consultants delivers innovative engineering solutions with precision, expertise, and sustainable practices.",
};*/
export default function HomePage() {
  return (
    <div className="w-full">
      <Header />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="about">
        <AboutPreview />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="projects">
        <FeaturedProjects />
      </div>
      <div id="news">
        <NewsPreviewSection />
      </div>
      {/* <div id="testimonials">
        <TestimonialsSection />
      </div> */}
      <div id="contact">
        <CtaSection />
      </div>
      <Footer />
    </div>
  );
}
