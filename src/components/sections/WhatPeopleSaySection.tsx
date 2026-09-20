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
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-6">
          <ScrollReveal className="lg:w-[54%] lg:shrink-0">
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
            {/* Amina's portrait sits beside her words, narrower than its column so the section keeps air on the right. */}
            <div className="relative h-[24rem] w-full overflow-hidden rounded-2xl bg-dove-tint sm:mx-auto sm:h-[28rem] sm:max-w-sm lg:mx-0 lg:h-[29rem] lg:w-72">
              <Image
                alt={featured.name}
                className="object-cover object-top grayscale"
                fill
                sizes="(min-width: 1024px) 18rem, (min-width: 640px) 24rem, 100vw"
                src="/assets/avenzor/images/testimonial-amina.webp"
                // The file is already web-sized, and the dev image optimiser has stalled on it, so serve it as is.
                unoptimized
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Shorter quotes, three across */}
        <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-3 lg:gap-8">
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
                  {card.image ? (
                    <Image
                      alt={card.name}
                      className="h-11 w-11 shrink-0 rounded-lg object-cover"
                      height={44}
                      src={card.image}
                      unoptimized
                      width={44}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-black font-display text-sm font-semibold text-ivory"
                    >
                      {initials(card.name)}
                    </span>
                  )}
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
