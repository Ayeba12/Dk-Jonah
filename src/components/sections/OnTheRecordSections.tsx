"use client";

import Image from "next/image";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CountUp } from "@/components/ui/CountUp";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  askedBackContent,
  conversationsContent,
  pressContent,
  recordCloseContent,
  recordHeroContent as hero,
  showsContent,
  stagesContent,
} from "@/content/on-the-record";

const stagger = ["", "lg:mt-4", "lg:mt-8"];

// Section 1 · Hero. The About-style split, then the numbers strip as cards.
export const RecordHero = () => (
  <section className="paper pt-24 md:pt-28">
    {/* Below the desktop breakpoint the headline sits above the picture. */}
    <div className="container-shell pb-8 lg:hidden">
      <p className="eyebrow">{hero.eyebrow}</p>
      <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.0] text-balance sm:text-5xl">{hero.headline}</h1>
    </div>

    {/* Photograph 09, in colour, full width. On phones it crops to DK's face and shoulders. */}
    <div className="relative">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-dove-tint sm:aspect-[16/10] lg:aspect-[16/8] lg:max-h-[80vh]">
        <Image
          alt={hero.imageAlt}
          className="object-cover object-[30%_35%] lg:object-[50%_40%]"
          fill
          priority
          sizes="100vw"
          src={hero.image}
          unoptimized
        />
      </div>
      {/* On desktop the plain wall on the right takes the headline. */}
      <div className="container-shell absolute inset-x-0 top-0 hidden pt-10 lg:flex lg:justify-end xl:pt-14">
        <div className="max-w-[30rem] text-right lg:mr-[14%] xl:max-w-[34rem]">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-5 font-display text-[2.6rem] font-bold uppercase leading-[1.0] text-black xl:text-[3.1rem]">{hero.headline}</h1>
        </div>
      </div>
    </div>

    <div className="container-shell pt-14 md:pt-20">
      <p className="max-w-2xl text-lg leading-relaxed text-black/75">{hero.body}</p>

      <div className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:gap-4 lg:grid-cols-4">
        {hero.numbers.map((item, index) => (
          <ScrollReveal delay={index * 0.06} key={item.rest}>
            <div className="flex min-h-[160px] flex-col justify-between rounded-2xl bg-dove-tint p-5 md:min-h-[220px] md:p-8">
              {item.big ? (
                <>
                  <p className="font-display text-base font-semibold uppercase leading-tight md:text-lg">
                    {item.rest}
                  </p>
                  <p className="thread-text font-display text-4xl font-bold leading-none tracking-[-0.03em] md:text-6xl">
                    <CountUp value={item.big} />
                  </p>
                </>
              ) : (
                <>
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
                  <p className="thread-text font-display text-2xl font-bold leading-tight md:text-3xl">
                    {item.rest}
                  </p>
                </>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

// Section 2 · Asked back. The "Journey" block, with the editions as counting cards.
export const AskedBackSection = () => (
  <section className="section-padding bg-ivory" id="asked-back">
    <div className="container-shell">
      <div className="max-w-5xl lg:pl-[8%]">
        <ScrollReveal>
          <p className="eyebrow">{askedBackContent.eyebrow}</p>
          <h2 className="thread-text mt-8 font-display text-3xl font-bold uppercase leading-[1.05] sm:text-4xl lg:text-[3.25rem]">
            {askedBackContent.headline}
          </h2>
          <p className="mt-8 font-display text-2xl font-semibold leading-tight md:text-3xl">
            {askedBackContent.name}
          </p>
          <p className="mt-1 text-sm text-gold-shadow">{askedBackContent.role}</p>
          <p className="mt-6 max-w-2xl text-2xl font-medium leading-[1.3] sm:text-3xl lg:text-[2.2rem] lg:leading-[1.25]">
            {askedBackContent.desc}
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <p className="eyebrow mt-16 md:mt-20">{askedBackContent.editionsLabel}</p>
      </ScrollReveal>
      <div className="mt-6 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {askedBackContent.editions.map((edition, index) => (
          <ScrollReveal delay={index * 0.06} key={edition.when}>
            <div className="flex min-h-[150px] flex-col justify-between rounded-2xl bg-dove-tint p-5 md:min-h-[200px] md:p-8">
              <p className="font-display text-base font-semibold uppercase leading-tight md:text-lg">
                {edition.when}
              </p>
              {edition.reach ? (
                <p className="thread-text font-display text-3xl font-bold leading-none tracking-[-0.03em] md:text-5xl">
                  <CountUp value={edition.reach} />
                  <span className="ml-2 text-sm font-medium tracking-normal text-black/60">reached</span>
                </p>
              ) : (
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

// Section 3 · Shows I host. The reference's journal cards: picture, then the title beneath.
export const ShowsSection = () => (
  <section className="paper section-padding" id="shows">
    <div className="container-shell grid gap-12 lg:grid-cols-[0.32fr_1fr] lg:gap-10">
      <ScrollReveal>
        <p className="eyebrow">{showsContent.eyebrow}</p>
        <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.02] text-balance sm:text-5xl lg:text-[3.5rem]">
          {showsContent.headline}
        </h2>
      </ScrollReveal>
      <div className="grid gap-6 sm:grid-cols-3">
        {showsContent.shows.map((show, index) => (
          <ScrollReveal delay={index * 0.08} key={show.title}>
            <article>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-dove-tint">
                <Image
                  alt=""
                  className="scale-[1.12] object-cover"
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
                  src={show.image}
                />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold leading-tight md:text-2xl">{show.title}</h3>
              <p className="mt-1 text-sm text-gold-shadow">
                {show.role}
                {show.where ? ` · ${show.where}` : ""}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-black/70">{show.desc}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

// Section 4 · In conversation. The milestones layout: a heading that holds, the list on the right.
export const ConversationsSection = () => (
  <section className="section-padding bg-ivory" id="in-conversation">
    <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <ScrollReveal>
        <div className="lg:sticky lg:top-32">
          <p className="eyebrow">{conversationsContent.eyebrow}</p>
          <h2 className="mt-8 font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:text-[3rem]">
            {conversationsContent.headline}
          </h2>
          {/* Photograph 10, in colour. */}
          <div className="mt-8 w-full" style={{ maxWidth: conversationsContent.image.width }}>
            <Image
              alt={conversationsContent.image.alt}
              className="h-auto w-full rounded-2xl"
              height={conversationsContent.image.height}
              sizes="(min-width: 1024px) 40vw, 100vw"
              src={conversationsContent.image.src}
              unoptimized
              width={conversationsContent.image.width}
            />
          </div>
        </div>
      </ScrollReveal>
      <ul className="divide-y divide-black/15 border-y border-black/15">
        {conversationsContent.items.map((item, index) => (
          <li key={item.show}>
            <ScrollReveal delay={index * 0.03}>
              <div className="grid gap-2 py-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-8">
                <div>
                  <p className="font-display text-lg font-semibold leading-tight md:text-xl">{item.show}</p>
                  <p className="mt-1 text-sm text-gold-shadow">{item.role}</p>
                </div>
                <p className="text-[15px] leading-relaxed text-black/70">{item.detail}</p>
              </div>
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// Section 5 · Stages and summits. A timeline: the year holds the left edge of each row.
export const StagesSection = () => (
  <section className="paper section-padding" id="stages">
    <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <ScrollReveal>
        <div className="lg:sticky lg:top-32">
          <p className="eyebrow">{stagesContent.eyebrow}</p>
          <h2 className="mt-8 font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:text-[3rem]">
            {stagesContent.headline}
          </h2>
        </div>
      </ScrollReveal>
      <ol className="relative border-l border-black/15 pl-8">
        {stagesContent.items.map((item, index) => (
          <li className="relative pb-9 last:pb-0" key={`${item.year}-${item.event}`}>
            <span aria-hidden="true" className="absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full bg-gold" />
            <ScrollReveal delay={index * 0.03}>
              {item.year ? <p className="text-sm text-gold-shadow">{item.year}</p> : null}
              <p className="mt-1 font-display text-xl font-semibold leading-tight md:text-2xl">{item.event}</p>
              <p className="mt-1 text-sm text-black/55">{item.role}</p>
              {item.detail ? (
                <p className="mt-2 text-[15px] leading-relaxed text-black/70">{item.detail}</p>
              ) : null}
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

// Section 6 · Lived experience and press. Picture cards with floating boxes.
export const PressSection = () => (
  <section className="section-padding bg-ivory" id="press">
    <div className="container-shell">
      <ScrollReveal>
        <p className="eyebrow">{pressContent.eyebrow}</p>
        <h2 className="mt-8 max-w-3xl font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:text-[3.5rem]">
          {pressContent.headline}
        </h2>
      </ScrollReveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
        {pressContent.items.map((item, index) => (
          <ScrollReveal className={stagger[index] ?? ""} delay={index * 0.05} key={item.title}>
            <div
              className={`relative aspect-[3/4] overflow-hidden rounded-2xl bg-dove-tint ${
                index === pressContent.items.length - 1 ? "ring-2 ring-black" : ""
              }`}
            >
              <Image
                alt=""
                className="scale-[1.12] object-cover object-bottom"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                src={item.image}
              />
              <div className="absolute inset-x-3 top-3 rounded-xl bg-ivory p-5 shadow-[0_12px_30px_rgba(0,0,0,0.12)] md:p-6">
                <p className="font-display text-lg font-semibold uppercase leading-tight md:text-xl">{item.title}</p>
                <p className="mt-1 text-xs text-gold-shadow">{item.meta}</p>
                <p className="mt-3 text-sm leading-relaxed text-black/70">{item.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

// Section 7 · Close.
export const RecordCloseSection = () => (
  <section className="on-black dotted py-24 md:py-32" id="record-close">
    <div className="container-shell text-center">
      <ScrollReveal>
        <p className="mx-auto max-w-4xl font-display text-3xl font-bold uppercase leading-[1.02] text-ivory text-balance sm:text-4xl lg:text-[3.5rem]">
          {recordCloseContent.line}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ArrowButton href={recordCloseContent.primaryCta.href} variant="gold">
            {recordCloseContent.primaryCta.label}
          </ArrowButton>
          <ArrowButton href={recordCloseContent.secondaryCta.href} variant="light">
            {recordCloseContent.secondaryCta.label}
          </ArrowButton>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
