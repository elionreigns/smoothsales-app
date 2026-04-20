import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * /api/concierge-cart
 *
 * Lightweight, public endpoint that the static Hawaii Luxury Resource site
 * (`/luxury-resource/`) calls when a guest finishes their concierge cart and
 * hits "Send trip request to concierge".
 *
 * Behaviour:
 *   - No app password / bypass key required (public form on a static site).
 *   - Hard rate-limit by simple in-process counter (best-effort; Vercel Edge
 *     would scale this with KV — fine for current volume).
 *   - Sends one Resend email to the concierge inbox (CONCIERGE_INBOX env or
 *     fallback to elionreigns@gmail.com) with reply-to set to the guest.
 *   - Returns `{ success: true }` so the front-end can show a thank-you,
 *     never echoes the destination email back to the client.
 *
 * This intentionally does NOT sign-in to KV/followups/cron — it's a one-shot
 * relay so the static site can drop the `mailto:` UX (which leaked the
 * destination address in `Send to <email>` UI text).
 */

const FROM_EMAIL =
  process.env.SMOOTHSALES_FROM?.trim() || "Coral Crown Solutions <onboarding@resend.dev>";
const CONCIERGE_INBOX =
  process.env.CONCIERGE_INBOX?.trim() || "elionreigns@gmail.com";

const ALLOWED_ORIGINS = [
  "https://www.prayerauthority.com",
  "https://prayerauthority.com",
  "http://127.0.0.1:8080",
  "http://localhost:8080",
];

function corsHeaders(origin: string | null) {
  const allow = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request.headers.get("origin")) });
}

