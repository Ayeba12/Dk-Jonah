import Image from "next/image";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { profile } from "@/content/portfolio";

export const HomeHero = () => (
  <section className="grain min-h-screen overflow-hidden px-4 pb-6 pt-24 text-white">
    <div className="container-shell relative min-h-[calc(100vh-120px)] max-w-full overflow-hidden rounded-[28px] border border-white/12 bg-[#111] shadow-2xl shadow-black/35">
      <Image
        alt="Soft editorial portrait for DK Jonah"
        className="object-cover object-[58%_center] opacity-70 grayscale md:object-center"
        fill
        priority
        sizes="100vw"
        src="/assets/avenzor/images/hero-portrait.avif"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-transparent to-black/30" />
      <div className="relative z-10 grid min-h-[calc(100vh-120px)] grid-rows-[1fr_auto] p-5 md:p-8">
        <div className="grid grid-cols-1 content-start items-start gap-x-10 gap-y-5 text-sm leading-5 text-white/82 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
          <p>© 2026</p>
          <p className="hidden max-w-[24rem] md:block">{profile.role}</p>
          <p className="hidden max-w-[24rem] md:block xl:text-center">{profile.tagline}</p>
          <div className="hidden md:block md:justify-self-start xl:justify-self-end">
            <ArrowButton href="/#quiet-circle" size="sm" variant="light">
              Join the Quiet Circle
            </ArrowButton>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <h1 className="max-w-full font-display text-[18vw] font-bold leading-[0.78] tracking-normal text-black/62 mix-blend-multiply sm:leading-[0.72] md:text-[12vw]">
            {profile.name}
          </h1>
          <p className="hidden max-w-xs justify-self-end text-right text-base leading-6 text-white/78 md:mb-8 md:block">
            Chronic illness. Neurodiversity. Faith. Softness. Honest becoming.
          </p>
        </div>
      </div>
    </div>
  </section>
);
