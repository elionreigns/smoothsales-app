import { NextRequest, NextResponse } from "next/server";
import { isValidAccessKey, authCookieOptions, isAuthRequired } from "@/lib/auth";

export async function GET(request: NextRequest) {
  if (!isAuthRequired()) {
    return NextResponse.json({ ok: true });
  }
  const access = request.nextUrl.searchParams.get("access");
  if (!isValidAccessKey(access)) {
    return NextResponse.json({ ok: false, error: "Invalid or missing access key" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  const opts = authCookieOptions(30);
  res.cookies.set(opts.name, opts.value, {
    httpOnly: opts.httpOnly,
    secure: opts.secure,
    sameSite: opts.sameSite,
    path: opts.path,
    maxAge: opts.maxAge,
  });
  return res;
}

export async function POST(request: NextRequest) {
  if (!isAuthRequired()) {
    return NextResponse.json({ ok: true });
  }
  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const password = typeof body.password === "string" ? body.password.trim() : "";
  if (!password) {
    return NextResponse.json({ ok: false, error: "Missing password" }, { status: 400 });
  }
  if (!isValidAccessKey(password)) {
    return NextResponse.json({ ok: false, error: "Incorrect password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  const opts = authCookieOptions(30);
  res.cookies.set(opts.name, opts.value, {
    httpOnly: opts.httpOnly,
    secure: opts.secure,
    sameSite: opts.sameSite,
    path: opts.path,
    maxAge: opts.maxAge,
  });
  return res;
}
