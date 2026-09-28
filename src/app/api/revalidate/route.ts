import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * On-demand revalidation. WordPress calls this when an essay or FAQ is published or updated,
 * so the site shows the change straight away instead of waiting for the next timed refresh.
 *
 * Call: POST or GET https://www.dkjonah.com/api/revalidate?secret=<REVALIDATE_SECRET>
 * The secret lives in the environment, never in this file.
 */
const handle = (request: Request) => {
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

  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
};

export const GET = handle;
export const POST = handle;
