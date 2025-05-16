"use client";
import React from "react";
import SectionTitle from "../Components/ui/SectionTitle";
import { CalendarIcon } from "lucide-react";
import { useNews } from "../hooks/useNews";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "upcoming":
      return "bg-yellow-100 text-yellow-800";
    case "active":
      return "bg-green-100 text-green-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
};
const NewsPage = () => {
  const { news, loading, error } = useNews();
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading news...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">
          Error loading news: {error.message}
        </div>
      </div>
    );
  }
  const publishedNews = news.filter((item) => item.status === "published");
  return (
    <>
      <Header />
      <div className="w-full">
        <section className="relative bg-black text-white py-24">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              News & Updates
            </h1>
            <p className="text-xl max-w-3xl">
              Stay informed about our latest projects, achievements, and
              industry insights.
            </p>
          </div>
        </section>
        <section className="py-16 bg-[#f5f5f5]">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Latest News"
              subtitle="Keep up with our recent developments and industry insights."
              centered={true}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedNews.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${article.images}`}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                          "active"
                        )}`}
                      >
                        active
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {article.title}
                    </h3>
                    <div className="mb-4">
                      <div className="flex items-center text-gray-600">
                        <CalendarIcon
                          size={16}
                          className="mr-2 text-yellow-500"
                        />
                        <span>
                          {new Date(article.createTime).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
export default NewsPage;
