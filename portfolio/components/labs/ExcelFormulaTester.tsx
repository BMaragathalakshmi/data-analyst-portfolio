"use client";

import React, { useState } from "react";
import { Search, Table, Sparkles, Copy, Check } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { EXCEL_FORMULAS, ExcelFormulaExample } from "@/lib/data/labs-data";

export const ExcelFormulaTester: React.FC = () => {
  const [selectedFormula, setSelectedFormula] = useState<ExcelFormulaExample>(EXCEL_FORMULAS[0]);
  const [copied, setCopied] = useState(false);

  // Dynamic XLOOKUP Simulator State
  const [searchProductId, setSearchProductId] = useState("PROD-102");
  
  const productCatalog = [
    { id: "PROD-101", name: "Executive Ergonomic Chair", category: "Furniture", basePrice: 420.00, margin: "18%" },
    { id: "PROD-102", name: "Ultra HD Monitor 32-inch", category: "Technology", basePrice: 650.00, margin: "24%" },
    { id: "PROD-103", name: "Mechanical Coding Keyboard", category: "Technology", basePrice: 140.00, margin: "32%" },
    { id: "PROD-104", name: "Premium Oak Conference Table", category: "Furniture", basePrice: 890.00, margin: "8%" },
    { id: "PROD-105", name: "Heavy Duty File Storage", category: "Office Supplies", basePrice: 85.00, margin: "22%" }
  ];

  const matchedProduct = productCatalog.find((p) => p.id.toUpperCase() === searchProductId.trim().toUpperCase());

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Formula Navigation Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold uppercase flex items-center gap-1.5" style={{ color: "var(--accent-primary)" }}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enterprise Excel Formula Catalog</span>
          </span>
          <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
            Select a formula to inspect syntax & real-time spreadsheet simulation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {EXCEL_FORMULAS.map((formula) => (
            <button
              key={formula.id}
              onClick={() => setSelectedFormula(formula)}
              className="p-3.5 rounded-xl text-left transition-all font-mono border"
              style={{
                backgroundColor: selectedFormula.id === formula.id ? "var(--accent-pill-bg)" : "var(--bg-surface)",
                borderColor: selectedFormula.id === formula.id ? "var(--accent-primary)" : "var(--border-color)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <div className="text-xs font-bold mb-1" style={{ color: selectedFormula.id === formula.id ? "var(--accent-primary)" : "var(--text-primary)" }}>
                {formula.name}
              </div>
              <Badge variant="cyan" size="sm">
                {formula.category}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Formula Breakdown Card */}
      <GlassCard className="p-6 space-y-6" gradientBorder>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: "var(--border-color)" }}>
          <div>
            <h3 className="text-xl font-bold font-sans" style={{ color: "var(--text-primary)" }}>
              {selectedFormula.name}
            </h3>
            <p className="text-xs font-mono mt-0.5" style={{ color: "var(--accent-secondary)" }}>
              Category: {selectedFormula.category}
            </p>
          </div>

          <button
            onClick={() => handleCopy(selectedFormula.syntax)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-colors hover:opacity-80"
            style={{
              backgroundColor: "var(--bg-subtle)",
              borderColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Syntax Copied" : "Copy Formula"}</span>
          </button>
        </div>

        {/* Formula Syntax Box */}
        <div className="p-4 rounded-xl border font-mono text-xs overflow-x-auto" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)", color: "var(--accent-primary)" }}>
          <code>{selectedFormula.syntax}</code>
        </div>

        {/* Use Case & Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border space-y-1" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
            <span className="font-mono uppercase font-bold" style={{ color: "var(--accent-primary)" }}>Business Problem / Use Case</span>
            <p className="font-sans leading-relaxed" style={{ color: "var(--text-secondary)" }}>{selectedFormula.useCase}</p>
          </div>
          <div className="p-4 rounded-xl border space-y-1" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
            <span className="font-mono uppercase font-bold" style={{ color: "var(--accent-secondary)" }}>Analytical Implementation Rationale</span>
            <p className="font-sans leading-relaxed" style={{ color: "var(--text-secondary)" }}>{selectedFormula.explanation}</p>
          </div>
        </div>

        {/* Interactive Spreadsheet Lookup Demonstration */}
        <div className="p-5 rounded-2xl border space-y-4 shadow-sm" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-color)" }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
              <Table className="w-3.5 h-3.5" style={{ color: "var(--accent-primary)" }} />
              <span>Interactive Spreadsheet Evaluation Sandbox</span>
            </span>
            <span className="text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>Target: Product_Catalog.xlsx</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={searchProductId}
                onChange={(e) => setSearchProductId(e.target.value)}
                placeholder="Enter Product ID (e.g. PROD-102)"
                className="w-full human-input px-4 py-2.5 rounded-xl font-mono text-xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>

            <div className="text-xs font-mono shrink-0" style={{ color: "var(--text-secondary)" }}>
              Formula: <code style={{ color: "var(--accent-primary)" }}>=XLOOKUP(&quot;{searchProductId}&quot;, A:A, D:D)</code>
            </div>
          </div>

          {/* Table Preview */}
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border-color)" }}>
            <table className="w-full text-xs font-mono text-left">
              <thead>
                <tr className="border-b" style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text-secondary)", borderColor: "var(--border-color)" }}>
                  <th className="py-2.5 px-3">Col A (Product ID)</th>
                  <th className="py-2.5 px-3">Col B (Description)</th>
                  <th className="py-2.5 px-3">Col C (Category)</th>
                  <th className="py-2.5 px-3">Col D (Base Price)</th>
                  <th className="py-2.5 px-3">Col E (Margin)</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--border-color)" }}>
                {productCatalog.map((prod) => {
                  const isMatch = matchedProduct?.id === prod.id;
                  return (
                    <tr
                      key={prod.id}
                      style={{
                        backgroundColor: isMatch ? "var(--accent-pill-bg)" : "transparent",
                        color: isMatch ? "var(--accent-primary)" : "var(--text-primary)",
                        fontWeight: isMatch ? "bold" : "normal",
                      }}
                    >
                      <td className="py-2 px-3">{prod.id}</td>
                      <td className="py-2 px-3">{prod.name}</td>
                      <td className="py-2 px-3">{prod.category}</td>
                      <td className="py-2 px-3">${prod.basePrice.toFixed(2)}</td>
                      <td className="py-2 px-3">{prod.margin}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Dynamic Result Output Banner */}
          <div className="p-3.5 rounded-xl border flex items-center justify-between font-mono text-xs" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
            <span style={{ color: "var(--text-secondary)" }}>Formula Result Cell:</span>
            {matchedProduct ? (
              <span className="text-emerald-700 font-bold">
                ✓ Extracted Price: ${matchedProduct.basePrice.toFixed(2)} ({matchedProduct.name})
              </span>
            ) : (
              <span className="text-rose-700 font-bold">
                ✗ #N/A (Product ID Not Found in Catalog)
              </span>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
