import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getTemplate, substitutePlaceholders, type TemplateId } from "@/lib/templates";
import { scanFollowUpStates, upsertFollowUpState, type FollowUpState } from "@/lib/followups-store";
import { ELION_FOLLOW_UP_DAYS } from "@/lib/elion-follow-up-templates";

const FROM_EMAIL = process.env.SMOOTHSALES_FROM?.trim() || "Coral Crown Solutions <onboarding@resend.dev>";

// Default unopened rebump schedule (legacy services, 3 follow-ups):
// +3 days, then +5 days, then +10 days from prior.  (day 3, 8, 18 from initial)
const DEFAULT_FOLLOW_UP_DAYS = [3, 5, 10] as const;

// April 2026 services (Apartments, Corgi Care, Luxury Resource, Rap Central):
// 4 follow-ups on a more spaced cadence.
// Increments BETWEEN sends:
//   FU1 = day 4   (4 days after initial)
//   FU2 = day 7   (3 days after FU1 -> 7 days after initial)
//   FU3 = day 10  (3 days after FU2 -> 10 days after initial)
//   FU4 = day 14  (4 days after FU3 -> 14 days after initial)
// Stored as gap-from-previous so the cron arithmetic stays additive.
const NEW_SERVICES_FOLLOW_UP_DAYS = [4, 3, 3, 4] as const;

const NEW_SERVICE_BASE_PREFIXES = [
  "apartments-",
  "corgi-care-",
  "luxury-resource-",
  "rap-central-",
  "auto-body-",
] as const;

const NEWSLETTER_IDS = new Set(["elion-leaders", "elion-laymen"]);

/**
 * Drop any leftover {{...}} placeholders and rewrite the awkward
 * "for your team" tail that appears when we had to fall back to the
 * generic org name in the placeholder substitution step. Mirrors the
 * sanitizer used in /api/send-campaign so initial + follow-up subjects
 * stay consistent.
 */
function sanitizeFollowupSubject(subject: string, baseTemplateId: string): string {
  let s = subject
    .replace(/\{\{\s*[^}]+\s*\}\}/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([?.,!])/g, "$1")
    .trim();
  const lc = baseTemplateId.toLowerCase();
  if (lc.startsWith("luxury-resource-direct")) {
    s = s
      .replace(/\bfor your team\b/gi, "with Hawaii Luxury Resource")
      .replace(/\bat your team\b/gi, "on your end")
      .replace(/\brespect to your team\b/gi, "respect either way");
  } else if (lc.startsWith("rap-central")) {
    s = s
      .replace(/\bfor your team\b/gi, "for the artist")
      .replace(/\bat your team\b/gi, "on the artist's side");
  } else {
    s = s.replace(/\s+for your team\b/gi, "");
  }
  return s.replace(/\s{2,}/g, " ").trim();
}

function isAuthorized(request: NextRequest) {
  // Accept either the explicit X-Cron-Secret header (manual / external cron)
  // OR the standard Vercel Cron Authorization: Bearer <CRON_SECRET> header
  // that Vercel automatically attaches to scheduled cron invocations.
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;
  const headerVal = request.headers.get("x-cron-secret")?.trim();
  if (headerVal === secret) return true;
  const auth = request.headers.get("authorization")?.trim();
  if (auth && auth.toLowerCase() === `bearer ${secret.toLowerCase()}`) return true;
  return false;
}

