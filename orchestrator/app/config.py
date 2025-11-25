from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    ORCHESTRATOR_NAME: str = "SyntriAI Orchestrator"
    ORCHESTRATOR_PORT: int = 9000

    # Where backend lives (if you ever need to call it)
    BACKEND_URL: str = "http://localhost:8000"

    class Config:
        env_file = ".env"


settings = Settings()
