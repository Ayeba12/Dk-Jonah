"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const paragraphsData = [
  "DK Jonah is a Nigerian writer, lifestyle brand founder, and wellness advocate whose work sits at the intersection of chronic illness, neurodiversity, and faith. She built her platform as a counter-narrative to the shame and silence that surrounds invisible struggles — the kind of pain that doesn't show on the outside but shapes a person's entire lived experience.",
  "Her profession is rooted in storytelling and advocacy. She writes with raw honesty about what it means to live a full life when your body, brain, or spirit doesn't match the pace the world expects of you. Through her blog, newsletter, and resource library, she creates spaces where people — particularly African women and women of faith — can find recognition, rest, and truth rather than performance or pressure.",
  "What sets her apart is the specificity of her voice. She addresses the gaps that exist in African and faith-based communities around mental health, productivity, and spiritual expectation — spaces where chronic illness is minimised, neurodivergence is masked, and prayer is offered as a substitute for real support. She doesn't position herself as someone who has it figured out. She positions herself as someone who chose to speak anyway.",
  "Her platform, DK Jonah, includes a blog called My Cozy Corner, a resource library called The Toolkit, and a community newsletter called The Quiet Circle — each one designed not just to inform, but to make her readers feel less alone.",
  "In her own words, she is building this as a digital legacy — a space that will outlast the moment and grow alongside the community it serves."
];

export const AboutNarrative = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const paragraphs = gsap.utils.toArray<HTMLElement>(".narrative-paragraph");
      
      paragraphs.forEach((p) => {
        const words = p.querySelectorAll(".narrative-word");
        
        gsap.fromTo(
          words,
          { opacity: 0.25 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: p,
              start: "top 80%",
              end: "bottom 55%",
              scrub: 0.5,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#fffaf2] pt-16 pb-4 md:pt-24 md:pb-6">
      <div className="container-shell" ref={containerRef}>
        <div className="mx-auto max-w-4xl space-y-8 md:space-y-12">
          {paragraphsData.map((paragraphText, pIndex) => {
            const words = paragraphText.split(" ");
            return (
              <p
                key={pIndex}
                className="narrative-paragraph font-display text-lg sm:text-2xl md:text-[28px] lg:text-[28px] font-medium leading-[1.4] lg:leading-[1.35] text-[#201a16]/90"
              >
                {words.map((word, wIndex) => (
                  <span
                    key={wIndex}
                    className="narrative-word inline opacity-25"
                  >
                    {word}{" "}
                  </span>
                ))}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
};
