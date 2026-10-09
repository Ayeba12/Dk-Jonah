"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { CountryCodeSelect } from "@/components/forms/CountryCodeSelect";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { DEFAULT_DIAL_ISO, dialFor } from "@/content/dial-codes";
import { signUpContent } from "@/content/quiet-focus";

const fieldClass =
  "w-full border-0 border-b border-black/30 bg-transparent py-3 text-black placeholder:text-black/40 focus:border-gold focus:outline-none focus-visible:outline-none";
const labelClass = "block text-xs uppercase tracking-wide text-black/60";

/**
 * The Quiet Focus sign-up. Sends the fields to /api/quiet-focus, which adds the person to the
 * Quiet Focus list in SendFox, then goes to the thank-you page. SendFox sends the confirmation
 * and the welcome letters. The phone number is optional; the agreement is not.
 */
export const QuietFocusForm = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [dialIso, setDialIso] = useState(DEFAULT_DIAL_ISO);
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot, never shown
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const digits = phone.replace(/[^\d]/g, "");
    if (!firstName.trim() || !email.trim()) {
      setStatus("Please add your first name and email.");
      return;
    }
    if (!email.includes("@")) {
      setStatus("That email address does not look right.");
      return;
    }
    if (digits && (digits.length < 6 || digits.length > 15)) {
      setStatus("That phone number does not look right. Leave it empty if you would rather not share it.");
      return;
    }
    if (!consent) {
      setStatus("Please tick the box to agree to receive emails.");
      return;
    }
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/quiet-focus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          phone: digits ? `${dialFor(dialIso)} ${digits}` : "",
          consent,
          website,
        }),
      });
      const result = (await response.json()) as { ok: boolean; message?: string };
      if (!response.ok || !result.ok) {
        setStatus(result.message ?? "The sign-up did not go through. Please try again in a moment.");
        setBusy(false);
        return;
      }
      router.push("/quiet-focus/thank-you");
    } catch {
      setStatus("The sign-up did not go through. Please try again in a moment, or email hello@dkjonah.com.");
      setBusy(false);
    }
  };

  return (
    <form className="space-y-7" noValidate onSubmit={submit}>
      {/* Honeypot: hidden from people, filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input autoComplete="off" name="website" onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} type="text" value={website} />
        </label>
      </div>

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

      {/* Phone: country code first, then the number. Optional. */}
      <div className="grid gap-7 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <span className={labelClass} id="quiet-focus-country-label">
            {signUpContent.fields.countryCode}
          </span>
          <CountryCodeSelect
            className={fieldClass}
            labelledBy="quiet-focus-country-label"
            noMatchLabel={signUpContent.fields.noCountryMatch}
            onChange={setDialIso}
            searchLabel={signUpContent.fields.searchCountry}
            value={dialIso}
          />
        </div>
        <label className="block">
          <span className={labelClass}>{signUpContent.fields.phone}</span>
          <span className="flex items-baseline gap-2">
            <span className="shrink-0 py-3 text-black/60">{dialFor(dialIso)}</span>
            <input
              autoComplete="tel-national"
              className={fieldClass}
              inputMode="numeric"
              onChange={(event) => setPhone(event.target.value.replace(/[^\d\s]/g, ""))}
              pattern="[0-9 ]*"
              placeholder={signUpContent.fields.phonePlaceholder}
              type="tel"
              value={phone}
            />
          </span>
        </label>
      </div>

      {/* The agreement. Required before anything is sent. */}
      <label className="flex cursor-pointer items-start gap-3">
        <input
          checked={consent}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none border border-black/40 bg-transparent transition-colors checked:border-black checked:bg-black focus:outline-none focus-visible:outline-none"
          onChange={(event) => setConsent(event.target.checked)}
          required
          type="checkbox"
        />
        <span className="text-sm leading-relaxed text-black/75">{signUpContent.fields.consent}</span>
      </label>

      <div className="flex flex-col gap-3">
        <ArrowButton disabled={busy} type="submit" variant="dark">
          {busy ? "One moment" : signUpContent.button}
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
