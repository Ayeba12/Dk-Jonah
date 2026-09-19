"use client";

import React from "react";
import { motion } from "framer-motion";

type ScrollRevealProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
};

// A single, quiet entrance: content is already 60% visible and settles into place.
export const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.7,
  yOffset = 18,
  className = "",
}: ScrollRevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0.4, y: yOffset }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px 0px" }}
    transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);
