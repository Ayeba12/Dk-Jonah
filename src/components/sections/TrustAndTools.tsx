"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { testimonials, tools } from "@/content/portfolio";

export const TrustAndTools = () => (
  <>
    <section className="section-padding bg-[#fffaf2]">
      <div className="container-shell">
        <ScrollReveal>
          <SectionHeading
            align="left"
            intro="A few quiet reflections for the people this space is made to hold."
            label="[Reader Notes]"
            title="Words for the unseen parts"
          />
        </ScrollReveal>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((item, index) => (
            <ScrollReveal delay={index * 0.08} key={item.name}>
              <article className="h-full rounded-2xl border border-[#ded2c1] bg-[#f8f2e8] p-6">
                <div className="mb-10 flex items-center gap-4">
                  <Image
                    alt={item.name}
                    className="h-14 w-14 rounded-full object-cover"
                    height={56}
                    src={item.image}
                    width={56}
                  />
                  <div>
                    <h3 className="font-display text-xl font-medium">{item.name}</h3>
                    <p className="text-sm text-[#7a7065]">{item.role}</p>
                  </div>
                </div>
                <p className="text-xl leading-8">&quot;{item.quote}&quot;</p>
                <p className="mt-6 text-sm text-[#9a8f83]">{item.url}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
    <section className="bg-[#f1e7d8] py-20">
      <div className="container-shell grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
        <ScrollReveal>
          <div>
            <p className="mb-4 text-sm text-[#7a7065]">[Core Themes]</p>
            <h2 className="font-display text-5xl font-semibold leading-none md:text-7xl">
              The gentle framework
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-[#7a7065]">
              DK Jonah begins with rest, faith, language, and belonging before it
              ever asks you to do more.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="grid gap-5">
            {tools.map(([tool, value], index) => (
              <div key={tool}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{tool}</span>
                  <span>{value}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[#ded2c1]">
                  <motion.div
                    className="h-full rounded-full bg-[#201a16]"
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
            <div className="pt-5">
              <ArrowButton href="/about#themes">Read the Beliefs</ArrowButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </>
);
