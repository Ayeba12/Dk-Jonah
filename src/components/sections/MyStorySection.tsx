"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { myStoryContent, whyIDoThisWorkContent } from "@/content/about";

// Sections 3 and 4 share the reference's "Milestones" layout:
// a heading that stays put on the left, the account on the right.
export const MyStorySection = () => (
  <section className="paper section-padding">
    <div className="container-shell space-y-24 md:space-y-32">
      {/* Section 3 · Why I do this work */}
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:sticky lg:top-32 lg:text-[3rem]">
            {whyIDoThisWorkContent.headline}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="space-y-5 text-lg leading-relaxed text-black/75">
            {whyIDoThisWorkContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Section 4 · My story */}
      <div
        className="grid scroll-mt-28 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
        id={myStoryContent.anchor}
      >
        <ScrollReveal>
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">My story</p>
            <h2 className="mt-8 font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:text-[3rem]">
              {myStoryContent.headline}
            </h2>
          </div>
        </ScrollReveal>
        <div>
          <ol className="divide-y divide-black/15 border-t border-black/15">
            {myStoryContent.paragraphs.map((paragraph, index) => (
              <li key={paragraph}>
                <ScrollReveal delay={index * 0.05}>
                  <div className="grid gap-3 py-7 md:grid-cols-[28px_1fr]">
                    <span aria-hidden="true" className="mt-3 h-2 w-2 rounded-full bg-gold" />
                    <p className="text-lg leading-relaxed text-black/80">{paragraph}</p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
          <ScrollReveal>
            <blockquote className="mt-10 border-t border-black pt-6 font-display text-2xl font-medium leading-snug md:text-3xl">
              &ldquo;{myStoryContent.pullQuote}&rdquo;
            </blockquote>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
);
