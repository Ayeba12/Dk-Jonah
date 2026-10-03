import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { keywordsFor } from "@/content/keywords";
import { ogImages, pageJsonLd } from "@/lib/seo";
import {
  FindMeHero,
  JoinLiveSection,
  PracticesSection,
  ReadSubscribeSection,
  ShopSection,
  SocialEmailSection,
} from "@/components/sections/FindMeSections";
import { findMeSEO } from "@/content/find-me";

export const metadata: Metadata = {
  title: findMeSEO.title,
  description: findMeSEO.description,
  keywords: keywordsFor("/find-me"),
  alternates: {
    canonical: "/find-me",
  },
  openGraph: {
    title: `${findMeSEO.title} | DK Jonah`,
    description: findMeSEO.description,
    url: "https://www.dkjonah.com/find-me",
    siteName: "DK Jonah",
    type: "website",
    images: ogImages,
  },
};

export default function FindMePage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ name: "Find me", description: findMeSEO.description, path: "/find-me", type: "WebPage" })} />
      {/* 1. Hero */}
      <FindMeHero />

      {/* 2. My practices */}
      <PracticesSection />

      {/* 3. Read and subscribe */}
      <ReadSubscribeSection />

      {/* 4. Join me live */}
      <JoinLiveSection />

      {/* 5. Shop */}
      <ShopSection />

      {/* 6. Social and email */}
      <SocialEmailSection />
    </>
  );
}
