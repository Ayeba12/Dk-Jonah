import type { Metadata } from "next";
import { Lora } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CookieBanner } from "@/components/ui/CookieBanner";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dkjonah.com"),
  title: {
    default: "DK Jonah | Soft Reflections For Invisible Realities",
    template: "%s | DK Jonah",
  },
  description:
    "DK Jonah is a quiet lifestyle and reflection space for chronic illness, neurodiversity, faith, softness, and belonging.",
  keywords: [
    "chronic illness lifestyle",
    "neurodivergent writing",
    "soft faith reflections",
    "quiet lifestyle blog",
    "energy capacity planning",
    "gentle productivity resources",
    "DK Jonah",
  ],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "DK Jonah | Soft Reflections For Invisible Realities",
    description:
      "DK Jonah is a quiet lifestyle and reflection space for chronic illness, neurodiversity, faith, softness, and belonging.",
    url: "https://dkjonah.com",
    siteName: "DK Jonah",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/avenzor/images/website-logo.png",
        width: 1200,
        height: 630,
        alt: "DK Jonah Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DK Jonah | Soft Reflections For Invisible Realities",
    description:
      "DK Jonah is a quiet lifestyle and reflection space for chronic illness, neurodiversity, faith, softness, and belonging.",
    images: ["/assets/avenzor/images/website-logo.png"],
    creator: "@dkjonah",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${lora.variable}`} suppressHydrationWarning>
      <body className="min-h-full">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <CookieBanner />
      </body>
    </html>
  );
}
