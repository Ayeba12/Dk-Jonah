"use client";

import React from "react";
import { motion } from "framer-motion";

type ScrollRevealProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
};

export const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 30,
  xOffset = 0,
}: ScrollRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px 0px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom premium ease-out
      }}
    >
      {children}
    </motion.div>
  );
};
