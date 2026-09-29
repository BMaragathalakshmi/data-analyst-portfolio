import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1px] animate-pulse">
          <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
        </div>
      </div>
      <div className="text-center space-y-1">
        <div className="text-sm font-semibold font-mono text-slate-200">
          Loading Data Pulse Pipeline...
        </div>
        <div className="text-xs font-mono text-slate-400">
          Initializing in-memory analytical schemas
        </div>
      </div>
    </div>
  );
}
