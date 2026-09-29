"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Printer, 
  AlertCircle 
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { INSIGHT_REPORTS, InsightReport } from "@/lib/data/reports-data";

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<InsightReport>(INSIGHT_REPORTS[0]);

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <Badge variant="sky" size="sm">
          Deliverables & Findings
        </Badge>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-sans tracking-tight" style={{ color: "var(--text-primary)" }}>
          Project Reports
        </h1>
        <p className="text-xs sm:text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
          Concise summaries of each business question, the supporting analysis, and the recommended next steps.
        </p>
      </div>

      {/* Reports Tabs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {INSIGHT_REPORTS.map((rep) => (
          <button
            key={rep.id}
            onClick={() => setSelectedReport(rep)}
            className="p-4 rounded-2xl text-left transition-all font-mono border flex flex-col justify-between space-y-2.5 shadow-sm"
            style={{
              backgroundColor: selectedReport.id === rep.id ? "var(--accent-pill-bg)" : "var(--bg-surface)",
              borderColor: selectedReport.id === rep.id ? "var(--accent-primary)" : "var(--border-color)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]" style={{ color: "var(--text-muted)" }}>
                <span>{rep.publishedDate}</span>
                <span>{rep.readTime}</span>
              </div>
              <h3 className="text-xs font-bold line-clamp-2 font-sans" style={{ color: selectedReport.id === rep.id ? "var(--accent-primary)" : "var(--text-primary)" }}>
                {rep.title}
              </h3>
            </div>
            <div className="pt-2 border-t flex items-center justify-between text-[11px] font-bold" style={{ borderColor: "var(--border-color)", color: "var(--accent-primary)" }}>
              <span>View Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        ))}
      </div>

      {/* Active Report Viewer */}
      <div
        className="rounded-2xl border p-6 sm:p-10 space-y-8 shadow-sm"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-color)",
          boxShadow: "var(--card-shadow)",
        }}
      >
        {/* Report Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b" style={{ borderColor: "var(--border-color)" }}>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="sky" size="sm">
                Executive Memo
              </Badge>
              <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                Author: Maragathalakshmi B
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-sans tracking-tight" style={{ color: "var(--text-primary)" }}>
              {selectedReport.title}
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              onClick={handlePrintReport}
              variant="secondary"
              size="sm"
              icon={<Printer className="w-3.5 h-3.5" />}
            >
              Print / Save PDF
            </Button>
            <Button
              href={`/projects/${selectedReport.projectSlug}`}
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View Pipeline
            </Button>
          </div>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {selectedReport.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border font-mono"
              style={{
                backgroundColor: "var(--bg-subtle)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="text-[10px] uppercase" style={{ color: "var(--text-muted)" }}>{m.label}</div>
              <div className="text-xl font-bold mt-0.5" style={{ color: "var(--accent-primary)" }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase font-bold" style={{ color: "var(--accent-primary)" }}>
            1. Executive Summary & Context
          </h3>
          <p
            className="text-xs sm:text-sm font-sans leading-relaxed p-4 rounded-xl border"
            style={{
              backgroundColor: "var(--bg-subtle)",
              borderColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
          >
            {selectedReport.executiveSummary}
          </p>
        </div>

        {/* Business Problem & Methodology */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="p-4 rounded-xl border space-y-1.5"
            style={{
              backgroundColor: "var(--bg-subtle)",
              borderColor: "var(--border-color)",
            }}
          >
            <h4 className="text-xs font-mono uppercase font-bold text-rose-600">
              2. Problem Statement
            </h4>
            <p className="text-xs font-sans leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {selectedReport.businessProblem}
            </p>
          </div>

          <div
            className="p-4 rounded-xl border space-y-1.5"
            style={{
              backgroundColor: "var(--bg-subtle)",
              borderColor: "var(--border-color)",
            }}
          >
            <h4 className="text-xs font-mono uppercase font-bold" style={{ color: "var(--text-primary)" }}>
              3. Data Cleaning Methodology
            </h4>
            <p className="text-xs font-sans leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {selectedReport.cleaningMethodology}
            </p>
          </div>
        </div>

        {/* Analytical Findings */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase font-bold flex items-center gap-1.5 text-[#2d5a4a]">
            <CheckCircle2 className="w-4 h-4" />
            <span>4. Key Analytical Findings</span>
          </h3>
          <div className="space-y-2.5">
            {selectedReport.analyticalFindings.map((finding, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border flex items-start gap-2.5 text-xs font-sans leading-relaxed"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                <span
                  className="w-5 h-5 rounded-md font-mono text-xs flex items-center justify-center shrink-0 font-bold"
                  style={{
                    backgroundColor: "var(--accent-pill-bg)",
                    color: "var(--accent-primary)",
                  }}
                >
                  {idx + 1}
                </span>
                <span>{finding}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Recommendations */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase font-bold flex items-center gap-1.5" style={{ color: "var(--accent-primary)" }}>
            <TrendingUp className="w-4 h-4" />
            <span>5. Actionable Recommendations</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {selectedReport.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border text-xs font-sans leading-relaxed space-y-1.5"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                <span className="font-mono text-[10px] font-bold block" style={{ color: "var(--accent-secondary)" }}>
                  ACTION 0{idx + 1}
                </span>
                <p>{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Limitations */}
        <div
          className="p-4 rounded-xl border space-y-1.5 text-xs font-mono"
          style={{
            backgroundColor: "var(--bg-subtle)",
            borderColor: "var(--border-color)",
            color: "var(--text-secondary)",
          }}
        >
          <div className="text-amber-700 font-bold uppercase flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Limitations</span>
          </div>
          <ul className="space-y-0.5 font-sans text-xs">
            {selectedReport.limitations.map((lim, idx) => (
              <li key={idx}>• {lim}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
