"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowButton } from "@/components/ui/ArrowButton";
import type { Article } from "@/content/articles";
import { reflectionsHeroContent as content } from "@/content/reflections";

const PAGE_SIZE = 9;

type ArticlesListProps = {
  articles: Article[];
};

// The reference's journal grid: square pictures, the title beneath, a pill tag on the picture.
export const ArticlesList = ({ articles }: ArticlesListProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const tags = Array.from(new Set(articles.flatMap((article) => article.categories?.map((cat) => cat.name) ?? [])));
  const filtered = selected ? articles.filter((article) => article.categories?.some((cat) => cat.name === selected)) : articles;
  const visible = filtered.slice(0, visibleCount);

  const pick = (tag: string | null) => {
    setSelected(tag);
    setVisibleCount(PAGE_SIZE);
  };

  const pillClass = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm transition-colors ${
      active ? "border-black bg-black text-ivory" : "border-black/15 text-black/70 hover:border-black hover:text-black"
    }`;

  return (
    <div>
      {tags.length > 0 ? (
        <div className="mb-10 flex flex-wrap gap-2.5">
          <button className={pillClass(selected === null)} onClick={() => pick(null)} type="button">
            {content.allLabel}
          </button>
          {tags.map((tag) => (
            <button className={pillClass(selected === tag)} key={tag} onClick={() => pick(tag)} type="button">
              {tag}
            </button>
          ))}
        </div>
      ) : null}

      {visible.length > 0 ? (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((article, index) => (
              <motion.article
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                initial={{ opacity: 0, y: 16 }}
                key={article.slug}
                layout
                transition={{ duration: 0.45, delay: (index % PAGE_SIZE) * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link className="group block" href={`/articles/${article.slug}`}>
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-dove-tint">
                    <Image
                      alt=""
                      className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      src={article.image}
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-ivory px-3 py-1 text-xs font-medium text-black">
                      {article.categories?.[0]?.name ?? content.defaultTag}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-gold text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 12h14m0 0-5-5m5 5-5 5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-lg font-medium leading-snug transition-colors group-hover:text-gold-shadow md:text-xl">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-sm text-black/55">
                    {article.date} · {article.readTime}
                  </p>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p className="border-t border-black/15 py-12 text-lg text-black/60">{content.emptyLine}</p>
      )}

      {visibleCount < filtered.length ? (
        <div className="mt-14 flex justify-end">
          <ArrowButton onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} variant="dark">
            {content.showMore}
          </ArrowButton>
        </div>
      ) : null}
    </div>
  );
};
