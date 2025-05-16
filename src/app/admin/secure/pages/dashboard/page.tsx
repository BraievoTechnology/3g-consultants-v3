"use client";
import "tailwindcss";
import {
  NewspaperIcon,
  FolderIcon,
  CalendarIcon,
  BriefcaseIcon,
  PlusIcon,
  Loader2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DashboardSummary,
  summaryService,
} from "@/app/admin/secure/services/summary";
import { PageTransition } from "@/app/admin/secure/components/UI/PageTransition";
import { StatsCard } from "@/app/admin/secure/components/UI/StatsCard";
import { ActionButton } from "@/app/admin/secure/components/UI/ActionButton";
import { ActivityItem } from "@/app/admin/secure/components/UI/ActivityItem";
import { ContentCard } from "@/app/admin/secure/components/UI/ContentCard";
import {
  popularContentData,
  recentActivityData,
} from "@/app/admin/secure/data/mockData";
import { router } from "next/client";

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [summaryData, setSummaryData] = useState<DashboardSummary | null>(null);
  useEffect(() => {
    fetchSummaryData();
  }, []);
  const fetchSummaryData = async () => {
    try {
      const data = await summaryService.getDashboardSummary();
      setSummaryData(data);
    } catch (error) {
      console.error("Failed to fetch summary data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "newspaper":
        return <NewspaperIcon size={24} className="text-blue-600" />;
      case "folder":
        return <FolderIcon size={24} className="text-green-600" />;
      case "calendar":
        return <CalendarIcon size={24} className="text-yellow-600" />;
      case "briefcase":
        return <BriefcaseIcon size={24} className="text-purple-600" />;
      default:
        return <PlusIcon size={24} />;
    }
  };
  const statsCards = [
    {
      id: 1,
      title: "News Articles",
      value: summaryData?.totalNewsFeeds || 0,
      icon: "newspaper",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Active Projects",
      value: summaryData?.totalProjects || 0,
      icon: "folder",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      title: "Company Events",
      value: summaryData?.totalEvents || 0,
      icon: "calendar",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 4,
      title: "Job Applications",
      value: summaryData?.totalJobApplications || 0,
      icon: "briefcase",
      color: "bg-purple-100 text-purple-600",
    },
  ];
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2Icon className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }
  return (
    <PageTransition>
      <div className="px-4 py-10 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {statsCards.map((stat, index) => (
            <StatsCard
              key={stat.id}
              icon={getIconComponent(stat.icon)}
              title={stat.title}
              value={stat.value}
              color={stat.color}
              delay={0.1 * index}
            />
          ))}
        </div>
        {/* <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <ActionButton
                  icon={<NewspaperIcon size={20} className="text-blue-600" />}
                  label="Add News"
                  color="bg-blue-50 hover:bg-blue-100 text-blue-600"
                  onClick={() => router.push("/news-feed")}
                  delay={0.1}
                />
                <ActionButton
                  icon={<FolderIcon size={20} className="text-green-600" />}
                  label="New Project"
                  color="bg-green-50 hover:bg-green-100 text-green-600"
                  onClick={() => router.push("/projects")}
                  delay={0.2}
                />
                <ActionButton
                  icon={<CalendarIcon size={20} className="text-yellow-600" />}
                  label="Add Event"
                  color="bg-yellow-50 hover:bg-yellow-100 text-yellow-600"
                  onClick={() => router.push("/company-events")}
                  delay={0.3}
                />
                <ActionButton
                  icon={<BriefcaseIcon size={20} className="text-purple-600" />}
                  label="Post Job"
                  color="bg-purple-50 hover:bg-purple-100 text-purple-600"
                  onClick={() => router.push("/job-opportunities")}
                  delay={0.4}
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Recent Activity</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {recentActivityData.map((activity, index) => (
                  <ActivityItem
                    key={activity.id}
                    title={activity.title}
                    category={activity.category}
                    categoryColor={activity.categoryColor}
                    time={activity.time}
                    index={index}
                  />
                ))}
              </div>
              <div className="mt-4 text-center">
                <button className="text-blue-600 text-sm hover:underline flex items-center justify-center mx-auto">
                  View all activity
                  <svg
                    className="h-4 w-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Popular Content</h2>
              </div>
              <div>
                {popularContentData.map((content, index) => (
                  <ContentCard
                    key={content.id}
                    title={content.title}
                    category={content.category}
                    views={content.views}
                    index={index}
                  />
                ))}
              </div>
              <div className="mt-4 text-right">
                <button className="text-blue-600 text-sm hover:underline flex items-center justify-end">
                  View analytics
                  <svg
                    className="h-4 w-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </PageTransition>
  );
};
export default Dashboard;
