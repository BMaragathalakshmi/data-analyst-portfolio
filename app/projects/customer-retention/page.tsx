import React from "react";
import { FLAGSHIP_PROJECTS } from "@/lib/data/projects-data";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { PipelineExplorer } from "@/components/projects/PipelineExplorer";
import { ProjectSummarySection } from "@/components/projects/ProjectSummarySection";
import { notFound } from "next/navigation";

export default function CustomerRetentionProjectPage() {
  const project = FLAGSHIP_PROJECTS.find((p) => p.slug === "customer-retention");
  if (!project) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <ProjectHero project={project} />

      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 font-sans tracking-tight">
            Interactive Customer Retention & Cohort Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Explore customer cohort matrices, RFM scoring models, SQL queries, and churn prevention playbooks.
          </p>
        </div>
        <PipelineExplorer stages={project.stages} />
      </div>

      <ProjectSummarySection project={project} />
    </div>
  );
}
