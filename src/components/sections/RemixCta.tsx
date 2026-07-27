import Image from "next/image";
import { ArrowButton } from "@/components/ui/ArrowButton";

export const RemixCta = () => (
  <section className="bg-[#fffaf2] py-20">
    <div className="container-shell overflow-hidden rounded-[28px] bg-[#201a16] p-6 text-white md:p-10">
      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <p className="mb-4 text-sm text-white/45">STAY CLOSE</p>
          <h2 className="font-display text-4xl font-semibold leading-[0.98] md:text-7xl">
            You do not have to become louder to be heard here.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-white/62">
            Come back when you need words. Stay when you need softness. Take
            what helps, leave what does not, and let this space meet you gently.
          </p>
          <div className="mt-8">
            <ArrowButton href="/#quiet-circle" variant="accent">
              Join the Quiet Circle
            </ArrowButton>
          </div>
        </div>
        <div className="relative aspect-[1.55] overflow-hidden rounded-2xl border border-white/10">
          <Image
            alt="DK Jonah quiet reflection preview"
            className="object-cover"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            src="/assets/avenzor/images/template-hero-preview.png"
          />
        </div>
      </div>
    </div>
  </section>
);
