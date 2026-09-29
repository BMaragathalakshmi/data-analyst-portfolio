"use client";

import React, { useState } from "react";
import { 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  ChevronRight
} from "lucide-react";
import { PipelineStage, PipelineStageId } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DataTable } from "@/components/ui/DataTable";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { cn } from "@/lib/utils/cn";

interface PipelineExplorerProps {
  stages: PipelineStage[];
}

const PIE_COLORS = ["#c2593f", "#2d5a4a", "#e07a5f", "#d4a373", "#819b89"];

export const PipelineExplorer: React.FC<PipelineExplorerProps> = ({ stages }) => {
  const [activeStageId, setActiveStageId] = useState<PipelineStageId>(stages[0]?.id || "raw-dataset");

  const activeStageIndex = stages.findIndex((s) => s.id === activeStageId);
  const currentStage = stages[activeStageIndex] || stages[0];

  return (
    <div className="space-y-6">
      {/* Interactive Stage Stepper */}
      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div
          className="flex items-center min-w-[840px] gap-1.5 p-1.5 rounded-2xl border"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-color)",
          }}
        >
          {stages.map((stage, idx) => {
            const isActive = stage.id === activeStageId;
            const isCompleted = idx < activeStageIndex;

            return (
              <React.Fragment key={stage.id}>
                <button
                  onClick={() => setActiveStageId(stage.id)}
                  className={cn(
                    "flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all text-left font-mono border",
                    isActive
                      ? "shadow-sm font-bold"
                      : "border-transparent hover:opacity-80"
                  )}
                  style={{
                    backgroundColor: isActive ? "var(--accent-pill-bg)" : "transparent",
                    borderColor: isActive ? "var(--accent-primary)" : "transparent",
                    color: isActive ? "var(--accent-primary)" : "var(--text-secondary)",
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold font-mono border"
                    style={{
                      backgroundColor: isActive ? "var(--accent-primary)" : "var(--bg-subtle)",
                      color: isActive ? "#ffffff" : "var(--text-secondary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : idx + 1}
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold truncate" style={{ color: isActive ? "var(--accent-primary)" : "var(--text-primary)" }}>
                      {stage.title.split(". ")[1] || stage.title}
                    </div>
                    <div className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>
                      {stage.toolsUsed[0] || "Step " + (idx + 1)}
                    </div>
                  </div>
                </button>
                {idx < stages.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 select-none" style={{ color: "var(--border-color)" }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detail Canvas */}
      <div
        className="rounded-2xl border p-6 lg:p-8 space-y-6 shadow-sm"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-color)",
          boxShadow: "var(--card-shadow)",
        }}
      >
        {/* Stage Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: "var(--border-color)" }}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="sky" size="sm">
                Stage {activeStageIndex + 1} of {stages.length}
              </Badge>
              <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                Pipeline Methodology
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-sans" style={{ color: "var(--text-primary)" }}>
              {currentStage.title}
            </h3>
            <p className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
              {currentStage.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {currentStage.toolsUsed.map((tool, i) => (
              <Badge key={i} variant="slate" size="sm">
                {tool}
              </Badge>
            ))}
          </div>
        </div>

        {/* Methodology Description */}
        <div
          className="text-xs sm:text-sm leading-relaxed font-sans p-4 rounded-xl border"
          style={{
            backgroundColor: "var(--bg-subtle)",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
          }}
        >
          <strong className="font-mono text-xs uppercase block mb-1" style={{ color: "var(--accent-primary)" }}>
            Methodology & Purpose:
          </strong>
          {currentStage.description}
        </div>

        {/* Metrics Grid */}
        {currentStage.metrics && currentStage.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {currentStage.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border font-mono"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="text-[11px] uppercase" style={{ color: "var(--text-muted)" }}>{m.label}</div>
                <div className="text-lg font-bold mt-0.5" style={{ color: "var(--accent-primary)" }}>{m.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Code Snippet / Table / Chart Rendering */}
        <div className="space-y-5">
          {/* Table Preview */}
          {currentStage.tablePreview && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase" style={{ color: "var(--text-primary)" }}>
                  Dataset Sample Preview
                </span>
                <span className="text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>
                  Showing top records
                </span>
              </div>
              <DataTable
                columns={currentStage.tablePreview.columns}
                rows={currentStage.tablePreview.rows}
                totalCount={currentStage.tablePreview.totalCount}
              />
            </div>
          )}

          {/* Code Snippet */}
          {currentStage.codeSnippet && (
            <div className="space-y-2">
              <CodeBlock
                code={currentStage.codeSnippet.code}
                language={currentStage.codeSnippet.language}
                title={currentStage.codeSnippet.title}
              />
              <p className="text-xs font-sans italic" style={{ color: "var(--text-muted)" }}>
                Context: {currentStage.codeSnippet.explanation}
              </p>
            </div>
          )}

          {/* Chart */}
          {currentStage.chartData && (
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-semibold uppercase" style={{ color: "var(--text-primary)" }}>
                  Visual Output
                </span>
                <span className="text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>
                  Summary Distribution
                </span>
              </div>
              <div
                className="h-64 w-full p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--bg-subtle)",
                  borderColor: "var(--border-color)",
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  {currentStage.chartType === "pie" ? (
                    <PieChart>
                      <Pie
                        data={currentStage.chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {currentStage.chartData.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#d8cdbe",
                          color: "#1e2422",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                    </PieChart>
                  ) : (
                    <BarChart data={currentStage.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d8cdbe" />
                      <XAxis dataKey="name" stroke="#738078" fontSize={11} />
                      <YAxis stroke="#738078" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#d8cdbe",
                          color: "#1e2422",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="sales" fill="#c2593f" name="Sales ($)" />
                      <Bar dataKey="profit" fill="#2d5a4a" name="Profit ($)" />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Key Insights Bullet Points */}
          {currentStage.insights && currentStage.insights.length > 0 && (
            <div
              className="p-4 rounded-xl border space-y-2"
              style={{
                backgroundColor: "var(--bg-subtle)",
                borderColor: "var(--border-color)",
              }}
            >
              <span className="text-xs font-mono uppercase font-bold" style={{ color: "var(--accent-primary)" }}>
                Key Analytical Takeaways:
              </span>
              <ul className="space-y-1 text-xs font-sans" style={{ color: "var(--text-secondary)" }}>
                {currentStage.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-mono" style={{ color: "var(--accent-primary)" }}>•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Downloadable Artifacts */}
          {currentStage.artifacts && currentStage.artifacts.length > 0 && (
            <div className="pt-3 border-t flex flex-wrap items-center gap-2" style={{ borderColor: "var(--border-color)" }}>
              <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>Stage Artifacts:</span>
              {currentStage.artifacts.map((artifact, idx) => (
                <a
                  key={idx}
                  href={artifact.downloadUrl}
                  download
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: "var(--bg-subtle)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  <Download className="w-3.5 h-3.5" style={{ color: "var(--accent-primary)" }} />
                  <span>{artifact.name}</span>
                  <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>({artifact.size})</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Stepper Footer Controls */}
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              if (activeStageIndex > 0) {
                setActiveStageId(stages[activeStageIndex - 1].id);
              }
            }}
            disabled={activeStageIndex === 0}
          >
            ← Previous
          </Button>

          <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
            Step {activeStageIndex + 1} of {stages.length}
          </span>

          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (activeStageIndex < stages.length - 1) {
                setActiveStageId(stages[activeStageIndex + 1].id);
              }
            }}
            disabled={activeStageIndex === stages.length - 1}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Next Stage
          </Button>
        </div>
      </div>
    </div>
  );
};
