import { QuietFocusForm } from "@/components/forms/QuietFocusForm";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { reflectionsBandContent as band, reflectionsSignUpContent as signUp } from "@/content/reflections";

// The two blocks that close the Reflections archive and every essay: one statement on black, then the Quiet Focus sign-up.
export const ReflectionsBand = () => (
  <section className="on-black dotted section-padding">
    <div className="container-shell text-center">
      <ScrollReveal>
        <h2 className="mx-auto max-w-5xl font-display text-5xl font-bold uppercase leading-[0.95] text-ivory sm:text-6xl lg:text-[6.5rem]">
          {band.headline}
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <p className="mx-auto mt-10 max-w-md text-base leading-relaxed text-ivory/80">{band.body}</p>
        <div className="mt-8 flex justify-center">
          <ArrowButton href={band.cta.href} size="lg" variant="ivory">
            {band.cta.label}
          </ArrowButton>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export const ReflectionsSignUp = () => (
  <section className="paper section-padding" id="sign-up">
    <div className="container-shell grid gap-12 lg:grid-cols-[0.32fr_1fr] lg:gap-10">
      <ScrollReveal>
        <p className="eyebrow">{signUp.eyebrow}</p>
        <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.02] text-balance sm:text-5xl lg:text-[3.5rem]">
          {signUp.headline}
        </h2>
        <p className="mt-8 max-w-xs text-base leading-relaxed text-black/65">{signUp.body}</p>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <div className="max-w-2xl lg:pt-4">
          <QuietFocusForm />
        </div>
      </ScrollReveal>
    </div>
  </section>
);
