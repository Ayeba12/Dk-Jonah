import { NextResponse } from "next/server";

/**
 * Quiet Focus sign-up. Adds the person to the Quiet Focus list in SendFox.
 *
 * Environment (never in code):
 *   SENDFOX_API_TOKEN   a personal access token from SendFox, Settings then API
 *   SENDFOX_LIST_ID     the numeric id of the "Quiet Focus" list
 *
 * SendFox handles the confirmation email and the double opt-in according to the list's own settings.
 */

type Payload = { firstName?: string; email?: string; website?: string };

const SENDFOX_CONTACTS = "https://api.sendfox.com/contacts";

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, message: "Something went wrong reading the form." }, { status: 400 });
  }

  // A hidden field real people never fill in. Bots do.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const firstName = (body.firstName ?? "").trim();
  const email = (body.email ?? "").trim();
  if (!firstName || !email) {
    return NextResponse.json({ ok: false, message: "Please add your first name and email." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "That email address does not look right." }, { status: 400 });
  }

  const token = process.env.SENDFOX_API_TOKEN;
  const listId = Number(process.env.SENDFOX_LIST_ID);
  if (!token || !listId) {
    console.error("Quiet Focus sign-up: SENDFOX_API_TOKEN or SENDFOX_LIST_ID is not set.");
    return NextResponse.json(
      { ok: false, message: "Sign-up is not connected yet. Please email hello@dkjonah.com and I will add you by hand." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(SENDFOX_CONTACTS, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, first_name: firstName, lists: [listId] }),
      cache: "no-store",
    });

    if (response.ok) {
      return NextResponse.json({ ok: true });
    }

    const detail = await response.text();
    console.error("SendFox rejected the sign-up:", response.status, detail.slice(0, 300));

    // SendFox answers 422 when the address is already on the list. Treat that as a success for the person.
    if (response.status === 422 && /already|exists|taken/i.test(detail)) {
      return NextResponse.json({ ok: true, already: true });
    }

    return NextResponse.json(
      { ok: false, message: "The sign-up did not go through. Please try again in a moment, or email hello@dkjonah.com." },
      { status: 502 },
    );
  } catch (error) {
    console.error("SendFox request failed:", error);
    return NextResponse.json(
      { ok: false, message: "The sign-up did not go through. Please try again in a moment, or email hello@dkjonah.com." },
      { status: 502 },
    );
  }
}
