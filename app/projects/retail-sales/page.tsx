import React from "react";
import { FLAGSHIP_PROJECTS } from "@/lib/data/projects-data";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { PipelineExplorer } from "@/components/projects/PipelineExplorer";
import { ProjectSummarySection } from "@/components/projects/ProjectSummarySection";
import { notFound } from "next/navigation";

export default function RetailSalesProjectPage() {
  const project = FLAGSHIP_PROJECTS.find((p) => p.slug === "retail-sales");
  if (!project) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. Project Hero Banner with KPIs & Problem Statement */}
      <ProjectHero project={project} />

      {/* 2. Signature 8-Stage Raw-to-Insight Pipeline Explorer */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 font-sans tracking-tight">
            Interactive 8-Stage Analytics Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Click through each pipeline phase to inspect actual data, transformations, SQL code, and visual charts.
          </p>
        </div>
        <PipelineExplorer stages={project.stages} />
      </div>

      {/* 3. Findings, Strategic Recommendations & Limitations */}
      <ProjectSummarySection project={project} />
    </div>
  );
}
