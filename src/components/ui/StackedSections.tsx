"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StackedSectionsProps = {
  children: ReactNode;
};

/**
 * One scroll idea for the whole page: each section holds in place while the
 * next one slides over it, like sheets laid on a desk. Short sections hold at
 * the top of the viewport; tall ones scroll through first, then hold at their
 * end so nothing becomes unreachable. The section underneath settles back
 * (a slight scale) and dims as it is covered. The first panel (the hero) keeps
 * its fixed background, so it only dims.
 */
export const StackedSections = ({ children }: StackedSectionsProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const panels = Children.toArray(children);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(":scope > .stack-panel"));

    const setOffsets = () => {
      const vh = window.innerHeight;
      items.forEach((panel) => {
        panel.style.top = `${Math.min(0, vh - panel.offsetHeight)}px`;
      });
      ScrollTrigger.refresh();
    };
    setOffsets();

    const observer = new ResizeObserver(() => setOffsets());
    items.forEach((panel) => observer.observe(panel));
    window.addEventListener("resize", setOffsets);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) return;
      items.forEach((panel, index) => {
        const next = items[index + 1];
        if (!next) return;
        const shade = panel.querySelector<HTMLElement>(".stack-shade");
        const inner = panel.querySelector<HTMLElement>(".stack-inner");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
        if (shade) timeline.to(shade, { opacity: 0.45, ease: "none" }, 0);
        if (inner && panel.dataset.scale !== "false") {
          timeline.to(inner, { scale: 0.96, ease: "none" }, 0);
        }
      });
    }, root);

    return () => {
      ctx.revert();
      observer.disconnect();
      window.removeEventListener("resize", setOffsets);
    };
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      {panels.map((panel, index) => (
        <div
          className="stack-panel sticky"
          data-scale={index === 0 ? "false" : undefined}
          key={index}
        >
          <div
            className={`stack-inner relative origin-top ${
              index === 0
                ? ""
                : "overflow-hidden rounded-t-[28px] shadow-[0_-24px_60px_rgba(0,0,0,0.22)]"
            }`}
          >
            {panel}
            <span
              aria-hidden="true"
              className="stack-shade pointer-events-none absolute inset-0 bg-black opacity-0"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
