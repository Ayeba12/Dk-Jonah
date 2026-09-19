import type { Metadata } from "next";
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
  alternates: {
    canonical: "/find-me",
  },
  openGraph: {
    title: `${findMeSEO.title} | DK Jonah`,
    description: findMeSEO.description,
    url: "https://dkjonah.com/find-me",
    siteName: "DK Jonah",
    type: "website",
  },
};

export default function FindMePage() {
  return (
    <>
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
