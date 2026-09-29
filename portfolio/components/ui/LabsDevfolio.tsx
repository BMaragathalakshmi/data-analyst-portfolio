import React from "react";
import Link from "next/link";
import { Wand2, Terminal, Code2, FileSpreadsheet, ArrowRight } from "lucide-react";

export const LabsDevfolio: React.FC = () => {
  const labs = [
    {
      title: "Data Cleaning Lab",
      href: "/labs/data-cleaning",
      icon: Wand2,
      desc: "Upload any CSV, detect missing values, duplicates, outliers, and download clean data.",
      tag: "CSV Quality Auditor",
      color: "text-rose-600",
      bg: "bg-rose-50 border-rose-100 group-hover:bg-rose-100",
      accent: "text-rose-600"
    },
    {
      title: "SQL Query Workbench",
      href: "/labs/sql-query",
      icon: Terminal,
      desc: "Live SQL sandbox executing CTEs, window functions, and joins on in-memory SQLite.",
      tag: "Live SQL Sandbox",
      color: "text-blue-600",
      bg: "bg-blue-50 border-blue-100 group-hover:bg-blue-100",
      accent: "text-blue-600"
    },
    {
      title: "Python Analytics Studio",
      href: "/labs/python-studio",
      icon: Code2,
      desc: "Jupyter-style notebook runner with cell execution, Pandas wrangling, and EDA plots.",
      tag: "Notebook Studio",
      color: "text-amber-600",
      bg: "bg-amber-50 border-amber-100 group-hover:bg-amber-100",
      accent: "text-amber-600"
    },
    {
      title: "Excel Formula Lab",
      href: "/labs/excel-analytics",
      icon: FileSpreadsheet,
      desc: "Dynamic spreadsheet evaluation tool testing XLOOKUP, SUMIFS, and pivot modeling.",
      tag: "Spreadsheet Models",
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-100 group-hover:bg-emerald-100",
      accent: "text-emerald-600"
    },
  ];

  return (
    <section className="py-20 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
            Interactive Playgrounds
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-sans tracking-tight">
            Analytics Workbenches
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-mono">
            Test real data cleaning, SQL queries, and Python notebooks directly in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {labs.map((lab, i) => {
            const Icon = lab.icon;
            return (
              <Link
                key={i}
                href={lab.href}
                className="p-6 rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${lab.bg} ${lab.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block font-medium">
                      {lab.tag}
                    </span>
                    <h3 className="text-base font-bold text-slate-950 font-sans mt-0.5 group-hover:text-blue-600 transition-colors">
                      {lab.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    {lab.desc}
                  </p>
                </div>

                <div className={`pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold ${lab.accent}`}>
                  <span>Open Sandbox</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
