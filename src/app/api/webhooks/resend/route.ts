/**
 * Resend webhook: email.opened, email.received, etc.
 * Configure this URL in Resend Dashboard → Webhooks (e.g. https://your-app.vercel.app/api/webhooks/resend).
 * Subscribe to "email.opened" (and optionally "email.clicked") so Resend sends events when someone opens.
 *
 * When someone opens an email, we send an alert to OPEN_ALERT_TO (default coralcrowntechnologies@gmail.com).
 * Set RESEND_WEBHOOK_SECRET in Vercel to verify webhook requests (rejects forged opens).
 *
 * Open tracking must be enabled in Resend for your sending domain: Dashboard → Domains → [your domain] → Open tracking.
 */
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Webhook } from "svix";

const FROM_EMAIL =
  process.env.SMOOTHSALES_FROM?.trim() || "Coral Crown Solutions <onboarding@resend.dev>";
const OPEN_ALERT_TO = process.env.OPEN_ALERT_TO?.trim() || "coralcrowntechnologies@gmail.com";

type ResendWebhookEvent = {
  type: string;
  created_at: string;
  data: {
    email_id?: string;
    to?: string[] | string;
    from?: string;
    subject?: string;
    [k: string]: unknown;
  };
};

function toEmails(to: string[] | string | undefined): string[] {
  if (Array.isArray(to)) return to;
  if (typeof to === "string") return [to];
  return [];
}

export async function POST(request: NextRequest) {
  try {
    const raw = await request.text();
    const secret = process.env.RESEND_WEBHOOK_SECRET?.trim();
    if (secret) {
      const svixId = request.headers.get("svix-id");
      const svixTimestamp = request.headers.get("svix-timestamp");
      const svixSignature = request.headers.get("svix-signature");
      if (!svixId || !svixTimestamp || !svixSignature) {
        return NextResponse.json({ error: "Missing Svix headers" }, { status: 401 });
      }
      try {
        const wh = new Webhook(secret);
        wh.verify(raw, { "svix-id": svixId, "svix-timestamp": svixTimestamp, "svix-signature": svixSignature });
      } catch {
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
      }
    }
    let body: ResendWebhookEvent;
    try {
      body = JSON.parse(raw) as ResendWebhookEvent;
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { type, data, created_at } = body;

    if (type === "email.opened") {
      const to = toEmails(data.to);
      const who = to.length ? to.join(", ") : "unknown";
      const subject = typeof data.subject === "string" ? data.subject : "(no subject)";
      console.log("[Resend] email.opened", data.email_id, who, subject);

      // Alert coralcrowntechnologies@gmail.com (or OPEN_ALERT_TO) when someone opens
      const apiKey = process.env.RESEND_API_KEY?.trim();
      if (apiKey && OPEN_ALERT_TO) {
        const resend = new Resend(apiKey);
        const alertSubject = `Opened: ${subject.slice(0, 50)}${subject.length > 50 ? "…" : ""}`;
        const alertBody = `Someone opened your campaign email.\n\nOpened by (recipient): ${who}\nSubject: ${subject}\nTime: ${created_at || "—"}\nEmail ID: ${data.email_id || "—"}`;
        await resend.emails.send({
          from: FROM_EMAIL,
          to: OPEN_ALERT_TO,
          subject: alertSubject,
          text: alertBody,
        });
      }
    }

    if (type === "email.received") {
      console.log("[Resend] email.received", data.from, data.to);
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("[Resend webhook error]", e);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
