/**
 * Resend webhook: email.opened, email.received, etc.
 * Configure this URL in Resend Dashboard → Webhooks (e.g. https://your-app.vercel.app/api/webhooks/resend).
 * Subscribe to "email.opened" (and optionally "email.clicked") so Resend sends events when someone opens.
 *
 * When someone opens an email, we send an alert to OPEN_ALERT_TO (default elionreigns@gmail.com).
 * Set RESEND_WEBHOOK_SECRET in Vercel to verify webhook requests (rejects forged opens).
 *
 * Open tracking must be enabled in Resend for your sending domain: Dashboard → Domains → [your domain] → Open tracking.
 */
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Webhook } from "svix";

const FROM_EMAIL =
  process.env.SMOOTHSALES_FROM?.trim() || "Coral Crown Solutions <onboarding@resend.dev>";
const OPEN_ALERT_TO = process.env.OPEN_ALERT_TO?.trim() || "elionreigns@gmail.com";

type ResendWebhookEvent = {
  type: string;
  created_at: string;
  data: {
    email_id?: string;
    to?: string[] | string;
    from?: string;
    subject?: string;
    tags?: Array<{ name: string; value: string }> | Record<string, string>;
    [k: string]: unknown;
  };
};

function toEmails(to: string[] | string | undefined): string[] {
  if (Array.isArray(to)) return to;
  if (typeof to === "string") return [to];
  return [];
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getTemplateFromTags(tags: ResendWebhookEvent["data"]["tags"]): string {
  if (!tags) return "—";
  if (Array.isArray(tags)) {
    const t = tags.find((x) => x.name === "template_id");
    return t?.value ?? "—";
  }
  return (tags as Record<string, string>).template_id ?? (tags as Record<string, string>).category ?? "—";
}

function formatTime(iso: string | undefined): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/Los_Angeles",
    });
  } catch {
    return iso;
  }
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
      const templateId = getTemplateFromTags(data.tags);
      const timeStr = formatTime(created_at);
      console.log("[Resend] email.opened", data.email_id, who, subject);

      const apiKey = process.env.RESEND_API_KEY?.trim();
      if (apiKey && OPEN_ALERT_TO) {
        const resend = new Resend(apiKey);
        const alertSubject = `✓ Someone opened your email — ${who}`;
        const alertHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:'Segoe UI',system-ui,sans-serif;background:#f1f5f9;padding:24px;">
  <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">
    <div style="background:linear-gradient(135deg,#0ea5e9 0%,#0369a1 100%);color:#fff;padding:24px 28px;text-align:center;">
      <div style="font-size:28px;margin-bottom:4px;">✓ Success</div>
      <div style="font-size:14px;opacity:0.95;">Someone opened your campaign email</div>
    </div>
    <div style="padding:28px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:10px 0 6px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Opened by</td></tr>
        <tr><td style="padding:0 0 16px;font-size:16px;color:#0f172a;font-weight:500;">${escapeHtml(who)}</td></tr>
        <tr><td style="padding:10px 0 6px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Campaign / Subject</td></tr>
        <tr><td style="padding:0 0 16px;font-size:15px;color:#0f172a;">${escapeHtml(subject)}</td></tr>
        <tr><td style="padding:10px 0 6px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Template</td></tr>
        <tr><td style="padding:0 0 16px;font-size:15px;color:#0f172a;"><code style="background:#f1f5f9;padding:4px 8px;border-radius:6px;">${escapeHtml(templateId)}</code></td></tr>
        <tr><td style="padding:10px 0 6px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Time</td></tr>
        <tr><td style="padding:0 0 8px;font-size:15px;color:#0f172a;">${escapeHtml(timeStr)}</td></tr>
      </table>
      <p style="margin:20px 0 0;padding-top:16px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;">Resend email ID: ${escapeHtml(String(data.email_id || "—"))}</p>
    </div>
  </div>
</body>
</html>`;
        await resend.emails.send({
          from: FROM_EMAIL,
          to: OPEN_ALERT_TO,
          subject: alertSubject,
          html: alertHtml,
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
