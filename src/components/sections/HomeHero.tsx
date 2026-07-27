"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { profile } from "@/content/portfolio";

export const HomeHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Elegant background image slow parallax/zoom-out using GSAP
    if (bgImageRef.current) {
      gsap.fromTo(
        bgImageRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.2, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <section className="grain min-h-screen overflow-hidden px-4 pb-6 pt-24 text-white">
      <div
        ref={containerRef}
        className="container-shell relative min-h-[calc(100vh-120px)] max-w-full overflow-hidden rounded-[28px] border border-white/12 bg-[#111] shadow-2xl shadow-black/35"
      >
        <div ref={bgImageRef} className="absolute inset-0 h-full w-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover object-[58%_center] md:object-center"
            src="/assets/avenzor/videos/hero-video.mp4"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30" />

        <div className="relative z-10 grid min-h-[calc(100vh-120px)] grid-rows-[1fr_auto] p-5 md:p-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.3 },
              },
            }}
            className="grid grid-cols-1 content-start items-start gap-x-10 gap-y-5 text-sm leading-5 text-white/82 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              © 2026
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              className="hidden max-w-[24rem] md:block"
            >
              {profile.role}
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              className="hidden max-w-[24rem] md:block text-right"
            >
              {profile.tagline}
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              className="hidden md:block md:justify-self-start xl:justify-self-end"
            >
              <ArrowButton href="/#quiet-circle" size="sm" variant="light">
                Join the Quiet Circle
              </ArrowButton>
            </motion.div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="max-w-full font-display text-[18vw] font-bold leading-[0.78] tracking-normal text-black/62 mix-blend-multiply sm:leading-[0.72] md:text-[12vw]">
                {profile.name}
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
              className="hidden max-w-xs justify-self-end text-right text-base leading-6 text-white/78 md:mb-8 md:block"
            >
              Chronic illness. Neurodiversity. Faith. Softness. Honest becoming.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};
