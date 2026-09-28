/**
 * One-off migration: moves the four essays and the FAQ into WordPress at cms.dkjonah.com.
 *
 * Run from the project root, after adding WP_APP_USER and WP_APP_PASSWORD to .env.local
 * (a WordPress user and an Application Password for that user):
 *
 *   node --env-file=.env.local scripts/wp-migrate.mjs
 *
 * It is safe to run more than once: anything that already exists by slug is updated, not duplicated.
 * Nothing in this file holds a credential; both come from the environment.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { register } from "node:module";

const SITE = (process.env.WP_SITE_URL || "https://cms.dkjonah.com").replace(/\/$/, "");
const API = `${SITE}/wp-json/wp/v2`;
const USER = process.env.WP_APP_USER;
const PASS = process.env.WP_APP_PASSWORD;

if (!USER || !PASS) {
  console.error("Add WP_APP_USER and WP_APP_PASSWORD to .env.local, then run with: node --env-file=.env.local scripts/wp-migrate.mjs");
  process.exit(1);
}

const auth = "Basic " + Buffer.from(`${USER}:${PASS}`).toString("base64");

// The content files are TypeScript. Strip the types on the fly so this script needs no build step.
register(pathToFileURL(path.resolve("scripts/ts-loader.mjs")).href, import.meta.url);
const { articles } = await import(pathToFileURL(path.resolve("src/content/articles.ts")).href);
const { faqGroups } = await import(pathToFileURL(path.resolve("src/content/faq.ts")).href);

const token = Buffer.from(`${USER}:${PASS}`).toString("base64");

const api = async (route, init = {}) => {
  // The host drops the standard header, so the login also travels on two spare headers and, as a last
  // resort, a query parameter. All three are read by scripts/wp-mu-authorization-header.php on the server.
  const joiner = route.includes("?") ? "&" : "?";
  const res = await fetch(`${API}${route}${joiner}dk_auth=${encodeURIComponent(token)}`, {
    ...init,
    headers: { Authorization: auth, "X-Authorization": auth, "X-DK-Auth": token, Accept: "application/json", ...(init.headers || {}) },
  });
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  if (!res.ok) throw new Error(`${init.method || "GET"} ${route} → ${res.status}: ${typeof body === "string" ? body.slice(0, 200) : body.message || JSON.stringify(body).slice(0, 200)}`);
  return body;
};

const json = (method, route, data) =>
  api(route, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });

const findBySlug = async (type, slug, extra = "") => {
  const list = await api(`/${type}?slug=${encodeURIComponent(slug)}&status=any&per_page=1${extra}`);
  return Array.isArray(list) && list[0] ? list[0] : null;
};

const upsert = async (type, slug, data, extra = "") => {
  const existing = await findBySlug(type, slug, extra);
  if (existing) {
    const updated = await json("POST", `/${type}/${existing.id}`, data);
    console.log(`  updated ${type} ${slug} (#${updated.id})`);
    return updated;
  }
  const created = await json("POST", `/${type}`, data);
  console.log(`  created ${type} ${slug} (#${created.id})`);
  return created;
};

// ---------- media ----------

const mediaCache = new Map();

const uploadImage = async (publicPath, alt) => {
  const name = path.basename(publicPath);
  if (mediaCache.has(name)) return mediaCache.get(name);

  const stem = name.replace(/\.[^.]+$/, "");
  const existing = await api(`/media?search=${encodeURIComponent(stem)}&per_page=5`);
  const found = Array.isArray(existing) ? existing.find((m) => (m.source_url || "").includes(stem)) : null;
  if (found) {
    mediaCache.set(name, found);
    console.log(`  media exists ${name} (#${found.id})`);
    return found;
  }

  const file = await readFile(path.join("public", publicPath));
  const type = name.endsWith(".webp") ? "image/webp" : name.endsWith(".png") ? "image/png" : "image/jpeg";
  const media = await api(`/media`, {
    method: "POST",
    headers: { "Content-Type": type, "Content-Disposition": `attachment; filename="${name}"` },
    body: file,
  });
  await json("POST", `/media/${media.id}`, { alt_text: alt, title: stem.replace(/-/g, " ") });
  mediaCache.set(name, media);
  console.log(`  uploaded ${name} (#${media.id})`);
  return media;
};

// ---------- categories ----------

const categoryId = async (name, slug) => {
  const list = await api(`/categories?slug=${encodeURIComponent(slug)}`);
  if (Array.isArray(list) && list[0]) return list[0].id;
  const created = await json("POST", `/categories`, { name, slug });
  console.log(`  created category ${name}`);
  return created.id;
};

// ---------- essays ----------

const toIsoDate = (text) => {
  const parsed = Date.parse(text);
  return Number.isNaN(parsed) ? new Date().toISOString() : new Date(parsed + 9 * 3600 * 1000).toISOString().replace("Z", "");
};

console.log("Essays");
for (const essay of [...articles].reverse()) {
  const cover = await uploadImage(essay.image, essay.title);

  // Inline pictures inside the body move to the media library too.
  let content = typeof essay.body === "string" ? essay.body : essay.body.map((p) => `<p>${p}</p>`).join("");
  const inline = [...content.matchAll(/<img src="(\/assets\/[^"]+)" alt="([^"]*)"/g)];
  for (const match of inline) {
    const media = await uploadImage(match[1], match[2]);
    content = content.replaceAll(match[1], media.source_url);
  }

  const categories = [];
  for (const cat of essay.categories || []) categories.push(await categoryId(cat.name, cat.slug));

  await upsert("posts", essay.slug, {
    title: essay.title,
    slug: essay.slug,
    status: "publish",
    date: toIsoDate(essay.date),
    excerpt: essay.excerpt,
    content: content.trim(),
    categories,
    featured_media: cover.id,
    comment_status: "closed",
  });
}

// The sample post that ships with WordPress would otherwise appear in the archive.
const hello = await findBySlug("posts", "hello-world");
if (hello && hello.status === "publish") {
  await json("POST", `/posts/${hello.id}`, { status: "draft" });
  console.log("  moved 'Hello world!' to draft");
}

// ---------- FAQ as pages: faq > group > question ----------

console.log("FAQ");
const root = await upsert("pages", "faq", {
  title: "FAQ",
  slug: "faq",
  status: "publish",
  content: "<p>The questions on dkjonah.com/faq. Each group is a page under this one; each question is a page under its group. Use the Order field to arrange them.</p>",
});

let groupOrder = 0;
for (const group of faqGroups) {
  groupOrder += 1;
  const groupPage = await upsert("pages", group.id, {
    title: group.label,
    slug: group.id,
    status: "publish",
    parent: root.id,
    menu_order: groupOrder,
    content: "",
  });

  let itemOrder = 0;
  for (const item of group.items) {
    itemOrder += 1;
    const slug = `${group.id}-${itemOrder}`;
    const links = item.links?.length
      ? `<p class="faq-links">${item.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join(" ")}</p>`
      : "";
    await upsert("pages", slug, {
      title: item.question,
      slug,
      status: "publish",
      parent: groupPage.id,
      menu_order: itemOrder,
      content: `<p>${item.answer}</p>${links}`,
    });
  }
}

console.log("Done. Check https://cms.dkjonah.com/wp-admin/edit.php and edit.php?post_type=page");
