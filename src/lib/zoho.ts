import { kv } from "@vercel/kv";

const ACCOUNTS_DOMAIN = process.env.ZOHO_ACCOUNTS_DOMAIN?.trim() || "https://accounts.zoho.com";
const API_DOMAIN = process.env.ZOHO_API_DOMAIN?.trim() || "https://www.zohoapis.com";
const TOKEN_KV_KEY = "zoho:access_token";

export type ZohoContact = {
  email: string;
  name?: string;
  nameOfOrganization?: string;
  leadSource?: string;
};

async function refreshAccessToken(): Promise<string> {
  const clientId = process.env.ZOHO_CLIENT_ID?.trim();
  const clientSecret = process.env.ZOHO_CLIENT_SECRET?.trim();
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN?.trim();
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Zoho credentials not set. Add ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN in Vercel: Project -> Settings -> Environment Variables, then redeploy."
    );
  }

  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
  });

  const res = await fetch(`${ACCOUNTS_DOMAIN}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  const body = await res.json();
  if (!res.ok || !body.access_token) {
    throw new Error("Zoho token refresh failed: " + JSON.stringify(body));
  }

  const expiresIn = Number(body.expires_in ?? 3600);
  // Cache with a safety margin so we never hand out a token that's about to expire mid-request.
  await kv.set(TOKEN_KV_KEY, body.access_token as string, { ex: Math.max(60, expiresIn - 120) });
  return body.access_token as string;
}

async function getAccessToken(): Promise<string> {
  const cached = await kv.get<string>(TOKEN_KV_KEY);
  if (cached) return cached;
  return refreshAccessToken();
}

/**
 * Fetches contacts from Zoho CRM, optionally filtered by Lead_Source (used here as
 * the "category" field - e.g. "E Lion Dragon Booth", or any other source/category
 * value set up in Zoho). Pass no filter to fetch all contacts with an email.
 */
export async function fetchZohoContacts(leadSource?: string): Promise<ZohoContact[]> {
  let token = await getAccessToken();

  const fields = "Email,First_Name,Last_Name,Account_Name,Lead_Source";
  let url: string;
  if (leadSource) {
    const criteria = encodeURIComponent(`(Lead_Source:equals:${leadSource})`);
    url = `${API_DOMAIN}/crm/v3/Contacts/search?criteria=${criteria}&fields=${fields}`;
  } else {
    url = `${API_DOMAIN}/crm/v3/Contacts?fields=${fields}&per_page=200`;
  }

  let res = await fetch(url, {
    headers: { Authorization: `Zoho-oauthtoken ${token}` },
    cache: "no-store",
  });

  // Access token may have expired between cache checks - refresh once and retry.
  if (res.status === 401) {
    token = await refreshAccessToken();
    res = await fetch(url, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
      cache: "no-store",
    });
  }

  if (res.status === 204) return []; // No Content = no matching records
  const body = await res.json();
  if (!res.ok) {
    throw new Error("Zoho contacts fetch failed: " + JSON.stringify(body));
  }

  const records: Record<string, unknown>[] = body.data ?? [];
  return records
    .map((r) => {
      const email = String(r.Email ?? "").trim().toLowerCase();
      const first = String(r.First_Name ?? "").trim();
      const last = String(r.Last_Name ?? "").trim();
      const name = [first, last].filter(Boolean).join(" ");
      const account = r.Account_Name as { name?: string } | string | null;
      const nameOfOrganization =
        typeof account === "object" && account?.name ? account.name : typeof account === "string" ? account : undefined;
      return {
        email,
        name: name || undefined,
        nameOfOrganization,
        leadSource: typeof r.Lead_Source === "string" ? r.Lead_Source : undefined,
      };
    })
    .filter((c) => c.email && c.email.includes("@"));
}
