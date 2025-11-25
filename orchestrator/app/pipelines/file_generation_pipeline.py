from typing import Dict, Any
from app.agents.registry import get_agent


async def run_file_generation_pipeline(architecture: Dict[str, Any]) -> Dict:
    """
    Turns architecture into actual file stubs (paths + content).
    """
    agent = get_agent("file_generator")

    payload: Dict[str, Any] = {
        "architecture": architecture,
    }

    result = await agent.run(payload)
    return result
