import React from "react";
import { Badge } from "@/components/ui/Badge";
import { CsvUploader } from "@/components/labs/CsvUploader";

export default function DataCleaningLabPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <Badge variant="cyan" size="md">
          Interactive Data Quality Laboratory
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 font-sans tracking-tight">
          Data Cleaning & <span className="text-gradient">Quality Auditor</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
          Upload any CSV file or load our preloaded dirty sales dataset to inspect automated null detection, deduplication, string trimming, median imputation, and before/after quality diffs.
        </p>
      </div>

      {/* Interactive Uploader & Auditor Component */}
      <CsvUploader />
    </div>
  );
}
