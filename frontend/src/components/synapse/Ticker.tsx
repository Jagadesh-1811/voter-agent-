"use client";
import React from "react";

const TICKER_DATA = [
  { label: "REGISTERED", value: "168.4M" },
  { label: "TURNOUT_AVG", value: "63.2%" },
  { label: "EARLY_VOTE_STATES", value: "48" },
  { label: "MAIL_IN_CAST", value: "65.6M" },
  { label: "SYSTEM_STATUS", value: "OPERATIONAL", color: "text-emerald-500" },
  { label: "AGENT_LATENCY", value: "12ms" },
  { label: "VOTER_POWER", value: "INFINITE" },
];

export const Ticker = () => {
  return (
    <div className="w-full h-[60px] bg-black/40 border-y border-white/5 overflow-hidden flex items-center">
      <div className="ticker-scroll">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-16 px-8">
            {TICKER_DATA.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-neutral-500 tracking-[0.2em] uppercase">
                  {item.label}
                </span>
                <span className={`font-mono text-sm font-bold ${item.color || "text-white"}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
