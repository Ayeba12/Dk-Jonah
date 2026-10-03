import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ogImages, pageJsonLd } from "@/lib/seo";
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
    url: "https://www.dkjonah.com/advocacy-faith",
    siteName: "DK Jonah",
    type: "website",
    images: ogImages,
  },
};

export default function AdvocacyFaithPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ name: "Advocacy and Faith", description: advocacySEO.description, path: "/advocacy-faith", type: "WebPage" })} />
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
