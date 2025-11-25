"use client";

import { useState } from "react";
import axios from "axios";
import {
  ActiveTab,
  Architecture,
  TasksResult,
  ApiResult,
  FilesResult,
} from "@/lib/types";
import { useSupabaseProjects } from "@/hooks/useSupabaseProjects";

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

type LogEntry = {
  ts: string;
  level: "info" | "error";
  message: string;
};

type SnapshotData = {
  intent: string;
  architecture: Architecture | null;
  tasks: TasksResult | null;
  apiSpec: ApiResult | null;
  files: FilesResult | null;
};

export function useSyntriAIPipeline() {
  const [intent, setIntent] = useState("");
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<ActiveTab | null>(null);

  const [architecture, setArchitecture] = useState<Architecture | null>(null);
  const [tasks, setTasks] = useState<TasksResult | null>(null);
  const [apiSpec, setApiSpec] = useState<ApiResult | null>(null);
  const [files, setFiles] = useState<FilesResult | null>(null);
  const [prevFiles, setPrevFiles] = useState<FilesResult | null>(null);

  const [logs, setLogs] = useState<LogEntry[]>([]);

  const [projectId, setProjectId] = useState<string | null>(null);

  const { saving, lastSavedAt, saveProject } = useSupabaseProjects();

  function log(level: LogEntry["level"], message: string) {
    setLogs((prev) => [
      ...prev,
      { ts: new Date().toLocaleTimeString(), level, message },
    ]);
  }

  function clearLogs() {
    setLogs([]);
  }

  async function runPipeline() {
    if (!intent.trim()) {
      log("error", "Please describe your app idea before running SyntriAI.");
      return;
    }

    setLoading(true);
    setPhase(null);
    clearLogs();

    log("info", "Starting SyntriAI pipeline…");

    try {
      // 1. ARCHITECTURE
      setPhase("arch");
      log("info", "Step 1 — Generating architecture…");
      const archRes = await axios.post<Architecture>(
        `${BACKEND}/generate-architecture`,
        { intent }
      );
      const arch = archRes.data;
      setArchitecture(arch);
      setProjectId(arch.project);
      log("info", `Architecture ready for project "${arch.project}".`);

      // 2. TASKS
      setPhase("tasks");
      log("info", "Step 2 — Breaking into tasks…");
      const tasksRes = await axios.post<TasksResult>(
        `${BACKEND}/generate-tasks`,
        { architecture: arch }
      );
      setTasks(tasksRes.data);

      // 3. API
      setPhase("api");
      log("info", "Step 3 — Designing API…");
      const apiRes = await axios.post<ApiResult>(
        `${BACKEND}/generate-api`,
        { architecture: arch }
      );
      setApiSpec(apiRes.data);

      // 4. FILES
      setPhase("files");
      log("info", "Step 4 — Generating file stubs…");
      // keep old files for diff
      setPrevFiles(files);
      const fileRes = await axios.post<FilesResult>(
        `${BACKEND}/generate-files`,
        { architecture: arch }
      );
      setFiles(fileRes.data);

      log("info", "SyntriAI pipeline finished ✅");
    } catch (err: any) {
      console.error(err);
      log(
        "error",
        `Pipeline failed: ${
          err?.response?.data?.detail || err?.message || "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
      setPhase(null);
    }
  }

  async function saveToCloud() {
    if (!projectId) {
      log("error", "No project ID available. Generate architecture first.");
      return;
    }

    const snapshot: SnapshotData = {
      intent,
      architecture,
      tasks,
      apiSpec,
      files,
    };

    log("info", "Saving project snapshot to cloud…");
    await saveProject(projectId, snapshot);
    log("info", "Project saved ✅");
  }

  function loadFromSnapshot(snapshot: SnapshotData) {
    log("info", "Loading project snapshot from history…");
    setIntent(snapshot.intent || "");
    setArchitecture(snapshot.architecture || null);
    setTasks(snapshot.tasks || null);
    setApiSpec(snapshot.apiSpec || null);
    setPrevFiles(null);
    setFiles(snapshot.files || null);
  }

  return {
    intent,
    setIntent,
    loading,
    phase,
    architecture,
    tasks,
    apiSpec,
    files,
    setFiles,
    prevFiles,

    logs,
    clearLogs,

    projectId,
    saving,
    lastSavedAt,
    saveToCloud,
    loadFromSnapshot,

    runPipeline,
  };
}
