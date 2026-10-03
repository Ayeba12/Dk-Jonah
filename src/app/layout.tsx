import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CookieBanner } from "@/components/ui/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dkjonah.com"),
  title: {
    default: "DK Jonah | Language and Structure for Invisible Realities",
    template: "%s | DK Jonah",
  },
  description:
    "DK Jonah turns lived experience and complex ideas into language and structure people can use. Chronic illness, neurodiversity, faith and pace.",
  keywords: [
    "DK Jonah",
    "lived experience speaker",
    "chronic illness writer",
    "neurodivergent writing",
    "faith reflections",
    "hidden captivity",
    "Routine Ready",
    "Quiet Focus",
  ],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "DK Jonah | Language and Structure for Invisible Realities",
    description:
      "DK Jonah turns lived experience and complex ideas into language and structure people can use. Chronic illness, neurodiversity, faith and pace.",
    url: "https://www.dkjonah.com",
    siteName: "DK Jonah",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og/dk-jonah.png",
        width: 1200,
        height: 630,
        alt: "DK Jonah. Language and structure for invisible realities.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DK Jonah | Language and Structure for Invisible Realities",
    description:
      "DK Jonah turns lived experience and complex ideas into language and structure people can use. Chronic illness, neurodiversity, faith and pace.",
    images: ["/og/dk-jonah.png"],
    creator: "@dkjonah",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Google Search Console ownership tag. Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in the hosting environment.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="antialiased">
        <SiteHeader />
        {/* No overflow clipping here: it would break the sticky headings on About. */}
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
