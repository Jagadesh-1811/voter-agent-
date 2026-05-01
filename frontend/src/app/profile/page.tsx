"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth } from "@/lib/firebase";
import { User, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ChevronRight, Check, AlertCircle } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setFormData((prev) => ({
          ...prev,
          fullName: currentUser.displayName || "",
        }));
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.fullName.trim()) {
      setError("Please enter your name");
      return;
    }

    // Save profile (you can add backend call here)
    setProfileComplete(true);
    setTimeout(() => {
      router.push("/chat");
    }, 1500);
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
      transition: { duration: 0.6 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-black via-warm-charcoal to-stone-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-lime border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (profileComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-black via-warm-charcoal to-stone-black flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8 }}
            className="w-20 h-20 bg-lime rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-stone-black" />
          </motion.div>
          <h2 className="serif text-4xl text-white mb-3">Profile Created!</h2>
          <p className="text-stone/60 mb-8">Redirecting to chat...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-black via-warm-charcoal to-stone-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
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

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Main Card */}
        <div className="bg-gradient-to-b from-white/10 to-white/5 border border-lime/30 backdrop-blur-3xl rounded-[28px] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-lime/10 to-transparent rounded-[28px] pointer-events-none" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-10">
              <h1 className="serif text-4xl font-bold bg-gradient-to-r from-white to-stone text-transparent bg-clip-text mb-2">
                Create Your Profile
              </h1>
              <p className="text-stone/60">
                Help us personalize your voter assistant experience
              </p>
            </motion.div>

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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-stone/40 focus:outline-none focus:border-lime transition-colors"
                />
              </motion.div>



              {/* Submit Button */}
              <motion.div
                variants={itemVariants}
                className="flex gap-3 pt-6"
              >
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-lime to-lime/80 hover:shadow-[0_0_30px_rgba(212,242,104,0.4)] text-stone-black font-bold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>Complete Profile</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => signOut(auth)}
                  className="px-6 py-3 bg-gradient-to-r from-lime/70 to-lime/50 text-stone-black font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(212,242,104,0.3)] transition-all"
                >
                  Logout
                </button>
              </motion.div>
            </form>

            {/* User Info */}
            {user && (
              <motion.div
                variants={itemVariants}
                className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-stone/50"
              >
                Signed in as: <span className="text-stone/70">{user.email}</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
