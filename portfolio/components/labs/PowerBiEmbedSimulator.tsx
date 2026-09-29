"use client";

import React, { useState } from "react";
import { 
  Filter, 
  RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const MONTHLY_SALES_DATA = [
  { month: "Jan", sales: 28400, profit: 5100, target: 25000 },
  { month: "Feb", sales: 31200, profit: 5800, target: 28000 },
  { month: "Mar", sales: 36500, profit: 6900, target: 32000 },
  { month: "Apr", sales: 34100, profit: 5400, target: 32000 },
  { month: "May", sales: 38900, profit: 7100, target: 35000 },
  { month: "Jun", sales: 42300, profit: 8200, target: 38000 },
  { month: "Jul", sales: 39500, profit: 6400, target: 38000 },
  { month: "Aug", sales: 44200, profit: 8900, target: 40000 },
  { month: "Sep", sales: 48600, profit: 9400, target: 42000 },
  { month: "Oct", sales: 46100, profit: 7800, target: 42000 },
  { month: "Nov", sales: 52400, profit: 10200, target: 45000 },
  { month: "Dec", sales: 58900, profit: 12400, target: 50000 },
];

const DAX_FORMULAS = [
  {
    name: "Total Sales",
    syntax: `Total Sales = SUM(Fact_Sales[Sales_Amount])`,
    desc: "Aggregates transactional sales volume across active dimensional filters."
  },
  {
    name: "Total Profit",
    syntax: `Total Profit = SUM(Fact_Sales[Profit_Amount])`,
    desc: "Calculates net gross profit after discount subtractions."
  },
  {
    name: "Profit Margin %",
    syntax: `Profit Margin % = DIVIDE([Total Profit], [Total Sales], 0)`,
    desc: "Computes ratio with safe division preventing zero-division crash."
  },
  {
    name: "YoY Sales Growth",
    syntax: `YoY Sales Growth = 
VAR CurrentSales = [Total Sales]
VAR PrevYearSales = CALCULATE([Total Sales], SAMEPERIODLASTYEAR('Dim_Calendar'[Date]))
RETURN DIVIDE(CurrentSales - PrevYearSales, PrevYearSales, 0)`,
    desc: "Time intelligence DAX formula computing year-over-year revenue pacing."
  }
];

export const PowerBiEmbedSimulator: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState<"dashboard" | "dax" | "model">("dashboard");

  // Multiplier logic for simulated interactive filtering
  const regionMultiplier = selectedRegion === "All" ? 1 : selectedRegion === "West" ? 0.35 : selectedRegion === "East" ? 0.30 : selectedRegion === "Central" ? 0.20 : 0.15;
  const categoryMultiplier = selectedCategory === "All" ? 1 : selectedCategory === "Technology" ? 0.45 : selectedCategory === "Furniture" ? 0.32 : 0.23;
  const combinedMult = regionMultiplier * categoryMultiplier;

  const currentRevenue = Math.round(418920 * combinedMult);
  const currentProfit = Math.round(70420 * combinedMult);
  const currentMargin = ((currentProfit / currentRevenue) * 100).toFixed(1);
  const currentOrders = Math.round(1000 * combinedMult);

  const filteredMonthlyData = MONTHLY_SALES_DATA.map((d) => ({
    month: d.month,
    sales: Math.round(d.sales * combinedMult * (selectedRegion === "All" && selectedCategory === "All" ? 1 : 2.8)),
    profit: Math.round(d.profit * combinedMult * (selectedRegion === "All" && selectedCategory === "All" ? 1 : 2.8)),
    target: Math.round(d.target * combinedMult * (selectedRegion === "All" && selectedCategory === "All" ? 1 : 2.8)),
  }));

  return (
    <div className="space-y-8">
      {/* Power BI Window Frame */}
      <div
        className="rounded-2xl border overflow-hidden shadow-sm backdrop-blur-2xl"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-color)",
          boxShadow: "var(--card-shadow)",
        }}
      >
        {/* Power BI Studio App Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b font-mono text-xs" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-amber-600 flex items-center justify-center text-white font-bold text-[10px]">
              PBI
            </div>
            <span className="font-bold font-sans" style={{ color: "var(--text-primary)" }}>Retail Sales Intelligence — Executive Suite</span>
            <Badge variant="emerald" size="sm">
              Live Interactive Report
            </Badge>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab("dashboard")}
              className="px-3 py-1 rounded-lg text-xs font-mono transition-colors border"
              style={{
                backgroundColor: activeTab === "dashboard" ? "var(--accent-pill-bg)" : "transparent",
                borderColor: activeTab === "dashboard" ? "var(--accent-primary)" : "transparent",
                color: activeTab === "dashboard" ? "var(--accent-primary)" : "var(--text-secondary)",
                fontWeight: activeTab === "dashboard" ? "bold" : "normal",
              }}
            >
              Report Canvas
            </button>
            <button
              onClick={() => setActiveTab("dax")}
              className="px-3 py-1 rounded-lg text-xs font-mono transition-colors border"
              style={{
                backgroundColor: activeTab === "dax" ? "var(--accent-pill-bg)" : "transparent",
                borderColor: activeTab === "dax" ? "var(--accent-primary)" : "transparent",
                color: activeTab === "dax" ? "var(--accent-primary)" : "var(--text-secondary)",
                fontWeight: activeTab === "dax" ? "bold" : "normal",
              }}
            >
              DAX Measures
            </button>
            <button
              onClick={() => setActiveTab("model")}
              className="px-3 py-1 rounded-lg text-xs font-mono transition-colors border"
              style={{
                backgroundColor: activeTab === "model" ? "var(--accent-pill-bg)" : "transparent",
                borderColor: activeTab === "model" ? "var(--accent-primary)" : "transparent",
                color: activeTab === "model" ? "var(--accent-primary)" : "var(--text-secondary)",
                fontWeight: activeTab === "model" ? "bold" : "normal",
              }}
            >
              Data Model Schema
            </button>
          </div>
        </div>

        {/* Tab 1: Live Interactive Dashboard Canvas */}
        {activeTab === "dashboard" && (
          <div className="p-6 space-y-6">
            {/* Interactive Slicer Ribbon */}
            <div className="p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                {/* Region Slicer */}
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5" style={{ color: "var(--accent-primary)" }} />
                  <span style={{ color: "var(--text-secondary)" }}>Region:</span>
                  <div className="flex gap-1">
                    {["All", "West", "East", "Central", "South"].map((reg) => (
                      <button
                        key={reg}
                        onClick={() => setSelectedRegion(reg)}
                        className="px-2.5 py-1 rounded-md transition-colors border text-xs"
                        style={{
                          backgroundColor: selectedRegion === reg ? "var(--accent-pill-bg)" : "var(--bg-surface)",
                          borderColor: selectedRegion === reg ? "var(--accent-primary)" : "var(--border-color)",
                          color: selectedRegion === reg ? "var(--accent-primary)" : "var(--text-secondary)",
                          fontWeight: selectedRegion === reg ? "bold" : "normal",
                        }}
                      >
                        {reg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Slicer */}
                <div className="flex items-center gap-2 pl-2 border-l" style={{ borderColor: "var(--border-color)" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Category:</span>
                  <div className="flex gap-1">
                    {["All", "Technology", "Furniture", "Office Supplies"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className="px-2.5 py-1 rounded-md transition-colors border text-xs"
                        style={{
                          backgroundColor: selectedCategory === cat ? "var(--accent-pill-bg)" : "var(--bg-surface)",
                          borderColor: selectedCategory === cat ? "var(--accent-secondary)" : "var(--border-color)",
                          color: selectedCategory === cat ? "var(--accent-secondary)" : "var(--text-secondary)",
                          fontWeight: selectedCategory === cat ? "bold" : "normal",
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedRegion("All");
                  setSelectedCategory("All");
                }}
                className="flex items-center gap-1.5 text-[11px] font-mono hover:opacity-80 transition-opacity"
                style={{ color: "var(--accent-primary)" }}
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Slicers</span>
              </button>
            </div>

            {/* Dynamic KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border font-mono" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
                <span className="text-xs uppercase" style={{ color: "var(--text-muted)" }}>Filtered Revenue</span>
                <div className="text-2xl lg:text-3xl font-bold mt-1" style={{ color: "var(--accent-primary)" }}>
                  ${currentRevenue.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-700 mt-1">+14.2% vs Previous Year</div>
              </div>

              <div className="p-4 rounded-xl border font-mono" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
                <span className="text-xs uppercase" style={{ color: "var(--text-muted)" }}>Net Profit</span>
                <div className="text-2xl lg:text-3xl font-bold mt-1" style={{ color: "var(--accent-secondary)" }}>
                  ${currentProfit.toLocaleString()}
                </div>
                <div className="text-[11px] mt-1" style={{ color: "var(--accent-secondary)" }}>Total Margin: {currentMargin}%</div>
              </div>

              <div className="p-4 rounded-xl border font-mono" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
                <span className="text-xs uppercase" style={{ color: "var(--text-muted)" }}>Total Orders</span>
                <div className="text-2xl lg:text-3xl font-bold mt-1" style={{ color: "var(--text-primary)" }}>
                  {currentOrders.toLocaleString()}
                </div>
                <div className="text-[11px] mt-1" style={{ color: "var(--text-secondary)" }}>Avg Basket: ${(currentRevenue / Math.max(1, currentOrders)).toFixed(0)}</div>
              </div>

              <div className="p-4 rounded-xl border font-mono" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
                <span className="text-xs uppercase" style={{ color: "var(--text-muted)" }}>Discount Leakage</span>
                <div className="text-2xl lg:text-3xl font-bold mt-1 text-rose-700">
                  ${Math.round(currentRevenue * 0.034).toLocaleString()}
                </div>
                <div className="text-[11px] text-rose-600 mt-1">Discounts &gt; 20% impact</div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl border space-y-3" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold" style={{ color: "var(--text-primary)" }}>Monthly Revenue vs Target</span>
                  <span style={{ color: "var(--accent-primary)" }}>Actual ($) vs Target</span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filteredMonthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d8cdbe" />
                      <XAxis dataKey="month" stroke="#738078" fontSize={11} />
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
                      <Line type="monotone" dataKey="sales" stroke="#c2593f" strokeWidth={2} name="Actual Sales" />
                      <Line type="monotone" dataKey="target" stroke="#2d5a4a" strokeDasharray="5 5" name="Target" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-5 rounded-xl border space-y-3" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold" style={{ color: "var(--text-primary)" }}>Monthly Profitability</span>
                  <span className="text-emerald-700">Net Profit ($)</span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredMonthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d8cdbe" />
                      <XAxis dataKey="month" stroke="#738078" fontSize={11} />
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
                      <Bar dataKey="profit" fill="#2d5a4a" name="Profit ($)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: DAX Measures Documentation */}
        {activeTab === "dax" && (
          <div className="p-6 space-y-4">
            <div className="space-y-1 font-mono text-xs mb-4">
              <span className="font-bold uppercase" style={{ color: "var(--accent-primary)" }}>Data Analysis Expressions (DAX) Dictionary</span>
              <p style={{ color: "var(--text-secondary)" }}>Production-grade calculations powering the Power BI semantic model.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DAX_FORMULAS.map((dax, idx) => (
                <div key={idx} className="p-4 rounded-xl border space-y-2 font-mono text-xs" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
                  <div className="flex items-center justify-between font-bold" style={{ color: "var(--text-primary)" }}>
                    <span>{dax.name}</span>
                    <Badge variant="sky" size="sm">
                      DAX
                    </Badge>
                  </div>
                  <pre className="p-2.5 rounded-lg border overflow-x-auto whitespace-pre text-xs" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-color)", color: "var(--accent-primary)" }}>
                    {dax.syntax}
                  </pre>
                  <p className="font-sans text-xs" style={{ color: "var(--text-secondary)" }}>{dax.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Star Schema Data Model */}
        {activeTab === "model" && (
          <div className="p-6 space-y-6">
            <div className="space-y-1 font-mono text-xs">
              <span className="font-bold uppercase" style={{ color: "var(--accent-primary)" }}>Dimensional Star Schema Architecture</span>
              <p style={{ color: "var(--text-secondary)" }}>1:Many relational design optimized for Power BI VertiPaq engine performance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
                <span className="font-bold" style={{ color: "var(--accent-secondary)" }}>Dim_Customer (1)</span>
                <ul className="text-[11px] space-y-1" style={{ color: "var(--text-secondary)" }}>
                  <li>• Customer_ID (PK)</li>
                  <li>• Customer_Name</li>
                  <li>• Segment</li>
                  <li>• City / State</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: "var(--accent-pill-bg)", borderColor: "var(--accent-primary)" }}>
                <span className="font-bold" style={{ color: "var(--accent-primary)" }}>Fact_Retail_Sales (∞)</span>
                <ul className="text-[11px] space-y-1" style={{ color: "var(--text-primary)" }}>
                  <li>• Order_ID</li>
                  <li>• Customer_ID (FK)</li>
                  <li>• Product_ID (FK)</li>
                  <li>• Date_Key (FK)</li>
                  <li>• Sales</li>
                  <li>• Profit</li>
                  <li>• Discount</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border-color)" }}>
                <span className="font-bold" style={{ color: "var(--accent-secondary)" }}>Dim_Product (1)</span>
                <ul className="text-[11px] space-y-1" style={{ color: "var(--text-secondary)" }}>
                  <li>• Product_ID (PK)</li>
                  <li>• Category</li>
                  <li>• Sub_Category</li>
                  <li>• Unit_Cost</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
