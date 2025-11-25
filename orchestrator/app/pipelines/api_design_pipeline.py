from typing import Dict, Any, List
from app.agents.registry import get_agent


async def run_api_design_pipeline(architecture: Dict[str, Any]) -> Dict:
    """
    Uses architecture.features to propose API endpoints.
    """
    agent = get_agent("api_design")

    features = architecture.get("features", [])
    payload: Dict[str, Any] = {"features": features}

    result = await agent.run(payload)
    return result
