"use client";

import { useState } from "react";
import { Choice, ChoiceGrid, CopyButton, ResultCard, ResultRow, ToolActions, ToolFrame, ToolQuestion } from "@/components/tools/ToolPrimitives";

// Words for Asking for Help. Choose who and what, and the words are ready to copy.

type Recipient = "family" | "work" | "medical";
type Need = "time" | "physical" | "break" | "presence";

const recipients: { id: Recipient; label: string }[] = [
  { id: "family", label: "A friend or family" },
  { id: "work", label: "Work or a client" },
  { id: "medical", label: "A doctor or clinician" },
];

const needs: { id: Need; label: string; desc: string }[] = [
  { id: "time", label: "Extra time", desc: "Moving something back." },
  { id: "physical", label: "Physical help", desc: "A chore, a lift, a hand." },
  { id: "break", label: "A break from messages", desc: "Going quiet for a while." },
  { id: "presence", label: "Quiet company", desc: "Someone near, no talking needed." },
];

const scripts: Record<Recipient, Record<Need, { full: string; short?: string }>> = {
  family: {
    time: {
      full: "Hey, my energy is running low today and I am moving slower than usual. Would it be okay if we push our plans back a bit? I want to have the presence to connect properly when we meet.",
      short: "Hey, I am exhausted today and need to rest. Can we move our plans to another day soon?",
    },
    physical: {
      full: "Hey, my symptoms have flared today and my body is really feeling it. If you have some capacity, could you help me with the shopping or a quick chore? No pressure at all if you are busy, but I would really appreciate it.",
      short: "Hey, my body is struggling today. If you are free, would you mind helping me with a quick chore?",
    },
    break: {
      full: "Hey, there is a lot of noise in my head today and I need to go quiet to recharge. I am safe, but I will be off my phone for the next few hours or until tomorrow. Talk when my head is clearer.",
      short: "Hey, I am taking a break from my phone to rest today. I am safe and will reply tomorrow.",
    },
    presence: {
      full: "Hey, today feels heavy and I do not have the capacity to talk things through. If you have the space, would you sit with me, watch something, or just be around, without any pressure to chat?",
      short: "Hey, I am having a hard day. If you have space, I would love some quiet company without any pressure to talk.",
    },
  },
  work: {
    time: {
      full: "Hi [Name], I am working within a health constraint today and want to keep the quality high on this. Could we move the timeline for [Task] to [New date]? Thank you for understanding.",
      short: "Hi [Name], I am working on [Task] but moving more slowly today. Could I send it over by [New date] instead?",
    },
    physical: {
      full: "Hi [Name], my physical capacity is limited this week because of a flare-up. To keep things on track, is there someone on the team who could take the coordination or meeting notes for this session?",
      short: "Hi [Name], my capacity is limited today. Could someone else take the coordination or meeting notes?",
    },
    break: {
      full: "Hi [Name], I am keeping today for focused work and rest so I can manage my energy. I will be away from direct messages, and will check my inbox and reply to anything urgent by [Time] or tomorrow morning.",
      short: "Hi [Name], I am offline for focused work today and will check and reply to emails tomorrow.",
    },
    presence: {
      full: "Hi [Name], I am attending to something in my schedule today. For any immediate project updates, please check [Document link], and I will reconnect at our next session.",
    },
  },
  medical: {
    time: {
      full: "Hi Dr [Name], I am finding it difficult to manage my symptoms with the current routine. Could we discuss adjusting my schedule or medication at our next appointment? I want to make sure I am managing my energy safely.",
    },
    physical: {
      full: "Hi Dr [Name], my current physical limitations are affecting my daily activities. Could we look at a letter or referral for physiotherapy support or adjustments?",
    },
    break: {
      full: "Hi Dr [Name], I am feeling overwhelmed by the side effects of my treatment and need a period of rest. Could we review my current medication to see whether there are lighter options?",
    },
    presence: {
      full: "Hi Dr [Name], I am noticing some changes in my symptoms. I would like to book a review to adjust my care plan. Let me know when is best.",
    },
  },
};

export const WordsForHelpTool = () => {
  const [recipient, setRecipient] = useState<Recipient>("family");
  const [need, setNeed] = useState<Need>("time");
  const [detail, setDetail] = useState(true);

  const entry = scripts[recipient][need];
  const text = detail || !entry.short ? entry.full : entry.short;
  const canShorten = Boolean(entry.short);

  return (
    <ToolFrame title="Words for Asking for Help">
      <ToolQuestion>Who are you sending this to?</ToolQuestion>
      <ChoiceGrid cols={3}>
        {recipients.map((item) => (
          <Choice align="center" key={item.id} label={item.label} onClick={() => setRecipient(item.id)} selected={recipient === item.id} />
        ))}
      </ChoiceGrid>

      <div className="mt-10">
        <ToolQuestion>What do you need?</ToolQuestion>
      </div>
      <ChoiceGrid>
        {needs.map((item) => (
          <Choice desc={item.desc} key={item.id} label={item.label} onClick={() => setNeed(item.id)} selected={need === item.id} />
        ))}
      </ChoiceGrid>

      {canShorten ? (
        <div className="mt-8 flex items-center justify-between border-t border-black/15 pt-6">
          <span className="text-sm font-medium">Include capacity details?</span>
          <button
            aria-checked={detail}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${detail ? "bg-black" : "bg-black/20"}`}
            onClick={() => setDetail((value) => !value)}
            role="switch"
            type="button"
          >
            <span className={`inline-block h-5 w-5 transform rounded-full transition-transform ${detail ? "translate-x-6 bg-gold" : "translate-x-1 bg-ivory"}`} />
          </button>
        </div>
      ) : null}

      <div className="mt-8">
        <ResultCard eyebrow="Your words">
          <ResultRow label="Ready to send">
            <span className="select-all font-display text-lg font-medium leading-relaxed text-black md:text-xl">{text}</span>
          </ResultRow>
        </ResultCard>
      </div>

      <ToolActions>
        <CopyButton label="Copy these words" text={text} />
      </ToolActions>
      <p className="mt-6 text-sm leading-relaxed text-black/60">Words in square brackets are yours to fill in. You do not owe anyone the full story.</p>
    </ToolFrame>
  );
};
