import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getTemplate, substitutePlaceholders, type TemplateId } from "@/lib/templates";

// Use SMOOTHSALES_FROM once coralcrownsolutions.com is verified in Resend. For testing, use onboarding@resend.dev in Resend dashboard.
const FROM_EMAIL = process.env.SMOOTHSALES_FROM?.trim() || "Coral Crown Solutions <onboarding@resend.dev>";

type Recipient = { email: string; name?: string; nameOfPerson?: string; nameOfOrganization?: string };

function json500(message: string) {
  return NextResponse.json({ success: false, error: message }, { status: 500 });
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      return json500(
        "RESEND_API_KEY is not set. Add it in Vercel: Project → Settings → Environment Variables, then redeploy."
      );
    }

    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body (expected JSON)" },
        { status: 400 }
      );
    }
    const templateId = body.templateId as TemplateId | undefined;
    const recipientsRaw = body.recipients as Recipient[] | undefined;
    const emailsRaw = body.emails; // legacy: still accept flat list

    let recipients: Recipient[] = [];
    if (Array.isArray(recipientsRaw) && recipientsRaw.length > 0) {
      recipients = recipientsRaw
        .map((r: { email?: string; name?: string; nameOfPerson?: string; nameOfOrganization?: string }) => ({
          email: String(r.email ?? "").trim().toLowerCase(),
          name: typeof r.name === "string" ? r.name.trim() : undefined,
          nameOfPerson: typeof r.nameOfPerson === "string" ? r.nameOfPerson.trim() : undefined,
          nameOfOrganization: typeof r.nameOfOrganization === "string" ? r.nameOfOrganization.trim() : undefined,
        }))
        .filter((r) => r.email && r.email.includes("@"));
    } else if (Array.isArray(emailsRaw) || typeof emailsRaw === "string") {
      const list: string[] =
        typeof emailsRaw === "string"
          ? emailsRaw.split(/[\n,;]+/).map((e: string) => e.trim().toLowerCase()).filter((e: string) => e.includes("@"))
          : emailsRaw.map((e: string) => String(e).trim().toLowerCase()).filter((e: string) => e.includes("@"));
      recipients = list.map((email) => ({ email }));
    }

    if (recipients.length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid email addresses" },
        { status: 400 }
      );
    }

    const validIds: TemplateId[] = [
      "botox",
      "tech",
      "prayer-individual",
      "prayer-church",
      "tourism-hawaii",
      "tourism-usa",
      "elion-fans",
      "elion-artists",
      "elion-brands",
      "elion-producers",
      "elion-venue-church",
      "elion-venue-show",
      "elion-venue-dj",
      "wedding-couples",
      "wedding-contractors",
      "p48x-personal",
      "p48x-physical-distributors",
      "p48x-affiliate-sellers",
      "healing-herbals-smoke-shop",
      "healing-herbals-individual",
    ];
    if (!templateId || !validIds.includes(templateId)) {
      return NextResponse.json(
        { success: false, error: "Invalid templateId" },
        { status: 400 }
      );
    }

    let subject: string;
    let html: string;
    let text: string;
    try {
      const template = getTemplate(templateId);
      subject = template.subject;
      html = template.html;
      text = template.text;
    } catch (e) {
      console.error("getTemplate error:", e);
      return json500("Template error: " + (e instanceof Error ? e.message : "unknown"));
    }
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL?.trim() ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
    const htmlWithImages = html.replace(/\{\{BASE_URL\}\}/g, baseUrl ?? "http://localhost:3000");

    const resend = new Resend(apiKey);
    const results: { to: string; ok: boolean; id?: string; error?: string }[] = [];

    for (const rec of recipients) {
      const vars = {
        Name: rec.name ?? "there",
        "Name of Person": rec.nameOfPerson ?? rec.name ?? "there",
        "Name of Organization": rec.nameOfOrganization ?? rec.name ?? "",
      };
      const { html: personalHtml, text: personalText } = substitutePlaceholders(htmlWithImages, text, vars);
      try {
        const { data, error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: rec.email,
          subject,
          html: personalHtml,
          text: personalText,
        });
        if (error) {
          results.push({ to: rec.email, ok: false, error: error.message });
        } else {
          results.push({ to: rec.email, ok: true, id: data?.id });
        }
      } catch (err) {
        results.push({
          to: rec.email,
          ok: false,
          error: err instanceof Error ? err.message : "Send failed",
        });
      }
    }

    const sent = results.filter((r) => r.ok).length;
    const failed = results.filter((r) => !r.ok);

    return NextResponse.json({
      success: true,
      sent,
      total: recipients.length,
      failed: failed.length,
      details: results,
    });
  } catch (err) {
    console.error("Send campaign error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return json500(message);
  }
}
