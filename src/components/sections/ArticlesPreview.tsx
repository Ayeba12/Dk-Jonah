import Image from "next/image";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articles } from "@/content/articles";

export const ArticlesPreview = () => (
  <section className="section-padding bg-[#f1e7d8]">
    <div className="container-shell">
      <SectionHeading
        intro="Essays, reflections, and gentle notes for invisible realities, tender faith, rest, and belonging."
        label="[My Cozy Corner]"
        title="Essays for the quiet questions you carry"
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {articles.map((article) => (
          <Link
            className="group rounded-2xl bg-[#fffaf2] p-3 shadow-sm transition-shadow hover:shadow-xl"
            href={`/articles/${article.slug}`}
            key={article.slug}
          >
            <div className="relative aspect-[1.55] overflow-hidden rounded-xl bg-[#ded2c1]">
              <Image
                alt={article.title}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                src={article.image}
              />
            </div>
            <div className="p-3">
              <p className="mb-4 text-sm text-[#9a8f83]">
                {article.date} · {article.readTime}
              </p>
              <h3 className="font-display text-2xl font-medium leading-tight">
                {article.title}
              </h3>
              <p className="mt-4 text-[#7a7065]">{article.excerpt}</p>
              <p className="mt-6 text-sm font-medium text-[#b68a3a]">Read</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-lg text-[#7a7065]">Need words for what has felt hard to name?</p>
        <ArrowButton href="/articles">Read from My Cozy Corner</ArrowButton>
      </div>
    </div>
  </section>
);
