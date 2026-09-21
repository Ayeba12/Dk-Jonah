"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  dayWithToolkitContent,
  goDeeperContent,
  getTool,
  interactiveToolsContent,
  toolkitHeroContent as hero,
  toolkitQuietFocusContent,
  tools,
  whichToolContent,
  whyRoutineReadyContent,
} from "@/content/toolkit";

// Section 1 · Hero. The About-style split.
export const ToolkitHero = () => (
  <section className="paper pb-16 pt-32 md:pb-24 md:pt-40">
    <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:gap-14">
      <div className="flex flex-col justify-between">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-8 font-display text-4xl font-bold uppercase leading-[1.0] text-balance sm:text-5xl lg:text-[4rem]">
            {hero.headline}
          </h1>
        </div>
        <div className="mt-10 lg:mt-14">
          <p className="max-w-md text-base leading-relaxed text-black/75">{hero.body}</p>
          <div className="mt-8">
            <ArrowButton href={hero.cta.href} variant="dark">
              {hero.cta.label}
            </ArrowButton>
          </div>
        </div>
      </div>
      <div className="relative min-h-[440px] overflow-hidden rounded-2xl bg-dove-tint lg:min-h-[620px]">
        <Image
          alt="Pausing before the day begins"
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

// Section 2 · Why Routine Ready. The "Journey" block.
export const WhyRoutineReadySection = () => (
  <section className="section-padding bg-ivory" id="why-routine-ready">
    <div className="container-shell">
      <div className="max-w-5xl lg:pl-[8%]">
        <ScrollReveal>
          <p className="eyebrow">{whyRoutineReadyContent.eyebrow}</p>
          <h2 className="thread-text mt-8 font-display text-3xl font-bold uppercase leading-[1.05] sm:text-4xl lg:text-[3.25rem]">
            {whyRoutineReadyContent.headline}
          </h2>
          <p className="mt-8 text-2xl font-medium leading-[1.3] sm:text-3xl lg:text-[2.4rem] lg:leading-[1.22]">
            {whyRoutineReadyContent.body}
          </p>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

// Section 3 · A day with the toolkit. The milestones layout.
export const DayWithToolkitSection = () => (
  <section className="paper section-padding" id="a-day">
    <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <ScrollReveal>
        <div className="lg:sticky lg:top-32">
          <p className="eyebrow">{dayWithToolkitContent.eyebrow}</p>
          <h2 className="mt-8 font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:text-[3rem]">
            {dayWithToolkitContent.headline}
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-black/70">{dayWithToolkitContent.intro}</p>
        </div>
      </ScrollReveal>
      <div>
        <ol className="divide-y divide-black/15 border-y border-black/15">
          {dayWithToolkitContent.moments.map((moment, index) => (
            <li key={moment.when}>
              <ScrollReveal delay={index * 0.05}>
                <div className="grid gap-2 py-7 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] md:gap-8">
                  <div>
                    <p className="text-sm text-gold-shadow">{moment.when}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold leading-tight md:text-2xl">
                      {moment.title}
                    </h3>
                  </div>
                  <p className="text-lg leading-relaxed text-black/75">{moment.text}</p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
        <ScrollReveal>
          <p className="mt-8 font-display text-xl font-medium leading-snug md:text-2xl">
            {dayWithToolkitContent.closingLine}
          </p>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

// Section 4 · The interactive tools. The reference's projects grid: two picture cards to a row,
// a caption line beneath each.
export const InteractiveToolsSection = () => (
  <section className="section-padding bg-ivory scroll-mt-24" id="tools">
    <div className="container-shell">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <ScrollReveal>
          <p className="eyebrow">{interactiveToolsContent.eyebrow}</p>
          <h2 className="mt-8 max-w-3xl font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:text-[3.5rem]">
            {interactiveToolsContent.headline}
          </h2>
        </ScrollReveal>
      </div>

      <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2">
        {tools.map((tool, index) => (
          <ScrollReveal delay={(index % 2) * 0.08} key={tool.slug}>
            <Link className="group block" href={`/toolkit/${tool.slug}`}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-dove-tint">
                <Image
                  alt=""
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  src={tool.image}
                />
                {tool.label ? (
                  <span className="absolute left-4 top-4 rounded-full bg-ivory px-3 py-1 text-xs font-medium text-black">
                    {tool.label}
                  </span>
                ) : null}
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-gold text-black opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 12h14m0 0-5-5m5 5-5 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </span>
              </div>
              <div className="mt-5 flex items-start gap-4">
                <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                <p className="text-base leading-relaxed text-black/75">
                  <strong className="font-display text-xl font-semibold text-black transition-colors group-hover:text-gold-shadow md:text-2xl">
                    {tool.title}.
                  </strong>{" "}
                  {tool.desc}
                </p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

// Section 5 · Which tool do I need? Feeling on the left, the tool on the right.
export const WhichToolSection = () => (
  <section className="paper section-padding" id="which-tool">
    <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <ScrollReveal>
        <div className="lg:sticky lg:top-32">
          <p className="eyebrow">{whichToolContent.eyebrow}</p>
          <h2 className="mt-8 font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:text-[3rem]">
            {whichToolContent.headline}
          </h2>
        </div>
      </ScrollReveal>
      <ul className="divide-y divide-black/15 border-y border-black/15">
        {whichToolContent.routes.map((route, index) => {
          const tool = getTool(route.slug);
          if (!tool) return null;
          return (
            <li key={route.slug}>
              <ScrollReveal delay={index * 0.04}>
                <Link
                  className="group -mx-4 grid gap-2 rounded-xl px-4 py-6 transition-colors hover:bg-black/[0.03] md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8"
                  href={`/toolkit/${tool.slug}`}
                >
                  <p className="font-display text-xl font-medium leading-snug md:text-2xl">{route.feeling}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-gold-shadow">
                    {tool.title}
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14m0 0-5-5m5 5-5 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </span>
                </Link>
              </ScrollReveal>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

// Section 6 · Go deeper. A black band with the three groups.
export const GoDeeperSection = () => (
  <section className="on-black dotted section-padding" id="go-deeper">
    <div className="container-shell">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
        <ScrollReveal>
          <p className="eyebrow eyebrow-on-black">{goDeeperContent.eyebrow}</p>
          <h2 className="mt-8 font-display text-3xl font-bold uppercase leading-[1.02] text-ivory text-balance sm:text-4xl lg:text-[3.5rem]">
            {goDeeperContent.headline}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="max-w-md text-lg leading-relaxed text-ivory/80 lg:ml-auto">{goDeeperContent.body}</p>
        </ScrollReveal>
      </div>
      <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {goDeeperContent.groups.map((group, index) => (
          <ScrollReveal delay={index * 0.06} key={group.name}>
            <div className="border-t border-ivory/20 pt-5">
              <h3 className="font-display text-lg font-semibold uppercase text-champagne">{group.name}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li className="flex gap-3 text-base text-ivory/85" key={item}>
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal>
        <div className="mt-14">
          <ArrowButton href={goDeeperContent.cta.href} variant="gold">
            {goDeeperContent.cta.label}
          </ArrowButton>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

// Section 7 · Join Quiet Focus.
export const ToolkitQuietFocusSection = () => (
  <section className="section-padding bg-dove-tint" id="quiet-focus">
    <div className="container-shell grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
      <ScrollReveal>
        <p className="eyebrow">{toolkitQuietFocusContent.eyebrow}</p>
        <h2 className="mt-8 font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:text-[3.5rem]">
          {toolkitQuietFocusContent.headline}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <p className="max-w-xl text-lg leading-relaxed text-black/75">{toolkitQuietFocusContent.body}</p>
        <div className="mt-8 flex flex-col items-start gap-3">
          <ArrowButton href={toolkitQuietFocusContent.cta.href} variant="dark">
            {toolkitQuietFocusContent.cta.label}
          </ArrowButton>
          <p className="text-sm text-black/55">{toolkitQuietFocusContent.line}</p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
