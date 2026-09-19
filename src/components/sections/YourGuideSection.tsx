"use client";

import { ArrowButton } from "@/components/ui/ArrowButton";
import { CountUp } from "@/components/ui/CountUp";
import { Emphasis } from "@/components/ui/Emphasis";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { yourGuideContent } from "@/content/home";

export const YourGuideSection = () => (
  <section className="paper section-padding" id="your-guide">
    <div className="container-shell">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <ScrollReveal>
          <p className="eyebrow">{yourGuideContent.eyebrow}</p>
          <h2 className="mt-8 font-display text-4xl font-bold leading-[1.05] text-balance sm:text-5xl lg:text-[3.5rem]">
            {yourGuideContent.headline}
          </h2>
          <p className="mt-8 text-sm text-black/60">
            {yourGuideContent.titles.join(" · ")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="space-y-5 text-lg leading-relaxed text-black/75 lg:pt-2">
            {yourGuideContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <Emphasis
                  className="font-semibold text-black"
                  phrase={yourGuideContent.emphasis}
                  text={paragraph}
                />
              </p>
            ))}
          </div>
          <div className="mt-10">
            <ArrowButton href={yourGuideContent.cta.href} variant="dark">
              {yourGuideContent.cta.label}
            </ArrowButton>
          </div>
        </ScrollReveal>
      </div>

      {/* Stats, as the reference's track-record cards */}
      <div className="mt-20 grid grid-cols-2 gap-3 md:mt-28 md:gap-4 lg:grid-cols-4">
        {yourGuideContent.stats.map((stat, index) => (
          <ScrollReveal delay={index * 0.06} key={stat.label}>
            <div className="flex min-h-[200px] flex-col justify-between rounded-2xl bg-dove-tint p-5 md:min-h-[300px] md:p-8">
              <p className="font-display text-base font-semibold uppercase leading-tight md:text-lg">
                {stat.label}
              </p>
              <div>
                <p className="thread-text font-display text-5xl font-bold leading-none tracking-[-0.03em] md:text-7xl">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-4 text-sm leading-snug text-black/60">{stat.note}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);
