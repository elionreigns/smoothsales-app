import { NextResponse } from "next/server";
import { isAuthenticated, isAuthRequired } from "@/lib/auth";

export async function GET(request: Request) {
  if (!isAuthRequired()) {
    return NextResponse.json({ unlocked: true });
  }
  const unlocked = isAuthenticated(request);
  return NextResponse.json({ unlocked: !!unlocked });
}
