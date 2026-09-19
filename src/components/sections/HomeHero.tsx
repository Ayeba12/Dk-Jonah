"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { heroContent } from "@/content/home";

const ease = [0.16, 1, 0.3, 1] as const;

export const HomeHero = () => {
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoWrapRef.current) return;
    const tween = gsap.fromTo(
      videoWrapRef.current,
      { scale: 1.08, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.2, ease: "power2.out" }
    );
    return () => {
      tween.kill();
    };
  }, []);

  return (
    // clip-path keeps the fixed film inside the hero's box, so it stays put while
    // the sections that follow slide over it.
    <section className="on-black relative min-h-svh [clip-path:inset(0)]">
      {/* Full-bleed monochrome film, as the reference uses a monochrome portrait. */}
      <div className="fixed inset-0" ref={videoWrapRef}>
        <video
          autoPlay
          className="h-full w-full object-cover object-[62%_center] grayscale md:object-center"
          loop
          muted
          playsInline
          src="/assets/avenzor/videos/hero-video.mp4"
        />
      </div>
      <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-black/15 to-black/90" />

      <div className="container-shell relative flex min-h-svh flex-col justify-end pb-8 pt-32 md:pb-10">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl font-display text-4xl font-medium leading-[1.06] text-ivory text-balance sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 1, delay: 0.3, ease }}
        >
          {heroContent.headline}
        </motion.h1>

        {/* Meta row: copyright, eyebrow, main button */}
        <motion.div
          animate={{ opacity: 1 }}
          className="mt-12 grid items-center gap-4 border-t border-ivory/20 pt-6 md:mt-16 md:grid-cols-[auto_1fr_auto]"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease }}
        >
          <span className="text-sm text-ivory/80">© 2026</span>
          <p className="text-sm text-ivory/80 md:text-center">{heroContent.eyebrow}</p>
          <ArrowButton href={heroContent.mainCta.href} size="sm" variant="light">
            {heroContent.mainCta.label}
          </ArrowButton>
        </motion.div>

        {/* Name row */}
        <div className="mt-6 grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            aria-label="DK Jonah"
            className="wordmark-fade font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[-0.03em] md:text-[12.5vw]"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 1.2, delay: 0.7, ease }}
          >
            {heroContent.name}
          </motion.p>

          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="max-w-xs md:pb-3 md:text-right"
            initial={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.9, delay: 0.95, ease }}
          >
            <span aria-hidden="true" className="mb-3 inline-block h-2 w-2 rounded-full bg-gold" />
            <p className="text-base leading-snug text-ivory/85">{heroContent.identityLine}</p>
            <Link
              className="mt-3 inline-block text-sm text-ivory/70 underline decoration-ivory/40 underline-offset-4 transition-colors hover:text-champagne"
              href={heroContent.secondaryCta.href}
            >
              {heroContent.secondaryCta.label}
            </Link>
          </motion.div>
        </div>

        <motion.p
          animate={{ opacity: 1 }}
          className="mt-5 text-sm text-ivory/70 md:text-base"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease }}
        >
          {heroContent.lineUnderName}
        </motion.p>
      </div>
    </section>
  );
};
