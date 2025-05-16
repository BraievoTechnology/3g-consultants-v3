// Sidebar.tsx (or wherever Sidebar component is located)
import React from "react";

// Define the types for the Sidebar props
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
      <div>
        {/* Sidebar implementation */}
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>
      </div>
  );
};

export default Sidebar;
