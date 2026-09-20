import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getWPArticle, getWPArticles } from "@/lib/wordpress";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
  const wpArticles = await getWPArticles();
  return wpArticles.map((article) => ({ slug: article.slug }));
};

export const generateMetadata = async ({
  params,
}: ArticlePageProps): Promise<Metadata> => {
  const { slug } = await params;
  const article = await getWPArticle(slug);

  if (!article) {
    return { title: "Article" };
  }

  return {
    title: `${article.title} | Reflections`,
    description: article.excerpt,
    alternates: {
      canonical: `/articles/${slug}`,
    },
  };
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getWPArticle(slug);

  if (!article) {
    notFound();
  }

  // Load all articles to identify previous and next entries
  const allArticles = await getWPArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Safe date parsing for JSON-LD schema
  let isoPublishDate = new Date().toISOString().split("T")[0];
  try {
    const parsed = Date.parse(article.date);
    if (!isNaN(parsed)) {
      isoPublishDate = new Date(parsed).toISOString().split("T")[0];
    }
  } catch (e) {
    console.warn("Error parsing date for sitemap:", e);
  }

  const lastUpdatedMonthYear = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "image": article.image,
    "datePublished": isoPublishDate,
    "dateModified": new Date().toISOString().split("T")[0],
    "author": {
      "@type": "Person",
      "name": "DK Jonah",
      "url": "https://dkjonah.com/about",
    },
    "publisher": {
      "@type": "Organization",
      "name": "DK Jonah",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dkjonah.com/assets/avenzor/images/website-logo.png",
      },
    },
    "description": article.excerpt,
  };

  return (
    <article className="bg-[#fffaf2]">
      {/* Dynamic JSON-LD injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header section with rich typography */}
      <section className="px-4 pb-12 pt-36">
        <div className="container-shell max-w-4xl">
          <ScrollReveal>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9a8f83] hover:text-[#b68a3a] transition-colors mb-6"
            >
              ← Back to Reflections
            </Link>
            {article.categories && article.categories.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-1.5">
                {article.categories.map((cat) => (
                  <span
                    key={cat.slug}
                    className="inline-block rounded-full bg-[#f1e7d8] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#9a8f83]"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
            <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#9a8f83]">
              Published: {article.date} · {article.readTime} · <span className="text-[#b68a3a] font-bold">Updated: {lastUpdatedMonthYear}</span>
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] text-[#201a16] sm:text-5xl md:text-6xl lg:text-7xl">
              {article.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#7a7065] md:text-xl">
              {article.excerpt}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Cover Image */}
      <section className="px-4 py-6">
        <div className="container-shell max-w-5xl">
          <ScrollReveal delay={0.1}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#f1e7d8] border border-[#ded2c1]/40 shadow-sm">
              <Image
                alt={article.title}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1200px) 1200px, 100vw"
                src={article.image}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Article Content & Navigation */}
      <section className="py-12 md:py-20">
        <div className="container-shell max-w-3xl">
          <ScrollReveal delay={0.15}>
            {/* Body text paragraphs */}
            <div className="border-b border-[#ded2c1]/40 pb-16">
              <div
                className="article-body space-y-8 text-lg leading-8 text-[#302a24] md:text-xl md:leading-9 mb-8"
                dangerouslySetInnerHTML={{
                  __html: Array.isArray(article.body)
                    ? article.body.map((p) => `<p>${p}</p>`).join("")
                    : article.body,
                }}
              />
              {article.tags && article.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 pt-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag.slug}
                      className="inline-block rounded-full bg-[#f1e7d8] px-3 py-1 text-xs font-semibold text-[#7a7065]"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Read Next Navigation Grid */}
            <div className="mt-16">
              <h3 className="mb-6 font-display text-xl font-bold text-[#201a16] uppercase tracking-wide">
                Read next reflection
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {prevArticle ? (
                  <Link
                    href={`/articles/${prevArticle.slug}`}
                    className="group block rounded-2xl border border-[#ded2c1]/40 bg-[#fffaf2] p-6 shadow-sm hover:border-[#b68a3a] hover:shadow-md transition-all duration-300"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#9a8f83] block mb-2 transition-colors group-hover:text-[#b68a3a]">
                      ← Previous Essay
                    </span>
                    <h4 className="font-display text-lg font-bold leading-snug text-[#201a16] group-hover:text-[#b68a3a] transition-colors">
                      {prevArticle.title}
                    </h4>
                  </Link>
                ) : (
                  <div className="rounded-2xl border border-[#ded2c1]/20 bg-[#f8f2e8]/40 p-6 flex flex-col justify-center text-[#9a8f83]">
                    <p className="text-sm italic">You are reading the first essay in Reflections.</p>
                  </div>
                )}

                {nextArticle ? (
                  <Link
                    href={`/articles/${nextArticle.slug}`}
                    className="group block rounded-2xl border border-[#ded2c1]/40 bg-[#fffaf2] p-6 shadow-sm hover:border-[#b68a3a] hover:shadow-md transition-all duration-300 text-right"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#9a8f83] block mb-2 transition-colors group-hover:text-[#b68a3a]">
                      Next Essay →
                    </span>
                    <h4 className="font-display text-lg font-bold leading-snug text-[#201a16] group-hover:text-[#b68a3a] transition-colors">
                      {nextArticle.title}
                    </h4>
                  </Link>
                ) : (
                  <div className="rounded-2xl border border-[#ded2c1]/20 bg-[#f8f2e8]/40 p-6 flex flex-col justify-center text-right text-[#9a8f83]">
                    <p className="text-sm italic">More reflections and essays are coming soon.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-12 flex justify-center">
              <ArrowButton href="/articles" variant="dark">
                Back to Reflections
              </ArrowButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </article>
  );
}
