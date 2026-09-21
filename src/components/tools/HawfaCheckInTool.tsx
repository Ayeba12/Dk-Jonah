"use client";

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

/**
 * HAWFA Check-In, the seven screens from the Toolkit document. Person-only questions.
 * No question is compulsory. The everyday replies on screen one are placeholders until DK sends hers.
 */

// Placeholder replies. DK owes the real everyday replies people give to "How far?".
const everydayReplies = ["I'm fine", "I dey", "Managing", "Tired, but okay", "Busy", "Not bad"];

type Screen = { key: string; title: string; questions: { id: string; text: string }[] };

const screens: Screen[] = [
  {
    key: "heart",
    title: "Okay. Now tell me how you really are.",
    questions: [
      { id: "heart1", text: "How is my heart right now?" },
      { id: "heart2", text: "What feeling has followed me today?" },
    ],
  },
  {
    key: "mind",
    title: "Mind.",
    questions: [
      { id: "mind1", text: "What has been running in the background of my mind?" },
      { id: "mind2", text: "What is true, and what is fear speaking loudly?" },
    ],
  },
  {
    key: "body",
    title: "Body and energy.",
    questions: [
      { id: "body1", text: "How is my body carrying today?" },
      { id: "body2", text: "Am I respecting my capacity, or pushing past it?" },
    ],
  },
  {
    key: "autonomy",
    title: "Autonomy.",
    questions: [
      { id: "auto1", text: "Where am I choosing for myself?" },
      { id: "auto2", text: "Where have I given my power away?" },
    ],
  },
];

const closeQuestions = {
  evening: [
    { id: "close1", text: "Today, I came this far" },
    { id: "close2", text: "One thing I release tonight" },
  ],
  morning: [
    { id: "close1", text: "What does today need from me?" },
    { id: "close2", text: "My next honest move" },
  ],
};

const TOTAL = 7;

