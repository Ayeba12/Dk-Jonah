import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/HomeHero";
import { RecognitionAndWhy } from "@/components/sections/RecognitionAndWhy";
import { YourGuideSection } from "@/components/sections/YourGuideSection";
import { QuietFocusSection } from "@/components/sections/QuietFocusSection";
import { RoutineReadySection } from "@/components/sections/RoutineReadySection";
import { WhatPeopleSaySection } from "@/components/sections/WhatPeopleSaySection";
import { ReflectionsSection } from "@/components/sections/ReflectionsSection";
import { SpeakingSection } from "@/components/sections/SpeakingSection";
import { CloseSection } from "@/components/sections/CloseSection";
import { homeSEO } from "@/content/home";
import { getWPArticles } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: homeSEO.title,
  description: homeSEO.description,
  keywords: homeSEO.keywords,
  openGraph: {
    title: homeSEO.title,
    description: homeSEO.description,
    url: "https://dkjonah.com",
    siteName: "DK Jonah",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeSEO.title,
    description: homeSEO.description,
  },
};

// Essays are fetched at render, newest first, so the block updates on its own when a new one is published.
export const revalidate = 60;

export default async function Home() {
  const articles = await getWPArticles();
  const latest = [...articles]
    .sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0))
    .slice(0, 3);

  return (
    <>
      {/* 1. Hero: its film stays pinned while the page scrolls over it */}
      <HomeHero />

      {/* 2. Recognition & 3. Why this space exists */}
      <RecognitionAndWhy />

      {/* 4. Your guide */}
      <YourGuideSection />

      {/* 5. Quiet Focus */}
      <QuietFocusSection />

      {/* 6. Routine Ready Toolkit */}
      <RoutineReadySection />

      {/* 7. What people say */}
      <WhatPeopleSaySection />

      {/* 8. Reflections */}
      <ReflectionsSection essays={latest} />

      {/* 9. Speaking */}
      <SpeakingSection />

      {/* 10. Close */}
      <CloseSection />
    </>
  );
}
