"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  notSureContent,
  teamsContent,
  waysToWorkContent,
  workHeroContent,
  workQuotesContent,
} from "@/content/work";

const initials = (name: string) =>
  name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

// Section 1 · Hero. Ivory split hero, headline left, body and button right.
export const WorkHero = () => (
  <section className="paper pb-16 pt-32 md:pb-24 md:pt-40">
    <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
      <div>
        <p className="eyebrow">{workHeroContent.eyebrow}</p>
        <h1 className="mt-8 font-display text-4xl font-bold uppercase leading-[1.0] text-balance sm:text-5xl lg:text-[4.25rem]">
          {workHeroContent.headline}
        </h1>
      </div>
      <div className="lg:pb-2">
        <p className="max-w-md text-lg leading-relaxed text-black/75">{workHeroContent.body}</p>
        <div className="mt-8">
          <ArrowButton href={workHeroContent.cta.href} variant="dark">
            {workHeroContent.cta.label}
          </ArrowButton>
        </div>
      </div>
    </div>
  </section>
);

// Section 2 · Ways to work with me. One row per situation, the offer set against it.
export const WaysToWorkSection = () => (
  <section className="section-padding scroll-mt-24 bg-ivory" id={waysToWorkContent.anchor}>
    <div className="container-shell">
      <ScrollReveal>
        <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] sm:text-4xl lg:text-[3.5rem]">
          {waysToWorkContent.headline}
        </h2>
      </ScrollReveal>

      <hr className="thread mt-12" />

      <ol>
        {waysToWorkContent.ways.map((way, index) => (
          <li className="border-b border-black/15" key={way.situation}>
            <ScrollReveal delay={index * 0.04}>
              <div className="grid gap-6 py-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12 md:py-12">
                <div className="flex items-start gap-4">
                  <span aria-hidden="true" className="mt-3 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  <h3 className="font-display text-2xl font-semibold leading-tight md:text-3xl">
                    {way.situation}
                  </h3>
                </div>

                <div className="space-y-8 md:pl-6">
                  {way.offers.map((offer) => (
                    <article key={offer.title}>
                      <p className="text-lg leading-relaxed text-black/80">
                        <strong className="font-semibold text-black">{offer.title}</strong>{" "}
                        {offer.desc}
                      </p>
                      <div className="mt-4">
                        <ArrowButton href={offer.href} size="sm" variant="dark">
                          {offer.cta}
                        </ArrowButton>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

// Section 3 · For teams, services and institutions. A black band.
export const TeamsSection = () => (
  <section className="on-black dotted section-padding" id="organisations">
    <div className="container-shell grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
      <ScrollReveal>
        <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] text-ivory text-balance sm:text-4xl lg:text-[3.5rem]">
          {teamsContent.headline}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <p className="max-w-xl text-lg leading-relaxed text-ivory/80">{teamsContent.body}</p>
        <div className="mt-8">
          <ArrowButton href={teamsContent.cta.href} variant="gold">
            {teamsContent.cta.label}
          </ArrowButton>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

// Section 4 · What people say. Two quotes side by side.
export const WorkQuotesSection = () => (
  <section className="paper section-padding" id="work-testimonials">
    <div className="container-shell">
      <ScrollReveal>
        <p className="eyebrow">{workQuotesContent.headline}</p>
      </ScrollReveal>
      <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
        {workQuotesContent.quotes.map((item, index) => (
          <ScrollReveal delay={index * 0.08} key={item.name}>
            <figure>
              <span aria-hidden="true" className="block font-display text-6xl leading-[0.6] text-dove">
                &rdquo;
              </span>
              <blockquote className="mt-6 font-display text-2xl font-medium leading-snug md:text-3xl">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                {item.image ? (
                  <Image
                    alt={item.name}
                    className="h-11 w-11 shrink-0 rounded-lg object-cover"
                    height={44}
                    src={item.image}
                    unoptimized
                    width={44}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-black font-display text-sm font-semibold text-ivory"
                  >
                    {initials(item.name)}
                  </span>
                )}
                <div>
                  <p className="font-semibold leading-tight">{item.name}</p>
                  {item.role ? <p className="mt-0.5 text-sm text-black/60">{item.role}</p> : null}
                </div>
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

// Section 5 · Not sure where to start?
export const NotSureSection = () => (
  <section className="section-padding bg-dove-tint" id="not-sure">
    <div className="container-shell grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
      <ScrollReveal>
        <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] sm:text-4xl lg:text-[3.5rem]">
          {notSureContent.headline}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <p className="max-w-xl text-lg leading-relaxed text-black/75">{notSureContent.body}</p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <ArrowButton href={notSureContent.cta.href} variant="dark">
            {notSureContent.cta.label}
          </ArrowButton>
          <Link
            className="text-sm underline decoration-black/30 underline-offset-4 transition-colors hover:text-gold-shadow"
            href="/find-me"
          >
            Find me
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
