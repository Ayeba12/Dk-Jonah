"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import {
  Choice,
  ChoiceGrid,
  CopyButton,
  NextPointer,
  ResultCard,
  ResultRow,
  ToolActions,
  ToolFrame,
  ToolLabel,
  ToolQuestion,
  ToolStep,
  inputClass,
  textareaClass,
} from "@/components/tools/ToolPrimitives";

// Mindless Flow, as locked in the Toolkit document: choose how to flow, write for five minutes without stopping, then notice one thing.

const prompts = [
  "What is taking up space in my head?",
  "What do I want from today?",
  "What am I avoiding?",
  "What would make this easier?",
];

const FLOW_SECONDS = 5 * 60;

const format = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

export const MindlessFlowTool = () => {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<"freestyle" | "prompt">("freestyle");
  const [prompt, setPrompt] = useState(prompts[0]);
  const [remaining, setRemaining] = useState(FLOW_SECONDS);
  const [running, setRunning] = useState(false);
  const [writing, setWriting] = useState("");
  const [noticed, setNoticed] = useState("");

  // The five-minute timer. It only ticks on the writing step.
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          window.clearInterval(id);
          setRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const reset = () => {
    setStep(1);
    setMode("freestyle");
    setPrompt(prompts[0]);
    setRemaining(FLOW_SECONDS);
    setRunning(false);
    setWriting("");
    setNoticed("");
  };

  const begin = () => {
    setRemaining(FLOW_SECONDS);
    setRunning(true);
    setStep(4);
  };

  const finished = remaining === 0;
  const total = 5;
  const copyText = [
    "Mindless Flow",
    mode === "prompt" ? `Prompt: ${prompt}` : "Freestyle",
    writing ? `\n${writing}\n` : "",
    noticed ? `One thing I noticed: ${noticed}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <ToolFrame onReset={step > 1 ? reset : undefined} step={step} title="Mindless Flow" total={total}>
      {step === 1 ? (
        <ToolStep id={1}>
          <ToolQuestion>How do you want to flow today?</ToolQuestion>
          <ChoiceGrid>
            <Choice desc="Whatever is there. No subject." label="Freestyle" onClick={() => setMode("freestyle")} selected={mode === "freestyle"} />
            <Choice desc="One question to start you off." label="With a prompt" onClick={() => setMode("prompt")} selected={mode === "prompt"} />
          </ChoiceGrid>
          <ToolActions>
            <ArrowButton onClick={() => setStep(mode === "prompt" ? 2 : 3)} variant="dark">
              Continue
            </ArrowButton>
          </ToolActions>
        </ToolStep>
      ) : null}

      {step === 2 ? (
        <ToolStep id={2}>
          <ToolQuestion>Choose a prompt.</ToolQuestion>
          <ChoiceGrid>
            {prompts.map((item) => (
              <Choice key={item} label={item} onClick={() => setPrompt(item)} selected={prompt === item} />
            ))}
          </ChoiceGrid>
          <ToolActions onBack={() => setStep(1)}>
            <ArrowButton onClick={() => setStep(3)} variant="dark">
              Continue
            </ArrowButton>
          </ToolActions>
        </ToolStep>
      ) : null}

      {step === 3 ? (
        <ToolStep id={3}>
          <ToolQuestion help="Start writing and do not stop until the timer ends. No editing, no crossing out, no going back. If you type instead, the box below is yours.">
            Pen on paper.
          </ToolQuestion>
          {mode === "prompt" ? (
            <p className="mt-6 rounded-xl bg-dove-tint p-5 font-display text-xl font-medium leading-snug">{prompt}</p>
          ) : null}
          <ToolActions onBack={() => setStep(mode === "prompt" ? 2 : 1)}>
            <ArrowButton onClick={begin} variant="dark">
              Start
            </ArrowButton>
          </ToolActions>
        </ToolStep>
      ) : null}

      {step === 4 ? (
        <ToolStep id={4}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{finished ? "Time" : "Keep going"}</p>
              <p className="thread-text mt-3 font-display text-6xl font-bold leading-none tabular-nums md:text-7xl">{format(remaining)}</p>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-black/60">
              {finished ? "Pen down. Read it back once before the next step." : "Do not lift the pen. Do not fix anything."}
            </p>
          </div>
          {mode === "prompt" ? <p className="mt-6 font-display text-lg font-medium text-black/70">{prompt}</p> : null}
          <textarea
            aria-label="Your writing, if you are typing"
            className={`${textareaClass} mt-6 min-h-[16rem]`}
            onChange={(event) => setWriting(event.target.value)}
            placeholder="If you are typing rather than writing, keep going here."
            value={writing}
          />
          <ToolActions>
            {!finished ? (
              <button
                className="text-sm text-black/60 underline decoration-black/30 underline-offset-4 transition-colors hover:text-black"
                onClick={() => {
                  setRunning(false);
                  setRemaining(0);
                }}
                type="button"
              >
                I have to stop early
              </button>
            ) : null}
            <ArrowButton onClick={() => setStep(5)} variant={finished ? "dark" : "light"}>
              Pause and reflect
            </ArrowButton>
          </ToolActions>
        </ToolStep>
      ) : null}

      {step === 5 ? (
        <ToolStep id={5}>
          <ToolQuestion help="Read it back once. Not to judge it. Just to see what was there.">Pause and reflect.</ToolQuestion>
          <div className="mt-8">
            <ToolLabel htmlFor="flow-noticed">One thing I noticed</ToolLabel>
            <input className={inputClass} id="flow-noticed" onChange={(event) => setNoticed(event.target.value)} type="text" value={noticed} />
          </div>
          {noticed ? (
            <div className="mt-8">
              <ResultCard eyebrow="What came up">
                <ResultRow label="One thing I noticed" large>
                  {noticed}
                </ResultRow>
              </ResultCard>
            </div>
          ) : null}
          <ToolActions onBack={() => setStep(4)}>
            <ArrowButton onClick={reset} variant="light">
              Start again
            </ArrowButton>
            <CopyButton label="Copy my flow" text={copyText} />
          </ToolActions>
          <NextPointer>
            Now ask how you really are with the{" "}
            <Link className="font-medium text-black underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-shadow" href="/toolkit/hawfa-check-in">
              HAWFA Check-In
            </Link>
            . If a decision came up, take it to{" "}
            <Link className="font-medium text-black underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-shadow" href="/toolkit/decision-for-now">
              Decision for Now
            </Link>
            .
          </NextPointer>
        </ToolStep>
      ) : null}
    </ToolFrame>
  );
};
