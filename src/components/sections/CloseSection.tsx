"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { closeContent as content } from "@/content/home";

const ease = [0.16, 1, 0.3, 1] as const;

// The gold arc: a half circle centred on (200, 200) with radius 100.
const CENTRE = 200;
const RADIUS = 100;

// The reference's concentric arch, drawn in ivory and gold. The arcs settle in one after another,
// the gold dashes drift, and the dot travels slowly back and forth along the gold arc like a breath.
const Arch = () => {
  const reduceMotion = useReducedMotion();
  const angle = useMotionValue(Math.PI / 2);
  const cx = useTransform(angle, (a) => CENTRE + RADIUS * Math.cos(a));
  const cy = useTransform(angle, (a) => CENTRE - RADIUS * Math.sin(a));

  useEffect(() => {
    if (reduceMotion) {
      angle.set(Math.PI / 2);
      return;
    }
    const controls = animate(angle, [Math.PI * 0.92, Math.PI * 0.08], {
      duration: 9,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    });
    return () => controls.stop();
  }, [angle, reduceMotion]);

  const arcs = [
    { d: "M 20 200 A 180 180 0 0 1 380 200", stroke: "rgba(243,237,224,0.18)", dash: "4 6", width: 1, drift: 30 },
    { d: "M 60 200 A 140 140 0 0 1 340 200", stroke: "rgba(243,237,224,0.28)", dash: undefined, width: 1, drift: 0 },
    { d: "M 100 200 A 100 100 0 0 1 300 200", stroke: "#B8893A", dash: "6 6", width: 1.5, drift: -24 },
  ];

  return (
    <svg aria-hidden="true" className="h-auto w-full overflow-visible" fill="none" viewBox="0 0 400 200">
      {arcs.map((arc, index) => (
        <motion.path
          animate={arc.drift && !reduceMotion ? { strokeDashoffset: [0, arc.drift] } : undefined}
          d={arc.d}
          initial={{ opacity: 0, scale: 0.92 }}
          key={arc.d}
          stroke={arc.stroke}
          strokeDasharray={arc.dash}
          strokeWidth={arc.width}
          style={{ transformOrigin: "200px 200px" }}
          transition={
            arc.drift && !reduceMotion
              ? {
                  strokeDashoffset: { duration: Math.abs(arc.drift) / 4, ease: "linear", repeat: Infinity },
                  opacity: { duration: 1, delay: index * 0.18, ease },
                  scale: { duration: 1.2, delay: index * 0.18, ease },
                }
              : { duration: 1, delay: index * 0.18, ease }
          }
          viewport={{ once: true, margin: "-80px 0px" }}
          whileInView={{ opacity: 1, scale: 1 }}
        />
      ))}

      {/* A quiet pulse around the dot */}
      {!reduceMotion ? (
        <motion.circle
          animate={{ r: [4, 16], opacity: [0.5, 0] }}
          fill="none"
          stroke="#B8893A"
          strokeWidth="1"
          style={{ cx, cy }}
          transition={{ duration: 2.6, ease: "easeOut", repeat: Infinity }}
        />
      ) : null}
      <motion.circle
        fill="#B8893A"
        initial={{ opacity: 0 }}
        r="4"
        style={{ cx, cy }}
        transition={{ duration: 0.8, delay: 0.7, ease }}
        viewport={{ once: true, margin: "-80px 0px" }}
        whileInView={{ opacity: 1 }}
      />
    </svg>
  );
};

export const CloseSection = () => (
  <section className="on-black dotted relative overflow-hidden py-28 md:py-40" id="stay-close">
    <div className="container-shell relative text-center">
      <ScrollReveal>
        <p className="eyebrow eyebrow-on-black">{content.eyebrow}</p>
        <h2 className="mx-auto mt-8 max-w-5xl font-display text-4xl font-bold uppercase leading-[0.98] text-ivory text-balance sm:text-5xl md:text-6xl lg:text-[5.5rem]">
          {content.headline}
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ivory/75 md:text-lg">
          {content.body}
        </p>
      </ScrollReveal>

      <div className="relative mx-auto mt-16 w-full max-w-md">
        <Arch />
        <div className="-mt-10 flex justify-center">
          <ArrowButton href={content.cta.href} size="lg" variant="gold">
            {content.cta.label}
          </ArrowButton>
        </div>
      </div>
    </div>
  </section>
);
