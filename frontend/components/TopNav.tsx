"use client";

import { motion } from "framer-motion";

export default function TopNav() {
  return (
    <motion.header
      className="border-b border-slate-800 bg-slate-950/70 backdrop-blur"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400" />
          <div>
            <div className="text-sm font-semibold">SyntriAI Studio</div>
            <div className="text-[11px] text-slate-400">
              by Domani • mobile-first AI coding
            </div>
          </div>
        </div>

        <div className="hidden sm:block text-xs text-slate-400">
          January 2026 Flagship Preview
        </div>
      </div>
    </motion.header>
  );
}
