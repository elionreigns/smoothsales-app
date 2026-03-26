import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getTemplate, substitutePlaceholders, type TemplateId } from "@/lib/templates";
import { scanFollowUpStates, upsertFollowUpState, type FollowUpState } from "@/lib/followups-store";
import { ELION_FOLLOW_UP_DAYS } from "@/lib/elion-follow-up-templates";

const FROM_EMAIL = process.env.SMOOTHSALES_FROM?.trim() || "Coral Crown Solutions <onboarding@resend.dev>";

// Shared schedule: 4, 9, 14 days from initial (4 then +5 then +5)
const DEFAULT_FOLLOW_UP_DAYS = [4, 5, 5] as const;

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
  if (state.followUpsSent >= 3) return null;
  const schedule = getScheduleDaysForBase(state.baseTemplateId);
  const initial = Date.parse(state.initialSentAt);
  if (!Number.isFinite(initial)) return null;

  let offsetDays = 0;
  for (let i = 0; i <= state.followUpsSent; i++) offsetDays += schedule[i] ?? 0;
  return initial + daysToMs(offsetDays);
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
      const followupId = `${state.baseTemplateId}-followup-${step}` as TemplateId;

      let subject: string;
      let html: string;
      let text: string;
      try {
        const t = getTemplate(followupId);
        subject = t.subject;
        html = t.html;
        text = t.text;
      } catch (e) {
        errors.push({
          email: state.email,
          baseTemplateId: state.baseTemplateId,
          error: `Missing follow-up template: ${followupId}`,
        });
        continue;
      }

      const vars = {
        Name: state.name ?? "there",
        "Name of Person": state.name ?? "there",
        "Name of Organization": state.nameOfOrganization ?? "",
      };
      const { html: personalHtml, text: personalText } = substitutePlaceholders(html, text, vars);

      try {
        const payload: Parameters<Resend["emails"]["send"]>[0] = {
          from: FROM_EMAIL,
          to: state.email,
          subject,
          html: personalHtml,
          text: personalText,
          tags: [
            { name: "template_id", value: followupId },
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

