import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutStory } from "@/components/sections/AboutStory";
import { AboutStats } from "@/components/sections/AboutStats";
import { AboutThemes } from "@/components/sections/AboutThemes";
import { AboutNarrative } from "@/components/sections/AboutNarrative";

export const metadata: Metadata = {
  title: "About DK Jonah | Soft Reflections & Rhythms",
  description:
    "Learn about DK Jonah, a quiet creative voice sharing reflections and gentle resources for chronic illness, neurodivergence, faith, and belonging.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "DK Jonah",
    "url": "https://dkjonah.com/about",
    "image": "https://dkjonah.com/assets/avenzor/images/website-logo.png",
    "description": "A creative lifestyle and reflection writer sharing gentle resources for navigating chronic illness, neurodivergence, faith, and soft belonging.",
    "jobTitle": "Author & Creator",
    "knowsAbout": [
      "Chronic Illness Advocacy",
      "Neurodivergent Self-Care",
      "Faith & Quiet Contemplation",
      "Somatic Care Practices"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutHero />
      <AboutNarrative />
      <AboutStory />
      <AboutThemes />
      <AboutStats />
    </>
  );
}
