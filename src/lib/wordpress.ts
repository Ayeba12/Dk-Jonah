/* eslint-disable @typescript-eslint/no-explicit-any */
import { cache } from "react";
import { articles, Article } from "@/content/articles";
import { projects, Project } from "@/content/projects";
import { faqs } from "@/content/portfolio";

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || "";

interface CacheEntry {
  data: any;
  timestamp: number;
}

const memoryCache = new Map<string, CacheEntry>();
const failedQueries = new Map<string, number>(); // tracks timestamps of recent failures
const CACHE_TTL_MS = 2_000; // 2-second in-memory cache for fast dev navigation and instant CMS updates
const FAILURE_COOLDOWN_MS = 2_000; // skip re-trying failed queries for 2s

// Generic GraphQL fetch client
async function fetchAPI(query: string, variables: Record<string, any> = {}) {
  if (!WORDPRESS_API_URL) {
    throw new Error("WORDPRESS_API_URL environment variable is not set.");
  }

  const isDev = process.env.NODE_ENV === "development";
  const cacheKey = JSON.stringify({ query, variables });

  if (isDev) {
    // Return cached data if still fresh
    const cached = memoryCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }

    // Skip queries that recently failed (avoids repeated slow network round-trips)
    const lastFailure = failedQueries.get(cacheKey);
    if (lastFailure && Date.now() - lastFailure < FAILURE_COOLDOWN_MS) {
      throw new Error("Skipping recently-failed GraphQL query");
    }
  }

  const headers = { "Content-Type": "application/json" };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), isDev ? 10000 : 3000); // 10s timeout on dev, 3s on prod

  let res: Response;
  try {
    res = await fetch(WORDPRESS_API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
      ...(isDev ? { cache: "no-store" as RequestCache } : { next: { revalidate: 5 } }),
    });
  } finally {
    clearTimeout(timeout);
  }

  const json = await res.json();
  if (json.errors) {
    console.warn("GraphQL Errors:", json.errors);
    if (isDev) failedQueries.set(cacheKey, Date.now());
    throw new Error("Failed to fetch API from WordPress");
  }

  if (isDev) {
    memoryCache.set(cacheKey, {
      data: json.data,
      timestamp: Date.now(),
    });
    // Clear any previous failure record on success
    failedQueries.delete(cacheKey);
  }

  return json.data;
}

function calculateReadingTime(content: string | string[]): string {
  const text = Array.isArray(content) ? content.join(" ") : content || "";
  const cleanText = text.replace(/<[^>]*>/g, "").trim();
  const words = cleanText.split(/\s+/).filter(Boolean).length;
  if (words === 0) return "1 min read";
  const wpm = 200; // Average reading speed
  const minutes = Math.ceil(words / wpm);
  return `${minutes} min read`;
}

// ----------------------------------------------------
// ARTICLES (WP Posts)
// ----------------------------------------------------

