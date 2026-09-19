"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { myPromiseContent, whatIBelieveContent } from "@/content/about";

export const BeliefsAndPromiseSection = () => (
  <section className="paper section-padding" id="beliefs">
    <div className="container-shell space-y-24 md:space-y-32">
      {/* Section 7 · What I believe, as the reference's row list */}
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:sticky lg:top-32 lg:text-[3rem]">
            {whatIBelieveContent.headline}
          </h2>
        </ScrollReveal>
        <ol className="divide-y divide-black/15 border-y border-black/15">
          {whatIBelieveContent.beliefs.map((belief, index) => (
            <li key={belief.principle}>
              <ScrollReveal delay={index * 0.04}>
                <div className="grid gap-2 py-6 md:grid-cols-2 md:items-baseline md:gap-8">
                  <h3 className="font-display text-xl font-semibold leading-tight md:text-2xl">
                    {belief.principle}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-black/70 md:text-base">{belief.detail}</p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>

      {/* Section 8 · My promise to you */}
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16" id="promise">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:sticky lg:top-32 lg:text-[3rem]">
            {myPromiseContent.headline}
          </h2>
        </ScrollReveal>
        <ul>
          {myPromiseContent.promises.map((promise, index) => (
            <li key={promise}>
              <ScrollReveal delay={index * 0.04}>
                <div className="flex gap-5 border-b border-black/15 py-6">
                  <span aria-hidden="true" className="mt-3 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  <p className="font-display text-xl font-medium leading-snug md:text-2xl">{promise}</p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
