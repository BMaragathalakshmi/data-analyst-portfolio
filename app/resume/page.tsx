"use client";

import React from "react";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Action Bar (Hidden when printing) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <Badge variant="cyan" size="sm">
            Official Curriculum Vitae
          </Badge>
          <h1 
            className="text-2xl sm:text-3xl font-black font-sans tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Resume Preview
          </h1>
          <p className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
            Click "Download PDF" to save or print this official resume document.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-xl font-bold text-xs font-mono text-white transition-all flex items-center gap-2 shadow-md hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "var(--accent-primary)" }}
          >
            <Download className="w-4 h-4" />
            <span>Download / Print PDF</span>
          </button>
        </div>
      </div>

      {/* Main Resume Paper Canvas */}
      <div 
        id="resume-document"
        className="rounded-2xl border bg-white p-8 sm:p-14 shadow-xl space-y-6 font-sans text-[#1a1a1a] print:border-none print:shadow-none print:p-0 print:m-0"
        style={{
          borderColor: "var(--border-color)",
        }}
      >
        {/* Header Details */}
        <div className="text-center space-y-2 pb-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-[#0f172a] uppercase font-sans">
            MARAGATHALAKSHMI B
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-x-2 text-xs sm:text-[13px] text-[#334155] font-sans">
            <span>Dindigul, Tamil Nadu, India</span>
            <span>|</span>
            <a href="tel:+919025780017" className="hover:underline font-semibold">9025780017</a>
            <span>|</span>
            <a href="mailto:maragathalakshmi4@gmail.com" className="hover:underline font-semibold text-[#0f172a]">
              maragathalakshmi4@gmail.com
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-2 text-xs sm:text-[13px] text-[#2563eb] font-sans">
            <a 
              href="https://linkedin.com/in/maragathalakshmi-b-3671082b7" 
              target="_blank" 
              rel="noreferrer"
              className="hover:underline font-medium text-[#1d4ed8]"
            >
              linkedin.com/in/maragathalakshmi-b-3671082b7
            </a>
            <span className="text-[#64748b]">|</span>
            <a 
              href="https://github.com/BMaragathalakshmi/data-analyst-portfolio" 
              target="_blank" 
              rel="noreferrer"
              className="hover:underline font-medium text-[#1d4ed8]"
            >
              Portfolio
            </a>
          </div>
        </div>

        {/* Section: CAREER OBJECTIVE */}
        <div className="space-y-1.5">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b-2 border-[#1e293b] pb-0.5">
            CAREER OBJECTIVE
          </h2>
          <p className="text-xs sm:text-[13px] leading-relaxed text-[#334155] text-justify">
            Electronics & Communication Engineering student with hands-on experience in Python, web development and a growing focus on data analytics. Seeking an entry-level Data Analyst role to apply skills in data cleaning, exploratory analysis and visualization to turn data into actionable business insights.
          </p>
        </div>

        {/* Section: EDUCATION */}
        <div className="space-y-2">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b-2 border-[#1e293b] pb-0.5">
            EDUCATION
          </h2>
          
          <div className="space-y-2.5 text-xs sm:text-[13px]">
            <div>
              <div className="flex justify-between items-baseline font-bold text-[#0f172a]">
                <span>Bachelor of Engineering - Electronics & Communication Engineering</span>
                <span className="text-xs font-normal text-[#475569]">2022 - Present</span>
              </div>
              <div className="text-[#334155]">
                NPR College of Engineering and Technology, Dindigul | <span className="font-semibold">CGPA: 7.44</span>
              </div>
            </div>

            <div>
              <div className="font-bold text-[#0f172a]">
                Higher Secondary (HSC)
              </div>
              <div className="text-[#334155]">
                St. Joseph Girls Higher Secondary School, Dindigul | <span className="font-semibold">81%</span>
              </div>
            </div>

            <div>
              <div className="font-bold text-[#0f172a]">
                Secondary School Leaving Certificate (SSLC)
              </div>
              <div className="text-[#334155]">
                St. Joseph Girls Higher Secondary School, Dindigul | <span className="font-semibold">74%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: TECHNICAL SKILLS */}
        <div className="space-y-1.5">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b-2 border-[#1e293b] pb-0.5">
            TECHNICAL SKILLS
          </h2>
          
          <div className="space-y-1 text-xs sm:text-[13px] text-[#334155] leading-relaxed">
            <div>
              <strong className="text-[#0f172a]">Programming Languages:</strong> Python, C, C++
            </div>
            <div>
              <strong className="text-[#0f172a]">Data Analytics:</strong> Data Cleaning, Exploratory Data Analysis (EDA), Data Visualization, Statistical Analysis, Dashboard Reporting
            </div>
            <div>
              <strong className="text-[#0f172a]">Analytics Tools & Libraries:</strong> SQL, Microsoft Excel, Power BI, Tableau, Pandas, NumPy, Matplotlib, Seaborn, Jupyter Notebook
            </div>
            <div>
              <strong className="text-[#0f172a]">Web Development:</strong> HTML, CSS, JavaScript
            </div>
            <div>
              <strong className="text-[#0f172a]">Networking & IoT:</strong> Cisco Networking, IoT
            </div>
            <div>
              <strong className="text-[#0f172a]">Core Skills:</strong> Problem Solving, Troubleshooting, Debugging, Analytical Thinking, Teamwork
            </div>
          </div>
        </div>

        {/* Section: INTERNSHIP */}
        <div className="space-y-1.5">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b-2 border-[#1e293b] pb-0.5">
            INTERNSHIP
          </h2>

          <div className="space-y-1 text-xs sm:text-[13px]">
            <div className="flex justify-between items-baseline font-bold text-[#0f172a]">
              <span>Full Stack Development Intern - VCodez, Chennai</span>
              <span className="text-xs font-normal text-[#475569]">3 Months</span>
            </div>
            <ul className="list-disc list-outside ml-4 space-y-0.5 text-[#334155] leading-relaxed">
              <li>Built a front-end mini project using HTML, CSS and JavaScript, applying client-side interaction design.</li>
              <li>Collaborated with team members to understand real-world web application deployment.</li>
              <li>Strengthened debugging and problem-solving skills through hands-on development tasks.</li>
            </ul>
          </div>
        </div>

        {/* Section: ACADEMIC PROJECTS */}
        <div className="space-y-1.5">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b-2 border-[#1e293b] pb-0.5">
            ACADEMIC PROJECTS
          </h2>

          <div className="space-y-1 text-xs sm:text-[13px]">
            <div className="flex justify-between items-baseline font-bold text-[#0f172a]">
              <span>Online Food Ordering System (Front-End)</span>
              <span className="text-xs font-normal italic text-[#475569]">HTML, CSS, JavaScript</span>
            </div>
            <ul className="list-disc list-outside ml-4 space-y-0.5 text-[#334155] leading-relaxed">
              <li>Designed a responsive interface allowing users to browse food items, select items and place mock orders.</li>
              <li>Applied UI/UX principles to improve usability and performance.</li>
            </ul>
          </div>
        </div>

        {/* Section: WORKSHOPS & HACKATHONS */}
        <div className="space-y-1.5">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b-2 border-[#1e293b] pb-0.5">
            WORKSHOPS & HACKATHONS
          </h2>

          <ul className="list-disc list-outside ml-4 space-y-1 text-xs sm:text-[13px] text-[#334155] leading-relaxed">
            <li>
              <strong>NPR 36-Hour Hackathon 2023</strong> - Participated in an innovation challenge to build creative technical solutions.
            </li>
            <li>
              <strong>Smartphone Debugging and Troubleshooting Workshop</strong> - Hands-on learning of smartphone hardware and software problem solving.
            </li>
          </ul>
        </div>

        {/* Section: PERSONAL DETAILS */}
        <div className="space-y-1">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b-2 border-[#1e293b] pb-0.5">
            PERSONAL DETAILS
          </h2>

          <div className="space-y-0.5 text-xs sm:text-[13px] text-[#334155]">
            <div>
              <strong className="text-[#0f172a]">Languages Known:</strong> English, Tamil
            </div>
            <div>
              <strong className="text-[#0f172a]">Date of Birth:</strong> 04-12-2004
            </div>
          </div>
        </div>

        {/* Section: DECLARATION */}
        <div className="space-y-1 pt-1">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0f172a] border-b-2 border-[#1e293b] pb-0.5">
            DECLARATION
          </h2>
          <p className="text-xs sm:text-[13px] text-[#334155] italic">
            I hereby declare that the above information is true to the best of my knowledge and belief.
          </p>
        </div>
      </div>
    </div>
  );
}
