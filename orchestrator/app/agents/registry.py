from typing import Dict, Type
from .base import Agent
from .architecture_agent import ArchitectureAgent
from .project_search_agent import ProjectSearchAgent

# 🧠 Additional agents can be imported here later:
# from .tasks_agent import TasksAgent
# from .api_agent import APIAgent
# from .file_generator_agent import FileGeneratorAgent
# from .explain_agent import ExplainAgent
# from .refactor_agent import RefactorAgent
# from .embeddings_agent import EmbeddingAgent


"""
SyntriAI Agent Registry System
------------------------------

This registry stores all AI agents used by the Orchestrator.
Each agent must extend the base Agent class and implement:

    async def run(self, payload: dict) -> dict

Agents are referenced by string name, e.g.:

    agent = get_agent("architecture")
    result = await agent.run(payload)

This allows dynamic multi-agent workflows.

"""


# -------------------------------------------------------
# REGISTER ALL AGENTS HERE
# -------------------------------------------------------

AGENT_REGISTRY: Dict[str, Agent] = {
    "architecture": ArchitectureAgent(),
    "search": ProjectSearchAgent(),
    # "tasks": TasksAgent(),
    # "api": APIAgent(),
    # "files": FileGeneratorAgent(),
    # "explain": ExplainAgent(),
    # "refactor": RefactorAgent(),
    # "embed": EmbeddingAgent(),
}


# -------------------------------------------------------
# AGENT FETCHER
# -------------------------------------------------------

def get_agent(name: str) -> Agent:
    """
    Retrieve an agent by name.

    Raises:
        ValueError if the agent does not exist.
    """
    try:
        return AGENT_REGISTRY[name]
    except KeyError:
        available = ", ".join(AGENT_REGISTRY.keys())
        raise ValueError(f"Unknown agent '{name}'. Available agents: {available}")
