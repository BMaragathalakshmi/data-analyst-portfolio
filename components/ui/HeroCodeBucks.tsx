"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, MapPin, Sparkles } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";

export const HeroCodeBucks: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative pt-8 pb-20 border-b overflow-hidden" style={{ borderColor: "var(--border-color)" }}>
      {/* Background Decorative Ambient Linen / Terracotta Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#c2593f]/15 to-[#2d5a4a]/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Glassmorphic Portrait Card with Warm 3D Orbs */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-1">
            <div className="relative w-full max-w-sm">
              {/* Top-Left Terracotta 3D Sphere */}
              <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 via-[#c2593f] to-[#2d5a4a] shadow-2xl opacity-80 z-0 animate-pulse-slow" />

              {/* Bottom-Right Forest/Sage 3D Sphere */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-tl from-[#2d5a4a] via-[#c2593f] to-amber-400 shadow-2xl opacity-75 z-0 animate-pulse-slow" />

              {/* Frosted Glassmorphism Container Card */}
              <div
                className="relative rounded-3xl p-5 shadow-2xl backdrop-blur-xl border z-10 transition-all"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-color)",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                {/* Photo Frame */}
                <div
                  className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border flex items-center justify-center shadow-inner"
                  style={{
                    backgroundColor: "var(--bg-subtle)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  {!imageError ? (
                    <img
                      src="/images/profile.jpg"
                      alt="Maragathalakshmi B - Data Analyst"
                      className="w-full h-full object-cover object-top"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center font-mono text-center p-4">
                      <div
                        className="w-16 h-16 rounded-full border flex items-center justify-center font-bold text-2xl mb-2"
                        style={{
                          backgroundColor: "var(--accent-pill-bg)",
                          borderColor: "var(--accent-primary)",
                          color: "var(--accent-primary)",
                        }}
                      >
                        MB
                      </div>
                      <span className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                        Maragathalakshmi B
                      </span>
                      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                        Data Analyst
                      </span>
                    </div>
                  )}
                </div>

                {/* Status footer inside photo card */}
                <div className="pt-4 flex items-center justify-between font-mono text-xs">
                  <span className="flex items-center gap-1.5 font-bold" style={{ color: "var(--accent-secondary)" }}>
                    <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--accent-secondary)" }} />
                    Available for Hire
                  </span>
                  <span className="font-semibold" style={{ color: "var(--text-secondary)" }}>
                    Data Analyst
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: CodeBucks Animated Headline & Bio */}
          <div className="lg:col-span-7 space-y-6 text-left order-2 lg:order-2">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-bold backdrop-blur-md"
              style={{
                backgroundColor: "var(--accent-pill-bg)",
                borderColor: "var(--border-color)",
                color: "var(--accent-pill-text)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Data Analyst • SQL • Python • Power BI</span>
            </div>

            {/* CodeBucks Staggered Animated Headline */}
            <div className="space-y-1">
              <AnimatedText
                text="Clear analysis, from raw data to business decisions."
                className="!text-3xl sm:!text-4xl lg:!text-5xl !leading-[1.15]"
              />
            </div>

            <p className="text-sm sm:text-base font-sans leading-relaxed max-w-xl" style={{ color: "var(--text-secondary)" }}>
              I clean and validate real-world datasets, analyze them with SQL and Python, and present the results in practical Power BI dashboards. This portfolio documents the work, methods, and decisions behind each project.
            </p>

            {/* CodeBucks Signature Action Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/resume"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm font-mono transition-all shadow-xl group hover:scale-105 text-white"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  boxShadow: "0 10px 25px -5px rgba(194, 89, 63, 0.35)",
                }}
              >
                <span>Resume / CV</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="text-sm font-mono font-bold underline underline-offset-8 transition-colors py-2 px-3 hover:opacity-80"
                style={{ color: "var(--text-primary)" }}
              >
                Contact Me
              </Link>

              <Link
                href="/projects"
                className="text-sm font-mono font-bold flex items-center gap-1.5 py-2 px-3 transition-colors hover:opacity-80"
                style={{ color: "var(--accent-primary)" }}
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick Meta Details */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t text-xs font-mono" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5" style={{ color: "var(--accent-primary)" }} />
                <span>Dindigul, Tamil Nadu</span>
              </span>
              <span>•</span>
              <a href="https://github.com/BMaragathalakshmi" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-colors" style={{ color: "var(--text-secondary)" }}>
                GitHub
              </a>
              <span>•</span>
              <a href="https://linkedin.com/in/maragathalakshmi-b-3671082b7" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-colors" style={{ color: "var(--text-secondary)" }}>
                LinkedIn
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
