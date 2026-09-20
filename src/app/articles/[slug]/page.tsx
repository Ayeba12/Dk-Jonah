import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReflectionsBand, ReflectionsSignUp } from "@/components/sections/ReflectionsClosers";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Article } from "@/content/articles";
import { reflectionsHeroContent } from "@/content/reflections";
import { getWPArticle, getWPArticles } from "@/lib/wordpress";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
  const wpArticles = await getWPArticles();
  return wpArticles.map((article) => ({ slug: article.slug }));
};

export const generateMetadata = async ({ params }: ArticlePageProps): Promise<Metadata> => {
  const { slug } = await params;
  const article = await getWPArticle(slug);

  if (!article) {
    return { title: "Reflection" };
  }

  return {
    title: `${article.title} | Reflections`,
    description: article.excerpt,
    alternates: {
      canonical: `/articles/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://dkjonah.com/articles/${slug}`,
      siteName: "DK Jonah",
      type: "article",
      images: [{ url: article.image, alt: article.title }],
    },
  };
};

const tagOf = (article: Article) => article.categories?.[0]?.name ?? reflectionsHeroContent.defaultTag;

// A journal card, as on the archive: square picture, pill tag, title beneath.
const EssayCard = ({ article }: { article: Article }) => (
  <Link className="group block" href={`/articles/${article.slug}`}>
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-dove-tint">
      <Image
        alt=""
        className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        src={article.image}
      />
      <span className="absolute left-4 top-4 rounded-full bg-ivory px-3 py-1 text-xs font-medium text-black">{tagOf(article)}</span>
    </div>
    <h3 className="mt-5 font-display text-lg font-medium leading-snug transition-colors group-hover:text-gold-shadow md:text-xl">
      {article.title}
    </h3>
    <p className="mt-2 text-sm text-black/55">
      {article.date} · {article.readTime}
    </p>
  </Link>
);

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getWPArticle(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getWPArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const nextArticle = allArticles[(currentIndex + 1) % allArticles.length] ?? null;
  // Two other essays for the journal block: the next one first, then the most recent that is not this page.
  const others = [nextArticle, ...allArticles].filter(
    (item, index, list): item is Article => !!item && item.slug !== slug && list.findIndex((x) => x?.slug === item.slug) === index,
  ).slice(0, 2);

  let isoPublishDate = new Date().toISOString().split("T")[0];
  const parsed = Date.parse(article.date);
  if (!isNaN(parsed)) {
    isoPublishDate = new Date(parsed).toISOString().split("T")[0];
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: article.image,
    datePublished: isoPublishDate,
    author: { "@type": "Person", name: "DK Jonah", url: "https://dkjonah.com/about" },
    publisher: {
      "@type": "Organization",
      name: "DK Jonah",
      logo: { "@type": "ImageObject", url: "https://dkjonah.com/assets/avenzor/images/website-logo.png" },
    },
    description: article.excerpt,
  };

  const bodyHtml = Array.isArray(article.body) ? article.body.map((p) => `<p>${p}</p>`).join("") : article.body;

  return (
    <article>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />

      {/* 1. Cover. The picture fills the top of the page, the title sits on it. */}
      <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden bg-black text-ivory md:min-h-[86vh]">
        <Image
          alt=""
          className="object-cover grayscale"
          fill
          priority
          sizes="100vw"
          src={article.image}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="container-shell relative grid w-full gap-10 pb-12 pt-40 md:pb-16 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl lg:pl-[8%]">
            <p className="eyebrow eyebrow-on-black">{reflectionsHeroContent.eyebrow}</p>
            <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.0] text-balance sm:text-5xl lg:text-[4.5rem]">
              {article.title}
            </h1>
            <p className="mt-6 text-sm text-ivory/70">
              {article.date} · {article.readTime} · {tagOf(article)}
            </p>
          </div>

          {/* The next essay, as the reference keeps a small card in the corner of its cover. */}
          {nextArticle && nextArticle.slug !== slug ? (
            <Link className="group flex items-center gap-4 lg:w-64 lg:flex-col lg:items-end lg:text-right" href={`/articles/${nextArticle.slug}`}>
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-dove-tint lg:h-20 lg:w-32">
                <Image alt="" className="object-cover grayscale transition-transform duration-700 group-hover:scale-[1.06]" fill sizes="128px" src={nextArticle.image} />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-black">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M5 12h14m0 0-5-5m5 5-5 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </span>
                </span>
              </div>
              <span className="text-xs leading-relaxed text-ivory/70">
                <span className="block font-medium text-ivory">Next</span>
                {nextArticle.title}
              </span>
            </Link>
          ) : null}
        </div>
      </section>

      {/* 2. Introduction. Label on the left, the opening words on the right. */}
      <section className="paper py-16 md:py-24">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <p className="eyebrow">Introduction</p>
          <ScrollReveal>
            <p className="max-w-2xl font-display text-2xl font-medium leading-snug text-balance md:text-3xl">{article.excerpt}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. The essay. Label stays put on the left, the words scroll on the right. */}
      <section className="paper pb-20 md:pb-28">
        <div className="container-shell grid gap-6 border-t border-black/15 pt-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:pt-16">
          <div>
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">Essay</p>
              {article.tags && article.tags.length > 0 ? (
                <ul className="mt-6 hidden flex-wrap gap-2 lg:flex">
                  {article.tags.map((tag) => (
                    <li className="rounded-full border border-black/15 px-3 py-1 text-xs text-black/60" key={tag.slug}>
                      {tag.name}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          <ScrollReveal>
            <div
              className="article-body max-w-2xl text-lg leading-relaxed text-black/80 md:text-xl md:leading-[1.7]"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
            <div className="mt-14 border-t border-black/15 pt-8">
              <p className="text-sm text-black/55">Written by DK Jonah</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Other reflections. The journal block, two cards and the way to the archive. */}
      {others.length > 0 ? (
        <section className="section-padding bg-ivory">
          <div className="container-shell grid gap-12 lg:grid-cols-[0.32fr_1fr] lg:gap-10">
            <ScrollReveal>
              <p className="eyebrow">Other reflections</p>
              <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.02] text-balance sm:text-5xl lg:text-[3.5rem]">
                {reflectionsHeroContent.headline}
              </h2>
              <p className="mt-8 max-w-xs text-base leading-relaxed text-black/65">{reflectionsHeroContent.body}</p>
            </ScrollReveal>
            <div>
              <div className="grid gap-6 sm:grid-cols-2 lg:pr-[10%]">
                {others.map((item, index) => (
                  <ScrollReveal delay={index * 0.08} key={item.slug}>
                    <EssayCard article={item} />
                  </ScrollReveal>
                ))}
              </div>
              <ScrollReveal>
                <div className="mt-12 flex justify-end md:mt-16">
                  <ArrowButton href="/articles" variant="dark">
                    All reflections
                  </ArrowButton>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ) : null}

      {/* 5 and 6. Shared with the archive. */}
      <ReflectionsBand />
      <ReflectionsSignUp />
    </article>
  );
}
