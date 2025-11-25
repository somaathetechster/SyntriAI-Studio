from typing import Any, Dict, List
from .base import Agent


class APIDesignAgent(Agent):
    name = "api_design"

    async def run(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        features: List[str] = payload.get("features") or [
            "auth",
            "ai-agent",
            "dashboard",
        ]

        endpoints = []

        # Very basic mapping from features → REST endpoints
        for feature in features:
            slug = feature.replace(" ", "-").lower()
            if "auth" in slug:
                endpoints.extend([
                    {"method": "POST", "path": "/auth/register", "description": "Register a new user"},
                    {"method": "POST", "path": "/auth/login", "description": "Login existing user"},
                    {"method": "POST", "path": "/auth/logout", "description": "Logout user"},
                ])
            elif "dashboard" in slug:
                endpoints.append(
                    {"method": "GET", "path": "/dashboard", "description": "Fetch dashboard data"}
                )
            elif "ai" in slug:
                endpoints.append(
                    {"method": "POST", "path": "/ai/agents/execute", "description": "Run AI agent task"}
                )
            else:
                endpoints.append(
                    {"method": "GET", "path": f"/{slug}", "description": f"Handle feature: {feature}"}
                )

        return {
            "features": features,
            "endpoints": endpoints,
        }
