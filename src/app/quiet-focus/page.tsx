import type { Metadata } from "next";
import {
  ComeAsYouAreSection,
  QuietFocusHero,
  SignUpSection,
  WhatArrivesSection,
  WhatQuietFocusIsSection,
} from "@/components/sections/QuietFocusSections";
import { quietFocusSEO } from "@/content/quiet-focus";

export const metadata: Metadata = {
  title: quietFocusSEO.title,
  description: quietFocusSEO.description,
  alternates: {
    canonical: "/quiet-focus",
  },
  openGraph: {
    title: `${quietFocusSEO.title} | DK Jonah`,
    description: quietFocusSEO.description,
    url: "https://dkjonah.com/quiet-focus",
    siteName: "DK Jonah",
    type: "website",
  },
};

export default function QuietFocusPage() {
  return (
    <>
      {/* 1. Hero */}
      <QuietFocusHero />

      {/* 2. What Quiet Focus is */}
      <WhatQuietFocusIsSection />

      {/* 3. Come as you are, 4. Why I built it */}
      <ComeAsYouAreSection />

      {/* 5. What arrives */}
      <WhatArrivesSection />

      {/* 6. Sign up (#sign-up) */}
      <SignUpSection />
    </>
  );
}
