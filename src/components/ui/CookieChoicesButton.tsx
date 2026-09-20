"use client";

import { openCookieChoices } from "@/components/ui/CookieBanner";

// Sits with the legal links in the footer, so a visitor can change their cookie choice later.
export const CookieChoicesButton = ({ className = "" }: { className?: string }) => (
  <button className={className} onClick={openCookieChoices} type="button">
    Cookie choices
  </button>
);
