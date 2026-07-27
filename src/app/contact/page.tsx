import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { profile } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact DK Jonah for notes, questions, collaborations, and aligned opportunities.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[#201a16] px-4 pb-20 pt-32 text-white">
        <div className="container-shell grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-5 text-sm text-white/45">[Contact]</p>
            <h1 className="font-display text-6xl font-semibold leading-none md:text-8xl">
              Send a note when you are ready.
            </h1>
          </div>
          <div className="md:text-right">
            <a
              className="font-display text-4xl font-semibold transition-colors hover:text-[#ead9ad]"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
            <div className="mt-6 md:ml-auto md:w-fit">
              <ArrowButton href="/#quiet-circle" variant="light">
                Join the Quiet Circle
              </ArrowButton>
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding bg-[#fffaf2]">
        <div className="container-shell grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-sm text-[#7a7065]">[Send a Note]</p>
            <h2 className="font-display text-5xl font-semibold leading-none md:text-7xl">
              Share what brought you here.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#7a7065]">
              Whether you want to share a reflection, ask a question,
              collaborate, or say that something here met you where you are,
              you can reach out gently.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
