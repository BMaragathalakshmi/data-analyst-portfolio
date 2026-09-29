import React from "react";
import { AboutCodeBucks } from "@/components/ui/AboutCodeBucks";
import { SkillsCodeBucks } from "@/components/ui/SkillsCodeBucks";
import { TimelineDevfolio } from "@/components/ui/TimelineDevfolio";

export default function AboutPage() {
  return (
    <div className="space-y-0">
      {/* 1. CodeBucks 3-Column Biography, Framed Portrait & Big Numbers */}
      <AboutCodeBucks />

      {/* 2. Skills overview */}
      <SkillsCodeBucks />

      {/* 3. Education & Learning Roadmap Timeline */}
      <TimelineDevfolio />
    </div>
  );
}
