import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articles } from "@/content/articles";

export const metadata: Metadata = {
  title: "My Cozy Corner",
  description: "Essays and reflections from DK Jonah on invisible realities, faith, rest, and belonging.",
};

export default function ArticlesPage() {
  return (
    <section className="section-padding bg-[#f1e7d8] pt-32">
      <div className="container-shell">
        <h1 className="sr-only">My Cozy Corner</h1>
        <SectionHeading
          intro="Essays, reflections, and gentle notes for invisible realities, tender faith, neurodivergent rhythms, chronic illness, rest, and belonging."
          label="[My Cozy Corner]"
          title="Essays for the quiet questions you carry"
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {articles.map((article) => (
            <Link className="group rounded-2xl bg-[#fffaf2] p-3" href={`/articles/${article.slug}`} key={article.slug}>
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
                <h2 className="font-display text-3xl font-medium leading-tight">
                  {article.title}
                </h2>
                <p className="mt-4 text-[#7a7065]">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
