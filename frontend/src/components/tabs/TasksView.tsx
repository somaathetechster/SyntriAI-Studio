"use client";

import { useState } from "react";

export default function TasksView({ tasks }: any) {
  const [showHelp, setShowHelp] = useState(true);

  if (!tasks)
    return <p className="text-sm text-slate-400">Run pipeline first.</p>;

  return (
    <div className="space-y-3">
      {showHelp && (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-[11px] text-emerald-100 flex justify-between gap-2">
          <p>
            <span className="font-semibold">Tasks = step-by-step plan.</span>{" "}
            If you&apos;re new to coding, use this list like a checklist.
            Start from task 1 and move down, even on a small phone screen.
          </p>
          <button
            onClick={() => setShowHelp(false)}
            className="text-[10px] text-emerald-200/80"
          >
            hide
          </button>
        </div>
      )}

      <ol className="space-y-2 text-sm text-slate-100">
        {tasks.tasks.map((t: string, i: number) => (
          <li
            key={i}
            className="flex gap-2 rounded-lg border border-slate-800 bg-slate-900/80 p-2"
          >
            <span className="mt-[2px] h-5 w-5 flex-shrink-0 rounded-full bg-slate-800 text-center text-[10px] leading-[20px] text-slate-300">
              {i + 1}
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
