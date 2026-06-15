/** Shared HTML card helpers for Head Hunting email templates. */

const REPLY_EMAIL = "coralcrowntechnologies@gmail.com";
const REPLY_PHONE_E164 = "+18083930153";
const REPLY_PHONE_DISPLAY = "(808) 393-0153";

/** Tap-to-text and tap-to-email buttons for meeting replies. */
export function replyCtaButtons(accent: string): string {
  const smsBody = encodeURIComponent("Hi Eric — I got your note and would like to connect.");
  const mailSubject = encodeURIComponent("Re: Your note — let's connect");
  const mailBody = encodeURIComponent(
    "Hi Eric,\n\nI got your email and would like to connect.\n\n",
  );
  return `<div style="margin:24px 0 4px;text-align:center;">
<p style="margin:0 0 14px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">Get back to Eric</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;border-collapse:separate;border-spacing:10px 0;">
<tr>
<td style="border-radius:999px;background:${accent};">
<a href="sms:${REPLY_PHONE_E164}?body=${smsBody}" style="display:inline-block;padding:14px 26px;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;border-radius:999px;">Text (808) 393-0153</a>
</td>
<td style="border-radius:999px;background:#0f172a;">
<a href="mailto:${REPLY_EMAIL}?subject=${mailSubject}&body=${mailBody}" style="display:inline-block;padding:14px 26px;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;border-radius:999px;">Email Eric</a>
</td>
</tr>
</table>
<p style="margin:14px 0 0;font-size:12px;color:#64748b;line-height:1.5;">${REPLY_EMAIL} · ${REPLY_PHONE_DISPLAY}</p>
</div>`;
}

export const REPLY_CTA_TEXT = `\n\nGet back to me:\n• Text: ${REPLY_PHONE_E164}\n• Email: ${REPLY_EMAIL}`;

export function card(
  accent: string,
  accentSoft: string,
  kicker: string,
  headline: string,
  sub: string,
  body: string,
  footerHtml: string,
): string {
  return `<div style="font-family:'Segoe UI',system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border:1px solid ${accentSoft};border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px ${accentSoft},0 10px 28px -8px rgba(0,0,0,0.08);">
<div style="background:linear-gradient(145deg,${accent} 0%,${accent} 60%,${accent} 100%);color:#fff;padding:30px 26px;text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;opacity:0.95;">${kicker}</p>
<h1 style="margin:0;font-size:24px;font-weight:800;letter-spacing:-0.02em;line-height:1.22;">${headline}</h1>
<p style="margin:14px 0 0;font-size:14px;line-height:1.5;opacity:0.95;">${sub}</p>
</div>
<div style="padding:30px 26px;color:#1e293b;">
<p style="margin:0 0 18px;font-size:15px;font-weight:600;color:#0f172a;">Hi {{Name}},</p>
${body}
${footerHtml}
</div>
</div>`;
}

export function fbox(accent: string, body: string, footerHtml: string): string {
  return `<div style="font-family:'Segoe UI',system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border:2px solid ${accent};border-radius:20px;padding:26px;color:#1e293b;">
<p style="margin:0 0 16px;font-size:15px;font-weight:600;">Hi {{Name}},</p>
${body}
${footerHtml}
</div>`;
}
