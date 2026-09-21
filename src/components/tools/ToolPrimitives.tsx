"use client";

import { useCallback, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowButton } from "@/components/ui/ArrowButton";

/**
 * The shared pieces every Routine Ready tool is built from, so the seven tools read as one family:
 * ivory panel, gold progress thread, display questions, black-when-chosen options, dove result cards.
 */

const ease = [0.16, 1, 0.3, 1] as const;

// The panel around a tool, with its name, the step count and a gold thread that fills as you go.
export const ToolFrame = ({
  title,
  step,
  total,
  onReset,
  children,
}: {
  title: string;
  step?: number;
  total?: number;
  onReset?: () => void;
  children: ReactNode;
}) => (
  <div className="rounded-2xl bg-ivory p-6 ring-1 ring-black/10 md:p-8">
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      <h3 className="font-display text-xl font-semibold md:text-2xl">{title}</h3>
      <div className="flex items-center gap-4">
        {step && total ? <span className="eyebrow">{`Step ${step} of ${total}`}</span> : null}
        {onReset ? (
          <button className="text-sm text-black/60 underline decoration-black/30 underline-offset-4 transition-colors hover:text-black" onClick={onReset} type="button">
            Start again
          </button>
        ) : null}
      </div>
    </div>
    {step && total ? (
      <div className="mt-4 h-[2px] w-full bg-black/10">
        <div className="thread h-[2px] border-0 transition-[width] duration-500" style={{ width: `${(step / total) * 100}%` }} />
      </div>
    ) : (
      <hr className="thread mt-4" />
    )}
    <div className="mt-8">{children}</div>
  </div>
);

// One step's content, easing in and out as steps change.
export const ToolStep = ({ id, children }: { id: string | number; children: ReactNode }) => (
  <AnimatePresence mode="wait">
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      initial={{ opacity: 0, y: 12 }}
      key={id}
      transition={{ duration: 0.3, ease }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export const ToolQuestion = ({ children, help }: { children: ReactNode; help?: ReactNode }) => (
  <div>
    <p className="font-display text-2xl font-semibold leading-snug md:text-3xl">{children}</p>
    {help ? <p className="mt-3 max-w-xl text-base leading-relaxed text-black/65">{help}</p> : null}
  </div>
);

export const ToolLabel = ({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) => (
  <label className="block text-xs uppercase tracking-wide text-black/60" htmlFor={htmlFor}>
    {children}
  </label>
);

// A choice that turns black when chosen, so the selected state is never in doubt.
export const Choice = ({
  selected,
  onClick,
  label,
  desc,
  align = "left",
}: {
  selected: boolean;
  onClick: () => void;
  label: ReactNode;
  desc?: ReactNode;
  align?: "left" | "center";
}) => (
  <button
    aria-pressed={selected}
    className={`flex min-h-[3.25rem] flex-col justify-center rounded-xl border px-4 py-3 transition-colors duration-200 ${
      align === "center" ? "items-center text-center" : "items-start text-left"
    } ${
      selected
        ? "border-black bg-black text-ivory"
        : "border-black/15 bg-transparent text-black hover:border-black"
    }`}
    onClick={onClick}
    type="button"
  >
    <span className="flex items-center gap-2 font-medium">
      {selected ? <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" /> : null}
      {label}
    </span>
    {desc ? <span className={`mt-1 text-sm ${selected ? "text-ivory/70" : "text-black/60"}`}>{desc}</span> : null}
  </button>
);

export const ChoiceGrid = ({ children, cols = 2 }: { children: ReactNode; cols?: 1 | 2 | 3 | 4 }) => {
  const colClass = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "grid-cols-2 sm:grid-cols-4" }[cols];
  return <div className={`mt-6 grid gap-3 ${colClass}`}>{children}</div>;
};

export const inputClass =
  "w-full border-0 border-b border-black/30 bg-transparent py-3 text-black placeholder:text-black/40 focus:border-gold focus:outline-none";

export const textareaClass =
  "w-full rounded-xl border border-black/15 bg-transparent p-4 text-black leading-relaxed placeholder:text-black/40 focus:border-gold focus:outline-none";

// The row of controls under a step: Back on the left, the next action on the right.
export const ToolActions = ({ onBack, children }: { onBack?: () => void; children: ReactNode }) => (
  <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
    {onBack ? (
      <button className="text-sm text-black/60 underline decoration-black/30 underline-offset-4 transition-colors hover:text-black" onClick={onBack} type="button">
        Back
      </button>
    ) : (
      <span />
    )}
    <div className="flex flex-wrap items-center gap-3">{children}</div>
  </div>
);

// A result: dove card, gold thread, rows with small labels.
export const ResultCard = ({ eyebrow, children }: { eyebrow: string; children: ReactNode }) => (
  <div className="rounded-2xl bg-dove-tint p-6 md:p-8">
    <p className="eyebrow">{eyebrow}</p>
    <hr className="thread mt-4" />
    <div className="mt-2 divide-y divide-black/10">{children}</div>
  </div>
);

export const ResultRow = ({ label, children, large = false }: { label: string; children: ReactNode; large?: boolean }) => (
  <div className="py-5 first:pt-4 last:pb-0">
    <p className="text-xs uppercase tracking-wide text-black/55">{label}</p>
    <div className={`mt-2 ${large ? "font-display text-2xl font-semibold leading-snug md:text-3xl" : "text-base leading-relaxed text-black/80"}`}>
      {children}
    </div>
  </div>
);

// Copies a piece of text and says so for a moment.
export const useCopy = () => {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard may be blocked; the text is still on screen to select.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, []);
  return { copied, copy };
};

export const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const { copied, copy } = useCopy();
  return (
    <ArrowButton onClick={() => copy(text)} variant={copied ? "dark" : "gold"}>
      {copied ? "Copied" : label}
    </ArrowButton>
  );
};

// A line at the end of a tool pointing to the next one.
export const NextPointer = ({ children }: { children: ReactNode }) => (
  <p className="mt-6 text-sm leading-relaxed text-black/60">{children}</p>
);
