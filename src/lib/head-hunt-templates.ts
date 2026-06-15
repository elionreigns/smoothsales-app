/**
 * Head Hunting as a Service — recruit passionate allies for Eric's One Page Miracle roster.
 * Wired to Task Exterminator OPM + SmoothSales / Resend + Clawd torpedo strikes.
 */
import { card, fbox } from "./head-hunt-ui";

const FOOTER_TEXT = `\n\nEric Hans Schaefer (E Lion) · elionreigns@gmail.com · (808) 393-0153\n2016 Family Feud Grand Prize · coralcrownsolutions.com · elionmusic.com\nReply if this resonates — I save the deep talks for people who get it.`;
const FOOTER_HTML = `<p style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(0,0,0,0.08);color:#64748b;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;">One Page Miracle · Head hunt</p><p style="margin:6px 0 0;font-size:14px;color:#334155;"><strong>Eric Hans Schaefer</strong> (E Lion) · <a href="mailto:elionreigns@gmail.com" style="color:#7c3aed;font-weight:600;">elionreigns@gmail.com</a> · (808) 393-0153</p><p style="margin:8px 0 0;font-size:12px;color:#64748b;">Family Feud Grand Prize 2016 · <a href="https://coralcrownsolutions.com" style="color:#0ea5e9;">coralcrownsolutions.com</a> · <a href="https://elionmusic.com" style="color:#0ea5e9;">elionmusic.com</a></p>`;

type Audience = {
  slug: string;
  label: string;
  accent: string;
  kicker: string;
  headline: string;
  sub: string;
  subject: string;
  textBody: string;
  htmlBody: string;
};

