"use client";
import React from "react";

import { motion } from "framer-motion";

import SectionTitle from "@/app/Components/ui/SectionTitle";
import Button from "@/app/Components/ui/Button";
import { useNews } from "@/app/hooks/useNews";
const NewsPreviewSection = () => {
  const { news, loading, error } = useNews();
  if (loading) {
    return (
      <section className="py-20 bg-[#f5f5f5] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">Loading news...</div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="py-20 bg-[#f5f5f5] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            Error loading news: {error.message}
          </div>
        </div>
      </section>
    );
  }
  const latestNews = news
    .filter((item) => item.status === "published")
    .slice(0, 3);
  return (
    <section id="news" className="py-20 bg-[#f5f5f5] relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(241, 194, 53, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(241, 194, 53, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, rgba(241, 194, 53, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(241, 194, 53, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(241, 194, 53, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          title="Latest News & Updates"
          subtitle="Stay informed about our latest projects and industry insights"
          centered={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {latestNews.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{
                once: true,
              }}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  src={`${article.images}`}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#f1c235] mb-3 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.summary}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Button to="/newspage" variant="primary">
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
};
export default NewsPreviewSection;
