"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowButton } from "@/components/ui/ArrowButton";

export type CookieConsent = "all" | "essential";

const STORAGE_KEY = "dkjonah-cookie-consent";
const REOPEN_EVENT = "dkjonah:cookie-choices";

// Read the stored choice. Anything that is not "all" counts as essential only.
export const getCookieConsent = (): CookieConsent | null => {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === "all" || value === "accepted") return "all";
    if (value === "essential" || value === "declined") return "essential";
    return null;
  } catch {
    return null;
  }
};

// Any control on the site can reopen the banner by calling this (see the footer's "Cookie choices").
export const openCookieChoices = () => window.dispatchEvent(new Event(REOPEN_EVENT));

export const CookieBanner = () => {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Wait a beat so the banner arrives after the page, not with it.
    const timer = window.setTimeout(() => {
      if (!getCookieConsent()) setOpen(true);
    }, 1200);
    const reopen = () => setOpen(true);
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(REOPEN_EVENT, reopen);
    };
  }, []);

  const choose = (consent: CookieConsent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, consent);
    } catch {
      // Storage may be blocked; the banner still closes for this visit.
    }
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          animate={{ opacity: 1, y: 0 }}
          aria-label="Cookie choices"
          className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[26rem]"
          exit={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          role="dialog"
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="on-black dotted overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <hr className="thread" />
            <div className="p-6 md:p-7">
              <p className="eyebrow eyebrow-on-black">Cookies</p>
              <p className="mt-4 text-[15px] leading-relaxed text-ivory/85">
                This site uses a few cookies to stay reliable and to understand how it is used. Nothing personal is
                tracked, and nothing about your health.{" "}
                <Link
                  className="font-medium text-champagne underline decoration-gold decoration-2 underline-offset-4 hover:text-ivory"
                  href="/legal/cookie-policy"
                  onClick={() => setOpen(false)}
                >
                  Read the Cookie Policy
                </Link>
                .
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <ArrowButton onClick={() => choose("all")} size="sm" variant="gold">
                  Accept all
                </ArrowButton>
                <ArrowButton onClick={() => choose("essential")} size="sm" variant="light">
                  Essential only
                </ArrowButton>
              </div>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
};
