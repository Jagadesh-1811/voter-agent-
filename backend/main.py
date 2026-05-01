import asyncio
import uuid
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from ai_service import stream_ai_response, get_chat_history, seed_knowledge_base


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize FAQ database on startup."""
    await seed_knowledge_base()
    yield


app = FastAPI(
    title="VoteAgent FAQ API",
    description="RAG-powered election FAQ assistant with 100+ verified answers",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request Models ──────────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    user_id: str = "anonymous"
    session_id: str = ""
    message: str


class HistoryRequest(BaseModel):
    user_id: str
    session_id: str


# ── Routes ──────────────────────────────────────────────────────────────────

@app.get("/health")
async def health():
    return {"status": "ok", "service": "VoteAgent FAQ API"}


@app.post("/api/chat/stream")
async def chat_stream(req: ChatRequest):
    """Stream FAQ response via Server-Sent Events."""
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    session_id = req.session_id or str(uuid.uuid4())

    async def event_generator():
        try:
            async for chunk in stream_ai_response(
                user_id=req.user_id,
                session_id=session_id,
                message=req.message,
            ):
                # Escape newlines for SSE
                safe = chunk.replace("\n", "\\n")
                yield f"data: {safe}\n\n"
            yield f"data: [DONE]\n\n"
        except Exception as e:
            yield f"data: [ERROR] {str(e)}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "X-Session-ID": session_id,
        },
    )


@app.get("/api/chat/history")
async def chat_history(user_id: str, session_id: str):
    """Fetch chat history for a given session from in-memory storage."""
    try:
        messages = await get_chat_history(user_id, session_id)
        return {"session_id": session_id, "messages": messages}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))