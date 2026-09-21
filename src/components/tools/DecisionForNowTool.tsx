"use client";

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
  ToolLabel,
  ToolQuestion,
  ToolStep,
  inputClass,
} from "@/components/tools/ToolPrimitives";

// Decision for Now, labelled Decisions That Work. Six steps from the Toolkit document, then a result card.

const pulls = ["Tiredness or pain", "Other people's needs", "Notifications", "Too many ideas", "Worry about getting it wrong"];
const whys = ["Health", "Peace", "Family", "Money", "Faith", "Growth", "Your work"];
const options = [
  { id: "full", label: "Yes, fully" },
  { id: "smaller", label: "Yes, a smaller version" },
  { id: "not", label: "Not this time" },
] as const;
const costs = ["Time", "Energy", "Money", "Peace"] as const;
const costLevels = ["Low", "Medium", "High"] as const;

type OptionId = (typeof options)[number]["id"];
type Cost = (typeof costs)[number];
type Level = (typeof costLevels)[number];

const TOTAL = 7;

export const DecisionForNowTool = () => {
  const [step, setStep] = useState(1);
  const [decision, setDecision] = useState("");
  const [deadline, setDeadline] = useState("");
  const [pulling, setPulling] = useState<string[]>([]);
  const [why, setWhy] = useState<string[]>([]);
  const [ownWhy, setOwnWhy] = useState("");
  const [ratings, setRatings] = useState<Record<OptionId, Partial<Record<Cost, Level>>>>({ full: {}, smaller: {}, not: {} });
  const [chosen, setChosen] = useState<OptionId | null>(null);
  const [letGo, setLetGo] = useState("");
  const [firstStep, setFirstStep] = useState("");
  const [safeSpace, setSafeSpace] = useState("");
  const [review, setReview] = useState("");

  const toggle = (list: string[], value: string, max?: number) => {
    if (list.includes(value)) return list.filter((item) => item !== value);
    if (max && list.length >= max) return [...list.slice(1), value];
    return [...list, value];
  };

  const rate = (option: OptionId, cost: Cost, level: Level) =>
    setRatings((current) => ({ ...current, [option]: { ...current[option], [cost]: level } }));

  const reset = () => {
    setStep(1);
    setDecision("");
    setDeadline("");
    setPulling([]);
    setWhy([]);
    setOwnWhy("");
    setRatings({ full: {}, smaller: {}, not: {} });
    setChosen(null);
    setLetGo("");
    setFirstStep("");
    setSafeSpace("");
    setReview("");
  };

  const whyList = [...why, ...(ownWhy.trim() ? [ownWhy.trim()] : [])];
  const chosenLabel = options.find((o) => o.id === chosen)?.label ?? "";
  const heavy = (option: OptionId) => costs.filter((cost) => ratings[option][cost] === "High");

  const copyText = [
    "Decision for Now",
    `My decision for now: ${chosenLabel}${decision ? ` on ${decision}` : ""}${deadline ? ` (by ${deadline})` : ""}`,
    whyList.length ? `Why I am choosing it: ${whyList.join(", ")}` : "",
    letGo ? `What I am letting go of: ${letGo}` : "",
    firstStep ? `My first step: ${firstStep}` : "",
    safeSpace ? `My safe space: ${safeSpace}` : "",
    review ? `When I will review it: ${review}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <ToolFrame onReset={step > 1 ? reset : undefined} step={step} title="Decision for Now" total={TOTAL}>
      {step === 1 ? (
        <ToolStep id={1}>
          <ToolQuestion help="One line is enough. Add a deadline if there is one.">What decision are you facing?</ToolQuestion>
          <div className="mt-8 space-y-7">
            <div>
              <ToolLabel htmlFor="dfn-decision">The decision</ToolLabel>
              <input className={inputClass} id="dfn-decision" onChange={(e) => setDecision(e.target.value)} type="text" value={decision} />
            </div>
            <div>
              <ToolLabel htmlFor="dfn-deadline">Deadline, if there is one</ToolLabel>
              <input className={inputClass} id="dfn-deadline" onChange={(e) => setDeadline(e.target.value)} type="text" value={deadline} />
            </div>
          </div>
          <ToolActions>
            <ArrowButton onClick={() => setStep(2)} variant="dark">
              Continue
            </ArrowButton>
          </ToolActions>
        </ToolStep>
      ) : null}

      {step === 2 ? (
        <ToolStep id={2}>
          <ToolQuestion help="Tick anything that applies. Naming it takes some of its weight.">Pause: what is pulling at you?</ToolQuestion>
          <ChoiceGrid>
            {pulls.map((item) => (
              <Choice key={item} label={item} onClick={() => setPulling(toggle(pulling, item))} selected={pulling.includes(item)} />
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
          <ToolQuestion help="Up to two. Or write your own.">Your why: what matters most to you in this season?</ToolQuestion>
          <ChoiceGrid cols={4}>
            {whys.map((item) => (
              <Choice align="center" key={item} label={item} onClick={() => setWhy(toggle(why, item, 2))} selected={why.includes(item)} />
            ))}
          </ChoiceGrid>
          <div className="mt-6">
            <ToolLabel htmlFor="dfn-ownwhy">Or in your own words</ToolLabel>
            <input className={inputClass} id="dfn-ownwhy" onChange={(e) => setOwnWhy(e.target.value)} type="text" value={ownWhy} />
          </div>
          <ToolActions onBack={() => setStep(2)}>
            <ArrowButton onClick={() => setStep(4)} variant="dark">
              Continue
            </ArrowButton>
          </ToolActions>
        </ToolStep>
      ) : null}

      {step === 4 ? (
        <ToolStep id={4}>
          <ToolQuestion help="Rate what each option would cost you. Not what it should cost. What it would.">Assess.</ToolQuestion>
          <div className="mt-8 space-y-6">
            {options.map((option) => (
              <div className="rounded-xl border border-black/15 p-5" key={option.id}>
                <p className="font-display text-lg font-semibold">{option.label}</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {costs.map((cost) => (
                    <div key={cost}>
                      <p className="text-xs uppercase tracking-wide text-black/55">{cost}</p>
                      <div className="mt-2 flex gap-2">
                        {costLevels.map((level) => {
                          const on = ratings[option.id][cost] === level;
                          return (
                            <button
                              aria-pressed={on}
                              className={`flex-1 rounded-full border px-2 py-1.5 text-sm transition-colors ${
                                on ? "border-black bg-black text-ivory" : "border-black/15 text-black/70 hover:border-black"
                              }`}
                              key={level}
                              onClick={() => rate(option.id, cost, level)}
                              type="button"
                            >
                              {level}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <ToolActions onBack={() => setStep(3)}>
            <ArrowButton onClick={() => setStep(5)} variant="dark">
              Continue
            </ArrowButton>
          </ToolActions>
        </ToolStep>
      ) : null}

      {step === 5 ? (
        <ToolStep id={5}>
          <ToolQuestion help={whyList.length ? `Your why: ${whyList.join(" and ")}.` : undefined}>Choose: which option fits your why?</ToolQuestion>
          <ChoiceGrid cols={3}>
            {options.map((option) => {
              const high = heavy(option.id);
              return (
                <Choice
                  desc={high.length ? `High cost in ${high.join(", ").toLowerCase()}` : "No high costs marked"}
                  key={option.id}
                  label={option.label}
                  onClick={() => setChosen(option.id)}
                  selected={chosen === option.id}
                />
              );
            })}
          </ChoiceGrid>
          <div className="mt-6">
            <ToolLabel htmlFor="dfn-letgo">What will you let go of to make room?</ToolLabel>
            <input className={inputClass} id="dfn-letgo" onChange={(e) => setLetGo(e.target.value)} type="text" value={letGo} />
          </div>
          <ToolActions onBack={() => setStep(4)}>
            <ArrowButton onClick={() => setStep(6)} variant="dark">
              Continue
            </ArrowButton>
          </ToolActions>
        </ToolStep>
      ) : null}

      {step === 6 ? (
        <ToolStep id={6}>
          <ToolQuestion>Execute.</ToolQuestion>
          <div className="mt-8 space-y-7">
            <div>
              <ToolLabel htmlFor="dfn-first">First small step</ToolLabel>
              <input className={inputClass} id="dfn-first" onChange={(e) => setFirstStep(e.target.value)} type="text" value={firstStep} />
            </div>
            <div>
              <ToolLabel htmlFor="dfn-safe">Your safe space, the person or place you can take this to</ToolLabel>
              <input className={inputClass} id="dfn-safe" onChange={(e) => setSafeSpace(e.target.value)} type="text" value={safeSpace} />
            </div>
            <div>
              <ToolLabel htmlFor="dfn-review">When you will review the decision</ToolLabel>
              <input className={inputClass} id="dfn-review" onChange={(e) => setReview(e.target.value)} type="text" value={review} />
            </div>
          </div>
          <ToolActions onBack={() => setStep(5)}>
            <ArrowButton onClick={() => setStep(7)} variant="dark">
              Show my decision
            </ArrowButton>
          </ToolActions>
        </ToolStep>
      ) : null}

      {step === 7 ? (
        <ToolStep id={7}>
          <ResultCard eyebrow="Decisions That Work">
            <ResultRow label="My decision for now" large>
              {chosenLabel || "Not chosen yet"}
              {decision ? <span className="mt-2 block font-sans text-base font-normal text-black/65">{decision}{deadline ? ` · by ${deadline}` : ""}</span> : null}
            </ResultRow>
            {whyList.length ? <ResultRow label="Why I am choosing it">{whyList.join(", ")}</ResultRow> : null}
            {letGo ? <ResultRow label="What I am letting go of">{letGo}</ResultRow> : null}
            {firstStep ? <ResultRow label="My first step">{firstStep}</ResultRow> : null}
            {safeSpace ? <ResultRow label="My safe space">{safeSpace}</ResultRow> : null}
            {review ? <ResultRow label="When I will review it">{review}</ResultRow> : null}
          </ResultCard>
          <ToolActions onBack={() => setStep(6)}>
            <ArrowButton onClick={reset} variant="light">
              Start again
            </ArrowButton>
            <CopyButton label="Copy my decision" text={copyText} />
          </ToolActions>
          <NextPointer>A decision for now is allowed to change later. That is what the review date is for.</NextPointer>
        </ToolStep>
      ) : null}
    </ToolFrame>
  );
};
