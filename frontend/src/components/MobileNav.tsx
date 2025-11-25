"use client";

import { ActiveTab } from "@/lib/types";

type MobileNavProps = {
  activeTab: ActiveTab;
  setActiveTab: (t: ActiveTab) => void;
  loading: boolean;
  runPipeline: () => void;
};

export default function MobileNav({
  activeTab,
  setActiveTab,
  loading,
  runPipeline,
}: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-800 bg-slate-950/95 backdrop-blur sm:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-2 text-[11px]">
        <button
          onClick={() => setActiveTab("arch")}
          className={`flex flex-col items-center ${
            activeTab === "arch" ? "text-sky-300" : "text-slate-400"
          }`}
        >
          <span>Arch</span>
        </button>
        <button
          onClick={() => setActiveTab("tasks")}
          className={`flex flex-col items-center ${
            activeTab === "tasks" ? "text-sky-300" : "text-slate-400"
          }`}
        >
          <span>Tasks</span>
        </button>

        <button
          onClick={runPipeline}
          disabled={loading}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 text-[10px] font-semibold text-slate-950 shadow"
        >
          {loading ? "…" : "Run"}
        </button>

        <button
          onClick={() => setActiveTab("api")}
          className={`flex flex-col items-center ${
            activeTab === "api" ? "text-sky-300" : "text-slate-400"
          }`}
        >
          <span>API</span>
        </button>
        <button
          onClick={() => setActiveTab("files")}
          className={`flex flex-col items-center ${
            activeTab === "files" ? "text-sky-300" : "text-slate-400"
          }`}
        >
          <span>Files</span>
        </button>
      </div>
    </nav>
  );
}
