"use client";

import { useEffect, useState } from "react";
import { useSupabaseProjects } from "@/hooks/useSupabaseProjects";

type HistoryPanelProps = {
  onClose: () => void;
  onLoadProject: (snapshot: any) => void;
};

export default function HistoryPanel({
  onClose,
  onLoadProject,
}: HistoryPanelProps) {
  const { listProjects, loadProject } = useSupabaseProjects();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<
    { id: string; name: string; createdAt: string }[]
  >([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      const list = await listProjects();
      if (mounted) {
        setProjects(list);
        setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []); // <-- FIXED: empty deps

  async function handleLoad(id: string) {
    const proj = await loadProject(id);
    if (proj?.data) {
      onLoadProject(proj.data);
      onClose();
    }
  }

  return (
    <div className="absolute inset-0 z-40 bg-slate-950/80 backdrop-blur flex justify-end">
      <div className="w-full max-w-sm h-full border-l border-slate-800 bg-slate-950 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-100">
            Project History
          </h2>
          <button
            onClick={onClose}
            className="text-[11px] text-slate-400 hover:text-slate-100"
          >
            Close
          </button>
        </div>

        {loading && (
          <p className="text-xs text-slate-400">Loading history…</p>
        )}

        {!loading && projects.length === 0 && (
          <p className="text-xs text-slate-400">
            No saved projects yet. Run SyntriAI and click "Save to Cloud".
          </p>
        )}

        <div className="mt-2 space-y-2 text-xs overflow-y-auto">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => handleLoad(p.id)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-left hover:border-sky-500 hover:bg-slate-800"
            >
              <div className="font-mono text-[11px] text-slate-100">
                {p.name}
              </div>
              <div className="text-[10px] text-slate-500">
                {new Date(p.createdAt).toLocaleString()}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
