"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const HireMeBadge: React.FC = () => {
  return (
    <div className="fixed left-4 bottom-4 z-40 hidden md:flex items-center justify-center overflow-hidden">
      <div className="w-28 h-28 relative flex items-center justify-center">
        {/* Rotating Circular SVG Text */}
        <svg
          className="w-full h-full animate-spin-slow"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="circlePath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
          />
          <text
            className="text-[9.5px] uppercase font-mono tracking-[2.5px] font-black"
            style={{ fill: "var(--text-secondary)" }}
          >
            <textPath xlinkHref="#circlePath" startOffset="0%">
              • DATA ANALYST • HIRE ME • CONTACT •
            </textPath>
          </text>
        </svg>

        {/* Center Circular Button */}
        <Link
          href="/contact"
          className="absolute w-12 h-12 rounded-full font-bold text-xs flex items-center justify-center hover:scale-110 transition-all shadow-xl font-mono"
          style={{
            backgroundColor: "var(--accent-primary)",
            color: "var(--bg-base)",
          }}
          aria-label="Hire Maragathalakshmi B"
        >
          <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};
