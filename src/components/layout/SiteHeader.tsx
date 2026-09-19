"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { headerCta, myWorkLinks, navLinks } from "@/content/navigation";
import { ArrowButton } from "@/components/ui/ArrowButton";

const topLevel = navLinks.filter(
  (link) => !myWorkLinks.some((work) => work.href === link.href)
);

export const SiteHeader = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const workRef = useRef<HTMLDivElement>(null);

  const closeAll = () => {
    setIsOpen(false);
    setWorkOpen(false);
  };

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (workRef.current && !workRef.current.contains(event.target as Node)) {
        setWorkOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const workActive = myWorkLinks.some((link) => isActive(link.href));

  const linkClass = (active: boolean) =>
    `relative text-[17px] font-medium transition-opacity hover:opacity-100 ${
      active ? "opacity-100" : "opacity-80"
    } after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-current after:transition-all after:duration-300 ${
      active ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  return (
    <>
      {/*
        The header sits over every hero, ivory or black. Difference blending keeps
        the monochrome nav legible on both without a second header colour.
      */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference text-white">
        <div className="container-shell pointer-events-auto flex h-20 items-center justify-between md:h-24">
          <Link
            aria-label="DK Jonah, home"
            className="relative block h-9 w-28 shrink-0"
            href="/"
            onClick={closeAll}
          >
            <Image
              alt="DK Jonah"
              className="object-contain object-left brightness-0 invert"
              fill
              priority
              sizes="112px"
              src="/assets/avenzor/images/website-logo.png"
            />
          </Link>

          <nav aria-label="Main" className="hidden flex-1 items-center justify-between pl-[8vw] lg:flex">
            <Link className={linkClass(isActive("/about"))} href="/about">
              About
            </Link>

            <div className="relative" ref={workRef}>
              <button
                aria-expanded={workOpen}
                aria-haspopup="menu"
                className={`${linkClass(workActive)} inline-flex items-center gap-1.5`}
                onClick={() => setWorkOpen((value) => !value)}
                type="button"
              >
                My work
                <svg
                  aria-hidden="true"
                  className={`h-3 w-3 transition-transform duration-200 ${
                    workOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>

              {workOpen ? (
                <div
                  className="absolute left-0 top-full mt-4 w-56 rounded-xl bg-black p-2 text-white"
                  role="menu"
                >
                  {myWorkLinks.map((item) => (
                    <Link
                      className={`block rounded-lg px-3.5 py-2.5 text-[15px] transition-colors hover:bg-white/10 ${
                        isActive(item.href) ? "bg-white/10" : ""
                      }`}
                      href={item.href}
                      key={item.href}
                      onClick={closeAll}
                      role="menuitem"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            {topLevel
              .filter((link) => link.href !== "/about")
              .map((link) => (
                <Link
                  className={linkClass(isActive(link.href))}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          <div className="flex items-center lg:hidden">
            <button
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/70 lg:hidden"
              onClick={() => setIsOpen((value) => !value)}
              type="button"
            >
              <span className="relative flex h-3 w-5 flex-col justify-between">
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ${
                    isOpen ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ${
                    isOpen ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: a full black sheet, ivory type, outside the blend layer. */}
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-40 flex flex-col bg-black px-6 pb-8 pt-28 text-ivory transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        id="mobile-menu"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {navLinks.map((link) => (
            <Link
              className="border-b border-ivory/15 py-4 font-display text-3xl font-semibold transition-colors hover:text-champagne"
              href={link.href}
              key={link.href}
              onClick={closeAll}
              tabIndex={isOpen ? 0 : -1}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8">
          <ArrowButton href={headerCta.href} onClick={closeAll} variant="gold">
            {headerCta.label}
          </ArrowButton>
        </div>
      </div>
    </>
  );
};
