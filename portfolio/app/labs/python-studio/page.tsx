import React from "react";
import { Badge } from "@/components/ui/Badge";
import { PythonNotebook } from "@/components/labs/PythonNotebook";

export default function PythonStudioPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <Badge variant="cyan" size="md">
          Exploratory Data Analysis Environment
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 font-sans tracking-tight">
          Python Analytics <span className="text-gradient">Studio</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
          Step through a Jupyter-style analysis covering Pandas data preparation, summary statistics, correlation checks, and charting.
        </p>
      </div>

      {/* Interactive Python Notebook Component */}
      <PythonNotebook />
    </div>
  );
}
