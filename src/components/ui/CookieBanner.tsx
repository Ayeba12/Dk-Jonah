"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const CookieBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
    const consent = localStorage.getItem("dkjonah-cookie-consent");
    if (!consent) {
      // Show the banner if no consent is found
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("dkjonah-cookie-consent", "accepted");
    setIsOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem("dkjonah-cookie-consent", "declined");
    setIsOpen(false);
  };

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 z-50 max-w-md rounded-2xl border border-[#ded2c1] bg-[#fffaf2]/95 p-6 shadow-xl backdrop-blur-md transition-all duration-500 ease-out sm:bottom-6 sm:right-6 sm:left-auto">
      <div>
        <p className="text-xs font-semibold tracking-wider uppercase text-[#b68a3a] mb-2">
          [ Cookie Consent ]
        </p>
        <p className="text-sm leading-relaxed text-[#7a7065]">
          This site uses cookies to ensure security, reliability, and to understand traffic.
          No personal health details are tracked. Read our{" "}
          <Link
            className="font-medium text-[#b68a3a] underline hover:text-[#b68a3a]/80"
            href="/legal/cookie-policy"
          >
            Cookie Policy
          </Link>{" "}
          to learn more.
        </p>
        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            onClick={handleDecline}
            className="rounded-lg px-4 py-2 text-xs font-semibold text-[#7a7065] hover:text-[#111111] hover:bg-[#ded2c1]/20 transition-all duration-200"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-[#b68a3a] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#b68a3a]/90 transition-all duration-200"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
