"use client";

type FileEditorProps = {
  selectedFile: any;
  files: any;
  setFiles: (f: any) => void;
};

export default function FileEditor({
  selectedFile,
  files,
  setFiles,
}: FileEditorProps) {
  if (!selectedFile) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-slate-800 bg-slate-950/90 p-2 text-xs text-slate-500">
        Select a file from the left to edit.
      </div>
    );
  }

  const index = files.generated_files.findIndex(
    (f: any) => f.path === selectedFile.path
  );

  return (
    <div className="flex max-h-[420px] flex-col rounded-xl border border-slate-800 bg-slate-950/90 p-2 text-xs">
      <div className="mb-2 flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
        <div className="flex flex-col">
          <span className="font-mono text-[11px] text-slate-100">
            {selectedFile.path}
          </span>
          <span className="text-[10px] uppercase text-slate-500">
            {selectedFile.role}
          </span>
        </div>
        <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] text-slate-300">
          Editable
        </span>
      </div>

      <textarea
        className="h-full min-h-[280px] w-full resize-none rounded-lg bg-slate-950 p-2 font-mono text-[11px] text-slate-100 outline-none ring-0 focus:ring-2 focus:ring-indigo-500/40"
        value={selectedFile.content}
        onChange={(e) => {
          const updated = { ...files };
          updated.generated_files = files.generated_files.map((f: any, i: number) =>
            i === index ? { ...f, content: e.target.value } : f
          );
          setFiles(updated);
        }}
      />
    </div>
  );
}
