import { MetadataRoute } from "next";
import { getWPArticles, getWPResources } from "@/lib/wordpress";
import { legalPages } from "@/content/legal";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dkjonah.com";

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

  // Dynamic projects/tools
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projectsList = await getWPResources();
    projectRoutes = projectsList.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (e) {
    console.error("Sitemap dynamic projects error:", e);
  }

  return [...staticRoutes, ...legalRoutes, ...articleRoutes, ...projectRoutes];
}
