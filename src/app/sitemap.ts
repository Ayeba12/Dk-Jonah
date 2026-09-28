import { MetadataRoute } from "next";
import { getWPArticles } from "@/lib/wordpress";
import { tools } from "@/content/toolkit";
import { legalPages } from "@/content/legal";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dkjonah.com";

  // Static routes
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
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Legal routes
  const legalRoutes = legalPages.map((page) => ({
    url: `${baseUrl}/legal/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // Dynamic articles
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await getWPArticles();
    articleRoutes = articles.map((article) => {
      // Validate date string
      const dateVal = Date.parse(article.date);
      const lastMod = isNaN(dateVal) ? new Date() : new Date(dateVal);
      return {
        url: `${baseUrl}/articles/${article.slug}`,
        lastModified: lastMod,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });
  } catch (e) {
    console.error("Sitemap dynamic articles error:", e);
  }

  // The Routine Ready tools
  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/toolkit/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...legalRoutes, ...articleRoutes, ...toolRoutes];
}
