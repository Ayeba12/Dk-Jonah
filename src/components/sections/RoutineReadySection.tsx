"use client";

import Link from "next/link";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Emphasis } from "@/components/ui/Emphasis";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { routineReadyToolkitContent as content } from "@/content/home";

// The reference's numbered "Services" list, set on ivory with the gold thread
// rather than a gold ground (the brand keeps gold for lines and hero moments).
export const RoutineReadySection = () => (
  <section className="paper section-padding" id="toolkit">
    <div className="container-shell">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <ScrollReveal>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-8 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.02] text-balance sm:text-5xl lg:text-[4rem]">
            {content.headline}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="max-w-sm text-base leading-relaxed text-black/65 lg:text-right">
            <Emphasis className="font-semibold text-black" phrase={content.emphasis} text={content.body} />
          </p>
        </ScrollReveal>
      </div>

      <hr className="thread mt-14" />

      <ul>
        {content.tools.map((tool, index) => (
          <li key={tool.title}>
            <ScrollReveal delay={index * 0.04}>
              <Link
                className="group -mx-4 grid gap-3 rounded-xl border-b border-black/15 px-4 py-7 transition-colors hover:bg-black/[0.03] md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_3rem] md:items-center md:gap-10 md:py-8"
                href={tool.href}
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-gold" />
                  <h3 className="font-display text-xl font-semibold uppercase leading-tight transition-colors group-hover:text-gold-shadow md:text-2xl">
                    {tool.title}
                  </h3>
                  {tool.label ? (
                    <span className="rounded-full border border-gold px-3 py-0.5 text-xs font-medium text-gold-shadow">
                      {tool.label}
                    </span>
                  ) : null}
                </div>
                <p className="text-[15px] leading-relaxed text-black/65 md:text-right">{tool.desc}</p>
                <span className="text-sm text-black/50 md:text-right">[0{index + 1}]</span>
              </Link>
            </ScrollReveal>
          </li>
        ))}
      </ul>

      {/* Pull quote and the four steps */}
      <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <ScrollReveal>
          <blockquote className="font-display text-2xl font-medium leading-snug md:text-3xl">
            &ldquo;{content.pullQuote}&rdquo;
          </blockquote>
        </ScrollReveal>
        <div>
          <p className="eyebrow mb-5">{content.fourStepsLabel}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.fourSteps.map((step, index) => (
              <ScrollReveal delay={index * 0.05} key={step.name}>
                <div className="border-t border-black pt-4">
                  <p className="font-display text-lg font-semibold">{step.name}</p>
                  <p className="mt-1 text-sm text-black/65">{step.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <ScrollReveal>
        <div className="mt-16 flex flex-col gap-6 border-t border-black/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl font-semibold md:text-3xl">{content.closingLine}</p>
          <ArrowButton href={content.cta.href} variant="dark">
            {content.cta.label}
          </ArrowButton>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
