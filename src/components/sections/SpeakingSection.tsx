"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { speakingContent as content } from "@/content/home";

export const SpeakingSection = () => (
  <section className="section-padding bg-dove-tint" id="speaking">
    <div className="container-shell grid gap-12 lg:grid-cols-2 lg:gap-16">
      <ScrollReveal>
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 className="mt-8 font-display text-4xl font-bold leading-[1.05] text-balance sm:text-5xl lg:text-[3.5rem]">
          {content.headline}
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-black/75">{content.body}</p>
        <p className="mt-6 text-sm font-medium">{content.credibility}</p>

        <div className="mt-10">
          <p className="font-display text-lg font-semibold uppercase">{content.whereISpeakLabel}</p>
          <ul className="mt-3 grid gap-x-8 gap-y-2 text-[15px] text-black/70 sm:grid-cols-2">
            {content.whereISpeak.map((room) => (
              <li className="flex items-center gap-3" key={room}>
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {room}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <ArrowButton href={content.mainCta.href} variant="dark">
            {content.mainCta.label}
          </ArrowButton>
          <Link
            className="text-sm underline decoration-black/30 underline-offset-4 transition-colors hover:text-gold-shadow"
            href={content.secondaryCta.href}
          >
            {content.secondaryCta.label}
          </Link>
        </div>
      </ScrollReveal>

      {/* Topic cards: a monochrome picture that fits the topic, type set over a dark fade */}
      <div className="grid gap-4 sm:grid-cols-2">
        {content.themes.map((theme, index) => (
          <ScrollReveal delay={index * 0.06} key={theme.topic}>
            <Link
              className="group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl bg-black p-7 text-ivory md:min-h-[380px]"
              href={content.secondaryCta.href}
            >
              {theme.image ? (
                <Image
                  alt=""
                  className="object-cover opacity-80 grayscale transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  src={theme.image}
                />
              ) : (
                <span aria-hidden="true" className="dotted on-black absolute inset-0" />
              )}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"
              />
              <p className="relative text-xs uppercase tracking-wide text-champagne">{theme.category}</p>
              <h3 className="relative mt-10 font-display text-xl font-semibold leading-tight md:text-2xl">
                {theme.topic}
              </h3>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);
