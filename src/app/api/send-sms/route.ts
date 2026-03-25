import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated, isAuthRequired } from "@/lib/auth";
import { type TemplateId } from "@/lib/templates";
import { getSmsTeaser } from "@/lib/sms";
import twilio from "twilio";

type Body = {
  templateId: TemplateId;
  numbers: string[] | string;
  name?: string;
  org?: string;
  dryRun?: boolean;
};

function normalizeNumber(n: string): string {
  // Accept E.164 already, or strip non-digits and assume US if 10 digits.
  const trimmed = (n || "").trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("+")) return trimmed;
  const digits = trimmed.replace(/[^\d]/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return "";
}

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export async function POST(request: NextRequest) {
  if (isAuthRequired() && !isAuthenticated(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const templateId = (body.templateId || "").trim() as TemplateId;
  const dryRun = Boolean(body.dryRun);
  const accessKey = process.env.SMOOTHSALES_STANDALONE_KEY?.trim() || "CROWN";

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const landingUrl = `${baseUrl.replace(/\/$/, "")}/newsletter/${encodeURIComponent(templateId)}?access=${encodeURIComponent(
    accessKey
  )}${body.name ? `&name=${encodeURIComponent(body.name)}` : ""}${body.org ? `&org=${encodeURIComponent(body.org)}` : ""}`;

  const teaser = getSmsTeaser(templateId);
  const messageBody = `${teaser} ${landingUrl}`;

  const rawNums = Array.isArray(body.numbers)
    ? body.numbers
    : typeof body.numbers === "string"
      ? body.numbers.split(/[\n,;]+/g)
      : [];

  const numbers = uniq(rawNums.map(normalizeNumber).filter(Boolean));
  if (!numbers.length) {
    return NextResponse.json({ ok: false, error: "No valid numbers (expected E.164 like +18083930153)" }, { status: 400 });
  }

  if (dryRun) {
    return NextResponse.json({ ok: true, dryRun: true, templateId, count: numbers.length, messageBody, numbers });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID?.trim() || "";
  const authToken = process.env.TWILIO_AUTH_TOKEN?.trim() || "";
  const fromNumber = process.env.TWILIO_FROM_NUMBER?.trim() || "";
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID?.trim() || "";

  if (!accountSid || !authToken) {
    return NextResponse.json(
      { ok: false, error: "Missing TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN (set env vars in Vercel)" },
      { status: 400 }
    );
  }
  if (!fromNumber && !messagingServiceSid) {
    return NextResponse.json(
      { ok: false, error: "Set TWILIO_FROM_NUMBER or TWILIO_MESSAGING_SERVICE_SID" },
      { status: 400 }
    );
  }

  const client = twilio(accountSid, authToken);

  const results: Array<{ to: string; sid?: string; error?: string }> = [];
  for (const to of numbers) {
    try {
      const res = await client.messages.create({
        to,
        from: fromNumber || undefined,
        messagingServiceSid: messagingServiceSid || undefined,
        body: messageBody,
      });
      results.push({ to, sid: res.sid });
    } catch (e) {
      results.push({ to, error: e instanceof Error ? e.message : String(e) });
    }
  }

  const sent = results.filter((r) => r.sid).length;
  const failed = results.length - sent;
  return NextResponse.json({ ok: true, templateId, count: results.length, sent, failed, messageBody, results });
}

