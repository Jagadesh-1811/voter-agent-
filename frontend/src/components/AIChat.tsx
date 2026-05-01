"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { 
  MessageSquare, 
  Plus, 
  Trash2, 
  Menu, 
  X, 
  Download, 
  Home, 
  Send, 
  RotateCcw,
  Clock,
  Sparkles,
  ChevronLeft,
  Copy,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: number;
}

const SUGGESTED = [
  "Am I eligible to vote?",
  "How do I register to vote?",
  "What voting methods are available?",
  "What ID do I need to bring to vote?",
  "How are votes counted?",
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Welcome to the **Voter Assistant Intelligence**.\n\nI'm here to help you navigate the voting process with ease. I can provide verified information on:\n- Voter eligibility & registration\n- Voting methods (in-person, mail-in, early)\n- Election timelines and deadlines\n- How results are counted\n\nHow can I assist you today?",
  timestamp: new Date(),
};

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export default function AIChat() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  const createNewSession = useCallback(() => {
    const newId = crypto.randomUUID();
    const initialSession: ChatSession = {
      id: newId,
      title: "New Conversation",
      messages: [WELCOME_MESSAGE],
      lastUpdated: Date.now()
    };
    setSessions([initialSession]);
    setCurrentSessionId(newId);
    setMessages([WELCOME_MESSAGE]);
    localStorage.setItem("voteagent_sessions_v2", JSON.stringify([initialSession]));
    localStorage.setItem("voteagent_current_session_id_v2", newId);
  }, []);

  const startNewChat = useCallback(() => {
    const newId = crypto.randomUUID();
    const newSession: ChatSession = {
      id: newId,
      title: "New Conversation",
      messages: [WELCOME_MESSAGE],
      lastUpdated: Date.now()
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
    setMessages([WELCOME_MESSAGE]);
    if (typeof window !== "undefined" && window.innerWidth < 1024) setIsSidebarOpen(false);
  }, []);

  const switchSession = useCallback((id: string) => {
    const session = sessions.find(s => s.id === id);
    if (session) {
      setCurrentSessionId(id);
      setMessages(session.messages);
      if (typeof window !== "undefined" && window.innerWidth < 1024) setIsSidebarOpen(false);
    }
  }, [sessions]);

  // Initialize from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem("voteagent_sessions_v2");
    const lastSessionId = localStorage.getItem("voteagent_current_session_id_v2");

    if (savedSessions) {
      try {
        interface RawMessage {
          id: string;
          role: "user" | "assistant";
          content: string;
          timestamp: string | Date;
        }
        interface RawSession {
          id: string;
          title: string;
          messages: RawMessage[];
          lastUpdated: number;
        }

        const parsed: ChatSession[] = JSON.parse(savedSessions).map((s: RawSession) => ({
          ...s,
          messages: s.messages.map((m: RawMessage) => ({ 
            ...m, 
            timestamp: new Date(m.timestamp) 
          }))
        }));
        
        // Wrap in microtask to avoid "synchronous setState in effect" warning
        Promise.resolve().then(() => {
          setSessions(parsed);
          
          if (lastSessionId) {
            const found = parsed.find((s) => s.id === lastSessionId);
            if (found) {
              setCurrentSessionId(lastSessionId);
              setMessages(found.messages);
            } else if (parsed.length > 0) {
              setCurrentSessionId(parsed[0].id);
              setMessages(parsed[0].messages);
            } else {
              createNewSession();
            }
          } else if (parsed.length > 0) {
            setCurrentSessionId(parsed[0].id);
            setMessages(parsed[0].messages);
          } else {
            createNewSession();
          }
        });
      } catch (e) {
        console.error("Failed to parse sessions", e);
        Promise.resolve().then(() => createNewSession());
      }
    } else {
      Promise.resolve().then(() => createNewSession());
    }
  }, [createNewSession]);

  // Helper to update messages and sessions in one go to avoid cascading renders
  const updateSessionMessages = useCallback((sessionId: string, newMessages: Message[]) => {
    setMessages(newMessages);
    const now = Date.now();
    setSessions(prev => {
      const idx = prev.findIndex(s => s.id === sessionId);
      if (idx === -1) return prev;
      
      const session = prev[idx];
      let title = session.title;
      const firstUserMsg = newMessages.find(m => m.role === "user");
      if (firstUserMsg && (title === "New Conversation" || title === "")) {
        title = firstUserMsg.content.slice(0, 30) + (firstUserMsg.content.length > 30 ? "..." : "");
      }
      
      const updated = [...prev];
      updated[idx] = { ...session, messages: newMessages, title, lastUpdated: now };
      return updated;
    });
  }, []);

  // Persistent storage side-effect
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem("voteagent_sessions_v2", JSON.stringify(sessions));
    }
  }, [sessions]);

  useEffect(() => {
    if (currentSessionId) {
      localStorage.setItem("voteagent_current_session_id_v2", currentSessionId);
    }
  }, [currentSessionId]);

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = sessions.filter(s => s.id !== id);
    setSessions(filtered);
    if (currentSessionId === id) {
      if (filtered.length > 0) {
        setCurrentSessionId(filtered[0].id);
        setMessages(filtered[0].messages);
      } else {
        createNewSession();
      }
    }
  };

  const clearAllHistory = () => {
    if (confirm("Are you sure you want to clear all chat history?")) {
      setSessions([]);
      createNewSession();
    }
  };

  const scrollToBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => scrollToBottom(), [messages, isTyping, scrollToBottom]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isTyping) return;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };
      const messagesWithUser = [...messages, userMsg];
      updateSessionMessages(currentSessionId, messagesWithUser);
      setInput("");
      setIsTyping(true);

      const aiMsgId = crypto.randomUUID();
      const newMessagesWithAi: Message[] = [
        ...messagesWithUser,
        { id: aiMsgId, role: "assistant", content: "", timestamp: new Date() }
      ];
      updateSessionMessages(currentSessionId, newMessagesWithAi);

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

        const res = await fetch(`${BACKEND}/api/chat/stream`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: "anonymous",
            session_id: currentSessionId,
            message: text.trim(),
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.body) throw new Error("No response stream");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";
        let lineBuffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          lineBuffer += chunk;
          
          const lines = lineBuffer.split("\n");
          lineBuffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") {
              setIsTyping(false);
              return;
            }
            if (data.startsWith("[ERROR]")) {
              accumulated += "\n\n[Error] " + data.slice(8);
            } else {
              accumulated += data.replace(/\\n/g, "\n");
            }
            
            const currentAccumulated = accumulated;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === aiMsgId ? { ...m, content: currentAccumulated } : m
              )
            );
          }
        }
        setMessages(prev => {
          updateSessionMessages(currentSessionId, prev);
          return prev;
        });
      } catch (err) {
        console.error("Chat error:", err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgId
              ? {
                  ...m,
                  content: "Error: Unable to reach the Voter Assistant service. Please ensure the backend is running.",
                }
              : m
          )
        );
      } finally {
        setIsTyping(false);
      }
    },
    [isTyping, currentSessionId, messages, updateSessionMessages]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
    }
  };

  return (
    <div className="flex h-screen w-full relative overflow-hidden bg-stone-black" role="main">
      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Navigation Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: isSidebarOpen ? 0 : -320,
          width: isSidebarOpen ? 320 : 0,
          opacity: isSidebarOpen ? 1 : 0
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`absolute lg:relative z-50 h-full bg-[#0C0A09] border-r border-white/5 flex flex-col shadow-2xl ${!isSidebarOpen && "pointer-events-none"}`}
        aria-label="Chat History Sidebar"
      >
        <div className="p-6 h-20 flex items-center justify-between border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-lime/60" aria-hidden="true" />
            <h3 className="serif text-xl text-white font-medium">History</h3>
          </div>
          <button 
            onClick={startNewChat}
            className="p-2.5 rounded-xl bg-lime text-stone-black hover:scale-105 transition-all shadow-lg shadow-lime/20"
            title="Start New Chat"
            aria-label="Start a new chat session"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar" role="list">
          {sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-stone/20">
              <MessageSquare className="w-10 h-10 mb-2 opacity-10" aria-hidden="true" />
              <p className="text-xs uppercase tracking-widest">No history yet</p>
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                role="listitem"
                onClick={() => switchSession(session.id)}
                className={`group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${
                  currentSessionId === session.id 
                    ? "bg-lime/10 border border-lime/30 shadow-inner" 
                    : "hover:bg-white/5 border border-transparent"
                }`}
                aria-current={currentSessionId === session.id ? "true" : "false"}
              >
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${currentSessionId === session.id ? "text-lime font-medium" : "text-stone/60 group-hover:text-stone"}`}>
                    {session.title || "Untitled Chat"}
                  </p>
                  <p className="text-[10px] text-neutral-600 font-mono mt-1 flex items-center gap-1">
                    {new Date(session.lastUpdated).toLocaleDateString()} 
                    <span className="opacity-30">•</span>
                    {new Date(session.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <button 
                  onClick={(e) => deleteSession(session.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-stone/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                  aria-label={`Delete chat session ${session.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {sessions.length > 0 && (
          <div className="p-4 border-t border-white/5 shrink-0">
            <button 
              onClick={clearAllHistory}
              className="w-full flex items-center justify-center gap-2 p-3 text-xs text-stone/40 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all border border-transparent hover:border-red-400/20"
              aria-label="Clear all chat history"
            >
              <RotateCcw className="w-4 h-4" />
              Clear All History
            </button>
          </div>
        )}
      </motion.aside>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col h-full relative min-w-0 bg-stone-black">
        <div className="absolute inset-0 bg-linear-to-b from-lime/[0.03] to-transparent pointer-events-none" />
        
        {/* Chat Header */}
        <header className="flex items-center justify-between px-6 lg:px-8 h-20 border-b border-white/5 z-10 bg-stone-black/60 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2.5 rounded-xl transition-all border border-white/5 ${
                isSidebarOpen 
                  ? "bg-white/5 text-stone/60 hover:text-lime hover:bg-white/10" 
                  : "bg-lime text-stone-black shadow-lg shadow-lime/20 scale-105"
              }`}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
              aria-expanded={isSidebarOpen}
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-lime flex items-center justify-center shadow-[0_0_20px_rgba(212,242,104,0.3)] rotate-3 hover:rotate-0 transition-transform">
                <Sparkles className="w-5 h-5 text-stone-black" aria-hidden="true" />
              </div>
              <div className="hidden sm:block">
                <h2 className="text-white font-semibold text-sm lg:text-base">Voter Assistant AI</h2>
                <p className="text-lime/60 text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                  Secured Session
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-xl bg-white/5 text-stone/60 hover:text-lime hover:bg-white/10 transition-all text-xs border border-white/5 font-medium flex items-center gap-2 group"
              aria-label="Back to landing page"
            >
              <Home className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="hidden xs:inline">Home</span>
            </Link>
            <button 
              onClick={() => window.print()}
              className="p-2.5 rounded-xl bg-white/5 text-stone/60 hover:text-lime hover:bg-white/10 transition-all border border-white/5 group"
              title="Print conversation"
              aria-label="Print or save conversation as PDF"
            >
              <Download className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </header>

        {/* Message Thread */}
        <section className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth" aria-label="Conversation Thread">
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-start gap-3`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-xl bg-lime flex items-center justify-center shrink-0 shadow-lg shadow-lime/10 mt-1">
                      <Sparkles className="w-4 h-4 text-stone-black" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-[24px] px-6 py-4 text-sm leading-relaxed transition-all shadow-sm relative group/msg ${
                      msg.role === "user"
                        ? "bg-lime text-stone-black rounded-tr-none font-medium shadow-[0_10px_30px_-10px_rgba(212,242,104,0.4)]"
                        : "bg-white/3 text-stone/90 rounded-tl-none border border-white/10 backdrop-blur-md"
                    } ${!msg.content && "min-w-[80px] min-h-[50px] flex items-center justify-center bg-transparent border-none shadow-none"}`}
                  >
                    {/* Copy Button */}
                    {msg.role === "assistant" && msg.content && (
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(msg.content);
                        }}
                        className="absolute -right-12 top-0 p-2 rounded-xl bg-white/5 text-stone/20 hover:text-lime hover:bg-white/10 opacity-0 group-hover/msg:opacity-100 transition-all border border-transparent hover:border-white/10"
                        title="Copy message"
                        aria-label="Copy message to clipboard"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {msg.role === "assistant" ? (
                      msg.content ? (
                        <div className="space-y-4 text-stone/90">
                          <ReactMarkdown
                            components={{
                              strong: ({ children }) => (
                                <strong className="text-lime font-bold">{children}</strong>
                              ),
                              p: ({ children }) => (
                                <p className="leading-relaxed">{children}</p>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc pl-5 space-y-2">{children}</ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal pl-5 space-y-2">{children}</ol>
                              ),
                              li: ({ children }) => (
                                <li className="pl-1">{children}</li>
                              ),
                              h1: ({ children }) => <h1 className="serif text-2xl font-bold text-white mt-6 mb-2">{children}</h1>,
                              h2: ({ children }) => <h2 className="serif text-xl font-bold text-white mt-4 mb-2">{children}</h2>,
                              h3: ({ children }) => <h3 className="serif text-lg font-bold text-white mt-3 mb-2">{children}</h3>,
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 p-2">
                          <motion.span 
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="w-1.5 h-1.5 rounded-full bg-lime" 
                          />
                          <motion.span 
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                            className="w-1.5 h-1.5 rounded-full bg-lime" 
                          />
                          <motion.span 
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                            className="w-1.5 h-1.5 rounded-full bg-lime" 
                          />
                        </div>
                      )
                    ) : (
                      <span>{msg.content}</span>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 mt-1">
                      <span className="text-white font-bold text-[10px] font-mono">ME</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={endRef} className="h-4" />
          </div>
        </section>

        {/* Input Area */}
        <div className="w-full bg-stone-black/80 backdrop-blur-2xl border-t border-white/5 shrink-0">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Suggestions */}
            <AnimatePresence>
              {messages.length <= 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-2 mb-4 opacity-40">
                    <Sparkles className="w-3 h-3 text-lime" />
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium">Quick Starts</p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {SUGGESTED.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-xs bg-white/5 hover:bg-lime/10 text-stone/50 hover:text-lime border border-white/5 hover:border-lime/20 rounded-2xl px-5 py-3 transition-all flex items-center gap-2 group"
                      >
                        <ChevronLeft className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all rotate-180" />
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="relative" role="search" aria-label="Ask a question">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about voting..."
                disabled={isTyping}
                aria-label="Voter information query"
                className="w-full bg-white/5 border border-white/10 rounded-[24px] px-8 py-5 pr-20 text-sm text-lime placeholder:text-lime/20 focus:outline-none focus:border-lime/40 focus:bg-white/10 focus:ring-4 focus:ring-lime/5 transition-all disabled:opacity-50 shadow-2xl"
              />
              
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-[18px] bg-lime text-stone-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:grayscale shadow-xl shadow-lime/20 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
            
            <div className="mt-6 flex items-center justify-center gap-4 opacity-20">
              <span className="h-px w-8 bg-stone" />
              <p className="text-[10px] uppercase tracking-[0.3em] font-mono text-center">
                Non-partisan Assistant · Verified Records
              </p>
              <span className="h-px w-8 bg-stone" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}