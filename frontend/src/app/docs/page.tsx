"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/synapse/Navbar";
import { Footer } from "@/components/synapse/Footer";

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-stone-black text-stone">
      <Navbar />
      
      <div className="pt-40 pb-32 px-6">
        <div className="container mx-auto max-w-4xl">
                    <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
                        <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs text-[rgba(231,229,228,0.4)] hover:text-lime transition-colors mb-12 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Back to Home
            </Link>
            <h1 className="serif text-5xl md:text-6xl mb-8">
              System <em className="serif-italic text-lime">Documentation</em>
            </h1>
            <p className="text-[rgba(231,229,228,0.6)] text-xl mb-16 leading-relaxed">
              Understand the technology and verification processes behind the 
              Voter Assistant platform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
              {[
                { title: "RAG Pipeline", desc: "Retrieval-Augmented Generation ensures every AI response is grounded in factual documents." },
                { title: "Verified Sources", desc: "Our database pulls from 100+ official election board records and civic guides." },
                { title: "Deterministic Logic", desc: "We use multi-stage validation to prevent AI hallucinations and ensure accuracy." },
                { title: "Civic Integrity", desc: "Non-partisan alignment verified by independent constitutional experts." }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-warm-charcoal border border-white/5">
                  <h3 className="serif text-2xl mb-4 text-white">{item.title}</h3>
                  <p className="text-sm text-[rgba(231,229,228,0.6)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="space-y-16">
              <section>
                <h2 className="serif text-3xl mb-6 text-white">How it Works</h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-lime text-stone-black flex items-center justify-center shrink-0 font-bold">1</div>
                    <div>
                      <h4 className="text-xl mb-2">Query Ingestion</h4>
                      <p className="text-[rgba(231,229,228,0.7)]">User asks a question via the Voter Assistant interface.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-lime text-stone-black flex items-center justify-center shrink-0 font-bold">2</div>
                    <div>
                      <h4 className="text-xl mb-2">Document Retrieval</h4>
                      <p className="text-[rgba(231,229,228,0.7)]">The system scans our verified database for relevant election rules and laws.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-lime text-stone-black flex items-center justify-center shrink-0 font-bold">3</div>
                    <div>
                      <h4 className="text-xl mb-2">Validated Synthesis</h4>
                      <p className="text-[rgba(231,229,228,0.7)]">The AI synthesizes an answer using ONLY the retrieved information.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="serif text-3xl mb-6 text-white">Usage Guidelines</h2>
                <p className="text-[rgba(231,229,228,0.7)] leading-relaxed">
                  While VoteAgent provides verified information, always confirm critical 
                  deadlines and registration status with your local election office. 
                  This tool is for educational assistance and does not replace official 
                  government legal advice.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
