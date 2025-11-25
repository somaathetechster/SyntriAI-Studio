"use client";

import { useState } from "react";
import axios from "axios";

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export default function AISearchPanel({ files, onClose, onSelectFile }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  async function runSearch() {
    if (!query.trim()) return;

    setLoading(true);
    setResults([]);

    const res = await axios.post(`${BACKEND}/search-project`, {
      query,
      files,
    });

    setResults(res.data.results);
    setLoading(false);
  }

  return (
    <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur flex justify-center items-center px-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold text-slate-100">
            Ask AI about your project
          </h2>
          <button
            className="text-[11px] text-slate-400 hover:text-slate-100"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <textarea
          rows={2}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Example: Where is the login logic?"
          className="w-full rounded-lg bg-slate-950 border border-slate-700 p-2 text-xs text-slate-100"
        />

        <button
          onClick={runSearch}
          className="mt-3 w-full rounded-lg bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-semibold py-1.5 text-xs"
        >
          {loading ? "Searching…" : "Search"}
        </button>

        {/* Results */}
        <div className="mt-4 space-y-3 max-h-80 overflow-y-auto text-xs">
          {results.map((r, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-800 bg-slate-950 p-3 hover:border-indigo-400 transition cursor-pointer"
              onClick={() => onSelectFile(r.file)}
            >
              <div className="font-mono text-slate-100">{r.file}</div>
              <div className="mt-1 text-slate-400">{r.reason}</div>
              <div className="mt-2 text-[11px] text-slate-500 italic">
                {r.snippet}...
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
