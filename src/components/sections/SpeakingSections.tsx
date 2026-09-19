"use client";

import Image from "next/image";
import Link from "next/link";
import { SpeakingEnquiryForm } from "@/components/forms/SpeakingEnquiryForm";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CountUp } from "@/components/ui/CountUp";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  SPEAKING_EMAIL,
  formatsContent,
  inTheirWordsContent,
  inviteContent,
  roomsContent,
  speakingHeroContent as hero,
  topicsContent,
  whatIBringContent,
  whereSpokenContent,
} from "@/content/speaking";

const initials = (name: string) =>
  name
    .replace(/^Dr\s+/i, "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

// Section 1 · Hero. Stacked headline left, framed picture right with the closing line over it.
export const SpeakingHero = () => (
  <section className="paper pb-16 pt-32 md:pb-24 md:pt-40">
    <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:gap-14">
      <div className="flex flex-col justify-between">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-8 font-display text-4xl font-bold uppercase leading-[1.0] text-balance sm:text-5xl lg:text-[3.9rem]">
            {hero.headline}
          </h1>
        </div>
        <div className="mt-10 lg:mt-14">
          <div className="max-w-md space-y-4 text-base leading-relaxed text-black/75">
            {hero.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <ArrowButton href={hero.primaryCta.href} variant="dark">
              {hero.primaryCta.label}
            </ArrowButton>
            <Link
              className="text-sm underline decoration-black/30 underline-offset-4 transition-colors hover:text-gold-shadow"
              href={hero.secondaryCta.href}
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative min-h-[440px] overflow-hidden rounded-2xl bg-black lg:min-h-[620px]">
        <Image
          alt="DK Jonah speaking to a room"
          className="object-cover object-top"
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          src={hero.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
        <p className="absolute inset-x-0 bottom-0 p-8 font-display text-2xl font-medium leading-tight text-ivory md:p-10 md:text-4xl">
          {hero.closingLine}
        </p>
      </div>
    </div>
  </section>
);

// Section 2 · What I bring, with the stats and the rooms beneath.
export const WhatIBringSection = () => (
  <section className="section-padding bg-ivory" id="what-i-bring">
    <div className="container-shell">
      <div className="max-w-5xl lg:pl-[8%]">
        <ScrollReveal>
          <h2 className="thread-text font-display text-3xl font-bold uppercase leading-[1.05] sm:text-4xl lg:text-[3.25rem]">
            {whatIBringContent.headline}
          </h2>
          <p className="mt-8 text-2xl font-medium leading-[1.3] sm:text-3xl lg:text-[2.4rem] lg:leading-[1.22]">
            {whatIBringContent.body}
          </p>
        </ScrollReveal>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-3 md:mt-24 md:gap-4 lg:grid-cols-4">
        {whatIBringContent.stats.map((stat, index) => (
          <ScrollReveal delay={index * 0.06} key={stat.label}>
            <div className="flex min-h-[160px] flex-col justify-between rounded-2xl bg-dove-tint p-5 md:min-h-[220px] md:p-8">
              <p className="font-display text-base font-semibold uppercase leading-tight md:text-lg">
                {stat.label}
              </p>
              <p className="thread-text font-display text-5xl font-bold leading-none tracking-[-0.03em] md:text-6xl">
                <CountUp value={stat.value} />
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Section 3 · Rooms I speak in */}
      <ScrollReveal>
        <div className="mt-16 grid gap-6 border-t border-black/15 pt-10 md:mt-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16" id="rooms">
          <h2 className="font-display text-2xl font-semibold uppercase leading-tight md:text-3xl">
            {roomsContent.headline}
          </h2>
          <ul className="grid gap-x-8 gap-y-3 text-base text-black/75 sm:grid-cols-2">
            {roomsContent.rooms.map((room) => (
              <li className="flex items-center gap-3" key={room}>
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {room}
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

// Section 4 · Topics, in the reference's milestones layout: a heading that holds, groups on the right.
export const TopicsSection = () => (
  <section className="paper section-padding scroll-mt-24" id={topicsContent.anchor}>
    <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <ScrollReveal>
        <h2 className="font-display text-4xl font-bold uppercase leading-[1.02] sm:text-5xl lg:sticky lg:top-32 lg:text-[4rem]">
          {topicsContent.headline}
        </h2>
      </ScrollReveal>
      <div className="space-y-12">
        {topicsContent.groups.map((group, index) => (
          <ScrollReveal delay={index * 0.05} key={group.theme}>
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold-shadow">
                {group.theme}
              </h3>
              <ul className="mt-4 space-y-5">
                {group.topics.map((topic) => (
                  <li className="flex gap-4" key={topic.title}>
                    <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <p className="text-lg leading-relaxed text-black/75">
                      <strong className="font-semibold text-black">{topic.title}</strong> {topic.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

// Section 5 · What I can do for your event. Cards with a sketch beneath, as the reference's approach cards.
export const FormatsSection = () => (
  <section className="section-padding bg-ivory" id="formats">
    <div className="container-shell">
      <ScrollReveal>
        <h2 className="max-w-3xl font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:text-[3.5rem]">
          {formatsContent.headline}
        </h2>
      </ScrollReveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {formatsContent.formats.map((format, index) => (
          <ScrollReveal delay={index * 0.05} key={format.title}>
            <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-dove-tint">
              <div className="p-6">
                <p className="font-display text-lg font-semibold leading-snug">{format.title}</p>
                {format.detail ? (
                  <p className="mt-2 text-sm leading-relaxed text-black/65">{format.detail}</p>
                ) : null}
              </div>
              <div className="relative mt-auto aspect-square">
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                  src={format.image}
                />
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal>
        <p className="mt-10 text-base text-black/70">{formatsContent.line}</p>
      </ScrollReveal>
    </div>
  </section>
);

// Section 6 · Where I have spoken. The reference's list layout, one name per row.
export const WhereSpokenSection = () => (
  <section className="section-padding bg-dove-tint" id="where">
    <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <ScrollReveal>
        <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] sm:text-4xl lg:sticky lg:top-32 lg:text-[3rem]">
          {whereSpokenContent.headline}
        </h2>
        <p className="mt-6 max-w-sm text-base text-black/70">{whereSpokenContent.line}</p>
        <p className="mt-3 max-w-sm text-base text-black/70">
          {whereSpokenContent.books.lead}
          <em>{whereSpokenContent.books.titles[0]}</em> and{" "}
          <em>{whereSpokenContent.books.titles[1]}</em>.
        </p>
        <Link
          className="mt-6 inline-block text-sm underline decoration-black/30 underline-offset-4 transition-colors hover:text-gold-shadow"
          href={whereSpokenContent.onTheRecord.href}
        >
          {whereSpokenContent.onTheRecord.label}
        </Link>
      </ScrollReveal>
      <ul className="divide-y divide-black/15 border-y border-black/15">
        {whereSpokenContent.places.map((place, index) => (
          <li key={place}>
            <ScrollReveal delay={index * 0.03}>
              <div className="flex items-center gap-5 py-4">
                <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-gold" />
                <p className="font-display text-lg font-medium md:text-xl">{place}</p>
              </div>
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// Section 7 · In their words. Three short quotes with the rounded-square badges.
export const InTheirWordsSection = () => (
  <section className="paper section-padding" id="in-their-words">
    <div className="container-shell">
      <ScrollReveal>
        <p className="eyebrow">{inTheirWordsContent.headline}</p>
      </ScrollReveal>
      <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-10">
        {inTheirWordsContent.quotes.map((item, index) => (
          <ScrollReveal delay={index * 0.06} key={item.name}>
            <figure className="flex h-full flex-col">
              <span aria-hidden="true" className="block font-display text-5xl leading-[0.6] text-dove">
                &rdquo;
              </span>
              <blockquote className="mt-5 font-display text-xl font-medium leading-snug md:text-2xl">
                {item.quote}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-6">
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-black font-display text-sm font-semibold text-ivory"
                >
                  {initials(item.name)}
                </span>
                <p className="font-semibold leading-tight">{item.name}</p>
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

// Section 8 · Invite DK. A black band with the enquiry form.
export const InviteSection = () => (
  <section className="on-black dotted section-padding scroll-mt-24" id={inviteContent.anchor}>
    <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <ScrollReveal>
        <div className="lg:sticky lg:top-32">
          <p className="eyebrow eyebrow-on-black">Invite DK</p>
          <h2 className="mt-8 font-display text-3xl font-bold uppercase leading-[1.02] text-ivory text-balance sm:text-4xl lg:text-[3.25rem]">
            {inviteContent.headline}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ivory/80">{inviteContent.body}</p>
          <p className="mt-8 text-sm text-ivory/60">
            {inviteContent.emailLine}{" "}
            <a className="text-champagne underline underline-offset-4" href={`mailto:${SPEAKING_EMAIL}`}>
              {SPEAKING_EMAIL}
            </a>
          </p>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <SpeakingEnquiryForm />
      </ScrollReveal>
    </div>
  </section>
);
