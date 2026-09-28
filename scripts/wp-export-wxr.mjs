/**
 * Plan B for the WordPress transfer: writes a WordPress import file (WXR) with the four essays,
 * their pictures and the FAQ pages. Upload it in WordPress under Tools, then Import, then WordPress,
 * tick "Download and import file attachments", and assign the posts to DK's user.
 *
 *   node scripts/wp-export-wxr.mjs
 *
 * Output: wordpress-import.xml in the project root. No login is needed for this route.
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { register } from "node:module";

register(pathToFileURL(path.resolve("scripts/ts-loader.mjs")).href, import.meta.url);
const { articles } = await import(pathToFileURL(path.resolve("src/content/articles.ts")).href);
const { faqGroups } = await import(pathToFileURL(path.resolve("src/content/faq.ts")).href);

// The sketches as the image generator published them, so the importer can download them.
const CDN = "https://cdn.gamma.app/kc6otdip74s6rby/design-anything";
const remoteImages = {
  "/assets/avenzor/images/essay-01-gate.webp": `${CDN}/sq8aumwM1pG5n3YVVwYhI/eBf3PXD2eGhIWsuxOk1EE.jpg`,
  "/assets/avenzor/images/essay-01-pen.webp": `${CDN}/m3boVJw7nceEKN2bF2URk/pzTK9VkQbFjvJAPye-mLX.jpg`,
  "/assets/avenzor/images/essay-02-pitch.webp": `${CDN}/uGcGjgVu9D3RcGzg6sPJm/stVUzkSxne3TFnVuMiEoj.jpg`,
  "/assets/avenzor/images/essay-02-bricks.webp": `${CDN}/JvwCL6LTmw7LwSZl4EGtY/DbgqNNRUS9h0-9rB4Ja3_.jpg`,
  "/assets/avenzor/images/essay-03-desk.webp": `${CDN}/UQho3AVv2RAg9h2KyyVUv/3Mmg6hGs037Yum01aprjc.jpg`,
  "/assets/avenzor/images/essay-03-layers.webp": `${CDN}/O1KuwNcr07dngVhIxhgoR/rFtdrjj6Z05EwK7sPiKKl.jpg`,
  "/assets/avenzor/images/essay-silence-bench.webp": `${CDN}/1dhsiSELryJPiViuO54Ts/3_zrDLZ-XA8pS7nVp7sqa.jpg`,
};

const esc = (text) =>
  String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const cdata = (text) => `<![CDATA[${String(text).replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

let nextId = 1000;
const items = [];
const categories = new Map();

const stamp = (date) => {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} 09:00:00`;
};

const item = ({ id, title, slug, type, status = "publish", content = "", excerpt = "", date, parent = 0, order = 0, cats = [], meta = [], attachmentUrl }) => `
  <item>
    <title>${esc(title)}</title>
    <link>https://cms.dkjonah.com/${slug}/</link>
    <pubDate>${new Date(date).toUTCString()}</pubDate>
    <dc:creator>${cdata("dk")}</dc:creator>
    <guid isPermaLink="false">https://cms.dkjonah.com/?p=${id}</guid>
    <description></description>
    <content:encoded>${cdata(content)}</content:encoded>
    <excerpt:encoded>${cdata(excerpt)}</excerpt:encoded>
    <wp:post_id>${id}</wp:post_id>
    <wp:post_date>${cdata(stamp(date))}</wp:post_date>
    <wp:post_date_gmt>${cdata(stamp(date))}</wp:post_date_gmt>
    <wp:comment_status>${cdata("closed")}</wp:comment_status>
    <wp:ping_status>${cdata("closed")}</wp:ping_status>
    <wp:post_name>${cdata(slug)}</wp:post_name>
    <wp:status>${cdata(status)}</wp:status>
    <wp:post_parent>${parent}</wp:post_parent>
    <wp:menu_order>${order}</wp:menu_order>
    <wp:post_type>${cdata(type)}</wp:post_type>
    <wp:post_password>${cdata("")}</wp:post_password>
    <wp:is_sticky>0</wp:is_sticky>
    ${attachmentUrl ? `<wp:attachment_url>${cdata(attachmentUrl)}</wp:attachment_url>` : ""}
    ${cats.map((c) => `<category domain="category" nicename="${esc(c.slug)}">${cdata(c.name)}</category>`).join("\n    ")}
    ${meta.map((m) => `<wp:postmeta><wp:meta_key>${cdata(m.key)}</wp:meta_key><wp:meta_value>${cdata(m.value)}</wp:meta_value></wp:postmeta>`).join("\n    ")}
  </item>`;

const attachmentIds = new Map();
const attachmentFor = (localPath, alt, date) => {
  if (attachmentIds.has(localPath)) return attachmentIds.get(localPath);
  const url = remoteImages[localPath];
  if (!url) return null;
  const id = nextId++;
  const name = path.basename(localPath).replace(/\.webp$/, "");
  items.push(
    item({ id, title: name.replace(/-/g, " "), slug: name, type: "attachment", status: "inherit", date, attachmentUrl: url, meta: [{ key: "_wp_attachment_image_alt", value: alt }] }),
  );
  attachmentIds.set(localPath, { id, url });
  return attachmentIds.get(localPath);
};

// Essays, oldest first so the ids read in order.
for (const essay of [...articles].reverse()) {
  const cover = attachmentFor(essay.image, essay.title, essay.date);
  let content = typeof essay.body === "string" ? essay.body : essay.body.map((p) => `<p>${p}</p>`).join("");
  for (const match of [...content.matchAll(/<figure><img src="(\/assets\/[^"]+)" alt="([^"]*)" loading="lazy" \/><\/figure>/g)]) {
    const att = attachmentFor(match[1], match[2], essay.date);
    // Pictures without a public copy are left out of the import; the essay reads fine without them.
    content = content.replace(match[0], att ? `<figure class="wp-block-image"><img src="${att.url}" alt="${match[2]}" /></figure>` : "");
  }
  for (const cat of essay.categories || []) categories.set(cat.slug, cat.name);
  items.push(
    item({
      id: nextId++,
      title: essay.title,
      slug: essay.slug,
      type: "post",
      date: essay.date,
      excerpt: essay.excerpt,
      content: content.trim(),
      cats: essay.categories || [],
      meta: cover ? [{ key: "_thumbnail_id", value: String(cover.id) }] : [],
    }),
  );
}

// FAQ as pages: faq > group > question.
const today = new Date().toISOString();
const rootId = nextId++;
items.push(
  item({
    id: rootId,
    title: "FAQ",
    slug: "faq",
    type: "page",
    date: today,
    content: "<p>The questions on dkjonah.com/faq. Each group is a page under this one; each question is a page under its group. Use the Order field to arrange them.</p>",
  }),
);
faqGroups.forEach((group, gi) => {
  const groupId = nextId++;
  items.push(item({ id: groupId, title: group.label, slug: group.id, type: "page", date: today, parent: rootId, order: gi + 1 }));
  group.items.forEach((q, qi) => {
    const links = q.links?.length ? `<p class="faq-links">${q.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join(" ")}</p>` : "";
    items.push(item({ id: nextId++, title: q.question, slug: `${group.id}-${qi + 1}`, type: "page", date: today, parent: groupId, order: qi + 1, content: `<p>${q.answer}</p>${links}` }));
  });
});

const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/">
<channel>
  <title>DK Jonah</title>
  <link>https://cms.dkjonah.com</link>
  <description>Essays and FAQ for dkjonah.com</description>
  <pubDate>${new Date().toUTCString()}</pubDate>
  <language>en-GB</language>
  <wp:wxr_version>1.2</wp:wxr_version>
  <wp:base_site_url>https://cms.dkjonah.com</wp:base_site_url>
  <wp:base_blog_url>https://cms.dkjonah.com</wp:base_blog_url>
  <wp:author><wp:author_id>1</wp:author_id><wp:author_login>${cdata("dk")}</wp:author_login><wp:author_email>${cdata("dk@dkjonah.com")}</wp:author_email><wp:author_display_name>${cdata("DK Jonah")}</wp:author_display_name></wp:author>
  ${[...categories].map(([slug, name], i) => `<wp:category><wp:term_id>${i + 1}</wp:term_id><wp:category_nicename>${cdata(slug)}</wp:category_nicename><wp:category_parent>${cdata("")}</wp:category_parent><wp:cat_name>${cdata(name)}</wp:cat_name></wp:category>`).join("\n  ")}
  <generator>dkjonah.com build</generator>
${items.join("\n")}
</channel>
</rss>
`;

await writeFile("wordpress-import.xml", xml, "utf8");
console.log(`Wrote wordpress-import.xml: ${articles.length} essays, ${attachmentIds.size} pictures, ${faqGroups.length} FAQ groups, ${faqGroups.reduce((n, g) => n + g.items.length, 0)} questions.`);
