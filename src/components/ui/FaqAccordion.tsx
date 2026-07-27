"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

type FaqAccordionProps = {
  items: string[][];
};

export const FaqAccordion = ({ items }: FaqAccordionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const active = activeIndex === index;
      const icon = iconRefs.current[index];

      if (active) {
        // Animate height to auto
        gsap.to(ref, {
          height: "auto",
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
        // Rotate plus to look like an X
        if (icon) {
          gsap.to(icon, {
            rotation: 135,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      } else {
        // Animate height to 0
        gsap.to(ref, {
          height: 0,
          duration: 0.3,
          ease: "power2.inOut",
          overwrite: "auto",
        });
        // Rotate plus back to normal
        if (icon) {
          gsap.to(icon, {
            rotation: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }
    });
  }, [activeIndex]);

  return (
    <div className="border-t border-[#ded2c1]">
      {items.map(([question, answer], index) => {
        const active = activeIndex === index;

        return (
          <div className="border-b border-[#ded2c1]" key={question}>
            <button
              className="flex w-full items-center justify-between gap-6 py-6 text-left group"
              onClick={() => setActiveIndex(active ? -1 : index)}
              type="button"
            >
              <span className="font-display text-2xl font-medium text-[#201a16] group-hover:text-[#b68a3a] transition-colors duration-300">
                {question}
              </span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fffaf2] text-xl border border-[#ded2c1] shadow-xs group-hover:bg-[#ead9ad]/20 transition-all duration-300">
                <span
                  ref={(el) => {
                    iconRefs.current[index] = el;
                  }}
                  className="inline-block leading-none"
                  style={{
                    transformOrigin: "center",
                    transform: index === 0 ? "rotate(135deg)" : "none",
                  }}
                >
                  +
                </span>
              </span>
            </button>
            <div
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              className="overflow-hidden"
              style={{ height: index === 0 ? "auto" : 0 }}
            >
              <p className="max-w-3xl pb-6 text-lg leading-8 text-[#7a7065]">
                {answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
