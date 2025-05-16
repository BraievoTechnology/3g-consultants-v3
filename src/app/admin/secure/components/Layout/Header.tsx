"use client";
import React, { useState } from "react";
import { MenuIcon } from "lucide-react";
/*import { NotificationDropdown } from "../UI/NotificationDropdown";
import { notificationsData } from "../../data/mockData";*/
import { UserProfileModal } from "../UI/UserProfileModal";
interface HeaderProps {
  onMenuClick: () => void;
}
export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  /*const location = useLocation();*/
/*  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const handleMarkAllRead = () => {
    setNotifications(
      notifications.map((n) => ({
        ...n,
        read: true,
      }))
    );
  };*/
/*  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("dashboard")) return "Dashboard";
    if (path.includes("news-feed")) return "News Feed";
    if (path.includes("projects")) return "Projects";
    if (path.includes("job-opportunities")) return "Job Opportunities";
    if (path.includes("company-events")) return "Company Events";
    return "Dashboard";
  };*/
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
      <div className="flex items-center">
        <button
          className="mr-3 rounded-md p-1 text-[#f1c233] hover:bg-gray-100 lg:hidden"
          onClick={onMenuClick}
        >
          <MenuIcon size={24} />
        </button>
        <div>
          <h1 className="text-lg font-medium sm:text-xl lg:text-2xl text-[#f1c233]"></h1>
          {/*          <h2 className="text-sm text-gray-500">{getPageTitle()}</h2>*/}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/*        <div className="relative hidden md:block">
          <input type="text" placeholder="Search..." className="w-48 rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-64 xl:w-80" />
          <SearchIcon size={20} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <div className="relative">
          <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="relative rounded-full p-1 hover:bg-gray-100">
            <BellIcon size={24} className="text-gray-600" />
            {unreadCount > 0 && <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount}
              </span>}
          </button>
          <NotificationDropdown notifications={notifications} isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} onMarkAllRead={handleMarkAllRead} />
        </div>*/}
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white hover:bg-blue-600 transition-colors sm:h-10 sm:w-10 sm:text-base"
        >
          JD
        </button>
      </div>
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </header>
  );
};
