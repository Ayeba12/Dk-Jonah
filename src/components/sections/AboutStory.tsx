"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { philosophyItems } from "@/content/portfolio";

export const AboutStory = () => {
  return (
    <section className="bg-[#fffaf2] pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="container-shell">
        <ScrollReveal>
          <SectionHeading
            intro="This is not a brand built from perfection. It is built from recognition."
            label="[The Story]"
            title="For the person who still wants a full life, even if it moves differently"
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {philosophyItems.map((item, index) => (
            <ScrollReveal delay={index * 0.12} key={item.title}>
              <article className="h-full rounded-2xl border border-[#ded2c1] bg-[#f8f2e8] p-6 transition-all duration-300 hover:border-[#201a16]">
                <p className="mb-8 text-sm text-[#9a8f83]">{item.title}</p>
                <h2 className="font-display text-2xl font-medium">
                  &quot;{item.quote}&quot;
                </h2>
                <p className="mt-5 leading-7 text-[#7a7065]">{item.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
