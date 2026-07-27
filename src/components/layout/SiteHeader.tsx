"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/content/navigation";
import { ArrowButton } from "@/components/ui/ArrowButton";

export const SiteHeader = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between rounded-2xl border border-white/20 bg-[#201a16]/88 px-4 text-white shadow-2xl shadow-black/10 backdrop-blur-xl md:px-12">
        <Link
          aria-label="DK Jonah home"
          className="relative h-9 w-20 flex items-center shrink-0"
          href="/"
          onClick={closeMenu}
        >
          <Image
            alt="DK Jonah logo"
            className="object-contain object-left brightness-0 invert"
            fill
            priority
            src="/assets/avenzor/images/website-logo.png"
          />
        </Link>
        {navLinks.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              className={`hidden text-sm transition-colors hover:text-[#ead9ad] md:block shrink-0 ${
                active ? "text-[#ead9ad]" : "text-white/82"
              }`}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          );
        })}
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
      </nav>
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
          <div className="mt-4 border-t border-[#ded2c1] pt-4">
            <ArrowButton href="/#quiet-circle" onClick={closeMenu} variant="dark">
              Join the Quiet Circle
            </ArrowButton>
          </div>
        </div>
      ) : null}
    </header>
  );
};
