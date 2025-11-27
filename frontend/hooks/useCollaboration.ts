"use client";

// This is a stub for future real-time collab.
// Later you can back it with Supabase Realtime, Ably, Liveblocks, etc.

import { useEffect, useState } from "react";

type PeerCursor = {
  id: string;
  name: string;
  color: string;
  filePath?: string;
};

export function useCollaboration(projectId: string) {
  const [peers, setPeers] = useState<PeerCursor[]>([]);

  useEffect(() => {
    // TODO: connect to real-time backend here (Supabase, WebSocket, etc.)
    // For now, we can simulate a single "ghost" peer for UX preview.
    const demoPeer: PeerCursor = {
      id: "demo",
      name: "Teammate (Demo)",
      color: "#22c55e",
      filePath: "frontend/src/app/page.tsx",
    };
    setPeers([demoPeer]);

    return () => {
      setPeers([]);
    };
  }, [projectId]);

  return { peers };
}
