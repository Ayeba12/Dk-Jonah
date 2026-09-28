import type { Metadata } from "next";
import { ogImages } from "@/lib/seo";
import { FaqCloseSection, FaqGroupsSection, FaqHero } from "@/components/sections/FaqSections";
import { faqGroups as localFaqGroups, faqSEO, type FaqGroup } from "@/content/faq";
import { getWPFaqGroups } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: faqSEO.title,
  description: faqSEO.description,
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: `${faqSEO.title} | DK Jonah`,
    description: faqSEO.description,
    url: "https://www.dkjonah.com/faq",
    siteName: "DK Jonah",
    type: "website",
    images: ogImages,
  },
};

const stripTags = (html: string) => html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

// Structured data so search engines can show the questions directly.
const buildJsonLd = (groups: FaqGroup[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: groups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answerHtml ? stripTags(item.answerHtml) : item.answer ?? "" },
    })),
  ),
});

// FAQs come from WordPress (pages under "faq"), with the content file as the fallback.
export const revalidate = 60;

export default async function FaqPage() {
  const groups: FaqGroup[] = (await getWPFaqGroups()) ?? localFaqGroups;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(groups)) }} type="application/ld+json" />

      {/* 1. Hero */}
      <FaqHero groups={groups} />

      {/* 2 to 7. The groups, in the order set in WordPress */}
      <FaqGroupsSection groups={groups} />

      {/* 8. Close */}
      <FaqCloseSection />
    </>
  );
}