function daysToMs(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

function isNewServiceBase(baseTemplateId: string): boolean {
  return NEW_SERVICE_BASE_PREFIXES.some((p) => baseTemplateId.startsWith(p));
}

function getScheduleDaysForBase(baseTemplateId: string): readonly number[] {
  if (isNewServiceBase(baseTemplateId)) return NEW_SERVICES_FOLLOW_UP_DAYS;
  if (baseTemplateId.startsWith("elion-")) return ELION_FOLLOW_UP_DAYS;
  return DEFAULT_FOLLOW_UP_DAYS;
}

function maxFollowUpsForBase(baseTemplateId: string): number {
  return getScheduleDaysForBase(baseTemplateId).length;
}

function nextDueAtMs(state: FollowUpState): number | null {
  if (state.openedAt) return null;
  const schedule = getScheduleDaysForBase(state.baseTemplateId);
  if (state.followUpsSent >= schedule.length) return null;
  const initial = Date.parse(state.initialSentAt);
  if (!Number.isFinite(initial)) return null;

  let offsetDays = 0;
  for (let i = 0; i <= state.followUpsSent; i++) offsetDays += schedule[i] ?? 0;
  return initial + daysToMs(offsetDays);
}

function makeStandaloneUrl(params: {
  baseUrlOrigin: string;
  templateId: string;
  accessKey: string;
  name?: string;
  org?: string;
}) {
  const qp = new URLSearchParams({
    access: params.accessKey,
    name: params.name?.trim() ? params.name.trim() : "there",
  });
  if (params.org?.trim()) qp.set("org", params.org.trim());
  return `${params.baseUrlOrigin.replace(/\/$/, "")}/newsletter/${encodeURIComponent(params.templateId)}?${qp.toString()}`;
}

function wrapNewsletterRebumpHtml(originalHtml: string, standaloneUrl: string) {
  return `
<div style="font-family:sans-serif;max-width:620px;margin:0 auto;">
  <div style="background:#0b1220;color:#e2e8f0;padding:14px 16px;border-radius:14px;margin:0 0 12px;">
    <p style="margin:0 0 8px;font-weight:800;">Here it is again.</p>
    <p style="margin:0;font-size:13px;line-height:1.5;">
      Standalone link:
      <a href="${standaloneUrl}" style="color:#93c5fd;">${standaloneUrl}</a>
    </p>
  </div>
  ${originalHtml}
</div>
`.trim();
}

function wrapNewsletterRebumpText(originalText: string, standaloneUrl: string) {
  return `Here it is again.\nStandalone link: ${standaloneUrl}\n\n${originalText}`;
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "RESEND_API_KEY not set" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const now = Date.now();
    const accessKey = process.env.SMOOTHSALES_STANDALONE_KEY?.trim() || "CROWN";
    const baseUrlRaw =
      process.env.NEXT_PUBLIC_APP_URL?.trim() ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
      "https://www.coralcrownsolutions.com";
    let baseUrlOrigin = baseUrlRaw;
    try {
      baseUrlOrigin = new URL(baseUrlRaw).origin;
    } catch {
      // keep raw
    }

    let scanned = 0;
    let due = 0;
    let sent = 0;
    const errors: Array<{ email: string; baseTemplateId: string; error: string }> = [];

    for await (const state of scanFollowUpStates()) {
      scanned++;
      const dueAt = nextDueAtMs(state);
      if (dueAt == null || dueAt > now) continue;
      due++;

      const step = state.followUpsSent + 1;
      const isNewsletter = NEWSLETTER_IDS.has(state.baseTemplateId);
      const templateToSend = isNewsletter
        ? (state.baseTemplateId as TemplateId)
        : (`${state.baseTemplateId}-followup-${step}` as TemplateId);

      let subject: string;
      let html: string;
      let text: string;
      try {
        const t = getTemplate(templateToSend);
        subject = t.subject;
        html = t.html;
        text = t.text;
      } catch (e) {
        errors.push({
          email: state.email,
          baseTemplateId: state.baseTemplateId,
          error: `Missing template: ${templateToSend}`,
        });
        continue;
      }

      // Mirror the subject-personalization fix from /api/send-campaign so
      // follow-ups never leak a literal "{{Name of Organization}}" either.
      const orgFallback =
        (state.nameOfOrganization && state.nameOfOrganization.trim()) ||
        (state.name && state.name.trim() && state.name.trim().toLowerCase() !== "there"
          ? state.name.trim()
          : "your team");
      const vars = {
        Name: state.name ?? "there",
        "Name of Person": state.name ?? "there",
        "Name of Organization": orgFallback,
      };
      const substituted = substitutePlaceholders(html, text, vars);
      let personalHtml = substituted.html;
      let personalText = substituted.text;
      const subjectSubstituted = substitutePlaceholders(subject, "", vars).html;
      let personalSubject = sanitizeFollowupSubject(subjectSubstituted, state.baseTemplateId);

      if (isNewsletter) {
        const standaloneUrl = makeStandaloneUrl({
          baseUrlOrigin,
          templateId: state.baseTemplateId,
          accessKey,
          name: vars.Name,
          org: vars["Name of Organization"],
        });
        personalHtml = wrapNewsletterRebumpHtml(personalHtml, standaloneUrl);
        personalText = wrapNewsletterRebumpText(personalText, standaloneUrl);
        personalSubject = `Here it is again: ${personalSubject}`;
      }

      try {
        const payload: Parameters<Resend["emails"]["send"]>[0] = {
          from: FROM_EMAIL,
          to: state.email,
          subject: personalSubject,
          html: personalHtml,
          text: personalText,
          tags: [
            { name: "template_id", value: templateToSend },
            { name: "campaign_base", value: state.baseTemplateId },
            { name: "followup_step", value: String(step) },
          ],
        };
        const { data, error } = await resend.emails.send(payload);
        if (error) throw new Error(error.message);

        sent++;
        await upsertFollowUpState({
          ...state,
          followUpsSent: step,
          lastSentAt: new Date().toISOString(),
          lastEmailId: data?.id,
        });

        // stay under Resend request limits
        await new Promise((r) => setTimeout(r, 700));
      } catch (e) {
        errors.push({
          email: state.email,
          baseTemplateId: state.baseTemplateId,
          error: e instanceof Error ? e.message : "Send failed",
        });
      }
    }

    return NextResponse.json({ success: true, scanned, due, sent, errors });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Cron error" },
      { status: 500 }
    );
  }
}

// Vercel Cron always invokes scheduled jobs with HTTP GET, so we expose a GET
// alias that delegates to POST. Authorization is handled identically (Vercel
// attaches `Authorization: Bearer $CRON_SECRET` automatically on cron calls).
export async function GET(request: NextRequest) {
  return POST(request);
}

