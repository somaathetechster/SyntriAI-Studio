from abc import ABC, abstractmethod
from typing import Any, Dict


class Agent(ABC):
    name: str

    @abstractmethod
    async def run(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Run the agent on a given payload and return a result."""
        ...
