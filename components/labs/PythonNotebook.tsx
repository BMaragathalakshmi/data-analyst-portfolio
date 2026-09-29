"use client";

import React, { useState } from "react";
import { 
  Play, 
  Download, 
  FileCode
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface NotebookCell {
  id: number;
  type: "markdown" | "code";
  content: string;
  output?: {
    type: "text" | "table" | "chart";
    data?: any;
    text?: string;
  };
}

const SAMPLE_NOTEBOOK_CELLS: NotebookCell[] = [
  {
    id: 1,
    type: "markdown",
    content: `### 1. Ingestion & Environment Setup
Import essential analytical packages and set styling preferences for exploratory data visualization.`
  },
  {
    id: 2,
    type: "code",
    content: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df = pd.read_csv('public/data/retail_sales_clean.csv')
print(f"Dataset Loaded Successfully: {df.shape[0]} rows, {df.shape[1]} features.")
df.info()`,
    output: {
      type: "text",
      text: `<class 'pandas.core.frame.DataFrame'>
RangeIndex: 1000 entries, 0 to 999
Data columns (total 14 columns):
 #   Column         Non-Null Count  Dtype  
---  ------         --------------  -----  
 0   order_id       1000 non-null   object 
 1   order_date     1000 non-null   object 
 2   customer_id    1000 non-null   object 
 3   region         1000 non-null   object 
 4   category       1000 non-null   object 
 5   sub_category   1000 non-null   object 
 6   sales          1000 non-null   float64
 7   quantity       1000 non-null   int64  
 8   discount       1000 non-null   float64
 9   profit         1000 non-null   float64
dtypes: float64(3), int64(1), object(10)
memory usage: 109.5+ KB`
    }
  },
  {
    id: 3,
    type: "markdown",
    content: `### 2. Category Profit Margin Breakdown
Compute summary aggregations and profit margins across product lines.`
  },
  {
    id: 4,
    type: "code",
    content: `category_summary = df.groupby('category').agg({
    'sales': 'sum',
    'profit': 'sum',
    'discount': 'mean',
    'order_id': 'count'
}).reset_index()

category_summary['margin_pct'] = (category_summary['profit'] / category_summary['sales']) * 100
print(category_summary.round(2).to_string(index=False))`,
    output: {
      type: "chart",
      data: [
        { name: "Technology", sales: 178500, profit: 40000, margin: 22.4 },
        { name: "Furniture", sales: 132400, profit: 12200, margin: 9.2 },
        { name: "Office Supplies", sales: 108020, profit: 18200, margin: 16.8 }
      ],
      text: `category      sales    profit  discount  order_id  margin_pct
Furniture  132400.0   12200.0      0.14       310        9.22
Office Sup 108020.0   18200.0      0.08       345       16.85
Technology 178500.0   40000.0      0.09       345       22.41`
    }
  },
  {
    id: 5,
    type: "markdown",
    content: `### 3. Outlier Diagnostics on Profit Margins
Analyze IQR discount distribution to detect margin loss triggers.`
  },
  {
    id: 6,
    type: "code",
    content: `# Correlation Matrix & Elasticity
corr = df[['sales', 'profit', 'discount', 'quantity']].corr()
print("Correlation Matrix:\n", corr.round(3))`,
    output: {
      type: "text",
      text: `Correlation Matrix:
           sales  profit  discount  quantity
sales     1.000   0.482    -0.084     0.286
profit    0.482   1.000    -0.484     0.114
discount -0.084  -0.484     1.000     0.012
quantity  0.286   0.114     0.012     1.000

Key Takeaway: Profit has a strong negative correlation (-0.484) with Discount.`
    }
  }
];

export const PythonNotebook: React.FC = () => {
  const [executedCells, setExecutedCells] = useState<Record<number, boolean>>({
    2: true,
    4: true,
    6: true,
  });

  const handleRunCell = (id: number) => {
    setExecutedCells((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-8">
      {/* Notebook Toolbar */}
      <GlassCard className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs" gradientBorder>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg border flex items-center justify-center" style={{ backgroundColor: "var(--accent-pill-bg)", borderColor: "var(--accent-primary)", color: "var(--accent-primary)" }}>
            <FileCode className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold font-sans" style={{ color: "var(--text-primary)" }}>retail_sales_eda.ipynb</div>
            <div className="text-[11px]" style={{ color: "var(--text-secondary)" }}>Kernel: Python 3.11 (Pandas, NumPy, Matplotlib)</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            href="/notebooks/retail_sales_eda.ipynb"
            variant="secondary"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Download .ipynb
          </Button>
          <Badge variant="emerald" size="md">
            Interactive Notebook Simulator
          </Badge>
        </div>
      </GlassCard>

      {/* Notebook Cells Container */}
      <div className="space-y-6">
        {SAMPLE_NOTEBOOK_CELLS.map((cell) => {
          if (cell.type === "markdown") {
            return (
              <div
                key={cell.id}
                className="p-4 rounded-xl border font-sans text-xs leading-relaxed"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                {cell.content}
              </div>
            );
          }

          const isExecuted = executedCells[cell.id];

          return (
            <div
              key={cell.id}
              className="rounded-2xl border overflow-hidden shadow-sm backdrop-blur-md"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-color)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              {/* Code Cell Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b font-mono text-xs" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
                <div className="flex items-center gap-2">
                  <span className="font-bold" style={{ color: "var(--accent-primary)" }}>In [{cell.id}]:</span>
                  <span style={{ color: "var(--text-muted)" }}>Python 3</span>
                </div>
                <button
                  onClick={() => handleRunCell(cell.id)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-mono transition-colors"
                  style={{
                    backgroundColor: "var(--accent-pill-bg)",
                    borderColor: "var(--accent-primary)",
                    color: "var(--accent-primary)",
                  }}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Execute Cell</span>
                </button>
              </div>

              {/* Code Input */}
              <div className="p-4 font-mono text-xs overflow-x-auto" style={{ backgroundColor: "var(--bg-surface-elevated)", color: "var(--text-primary)" }}>
                <pre className="whitespace-pre">{cell.content}</pre>
              </div>

              {/* Output Section */}
              {isExecuted && cell.output && (
                <div className="border-t p-4 space-y-3 font-mono text-xs" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-color)" }}>
                  <div className="flex items-center gap-2 text-[11px]" style={{ color: "var(--text-muted)" }}>
                    <span className="text-emerald-700 font-bold">Out [{cell.id}]:</span>
                    <span>Execution Status: Success (0.12s)</span>
                  </div>

                  {cell.output.text && (
                    <pre className="p-3 rounded-xl border overflow-x-auto text-[11px] leading-relaxed" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}>
                      {cell.output.text}
                    </pre>
                  )}

                  {cell.output.type === "chart" && cell.output.data && (
                    <div className="h-64 p-4 rounded-xl border" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={cell.output.data}>
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
                          <Bar dataKey="sales" fill="#c2593f" name="Sales ($)" />
                          <Bar dataKey="profit" fill="#2d5a4a" name="Profit ($)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
