"use client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/synapse/Navbar";
import { Footer } from "@/components/synapse/Footer";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-black text-stone">
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-9999 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column - 5/12 ratio */}
                        <motion.div
              className="lg:col-span-12 space-y-8 text-center flex flex-col items-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-charcoal border border-[rgba(255,255,255,0.1)]">
                <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                                <span className="label text-xs text-[rgba(231,229,228,0.6)]">Voter Assistant</span>
              </div>

              <h1 className="serif text-6xl md:text-7xl leading-[1.1]">
                Your <em className="serif-italic text-lime">Intelligent</em> Election Guide
              </h1>

                            <p className="text-lg text-[rgba(231,229,228,0.6)] max-w-2xl mx-auto leading-relaxed">
                Get instant, accurate answers to your voting questions. Our RAG-powered assistant
                draws from 100+ verified information sources about elections, registration,
                and voting procedures.
              </p>

                                          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <Link href="/chat" className="cta-button">
                  Ask for Voter Assistant
                </Link>
              </div>
            </motion.div>


          </div>
        </div>
      </section>

      {/* Serrated Divider */}
      <div className="serrated" />

            {/* Voter Guide Section */}
            <section id="guide" className="py-24 px-6 bg-warm-charcoal">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="serif text-4xl md:text-5xl mb-4">
              What Would You Like to Know?
            </h2>
            <p className="text-[rgba(231,229,228,0.6)] max-w-xl mx-auto">
              Browse our categorized questions or search for specific topics below.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
              { title: "Voter Eligibility", count: 12, color: "#D4F268" },
              { title: "Registration", count: 15, color: "#E7E5E4" },
              { title: "Voting Methods", count: 18, color: "#D4F268" },
              { title: "Mail-In Ballots", count: 10, color: "#E7E5E4" },
              { title: "Election Day", count: 14, color: "#D4F268" },
              { title: "Results & Counting", count: 11, color: "#E7E5E4" },
            ].map((category, i) => (
              <motion.div
                key={category.title}
                className="bento-card p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                
                <h3 className="serif text-2xl mb-2">{category.title}</h3>
                <p className="text-sm text-[rgba(231,229,228,0.6)]">
                  {category.count} questions answered
                </p>
                                                <Link href="/chat" className="mt-6 flex items-center text-lime text-sm font-medium cursor-pointer hover:gap-3 gap-2 transition-all">
                  Browse all <span>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Serrated Divider */}
      <div className="serrated" />



      {/* Serrated Divider */}
      <div className="serrated" />

      {/* About Section */}
            <section id="about" className="py-24 px-6 bg-warm-charcoal">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="serif text-4xl md:text-5xl mb-6">
                Built on Verified <em className="serif-italic text-lime">Information</em>
              </h2>
              <p className="text-[rgba(231,229,228,0.7)] text-lg leading-relaxed mb-8">
                Unlike general AI chatbots, VoteAgent is powered exclusively by a curated
                                database of 100+ verified election records. Every answer is reviewed for
                accuracy and sourced from official election resources.
              </p>

              <div className="space-y-4">
                {[
                  "No hallucinated information",
                  "Answers from verified sources only",
                  "Covers federal, state, and local elections",
                                    "Regularly updated voter information"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-lime flex items-center justify-center">
                      <span className="text-stone-black font-bold text-sm">✓</span>
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {[
                                { value: "100+", label: "Verified Guides" },
                { value: "50+", label: "Topic Areas" },
                { value: "24/7", label: "Availability" },
                { value: "0ms", label: "Response Time" },
              ].map((stat, i) => (
                <div key={i} className="card p-8 text-center">
                  <div className="serif text-4xl text-lime mb-2">{stat.value}</div>
                  <div className="label text-xs text-[rgba(231,229,228,0.6)]">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Serrated Divider */}
      <div className="serrated" />

      {/* Final CTA */}
      <section className="py-32 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="serif text-5xl md:text-6xl mb-8">
              Ready to Find <em className="serif-italic text-lime">Your Answer</em>?
            </h2>
            <p className="text-[rgba(231,229,228,0.6)] text-lg mb-12 max-w-xl mx-auto">
              Join thousands of voters who have already found the answers they need.
            </p>
                                                <Link href="/chat" className="cta-button">
              Ask for Voter Assistant
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}