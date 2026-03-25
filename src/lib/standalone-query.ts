/**
 * Standalone newsletter links use ?name= for {{Name}}. Users sometimes paste whole lines
 * from docs (e.g. "...name=there | SMS teaser: GET /api/..."), which must not become the name.
 */
export function sanitizeStandaloneName(raw: string | undefined, fallback = "there"): string {
  return sanitizeStandaloneParam(raw, fallback);
}

export function sanitizeStandaloneOrg(raw: string | undefined): string {
  return sanitizeStandaloneParam(raw, "");
}

function sanitizeStandaloneParam(raw: string | undefined, fallback: string): string {
  if (raw == null || typeof raw !== "string") return fallback;
  let s = raw.trim();
  if (!s) return fallback;

  const teaserSplit = /\s*\|\s*SMS\s+teaser\s*:/i;
  const m = teaserSplit.exec(s);
  if (m && m.index > 0) {
    s = s.slice(0, m.index).trim();
  }

  s = s.replace(/`/g, "").trim();

  const apiMatch = /\bGET\s+\/api\/sms-preview\b/i.exec(s);
  if (apiMatch && apiMatch.index > 0) {
    s = s.slice(0, apiMatch.index).trim();
  }

  s = s.replace(/[,\s]+$/g, "").trim();

  if (!s) return fallback;
  return s.length > 120 ? s.slice(0, 120).trim() : s;
}
