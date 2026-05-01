"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  UserCheck,
  Search,
  Vote,
  BarChart3,
  ChevronRight,
} from "lucide-react";

interface Stage {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  steps: string[];
  tip: string;
}

const STAGES: Stage[] = [
  {
    id: "register",
    icon: <UserCheck size={24} />,
    title: "Voter Registration",
    subtitle: "Get on the rolls",
    color: "from-violet-500 to-purple-600",
    steps: [
      "Confirm citizenship and age (18+) eligibility",
      "Gather proof of identity (ID, passport, or utility bill)",
      "Visit your official state/national voter registration portal",
      "Fill in name, address, date of birth, and ID number",
      "Submit before the registration deadline (typically 15–30 days prior)",
      "Verify your registration status online 1 week later",
    ],
    tip: "Deadlines vary by state. Some allow same-day registration at the polls!",
  },
  {
    id: "research",
    icon: <Search size={24} />,
    title: "Research Candidates",
    subtitle: "Know who you're voting for",
    color: "from-blue-500 to-cyan-600",
    steps: [
      "Identify which offices are on your ballot (federal, state, local)",
      "Visit each candidate's official website and read their platform",
      "Check nonpartisan voter guides (e.g., Vote411.org, Ballotpedia)",
      "Watch candidate debates or town halls",
      "Review their voting record or prior experience",
      "Read local newspaper endorsements for additional perspectives",
    ],
    tip: "Focus on local races too — they have the most direct impact on your daily life.",
  },
  {
    id: "vote",
    icon: <Vote size={24} />,
    title: "Cast Your Ballot",
    subtitle: "Make your voice heard",
    color: "from-emerald-500 to-teal-600",
    steps: [
      "Choose your method: in-person, early voting, or mail-in ballot",
      "If mail-in: request your ballot at least 2 weeks before election day",
      "Find your polling place using the official election board locator",
      "Bring valid photo ID (check your state's requirements)",
      "Arrive early — polls typically open 6 AM and close at 8 PM",
      "If you're in line before closing time, you have the right to vote",
    ],
    tip: "If your mail ballot has an error, you can often fix it ('cure' it) before the deadline.",
  },
  {
    id: "results",
    icon: <BarChart3 size={24} />,
    title: "Track Results",
    subtitle: "Follow the count",
    color: "from-orange-500 to-rose-500",
    steps: [
      "Watch election night results on official state election board websites",
      "Understand that mail-in votes are often counted last (may take days)",
      "Follow certified news outlets for accurate projections",
      "Wait for official canvass — usually completed within 2–4 weeks",
      "Results are certified by the Secretary of State or election commission",
      "Candidates can request a recount if the margin is within ~0.5%",
    ],
    tip: "Election Night totals are UNOFFICIAL. Final certified results come weeks later.",
  },
];

export default function ElectionStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const markComplete = (index: number) => {
    if (!completedSteps.includes(index)) {
      setCompletedSteps((prev) => [...prev, index]);
    }
    if (index < STAGES.length - 1) setActiveStep(index + 1);
  };

  const active = STAGES[activeStep];

  return (
    <div className="w-full space-y-6">
      {/* Stage Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {STAGES.map((stage, i) => {
          const isDone = completedSteps.includes(i);
          const isCurrent = i === activeStep;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStep(i)}
              aria-current={isCurrent ? "step" : undefined}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                isCurrent
                  ? "bg-white text-gray-900 border-white shadow-lg scale-105"
                  : isDone
                  ? "bg-white/20 text-white border-white/30"
                  : "bg-white/10 text-white/60 border-white/10 hover:bg-white/20 hover:text-white"
              }`}
            >
              {isDone ? (
                <CheckCircle2 size={16} className="text-emerald-400" />
              ) : (
                <Circle size={16} />
              )}
              {stage.title}
            </button>
          );
        })}
      </div>

      {/* Stage Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card p-8 border-white/10"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`w-12 h-12 rounded-xl bg-linear-to-br ${active.color} flex items-center justify-center text-white shadow-lg`}
            >
              {active.icon}
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">{active.title}</h3>
              <p className="text-white/60 text-sm">{active.subtitle}</p>
            </div>
            <div className="ml-auto text-white/40 text-sm">
              Step {activeStep + 1} of {STAGES.length}
            </div>
          </div>

          {/* Steps */}
          <ol className="space-y-4 mb-8">
            {active.steps.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="flex items-start gap-4 group"
              >
                <span
                  className={`w-7 h-7 rounded-lg bg-linear-to-br ${active.color} text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {i + 1}
                </span>
                <span className="text-neutral-300 text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                  {step}
                </span>
              </motion.li>
            ))}
          </ol>

          {/* Tip */}
          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-3 mb-6">
            <p className="text-yellow-300 text-sm">
              <span className="font-bold">Tip: </span>
              {active.tip}
            </p>
          </div>

          {/* Action */}
          <button
            onClick={() => markComplete(activeStep)}
            className={`w-full py-3 rounded-xl bg-linear-to-r ${active.color} text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg`}
          >
            {activeStep < STAGES.length - 1
              ? "Mark Complete & Continue"
              : "Finish Journey"}
            <ChevronRight size={18} />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