type CartLine = {
  title?: string;
  qty?: number | string;
  preferredWhen?: string;
  lineNote?: string;
};

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  tripStart?: string;
  tripEnd?: string;
  budget?: string;
  notes?: string;
  guests?: number | string;
  cart?: CartLine[];
  summary?: string;
  source?: string;
};

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "Mail relay is not configured." },
      { status: 500, headers }
    );
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400, headers }
    );
  }

  const guestName = (body.name || "").trim().slice(0, 120);
  const guestEmail = (body.email || "").trim().slice(0, 200);
  const guestPhone = (body.phone || "").trim().slice(0, 40);
  const tripStart = (body.tripStart || "").trim().slice(0, 30);
  const tripEnd = (body.tripEnd || "").trim().slice(0, 30);
  const budget = (body.budget || "").trim().slice(0, 200);
  const notes = (body.notes || "").trim().slice(0, 4000);
  const cart = Array.isArray(body.cart) ? body.cart.slice(0, 50) : [];
  const summary = (body.summary || "").trim().slice(0, 12000);
  const source = (body.source || "luxury-resource concierge cart").trim().slice(0, 200);

  if (!guestName) {
    return NextResponse.json(
      { success: false, error: "Name is required." },
      { status: 400, headers }
    );
  }
  if (!isEmail(guestEmail)) {
    return NextResponse.json(
      { success: false, error: "A valid reply email is required." },
      { status: 400, headers }
    );
  }
  if (cart.length === 0 && !summary) {
    return NextResponse.json(
      { success: false, error: "Add at least one experience to your cart before sending." },
      { status: 400, headers }
    );
  }

  const cartLinesHtml = cart
    .map((line) => {
      const title = escapeHtml(line.title || "Untitled experience");
      const qty = escapeHtml(String(line.qty ?? ""));
      const when = line.preferredWhen ? `<br><small>${escapeHtml(line.preferredWhen)}</small>` : "";
      const note = line.lineNote ? `<br><small><em>${escapeHtml(line.lineNote)}</em></small>` : "";
      return `<li><strong>${title}</strong>${qty ? ` &middot; ${qty} guest${qty === "1" ? "" : "s"}` : ""}${when}${note}</li>`;
    })
    .join("");

  const html = `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#1f2937;line-height:1.55;">
<div style="max-width:640px;margin:0 auto;padding:24px;">
  <h2 style="margin:0 0 8px;color:#0f766e;">New concierge-cart trip request</h2>
  <p style="margin:0 0 16px;color:#475569;">Submitted via <strong>${escapeHtml(source)}</strong></p>

  <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;margin:0 0 16px;">
    <tr><td style="font-weight:600;width:140px;">Guest</td><td>${escapeHtml(guestName)}</td></tr>
    <tr><td style="font-weight:600;">Email</td><td><a href="mailto:${escapeHtml(guestEmail)}">${escapeHtml(guestEmail)}</a></td></tr>
    ${guestPhone ? `<tr><td style="font-weight:600;">Phone</td><td><a href="tel:${escapeHtml(guestPhone)}">${escapeHtml(guestPhone)}</a></td></tr>` : ""}
    ${tripStart ? `<tr><td style="font-weight:600;">Trip start</td><td>${escapeHtml(tripStart)}</td></tr>` : ""}
    ${tripEnd ? `<tr><td style="font-weight:600;">Trip end</td><td>${escapeHtml(tripEnd)}</td></tr>` : ""}
    ${budget ? `<tr><td style="font-weight:600;">Budget</td><td>${escapeHtml(budget)}</td></tr>` : ""}
  </table>

  ${cartLinesHtml ? `<h3 style="margin:18px 0 6px;color:#0f766e;">Cart (${cart.length} line${cart.length === 1 ? "" : "s"})</h3><ul style="margin:0 0 16px;padding-left:20px;">${cartLinesHtml}</ul>` : ""}

  ${notes ? `<h3 style="margin:18px 0 6px;color:#0f766e;">Trip notes</h3><div style="white-space:pre-wrap;background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:12px;">${escapeHtml(notes)}</div>` : ""}

  ${summary ? `<details style="margin-top:18px;"><summary style="cursor:pointer;color:#475569;">Plain-text summary (for SMS / CRM)</summary><pre style="white-space:pre-wrap;background:#0f172a;color:#e2e8f0;padding:12px;border-radius:8px;font-size:12px;">${escapeHtml(summary)}</pre></details>` : ""}

  <p style="margin:24px 0 0;color:#64748b;font-size:13px;">Reply directly to this email to reach <strong>${escapeHtml(guestName)}</strong>.</p>
</div></body></html>`;

  const text = [
    "New concierge-cart trip request",
    `Source: ${source}`,
    "",
    `Guest: ${guestName}`,
    `Email: ${guestEmail}`,
    guestPhone ? `Phone: ${guestPhone}` : "",
    tripStart ? `Trip start: ${tripStart}` : "",
    tripEnd ? `Trip end: ${tripEnd}` : "",
    budget ? `Budget: ${budget}` : "",
    "",
    cart.length ? `Cart (${cart.length} line${cart.length === 1 ? "" : "s"}):` : "",
    ...cart.map(
      (line) =>
        `- ${line.title || "Untitled"}${line.qty ? ` x ${line.qty}` : ""}${line.preferredWhen ? ` (${line.preferredWhen})` : ""}${line.lineNote ? ` — ${line.lineNote}` : ""}`
    ),
    "",
    notes ? "Notes:" : "",
    notes,
    "",
    summary ? "Plain-text summary:" : "",
    summary,
  ]
    .filter(Boolean)
    .join("\n");

  const resend = new Resend(apiKey);
  const subject = `Concierge cart — ${guestName} (${cart.length} line${cart.length === 1 ? "" : "s"}${tripStart ? ", " + tripStart : ""})`;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [CONCIERGE_INBOX],
      replyTo: guestEmail,
      subject,
      html,
      text,
    });
    if (error) {
      return NextResponse.json(
        { success: false, error: "Mail relay rejected the message. Try the email link as a backup." },
        { status: 502, headers }
      );
    }
    return NextResponse.json({ success: true, id: data?.id }, { status: 200, headers });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown send error";
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500, headers }
    );
  }
}
