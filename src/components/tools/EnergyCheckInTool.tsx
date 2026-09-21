"use client";

import Link from "next/link";
import { useState } from "react";
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
  ToolQuestion,
  ToolStep,
} from "@/components/tools/ToolPrimitives";

/**
 * PACE Energy Check, the four-step design from the Toolkit document.
 * The result logic below is a draft for DK to approve: pace names, wording and the next tool per pace.
 */

type Weather = "sunny" | "overcast" | "windy" | "foggy";
type Mind = "quiet" | "alert" | "racing" | "overwhelmed";
type PaceKey = "recovery" | "light" | "steady" | "focused";

const weatherOptions: { id: Weather; label: string; desc: string }[] = [
  { id: "sunny", label: "Sunny and Light", desc: "Energy feels clear and within reach." },
  { id: "overcast", label: "Overcast and Heavy", desc: "Tiredness is hanging low." },
  { id: "windy", label: "Windy and Scattered", desc: "Body and energy feel restless." },
  { id: "foggy", label: "Foggy and Fuzzy", desc: "Hard to focus or see the next step." },
];

const mindOptions: { id: Mind; label: string }[] = [
  { id: "quiet", label: "Quiet" },
  { id: "alert", label: "Alert" },
  { id: "racing", label: "Racing" },
  { id: "overwhelmed", label: "Overwhelmed" },
];

const paces: Record<
  PaceKey,
  { name: string; line: string; tryThis: string; limit: string; next: { label: string; href: string } }
> = {
  recovery: {
    name: "Recovery",
    line: "Today is for keeping what you have, not adding to it.",
    tryThis: "One small necessary thing, then rest before you are forced to. Lying down without a screen counts.",
    limit: "Nothing new starts today. Anything that can wait, waits.",
    next: { label: "Rest Without Guilt Prompts", href: "/toolkit/rest-without-guilt-prompts" },
  },
  light: {
    name: "Light",
    line: "Moving, with pauses built in.",
    tryThis: "One task at a time for twenty-five minutes, then ten minutes away from it. Two or three rounds is a full day.",
    limit: "No double-booking your energy. Keep space between commitments.",
    next: { label: "Mindless Flow", href: "/toolkit/mindless-flow" },
  },
  steady: {
    name: "Steady",
    line: "A real working day at a pace you can hold.",
    tryThis: "Put your main priority first while the energy is there, and decide now when you will stop.",
    limit: "Three focus tasks at most. Protect a rest block later in the day.",
    next: { label: "PACE Week Planner", href: "/toolkit/pace-week-planner" },
  },
  focused: {
    name: "Focused build",
    line: "Capacity for the deeper work, if you spend it on purpose.",
    tryThis: "Give the first clear hours to the thing that matters most, before messages and meetings take them.",
    limit: "High energy today is not a debt to repay tomorrow. Stop while there is still something left.",
    next: { label: "PACE Week Planner", href: "/toolkit/pace-week-planner" },
  },
};

const weatherNotes: Record<Weather, string> = {
  sunny: "Your body is clear today. Keep the rhythm even rather than spending it all at once.",
  overcast: "Your body feels heavy, so move at half speed, keep warm, and let the small things be enough.",
  windy: "Your energy is scattered. Empty your head onto paper first, then close everything you are not using.",
  foggy: "Fog means decisions cost more than usual. Keep to routine, low-pressure work and leave the big calls for a clearer day.",
};

const mindNotes: Record<Mind, string> = {
  quiet: "A quiet mind is a good place to work from. Guard it.",
  alert: "You are alert, which suits the work that needs your attention most.",
  racing: "A racing mind wants to do everything. Choose one thing and write the rest down for later.",
  overwhelmed: "Overwhelm is information. Make today smaller than you planned, and start with the easiest true step.",
};

const paceOrder: PaceKey[] = ["recovery", "light", "steady", "focused"];

// Draft logic. Energy sets the base pace; a heavy or foggy body, or an overwhelmed mind, brings it down one step;
// a racing mind caps it at Steady so the day is not spent on everything at once.
const workOutPace = (weather: Weather, energy: number, mind: Mind): PaceKey => {
  let index = energy < 30 ? 0 : energy < 60 ? 1 : energy < 80 ? 2 : 3;
  if (weather === "overcast" || weather === "foggy" || mind === "overwhelmed") index = Math.max(0, index - 1);
  if (mind === "racing") index = Math.min(index, 2);
  return paceOrder[index];
};

