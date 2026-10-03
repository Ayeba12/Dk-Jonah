import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { keywordsFor } from "@/content/keywords";
import { ogImages, pageJsonLd, twitterImages } from "@/lib/seo";
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
  keywords: keywordsFor("/about"),
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    images: ogImages,
    title: aboutSEO.title,
    description: aboutSEO.description,
    url: "https://www.dkjonah.com/about",
    siteName: "DK Jonah",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: aboutSEO.title,
    description: aboutSEO.description,
    images: twitterImages,
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ name: "About DK Jonah", description: aboutSEO.description, path: "/about", type: "ProfilePage", crumbs: [{ name: "About", path: "/about" }] })} />
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
