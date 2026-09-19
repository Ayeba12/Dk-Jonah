"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { whatPeopleSayContent as content } from "@/content/home";

const initials = (name: string) =>
  name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

// The reference's "Happy Clients" block: one large quote beside a monochrome
// portrait, then a row of shorter quotes with small marks and round avatars.
export const WhatPeopleSaySection = () => {
  const [featured, ...others] = content.cards;

  return (
    <section className="section-padding bg-ivory" id="testimonials">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <ScrollReveal>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 className="mt-3 font-display text-base font-semibold uppercase tracking-wide text-black/70">
              {content.headline}
            </h2>

            <span
              aria-hidden="true"
              className="mt-10 block font-display text-7xl leading-[0.6] text-dove"
            >
              &rdquo;
            </span>
            <blockquote className="mt-6 text-3xl font-medium leading-[1.12] tracking-[-0.02em] text-black sm:text-4xl lg:text-[3.25rem]">
              {featured.quote}
              <span
                aria-hidden="true"
                className="ml-3 inline-block h-2.5 w-2.5 rounded-full bg-gold align-middle"
              />
            </blockquote>

            <div className="mt-10">
              <p className="text-base font-semibold">{featured.name}</p>
              <p className="mt-0.5 text-sm text-black/55">
                {featured.role ? <>{featured.role} · </> : null}
                <span className="text-gold-shadow">{featured.tag}</span>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-dove-tint lg:ml-auto">
              <Image
                alt="DK Jonah"
                className="object-cover object-[50%_15%] grayscale"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                src="/assets/avenzor/images/about-hero.png"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Shorter quotes, with the pull quote in the reference's left-hand slot */}
        <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-[0.75fr_1fr_1fr_1fr] lg:gap-8">
          <ScrollReveal>
            <div className="lg:pr-6">
              <p className="text-sm leading-relaxed text-black/55">
                &ldquo;{content.pullQuote.quote}&rdquo;
              </p>
              <p className="mt-2 text-sm font-medium text-black/70">{content.pullQuote.author}</p>
            </div>
          </ScrollReveal>

          {others.map((card, index) => (
            <ScrollReveal delay={0.05 + index * 0.06} key={card.name}>
              <article className="flex h-full flex-col">
                <span
                  aria-hidden="true"
                  className="block font-display text-3xl leading-[0.6] text-dove"
                >
                  &rdquo;
                </span>
                <p className="mt-4 text-[15px] leading-relaxed text-black/80">{card.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-black font-display text-sm font-semibold text-ivory"
                  >
                    {initials(card.name)}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold leading-tight">{card.name}</p>
                    <p className="mt-0.5 text-sm text-black/55">
                      {card.role ? <>{card.role} · </> : null}
                      <span className="text-gold-shadow">{card.tag}</span>
                    </p>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