export const HawfaCheckInTool = () => {
  const [step, setStep] = useState(1);
  const [greeting, setGreeting] = useState("");
  const [ownReply, setOwnReply] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [truth, setTruth] = useState("");
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "evening">("morning");

  // Evening from five in the afternoon until four in the morning. It can be switched by hand.
  useEffect(() => {
    const hour = new Date().getHours();
    const id = window.setTimeout(() => setTimeOfDay(hour >= 17 || hour < 4 ? "evening" : "morning"), 0);
    return () => window.clearTimeout(id);
  }, []);

  const setAnswer = (id: string, value: string) => setAnswers((current) => ({ ...current, [id]: value }));

  const reset = () => {
    setStep(1);
    setGreeting("");
    setOwnReply("");
    setAnswers({});
    setTruth("");
  };

  const firstReply = ownReply.trim() || greeting;
  const closing = closeQuestions[timeOfDay];

  const copyText = [
    "HAWFA Check-In",
    firstReply ? `HAWFA? ${firstReply}` : "",
    ...screens.flatMap((screen) => screen.questions.filter((q) => answers[q.id]?.trim()).map((q) => `${q.text} ${answers[q.id].trim()}`)),
    truth ? `So, HAWFA? For real this time. ${truth}` : "",
    ...closing.filter((q) => answers[q.id]?.trim()).map((q) => `${q.text}: ${answers[q.id].trim()}`),
  ]
    .filter(Boolean)
    .join("\n");

  const screenIndex = step - 2; // screens 2 to 5 map to the four question screens

  return (
    <ToolFrame onReset={step > 1 ? reset : undefined} step={step} title="HAWFA Check-In" total={TOTAL}>
      {step === 1 ? (
        <ToolStep id={1}>
          <ToolQuestion help="Tap the reply you would usually give, or type your own. The one you say without thinking.">
            HAWFA? (How are you?)
          </ToolQuestion>
          <ChoiceGrid cols={3}>
            {everydayReplies.map((reply) => (
              <Choice
                align="center"
                key={reply}
                label={reply}
                onClick={() => {
                  setGreeting(reply);
                  setOwnReply("");
                }}
                selected={greeting === reply && !ownReply}
              />
            ))}
          </ChoiceGrid>
          <div className="mt-6">
            <ToolLabel htmlFor="hawfa-own">Or in your own words</ToolLabel>
            <input className={inputClass} id="hawfa-own" onChange={(event) => setOwnReply(event.target.value)} type="text" value={ownReply} />
          </div>
          <ToolActions>
            <ArrowButton onClick={() => setStep(2)} variant="dark">
              Continue
            </ArrowButton>
          </ToolActions>
        </ToolStep>
      ) : null}

      {step >= 2 && step <= 5 ? (
        <ToolStep id={step}>
          <ToolQuestion help={step === 2 ? "Answer what you can. No question here is compulsory." : undefined}>{screens[screenIndex].title}</ToolQuestion>
          <div className="mt-8 space-y-7">
            {screens[screenIndex].questions.map((question) => (
              <div key={question.id}>
                <ToolLabel htmlFor={question.id}>{question.text}</ToolLabel>
                <textarea
                  className={`${textareaClass} mt-2 min-h-[6rem]`}
                  id={question.id}
                  onChange={(event) => setAnswer(question.id, event.target.value)}
                  value={answers[question.id] ?? ""}
                />
              </div>
            ))}
          </div>
          <ToolActions onBack={() => setStep(step - 1)}>
            <ArrowButton onClick={() => setStep(step + 1)} variant="dark">
              Continue
            </ArrowButton>
          </ToolActions>
        </ToolStep>
      ) : null}

      {step === 6 ? (
        <ToolStep id={6}>
          <ToolQuestion help="One honest sentence.">So, HAWFA? For real this time.</ToolQuestion>
          <div className="mt-8">
            <ToolLabel htmlFor="hawfa-truth">One honest sentence</ToolLabel>
            <input className={inputClass} id="hawfa-truth" onChange={(event) => setTruth(event.target.value)} type="text" value={truth} />
          </div>
          <ToolActions onBack={() => setStep(5)}>
            <ArrowButton onClick={() => setStep(7)} variant="dark">
              Continue
            </ArrowButton>
          </ToolActions>
        </ToolStep>
      ) : null}

      {step === 7 ? (
        <ToolStep id={7}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <ToolQuestion>Close.</ToolQuestion>
            <div className="flex gap-2">
              {(["morning", "evening"] as const).map((option) => (
                <button
                  aria-pressed={timeOfDay === option}
                  className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-colors ${
                    timeOfDay === option ? "border-black bg-black text-ivory" : "border-black/15 text-black/70 hover:border-black"
                  }`}
                  key={option}
                  onClick={() => setTimeOfDay(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 space-y-7">
            {closing.map((question) => (
              <div key={question.id}>
                <ToolLabel htmlFor={question.id}>{question.text}</ToolLabel>
                <input className={inputClass} id={question.id} onChange={(event) => setAnswer(question.id, event.target.value)} type="text" value={answers[question.id] ?? ""} />
              </div>
            ))}
          </div>

          {truth || firstReply ? (
            <div className="mt-8">
              <ResultCard eyebrow="Your check-in">
                {firstReply ? <ResultRow label="What I said first">{firstReply}</ResultRow> : null}
                {truth ? (
                  <ResultRow label="For real this time" large>
                    {truth}
                  </ResultRow>
                ) : null}
                {closing.filter((q) => answers[q.id]?.trim()).map((q) => (
                  <ResultRow key={q.id} label={q.text}>
                    {answers[q.id]}
                  </ResultRow>
                ))}
              </ResultCard>
            </div>
          ) : null}

          <ToolActions onBack={() => setStep(6)}>
            <ArrowButton onClick={reset} variant="light">
              Start again
            </ArrowButton>
            <CopyButton label="Copy" text={copyText} />
          </ToolActions>
          <NextPointer>HAWFA is for you. When you are ready to plan the work, PACE is for that.</NextPointer>
        </ToolStep>
      ) : null}
    </ToolFrame>
  );
};
