// /llms.txt: a plain-text map of the site for AI assistants and answer engines, in the llms.txt convention.
// Built from the same content as the pages, so the wording stays identical and the essay list stays current.
import { aboutSEO } from "@/content/about";
import { advocacySEO } from "@/content/advocacy";
import { faqGroups as localFaqGroups, type FaqGroup } from "@/content/faq";
import { findMeSEO } from "@/content/find-me";
import { homeSEO } from "@/content/home";
import { legalPages } from "@/content/legal";
import { onTheRecordSEO } from "@/content/on-the-record";
import { quietFocusSEO } from "@/content/quiet-focus";
import { reflectionsSEO } from "@/content/reflections";
import { speakingSEO } from "@/content/speaking";
import { tools, toolkitSEO } from "@/content/toolkit";
import { workSEO } from "@/content/work";
import { CONTACT_EMAIL, SITE_URL, personJsonLd, plainFaqAnswer } from "@/lib/seo";
import { getWPArticles, getWPFaqGroups } from "@/lib/wordpress";

export const revalidate = 3600;

const link = (label: string, path: string, note?: string) => `- [${label}](${SITE_URL}${path})${note ? `: ${note}` : ""}`;

const pages = [
  ["About", "/about", aboutSEO.description],
  ["Work with me", "/work", workSEO.description],
  ["Speaking", "/speaking", speakingSEO.description],
  ["Advocacy and Faith", "/advocacy-faith", advocacySEO.description],
  ["On the Record", "/on-the-record", onTheRecordSEO.description],
  ["Writing", "/articles", reflectionsSEO.description],
  ["Toolkit", "/toolkit", toolkitSEO.description],
  ["Quiet Focus", "/quiet-focus", quietFocusSEO.description],
  ["Find me", "/find-me", findMeSEO.description],
  ["FAQ", "/faq", "The questions people ask before they join, book or buy, with DK's answers."],
] as const;

export async function GET() {
  const [articles, wpFaq] = await Promise.all([getWPArticles(), getWPFaqGroups()]);
  const faq: FaqGroup[] = wpFaq ?? localFaqGroups;

  // The questions that define a term, so an assistant can explain the vocabulary in DK's own words.
  const terms = faq
    .flatMap((group) => group.items)
    .filter((item) => /^what (is|does)\b/i.test(item.question))
    .map((item) => `- ${item.question} ${plainFaqAnswer(item)}`);

  const essays = [...articles]
    .sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0))
    .map((article) => link(article.title, `/articles/${article.slug}`, `${article.date}. ${article.excerpt.trim()}`));

  const text = [
    "# DK Jonah",
    "",
    `> ${homeSEO.description}`,
    "",
    `${personJsonLd.description} Site: ${SITE_URL}. Language: British English.`,
    "",
    "## Pages",
    "",
    ...pages.map(([label, path, note]) => link(label, path, note)),
    "",
    "## Key terms, in DK's words",
    "",
    ...terms,
    "",
    "## Essays",
    "",
    ...essays,
    "",
    "## The Routine Ready Toolkit",
    "",
    ...tools.map((tool) => link(tool.title, `/toolkit/${tool.slug}`, tool.desc)),
    "",
    "## Contact",
    "",
    `- Email: ${CONTACT_EMAIL}`,
    link("Speaking enquiries", "/speaking#enquiry"),
    link("Join Quiet Focus", "/quiet-focus"),
    "",
    "## Names and spelling",
    "",
    "- NO GraGra: capital N, capital O, a space, then GraGra.",
    "- Quiet Focus: two words.",
    `- Tool names in full: ${tools.map((tool) => tool.title).join(", ")}.`,
    "",
    "## Optional",
    "",
    ...legalPages.map((page) => link(page.title, `/legal/${page.slug}`)),
    link("Sitemap", "/sitemap.xml"),
    "",
  ].join("\n");

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
