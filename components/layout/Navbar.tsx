"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Github,
  Linkedin, 
  FileText, 
  Mail, 
  Terminal, 
  Wand2, 
  Code2, 
  FileSpreadsheet,
  ChevronDown,
  LayoutDashboard
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Labs", href: "/labs" },
    { name: "Dashboards", href: "/dashboards/power-bi" },
    { name: "Reports", href: "/reports" },
  ];

  const labLinks = [
    { name: "All Labs Hub", href: "/labs", icon: LayoutDashboard, desc: "Interactive Sandbox Overview" },
    { name: "Data Cleaning Lab", href: "/labs/data-cleaning", icon: Wand2, desc: "CSV Quality Auditor & Cleaner" },
    { name: "SQL Query Workbench", href: "/labs/sql-query", icon: Terminal, desc: "Live SQLite Read-Only Sandbox" },
    { name: "Python Analytics Studio", href: "/labs/python-studio", icon: Code2, desc: "Jupyter-Style EDA Notebook" },
    { name: "Excel Analytics", href: "/labs/excel-analytics", icon: FileSpreadsheet, desc: "XLOOKUP & SUMIFS Testing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 border-b backdrop-blur-md ${
        scrolled ? "py-3 shadow-lg" : "py-4"
      }`}
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-color)",
        opacity: scrolled ? 0.96 : 0.9,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center font-black font-mono text-sm shadow-md transition-transform group-hover:scale-105"
            style={{ backgroundColor: "var(--accent-primary)", color: "var(--bg-base)" }}
          >
            MB
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight font-sans block" style={{ color: "var(--text-primary)" }}>
              MARAGATHALAKSHMI
            </span>
            <span className="text-[10px] font-mono block -mt-1" style={{ color: "var(--text-secondary)" }}>
              Data Analyst Portfolio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg transition-colors font-medium border"
                style={{
                  backgroundColor: isActive ? "var(--bg-subtle)" : "transparent",
                  color: isActive ? "var(--accent-primary)" : "var(--text-secondary)",
                  borderColor: isActive ? "var(--border-color)" : "transparent",
                  fontWeight: isActive ? "bold" : "normal",
                }}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Labs Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setLabsDropdownOpen(true)}
            onMouseLeave={() => setLabsDropdownOpen(false)}
          >
            <button
              className="px-2 py-1.5 rounded-lg transition-colors flex items-center gap-0.5"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Toggle labs submenu"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {labsDropdownOpen && (
              <div className="absolute top-full right-0 w-72 pt-2 z-50">
                <div
                  className="rounded-2xl border-2 p-2 shadow-2xl space-y-1"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  {labLinks.map((l) => {
                    const Icon = l.icon;
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="flex items-start gap-2.5 p-2 rounded-xl transition-colors hover:opacity-80"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <div
                          className="p-1.5 rounded-lg border mt-0.5"
                          style={{
                            backgroundColor: "var(--bg-subtle)",
                            borderColor: "var(--border-color)",
                            color: "var(--accent-primary)",
                          }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold font-sans" style={{ color: "var(--text-primary)" }}>
                            {l.name}
                          </div>
                          <div className="text-[10px] font-mono" style={{ color: "var(--text-secondary)" }}>
                            {l.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://github.com/BMaragathalakshmi"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl transition-colors hover:opacity-80"
            style={{ color: "var(--text-secondary)" }}
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/maragathalakshmi-b-3671082b7"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl transition-colors hover:opacity-80"
            style={{ color: "var(--text-secondary)" }}
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <Link
            href="/resume"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all shadow-sm"
            style={{
              backgroundColor: "var(--bg-subtle)",
              borderColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shadow-md"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "var(--bg-base)",
            }}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border"
            style={{
              backgroundColor: "var(--bg-subtle)",
              borderColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-b px-4 py-6 font-mono text-sm space-y-2"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-color)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t flex flex-col gap-2" style={{ borderColor: "var(--border-color)" }}>
            <Link
              href="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-center font-bold border"
              style={{
                backgroundColor: "var(--bg-subtle)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
            >
              Resume / CV
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-center font-bold"
              style={{
                backgroundColor: "var(--accent-primary)",
                color: "var(--bg-base)",
              }}
            >
              Contact Me
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
