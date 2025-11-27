"use client";

type RunConsoleProps = {
  logs: { ts: string; level: "info" | "error"; message: string }[];
  onClear: () => void;
};

export default function RunConsole({ logs, onClear }: RunConsoleProps) {
  if (!logs.length) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-5xl px-4 pb-2">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/95 backdrop-blur shadow-xl shadow-slate-950/80">
        <div className="flex items-center justify-between px-4 pt-2 pb-1 text-[11px] text-slate-400">
          <span>SyntriAI Run Console</span>
          <button
            onClick={onClear}
            className="text-[10px] text-slate-500 hover:text-slate-200"
          >
            Clear
          </button>
        </div>
        <div className="max-h-40 overflow-y-auto px-4 pb-3 text-[11px] font-mono text-slate-200">
          {logs.map((log, i) => (
            <div
              key={`${log.ts}-${i}`}
              className={`flex gap-2 ${
                log.level === "error" ? "text-red-400" : "text-slate-200"
              }`}
            >
              <span className="text-slate-500">{log.ts}</span>
              <span className="uppercase tracking-wide text-[10px]">
                {log.level === "info" ? "INFO" : "ERR"}
              </span>
              <span>{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
