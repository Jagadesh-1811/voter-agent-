import os
import json
import asyncio
import time
from typing import AsyncGenerator

# In-memory chat storage (session_id -> list of messages)
_chat_sessions: dict[str, list[dict]] = {}

# ── Load FAQ data ─────────────────────────────────────────────────────────────
FAQ_FILE = os.path.join(os.path.dirname(__file__), "faqs.json")

def load_faqs():
    with open(FAQ_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

FAQS = load_faqs()

# Pre-compute a simple keyword index
TOPIC_KEYWORDS = [
    "register", "registration", "eligible", "eligibility", "vote", "voting",
    "ballot", "mail", "absentee", "early", "polling", "poll", "location",
    "id", "identification", "primary", "general", "election", "timeline",
    "count", "counting", "result", "results", "recount", "runoff", "canvas",
    "canvass", "candidate", "party", "democrat", "republican", "independent",
    "straight", "ticket", "split", "write", "in", "candidate", "measure",
    "referendum", "initiative", "bond", "amendment", "constitutional",
    "provisional", "overseas", "military", "student", "college", "disabled",
    "accessibility", "machine", "audit", "security", "interference",
    "suppression", "rights", "act", "help", "america", "voter",
    "federal", "state", "local", "county", "city", "town", "municipal",
    "precinct", "district", "congress", "senate", "house", "president",
    "electoral", "college", "popular", "winner", "lose", "margin", "majority",
    "plurality", "worker", "watcher", "observer", "transparency",
    "reform", "redistrict", "gerrymandering", "language", "bilingual",
    "spanish", "chinese", "korean", "vietnamese", "tagalog", "sign", "signature",
    "deadline", "day", "hours", "open", "close", "line", "long", "wait",
    "curbside", "accommodation", "assist", "help", "question", "problem",
    "update", "change", "address", "name", "affiliation", "remove",
    "forgot", "lost", "receipt", "track", "tracking", "confirm", "confirmed"
]


def retrieve_faq(query: str, top_k: int = 3) -> list:
    """Retrieve most relevant FAQ entries using keyword matching."""
    query_lower = query.lower()
    query_words = set(query_lower.replace("?", " ").replace(",", " ").split())

    scored = []
    for faq in FAQS:
        score = 0
        topic_words = set(faq.get("topic", "").lower().split()) if isinstance(faq.get("topic"), str) else set()
        question_words = set(faq["question"].lower().replace("?", " ").replace(",", " ").split())

        # Exact keyword overlap with question
        for word in query_words:
            if word in question_words:
                score += 3
            if word in topic_words:
                score += 2

        # Partial match on common election terms
        for keyword in TOPIC_KEYWORDS:
            if keyword in query_lower:
                if keyword in faq["question"].lower() or keyword in faq.get("topic", "").lower():
                    score += 1
                if keyword in faq["answer"].lower():
                    score += 0.5

        # Boost if multiple words from the query appear
        common_with_question = query_words & question_words
        common_with_topic = query_words & topic_words
        if len(common_with_question) > 1:
            score += len(common_with_question) * 2
        if len(common_with_topic) > 1:
            score += len(common_with_topic) * 1.5

        if score > 0:
            scored.append((score, faq))

    scored.sort(key=lambda x: x[0], reverse=True)
    return [faq for _, faq in scored[:top_k]]


def get_faq_response(query: str) -> str:
    """Find the best matching FAQ answer for the user's query."""
    matches = retrieve_faq(query, top_k=3)

    if not matches:
        return (
            "I don't have a specific answer for that question in my verified election database. "
            "For the most accurate information, please visit your state's official election website "
            "or contact your local election office directly."
        )

    best_match = matches[0]
    answer = best_match["answer"]

    # If we have additional close matches, add them
    if len(matches) > 1:
        answer += "\n\n**Related information:**\n"
        for match in matches[1:]:
            answer += f"- **{match['question']}**\n"

    return answer


async def seed_knowledge_base():
    """No-op since we're using in-memory election data."""
    print("[RECORDS] Using in-memory verified election database")


async def stream_ai_response(
    user_id: str,
    session_id: str,
    message: str,
) -> AsyncGenerator[str, None]:
    """Generate RAG-based response from FAQ database with in-memory storage."""
    # 1. Initialize session if needed
    if session_id not in _chat_sessions:
        _chat_sessions[session_id] = []

    # 2. Get FAQ-based response
    full_response = get_faq_response(message)

    # 3. Save user message
    timestamp_ms = int(time.time() * 1000)
    _chat_sessions[session_id].append({
        "role": "user",
        "content": message,
        "timestamp": timestamp_ms,
    })

    # 4. Stream the response character by character for effect
    chunk_size = 15
    for i in range(0, len(full_response), chunk_size):
        await asyncio.sleep(0.01)
        yield full_response[i:i + chunk_size]

    # 5. Save assistant response
    _chat_sessions[session_id].append({
        "role": "assistant",
        "content": full_response,
        "timestamp": int(time.time() * 1000),
    })


async def get_chat_history(user_id: str, session_id: str) -> list:
    """Fetch chat history from in-memory storage for a session."""
    messages = _chat_sessions.get(session_id, [])
    return [{"role": m["role"], "content": m["content"]} for m in messages]