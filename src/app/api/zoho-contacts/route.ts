import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated, isAuthRequired } from "@/lib/auth";
import { fetchZohoContacts, searchZohoContactsByWord } from "@/lib/zoho";

export async function GET(request: NextRequest) {
  if (isAuthRequired() && !isAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Enter the app password in the browser or use the bypass key." },
      { status: 401 }
    );
  }

  const category = request.nextUrl.searchParams.get("category")?.trim() || undefined;
  const q = request.nextUrl.searchParams.get("q")?.trim() || undefined;

  try {
    // ?q= is the typeahead path (single-contact search-as-you-type); ?category=
    // (or no param, for "all contacts") is the bulk group/audience loader.
    const contacts = q ? await searchZohoContactsByWord(q) : await fetchZohoContacts(category);
    return NextResponse.json({ success: true, count: contacts.length, contacts });
  } catch (err) {
    console.error("Zoho contacts route error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Failed to fetch Zoho contacts" },
      { status: 500 }
    );
  }
}
