import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserIcon, MailIcon, PhoneIcon, BuildingIcon, KeyIcon, CameraIcon, XIcon } from 'lucide-react';
interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState<{
    fullName: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    avatar: string | File;
    avatarPreview: string;
  }>({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    department: 'Project Management',
    position: 'Senior Project Manager',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    avatar: '',
    avatarPreview: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff'
  });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: file,
          avatarPreview: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
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
      }} className="relative z-50 w-full max-w-lg rounded-lg bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-medium">User Profile</h3>
            <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
              <XIcon size={20} />
            </button>
          </div>
          {/* Content */}
          <div className="p-6">
            {/* Avatar Section */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={formData.avatarPreview} alt="Profile" className="h-24 w-24 rounded-full object-cover" />
                <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-white p-2 shadow-md hover:bg-gray-50">
                  <CameraIcon size={16} className="text-gray-600" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              </div>
            </div>
            {/* Tabs */}
            <div className="mb-6 flex border-b border-gray-200">
              <button className={`pb-2 px-4 ${activeTab === 'profile' ? 'border-b-2 border-[#f1c233] text-[#f1c233]' : 'text-gray-500'}`} onClick={() => setActiveTab('profile')}>
                Profile Details
              </button>
              <button className={`pb-2 px-4 ${activeTab === 'password' ? 'border-b-2 border-[#f1c233] text-[#f1c233]' : 'text-gray-500'}`} onClick={() => setActiveTab('password')}>
                Change Password
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {activeTab === 'profile' ? <div className="space-y-4">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <UserIcon size={16} className="mr-2" />
                      Full Name
                    </label>
                    <input type="text" value={formData.fullName} onChange={e => setFormData(prev => ({
                  ...prev,
                  fullName: e.target.value
                }))} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#f1c233] focus:outline-none focus:ring-1 focus:ring-[#f1c233]" />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <MailIcon size={16} className="mr-2" />
                      Email
                    </label>
                    <input type="email" value={formData.email} onChange={e => setFormData(prev => ({
                  ...prev,
                  email: e.target.value
                }))} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#f1c233] focus:outline-none focus:ring-1 focus:ring-[#f1c233]" />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <PhoneIcon size={16} className="mr-2" />
                      Phone
                    </label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData(prev => ({
                  ...prev,
                  phone: e.target.value
                }))} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#f1c233] focus:outline-none focus:ring-1 focus:ring-[#f1c233]" />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <BuildingIcon size={16} className="mr-2" />
                      Department
                    </label>
                    <input type="text" value={formData.department} onChange={e => setFormData(prev => ({
                  ...prev,
                  department: e.target.value
                }))} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#f1c233] focus:outline-none focus:ring-1 focus:ring-[#f1c233]" />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <UserIcon size={16} className="mr-2" />
                      Position
                    </label>
                    <input type="text" value={formData.position} onChange={e => setFormData(prev => ({
                  ...prev,
                  position: e.target.value
                }))} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#f1c233] focus:outline-none focus:ring-1 focus:ring-[#f1c233]" />
                  </div>
                </div> : <div className="space-y-4">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <KeyIcon size={16} className="mr-2" />
                      Current Password
                    </label>
                    <input type="password" value={formData.currentPassword} onChange={e => setFormData(prev => ({
                  ...prev,
                  currentPassword: e.target.value
                }))} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#f1c233] focus:outline-none focus:ring-1 focus:ring-[#f1c233]" />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <KeyIcon size={16} className="mr-2" />
                      New Password
                    </label>
                    <input type="password" value={formData.newPassword} onChange={e => setFormData(prev => ({
                  ...prev,
                  newPassword: e.target.value
                }))} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#f1c233] focus:outline-none focus:ring-1 focus:ring-[#f1c233]" />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <KeyIcon size={16} className="mr-2" />
                      Confirm New Password
                    </label>
                    <input type="password" value={formData.confirmPassword} onChange={e => setFormData(prev => ({
                  ...prev,
                  confirmPassword: e.target.value
                }))} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#f1c233] focus:outline-none focus:ring-1 focus:ring-[#f1c233]" />
                  </div>
                </div>}
              <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="rounded-md bg-[#f1c233] px-4 py-2 text-sm font-medium text-white hover:bg-[#f1c233]/90">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>;
};