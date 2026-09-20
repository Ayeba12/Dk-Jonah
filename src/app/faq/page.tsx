import type { Metadata } from "next";
import { FaqCloseSection, FaqGroupsSection, FaqHero } from "@/components/sections/FaqSections";
import { faqGroups, faqSEO } from "@/content/faq";

export const metadata: Metadata = {
  title: faqSEO.title,
  description: faqSEO.description,
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: `${faqSEO.title} | DK Jonah`,
    description: faqSEO.description,
    url: "https://dkjonah.com/faq",
    siteName: "DK Jonah",
    type: "website",
  },
};

// Structured data so search engines can show the questions directly.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} type="application/ld+json" />

      {/* 1. Hero */}
      <FaqHero />

      {/* 2 to 7. Getting started, Words you will see here, Working with me, Speaking, Faith, Books, tools and your email */}
      <FaqGroupsSection />

      {/* 8. Close */}
      <FaqCloseSection />
    </>
  );
}
