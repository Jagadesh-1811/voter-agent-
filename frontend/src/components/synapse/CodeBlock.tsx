"use client";
import React from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";

export const CodeBlock = () => {
  return (
    <section className="py-32 container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-4xl mx-auto bg-[#080808]/80 border border-white/10 rounded-[24px] overflow-hidden shadow-2xl"
      >
        {/* Toolbar */}
        <div className="h-12 border-b border-white/10 flex items-center justify-between px-6 bg-white/2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
          </div>
          <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
            ai_service.py
          </div>
          <button className="text-neutral-500 hover:text-white transition-colors">
            <Copy size={14} />
          </button>
        </div>

        {/* Code Content */}
        <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre scrollbar-thin">
          <code className="text-neutral-400">
            <span className="text-violet-500">from</span> google <span className="text-violet-500">import</span> genai<br />
            <span className="text-violet-500">from</span> firebase_admin <span className="text-violet-500">import</span> firestore<br />
            <br />
            <span className="text-violet-500">async def</span> <span className="text-cyan-500">stream_voter_intelligence</span>(session_id, prompt):<br />
            {"  "}context = <span className="text-violet-500">await</span> retrieve_election_knowledge(prompt)<br />
            {"  "}system_instruction = <span className="text-emerald-500">&quot;You are the Synapse Election Guide...&quot;</span><br />
            <br />
            {"  "}<span className="text-violet-500">async for</span> chunk <span className="text-violet-500">in</span> client.models.generate_content_stream(<br />
            {"    "}model=<span className="text-emerald-500">&quot;gemini-2.0-flash&quot;</span>,<br />
            {"    "}contents=prompt,<br />
            {"    "}config=types.GenerateContentConfig(<br />
            {"      "}system_instruction=system_instruction,<br />
            {"      "}temperature=<span className="text-violet-500">0.1</span><br />
            {"    "})<br />
            {"  "}):<br />
            {"    "}<span className="text-violet-500">yield</span> chunk.text<br />
            <br />
            <span className="text-neutral-500"># All democratic systems operational.</span>
          </code>
        </div>
      </motion.div>
    </section>
  );
};
