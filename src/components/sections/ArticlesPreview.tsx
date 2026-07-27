import Image from "next/image";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getWPArticles } from "@/lib/wordpress";

export const ArticlesPreview = async () => {
  const wpArticles = await getWPArticles();
  const previewArticles = wpArticles.slice(0, 3);

  return (
    <section className="section-padding bg-[#f1e7d8]">
      <div className="container-shell">
        <ScrollReveal>
          <SectionHeading
            intro="Essays, reflections, and gentle notes for invisible realities, tender faith, rest, and belonging."
            label="[My Cozy Corner]"
            title="Essays for the quiet questions you carry"
          />
        </ScrollReveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {previewArticles.map((article, index) => (
            <ScrollReveal delay={index * 0.08} key={article.slug}>
              <Link
                className="group block h-full rounded-2xl bg-[#fffaf2] p-3 shadow-sm transition-shadow hover:shadow-xl"
                href={`/articles/${article.slug}`}
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
                <div className="flex flex-col justify-between p-3">
                  <div>
                    {article.categories && article.categories.length > 0 && (
                      <div className="mb-2.5 flex flex-wrap gap-1.5">
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
                    <p className="mb-4 text-sm text-[#9a8f83]">
                      {article.date} · {article.readTime}
                    </p>
                    <h3 className="font-display text-2xl font-bold leading-7">
                      {article.title}
                    </h3>
                    <p className="mt-4 text-[#7a7065]">{article.excerpt}</p>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#b68a3a] transition-colors group-hover:text-[#201a16]">
                    <span>Read Essay</span>
                    <svg
                      className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12h14m0 0-5-5m5 5-5 5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-lg text-[#7a7065]">Need words for what has felt hard to name?</p>
            <ArrowButton href="/articles">Read from My Cozy Corner</ArrowButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
