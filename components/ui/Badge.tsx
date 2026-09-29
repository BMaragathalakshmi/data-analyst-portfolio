import React from "react";
import { cn } from "@/lib/utils/cn";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "violet" | "cyan" | "emerald" | "amber" | "rose" | "slate" | "sky";
  size?: "sm" | "md" | "lg";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "sky",
  size = "md",
  className,
  ...props
}) => {
  const variantStyles = {
    sky: "bg-[#faebe7] text-[#b84327] border-[#e8c7be]",
    cyan: "bg-[#e5eee9] text-[#244f40] border-[#c0d8cd]",
    violet: "bg-[#f2eaf7] text-[#6b3c82] border-[#d8c5e3]",
    emerald: "bg-[#e7f4ec] text-[#20693a] border-[#bfe2cc]",
    amber: "bg-[#fdf3e2] text-[#9c6310] border-[#f4dbb1]",
    rose: "bg-[#fdeeed] text-[#b32b2b] border-[#f6c3c2]",
    slate: "bg-[#eee6d8] text-[#4a5550] border-[#d8cdbe]",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 rounded",
    md: "text-xs font-mono font-medium px-2.5 py-0.5 rounded-md",
    lg: "text-xs font-mono font-semibold px-3 py-1 rounded-md",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border tracking-tight transition-colors",
        variantStyles[variant] || variantStyles.sky,
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
