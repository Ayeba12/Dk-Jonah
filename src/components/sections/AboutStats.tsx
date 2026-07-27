"use client";

import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { stats } from "@/content/portfolio";

export const AboutStats = () => {
  return (
    <section className="section-padding bg-[#fffaf2]">
      <div className="container-shell">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map(([value, label, text], index) => (
            <ScrollReveal delay={index * 0.12} key={label}>
              <article className="border-t border-[#201a16] pt-5">
                <p className="font-display text-5xl font-semibold">{value}</p>
                <h3 className="mt-5 font-display text-xl font-medium">{label}</h3>
                <p className="mt-3 text-sm leading-6 text-[#7a7065]">{text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.4}>
          <div className="mt-12">
            <ArrowButton href="/#quiet-circle">Join the Quiet Circle</ArrowButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
