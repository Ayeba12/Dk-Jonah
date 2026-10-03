import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { keywordsFor } from "@/content/keywords";
import { ogImages, pageJsonLd } from "@/lib/seo";
import {
  FormatsSection,
  InTheirWordsSection,
  InviteSection,
  SpeakingHero,
  TopicsSection,
  WhatIBringSection,
  WhereSpokenSection,
} from "@/components/sections/SpeakingSections";
import { speakingSEO } from "@/content/speaking";

export const metadata: Metadata = {
  title: speakingSEO.title,
  description: speakingSEO.description,
  keywords: keywordsFor("/speaking"),
  alternates: {
    canonical: "/speaking",
  },
  openGraph: {
    title: `${speakingSEO.title} | DK Jonah`,
    description: speakingSEO.description,
    url: "https://www.dkjonah.com/speaking",
    siteName: "DK Jonah",
    type: "website",
    images: ogImages,
  },
};

export default function SpeakingPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ name: "Speaking", description: speakingSEO.description, path: "/speaking", type: "WebPage" })} />
      {/* 1. Hero */}
      <SpeakingHero />

      {/* 2. What I bring, 3. Rooms I speak in */}
      <WhatIBringSection />

      {/* 4. Topics (#topics) */}
      <TopicsSection />

      {/* 5. What I can do for your event */}
      <FormatsSection />

      {/* 6. Where I have spoken */}
      <WhereSpokenSection />

      {/* 7. In their words */}
      <InTheirWordsSection />

      {/* 8. Invite DK (#enquiry) */}
      <InviteSection />
    </>
  );
}
