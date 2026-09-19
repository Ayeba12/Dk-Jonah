import type { Metadata } from "next";
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
    url: "https://dkjonah.com/toolkit",
    siteName: "DK Jonah",
    type: "website",
  },
};

export default function ToolkitPage() {
  return (
    <>
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
