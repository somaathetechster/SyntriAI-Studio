# SyntriAI — Starter


A minimal starter for the SyntriAI hackathon build.


## Overview
- Frontend: Next.js (mobile-first) — `frontend/`
- Backend: FastAPI — `backend/`
- Orchestrator: Python script that simulates Amazon Q Developer responses — `orchestrator/`


## Quick start (dev)


**Backend** (in WSL or Linux):


```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000