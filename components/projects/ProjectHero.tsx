import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { ProjectData } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

interface ProjectHeroProps {
  project: ProjectData;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({ project }) => {
  return (
    <div className="space-y-4">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono transition-colors hover:opacity-80"
          style={{ color: "var(--accent-primary)" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects</span>
        </Link>
        <div className="flex items-center gap-1.5">
          <Badge variant="emerald" size="sm">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified Dataset</span>
          </Badge>
        </div>
      </div>

      {/* Main Hero Box */}
      <div
        className="rounded-2xl border p-6 lg:p-8 space-y-5 shadow-sm"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-color)",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="sky" size="sm">
            {project.businessDomain}
          </Badge>
          <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
            Source: {project.datasetSource.name} ({project.datasetSource.recordCount} rows)
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-sans" style={{ color: "var(--text-primary)" }}>
            {project.title}
          </h1>
          <p className="text-sm sm:text-base max-w-4xl leading-relaxed font-sans" style={{ color: "var(--text-secondary)" }}>
            {project.shortDescription}
          </p>
        </div>

        {/* Hero KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t" style={{ borderColor: "var(--border-color)" }}>
          {project.heroStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border font-mono"
              style={{
                backgroundColor: "var(--bg-subtle)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="text-[10px] uppercase font-bold" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
              <div className="text-xl font-bold mt-0.5" style={{ color: "var(--accent-primary)" }}>{stat.value}</div>
              <div className="text-[10px] mt-0.5" style={{ color: "var(--text-secondary)" }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Business Problem & Strategy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div
            className="p-4 rounded-xl border space-y-1.5"
            style={{
              backgroundColor: "var(--bg-subtle)",
              borderColor: "var(--border-color)",
            }}
          >
            <h3 className="text-xs font-mono uppercase font-bold text-rose-600">
              Business Problem
            </h3>
            <p className="text-xs leading-relaxed font-sans" style={{ color: "var(--text-secondary)" }}>
              {project.problemStatement}
            </p>
          </div>

          <div
            className="p-4 rounded-xl border space-y-1.5"
            style={{
              backgroundColor: "var(--bg-subtle)",
              borderColor: "var(--border-color)",
            }}
          >
            <h3 className="text-xs font-mono uppercase font-bold text-[#2d5a4a]">
              Analytical Strategy
            </h3>
            <p className="text-xs leading-relaxed font-sans" style={{ color: "var(--text-secondary)" }}>
              {project.solutionOverview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
