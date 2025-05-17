import React from "react";
interface BrandTextProps {
  className?: string;
}
const BrandText: React.FC<BrandTextProps> = ({ className = "" }) => {
  return (
    <span className={`bodoni-font font-bold ${className}`}>3G Consultants</span>
  );
};
export default BrandText;
