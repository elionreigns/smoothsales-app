/**
 * Credibility proof blocks + clear asks for Head Hunting emails.
 */

export type ProofFocus = "music" | "faith" | "tech" | "business" | "community" | "creative";

const FAMILY_FEUD_IMG =
  "https://smoothsales-app.vercel.app/assets/team/eric-ashley-family-feud-2016.png";

const LINK = (href: string, label: string, color = "#0ea5e9") =>
  `<a href="${href}" style="color:${color};font-weight:600;text-decoration:underline;">${label}</a>`;

export const PROOF_FOCUS_BY_SLUG: Record<string, ProofFocus> = {
  "music-promo": "music",
  "music-video": "creative",
  "pastor-theology": "faith",
  "prayer-healing": "faith",
  "ai-automation": "tech",
  "social-growth": "creative",
  "house-cleaning-build": "business",
  "house-cleaning-crew": "business",
  "auto-hhr": "community",
  "corgi-community": "community",
  "publish-books": "faith",
  "print-merch": "creative",
  "web-seo-music": "music",
  "web-seo-tourism": "tech",
  "capital-partner": "business",
  "coral-partner": "tech",
};

export const ASK_BY_SLUG: Record<string, string> = {
  "music-promo":
    "Would you take 20 minutes to hear 2–3 tracks and tell me honestly if anything fits your playlist or radio lane?",
  "music-video":
    "Can we schedule a short call so I can send tracks + mood boards and hear if you would collaborate on one video?",
  "pastor-theology":
    "Would you be open to coffee on Oahu (or a Zoom) to talk prayer, theology, and calling — no platform pitch?",
  "prayer-healing":
    "Could we set a brief call so I can learn from you on healing prayer and intercession — I will come prepared?",
  "ai-automation":
    "If you have shipped an agent or bot that earned dollar one, would you compare notes on a 30-minute builder call?",
  "social-growth":
    "Would you review my brands for 20 minutes and tell me the first campaign you would test?",
  "house-cleaning-build":
    "Would you share how you would launch weekly recurring clients on Oahu — coffee or phone, 30 minutes?",
  "house-cleaning-crew":
    "Can you walk me through how you hire and vet cleaners on-island — or point me to someone who does?",
  "auto-hhr":
    "Would you look at my 2009 HHR and tell me if you can help — or invite me to an HHR meet if you run one?",
  "corgi-community":
    "Would you meet Stella (13yo Pembroke) and tell me if you would help with a corgi calendar or local club?",
  "publish-books":
    "Would you review P48X and tell me what it would take to get copies on your shelves or events calendar?",
  "print-merch":
    "Can I send calendar/merch specs for a quote — or meet briefly to see samples of your print quality?",
  "web-seo-music":
    "Would you audit elionmusic.com for 20 minutes and tell me what you would fix first for discovery?",
  "web-seo-tourism":
    "Would you review one Hawaii tourism site I manage and tell me your top 3 SEO wins?",
  "capital-partner":
    "Would you meet for 30 minutes to discuss capital, LOC, or angel structure for Oahu-based ventures?",
  "coral-partner":
    "Would you explore a referral or white-label partnership on one small Hawaii client as a trial?",
};

type ProofLink = { href: string; label: string };

