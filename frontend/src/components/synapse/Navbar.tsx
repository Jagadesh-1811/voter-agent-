"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { User, signOut } from "firebase/auth";
import { LogOut } from "lucide-react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
                    ? "py-4 bg-stone-black/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]"
          : "py-6"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
                    {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-lime flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
              <span className="text-stone-black font-bold text-sm font-mono">VA</span>
            </div>
            <span className="serif text-xl text-stone">VoteAgent</span>
          </Link>

          {/* Center Navigation Pill */}
          <div className="hidden md:flex items-center gap-2 p-2 nav-pill">
            {[
              { label: "Home", href: "/" },
              { label: "Voter Assistant", href: "/chat" },
              { label: "About", href: "/#about" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-lime px-4 py-1.5 rounded-full"
              >
                {link.label}
              </Link>
            ))}
          </div>

                    {/* CTA Button - Auth Aware */}
          <div className="flex items-center gap-3">
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-stone/60">Welcome,</p>
                      <p className="text-sm font-semibold text-white truncate max-w-[120px]">
                        {user.displayName || user.email?.split("@")[0] || "User"}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-lime/70 to-lime/50 text-stone-black font-semibold hover:shadow-[0_0_20px_rgba(212,242,104,0.3)] transition-all text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden sm:inline">Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-lime to-lime/80 text-stone-black font-semibold hover:shadow-[0_0_20px_rgba(212,242,104,0.3)] transition-all"
                  >
                    Sign In
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};