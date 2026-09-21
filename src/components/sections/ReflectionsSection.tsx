"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Article } from "@/content/articles";
import { reflectionsContent as content } from "@/content/home";

// The reference's "Design Journal" block: heading column on the left,
// the three latest essays as square image cards on the right, the button aligned under the cards.
export const ReflectionsSection = ({ essays }: { essays: Article[] }) => (
  <section className="paper section-padding" id="reflections">
    <div className="container-shell">
      <span aria-hidden="true" className="mx-auto mb-14 block h-2 w-2 rounded-full bg-gold md:mb-20" />

      <div className="grid gap-12 lg:grid-cols-[0.32fr_1fr] lg:gap-10">
        <ScrollReveal>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.02] text-balance sm:text-5xl lg:text-[3.5rem]">
            {content.headline}
          </h2>
          <p className="mt-8 max-w-xs text-base leading-relaxed text-black/65">{content.body}</p>
        </ScrollReveal>

        <div>
          <div className="grid gap-6 sm:grid-cols-3">
            {essays.map((essay, index) => (
              <ScrollReveal delay={index * 0.08} key={essay.slug}>
                <Link className="group block" href={`/articles/${essay.slug}`}>
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-dove-tint">
                    <Image
                      alt=""
                      className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
                      src={essay.image}
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-ivory px-3 py-1 text-xs font-medium text-black">
                      {essay.categories?.[0]?.name ?? "Reflection"}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-gold text-black opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 12h14m0 0-5-5m5 5-5 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-medium leading-snug transition-colors group-hover:text-gold-shadow md:text-xl">
                    {essay.title}
                  </h3>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-14 flex justify-end md:mt-20">
              <ArrowButton href={content.cta.href} variant="dark">
                {content.cta.label}
              </ArrowButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
);
