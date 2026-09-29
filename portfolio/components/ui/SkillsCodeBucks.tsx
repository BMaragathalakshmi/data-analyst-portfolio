"use client";

import React from "react";
import { motion } from "framer-motion";

interface SkillItemProps {
  name: string;
  x: string;
  y: string;
}

const SkillItem: React.FC<SkillItemProps> = ({ name, x, y }) => {
  return (
    <motion.div
      className="flex items-center justify-center rounded-full font-mono text-xs sm:text-sm font-bold py-2.5 px-4 sm:py-3 sm:px-6 shadow-md cursor-pointer absolute border backdrop-blur-xl transition-all hover:scale-110"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-color)",
        color: "var(--text-primary)",
        boxShadow: "var(--card-shadow)",
      }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y, transition: { duration: 1.2 } }}
      viewport={{ once: true }}
    >
      <span>{name}</span>
    </motion.div>
  );
};

export const SkillsCodeBucks: React.FC = () => {
  return (
    <section id="skills" className="py-20 border-b relative overflow-hidden" style={{ borderColor: "var(--border-color)" }}>
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-[#c2593f]/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: "var(--accent-primary)" }}>
            Technical Competencies
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-sans tracking-tight" style={{ color: "var(--text-primary)" }}>
            Skills
          </h2>
          <p className="text-xs sm:text-sm font-mono max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Practical, project-tested tools for data manipulation, statistical modeling, and BI reporting.
          </p>
        </div>

        {/* CodeBucks Signature Circular Orbital Web */}
        <div
          className="w-full h-[60vh] sm:h-[75vh] relative flex items-center justify-center rounded-full border transition-all"
          style={{
            backgroundImage: "var(--radial-orb)",
            borderColor: "var(--border-color)",
          }}
        >
          {/* Central Hub */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-[#c2593f] blur-md opacity-60 animate-pulse-slow" />
            <motion.div
              className="relative flex items-center justify-center rounded-full font-mono font-black text-sm sm:text-lg p-6 sm:p-8 shadow-2xl cursor-pointer z-10 transition-transform text-white border"
              style={{
                backgroundColor: "var(--accent-primary)",
                borderColor: "var(--border-color)",
                boxShadow: "0 10px 25px -5px rgba(194, 89, 63, 0.4)",
              }}
              whileHover={{ scale: 1.1 }}
            >
              DATA
            </motion.div>
          </div>

          {/* Orbiting Skill Pills */}
          <SkillItem name="SQL (PostgreSQL)" x="-22vw" y="2vw" />
          <SkillItem name="Python" x="-5vw" y="-12vw" />
          <SkillItem name="Pandas" x="18vw" y="4vw" />
          <SkillItem name="Power BI" x="0vw" y="14vw" />
          <SkillItem name="DAX Measures" x="-20vw" y="-15vw" />
          <SkillItem name="Excel (XLOOKUP)" x="15vw" y="-12vw" />
          <SkillItem name="Window Functions" x="28vw" y="-5vw" />
          <SkillItem name="Data Cleaning" x="0vw" y="-22vw" />
          <SkillItem name="EDA & Seaborn" x="-26vw" y="16vw" />
          <SkillItem name="SQLite" x="18vw" y="18vw" />
          <SkillItem name="Star Schema" x="-12vw" y="22vw" />
          <SkillItem name="Git & GitHub" x="26vw" y="10vw" />
        </div>

        {/* Categorized Summary Grid with Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div
            className="p-6 rounded-3xl border space-y-2 shadow-xl backdrop-blur-xl transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <h4 className="text-sm font-bold font-sans" style={{ color: "var(--text-primary)" }}>📊 Relational Databases</h4>
            <p className="text-xs font-mono leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              PostgreSQL, SQLite, DBeaver, Window Functions (LAG/LEAD, SUM OVER), CTEs, Joins.
            </p>
          </div>

          <div
            className="p-6 rounded-3xl border space-y-2 shadow-xl backdrop-blur-xl transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <h4 className="text-sm font-bold font-sans" style={{ color: "var(--text-primary)" }}>🐍 Python Analytics</h4>
            <p className="text-xs font-mono leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Pandas, NumPy, Matplotlib, Seaborn, Jupyter Notebooks, Outlier Filtering.
            </p>
          </div>

          <div
            className="p-6 rounded-3xl border space-y-2 shadow-xl backdrop-blur-xl transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <h4 className="text-sm font-bold font-sans" style={{ color: "var(--text-primary)" }}>📈 BI & Dashboards</h4>
            <p className="text-xs font-mono leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Power BI Desktop, DAX Measures, Power Query M, Star Schema, Dynamic Slicers.
            </p>
          </div>

          <div
            className="p-6 rounded-3xl border space-y-2 shadow-xl backdrop-blur-xl transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <h4 className="text-sm font-bold font-sans" style={{ color: "var(--text-primary)" }}>📑 Spreadsheet Modeling</h4>
            <p className="text-xs font-mono leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Excel, XLOOKUP, INDEX/MATCH, SUMIFS, Pivot Tables, Scenario Modeling.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
