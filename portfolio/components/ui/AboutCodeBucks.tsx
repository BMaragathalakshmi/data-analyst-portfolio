"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

export const AboutCodeBucks: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="about" className="py-20 border-b relative overflow-hidden" style={{ borderColor: "var(--border-color)" }}>
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-[#c2593f]/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: "var(--accent-primary)" }}>
            About Me
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-sans tracking-tight" style={{ color: "var(--text-primary)" }}>
            How I approach data work
          </h2>
          <p className="text-xs sm:text-sm font-mono max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Careful data preparation, reproducible analysis, and reporting built for the people who use it.
          </p>
        </div>

        {/* CodeBucks Signature 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Col 1: Biography */}
          <div className="md:col-span-5 lg:col-span-5 space-y-4 text-sm sm:text-base leading-relaxed font-sans order-2 md:order-1" style={{ color: "var(--text-secondary)" }}>
            <h3 className="text-xs font-mono uppercase font-bold tracking-widest" style={{ color: "var(--accent-primary)" }}>
              Biography
            </h3>
            
            <p>
              I&apos;m <strong style={{ color: "var(--text-primary)" }}>Maragathalakshmi B</strong>, an Electronics and Communication Engineering student building practical experience in data analytics and web development. I work with SQL, Python, Excel, Power BI, and Tableau.
            </p>

            <p>
              My process starts with data-quality checks, clear assumptions, and documented transformations. I then use the findings to answer a defined business question and communicate the limits as clearly as the result.
            </p>

            <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
              Core skills: Python, SQL, Microsoft Excel, Power BI, Tableau, Pandas, NumPy, Matplotlib, Seaborn, HTML, CSS, JavaScript, C, and C++.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/resume"
                className="px-5 py-2.5 rounded-xl font-bold text-xs font-mono transition-all flex items-center gap-1.5 shadow-lg text-white"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  boxShadow: "0 8px 20px -4px rgba(194, 89, 63, 0.35)",
                }}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume / CV</span>
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-xl font-bold text-xs font-mono transition-all border backdrop-blur-md hover:opacity-80"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                Get In Touch
              </Link>
            </div>
          </div>

          {/* Col 2: Signature Framed Portrait Photo with Warm Glow Orbs */}
          <div className="md:col-span-4 lg:col-span-4 flex justify-center order-1 md:order-2">
            <div className="relative w-full max-w-xs">
              {/* Warm 3D Orbs */}
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-[#c2593f] blur-[2px] opacity-80 z-0" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-tl from-[#2d5a4a] to-[#c2593f] blur-[2px] opacity-80 z-0" />

              <div
                className="relative rounded-3xl p-4 shadow-2xl backdrop-blur-xl border z-10 transition-all"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-color)",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <div
                  className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--bg-subtle)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  {!imageError ? (
                    <img
                      src="/images/profile.jpg"
                      alt="Maragathalakshmi B"
                      className="w-full h-full object-cover object-top"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center font-mono text-center p-4">
                      <div
                        className="w-14 h-14 rounded-full border flex items-center justify-center font-bold text-xl mb-2"
                        style={{
                          backgroundColor: "var(--accent-pill-bg)",
                          borderColor: "var(--accent-primary)",
                          color: "var(--accent-primary)",
                        }}
                      >
                        MB
                      </div>
                      <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                        Maragathalakshmi B
                      </span>
                      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                        Data Analyst
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: CodeBucks Stacked Stat Numbers */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col justify-between gap-6 order-3">
            <div
              className="flex flex-col items-end justify-center p-6 rounded-3xl border shadow-xl backdrop-blur-xl transition-all hover:scale-105"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-color)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <span className="inline-block text-4xl sm:text-5xl font-black font-mono" style={{ color: "var(--accent-primary)" }}>
                4+
              </span>
              <h4 className="text-xs sm:text-sm font-bold capitalize text-right font-sans mt-1" style={{ color: "var(--text-primary)" }}>
                Flagship Projects
              </h4>
              <p className="text-[10px] font-mono text-right" style={{ color: "var(--text-muted)" }}>
                End-to-end pipelines
              </p>
            </div>

            <div
              className="flex flex-col items-end justify-center p-6 rounded-3xl border shadow-xl backdrop-blur-xl transition-all hover:scale-105"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-color)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <span className="inline-block text-4xl sm:text-5xl font-black font-mono" style={{ color: "var(--accent-secondary)" }}>
                15+
              </span>
              <h4 className="text-xs sm:text-sm font-bold capitalize text-right font-sans mt-1" style={{ color: "var(--text-primary)" }}>
                Queries & Scripts
              </h4>
              <p className="text-[10px] font-mono text-right" style={{ color: "var(--text-muted)" }}>
                SQL, Python, DAX
              </p>
            </div>

            <div
              className="flex flex-col items-end justify-center p-6 rounded-3xl border shadow-xl backdrop-blur-xl transition-all hover:scale-105"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-color)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <span className="inline-block text-4xl sm:text-5xl font-black font-mono" style={{ color: "var(--accent-primary)" }}>
                100%
              </span>
              <h4 className="text-xs sm:text-sm font-bold capitalize text-right font-sans mt-1" style={{ color: "var(--text-primary)" }}>
                Real Datasets
              </h4>
              <p className="text-[10px] font-mono text-right" style={{ color: "var(--text-muted)" }}>
                Zero fabricated metrics
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
