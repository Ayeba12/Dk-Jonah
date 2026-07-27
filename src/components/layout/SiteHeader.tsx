"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/content/navigation";

export const SiteHeader = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between rounded-2xl border border-white/20 bg-[#201a16]/88 px-4 text-white shadow-2xl shadow-black/10 backdrop-blur-xl md:px-6">
        <Link
          aria-label="DK Jonah home"
          className="font-display text-lg font-bold tracking-normal"
          href="/"
          onClick={closeMenu}
        >
          DK JONAH
        </Link>
        <nav className="hidden items-center gap-12 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                className={`text-sm transition-colors hover:text-[#ead9ad] ${
                  active ? "text-[#ead9ad]" : "text-white/82"
                }`}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button
          aria-expanded={isOpen}
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/20 md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          <span className="flex w-5 flex-col gap-1.5">
            <span className="h-px bg-white" />
            <span className="h-px bg-white" />
          </span>
        </button>
      </div>
      {isOpen ? (
        <div className="mx-auto mt-3 w-[calc(100%-8px)] max-w-[1440px] rounded-2xl border border-[#ded2c1] bg-[#fffaf2] p-4 shadow-2xl md:hidden">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                className="border-b border-[#ded2c1] py-4 font-display text-3xl font-semibold last:border-0"
                href={link.href}
                key={link.href}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
};
