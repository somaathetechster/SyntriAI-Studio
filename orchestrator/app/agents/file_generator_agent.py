from typing import Any, Dict, List
from .base import Agent


class FileGeneratorAgent(Agent):
    name = "file_generator"

    async def run(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Expects an `architecture` dict with:
        - project
        - features
        - files: [{ path, role }]
        """
        architecture: Dict[str, Any] = payload.get("architecture", {})
        project = architecture.get("project", "syntriai-project")
        files: List[Dict[str, Any]] = architecture.get("files", [])

        generated_files: List[Dict[str, Any]] = []

        for f in files:
            path = f.get("path", "")
            role = f.get("role", "unknown")

            if "frontend/src/app/page.tsx" in path:
                content = f"""\
"use client";

export default function Home() {{
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full px-4">
        <h1 className="text-3xl font-bold mb-4">SyntriAI: {project}</h1>
        <p className="text-gray-600 mb-4">
          This page was scaffolded automatically by the FileGeneratorAgent.
        </p>
      </div>
    </main>
  );
}}
"""
            elif "backend/main.py" in path:
                content = f"""\
from fastapi import FastAPI

app = FastAPI(title="{project} Backend")

@app.get("/health")
async def health():
    return {{"status": "ok", "service": "{project}-backend"}}
"""
            else:
                # Generic placeholder file
                content = f"# Auto-generated stub for: {path}\n# role: {role}\n"

            generated_files.append(
                {
                    "path": path,
                    "role": role,
                    "content": content,
                }
            )

        return {
            "project": project,
            "generated_files": generated_files,
        }
