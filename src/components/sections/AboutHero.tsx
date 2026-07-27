"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const AboutHero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
    
    tl.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
      .fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, "-=0.7")
      .fromTo(videoWrapperRef.current, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 1.4 }, "-=0.7");
  }, []);

  return (
    <section className="bg-[#201a16] px-4 pb-20 pt-28 text-white">
      <div className="container-shell">
        <div className="mb-12 max-w-xl">
          <p ref={labelRef} className="mb-5 text-sm text-white/45">[About DK Jonah]</p>
          <h1 ref={headingRef} className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-semibold leading-[1.05]">
            A voice for softness, invisible realities, and faith that makes room.
          </h1>
        </div>
        <div ref={videoWrapperRef} className="relative aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
            src="/assets/avenzor/videos/about-hero-video.mp4"
          />
        </div>
      </div>
    </section>
  );
};
