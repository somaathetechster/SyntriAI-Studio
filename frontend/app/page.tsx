"use client";

import { useState } from "react";
import StudioLayout from "../components/StudioLayout";
import StudioBackground from "../components/StudioBackground";
import TopNav from "../components/TopNav";
import LeftPanel from "../components/LeftPanel";
import RightDashboard from "../components/RightDashboard";
import HologramAssistant from "../components/HologramAssistant";
import MobileNav from "../components/MobileNav";
import RunConsole from "../components/RunConsole";
import { ActiveTab } from "../lib/types";
import { useSyntriAIPipeline } from "../hooks/useSyntriAIPipeline";
import { useLocalPersistence } from "../hooks/useLocalPersistence";

export default function Home() {
  const {
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
  } = useSyntriAIPipeline();

  const [activeTab, setActiveTab] = useState<ActiveTab>("arch");

  useLocalPersistence("syntriai-state", {
    intent,
    architecture,
    tasks,
    apiSpec,
    files,
  });

  return (
    <StudioLayout>
      <StudioBackground />
      <TopNav />

      <main className="relative mx-auto max-w-6xl flex flex-col lg:flex-row gap-4 px-4 py-4 pb-20">
        <LeftPanel
          intent={intent}
          setIntent={setIntent}
          runPipeline={runPipeline}
          loading={loading}
          phase={phase}
        />

        <RightDashboard
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          architecture={architecture}
          tasks={tasks}
          apiSpec={apiSpec}
          files={files}
          prevFiles={prevFiles}
          setFiles={setFiles}
          projectId={projectId}
          saving={saving}
          lastSavedAt={lastSavedAt}
          saveToCloud={saveToCloud}
          onLoadProject={loadFromSnapshot}
        />
      </main>

      <HologramAssistant />
      <RunConsole logs={logs} onClear={clearLogs} />

      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        loading={loading}
        runPipeline={runPipeline}
      />
    </StudioLayout>
  );
}
