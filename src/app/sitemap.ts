import { MetadataRoute } from "next";
import { getWPArticles } from "@/lib/wordpress";
import { tools } from "@/content/toolkit";
import { legalPages } from "@/content/legal";
import { SITE_URL } from "@/lib/seo";

// Rebuilt at most hourly, and straight away when WordPress pings /api/revalidate.
export const revalidate = 3600;

// Pages are listed without a last-modified date unless we really know it (the essays). A date that
// changes on every build is noise, and search engines learn to ignore it.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;

  const staticRoutes = [
    "",
    "/about",
    "/work",
    "/speaking",
    "/advocacy-faith",
    "/on-the-record",
    "/toolkit",
    "/quiet-focus",
    "/find-me",
    "/faq",
    "/articles",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: (route === "" || route === "/articles" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const legalRoutes = legalPages.map((page) => ({
    url: `${baseUrl}/legal/${page.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  // Essays from WordPress, with the real publish or edit date.
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await getWPArticles();
    articleRoutes = articles.map((article) => {
      const stamp = Date.parse(article.modified ?? article.date);
      return {
        url: `${baseUrl}/articles/${article.slug}`,
        ...(Number.isNaN(stamp) ? {} : { lastModified: new Date(stamp) }),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error("Sitemap: could not list the essays.", error);
  }

  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/toolkit/${tool.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...legalRoutes, ...articleRoutes, ...toolRoutes];
}
