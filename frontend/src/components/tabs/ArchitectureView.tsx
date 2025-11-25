"use client";

import { useState } from "react";

export default function ArchitectureView({ architecture }: any) {
  const [showHelp, setShowHelp] = useState(true);

  if (!architecture)
    return <p className="text-sm text-slate-400">Run pipeline first.</p>;

  return (
    <div className="space-y-3">
      {showHelp && (
        <div className="rounded-xl border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-[11px] text-sky-100 flex justify-between gap-2">
          <p>
            <span className="font-semibold">Architecture = blueprint.</span>{" "}
            Think of this as a map of all the parts your app needs: screens,
            backend pieces, and how they connect. Helpful if you&apos;re just
            learning how apps are structured.
          </p>
          <button
            onClick={() => setShowHelp(false)}
            className="text-[10px] text-sky-200/80"
          >
            hide
          </button>
        </div>
      )}

      <div className="rounded-xl p-4 border border-slate-800 bg-slate-900 text-sm">
        <h3 className="text-lg font-semibold">{architecture.project}</h3>
        <ul className="mt-3 text-xs text-slate-300 space-y-1">
          {architecture.features.map((f: string) => (
            <li key={f}>· {f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
