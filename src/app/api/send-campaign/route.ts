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
      "elion-fans-followup-1",
      "elion-fans-followup-2",
      "elion-fans-followup-3",
      "elion-artists-followup-1",
      "elion-artists-followup-2",
      "elion-artists-followup-3",
      "elion-brands-followup-1",
      "elion-brands-followup-2",
      "elion-brands-followup-3",
      "elion-producers",
      "elion-producers-followup-1",
      "elion-producers-followup-2",
      "elion-producers-followup-3",
      "elion-venue-church",
      "elion-venue-church-followup-1",
      "elion-venue-church-followup-2",
      "elion-venue-church-followup-3",
      "elion-venue-show",
      "elion-venue-show-followup-1",
      "elion-venue-show-followup-2",
      "elion-venue-show-followup-3",
      "elion-venue-dj",
      "elion-venue-dj-followup-1",
      "elion-venue-dj-followup-2",
      "elion-venue-dj-followup-3",
      "elion-venue-major",
      "elion-venue-major-followup-1",
      "elion-venue-major-followup-2",
      "elion-venue-major-followup-3",
      "wedding-couples",
      "wedding-couples-followup-1",
      "wedding-couples-followup-2",
      "wedding-couples-followup-3",
      "wedding-contractors",
      "wedding-contractors-followup-1",
      "wedding-contractors-followup-2",
      "wedding-contractors-followup-3",
      "p48x-personal",
      "p48x-personal-followup-1",
      "p48x-personal-followup-2",
      "p48x-personal-followup-3",
      "p48x-physical-distributors",
      "p48x-physical-distributors-followup-1",
      "p48x-physical-distributors-followup-2",
      "p48x-physical-distributors-followup-3",
      "p48x-affiliate-sellers",
      "p48x-affiliate-sellers-followup-1",
      "p48x-affiliate-sellers-followup-2",
      "p48x-affiliate-sellers-followup-3",
      "healing-herbals-smoke-shop",
      "healing-herbals-smoke-shop-followup-1",
      "healing-herbals-smoke-shop-followup-2",
      "healing-herbals-smoke-shop-followup-3",
      "healing-herbals-individual",
      "healing-herbals-individual-followup-1",
      "healing-herbals-individual-followup-2",
      "healing-herbals-individual-followup-3",
      "botox-followup-1",
      "botox-followup-2",
      "botox-followup-3",
      "tech-followup-1",
      "tech-followup-2",
      "tech-followup-3",
      "prayer-individual-followup-1",
      "prayer-individual-followup-2",
      "prayer-individual-followup-3",
      "prayer-church-followup-1",
      "prayer-church-followup-2",
      "prayer-church-followup-3",
      "tourism-hawaii-followup-1",
      "tourism-hawaii-followup-2",
      "tourism-hawaii-followup-3",
      "tourism-usa-followup-1",
      "tourism-usa-followup-2",
      "tourism-usa-followup-3",
      "botox-v2",
      "tech-v2",
      "prayer-individual-v2",
      "prayer-church-v2",
      "tourism-hawaii-v2",
      "tourism-usa-v2",
      "elion-fans-v2",
      "elion-artists-v2",
      "elion-brands-v2",
      "elion-producers-v2",
      "elion-venue-church-v2",
      "elion-venue-show-v2",
      "elion-venue-dj-v2",
      "elion-venue-major-v2",
      "wedding-couples-v2",
      "wedding-contractors-v2",
      "p48x-personal-v2",
      "p48x-physical-distributors-v2",
      "p48x-affiliate-sellers-v2",
      "healing-herbals-smoke-shop-v2",
      "healing-herbals-individual-v2",
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
    const throttleMs = 520; // Resend limit: 2 requests/sec – wait between each send

    for (let i = 0; i < recipients.length; i++) {
      const rec = recipients[i];
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
      if (i < recipients.length - 1) {
        await new Promise((r) => setTimeout(r, throttleMs));
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
