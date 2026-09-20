import type { Metadata } from "next";
import { QuietFocusForm } from "@/components/forms/QuietFocusForm";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  reflectionsBandContent as band,
  reflectionsHeroContent as hero,
  reflectionsSEO,
  reflectionsSignUpContent as signUp,
} from "@/content/reflections";
import { getWPArticles } from "@/lib/wordpress";
import { ArticlesList } from "./ArticlesList";

export const metadata: Metadata = {
  title: reflectionsSEO.title,
  description: reflectionsSEO.description,
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: `${reflectionsSEO.title} | DK Jonah`,
    description: reflectionsSEO.description,
    url: "https://dkjonah.com/articles",
    siteName: "DK Jonah",
    type: "website",
  },
};

export default async function ArticlesPage() {
  const articles = await getWPArticles();

  return (
    <>
      {/* 1. The journal: heading column on the left, the grid of essays on the right. */}
      <section className="paper pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.32fr_1fr] lg:gap-10">
          <div>
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">{hero.eyebrow}</p>
              <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.02] text-balance sm:text-5xl lg:text-[3.5rem]">
                {hero.headline}
              </h1>
              <p className="mt-8 max-w-xs text-base leading-relaxed text-black/65">{hero.body}</p>
            </div>
          </div>
          <ArticlesList articles={articles} />
        </div>
      </section>

      {/* 2. A black band with one statement and one way forward. */}
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

      {/* 3. Quiet Focus sign-up, the reference's newsletter block. */}
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
    </>
  );
}
