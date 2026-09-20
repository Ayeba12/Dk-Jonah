"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type CountUpProps = {
  /** A number with an optional suffix, e.g. "300+" or "15". */
  value: string;
  className?: string;
  duration?: number;
};

// The real figure is in the markup from the start, so it shows even when no animation runs
// (server render, JavaScript off, reduced motion). When the number scrolls into view it counts up to itself.
export const CountUp = ({ value, className = "", duration = 1.6 }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();

  const match = value.match(/^(\d[\d,]*)(.*)$/);
  const target = match ? Number(match[1].replace(/,/g, "")) : NaN;
  const suffix = match ? match[2] : "";
  const [current, setCurrent] = useState(target);

  useEffect(() => {
    if (!inView || Number.isNaN(target) || reduceMotion) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setCurrent(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, target, duration, reduceMotion]);

  if (Number.isNaN(target)) {
    return (
      <span className={className} ref={ref}>
        {value}
      </span>
    );
  }

  return (
    <span aria-label={value} className={className} ref={ref}>
      {current.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
};
