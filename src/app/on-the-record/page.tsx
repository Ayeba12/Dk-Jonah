import type { Metadata } from "next";
import {
  AskedBackSection,
  ConversationsSection,
  PressSection,
  RecordCloseSection,
  RecordHero,
  ShowsSection,
  StagesSection,
} from "@/components/sections/OnTheRecordSections";
import { onTheRecordSEO } from "@/content/on-the-record";

export const metadata: Metadata = {
  title: onTheRecordSEO.title,
  description: onTheRecordSEO.description,
  alternates: {
    canonical: "/on-the-record",
  },
  openGraph: {
    title: `${onTheRecordSEO.title} | DK Jonah`,
    description: onTheRecordSEO.description,
    url: "https://dkjonah.com/on-the-record",
    siteName: "DK Jonah",
    type: "website",
  },
};

export default function OnTheRecordPage() {
  return (
    <>
      {/* 1. Hero */}
      <RecordHero />

      {/* 2. Asked back */}
      <AskedBackSection />

      {/* 3. Shows I host */}
      <ShowsSection />

      {/* 4. In conversation */}
      <ConversationsSection />

      {/* 5. Stages and summits */}
      <StagesSection />

      {/* 6. Lived experience and press */}
      <PressSection />

      {/* 7. Close */}
      <RecordCloseSection />
    </>
  );
}
