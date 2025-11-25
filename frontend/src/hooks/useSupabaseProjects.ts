"use client";

// Stub for Supabase-backed project storage.
// Currently uses localStorage so you can demo history + cloud list offline.
// Later, swap internals with Supabase client calls.

import { useState } from "react";

type StoredProject = {
  id: string;
  name: string;
  data: any;
  createdAt: string;
};

const STORAGE_KEY = "syntriai-projects";

function loadAllFromStorage(): StoredProject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredProject[]) : [];
  } catch {
    return [];
  }
}

function saveAllToStorage(projects: StoredProject[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function useSupabaseProjects() {
  const [saving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  async function saveProject(id: string, data: any) {
    setSaving(true);
    try {
      const now = new Date().toISOString();
      const all = loadAllFromStorage();
      const filtered = all.filter((p) => p.id !== id);
      const stored: StoredProject = {
        id,
        name: id,
        data,
        createdAt: now,
      };
      const next = [...filtered, stored];
      saveAllToStorage(next);
      setLastSavedAt(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Save project failed", err);
    } finally {
      setSaving(false);
    }
  }

  async function listProjects(): Promise<StoredProject[]> {
    return loadAllFromStorage().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async function loadProject(id: string): Promise<StoredProject | null> {
    const all = loadAllFromStorage();
    return all.find((p) => p.id === id) ?? null;
  }

  return {
    saving,
    lastSavedAt,
    saveProject,
    listProjects,
    loadProject,
  };
}
