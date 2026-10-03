import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import { notifyIndexNow } from "@/lib/indexnow";

/**
 * On-demand revalidation. WordPress calls this when an essay or FAQ is published or updated,
 * so the site shows the change straight away instead of waiting for the next timed refresh.
 *
 * Call: POST or GET https://www.dkjonah.com/api/revalidate?secret=<REVALIDATE_SECRET>
 * The secret lives in the environment, never in this file.
 *
 * It also tells the search engines on IndexNow which pages to recrawl: every page in the sitemap,
 * since a published essay changes the home page, the archive and the sitemap as well as its own page.
 */
const handle = async (request: Request) => {
  const secret = process.env.REVALIDATE_SECRET;
  const given = new URL(request.url).searchParams.get("secret") ?? request.headers.get("x-revalidate-secret");

  if (!secret) {
    return NextResponse.json({ revalidated: false, message: "REVALIDATE_SECRET is not set." }, { status: 500 });
  }
  if (given !== secret) {
    return NextResponse.json({ revalidated: false, message: "Invalid secret." }, { status: 401 });
  }

  // Everything that reads from WordPress: the home essays block, the archive, essay pages, FAQ and the sitemap.
  revalidatePath("/", "layout");
  // The sitemap and llms.txt are prerendered on their own and are not covered by the layout refresh.
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");

  // Fresh list after revalidation, so a new essay is included.
  let indexNow: Awaited<ReturnType<typeof notifyIndexNow>> | { ok: false; message: string } = { ok: false, message: "Skipped." };
  try {
    const entries = await sitemap();
    indexNow = await notifyIndexNow(entries.map((entry) => entry.url));
  } catch (error) {
    console.error("IndexNow: could not build the URL list.", error);
    indexNow = { ok: false, message: "Could not build the URL list." };
  }

  return NextResponse.json({ revalidated: true, at: new Date().toISOString(), indexNow });
};

export const GET = handle;
export const POST = handle;
