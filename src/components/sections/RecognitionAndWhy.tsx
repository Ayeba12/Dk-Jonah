"use client";

import Link from "next/link";
import { Emphasis } from "@/components/ui/Emphasis";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { recognitionContent, whyThisSpaceExistsContent } from "@/content/home";

// Sections 2 and 3 share one black band, as the reference's "About Me" block does.
export const RecognitionAndWhy = () => (
  <section className="on-black dotted section-padding" id="recognition">
    <div className="container-shell">
      {/* Section 2 · Recognition */}
      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
        <ScrollReveal>
          <p className="eyebrow eyebrow-on-black">{recognitionContent.eyebrow}</p>
          <h2 className="mt-10 max-w-4xl font-display text-4xl font-bold uppercase leading-[1.02] text-ivory text-balance sm:text-5xl lg:text-[4.25rem]">
            {recognitionContent.headline}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="space-y-4 text-base leading-relaxed text-ivory/80 lg:ml-auto lg:max-w-sm">
            {recognitionContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <Emphasis
                  className="font-semibold text-ivory"
                  phrase={recognitionContent.emphasis}
                  text={paragraph}
                />
              </p>
            ))}
            <Link
              className="group inline-flex items-center gap-2 pt-2 text-sm text-champagne transition-colors hover:text-ivory"
              href={recognitionContent.articleLink.href}
            >
              <span className="underline decoration-champagne/50 underline-offset-4">
                {recognitionContent.articleLink.label}
              </span>
              <ArrowGlyph />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <span aria-hidden="true" className="mx-auto my-16 block h-2 w-2 rounded-full bg-gold md:my-20" />

      {/* Section 3 · Why this space exists, four beats */}
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {whyThisSpaceExistsContent.beats.map((beat, index) => (
          <ScrollReveal delay={index * 0.06} key={beat.quote}>
            <article>
              <p className="text-sm text-ivory/55">0{index + 1}</p>
              <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-ivory md:text-[22px]">
                &ldquo;{beat.quote}&rdquo;
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ivory/75">{beat.body}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const ArrowGlyph = () => (
  <svg
    aria-hidden="true"
    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14m0 0-5-5m5 5-5 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);
