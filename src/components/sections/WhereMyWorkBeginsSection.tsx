"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { whereMyWorkBeginsContent as content } from "@/content/about";

// The reference's "My Story" block: a gold heading and one oversized paragraph.
export const WhereMyWorkBeginsSection = () => (
  <section className="section-padding bg-ivory" id="where-work-begins">
    <div className="container-shell">
      <div className="max-w-5xl lg:pl-[8%]">
        <ScrollReveal>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="thread-text mt-8 font-display text-2xl font-bold uppercase leading-[1.1] sm:text-3xl lg:text-[2.75rem]">
            {content.headline}
          </h2>
          <p className="mt-10 text-2xl font-medium leading-[1.3] sm:text-3xl lg:text-[2.6rem] lg:leading-[1.22]">
            {content.body}
          </p>
        </ScrollReveal>
      </div>
    </div>
  </section>
);
