"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <GlassCard className="max-w-md w-full text-center p-8 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
          <AlertTriangle className="w-8 h-8" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Analytics Pipeline Exception</h1>
          <p 
            className="text-xs font-mono p-3 rounded-xl border break-words"
            style={{
              backgroundColor: "var(--bg-subtle)",
              borderColor: "var(--border-color)",
              color: "var(--text-secondary)",
            }}
          >
            {error.message || "An unexpected error occurred while rendering the data analytics canvas."}
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <Button onClick={() => reset()} variant="primary" icon={<RefreshCw className="w-4 h-4" />}>
            Retry Operation
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
