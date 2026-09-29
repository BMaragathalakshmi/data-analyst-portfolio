"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "sql",
  title,
  showLineNumbers = true,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div 
      className={cn("rounded-xl overflow-hidden border shadow-md", className)}
      style={{
        backgroundColor: "#1e2422",
        borderColor: "var(--border-color)",
      }}
    >
      <div 
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{
          backgroundColor: "#161b19",
          borderColor: "#2f3834",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c2593f]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4a373]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#2d5a4a]" />
          </div>
          {title && (
            <div className="flex items-center gap-1.5 ml-2 text-xs font-mono text-slate-300">
              <Terminal className="w-3.5 h-3.5" style={{ color: "#c2593f" }} />
              <span>{title}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span 
            className="text-[11px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded border"
            style={{
              backgroundColor: "rgba(194, 89, 63, 0.15)",
              color: "#f4a28c",
              borderColor: "rgba(194, 89, 63, 0.3)",
            }}
          >
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-800"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-[11px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed max-h-[420px] scrollbar-thin">
        <pre className="flex">
          {showLineNumbers && (
            <div className="select-none pr-4 text-[#5c6d66] text-right font-mono border-r border-[#2f3834] mr-4">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <code className="text-[#f4efe6] flex-1 whitespace-pre">{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
};
