"use client";
import React from "react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div
          animate={{ y: [-20, 20, -20], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(212,242,104,0.3) 0%, transparent 70%)",
            filter: "blur(80px)"
          }}
        />
        <motion.div
          animate={{ y: [20, -20, 20], scale: [1.05, 1, 1.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(212,242,104,0.2) 0%, transparent 70%)",
            filter: "blur(80px)"
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-[hsl(20,6%,90%)] mb-8"
        >
          Navigate the <br />
          <em className="serif-italic text-[rgb(212,242,104)]">Election Cycle.</em>
        </motion.h1>

                <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-2xl mx-auto text-[rgba(231,229,228,0.6)] text-lg md:text-xl leading-relaxed mb-12"
        >
          Your RAG-powered voter assistant. Get instant, accurate answers
          to verified information about voter registration, eligibility, and voting procedures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
                    <a href="#chat" className="cta-button">
            Ask for Voter Assistant
          </a>
          <a
            href="#about"
            className="text-sm tracking-[0.15em] uppercase text-[rgba(231,229,228,0.5)] hover:text-[hsl(20,6%,90%)] transition-colors"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
};