"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CopyButton, ToolActions, ToolFrame, ToolLabel, textareaClass } from "@/components/tools/ToolPrimitives";

// Rest Without Guilt Prompts. A breathing pacer, one prompt at a time, and a private place to write.

const prompts = [
  "What is one thing you accomplished today by doing absolutely nothing?",
  "Who gave you permission to run so fast? Can you return it to them?",
  "What does rest feel like in your chest when you let go of expectations?",
  "If your body was a room today, what would the temperature and lighting be?",
  "What is one task you can move to tomorrow to give yourself room to breathe tonight?",
];

const phases = ["Inhale", "Hold", "Exhale"] as const;
const STORAGE_KEY = "dk_jonah_rest_entry";

export const RestPromptsTool = () => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [entry, setEntry] = useState("");
  const [phase, setPhase] = useState<(typeof phases)[number]>("Inhale");
  const [seconds, setSeconds] = useState(4);
  const [saved, setSaved] = useState(false);

  // A four-count breath: in, hold, out.
  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((value) => {
        if (value > 1) return value - 1;
        setPhase((current) => phases[(phases.indexOf(current) + 1) % phases.length]);
        return 4;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Entries stay in this browser session only.
  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (stored) window.setTimeout(() => setEntry(stored), 0);
    } catch {
      // Storage may be blocked; the tool still works without it.
    }
  }, []);

  const save = () => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, entry);
    } catch {
      // Nothing to do; the words are still on screen.
    }
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  const scale = phase === "Inhale" ? 1.35 : phase === "Hold" ? 1.35 : 1;
  const copyText = `Rest Without Guilt Prompts\nPrompt: ${prompts[index]}\n\n${entry}`;

  return (
    <ToolFrame title="Rest Without Guilt Prompts">
      <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
        <div className="flex flex-col items-center">
          <p className="eyebrow">Breathing pacer</p>
          <div className="relative mt-6 grid h-32 w-32 place-items-center">
            <motion.span
              animate={{ scale: reduceMotion ? 1 : scale }}
              className="absolute inset-0 rounded-full bg-dove-tint"
              transition={{ duration: reduceMotion ? 0 : 4, ease: "easeInOut" }}
            />
            <motion.span
              animate={{ scale: reduceMotion ? 1 : scale }}
              className="absolute inset-4 rounded-full border border-gold"
              transition={{ duration: reduceMotion ? 0 : 4, ease: "easeInOut" }}
            />
            <span className="relative text-center">
              <span className="block font-display text-lg font-semibold">{phase}</span>
              <span className="block text-xs text-black/55">{seconds}</span>
            </span>
          </div>
          <p className="mt-4 max-w-[12rem] text-center text-xs leading-relaxed text-black/55">Breathe with it for a moment before you write.</p>
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <p className="eyebrow">Prompt {index + 1} of {prompts.length}</p>
            <button
              className="text-sm text-black/60 underline decoration-black/30 underline-offset-4 transition-colors hover:text-black"
              onClick={() => setIndex((value) => (value + 1) % prompts.length)}
              type="button"
            >
              Next prompt
            </button>
          </div>
          <p className="mt-4 font-display text-2xl font-semibold leading-snug md:text-3xl">{prompts[index]}</p>
        </div>
      </div>

      <div className="mt-10">
        <ToolLabel htmlFor="rest-entry">Your private entry</ToolLabel>
        <textarea
          className={`${textareaClass} mt-2 min-h-[10rem]`}
          id="rest-entry"
          onChange={(event) => setEntry(event.target.value)}
          placeholder="Write here. It stays in this browser and goes nowhere else."
          value={entry}
        />
      </div>

      <ToolActions>
        <ArrowButton onClick={save} variant="light">
          {saved ? "Saved for this session" : "Save for this session"}
        </ArrowButton>
        <CopyButton label="Copy my entry" text={copyText} />
      </ToolActions>
    </ToolFrame>
  );
};