const AUDIENCES: Audience[] = [
  {
    slug: "music-promo",
    label: "Music promo · radio, playlists & streams",
    accent: "#a855f7",
    kicker: "E Lion · Holy Hip-Hop",
    headline: "Would you champion music that actually moves people?",
    sub: "Radio, playlist curators, sync scouts — I want partners who care about the art, not just metrics.",
    subject: "E Lion — partner who gets the music (not just the algorithm)",
    textBody: `I am Eric Schaefer — E Lion — Family Feud Grand Prize 2016, Holy Hip-Hop artist, and someone who has poured years into music my parents call "too many words" while the industry keeps asking for more authenticity.

I am not looking for a casual favor. I am looking for a promoter, radio ally, or playlist curator who gets that conviction + craft can coexist. I have catalog, live show history, and a real story — I need someone passionate about helping great music find ears that will feel it.

If you have ever wished more stations and playlists made room for artists with something to say, I would love 20 minutes with you. No pressure — just a human conversation about whether my sound fits your lane.`,
    htmlBody: `<p style="margin:0 0 14px;font-size:15px;line-height:1.75;">I am <strong>Eric Schaefer — E Lion</strong> — Family Feud Grand Prize 2016, Holy Hip-Hop artist, and someone who has poured years into music my parents call "too many words" while the industry keeps asking for <em>more</em> authenticity.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.75;">I am not looking for a casual favor. I am looking for a <strong>promoter, radio ally, or playlist curator</strong> who gets that conviction + craft can coexist. I have catalog, live show history, and a real story — I need someone passionate about helping great music find ears that will <em>feel</em> it.</p>
<p style="margin:0;font-size:15px;line-height:1.75;">If you have ever wished more stations and playlists made room for artists with something to say — could we talk for 20 minutes?</p>`,
  },
  {
    slug: "music-video",
    label: "Music video · editors & AI visual directors",
    accent: "#ec4899",
    kicker: "Visual storytelling",
    headline: "Build cinematic music videos — classic edit or AI-native?",
    sub: "Editors, motion designers, and AI video builders who love faith-forward and festival-ready visuals.",
    subject: "Music video collaborator — E Lion (AI + traditional welcome)",
    textBody: `I am building a visual lane for E Lion that matches the depth of the music — not stock montages. I need an editor or AI-native director who is excited about lyric-driven storytelling, performance footage, and experimental AI sequences that still feel human.

You might be traditional Premiere/DaVinci, or you might live in Runway/Pika/Kling workflows — either way I want someone who cares about rhythm, color, and meaning.

If music videos are your obsession, not your side gig, reply and I will send current tracks + mood boards.`,
    htmlBody: `<p style="margin:0 0 14px;font-size:15px;line-height:1.75;">I am building a visual lane for <strong>E Lion</strong> that matches the depth of the music — not stock montages. I need an <strong>editor or AI-native director</strong> excited about lyric-driven storytelling and experimental sequences that still feel human.</p>
<p style="margin:0;font-size:15px;line-height:1.75;">Premiere, DaVinci, Runway, Pika — if music videos are your obsession, reply and I will send tracks + mood boards.</p>`,
  },
  {
    slug: "pastor-theology",
    label: "Pastors · theology & prayer depth",
    accent: "#1d4ed8",
    kicker: "Spiritual conversation",
    headline: "Can we go deep on prayer, theology, and calling?",
    sub: "For pastors and teachers who love wrestling with Scripture — not surface small talk.",
    subject: "Pastor-to-artist — theology conversation (not a donation pitch)",
    textBody: `I am a worship-minded artist and builder (Prayer Authority, Urim tools, daily journaling) who needs spiritual peers — not just audience members. My family is kind but not always hungry for the depth I carry; I am looking for pastors or theologians who light up talking about prayer, calling, family, and how art serves the Kingdom.

I am not asking for a platform slot first. I am asking for a thinking partner — someone who can challenge and uplift without shutting me down when I process out loud.

If that is you, I would be honored to buy you coffee (or Zoom) and talk shop.`,
    htmlBody: `<p style="margin:0 0 14px;font-size:15px;line-height:1.75;">I am a worship-minded artist and builder (<strong>Prayer Authority</strong>, Urim tools, daily journaling) who needs <strong>spiritual peers</strong> — not just audience members.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.75;">I am looking for pastors or theologians who light up talking about <strong>prayer, calling, family, and how art serves the Kingdom</strong> — challenge and uplift without shutting down passionate processing.</p>
<p style="margin:0;font-size:15px;line-height:1.75;">Coffee or Zoom — no donation pitch, just depth.</p>`,
  },
  {
    slug: "prayer-healing",
    label: "Prayer & divine healing mentors",
    accent: "#059669",
    kicker: "Healing & intercession",
    headline: "Mentors in prayer, healing, and spiritual authority?",
    sub: "Gurus and practitioners who take divine healing and intercession seriously.",
    subject: "Seeking a prayer/healing mentor — serious student",
    textBody: `I build prayer technology by day and carry a burning hunger to understand healing prayer, spiritual authority, and how God moves through intercession in real life — not theory only.

I am looking for a mentor (pastor, healing minister, or seasoned intercessor) who will talk openly, correct me with love, and point me to Scripture and practice. I will show up prepared and respectful of your time.

If mentoring passionate learners is part of your calling, I would love to connect.`,
    htmlBody: `<p style="margin:0 0 14px;font-size:15px;line-height:1.75;">I build prayer technology and carry a hunger to understand <strong>healing prayer, spiritual authority, and intercession</strong> in real life — not theory only.</p>
<p style="margin:0;font-size:15px;line-height:1.75;">If mentoring passionate learners is part of your calling, I would love to connect.</p>`,
  },
  {
    slug: "ai-automation",
    label: "AI builders · Clawd, agents & revenue bots",
    accent: "#0ea5e9",
    kicker: "Builders with tokens & chops",
    headline: "AI builders who ship money-making automations?",
    sub: "Polymarket guessers, Clawd agents, SmoothSales pipelines — let's compare notes.",
    subject: "AI builder peer — agents, markets, first-dollar automations",
    textBody: `I run Coral Crown Solutions (tourism tech since 2008) and am pushing agent stacks: Clawd/Playwright, SmoothSales email, prediction-market experiments, and Task Exterminator focus systems. I need peers with heavy API access and taste — people who have shipped automations that actually earn dollar one.

I am not looking for hype. I am looking for builders who will whiteboard architecture, share what failed, and optionally collaborate on revenue-positive micro-products.

If you live in agents + markets + pragmatic shipping, reply with one thing you built that made money.`,
    htmlBody: `<p style="margin:0 0 14px;font-size:15px;line-height:1.75;">I run <strong>Coral Crown Solutions</strong> and agent stacks: Clawd/Playwright, SmoothSales, prediction-market experiments, Task Exterminator. I need peers with <strong>heavy API access</strong> who shipped automations that earned <strong>dollar one</strong>.</p>
<p style="margin:0;font-size:15px;line-height:1.75;">Reply with one thing you built that made money — no hype decks.</p>`,
  },
  {
    slug: "social-growth",
    label: "Social growth · marketers & network builders",
    accent: "#f59e0b",
    kicker: "Audience & distribution",
    headline: "Social strategists who love artist-led brands?",
    sub: "Marketers and platform builders who understand music + tourism + faith niches.",
    subject: "Social growth partner for E Lion + Coral Crown brands",
    textBody: `I need a social strategist who gets multi-brand storytelling: E Lion (music), Coral Crown (tourism/tech), Prayer Authority (faith tools), and Hawaii lifestyle content. Algorithm chops matter — but so does soul. I want someone who can grow reach without sanding off what makes the work distinctive.

If you love building communities around artists and builders (not just dropshipping brands), let's talk campaigns, content pillars, and what you would test first.`,
    htmlBody: `<p style="margin:0 0 14px;font-size:15px;line-height:1.75;">Multi-brand storytelling: <strong>E Lion</strong>, <strong>Coral Crown</strong>, <strong>Prayer Authority</strong>, Hawaii lifestyle. I need a strategist who grows reach <em>without</em> sanding off the soul.</p>
<p style="margin:0;font-size:15px;line-height:1.75;">Let's talk campaigns and what you would test first.</p>`,
  },
  {
    slug: "house-cleaning-build",
    label: "House cleaning · launch & scale Oahu",
    accent: "#14b8a6",
    kicker: "Weekly recurring revenue",
    headline: "Help me launch a premium Oahu cleaning company?",
    sub: "Operators, Craigslist playbooks, hiring systems — weekly clients → team → upsell web/tech.",
    subject: "House cleaning business partner — Oahu weekly clients",
    textBody: `I want to launch a house cleaning business on Oahu: weekly recurring clients, Craigslist/Facebook lead flow, vetted cleaners, a professional website, and a friendly "face of the company" manager so I can focus on systems and upselling web/tech to those same households.

Looking for an operator, franchise-minded coach, or marketing partner who has done residential cleaning at scale — or wants to build it with me from zero.

If recurring home services excite you, let's map week-one actions.`,
    htmlBody: `<p style="margin:0 0 14px;font-size:15px;line-height:1.75;">Launching <strong>premium Oahu house cleaning</strong>: weekly clients, Craigslist/FB leads, vetted crew, pro website, manager as the friendly face — upsell Coral Crown web/tech to those same homes.</p>
<p style="margin:0;font-size:15px;line-height:1.75;">Operators & coaches welcome — let's map week one.</p>`,
  },
  {
    slug: "house-cleaning-crew",
    label: "Cleaning crew · hire & vet cleaners",
    accent: "#0d9488",
    kicker: "Talent pipeline",
    headline: "Recruiting reliable cleaners & field managers?",
    sub: "HR-minded partners for hiring, background checks, and Craigslist ad copy.",
    subject: "Recruiting cleaning crew — Oahu (paid weekly routes)",
    textBody: `As I stand up a cleaning company I need help recruiting and vetting cleaners and a field manager who can be the warm face clients meet at the door. Experience with Craigslist hiring, reference checks, and team culture on a small island is a plus.

If you have placed home-service teams before — or want to own recruiting as a role — reply with your approach.`,
    htmlBody: `<p style="margin:0 0 14px;font-size:15px;line-height:1.75;">Standing up a cleaning company — need help <strong>recruiting, vetting cleaners</strong>, and a <strong>field manager</strong> clients trust at the door.</p>
<p style="margin:0;font-size:15px;line-height:1.75;">Craigslist/FB hiring experience on Oahu? Reply with your approach.</p>`,
  },
  {
    slug: "auto-hhr",
    label: "Chevy HHR club · mechanics & restorers",
    accent: "#64748b",
    kicker: "2009 HHR restoration",
    headline: "Chevy HHR people — club, mechanics, restorers?",
    sub: "Building community around the HHR + fixing mine right.",
    subject: "Chevy HHR club / mechanic — Oahu restoration project",
    textBody: `I drive a 2009 Chevy HHR and want two things: a real mechanic relationship for cosmetic + mechanical work, and a small community of HHR lovers (club vibe, meets, parts swaps). If you wrench on HHRs, run a body shop that gets quirky GM wagons, or just love the platform — let's connect.

Restoration budget is real; passion for the car matters more than corporate polish.`,
    htmlBody: `<p style="margin:0 0 14px;font-size:15px;line-height:1.75;"><strong>2009 Chevy HHR</strong> — seeking mechanic partners + a <strong>HHR lover community</strong> (meets, parts, resto advice).</p>
<p style="margin:0;font-size:15px;line-height:1.75;">Real budget, real passion for the platform.</p>`,
  },
  {
    slug: "corgi-community",
    label: "Corgi club · Stella & corgi lovers",
    accent: "#f97316",
    kicker: "Stella · 13yo Pembroke",
    headline: "Corgi people — club, calendar, community?",
    sub: "Pembroke lovers, groomers, photographers — Stella is the mascot.",
    subject: "Corgi community — Stella (13) & calendar project",
    textBody: `My 13-year-old Pembroke corgi Stella is family — and the face of a corgi calendar / community idea. I am looking for corgi club organizers, photographers, groomers who understand double coats, and retailers who would carry a local calendar or merch.

If corgis are your people (not just your job), I would love to compare notes and build something joyful together.`,
    htmlBody: `<p style="margin:0 0 14px;font-size:15px;line-height:1.75;"><strong>Stella</strong> — 13yo Pembroke — mascot for a <strong>corgi calendar & community</strong>. Seeking club organizers, photographers, groomers (no shave!), retailers.</p>
<p style="margin:0;font-size:15px;line-height:1.75;">If corgis are your people, let's build something joyful.</p>`,
  },
  {
    slug: "publish-books",
    label: "Publishing · books into stores",
    accent: "#92400e",
    kicker: "P48X & catalog",
    headline: "Help published books land in physical stores?",
    sub: "Distributors, bookstore buyers, print-on-demand experts — P48X is live.",
    subject: "Published author seeking retail / bookstore partners",
    textBody: `I have published works (including P48X) across Apple Books, B&N, Kobo, and more — and I want help getting physical placement, local bookstore relationships, and print runs that make sense. Looking for publishing partners, distributors, or bookstore champions who take indie authors seriously.

If you have placed faith-forward or personal-development titles in stores, I would value your counsel.`,
    htmlBody: `<p style="margin:0 0 14px;font-size:15px;line-height:1.75;">Published catalog including <strong>P48X</strong> — need help with <strong>physical placement</strong>, bookstore relationships, and smart print runs.</p>
<p style="margin:0;font-size:15px;line-height:1.75;">Indie-friendly distributors & buyers — let's talk.</p>`,
  },
  {
    slug: "print-merch",
    label: "Print & merch · calendars & apparel",
    accent: "#be185d",
    kicker: "Corgi calendar · apparel",
    headline: "Print partners for calendars, shirts & merch?",
    sub: "Local print shops and merch producers — quality matters.",
    subject: "Print partner — corgi calendar + artist merch runs",
    textBody: `I need print partners for a corgi calendar, artist merch, and small-batch apparel — quality color, reliable turnaround, and someone who gets limited runs for community products. Oahu/local preferred; mainland fulfillment OK if pricing works.

If you love working with creators on tactile products, send samples or capabilities.`,
    htmlBody: `<p style="margin:0 0 14px;font-size:15px;line-height:1.75;">Seeking print partners for <strong>corgi calendar</strong>, artist merch, small-batch apparel — quality color, reliable turnaround.</p>
<p style="margin:0;font-size:15px;line-height:1.75;">Oahu/local preferred. Send capabilities or samples.</p>`,
  },
  {
    slug: "web-seo-music",
    label: "Musician websites & SEO",
    accent: "#6366f1",
    kicker: "Artist web presence",
    headline: "Expert in musician websites that convert?",
    sub: "Design + SEO for artists — streaming, email capture, press kits.",
    subject: "Musician website + SEO — E Lion project",
    textBody: `I need a web/SEO specialist who lives in the music vertical — artist sites that load fast, rank, capture emails, and showcase streaming + video without looking like a template from 2014. Coral Crown builds tourism sites; E Lion needs a flagship music property tuned for discovery.

If musician SEO is your niche, show me two sites you are proud of.`,
    htmlBody: `<p style="margin:0 0 14px;font-size:15px;line-height:1.75;">Need a <strong>musician web + SEO specialist</strong> — fast, ranks, captures emails, showcases streaming/video with soul.</p>
<p style="margin:0;font-size:15px;line-height:1.75;">Show me two artist sites you are proud of.</p>`,
  },
  {
    slug: "web-seo-tourism",
    label: "Tourism SEO & Hawaii web",
    accent: "#0284c7",
    kicker: "Coral Crown · Hawaii",
    headline: "Tourism SEO for Hawaii operators?",
    sub: "Partners who understand FareHarbor, activities, and local search.",
    subject: "Tourism SEO partner — Hawaii operators",
    textBody: `Coral Crown has built tourism technology since 2008. I am looking for SEO/partnership specialists who understand Hawaii activities, FareHarbor ecosystems, and how to drive qualified bookings — not junk traffic.

If Hawaii tourism search is your lane, let's audit one property together as a starting conversation.`,
    htmlBody: `<p style="margin:0 0 14px;font-size:15px;line-height:1.75;"><strong>Coral Crown</strong> — tourism tech since 2008. Seeking SEO partners for <strong>Hawaii activities</strong>, FareHarbor ecosystems, qualified bookings.</p>
<p style="margin:0;font-size:15px;line-height:1.75;">Happy to audit one property together to start.</p>`,
  },
  {
    slug: "capital-partner",
    label: "Capital · LOC & mission sponsors",
    accent: "#ca8a04",
    kicker: "Runway with alignment",
    headline: "Capital partner for mission-aligned experiments?",
    sub: "Line of credit, angel, or sponsor who wants ROI + meaning.",
    subject: "Mission-aligned capital — music, tech, family goals",
    textBody: `I am assembling a portfolio of ventures (music, tourism tech, prayer tools, cleaning co, prediction-market experiments) and need a capital partner comfortable with a line of credit or structured angel support — someone who wants financial upside but also understands faith, family, and art are not separate from the spreadsheet.

If you fund builders with skin in the game and clear reporting, I would welcome a confidential overview.`,
    htmlBody: `<p style="margin:0 0 14px;font-size:15px;line-height:1.75;">Portfolio: music, tourism tech, prayer tools, cleaning co, market experiments. Seeking <strong>LOC / angel</strong> partner who wants ROI <em>and</em> understands mission.</p>
<p style="margin:0;font-size:15px;line-height:1.75;">Confidential overview available on request.</p>`,
  },
  {
    slug: "coral-partner",
    label: "Coral Crown · SmoothSales service partners",
    accent: "#1a3a5c",
    kicker: "B2B referrals",
    headline: "Promote Coral Crown web, booking & email services?",
    sub: "Agencies and freelancers who want white-label or referral fees.",
    subject: "Coral Crown partner — web, booking, SmoothSales templates",
    textBody: `Coral Crown Solutions ships websites, online booking, SEO, and SmoothSales email campaigns for Hawaii and mainland businesses. I am recruiting agency partners, freelancers, and referrers who want beautiful templates, reliable delivery, and a revenue share when they bring clients.

If you sell digital services but need a fulfillment bench, let's open the partner kit.`,
    htmlBody: `<p style="margin:0 0 14px;font-size:15px;line-height:1.75;"><strong>Coral Crown</strong> — websites, booking, SEO, SmoothSales email. Seeking <strong>agency partners & referrers</strong> with revenue share.</p>
<p style="margin:0;font-size:15px;line-height:1.75;">Partner kit ready — reply if you sell digital services.</p>`,
  },
];

