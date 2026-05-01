"use client";
import React from "react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Registration Engine",
    description: "AI-guided workflows to help you register across all 50 states with specific deadline alerts.",
    tint: "bg-violet-500/10 text-violet-500",
  },
  {
    title: "Eligibility Logic",
    description: "Instant verification of state-specific voting requirements, including ID and residency laws.",
    tint: "bg-cyan-500/10 text-cyan-500",
  },
  {
    title: "Live Result Stream",
    description: "Direct integration with official election boards for verified, sub-millisecond result tracking.",
    tint: "bg-emerald-500/10 text-emerald-500",
  },
  {
    title: "Candidate Profiles",
    description: "Deep-dive analysis of voting records, platforms, and non-partisan voter guide summaries.",
    tint: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Voter Locators",
    description: "Real-time mapping of your specific polling place and early voting drop-box locations.",
    tint: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Civic Intelligence",
    description: "Neural-enhanced RAG pipeline providing factual answers to complex constitutional queries.",
    tint: "bg-pink-500/10 text-pink-500",
  },
];

interface Feature {
  title: string;
  description: string;
  tint: string;
}

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.23, 1, 0.32, 1] 
      }}
      whileHover={{ 
        y: -12, 
        borderColor: "rgba(139, 92, 246, 0.4)",
        backgroundColor: "rgba(255, 255, 255, 0.04)"
      }}
      className="p-10 rounded-[32px] border border-white/5 bg-white/2 transition-all duration-300 group cursor-default"
    >
      <div className={`text-[10px] font-mono uppercase tracking-widest mb-6 ${feature.tint.split(' ')[1]}`}>
        Feature {index + 1}
      </div>
      <h3 className="font-serif text-2xl text-white mb-4 tracking-tight">
        {feature.title}
      </h3>
      <p className="font-sans text-neutral-400 leading-relaxed text-sm">
        {feature.description}
      </p>
    </motion.div>
  );
};

export const Features = () => {
  return (
    <section id="guide" className="py-32 container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
};
