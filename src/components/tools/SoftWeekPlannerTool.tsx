"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SoftWeekPlannerTool = () => {
  const [capacity, setCapacity] = useState("variable");
  const [rest, setRest] = useState("");
  const [care, setCare] = useState("");
  const [task1, setTask1] = useState("");
  const [task2, setTask2] = useState("");
  const [task3, setTask3] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setIsGenerated(true);
  };

  const handleReset = () => {
    setIsGenerated(false);
    setRest("");
    setCare("");
    setTask1("");
    setTask2("");
    setTask3("");
  };

  const handleCopy = () => {
    let dailyText = "";
    weekdays.forEach((wd) => {
      let focusAllocated = "";
      if (capacity === "high") {
        if (wd.day === "Tuesday") focusAllocated = task1;
        if (wd.day === "Wednesday") focusAllocated = task2;
        if (wd.day === "Friday") focusAllocated = task3;
      } else if (capacity === "variable") {
        if (wd.day === "Tuesday") focusAllocated = task1;
        if (wd.day === "Thursday") focusAllocated = task2;
      } else {
        if (wd.day === "Wednesday") focusAllocated = task1;
      }

      dailyText += `\n* ${wd.day}:\n  - Rest Window: ${wd.activity}`;
      if (focusAllocated) {
        dailyText += `\n  - Focus: ${focusAllocated}`;
      }
      dailyText += "\n";
    });

    const text = `DK Jonah - Soft Week Plan\n` +
      `=========================\n` +
      `Capacity Mode: ${capacity.toUpperCase()} Capacity\n` +
      `Primary Rest Anchor: ${rest || "None set"}\n` +
      `Somatic Care Anchor: ${care || "None set"}\n\n` +
      `Weekly Rhythm:${dailyText}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const weekdays = [
    { day: "Monday", restClass: "bg-[#ead9ad]/40", activity: "Morning stretch & soft start" },
    { day: "Tuesday", restClass: "bg-[#f1e7d8]", activity: "Mid-day screen break" },
    { day: "Wednesday", restClass: "bg-[#ead9ad]/40", activity: "No meetings evening" },
    { day: "Thursday", restClass: "bg-[#f1e7d8]", activity: "Gentle walk outdoors" },
    { day: "Friday", restClass: "bg-[#ead9ad]/40", activity: "Quiet reading block" },
    { day: "Saturday", restClass: "bg-[#ead9ad]", activity: "Full rest & slow day" },
    { day: "Sunday", restClass: "bg-[#ead9ad]", activity: "Sacred stillness & faith check-in" },
  ];

  return (
    <div id="soft-week-planner-print-area" className="mx-auto max-w-3xl rounded-3xl border border-[#ded2c1] bg-[#f8f2e8] p-6 shadow-sm md:p-8">
      {/* Print-only CSS injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #soft-week-planner-print-area,
          #soft-week-planner-print-area * {
            visibility: visible;
          }
          #soft-week-planner-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-width: 100%;
            border: 2px solid #ded2c1 !important;
            border-radius: 24px !important;
            background: #f8f2e8 !important;
            color: #201a16 !important;
            padding: 32px !important;
            box-shadow: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}} />

      <div className="mb-6 flex items-center justify-between border-b border-[#ded2c1] pb-4">
        <h3 className="font-display text-2xl font-semibold text-[#201a16]">Soft Week Planner</h3>
        <button
          onClick={handleReset}
          className="text-xs font-semibold text-[#b68a3a] hover:underline no-print"
        >
          Reset Plan
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!isGenerated ? (
          <motion.div
            key="inputs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-6"
          >
            {/* Capacity Select */}
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#3a332b]">1. What is your expected capacity for the week?</label>
              <div className="grid gap-2 sm:grid-cols-3">
                {["low", "variable", "high"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setCapacity(level)}
                    className={`rounded-xl border py-3 text-center text-sm font-semibold capitalize transition-all ${
                      capacity === level
                        ? "border-[#b68a3a] bg-[#fffaf2] text-[#b68a3a]"
                        : "border-[#ded2c1] bg-[#f8f2e8] hover:border-[#7a7065] text-[#201a16]"
                    }`}
                  >
                    {level} Capacity
                  </button>
                ))}
              </div>
            </div>

            {/* Rest & Care Anchors */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-[#3a332b]" htmlFor="rest-anchor">
                  2. Primary Rest Anchor
                </label>
                <input
                  id="rest-anchor"
                  type="text"
                  placeholder="e.g. Quiet bath, afternoon nap"
                  value={rest}
                  onChange={(e) => setRest(e.target.value)}
                  className="rounded-xl border border-[#ded2c1] bg-[#fffaf2] p-3 text-sm text-[#201a16] focus:border-[#b68a3a] focus:outline-none"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold text-[#3a332b]" htmlFor="care-anchor">
                  3. Somatic Care Anchor
                </label>
                <input
                  id="care-anchor"
                  type="text"
                  placeholder="e.g. 10-minute neck stretches"
                  value={care}
                  onChange={(e) => setCare(e.target.value)}
                  className="rounded-xl border border-[#ded2c1] bg-[#fffaf2] p-3 text-sm text-[#201a16] focus:border-[#b68a3a] focus:outline-none"
                />
              </div>
            </div>

            {/* Flexible Focus Tasks */}
            <div className="grid gap-3">
              <label className="text-sm font-semibold text-[#3a332b]">
                4. Max 3 Flexible Focus Tasks (these can float)
              </label>
              <input
                type="text"
                placeholder="First focus task..."
                value={task1}
                onChange={(e) => setTask1(e.target.value)}
                className="rounded-xl border border-[#ded2c1] bg-[#fffaf2] p-3 text-sm text-[#201a16] focus:border-[#b68a3a] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Second focus task (optional)..."
                value={task2}
                onChange={(e) => setTask2(e.target.value)}
                className="rounded-xl border border-[#ded2c1] bg-[#fffaf2] p-3 text-sm text-[#201a16] focus:border-[#b68a3a] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Third focus task (optional)..."
                value={task3}
                onChange={(e) => setTask3(e.target.value)}
                className="rounded-xl border border-[#ded2c1] bg-[#fffaf2] p-3 text-sm text-[#201a16] focus:border-[#b68a3a] focus:outline-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              className="mt-2 rounded-xl bg-[#201a16] py-3 text-center text-sm font-semibold text-white hover:bg-[#3a332b]"
            >
              Generate Capacity-First Planner
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-6"
          >
            <div className="rounded-2xl border border-[#ded2c1] bg-[#fffaf2] p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between border-b border-[#ded2c1] pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#b68a3a]">
                  [Weekly Rhythm: {capacity} capacity]
                </span>
                <span className="text-xs text-[#7a7065]">Rest Anchored Week</span>
              </div>

              {/* Anchors Section */}
              <div className="mb-6 grid gap-4 rounded-xl bg-[#f8f2e8] p-4 text-sm border border-[#ded2c1] sm:grid-cols-2">
                <div>
                  <span className="text-xs text-[#7a7065]">Rest Anchor:</span>
                  <p className="mt-1 font-semibold text-[#201a16]">{rest || "None set"}</p>
                </div>
                <div>
                  <span className="text-xs text-[#7a7065]">Care Activity:</span>
                  <p className="mt-1 font-semibold text-[#201a16]">{care || "None set"}</p>
                </div>
              </div>

              {/* Day Grid */}
              <div className="grid gap-3">
                {weekdays.map((wd) => {
                  let focusAllocated = "";
                  if (capacity === "high") {
                    if (wd.day === "Tuesday") focusAllocated = task1;
                    if (wd.day === "Wednesday") focusAllocated = task2;
                    if (wd.day === "Friday") focusAllocated = task3;
                  } else if (capacity === "variable") {
                    if (wd.day === "Tuesday") focusAllocated = task1;
                    if (wd.day === "Thursday") focusAllocated = task2;
                  } else {
                    if (wd.day === "Wednesday") focusAllocated = task1;
                  }

                  return (
                    <div
                      key={wd.day}
                      className="grid gap-2 border-b border-[#ded2c1]/40 pb-3 last:border-0 last:pb-0 sm:grid-cols-[120px_1fr]"
                    >
                      <span className="font-semibold text-[#201a16]">{wd.day}</span>
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                        <span className={`inline-block rounded-md px-2 py-0.5 text-xs text-[#201a16] font-medium ${wd.restClass}`}>
                          Rest Window: {wd.activity}
                        </span>
                        {focusAllocated && (
                          <span className="inline-block rounded-md bg-[#201a16] px-2 py-0.5 text-xs text-white">
                            Focus: {focusAllocated}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 no-print">
              <button
                onClick={() => setIsGenerated(false)}
                className="flex-1 min-w-[120px] rounded-xl border border-[#ded2c1] py-3 text-center text-sm font-semibold text-[#201a16] hover:bg-[#fffaf2] transition-all duration-200"
              >
                Edit Plan
              </button>
              <button
                onClick={handleCopy}
                className={`flex-1 min-w-[120px] rounded-xl py-3 text-center text-sm font-semibold text-white transition-all ${
                  copied ? "bg-[#b68a3a]" : "bg-[#201a16] hover:bg-[#3a332b]"
                }`}
              >
                {copied ? "Copied!" : "Copy Plan"}
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 min-w-[120px] rounded-xl bg-[#b68a3a] py-3 text-center text-sm font-semibold text-white hover:bg-[#b68a3a]/90 transition-all duration-200"
              >
                Download PDF
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
