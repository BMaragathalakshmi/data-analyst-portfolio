import React from "react";
import { cn } from "@/lib/utils/cn";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hover" | "subtle" | "active";
  gradientBorder?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", gradientBorder, children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          backgroundColor: variant === "subtle" ? "var(--bg-subtle)" : "var(--bg-surface)",
          borderColor: "var(--border-color)",
          color: "var(--text-primary)",
          boxShadow: "var(--card-shadow)",
          ...style,
        }}
        className={cn(
          "rounded-2xl border transition-all duration-200 backdrop-blur-md",
          variant === "default" && "p-6",
          variant === "hover" && "p-6 hover:border-[#c2593f]/60 hover:-translate-y-0.5",
          variant === "subtle" && "p-5",
          variant === "active" && "border-[#c2593f] ring-1 ring-[#c2593f]/30",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

