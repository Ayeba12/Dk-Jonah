"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { faqCloseContent as close, faqGroups, faqHeroContent as hero, type FaqItem } from "@/content/faq";

// Section 1 · Hero. Words only, the gold thread beneath, and a row of jumps to each group.
export const FaqHero = () => (
  <section className="paper pb-10 pt-32 md:pb-14 md:pt-40">
    <div className="container-shell">
      <p className="eyebrow">{hero.eyebrow}</p>
      <h1 className="mt-8 max-w-4xl font-display text-4xl font-bold uppercase leading-[1.0] text-balance sm:text-5xl lg:text-[4.5rem]">
        {hero.headline}
      </h1>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-black/75">
        {hero.bodyLead}
        <a className="font-medium text-black underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-shadow" href={`mailto:${hero.email}`}>
          {hero.email}
        </a>
        {hero.bodyEnd}
      </p>
      <hr className="thread mt-14" />
      <nav aria-label="Question groups" className="mt-8 flex flex-wrap gap-2.5">
        {faqGroups.map((group, index) => (
          <a
            className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm transition-colors hover:border-black hover:bg-black hover:text-ivory"
            href={`#${group.id}`}
            key={group.id}
          >
            <span className="font-display text-xs font-semibold text-gold-shadow">0{index + 1}</span>
            {group.label}
          </a>
        ))}
      </nav>
    </div>
  </section>
);

// One question. The answer opens and closes beneath it.
const FaqPanel = ({ item, open, onToggle, id }: { item: FaqItem; open: boolean; onToggle: () => void; id: string }) => {
  const reduceMotion = useReducedMotion();
  return (
    <li className="border-t border-black/15">
      <h3>
        <button
          aria-controls={`${id}-answer`}
          aria-expanded={open}
          className="group flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
          onClick={onToggle}
          type="button"
        >
          <span className="font-display text-xl font-semibold leading-snug transition-colors group-hover:text-gold-shadow md:text-2xl">
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors ${
              open ? "border-black bg-black text-ivory" : "border-black/20 text-black group-hover:border-black"
            }`}
          >
            <svg className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-45" : ""}`} fill="none" viewBox="0 0 16 16">
              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
            </svg>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            id={`${id}-answer`}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            key="answer"
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pb-7 pr-0 md:pr-16">
              <p className="max-w-2xl text-lg leading-relaxed text-black/75">{item.answer}</p>
              {item.links?.length ? (
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {item.links.map((link) => (
                    <li key={link.href + link.label}>
                      {link.href.startsWith("mailto:") ? (
                        <a className="text-sm font-medium underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-shadow" href={link.href}>
                          {link.label}
                        </a>
                      ) : (
                        <Link className="text-sm font-medium underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-shadow" href={link.href}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
};

// Sections 2 to 7 · The six groups. Group heading stays put on the left while the questions scroll by.
export const FaqGroupsSection = () => {
  // The first question on the page starts open; everything else waits to be asked.
  const [openId, setOpenId] = useState<string | null>(`${faqGroups[0].id}-0`);

  return (
    <section className="paper pb-8 pt-4 md:pb-16">
      <div className="container-shell">
        {faqGroups.map((group, groupIndex) => (
          <div
            className={`grid gap-6 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 md:py-20 ${groupIndex === 0 ? "" : "border-t border-black/15"}`}
            id={group.id}
            key={group.id}
          >
            <div className="scroll-mt-32">
              <ScrollReveal className="lg:sticky lg:top-32">
                <p className="thread-text font-display text-5xl font-bold leading-none md:text-6xl">0{groupIndex + 1}</p>
                <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-[1.02] sm:text-4xl lg:text-[3rem]">
                  {group.label}
                </h2>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.06}>
              <ul className="border-b border-black/15">
                {group.items.map((item, itemIndex) => {
                  const id = `${group.id}-${itemIndex}`;
                  return (
                    <FaqPanel
                      id={id}
                      item={item}
                      key={id}
                      onToggle={() => setOpenId((current) => (current === id ? null : id))}
                      open={openId === id}
                    />
                  );
                })}
              </ul>
            </ScrollReveal>
          </div>
        ))}
      </div>
    </section>
  );
};

// Section 8 · Close. A black band with two ways forward.
export const FaqCloseSection = () => (
  <section className="on-black dotted section-padding">
    <div className="container-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
      <ScrollReveal>
        <h2 className="font-display text-4xl font-bold uppercase leading-[0.98] text-ivory sm:text-5xl lg:text-[4.5rem]">
          {close.headline}
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/80">
          {close.bodyLead}
          <a className="font-medium text-champagne underline decoration-gold decoration-2 underline-offset-4 hover:text-ivory" href={`mailto:${close.email}`}>
            {close.email}
          </a>
          {close.bodyEnd}
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <div className="flex flex-wrap gap-4 lg:justify-end">
          <ArrowButton href={close.primary.href} variant="gold">
            {close.primary.label}
          </ArrowButton>
          <ArrowButton href={close.secondary.href} variant="ivory">
            {close.secondary.label}
          </ArrowButton>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
