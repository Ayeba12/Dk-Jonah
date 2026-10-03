/**
 * Puts the essay drafts in scripts/wp-essay-drafts/ into WordPress as DRAFT posts for DK to review.
 * Drafts never appear on the site until someone publishes them in WordPress.
 *
 *   node --env-file=.env.local scripts/wp-essay-drafts.mjs
 *
 * Each HTML file starts with one comment line: title | slug | category (slug, optional) | excerpt.
 * A post whose slug already exists in WordPress, in any status, is left alone, so DK's edits are never overwritten.
 * Credentials come from the environment only (WP_APP_USER, WP_APP_PASSWORD), as in scripts/wp-migrate.mjs.
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const SITE = (process.env.WP_SITE_URL || "https://cms.dkjonah.com").replace(/\/$/, "");
const API = `${SITE}/wp-json/wp/v2`;
const USER = process.env.WP_APP_USER;
const PASS = process.env.WP_APP_PASSWORD;

if (!USER || !PASS) {
  console.error("Add WP_APP_USER and WP_APP_PASSWORD to .env.local, then run with: node --env-file=.env.local scripts/wp-essay-drafts.mjs");
  process.exit(1);
}

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

const folder = path.resolve("scripts/wp-essay-drafts");
const files = (await readdir(folder)).filter((name) => name.endsWith(".html")).sort();

for (const name of files) {
  const html = await readFile(path.join(folder, name), "utf8");
  const header = html.match(/^<!--\s*(.*?)\s*-->/s);
  if (!header) {
    console.error(`${name}: missing the header comment, skipped`);
    continue;
  }
  const fields = Object.fromEntries(
    header[1].split("|").map((part) => {
      const [key, ...rest] = part.split(":");
      return [key.trim(), rest.join(":").trim()];
    }),
  );
  const content = html.slice(header[0].length).trim();

  const existing = await api(`/posts?slug=${encodeURIComponent(fields.slug)}&status=any&per_page=1`);
  if (Array.isArray(existing) && existing[0]) {
    console.log(`  exists  ${fields.slug} (#${existing[0].id}, ${existing[0].status}), left alone`);
    continue;
  }

  let categories = [];
  if (fields.category) {
    const found = await api(`/categories?slug=${encodeURIComponent(fields.category)}`);
    if (Array.isArray(found) && found[0]) categories = [found[0].id];
  }

  const created = await api(`/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: fields.title,
      slug: fields.slug,
      status: "draft",
      excerpt: fields.excerpt,
      content,
      categories,
      comment_status: "closed",
    }),
  });
  console.log(`  drafted ${fields.slug} (#${created.id})`);
}

console.log(`Done. Review the drafts at ${SITE}/wp-admin/edit.php?post_status=draft`);
