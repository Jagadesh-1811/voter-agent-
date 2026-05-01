"use client";
import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-stone-black border-t border-white/5 py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-lime flex items-center justify-center">
                <span className="text-stone-black font-bold text-sm">VA</span>
              </div>
              <span className="serif text-2xl text-white">VoteAgent</span>
            </Link>
            <p className="text-sm text-neutral-500 max-w-sm leading-relaxed">
              Synthesizing democratic intelligence with your personal Voter Assistant. 
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-mono">
                © 2024 VOTEAGENT • NON-PARTISAN
              </p>
              <div className="flex gap-8">
                {[
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Documentation', href: '/docs' }
                ].map(link => (
                  <a 
                    key={link.label} 
                    href={link.href}
                    className="text-[10px] text-neutral-500 hover:text-white uppercase tracking-widest transition-colors font-mono"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative w-2 h-2 rounded-full bg-lime shadow-[0_0_10px_rgba(212,242,104,0.5)] animate-pulse" />
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
