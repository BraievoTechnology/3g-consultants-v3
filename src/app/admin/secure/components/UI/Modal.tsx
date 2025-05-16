import React from 'react';
import { XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  if (!isOpen) return null;
  return <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
          {/* Modal */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0.95
        }} className="relative z-50 w-full max-w-[90%] rounded-lg bg-white shadow-xl sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-6">
              <h3 className="text-base font-medium text-black sm:text-lg lg:text-xl">
                {title}
              </h3>
              <button onClick={onClose} className="rounded-full p-1 hover:bg-[#f1c233] transition-colors">
                <XIcon size={20} />
              </button>
            </div>
            {/* Content */}
            <div className="px-4 py-4 sm:px-6 sm:py-6">{children}</div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>;
};