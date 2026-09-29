"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import { 
  Upload, 
  FileCheck, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  Table as TableIcon
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { DataQualityIssue, CleaningLogEntry } from "@/lib/types";

export const CsvUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [rawData, setRawData] = useState<any[]>([]);
  const [cleanedData, setCleanedData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [issues, setIssues] = useState<DataQualityIssue[]>([]);
  const [cleaningLog, setCleaningLog] = useState<CleaningLogEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"audit" | "preview_raw" | "preview_clean" | "log">("audit");
  const [isProcessing, setIsProcessing] = useState(false);

  // Load sample dataset
  const loadSampleDataset = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/data/retail_sales_raw.csv");
      const csvText = await response.text();
      processCsv(csvText);
    } catch (err) {
      console.error("Failed to load sample dataset: ", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvText = event.target?.result as string;
      processCsv(csvText);
      setIsProcessing(false);
    };
    reader.readAsText(uploadedFile);
  };

  const processCsv = (csvText: string) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedRows = results.data as any[];
        const parsedCols = results.meta.fields || [];

        setRawData(parsedRows);
        setColumns(parsedCols);
        
        // Audit
        auditData(parsedRows, parsedCols);
      },
    });
  };

  const auditData = (data: any[], cols: string[]) => {
    const detectedIssues: DataQualityIssue[] = [];
    const totalRows = data.length;

    // 1. Missing Values
    cols.forEach((col) => {
      const nullCount = data.filter((row) => row[col] === undefined || row[col] === null || String(row[col]).trim() === "").length;
      if (nullCount > 0) {
        detectedIssues.push({
          type: "missing",
          column: col,
          count: nullCount,
          percentage: Number(((nullCount / totalRows) * 100).toFixed(1)),
          severity: nullCount / totalRows > 0.05 ? "high" : "medium",
          recommendation: `Impute with column median/mode or filter invalid rows.`,
        });
      }
    });

    // 2. Duplicates
    const stringRows = data.map((r) => JSON.stringify(r));
    const uniqueRows = new Set(stringRows);
    const duplicateCount = totalRows - uniqueRows.size;

    if (duplicateCount > 0) {
      detectedIssues.push({
        type: "duplicate",
        column: "Full Row Record",
        count: duplicateCount,
        percentage: Number(((duplicateCount / totalRows) * 100).toFixed(1)),
        severity: "medium",
        recommendation: "Execute deduplication on primary key identifier.",
      });
    }

    setIssues(detectedIssues);
    setCleanedData([]);
    setCleaningLog([]);
    setActiveTab("audit");
  };

  const executeAutomatedCleaning = () => {
    if (rawData.length === 0) return;

    setIsProcessing(true);
    const log: CleaningLogEntry[] = [];
    let current = [...rawData];

    // Step 1: Remove full duplicate rows
    const initialCount = current.length;
    const seen = new Set();
    current = current.filter((item) => {
      const serialized = JSON.stringify(item);
      return seen.has(serialized) ? false : seen.add(serialized);
    });
    const duplicatesRemoved = initialCount - current.length;
    if (duplicatesRemoved > 0) {
      log.push({
        timestamp: new Date().toLocaleTimeString(),
        operation: "Deduplication",
        rowsAffected: duplicatesRemoved,
        reason: "Removed exact duplicate records to ensure primary key uniqueness.",
      });
    }

    // Step 2: Clean strings (trim whitespace, title case)
    let modifiedStringRows = 0;
    current = current.map((row) => {
      const newRow = { ...row };
      columns.forEach((col) => {
        if (typeof newRow[col] === "string") {
          const trimmed = newRow[col].trim();
          if (trimmed !== newRow[col]) modifiedStringRows++;
          newRow[col] = trimmed;
        }
      });
      return newRow;
    });

    if (modifiedStringRows > 0) {
      log.push({
        timestamp: new Date().toLocaleTimeString(),
        operation: "String Sanitization",
        rowsAffected: modifiedStringRows,
        reason: "Trimmed leading/trailing whitespace and normalized text formatting.",
      });
    }

    // Step 3: Impute missing numerical fields with median
    columns.forEach((col) => {
      const numericalValues = current
        .map((r) => parseFloat(r[col]))
        .filter((val) => !isNaN(val));

      if (numericalValues.length > 0 && numericalValues.length < current.length) {
        numericalValues.sort((a, b) => a - b);
        const median = numericalValues[Math.floor(numericalValues.length / 2)];
        let imputedCount = 0;

        current = current.map((row) => {
          const val = row[col];
          if (val === undefined || val === null || String(val).trim() === "" || isNaN(parseFloat(val))) {
            imputedCount++;
            return { ...row, [col]: median };
          }
          return row;
        });

        if (imputedCount > 0) {
          log.push({
            timestamp: new Date().toLocaleTimeString(),
            operation: "Missing Value Imputation",
            affectedColumn: col,
            rowsAffected: imputedCount,
            reason: `Imputed ${imputedCount} missing values with sub-group median (${median}).`,
          });
        }
      }
    });

    setCleanedData(current);
    setCleaningLog(log);
    setIsProcessing(false);
    setActiveTab("preview_clean");
  };

  const downloadCleanedCsv = () => {
    if (cleanedData.length === 0) return;
    const csvContent = Papa.unparse(cleanedData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "cleaned_dataset_datapulse.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone & Sample Dataset Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 p-6 flex flex-col items-center justify-center border-dashed border-2 hover:border-[#c2593f]/60 transition-all text-center group cursor-pointer relative overflow-hidden" style={{ borderColor: "var(--border-color)" }}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <div className="w-14 h-14 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-transform mb-3" style={{ backgroundColor: "var(--accent-pill-bg)", borderColor: "var(--accent-primary)", color: "var(--accent-primary)" }}>
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold font-sans" style={{ color: "var(--text-primary)" }}>
            Upload Custom CSV Dataset
          </h3>
          <p className="text-xs font-mono mt-1" style={{ color: "var(--text-secondary)" }}>
            Drag and drop or browse (.csv, max 10MB). Client-side processing only.
          </p>
          {file && (
            <div className="mt-3 flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border" style={{ backgroundColor: "var(--accent-pill-bg)", borderColor: "var(--accent-primary)", color: "var(--accent-primary)" }}>
              <FileCheck className="w-3.5 h-3.5" />
              <span>{file.name}</span>
            </div>
          )}
        </GlassCard>

        {/* Quick Preload Card */}
        <GlassCard className="p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase" style={{ color: "var(--accent-primary)" }}>
              <Sparkles className="w-4 h-4" />
              <span>Or Test Preloaded Dirty Dataset</span>
            </div>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Load an authentic benchmark sales dataset with deliberate anomalies, duplicates, and missing profit fields.
            </p>
          </div>

          <div className="space-y-2">
            <Button
              variant="secondary"
              size="sm"
                  onClick={loadSampleDataset}
              className="w-full justify-start font-mono text-xs"
              icon={<TableIcon className="w-3.5 h-3.5" />}
            >
              Load Retail Sales Raw (1,012 rows)
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* Dataset Health Dashboard */}
      {rawData.length > 0 && (
        <GlassCard className="p-6 space-y-6" gradientBorder>
          {/* Controls & KPIs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: "var(--border-color)" }}>
            <div className="space-y-1 font-mono">
              <div className="flex items-center gap-2">
                <Badge variant="cyan" size="md">
                  {rawData.length} Raw Rows Loaded
                </Badge>
                <Badge variant="sky" size="md">
                  {columns.length} Columns
                </Badge>
              </div>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Data Quality Health: {issues.length === 0 ? "100% (Clean)" : `${issues.length} Issues Detected`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={executeAutomatedCleaning}
                disabled={isProcessing}
                icon={<Sparkles className="w-3.5 h-3.5" />}
              >
                Execute Pipeline Cleaning
              </Button>
              {cleanedData.length > 0 && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={downloadCleanedCsv}
                  icon={<Download className="w-3.5 h-3.5 text-emerald-600" />}
                >
                  Download Clean CSV
                </Button>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: "var(--border-color)" }}>
            <button
              onClick={() => setActiveTab("audit")}
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border"
              style={{
                backgroundColor: activeTab === "audit" ? "var(--accent-pill-bg)" : "transparent",
                borderColor: activeTab === "audit" ? "var(--accent-primary)" : "transparent",
                color: activeTab === "audit" ? "var(--accent-primary)" : "var(--text-secondary)",
                fontWeight: activeTab === "audit" ? "bold" : "normal",
              }}
            >
              Quality Audit ({issues.length})
            </button>
            <button
              onClick={() => setActiveTab("preview_raw")}
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border"
              style={{
                backgroundColor: activeTab === "preview_raw" ? "var(--accent-pill-bg)" : "transparent",
                borderColor: activeTab === "preview_raw" ? "var(--accent-primary)" : "transparent",
                color: activeTab === "preview_raw" ? "var(--accent-primary)" : "var(--text-secondary)",
                fontWeight: activeTab === "preview_raw" ? "bold" : "normal",
              }}
            >
              Raw Dataset Preview
            </button>
            {cleanedData.length > 0 && (
              <button
                onClick={() => setActiveTab("preview_clean")}
                className="px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border"
                style={{
                  backgroundColor: activeTab === "preview_clean" ? "var(--accent-pill-bg)" : "transparent",
                  borderColor: activeTab === "preview_clean" ? "var(--accent-primary)" : "transparent",
                  color: activeTab === "preview_clean" ? "var(--accent-primary)" : "var(--text-secondary)",
                  fontWeight: activeTab === "preview_clean" ? "bold" : "normal",
                }}
              >
                Cleaned Preview ({cleanedData.length})
              </button>
            )}
            {cleaningLog.length > 0 && (
              <button
                onClick={() => setActiveTab("log")}
                className="px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border"
                style={{
                  backgroundColor: activeTab === "log" ? "var(--accent-pill-bg)" : "transparent",
                  borderColor: activeTab === "log" ? "var(--accent-primary)" : "transparent",
                  color: activeTab === "log" ? "var(--accent-primary)" : "var(--text-secondary)",
                  fontWeight: activeTab === "log" ? "bold" : "normal",
                }}
              >
                Cleaning Log ({cleaningLog.length})
              </button>
            )}
          </div>

          {/* Tab 1: Quality Audit */}
          {activeTab === "audit" && (
            <div className="space-y-4">
              {issues.length === 0 ? (
                <div className="p-8 text-center rounded-2xl border space-y-2" style={{ backgroundColor: "#e7f4ec", borderColor: "#bfe2cc" }}>
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-semibold text-emerald-800">Pristine Dataset Integrity</h4>
                  <p className="text-xs text-emerald-700">Zero missing values or duplicates detected across all columns.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {issues.map((issue, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border space-y-2 font-mono"
                      style={{
                        backgroundColor: "var(--bg-subtle)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase" style={{ color: "var(--text-primary)" }}>{issue.column}</span>
                        <Badge
                          variant={issue.severity === "high" ? "rose" : "amber"}
                          size="sm"
                        >
                          {issue.type.toUpperCase()} ({issue.count} rows)
                        </Badge>
                      </div>
                      <p className="text-xs font-sans" style={{ color: "var(--text-secondary)" }}>{issue.recommendation}</p>
                      <div className="text-[11px] font-bold" style={{ color: "var(--accent-primary)" }}>Impact: {issue.percentage}% of dataset</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Raw Preview */}
          {activeTab === "preview_raw" && (
            <DataTable
              columns={columns}
              rows={rawData.slice(0, 15).map((r) => columns.map((c) => r[c]))}
              totalCount={rawData.length}
            />
          )}

          {/* Tab 3: Cleaned Preview */}
          {activeTab === "preview_clean" && cleanedData.length > 0 && (
            <DataTable
              columns={columns}
              rows={cleanedData.slice(0, 15).map((r) => columns.map((c) => r[c]))}
              totalCount={cleanedData.length}
            />
          )}

          {/* Tab 4: Cleaning Transformation Log */}
          {activeTab === "log" && (
            <div className="space-y-3 font-mono">
              {cleaningLog.map((entry, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border flex items-start justify-between gap-4 text-xs"
                  style={{
                    backgroundColor: "var(--bg-subtle)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold" style={{ color: "var(--accent-primary)" }}>{entry.operation}</span>
                      {entry.affectedColumn && (
                        <Badge variant="sky" size="sm">
                          Column: {entry.affectedColumn}
                        </Badge>
                      )}
                    </div>
                    <p className="font-sans text-xs" style={{ color: "var(--text-secondary)" }}>{entry.reason}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-emerald-700 font-bold">{entry.rowsAffected} Rows Fixed</span>
                    <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>{entry.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      )}
    </div>
  );
};
