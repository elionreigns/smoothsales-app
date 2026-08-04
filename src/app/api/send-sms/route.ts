import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated, isAuthRequired } from "@/lib/auth";
import { type TemplateId } from "@/lib/templates";
import { getSmsTeaser } from "@/lib/sms";

type Body = {
  templateId: TemplateId;
  numbers: string[] | string;
  name?: string;
  org?: string;
  dryRun?: boolean;
  fromOverride?: string;
  /** Custom SMS body — skips template teaser (still needs templateId for API shape) */
  text?: string;
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

  const customText = typeof body.text === "string" ? body.text.trim() : "";
  const teaser = getSmsTeaser(templateId);
  const messageBody = customText || `${teaser} ${landingUrl}`;

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

  const apiKey = process.env.TEXTING_API_KEY?.trim() || "";
  const apiSecret = process.env.TEXTING_API_SECRET?.trim() || "";
  const fromEnv = process.env.TEXTING_FROM?.trim() || "test";
  const fromOverride = typeof body.fromOverride === "string" ? body.fromOverride.trim() : "";
  const providerUrl = process.env.TEXTING_BASE_URL?.trim() || "https://www.thetexting.com/rest/sms/json/Message/Send";
  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      { ok: false, error: "Missing TEXTING_API_KEY / TEXTING_API_SECRET (set env vars in Vercel)" },
      { status: 400 }
    );
  }

  const results: Array<{ to: string; id?: string; error?: string; providerResponse?: unknown }> = [];
  for (const to of numbers) {
    const senderCandidates = [fromOverride, fromEnv, "test", "sandbox", ""].filter((v, i, arr) => v !== "" ? arr.indexOf(v) === i : i === arr.indexOf(v));
    let delivered = false;
    let lastError = "";
    try {
      for (const sender of senderCandidates) {
        const qs = new URLSearchParams({
          api_key: apiKey,
          api_secret: apiSecret,
          to: to.replace(/^\+/, ""),
          text: messageBody,
        });
        if (sender) qs.set("from", sender);

        const res = await fetch(`${providerUrl}?${qs.toString()}`, { method: "GET" });
        const text = await res.text();
        let parsed: unknown = text;
        try {
          parsed = JSON.parse(text);
        } catch {
          // keep raw response string
        }
        if (!res.ok) {
          lastError = `Provider HTTP ${res.status}: ${text}`;
          continue;
        }

        const responseObj = parsed as {
          id?: string;
          message_id?: string;
          status?: string | number;
          Status?: string | number;
          errors?: unknown;
          ErrorMessage?: string;
        };
        const id = responseObj?.message_id || responseObj?.id;
        const statusValue = String(responseObj?.status ?? responseObj?.Status ?? "").toLowerCase();
        const hasError =
          Boolean(responseObj?.errors) ||
          Boolean(responseObj?.ErrorMessage) ||
          statusValue === "error" ||
          statusValue === "1";

        if (!hasError || id) {
          results.push({ to, id, providerResponse: { senderTried: sender || "(omitted)", raw: parsed } });
          delivered = true;
          break;
        }
        lastError = typeof parsed === "string" ? parsed : JSON.stringify(parsed);
      }

      if (!delivered) {
        throw new Error(lastError || "Send failed");
      }
    } catch (e) {
      results.push({ to, error: e instanceof Error ? e.message : String(e) });
    }
  }

  const sent = results.filter((r) => r.id || !r.error).length;
  const failed = results.length - sent;
  return NextResponse.json({ ok: true, templateId, count: results.length, sent, failed, messageBody, results });
}

