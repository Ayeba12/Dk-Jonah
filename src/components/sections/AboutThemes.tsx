"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { tools } from "@/content/portfolio";

export const AboutThemes = () => {
  return (
    <section className="bg-[#f1e7d8] py-20" id="themes">
      <div className="container-shell grid gap-10 md:grid-cols-2">
        <ScrollReveal>
          <div>
            <p className="mb-4 text-sm text-[#7a7065]">[What This Space Believes]</p>
            <h2 className="font-display text-5xl font-semibold leading-none md:text-7xl">
              Slowness can still be sacred
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="grid gap-6">
            {tools.map(([tool, value], index) => (
              <div key={tool}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{tool}</span>
                  <span>{value}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[#ded2c1]">
                  <motion.div
                    className="h-full rounded-full bg-[#b68a3a]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                      delay: index * 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
