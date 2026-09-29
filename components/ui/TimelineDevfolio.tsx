import React from "react";

export const TimelineDevfolio: React.FC = () => {
  const timelineItems = [
    {
      period: "2022 - Present",
      title: "B.E. Electronics & Communication Engineering",
      institution: "NPR College of Engineering and Technology, Dindigul",
      desc: "Current CGPA: 7.44. Coursework and independent practice include programming, networking, IoT, web development, and data analytics.",
      tag: "Academic Degree",
      tagClass: "bg-[#faebe7] text-[#b84327] border-[#e8c7be]"
    },
    {
      period: "3 Months",
      title: "Full Stack Development Intern",
      institution: "VCodez, Chennai",
      desc: "Built a front-end mini project with HTML, CSS, and JavaScript; collaborated with a development team and strengthened debugging and problem-solving skills.",
      tag: "Internship",
      tagClass: "bg-[#e5eee9] text-[#244f40] border-[#c0d8cd]"
    },
    {
      period: "2023",
      title: "NPR 36-Hour Hackathon",
      institution: "NPR College",
      desc: "Participated in an innovation challenge focused on developing practical technical solutions with a team.",
      tag: "Hackathon",
      tagClass: "bg-[#fdf3e2] text-[#9c6310] border-[#f4dbb1]"
    }
  ];

  return (
    <section id="experience" className="py-20 border-b" style={{ borderColor: "var(--border-color)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: "var(--accent-primary)" }}>
            Education & Development
          </p>
          <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight" style={{ color: "var(--text-primary)" }}>
            Education & Experience
          </h2>
          <p className="text-xs sm:text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
            Academic study and hands-on analytics practice.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 space-y-8 my-6 ml-2" style={{ borderColor: "var(--border-color)" }}>
          {timelineItems.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-colors shadow-sm"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--accent-primary)",
                }}
              />

              <div
                className="p-6 sm:p-7 rounded-2xl border space-y-3 transition-all shadow-md"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-color)",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold" style={{ color: "var(--accent-primary)" }}>
                      {item.period}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${item.tagClass}`}>
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-medium" style={{ color: "var(--text-secondary)" }}>
                    {item.institution}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-sans" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm font-sans leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
