"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { aboutHeroContent as content } from "@/content/about";

// Split hero, as the reference: stacked headline left, framed portrait right.
export const AboutHero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
    tl.fromTo(headingRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0 })
      .fromTo(bodyRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0 }, "-=0.6")
      .fromTo(frameRef.current, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 1.2 }, "-=0.7");
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="paper pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-14">
        <div className="flex flex-col justify-between">
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h1
              className="mt-8 font-display text-4xl font-bold uppercase leading-[1.0] text-balance sm:text-5xl lg:text-[4rem]"
              ref={headingRef}
            >
              {content.headline}
            </h1>
          </div>
          <p className="mt-10 max-w-md text-base leading-relaxed text-black/70 lg:mt-16" ref={bodyRef}>
            {content.body}
          </p>
        </div>

        <div
          className="relative min-h-[420px] overflow-hidden rounded-2xl bg-dove-tint lg:min-h-[600px]"
          ref={frameRef}
        >
          {/* DK's portrait, in place of the earlier film. */}
          <Image
            alt="DK Jonah"
            className="object-cover object-top"
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            src="/assets/avenzor/images/about-portrait.webp"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <p className="absolute inset-x-0 bottom-0 p-8 font-display text-2xl font-medium leading-tight text-ivory md:p-10 md:text-4xl">
            {content.titles.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
};