function buildInitial(a: Audience) {
  const text = `Hi {{Name}},\n\n${a.textBody}${FOOTER_TEXT}`;
  const html = card(
    a.accent,
    a.accent + "33",
    a.kicker,
    a.headline,
    a.sub,
    a.htmlBody,
    FOOTER_HTML,
  );
  return { subject: a.subject, text, html };
}

function buildFollowUp1(a: Audience) {
  const subject = `Re: ${a.subject}`;
  const text = `Hi {{Name}},\n\nQuick bump — my note may have landed on a busy day. I am still looking for someone passionate about this lane (${a.label}). If it is not you, a one-line point-in-the-right-direction would mean a lot.\n\nEric${FOOTER_TEXT}`;
  const html = fbox(
    a.accent,
    `<p style="margin:0 0 12px;font-size:15px;line-height:1.7;">Quick bump — still looking for the right person for <strong>${a.label}</strong>.</p>
<p style="margin:0;font-size:14px;line-height:1.7;">If it is not you, a one-line referral helps tremendously.</p>`,
    FOOTER_HTML,
  );
  return { subject, text, html };
}

export type HeadHuntSub = (typeof AUDIENCES)[number]["slug"] | "";

export type HeadHuntTemplateId = `headhunt-${string}` | `headhunt-${string}-followup-1`;

