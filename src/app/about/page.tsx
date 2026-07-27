import Image from "next/image";
import type { Metadata } from "next";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { philosophyItems, stats, tools } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "About",
  description:
    "About DK Jonah, a voice for softness, invisible realities, and faith that makes room.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-[#201a16] px-4 pb-20 pt-28 text-white">
        <div className="container-shell grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-5 text-sm text-white/45">[About DK Jonah]</p>
            <h1 className="font-display text-6xl font-semibold leading-none md:text-8xl">
              A voice for softness, invisible realities, and faith that makes room.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-white/62">
              DK Jonah is a personal and communal space for chronic illness,
              neurodiversity, tender faith, and the quiet process of becoming.
            </p>
          </div>
          <div className="relative aspect-[1.1] overflow-hidden rounded-[28px] border border-white/10">
            <Image
              alt="DK Jonah quiet reflection preview"
              className="object-cover grayscale"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              src="/assets/avenzor/images/template-hero-preview.png"
            />
          </div>
        </div>
      </section>
      <section className="section-padding bg-[#fffaf2]">
        <div className="container-shell">
          <SectionHeading
            intro="This is not a brand built from perfection. It is built from recognition."
            label="[The Story]"
            title="For the person who still wants a full life, even if it moves differently"
          />
          <div className="grid gap-4 md:grid-cols-4">
            {philosophyItems.map((item) => (
              <article className="rounded-2xl border border-[#ded2c1] bg-[#f8f2e8] p-6" key={item.title}>
                <p className="mb-8 text-sm text-[#9a8f83]">{item.title}</p>
                <h2 className="font-display text-2xl font-medium">
                  &quot;{item.quote}&quot;
                </h2>
                <p className="mt-5 leading-7 text-[#7a7065]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#f1e7d8] py-20" id="themes">
        <div className="container-shell grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm text-[#7a7065]">[What This Space Believes]</p>
            <h2 className="font-display text-5xl font-semibold leading-none md:text-7xl">
              Slowness can still be sacred
            </h2>
          </div>
          <div className="grid gap-6">
            {tools.map(([tool, value]) => (
              <div key={tool}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{tool}</span>
                  <span>{value}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#ded2c1]">
                  <div className="h-full rounded-full bg-[#b68a3a]" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-[#fffaf2]">
        <div className="container-shell">
          <div className="grid gap-4 md:grid-cols-4">
            {stats.map(([value, label, text]) => (
              <article className="border-t border-[#201a16] pt-5" key={label}>
                <p className="font-display text-5xl font-semibold">{value}</p>
                <h3 className="mt-5 font-display text-xl font-medium">{label}</h3>
                <p className="mt-3 text-sm leading-6 text-[#7a7065]">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-12">
            <ArrowButton href="/#quiet-circle">Join the Quiet Circle</ArrowButton>
          </div>
        </div>
      </section>
    </>
  );
}
