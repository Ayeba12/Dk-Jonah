import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Crawlers for the answer engines and AI assistants, named so the welcome is explicit.
const assistantCrawlers = [
  "Googlebot",
  "Bingbot",
  "Google-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Applebot",
  "Applebot-Extended",
  "DuckAssistBot",
  "meta-externalagent",
];

// Only the API and the sign-up thank-you page stay out of the index. Styles and scripts under /_next
// must stay crawlable so Google can render the pages the way visitors see them.
const keepOut = ["/api/", "/quiet-focus/thank-you"];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: keepOut },
      ...assistantCrawlers.map((userAgent) => ({ userAgent, allow: "/", disallow: keepOut })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
