"use client";

import { useState } from "react";
import FileTree from "../editor/FileTree";
import FileEditor from "../editor/FileEditor";
import CodeDiffView from "../editor/CodeDiffView";

type FilesViewProps = {
  files: any;
  prevFiles: any;
  setFiles: (f: any) => void;
};

export default function FilesView({
  files,
  prevFiles,
  setFiles,
}: FilesViewProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mode, setMode] = useState<"source" | "diff">("source");

  if (!files)
    return <p className="text-sm text-slate-400">Run pipeline first.</p>;

  const selectedFile = files.generated_files?.[selectedIndex] ?? null;
  const prevFile =
    prevFiles?.generated_files?.find(
      (f: any) => f.path === selectedFile?.path
    ) ?? null;

  return (
    <div className="space-y-3">
      {/* Mode & hint */}
      <div className="flex items-center justify-between gap-2 text-[11px]">
        <div className="flex gap-1 rounded-full border border-slate-700 bg-slate-900 p-1">
          <button
            onClick={() => setMode("source")}
            className={`px-2 py-0.5 rounded-full ${
              mode === "source"
                ? "bg-slate-100 text-slate-900"
                : "text-slate-300"
            }`}
          >
            Source
          </button>
          <button
            onClick={() => setMode("diff")}
            disabled={!prevFiles}
            className={`px-2 py-0.5 rounded-full ${
              mode === "diff"
                ? "bg-slate-100 text-slate-900"
                : prevFiles
                ? "text-slate-300"
                : "text-slate-500 opacity-60"
            }`}
          >
            Diff
          </button>
        </div>
        <p className="text-slate-400">
          {mode === "source"
            ? "Edit the generated file directly."
            : "Compare this run vs previous run."}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)]">
        <FileTree
          files={files}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />

        {mode === "source" ? (
          <FileEditor
            selectedFile={selectedFile}
            files={files}
            setFiles={setFiles}
          />
        ) : (
          <CodeDiffView currentFile={selectedFile} previousFile={prevFile} />
        )}
      </div>
    </div>
  );
}
