"use client"; // required for client-side hooks like usePathname
import React from "react";
import { usePathname } from "next/navigation";
import ButtonV2 from "./ButtonV2";

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  children,
  to,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
      return;
    }

    if (isHome && to?.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(to);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (isHome && to && !to.startsWith("#")) {
      e.preventDefault();
      const sectionId = to.replace("/", "#");
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (to && !isHome) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <ButtonV2
      to={to}
      variant={variant}
      className={className}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </ButtonV2>
  );
};

export default Button;
