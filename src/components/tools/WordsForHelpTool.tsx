"use client";

import { useState } from "react";


export const WordsForHelpTool = () => {
  const [recipient, setRecipient] = useState("family");
  const [need, setNeed] = useState("time");
  const [showDetail, setShowDetail] = useState(true);
  const [copied, setCopied] = useState(false);

  const recipients = [
    { id: "family", label: "Friend / Family" },
    { id: "work", label: "Work / Client" },
    { id: "medical", label: "Medical / Doctor" },
  ];

  const needs = [
    { id: "time", label: "Needs Extra Time" },
    { id: "physical", label: "Needs Physical Help" },
    { id: "break", label: "Needs Communication Break" },
    { id: "presence", label: "Needs Quiet Presence" },
  ];

  const getScript = () => {
    let script = "";

    if (recipient === "family") {
      if (need === "time") {
        script = showDetail
          ? "Hey, my energy is running a bit low today and I'm moving slower than usual. Would it be okay if we push our catch-up or plans back by a bit? I want to make sure I have the presence to connect properly when we meet."
          : "Hey, I'm feeling a bit exhausted today and need to rest. Can we reschedule our plans for another day soon?";
      } else if (need === "physical") {
        script = showDetail
          ? "Hey, I'm experiencing a flare-up of symptoms today and my body is really feeling it. If you have some capacity, could you help me out with grabbing groceries or a quick chore? No pressure at all if you are busy, but I'd really appreciate it."
          : "Hey, my body is struggling a bit today. If you're free, would you mind helping me with a quick chore?";
      } else if (need === "break") {
        script = showDetail
          ? "Hey, I've got a lot of sensory/mental noise today and need to go quiet to recharge. I'm safe, but I will be off my phone for the next few hours or until tomorrow. Talk to you when my head is a bit clearer!"
          : "Hey, I'm taking a quick screen break for rest today. I'm safe but will reply to messages tomorrow!";
      } else {
        script = showDetail
          ? "Hey, I'm feeling a bit heavy and overwhelmed today. I don't really have the capacity to talk or analyze things, but if you have the space, would you want to sit quietly, watch a movie, or just hang out without any pressure to chat?"
          : "Hey, I'm having a hard day. If you have space, I'd love some quiet company without any pressure to chat.";
      }
    } else if (recipient === "work") {
      if (need === "time") {
        script = showDetail
          ? "Hi [Name], I am navigating a brief health/capacity constraint today and want to ensure I maintain high quality on this deliverable. Would it be possible to adjust our timeline for [Task] to [New Date]? Thank you for understanding."
          : "Hi [Name], I am working on [Task] but am moving a bit slower today. Could I send this over by [New Date] instead?";
      } else if (need === "physical") {
        script = showDetail
          ? "Hi [Name], my physical capacity is a bit limited this week due to an ongoing flare-up. To ensure we keep project timelines on track, is there someone on the team we could delegate the coordination/meeting notes to for this session?"
          : "Hi [Name], my capacity is limited today. Could we delegate the coordination/meeting notes to another team member?";
      } else if (need === "break") {
        script = showDetail
          ? "Hi [Name], I am focusing on deep work and rest blocks today to manage my energy. I will be offline from direct messaging channels, but will check my inbox and respond to urgent items by [Time] or tomorrow morning."
          : "Hi [Name], I will be offline for deep focus today and will check and reply to emails tomorrow.";
      } else {
        script = "Hi [Name], I am attending to an outstanding schedule item today. For any immediate project updates, please check [Document Link], and I will reconnect on our next session.";
      }
    } else {
      // medical
      if (need === "time") {
        script = "Hi Dr. [Name], I am finding it difficult to manage my symptoms with the current routine. Could we discuss adjusting my schedule or medication at our next appointment? I want to make sure I am managing my energy safely.";
      } else if (need === "physical") {
        script = "Hi Dr. [Name], my current physical limitations are impacting my daily activities. Could we write a medical letter or referral to look into physical therapy support or accommodations?";
      } else if (need === "break") {
        script = "Hi Dr. [Name], I am feeling overwhelmed by the side effects of my treatment and need a brief rest period. Could we review my current medication load to see if there are lighter options?";
      } else {
        script = "Hi Dr. [Name], I am experiencing some symptom changes. I would like to schedule a quiet review session to adjust my care plan. Let me know when is best.";
      }
    }

    return script;
  };

  const scriptText = getScript();

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-[#ded2c1] bg-[#f8f2e8] p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center justify-between border-b border-[#ded2c1] pb-4">
        <h3 className="font-display text-2xl font-semibold text-[#201a16]">Support Script Builder</h3>
        <span className="text-xs text-[#7a7065]">Words for asking for help</span>
      </div>

      <div className="grid gap-6">
        {/* Recipient Selection */}
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-[#3a332b]">1. Who are you sending this to?</label>
          <div className="grid gap-2 sm:grid-cols-3">
            {recipients.map((rec) => (
              <button
                key={rec.id}
                type="button"
                onClick={() => setRecipient(rec.id)}
                className={`rounded-xl border py-2.5 text-center text-sm font-semibold transition-all ${
                  recipient === rec.id
                    ? "border-[#b68a3a] bg-[#fffaf2] text-[#b68a3a]"
                    : "border-[#ded2c1] bg-[#f8f2e8] hover:border-[#7a7065] text-[#201a16]"
                }`}
              >
                {rec.label}
              </button>
            ))}
          </div>
        </div>

        {/* Need Selection */}
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-[#3a332b]">2. What is your core need?</label>
          <div className="grid gap-2 sm:grid-cols-2">
            {needs.map((nd) => (
              <button
                key={nd.id}
                type="button"
                onClick={() => setNeed(nd.id)}
                className={`rounded-xl border py-2.5 px-4 text-left text-sm font-semibold transition-all ${
                  need === nd.id
                    ? "border-[#b68a3a] bg-[#fffaf2] text-[#b68a3a]"
                    : "border-[#ded2c1] bg-[#f8f2e8] hover:border-[#7a7065] text-[#201a16]"
                }`}
              >
                {nd.label}
              </button>
            ))}
          </div>
        </div>

        {/* Detail Toggle */}
        {recipient !== "medical" && (
          <div className="flex items-center justify-between border-t border-[#ded2c1]/40 pt-4">
            <span className="text-sm font-semibold text-[#3a332b]">Include gentle capacity details?</span>
            <button
              onClick={() => setShowDetail(!showDetail)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showDetail ? "bg-[#b68a3a]" : "bg-[#ded2c1]"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showDetail ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        )}

        {/* Output Card */}
        <div className="mt-2 rounded-2xl border border-[#ded2c1] bg-[#fffaf2] p-5 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#b68a3a]">[Your Script Draft]</span>
          <p className="mt-3 text-base leading-relaxed text-[#3a332b] select-all whitespace-pre-wrap">
            {scriptText}
          </p>
        </div>

        <button
          onClick={handleCopy}
          className={`w-full rounded-xl py-3 text-center text-sm font-semibold text-white transition-all ${
            copied ? "bg-[#b68a3a]" : "bg-[#201a16] hover:bg-[#3a332b]"
          }`}
        >
          {copied ? "Copied Script text!" : "Copy Script Text"}
        </button>
      </div>
    </div>
  );
};
