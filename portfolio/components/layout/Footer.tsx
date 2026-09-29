import React from "react";

export const Footer: React.FC = () => (
  <footer
    className="w-full border-t-2 border-solid py-8 px-6 text-center font-mono text-xs font-medium sm:text-sm"
    style={{
      backgroundColor: "var(--bg-surface)",
      borderColor: "var(--border-color)",
      color: "var(--text-secondary)",
    }}
  >
    <span>&copy; {new Date().getFullYear()} Maragathalakshmi B</span>
  </footer>
);
