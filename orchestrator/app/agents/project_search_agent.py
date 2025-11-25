from .base import Agent
from typing import Dict, Any

class ProjectSearchAgent(Agent):
    name = "search"

    async def run(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        query = payload.get("query")
        files = payload.get("files", [])

        matches = []
        for f in files:
            if query.lower() in f["content"].lower() or query.lower() in f["path"].lower():
                matches.append({
                    "file": f["path"],
                    "snippet": f["content"][:200],
                    "reason": "Direct match in file"
                })

        return {"query": query, "results": matches}
