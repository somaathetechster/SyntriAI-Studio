from typing import Dict, Any, List
from app.agents.registry import get_agent


async def run_task_pipeline(intent: str, architecture: Dict[str, Any] | None = None) -> Dict:
    """
    - Optionally uses architecture (features) if provided
    - Runs the task_breakdown agent
    """
    agent = get_agent("task_breakdown")

    payload: Dict[str, Any] = {"intent": intent}
    if architecture:
        payload["features"] = architecture.get("features", [])

    result = await agent.run(payload)
    return result