export const getWPArticles = cache(async (): Promise<Article[]> => {
  try {
    if (!WORDPRESS_API_URL) return articles;

    const data = await fetchAPI(`
      query GetWPArticles {
        posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            slug
            title
            date
            excerpt
            content
            featuredImage {
              node {
                sourceUrl
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
            tags {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    `);

    return data.posts.nodes.map((post: any) => {
      return {
        slug: post.slug,
        title: post.title,
        date: new Date(post.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        readTime: calculateReadingTime(post.content || ""),
        image: post.featuredImage?.node?.sourceUrl || "/assets/avenzor/images/quiet-moment-window.webp",
        excerpt: post.excerpt?.replace(/<[^>]*>/g, "") || "",
        body: post.content || "",
        categories: post.categories?.nodes || [],
        tags: post.tags?.nodes || [],
      };
    });
  } catch (error) {
    console.warn("WordPress connection failed. Falling back to local articles content.", error);
    return articles;
  }
});

export const getWPArticle = cache(async (slug: string): Promise<Article | null> => {
  try {
    if (!WORDPRESS_API_URL) {
      return articles.find((a) => a.slug === slug) || null;
    }

    const data = await fetchAPI(
      `
      query GetWPArticleBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          slug
          title
          date
          content
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          tags {
            nodes {
              name
              slug
            }
          }
        }
      }
      `,
      { id: slug, idType: "SLUG" }
    );

    if (!data.post) return null;

    const post = data.post;

    return {
      slug: post.slug,
      title: post.title,
      date: new Date(post.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      readTime: calculateReadingTime(post.content || ""),
      image: post.featuredImage?.node?.sourceUrl || "/assets/avenzor/images/article-minimalism.png",
      excerpt: post.excerpt?.replace(/<[^>]*>/g, "") || "",
      body: post.content || "",
      categories: post.categories?.nodes || [],
      tags: post.tags?.nodes || [],
    };
  } catch (error) {
    console.warn(`WordPress connection failed for slug: ${slug}. Falling back to local.`, error);
    return articles.find((a) => a.slug === slug) || null;
  }
});

// ----------------------------------------------------
// TOOLKIT RESOURCES (WP CPT: toolkit_resource + ACF)
// ----------------------------------------------------

export const getWPResources = cache(async (): Promise<Project[]> => {
  try {
    if (!WORDPRESS_API_URL) return projects;

    // ACF setup expects: summary, description, scope, outcomes fields
    const data = await fetchAPI(`
      query GetWPResources {
        resources(first: 100) {
          nodes {
            slug
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
            tags {
              nodes {
                name
                slug
              }
            }
            acfFields {
              summary
              description
              scope {
                item
              }
              outcomes {
                item
              }
            }
          }
        }
      }
    `);

    return data.resources.nodes.map((res: any) => {
      const scopeList = res.acfFields?.scope?.map((s: any) => s.item) || [];
      const outcomesList = res.acfFields?.outcomes?.map((o: any) => o.item) || [];

      return {
        slug: res.slug,
        title: res.title,
        category: res.categories?.nodes?.[0]?.name || "Resource",
        year: "Toolkit",
        image: res.featuredImage?.node?.sourceUrl || "/assets/avenzor/images/project-flowpath.avif",
        summary: res.acfFields?.summary || "",
        description: res.acfFields?.description || "",
        scope: scopeList,
        outcomes: outcomesList,
        readTime: calculateReadingTime(res.acfFields?.description || ""),
        categories: res.categories?.nodes || [],
        tags: res.tags?.nodes || [],
      };
    });
  } catch (error) {
    console.warn("WordPress connection failed. Falling back to local resources content.", error);
    return projects;
  }
});

export const getWPResource = cache(async (slug: string): Promise<Project | null> => {
  try {
    if (!WORDPRESS_API_URL) {
      return projects.find((p) => p.slug === slug) || null;
    }

    const data = await fetchAPI(
      `
      query GetWPResourceBySlug($id: ID!, $idType: ResourceIdType!) {
        resource(id: $id, idType: $idType) {
          slug
          title
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          tags {
            nodes {
              name
              slug
            }
          }
          acfFields {
            summary
            description
            scope {
              item
            }
            outcomes {
              item
            }
          }
        }
      }
      `,
      { id: slug, idType: "SLUG" }
    );

    if (!data.resource) return null;

    const res = data.resource;
    const scopeList = res.acfFields?.scope?.map((s: any) => s.item) || [];
    const outcomesList = res.acfFields?.outcomes?.map((o: any) => o.item) || [];

    return {
      slug: res.slug,
      title: res.title,
      category: res.categories?.nodes?.[0]?.name || "Resource",
      year: "Toolkit",
      image: res.featuredImage?.node?.sourceUrl || "/assets/avenzor/images/project-flowpath.avif",
      summary: res.acfFields?.summary || "",
      description: res.acfFields?.description || "",
      scope: scopeList,
      outcomes: outcomesList,
      readTime: calculateReadingTime(res.acfFields?.description || ""),
      categories: res.categories?.nodes || [],
      tags: res.tags?.nodes || [],
    };
  } catch (error) {
    console.warn(`WordPress connection failed for slug: ${slug}. Falling back to local.`, error);
    return projects.find((p) => p.slug === slug) || null;
  }
});

// ----------------------------------------------------
// FAQS (WP Custom Fields / CPT / Category option)
// ----------------------------------------------------

export const getWPFAQs = cache(async (): Promise<[string, string][]> => {
  try {
    if (!WORDPRESS_API_URL) return faqs as [string, string][];

    const data = await fetchAPI(`
      query GetWPFAQs {
        faqs(first: 100) {
          nodes {
            title
            content
          }
        }
      }
    `);

    return data.faqs.nodes.map((faq: any) => [
      faq.title,
      faq.content?.replace(/<[^>]*>/g, "") || "",
    ]);
  } catch {
    return faqs as [string, string][];
  }
});
