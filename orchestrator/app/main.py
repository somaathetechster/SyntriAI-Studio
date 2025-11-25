from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, Dict

from app.config import settings
from app.logging_config import setup_logging
from app.pipelines.architecture_pipeline import run_architecture_pipeline
from app.pipelines.task_pipeline import run_task_pipeline
from app.pipelines.api_design_pipeline import run_api_design_pipeline
from app.pipelines.file_generation_pipeline import run_file_generation_pipeline

logger = setup_logging()

app = FastAPI(
    title=settings.ORCHESTRATOR_NAME,
    version="1.0.0",
    description="SyntriAI Orchestrator: multi-agent & pipeline brain",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------- MODELS ---------
class ArchitectureRequest(BaseModel):
    intent: str


class TaskRequest(BaseModel):
    intent: str
    architecture: Dict[str, Any] | None = None


class APIDesignRequest(BaseModel):
    architecture: Dict[str, Any]


class FileGenRequest(BaseModel):
    architecture: Dict[str, Any]


# --------- ROUTES ---------
@app.get("/health")
async def health():
    return {"status": "ok", "service": "orchestrator"}


@app.post("/architect")
async def architect(req: ArchitectureRequest):
    logger.info(f"[architecture] intent={req.intent!r}")
    try:
        result = await run_architecture_pipeline(req.intent)
        return result
    except Exception as e:
        logger.exception("Architecture pipeline failed")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/tasks")
async def tasks(req: TaskRequest):
    logger.info(f"[tasks] intent={req.intent!r}")
    try:
        result = await run_task_pipeline(req.intent, req.architecture)
        return result
    except Exception as e:
        logger.exception("Task pipeline failed")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api-design")
async def api_design(req: APIDesignRequest):
    logger.info("[api-design] designing API from architecture")
    try:
        result = await run_api_design_pipeline(req.architecture)
        return result
    except Exception as e:
        logger.exception("API design pipeline failed")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/generate-files")
async def generate_files(req: FileGenRequest):
    logger.info("[file-generator] generating files from architecture")
    try:
        result = await run_file_generation_pipeline(req.architecture)
        return result
    except Exception as e:
        logger.exception("File generation pipeline failed")
        raise HTTPException(status_code=500, detail=str(e))
