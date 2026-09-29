import React from "react";
import Link from "next/link";
import { ArrowRight, Database, Code2, Terminal, FileText } from "lucide-react";
import { HeroCodeBucks } from "@/components/ui/HeroCodeBucks";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      {/* 1. CodeBucks High-Impact Hero Section */}
      <HeroCodeBucks />

      {/* 2. Quick Multi-Page Navigation Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: "var(--accent-primary)" }}>
            Explore Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans" style={{ color: "var(--text-primary)" }}>
            Explore the portfolio
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: About */}
          <Link
            href="/about"
            className="p-7 rounded-3xl border backdrop-blur-xl transition-all flex flex-col justify-between space-y-4 group hover:scale-105"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div className="space-y-2.5">
              <div
                className="w-12 h-12 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                style={{
                  backgroundColor: "var(--accent-pill-bg)",
                  borderColor: "var(--accent-primary)",
                  color: "var(--accent-primary)",
                }}
              >
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-sans transition-colors" style={{ color: "var(--text-primary)" }}>
                About & Skills
              </h3>
              <p className="text-xs font-sans leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Background, working methods, technical skills, and education.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold group-hover:translate-x-1 transition-transform" style={{ color: "var(--accent-primary)" }}>
              <span>View About Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 2: Projects */}
          <Link
            href="/projects"
            className="p-7 rounded-3xl border backdrop-blur-xl transition-all flex flex-col justify-between space-y-4 group hover:scale-105"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div className="space-y-2.5">
              <div
                className="w-12 h-12 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                style={{
                  backgroundColor: "var(--accent-pill-bg)",
                  borderColor: "var(--accent-secondary)",
                  color: "var(--accent-secondary)",
                }}
              >
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-sans transition-colors" style={{ color: "var(--text-primary)" }}>
                Flagship Projects
              </h3>
              <p className="text-xs font-sans leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Four end-to-end analyses across retail, retention, HR, and logistics.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold group-hover:translate-x-1 transition-transform" style={{ color: "var(--accent-secondary)" }}>
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 3: Interactive Labs */}
          <Link
            href="/labs"
            className="p-7 rounded-3xl border backdrop-blur-xl transition-all flex flex-col justify-between space-y-4 group hover:scale-105"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div className="space-y-2.5">
              <div
                className="w-12 h-12 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                style={{
                  backgroundColor: "var(--accent-pill-bg)",
                  borderColor: "var(--accent-primary)",
                  color: "var(--accent-primary)",
                }}
              >
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-sans transition-colors" style={{ color: "var(--text-primary)" }}>
                Interactive Labs
              </h3>
              <p className="text-xs font-sans leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Try the SQL workbench, CSV cleaner, Python notebook, and Excel tools.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold group-hover:translate-x-1 transition-transform" style={{ color: "var(--accent-primary)" }}>
              <span>Open Labs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Card 4: Resume & Contact */}
          <Link
            href="/resume"
            className="p-7 rounded-3xl border backdrop-blur-xl transition-all flex flex-col justify-between space-y-4 group hover:scale-105"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div className="space-y-2.5">
              <div
                className="w-12 h-12 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                style={{
                  backgroundColor: "var(--accent-pill-bg)",
                  borderColor: "var(--accent-secondary)",
                  color: "var(--accent-secondary)",
                }}
              >
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-sans transition-colors" style={{ color: "var(--text-primary)" }}>
                Resume / CV
              </h3>
              <p className="text-xs font-sans leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Education, project experience, technical skills, and contact details.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold group-hover:translate-x-1 transition-transform" style={{ color: "var(--accent-secondary)" }}>
              <span>View Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
