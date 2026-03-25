import { NextRequest, NextResponse } from "next/server";
import { type TemplateId } from "@/lib/templates";
import { getSmsTeaser } from "@/lib/sms";
import { isAuthenticated, isAuthRequired } from "@/lib/auth";

function json400(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

export async function GET(request: NextRequest) {
  if (isAuthRequired() && !isAuthenticated(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const templateId = (url.searchParams.get("templateId") || "").trim() as TemplateId;
  if (!templateId) return json400("Missing templateId");

  const accessKey = process.env.SMOOTHSALES_STANDALONE_KEY?.trim() || "CROWN";
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const landingUrl = `${baseUrl.replace(/\/$/, "")}/newsletter/${encodeURIComponent(templateId)}?access=${encodeURIComponent(accessKey)}`;

  const teaser = getSmsTeaser(templateId);
  const sms = `${teaser} ${landingUrl}`;
  return NextResponse.json({ ok: true, templateId, teaser, landingUrl, sms });
}

