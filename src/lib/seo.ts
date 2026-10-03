// Shared search and social settings: the canonical host, the preview image and the structured data
// that describes DK and the site once, so every page points at the same entities.
import type { FaqItem } from "@/content/faq";
import { homeSEO } from "@/content/home";
import { expertiseTopics, keywordsFor, siteKeywords } from "@/content/keywords";
import { socialLinks } from "@/content/navigation";

export const SITE_URL = "https://www.dkjonah.com";
export const SITE_NAME = "DK Jonah";
export const CONTACT_EMAIL = "hello@dkjonah.com";

// Stable ids so pages can reference these entities instead of describing them again.
export const PERSON_ID = `${SITE_URL}/#person`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// Turns a site path or a CMS address into a full address. Structured data needs full addresses.
export const absoluteUrl = (path: string) => {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

// The social preview shared by every page. Essay pages use their own cover instead.
export const socialImage = {
  url: "/og/dk-jonah.png",
  width: 1200,
  height: 630,
  alt: "DK Jonah. Language and structure for invisible realities.",
};

export const ogImages = [socialImage];
export const twitterImages = [socialImage.url];

const LOGO_URL = `${SITE_URL}/assets/avenzor/images/website-logo.png`;
const PORTRAIT_URL = `${SITE_URL}/assets/avenzor/images/about-portrait.webp`;

export const personJsonLd = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "DK Jonah",
  url: `${SITE_URL}/about`,
  image: PORTRAIT_URL,
  description:
    "Nigerian writer, speaker and coach helping people set goals they can keep and build structure that fits their real life.",
  jobTitle: "Knowledge Architect, Speaker and Coach",
  email: CONTACT_EMAIL,
  nationality: { "@type": "Country", name: "Nigeria" },
  knowsAbout: expertiseTopics,
  sameAs: socialLinks.map((link) => link.href),
  worksFor: { "@id": ORGANIZATION_ID },
};

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: LOGO_URL },
  image: `${SITE_URL}${socialImage.url}`,
  email: CONTACT_EMAIL,
  founder: { "@id": PERSON_ID },
  sameAs: socialLinks.map((link) => link.href),
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  alternateName: "dkjonah.com",
  url: SITE_URL,
  description: homeSEO.description,
  keywords: siteKeywords.join(", "),
  inLanguage: "en-GB",
  publisher: { "@id": ORGANIZATION_ID },
  author: { "@id": PERSON_ID },
};

// Placed once in the root layout. Every other page refers to these three by id.
export const siteGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [personJsonLd, organizationJsonLd, websiteJsonLd],
};

export type Crumb = { name: string; path: string };

export const breadcrumbJsonLd = (crumbs: Crumb[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

type PageSchemaOptions = {
  name: string;
  description: string;
  path: string;
  /** schema.org page type. WebPage unless the page is clearly something more specific. */
  type?: "WebPage" | "AboutPage" | "ProfilePage" | "CollectionPage" | "ContactPage" | "FAQPage";
  /** Breadcrumb trail beneath Home. Defaults to the page itself. */
  crumbs?: Crumb[];
  /** Extra nodes to publish alongside the page, such as an ItemList of essays. */
  extra?: Record<string, unknown>[];
};

// The structured data for an ordinary page: what it is, where it sits, and who it is about.
export const pageJsonLd = ({ name, description, path, type = "WebPage", crumbs, extra = [] }: PageSchemaOptions) => {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        keywords: keywordsFor(path).join(", "),
        inLanguage: "en-GB",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        ...(type === "ProfilePage" || type === "AboutPage" ? { mainEntity: { "@id": PERSON_ID } } : {}),
      },
      ...(crumbs && crumbs.length === 0 ? [] : [breadcrumbJsonLd(crumbs ?? [{ name, path }])]),
      ...extra,
    ],
  };
};

// Gives every page the same About DK reference for the author line in metadata.
export const metadataAuthors = [{ name: "DK Jonah", url: `${SITE_URL}/about` }];

// An FAQ answer as plain words. WordPress answers end with a row of links; that row is not part of the answer.
export const plainFaqAnswer = (item: FaqItem) => {
  if (!item.answerHtml) return (item.answer ?? "").trim();
  return item.answerHtml
    .replace(/<p class="faq-links">[\s\S]*?<\/p>/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};
