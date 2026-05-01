"use client";
import React from "react";
import { motion } from "framer-motion";

interface Stat {
  label: string;
  value: string;
  sub: string;
}

const STATS: Stat[] = [
  { label: "U.S. Voters Registered", value: "168M+", sub: "As of 2024" },
  { label: "Avg. Voter Turnout", value: "63%", sub: "Presidential elections" },
  { label: "States w/ Early Voting", value: "48", sub: "Plus D.C." },
  { label: "Mail-In Ballots Cast", value: "65M+", sub: "In 2020 election" },
];

export default function StatsBanner() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-4 text-center"
        >
          <div className="text-2xl sm:text-3xl font-black text-white mb-1">
            {stat.value}
          </div>
          <div className="text-white/80 text-xs font-semibold mb-1 leading-tight">
            {stat.label}
          </div>
          <div className="text-white/40 text-xs">{stat.sub}</div>
        </motion.div>
      ))}
    </div>
  );
}
