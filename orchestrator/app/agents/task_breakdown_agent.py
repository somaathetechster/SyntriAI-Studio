from typing import Any, Dict, List
from .base import Agent


class TaskBreakdownAgent(Agent):
    name = "task_breakdown"

    async def run(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        intent: str = payload.get("intent", "Build a basic app")
        features: List[str] = payload.get("features") or [
            "auth",
            "ai-agent",
            "dashboard",
        ]

        tasks: List[str] = []

        # Very simple heuristic breakdown – you can later replace with LLM/Q logic
        tasks.append(f"Clarify requirements for: {intent}")
        tasks.append("Design core user flows")
        for feature in features:
            tasks.append(f"Implement feature: {feature}")
        tasks.append("Set up logging, monitoring, and error handling")
        tasks.append("Write basic tests and deployment configuration")

        return {
            "intent": intent,
            "features": features,
            "tasks": tasks,
        }
