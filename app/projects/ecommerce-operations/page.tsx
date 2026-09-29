import React from "react";
import { FLAGSHIP_PROJECTS } from "@/lib/data/projects-data";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { PipelineExplorer } from "@/components/projects/PipelineExplorer";
import { ProjectSummarySection } from "@/components/projects/ProjectSummarySection";
import { notFound } from "next/navigation";

export default function EcommerceOperationsProjectPage() {
  const project = FLAGSHIP_PROJECTS.find((p) => p.slug === "ecommerce-operations");
  if (!project) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <ProjectHero project={project} />

      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 font-sans tracking-tight">
            Interactive E-Commerce Operations & Logistics Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Analyze courier on-time SLA metrics, transit bottlenecks, cost-per-delivery, and order cancellation root causes.
          </p>
        </div>
        <PipelineExplorer stages={project.stages} />
      </div>

      <ProjectSummarySection project={project} />
    </div>
  );
}
