"use client";

import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { noGraGraContent, whyStartNowContent } from "@/content/about";

export const NoGraGraAndWhyStartSection = () => {
  const statements = noGraGraContent.lines.slice(0, -1);
  const closing = noGraGraContent.lines[noGraGraContent.lines.length - 1];

  return (
    <>
      {/* Section 9 · NO GraGra, a black statement band */}
      <section className="on-black dotted py-24 md:py-36" id="no-gragra">
        <div className="container-shell">
          <ScrollReveal>
            <p className="eyebrow eyebrow-on-black">NO GraGra</p>
            <h2 className="mt-8 text-base font-medium text-ivory/75">{noGraGraContent.headline}</h2>
            <div className="mt-8 space-y-1">
              {statements.map((line) => (
                <p
                  className="font-display text-4xl font-bold uppercase leading-[1.0] text-ivory sm:text-5xl lg:text-[5rem]"
                  key={line}
                >
                  {line}
                </p>
              ))}
            </div>
            <p className="thread-text mt-10 font-display text-3xl font-bold uppercase leading-none sm:text-4xl lg:text-[3.5rem]">
              {closing}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 10 · Why start now */}
      <section className="paper section-padding" id="why-start-now">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal>
              <h2 className="font-display text-4xl font-bold uppercase leading-[1.02] sm:text-5xl lg:text-[4rem]">
                {whyStartNowContent.headline}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="space-y-4 text-lg leading-relaxed text-black/75">
                {whyStartNowContent.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {whyStartNowContent.waysIn.map((way, index) => (
              <ScrollReveal delay={index * 0.06} key={way.title}>
                <div className="flex h-full min-h-[260px] flex-col justify-between rounded-2xl bg-dove-tint p-7 md:p-8">
                  <div>
                    <h3 className="font-display text-xl font-semibold leading-tight md:text-2xl">{way.title}</h3>
                    <p className="mt-2 text-[15px] text-black/65">{way.desc}</p>
                  </div>
                  <div className="mt-8">
                    <ArrowButton href={way.href} size="sm" variant="dark">
                      {way.cta}
                    </ArrowButton>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
