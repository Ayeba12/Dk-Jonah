"use client";

import { FormEvent, useState } from "react";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.includes("@")) {
      setMessage("Enter a valid email address.");
      return;
    }

    setMessage("You are in the circle. Thank you for trusting this space with your inbox.");
    setEmail("");
  };

  return (
    <form className="relative" noValidate onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        className="h-16 w-full border-b border-white/25 bg-transparent pr-32 text-lg text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#b68a3a]"
        id="newsletter-email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        type="email"
        value={email}
      />
      <button
        className="absolute right-0 top-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#201a16] transition-colors hover:bg-[#b68a3a] hover:text-[#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b68a3a]"
        type="submit"
      >
        Join
      </button>
      {message ? <p className="mt-3 text-sm text-white/58">{message}</p> : null}
    </form>
  );
};
