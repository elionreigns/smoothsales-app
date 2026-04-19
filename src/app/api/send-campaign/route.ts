import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getTemplate, substitutePlaceholders, type TemplateId } from "@/lib/templates";
import { isAuthenticated, isAuthRequired } from "@/lib/auth";
import { upsertFollowUpState } from "@/lib/followups-store";

// Use SMOOTHSALES_FROM once coralcrownsolutions.com is verified in Resend. For testing, use onboarding@resend.dev in Resend dashboard.
const FROM_EMAIL = process.env.SMOOTHSALES_FROM?.trim() || "Coral Crown Solutions <onboarding@resend.dev>";

type Recipient = { email: string; name?: string; nameOfPerson?: string; nameOfOrganization?: string };

function json500(message: string) {
  return NextResponse.json({ success: false, error: message }, { status: 500 });
}

/**
 * Last-line-of-defense for subjects after placeholder substitution.
 * If the source template still has a `for {{Name of Organization}}` style
 * fragment AND we had to fall back to the generic "your team" string, the
 * resulting subject can read awkwardly (e.g. "10% partnership for your team").
 * This swaps in template-aware natural rewrites so the subject always reads
 * like a human wrote it, even when we don't know the org by name.
 */
function sanitizeSubject(subject: string, templateId: string): string {
  let s = subject
    .replace(/\{\{\s*[^}]+\s*\}\}/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([?.,!])/g, "$1")
    .trim();
  // Family of luxury-resource direct outreach templates — keep wording aligned
  // with the saved subject lines but drop the dangling "for your team" tail.
  const lcId = templateId.toLowerCase();
  if (lcId.startsWith("luxury-resource-direct")) {
    s = s
      .replace(/\bfor your team\b/gi, "with Hawaii Luxury Resource")
      .replace(/\bat your team\b/gi, "on your end")
      .replace(/\brespect to your team\b/gi, "respect either way");
  } else if (lcId.startsWith("rap-central")) {
    s = s
      .replace(/\bfor your team\b/gi, "for the artist")
      .replace(/\bat your team\b/gi, "on the artist's side");
  } else {
    s = s.replace(/\s+for your team\b/gi, "");
  }
  return s.replace(/\s{2,}/g, " ").trim();
}

