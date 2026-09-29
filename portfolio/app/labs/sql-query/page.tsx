import React from "react";
import { Badge } from "@/components/ui/Badge";
import { SqlConsole } from "@/components/labs/SqlConsole";

export default function SqlQueryLabPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <Badge variant="cyan" size="md">
          Live Relational Query Sandbox
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 font-sans tracking-tight">
          SQL Query <span className="text-gradient">Workbench</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
          Execute real analytical SQL against preloaded in-memory SQLite tables (<code className="text-cyan-300">retail_sales</code>, <code className="text-cyan-300">customer_retention</code>, <code className="text-cyan-300">workforce_hr</code>, <code className="text-cyan-300">ecommerce_operations</code>). Test window functions, CTEs, and multidimensional aggregations.
        </p>
      </div>

      {/* Interactive SQL Workbench Component */}
      <SqlConsole />
    </div>
  );
}
