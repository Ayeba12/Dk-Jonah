import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CookieBanner } from "@/components/ui/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dkjonah.com"),
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
    url: "https://dkjonah.com",
    siteName: "DK Jonah",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/assets/avenzor/images/website-logo.png",
        width: 1200,
        height: 630,
        alt: "DK Jonah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DK Jonah | Language and Structure for Invisible Realities",
    description:
      "DK Jonah turns lived experience and complex ideas into language and structure people can use. Chronic illness, neurodiversity, faith and pace.",
    images: ["/assets/avenzor/images/website-logo.png"],
    creator: "@dkjonah",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      </body>
    </html>
  );
}
