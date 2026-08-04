/**
 * Narrow sponsor templates for E Lion's two active outreach lanes.
 *
 * These are intentionally separate from the broad elion-brands template so
 * gear companies do not receive an apparel pitch and apparel companies do not
 * receive a studio-equipment shopping list.
 */

export type ElionSponsorTemplateId = "elion-gear-sponsor" | "elion-clothing-sponsor";

export const ELION_SPONSOR_TEMPLATE_OPTIONS: { value: ElionSponsorTemplateId; label: string }[] = [
  { value: "elion-gear-sponsor", label: "E Lion Music - Studio gear / artist-relations partnership" },
  { value: "elion-clothing-sponsor", label: "E Lion Music - Clothing / stagewear partnership" },
];

type SponsorTemplate = { subject: string; text: string; html: string };

const LINKS_TEXT = `

Press kit: https://www.elionmusic.com/presskit/
Downloads: https://www.elionmusic.com/downloads/
Music catalog: https://www.elionmusic.com/rap/
YouTube: https://www.youtube.com/@elionreigns
Sponsor context: https://www.elionmusic.com/sponsor/
`;

const FOOTER_TEXT = `

Thank you for considering it.
Eric "E Lion" Schaefer
elionreigns@gmail.com
(808) 393-0153
`;

const LINKS_HTML = `<div style="margin:24px 0 0;padding-top:18px;border-top:1px solid #dbe4f0;font-size:13px;line-height:1.75;text-align:center;">
<a href="https://www.elionmusic.com/presskit/" style="color:#1d4ed8;">Press kit</a> ·
<a href="https://www.elionmusic.com/downloads/" style="color:#1d4ed8;">Downloads</a> ·
<a href="https://www.elionmusic.com/rap/" style="color:#1d4ed8;">Music catalog</a> ·
<a href="https://www.youtube.com/@elionreigns" style="color:#1d4ed8;">YouTube</a> ·
<a href="https://www.elionmusic.com/sponsor/" style="color:#1d4ed8;">Sponsor context</a>
</div>`;

const CONTACT_HTML = `<p style="margin:24px 0 0;padding-top:18px;border-top:1px solid #dbe4f0;font-size:13px;line-height:1.65;text-align:center;color:#475569;">Thank you for considering it.<br><strong>Eric &quot;E Lion&quot; Schaefer</strong><br><a href="mailto:elionreigns@gmail.com" style="color:#1d4ed8;">elionreigns@gmail.com</a> · (808) 393-0153</p>`;

