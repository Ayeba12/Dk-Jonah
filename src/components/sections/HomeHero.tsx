"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { heroContent } from "@/content/home";

const ease = [0.16, 1, 0.3, 1] as const;
const POSTER = "/assets/avenzor/images/hero-poster.jpg";

export const HomeHero = () => {
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!videoWrapRef.current) return;
    const tween = gsap.fromTo(
      videoWrapRef.current,
      { scale: reduceMotion ? 1 : 1.06, opacity: 0 },
      { scale: 1, opacity: 1, duration: reduceMotion ? 0.6 : 2.2, ease: "power2.out" },
    );
    return () => {
      tween.kill();
    };
  }, [reduceMotion]);

  // The film runs slower than real time so the frame behind the words settles.
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.6;
  }, [reduceMotion]);

  return (
    // clip-path keeps the fixed film inside the hero's box, so it stays put while
    // the sections that follow slide over it.
    <section className="on-black relative min-h-svh [clip-path:inset(0)]">
      {/* Full-bleed monochrome film. DK's face stays in the right half; the words keep the left. */}
      <div className="fixed inset-0" ref={videoWrapRef}>
        {reduceMotion ? (
          // Reduced motion: the still poster frame instead of the film.
          <Image alt="" className="object-cover object-[70%_center] grayscale" fill priority sizes="100vw" src={POSTER} unoptimized />
        ) : (
          <video
            autoPlay
            className="h-full w-full object-cover object-[70%_center] grayscale"
            loop
            muted
            playsInline
            poster={POSTER}
            preload="metadata"
            ref={videoRef}
            src="/assets/avenzor/videos/hero-video.mp4"
          />
        )}
      </div>
      {/* Fixed scrim: solid behind the words, fading to clear across the face. It does not move with the film. */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.74)_42%,rgba(0,0,0,0.25)_68%,rgba(0,0,0,0)_100%)]" />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/80" />

      {/* Right gutter held at 32px or more on every width; the words never reach the edge. */}
      <div className="container-shell relative flex min-h-svh flex-col justify-end pb-8 pr-3 pt-40 md:pb-10 md:pr-0 md:pt-48 lg:pt-52">
        <div className="lg:max-w-[50%]">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl font-display text-3xl font-medium leading-[1.08] text-ivory text-balance sm:text-4xl lg:text-[2.9rem]"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            {heroContent.headline}
          </motion.h1>

          {/* Strapline: left-aligned, two lines on desktop. */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-7 max-w-md"
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
          >
            <span aria-hidden="true" className="mb-3 block h-2 w-2 rounded-full bg-gold" />
            <p className="text-lg leading-snug text-ivory/90 md:text-xl">{heroContent.identityLine}</p>
            <Link
              className="mt-4 inline-block text-sm text-ivory/75 underline decoration-ivory/40 underline-offset-4 transition-colors hover:text-champagne"
              href={heroContent.secondaryCta.href}
            >
              {heroContent.secondaryCta.label}
            </Link>
          </motion.div>
        </div>

        {/* Meta row: copyright, eyebrow, main button */}
        <motion.div
          animate={{ opacity: 1 }}
          className="mt-12 grid items-center gap-4 md:mt-14 md:grid-cols-[auto_1fr_auto]"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease }}
        >
          <span className="text-sm text-ivory/80">© 2026</span>
          <p className="text-sm text-ivory/80 md:text-center">{heroContent.eyebrow}</p>
          <ArrowButton href={heroContent.mainCta.href} size="sm" variant="light">
            {heroContent.mainCta.label}
          </ArrowButton>
        </motion.div>

        {/* Name row. The wordmark keeps its original size at Nate's request. */}
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          aria-label="DK Jonah"
          className="wordmark-fade mt-6 font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-[-0.03em] md:text-[12.5vw]"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 1.2, delay: 0.9, ease }}
        >
          {heroContent.name}
        </motion.p>

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
