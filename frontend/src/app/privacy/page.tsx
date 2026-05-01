"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/synapse/Navbar";
import { Footer } from "@/components/synapse/Footer";

export default function PrivacyPage() {
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
              Privacy <em className="serif-italic text-lime">Policy</em>
            </h1>
            <p className="text-[rgba(231,229,228,0.6)] text-xl mb-16 leading-relaxed">
              Your trust is the foundation of our democratic mission. We are committed to 
              protecting your privacy while providing accurate voting assistance.
            </p>

            <div className="space-y-16">
              <section>
                <h2 className="serif text-3xl mb-6 text-white">1. Data Collection</h2>
                <p className="text-[rgba(231,229,228,0.7)] leading-relaxed mb-4">
                  VoteAgent is designed to be a privacy-first platform. We do not require 
                  registration or personal identification to use our Voter Assistant.
                </p>
                <ul className="space-y-4 list-disc list-inside text-[rgba(231,229,228,0.7)]">
                  <li><strong>Chat Logs:</strong> Interactions with the AI are processed to provide instant answers but are not linked to your real-world identity.</li>
                  <li><strong>Location Data:</strong> Any location-based queries (e.g., finding polling places) are processed in real-time and not stored on our servers.</li>
                </ul>
              </section>

              <section>
                <h2 className="serif text-3xl mb-6 text-white">2. AI & RAG Technology</h2>
                <p className="text-[rgba(231,229,228,0.7)] leading-relaxed mb-4">
                  Our system uses Retrieval-Augmented Generation (RAG). This means the AI 
                  only answers using verified election records from official sources.
                </p>
                <p className="text-[rgba(231,229,228,0.7)] leading-relaxed">
                                    We do not use your interactions to &quot;train&quot; global AI models. Your queries 
                  remain private to your session.
                </p>
              </section>

              <section>
                <h2 className="serif text-3xl mb-6 text-white">3. Non-Partisan Integrity</h2>
                <p className="text-[rgba(231,229,228,0.7)] leading-relaxed">
                  VoteAgent is strictly non-partisan. We do not track political leanings or 
                  voting preferences. Our goal is strictly educational—providing factual 
                  information on how to participate in the democratic process.
                </p>
              </section>

              <section>
                <h2 className="serif text-3xl mb-6 text-white">4. Third-Party Services</h2>
                <p className="text-[rgba(231,229,228,0.7)] leading-relaxed">
                  We may link to official government websites (e.g., .gov domains). Once you 
                  leave VoteAgent, you are subject to the privacy policy of that specific 
                  government entity.
                </p>
              </section>
            </div>

            <div className="mt-24 p-8 rounded-3xl bg-warm-charcoal border border-white/5">
              <p className="text-sm text-[rgba(231,229,228,0.5)]">
                Last updated: May 1, 2026. For questions regarding this policy, please 
                refer to our Documentation page.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
