"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Sparkles, ShieldCheck, ChevronRight, CheckCircle, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push("/profile");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.code === "auth/popup-closed-by-user") {
        setError("Login popup was closed. Please try again.");
      } else if (error.code === "auth/popup-blocked") {
        setError("Popup was blocked. Please allow popups for this site.");
      } else {
        setError("Login failed. Please try again.");
      }
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-black via-warm-charcoal to-stone-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 -left-40 w-96 h-96 bg-lime rounded-full blur-[140px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 0.9, 1], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-lime rounded-full blur-[140px] pointer-events-none" 
      />
      <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-stone/5 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Main Card */}
        <div className="bg-gradient-to-b from-white/10 to-white/5 border border-lime/30 backdrop-blur-3xl rounded-[28px] p-8 shadow-2xl relative overflow-hidden">
          {/* Glow background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-lime/10 to-transparent rounded-[28px] pointer-events-none" />
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center relative z-10"
          >
            {/* Heading */}
            <motion.h1 
              variants={itemVariants}
              className="serif text-4xl font-bold bg-gradient-to-r from-white to-stone text-transparent bg-clip-text mb-3"
            >
              Welcome to VoteAgent
            </motion.h1>
            
            {/* Subheading */}
            <motion.p 
              variants={itemVariants}
              className="text-stone/60 text-base mb-8 max-w-[300px] leading-relaxed font-light"
            >
              Your intelligent voting guide. Sign in to explore candidates and policy positions.
            </motion.p>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-200 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Login Buttons */}
            <motion.div 
              variants={itemVariants}
              className="w-full space-y-4"
            >
              <motion.button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full group relative bg-gradient-to-r from-lime to-lime/80 hover:shadow-[0_0_30px_rgba(212,242,104,0.4)] text-stone-black font-bold py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-center gap-3 relative z-10">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-stone-black border-t-lime rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </div>
              </motion.button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-stone/40 text-xs uppercase tracking-widest">Secure Login</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Info Cards */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-2 gap-3"
              >
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                  <ShieldCheck className="w-5 h-5 text-lime mb-2" />
                  <p className="text-white text-xs font-semibold">Secure</p>
                  <p className="text-stone/50 text-[10px]">Firebase Auth</p>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                  <CheckCircle className="w-5 h-5 text-lime mb-2" />
                  <p className="text-white text-xs font-semibold">Verified</p>
                  <p className="text-stone/50 text-[10px]">Google OAuth</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Footer Info */}
            <motion.p 
              variants={itemVariants}
              className="mt-8 text-stone/40 text-[11px] leading-relaxed"
            >
              By signing in, you agree to our privacy policy and terms of service.
            </motion.p>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-12 -left-12 w-24 h-24 bg-lime/5 rounded-full blur-2xl pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -bottom-12 -right-12 w-24 h-24 bg-lime/5 rounded-full blur-2xl pointer-events-none"
        />
      </motion.div>

      {/* Bottom Branding */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <div className="flex items-center gap-4 opacity-40 mb-2">
          <div className="h-px w-6 bg-gradient-to-l from-stone/50 to-transparent" />
          <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-stone/50">VoteAgent Civic Platform</p>
          <div className="h-px w-6 bg-gradient-to-r from-stone/50 to-transparent" />
        </div>
        <p className="text-[9px] text-stone/30">© 2026 Vote Agent. All rights reserved.</p>
      </motion.div>
    </div>
  );
}
