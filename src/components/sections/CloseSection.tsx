"use client";

import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { closeContent as content } from "@/content/home";

export const CloseSection = () => (
  <section className="on-black dotted relative overflow-hidden py-28 md:py-40" id="stay-close">
    <div className="container-shell relative text-center">
      <ScrollReveal>
        <p className="eyebrow eyebrow-on-black">{content.eyebrow}</p>
        <h2 className="mx-auto mt-8 max-w-5xl font-display text-4xl font-bold uppercase leading-[0.98] text-ivory text-balance sm:text-5xl md:text-6xl lg:text-[5.5rem]">
          {content.headline}
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ivory/75 md:text-lg">
          {content.body}
        </p>
      </ScrollReveal>

      {/* The reference's concentric arch, drawn in ivory and gold */}
      <div className="relative mx-auto mt-16 w-full max-w-md">
        <svg aria-hidden="true" className="h-auto w-full" fill="none" viewBox="0 0 400 200">
          <path d="M 20 200 A 180 180 0 0 1 380 200" stroke="rgba(243,237,224,0.18)" strokeDasharray="4 6" strokeWidth="1" />
          <path d="M 60 200 A 140 140 0 0 1 340 200" stroke="rgba(243,237,224,0.28)" strokeWidth="1" />
          <path d="M 100 200 A 100 100 0 0 1 300 200" stroke="#B8893A" strokeDasharray="6 6" strokeWidth="1.5" />
          <circle cx="200" cy="100" fill="#B8893A" r="4" />
        </svg>
        <div className="-mt-10 flex justify-center">
          <ArrowButton href={content.cta.href} size="lg" variant="gold">
            {content.cta.label}
          </ArrowButton>
        </div>
      </div>
    </div>
  </section>
);
