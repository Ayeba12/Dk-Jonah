import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { articles, getArticle } from "@/content/articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () =>
  articles.map((article) => ({ slug: article.slug }));

export const generateMetadata = async ({
  params,
}: ArticlePageProps): Promise<Metadata> => {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return { title: "Article" };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <article>
      <section className="bg-[#fffaf2] px-4 pb-10 pt-32">
        <div className="container-shell">
          <p className="mb-5 text-sm text-[#9a8f83]">
            {article.date} · {article.readTime}
          </p>
          <h1 className="font-display max-w-5xl text-6xl font-semibold leading-none md:text-8xl">
            {article.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-[#7a7065]">
            {article.excerpt}
          </p>
        </div>
      </section>
      <section className="bg-[#fffaf2] py-8">
        <div className="container-shell">
          <div className="relative aspect-[1.8] overflow-hidden rounded-[28px] bg-[#f1e7d8]">
            <Image
              alt={article.title}
              className="object-cover"
              fill
              priority
              sizes="100vw"
              src={article.image}
            />
          </div>
        </div>
      </section>
      <section className="section-padding bg-[#fffaf2]">
        <div className="container-shell max-w-3xl">
          <div className="grid gap-8">
            {article.body.map((paragraph) => (
              <p className="text-xl leading-9 text-[#3a332b]" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-12">
            <ArrowButton href="/articles">Back to My Cozy Corner</ArrowButton>
          </div>
        </div>
      </section>
    </article>
  );
}