const PROOF_LINKS: Record<ProofFocus, ProofLink[]> = {
  music: [
    { href: "https://www.elionmusic.com", label: "elionmusic.com — catalog & bio" },
    { href: "https://www.youtube.com/watch?v=2ZqlEh2ye4g", label: "World Tour video (YouTube)" },
    { href: "https://www.prayerauthority.com", label: "Prayer Authority (faith tools)" },
    { href: "https://www.coralcrownsolutions.com", label: "Coral Crown Solutions" },
  ],
  faith: [
    { href: "https://www.prayerauthority.com", label: "Prayer Authority" },
    { href: "https://www.prayerauthority.com/prayers/p48x.php", label: "P48X Reflections app" },
    { href: "https://www.prayerauthority.com/prayers/urim2.php", label: "Urim & Thummim" },
    { href: "https://www.barnesandnoble.com/w/p48x-eric-schaefer/1147510577", label: "P48X on Barnes & Noble" },
  ],
  tech: [
    { href: "https://www.coralcrownsolutions.com", label: "Coral Crown Solutions (since 2008)" },
    { href: "https://smoothsales-app.vercel.app/newsletter/tech?access=CROWN", label: "SmoothSales demo pitch" },
    { href: "https://www.prayerauthority.com", label: "Prayer Authority (built in-house)" },
    { href: "https://coralcrownsolutions.com/pokescan/", label: "PokeScan live product" },
  ],
  business: [
    { href: "https://www.coralcrownsolutions.com", label: "Coral Crown Solutions" },
    { href: "https://www.hisbdc.org", label: "Hawaii SBDC (advising)" },
    { href: "https://smoothsales-app.vercel.app/newsletter/tech?access=CROWN", label: "Web + booking work samples" },
    { href: "https://www.elionmusic.com", label: "E Lion — public artist brand" },
  ],
  community: [
    { href: "https://www.elionmusic.com", label: "E Lion / Eric Schaefer" },
    { href: "https://www.coralcrownsolutions.com", label: "Coral Crown — Oahu based" },
    { href: "https://www.prayerauthority.com", label: "Prayer Authority" },
    { href: "https://smoothsales-app.vercel.app/assets/team/eric-ashley-family-feud-2016.png", label: "Family Feud 2016 photo" },
  ],
  creative: [
    { href: "https://www.elionmusic.com", label: "E Lion music" },
    { href: "https://www.youtube.com/watch?v=2ZqlEh2ye4g", label: "Performance reel (YouTube)" },
    { href: "https://www.coralcrownsolutions.com", label: "Coral Crown creative work" },
    { href: "https://smoothsales-app.vercel.app/newsletter/elion-fans?access=CROWN", label: "E Lion fan pitch" },
  ],
};

const PROOF_STATS: Record<ProofFocus, string> = {
  music: "1,000+ live performances · 100+ released songs · Family Feud Grand Prize 2016 · Oahu based",
  faith: "Prayer Authority builder · P48X published · daily journaling tools · Oahu based",
  tech: "Coral Crown since 2008 · tourism sites + booking · SmoothSales + agent stacks · Oahu",
  business: "Family Feud Grand Prize 2016 · Coral Crown since 2008 · (808) 393-0153 · East Honolulu",
  community: "Family Feud Grand Prize 2016 · Stella (13yo corgi) · Oahu household · honor our word",
  creative: "E Lion visual + music · Family Feud 2016 · multi-brand Hawaii creator",
};

export function credibilityProofHtml(focus: ProofFocus, accent: string): string {
  const links = PROOF_LINKS[focus];
  const linkList = links
    .map((l) => `<li style="margin:0 0 8px;">${LINK(l.href, l.label, accent)}</li>`)
    .join("");
  return `<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:18px 20px;margin:22px 0;">
<p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;">Proof you can verify</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:14px;">
<tr>
<td style="vertical-align:top;width:96px;padding-right:12px;">
<img src="${FAMILY_FEUD_IMG}" alt="Schaefer family — Family Feud 2016 grand prize" width="96" style="display:block;border-radius:10px;border:1px solid #e2e8f0;max-width:96px;height:auto;" />
</td>
<td style="vertical-align:top;font-size:13px;line-height:1.55;color:#334155;">
<p style="margin:0 0 6px;"><strong>Eric Hans Schaefer</strong> (E Lion) · Oahu</p>
<p style="margin:0;">Family Feud <strong>Grand Prize 2016</strong> — five shows, $67k+ and a new car (Oct 27–Nov 3, 2016). Public, easy to look up.</p>
</td>
</tr>
</table>
<p style="margin:0 0 10px;font-size:12px;line-height:1.55;color:#475569;">${PROOF_STATS[focus]}</p>
<ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.6;color:#1e293b;">${linkList}</ul>
</div>`;
}

export function credibilityProofText(focus: ProofFocus): string {
  const links = PROOF_LINKS[focus].map((l) => `• ${l.label}: ${l.href}`).join("\n");
  return `\n\nPROOF YOU CAN VERIFY:\nFamily Feud Grand Prize 2016 (five shows, Oct 27–Nov 3, 2016) — public record.\n${PROOF_STATS[focus]}\n${links}`;
}

export function clearAskHtml(ask: string, accent: string): string {
  return `<div style="background:linear-gradient(145deg,${accent}14 0%,${accent}08 100%);border:2px solid ${accent};border-radius:16px;padding:20px 22px;margin:8px 0 4px;text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:${accent};">The ask</p>
<p style="margin:0;font-size:16px;font-weight:700;line-height:1.5;color:#0f172a;">${ask}</p>
<p style="margin:12px 0 0;font-size:13px;line-height:1.55;color:#475569;">Tap <strong>Text</strong> or <strong>Email</strong> below — or reply with a time that works.</p>
</div>`;
}

export function clearAskText(ask: string): string {
  return `\n\nTHE ASK:\n${ask}\n(Text or email me below.)`;
}
