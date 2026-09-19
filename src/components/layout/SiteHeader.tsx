"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { headerCta, myWorkLinks, myWorkMenu, navLinks } from "@/content/navigation";
import { ArrowButton } from "@/components/ui/ArrowButton";

const topLevel = navLinks.filter(
  (link) => !myWorkLinks.some((work) => work.href === link.href)
);

export const SiteHeader = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  // A short grace period so the pointer can cross from the trigger to the panel.
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setWorkOpen(false), 160);
  }, [cancelClose]);

  const closeAll = useCallback(() => {
    cancelClose();
    setIsOpen(false);
    setWorkOpen(false);
  }, [cancelClose]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeAll]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const workActive = myWorkMenu.some((link) => isActive(link.href));

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
            <Link className={linkClass(isActive("/about"))} href="/about" onClick={closeAll}>
              About
            </Link>

            <button
              aria-controls="my-work-menu"
              aria-expanded={workOpen}
              aria-haspopup="true"
              className={`${linkClass(workActive || workOpen)} inline-flex items-center gap-1.5`}
              onClick={() => {
                // Click always opens; Escape, a link, or moving away closes.
                cancelClose();
                setWorkOpen(true);
              }}
              onMouseEnter={() => {
                cancelClose();
                setWorkOpen(true);
              }}
              onMouseLeave={scheduleClose}
              type="button"
            >
              My work
              <svg
                aria-hidden="true"
                className={`h-3 w-3 transition-transform duration-200 ${workOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>

            {topLevel
              .filter((link) => link.href !== "/about")
              .map((link) => (
                <Link
                  className={linkClass(isActive(link.href))}
                  href={link.href}
                  key={link.href}
                  onClick={closeAll}
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

      {/*
        "My work" mega menu. It lives outside the blended header so its pictures and
        gold keep their true colours: a black sheet under the nav, one card per page.
      */}
      <div
        aria-hidden={!workOpen}
        className={`fixed inset-x-0 top-20 z-40 hidden transition-all duration-300 ease-out md:top-24 lg:block ${
          workOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        id="my-work-menu"
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div className="container-shell">
          <div className="on-black dotted rounded-2xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:p-8">
            <div className="flex items-center justify-between border-b border-ivory/15 pb-5">
              <p className="eyebrow eyebrow-on-black">My work</p>
              <Link
                className="text-sm text-champagne underline decoration-champagne/50 underline-offset-4 transition-colors hover:text-ivory"
                href="/speaking#enquiry"
                onClick={closeAll}
                tabIndex={workOpen ? 0 : -1}
              >
                Invite DK to speak
              </Link>
            </div>

            <ul className="mt-6 grid grid-cols-4 gap-5">
              {myWorkMenu.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      className="group block"
                      href={item.href}
                      onClick={closeAll}
                      tabIndex={workOpen ? 0 : -1}
                    >
                      <div
                        className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-ivory/10 ${
                          active ? "ring-2 ring-gold" : ""
                        }`}
                      >
                        <Image
                          alt=""
                          className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                          fill
                          loading="eager"
                          sizes="(min-width: 1024px) 20vw, 50vw"
                          src={item.image}
                          unoptimized
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-gold text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M5 12h14m0 0-5-5m5 5-5 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          </svg>
                        </span>
                      </div>
                      <p
                        className={`mt-4 font-display text-lg font-semibold leading-tight transition-colors group-hover:text-champagne ${
                          active ? "text-champagne" : "text-ivory"
                        }`}
                      >
                        {item.label}
                      </p>
                      <p className="mt-1.5 text-sm leading-snug text-ivory/65">{item.line}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

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
