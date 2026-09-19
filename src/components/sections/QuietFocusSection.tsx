"use client";

import { ArrowButton } from "@/components/ui/ArrowButton";
import { Emphasis } from "@/components/ui/Emphasis";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { quietFocusContent } from "@/content/home";

export const QuietFocusSection = () => (
  <section className="on-black dotted section-padding" id="quiet-focus">
    <div className="container-shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
      <ScrollReveal>
        <p className="eyebrow eyebrow-on-black">{quietFocusContent.eyebrow}</p>
        <h2 className="mt-8 font-display text-4xl font-bold uppercase leading-[1.02] text-ivory sm:text-5xl lg:text-[4.25rem]">
          {quietFocusContent.headline}
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/80">
          <Emphasis
            className="font-semibold text-ivory"
            phrase={quietFocusContent.emphasis}
            text={quietFocusContent.body}
          />
        </p>
        <blockquote className="mt-10 max-w-lg border-t border-ivory/15 pt-6">
          <p className="font-display text-2xl font-medium leading-snug text-champagne md:text-3xl">
            &ldquo;{quietFocusContent.pullQuote}&rdquo;
          </p>
        </blockquote>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="lg:pt-14">
          <p className="font-display text-xl font-semibold uppercase text-ivory">
            {quietFocusContent.whatArrivesLabel}
          </p>
          <ul className="mt-4 divide-y divide-ivory/15 border-y border-ivory/15">
            {quietFocusContent.whatArrives.map((item) => (
              <li className="flex gap-5 py-5" key={item.lead}>
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <p className="text-base leading-relaxed text-ivory/85">
                  <strong className="font-semibold text-ivory">{item.lead}</strong>
                  {item.rest}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-start gap-3">
            <ArrowButton href={quietFocusContent.cta.href} variant="gold">
              {quietFocusContent.cta.label}
            </ArrowButton>
            <p className="text-sm text-ivory/60">{quietFocusContent.subline}</p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
