"use client";

import Image from "next/image";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { socialLinks } from "@/content/navigation";
import {
  findMeHeroContent as hero,
  joinLiveContent,
  practicesContent,
  readSubscribeContent,
  shopContent,
  socialEmailContent,
  type PlaceCard,
} from "@/content/find-me";

// A button with the locked label. While DK's link is still to come it stays put and says so.
const CardButton = ({ card, variant = "dark" }: { card: PlaceCard; variant?: "dark" | "gold" }) =>
  card.href ? (
    <ArrowButton href={card.href} size="sm" variant={variant}>
      {card.cta}
    </ArrowButton>
  ) : (
    <div className="flex flex-wrap items-center gap-3">
      <ArrowButton aria-disabled="true" className="cursor-not-allowed opacity-60" size="sm" variant={variant}>
        {card.cta}
      </ArrowButton>
      <span className="text-xs text-black/50">Link to come</span>
    </div>
  );

// Section 1 · Hero. Words only, with the gold thread beneath.
export const FindMeHero = () => (
  <section className="paper pb-12 pt-32 md:pb-16 md:pt-40">
    <div className="container-shell">
      <p className="eyebrow">{hero.eyebrow}</p>
      <h1 className="mt-8 max-w-4xl font-display text-4xl font-bold uppercase leading-[1.0] text-balance sm:text-5xl lg:text-[4.5rem]">
        {hero.headline}
      </h1>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-black/75">{hero.body}</p>
      <hr className="thread mt-14" />
    </div>
  </section>
);

// Section 2 · My practices. Three picture cards with the text in a box floating over them.
const stagger = ["", "lg:mt-4", "lg:mt-8"];

export const PracticesSection = () => (
  <section className="paper pb-20 pt-4 md:pb-28" id="practices">
    <div className="container-shell">
      <ScrollReveal>
        <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] sm:text-4xl lg:text-[3.5rem]">
          {practicesContent.headline}
        </h2>
      </ScrollReveal>
      <div className="mt-12 grid gap-4 md:grid-cols-3 lg:items-start">
        {practicesContent.cards.map((card, index) => (
          <ScrollReveal className={stagger[index] ?? ""} delay={index * 0.06} key={card.title}>
            <div
              className={`relative flex min-h-[560px] flex-col overflow-hidden rounded-2xl bg-dove-tint md:min-h-[640px] ${
                index === practicesContent.cards.length - 1 ? "ring-2 ring-black" : ""
              }`}
            >
              <Image
                alt=""
                className="scale-[1.12] object-cover object-bottom"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                src={card.image}
              />
              <div className="relative m-3 rounded-xl bg-ivory p-5 shadow-[0_12px_30px_rgba(0,0,0,0.12)] md:p-6">
                <p className="font-display text-xl font-semibold uppercase leading-tight">{card.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-black/70">{card.desc}</p>
                <div className="mt-5">
                  <CardButton card={card} />
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

// Section 3 · Read and subscribe. Square picture cards, the words beneath, as the reference's grid.
export const ReadSubscribeSection = () => (
  <section className="section-padding bg-ivory" id="read">
    <div className="container-shell">
      <ScrollReveal>
        <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] sm:text-4xl lg:text-[3.5rem]">
          {readSubscribeContent.headline}
        </h2>
      </ScrollReveal>
      <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {readSubscribeContent.cards.map((card, index) => (
          <ScrollReveal delay={(index % 3) * 0.06} key={card.title}>
            <article className="flex h-full flex-col">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-dove-tint">
                <Image
                  alt=""
                  className="scale-[1.08] object-cover grayscale"
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  src={card.image}
                />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold leading-tight md:text-2xl">{card.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-black/70">{card.desc}</p>
              <div className="mt-auto pt-5">
                <CardButton card={card} />
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

// Sections 4 and 5 · Join me live, Shop. One wide card each, picture and words side by side.
const WideCard = ({ card, flip = false }: { card: PlaceCard; flip?: boolean }) => (
  <div className={`grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-dove-tint sm:aspect-[4/3] lg:aspect-square">
      <Image alt="" className="scale-[1.08] object-cover" fill sizes="(min-width: 1024px) 45vw, 100vw" src={card.image} />
    </div>
    <div>
      <h3 className="font-display text-3xl font-semibold leading-tight md:text-4xl">{card.title}</h3>
      <p className="mt-5 max-w-lg text-lg leading-relaxed text-black/75">{card.desc}</p>
      <div className="mt-8">
        <CardButton card={card} />
      </div>
    </div>
  </div>
);

export const JoinLiveSection = () => (
  <section className="paper section-padding" id="live">
    <div className="container-shell">
      <ScrollReveal>
        <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] sm:text-4xl lg:text-[3.5rem]">
          {joinLiveContent.headline}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="mt-12">
          <WideCard card={joinLiveContent.card} />
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export const ShopSection = () => (
  <section className="section-padding bg-dove-tint" id="shop">
    <div className="container-shell">
      <ScrollReveal>
        <h2 className="font-display text-3xl font-bold uppercase leading-[1.02] sm:text-4xl lg:text-[3.5rem]">
          {shopContent.headline}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="mt-12">
          <WideCard card={shopContent.card} flip />
        </div>
      </ScrollReveal>
    </div>
  </section>
);

// Section 6 · Social and email. A black band.
export const SocialEmailSection = () => (
  <section className="on-black dotted section-padding" id="social">
    <div className="container-shell grid gap-12 md:grid-cols-3 md:gap-8">
      <ScrollReveal>
        <p className="eyebrow eyebrow-on-black">{socialEmailContent.socialLabel}</p>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <a
                className="inline-block rounded-full border border-ivory/30 px-4 py-2 text-sm text-ivory transition-colors hover:border-champagne hover:text-champagne"
                href={link.href}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </ScrollReveal>
      <ScrollReveal delay={0.06}>
        <p className="eyebrow eyebrow-on-black">{socialEmailContent.emailLabel}</p>
        <a
          className="mt-5 inline-block font-display text-2xl font-semibold text-ivory transition-colors hover:text-champagne md:text-3xl"
          href={`mailto:${socialEmailContent.email}`}
        >
          {socialEmailContent.email}
        </a>
      </ScrollReveal>
      <ScrollReveal delay={0.12}>
        <p className="eyebrow eyebrow-on-black">{socialEmailContent.speakingLabel}</p>
        <p className="mt-5 max-w-xs text-base leading-relaxed text-ivory/80">{socialEmailContent.speakingLine}</p>
        <div className="mt-6">
          <ArrowButton href={socialEmailContent.speakingCta.href} variant="gold">
            {socialEmailContent.speakingCta.label}
          </ArrowButton>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
