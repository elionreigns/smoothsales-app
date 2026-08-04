/** Shared HTML card helpers for Head Hunting email templates. */

const REPLY_EMAIL = "coralcrowntechnologies@gmail.com";
const REPLY_PHONE_E164 = "+18083930153";
const REPLY_PHONE_DISPLAY = "(808) 393-0153";

function replyMailto(slug?: string) {
  const subject = slug
    ? `Re: Eric Schaefer — ${slug.replace(/-/g, " ")} — let's connect`
    : "Re: Eric Schaefer — let's connect";
  const body =
    "Hi Eric,\n\nI got your note and I'm open to connecting.\n\nBest time for me:\n\n";
  return {
    subject: encodeURIComponent(subject),
    body: encodeURIComponent(body),
    sms: encodeURIComponent("Hi Eric — I got your note and would like to connect. "),
  };
}

/** Tap-to-text, tap-to-email, and optional calendar-style mailto with pre-filled ask. */
export function replyCtaButtons(accent: string, audienceSlug?: string): string {
  const { subject, body, sms } = replyMailto(audienceSlug);
  return `<div style="margin:28px 0 6px;text-align:center;background:#0f172a;border-radius:20px;padding:24px 20px;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#94a3b8;">Reply in one tap</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.5;color:#e2e8f0;">I'm on Oahu — text or email is fastest.</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;border-collapse:separate;border-spacing:0 10px;width:100%;max-width:340px;">
<tr>
<td style="border-radius:12px;background:${accent};text-align:center;">
<a href="sms:${REPLY_PHONE_E164}?body=${sms}" style="display:block;padding:16px 20px;color:#ffffff;text-decoration:none;font-weight:800;font-size:15px;">📱 Text ${REPLY_PHONE_DISPLAY}</a>
</td>
</tr>
<tr>
<td style="border-radius:12px;background:#ffffff;text-align:center;">
<a href="mailto:${REPLY_EMAIL}?subject=${subject}&body=${body}" style="display:block;padding:16px 20px;color:#0f172a;text-decoration:none;font-weight:800;font-size:15px;">✉️ Email ${REPLY_EMAIL}</a>
</td>
</tr>
</table>
<p style="margin:16px 0 0;font-size:12px;color:#94a3b8;line-height:1.5;">Eric Hans Schaefer (E Lion) · Family Feud Grand Prize 2016</p>
</div>`;
}

export const REPLY_CTA_TEXT = `\n\nReply in one tap:\n• Text: ${REPLY_PHONE_E164}\n• Email: ${REPLY_EMAIL}`;

export const MEETING_TEXT =
  "\n\nI'm on Oahu — happy to meet for coffee at your office or jump on a quick call.";

export const MEETING_HTML = `<p style="margin:18px 0 0;font-size:15px;line-height:1.75;color:#334155;">I'm based on <strong>Oahu</strong> and would rather meet in person when it makes sense — coffee, your office, or a quick call works.</p>`;

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
