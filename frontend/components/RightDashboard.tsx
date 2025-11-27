"use client";

import { useState } from "react";
import { ActiveTab } from "../lib/types";
import ArchitectureView from "./tabs/ArchitectureView";
import TasksView from "./tabs/TasksView";
import APIView from "./tabs/APIView";
import FilesView from "./tabs/FilesView";
import HistoryPanel from "./HistoryPanel";

type Props = {
  activeTab: ActiveTab;
  setActiveTab: (t: ActiveTab) => void;
  architecture: any;
  tasks: any;
  apiSpec: any;
  files: any;
  prevFiles: any;
  setFiles: (f: any) => void;
  projectId: string | null;
  saving: boolean;
  lastSavedAt: string | null;
  saveToCloud: () => Promise<void>;
  onLoadProject: (snapshot: any) => void;
};

export default function RightDashboard({
  activeTab,
  setActiveTab,
  architecture,
  tasks,
  apiSpec,
  files,
  prevFiles,
  setFiles,
  projectId,
  saving,
  lastSavedAt,
  saveToCloud,
  onLoadProject,
}: Props) {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <section className="w-full flex-1 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl overflow-hidden relative">
      {/* Header row with tabs + save + history */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-2">
        <div className="inline-flex rounded-xl bg-slate-900/80 p-1 text-xs">
          {(
            [
              ["arch", "Architecture"],
              ["tasks", "Tasks"],
              ["api", "API"],
              ["files", "Files"],
            ] as [ActiveTab, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`rounded-lg px-3 py-1.5 ${
                activeTab === key
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          {lastSavedAt && (
            <span className="rounded-full border border-slate-700 px-2 py-0.5">
              Saved at {lastSavedAt}
            </span>
          )}
          <button
            onClick={() => saveToCloud()}
            disabled={!projectId || saving}
            className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-500/20 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save to Cloud"}
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className="rounded-full border border-slate-600 bg-slate-900 px-3 py-1 text-[11px] hover:border-sky-500 hover:text-sky-300"
          >
            History
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-4 h-full overflow-y-auto space-y-4">
        {activeTab === "arch" && <ArchitectureView architecture={architecture} />}
        {activeTab === "tasks" && <TasksView tasks={tasks} />}
        {activeTab === "api" && <APIView apiSpec={apiSpec} />}
        {activeTab === "files" && (
          <FilesView
            files={files}
            prevFiles={prevFiles}
            setFiles={setFiles}
          />
        )}
      </div>

      {showHistory && (
        <HistoryPanel
          onClose={() => setShowHistory(false)}
          onLoadProject={onLoadProject}
        />
      )}
    </section>
  );
}
