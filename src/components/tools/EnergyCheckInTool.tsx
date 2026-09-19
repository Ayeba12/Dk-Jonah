"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const EnergyCheckInTool = () => {
  const [step, setStep] = useState(1);
  const [weather, setWeather] = useState("sunny");
  const [battery, setBattery] = useState(50);
  const [mind, setMind] = useState("quiet");
  const [copied, setCopied] = useState(false);

  const weatherOptions = [
    { id: "sunny", label: "Sunny & Light", desc: "Energy feels clear and accessible." },
    { id: "overcast", label: "Overcast & Heavy", desc: "Feels like fatigue is hanging low." },
    { id: "windy", label: "Windy & Scattered", desc: "Mind and energy are darting around." },
    { id: "foggy", label: "Foggy & Fuzzy", desc: "Hard to focus or see next steps." },
  ];

  const mindOptions = [
    { id: "quiet", label: "Quiet" },
    { id: "alert", label: "Alert" },
    { id: "racing", label: "Racing" },
    { id: "overwhelmed", label: "Overwhelmed" },
  ];

  const getRecommendation = () => {
    let pace = "";
    let practice = "";
    let limit = "";

    if (battery < 30) {
      pace = "Restoration First (Slowing right down)";
      practice = "Choose a 15-minute horizontal rest without screens, or simple belly breathing.";
      limit = "Release the pressure to perform or finish tasks today. Your only job is preservation.";
    } else if (battery < 70) {
      pace = "Light (moving with pauses)";
      practice = "Work on one simple task at a time for 25 minutes, then take a 10-minute quiet stretch.";
      limit = "Avoid double-booking your energy. Protect your rest windows between commitments.";
    } else {
      pace = "Clear Space (Steady engagement)";
      practice = "Focus on your main priority while your capacity is high, but schedule a solid rest block for later.";
      limit = "Remember that high energy today doesn't obligate you to overwork. Stay within your limits.";
    }

    let weatherNote = "";
    if (weather === "overcast") {
      weatherNote = "Since your body feels heavy today, move physically at half-speed and keep your environment warm.";
    } else if (weather === "windy") {
      weatherNote = "With scattered energy, write down a quick brain dump on paper to clear your head, then close extra tabs.";
    } else if (weather === "foggy") {
      weatherNote = "Because of the brain fog, skip complex decision-making today and work only on routine, low-pressure items.";
    } else {
      weatherNote = "Capitalize on your clear energy gently, keeping a steady, sustainable rhythm.";
    }

    return {
      pace,
      practice,
      limit,
      weatherNote,
      summary: `PACE Energy Check: Battery at ${battery}%, feeling ${weatherOptions.find(o => o.id === weather)?.label}, mind feels ${mindOptions.find(o => o.id === mind)?.label}. Recommended rhythm: ${pace}.`
    };
  };

  const recommendation = getRecommendation();

  const handleCopy = () => {
    const text = `DK Jonah PACE Energy Check:\n` +
      `- Current State: Battery ${battery}%, Weather: ${weatherOptions.find(o => o.id === weather)?.label}, Mind: ${mindOptions.find(o => o.id === mind)?.label}\n` +
      `- Recommended Pace: ${recommendation.pace}\n` +
      `- Try this: ${recommendation.practice}\n` +
      `- Daily Limit: ${recommendation.limit}\n` +
      `- About your energy: ${recommendation.weatherNote}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-[#ded2c1] bg-[#f8f2e8] p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center justify-between border-b border-[#ded2c1] pb-4">
        <h3 className="font-display text-2xl font-semibold text-[#201a16]">PACE Energy Check</h3>
        <span className="text-sm text-[#7a7065]">Step {step} of 4</span>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid gap-4"
          >
            <p className="text-lg font-medium text-[#3a332b]">How does your body feel right now?</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {weatherOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setWeather(opt.id)}
                  type="button"
                  className={`flex flex-col text-left rounded-2xl border p-4 transition-all ${
                    weather === opt.id
                      ? "border-[#b68a3a] bg-[#fffaf2] shadow-sm"
                      : "border-[#ded2c1] bg-[#f8f2e8] hover:border-[#7a7065]"
                  }`}
                >
                  <span className="font-semibold text-[#201a16]">{opt.label}</span>
                  <span className="mt-1 text-xs text-[#7a7065]">{opt.desc}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="mt-4 rounded-xl bg-[#201a16] py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#3a332b]"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid gap-4"
          >
            <p className="text-lg font-medium text-[#3a332b]">What is your current emotional/physical battery level?</p>
            <div className="my-6 flex flex-col items-center">
              <span className="font-display text-6xl font-bold text-[#b68a3a]">{battery}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={battery}
                onChange={(e) => setBattery(Number(e.target.value))}
                className="mt-6 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#ded2c1] accent-[#b68a3a]"
              />
              <div className="mt-2 flex w-full justify-between text-xs text-[#7a7065]">
                <span>Empty</span>
                <span>Replenished</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 rounded-xl border border-[#ded2c1] py-3 text-center text-sm font-semibold text-[#201a16] hover:bg-[#fffaf2]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 rounded-xl bg-[#201a16] py-3 text-center text-sm font-semibold text-white hover:bg-[#3a332b]"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid gap-4"
          >
            <p className="text-lg font-medium text-[#3a332b]">What is your current mind state?</p>
            <div className="grid gap-3 grid-cols-2">
              {mindOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setMind(opt.id)}
                  type="button"
                  className={`rounded-2xl border p-4 text-center font-semibold transition-all ${
                    mind === opt.id
                      ? "border-[#b68a3a] bg-[#fffaf2] shadow-sm text-[#b68a3a]"
                      : "border-[#ded2c1] bg-[#f8f2e8] hover:border-[#7a7065] text-[#201a16]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 rounded-xl border border-[#ded2c1] py-3 text-center text-sm font-semibold text-[#201a16] hover:bg-[#fffaf2]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 rounded-xl bg-[#201a16] py-3 text-center text-sm font-semibold text-white hover:bg-[#3a332b]"
              >
                Show my pace
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6"
          >
            <div className="rounded-2xl bg-[#fffaf2] p-5 border border-[#ded2c1] shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#b68a3a]">[Your pace for today]</span>
              
              <div className="mt-4">
                <h4 className="text-xs text-[#7a7065]">Recommended Pace</h4>
                <p className="mt-1 font-display text-xl font-bold text-[#201a16]">{recommendation.pace}</p>
              </div>

              <div className="mt-4 border-t border-[#ded2c1]/60 pt-4">
                <h4 className="text-xs text-[#7a7065]">Try this</h4>
                <p className="mt-1 text-sm leading-relaxed text-[#3a332b]">{recommendation.practice}</p>
              </div>

              <div className="mt-4 border-t border-[#ded2c1]/60 pt-4">
                <h4 className="text-xs text-[#7a7065]">Your limit today</h4>
                <p className="mt-1 text-sm leading-relaxed text-[#3a332b]">{recommendation.limit}</p>
              </div>

              <div className="mt-4 border-t border-[#ded2c1]/60 pt-4">
                <h4 className="text-xs text-[#7a7065]">Note on Physical Energy</h4>
                <p className="mt-1 text-xs leading-relaxed italic text-[#7a7065]">{recommendation.weatherNote}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 rounded-xl border border-[#ded2c1] py-3 text-center text-sm font-semibold text-[#201a16] hover:bg-[#fffaf2]"
              >
                Start again
              </button>
              <button
                onClick={handleCopy}
                className={`flex-1 rounded-xl py-3 text-center text-sm font-semibold text-white transition-all ${
                  copied ? "bg-[#b68a3a]" : "bg-[#201a16] hover:bg-[#3a332b]"
                }`}
              >
                {copied ? "Copied" : "Copy my pace"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
