import type { Metadata } from "next";
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
    url: "https://dkjonah.com/work",
    siteName: "DK Jonah",
    type: "website",
  },
};

export default function WorkPage() {
  return (
    <>
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
