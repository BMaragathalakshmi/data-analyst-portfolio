import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyan";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  className,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    primary: "bg-[#c2593f] text-white font-semibold hover:bg-[#a84830] border border-[#c2593f] shadow-sm",
    cyan: "bg-[#2d5a4a] text-white font-semibold hover:bg-[#23473a] border border-[#2d5a4a]",
    secondary: "bg-[#eee6d8] text-[#1e2422] hover:bg-[#eae1d2] border border-[#d8cdbe]",
    outline: "bg-transparent text-[#1e2422] border border-[#d8cdbe] hover:bg-[#eee6d8]",
    ghost: "bg-transparent text-[#4a5550] hover:text-[#1e2422] hover:bg-[#eee6d8]/60",
  };

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-xs font-semibold px-4 py-2 gap-2",
    lg: "text-sm font-semibold px-5 py-2.5 gap-2",
  };

  const combinedClassName = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
