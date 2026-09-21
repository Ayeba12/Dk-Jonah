"use client";

import { FormEvent, useState } from "react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { SPEAKING_EMAIL, inviteContent } from "@/content/speaking";

const initialForm = {
  name: "",
  email: "",
  eventKind: "",
  organisation: "",
  eventNameDate: "",
  where: "",
  audience: "",
  sessionKind: "",
  outcome: "",
  length: "",
  budget: "",
  travel: "",
  anythingElse: "",
};

type Field = keyof typeof initialForm;

const fieldClass =
  "w-full border-0 border-b border-ivory/30 bg-transparent py-3 text-ivory placeholder:text-ivory/40 focus:border-champagne focus:outline-none focus-visible:outline-none";
const labelClass = "block text-xs uppercase tracking-wide text-ivory/70";

// A native select on the black form. The options are set in ivory on black so the open list reads
// as clearly as the closed field, and a drawn chevron replaces the browser's own arrow.
const SelectField = ({ value, options, onChange }: { value: string; options: string[]; onChange: (value: string) => void }) => (
  <span className="relative block">
    <select
      className={`${fieldClass} cursor-pointer appearance-none bg-black pr-8 [color-scheme:dark]`}
      onChange={(event) => onChange(event.target.value)}
      value={value}
    >
      <option className="bg-black text-ivory" value="">
        Choose one
      </option>
      {options.map((option) => (
        <option className="bg-black text-ivory" key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <svg aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  </span>
);

// Until DK confirms where enquiries should send, the form opens the visitor's
// email app with everything filled in, addressed to hello@dkjonah.com.
export const SpeakingEnquiryForm = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");

  const update = (field: Field, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.email) {
      setStatus("Please add your name and email so I can reply.");
      return;
    }
    if (!form.email.includes("@")) {
      setStatus("That email address does not look right.");
      return;
    }

    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Kind of event: ${form.eventKind}`,
      `Organisation or ministry: ${form.organisation}`,
      `Event name and date: ${form.eventNameDate}`,
      `Online or in person: ${form.where}`,
      `Who will be in the room: ${form.audience}`,
      `What I would like DK to do: ${form.sessionKind}`,
      `What people should leave able to do: ${form.outcome}`,
      `Length of session: ${form.length}`,
      `Budget or honorarium: ${form.budget}`,
      `Travel and accommodation: ${form.travel}`,
      `Anything else: ${form.anythingElse}`,
    ];
    const subject = encodeURIComponent(`Speaking enquiry from ${form.name}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${SPEAKING_EMAIL}?subject=${subject}&body=${body}`;
    setStatus(
      `Your email app should open with the enquiry filled in. If it does not, email ${SPEAKING_EMAIL} directly.`
    );
  };

  return (
    <form className="space-y-7" noValidate onSubmit={onSubmit}>
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Your name</span>
          <input
            autoComplete="name"
            className={fieldClass}
            onChange={(event) => update("name", event.target.value)}
            required
            type="text"
            value={form.name}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Email</span>
          <input
            autoComplete="email"
            className={fieldClass}
            onChange={(event) => update("email", event.target.value)}
            required
            type="email"
            value={form.email}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>What kind of event is it?</span>
        <SelectField onChange={(value) => update("eventKind", value)} options={inviteContent.eventKinds} value={form.eventKind} />
      </label>

      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Organisation or ministry name</span>
          <input
            className={fieldClass}
            onChange={(event) => update("organisation", event.target.value)}
            type="text"
            value={form.organisation}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Event name and date</span>
          <input
            className={fieldClass}
            onChange={(event) => update("eventNameDate", event.target.value)}
            type="text"
            value={form.eventNameDate}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Online or in person (and where)</span>
        <input
          className={fieldClass}
          onChange={(event) => update("where", event.target.value)}
          type="text"
          value={form.where}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Who will be in the room, and roughly how many?</span>
        <input
          className={fieldClass}
          onChange={(event) => update("audience", event.target.value)}
          type="text"
          value={form.audience}
        />
      </label>

      <label className="block">
        <span className={labelClass}>What would you like me to do?</span>
        <SelectField onChange={(value) => update("sessionKind", value)} options={inviteContent.sessionKinds} value={form.sessionKind} />
      </label>

      <label className="block">
        <span className={labelClass}>What do you want people to leave able to do?</span>
        <textarea
          className={`${fieldClass} min-h-[96px] resize-y`}
          onChange={(event) => update("outcome", event.target.value)}
          value={form.outcome}
        />
      </label>

      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Length of session</span>
          <input
            className={fieldClass}
            onChange={(event) => update("length", event.target.value)}
            type="text"
            value={form.length}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Budget or honorarium</span>
          <input
            className={fieldClass}
            onChange={(event) => update("budget", event.target.value)}
            type="text"
            value={form.budget}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Travel and accommodation (leave blank if online)</span>
        <input
          className={fieldClass}
          onChange={(event) => update("travel", event.target.value)}
          type="text"
          value={form.travel}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Anything else I should know</span>
        <textarea
          className={`${fieldClass} min-h-[96px] resize-y`}
          onChange={(event) => update("anythingElse", event.target.value)}
          value={form.anythingElse}
        />
      </label>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6">
        <ArrowButton type="submit" variant="gold">
          {inviteContent.submitLabel}
        </ArrowButton>
        <p className="text-sm text-ivory/70">
          {inviteContent.emailLine}{" "}
          <a className="text-champagne underline underline-offset-4" href={`mailto:${SPEAKING_EMAIL}`}>
            {SPEAKING_EMAIL}
          </a>
        </p>
      </div>

      <p aria-live="polite" className="min-h-[1.5rem] text-sm text-champagne">
        {status}
      </p>
    </form>
  );
};
