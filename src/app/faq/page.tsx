import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { keywordsFor } from "@/content/keywords";
import { absoluteUrl, breadcrumbJsonLd, ogImages, PERSON_ID, plainFaqAnswer, WEBSITE_ID } from "@/lib/seo";
import { FaqCloseSection, FaqGroupsSection, FaqHero } from "@/components/sections/FaqSections";
import { faqGroups as localFaqGroups, faqSEO, type FaqGroup } from "@/content/faq";
import { getWPFaqGroups } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: faqSEO.title,
  description: faqSEO.description,
  keywords: keywordsFor("/faq"),
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

// Structured data so search engines can show the questions directly.
const buildJsonLd = (groups: FaqGroup[]) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `${absoluteUrl("/faq")}#webpage`,
      url: absoluteUrl("/faq"),
      name: "FAQ",
      description: faqSEO.description,
      inLanguage: "en-GB",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: groups.flatMap((group) =>
        group.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: plainFaqAnswer(item) },
        })),
      ),
    },
    breadcrumbJsonLd([{ name: "FAQ", path: "/faq" }]),
  ],
});

// FAQs come from WordPress (pages under "faq"), with the content file as the fallback.
export const revalidate = 60;

export default async function FaqPage() {
  const groups: FaqGroup[] = (await getWPFaqGroups()) ?? localFaqGroups;

  return (
    <>
      <JsonLd data={buildJsonLd(groups)} />

      {/* 1. Hero */}
      <FaqHero groups={groups} />

      {/* 2 to 7. The groups, in the order set in WordPress */}
      <FaqGroupsSection groups={groups} />

      {/* 8. Close */}
      <FaqCloseSection />
    </>
  );
}
