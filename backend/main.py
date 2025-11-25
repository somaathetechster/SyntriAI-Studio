from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pydantic_settings import BaseSettings
import httpx
from loguru import logger
import os
from difflib import unified_diff
import json

# -----------------------------
# SETTINGS
# -----------------------------
class Settings(BaseSettings):
    BACKEND_SECRET: str = "dev"
    ORCHESTRATOR_URL: str = "http://localhost:9000"
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")

    class Config:
        env_file = ".env"

settings = Settings()

app = FastAPI(title="SyntriAI Backend", version="1.5.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# MODELS
# -----------------------------
class IntentRequest(BaseModel):
    intent: str

class ArchitectureModel(BaseModel):
    project: str
    features: list[str]
    files: list[dict]

class SearchRequest(BaseModel):
    query: str
    files: list[dict]

class ExplainRequest(BaseModel):
    path: str
    content: str

class RefactorRequest(BaseModel):
    path: str
    content: str
    instructions: str


# -----------------------------
# ORCHESTRATOR PIPELINE
# -----------------------------
@app.post("/generate-architecture")
async def generate_architecture(req: IntentRequest):
    orchestrator_endpoint = f"{settings.ORCHESTRATOR_URL}/architect"

    try:
        async with httpx.AsyncClient(timeout=25.0) as client:
            response = await client.post(orchestrator_endpoint, json=req.dict())
            response.raise_for_status()
            return response.json()
    except Exception as e:
        logger.error(f"Orchestrator failed: {e}")

        # Fallback default
        return {
            "project": "fallback",
            "features": ["auth", "api"],
            "files": [
                {"path": "frontend/src/app/page.tsx", "role": "ui"},
                {"path": "backend/main.py", "role": "api"}
            ],
            "fallback": True,
        }

@app.post("/generate-tasks")
async def generate_tasks(req: dict):
    arch = req["architecture"]
    intent = arch.get("project", "app")

    tasks = [
        f"Set up project: {intent}",
        "Implement authentication",
        "Implement API endpoints",
        "Build UI screens",
        "Add mobile responsiveness",
        "Add state management",
    ]

    return {
        "intent": intent,
        "features": arch["features"],
        "tasks": tasks,
    }

@app.post("/generate-api")
async def generate_api(req: dict):
    arch = req["architecture"]

    endpoints = [
        {"method": "GET", "path": "/health", "description": "Server status"},
        {"method": "POST", "path": "/login", "description": "User login"},
        {"method": "POST", "path": "/sync", "description": "Sync data"},
    ]

    return {"features": arch["features"], "endpoints": endpoints}


@app.post("/generate-files")
async def generate_files(req: dict):
    arch = req["architecture"]

    generated = []

    for f in arch["files"]:
        generated.append({
            "path": f["path"],
            "role": f["role"],
            "content": f"// TODO: Implement {f['role']} for {arch['project']}\n",
        })

    return {"project": arch["project"], "generated_files": generated}


# -----------------------------
# SEMANTIC SEARCH (Embeddings)
# -----------------------------
@app.post("/semantic-search")
async def semantic_search(req: SearchRequest):
    """
    Semantic search using LLM embeddings — no exact match needed.
    """
    if not settings.OPENAI_API_KEY:
        raise HTTPException(500, "Missing OPENAI_API_KEY")

    # Build searchable corpus
    docs = [
        f"{file['path']}\n{file['role']}\n{file['content']}"
        for file in req.files
    ]

    prompt = f"""
You are SyntriAI. Perform semantic search.

Query:
{req.query}

Documents:
{json.dumps(docs)}

Return JSON:
[
  {{
    "score": number,
    "file": "path",
    "reason": "...",
    "snippet": "..."
  }}
]
"""

    async with httpx.AsyncClient(timeout=60.0) as client:
        res = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "gpt-4o-mini",
                "messages": [{"role": "user", "content": prompt}],
                "response_format": {"type": "json_object"},
            },
        )

    data = res.json()["choices"][0]["message"]["content"]
    return json.loads(data)


# -----------------------------
# EXPLAIN FILE
# -----------------------------
@app.post("/explain-file")
async def explain_file(req: ExplainRequest):
    prompt = f"""
Explain this file in clear steps for a beginner.

Path: {req.path}

Content:
{req.content}

Return JSON: {{
  "summary": "",
  "key_functions": [],
  "potential_issues": [],
  "recommendations": []
}}
"""

    async with httpx.AsyncClient(timeout=40) as client:
        res = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
                "Content-Type": "application/json",
            },
            json={"model": "gpt-4o-mini", "messages": [{"role": "user", "content": prompt}], "response_format": {"type": "json_object"}},
        )
    return json.loads(res.json()["choices"][0]["message"]["content"])


# -----------------------------
# REFACTOR FILE
# -----------------------------
@app.post("/refactor-file")
async def refactor_file(req: RefactorRequest):
    prompt = f"""
You are SyntriAI. Refactor the file based on instructions.

Path: {req.path}

Instructions:
{req.instructions}

Original content:
{req.content}

Return JSON:
{{
  "refactored": "new file content",
  "diff": "unified diff"
}}
"""

    async with httpx.AsyncClient(timeout=40) as client:
        res = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
                "Content-Type": "application/json",
            },
            json={"model": "gpt-4o-mini", "messages": [{"role": "user", "content": prompt}], "response_format": {"type": "json_object"}},
        )

    data = json.loads(res.json()["choices"][0]["message"]["content"])

    original = req.content.splitlines()
    updated = data["refactored"].splitlines()

    diff_text = "\n".join(
        unified_diff(original, updated, fromfile="before", tofile="after")
    )

    data["diff"] = diff_text
    return data
