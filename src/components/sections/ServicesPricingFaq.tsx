import { ArrowButton } from "@/components/ui/ArrowButton";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { pricingPlans, services } from "@/content/portfolio";
import { getWPFAQs } from "@/lib/wordpress";

export const ServicesPricingFaq = async () => {
  const wpFaqs = await getWPFAQs();

  return (
    <>
      <section className="section-padding bg-[#fffaf2]">
        <div className="container-shell">
          <ScrollReveal>
            <SectionHeading
              intro="This website is a soft map for reading, reflecting, receiving resources, and staying close through the Quiet Circle."
              label="[What You Can Find Here]"
              title="A home for language, tools, and belonging"
            />
          </ScrollReveal>
          <div className="border-t border-[#ded2c1]">
            {services.map(([number, title, text], index) => (
              <ScrollReveal delay={index * 0.08} key={title}>
                <article className="grid gap-4 border-b border-[#ded2c1] py-7 md:grid-cols-[80px_1fr_1.4fr]">
                  <p className="text-[#9a8f83]">[{number}]</p>
                  <h3 className="font-display text-3xl font-medium">{title}</h3>
                  <p className="text-lg leading-8 text-[#7a7065]">{text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#201a16] text-white">
        <div className="container-shell">
          <ScrollReveal>
            <SectionHeading
              intro="The main invitation is simple: receive a slow, thoughtful note when you need language, reflection, and care."
              label="[Quiet Circle]"
              tone="dark"
              title="A soft letter for people who need to feel less alone"
            />
          </ScrollReveal>
          <div className="grid gap-5 md:grid-cols-2">
            {pricingPlans.map((plan, index) => (
              <ScrollReveal delay={index * 0.15} key={plan.title}>
                <article className="h-full rounded-2xl border border-white/12 bg-white/[0.04] p-6 md:p-8">
                  <p className="mb-6 text-sm text-white/45">{plan.label}</p>
                  <h3 className="font-display text-4xl font-semibold">{plan.title}</h3>
                  <p className="mt-4 min-h-14 text-white/58">{plan.intro}</p>
                  <div className="my-8 border-y border-white/10 py-8">
                    <p className="mb-2 text-sm text-white/45">{plan.suffix}</p>
                    <p className="font-display text-6xl font-semibold">
                      {plan.price}
                      {plan.suffix.startsWith("/") ? (
                        <span className="text-2xl text-white/45"> {plan.suffix}</span>
                      ) : null}
                    </p>
                  </div>
                  <ArrowButton href="/#quiet-circle" variant="light">
                    Join the Quiet Circle
                  </ArrowButton>
                  <ul className="mt-8 grid gap-3 text-white/72">
                    {plan.features.map((feature) => (
                      <li className="flex gap-3" key={feature}>
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b68a3a]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#fffaf2]">
        <div className="container-shell">
          <ScrollReveal>
            <SectionHeading
              align="left"
              intro="A simple breakdown of what this space is, what it is not, and how to stay connected."
              label="[FAQ]"
              title="Gentle clarity"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <FaqAccordion items={wpFaqs} />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-lg text-[#7a7065]">Have a question or collaboration idea?</p>
              <ArrowButton href="/contact">Send a Note</ArrowButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};
