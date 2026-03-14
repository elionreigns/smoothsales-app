/**
 * SmoothSales password gate: humans enter password; clawdbot/AI bypass via ?access=KEY or header.
 * Set SMOOTHSALES_PASSWORD (required) and optionally SMOOTHSALES_BYPASS_KEY (for URL/header bypass).
 */

export const AUTH_COOKIE_NAME = "smoothsales_ok";
const AUTH_COOKIE_VALUE = "1";

function getPassword(): string {
  return (process.env.SMOOTHSALES_PASSWORD ?? "").trim();
}

function getBypassKey(): string | null {
  const k = (process.env.SMOOTHSALES_BYPASS_KEY ?? "").trim();
  return k || null;
}

/** Returns true if the given key/password is valid (matches SMOOTHSALES_PASSWORD or SMOOTHSALES_BYPASS_KEY). */
export function isValidAccessKey(key: string | null | undefined): boolean {
  if (!key || typeof key !== "string") return false;
  const k = key.trim();
  const pwd = getPassword();
  const bypass = getBypassKey();
  if (pwd && k === pwd) return true;
  if (bypass && k === bypass) return true;
  return false;
}

/** Returns the cookie value to set when unlocked. */
export function getAuthCookieValue(): string {
  return AUTH_COOKIE_VALUE;
}

export function getAuthCookieName(): string {
  return AUTH_COOKIE_NAME;
}

/** Check if request is authenticated: cookie present and valid, or valid access key in header/query. */
export function isAuthenticated(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((s) => {
      const i = s.indexOf("=");
      return i >= 0 ? [s.slice(0, i).trim(), s.slice(i + 1).trim()] : [s.trim(), ""];
    })
  );
  if (cookies[AUTH_COOKIE_NAME] === AUTH_COOKIE_VALUE) return true;
  const headerKey = request.headers.get("x-smoothsales-access") ?? request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  if (isValidAccessKey(headerKey)) return true;
  return false;
}

/** Cookie options for Set-Cookie (unlock). */
export function authCookieOptions(maxAgeDays = 30): { name: string; value: string; httpOnly: boolean; secure: boolean; sameSite: "lax"; path: string; maxAge: number } {
  return {
    name: AUTH_COOKIE_NAME,
    value: AUTH_COOKIE_VALUE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeDays * 24 * 60 * 60,
  };
}

/** Whether the app should require auth (if no password is set, gate is disabled for easier local dev). */
export function isAuthRequired(): boolean {
  return getPassword().length > 0;
}
