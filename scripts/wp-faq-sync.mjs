/**
 * Sends chosen FAQ groups from src/content/faq.ts to WordPress, without touching anything else.
 * Use it when a group is added or reordered in the content file and the other groups should stay as DK left them.
 *
 *   node --env-file=.env.local scripts/wp-faq-sync.mjs living-and-working books-tools-email
 *
 * Each named group is created or updated under the "faq" page with its order from the content file,
 * and its questions are created or updated beneath it. Nothing is deleted. Credentials come from the
 * environment only (WP_APP_USER, WP_APP_PASSWORD), as in scripts/wp-migrate.mjs.
 */

import path from "node:path";
import { pathToFileURL } from "node:url";
import { register } from "node:module";

const SITE = (process.env.WP_SITE_URL || "https://cms.dkjonah.com").replace(/\/$/, "");
const API = `${SITE}/wp-json/wp/v2`;
const USER = process.env.WP_APP_USER;
const PASS = process.env.WP_APP_PASSWORD;

if (!USER || !PASS) {
  console.error("Add WP_APP_USER and WP_APP_PASSWORD to .env.local, then run with: node --env-file=.env.local scripts/wp-faq-sync.mjs <group-id> ...");
  process.exit(1);
}

const wanted = process.argv.slice(2);
if (wanted.length === 0) {
  console.error("Name at least one group id from src/content/faq.ts, for example: living-and-working");
  process.exit(1);
}

register(pathToFileURL(path.resolve("scripts/ts-loader.mjs")).href, import.meta.url);
const { faqGroups } = await import(pathToFileURL(path.resolve("src/content/faq.ts")).href);

const token = Buffer.from(`${USER}:${PASS}`).toString("base64");
const auth = `Basic ${token}`;

const api = async (route, init = {}) => {
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

const json = (method, route, data) => api(route, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });

const findPage = async (slug) => {
  const list = await api(`/pages?slug=${encodeURIComponent(slug)}&status=any&per_page=1`);
  return Array.isArray(list) && list[0] ? list[0] : null;
};

const upsertPage = async (slug, data) => {
  const existing = await findPage(slug);
  if (existing) {
    const updated = await json("POST", `/pages/${existing.id}`, data);
    console.log(`  updated ${slug} (#${updated.id})`);
    return updated;
  }
  const created = await json("POST", `/pages`, data);
  console.log(`  created ${slug} (#${created.id})`);
  return created;
};

const root = await findPage("faq");
if (!root) {
  console.error("The 'faq' page does not exist in WordPress yet. Run scripts/wp-migrate.mjs first.");
  process.exit(1);
}

for (const id of wanted) {
  const index = faqGroups.findIndex((group) => group.id === id);
  if (index === -1) {
    console.error(`No group with id '${id}' in src/content/faq.ts`);
    process.exit(1);
  }
  const group = faqGroups[index];
  console.log(`${group.label} (order ${index + 1})`);

  const groupPage = await upsertPage(group.id, {
    title: group.label,
    slug: group.id,
    status: "publish",
    parent: root.id,
    menu_order: index + 1,
    content: "",
  });

  let order = 0;
  for (const item of group.items) {
    order += 1;
    const slug = `${group.id}-${order}`;
    const links = item.links?.length
      ? `<p class="faq-links">${item.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join(" ")}</p>`
      : "";
    await upsertPage(slug, {
      title: item.question,
      slug,
      status: "publish",
      parent: groupPage.id,
      menu_order: order,
      content: `<p>${item.answer}</p>${links}`,
    });
  }
}

console.log("Done. The site refreshes itself within a minute; /api/revalidate is pinged by WordPress on publish.");
