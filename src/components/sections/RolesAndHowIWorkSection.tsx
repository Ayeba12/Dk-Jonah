"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { howIWorkContent, rolesIPlayContent } from "@/content/about";

const stagger = ["", "lg:mt-4", "lg:mt-8"];

export const RolesAndHowIWorkSection = () => (
  <section className="section-padding bg-ivory" id="roles">
    <div className="container-shell">
      {/* Section 5 · The roles I play */}
      <ScrollReveal>
        <h2 className="max-w-3xl font-display text-3xl font-bold uppercase leading-[1.02] text-balance sm:text-4xl lg:text-[3.5rem]">
          {rolesIPlayContent.headline}
        </h2>
      </ScrollReveal>
      {/* Picture cards with the text in a box floating over them, each column stepping down a little */}
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
        {rolesIPlayContent.roles.map((role, index) => (
          <li className={stagger[index % stagger.length]} key={role.title}>
            <ScrollReveal delay={(index % 3) * 0.05}>
              <div
                className={`relative aspect-[3/4] overflow-hidden rounded-2xl bg-dove-tint ${
                  index === rolesIPlayContent.roles.length - 1 ? "ring-2 ring-black" : ""
                }`}
              >
                <Image
                  alt=""
                  className="scale-[1.12] object-cover"
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  src={role.image}
                />
                <div className="absolute inset-x-3 top-3 rounded-xl bg-ivory p-5 shadow-[0_12px_30px_rgba(0,0,0,0.12)] md:p-6">
                  <p className="font-display text-lg font-semibold uppercase leading-tight md:text-xl">
                    {role.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-black/70">{role.desc}</p>
                </div>
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
