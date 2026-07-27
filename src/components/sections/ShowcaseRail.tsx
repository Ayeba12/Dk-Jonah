"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const quietMoments = [
  {
    alt: "Hands journaling in soft morning light with tea and linen",
    description:
      "A gentle check-in before the world gets loud, with room for the body, mind, and spirit to answer honestly.",
    src: "/assets/avenzor/images/quiet-moment-journaling.webp",
    title: "Morning Pages",
  },
  {
    alt: "Cozy reading chair with an open book and warm window light",
    description:
      "A soft corner for reading slowly, resting honestly, and letting quiet become its own form of care.",
    src: "/assets/avenzor/images/quiet-moment-reading.webp",
    title: "Window Rest",
  },
  {
    alt: "Evening journal with tea, soft bedding, and a quiet faith symbol",
    description:
      "A small evening ritual for faith, questions, tenderness, and the thoughts that need somewhere safe to land.",
    src: "/assets/avenzor/images/quiet-moment-evening.webp",
    title: "Evening Exhale",
  },
  {
    alt: "Sunlit window ledge with tea, linen, and a closed journal",
    description:
      "Light, linen, tea, and a slower return to the world without carrying more than the day truly asks.",
    src: "/assets/avenzor/images/quiet-moment-window.webp",
    title: "Soft Return",
  },
];

const quietRhythm = [
  "Notice the body",
  "Name one honest thing",
  "Pray or breathe softly",
  "Take the next gentle step",
];

export const ShowcaseRail = () => {
  const [activeMoment, setActiveMoment] = useState<
    (typeof quietMoments)[number] | null
  >(null);

  useEffect(() => {
    if (!activeMoment) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMoment(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeMoment]);

  return (
    <section className="overflow-hidden bg-[#201a16] py-20 text-white md:py-24 xl:py-28">
      <div className="container-shell">
        <ScrollReveal>
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-medium text-[#ead9ad]">
                [Quiet Moments]
              </p>
              <h2 className="font-display text-4xl font-semibold leading-[0.98] md:text-5xl lg:text-6xl">
                Small pauses for the parts of life that need tenderness
              </h2>
            </div>
            <div className="max-w-2xl text-base leading-7 text-white/62 md:text-lg lg:justify-self-end lg:text-right">
              <p>
                These scenes shape the DK Jonah world: warm light, honest pages,
                tea, rest, faith, and softness that does not have to explain
                itself.
              </p>
              <p className="mt-4 text-white/45">
                They are not escapes from real life. They are invitations to
                return to it with more language, care, and belonging.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-x-5 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
          {quietMoments.map((moment, index) => (
            <ScrollReveal delay={index * 0.1} key={moment.src}>
              <article className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <Image
                    alt={moment.alt}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    fill
                    loading="eager"
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    src={moment.src}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <h3 className="font-display text-base font-medium leading-none">
                    {moment.title}
                  </h3>
                  <button
                    aria-haspopup="dialog"
                    aria-label={`Read description for ${moment.title}`}
                    className="flex items-center gap-1 rounded-full border border-[#ead9ad]/30 px-3 py-1 text-xs font-medium text-[#ead9ad] transition-colors duration-200 hover:bg-[#ead9ad] hover:text-[#201a16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ead9ad]"
                    onClick={() => setActiveMoment(moment)}
                    type="button"
                  >
                    <span>Open</span>
                    <svg
                      className="h-3 w-3 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-10 grid gap-6 border-y border-white/10 py-7 md:grid-cols-4">
            {quietRhythm.map((item, index) => (
              <div className="flex items-center gap-4 text-white/72" key={item}>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#ead9ad]/30 text-xs text-[#ead9ad]">
                  0{index + 1}
                </span>
                <span className="text-sm leading-6 md:text-base">{item}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-2xl text-lg leading-8 text-white/62">
              Quiet does not ask you to disappear. It gives you language for
              coming back to yourself, your people, and the gentle presence of
              God.
            </p>
            <ArrowButton href="/#quiet-circle" variant="light">
              Join the Quiet Circle
            </ArrowButton>
          </div>
        </ScrollReveal>
      </div>

      {activeMoment ? (
        <div
          aria-labelledby="quiet-moment-dialog-title"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-[#201a16]/75 px-4 py-8 backdrop-blur-sm"
          onClick={() => setActiveMoment(null)}
          role="dialog"
        >
          <div
            className="w-full max-w-lg rounded-[28px] border border-[#ead9ad]/35 bg-[#f6efe4] p-6 text-[#201a16] shadow-2xl md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-[#8f6f2f]">
                Quiet Moment
              </p>
              <button
                aria-label="Close description"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#201a16]/15 text-xl leading-none text-[#201a16] transition-colors duration-200 hover:bg-[#201a16] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b68a3a]"
                onClick={() => setActiveMoment(null)}
                type="button"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <h3
              className="font-display text-3xl font-semibold leading-tight"
              id="quiet-moment-dialog-title"
            >
              {activeMoment.title}
            </h3>
            <p className="mt-4 text-base leading-7 text-[#3b342e]/78">
              {activeMoment.description}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
};