export async function POST(request: NextRequest) {
  try {
    if (isAuthRequired() && !isAuthenticated(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Enter the app password in the browser or use the bypass key." },
        { status: 401 }
      );
    }
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
    const scheduledAt = typeof body.scheduledAt === "string" ? body.scheduledAt.trim() || undefined : undefined;
    const subjectOverrideRaw = typeof body.subjectOverride === "string" ? body.subjectOverride.trim() : "";
    const subjectOverride = subjectOverrideRaw.length > 0 ? subjectOverrideRaw.slice(0, 180) : undefined;

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
      "tourism-hawaii-featured-tour",
      "yachts-contracts",
      "yachts-clients",
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
      "elion-leaders",
      "elion-laymen",
      "elion-levelup",
      "elion-products-programs",
      "elion-record-label-mainstream",
      "elion-record-label-mainstream-followup-1",
      "elion-record-label-mainstream-followup-2",
      "elion-record-label-mainstream-followup-3",
      "elion-record-label-christian",
      "elion-record-label-christian-followup-1",
      "elion-record-label-christian-followup-2",
      "elion-record-label-christian-followup-3",
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
      "stella-brands",
      "stella-media",
      "stella-talent",
      // ---- April 2026: new SmoothSales services (Apartments, Corgi Care, Luxury Resource, Rap Central) ----
      // Each has 1 initial + 4 follow-ups.
      "apartments-individual",
      "apartments-individual-followup-1",
      "apartments-individual-followup-2",
      "apartments-individual-followup-3",
      "apartments-individual-followup-4",
      "apartments-realtor",
      "apartments-realtor-followup-1",
      "apartments-realtor-followup-2",
      "apartments-realtor-followup-3",
      "apartments-realtor-followup-4",
      "corgi-care-hair",
      "corgi-care-hair-followup-1",
      "corgi-care-hair-followup-2",
      "corgi-care-hair-followup-3",
      "corgi-care-hair-followup-4",
      "corgi-care-teeth",
      "corgi-care-teeth-followup-1",
      "corgi-care-teeth-followup-2",
      "corgi-care-teeth-followup-3",
      "corgi-care-teeth-followup-4",
      "corgi-care-military",
      "corgi-care-military-followup-1",
      "corgi-care-military-followup-2",
      "corgi-care-military-followup-3",
      "corgi-care-military-followup-4",
      "luxury-resource-fareharbor",
      "luxury-resource-fareharbor-followup-1",
      "luxury-resource-fareharbor-followup-2",
      "luxury-resource-fareharbor-followup-3",
      "luxury-resource-fareharbor-followup-4",
      "luxury-resource-direct",
      "luxury-resource-direct-followup-1",
      "luxury-resource-direct-followup-2",
      "luxury-resource-direct-followup-3",
      "luxury-resource-direct-followup-4",
      "rap-central-rappers",
      "rap-central-rappers-followup-1",
      "rap-central-rappers-followup-2",
      "rap-central-rappers-followup-3",
      "rap-central-rappers-followup-4",
    ];
    if (!templateId || !validIds.includes(templateId)) {
      return NextResponse.json(
        { success: false, error: "Invalid templateId" },
        { status: 400 }
      );
    }

    const validSet = new Set<string>(validIds);
    // Accept follow-ups 1-4 (legacy services use 1-3, new April-2026 services use 1-4).
    const isFollowUp = /-followup-[1-4]$/.test(templateId);
    const followUpBase = isFollowUp ? templateId.replace(/-followup-[1-4]$/, "") : templateId;
    const followUpStep = isFollowUp ? Number(templateId.slice(-1)) : 0;
    const hasFollowUps = !isFollowUp && validSet.has(`${templateId}-followup-1`);
    const isNewsletterRebumpBase = templateId === "elion-leaders" || templateId === "elion-laymen";

    let subject: string;
    let html: string;
    let text: string;
    try {
      const template = getTemplate(templateId);
      subject = subjectOverride || template.subject;
      html = template.html;
      text = template.text;
    } catch (e) {
      console.error("getTemplate error:", e);
      return json500("Template error: " + (e instanceof Error ? e.message : "unknown"));
    }
    const baseUrlRaw =
      process.env.NEXT_PUBLIC_APP_URL?.trim() ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
      // Hard fallback for production if VERCEL_URL isn't present for some reason.
      "https://www.coralcrownsolutions.com";
    let baseUrlOrigin = baseUrlRaw;
    try {
      baseUrlOrigin = new URL(baseUrlRaw).origin;
    } catch {
      // Keep raw if it already looks like an origin with scheme.
    }
    const htmlWithImages = html.replace(/\{\{BASE_URL\}\}/g, baseUrlOrigin);

    const resend = new Resend(apiKey);
    const results: { to: string; ok: boolean; id?: string; error?: string }[] = [];
    const throttleMs = 700; // Resend limit: 2 requests/sec – stay safely under

    for (let i = 0; i < recipients.length; i++) {
      const rec = recipients[i];
      // Resolve a natural fallback for the organization placeholder so it never
      // leaks as a literal "{{Name of Organization}}" in subject lines or body.
      // Order: explicit nameOfOrganization → recipient name → generic "your team".
      const orgFallback =
        (rec.nameOfOrganization && rec.nameOfOrganization.trim()) ||
        (rec.name && rec.name.trim() && rec.name.trim().toLowerCase() !== "there"
          ? rec.name.trim()
          : "your team");
      const vars = {
        Name: rec.name ?? "there",
        "Name of Person": rec.nameOfPerson ?? rec.name ?? "there",
        "Name of Organization": orgFallback,
      };
      const { html: personalHtml, text: personalText } = substitutePlaceholders(htmlWithImages, text, vars);
      // Personalize the subject too — previously the subject was sent verbatim
      // which is why some recipients saw the literal "{{Name of Organization}}"
      // placeholder text in their inbox.
      const { html: personalSubjectRaw } = substitutePlaceholders(subject, "", vars);
      const personalSubject = sanitizeSubject(personalSubjectRaw, templateId);
      try {
        const payload: Parameters<Resend["emails"]["send"]>[0] = {
          from: FROM_EMAIL,
          to: rec.email,
          subject: personalSubject,
          html: personalHtml,
          text: personalText,
          tags: [
            { name: "template_id", value: templateId },
            { name: "campaign_base", value: followUpBase },
            { name: "followup_step", value: String(followUpStep) },
          ],
        };
        if (scheduledAt) payload.scheduledAt = scheduledAt;
        const { data, error } = await resend.emails.send(payload);
        if (error) {
          results.push({ to: rec.email, ok: false, error: error.message });
        } else {
          results.push({ to: rec.email, ok: true, id: data?.id });

          // Register follow-up state on initial send.
          if (hasFollowUps || isNewsletterRebumpBase) {
            const nowIso = new Date().toISOString();
            await upsertFollowUpState({
              baseTemplateId: templateId,
              email: rec.email,
              name: rec.name ?? rec.nameOfPerson ?? undefined,
              nameOfOrganization: rec.nameOfOrganization ?? undefined,
              initialSentAt: nowIso,
              initialEmailId: data?.id,
              followUpsSent: 0,
              lastSentAt: nowIso,
              lastEmailId: data?.id,
            });
          }
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
      ...(scheduledAt && { scheduled: true, scheduledAt }),
    });
  } catch (err) {
    console.error("Send campaign error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return json500(message);
  }
}
