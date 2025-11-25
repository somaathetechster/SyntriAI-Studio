"use client";

import { useState } from "react";

export default function APIView({ apiSpec }: any) {
  const [showHelp, setShowHelp] = useState(true);

  if (!apiSpec)
    return <p className="text-sm text-slate-400">Run pipeline first.</p>;

  return (
    <div className="space-y-3 text-sm">
      {showHelp && (
        <div className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-3 py-2 text-[11px] text-indigo-100 flex justify-between gap-2">
          <p>
            <span className="font-semibold">API = how your app talks.</span>{" "}
            These routes connect your frontend (what users see) to your backend
            (where data lives). Even if you&apos;re new, start noticing the
            verbs (GET, POST) and paths.
          </p>
          <button
            onClick={() => setShowHelp(false)}
            className="text-[10px] text-indigo-200/80"
          >
            hide
          </button>
        </div>
      )}

      <div className="space-y-2 text-xs">
        {apiSpec.endpoints.map((e: any, idx: number) => (
          <div
            key={idx}
            className="flex flex-col rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex min-w-[52px] justify-center rounded-full px-2 py-0.5 bg-indigo-600 text-[10px] font-semibold text-white">
                {e.method}
              </span>
              <span className="font-mono text-[11px] text-slate-100">
                {e.path}
              </span>
            </div>
            <span className="mt-1 text-[11px] text-slate-400 sm:mt-0 sm:ml-3">
              {e.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
