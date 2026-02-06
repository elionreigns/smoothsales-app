/**
 * E Lion follow-up email templates.
 * Used when the original campaign gets no response within 4 days.
 * Schedule: follow-up 1 at 4 days, follow-up 2 at 5 days after that, follow-up 3 at 5 days after that
 * (i.e. 4, 9, 14 days from initial send).
 *
 * All E Lion base templates (elion-fans, elion-artists, elion-brands, elion-producers,
 * elion-venue-church, elion-venue-show, elion-venue-dj) have 3 follow-ups each.
 */

export const ELION_FOLLOW_UP_DAYS = [4, 5, 5] as const; // first follow-up at 4 days, then +5, +5

export type ElionBaseCampaignId =
  | "elion-fans"
  | "elion-artists"
  | "elion-brands"
  | "elion-producers"
  | "elion-venue-church"
  | "elion-venue-show"
  | "elion-venue-dj"
  | "elion-venue-major";

export type ElionFollowUpTemplateId = `${ElionBaseCampaignId}-followup-${1 | 2 | 3}`;

export function isElionFollowUpTemplateId(id: string): id is ElionFollowUpTemplateId {
  return /^elion-(fans|artists|brands|producers|venue-church|venue-show|venue-dj|venue-major)-followup-[123]$/.test(id);
}

export function getElionFollowUpTemplate(
  id: ElionFollowUpTemplateId
): { subject: string; html: string; text: string } {
  const t = ELION_FOLLOW_UP_TEMPLATES[id];
  if (!t) throw new Error(`Unknown follow-up template: ${id}`);
  return t;
}

const CONTACT_FOOTER = "\n\nReach us: coralcrowntechnologies@gmail.com or (808) 393-0153.";
const CONTACT_HTML = `<p style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(0,0,0,0.08);color:#64748b;font-size:12px;">Reach us: <a href="mailto:coralcrowntechnologies@gmail.com" style="color:#0ea5e9;">Email</a> or (808) 393-0153.</p>";
const SOFT_CLOSE = ' Thanks for your time. If you ever see this and it\'s a fit, we\'d love to hear from you. Take care.';
const SOFT_CLOSE_HTML =
  '<p style="margin:20px 0 0;font-size:14px;color:#475569;">Thanks for your time. If you ever see this and it\'s a fit, we\'d love to hear from you. Take care.</p>';

const box = (color: string, content: string) =>
  `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#eff6ff;border:2px solid ${color};border-radius:20px;padding:28px;color:#1e3a8a;"><p style="margin:0 0 16px;font-size:15px;">Hi {{Name}},</p>${content}${CONTACT_HTML}</div>`;

export const ELION_FOLLOW_UP_TEMPLATES: Record<
  ElionFollowUpTemplateId,
  { subject: string; html: string; text: string }
