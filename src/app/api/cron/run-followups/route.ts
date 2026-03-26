import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getTemplate, substitutePlaceholders, type TemplateId } from "@/lib/templates";
import { scanFollowUpStates, upsertFollowUpState, type FollowUpState } from "@/lib/followups-store";
import { ELION_FOLLOW_UP_DAYS } from "@/lib/elion-follow-up-templates";

const FROM_EMAIL = process.env.SMOOTHSALES_FROM?.trim() || "Coral Crown Solutions <onboarding@resend.dev>";

// Unopened rebump schedule: +3 days, then +5 days, then +10 days from prior.
// (i.e. day 3, day 8, day 18 from the initial send)
const DEFAULT_FOLLOW_UP_DAYS = [3, 5, 10] as const;

const NEWSLETTER_IDS = new Set(["elion-leaders", "elion-laymen"]);

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;
  const got = request.headers.get("x-cron-secret")?.trim();
  return got === secret;
}

function daysToMs(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

function getScheduleDaysForBase(baseTemplateId: string) {
  // E Lion followups use ELION_FOLLOW_UP_DAYS; others use default.
  if (baseTemplateId.startsWith("elion-")) return ELION_FOLLOW_UP_DAYS;
  return DEFAULT_FOLLOW_UP_DAYS;
}

function nextDueAtMs(state: FollowUpState): number | null {
  if (state.openedAt) return null;
  // We currently support up to 3 rebumps by default (schedule length),
  // but this can be expanded later.
  if (state.followUpsSent >= 3) return null;
  const schedule = getScheduleDaysForBase(state.baseTemplateId);
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

      const vars = {
        Name: state.name ?? "there",
        "Name of Person": state.name ?? "there",
        "Name of Organization": state.nameOfOrganization ?? "",
      };
      const substituted = substitutePlaceholders(html, text, vars);
      let personalHtml = substituted.html;
      let personalText = substituted.text;

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
        subject = `Here it is again: ${subject}`;
      }

      try {
        const payload: Parameters<Resend["emails"]["send"]>[0] = {
          from: FROM_EMAIL,
          to: state.email,
          subject,
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