export const EnergyCheckInTool = () => {
  const [step, setStep] = useState(1);
  const [weather, setWeather] = useState<Weather>("sunny");
  const [energy, setEnergy] = useState(50);
  const [mind, setMind] = useState<Mind>("quiet");

  const paceKey = workOutPace(weather, energy, mind);
  const pace = paces[paceKey];
  const weatherLabel = weatherOptions.find((o) => o.id === weather)?.label ?? "";
  const mindLabel = mindOptions.find((o) => o.id === mind)?.label ?? "";

  const reset = () => {
    setStep(1);
    setWeather("sunny");
    setEnergy(50);
    setMind("quiet");
  };

  const copyText = [
    "PACE Energy Check",
    `Body: ${weatherLabel}. Energy: ${energy} of 100. Mind: ${mindLabel}.`,
    `Your pace for today: ${pace.name}. ${pace.line}`,
    `Try this: ${pace.tryThis}`,
    `Your limit today: ${pace.limit}`,
    `About your energy: ${weatherNotes[weather]} ${mindNotes[mind]}`,
  ].join("\n");

  return (
    <ToolFrame onReset={step > 1 ? reset : undefined} step={step} title="PACE Energy Check" total={4}>
      {step === 1 ? (
        <ToolStep id={1}>
          <ToolQuestion>How does your body feel right now?</ToolQuestion>
          <ChoiceGrid>
            {weatherOptions.map((option) => (
              <Choice desc={option.desc} key={option.id} label={option.label} onClick={() => setWeather(option.id)} selected={weather === option.id} />
            ))}
          </ChoiceGrid>
          <ToolActions>
            <ArrowButton onClick={() => setStep(2)} variant="dark">
              Continue
            </ArrowButton>
          </ToolActions>
        </ToolStep>
      ) : null}

      {step === 2 ? (
        <ToolStep id={2}>
          <ToolQuestion>How full is your energy right now, in body and mind?</ToolQuestion>
          <div className="mt-8">
            <p className="thread-text font-display text-6xl font-bold leading-none md:text-7xl">{energy}</p>
            <input
              aria-label="Energy, from empty to replenished"
              className="mt-8 h-1 w-full cursor-pointer appearance-none rounded-full bg-black/15 accent-gold"
              max={100}
              min={0}
              onChange={(event) => setEnergy(Number(event.target.value))}
              type="range"
              value={energy}
            />
            <div className="mt-3 flex justify-between text-xs uppercase tracking-wide text-black/55">
              <span>Empty</span>
              <span>Replenished</span>
            </div>
          </div>
          <ToolActions onBack={() => setStep(1)}>
            <ArrowButton onClick={() => setStep(3)} variant="dark">
              Continue
            </ArrowButton>
          </ToolActions>
        </ToolStep>
      ) : null}

      {step === 3 ? (
        <ToolStep id={3}>
          <ToolQuestion>What is your current mind state?</ToolQuestion>
          <ChoiceGrid cols={4}>
            {mindOptions.map((option) => (
              <Choice align="center" key={option.id} label={option.label} onClick={() => setMind(option.id)} selected={mind === option.id} />
            ))}
          </ChoiceGrid>
          <ToolActions onBack={() => setStep(2)}>
            <ArrowButton onClick={() => setStep(4)} variant="dark">
              Show my pace
            </ArrowButton>
          </ToolActions>
        </ToolStep>
      ) : null}

      {step === 4 ? (
        <ToolStep id={4}>
          <ResultCard eyebrow="Your pace for today">
            <ResultRow label="Pace" large>
              {pace.name}
              <span className="mt-2 block font-sans text-base font-normal text-black/65">{pace.line}</span>
            </ResultRow>
            <ResultRow label="Try this">{pace.tryThis}</ResultRow>
            <ResultRow label="Your limit today">{pace.limit}</ResultRow>
            <ResultRow label="About your energy">
              {weatherNotes[weather]} {mindNotes[mind]}
            </ResultRow>
            <ResultRow label="Next">
              <Link className="font-medium underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-shadow" href={pace.next.href}>
                {pace.next.label}
              </Link>
            </ResultRow>
          </ResultCard>
          <ToolActions onBack={() => setStep(3)}>
            <ArrowButton onClick={reset} variant="light">
              Start again
            </ArrowButton>
            <CopyButton label="Copy my pace" text={copyText} />
          </ToolActions>
          <NextPointer>HAWFA is for you. PACE is for your work.</NextPointer>
        </ToolStep>
      ) : null}
    </ToolFrame>
  );
};
