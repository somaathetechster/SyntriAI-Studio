"use client";

import { motion } from "framer-motion";

const templates = [
  {
    label: "Fintech",
    prompt:
      "A mobile-first savings and lending app for market traders with offline-first support and WhatsApp notifications.",
  },
  {
    label: "EdTech",
    prompt:
      "A micro-learning app for African students with daily quizzes, streak tracking, and low-data video.",
  },
  {
    label: "SaaS",
    prompt:
      "A B2B dashboard for small businesses to track sales, invoices, and customer messages from multiple channels.",
  },
  {
    label: "Creator",
    prompt:
      "A content planning app for TikTok and Instagram creators with AI caption suggestions and post scheduling.",
  },
  {
    label: "DevOps",
    prompt:
      "A status page and deployment dashboard for backend services with alerts, logs, and incident timelines.",
  },
];

export default function LeftPanel({
  intent,
  setIntent,
  runPipeline,
  loading,
  phase,
}: any) {
  function applyTemplate(prompt: string) {
    setIntent(prompt);
  }

  return (
    <motion.section
      className="w-full lg:w-[32%] flex flex-col gap-4"
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <h1 className="text-lg font-semibold">
          Build from your phone, ship from anywhere.
        </h1>
        <p className="mt-2 text-xs text-slate-400">
          SyntriAI turns ideas into architecture, tasks, APIs and files.
          Optimised for Africa & Asia&apos;s mobile coders.
        </p>

        {/* Templates */}
        <div className="mt-3 flex flex-wrap gap-2">
          {templates.map((t) => (
            <button
              key={t.label}
              onClick={() => applyTemplate(t.prompt)}
              className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] text-slate-200 hover:border-sky-500 hover:text-sky-300"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <textarea
          rows={5}
          className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-100"
          placeholder="Describe the app you want to build…"
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
        />

        <button
          onClick={runPipeline}
          disabled={loading}
          className="mt-4 rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950"
        >
          {loading ? "Running SyntriAI…" : "Generate Architecture & Files"}
        </button>
      </div>
    </motion.section>
  );
}
