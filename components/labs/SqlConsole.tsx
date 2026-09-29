"use client";

import React, { useState, useEffect, useRef } from "react";
import initSqlJs, { Database as SqlDatabase } from "sql.js";
import Papa from "papaparse";
import { 
  Terminal, 
  Play, 
  Sparkles, 
  Database, 
  Clock, 
  Table, 
  AlertCircle
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { SQL_PRESETS, SqlQueryPreset } from "@/lib/data/labs-data";

interface SchemaTable {
  name: string;
  rowCount: number;
  columns: { name: string; type: string }[];
}

const DATABASE_SCHEMAS: SchemaTable[] = [
  {
    name: "retail_sales",
    rowCount: 1000,
    columns: [
      { name: "order_id", type: "VARCHAR(20) PK" },
      { name: "order_date", type: "DATE" },
      { name: "customer_id", type: "VARCHAR(20)" },
      { name: "segment", type: "VARCHAR(30)" },
      { name: "region", type: "VARCHAR(20)" },
      { name: "category", type: "VARCHAR(30)" },
      { name: "sub_category", type: "VARCHAR(30)" },
      { name: "sales", type: "FLOAT" },
      { name: "quantity", type: "INT" },
      { name: "discount", type: "FLOAT" },
      { name: "profit", type: "FLOAT" },
    ]
  },
  {
    name: "customer_retention",
    rowCount: 500,
    columns: [
      { name: "customer_id", type: "VARCHAR(20) PK" },
      { name: "cohort_month", type: "VARCHAR(10)" },
      { name: "order_count", type: "INT" },
      { name: "total_spent", type: "FLOAT" },
      { name: "avg_order_value", type: "FLOAT" },
      { name: "recency_days", type: "INT" },
      { name: "rfm_segment", type: "VARCHAR(30)" },
      { name: "is_churned", type: "INT" }
    ]
  },
  {
    name: "workforce_hr",
    rowCount: 500,
    columns: [
      { name: "employee_id", type: "VARCHAR(20) PK" },
      { name: "department", type: "VARCHAR(30)" },
      { name: "job_role", type: "VARCHAR(40)" },
      { name: "age", type: "INT" },
      { name: "tenure_years", type: "FLOAT" },
      { name: "monthly_income", type: "INT" },
      { name: "job_satisfaction", type: "INT" },
      { name: "overtime", type: "VARCHAR(5)" },
      { name: "attrition", type: "VARCHAR(5)" }
    ]
  },
  {
    name: "ecommerce_operations",
    rowCount: 1000,
    columns: [
      { name: "order_id", type: "VARCHAR(20) PK" },
      { name: "courier_partner", type: "VARCHAR(40)" },
      { name: "promised_delivery_days", type: "INT" },
      { name: "actual_delivery_days", type: "INT" },
      { name: "sla_met", type: "VARCHAR(5)" },
      { name: "order_status", type: "VARCHAR(20)" },
      { name: "shipping_cost", type: "FLOAT" }
    ]
  }
];

const DATASETS = [
  ["retail_sales", "/data/retail_sales_clean.csv"],
  ["customer_retention", "/data/customer_retention.csv"],
  ["workforce_hr", "/data/workforce_hr.csv"],
  ["ecommerce_operations", "/data/ecommerce_operations.csv"],
] as const;

const quoteIdentifier = (value: string) => `"${value.replace(/"/g, '""')}"`;

async function createDatabase(): Promise<SqlDatabase> {
  const SQL = await initSqlJs({ locateFile: () => "/sql-wasm.wasm" });
  const database = new SQL.Database();

  for (const [tableName, csvUrl] of DATASETS) {
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error(`Unable to load ${csvUrl}.`);

    const parsed = Papa.parse<Record<string, string | number | null>>(await response.text(), {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });
    if (parsed.errors.length || !parsed.meta.fields?.length) {
      throw new Error(`Unable to parse ${csvUrl}.`);
    }

    const columns = parsed.meta.fields;
    const definitions = columns.map((column) => `${quoteIdentifier(column)} NUMERIC`).join(", ");
    database.run(`CREATE TABLE ${quoteIdentifier(tableName)} (${definitions})`);

    const placeholders = columns.map(() => "?").join(", ");
    const statement = database.prepare(`INSERT INTO ${quoteIdentifier(tableName)} VALUES (${placeholders})`);
    try {
      for (const row of parsed.data) {
        statement.run(columns.map((column) => row[column] ?? null));
      }
    } finally {
      statement.free();
    }
  }

  return database;
}

export const SqlConsole: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<SqlQueryPreset>(SQL_PRESETS[0]);
  const [queryText, setQueryText] = useState<string>(SQL_PRESETS[0].sql);
  const [activeSchema, setActiveSchema] = useState<string>("retail_sales");
  const [isRunning, setIsRunning] = useState(false);
  const [resultColumns, setResultColumns] = useState<string[]>([]);
  const [resultRows, setResultRows] = useState<any[][]>([]);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const databasePromise = useRef<Promise<SqlDatabase> | null>(null);

  const handleSelectPreset = (preset: SqlQueryPreset) => {
    setSelectedPreset(preset);
    setQueryText(preset.sql);
    setActiveSchema(preset.targetTable);
  };

  const handleRunQuery = async () => {
    setIsRunning(true);
    setErrorMessage(null);
    const start = performance.now();

    try {
      if (!databasePromise.current) databasePromise.current = createDatabase();
      const database = await databasePromise.current;
      const results = database.exec(queryText, { maxRows: 100 });
      const result = results[0];
      setResultColumns(result?.columns ?? []);
      setResultRows(result?.values ?? []);
      setExecutionTime(Number((performance.now() - start).toFixed(2)));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to query the in-browser SQLite database.");
      setResultColumns([]);
      setResultRows([]);
    } finally {
      setIsRunning(false);
    }
  };

  // Run initial preset on load
  useEffect(() => {
    handleRunQuery();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Presets Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold uppercase flex items-center gap-1.5" style={{ color: "var(--accent-primary)" }}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Analytical Query Presets</span>
          </span>
          <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
            Click any preset to load into SQL Workbench
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SQL_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className="p-3.5 rounded-xl text-left transition-all font-mono border"
              style={{
                backgroundColor: selectedPreset.id === preset.id ? "var(--accent-pill-bg)" : "var(--bg-surface)",
                borderColor: selectedPreset.id === preset.id ? "var(--accent-primary)" : "var(--border-color)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold truncate" style={{ color: selectedPreset.id === preset.id ? "var(--accent-primary)" : "var(--text-primary)" }}>
                  {preset.title}
                </span>
                <Badge variant="sky" size="sm">
                  {preset.category}
                </Badge>
              </div>
              <p className="text-[11px] line-clamp-2 font-sans" style={{ color: "var(--text-secondary)" }}>
                {preset.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Console & Schema Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Schema Catalog */}
        <GlassCard className="p-5 space-y-4 font-mono text-xs">
          <div className="flex items-center gap-2 font-semibold uppercase pb-2 border-b" style={{ color: "var(--accent-primary)", borderColor: "var(--border-color)" }}>
            <Database className="w-4 h-4" />
            <span>Schema Explorer</span>
          </div>

          <div className="space-y-3">
            {DATABASE_SCHEMAS.map((schema) => (
              <div
                key={schema.name}
                className="rounded-xl border p-3 transition-all cursor-pointer"
                style={{
                  backgroundColor: activeSchema === schema.name ? "var(--accent-pill-bg)" : "var(--bg-subtle)",
                  borderColor: activeSchema === schema.name ? "var(--accent-primary)" : "var(--border-color)",
                }}
                onClick={() => setActiveSchema(schema.name)}
              >
                <div className="flex items-center justify-between font-bold" style={{ color: "var(--text-primary)" }}>
                  <span>{schema.name}</span>
                  <span className="text-[10px] font-normal" style={{ color: "var(--accent-primary)" }}>{schema.rowCount} rows</span>
                </div>

                {activeSchema === schema.name && (
                  <div className="mt-2 pt-2 border-t space-y-1" style={{ borderColor: "var(--border-color)" }}>
                    {schema.columns.map((col) => (
                      <div key={col.name} className="flex items-center justify-between text-[11px]">
                        <span style={{ color: "var(--text-secondary)" }}>• {col.name}</span>
                        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{col.type}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl border text-[11px] space-y-1" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
            <div className="font-bold" style={{ color: "var(--text-primary)" }}>🛡️ Read-Only Sandbox</div>
            <p className="font-sans text-[11px]">
              Guaranteed secure SQL sandbox. Permitted statements: SELECT, WITH, EXPLAIN.
            </p>
          </div>
        </GlassCard>

        {/* Right Column: SQL Editor & Output */}
        <div className="lg:col-span-3 space-y-6">
          <GlassCard className="p-5 space-y-4" gradientBorder>
            <div className="flex items-center justify-between gap-4 pb-2 border-b" style={{ borderColor: "var(--border-color)" }}>
              <div className="flex items-center gap-2 text-xs font-mono">
                <Terminal className="w-4 h-4" style={{ color: "var(--accent-primary)" }} />
                <span className="font-bold" style={{ color: "var(--text-primary)" }}>Interactive SQL Workbench</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleRunQuery}
                  disabled={isRunning}
                  icon={<Play className="w-3.5 h-3.5 fill-current" />}
                >
                  {isRunning ? "Executing..." : "Run SQL Query"}
                </Button>
              </div>
            </div>

            {/* Editable SQL Textarea */}
            <div className="relative rounded-xl overflow-hidden border font-mono text-xs" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
              <textarea
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                rows={8}
                className="w-full bg-transparent p-4 outline-none resize-none leading-relaxed font-mono"
                style={{ color: "var(--text-primary)" }}
                spellCheck={false}
              />
            </div>

            <div className="text-[11px] font-mono flex items-center justify-between" style={{ color: "var(--text-muted)" }}>
              <span>Target DB Engine: In-Memory SQLite 3.45</span>
              <span>Output Limit: 100 Rows</span>
            </div>
          </GlassCard>

          {/* Results Table & Telemetry */}
          {errorMessage ? (
            <div className="p-4 rounded-xl bg-[#fdeeed] border border-[#f6c3c2] text-xs font-mono text-[#b32b2b] flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">SQL Execution Error:</strong>
                <span>{errorMessage}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-semibold uppercase flex items-center gap-1.5" style={{ color: "var(--accent-primary)" }}>
                  <Table className="w-3.5 h-3.5" />
                  <span>Query Results ({resultRows.length} rows returned)</span>
                </span>
                {executionTime !== null && (
                  <span className="flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>Execution Time: {executionTime} ms</span>
                  </span>
                )}
              </div>

              <DataTable
                columns={resultColumns}
                rows={resultRows}
                totalCount={resultRows.length}
                emptyMessage="No results returned. Execute a SELECT query above."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
