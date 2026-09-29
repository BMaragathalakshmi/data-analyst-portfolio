import React from "react";
import { Badge } from "@/components/ui/Badge";
import { PowerBiEmbedSimulator } from "@/components/labs/PowerBiEmbedSimulator";

export default function PowerBiDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <Badge variant="cyan" size="md">
          Business Intelligence & Visual Analytics
        </Badge>
        <h1 
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-sans tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Power BI <span className="text-gradient">Dashboard Studio</span>
        </h1>
        <p 
          className="text-xs sm:text-sm font-mono leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Explore a working dashboard prototype with regional filters, KPI cards, DAX examples, and a star-schema model.
        </p>
      </div>

      {/* Interactive Power BI Simulator Component */}
      <PowerBiEmbedSimulator />
    </div>
  );
}
