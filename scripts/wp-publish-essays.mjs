// Publishes the three essay drafts: downloads each cover, converts it to webp, uploads it to the WordPress
// media library, sets it as the featured image, removes the draft note and sets the post live.
// Usage: node --env-file=.env.local wp-publish-essays.mjs <slug>=<imageUrl> ...
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const API = "https://cms.dkjonah.com/wp-json/wp/v2";
const token = Buffer.from(`${process.env.WP_APP_USER}:${process.env.WP_APP_PASSWORD}`).toString("base64");
const auth = `Basic ${token}`;
const headers = { Authorization: auth, "X-Authorization": auth, "X-DK-Auth": token, Accept: "application/json" };

const api = async (route, init = {}) => {
  const joiner = route.includes("?") ? "&" : "?";
  const res = await fetch(`${API}${route}${joiner}dk_auth=${encodeURIComponent(token)}`, { ...init, headers: { ...headers, ...(init.headers || {}) } });
  const text = await res.text();
  let body; try { body = JSON.parse(text); } catch { body = text; }
  if (!res.ok) throw new Error(`${init.method || "GET"} ${route} -> ${res.status}: ${typeof body === "string" ? body.slice(0, 200) : body.message}`);
  return body;
};
const json = (method, route, data) => api(route, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });

const covers = {
  "pacing-for-people-who-cannot-afford-to-stop": { file: "essay-pacing-kitchen", alt: "A woman pauses at her kitchen table before the day begins, a pencil sketch" },
  "faith-without-performance": { file: "essay-faith-pew", alt: "A woman sits alone in an empty church pew, light from a tall window, a pencil sketch" },
  "how-to-ask-for-help-when-nobody-can-see-what-you-carry": { file: "essay-help-meeting", alt: "Two colleagues talk calmly across a small table, a pencil sketch" },
};

for (const arg of process.argv.slice(2)) {
  const [slug, url] = arg.split("=", 2);
  const cover = covers[slug];
  if (!cover) { console.log(`unknown slug ${slug}`); continue; }

  const post = (await api(`/posts?slug=${slug}&status=any&context=edit`))[0];
  if (!post) { console.log(`missing ${slug}`); continue; }

  // Cover: 1600px wide webp, saved locally too so the repo keeps a copy.
  const raw = Buffer.from(await (await fetch(url)).arrayBuffer());
  const webp = await sharp(raw).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  await writeFile(`public/assets/avenzor/images/${cover.file}.webp`, webp);

  const existing = await api(`/media?search=${cover.file}&per_page=5`);
  let media = Array.isArray(existing) ? existing.find((m) => (m.source_url || "").includes(cover.file)) : null;
  if (!media) {
    media = await api(`/media`, { method: "POST", headers: { "Content-Type": "image/webp", "Content-Disposition": `attachment; filename="${cover.file}.webp"` }, body: webp });
    await json("POST", `/media/${media.id}`, { alt_text: cover.alt, title: cover.file.replace(/-/g, " ") });
  }

  const content = (post.content.raw || post.content.rendered).replace(/<p><em>Draft note for DK[\s\S]*?<\/em><\/p>\s*/, "").trim();
  const updated = await json("POST", `/posts/${post.id}`, { content, featured_media: media.id, status: "publish" });
  console.log(`published ${slug} (#${updated.id}) ${updated.status}, cover #${media.id}, note removed: ${!content.includes("Draft note")}`);
}
