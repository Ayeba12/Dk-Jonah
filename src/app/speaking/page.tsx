import type { Metadata } from "next";
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
  alternates: {
    canonical: "/speaking",
  },
  openGraph: {
    title: `${speakingSEO.title} | DK Jonah`,
    description: speakingSEO.description,
    url: "https://dkjonah.com/speaking",
    siteName: "DK Jonah",
    type: "website",
  },
};

export default function SpeakingPage() {
  return (
    <>
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
