"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Article } from "@/content/articles";

const MotionLink = motion(Link);

type ArticlesListProps = {
  articles: Article[];
};

export const ArticlesList = ({ articles }: ArticlesListProps) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Derive unique categories dynamically
  const allCategories = Array.from(
    new Set(
      articles.flatMap((art) => art.categories?.map((cat) => cat.name) || [])
    )
  );

  // Filter articles based on search and category
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      article.categories?.some((cat) => cat.name === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 6, filteredArticles.length));
      setIsLoading(false);
    }, 800);
  };

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  return (
    <div>
      {/* Search and Category Filters */}
      <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Search input field */}
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#9a8f83]">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search essays..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(6);
            }}
            className="w-full rounded-2xl border border-[#ded2c1] bg-[#fffaf2] py-3.5 pl-12 pr-6 text-sm text-[#302a24] placeholder-[#9a8f83] outline-none transition-all focus:border-[#b68a3a] focus:ring-1 focus:ring-[#b68a3a]"
          />
        </div>

        {/* Category selector filter pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setVisibleCount(6);
            }}
            className={`rounded-2xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedCategory === null
                ? "bg-[#201a16] text-[#fffaf2]"
                : "bg-[#fffaf2] border border-[#ded2c1]/60 text-[#7a7065] hover:border-[#b68a3a]"
            }`}
          >
            All
          </button>
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setVisibleCount(6);
              }}
              className={`rounded-2xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === category
                  ? "bg-[#201a16] text-[#fffaf2]"
                  : "bg-[#fffaf2] border border-[#ded2c1]/60 text-[#7a7065] hover:border-[#b68a3a]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Container */}
      {visibleArticles.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleArticles.map((article, index) => (
              <MotionLink
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group block h-full rounded-2xl bg-[#fffaf2] p-3 shadow-sm transition-shadow hover:shadow-xl border border-[#ded2c1]/20"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  delay: (index % 6) * 0.05,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                layout
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
                    <h2 className="font-display text-2xl font-bold leading-7 text-[#201a16] transition-colors group-hover:text-[#b68a3a]">
                      {article.title}
                    </h2>
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
              </MotionLink>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-[#ded2c1]/40 bg-[#fffaf2]/50 py-16 text-center shadow-sm"
        >
          <p className="text-lg text-[#7a7065]">No essays found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory(null);
            }}
            className="mt-4 text-sm font-bold text-[#b68a3a] underline hover:text-[#201a16] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </motion.div>
      )}

      {/* Pagination Controls */}
      {visibleCount < filteredArticles.length && (
        <div className="mt-16 flex flex-col items-center justify-center">
          {isLoading ? (
            <div className="flex items-center justify-center gap-1.5 py-4">
              <motion.span
                className="h-2.5 w-2.5 rounded-full bg-[#b68a3a]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              />
              <motion.span
                className="h-2.5 w-2.5 rounded-full bg-[#b68a3a]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
              />
              <motion.span
                className="h-2.5 w-2.5 rounded-full bg-[#b68a3a]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              />
            </div>
          ) : (
            <motion.button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 rounded-full bg-[#201a16] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#fffaf2] shadow-sm hover:bg-[#b68a3a] transition-colors cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Load More Essays</span>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 13l-7 7-7-7m14-6l-7 7-7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              </svg>
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
};
