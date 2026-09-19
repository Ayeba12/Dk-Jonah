import type { Metadata } from "next";
import {
  AdvocacyHero,
  AdvocacySection,
  BroadcastingSection,
  FaithSection,
  NextStepSection,
  UnsaidSection,
} from "@/components/sections/AdvocacySections";
import { advocacySEO } from "@/content/advocacy";

export const metadata: Metadata = {
  title: advocacySEO.title,
  description: advocacySEO.description,
  alternates: {
    canonical: "/advocacy-faith",
  },
  openGraph: {
    title: `${advocacySEO.title} | DK Jonah`,
    description: advocacySEO.description,
    url: "https://dkjonah.com/advocacy-faith",
    siteName: "DK Jonah",
    type: "website",
  },
};

export default function AdvocacyFaithPage() {
  return (
    <>
      {/* 1. Hero */}
      <AdvocacyHero />

      {/* 2. Advocacy */}
      <AdvocacySection />

      {/* 3. Faith */}
      <FaithSection />

      {/* 4. The Unsaid */}
      <UnsaidSection />

      {/* 5. Broadcasting */}
      <BroadcastingSection />

      {/* 6. Next step */}
      <NextStepSection />
    </>
  );
}
