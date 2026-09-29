"use client";

import React from "react";
import { 
  Printer, 
  Mail, 
  MapPin,
  Phone
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <Badge variant="cyan" size="sm">
            Curriculum Vitae
          </Badge>
          <h1 
            className="text-2xl sm:text-3xl font-black font-sans tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Resume
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl font-bold text-xs font-mono text-white transition-colors flex items-center gap-1.5 shadow-sm"
            style={{ backgroundColor: "var(--accent-primary)" }}
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Main Resume Canvas (Crisp Linen Surface) */}
      <div 
        className="rounded-3xl border p-8 sm:p-12 shadow-lg space-y-7 font-sans"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-color)",
          color: "var(--text-primary)",
        }}
      >
        {/* Header Details */}
        <div 
          className="border-b pb-6 space-y-2.5"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h2 
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              MARAGATHALAKSHMI B
            </h2>
            <span 
              className="text-xs font-mono font-bold uppercase tracking-wider"
              style={{ color: "var(--accent-primary)" }}
            >
              Data Analyst
            </span>
          </div>

          <div 
            className="flex flex-wrap items-center gap-3 text-xs font-mono"
            style={{ color: "var(--text-secondary)" }}
          >
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
              <span>Dindigul, Tamil Nadu, India</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
              <a href="mailto:maragathalakshmi4@gmail.com">maragathalakshmi4@gmail.com</a>
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
              <a href="tel:+919025780017">9025780017</a>
            </span>
            <a href="https://github.com/BMaragathalakshmi" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/maragathalakshmi-b-3671082b7" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-1.5">
          <h3 
            className="text-xs font-mono uppercase font-bold tracking-wider"
            style={{ color: "var(--accent-primary)" }}
          >
            Objective & Profile
          </h3>
          <p 
            className="text-xs sm:text-sm leading-relaxed font-sans"
            style={{ color: "var(--text-secondary)" }}
          >
            Electronics and Communication Engineering student with hands-on experience in Python and web development, with a growing focus on data analytics. Seeking an entry-level Data Analyst role to apply data cleaning, exploratory analysis, statistical analysis, visualization, and dashboard reporting skills.
          </p>
        </div>

        {/* Skills */}
        <div className="space-y-2.5">
          <h3 
            className="text-xs font-mono uppercase font-bold tracking-wider"
            style={{ color: "var(--accent-primary)" }}
          >
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
            <div 
              className="p-3.5 rounded-xl border"
              style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}
            >
              <strong className="block mb-0.5 font-bold" style={{ color: "var(--text-primary)" }}>Languages & Databases:</strong>
              <span style={{ color: "var(--text-secondary)" }}>Python, C, C++, SQL, HTML, CSS, JavaScript</span>
            </div>
            <div 
              className="p-3.5 rounded-xl border"
              style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}
            >
              <strong className="block mb-0.5 font-bold" style={{ color: "var(--text-primary)" }}>Libraries & Tools:</strong>
              <span style={{ color: "var(--text-secondary)" }}>Microsoft Excel, Power BI, Tableau, Pandas, NumPy, Matplotlib, Seaborn, Jupyter Notebook</span>
            </div>
            <div 
              className="p-3.5 rounded-xl border"
              style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}
            >
              <strong className="block mb-0.5 font-bold" style={{ color: "var(--text-primary)" }}>Data Analysis Techniques:</strong>
              <span style={{ color: "var(--text-secondary)" }}>Data Cleaning, EDA, Data Visualization, Statistical Analysis, Dashboard Reporting</span>
            </div>
            <div 
              className="p-3.5 rounded-xl border"
              style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}
            >
              <strong className="block mb-0.5 font-bold" style={{ color: "var(--text-primary)" }}>Additional Skills:</strong>
              <span style={{ color: "var(--text-secondary)" }}>Cisco Networking, IoT, problem solving, troubleshooting, debugging, teamwork</span>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <h3 className="text-xs font-mono uppercase font-bold tracking-wider" style={{ color: "var(--accent-primary)" }}>Internship</h3>
          <div className="space-y-2 p-4 rounded-xl border" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h4 className="text-xs sm:text-sm font-bold">Full Stack Development Intern — VCodez, Chennai</h4>
              <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>3 Months</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <li>Built a front-end mini project using HTML, CSS, and JavaScript.</li>
              <li>Collaborated with team members to understand web application development and deployment.</li>
              <li>Strengthened debugging and problem-solving skills through hands-on development tasks.</li>
            </ul>
          </div>
        </div>

        {/* Academic / Portfolio Projects */}
        <div className="space-y-4">
          <h3 
            className="text-xs font-mono uppercase font-bold tracking-wider"
            style={{ color: "var(--accent-primary)" }}
          >
            Academic & Portfolio Projects
          </h3>

          {/* Project 1 */}
          <div className="space-y-1.5 p-4 rounded-xl border" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
              <h4 className="text-xs sm:text-sm font-bold">Online Food Ordering System</h4>
              <span className="text-xs font-mono font-semibold" style={{ color: "var(--accent-secondary)" }}>HTML, CSS, JavaScript</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <li>Designed a responsive front-end for browsing food items, selecting items, and placing mock orders.</li>
              <li>Applied usability and performance principles to the interface.</li>
            </ul>
          </div>

          {/* Project 2 */}
          <div 
            className="space-y-1.5 p-4 rounded-xl border"
            style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
              <h4 className="text-xs sm:text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                Retail Sales Analysis & Discount Optimization
              </h4>
              <span className="text-xs font-mono font-semibold" style={{ color: "var(--accent-secondary)" }}>
                Python, SQL, Excel, Power BI
              </span>
            </div>
            <ul 
              className="list-disc list-inside space-y-1 text-xs font-sans leading-relaxed pt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              <li>Cleaned and prepared a sample retail dataset with 1,000+ rows; resolved 12 duplicate records and handled missing values using Pandas.</li>
              <li>Wrote SQL queries with CTEs and window functions to compute monthly regional totals and cumulative running sales.</li>
              <li>Analyzed category profit margins and demonstrated the impact of discounts greater than 20% on net profitability.</li>
              <li>Created an interactive Power BI dashboard with DAX measures and regional slicers.</li>
            </ul>
          </div>

          {/* Project 3 */}
          <div 
            className="space-y-1.5 p-4 rounded-xl border"
            style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
              <h4 className="text-xs sm:text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                Customer Retention & Cohort Analysis
              </h4>
              <span className="text-xs font-mono font-semibold" style={{ color: "var(--accent-secondary)" }}>
                Python, SQL, RFM Modeling, Power BI
              </span>
            </div>
            <ul 
              className="list-disc list-inside space-y-1 text-xs font-sans leading-relaxed pt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              <li>Calculated customer RFM (Recency, Frequency, Monetary) segmentation categories across 500 sample accounts.</li>
              <li>Analyzed repeat purchase frequency across 6 monthly cohorts using SQL aggregations and Python plots.</li>
              <li>Summarized customer lifecycle insights and recommended early re-engagement timing.</li>
            </ul>
          </div>

          {/* Project 4 */}
          <div 
            className="space-y-1.5 p-4 rounded-xl border"
            style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
              <h4 className="text-xs sm:text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                Workforce & HR Attrition Diagnostics
              </h4>
              <span className="text-xs font-mono font-semibold" style={{ color: "var(--accent-secondary)" }}>
                SQL, Excel Pivot Models, Power BI
              </span>
            </div>
            <ul 
              className="list-disc list-inside space-y-1 text-xs font-sans leading-relaxed pt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              <li>Explored employee tenure, overtime hours, and satisfaction ratings across 500 sample records.</li>
              <li>Constructed Excel pivot tables and formulas to benchmark department metrics.</li>
            </ul>
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-1.5">
          <h3 
            className="text-xs font-mono uppercase font-bold tracking-wider"
            style={{ color: "var(--accent-primary)" }}
          >
            Education
          </h3>
          <div 
            className="space-y-3 text-xs font-mono p-4 rounded-xl border"
            style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}
          >
            <div className="flex justify-between gap-4">
              <div>
                <span className="font-bold" style={{ color: "var(--text-primary)" }}>B.E. Electronics & Communication Engineering</span>
                <div style={{ color: "var(--text-muted)" }}>NPR College of Engineering and Technology, Dindigul · CGPA: 7.44</div>
              </div>
              <span className="shrink-0" style={{ color: "var(--text-muted)" }}>2022 - Present</span>
            </div>
            <div className="flex justify-between gap-4">
              <div><span className="font-bold">Higher Secondary (HSC)</span><div style={{ color: "var(--text-muted)" }}>St. Joseph Girls Higher Secondary School, Dindigul</div></div>
              <span>81%</span>
            </div>
            <div className="flex justify-between gap-4">
              <div><span className="font-bold">Secondary School Leaving Certificate (SSLC)</span><div style={{ color: "var(--text-muted)" }}>St. Joseph Girls Higher Secondary School, Dindigul</div></div>
              <span>74%</span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xs font-mono uppercase font-bold tracking-wider" style={{ color: "var(--accent-primary)" }}>Workshops & Activities</h3>
          <ul className="list-disc list-inside space-y-1 p-4 rounded-xl border text-xs" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
            <li>NPR 36-Hour Hackathon 2023 — participated in an innovation challenge to build technical solutions.</li>
            <li>Smartphone Debugging and Troubleshooting Workshop — hands-on hardware and software problem solving.</li>
            <li>Languages: English and Tamil.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
