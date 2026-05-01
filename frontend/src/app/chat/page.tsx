"use client";
import React, { useEffect, useState } from "react";
import AIChat from "@/components/AIChat";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ChatPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen bg-stone-black flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-12 h-12 rounded-2xl bg-lime flex items-center justify-center"
        >
          <Sparkles className="w-6 h-6 text-stone-black" />
        </motion.div>
      </div>
    );
  }

  return (
    <main className="h-screen bg-stone-black text-stone overflow-hidden">
      <AIChat />
    </main>
  );
}
