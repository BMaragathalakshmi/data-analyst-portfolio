import React from "react";
import { CheckCircle2, TrendingUp, AlertCircle } from "lucide-react";
import { ProjectData } from "@/lib/types";

interface ProjectSummarySectionProps {
  project: ProjectData;
}

export const ProjectSummarySection: React.FC<ProjectSummarySectionProps> = ({ project }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Key Findings */}
        <div
          className="p-6 rounded-2xl border space-y-4 lg:col-span-2 shadow-sm"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-color)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase" style={{ color: "var(--accent-primary)" }}>
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Analytical Findings</span>
          </div>
          <ul className="space-y-2.5 font-sans text-xs sm:text-sm" style={{ color: "var(--text-primary)" }}>
            {project.keyFindings.map((finding, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl border"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  borderColor: "var(--border-color)",
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
                <span className="leading-relaxed">{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actionable Recommendations */}
        <div
          className="p-6 rounded-2xl border space-y-4 shadow-sm"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-color)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase" style={{ color: "var(--accent-secondary)" }}>
            <TrendingUp className="w-4 h-4" />
            <span>Recommendations</span>
          </div>
          <ul className="space-y-2.5 font-sans text-xs" style={{ color: "var(--text-primary)" }}>
            {project.recommendations.map((rec, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 p-3 rounded-xl border"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  borderColor: "var(--border-color)",
                }}
              >
                <span className="font-mono font-bold" style={{ color: "var(--accent-secondary)" }}>•</span>
                <span className="leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Limitations */}
      <div
        className="p-5 rounded-2xl border space-y-3 shadow-sm"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase text-amber-700">
          <AlertCircle className="w-4 h-4" />
          <span>Dataset Constraints & Limitations</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans" style={{ color: "var(--text-secondary)" }}>
          {project.limitations.map((lim, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg border"
              style={{
                backgroundColor: "var(--bg-subtle)",
                borderColor: "var(--border-color)",
              }}
            >
              • {lim}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
