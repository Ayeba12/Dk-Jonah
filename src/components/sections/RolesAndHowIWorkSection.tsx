"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { howIWorkContent, rolesIPlayContent } from "@/content/about";

export const RolesAndHowIWorkSection = () => (
  <section className="section-padding bg-ivory" id="roles">
    <div className="container-shell">
      {/* Section 5 · The roles I play */}
      <ScrollReveal>
        <h2 className="max-w-3xl font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:text-[3.5rem]">
          {rolesIPlayContent.headline}
        </h2>
      </ScrollReveal>
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rolesIPlayContent.roles.map((role, index) => (
          <li key={role.title}>
            <ScrollReveal delay={index * 0.05}>
              <div className="flex h-full flex-col rounded-2xl bg-dove-tint p-7 md:p-8">
                <span className="text-sm text-black/50">0{index + 1}</span>
                <h3 className="mt-8 font-display text-xl font-semibold leading-tight md:text-2xl">
                  {role.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-black/70">{role.desc}</p>
              </div>
            </ScrollReveal>
          </li>
        ))}
      </ol>

      {/* Section 6 · How I work, as the reference's "My Approach" cards */}
      <div className="mt-24 md:mt-32" id="how-i-work">
        <ScrollReveal>
          <p className="eyebrow">How I work</p>
          <h2 className="mt-8 max-w-3xl font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:text-[3.5rem]">
            {howIWorkContent.headline}
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {howIWorkContent.pillars.map((pillar, index) => (
            <ScrollReveal delay={index * 0.06} key={pillar.label}>
              <div className="flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl bg-ivory-deep p-7">
                <p className="text-xs uppercase tracking-wide text-gold-shadow">{pillar.label}</p>
                <p className="mt-10 font-display text-lg font-semibold leading-snug md:text-xl">
                  {pillar.text}
                </p>
                <hr className="thread mt-8" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
