import React from "react";
import { Badge } from "@/components/ui/Badge";
import { ExcelFormulaTester } from "@/components/labs/ExcelFormulaTester";

export default function ExcelAnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <Badge variant="cyan" size="md">
          Spreadsheet Modeling & Advanced Formulas
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 font-sans tracking-tight">
          Excel Analytics <span className="text-gradient">Laboratory</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
          Test practical spreadsheet examples using XLOOKUP, SUMIFS, dynamic arrays, IFERROR, and pivot-table logic.
        </p>
      </div>

      {/* Interactive Excel Tester Component */}
      <ExcelFormulaTester />
    </div>
  );
}
