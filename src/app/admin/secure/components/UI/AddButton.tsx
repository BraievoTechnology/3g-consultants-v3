import React from 'react';
import { PlusIcon } from 'lucide-react';
interface AddButtonProps {
  label: string;
  onClick: () => void;
}
export const AddButton: React.FC<AddButtonProps> = ({
  label,
  onClick
}) => {
  return <button className="flex items-center px-4 py-2 bg-gray-50 text-[#f1c233] border-2 border-[#f1c233] rounded-md hover:bg-[#f1c233] hover:text-white transition-colors" onClick={onClick}>
      <PlusIcon size={18} className="mr-1" />
      <span>{label}</span>
    </button>;
};