"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { signUpContent } from "@/content/quiet-focus";

const fieldClass =
  "w-full border-0 border-b border-black/30 bg-transparent py-3 text-black placeholder:text-black/40 focus:border-gold focus:outline-none focus-visible:outline-none";
const labelClass = "block text-xs uppercase tracking-wide text-black/60";

/**
 * The Quiet Focus sign-up. The list lives in SendFox; until DK sends the embed
 * code or list details, this validates the two fields and goes to the thank-you
 * page without sending anything. Wire the SendFox call in `submit` when it arrives.
 */
export const QuietFocusForm = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName.trim() || !email.trim()) {
      setStatus("Please add your first name and email.");
      return;
    }
    if (!email.includes("@")) {
      setStatus("That email address does not look right.");
      return;
    }
    setBusy(true);
    setStatus("");
    // SendFox submission goes here once the list details arrive.
    router.push("/quiet-focus/thank-you");
  };

  return (
    <form className="space-y-7" noValidate onSubmit={submit}>
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>{signUpContent.fields.firstName}</span>
          <input
            autoComplete="given-name"
            className={fieldClass}
            onChange={(event) => setFirstName(event.target.value)}
            required
            type="text"
            value={firstName}
          />
        </label>
        <label className="block">
          <span className={labelClass}>{signUpContent.fields.email}</span>
          <input
            autoComplete="email"
            className={fieldClass}
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <ArrowButton disabled={busy} type="submit" variant="dark">
          {signUpContent.button}
        </ArrowButton>
        <p className="text-sm text-black/60">{signUpContent.underButton}</p>
        <p className="text-sm text-black/60">
          {signUpContent.privacy.lead}
          <Link className="underline decoration-black/30 underline-offset-4 hover:text-gold-shadow" href={signUpContent.privacy.href}>
            {signUpContent.privacy.link}
          </Link>
          .
        </p>
      </div>

      <p aria-live="polite" className="min-h-[1.5rem] text-sm text-gold-shadow">
        {status}
      </p>
    </form>
  );
};
