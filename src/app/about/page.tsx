import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/AboutHero";
import { WhereMyWorkBeginsSection } from "@/components/sections/WhereMyWorkBeginsSection";
import { MyStorySection } from "@/components/sections/MyStorySection";
import { RolesAndHowIWorkSection } from "@/components/sections/RolesAndHowIWorkSection";
import { BeliefsAndPromiseSection } from "@/components/sections/BeliefsAndPromiseSection";
import { NoGraGraAndWhyStartSection } from "@/components/sections/NoGraGraAndWhyStartSection";
import { aboutSEO } from "@/content/about";

export const metadata: Metadata = {
  title: aboutSEO.title,
  description: aboutSEO.description,
  keywords: aboutSEO.keywords,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: aboutSEO.title,
    description: aboutSEO.description,
    url: "https://dkjonah.com/about",
    siteName: "DK Jonah",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: aboutSEO.title,
    description: aboutSEO.description,
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "DK Jonah",
    "url": "https://dkjonah.com/about",
    "image": "https://dkjonah.com/assets/avenzor/images/website-logo.png",
    "description":
      "Nigerian writer, speaker and coach helping people set goals they can keep and build structure that fits their real life.",
    "jobTitle": "Knowledge Architect, Speaker & Coach",
    "knowsAbout": [
      "Chronic Illness Advocacy",
      "Neurodiversity",
      "Restorative Structure",
      "Lived Experience Leadership",
      "Faith Without Performance"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. Hero */}
      <AboutHero />

      {/* 2. Where my work begins & 3. Why I do this work */}
      <WhereMyWorkBeginsSection />

      {/* 4. My story (#my-story) */}
      <MyStorySection />

      {/* 5. The roles I play & 6. How I work */}
      <RolesAndHowIWorkSection />

      {/* 7. What I believe & 8. My promise to you */}
      <BeliefsAndPromiseSection />

      {/* 9. NO GraGra & 10. Why start now */}
      <NoGraGraAndWhyStartSection />
    </>
  );
}
