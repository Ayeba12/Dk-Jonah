import Image from "next/image";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const RemixCta = () => (
  <section className="bg-[#fffaf2] py-20">
    <div className="container-shell overflow-hidden rounded-[28px] bg-[#201a16] p-6 text-white md:p-10">
      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <ScrollReveal>
          <div>
            <p className="mb-4 text-sm text-white/45">STAY CLOSE</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[2.5rem] lg:text-5xl xl:text-6xl font-semibold leading-[0.92]">
              You do not have to become louder to be heard here.
            </h2>
            <p className="mt-6 max-w-lg text-base sm:text-lg leading-7 sm:leading-8 text-white/62">
              Come back when you need words. Stay when you need softness. Take
              what helps, leave what does not, and let this space meet you gently.
            </p>
            <div className="mt-8">
              <ArrowButton href="/#quiet-circle" variant="accent">
                Join the Quiet Circle
              </ArrowButton>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="relative aspect-[1.55] overflow-hidden rounded-2xl border border-white/10">
            <Image
              alt="DK Jonah quiet reflection preview"
              className="object-cover"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              src="/assets/avenzor/images/stay-close.jpg"
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);