const TEMPLATES: Record<string, { subject: string; html: string; text: string }> = {};

for (const a of AUDIENCES) {
  const base = `headhunt-${a.slug}`;
  TEMPLATES[base] = buildInitial(a);
  TEMPLATES[`${base}-followup-1`] = buildFollowUp1(a);
}

export const HEAD_HUNT_AUDIENCE_OPTIONS: { value: Exclude<HeadHuntSub, "">; label: string }[] = AUDIENCES.map(
  (a) => ({ value: a.slug as Exclude<HeadHuntSub, "">, label: a.label }),
);

export const HEAD_HUNT_TEMPLATE_OPTIONS: { value: HeadHuntTemplateId; label: string }[] = AUDIENCES.flatMap(
  (a) => [
    { value: `headhunt-${a.slug}` as HeadHuntTemplateId, label: `Head hunt · ${a.label}` },
    {
      value: `headhunt-${a.slug}-followup-1` as HeadHuntTemplateId,
      label: `Head hunt · ${a.label} — Follow up 1`,
    },
  ],
);

export function getAllHeadHuntTemplateIds(): string[] {
  return Object.keys(TEMPLATES);
}

export function isHeadHuntTemplateId(id: string): id is HeadHuntTemplateId {
  return id in TEMPLATES;
}

export function getHeadHuntTemplate(id: HeadHuntTemplateId): { subject: string; html: string; text: string } {
  return TEMPLATES[id];
}

export function headHuntTemplateOptions(sub: Exclude<HeadHuntSub, "">): { value: HeadHuntTemplateId; label: string }[] {
  return [
    { value: `headhunt-${sub}`, label: "Initial outreach" },
    { value: `headhunt-${sub}-followup-1`, label: "Follow up 1" },
  ];
}

export const HEAD_HUNT_OPM_MAP: Record<string, Exclude<HeadHuntSub, "">> = {
  "music-promo": "music-promo",
  "talent-manager": "music-promo",
  "collab-scout": "music-promo",
  "social-media-manager": "social-growth",
  "web-tech": "coral-partner",
  "worship-band": "pastor-theology",
  "female-investor": "capital-partner",
  "surrogate-investor": "capital-partner",
  "pardon-liaison": "pastor-theology",
  "mentor": "pastor-theology",
};
