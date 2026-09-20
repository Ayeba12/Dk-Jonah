import type { Metadata } from "next";
import { ReflectionsBand, ReflectionsSignUp } from "@/components/sections/ReflectionsClosers";
import { reflectionsHeroContent as hero, reflectionsSEO } from "@/content/reflections";
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

      {/* 2 and 3. The black band and the Quiet Focus sign-up, shared with every essay. */}
      <ReflectionsBand />
      <ReflectionsSignUp />
    </>
  );
}
