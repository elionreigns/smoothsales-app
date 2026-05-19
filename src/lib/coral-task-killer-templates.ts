/**
 * Task Killer / Torpedo composer templates — Custom service · Business & Music audiences.
 * Placeholders: {{Name}}, {{Body}} (plain text in composer → HTML line breaks in email).
 */

export type CoralTaskKillerTemplateId = "coral-business" | "coral-music";

export const CORAL_TASK_KILLER_TEMPLATE_OPTIONS: { value: CoralTaskKillerTemplateId; label: string }[] = [
  {
    value: "coral-business",
    label: "Business — Eric Hans Schaefer (official / tourism & tech since 2008)",
  },
  {
    value: "coral-music",
    label: "Music — E Lion (2016 Family Feud Grand Prize)",
  },
];

const DEFAULT_BODY =
  "Thank you for your time. I wanted to reach out with a clear next step and see if this is a fit on your end.";

export function isCoralTaskKillerTemplateId(id: string): id is CoralTaskKillerTemplateId {
  return id === "coral-business" || id === "coral-music";
}

const BUSINESS_HTML = [
  "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"></head>",
  "<body style=\"margin:0;padding:0;background:#f4f0e8;font-family:Georgia,'Times New Roman',serif;color:#1a1a18;\">",
  "<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background:#f4f0e8;padding:24px 12px;\"><tr><td align=\"center\">",
  "<table role=\"presentation\" width=\"600\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width:600px;background:#fff;border:3px solid #1a3a5c;\">",
  "<tr><td style=\"background:linear-gradient(180deg,#1a3a5c,#0d2840);padding:22px 24px;text-align:center;\">",
  "<div style=\"display:inline-block;width:72px;height:72px;border-radius:50%;border:4px solid #c9a227;background:#fff;line-height:64px;font-size:30px;color:#1a3a5c;\">&#9878;</div>",
  "<p style=\"margin:12px 0 0;font-size:11px;letter-spacing:0.22em;color:#c9a227;\">OFFICIAL CORRESPONDENCE</p>",
  "<h1 style=\"margin:6px 0 0;font-size:22px;color:#fff;\">CORAL CROWN SOLUTIONS</h1></td></tr>",
  "<tr><td style=\"padding:10px 24px;background:#e8eef4;text-align:center;font-size:10px;font-weight:700;\">",
  "VERIFIED &nbsp;|&nbsp; SECURE &nbsp;|&nbsp; TRUSTED PARTNER</td></tr>",
  "<tr><td style=\"padding:28px 32px;font-size:16px;line-height:1.65;\">",
  "<p>Dear {{Name}},</p><div>{{Body}}</div></td></tr>",
  "<tr><td style=\"padding:0 32px 28px;border-top:2px solid #c9a227;\">",
  "<p style=\"font-weight:700;color:#1a3a5c;\">Eric Hans Schaefer</p>",
  "<p style=\"font-size:13px;\">Founder, Coral Crown Solutions</p>",
  "<p style=\"font-size:12px;\"><a href=\"https://coralcrownsolutions.com\">coralcrownsolutions.com</a></p>",
  "<p style=\"font-size:11px;font-style:italic;\">Tourism Industry &amp; Technology since 2008</p>",
  "<p style=\"font-size:12px;\">(808) 393-0153</p>",
  "</td></tr></table></td></tr></table></body></html>",
].join("");

const MUSIC_HTML = [
  "<!DOCTYPE html><html><head><meta charset=\"utf-8\"></head>",
  "<body style=\"margin:0;background:linear-gradient(135deg,#1a0a2e,#2d1b4e,#0f3460);font-family:'Segoe UI',sans-serif;color:#f0e6ff;padding:24px;\">",
  "<table role=\"presentation\" width=\"100%\"><tr><td align=\"center\">",
  "<table role=\"presentation\" width=\"600\" style=\"max-width:600px;border:2px solid #ff6bcb;border-radius:16px;\">",
  "<tr><td style=\"padding:24px;text-align:center;background:linear-gradient(90deg,rgba(255,107,203,0.4),rgba(0,212,255,0.35));\">",
  "<p style=\"font-size:38px;margin:0;\">&#9835; &#9833; &#9835;</p>",
  "<h1 style=\"color:#fff;margin:10px 0 0;\">E LION</h1>",
  "<p style=\"font-size:12px;color:#e8d4ff;\">2016 Family Feud Grand Prize Winner</p></td></tr>",
  "<tr><td style=\"padding:28px 32px;\"><p>Hey {{Name}},</p><div>{{Body}}</div>",
  "<p style=\"margin-top:20px;color:#c8b8ff;\">&mdash; E Lion</p></td></tr>",
  "<tr><td style=\"padding:14px;text-align:center;font-size:11px;border-top:1px dashed rgba(255,107,203,0.4);\">",
  "Creative outreach &middot; elionmusic.com</td></tr>",
  "</table></td></tr></table></body></html>",
].join("");

const TEMPLATES: Record<CoralTaskKillerTemplateId, { subject: string; html: string; text: string }> = {
  "coral-business": {
    subject: "Official correspondence from Coral Crown Solutions",
    text: `Dear {{Name}},\n\n{{Body}}\n\nEric Hans Schaefer\nFounder, Coral Crown Solutions\ncoralcrownsolutions.com\nTourism Industry & Technology since 2008\n(808) 393-0153`,
    html: BUSINESS_HTML,
  },
  "coral-music": {
    subject: "E Lion — quick note for you",
    text: `Hey {{Name}},\n\n{{Body}}\n\n— E Lion\n2016 Family Feud Grand Prize Winner\nelionmusic.com`,
    html: MUSIC_HTML,
  },
};

export function getCoralTaskKillerTemplate(id: CoralTaskKillerTemplateId): {
  subject: string;
  html: string;
  text: string;
} {
  const t = TEMPLATES[id];
  if (!t) throw new Error(`Unknown coral template: ${id}`);
  return { ...t };
}

export function escBodyForEmail(plain: string): string {
  return plain
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}

export { DEFAULT_BODY as CORAL_COMPOSER_DEFAULT_BODY };
