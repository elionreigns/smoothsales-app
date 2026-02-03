import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getTemplate, type TemplateId } from "@/lib/templates";

// Use SMOOTHSALES_FROM once coralcrownsolutions.com is verified in Resend. For testing, use onboarding@resend.dev in Resend dashboard.
const FROM_EMAIL = process.env.SMOOTHSALES_FROM?.trim() || "Coral Crown Solutions <onboarding@resend.dev>";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "RESEND_API_KEY is not set" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const emailsRaw = body.emails;
    const templateId = body.templateId as TemplateId | undefined;

    if (!Array.isArray(emailsRaw) && typeof emailsRaw !== "string") {
      return NextResponse.json(
        { success: false, error: "emails must be an array or newline-separated string" },
        { status: 400 }
      );
    }

    const emails: string[] = typeof emailsRaw === "string"
      ? emailsRaw
        .split(/[\n,;]+/)
        .map((e: string) => e.trim().toLowerCase())
        .filter((e: string) => e.length > 0 && e.includes("@"))
      : emailsRaw.map((e: string) => String(e).trim().toLowerCase()).filter((e: string) => e.includes("@"));

    if (emails.length === 0) {
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
    ];
    if (!templateId || !validIds.includes(templateId)) {
      return NextResponse.json(
        { success: false, error: "Invalid templateId" },
        { status: 400 }
      );
    }

    const { subject, html, text } = getTemplate(templateId);
    const resend = new Resend(apiKey);

    const results: { to: string; ok: boolean; id?: string; error?: string }[] = [];

    for (const to of emails) {
      try {
        const { data, error } = await resend.emails.send({
          from: FROM_EMAIL,
          to,
          subject,
          html,
          text,
        });
        if (error) {
          results.push({ to, ok: false, error: error.message });
        } else {
          results.push({ to, ok: true, id: data?.id });
        }
      } catch (err) {
        results.push({
          to,
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
      total: emails.length,
      failed: failed.length,
      details: results,
    });
  } catch (err) {
    console.error("Send campaign error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
