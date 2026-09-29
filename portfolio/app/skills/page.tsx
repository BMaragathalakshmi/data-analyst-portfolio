"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ExternalLink, 
  Search
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SKILLS_DATA } from "@/lib/data/skills-data";

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "SQL",
    "Python",
    "Data Cleaning",
    "Excel",
    "Power BI",
    "Data Visualization",
    "Business Insights",
    "HTML & CSS",
    "C Programming",
  ];

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
    const matchesSearch = 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.keyConcepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      skill.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <Badge variant="cyan" size="sm">
          Skills
        </Badge>
        <h1 
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-sans tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Skills & Applied Tools
        </h1>
        <p 
          className="text-xs sm:text-sm font-mono"
          style={{ color: "var(--text-secondary)" }}
        >
          Each skill is labelled by current experience: <span className="font-bold" style={{ color: "var(--accent-secondary)" }}>Project Experience</span>, <span className="font-bold" style={{ color: "var(--accent-primary)" }}>Practicing</span>, or <span className="font-bold" style={{ color: "var(--text-muted)" }}>Learning</span>.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div 
        className="p-5 rounded-2xl border space-y-3"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-color)",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, tools, keywords..."
              className="w-full human-input px-3.5 py-2.5 rounded-xl text-xs font-mono"
            />
            <Search className="w-4 h-4 absolute right-3.5 top-3" style={{ color: "var(--text-muted)" }} />
          </div>

          <div className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
            Showing {filteredSkills.length} of {SKILLS_DATA.length} Competencies
          </div>
        </div>

        {/* Category Buttons */}
        <div 
          className="flex flex-wrap gap-1.5 pt-3 border-t"
          style={{ borderColor: "var(--border-color)" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-3 py-1 rounded-full text-xs font-mono transition-all border"
              style={{
                backgroundColor: selectedCategory === cat ? "var(--accent-primary)" : "var(--bg-subtle)",
                color: selectedCategory === cat ? "#ffffff" : "var(--text-secondary)",
                borderColor: selectedCategory === cat ? "var(--accent-primary)" : "var(--border-color)",
                fontWeight: selectedCategory === cat ? 700 : 500,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSkills.map((skill) => {
          const badgeVariant = 
            skill.level === "Project Experience" 
              ? "emerald" 
              : skill.level === "Practicing" 
              ? "cyan" 
              : "slate";

          return (
            <div
              key={skill.name}
              className="p-5 rounded-2xl border flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-color)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="slate" size="sm">
                    {skill.category}
                  </Badge>
                  <Badge variant={badgeVariant} size="sm">
                    {skill.level}
                  </Badge>
                </div>

                <h3 
                  className="text-base font-bold font-sans"
                  style={{ color: "var(--text-primary)" }}
                >
                  {skill.name}
                </h3>

                <p 
                  className="text-xs font-sans leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {skill.description}
                </p>

                {/* Key Concepts */}
                <div className="space-y-1 pt-1">
                  <span 
                    className="text-[10px] font-mono uppercase font-semibold block"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Core Concepts Demonstrated:
                  </span>
                  <ul className="space-y-0.5 text-xs font-mono" style={{ color: "var(--text-primary)" }}>
                    {skill.keyConcepts.map((concept, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-[10px]" style={{ color: "var(--accent-primary)" }}>•</span>
                        <span>{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div 
                className="pt-3 border-t space-y-2.5"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div className="flex flex-wrap gap-1">
                  {skill.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: "var(--bg-subtle)",
                        borderColor: "var(--border-color)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {skill.proofProjectSlug && (
                  <Link
                    href={`/projects/${skill.proofProjectSlug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono hover:underline transition-colors"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    <span>View Project Proof</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
