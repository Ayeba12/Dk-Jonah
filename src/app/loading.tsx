"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fffaf2]">
      <div className="relative flex items-center justify-center">
        {/* Animated outer circle track (fine line color) */}
        <svg width="140" height="140" viewBox="0 0 140 140" className="absolute">
          <circle
            cx="70"
            cy="70"
            r="60"
            stroke="#ded2c1"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="6 6"
            className="opacity-60"
          />
        </svg>

        {/* Orbiting dot container rotating infinitely */}
        <motion.svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          className="absolute"
        >
          <circle cx="70" cy="10" r="4.5" fill="#b68a3a" className="shadow-sm" />
        </motion.svg>

        {/* Brand logo in the center */}
        <div className="relative h-10 w-24 select-none pointer-events-none">
          <Image
            alt="DK Jonah logo"
            className="object-contain"
            fill
            priority
            src="/assets/avenzor/images/website-logo.png"
          />
        </div>
      </div>
    </div>
  );
}
