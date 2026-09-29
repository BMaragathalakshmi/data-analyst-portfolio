import React from "react";
import { Compass, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <GlassCard className="max-w-md w-full text-center p-8 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto text-violet-400">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>
        
        <div className="space-y-2">
          <div className="text-4xl font-extrabold font-mono text-cyan-400">404</div>
          <h1 className="text-xl font-bold text-slate-100">Dataset Query Not Found</h1>
          <p className="text-sm text-slate-400">
            The route or analytical dimension you requested does not exist in the Data Pulse catalog.
          </p>
        </div>

        <div className="pt-2">
          <Button href="/" variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
            Return to Intelligence Overview
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
