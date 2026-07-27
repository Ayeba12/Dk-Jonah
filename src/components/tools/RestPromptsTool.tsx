"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const RestPromptsTool = () => {
  const prompts = [
    "What is one thing you accomplished today by doing absolutely nothing?",
    "Who gave you permission to run so fast? Can you return it to them?",
    "What does rest feel like in your chest when you let go of expectations?",
    "If your body was a room today, what would the temperature and lighting be?",
    "What is a task you can defer to tomorrow to give yourself space to breathe tonight?",
  ];

  const [promptIndex, setPromptIndex] = useState(0);
  const [journalText, setJournalText] = useState("");
  const [breathPhase, setBreathPhase] = useState("Inhale");
  const [breathTime, setBreathTime] = useState(4);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Breathing pacer cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setBreathTime((prevTime) => {
        if (prevTime === 1) {
          if (breathPhase === "Inhale") {
            setBreathPhase("Hold");
            return 4;
          } else if (breathPhase === "Hold") {
            setBreathPhase("Exhale");
            return 4;
          } else {
            setBreathPhase("Inhale");
            return 4;
          }
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [breathPhase]);

  // Load saved session
  useEffect(() => {
    const savedText = sessionStorage.getItem("dk_jonah_journal_reflection");
    if (savedText) {
      setTimeout(() => {
        setJournalText(savedText);
      }, 0);
    }
  }, []);

  const handleNextPrompt = () => {
    setPromptIndex((prev) => (prev + 1) % prompts.length);
  };

  const handleSave = () => {
    sessionStorage.setItem("dk_jonah_journal_reflection", journalText);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopy = () => {
    const text = `DK Jonah Reflection Journal:\nPrompt: "${prompts[promptIndex]}"\nResponse: ${journalText}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-[#ded2c1] bg-[#f8f2e8] p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center justify-between border-b border-[#ded2c1] pb-4">
        <h3 className="font-display text-2xl font-semibold text-[#201a16]">Rest Journal & Somatic Pacer</h3>
        <span className="text-xs text-[#7a7065]">distraction-free reflection</span>
      </div>

      <div className="grid gap-6">
        {/* Somatic Breathing Pacer */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-[#fffaf2] p-6 border border-[#ded2c1]/60">
          <span className="text-xs text-[#7a7065] uppercase tracking-wider mb-3">Somatic Grounding Pacer</span>
          
          <div className="relative flex h-28 w-28 items-center justify-center">
            {/* Breathing Bubble Outer */}
            <motion.div
              animate={{
                scale: breathPhase === "Inhale" ? [1, 1.4] : breathPhase === "Hold" ? 1.4 : [1.4, 1],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-[#ead9ad]/40"
            />
            {/* Breathing Bubble Inner */}
            <motion.div
              animate={{
                scale: breathPhase === "Inhale" ? [0.8, 1.15] : breathPhase === "Hold" ? 1.15 : [1.15, 0.8],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
              }}
              className="absolute h-20 w-20 rounded-full bg-[#b68a3a]/25 flex flex-col items-center justify-center z-10"
            >
              <span className="text-sm font-semibold text-[#201a16]">{breathPhase}</span>
              <span className="text-[10px] font-medium text-[#7a7065]">{breathTime}s</span>
            </motion.div>
          </div>
          <p className="mt-3 text-xs text-[#7a7065] italic">Take a breath to center your mind before writing.</p>
        </div>

        {/* Prompt Header */}
        <div className="rounded-2xl border border-[#ded2c1] bg-[#fffaf2] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#b68a3a]">[Journal Prompt]</span>
            <button
              onClick={handleNextPrompt}
              className="text-xs font-semibold text-[#7a7065] hover:text-[#b68a3a] transition-colors"
            >
              Next Prompt ↗
            </button>
          </div>
          <p className="mt-3 font-display text-lg font-bold text-[#201a16] leading-snug">
            &ldquo;{prompts[promptIndex]}&rdquo;
          </p>
        </div>

        {/* Text Area */}
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-[#3a332b]" htmlFor="journal-textarea">
            Your Private Reflection
          </label>
          <textarea
            id="journal-textarea"
            rows={5}
            placeholder="Type your quiet thoughts here... Your entries are only saved locally in your current browser session."
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            className="w-full rounded-2xl border border-[#ded2c1] bg-[#fffaf2] p-4 text-sm text-[#201a16] focus:border-[#b68a3a] focus:outline-none resize-none leading-relaxed"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={handleSave}
            className={`flex-1 rounded-xl py-3 text-center text-sm font-semibold transition-all ${
              saved ? "bg-[#b68a3a] text-white" : "border border-[#ded2c1] text-[#201a16] hover:bg-[#fffaf2]"
            }`}
          >
            {saved ? "Saved to Session!" : "Save Session Note"}
          </button>
          <button
            onClick={handleCopy}
            className={`flex-1 rounded-xl py-3 text-center text-sm font-semibold text-white transition-all ${
              copied ? "bg-[#b68a3a]" : "bg-[#201a16] hover:bg-[#3a332b]"
            }`}
          >
            {copied ? "Copied Entry!" : "Copy Journal Entry"}
          </button>
        </div>
      </div>
    </div>
  );
};
