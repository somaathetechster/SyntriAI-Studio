from typing import Any, Dict
from .base import Agent


class ArchitectureAgent(Agent):
    name = "architecture"

    async def run(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        intent = payload.get("intent", "Build a todo app with auth")

        # Here is where you will later:
        # - call Amazon Q Developer
        # - or chain multiple model/tool calls
        # For now, we simulate a smart architecture result.

        project_slug = intent.replace(" ", "-").lower()[:32]

        return {
            "project": project_slug,
            "features": ["auth", "ai-agent", "pipeline"],
            "files": [
                {"path": "frontend/src/app/page.tsx", "role": "ui"},
                {"path": "backend/main.py", "role": "api"},
                {"path": "backend/routes/ai.py", "role": "api"},
            ],
        }
