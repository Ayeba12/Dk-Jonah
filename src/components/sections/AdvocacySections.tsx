"use client";

import Image from "next/image";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  advocacyContent,
  advocacyHeroContent as hero,
  broadcastingContent,
  faithContent,
  nextStepContent,
  unsaidContent,
} from "@/content/advocacy";

// Section 1 · Hero. The reference's About hero: stacked headline left, framed picture right.
export const AdvocacyHero = () => (
  <section className="paper pb-16 pt-32 md:pb-24 md:pt-40">
    <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:gap-14">
      <div className="flex flex-col justify-between">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-8 font-display text-4xl font-bold uppercase leading-[1.0] text-balance sm:text-5xl lg:text-[4rem]">
            {hero.headline}
          </h1>
        </div>
        <p className="mt-10 max-w-md text-base leading-relaxed text-black/75 lg:mt-14">{hero.body}</p>
      </div>
      <div className="relative min-h-[440px] overflow-hidden rounded-2xl bg-dove-tint lg:min-h-[620px]">
        <Image
          alt="DK Jonah speaking in a community hall"
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

// Section 2 · Advocacy. The reference's "Journey" block, then picture cards with floating boxes.
const stagger = ["", "lg:mt-4", "lg:mt-8", "lg:mt-12"];

export const AdvocacySection = () => (
  <section className="section-padding bg-ivory" id="advocacy">
    <div className="container-shell">
      <div className="max-w-5xl lg:pl-[8%]">
        <ScrollReveal>
          <p className="eyebrow">{advocacyContent.eyebrow}</p>
          <h2 className="thread-text mt-8 font-display text-3xl font-bold uppercase leading-[1.05] sm:text-4xl lg:text-[3.25rem]">
            {advocacyContent.headline}
          </h2>
          <div className="mt-8 space-y-6">
            <p className="text-2xl font-medium leading-[1.3] sm:text-3xl lg:text-[2.4rem] lg:leading-[1.22]">
              {advocacyContent.paragraphs[0]}
            </p>
            <p className="max-w-2xl text-lg leading-relaxed text-black/70">{advocacyContent.paragraphs[1]}</p>
          </div>
        </ScrollReveal>
      </div>

      <div className="mt-20 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <ScrollReveal>
          <h3 className="font-display text-2xl font-semibold uppercase leading-tight md:text-3xl">
            {advocacyContent.speakUpLabel}
          </h3>
        </ScrollReveal>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
        {advocacyContent.speakUp.map((item, index) => (
          <ScrollReveal className={stagger[index] ?? ""} delay={index * 0.05} key={item.title}>
            <div
              className={`relative aspect-[3/4] overflow-hidden rounded-2xl bg-dove-tint ${
                index === advocacyContent.speakUp.length - 1 ? "ring-2 ring-black" : ""
              }`}
            >
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                src={item.image}
              />
              <div className="absolute inset-x-3 top-3 rounded-xl bg-ivory p-5 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                <p className="font-display text-lg font-semibold uppercase leading-tight">{item.title}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

// Section 3 · Faith. A black band with the scripture set as the pull quote.
export const FaithSection = () => (
  <section className="on-black dotted section-padding" id="faith">
    <div className="container-shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
      <ScrollReveal>
        <p className="eyebrow eyebrow-on-black">{faithContent.eyebrow}</p>
        <h2 className="mt-8 font-display text-4xl font-bold uppercase leading-[1.02] text-ivory text-balance sm:text-5xl lg:text-[3.75rem]">
          {faithContent.headline}
        </h2>
        <blockquote className="mt-12 max-w-lg border-t border-ivory/15 pt-6">
          <p className="font-display text-2xl font-medium leading-snug text-champagne md:text-3xl">
            &ldquo;{faithContent.scripture.text}&rdquo;
          </p>
          <footer className="mt-4 text-sm text-ivory/60">{faithContent.scripture.reference}</footer>
        </blockquote>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="space-y-5 text-lg leading-relaxed text-ivory/80 lg:pt-14">
          {faithContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8">
          <ArrowButton href={faithContent.amplify.href} variant="gold">
            {faithContent.amplify.label}
          </ArrowButton>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

// Section 4 · The Unsaid. Coming soon, with the six tags.
export const UnsaidSection = () => (
  <section className="paper section-padding" id="the-unsaid">
    <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <ScrollReveal>
        <p className="eyebrow">{unsaidContent.eyebrow}</p>
        <h2 className="mt-8 font-display text-5xl font-bold uppercase leading-[0.98] sm:text-6xl lg:sticky lg:top-32 lg:text-[5rem]">
          {unsaidContent.headline}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <p className="font-display text-2xl font-medium leading-snug md:text-3xl">{unsaidContent.line}</p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/75">{unsaidContent.body}</p>
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {unsaidContent.tags.map((tag) => (
            <li className="rounded-full border border-black/20 px-4 py-1.5 text-sm" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </div>
  </section>
);

// Section 5 · Broadcasting. Picture left, the shows as rows on the right.
export const BroadcastingSection = () => (
  <section className="section-padding bg-dove-tint" id="broadcasting">
    <div className="container-shell">
      <ScrollReveal>
        <p className="eyebrow">{broadcastingContent.eyebrow}</p>
        <h2 className="mt-8 max-w-3xl font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:text-[3.5rem]">
          {broadcastingContent.headline}
        </h2>
      </ScrollReveal>
      <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <ScrollReveal>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-ivory">
            {/* The sketch carries its own drawn frame; a slight zoom crops it so the picture fills the box. */}
            <Image
              alt="DK Jonah in a radio studio"
              className="scale-[1.16] object-cover"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              src={broadcastingContent.image}
            />
          </div>
        </ScrollReveal>
        <div>
          <ul className="divide-y divide-black/15 border-y border-black/15">
            {broadcastingContent.shows.map((show, index) => (
              <li key={show.title}>
                <ScrollReveal delay={index * 0.06}>
                  <div className="py-7">
                    <p className="font-display text-2xl font-semibold leading-tight">{show.title}</p>
                    <p className="mt-1 text-sm text-gold-shadow">{show.meta}</p>
                    <p className="mt-3 text-base leading-relaxed text-black/70">{show.desc}</p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>
          <ScrollReveal>
            <p className="mt-8 text-lg font-medium leading-relaxed">{broadcastingContent.closingLine}</p>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
);

// Section 6 · Next step.
export const NextStepSection = () => (
  <section className="on-black dotted py-24 md:py-32" id="next-step">
    <div className="container-shell text-center">
      <ScrollReveal>
        <h2 className="mx-auto max-w-4xl font-display text-3xl font-bold uppercase leading-[1.02] text-ivory text-balance sm:text-4xl lg:text-[3.5rem]">
          {nextStepContent.headline}
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ArrowButton href={nextStepContent.primaryCta.href} variant="gold">
            {nextStepContent.primaryCta.label}
          </ArrowButton>
          <ArrowButton href={nextStepContent.secondaryCta.href} variant="light">
            {nextStepContent.secondaryCta.label}
          </ArrowButton>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
