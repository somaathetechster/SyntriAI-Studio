"use client";

type CodeDiffViewProps = {
  currentFile: any;
  previousFile: any;
};

export default function CodeDiffView({
  currentFile,
  previousFile,
}: CodeDiffViewProps) {
  if (!currentFile) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-400 flex items-center justify-center">
        Select a file to view diff.
      </div>
    );
  }

  if (!previousFile) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-400 flex items-center justify-center">
        No previous version available for this file yet.
      </div>
    );
  }

  const oldLines = (previousFile.content || "").split("\n");
  const newLines = (currentFile.content || "").split("\n");
  const maxLen = Math.max(oldLines.length, newLines.length);

  const rows = [];
  for (let i = 0; i < maxLen; i++) {
    const oldLine = oldLines[i] ?? "";
    const newLine = newLines[i] ?? "";

    if (oldLine === newLine) {
      rows.push({ type: "same", text: newLine });
    } else if (!oldLine && newLine) {
      rows.push({ type: "add", text: newLine });
    } else if (oldLine && !newLine) {
      rows.push({ type: "del", text: oldLine });
    } else {
      rows.push({ type: "del", text: oldLine });
      rows.push({ type: "add", text: newLine });
    }
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-2 text-[11px] font-mono max-h-[420px] overflow-auto">
      {rows.map((row, idx) => (
        <div
          key={idx}
          className={`whitespace-pre-wrap px-2 py-0.5 ${
            row.type === "same"
              ? "text-slate-300"
              : row.type === "add"
              ? "bg-emerald-500/10 text-emerald-300"
              : "bg-red-500/10 text-red-300 line-through"
          }`}
        >
          {row.type === "same" ? "  " : row.type === "add" ? "+ " : "- "}
          {row.text}
        </div>
      ))}
    </div>
  );
}
