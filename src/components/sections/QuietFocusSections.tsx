"use client";

import Image from "next/image";
import { QuietFocusForm } from "@/components/forms/QuietFocusForm";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Emphasis } from "@/components/ui/Emphasis";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  comeAsYouAreContent,
  qfHeroContent as hero,
  signUpContent,
  whatArrivesContent,
  whatQuietFocusIsContent,
  whyIBuiltItContent,
} from "@/content/quiet-focus";

// Section 1 · Hero. The About-style split with the quiet room on the right.
export const QuietFocusHero = () => (
  <section className="paper pb-16 pt-32 md:pb-24 md:pt-40">
    <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:gap-14">
      <div className="flex flex-col justify-between">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-8 font-display text-5xl font-bold uppercase leading-[0.98] text-balance sm:text-6xl lg:text-[4.75rem]">
            {hero.headline}
          </h1>
        </div>
        <div className="mt-10 lg:mt-14">
          <p className="max-w-md font-display text-2xl font-medium leading-snug md:text-3xl">{hero.line}</p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <ArrowButton href={hero.cta.href} variant="dark">
              {hero.cta.label}
            </ArrowButton>
            <p className="text-sm text-black/55">{hero.small}</p>
          </div>
        </div>
      </div>
      <div className="relative min-h-[440px] overflow-hidden rounded-2xl bg-dove-tint lg:min-h-[620px]">
        <Image
          alt="A quiet room in natural light"
          className="object-cover object-top"
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          src={hero.image}
        />
      </div>
    </div>
  </section>
);

// Section 2 · What Quiet Focus is. The "Journey" block with the pull line.
export const WhatQuietFocusIsSection = () => (
  <section className="section-padding bg-ivory" id="what-it-is">
    <div className="container-shell">
      <div className="max-w-5xl lg:pl-[8%]">
        <ScrollReveal>
          <h2 className="thread-text font-display text-3xl font-bold uppercase leading-[1.05] sm:text-4xl lg:text-[3.25rem]">
            {whatQuietFocusIsContent.headline}
          </h2>
          <p className="mt-8 text-2xl font-medium leading-[1.3] sm:text-3xl lg:text-[2.4rem] lg:leading-[1.22]">
            {whatQuietFocusIsContent.body}
          </p>
          <p className="mt-10 border-t border-black pt-6 font-display text-xl font-medium leading-snug text-gold-shadow md:text-2xl">
            {whatQuietFocusIsContent.pullLine}
          </p>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

// Sections 3 and 4 · Come as you are, Why I built it. Heading left, words right.
export const ComeAsYouAreSection = () => (
  <section className="paper section-padding" id="come-as-you-are">
    <div className="container-shell space-y-24 md:space-y-32">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:sticky lg:top-32 lg:text-[3rem]">
            {comeAsYouAreContent.headline}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-lg leading-relaxed text-black/75">{comeAsYouAreContent.body}</p>
        </ScrollReveal>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16" id="why-i-built-it">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:sticky lg:top-32 lg:text-[3rem]">
            {whyIBuiltItContent.headline}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="space-y-5 text-lg leading-relaxed text-black/75">
            {whyIBuiltItContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <Emphasis className="font-semibold text-black" phrase={whyIBuiltItContent.emphasis} text={paragraph} />
              </p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

// Section 5 · What arrives. A black band, as on the Home page.
export const WhatArrivesSection = () => (
  <section className="on-black dotted section-padding" id="what-arrives">
    <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <ScrollReveal>
        <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] text-ivory sm:text-4xl lg:sticky lg:top-32 lg:text-[3.5rem]">
          {whatArrivesContent.headline}
        </h2>
      </ScrollReveal>
      <ul className="divide-y divide-ivory/15 border-y border-ivory/15">
        {whatArrivesContent.items.map((item, index) => (
          <li key={item.lead}>
            <ScrollReveal delay={index * 0.05}>
              <div className="flex gap-5 py-6">
                <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <p className="text-lg leading-relaxed text-ivory/85">
                  <strong className="font-semibold text-ivory">{item.lead}</strong>
                  {item.rest}
                </p>
              </div>
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// Section 6 · Sign up.
export const SignUpSection = () => (
  <section className="section-padding scroll-mt-24 bg-dove-tint" id={signUpContent.anchor}>
    <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <ScrollReveal>
        <div className="lg:sticky lg:top-32">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h2 className="mt-8 font-display text-5xl font-bold uppercase leading-[0.98] sm:text-6xl lg:text-[4.75rem]">
            {signUpContent.headline}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-black/75">{signUpContent.body}</p>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <QuietFocusForm />
      </ScrollReveal>
    </div>
  </section>
);
