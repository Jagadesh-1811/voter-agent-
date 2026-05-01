# VoteAgent: Your Intelligent Election Guide

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/AI-Python%203.9+-3776AB?logo=python)](https://www.python.org/)

**VoteAgent** is a production-grade, non-partisan civic tool designed to empower voters with accurate, verified information. Using state-of-the-art **Retrieval-Augmented Generation (RAG)**, it provides instant answers to complex voting questions while maintaining strict neutrality and data integrity.

---

## Key Features

- **RAG-Powered AI Assistant**: Context-aware chat grounded in 100+ verified election records to eliminate hallucinations.
- **Multi-Session History**: Smart sidebar for managing multiple chat sessions with local persistence.
- **Premium Glassmorphic UI**: High-fidelity interface built with Next.js, Framer Motion, and Tailwind CSS.
- **Privacy First**: Unique local-first session management. Your entire chat history is stored in your browser's local cache (LocalStorage), ensuring absolute privacy and zero server-side data persistence.
- **Instant Persistence**: Leverages the local cache for lightning-fast history retrieval and multi-session management without the need for a traditional database.
- **Downloadable Records**: Export any chat session directly to PDF with a single click for offline reference and official documentation.
- **Hyper-Local Intelligence**: Detailed insights into registration, polling locations, and eligibility.

---

## Quick Start

### Prerequisites
- **Node.js** v18.0+
- **Python** v3.9+
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/Jagadesh-1811/voter-agent-.git
cd voter-agent-
```

### 2. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```
*Access at [http://localhost:3000](http://localhost:3000)*

### 3. Backend Setup (FastAPI)
```bash
cd ../backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
*API docs available at [http://localhost:8000/docs](http://localhost:8000/docs)*

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 14, Tailwind CSS, Framer Motion, Lucide React |
| **Backend** | FastAPI, Python, Uvicorn |
| **AI/ML** | RAG (Retrieval-Augmented Generation), Gemini/NVIDIA API |
| **Storage** | LocalStorage (Persistence), JSON (Verified Records) |

---

## Project Structure

```text
voter-agent/
├── frontend/           # Next.js 14 App Router
│   ├── src/app/        # Pages (Chat, Docs, Privacy)
│   ├── src/components/ # UI Components (AIChat, Stepper)
│   └── public/         # Static Assets
├── backend/            # FastAPI Service
│   ├── main.py         # API Endpoints
│   ├── ai_service.py   # RAG Logic & AI Integration
│   └── data/           # Ground truth election datasets
└── .gitignore          # Production-ready exclusion rules
```

---

## Contributing

We welcome contributions to help make voting more accessible! 
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---
<p align="center">
  Built for a more informed and engaged electorate.
</p>