function shell(kicker: string, title: string, subtitle: string, body: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:0 auto;background:#f8fafc;border:1px solid #cbd5e1;border-radius:18px;overflow:hidden;color:#0f172a;">
<div style="padding:28px 26px;background:linear-gradient(135deg,#0f172a,#1e3a8a);color:#fff;text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;opacity:.86;">${kicker}</p>
<h1 style="margin:0;font-size:26px;line-height:1.2;">${title}</h1>
<p style="margin:12px 0 0;font-size:15px;line-height:1.55;opacity:.92;">${subtitle}</p>
</div>
<div style="padding:28px 26px;font-size:15px;line-height:1.7;">${body}${LINKS_HTML}${CONTACT_HTML}</div>
</div>`;
}

export function isElionSponsorTemplateId(id: string): id is ElionSponsorTemplateId {
  return id === "elion-gear-sponsor" || id === "elion-clothing-sponsor";
}

export function getElionSponsorTemplate(id: ElionSponsorTemplateId): SponsorTemplate {
  if (id === "elion-gear-sponsor") {
    const text = `Hi {{Name}},

I'm Eric "E Lion" Schaefer, a Hawaii-based Christian recording artist and author. I'm reaching out to ask whether {{Name of Organization}} accepts artist-relations, creator-partnership, or product-support inquiries.

I am looking for a focused studio-gear partnership: microphones, interfaces, monitors, preamps, headphones, PA equipment, or related production tools that I can use in ongoing recordings, live work, music-video content, and audio-production experiments. I am open to a product loan, artist pricing, store credit, or another arrangement you already use. In return, I can provide honest use, tagged content or short demonstrations where appropriate, and a sponsor listing with a link on elionmusic.com if we agree on the relationship. I will not imply an endorsement before anything is approved.

My background includes the 2016 Family Feud grand-prize win with my family, 1,000+ live performances, 10M+ YouTube views, and a growing catalog of faith-rooted Holy Hip-Hop from Hawaii. I am also developing music, books, Prayer Authority, and creator-focused production work.

Would you point me to the right artist-relations or partnership contact, and let me know whether you are open to a conversation? I can send a concise media kit and a specific gear proposal once I know the program requirements.${LINKS_TEXT}${FOOTER_TEXT}`;
    return {
      subject: "E Lion Music x {{Name of Organization}} - studio gear partnership inquiry",
      text,
      html: shell(
        "E Lion Music · Artist relations",
        "A focused gear partnership",
        "Studio tools used in real recordings, live work, and creator content.",
        `<p>Hi {{Name}},</p><p>I'm <strong>Eric "E Lion" Schaefer</strong>, a Hawaii-based Christian recording artist and author. I'm reaching out to ask whether <strong>{{Name of Organization}}</strong> accepts artist-relations, creator-partnership, or product-support inquiries.</p><p>I am looking for a focused studio-gear partnership: microphones, interfaces, monitors, preamps, headphones, PA equipment, or related production tools that I can use in ongoing recordings, live work, music-video content, and audio-production experiments. I am open to a product loan, artist pricing, store credit, or another arrangement you already use.</p><p>In return, I can provide honest use, tagged content or short demonstrations where appropriate, and a sponsor listing with a link on elionmusic.com if we agree on the relationship. I will not imply an endorsement before anything is approved.</p><p>My background includes the <strong>2016 Family Feud grand-prize win</strong> with my family, <strong>1,000+ live performances</strong>, <strong>10M+ YouTube views</strong>, and a growing catalog of faith-rooted Holy Hip-Hop from Hawaii. I am also developing music, books, Prayer Authority, and creator-focused production work.</p><p>Would you point me to the right artist-relations or partnership contact, and let me know whether you are open to a conversation? I can send a concise media kit and a specific gear proposal once I know the program requirements.</p>`
      ),
    };
  }

  const text = `Hi {{Name}},

I'm Eric "E Lion" Schaefer, a Hawaii-based Christian recording artist, author, and live performer. I'm reaching out to ask whether {{Name of Organization}} accepts artist, creator, ambassador, or clothing-collaboration inquiries.

I am looking for distinctive stagewear and everyday apparel: lion-face or animal graphics, bold Christian or Hawaiian designs, premium hoodies, jackets, tees, and statement pieces that fit a music-and-storytelling identity. I am open to artist pricing, product support, a capsule collaboration, or another arrangement you already use.

In return, I can wear and use the pieces in appropriate music, live, book, and community content, provide honest tagged content or short photos/video where appropriate, and add a sponsor listing with a link on elionmusic.com if we agree on the relationship. I will not imply an endorsement before anything is approved.

My background includes the 2016 Family Feud grand-prize win with my family, 1,000+ live performances, 10M+ YouTube views, and a faith-rooted music and publishing platform from Hawaii. I am building a recognizable lion-centered visual identity through music, P48X, Prayer Authority, and community appearances.

Would you point me to the right collaboration, creator, wholesale, or sponsorship contact? I can send a concise media kit and a specific concept once I know what kinds of partnerships you consider.${LINKS_TEXT}${FOOTER_TEXT}`;
  return {
    subject: "E Lion Music x {{Name of Organization}} - clothing and stagewear partnership",
    text,
    html: shell(
      "E Lion Music · Clothing partnership",
      "Build a recognizable stage look",
      "Distinctive apparel for music, live appearances, books, and community work.",
      `<p>Hi {{Name}},</p><p>I'm <strong>Eric "E Lion" Schaefer</strong>, a Hawaii-based Christian recording artist, author, and live performer. I'm reaching out to ask whether <strong>{{Name of Organization}}</strong> accepts artist, creator, ambassador, or clothing-collaboration inquiries.</p><p>I am looking for distinctive stagewear and everyday apparel: lion-face or animal graphics, bold Christian or Hawaiian designs, premium hoodies, jackets, tees, and statement pieces that fit a music-and-storytelling identity. I am open to artist pricing, product support, a capsule collaboration, or another arrangement you already use.</p><p>In return, I can wear and use the pieces in appropriate music, live, book, and community content, provide honest tagged content or short photos/video where appropriate, and add a sponsor listing with a link on elionmusic.com if we agree on the relationship. I will not imply an endorsement before anything is approved.</p><p>My background includes the <strong>2016 Family Feud grand-prize win</strong> with my family, <strong>1,000+ live performances</strong>, <strong>10M+ YouTube views</strong>, and a faith-rooted music and publishing platform from Hawaii. I am building a recognizable lion-centered visual identity through music, P48X, Prayer Authority, and community appearances.</p><p>Would you point me to the right collaboration, creator, wholesale, or sponsorship contact? I can send a concise media kit and a specific concept once I know what kinds of partnerships you consider.</p>`
    ),
  };
}
