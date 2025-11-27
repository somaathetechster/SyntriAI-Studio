"use client";

import { useEffect } from "react";

export function useLocalPersistence(key: string, data: any) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);
}
