"use client";

type FileTreeProps = {
  files: any;
  selectedIndex: number;
  onSelect: (idx: number) => void;
};

export default function FileTree({
  files,
  selectedIndex,
  onSelect,
}: FileTreeProps) {
  return (
    <div className="max-h-[420px] overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/80 p-2 text-xs">
      {files.generated_files.map((f: any, idx: number) => (
        <button
          key={f.path}
          onClick={() => onSelect(idx)}
          className={`flex w-full flex-col items-start rounded-lg px-2 py-1.5 text-left transition ${
            idx === selectedIndex
              ? "bg-slate-100 text-slate-900"
              : "text-slate-200 hover:bg-slate-800/80"
          }`}
        >
          <span className="font-mono text-[11px] truncate w-full">
            {f.path}
          </span>
          <span className="mt-0.5 text-[10px] uppercase text-slate-500">
            {f.role}
          </span>
        </button>
      ))}
    </div>
  );
}
