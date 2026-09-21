"use client";

import { useState } from "react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import {
  Choice,
  ChoiceGrid,
  CopyButton,
  ResultCard,
  ResultRow,
  ToolActions,
  ToolFrame,
  ToolLabel,
  ToolQuestion,
  ToolStep,
  inputClass,
} from "@/components/tools/ToolPrimitives";

// PACE Week Planner. Capacity first, then anchors, then up to three focus tasks that can move between days.

type Capacity = "low" | "variable" | "high";

const capacities: { id: Capacity; label: string; desc: string }[] = [
  { id: "low", label: "Low capacity", desc: "One focus task, spread thin." },
  { id: "variable", label: "Variable capacity", desc: "Two focus tasks, with room to move." },
  { id: "high", label: "High capacity", desc: "Three focus tasks, rest still protected." },
];

const weekdays = [
  { day: "Monday", rest: "Morning stretch" },
  { day: "Tuesday", rest: "Midday screen break" },
  { day: "Wednesday", rest: "No meetings in the evening" },
  { day: "Thursday", rest: "Walk outdoors" },
  { day: "Friday", rest: "Quiet reading block" },
  { day: "Saturday", rest: "Full rest and a slow day" },
  { day: "Sunday", rest: "Stillness and a faith check-in" },
];

const focusDays: Record<Capacity, string[]> = {
  low: ["Wednesday"],
  variable: ["Tuesday", "Thursday"],
  high: ["Tuesday", "Wednesday", "Friday"],
};

export const SoftWeekPlannerTool = () => {
  const [built, setBuilt] = useState(false);
  const [capacity, setCapacity] = useState<Capacity>("variable");
  const [rest, setRest] = useState("");
  const [care, setCare] = useState("");
  const [tasks, setTasks] = useState(["", "", ""]);

  const setTask = (index: number, value: string) => setTasks((current) => current.map((task, i) => (i === index ? value : task)));

  const reset = () => {
    setBuilt(false);
    setCapacity("variable");
    setRest("");
    setCare("");
    setTasks(["", "", ""]);
  };

  const focusFor = (day: string) => {
    const index = focusDays[capacity].indexOf(day);
    return index === -1 ? "" : tasks[index] ?? "";
  };

  const capacityLabel = capacities.find((c) => c.id === capacity)?.label ?? "";
  const copyText = [
    "PACE Week Planner",
    capacityLabel,
    `Your rest anchor: ${rest || "not set"}`,
    `Your body care anchor: ${care || "not set"}`,
    "",
    ...weekdays.map((item) => `${item.day}: rest, ${item.rest}${focusFor(item.day) ? `. Focus: ${focusFor(item.day)}` : ""}`),
  ].join("\n");

  return (
    <ToolFrame onReset={built ? reset : undefined} step={built ? 2 : 1} title="PACE Week Planner" total={2}>
      {!built ? (
        <ToolStep id="plan">
          <ToolQuestion>What is your capacity for the week?</ToolQuestion>
          <ChoiceGrid cols={3}>
            {capacities.map((item) => (
              <Choice desc={item.desc} key={item.id} label={item.label} onClick={() => setCapacity(item.id)} selected={capacity === item.id} />
            ))}
          </ChoiceGrid>

          <div className="mt-10 grid gap-7 sm:grid-cols-2">
            <div>
              <ToolLabel htmlFor="rest-anchor">Your rest anchor</ToolLabel>
              <input className={inputClass} id="rest-anchor" onChange={(e) => setRest(e.target.value)} placeholder="A quiet bath, an afternoon nap" type="text" value={rest} />
            </div>
            <div>
              <ToolLabel htmlFor="care-anchor">Your body care anchor</ToolLabel>
              <input className={inputClass} id="care-anchor" onChange={(e) => setCare(e.target.value)} placeholder="Ten minutes of neck stretches" type="text" value={care} />
            </div>
          </div>

          <div className="mt-10">
            <ToolLabel>Up to 3 focus tasks (these can move between days)</ToolLabel>
            <div className="mt-2 space-y-3">
              {tasks.map((task, index) => (
                <input
                  aria-label={`Focus task ${index + 1}`}
                  className={inputClass}
                  key={index}
                  onChange={(e) => setTask(index, e.target.value)}
                  placeholder={index === 0 ? "First focus task" : index === 1 ? "Second focus task, optional" : "Third focus task, optional"}
                  type="text"
                  value={task}
                />
              ))}
            </div>
          </div>

          <ToolActions>
            <ArrowButton onClick={() => setBuilt(true)} variant="dark">
              Build my week
            </ArrowButton>
          </ToolActions>
        </ToolStep>
      ) : (
        <ToolStep id="week">
          <ResultCard eyebrow={`Your week · ${capacityLabel}`}>
            <ResultRow label="Your rest anchor">{rest || "Not set"}</ResultRow>
            <ResultRow label="Your body care anchor">{care || "Not set"}</ResultRow>
            <div className="py-5">
              <p className="text-xs uppercase tracking-wide text-black/55">The rhythm</p>
              <ul className="mt-3 divide-y divide-black/10">
                {weekdays.map((item) => {
                  const focus = focusFor(item.day);
                  return (
                    <li className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4" key={item.day}>
                      <span className="font-display font-semibold">{item.day}</span>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-black/15 px-3 py-1 text-sm text-black/70">Rest · {item.rest}</span>
                        {focus ? <span className="rounded-full bg-black px-3 py-1 text-sm text-ivory">Focus · {focus}</span> : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ResultCard>
          <p className="mt-6 text-sm leading-relaxed text-black/60">Use it to plan without shame. Protect the rest first, then let the focus tasks move if the week moves.</p>
          <ToolActions onBack={() => setBuilt(false)}>
            <ArrowButton onClick={reset} variant="light">
              Start again
            </ArrowButton>
            <CopyButton label="Copy my week" text={copyText} />
          </ToolActions>
        </ToolStep>
      )}
    </ToolFrame>
  );
};
