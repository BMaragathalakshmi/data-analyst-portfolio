"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Send, 
  MapPin, 
  Github,
  Linkedin, 
  Phone,
  CheckCircle2, 
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const body = new URLSearchParams({
        "form-name": "contact",
        ...formData,
      }).toString();
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (res.ok) {
        setSubmitStatus("success");
        setResponseMsg("Thanks — your message has been submitted.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
        setResponseMsg("Failed to submit message. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setResponseMsg("Network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <Badge variant="cyan" size="sm">
          Get in Touch
        </Badge>
        <h1 
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-sans tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Contact & Inquiries
        </h1>
        <p 
          className="text-xs sm:text-sm font-mono"
          style={{ color: "var(--text-secondary)" }}
        >
          Open to entry-level Data Analyst roles, internships, and project collaboration.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Contact Channels */}
        <div className="lg:col-span-5 space-y-4">
          <div 
            className="rounded-2xl border p-6 space-y-5"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div className="space-y-1">
              <h2 
                className="text-lg font-bold font-sans"
                style={{ color: "var(--text-primary)" }}
              >
                Contact Channels
              </h2>
              <p 
                className="text-xs font-sans"
                style={{ color: "var(--text-secondary)" }}
              >
                Contact me by email, phone, or LinkedIn for entry-level data analyst opportunities.
              </p>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div 
                className="p-3.5 rounded-xl border flex items-center gap-3"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div 
                  className="p-2 rounded-lg"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    color: "var(--accent-primary)",
                  }}
                >
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase block" style={{ color: "var(--text-muted)" }}>Email Address</span>
                  <a href="mailto:maragathalakshmi4@gmail.com" className="font-bold hover:underline" style={{ color: "var(--text-primary)" }}>maragathalakshmi4@gmail.com</a>
                </div>
              </div>

              <div 
                className="p-3.5 rounded-xl border flex items-center gap-3"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div 
                  className="p-2 rounded-lg"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    color: "var(--accent-primary)",
                  }}
                >
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase block" style={{ color: "var(--text-muted)" }}>Location</span>
                  <span className="font-bold" style={{ color: "var(--text-primary)" }}>Dindigul, Tamil Nadu, India</span>
                </div>
              </div>

              <div 
                className="p-3.5 rounded-xl border flex items-center gap-3"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div 
                  className="p-2 rounded-lg"
                  style={{
                    backgroundColor: "var(--bg-surface)",
                    color: "var(--accent-secondary)",
                  }}
                >
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase block" style={{ color: "var(--text-muted)" }}>Phone</span>
                  <a href="tel:+919025780017" className="font-bold hover:underline" style={{ color: "var(--accent-secondary)" }}>+91 90257 80017</a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://github.com/BMaragathalakshmi"
                target="_blank"
                rel="noreferrer"
                className="flex-1 p-2.5 rounded-xl border text-xs font-mono flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                <Github className="w-4 h-4" style={{ color: "var(--accent-primary)" }} />
                <span>GitHub Profile</span>
              </a>
              <a
                href="https://linkedin.com/in/maragathalakshmi-b-3671082b7"
                target="_blank"
                rel="noreferrer"
                className="flex-1 p-2.5 rounded-xl border text-xs font-mono flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                <Linkedin className="w-4 h-4" style={{ color: "var(--accent-primary)" }} />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div 
            className="rounded-2xl border p-6 sm:p-8 space-y-5"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div className="space-y-1">
              <h2 
                className="text-lg font-bold font-sans"
                style={{ color: "var(--text-primary)" }}
              >
                Send a Message
              </h2>
              <p 
                className="text-xs font-sans"
                style={{ color: "var(--text-secondary)" }}
              >
                Have a question about a project, SQL query, or opportunity?
              </p>
            </div>

            <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-3.5">
              <input type="hidden" name="form-name" value="contact" />
              <p className="absolute h-px w-px overflow-hidden [clip:rect(0,0,0,0)]">
                <label>Do not fill this field: <input name="bot-field" /></label>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1 font-mono text-xs">
                  <label style={{ color: "var(--text-secondary)" }}>Your Name *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full human-input px-3.5 py-2.5 rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1 font-mono text-xs">
                  <label style={{ color: "var(--text-secondary)" }}>Your Email *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full human-input px-3.5 py-2.5 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1 font-mono text-xs">
                <label style={{ color: "var(--text-secondary)" }}>Subject</label>
                <input
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Data Analyst Opportunity"
                  className="w-full human-input px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1 font-mono text-xs">
                <label style={{ color: "var(--text-secondary)" }}>Message *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full human-input px-3.5 py-2.5 rounded-xl text-xs leading-relaxed"
                />
              </div>

              {submitStatus === "success" && (
                <div 
                  className="p-3.5 rounded-xl border text-xs font-mono flex items-center gap-2"
                  style={{
                    backgroundColor: "#e8f4ec",
                    borderColor: "#b6dfc2",
                    color: "#1d6a38",
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{responseMsg}</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div 
                  className="p-3.5 rounded-xl border text-xs font-mono flex items-center gap-2"
                  style={{
                    backgroundColor: "#fbebe8",
                    borderColor: "#f2c1b8",
                    color: "#a83520",
                  }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{responseMsg}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
                icon={<Send className="w-4 h-4" />}
              >
                {isSubmitting ? "Sending..." : "Submit Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
