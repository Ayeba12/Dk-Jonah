"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type CountUpProps = {
  /** A number with an optional suffix, e.g. "300+" or "15". */
  value: string;
  className?: string;
  duration?: number;
};

// Counts from zero to the number the first time it scrolls into view.
export const CountUp = ({ value, className = "", duration = 1.6 }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduceMotion = useReducedMotion();

  const match = value.match(/^(\d[\d,]*)(.*)$/);
  const target = match ? Number(match[1].replace(/,/g, "")) : NaN;
  const suffix = match ? match[2] : "";
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;
    const controls = animate(0, target, {
      duration: reduceMotion ? 0 : duration,
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