> = {
  // —— elion-fans ——
  "elion-fans-followup-1": {
    subject: "Re: E Lion Music – Holy Hip-Hop from Hawaii (quick follow-up)",
    text: `Hi {{Name}},\n\nFollowing up – we'd still love for you to hit follow and stream E Lion. 15+ years, Family Feud grand prize, 10M+ YouTube views. One click and you're in: elionmusic.com or your favorite platform.${CONTACT_FOOTER}`,
    html: box(
      "#1e40af",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up – we'd still love for you to hit follow and stream E Lion. 15+ years, Family Feud grand prize, 10M+ YouTube views.</p><p style="margin:0 0 20px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#1d4ed8;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">elionmusic.com</a></p>`
    ),
  },
  "elion-fans-followup-2": {
    subject: "One more nudge – E Lion, Holy Hip-Hop from Hawaii",
    text: `Hi {{Name}},\n\nQuick nudge: E Lion's music is on every platform – Spotify, Apple, TikTok, Pandora. First Hawaiian family to win Family Feud. If you haven't hit follow yet, one click and you're in. elionmusic.com${CONTACT_FOOTER}`,
    html: box(
      "#1e40af",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Quick nudge: E Lion's music is on every platform – Spotify, Apple, TikTok, Pandora. First Hawaiian family to win Family Feud.</p><p style="margin:0 0 20px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#1d4ed8;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">elionmusic.com</a></p>`
    ),
  },
  "elion-fans-followup-3": {
    subject: "Last note – E Lion stream & follow",
    text: `Hi {{Name}},\n\nLast note: if you're into Holy Hip-Hop or island vibes, E Lion is worth a follow. elionmusic.com – no pressure.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#1e40af",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Last note: if you're into Holy Hip-Hop or island vibes, E Lion is worth a follow. No pressure.</p>${SOFT_CLOSE_HTML}<p style="margin:16px 0 0;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#1d4ed8;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">elionmusic.com</a></p>`
    ),
  },
  // —— elion-artists ——
  "elion-artists-followup-1": {
    subject: "Re: E Lion – Collaboration offer (following up)",
    text: `Hi {{Name}},\n\nFollowing up – E Lion is still open to a free collab (verse, feature, cross-promo). 15+ years, 10M+ views, Family Feud. Reply "in" and we'll get the details sorted.${CONTACT_FOOTER}`,
    html: box(
      "#7c3aed",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up – E Lion is still open to a <strong>free collab</strong> (verse, feature, cross-promo). 15+ years, 10M+ views, Family Feud.</p><p style="margin:0 0 20px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">elionmusic.com</a></p>`
    ),
  },
  "elion-artists-followup-2": {
    subject: "One more reason to collab with E Lion",
    text: `Hi {{Name}},\n\nQuick nudge: free collaboration, full credit, cross-promo. Family Feud winner, 100+ songs live. Reply "yes" or "tell me more" and we'll make it happen.${CONTACT_FOOTER}`,
    html: box(
      "#7c3aed",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Free collaboration, full credit, cross-promo. Family Feud winner, 100+ songs live. Reply "yes" or "tell me more."</p><p style="margin:0 0 20px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">elionmusic.com</a></p>`
    ),
  },
  "elion-artists-followup-3": {
    subject: "Last note – E Lion collab",
    text: `Hi {{Name}},\n\nLast note: we're still down for a free collab if the timing's right. One reply and we'll take it from there.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#7c3aed",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Last note: we're still down for a free collab if the timing's right. One reply and we'll take it from there.</p>${SOFT_CLOSE_HTML}<p style="margin:16px 0 0;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">elionmusic.com</a></p>`
    ),
  },
  // —— elion-brands ——
  "elion-brands-followup-1": {
    subject: "Re: E Lion Music – Sponsor partnership (quick follow-up)",
    text: `Hi {{Name}},\n\nFollowing up – E Lion is still open to adding your brand as an official sponsor on elionmusic.com (with a link to your site) in exchange for store credit or gear/apparel. 100+ songs on all platforms, Family Feud reach, 10M+ YouTube views. One reply and we'll get the details sorted.${CONTACT_FOOTER}`,
    html: box(
      "#1e40af",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up – E Lion is still open to adding your brand as an <strong>official sponsor on elionmusic.com</strong> (with a link to your site) in exchange for store credit or gear/apparel.</p><p style="margin:0 0 18px;font-size:14px;">100+ songs on all platforms, Family Feud reach, 10M+ YouTube views. One reply and we'll get the details sorted.</p><p style="margin:24px 0 0;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#1d4ed8;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">elionmusic.com</a></p>`
    ),
  },
  "elion-brands-followup-2": {
    subject: "One more reason to partner with E Lion (sponsor + link)",
    text: `Hi {{Name}},\n\nQuick nudge: your brand in front of 115M+ Family Feud viewers and an artist with 100+ songs live – we add you as a sponsor with a link, you provide product or credit. No long-term commitment. Reply "yes" or "tell me more" and we'll take it from there.${CONTACT_FOOTER}`,
    html: box(
      "#1e40af",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Your brand in front of <strong>115M+ Family Feud viewers</strong> and an artist with <strong>100+ songs live</strong> – we add you as a sponsor with a link, you provide product or credit. No long-term commitment.</p><p style="margin:0 0 20px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#1d4ed8;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">elionmusic.com</a></p>`
    ),
  },
  "elion-brands-followup-3": {
    subject: "Last note – E Lion sponsor spot (we add you + link)",
    text: `Hi {{Name}},\n\nLast note: we're still offering sponsor placement + link on elionmusic.com for product or store credit. If you're open, one quick reply gets you on the page.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#1e40af",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Last note: we're still offering <strong>sponsor placement + link on elionmusic.com</strong> for product or store credit. If you're open, one quick reply gets you on the page.</p>${SOFT_CLOSE_HTML}<p style="margin:16px 0 0;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#1d4ed8;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">elionmusic.com</a></p>`
    ),
  },
  // —— elion-producers ——
  "elion-producers-followup-1": {
    subject: "Re: E Lion – Beat request (following up)",
    text: `Hi {{Name}},\n\nFollowing up – E Lion would still love exclusive access to your beats. You get full credit on every release and every platform. 15+ years, 10M+ views, Family Feud. Reply and we'll get into format and credits.${CONTACT_FOOTER}`,
    html: box(
      "#ea580c",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up – E Lion would still love <strong>exclusive access to your beats</strong>. You get full credit on every release and every platform.</p><p style="margin:0 0 20px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#c2410c;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">elionmusic.com</a></p>`
    ),
  },
  "elion-producers-followup-2": {
    subject: "One more reason to send beats to E Lion",
    text: `Hi {{Name}},\n\nQuick nudge: your name on every release, no ghost credits. Family Feud winner, 100+ songs live. Reply with a link or "tell me more" and we'll lock it in.${CONTACT_FOOTER}`,
    html: box(
      "#ea580c",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Your name on every release – no ghost credits. Family Feud winner, 100+ songs live. Reply with a link or "tell me more."</p><p style="margin:0 0 20px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#c2410c;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">elionmusic.com</a></p>`
    ),
  },
  "elion-producers-followup-3": {
    subject: "Last note – E Lion beats",
    text: `Hi {{Name}},\n\nLast note: we're still looking for beats for exclusive use with full credit. If the timing's right, one reply and we'll get into format and BPM.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#ea580c",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Last note: we're still looking for beats for exclusive use with full credit. One reply and we'll get into format and BPM.</p>${SOFT_CLOSE_HTML}<p style="margin:16px 0 0;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#c2410c;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">elionmusic.com</a></p>`
    ),
  },
  // —— elion-venue-church ——
  "elion-venue-church-followup-1": {
    subject: "Re: E Lion – Book for your church (following up)",
    text: `Hi {{Name}},\n\nFollowing up – we'd still be honored to bring E Lion to your church (concert or keynote, P48X + Prayer Authority). 1,000+ performances, Family Feud grand prize. Reply with a date or "tell me more" and we'll send a set list and details.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up – we'd still be honored to bring E Lion to your church (concert or keynote, P48X + Prayer Authority). 1,000+ performances, Family Feud grand prize.</p><p style="margin:0 0 20px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#92400e;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">elionmusic.com</a></p>`
    ),
  },
  "elion-venue-church-followup-2": {
    subject: "One more reason to book E Lion for your church",
    text: `Hi {{Name}},\n\nQuick nudge: full concert or keynote, custom set list, ministry and music in one package. Waikiki Shell, Blaisdell, HebrewFest, churches nationwide. Reply with your ideal date(s) and we'll send credentials and rate.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Full concert or keynote, custom set list, ministry and music in one package. Waikiki Shell, Blaisdell, HebrewFest. Reply with your ideal date(s).</p><p style="margin:0 0 20px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#92400e;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">elionmusic.com</a></p>`
    ),
  },
  "elion-venue-church-followup-3": {
    subject: "Last note – E Lion for your church",
    text: `Hi {{Name}},\n\nLast note: E Lion is still available for church events. Reply with a date and we'll send a set list and details.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Last note: E Lion is still available for church events. Reply with a date and we'll send a set list and details.</p>${SOFT_CLOSE_HTML}<p style="margin:16px 0 0;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#92400e;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">elionmusic.com</a></p>`
    ),
  },
  // —— elion-venue-show ——
  "elion-venue-show-followup-1": {
    subject: "Re: E Lion – Book for festival or stage (following up)",
    text: `Hi {{Name}},\n\nFollowing up – E Lion is still available for your festival or stage show. 115M+ Family Feud viewers, 1,000+ performances, Waikiki Shell, Blaisdell. Reply with event name and date(s) and we'll send credentials and rate.${CONTACT_FOOTER}`,
    html: box(
      "#b91c1c",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up – E Lion is still available for your festival or stage. 115M+ Family Feud viewers, 1,000+ performances.</p><p style="margin:0 0 20px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#991b1b;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">elionmusic.com</a></p>`
    ),
  },
  "elion-venue-show-followup-2": {
    subject: "One more reason to book E Lion for your stage",
    text: `Hi {{Name}},\n\nQuick nudge: full concert, custom set list, artist who can draw and deliver. First Hawaiian family to win Family Feud. Reply with your slot and we'll get into rider and rate.${CONTACT_FOOTER}`,
    html: box(
      "#b91c1c",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Full concert, custom set list – artist who can draw and deliver. First Hawaiian family to win Family Feud. Reply with your slot.</p><p style="margin:0 0 20px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#991b1b;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">elionmusic.com</a></p>`
    ),
  },
  "elion-venue-show-followup-3": {
    subject: "Last note – E Lion for your stage",
    text: `Hi {{Name}},\n\nLast note: E Lion is still available for festivals and stage shows. Reply and we'll send credentials and make it happen.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#b91c1c",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Last note: E Lion is still available for festivals and stage shows. Reply and we'll send credentials and make it happen.</p>${SOFT_CLOSE_HTML}<p style="margin:16px 0 0;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#991b1b;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">elionmusic.com</a></p>`
    ),
  },
  // —— elion-venue-dj ——
  "elion-venue-dj-followup-1": {
    subject: "Re: DJ E Lion for your event (following up)",
    text: `Hi {{Name}},\n\nFollowing up – DJ E Lion is still available for your event. Family-friendly, high-energy, 1,000+ stages. Reply with event type and date(s) and we'll get into rate and setup.${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up – DJ E Lion is still available. Family-friendly, high-energy, 1,000+ stages. Reply with event type and date(s).</p><p style="margin:0 0 20px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#5b21b6;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">elionmusic.com</a></p>`
    ),
  },
  "elion-venue-dj-followup-2": {
    subject: "One more reason to book DJ E Lion",
    text: `Hi {{Name}},\n\nQuick nudge: clean set, his own music and more, 15+ years and Family Feud. Reply with duration and what you need (PA, tables) and we'll turn it up.${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Clean set, his own music and more, 15+ years and Family Feud. Reply with duration and what you need (PA, tables).</p><p style="margin:0 0 20px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#5b21b6;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">elionmusic.com</a></p>`
    ),
  },
  "elion-venue-dj-followup-3": {
    subject: "Last note – DJ E Lion for your event",
    text: `Hi {{Name}},\n\nLast note: DJ E Lion is still available if you have a date. One reply and we'll get into rate and setup.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Last note: DJ E Lion is still available if you have a date. One reply and we'll get into rate and setup.</p>${SOFT_CLOSE_HTML}<p style="margin:16px 0 0;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#5b21b6;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">elionmusic.com</a></p>`
    ),
  },
  // —— elion-venue-major ——
  "elion-venue-major-followup-1": {
    subject: "Re: E Lion – Opening for major artists (following up)",
    text: `Hi {{Name}},\n\nFollowing up – E Lion is still interested in opening slots at your venue when you host major artists. Waikiki Shell, Blaisdell experience; full set, professional rider. Reply if you have or expect opening slots and we'll send credentials.${CONTACT_FOOTER}`,
    html: box(
      "#15803d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up – E Lion is still interested in opening for major artists at your venue. Waikiki Shell, Blaisdell experience; full set, professional rider.</p><p style="margin:0 0 20px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#166534;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">elionmusic.com</a></p>`
    ),
  },
  "elion-venue-major-followup-2": {
    subject: "One more reason to consider E Lion for opening slots",
    text: `Hi {{Name}},\n\nQuick nudge: 15+ years, 1,000+ performances, Family Feud grand prize. Already played Waikiki Shell and Blaisdell. If you have opening slots for local/regional artists, reply and we'll send a set list and stay in touch.${CONTACT_FOOTER}`,
    html: box(
      "#15803d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">15+ years, 1,000+ performances, Family Feud grand prize. Already played Waikiki Shell and Blaisdell. Reply if you have opening slots.</p><p style="margin:0 0 20px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#166534;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">elionmusic.com</a></p>`
    ),
  },
  "elion-venue-major-followup-3": {
    subject: "Last note – E Lion opening slots",
    text: `Hi {{Name}},\n\nLast note: E Lion is still interested in opening for major artists at your venue when the right slot comes up. Reply anytime and we'll send credentials.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#15803d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Last note: E Lion is still interested in opening when the right slot comes up. Reply anytime and we'll send credentials.</p>${SOFT_CLOSE_HTML}<p style="margin:16px 0 0;"><a href="https://www.elionmusic.com" style="display:inline-block;background:#166534;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">elionmusic.com</a></p>`
    ),
  },
};
