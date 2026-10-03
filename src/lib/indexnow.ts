// IndexNow: tells Bing, DuckDuckGo, Yandex and the other engines on the protocol which pages changed,
// so they recrawl within minutes instead of waiting for the next scheduled crawl.
//
// The key is not a secret. The protocol requires it to be public at /<key>.txt so engines can confirm
// the site owns the submissions; it works like the Google verification file in /public.
import { SITE_URL } from "@/lib/seo";

export const INDEXNOW_KEY = "54d88a6730327caf67713b3d4d231c74";
const ENDPOINT = "https://api.indexnow.org/indexnow";

export type IndexNowResult = { submitted: number; status: number | null; ok: boolean; message?: string };

// Submits up to 10,000 full URLs on this host. Returns what happened; never throws.
export async function notifyIndexNow(urls: string[]): Promise<IndexNowResult> {
  const host = new URL(SITE_URL).host;
  const urlList = [...new Set(urls)].filter((url) => url.startsWith(SITE_URL)).slice(0, 10000);
  if (urlList.length === 0) return { submitted: 0, status: null, ok: false, message: "No URLs on this host." };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`, urlList }),
      signal: controller.signal,
      cache: "no-store",
    });
    // 200 and 202 both mean accepted.
    const ok = response.status === 200 || response.status === 202;
    if (!ok) console.error("IndexNow did not accept the submission:", response.status, (await response.text()).slice(0, 200));
    return { submitted: urlList.length, status: response.status, ok };
  } catch (error) {
    console.error("IndexNow request failed:", error);
    return { submitted: urlList.length, status: null, ok: false, message: "Request failed." };
  } finally {
    clearTimeout(timer);
  }
}
