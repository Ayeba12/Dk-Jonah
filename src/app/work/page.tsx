import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ogImages, pageJsonLd } from "@/lib/seo";
import {
  NotSureSection,
  TeamsSection,
  WaysToWorkSection,
  WorkHero,
  WorkQuotesSection,
} from "@/components/sections/WorkSections";
import { workSEO } from "@/content/work";

export const metadata: Metadata = {
  title: workSEO.title,
  description: workSEO.description,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: `${workSEO.title} | DK Jonah`,
    description: workSEO.description,
    url: "https://www.dkjonah.com/work",
    siteName: "DK Jonah",
    type: "website",
    images: ogImages,
  },
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ name: "Work with me", description: workSEO.description, path: "/work", type: "WebPage" })} />
      {/* 1. Hero */}
      <WorkHero />

      {/* 2. Ways to work with me */}
      <WaysToWorkSection />

      {/* 3. For teams, services and institutions */}
      <TeamsSection />

      {/* 4. What people say */}
      <WorkQuotesSection />

      {/* 5. Not sure where to start? */}
      <NotSureSection />
    </>
  );
}
