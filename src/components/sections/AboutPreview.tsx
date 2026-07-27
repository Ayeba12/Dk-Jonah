"use client";

import { ArrowButton } from "@/components/ui/ArrowButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { philosophyItems, stats } from "@/content/portfolio";

export const AboutPreview = () => (
  <>
    <section className="section-padding bg-[#fffaf2]">
      <div className="container-shell">
        <ScrollReveal>
          <SectionHeading
            intro="Too many people are suffering in silence because their pain does not look obvious, their mind does not work in a straight line, or faith has been made to feel like another performance."
            label="[Why This Space Exists]"
            title="For everyone trying to keep up while quietly falling apart"
          />
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {philosophyItems.map((item, index) => (
            <ScrollReveal delay={index * 0.1} key={item.title}>
              <article className="h-full rounded-2xl border border-[#ded2c1] bg-[#f8f2e8] p-6 transition-colors hover:border-[#201a16]">
                <p className="mb-8 text-sm text-[#9a8f83]">{index + 1}. {item.title}</p>
                <h3 className="font-display text-2xl font-medium leading-tight">
                  &quot;{item.quote}&quot;
                </h3>
                <p className="mt-5 leading-7 text-[#7a7065]">{item.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-lg text-[#7a7065]">If these words feel familiar, there is room for you here.</p>
            <ArrowButton href="/about">Read More</ArrowButton>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <section className="bg-[#f1e7d8] py-16">
      <div className="container-shell">
        <ScrollReveal>
          <p className="mb-4 text-sm text-[#7a7065]">[You May Be Here Because]</p>
        </ScrollReveal>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
      </div>
    </section>
  </>
);
