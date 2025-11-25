from typing import Dict
from app.agents.registry import get_agent


async def run_architecture_pipeline(intent: str) -> Dict:
    """
    Pipeline that:
    - selects the right agent
    - runs it
    - can later post-process or combine results
    """
    agent = get_agent("architecture")

    payload = {
        "intent": intent,
    }

    result = await agent.run(payload)

    # Here you can:
    # - enrich result
    # - add metadata
    # - call additional agents
    return result
