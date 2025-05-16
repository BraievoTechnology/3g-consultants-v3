import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellIcon, NewspaperIcon, FolderIcon, CalendarIcon, BriefcaseIcon, CheckCircleIcon } from 'lucide-react';
interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: string;
  read: boolean;
}
interface NotificationDropdownProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllRead: () => void;
}
export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAllRead
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'news':
        return <NewspaperIcon size={16} className="text-blue-500" />;
      case 'project':
        return <FolderIcon size={16} className="text-green-500" />;
      case 'event':
        return <CalendarIcon size={16} className="text-yellow-500" />;
      case 'job':
        return <BriefcaseIcon size={16} className="text-purple-500" />;
      default:
        return <BellIcon size={16} className="text-gray-500" />;
    }
  };
  const unreadCount = notifications.filter(n => !n.read).length;
  return <AnimatePresence>
      {isOpen && <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: 10
      }} transition={{
        duration: 0.2
      }} className="absolute right-0 top-12 z-50 mt-2 w-80 sm:w-96 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Notifications
                  {unreadCount > 0 && <span className="ml-2 text-sm text-gray-500">
                      ({unreadCount} unread)
                    </span>}
                </h3>
                <button onClick={onMarkAllRead} className="text-sm text-blue-600 hover:text-blue-700">
                  Mark all as read
                </button>
              </div>
              <div className="space-y-3">
                {notifications.map(notification => <div key={notification.id} className={`flex items-start space-x-3 rounded-md p-3 transition-colors ${notification.read ? 'bg-white' : 'bg-blue-50'}`}>
                    <div className="flex-shrink-0">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        {notification.time}
                      </p>
                    </div>
                    {notification.read && <CheckCircleIcon size={16} className="text-gray-400" />}
                  </div>)}
              </div>
              <div className="mt-4 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  View all notifications
                </button>
              </div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
};