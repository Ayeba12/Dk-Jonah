import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ogImages, pageJsonLd } from "@/lib/seo";
import {
  DayWithToolkitSection,
  GoDeeperSection,
  InteractiveToolsSection,
  ToolkitHero,
  ToolkitQuietFocusSection,
  WhichToolSection,
  WhyRoutineReadySection,
} from "@/components/sections/ToolkitSections";
import { toolkitSEO } from "@/content/toolkit";

export const metadata: Metadata = {
  title: toolkitSEO.title,
  description: toolkitSEO.description,
  alternates: {
    canonical: "/toolkit",
  },
  openGraph: {
    title: `${toolkitSEO.title} | DK Jonah`,
    description: toolkitSEO.description,
    url: "https://www.dkjonah.com/toolkit",
    siteName: "DK Jonah",
    type: "website",
    images: ogImages,
  },
};

export default function ToolkitPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ name: "Toolkit", description: toolkitSEO.description, path: "/toolkit", type: "CollectionPage" })} />
      {/* 1. Hero */}
      <ToolkitHero />

      {/* 2. Why Routine Ready */}
      <WhyRoutineReadySection />

      {/* 3. A day with the toolkit */}
      <DayWithToolkitSection />

      {/* 4. The interactive tools (#tools) */}
      <InteractiveToolsSection />

      {/* 5. Which tool do I need? */}
      <WhichToolSection />

      {/* 6. Go deeper */}
      <GoDeeperSection />

      {/* 7. Join Quiet Focus */}
      <ToolkitQuietFocusSection />
    </>
  );
}
