"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Terminal, BarChart2 } from "lucide-react";
import { FLAGSHIP_PROJECTS } from "@/lib/data/projects-data";

export const ProjectsCodeBucks: React.FC = () => {
  const featuredOne = FLAGSHIP_PROJECTS[0]; // Retail Sales
  const featuredTwo = FLAGSHIP_PROJECTS[1]; // Customer Retention
  const rest = FLAGSHIP_PROJECTS.slice(2); // HR & Ecommerce

  return (
    <section id="projects" className="py-20 border-b" style={{ borderColor: "var(--border-color)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: "var(--accent-primary)" }}>
            Practical Work
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-sans tracking-tight" style={{ color: "var(--text-primary)" }}>
            Projects & Case Studies
          </h2>
          <p className="text-xs sm:text-sm font-mono max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            End-to-end data analytics pipelines built with SQL, Python, Excel, and Power BI.
          </p>
        </div>

        {/* 1. Featured Project 1 (CodeBucks Full-Width Banner) */}
        {featuredOne && (
          <div
            className="relative rounded-3xl border-2 p-6 sm:p-10 shadow-xl space-y-6 transition-all"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
            }}
          >
            {/* Offset backdrop */}
            <div
              className="absolute top-0 -right-3 -z-10 w-[101%] h-[102%] rounded-[2.5rem] opacity-60 hidden sm:block"
              style={{ backgroundColor: "var(--bg-surface-elevated)" }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Visual Mockup Box */}
              <div
                className="lg:col-span-6 rounded-2xl border p-5 space-y-4 font-mono text-xs shadow-inner"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/90" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/90" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/90" />
                  </div>
                  <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>retail_sales_pipeline.sql</span>
                </div>

                <div
                  className="p-3 rounded-xl border space-y-1.5"
                  style={{
                    backgroundColor: "var(--bg-base)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div className="text-[10px] uppercase font-bold" style={{ color: "var(--text-muted)" }}>SQL CTE & Running Total</div>
                  <div className="font-mono text-xs font-bold" style={{ color: "var(--accent-primary)" }}>
                    SUM(net_revenue) OVER (PARTITION BY region ORDER BY order_date)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div
                    className="p-3 rounded-xl border"
                    style={{
                      backgroundColor: "var(--bg-base)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <span className="text-[10px] uppercase block" style={{ color: "var(--text-muted)" }}>Revenue Analyzed</span>
                    <span className="text-base font-bold" style={{ color: "var(--text-primary)" }}>$1,245,800</span>
                  </div>
                  <div
                    className="p-3 rounded-xl border"
                    style={{
                      backgroundColor: "var(--bg-base)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <span className="text-[10px] uppercase block" style={{ color: "var(--text-muted)" }}>Cleaned Rows</span>
                    <span className="text-base font-bold" style={{ color: "var(--accent-secondary)" }}>1,000 Verified</span>
                  </div>
                </div>
              </div>

              {/* Text & Actions */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span
                    className="px-2.5 py-0.5 rounded-full font-bold border"
                    style={{
                      backgroundColor: "var(--accent-pill-bg)",
                      color: "var(--accent-pill-text)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    Featured Case Study
                  </span>
                  <span style={{ color: "var(--text-muted)" }}>•</span>
                  <span style={{ color: "var(--text-secondary)" }}>{featuredOne.businessDomain}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black font-sans hover:opacity-80 transition-opacity" style={{ color: "var(--text-primary)" }}>
                  <Link href={`/projects/${featuredOne.slug}`}>
                    {featuredOne.title}
                  </Link>
                </h3>

                <p className="text-sm font-sans leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {featuredOne.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 font-mono text-xs pt-1">
                  {["SQL CTEs", "Python Pandas", "Power BI DAX", "Excel Modeling"].map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md border"
                      style={{
                        backgroundColor: "var(--bg-subtle)",
                        borderColor: "var(--border-color)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-3 font-mono text-xs">
                  <Link
                    href={`/projects/${featuredOne.slug}`}
                    className="px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-1.5 shadow-sm hover:scale-105"
                    style={{
                      backgroundColor: "var(--accent-primary)",
                      color: "var(--bg-base)",
                    }}
                  >
                    <span>Visit Pipeline</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/labs/sql-query"
                    className="underline underline-offset-4 flex items-center gap-1 font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Run Query in SQL Lab</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Featured Project 2 (CodeBucks Full-Width Banner) */}
        {featuredTwo && (
          <div
            className="relative rounded-3xl border-2 p-6 sm:p-10 shadow-xl space-y-6 transition-all"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
            }}
          >
            {/* Offset backdrop */}
            <div
              className="absolute top-0 -right-3 -z-10 w-[101%] h-[102%] rounded-[2.5rem] opacity-60 hidden sm:block"
              style={{ backgroundColor: "var(--bg-surface-elevated)" }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text & Actions (Reversed for visual rhythm) */}
              <div className="lg:col-span-6 space-y-4 text-left order-2 lg:order-1">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span
                    className="px-2.5 py-0.5 rounded-full font-bold border"
                    style={{
                      backgroundColor: "var(--accent-pill-bg)",
                      color: "var(--accent-pill-text)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    Featured Case Study
                  </span>
                  <span style={{ color: "var(--text-muted)" }}>•</span>
                  <span style={{ color: "var(--text-secondary)" }}>{featuredTwo.businessDomain}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black font-sans hover:opacity-80 transition-opacity" style={{ color: "var(--text-primary)" }}>
                  <Link href={`/projects/${featuredTwo.slug}`}>
                    {featuredTwo.title}
                  </Link>
                </h3>

                <p className="text-sm font-sans leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {featuredTwo.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 font-mono text-xs pt-1">
                  {["RFM Segmentation", "Cohort Analysis", "SQL Joins", "Retention Curves"].map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md border"
                      style={{
                        backgroundColor: "var(--bg-subtle)",
                        borderColor: "var(--border-color)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-3 font-mono text-xs">
                  <Link
                    href={`/projects/${featuredTwo.slug}`}
                    className="px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-1.5 shadow-sm hover:scale-105"
                    style={{
                      backgroundColor: "var(--accent-primary)",
                      color: "var(--bg-base)",
                    }}
                  >
                    <span>Visit Pipeline</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/labs/python-studio"
                    className="underline underline-offset-4 flex items-center gap-1 font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <BarChart2 className="w-3.5 h-3.5" />
                    <span>View Python EDA</span>
                  </Link>
                </div>
              </div>

              {/* Visual Mockup Box */}
              <div
                className="lg:col-span-6 rounded-2xl border p-5 space-y-4 font-mono text-xs order-1 lg:order-2 shadow-inner"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--border-color)" }}>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/90" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/90" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/90" />
                  </div>
                  <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>customer_rfm_cohorts.py</span>
                </div>

                <div
                  className="p-3 rounded-xl border space-y-1.5"
                  style={{
                    backgroundColor: "var(--bg-base)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div className="text-[10px] uppercase font-bold" style={{ color: "var(--text-muted)" }}>RFM Segmentation Logic</div>
                  <div className="font-mono text-xs font-bold" style={{ color: "var(--accent-primary)" }}>
                    df[&apos;RFM_Score&apos;] = df[&apos;R&apos;].astype(str) + df[&apos;F&apos;].astype(str) + df[&apos;M&apos;].astype(str)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div
                    className="p-3 rounded-xl border"
                    style={{
                      backgroundColor: "var(--bg-base)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <span className="text-[10px] uppercase block" style={{ color: "var(--text-muted)" }}>Sample Accounts</span>
                    <span className="text-base font-bold" style={{ color: "var(--text-primary)" }}>500 Customers</span>
                  </div>
                  <div
                    className="p-3 rounded-xl border"
                    style={{
                      backgroundColor: "var(--bg-base)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <span className="text-[10px] uppercase block" style={{ color: "var(--text-muted)" }}>Cohort Window</span>
                    <span className="text-base font-bold" style={{ color: "var(--accent-secondary)" }}>6 Months</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3. 2-Column Standard Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rest.map((project, idx) => (
            <div
              key={project.slug}
              className="relative rounded-2xl border-2 p-7 space-y-5 shadow-lg flex flex-col justify-between transition-all"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span
                    className="px-2.5 py-0.5 rounded-full font-bold border"
                    style={{
                      backgroundColor: "var(--accent-pill-bg)",
                      color: "var(--accent-pill-text)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    {project.businessDomain}
                  </span>
                  <span style={{ color: "var(--text-muted)" }}>Case Study 0{idx + 3}</span>
                </div>

                <h3 className="text-xl font-bold font-sans hover:opacity-80 transition-opacity" style={{ color: "var(--text-primary)" }}>
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>

                <p className="text-xs font-sans leading-relaxed line-clamp-3" style={{ color: "var(--text-secondary)" }}>
                  {project.shortDescription}
                </p>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-1">
                  {project.heroStats.slice(0, 2).map((st, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl border"
                      style={{
                        backgroundColor: "var(--bg-subtle)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <div className="text-[9px] uppercase font-medium" style={{ color: "var(--text-muted)" }}>{st.label}</div>
                      <div className="text-xs font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>{st.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-between font-mono text-xs" style={{ borderColor: "var(--border-color)" }}>
                <span style={{ color: "var(--text-muted)" }}>{project.datasetSource.recordCount} records</span>
                <Link
                  href={`/projects/${project.slug}`}
                  className="font-bold flex items-center gap-1 transition-colors"
                  style={{ color: "var(--accent-primary)" }}
                >
                  <span>Explore Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
