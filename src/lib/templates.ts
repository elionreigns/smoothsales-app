/**
 * Pre-made email templates for SmoothSales campaigns.
 * E Lion follow-ups: elion-follow-up-templates.ts. All other follow-ups: all-follow-up-templates.ts.
 */
import {
  isElionFollowUpTemplateId,
  getElionFollowUpTemplate,
  type ElionFollowUpTemplateId,
} from "./elion-follow-up-templates";
import {
  isOtherFollowUpTemplateId,
  getOtherFollowUpTemplate,
  type OtherFollowUpTemplateId,
} from "./all-follow-up-templates";

export type TemplateId =
  | "botox"
  | "botox-followup-1"
  | "botox-followup-2"
  | "botox-followup-3"
  | "tech"
  | "tech-followup-1"
  | "tech-followup-2"
  | "tech-followup-3"
  | "prayer-individual"
  | "prayer-individual-followup-1"
  | "prayer-individual-followup-2"
  | "prayer-individual-followup-3"
  | "prayer-church"
  | "prayer-church-followup-1"
  | "prayer-church-followup-2"
  | "prayer-church-followup-3"
  | "tourism-hawaii"
  | "tourism-hawaii-followup-1"
  | "tourism-hawaii-followup-2"
  | "tourism-hawaii-followup-3"
  | "tourism-usa"
  | "tourism-usa-followup-1"
  | "tourism-usa-followup-2"
  | "tourism-usa-followup-3"
  | "elion-fans"
  | "elion-artists"
  | "elion-brands"
  | "elion-fans-followup-1"
  | "elion-fans-followup-2"
  | "elion-fans-followup-3"
  | "elion-artists-followup-1"
  | "elion-artists-followup-2"
  | "elion-artists-followup-3"
  | "elion-brands-followup-1"
  | "elion-brands-followup-2"
  | "elion-brands-followup-3"
  | "elion-producers"
  | "elion-producers-followup-1"
  | "elion-producers-followup-2"
  | "elion-producers-followup-3"
  | "elion-venue-church"
  | "elion-venue-church-followup-1"
  | "elion-venue-church-followup-2"
  | "elion-venue-church-followup-3"
  | "elion-venue-show"
  | "elion-venue-show-followup-1"
  | "elion-venue-show-followup-2"
  | "elion-venue-show-followup-3"
  | "elion-venue-dj"
  | "elion-venue-dj-followup-1"
  | "elion-venue-dj-followup-2"
  | "elion-venue-dj-followup-3"
  | "elion-venue-major"
  | "elion-venue-major-followup-1"
  | "elion-venue-major-followup-2"
  | "elion-venue-major-followup-3"
  | "wedding-couples"
  | "wedding-couples-followup-1"
  | "wedding-couples-followup-2"
  | "wedding-couples-followup-3"
  | "wedding-contractors"
  | "wedding-contractors-followup-1"
  | "wedding-contractors-followup-2"
  | "wedding-contractors-followup-3"
  | "p48x-personal"
  | "p48x-personal-followup-1"
  | "p48x-personal-followup-2"
  | "p48x-personal-followup-3"
  | "p48x-physical-distributors"
  | "p48x-physical-distributors-followup-1"
  | "p48x-physical-distributors-followup-2"
  | "p48x-physical-distributors-followup-3"
  | "p48x-affiliate-sellers"
  | "p48x-affiliate-sellers-followup-1"
  | "p48x-affiliate-sellers-followup-2"
  | "p48x-affiliate-sellers-followup-3"
  | "healing-herbals-smoke-shop"
  | "healing-herbals-smoke-shop-followup-1"
  | "healing-herbals-smoke-shop-followup-2"
  | "healing-herbals-smoke-shop-followup-3"
  | "healing-herbals-individual"
  | "healing-herbals-individual-followup-1"
  | "healing-herbals-individual-followup-2"
  | "healing-herbals-individual-followup-3"
  | "botox-v2"
  | "tech-v2"
  | "prayer-individual-v2"
  | "prayer-church-v2"
  | "tourism-hawaii-v2"
  | "tourism-usa-v2"
  | "elion-fans-v2"
  | "elion-artists-v2"
  | "elion-brands-v2"
  | "elion-producers-v2"
  | "elion-venue-church-v2"
  | "elion-venue-show-v2"
  | "elion-venue-dj-v2"
  | "elion-venue-major-v2"
  | "wedding-couples-v2"
  | "wedding-contractors-v2"
  | "p48x-personal-v2"
  | "p48x-physical-distributors-v2"
  | "p48x-affiliate-sellers-v2"
  | "healing-herbals-smoke-shop-v2"
  | "healing-herbals-individual-v2";

/** Base templates only (no follow-up ids, no v2); follow-ups and v2 are resolved in getTemplate. */
type BaseTemplateId = Exclude<
  Exclude<TemplateId, ElionFollowUpTemplateId | OtherFollowUpTemplateId>,
  `${string}-v2`
>;

export const TEMPLATE_OPTIONS: { value: TemplateId; label: string }[] = [
  { value: "botox", label: "Botox Oahu – Price sheet & specials" },
  { value: "tech", label: "Coral Crown Tech – Websites, chatbots, hosting" },
  { value: "prayer-individual", label: "Prayer Authority – Individual member" },
  { value: "prayer-church", label: "Prayer Authority – Church organization" },
  { value: "tourism-hawaii", label: "Time for Fun Hawaii – Tours & webinar" },
  { value: "tourism-usa", label: "Time for Fun USA – 4 complimentary vacations" },
  { value: "elion-fans", label: "E Lion Music – Fans & listeners" },
  { value: "elion-artists", label: "E Lion Music – Peer artists / collaboration" },
  { value: "elion-brands", label: "E Lion Music – Sponsored brands" },
  { value: "elion-producers", label: "E Lion Music – Producers (beats)" },
  { value: "elion-venue-church", label: "E Lion Music – Venue: Church" },
  { value: "elion-venue-show", label: "E Lion Music – Venue: Show / festival" },
  { value: "elion-venue-dj", label: "E Lion Music – Venue: DJ E Lion" },
  { value: "elion-venue-major", label: "E Lion Music – Venue: Major (opening for headliners)" },
  { value: "wedding-couples", label: "Hawaii Wedding Plans – Couples planning a wedding" },
  { value: "wedding-contractors", label: "Hawaii Wedding Plans – Contractors / vendors (submit to be featured)" },
  { value: "p48x-personal", label: "P48X – Personal (readers & listeners, book + app + audiobook)" },
  { value: "p48x-physical-distributors", label: "P48X – Physical distributors (wholesale, retail stores)" },
  { value: "p48x-affiliate-sellers", label: "P48X – Affiliate sellers (15% on direct sales)" },
  { value: "healing-herbals-smoke-shop", label: "Healing Herbals – Smoke Shop (wholesale + suggested retail)" },
  { value: "healing-herbals-individual", label: "Healing Herbals – Individual (retail only)" },
];

const CONTACT_LINE_HTML = `<p style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(0,0,0,0.08);color:#64748b;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;opacity:0.9;">Reach us: <a href="mailto:coralcrowntechnologies@gmail.com" style="color:#0ea5e9;text-decoration:none;font-weight:600;">Email us</a> or (808) 393-0153 for any of these services.</p>`;
const CONTACT_LINE_TEXT = `\n\nReach us: Email us (coralcrowntechnologies@gmail.com) or (808) 393-0153 for any of these services.`;

/** Optional enhanced (v2) content; only keys that have custom copy. elion-venue-show-v2 = more persuasive show/festival pitch. */
const TEMPLATES_V2: Partial<Record<string, { subject: string; html: string; text: string }>> = {
  "elion-venue-show-v2": {
    subject: "E Lion – Book him for your stage (115M+ Family Feud reach, local draw, door + merch)",
    text: `Hi {{Name}},

You book the stage – we bring the crowd. E Lion has already packed Waikiki Shell, Blaisdell, and HebrewFest, and he wants to perform at your venue next. Here is why venues keep saying yes: he promotes every show to his local fanbase so people show up; he works with you on door tickets and merch (shirts, hats, USBs, CDs) so your night runs smooth; and he delivers a full set list – 1hr+ original Holy Hip-Hop, speaking, and audience interaction – custom to fit your night.

Why book E Lion: An estimated 115–145 million viewers saw his Family Feud grand prize run. 15+ years, 1,000+ performances, 10M+ YouTube views. He has played Waikiki Shell, Blaisdell, Republik-style rooms and venues across the US. You pick the songs; he brings the energy and the crowd. Music on every major platform.

What you get: He will invite his local fanbase and promote the event so people show up. We are happy to discuss tickets at the door and whether he can bring merch. Full set list available – original Holy Hip-Hop, 1hr+ set with speaking and audience interaction. Custom set list to fit your night.

Next step (one reply and we move): Reply with your venue, date(s), and slot – and your policy on door tickets and merch. We will send a set list and get down to rider and rate. Limited opening slots this season – let us know and we will make it happen.

Links: Full catalog https://www.elionmusic.com/rap/ | Family Feud Grand Prize https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize | Family Feud Audition https://www.elionmusic.com/articles/hawaii-kai-family-feud-audition | Family Feud Appearance https://www.elionmusic.com/articles/hawaii-kai-family-feud-appearance | Family Feud Next Round https://www.elionmusic.com/articles/hawaii-family-moves-next-round | Bored City Interview https://www.elionmusic.com/articles/bored-city-interview-e-lion | Spotlight Interview https://www.elionmusic.com/articles/spotlight-interview-e-lion | TBK247 Island Roots https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music | Zoho CRM https://www.elionmusic.com/articles/running-multiple-businesses-crm | Fatal House Fire https://www.elionmusic.com/articles/elion-fatal-house-fire | 93.9 The Beat https://www.elionmusic.com/articles/elion-radio-939 | 102.7 Radio https://www.elionmusic.com/articles/elion-radio-1027 | KHON2 Hurricane Iselle https://www.elionmusic.com/articles/hurricane-iselle-sale-day | PopCandies TV https://www.elionmusic.com/articles/popcandies-hollywood-club | E Lion Wiki https://www.elionmusic.com/wiki/ | Learn More About Lions https://www.elionmusic.com/lions | elionmusic.com https://www.elionmusic.com

Coral Crown Solutions | sales@coralcrowntechnologies@gmail.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fef2f2;border:2px solid #b91c1c;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(185,28,28,0.26),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#b91c1c 0%,#991b1b 50%,#7f1d1d 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #f87171;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">E Lion Music – Venue booking</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">You book the stage. We bring the crowd.</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">115M+ Family Feud reach. Local fanbase promo. Door tickets &amp; merch. One reply and we send the set list and rider.</p>
</div>
<div style="padding:32px 28px;color:#7f1d1d;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#b91c1c;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #fecaca;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">E Lion has already packed <strong>Waikiki Shell, Blaisdell, and HebrewFest</strong> – and he wants to perform at your venue next. Venues keep saying yes because he <strong>promotes every show to his local fanbase</strong> so people show up, works with you on <strong>door tickets and merch</strong> (shirts, hats, USBs, CDs), and delivers a <strong>full set</strong> – 1hr+ original Holy Hip-Hop, speaking, audience interaction – custom to fit your night.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#b91c1c;text-transform:uppercase;">Reach &amp; credentials</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;">An estimated <strong>115–145 million</strong> have seen his Family Feud grand prize run. <strong>15+ years</strong>, <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>. Waikiki Shell, Blaisdell, Republik-style rooms and venues nationwide. You pick the songs; he brings the energy and the crowd.</p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#b91c1c;text-transform:uppercase;">Family Feud articles</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#b91c1c;">Family Feud: Grand Prize</a> · <a href="https://www.elionmusic.com/articles/hawaii-kai-family-feud-audition" style="color:#b91c1c;">Family Feud: Audition</a> · <a href="https://www.elionmusic.com/articles/hawaii-kai-family-feud-appearance" style="color:#b91c1c;">Family Feud: Appearance</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-moves-next-round" style="color:#b91c1c;">Family Feud: Next Round</a></p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#b91c1c;text-transform:uppercase;">Interviews &amp; press</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/bored-city-interview-e-lion" style="color:#b91c1c;">Bored City Interview</a> · <a href="https://www.elionmusic.com/articles/spotlight-interview-e-lion" style="color:#b91c1c;">Spotlight Interview</a> · <a href="https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music" style="color:#b91c1c;">TBK247 Island Roots &amp; Faith</a> · <a href="https://www.elionmusic.com/articles/running-multiple-businesses-crm" style="color:#b91c1c;">Zoho CRM</a> · <a href="https://www.elionmusic.com/articles/elion-fatal-house-fire" style="color:#b91c1c;">Fatal House Fire: A Turning Point</a> · <a href="https://www.elionmusic.com/articles/elion-radio-939" style="color:#b91c1c;">93.9 The Beat Freestyle</a> · <a href="https://www.elionmusic.com/articles/elion-radio-1027" style="color:#b91c1c;">102.7 Radio</a> · <a href="https://www.elionmusic.com/articles/hurricane-iselle-sale-day" style="color:#b91c1c;">KHON2 Hurricane Iselle</a> · <a href="https://www.elionmusic.com/articles/popcandies-hollywood-club" style="color:#b91c1c;">PopCandies TV</a> · <a href="https://www.elionmusic.com/wiki/" style="color:#b91c1c;">E Lion Wiki</a></p>
<div style="background:linear-gradient(145deg,#fee2e2 0%,#fecaca 100%);border:2px solid #b91c1c;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(185,28,28,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#7f1d1d;line-height:1.55;"><strong>Next step (one reply and we move):</strong> Reply with your venue, date(s), and slot – and your policy on door tickets and merch. We will send a set list and get down to rider and rate. Limited opening slots this season – let us know and we will make it happen.</p>
<p style="margin:0 0 12px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#b91c1c 0%,#991b1b 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(185,28,28,0.4);">elionmusic.com</a></p>
<p style="margin:0 0 10px;"><a href="https://www.elionmusic.com/lions" style="display:inline-block;background:rgba(185,28,28,0.15);color:#b91c1c;border:2px solid #b91c1c;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:14px;">Learn More About Lions</a></p>
<p style="margin:0;font-size:13px;color:#b91c1c;font-style:italic;">P.S. Door tickets &amp; merch – just ask. We want your night to run smooth.</p>
</div>
</div>
</div>`,
  },
};

export function getTemplate(id: TemplateId): { subject: string; html: string; text: string } {
  if (isElionFollowUpTemplateId(id as string)) {
    const t = getElionFollowUpTemplate(id as ElionFollowUpTemplateId);
    return {
      subject: t.subject,
      html: t.html + CONTACT_LINE_HTML,
      text: t.text + CONTACT_LINE_TEXT,
    };
  }
  if (isOtherFollowUpTemplateId(id as string)) {
    const t = getOtherFollowUpTemplate(id as OtherFollowUpTemplateId);
    return {
      subject: t.subject,
      html: t.html + CONTACT_LINE_HTML,
      text: t.text + CONTACT_LINE_TEXT,
    };
  }
  // Initial – Enhanced (v2): use TEMPLATES_V2 if defined, else same as base
  if (typeof id === "string" && id.endsWith("-v2")) {
    const v2 = TEMPLATES_V2[id];
    if (v2)
      return {
        subject: v2.subject,
        html: v2.html + CONTACT_LINE_HTML,
        text: v2.text + CONTACT_LINE_TEXT,
      };
    const baseKey = id.slice(0, -3) as BaseTemplateId;
    const t = TEMPLATES[baseKey];
    if (t)
      return {
        subject: t.subject,
        html: t.html + CONTACT_LINE_HTML,
        text: t.text + CONTACT_LINE_TEXT,
      };
  }
  const t = TEMPLATES[id as BaseTemplateId];
  return {
    subject: t.subject,
    html: t.html + CONTACT_LINE_HTML,
    text: t.text + CONTACT_LINE_TEXT,
  };
}

/** Placeholders: {{Name}}, {{Name of Person}}, {{Name of Organization}}. Pass a map of placeholder name -> value. */
export function substitutePlaceholders(
  html: string,
  text: string,
  vars: { Name?: string; "Name of Person"?: string; "Name of Organization"?: string }
): { html: string; text: string } {
  let h = html;
  let t = text;
  const map: Record<string, string> = {
    Name: vars.Name ?? "",
    "Name of Person": vars["Name of Person"] ?? vars.Name ?? "",
    "Name of Organization": vars["Name of Organization"] ?? vars.Name ?? "",
  };
  for (const [key, value] of Object.entries(map)) {
    const re = new RegExp(`\\{\\{\\s*${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\}\\}`, "g");
    h = h.replace(re, value);
    t = t.replace(re, value);
  }
  return { html: h, text: t };
}

/** Service/sub types used by the UI. */
export type ServiceSelection =
  | ""
  | "botox"
  | "tech"
  | "prayer"
  | "tourism"
  | "elion"
  | "wedding"
  | "p48x"
  | "healing-herbals";
export type TourismSub = "" | "hawaii" | "usa";
export type PrayerSub = "" | "individual" | "church";
export type BotoxSub = "" | "individual" | "corporate";
export type TechSub = "" | "individual" | "corporate";
export type ElionSub =
  | ""
  | "fans"
  | "artists"
  | "brands"
  | "producers"
  | "venue-church"
  | "venue-show"
  | "venue-dj"
  | "venue-major";
export type WeddingSub = "" | "couples" | "contractors";
export type P48XSub = "" | "personal" | "physical-distributors" | "affiliate-sellers";
export type HealingHerbalsSub = "" | "smoke-shop" | "individual";

const ELION_TEMPLATE_MAP: Record<Exclude<ElionSub, "">, TemplateId> = {
  fans: "elion-fans",
  artists: "elion-artists",
  brands: "elion-brands",
  producers: "elion-producers",
  "venue-church": "elion-venue-church",
  "venue-show": "elion-venue-show",
  "venue-dj": "elion-venue-dj",
  "venue-major": "elion-venue-major",
};

const WEDDING_TEMPLATE_MAP: Record<Exclude<WeddingSub, "">, TemplateId> = {
  couples: "wedding-couples",
  contractors: "wedding-contractors",
};

const P48X_TEMPLATE_MAP: Record<Exclude<P48XSub, "">, TemplateId> = {
  personal: "p48x-personal",
  "physical-distributors": "p48x-physical-distributors",
  "affiliate-sellers": "p48x-affiliate-sellers",
};

const HEALING_HERBALS_TEMPLATE_MAP: Record<Exclude<HealingHerbalsSub, "">, TemplateId> = {
  "smoke-shop": "healing-herbals-smoke-shop",
  individual: "healing-herbals-individual",
};

/** Build template dropdown: Initial, Initial – Enhanced, Follow Up 1, 2, 3 for a given base template id. */
function templateOptionsWithFollowUps(baseId: TemplateId): { value: TemplateId; label: string }[] {
  const initialLabel = TEMPLATE_OPTIONS.find((o) => o.value === baseId)?.label ?? "Initial";
  const v2Id = (baseId + "-v2") as TemplateId;
  const followUp1 = (baseId + "-followup-1") as TemplateId;
  const followUp2 = (baseId + "-followup-2") as TemplateId;
  const followUp3 = (baseId + "-followup-3") as TemplateId;
  return [
    { value: baseId, label: "Initial: " + initialLabel },
    { value: v2Id, label: "Initial – Enhanced (sales-focused)" },
    { value: followUp1, label: "Follow Up 1" },
    { value: followUp2, label: "Follow Up 2" },
    { value: followUp3, label: "Follow Up 3" },
  ];
}

/**
 * Returns template options for the current service (and sub): Initial + Follow Up 1, 2, 3 so you can view and send any variant.
 */
export function getTemplatesForSelection(
  service: ServiceSelection,
  tourismSub: TourismSub,
  prayerSub: PrayerSub,
  botoxSub: BotoxSub,
  techSub: TechSub,
  elionSub: ElionSub,
  weddingSub: WeddingSub,
  p48xSub: P48XSub,
  healingHerbalsSub: HealingHerbalsSub
): { value: TemplateId; label: string }[] {
  if (service === "botox") {
    if (botoxSub === "individual" || botoxSub === "corporate") return templateOptionsWithFollowUps("botox");
    return [];
  }
  if (service === "tech") {
    if (techSub === "individual" || techSub === "corporate") return templateOptionsWithFollowUps("tech");
    return [];
  }
  if (service === "prayer") {
    if (prayerSub === "individual") return templateOptionsWithFollowUps("prayer-individual");
    if (prayerSub === "church") return templateOptionsWithFollowUps("prayer-church");
    return [];
  }
  if (service === "tourism") {
    if (tourismSub === "hawaii") return templateOptionsWithFollowUps("tourism-hawaii");
    if (tourismSub === "usa") return templateOptionsWithFollowUps("tourism-usa");
    return [];
  }
  if (service === "elion" && elionSub !== "") {
    const id = ELION_TEMPLATE_MAP[elionSub];
    return templateOptionsWithFollowUps(id);
  }
  if (service === "wedding" && weddingSub !== "") {
    const id = WEDDING_TEMPLATE_MAP[weddingSub];
    return templateOptionsWithFollowUps(id);
  }
  if (service === "p48x" && p48xSub !== "") {
    const id = P48X_TEMPLATE_MAP[p48xSub];
    return templateOptionsWithFollowUps(id);
  }
  if (service === "healing-herbals" && healingHerbalsSub !== "") {
    const id = HEALING_HERBALS_TEMPLATE_MAP[healingHerbalsSub];
    return templateOptionsWithFollowUps(id);
  }
  return [];
}

/** True when service + required sub-option are selected so we can show pitch/campaign. */
export function hasRequiredSelection(
  service: ServiceSelection,
  tourismSub: TourismSub,
  prayerSub: PrayerSub,
  botoxSub: BotoxSub,
  techSub: TechSub,
  elionSub: ElionSub,
  weddingSub: WeddingSub,
  p48xSub: P48XSub,
  healingHerbalsSub: HealingHerbalsSub
): boolean {
  if (!service) return false;
  if (service === "prayer") return prayerSub !== "";
  if (service === "tourism") return tourismSub !== "";
  if (service === "botox") return botoxSub !== "";
  if (service === "tech") return techSub !== "";
  if (service === "elion") return elionSub !== "";
  if (service === "wedding") return weddingSub !== "";
  if (service === "p48x") return p48xSub !== "";
  if (service === "healing-herbals") return healingHerbalsSub !== "";
  return false;
}

const TEMPLATES: Record<BaseTemplateId, { subject: string; html: string; text: string }> = {
  botox: {
    subject: "Botox Oahu – Clear pricing, physician-led care & same-day availability",
    text: `Hi {{Name}},

We would love to have you in for a visit at Botox Oahu. You deserve care that feels personal, with transparent pricing and no surprises – so here is the main ask up front: book a consult or treatment with us. Most people need 25–40 units for forehead, frown lines, and crow's feet; at $11.11/unit that is about $278–$444, and we offer a 90-unit package for $1000. Choose Dr. Schaefer (MD) or our nurse injectors (save $1/unit). Same product, same quality – we draw fresh product in front of you and keep visits under 15 minutes.

Why patients choose us: Dr. Kathryn Schaefer, MD brings over 25 years of experience and a commitment to natural-looking results. We offer Daxxify (lasts 4–6 months, often 25% less cost than Botox over time); Juvéderm fillers from $450 (Volbella, Vollure, Voluma, Versa) – lips, cheeks, smile lines – with Buy 2 Get 1 Free on select fillers; Botox for chronic migraines (15+ headache days, insurance-friendly, PREEMPT protocol); physician-monitored GLP-1 weight loss from $100/week; EM Slim Neo muscle toning (4 sessions $1000 or $125/session with package); LipoHIFU for non-surgical waistline; NAD+ and B12 ($100/100mg, 4 for $300); RF microneedling, CO2 and Pico laser, tattoo removal (buy 3, 4th free); Wharton's Jelly stem cells from $850 for joints and Baby Face facial; Latisse, laser hair removal, mole removal; Nitronox comfort available. Complimentary 2-week touch-up on injectables. Free parking at Aina Haina.

Getting you scheduled: 850 W Hind Dr, Suite 109, Honolulu. Mon, Tue, Thu, Fri 8am–5pm. Visit BotoxOahu.com or call/text (808) 261-1121 – we will get you on the books.

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:Georgia,'Times New Roman',serif;max-width:600px;margin:0 auto;background:linear-gradient(180deg,#f0fdfa 0%,#ecfeff 100%);border:1px solid rgba(13,148,136,0.15);border-radius:24px;overflow:hidden;box-shadow:0 24px 48px -12px rgba(13,148,136,0.12),0 12px 24px -8px rgba(0,0,0,0.06);">
<div style="background:linear-gradient(155deg,#0d9488 0%,#0f766e 35%,#115e59 100%);color:#fff;padding:40px 32px;border-bottom:4px solid rgba(255,255,255,0.25);text-align:center;box-shadow:inset 0 1px 0 rgba(255,255,255,0.15);text-shadow:0 1px 3px rgba(0,0,0,0.2);">
<p style="margin:0 0 10px;font-size:13px;font-weight:800;letter-spacing:0.28em;text-transform:uppercase;opacity:0.95;">Botox Oahu</p>
<h1 style="margin:0;font-size:30px;font-weight:800;letter-spacing:-0.02em;line-height:1.15;">You deserve clear pricing and physician-led care</h1>
<p style="margin:18px 0 0;font-size:15px;opacity:0.95;line-height:1.5;">Same-day availability, transparent prices, and a team that treats you like family.</p>
</div>
<div style="padding:36px 32px;color:#134e4a;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.18em;color:#0f766e;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 26px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid rgba(13,148,136,0.2);padding-bottom:18px;">Hi {{Name}},</p>
<p style="margin:0 0 28px;font-size:15px;line-height:1.75;">Come in for a visit. Whether it is Botox, fillers, weight loss, or any of our services, we have made it easy to look and feel your best – no guesswork on cost, no long waits. Most people need 25–40 units for forehead, frown lines, and crow's feet; at <strong style="color:#0d9488;">$11.11/unit</strong> that is about $278–$444. We also offer a <strong>90-unit package for $1000</strong>. You can choose Dr. Schaefer (MD) or our nurse injectors and save $1 per unit; same quality, fresh product drawn in front of you.</p>
<div style="background:#fff;border:1px solid rgba(13,148,136,0.2);border-radius:18px;padding:26px 26px;margin:30px 0;box-shadow:0 4px 24px rgba(13,148,136,0.08),inset 0 1px 0 rgba(255,255,255,0.9);">
<p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.18em;color:#0f766e;text-transform:uppercase;">Price snapshot</p>
<p style="margin:0;font-size:13px;line-height:1.7;color:#134e4a;"><strong>Botox</strong> $11.11/unit · 90-unit pkg $1000 · <strong>Daxxify</strong> 4–6 months · <strong>Fillers</strong> from $450 · Buy 2 Get 1 Free · <strong>Weight loss</strong> GLP-1 from $100/week · <strong>EM Slim Neo</strong> 4 sessions $1000 · <strong>Stem cells</strong> from $850 · <strong>NAD+/B12</strong> $100 or 4 for $300 · Pico 3 for $900 · Tattoo removal buy 3, 4th free.</p>
</div>
<p style="margin:32px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.18em;color:#0f766e;text-transform:uppercase;">Why patients choose us</p>
<p style="margin:0 0 20px;font-size:14px;line-height:1.75;">Dr. Kathryn Schaefer, MD brings over <strong>25 years</strong> of experience and a commitment to <strong>natural-looking results</strong>. You get personal care: under-15-minute visits, free parking at Aina Haina, and a complimentary 2-week touch-up on injectables. We also offer a free online cost calculator so you can plan your visit with confidence. Same-day and next-day appointments are often available.</p>
<ul style="margin:0 auto 30px;padding-left:24px;font-size:14px;line-height:1.85;display:table;text-align:left;">
<li style="margin-bottom:12px;"><strong>Botox & Daxxify:</strong> $11.11/unit; 90-unit pkg $1000; nurse option saves $1/unit; Daxxify lasts 4–6 months</li>
<li style="margin-bottom:12px;"><strong>Dermal fillers:</strong> Juvéderm Volbella, Vollure, Voluma, Versa from $450; Buy 2 Get 1 Free; lips, cheeks, smile lines</li>
<li style="margin-bottom:12px;"><strong>Migraine:</strong> Botox for chronic migraines (15+ headache days); insurance-friendly; PREEMPT protocol</li>
<li style="margin-bottom:12px;"><strong>Weight loss:</strong> Physician-monitored GLP-1 from $100/week</li>
<li style="margin-bottom:12px;"><strong>Body & wellness:</strong> EM Slim Neo 4 sessions $1000; LipoHIFU; NAD+ and B12</li>
<li style="margin-bottom:12px;"><strong>Skin & laser:</strong> RF microneedling, CO2 laser, Pico 3 for $900, tattoo removal buy 3 get 4th free</li>
<li style="margin-bottom:0;"><strong>Regenerative:</strong> Wharton's Jelly stem cells from $850; Latisse, laser hair removal, mole removal; Nitronox available</li>
</ul>
<p style="margin:30px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.18em;color:#0f766e;text-transform:uppercase;">What patients say</p>
<div style="background:#fff;border:1px solid rgba(13,148,136,0.15);border-radius:18px;padding:24px 26px;margin:0 auto 30px;max-width:520px;box-shadow:0 4px 20px rgba(13,148,136,0.06),inset 0 1px 0 rgba(255,255,255,0.9);">
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#134e4a;font-style:italic;">"Dr. Schaefer drew the Botox from the bottle right in front of me. She marked every area and talked me through the whole process – the results were excellent." <strong style="font-style:normal;color:#0f766e;">– Michelle R.</strong></p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#134e4a;font-style:italic;">"Coming from Beverly Hills, she's equivalent to the doctors there but with much more reasonable prices. I'm 100% satisfied." <strong style="font-style:normal;color:#0f766e;">– Jennifer K.</strong></p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#134e4a;font-style:italic;">"You can tell the difference when Botox isn't over-diluted. My results lasted longer and looked more natural than other clinics I've tried." <strong style="font-style:normal;color:#0f766e;">– Lisa T.</strong></p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#134e4a;font-style:italic;">"Perfect injection placement and no prolonged bee-sting bumps like I've had elsewhere. I would go to her for Botox or fillers in a heartbeat." <strong style="font-style:normal;color:#0f766e;">– Amanda S.</strong></p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#134e4a;font-style:italic;">"I love that she never oversells anything – she only recommends what you truly need, and the results speak for themselves." <strong style="font-style:normal;color:#0f766e;">– Sarah M.</strong></p>
</div>
<div style="background:linear-gradient(155deg,#ccfbf1 0%,#99f6e4 100%);border:1px solid rgba(13,148,136,0.25);border-radius:18px;padding:28px 28px;margin:30px 0;box-shadow:0 8px 28px -4px rgba(13,148,136,0.18),inset 0 1px 0 rgba(255,255,255,0.6);">
<p style="margin:0 0 16px;font-size:15px;color:#134e4a;line-height:1.6;"><strong>Getting you scheduled:</strong> We're at 850 W Hind Dr, Suite 109, Honolulu (Aina Haina) with free parking. Open Mon, Tue, Thu, Fri 8am–5pm. Same-day and next-day appointments are often available – book online anytime or call/text to lock in your slot. We'll confirm and send a reminder. First-time visitors get the same transparent pricing and quick check-in.</p>
<p style="margin:0 0 12px;"><a href="https://www.botoxoahu.com" style="display:inline-block;background:linear-gradient(155deg,#0d9488 0%,#0f766e 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(13,148,136,0.45);letter-spacing:0.02em;">BotoxOahu.com</a> <span style="color:#134e4a;font-weight:600;margin-left:14px;">or (808) 261-1121</span></p>
<p style="margin:0;font-size:13px;color:#0f766e;font-style:italic;">P.S. Complimentary 2-week touch-up on injectables – we want you loving your results.</p>
</div>
<div style="margin-top:32px;padding-top:28px;border-top:2px solid rgba(13,148,136,0.15);"><img src="{{BASE_URL}}/promo/botoxcard.png" alt="Botox Oahu" width="280" style="display:block;max-width:100%;height:auto;margin:0 auto;border:0;border-radius:20px;box-shadow:0 20px 52px -12px rgba(0,0,0,0.18);" /></div>
</div>
</div>`,
  },
  tech: {
    subject: "Coral Crown Solutions – Websites & tech for Hawaii local businesses",
    text: `Hi {{Name}},

Coral Crown Solutions helps Hawaii local businesses get found online and book more jobs. We build websites, set up online booking, and handle the tech so you can focus on your work – power washing, pool cleaning, car detailing, house cleaning, construction, food trucks, and restaurants.

What we do for local businesses:
• Websites: Custom build from $800, host $20/mo, your domain and contact form so customers can find you and request quotes
• Online booking: Let customers book services or request estimates 24/7 – no missed calls
• Google Business & SEO: Get your business showing up when people search in Hawaii
• Social & listings: Keep your Facebook, Instagram, or Yelp updated; get on the right directories
• E-commerce: Sell online (Amazon, Etsy, or your own cart) if you have products or merch
• AI chatbots: Answer common questions and capture leads on your site (optional)

We work with power washing, pool services, detailers, cleaners, contractors, food trucks, and restaurants across Oahu and the islands. One partner – no long-term lock-in. Quote based on what you need.


Next step: Reply or visit CoralCrownSolutions.com. (808) 393-0153 | sales@coralcrownsolutions.com

Coral Crown Solutions`,
    html: `<div style="font-family:'Segoe UI',system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border:1px solid #1e293b;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(30,41,59,0.22),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#1e293b 0%,#334155 45%,#475569 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #3b82f6;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">Coral Crown Solutions</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Websites & tech for Hawaii local businesses</h1>
<p style="margin:14px 0 0;font-size:14px;opacity:0.95;">Get found online. Book more jobs. We handle the tech so you can focus on your work.</p>
</div>
<div style="padding:32px 28px;color:#334155;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1e40af;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #cbd5e1;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">We help Hawaii local businesses get found online and book more jobs – power washing, pool cleaning, car detailing, house cleaning, construction, food trucks, and restaurants. We build websites, set up online booking, and handle the tech so you can focus on your work.</p>
<p style="margin:28px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1e40af;text-transform:uppercase;">What we do for local businesses</p>
<ul style="margin:0 auto 22px;padding-left:22px;font-size:14px;line-height:1.75;display:table;text-align:left;">
<li style="margin-bottom:8px;"><strong>Websites:</strong> Custom build from $800, host $20/mo – your domain, contact form, and clear info so customers find you and request quotes</li>
<li style="margin-bottom:8px;"><strong>Online booking:</strong> Let customers book services or request estimates 24/7 – no missed calls</li>
<li style="margin-bottom:8px;"><strong>Google Business &amp; SEO:</strong> Get your business showing up when people search in Hawaii</li>
<li style="margin-bottom:8px;"><strong>Social &amp; listings:</strong> Keep Facebook, Instagram, or Yelp updated; get on the right directories</li>
<li style="margin-bottom:8px;"><strong>E-commerce:</strong> Sell online (Amazon, Etsy, or your own cart) if you have products or merch</li>
<li style="margin-bottom:0;"><strong>AI chatbots:</strong> Answer common questions and capture leads on your site (optional)</li>
</ul>
<p style="margin:26px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1e40af;text-transform:uppercase;">Why choose us</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;">We work with local companies across Oahu and the islands. Custom solutions – no bloated themes, no long-term lock-in. One partner from website to booking to updates. We handle domain setup, SSL, and ongoing support so you can focus on your business.</p>
<div style="background:#eff6ff;border:2px solid #3b82f6;border-radius:18px;padding:20px 22px;margin:22px 0;box-shadow:0 4px 14px rgba(59,130,246,0.12);">
<p style="margin:0 0 10px;font-size:13px;color:#1e3a8a;font-style:italic;">"They updated my website, helped with graphics, and made it easy for customers to book online."</p>
<p style="margin:0;font-size:13px;color:#1e3a8a;font-style:italic;">"Coral Crown took my business to the next level with the best SEO and site upgrades. I recommend!"</p>
</div>
<p style="margin:26px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1e40af;text-transform:uppercase;">Pricing</p>
<p style="margin:0 0 26px;font-size:14px;line-height:1.6;">Build from $800; hosting $20/mo with maintenance and free SSL. Online booking and SEO by scope. We quote based on what you need – no obligation.</p>
<div style="background:linear-gradient(145deg,#dbeafe 0%,#e0f2fe 100%);border:2px solid #0ea5e9;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(14,165,233,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#0c4a6e;line-height:1.55;"><strong>Next step:</strong> Reply or visit the site below. Tell us your business and goals – we will put together a plan and quote. (808) 393-0153 | sales@coralcrownsolutions.com</p>
<p style="margin:0 0 10px;"><a href="https://www.coralcrownsolutions.com" style="display:inline-block;background:linear-gradient(145deg,#2563eb 0%,#1d4ed8 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(37,99,235,0.4);">CoralCrownSolutions.com</a></p>
<p style="margin:0;font-size:13px;color:#1e40af;font-style:italic;">P.S. From website to online booking – one partner for Hawaii local businesses.</p>
</div>
<div style="margin-top:28px;padding-top:24px;border-top:2px solid #cbd5e1;"><img src="{{BASE_URL}}/promo/coralcrownfront.jpg" alt="Coral Crown Solutions" width="280" style="display:block;max-width:100%;height:auto;margin:0 auto;border:0;border-radius:20px;box-shadow:0 20px 52px -12px rgba(0,0,0,0.18);" /><img src="{{BASE_URL}}/promo/coralcrownback.jpg" alt="Coral Crown Solutions" width="280" style="display:block;max-width:100%;height:auto;margin:12px auto 0;border:0;border-radius:20px;box-shadow:0 20px 52px -12px rgba(0,0,0,0.18);" /></div>
</div>
</div>`,
  },
  "prayer-individual": {
    subject: "Join Prayer Authority – Free Christian prayer community & spiritual tech",
    text: `Hi {{Name}},

We'd love to have you join Prayer Authority – a global Christian prayer community with powerful spiritual tech tools. It's free to join, takes 10 seconds with Google, and there's no commitment.

Why thousands are joining: You get a personal dashboard, prayer requests that connect you with believers worldwide, and tools designed to strengthen your walk – P48X Journal (Philippians 4:8), Battle Sword for Scripture memory, Scriptural Vitamins, Dreamstone for dream interpretation, Urim & Thummim for biblical wisdom, 12-Counselor panel, Spousal Translator, Complimentor, Bible Trivia, Pray Out Loud, and more. Ruby (free forever) includes core tools; Diamond (premium) adds Dreamstone, 12-Counselor, Spousal Translator, Urim & Thummim. Prayer Authority is where faith meets action – Scripture-rich resources, testimonies, and a community that builds each other up.

Getting you in: Sign up with Google at the link below for instant access. No forms, no pressure – just your dashboard and all member tools ready to go.

Join free: https://www.prayerauthority.com

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:Georgia,'Times New Roman',serif;max-width:600px;margin:0 auto;background:#fffbeb;border:1px solid #b45309;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(180,83,9,0.2),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#b45309 0%,#92400e 45%,#78350f 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #f59e0b;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">Free to join</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Join Prayer Authority</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">A global Christian prayer community – instant access, spiritual tech that strengthens your walk.</p>
</div>
<div style="padding:32px 28px;color:#78350f;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#92400e;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #fde68a;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">We'd love to have you in our community. Sign up with Google in 10 seconds – no forms, no commitment – and get instant access to your dashboard and every tool built to help you pray, grow in Scripture, and connect with believers worldwide. Thousands have already joined.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#92400e;text-transform:uppercase;">Why so many are joining</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;">Prayer Authority is where <strong>faith meets action</strong>. Submit prayer requests and receive support from believers around the globe. Use spiritual tech: <strong>P48X Journal</strong> (Philippians 4:8 reflection), <strong>Battle Sword</strong> for Scripture memory, <strong>Scriptural Vitamins</strong>, <strong>Dreamstone</strong> for dream interpretation, <strong>Urim & Thummim</strong> for biblical wisdom, <strong>12-Counselor panel</strong>, <strong>Spousal Translator</strong>, Complimentor, Bible Trivia, Pray Out Loud, and more.</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;">You get a personal dashboard, prayer requests that connect you with believers worldwide, and tools designed to strengthen your walk. Join thousands who are fixing their thoughts on what is true, honorable, and praiseworthy – with no cost and no pressure.</p>
<ul style="margin:0 auto 24px;padding-left:22px;font-size:14px;line-height:1.8;display:table;text-align:left;">
<li style="margin-bottom:8px;"><strong>Ruby</strong> (free forever) – core tools, dashboard, prayer requests, community</li>
<li style="margin-bottom:8px;"><strong>Diamond</strong> (premium) – adds Dreamstone, 12-Counselor, Spousal Translator, Urim & Thummim</li>
<li style="margin-bottom:0;">Every tool is built to help you grow in prayer and Scripture – no commitment required</li>
</ul>
<div style="background:linear-gradient(145deg,#fef3c7 0%,#fde68a 100%);border:2px solid #b45309;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(180,83,9,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#78350f;line-height:1.55;"><strong>Getting you in:</strong> Click the button below to join with Google. You'll land on your dashboard immediately – no extra forms, no follow-up emails required. All member tools are ready the moment you sign in. If you have questions later, our support and community are there for you.</p>
<p style="margin:0 0 10px;font-size:14px;color:#78350f;">We're here to help you get started. No pressure – just a place where prayer and Scripture come together.</p>
<p style="margin:0 0 10px;"><a href="https://www.prayerauthority.com" style="display:inline-block;background:linear-gradient(145deg,#b45309 0%,#92400e 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(180,83,9,0.4);">Join free – Prayer Authority</a></p>
<p style="margin:0;font-size:13px;color:#92400e;font-style:italic;">P.S. Ruby tier is free forever – no credit card, no trial that expires.</p>
</div>
<div style="margin-top:28px;padding-top:24px;border-top:2px solid #fde68a;"><img src="{{BASE_URL}}/promo/prayerauthorityfront.jpg" alt="Prayer Authority" width="280" style="display:block;max-width:100%;height:auto;margin:0 auto;border:0;border-radius:20px;box-shadow:0 20px 52px -12px rgba(0,0,0,0.18);" /><img src="{{BASE_URL}}/promo/prayerauthorityback.jpg" alt="Prayer Authority" width="280" style="display:block;max-width:100%;height:auto;margin:12px auto 0;border:0;border-radius:20px;box-shadow:0 20px 52px -12px rgba(0,0,0,0.18);" /></div>
</div>
</div>`,
  },
  "prayer-church": {
    subject: "Prayer Authority for your church – Tools & community for your congregation",
    text: `Hi {{Name}},

We'd be honored to partner with your church – bring Prayer Authority's tools and community to your congregation so every member can grow in prayer and Scripture.

Why churches love it: Free (Ruby) and premium (Diamond) tiers so you can scale. Members get prayer requests, community sharing, Scripture memory tools (P48X Journal, Battle Sword, Scriptural Vitamins), dream interpretation (Dreamstone), biblical counsel (12-Counselor, Urim & Thummim), Spousal Translator, and more. Perfect for small groups, youth, and church-wide engagement – one platform that equips your people with spiritual tech designed for growth and connection.

Next step: Get your leadership and key volunteers signed up first, then roll out to your congregation. We're here to help you onboard – just reply or visit PrayerAuthority.com.

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:Georgia,'Times New Roman',serif;max-width:600px;margin:0 auto;background:#fef9c3;border:1px solid #92400e;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(146,64,14,0.2),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#92400e 0%,#78350f 45%,#654321 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #f59e0b;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">For your church</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Prayer Authority for your church</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">Bring prayer tools and a global community to your congregation – we'd be honored to partner with you.</p>
</div>
<div style="padding:32px 28px;color:#78350f;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#92400e;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #fde68a;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">Let your church experience Prayer Authority – a platform that gives every member access to prayer requests, Scripture tools, dream interpretation, and biblical counsel. We've built it so congregations can grow together in faith and connection.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#92400e;text-transform:uppercase;">Why churches love it</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;"><strong>Ruby</strong> (free forever) and <strong>Diamond</strong> (premium) tiers – get your entire church signed up and members get dashboards, prayer tools, and community. Prayer requests with worldwide support, <strong>P48X Journal</strong>, <strong>Battle Sword</strong>, <strong>Scriptural Vitamins</strong>, <strong>Dreamstone</strong> (dream interpretation), <strong>12-Counselor panel</strong>, <strong>Urim & Thummim</strong>, Spousal Translator, Complimentor, Bible Trivia, Pray Out Loud. Ideal for small groups, youth, and church-wide engagement.</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.7;">Prayer Authority is committed to a secure, respectful environment – every tool exists to help your people grow closer to God and fulfill the calling He's placed on their lives.</p>
<ul style="margin:0 auto 28px;padding-left:22px;font-size:14px;line-height:1.8;display:table;text-align:left;">
<li style="margin-bottom:10px;"><strong>Leadership first:</strong> Get your pastors and key volunteers signed up, then roll out to the congregation</li>
<li style="margin-bottom:10px;"><strong>No IT needed:</strong> Members join with Google in seconds; we handle the platform</li>
<li style="margin-bottom:0;"><strong>Support:</strong> We're here to help you onboard – reply to this email or visit the site below</li>
</ul>
<div style="background:linear-gradient(145deg,#fef3c7 0%,#fde68a 100%);border:2px solid #b45309;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(180,83,9,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#78350f;line-height:1.55;"><strong>Getting you started:</strong> Reply to this email or click below. Tell us your church name and how many members you'd like to onboard – we'll send a short guide and can schedule a quick call to walk your team through sign-up. No obligation. We typically respond within 24 hours.</p>
<p style="margin:0 0 10px;"><a href="https://www.prayerauthority.com" style="display:inline-block;background:linear-gradient(145deg,#b45309 0%,#92400e 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(180,83,9,0.4);">PrayerAuthority.com</a></p>
<p style="margin:0;font-size:13px;color:#92400e;font-style:italic;">P.S. Ruby is free for your whole congregation – scale when you're ready.</p>
</div>
<div style="margin-top:28px;padding-top:24px;border-top:2px solid #fde68a;"><img src="{{BASE_URL}}/promo/prayerauthorityfront.jpg" alt="Prayer Authority" width="280" style="display:block;max-width:100%;height:auto;margin:0 auto;border:0;border-radius:20px;box-shadow:0 20px 52px -12px rgba(0,0,0,0.18);" /><img src="{{BASE_URL}}/promo/prayerauthorityback.jpg" alt="Prayer Authority" width="280" style="display:block;max-width:100%;height:auto;margin:12px auto 0;border:0;border-radius:20px;box-shadow:0 20px 52px -12px rgba(0,0,0,0.18);" /></div>
</div>
</div>`,
  },
  "tourism-hawaii": {
    subject: "Time for Fun Hawaii – Exclusive tour discounts & webinar",
    text: `Hi {{Name}},

Time for Fun Hawaii – Save on Oahu, Maui & Big Island tours

Two ways to save:
1) Watch our webinar (60–75 min on Zoom) – get exclusive wholesale discounts on Hawaii's top tours: luaus, helicopter tours, Pearl Harbor, snorkeling, Road to Hana, volcano tours, and more. Schedule: Mon–Tue 12:45AM & 2:45PM HST; Wed–Sun 8:45AM, 10:45AM, 12:45PM HST (check-in 15 min before). One attendee 25–71, US/Canadian, $40k+ income. Couples together; single females welcome. Computer or tablet (no phones).
2) No time? Still book with us – add tours to your cart, we’ll call and help you set up your vacation.

How-to video: https://www.youtube.com/watch?v=StNgZM1DuSg
Call (808) 393-0153 | https://www.timeforfunhawaii.com

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#dcfce7;border:2px solid #15803d;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(21,128,61,0.22),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#15803d 0%,#166534 45%,#14532d 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #22c55e;text-shadow:0 1px 2px rgba(0,0,0,0.15);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">Time for Fun Hawaii</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Discover the best Hawaii tours with exclusive discounts</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">Aloha! Oahu, Maui & Big Island – two ways to save.</p>
</div>
<div style="padding:32px 28px;color:#14532d;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#15803d;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #86efac;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">We'd love to help you unlock incredible savings on your dream Hawaiian vacation. Watch our short webinar for exclusive wholesale rates on Hawaii's top tours – or skip the webinar and still book with us; we'll call and help you plan.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#15803d;text-transform:uppercase;">Why book with us</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;"><strong>Time for Fun Hawaii</strong> – Hawaii's premier tour booking platform. From breathtaking adventures to insider tips, we're here so you can experience more during your time on the islands.</p>
<ol style="margin:0 auto 22px;padding-left:22px;font-size:14px;line-height:1.75;display:table;text-align:left;">
<li style="margin-bottom:10px;"><strong>Watch our webinar</strong> (60–75 min on Zoom) – exclusive wholesale discounts on Pearl Harbor, luaus, helicopter tours, snorkeling, Road to Hana, volcano tours, and more.</li>
<li style="margin-bottom:0;"><strong>No time?</strong> Add tours to your tour bag, send it to us, and we'll call you to help set up your vacation – no webinar required.</li>
</ol>
<p style="margin:0 0 24px;font-size:14px;line-height:1.7;"><strong>Webinar schedule:</strong> Mon–Tue 12:45AM & 2:45PM HST; Wed–Sun 8:45AM, 10:45AM, 12:45PM HST (check-in 15 min before). One attendee 25–71, US/Canadian, $40k+ household income. Couples together; single females welcome. Computer or tablet (no phones).</p>
<div style="background:linear-gradient(145deg,#ccfbf1 0%,#99f6e4 100%);border:2px solid #15803d;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(21,128,61,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#14532d;line-height:1.55;"><strong>Getting you scheduled:</strong> Call <strong>(808) 393-0153</strong> or register at the link below. Webinar spots fill up – reserve yours and we'll confirm your time or set up a call to build your vacation. Check-in is 15 minutes before your slot; have a computer or tablet ready. First-time attendees get the same exclusive rates.</p>
<p style="margin:0 0 10px;"><a href="https://www.timeforfunhawaii.com" style="display:inline-block;background:linear-gradient(145deg,#15803d 0%,#166534 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(21,128,61,0.4);">TimeForFunHawaii.com</a></p>
<p style="margin:0;font-size:14px;"><a href="https://www.youtube.com/watch?v=StNgZM1DuSg" style="color:#166534;font-weight:600;">Watch our how-to video</a> – see how easy it is.</p>
<p style="margin:10px 0 0;font-size:13px;color:#15803d;font-style:italic;">P.S. No time for the webinar? Add tours to your cart and we'll call you – you can still save.</p>
</div>
<div style="margin-top:28px;padding-top:24px;border-top:2px solid #86efac;"><img src="{{BASE_URL}}/promo/timeforfunhawaii.jpg" alt="Time for Fun Hawaii" width="280" style="display:block;max-width:100%;height:auto;margin:0 auto;border:0;border-radius:20px;box-shadow:0 20px 52px -12px rgba(0,0,0,0.18);" /><img src="{{BASE_URL}}/promo/timeforfunhawaiiback.jpg" alt="Time for Fun Hawaii" width="280" style="display:block;max-width:100%;height:auto;margin:12px auto 0;border:0;border-radius:20px;box-shadow:0 20px 52px -12px rgba(0,0,0,0.18);" /></div>
</div>
</div>`,
  },
  "tourism-usa": {
    subject: "Choose 1 of 4 Complimentary Vacations – H.I.E. Wholesale Travel (Time for Fun USA)",
    text: `Hi {{Name}},

Time for Fun USA – Tour deals across the USA

As a thank you for attending our educational webinar (60–75 min), choose ONE of 4 complimentary vacation packages: Carnival Cruise (3–5 nights), 7 Night Condo Stay, 7 Day Caribbean Cruise for Two, Mexico Getaway (8d/7n). You pay only required fees/taxes. Requirements: 25+, US/Canadian, $40k+ income. Register now – we’ll Hawaii residents: want to get off the rock? Watch one webinar and pick your complimentary trip. Details: Carnival 3–5 nights, 7 Night Condo, 7 Day Caribbean for Two, Mexico 8d/7n. Valid 18 months. If never used, no cost.

https://www.timeforfunusa.com

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#e0f2fe;border:2px solid #0369a1;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(3,105,161,0.22),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#0369a1 0%,#0c4a6e 45%,#0e7490 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #0ea5e9;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">Time for Fun USA</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Choose 1 of 4 complimentary vacations</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">Attend our webinar – then pick the vacation that's perfect for you.</p>
</div>
<div style="padding:32px 28px;color:#0c4a6e;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#0369a1;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #7dd3fc;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">We'd love to give you a complimentary vacation. Attend our 60–75 minute educational webinar on wholesale travel – then choose one of four packages: Carnival Cruise (3–5 nights), 7 Night Condo Stay, 7 Day Caribbean Cruise for Two, or Mexico Getaway (8d/7n). You pay only required fees and taxes when you're ready to go.</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;"><strong>Hawaii residents:</strong> Want to get off the rock? Watch one webinar and pick your complimentary trip – Caribbean, Mexico, cruise, or condo. No catch.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#0369a1;text-transform:uppercase;">Why you'll love it</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;"><strong>H.I.E. Wholesale Travel</strong> – Hawaii-based, A+ BBB, 500,000+ active users. Attend one presentation, learn about wholesale travel, and walk away with your choice. Valid 18 months. If you never use it, there's no cost whatsoever.</p>
<ul style="margin:0 auto 22px;padding-left:22px;font-size:14px;line-height:1.75;display:table;text-align:left;">
<li style="margin-bottom:8px;"><strong>Carnival Cruise</strong> (3, 4, or 5 nights) – Bahamas, Caribbean, Mexico; meals and entertainment included</li>
<li style="margin-bottom:8px;"><strong>7 Night Condo Stay</strong> – US destinations; full kitchens, perfect for families</li>
<li style="margin-bottom:8px;"><strong>7 Day Caribbean Cruise for Two</strong> – major ports; unforgettable experience</li>
<li style="margin-bottom:0;"><strong>Mexico Getaway</strong> (8d/7n) – stunning beaches, tropical paradise</li>
</ul>
<p style="margin:0 0 24px;font-size:14px;line-height:1.7;"><strong>Requirements:</strong> 25+, US or Canadian, $40k+ household income. Couples attend together; single females may attend alone. Desktop, laptop, or tablet with camera and microphone (no phones). Not at work or on lunch break.</p>
<div style="background:linear-gradient(145deg,#fef3c7 0%,#fde68a 100%);border:2px solid #0369a1;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(3,105,161,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#0c4a6e;line-height:1.55;"><strong>Getting you scheduled:</strong> Register at the link below – webinar seats are limited. We'll confirm your time and send a reminder. Check-in is 15 minutes before your slot; have a computer or tablet with camera and mic ready. After the 60–75 min presentation you'll choose your complimentary vacation. No obligation.</p>
<p style="margin:0 0 10px;"><a href="https://www.timeforfunusa.com" style="display:inline-block;background:linear-gradient(145deg,#ea580c 0%,#c2410c 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(234,88,12,0.4);">TimeForFunUSA.com</a></p>
<p style="margin:0;font-size:13px;color:#0369a1;font-style:italic;">P.S. Valid 18 months – if you never use it, there's no cost. Our thank-you to you.</p>
</div>
<div style="margin-top:28px;padding-top:24px;border-top:2px solid #7dd3fc;"><img src="{{BASE_URL}}/promo/timeforfunusa.jpg" alt="Time for Fun USA" width="280" style="display:block;max-width:100%;height:auto;margin:0 auto;border:0;border-radius:20px;box-shadow:0 20px 52px -12px rgba(0,0,0,0.18);" /><img src="{{BASE_URL}}/promo/timeforfunusaback.jpg" alt="Time for Fun USA" width="280" style="display:block;max-width:100%;height:auto;margin:12px auto 0;border:0;border-radius:20px;box-shadow:0 20px 52px -12px rgba(0,0,0,0.18);" /></div>
</div>
</div>`,
  },
  "elion-fans": {
    subject: "E Lion Music – Holy Hip-Hop from Hawaii. Stream everywhere.",
    text: `Hi {{Name}},

We'd love for you to hit play on E Lion – Holy Hip-Hop from Hawaii that's been turning heads for over 15 years. Your taste in music says a lot, and we think you'll dig the blend of faith, flow, and island vibes.

Why E Lion: He's not just another Christian rapper – he's a prophetic voice with 1,000+ performances, 10M+ YouTube views, 30K+ CDs sold hand-to-hand, and Family Feud grand prize winner (2016 – first Hawaiian family to win 5 consecutive episodes). His sound is "Hip Hope" – hip-hop meets worship, Hawaiian and Hebrew themes, music that uplifts. Albums like Father Nature, Bible Battle Royale, Lightclub, and Just Us; author of P48X (Philippians 4:8). You can stream everywhere: Spotify, Apple Music, Amazon Music, TikTok, Pandora, SoundCloud, Deezer, iHeartRadio.

Where to start: Pick your platform and hit follow. Full catalog, bio, and more at elionmusic.com – and if you love it, share it with someone who needs the vibe.

Links: Full catalog https://www.elionmusic.com/rap/ | Family Feud: Grand Prize https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize | Family Feud: Audition https://www.elionmusic.com/articles/hawaii-kai-family-feud-audition | Family Feud: Appearance https://www.elionmusic.com/articles/hawaii-kai-family-feud-appearance | Family Feud: Next Round https://www.elionmusic.com/articles/hawaii-family-moves-next-round | Bored City Interview https://www.elionmusic.com/articles/bored-city-interview-e-lion | Spotlight Interview https://www.elionmusic.com/articles/spotlight-interview-e-lion | TBK247 Island Roots https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music | Zoho CRM https://www.elionmusic.com/articles/running-multiple-businesses-crm | Fatal House Fire https://www.elionmusic.com/articles/elion-fatal-house-fire | 93.9 The Beat https://www.elionmusic.com/articles/elion-radio-939 | 102.7 Radio https://www.elionmusic.com/articles/elion-radio-1027 | KHON2 Hurricane Iselle https://www.elionmusic.com/articles/hurricane-iselle-sale-day | PopCandies TV https://www.elionmusic.com/articles/popcandies-hollywood-club | E Lion Wiki https://www.elionmusic.com/wiki/ | Spotify https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA | Apple Music https://music.apple.com/us/artist/e-lion/1111804063 | Learn More About Lions https://www.elionmusic.com/lions | elionmusic.com https://www.elionmusic.com

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#1c1917;border:2px solid #f59e0b;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(245,158,11,0.3),0 10px 28px -8px rgba(0,0,0,0.15);">
<div style="background:linear-gradient(145deg,#f59e0b 0%,#d97706 45%,#b45309 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #fbbf24;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">E Lion Music</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Holy Hip-Hop from Hawaii</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">We'd love for you to hit play. Your taste in music says a lot.</p>
</div>
<div style="padding:32px 28px;color:#fef3c7;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#fbbf24;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #78716c;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">Hit follow and stream E Lion on your favorite platform. He's been making "Hip Hope" – hip-hop that uplifts – for over 15 years, and we'd be honored to have you in the mix.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#fbbf24;text-transform:uppercase;">Why E Lion</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;">E Lion (Eric Hans Schaefer) isn't just another Christian rapper – he's a prophetic voice with <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>, <strong>30K+ CDs sold</strong> hand-to-hand, and <strong>Family Feud grand prize winner</strong> (2016 – first Hawaiian family to win 5 consecutive episodes). His sound blends hip-hop with worship, Hawaiian and Hebrew themes. Albums: Father Nature, Bible Battle Royale, Lightclub, Just Us; author of <strong>P48X</strong> (Philippians 4:8).</p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#fbbf24;text-transform:uppercase;">What people say</p>
<div style="background:#292524;border:2px solid #78716c;border-radius:18px;padding:20px 22px;margin:0 auto 24px;max-width:520px;box-shadow:0 2px 12px rgba(0,0,0,0.3);">
<p style="margin:0 0 12px;font-size:13px;line-height:1.6;color:#fef3c7;font-style:italic;">"You'll be reaching millions through stadiums… and you're going to touch lives that no one else can touch." <strong style="font-style:normal;color:#fbbf24;">– John Keough (Healing Rooms)</strong></p>
<p style="margin:0 0 12px;font-size:13px;line-height:1.6;color:#fef3c7;font-style:italic;">"God has given you a deep desire to win souls… Your name is going to be great, and you are going to become well known in other countries… Your path has been set in Heaven, and your destiny is great." <strong style="font-style:normal;color:#fbbf24;">– Prophetess Deborah Allen (Power Prayers)</strong></p>
<p style="margin:0;font-size:13px;line-height:1.6;color:#fef3c7;font-style:italic;">"I personally think your artistic, highly visionary, and hard working. I love your rhymes... they definitely are a gift from God." <strong style="font-style:normal;color:#fbbf24;">– Guinnevere Allen (One Love Church, Hawaii)</strong></p>
</div>
<p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#fbbf24;text-transform:uppercase;">Stream everywhere</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.6;"><a href="https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA" style="color:#fbbf24;">Spotify</a> · <a href="https://music.apple.com/us/artist/e-lion/1111804063" style="color:#fbbf24;">Apple Music</a> · <a href="https://www.amazon.com/music/player/artists/B01GOGAW4W/e-lion" style="color:#fbbf24;">Amazon Music</a> · <a href="https://www.tiktok.com/@elionreigns" style="color:#fbbf24;">TikTok</a> · <a href="https://www.pandora.com/artist/e-lion/AR9vZJllkt3JmVq" style="color:#fbbf24;">Pandora</a> · <a href="https://soundcloud.com/elionrapmusic" style="color:#fbbf24;">SoundCloud</a> · <a href="https://www.deezer.com/us/artist/354652062" style="color:#fbbf24;">Deezer</a> · <a href="https://www.iheart.com/artist/e-lion-46608091/" style="color:#fbbf24;">iHeartRadio</a></p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#fbbf24;text-transform:uppercase;">Full catalog</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/rap/" style="color:#fbbf24;">E Lion catalog & profile</a></p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#fbbf24;text-transform:uppercase;">Family Feud articles</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#fbbf24;">Family Feud: Grand Prize</a> · <a href="https://www.elionmusic.com/articles/hawaii-kai-family-feud-audition" style="color:#fbbf24;">Family Feud: Audition</a> · <a href="https://www.elionmusic.com/articles/hawaii-kai-family-feud-appearance" style="color:#fbbf24;">Family Feud: Appearance</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-moves-next-round" style="color:#fbbf24;">Family Feud: Next Round</a></p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#fbbf24;text-transform:uppercase;">Interviews & press</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/bored-city-interview-e-lion" style="color:#fbbf24;">Bored City Interview</a> · <a href="https://www.elionmusic.com/articles/spotlight-interview-e-lion" style="color:#fbbf24;">Spotlight Interview</a> · <a href="https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music" style="color:#fbbf24;">TBK247 Island Roots & Faith</a> · <a href="https://www.elionmusic.com/articles/running-multiple-businesses-crm" style="color:#fbbf24;">Zoho CRM</a> · <a href="https://www.elionmusic.com/articles/elion-fatal-house-fire" style="color:#fbbf24;">Fatal House Fire: A Turning Point</a> · <a href="https://www.elionmusic.com/articles/elion-radio-939" style="color:#fbbf24;">93.9 The Beat Freestyle</a> · <a href="https://www.elionmusic.com/articles/elion-radio-1027" style="color:#fbbf24;">102.7 Radio</a> · <a href="https://www.elionmusic.com/articles/hurricane-iselle-sale-day" style="color:#fbbf24;">KHON2 Hurricane Iselle</a> · <a href="https://www.elionmusic.com/articles/popcandies-hollywood-club" style="color:#fbbf24;">PopCandies TV</a> · <a href="https://www.elionmusic.com/wiki/" style="color:#fbbf24;">E Lion Wiki</a></p>
<div style="background:#292524;border:2px solid #f59e0b;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(0,0,0,0.4);">
<p style="margin:0 0 14px;font-size:15px;color:#fef3c7;line-height:1.55;"><strong>Where to start:</strong> Visit elionmusic.com for the full catalog, bio, lyrics, and merch. Pick your platform and hit follow – if you love it, share it with someone who needs the vibe. New music and content drop regularly; follow on social for behind-the-scenes and tour dates.</p>
<p style="margin:0 0 12px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#f59e0b 0%,#d97706 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(245,158,11,0.4);">elionmusic.com</a></p>
<p style="margin:0 0 10px;"><a href="https://www.elionmusic.com/lions" style="display:inline-block;background:rgba(251,191,36,0.2);color:#fbbf24;border:2px solid #f59e0b;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:14px;">Learn More About Lions</a></p>
<p style="margin:0;font-size:13px;color:#fbbf24;font-style:italic;">P.S. Family Feud grand prize winner – first Hawaiian family to win 5 in a row. Your vibe, your tribe.</p>
</div>
</div>
</div>`,
  },
  "elion-artists": {
    subject: "E Lion Music – Collaboration offer for artists",
    text: `Hi {{Name}},

E Lion would be honored to collaborate with you – free. We're reaching out because we respect what you're doing and believe our audiences would connect. One verse, one feature, or something bigger – your call.

Why it makes sense: E Lion brings 15+ years, 1,000+ performances, 10M+ YouTube views, Family Feud grand prize (2016), and a catalog on every major platform. Holy Hip-Hop from Hawaii – Hawaiian and Hebrew fusion, broadcast-friendly, no compromise on quality. Press: Bored City, Spotlight, TBK247, Wiki. We're not looking for a handout – we're looking for peers who want to grow together and cross-promote.

Next step: Reply to this email or hit elionmusic.com and say you're in. We'll send you links to the catalog, pick a direction, and get down to details (tempo, vibe, credits). We'd love to make something fire with you.

Links: Full catalog https://www.elionmusic.com/rap/ | Family Feud: Grand Prize https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize | Family Feud: Audition https://www.elionmusic.com/articles/hawaii-kai-family-feud-audition | Family Feud: Appearance https://www.elionmusic.com/articles/hawaii-kai-family-feud-appearance | Family Feud: Next Round https://www.elionmusic.com/articles/hawaii-family-moves-next-round | Bored City Interview https://www.elionmusic.com/articles/bored-city-interview-e-lion | Spotlight Interview https://www.elionmusic.com/articles/spotlight-interview-e-lion | TBK247 Island Roots https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music | Zoho CRM https://www.elionmusic.com/articles/running-multiple-businesses-crm | Fatal House Fire https://www.elionmusic.com/articles/elion-fatal-house-fire | 93.9 The Beat https://www.elionmusic.com/articles/elion-radio-939 | 102.7 Radio https://www.elionmusic.com/articles/elion-radio-1027 | KHON2 Hurricane Iselle https://www.elionmusic.com/articles/hurricane-iselle-sale-day | PopCandies TV https://www.elionmusic.com/articles/popcandies-hollywood-club | E Lion Wiki https://www.elionmusic.com/wiki/ | Learn More About Lions https://www.elionmusic.com/lions | elionmusic.com https://www.elionmusic.com

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f5f3ff;border:2px solid #7c3aed;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(124,58,237,0.28),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#7c3aed 0%,#5b21b6 50%,#4c1d95 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #a78bfa;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">E Lion Music</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Let's collaborate</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">E Lion would be honored to work with you – free. We respect what you're doing and believe our audiences would connect.</p>
</div>
<div style="padding:32px 28px;color:#4c1d95;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#6d28d9;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #ddd6fe;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">E Lion is reaching out to peer artists for <strong>free collaboration</strong> – custom verses, features, cross-promotion. We're not looking for a handout; we're looking for creatives who want to grow together and make something that reaches both our audiences.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#6d28d9;text-transform:uppercase;">Why it makes sense</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;">E Lion brings <strong>15+ years</strong>, <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>, and <strong>Family Feud grand prize</strong> (2016 – first Hawaiian family to win 5 consecutive episodes). Holy Hip-Hop from Hawaii – Hawaiian and Hebrew fusion, broadcast-friendly.</p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#6d28d9;text-transform:uppercase;">Stream & catalog</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.6;"><a href="https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA" style="color:#6d28d9;">Spotify</a> · <a href="https://music.apple.com/us/artist/e-lion/1111804063" style="color:#6d28d9;">Apple Music</a> · <a href="https://www.amazon.com/music/player/artists/B01GOGAW4W/e-lion" style="color:#6d28d9;">Amazon Music</a> · <a href="https://www.tiktok.com/@elionreigns" style="color:#6d28d9;">TikTok</a> · <a href="https://www.pandora.com/artist/e-lion/AR9vZJllkt3JmVq" style="color:#6d28d9;">Pandora</a> · <a href="https://soundcloud.com/elionrapmusic" style="color:#6d28d9;">SoundCloud</a> · <a href="https://www.deezer.com/us/artist/354652062" style="color:#6d28d9;">Deezer</a> · <a href="https://www.iheart.com/artist/e-lion-46608091/" style="color:#6d28d9;">iHeartRadio</a> · <a href="https://www.elionmusic.com/rap/" style="color:#6d28d9;">Full catalog</a></p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#6d28d9;text-transform:uppercase;">Family Feud articles</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#6d28d9;">Family Feud: Grand Prize</a> · <a href="https://www.elionmusic.com/articles/hawaii-kai-family-feud-audition" style="color:#6d28d9;">Family Feud: Audition</a> · <a href="https://www.elionmusic.com/articles/hawaii-kai-family-feud-appearance" style="color:#6d28d9;">Family Feud: Appearance</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-moves-next-round" style="color:#6d28d9;">Family Feud: Next Round</a></p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#6d28d9;text-transform:uppercase;">Interviews & press</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/bored-city-interview-e-lion" style="color:#6d28d9;">Bored City Interview</a> · <a href="https://www.elionmusic.com/articles/spotlight-interview-e-lion" style="color:#6d28d9;">Spotlight Interview</a> · <a href="https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music" style="color:#6d28d9;">TBK247 Island Roots & Faith</a> · <a href="https://www.elionmusic.com/articles/running-multiple-businesses-crm" style="color:#6d28d9;">Zoho CRM</a> · <a href="https://www.elionmusic.com/articles/elion-fatal-house-fire" style="color:#6d28d9;">Fatal House Fire: A Turning Point</a> · <a href="https://www.elionmusic.com/articles/elion-radio-939" style="color:#6d28d9;">93.9 The Beat Freestyle</a> · <a href="https://www.elionmusic.com/articles/elion-radio-1027" style="color:#6d28d9;">102.7 Radio</a> · <a href="https://www.elionmusic.com/articles/hurricane-iselle-sale-day" style="color:#6d28d9;">KHON2 Hurricane Iselle</a> · <a href="https://www.elionmusic.com/articles/popcandies-hollywood-club" style="color:#6d28d9;">PopCandies TV</a> · <a href="https://www.elionmusic.com/wiki/" style="color:#6d28d9;">E Lion Wiki</a></p>
<div style="background:linear-gradient(145deg,#ede9fe 0%,#ddd6fe 100%);border:2px solid #7c3aed;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(124,58,237,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#4c1d95;line-height:1.55;"><strong>Next step:</strong> Reply to this email or click below and say you're in. We'll send you links to the catalog, pick a direction (one verse, one feature, or something bigger), and get down to details – tempo, vibe, credits, and how we'll cross-promote. We typically respond within 24–48 hours and would love to make something fire with you.</p>
<p style="margin:0 0 12px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#7c3aed 0%,#5b21b6 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(124,58,237,0.4);">elionmusic.com</a></p>
<p style="margin:0 0 10px;"><a href="https://www.elionmusic.com/lions" style="display:inline-block;background:rgba(124,58,237,0.2);color:#6d28d9;border:2px solid #7c3aed;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:14px;">Learn More About Lions</a></p>
<p style="margin:0;font-size:13px;color:#6d28d9;font-style:italic;">P.S. Free collaboration – no fee, no catch. We're looking for peers to grow with.</p>
</div>
</div>
</div>`,
  },
  "elion-brands": {
    subject: "E Lion Music – Sponsor partnership: we add you + link, you help with gear or apparel",
    text: `Hi {{Name}},

E Lion is looking for sponsor partners in recording gear, music software, and apparel. In exchange for store credit or specific items, we add you as an official sponsor on elionmusic.com with a link to your website – real visibility in front of an artist with serious reach.

What we're looking for:
• Recording: studio mics (Neumann U87-level), preamps (Avalon-style), music video cameras & lighting.
• Software: DAWs and artist tools (Logic, Ableton, ACE Studio level), voice-cloning and song-creation (E Lion uses Suno and has 100+ songs on all major platforms – we want tools that help artists level up).
• Apparel: Hawaii brands, full-face animal / graphic tees (The Mountain–style), premium looks (Skingraft, Robin's Jeans–type), and bold statement pieces (Ed Hardy–style bedazzled, leather blazers, etc.).

Why E Lion: 100+ songs on Spotify, Apple Music, Amazon, TikTok, Pandora, and more. Family Feud grand prize (2016, 5 wins) – an estimated 115–145M unique viewers saw the run. 10M+ YouTube views, 1,000+ live performances, 30K+ CDs sold. First Hawaiian family to win Family Feud. High traffic to elionmusic.com and proven fan base. We're not asking for a free ride – we're offering sponsor placement and a link to your site in exchange for product or store credit.

Next step: Reply with what you have in mind (gear, software, apparel). We'll confirm how we'll add you as a sponsor and link to your website, and what E Lion would wear or use.

Links: Full catalog https://www.elionmusic.com/rap/ | Family Feud: Grand Prize https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize | Family Feud: Audition https://www.elionmusic.com/articles/hawaii-kai-family-feud-audition | Family Feud: Appearance https://www.elionmusic.com/articles/hawaii-kai-family-feud-appearance | Family Feud: Next Round https://www.elionmusic.com/articles/hawaii-family-moves-next-round | Bored City Interview https://www.elionmusic.com/articles/bored-city-interview-e-lion | Spotlight Interview https://www.elionmusic.com/articles/spotlight-interview-e-lion | TBK247 Island Roots https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music | Zoho CRM https://www.elionmusic.com/articles/running-multiple-businesses-crm | Fatal House Fire https://www.elionmusic.com/articles/elion-fatal-house-fire | 93.9 The Beat https://www.elionmusic.com/articles/elion-radio-939 | 102.7 Radio https://www.elionmusic.com/articles/elion-radio-1027 | KHON2 Hurricane Iselle https://www.elionmusic.com/articles/hurricane-iselle-sale-day | PopCandies TV https://www.elionmusic.com/articles/popcandies-hollywood-club | E Lion Wiki https://www.elionmusic.com/wiki/ | Learn More About Lions https://www.elionmusic.com/lions | elionmusic.com https://www.elionmusic.com

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#eff6ff;border:2px solid #1e40af;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(30,64,175,0.24),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#1e40af 0%,#1e3a8a 50%,#1d4ed8 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #3b82f6;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">E Lion Music</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Partner with E Lion</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">Your product deserves visibility with an audience that trusts the artist.</p>
</div>
<div style="padding:32px 28px;color:#1e3a8a;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1d4ed8;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #bfdbfe;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 20px;font-size:15px;line-height:1.7;">E Lion is looking for <strong>sponsor partners</strong> in recording gear, music software, and apparel. In exchange for store credit or specific items, we add you as an <strong>official sponsor on elionmusic.com with a link to your website</strong> – real visibility in front of an artist with serious reach.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1d4ed8;text-transform:uppercase;">What we're looking for</p>
<p style="margin:0 0 10px;font-size:14px;line-height:1.65;"><strong>Recording:</strong> Studio mics (Neumann U87-level), preamps (Avalon-style), music video cameras & lighting.</p>
<p style="margin:0 0 10px;font-size:14px;line-height:1.65;"><strong>Software:</strong> DAWs and artist tools (Logic, Ableton, ACE Studio level), voice-cloning and song-creation (E Lion uses Suno and has 100+ songs on all major platforms – we want tools that help artists level up).</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.65;"><strong>Apparel:</strong> Hawaii brands, full-face animal / graphic tees (The Mountain–style), premium looks (Skingraft, Robin's Jeans–type), bold statement pieces (Ed Hardy–style bedazzled, leather blazers, etc.).</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1d4ed8;text-transform:uppercase;">Why E Lion</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;"><strong>100+ songs</strong> on Spotify, Apple Music, Amazon, TikTok, Pandora, and more. <strong>Family Feud grand prize</strong> (2016, 5 wins) – an estimated <strong>115–145M unique viewers</strong> saw the run. <strong>10M+ YouTube views</strong>, <strong>1,000+ live performances</strong>, <strong>30K+ CDs sold</strong>. First Hawaiian family to win Family Feud. High traffic to elionmusic.com. We're offering sponsor placement and a link to your site in exchange for product or store credit.</p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1d4ed8;text-transform:uppercase;">Family Feud articles</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#1d4ed8;">Family Feud: Grand Prize</a> · <a href="https://www.elionmusic.com/articles/hawaii-kai-family-feud-audition" style="color:#1d4ed8;">Family Feud: Audition</a> · <a href="https://www.elionmusic.com/articles/hawaii-kai-family-feud-appearance" style="color:#1d4ed8;">Family Feud: Appearance</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-moves-next-round" style="color:#1d4ed8;">Family Feud: Next Round</a></p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1d4ed8;text-transform:uppercase;">Interviews & press</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/bored-city-interview-e-lion" style="color:#1d4ed8;">Bored City Interview</a> · <a href="https://www.elionmusic.com/articles/spotlight-interview-e-lion" style="color:#1d4ed8;">Spotlight Interview</a> · <a href="https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music" style="color:#1d4ed8;">TBK247 Island Roots & Faith</a> · <a href="https://www.elionmusic.com/articles/running-multiple-businesses-crm" style="color:#1d4ed8;">Zoho CRM</a> · <a href="https://www.elionmusic.com/articles/elion-fatal-house-fire" style="color:#1d4ed8;">Fatal House Fire: A Turning Point</a> · <a href="https://www.elionmusic.com/articles/elion-radio-939" style="color:#1d4ed8;">93.9 The Beat Freestyle</a> · <a href="https://www.elionmusic.com/articles/elion-radio-1027" style="color:#1d4ed8;">102.7 Radio</a> · <a href="https://www.elionmusic.com/articles/hurricane-iselle-sale-day" style="color:#1d4ed8;">KHON2 Hurricane Iselle</a> · <a href="https://www.elionmusic.com/articles/popcandies-hollywood-club" style="color:#1d4ed8;">PopCandies TV</a> · <a href="https://www.elionmusic.com/wiki/" style="color:#1d4ed8;">E Lion Wiki</a></p>
<div style="background:linear-gradient(145deg,#dbeafe 0%,#bfdbfe 100%);border:2px solid #1e40af;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(30,64,175,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#1e3a8a;line-height:1.55;"><strong>Next step:</strong> Reply with what you have in mind (gear, software, apparel). We'll confirm how we add you as a sponsor and link to your website, and what E Lion would wear or use. We typically respond within 24–48 hours. No obligation – let's explore if we're a fit.</p>
<p style="margin:0 0 12px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#2563eb 0%,#1d4ed8 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(37,99,235,0.4);">elionmusic.com</a></p>
<p style="margin:0 0 10px;"><a href="https://www.elionmusic.com/lions" style="display:inline-block;background:rgba(37,99,235,0.15);color:#1d4ed8;border:2px solid #2563eb;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:14px;">Learn More About Lions</a></p>
<p style="margin:0;font-size:13px;color:#1d4ed8;font-style:italic;">P.S. 100+ songs live + Family Feud reach – we add you as a sponsor with a link. Your brand in front of people who pay attention.</p>
</div>
</div>
</div>`,
  },
  "elion-producers": {
    subject: "E Lion Music – Beat request for your beats",
    text: `Hi {{Name}},

E Lion would love to get exclusive access to your beats – and in return you get full credit on every release and across every platform (Spotify, Apple Music, Amazon, TikTok, Pandora, SoundCloud, Deezer, iHeart). Your name stays on the record; your sound gets in front of millions.

Why work with E Lion: 15+ years in music, 1,000+ performances, 10M+ YouTube views, Family Feud grand prize. His style is Holy Hip-Hop – Hawaiian and Hebrew fusion, high-energy, clean, broadcast-friendly. He's serious about quality and serious about giving producers their due. No ghost credits – your name on the liner and in the metadata, period.

Next step: If you're down to send beats for exclusive use, reply and we'll get into format, BPM range, and how you want to be credited. We're ready when you are.

Links: Full catalog https://www.elionmusic.com/rap/ | Family Feud: Grand Prize https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize | Family Feud: Audition https://www.elionmusic.com/articles/hawaii-kai-family-feud-audition | Family Feud: Appearance https://www.elionmusic.com/articles/hawaii-kai-family-feud-appearance | Family Feud: Next Round https://www.elionmusic.com/articles/hawaii-family-moves-next-round | Bored City Interview https://www.elionmusic.com/articles/bored-city-interview-e-lion | Spotlight Interview https://www.elionmusic.com/articles/spotlight-interview-e-lion | TBK247 Island Roots https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music | Zoho CRM https://www.elionmusic.com/articles/running-multiple-businesses-crm | Fatal House Fire https://www.elionmusic.com/articles/elion-fatal-house-fire | 93.9 The Beat https://www.elionmusic.com/articles/elion-radio-939 | 102.7 Radio https://www.elionmusic.com/articles/elion-radio-1027 | KHON2 Hurricane Iselle https://www.elionmusic.com/articles/hurricane-iselle-sale-day | PopCandies TV https://www.elionmusic.com/articles/popcandies-hollywood-club | E Lion Wiki https://www.elionmusic.com/wiki/ | Learn More About Lions https://www.elionmusic.com/lions | elionmusic.com https://www.elionmusic.com

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff7ed;border:2px solid #ea580c;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(234,88,12,0.24),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#ea580c 0%,#c2410c 50%,#9a3412 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #fb923c;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">E Lion Music</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Your beats. Full credit.</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">E Lion wants exclusive access to your beats – you get full credit on every release and every platform.</p>
</div>
<div style="padding:32px 28px;color:#9a3412;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#c2410c;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #fed7aa;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">E Lion would like <strong>exclusive access to your beats</strong> for his recordings. In exchange, <strong>your name is credited on all releases</strong> and across his networks – Spotify, Apple Music, Amazon Music, TikTok, Pandora, SoundCloud, Deezer, iHeartRadio. Your sound gets in front of millions; your name stays on the record.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#c2410c;text-transform:uppercase;">Why work with E Lion</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;"><strong>15+ years</strong> in music, <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>, Family Feud grand prize winner. Style: Holy Hip-Hop – Hawaiian and Hebrew fusion, high-energy, clean, broadcast-friendly. He's serious about quality and serious about giving producers their due – no ghost credits.</p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#c2410c;text-transform:uppercase;">Family Feud articles</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#c2410c;">Family Feud: Grand Prize</a> · <a href="https://www.elionmusic.com/articles/hawaii-kai-family-feud-audition" style="color:#c2410c;">Family Feud: Audition</a> · <a href="https://www.elionmusic.com/articles/hawaii-kai-family-feud-appearance" style="color:#c2410c;">Family Feud: Appearance</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-moves-next-round" style="color:#c2410c;">Family Feud: Next Round</a></p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#c2410c;text-transform:uppercase;">Interviews & press</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/bored-city-interview-e-lion" style="color:#c2410c;">Bored City Interview</a> · <a href="https://www.elionmusic.com/articles/spotlight-interview-e-lion" style="color:#c2410c;">Spotlight Interview</a> · <a href="https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music" style="color:#c2410c;">TBK247 Island Roots & Faith</a> · <a href="https://www.elionmusic.com/articles/running-multiple-businesses-crm" style="color:#c2410c;">Zoho CRM</a> · <a href="https://www.elionmusic.com/articles/elion-fatal-house-fire" style="color:#c2410c;">Fatal House Fire: A Turning Point</a> · <a href="https://www.elionmusic.com/articles/elion-radio-939" style="color:#c2410c;">93.9 The Beat Freestyle</a> · <a href="https://www.elionmusic.com/articles/elion-radio-1027" style="color:#c2410c;">102.7 Radio</a> · <a href="https://www.elionmusic.com/articles/hurricane-iselle-sale-day" style="color:#c2410c;">KHON2 Hurricane Iselle</a> · <a href="https://www.elionmusic.com/articles/popcandies-hollywood-club" style="color:#c2410c;">PopCandies TV</a> · <a href="https://www.elionmusic.com/wiki/" style="color:#c2410c;">E Lion Wiki</a></p>
<div style="background:linear-gradient(145deg,#ffedd5 0%,#fed7aa 100%);border:2px solid #ea580c;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(234,88,12,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#9a3412;line-height:1.55;"><strong>Next step:</strong> Reply if you're down to send beats for exclusive use. We'll get into format (WAV/MP3), BPM range, and how you want to be credited (liner notes, metadata, social tags). We're ready when you are – typically we respond within 24–48 hours and can send a short brief so you know the vibe we're going for.</p>
<p style="margin:0 0 12px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#ea580c 0%,#c2410c 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(234,88,12,0.4);">elionmusic.com</a></p>
<p style="margin:0 0 10px;"><a href="https://www.elionmusic.com/lions" style="display:inline-block;background:rgba(234,88,12,0.15);color:#c2410c;border:2px solid #ea580c;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:14px;">Learn More About Lions</a></p>
<p style="margin:0;font-size:13px;color:#c2410c;font-style:italic;">P.S. Your name on every release – no ghost credits. We take producer credit seriously.</p>
</div>
</div>
</div>`,
  },
  "elion-venue-church": {
    subject: "E Lion – Worship, DJ & youth rap for your church",
    text: `Hi {{Name}},

We'd be honored to bring E Lion to your church – worshiping God through music that meets people where they are. He has worship songs and Holy Hip-Hop, and he can also DJ at one of your events or do a rap set for your youth – flexible to fit your service or conference.

Options: full concert (1hr+ of worship and Holy Hip-Hop plus speaking), keynote (15–45 min with music and meet & greet), youth night rap, or DJ set for a church event. P48X book and Prayer Authority app demos available. 1,000+ performances, Family Feud grand prize, Waikiki Shell and Blaisdell; performed at churches nationwide. Custom set list – you choose which songs fit.

Next step: Reply with your ideal date(s) and what you have in mind (worship set, youth rap, DJ, or concert). We'll send a set list and get down to details.

Links: Full catalog https://www.elionmusic.com/rap/ | Family Feud: Grand Prize https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize | Family Feud: Audition https://www.elionmusic.com/articles/hawaii-kai-family-feud-audition | Family Feud: Appearance https://www.elionmusic.com/articles/hawaii-kai-family-feud-appearance | Family Feud: Next Round https://www.elionmusic.com/articles/hawaii-family-moves-next-round | Bored City Interview https://www.elionmusic.com/articles/bored-city-interview-e-lion | Spotlight Interview https://www.elionmusic.com/articles/spotlight-interview-e-lion | TBK247 Island Roots https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music | Zoho CRM https://www.elionmusic.com/articles/running-multiple-businesses-crm | Fatal House Fire https://www.elionmusic.com/articles/elion-fatal-house-fire | 93.9 The Beat https://www.elionmusic.com/articles/elion-radio-939 | 102.7 Radio https://www.elionmusic.com/articles/elion-radio-1027 | KHON2 Hurricane Iselle https://www.elionmusic.com/articles/hurricane-iselle-sale-day | PopCandies TV https://www.elionmusic.com/articles/popcandies-hollywood-club | E Lion Wiki https://www.elionmusic.com/wiki/ | Learn More About Lions https://www.elionmusic.com/lions | elionmusic.com https://www.elionmusic.com

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fffbeb;border:2px solid #b45309;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(180,83,9,0.22),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#b45309 0%,#92400e 50%,#78350f 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #f59e0b;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">E Lion Music</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Worship, DJ & youth rap for your church</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">Worship songs, Holy Hip-Hop, DJ at your event, or a rap set for your youth – flexible to fit your service.</p>
</div>
<div style="padding:32px 28px;color:#78350f;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#92400e;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #fde68a;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">E Lion would be honored to serve your church – <strong>worshiping God</strong> through music that meets people where they are. He has <strong>worship songs</strong> and Holy Hip-Hop, and can <strong>DJ at one of your events</strong> or do a <strong>rap set for your youth</strong>. Full concert, keynote (15–45 min), youth night, or DJ – you choose. P48X and Prayer Authority demos available.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#92400e;text-transform:uppercase;">Why E Lion</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;"><strong>15+ years</strong> in ministry and music, <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>, Family Feud grand prize winner. Performed at Waikiki Shell, Blaisdell, HebrewFest, and churches nationwide. Custom set list – you choose which songs fit your service.</p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#92400e;text-transform:uppercase;">Family Feud articles</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#92400e;">Family Feud: Grand Prize</a> · <a href="https://www.elionmusic.com/articles/hawaii-kai-family-feud-audition" style="color:#92400e;">Family Feud: Audition</a> · <a href="https://www.elionmusic.com/articles/hawaii-kai-family-feud-appearance" style="color:#92400e;">Family Feud: Appearance</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-moves-next-round" style="color:#92400e;">Family Feud: Next Round</a></p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#92400e;text-transform:uppercase;">Interviews & press</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/bored-city-interview-e-lion" style="color:#92400e;">Bored City Interview</a> · <a href="https://www.elionmusic.com/articles/spotlight-interview-e-lion" style="color:#92400e;">Spotlight Interview</a> · <a href="https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music" style="color:#92400e;">TBK247 Island Roots & Faith</a> · <a href="https://www.elionmusic.com/articles/running-multiple-businesses-crm" style="color:#92400e;">Zoho CRM</a> · <a href="https://www.elionmusic.com/articles/elion-fatal-house-fire" style="color:#92400e;">Fatal House Fire: A Turning Point</a> · <a href="https://www.elionmusic.com/articles/elion-radio-939" style="color:#92400e;">93.9 The Beat Freestyle</a> · <a href="https://www.elionmusic.com/articles/elion-radio-1027" style="color:#92400e;">102.7 Radio</a> · <a href="https://www.elionmusic.com/articles/hurricane-iselle-sale-day" style="color:#92400e;">KHON2 Hurricane Iselle</a> · <a href="https://www.elionmusic.com/articles/popcandies-hollywood-club" style="color:#92400e;">PopCandies TV</a> · <a href="https://www.elionmusic.com/wiki/" style="color:#92400e;">E Lion Wiki</a></p>
<div style="background:#fffbeb;border:2px solid #fde68a;border-radius:18px;padding:18px 20px;margin:0 auto 24px;max-width:520px;">
<p style="margin:0 0 10px;font-size:13px;line-height:1.6;color:#78350f;font-style:italic;">"Thank you for performing at the Movie Night event for New Hope. You're a blessing and I'm always here for you!" <strong style="font-style:normal;color:#92400e;">– Keola Richards (Leader, New Hope Christian Church)</strong></p>
<p style="margin:0;font-size:13px;line-height:1.6;color:#78350f;font-style:italic;">"I never really liked rap until I heard you rap, you're really good. I really believe in you, and I know that I'm not the only one. God's got your back!" <strong style="font-style:normal;color:#92400e;">– Thomas Amarino (President, Gideons Association of Hawaii)</strong></p>
</div>
<div style="background:linear-gradient(145deg,#fef3c7 0%,#fde68a 100%);border:2px solid #b45309;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(180,83,9,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#78350f;line-height:1.55;"><strong>Next step:</strong> Reply with your ideal date(s) and type of event (concert vs keynote). We'll send a set list, credentials, and get down to details – rate, rider, tech needs, and how we can serve your people. We typically respond within 24–48 hours. No obligation – let's see if we're a fit for your calendar.</p>
<p style="margin:0 0 12px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#b45309 0%,#92400e 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(180,83,9,0.4);">elionmusic.com</a></p>
<p style="margin:0 0 10px;"><a href="https://www.elionmusic.com/lions" style="display:inline-block;background:rgba(180,83,9,0.2);color:#92400e;border:2px solid #b45309;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:14px;">Learn More About Lions</a></p>
<p style="margin:0;font-size:13px;color:#92400e;font-style:italic;">P.S. P48X book + Prayer Authority app demos – ministry and music in one package.</p>
</div>
</div>
</div>`,
  },
  "elion-venue-show": {
    subject: "E Lion – Perform at your venue (set list, fanbase, merch)",
    text: `Hi {{Name}},

E Lion is interested in performing at your venue. What you can expect: he'll invite his local fanbase and promote the event so people show up; we're happy to discuss tickets at the door and whether he can bring merch (shirts, sunglasses, hats, USBs, CDs). Full set list available – original Holy Hip-Hop, 1hr+ set with speaking and audience interaction. Custom set list to fit your night.

Why book E Lion: 15+ years, 1,000+ performances, 10M+ YouTube views, Family Feud grand prize. Performed at Waikiki Shell, Blaisdell, HebrewFest and venues across the US. You pick the songs; he brings the energy and the crowd.

Next step: Reply with your venue, date(s), and slot – and let us know your policy on door tickets and merch. We'll send a set list and get down to rider and rate.

Links: Full catalog https://www.elionmusic.com/rap/ | Family Feud: Grand Prize https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize | Family Feud: Audition https://www.elionmusic.com/articles/hawaii-kai-family-feud-audition | Family Feud: Appearance https://www.elionmusic.com/articles/hawaii-kai-family-feud-appearance | Family Feud: Next Round https://www.elionmusic.com/articles/hawaii-family-moves-next-round | Bored City Interview https://www.elionmusic.com/articles/bored-city-interview-e-lion | Spotlight Interview https://www.elionmusic.com/articles/spotlight-interview-e-lion | TBK247 Island Roots https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music | Zoho CRM https://www.elionmusic.com/articles/running-multiple-businesses-crm | Fatal House Fire https://www.elionmusic.com/articles/elion-fatal-house-fire | 93.9 The Beat https://www.elionmusic.com/articles/elion-radio-939 | 102.7 Radio https://www.elionmusic.com/articles/elion-radio-1027 | KHON2 Hurricane Iselle https://www.elionmusic.com/articles/hurricane-iselle-sale-day | PopCandies TV https://www.elionmusic.com/articles/popcandies-hollywood-club | E Lion Wiki https://www.elionmusic.com/wiki/ | Learn More About Lions https://www.elionmusic.com/lions | elionmusic.com https://www.elionmusic.com

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fef2f2;border:2px solid #b91c1c;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(185,28,28,0.26),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#b91c1c 0%,#991b1b 50%,#7f1d1d 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #f87171;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">E Lion Music</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">E Lion – Perform at your venue</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">Set list, local fanbase promo, door tickets &amp; merch – let's make it happen.</p>
</div>
<div style="padding:32px 28px;color:#7f1d1d;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#b91c1c;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #fecaca;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">E Lion is interested in <strong>performing at your venue</strong>. What you can expect: he'll <strong>invite his local fanbase</strong> and promote the event so people show up. We're happy to discuss <strong>tickets at the door</strong> and whether he can <strong>bring merch</strong> – shirts, sunglasses, hats, USBs, CDs. Full set list available; custom to fit your night (1hr+ original Holy Hip-Hop, speaking, audience interaction).</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#b91c1c;text-transform:uppercase;">Reach &amp; credentials</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;">An estimated <strong>115–145 million</strong> have seen his Family Feud grand prize run. <strong>15+ years</strong>, <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>. Waikiki Shell, Blaisdell, HebrewFest and venues nationwide. You pick the songs; he brings the energy and the crowd.</p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#b91c1c;text-transform:uppercase;">Family Feud articles</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#b91c1c;">Family Feud: Grand Prize</a> · <a href="https://www.elionmusic.com/articles/hawaii-kai-family-feud-audition" style="color:#b91c1c;">Family Feud: Audition</a> · <a href="https://www.elionmusic.com/articles/hawaii-kai-family-feud-appearance" style="color:#b91c1c;">Family Feud: Appearance</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-moves-next-round" style="color:#b91c1c;">Family Feud: Next Round</a></p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#b91c1c;text-transform:uppercase;">Interviews & press</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/bored-city-interview-e-lion" style="color:#b91c1c;">Bored City Interview</a> · <a href="https://www.elionmusic.com/articles/spotlight-interview-e-lion" style="color:#b91c1c;">Spotlight Interview</a> · <a href="https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music" style="color:#b91c1c;">TBK247 Island Roots & Faith</a> · <a href="https://www.elionmusic.com/articles/running-multiple-businesses-crm" style="color:#b91c1c;">Zoho CRM</a> · <a href="https://www.elionmusic.com/articles/elion-fatal-house-fire" style="color:#b91c1c;">Fatal House Fire: A Turning Point</a> · <a href="https://www.elionmusic.com/articles/elion-radio-939" style="color:#b91c1c;">93.9 The Beat Freestyle</a> · <a href="https://www.elionmusic.com/articles/elion-radio-1027" style="color:#b91c1c;">102.7 Radio</a> · <a href="https://www.elionmusic.com/articles/hurricane-iselle-sale-day" style="color:#b91c1c;">KHON2 Hurricane Iselle</a> · <a href="https://www.elionmusic.com/articles/popcandies-hollywood-club" style="color:#b91c1c;">PopCandies TV</a> · <a href="https://www.elionmusic.com/wiki/" style="color:#b91c1c;">E Lion Wiki</a></p>
<div style="background:linear-gradient(145deg,#fee2e2 0%,#fecaca 100%);border:2px solid #b91c1c;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(185,28,28,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#7f1d1d;line-height:1.55;"><strong>Next step:</strong> Reply with your venue, date(s), and slot – and your policy on door tickets and merch. We'll send a set list and get down to rider and rate. Let's make it happen.</p>
<p style="margin:0 0 12px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#b91c1c 0%,#991b1b 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(185,28,28,0.4);">elionmusic.com</a></p>
<p style="margin:0 0 10px;"><a href="https://www.elionmusic.com/lions" style="display:inline-block;background:rgba(185,28,28,0.15);color:#b91c1c;border:2px solid #b91c1c;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:14px;">Learn More About Lions</a></p>
<p style="margin:0;font-size:13px;color:#b91c1c;font-style:italic;">P.S. Door tickets &amp; merch (shirts, hats, USBs, CDs) – just ask.</p>
</div>
</div>
</div>`,
  },
  "elion-venue-major": {
    subject: "E Lion – Interested in opening for major artists at your venue",
    text: `Hi {{Name}},

E Lion is interested in opening for major artists at your venue. If you book Blaisdell, Waikiki Shell, Republik, or other stages that host national headliners – he'd love to be considered for opening slots. Full set, local draw, professional on rider and load-in.

Credentials: 15+ years, 1,000+ performances, 10M+ YouTube views, Family Feud grand prize. Already performed at Waikiki Shell and Blaisdell. Music on every major platform.

Next step: If you have (or expect) opening slots for local/regional artists, reply and we'll send credentials and a set list. We'll stay in touch for the right fit.

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f0fdf4;border:2px solid #15803d;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(21,128,61,0.22),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#15803d 0%,#166534 50%,#14532d 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #86efac;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">E Lion Music</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Opening for major artists</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">Interested in opening slots at Blaisdell, Waikiki Shell, Republik &amp; stages that host national headliners.</p>
</div>
<div style="padding:32px 28px;color:#14532d;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#15803d;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #bbf7d0;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">E Lion is <strong>interested in opening for major artists</strong> at your venue. If you book Blaisdell, Waikiki Shell, Republik, or other stages that host national headliners – he'd love to be considered for opening slots. Full set, local draw, professional on rider and load-in.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#15803d;text-transform:uppercase;">Credentials</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;"><strong>15+ years</strong>, <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>, Family Feud grand prize. Already performed at Waikiki Shell and Blaisdell. Music on every major platform.</p>
<div style="background:#dcfce7;border:2px solid #15803d;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(21,128,61,0.15);">
<p style="margin:0 0 14px;font-size:15px;color:#14532d;line-height:1.55;"><strong>Next step:</strong> If you have (or expect) opening slots for local/regional artists, reply and we'll send credentials and a set list. We'll stay in touch for the right fit.</p>
<p style="margin:0 0 12px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#15803d 0%,#166534 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(21,128,61,0.4);">elionmusic.com</a></p>
<p style="margin:0;font-size:13px;color:#15803d;font-style:italic;">P.S. Your stage, his energy – ready when you have a slot.</p>
</div>
</div>
</div>`,
  },
  "elion-venue-dj": {
    subject: "E Lion – DJ E Lion for your event",
    text: `Hi {{Name}},

DJ E Lion is available for your event – he spins his own music and other artists, family-friendly and high-energy. Your crowd gets a clean set and a host who's been on stage 1,000+ times.

Why DJ E Lion: 15+ years in music, 1,000+ performances, 10M+ YouTube views, Family Feud grand prize. He knows how to read a room and keep the vibe right – Holy Hip-Hop and a mix that works for parties, youth events, and any venue that wants energy without the edge. Music on every major platform.

Next step: Reply with your event type, date(s), and duration – we'll get into rate and what you need (PA, tables, etc.). Let's turn it up.

Links: Full catalog https://www.elionmusic.com/rap/ | Family Feud: Grand Prize https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize | Family Feud: Audition https://www.elionmusic.com/articles/hawaii-kai-family-feud-audition | Family Feud: Appearance https://www.elionmusic.com/articles/hawaii-kai-family-feud-appearance | Family Feud: Next Round https://www.elionmusic.com/articles/hawaii-family-moves-next-round | Bored City Interview https://www.elionmusic.com/articles/bored-city-interview-e-lion | Spotlight Interview https://www.elionmusic.com/articles/spotlight-interview-e-lion | TBK247 Island Roots https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music | Zoho CRM https://www.elionmusic.com/articles/running-multiple-businesses-crm | Fatal House Fire https://www.elionmusic.com/articles/elion-fatal-house-fire | 93.9 The Beat https://www.elionmusic.com/articles/elion-radio-939 | 102.7 Radio https://www.elionmusic.com/articles/elion-radio-1027 | KHON2 Hurricane Iselle https://www.elionmusic.com/articles/hurricane-iselle-sale-day | PopCandies TV https://www.elionmusic.com/articles/popcandies-hollywood-club | E Lion Wiki https://www.elionmusic.com/wiki/ | Learn More About Lions https://www.elionmusic.com/lions | elionmusic.com https://www.elionmusic.com

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#1e1b4b;border:2px solid #a78bfa;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(167,139,250,0.35),0 10px 28px -8px rgba(0,0,0,0.12);">
<div style="background:linear-gradient(145deg,#4c1d95 0%,#5b21b6 50%,#6d28d9 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #c4b5fd;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">E Lion Music</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">DJ E Lion – Book your event</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">His own music and more – family-friendly, high-energy. Your crowd gets a clean set and a host who's been on stage 1,000+ times.</p>
</div>
<div style="padding:32px 28px;color:#e9d5ff;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#a78bfa;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #5b21b6;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;"><strong>DJ E Lion</strong> is available to DJ your event – his own music and other artists, family-friendly Holy Hip-Hop vibe. Perfect for parties, youth events, and any venue that wants a clean, high-energy set without the edge.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#a78bfa;text-transform:uppercase;">Why DJ E Lion</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;"><strong>15+ years</strong> in music, <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>, Family Feud grand prize winner (2016). He knows how to read a room and keep the vibe right.</p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#a78bfa;text-transform:uppercase;">Family Feud articles</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#a78bfa;">Family Feud: Grand Prize</a> · <a href="https://www.elionmusic.com/articles/hawaii-kai-family-feud-audition" style="color:#a78bfa;">Family Feud: Audition</a> · <a href="https://www.elionmusic.com/articles/hawaii-kai-family-feud-appearance" style="color:#a78bfa;">Family Feud: Appearance</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-moves-next-round" style="color:#a78bfa;">Family Feud: Next Round</a></p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#a78bfa;text-transform:uppercase;">Interviews & press</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/bored-city-interview-e-lion" style="color:#a78bfa;">Bored City Interview</a> · <a href="https://www.elionmusic.com/articles/spotlight-interview-e-lion" style="color:#a78bfa;">Spotlight Interview</a> · <a href="https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music" style="color:#a78bfa;">TBK247 Island Roots & Faith</a> · <a href="https://www.elionmusic.com/articles/running-multiple-businesses-crm" style="color:#a78bfa;">Zoho CRM</a> · <a href="https://www.elionmusic.com/articles/elion-fatal-house-fire" style="color:#a78bfa;">Fatal House Fire: A Turning Point</a> · <a href="https://www.elionmusic.com/articles/elion-radio-939" style="color:#a78bfa;">93.9 The Beat Freestyle</a> · <a href="https://www.elionmusic.com/articles/elion-radio-1027" style="color:#a78bfa;">102.7 Radio</a> · <a href="https://www.elionmusic.com/articles/hurricane-iselle-sale-day" style="color:#a78bfa;">KHON2 Hurricane Iselle</a> · <a href="https://www.elionmusic.com/articles/popcandies-hollywood-club" style="color:#a78bfa;">PopCandies TV</a> · <a href="https://www.elionmusic.com/wiki/" style="color:#a78bfa;">E Lion Wiki</a></p>
<div style="background:#312e81;border:2px solid #a78bfa;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(0,0,0,0.4);">
<p style="margin:0 0 14px;font-size:15px;color:#e9d5ff;line-height:1.55;"><strong>Next step:</strong> Reply with your event type, date(s), and duration. We'll get into rate and what you need (PA, tables, setup time). We typically respond within 24–48 hours – let's turn it up.</p>
<p style="margin:0 0 12px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#7c3aed 0%,#5b21b6 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(124,58,237,0.4);">elionmusic.com</a></p>
<p style="margin:0 0 10px;"><a href="https://www.elionmusic.com/lions" style="display:inline-block;background:rgba(167,139,250,0.2);color:#a78bfa;border:2px solid #a78bfa;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:14px;">Learn More About Lions</a></p>
<p style="margin:0;font-size:13px;color:#a78bfa;font-style:italic;">P.S. 1,000+ stages – he knows how to read a room and keep the vibe right.</p>
</div>
</div>
</div>`,
  },
  "wedding-couples": {
    subject: "Plan your dream Hawaiian wedding – Hawaii Wedding Plans",
    text: `Hi {{Name}},

Plan your perfect Hawaiian wedding with Hawaii Wedding Plans – complete wedding planning for Oahu, Maui, Kauai, and Big Island. Choose your island, select venues and vendors (photographers, caterers, officiants, entertainment), and build your package with our interactive planner and AI chatbot.

Services: Island pages, venue selection, photographer & videographer portfolios, catering, florals, officiants, entertainment, themes (beach, underwater, mermaid, pirate), 7-day package builder, engagement rings, fashion, honeymoon, bachelor/bachelorette party resources.

Planning articles (full links):
• Why Hawaii for your destination wedding: https://www.hawaiiweddingplans.com/articles/why-hawaii-destination-wedding.php
• How to use our website: https://www.hawaiiweddingplans.com/articles/how-to-use-wedding-planning-website.php
• Should we get married?: https://www.hawaiiweddingplans.com/articles/should-we-get-married.php
• Best books for newlyweds: https://www.hawaiiweddingplans.com/articles/best-books-to-read.php
• Best bachelor party in Hawaii: https://www.hawaiiweddingplans.com/articles/how-to-throw-best-bachelor-party-hawaii.php
• Best bachelorette party in Hawaii: https://www.hawaiiweddingplans.com/articles/how-to-throw-best-bachelorette-party-hawaii.php
• How to pick best men & bridesmaids: https://www.hawaiiweddingplans.com/articles/how-to-pick-best-men-bridesmaids.php
• Who not to invite to your wedding: https://www.hawaiiweddingplans.com/articles/who-not-to-invite-to-wedding.php

Start planning: HawaiiWeddingPlans.com | (808) 994-9034 | Email: coralcrowntechnologies@gmail.com

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fdf2f8;border:2px solid #be185d;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(190,24,93,0.2),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#be185d 0%,#9d174d 45%,#831843 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #f472b6;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:14px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;opacity:0.95;">Hawaii Wedding Plans</p>
<h1 style="margin:0;font-size:28px;font-weight:800;letter-spacing:-0.02em;line-height:1.2;">Plan your dream Hawaiian wedding</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">Oahu, Maui, Kauai & Big Island – venues, vendors, and one place to plan it all.</p>
</div>
<div style="padding:32px 28px;color:#831843;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#be185d;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #fbcfe8;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">Whether you are dreaming of a beach ceremony on Oahu, a romantic sunset on Maui, lush Kauai, or the Big Island's dramatic landscapes, <strong>Hawaii Wedding Plans</strong> helps you plan from start to finish. Choose your island, select venues and vendors, and build your package with our interactive planner and AI-powered chatbot.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#be185d;text-transform:uppercase;">What you get</p>
<ul style="margin:0 auto 22px;padding-left:22px;font-size:14px;line-height:1.75;display:table;text-align:left;">
<li style="margin-bottom:8px;"><strong>Island pages:</strong> Oahu, Maui, Kauai, Big Island – venues, photographers, videographers, caterers, officiants, entertainment</li>
<li style="margin-bottom:8px;"><strong>Interactive planner:</strong> Build your package, see real-time pricing, use the AI chatbot for recommendations</li>
<li style="margin-bottom:8px;"><strong>Themes:</strong> Beach, tropical, underwater, mermaid, pirate, and more</li>
<li style="margin-bottom:8px;"><strong>7-day package builder:</strong> Pre-designed options; English and Japanese</li>
<li style="margin-bottom:0;"><strong>Resources:</strong> Engagement rings, fashion, honeymoon, bachelor/bachelorette parties, planning articles</li>
</ul>
<p style="margin:26px 0 12px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#be185d;text-transform:uppercase;">Planning articles – guides for every step</p>
<ul style="margin:0 auto 24px;padding-left:22px;font-size:14px;line-height:2;display:table;text-align:left;list-style:disc;">
<li style="margin-bottom:6px;"><a href="https://www.hawaiiweddingplans.com/articles/why-hawaii-destination-wedding.php" style="color:#be185d;font-weight:600;text-decoration:none;">Why Hawaii for your destination wedding</a></li>
<li style="margin-bottom:6px;"><a href="https://www.hawaiiweddingplans.com/articles/how-to-use-wedding-planning-website.php" style="color:#be185d;font-weight:600;text-decoration:none;">How to use our website</a></li>
<li style="margin-bottom:6px;"><a href="https://www.hawaiiweddingplans.com/articles/should-we-get-married.php" style="color:#be185d;font-weight:600;text-decoration:none;">Should we get married?</a></li>
<li style="margin-bottom:6px;"><a href="https://www.hawaiiweddingplans.com/articles/best-books-to-read.php" style="color:#be185d;font-weight:600;text-decoration:none;">Best books for newlyweds</a></li>
<li style="margin-bottom:6px;"><a href="https://www.hawaiiweddingplans.com/articles/how-to-throw-best-bachelor-party-hawaii.php" style="color:#be185d;font-weight:600;text-decoration:none;">Best bachelor party in Hawaii</a></li>
<li style="margin-bottom:6px;"><a href="https://www.hawaiiweddingplans.com/articles/how-to-throw-best-bachelorette-party-hawaii.php" style="color:#be185d;font-weight:600;text-decoration:none;">Best bachelorette party in Hawaii</a></li>
<li style="margin-bottom:6px;"><a href="https://www.hawaiiweddingplans.com/articles/how-to-pick-best-men-bridesmaids.php" style="color:#be185d;font-weight:600;text-decoration:none;">How to pick best men & bridesmaids</a></li>
<li style="margin-bottom:6px;"><a href="https://www.hawaiiweddingplans.com/articles/who-not-to-invite-to-wedding.php" style="color:#be185d;font-weight:600;text-decoration:none;">Who not to invite to your wedding</a></li>
</ul>
<div style="background:linear-gradient(145deg,#fce7f3 0%,#fbcfe8 100%);border:2px solid #be185d;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(190,24,93,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#831843;line-height:1.55;"><strong>Start planning:</strong> Visit HawaiiWeddingPlans.com to choose your island and build your package. Need help? Call <strong>(808) 994-9034</strong> or <a href="mailto:coralcrowntechnologies@gmail.com" style="color:#be185d;">email us</a>. Making dreams come true – we are here for you.</p>
<p style="margin:0;"><a href="https://www.hawaiiweddingplans.com" style="display:inline-block;background:linear-gradient(145deg,#be185d 0%,#9d174d 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(190,24,93,0.4);">HawaiiWeddingPlans.com</a></p>
</div>
</div>
</div>`,
  },
  "wedding-contractors": {
    subject: "Get featured on Hawaii Wedding Plans – Submit your service or venue",
    text: `Hi {{Name}},

Hawaii Wedding Plans is the go-to wedding planning platform for Oahu, Maui, Kauai, and Big Island. We would love to feature your service or venue – photographers, videographers, caterers, florists, officiants, musicians/DJs, planners, venues, transportation, and more.

Submit your business: https://hawaiiweddingplans.com/submit/index.php – we will review and get back to you. Or email us your information (coralcrowntechnologies@gmail.com).

Categories we feature: Venues, photographers, videographers, caterers, florists, officiants, musicians/DJs, wedding planners, transportation, entertainment, themes (beach, underwater, mermaid, pirate). Couples use our interactive planner and AI chatbot to build packages – your listing gets in front of couples planning their dream Hawaii wedding.

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f0fdf4;border:2px solid #15803d;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(21,128,61,0.22),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#15803d 0%,#166534 45%,#14532d 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #22c55e;text-shadow:0 1px 2px rgba(0,0,0,0.15);text-align:center;">
<p style="margin:0 0 8px;font-size:14px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;opacity:0.95;">Hawaii Wedding Plans</p>
<h1 style="margin:0;font-size:28px;font-weight:800;letter-spacing:-0.02em;line-height:1.2;">Get featured – submit your service or venue</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">Join our directory and reach couples planning their dream Hawaiian wedding.</p>
</div>
<div style="padding:32px 28px;color:#14532d;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#15803d;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #86efac;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;"><strong>Hawaii Wedding Plans</strong> is the complete wedding planning platform for Oahu, Maui, Kauai, and Big Island. Couples choose their island, select venues and vendors, and build packages with our interactive planner and AI chatbot. We would love to <strong>feature your business</strong> – venues, photographers, videographers, caterers, florists, officiants, musicians/DJs, planners, transportation, entertainment, and more.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#15803d;text-transform:uppercase;">Why get listed</p>
<ul style="margin:0 auto 22px;padding-left:22px;font-size:14px;line-height:1.75;display:table;text-align:left;">
<li style="margin-bottom:8px;">Couples browse by island and category – your listing is front and center</li>
<li style="margin-bottom:8px;">Unique, easy-to-use site: interactive vendor selection, real-time package building, AI chatbot for recommendations</li>
<li style="margin-bottom:8px;">Categories: Venues, photographers, videographers, caterers, florists, officiants, entertainment, themes (beach, underwater, mermaid, pirate)</li>
<li style="margin-bottom:0;">Celebrity appearances, catering, specialty services – we want to grow our directory with quality vendors like you</li>
</ul>
<div style="background:linear-gradient(145deg,#dcfce7 0%,#bbf7d0 100%);border:2px solid #15803d;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(21,128,61,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#14532d;line-height:1.55;"><strong>Submit your business:</strong> Use our quick submit form – we will review your listing and get back to you. Or send your business name, service type, contact info, website, location, and description by <a href="mailto:coralcrowntechnologies@gmail.com" style="color:#15803d;">email</a>. No obligation – we are building the go-to resource for Hawaii weddings and would love to include you.</p>
<p style="margin:0 0 10px;"><a href="https://hawaiiweddingplans.com/submit/index.php" style="display:inline-block;background:linear-gradient(145deg,#15803d 0%,#166534 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(21,128,61,0.4);">Submit – Hawaii Wedding Plans</a></p>
<p style="margin:0;font-size:13px;color:#166534;">Or <a href="mailto:coralcrowntechnologies@gmail.com" style="color:#15803d;">email us</a> | (808) 994-9034</p>
</div>
</div>
</div>`,
  },
  "p48x-personal": {
    subject: "P48X – Transform your mind with Philippians 4:8 (book, app & audiobook)",
    text: `Hi {{Name}},

P48X – Philippians 4:8 Expounded. In a world that constantly shifts, this book is an unshakable foundation. Each chapter explores one of the virtues Paul called us to meditate on: Purity, Truth, Praiseworthiness, Wholesomeness, Excellence, Admirable, Peace, Honor, and Lovely things – and how they show up in the lives of those who walked with God.

Why it helps: What you think shapes who you become. P48X gives you a daily path to center your mind on what is true, honorable, pure, and lovely – and the companion app makes it practical. Connect your Google Calendar; the app creates special links that take you to your reflection page. Log in with Google, get a randomized prompt for the day, journal and reflect. There's also about 15 hours of audiobook in the author's voice (cloned with ElevenLabs) – read it, listen to it, or do both.

Where to get it: Barnes & Noble, Apple Books, Smashwords, Rakuten Kobo. Sign up for the free P48X app (daily reflections, journal) at Prayer Authority – use your Google account.

Direct link to P48X page (book info + app): https://www.prayerauthority.com/prayers/p48x.php

Demo: How to set up your daily P48X reflection schedule with Google Calendar: https://www.youtube.com/watch?v=tvY4niTN4jA

Book & app: https://www.prayerauthority.com/prayers/p48x.php | Barnes & Noble https://www.barnesandnoble.com/w/p48x-eric-schaefer/1147510577?ean=2940181543621 | Apple Books https://books.apple.com/us/book/p48x/id6746675717 | Smashwords https://www.smashwords.com/books/view/1780908 | Rakuten Kobo https://www.kobo.com/us/en/ebook/p48x

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:Georgia,'Times New Roman',serif;max-width:600px;margin:0 auto;background:linear-gradient(180deg,#fefce8 0%,#fef9c3 100%);border:2px solid #ca8a04;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(202,138,4,0.25),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#a16207 0%,#854d0e 45%,#713f12 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #eab308;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.95;">P48X · Philippians 4:8 Expounded</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.02em;line-height:1.2;">Transform your mind & spirit</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">Book, interactive app, and ~15 hours of audiobook in the author's voice.</p>
</div>
<div style="padding:32px 28px;color:#422006;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#a16207;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #fde047;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">In a world that constantly shifts, <strong>P48X</strong> offers an unshakable foundation rooted in Philippians 4:8. Each chapter explores one of the virtues Paul exhorted us to meditate on – Purity, Truth, Praiseworthiness, Wholesomeness, Excellence, Admirable, Peace, Honor, and Lovely things – and how they manifest in the lives of those who walked with God.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#a16207;text-transform:uppercase;">Why this book will help you</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;">What you think shapes who you become. Focusing your mind on what is <strong>true, honorable, pure, and lovely</strong> brings peace and clarity. P48X is both a deep read and a daily practice – and the <strong>free P48X app</strong> makes it practical: connect your Google Calendar, get special links to your reflection page, log in with Google, and receive a randomized prompt each day to journal and reflect.</p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#a16207;text-transform:uppercase;">Audiobook option</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.7;">Prefer to listen? There's about <strong>15 hours of audiobook</strong> in the author's voice (cloned with ElevenLabs). Read the book, listen to it, or do both – your choice.</p>
<div style="background:#fff;border:2px solid #eab308;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(202,138,4,0.15);">
<p style="margin:0 0 10px;"><a href="https://www.prayerauthority.com/prayers/p48x.php" style="display:inline-block;background:linear-gradient(145deg,#a16207 0%,#854d0e 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(202,138,4,0.4);">P48X page – book &amp; app</a></p>
<p style="margin:0 0 12px;font-size:15px;color:#422006;line-height:1.55;"><strong>Get the book:</strong> <a href="https://www.barnesandnoble.com/w/p48x-eric-schaefer/1147510577?ean=2940181543621" style="color:#a16207;">Barnes &amp; Noble</a> · <a href="https://books.apple.com/us/book/p48x/id6746675717" style="color:#a16207;">Apple Books</a> · <a href="https://www.smashwords.com/books/view/1780908" style="color:#a16207;">Smashwords</a> · <a href="https://www.kobo.com/us/en/ebook/p48x" style="color:#a16207;">Rakuten Kobo</a></p>
<p style="margin:0 0 12px;font-size:15px;color:#422006;line-height:1.55;"><strong>Use the app:</strong> <a href="https://www.prayerauthority.com/prayers/p48x.php" style="color:#a16207;">P48X Reflections at Prayer Authority</a> – sign up with Google, set up daily prompts, journal and reflect.</p>
<p style="margin:0 0 10px;"><a href="https://www.youtube.com/watch?v=tvY4niTN4jA" style="display:inline-block;background:rgba(202,138,4,0.2);color:#a16207;border:2px solid #ca8a04;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:14px;">Watch: How to set up P48X with Google Calendar</a></p>
<p style="margin:0;font-size:13px;color:#713f12;font-style:italic;">P.S. Your path to a life of profound peace, purpose, and clarity is waiting.</p>
</div>
</div>
</div>`,
  },
  "p48x-physical-distributors": {
    subject: "P48X – Wholesale printed copies for your store (Eric Schaefer / E Lion)",
    text: `Hi {{Name}},

We're reaching out to stores and physical distributors who may want to carry P48X – Philippians 4:8 Expounded by Eric Schaefer. You can order printed copies wholesale and mark up the book to sell in your store.

About the author: Eric is also E Lion – Holy Hip-Hop artist from Hawaii, Family Feud grand prize winner (2016, first Hawaiian family to win 5 consecutive episodes), founder of Prayer Authority, and author of P48X. His music is at elionmusic.com – same heart for faith, excellence, and reaching people. The book has strong appeal for faith-based retailers, churches, and general inspirational readers.

P48X page (book & app info): https://www.prayerauthority.com/prayers/p48x.php

Family Feud coverage: https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize

If you're interested in wholesale orders for your store, reply to this email and we'll send pricing and order details.

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fefce8;border:2px solid #ca8a04;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(202,138,4,0.25),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#854d0e 0%,#713f12 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #eab308;text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.95;">P48X · Wholesale for retailers</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.02em;line-height:1.2;">Carry P48X in your store</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">Order printed copies wholesale and mark up to sell. Philippians 4:8 Expounded by Eric Schaefer.</p>
</div>
<div style="padding:32px 28px;color:#422006;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#a16207;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #fde047;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">We're reaching out to <strong>physical distributors and retail stores</strong> who may want to carry <strong>P48X – Philippians 4:8 Expounded</strong>. You can order printed copies wholesale and mark up the book to sell in your store. Ideal for faith-based retailers, churches, and inspirational book sections.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#a16207;text-transform:uppercase;">About the author</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;">Eric Schaefer is also <strong>E Lion</strong> – Holy Hip-Hop artist from Hawaii, <strong>Family Feud grand prize winner</strong> (2016 – first Hawaiian family to win 5 consecutive episodes), founder of Prayer Authority, and author of P48X. His music and brand at <a href="https://www.elionmusic.com" style="color:#a16207;">elionmusic.com</a> share the same heart for faith, excellence, and reaching people – so your customers who know E Lion or Family Feud will recognize the name.</p>
<p style="margin:0 0 10px;font-size:14px;line-height:1.6;"><a href="https://www.prayerauthority.com/prayers/p48x.php" style="color:#a16207;">P48X page – book &amp; app</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#a16207;">Family Feud: Grand Prize article</a></p>
<div style="background:#fff;border:2px solid #eab308;border-radius:18px;padding:24px 26px;margin:28px 0;">
<p style="margin:0 0 14px;font-size:15px;color:#422006;line-height:1.55;"><strong>Next step:</strong> If you're interested in wholesale orders for your store, reply to this email and we'll send pricing, minimums, and order details. We typically respond within 24–48 hours.</p>
<p style="margin:0;font-size:13px;color:#713f12;">Coral Crown Solutions | <a href="mailto:coralcrowntechnologies@gmail.com" style="color:#713f12;">Email us</a> | (808) 393-0153</p>
</div>
</div>
</div>`,
  },
  "p48x-affiliate-sellers": {
    subject: "P48X – Partner with us: 15% on direct book sales (affiliate sellers)",
    text: `Hi {{Name}},

We're looking for people who are willing to push P48X – Philippians 4:8 Expounded – and we want to reward you for it. If you sell the book directly and the buyer emails us with a receipt showing they got it from you, you get 15% off your own book purchases (or equivalent credit). One simple rule: the person says they got it from you and emails us with the receipt.

P48X is the ultimate guide to transforming your mind and spirit, rooted in Philippians 4:8. It's on Barnes & Noble, Apple Books, Smashwords, and Rakuten Kobo. There's also a free P48X app at Prayer Authority (daily reflections, Google Calendar integration, journal) and about 15 hours of audiobook in the author's voice.

Direct link to P48X page (book & app): https://www.prayerauthority.com/prayers/p48x.php

If you'd like to partner with us as an affiliate seller, reply to this email and we'll send you the exact terms and how to track referrals.

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f0fdf4;border:2px solid #15803d;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(21,128,61,0.22),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#15803d 0%,#166534 45%,#14532d 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #22c55e;text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.95;">P48X · Affiliate sellers</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.02em;line-height:1.2;">Partner with us – 15% on direct sales</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">We're looking for people who want to push P48X. You get 15% off book purchases when your referral emails us with a receipt.</p>
</div>
<div style="padding:32px 28px;color:#14532d;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#15803d;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #86efac;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">We're looking for <strong>affiliate sellers</strong> who are willing to push <strong>P48X – Philippians 4:8 Expounded</strong>. Here's the deal: if you sell the book directly and that person emails us with a receipt showing they got it from you, <strong>you get 15% off your own book purchases</strong> (or equivalent credit). One simple rule: the buyer says they got it from you and emails us with the receipt.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#15803d;text-transform:uppercase;">What you're promoting</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;">P48X is the ultimate guide to transforming your mind and spirit, rooted in Philippians 4:8. Available at <a href="https://www.barnesandnoble.com/w/p48x-eric-schaefer/1147510577?ean=2940181543621" style="color:#15803d;">Barnes &amp; Noble</a>, <a href="https://books.apple.com/us/book/p48x/id6746675717" style="color:#15803d;">Apple Books</a>, <a href="https://www.smashwords.com/books/view/1780908" style="color:#15803d;">Smashwords</a>, and <a href="https://www.kobo.com/us/en/ebook/p48x" style="color:#15803d;">Rakuten Kobo</a>. There's also a free <strong>P48X app</strong> at <a href="https://www.prayerauthority.com/prayers/p48x.php" style="color:#15803d;">Prayer Authority</a> (daily reflections, Google Calendar, journal) and about 15 hours of audiobook in the author's voice.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.6;"><a href="https://www.prayerauthority.com/prayers/p48x.php" style="color:#15803d;font-weight:600;">Direct link: P48X page (book &amp; app)</a></p>
<div style="background:linear-gradient(145deg,#dcfce7 0%,#bbf7d0 100%);border:2px solid #15803d;border-radius:18px;padding:24px 26px;margin:28px 0;">
<p style="margin:0 0 14px;font-size:15px;color:#14532d;line-height:1.55;"><strong>Next step:</strong> If you'd like to partner with us as an affiliate seller, reply to this email and we'll send you the exact terms and how to track referrals. We're building a team of people who believe in this book and want to spread it.</p>
<p style="margin:0;font-size:13px;color:#166534;">Coral Crown Solutions | <a href="mailto:coralcrowntechnologies@gmail.com" style="color:#166534;">Email us</a> | (808) 393-0153</p>
</div>
</div>
</div>`,
  },
  "healing-herbals-smoke-shop": {
    subject: "Healing Herbals Wholesale 2025 – Kava, Blue Lotus, Kanna, Kratom | Smoke shop partner",
    text: `Hi {{Name}},

Healing Herbals Kava Collection – top-quality kava and botanicals from Vanuatu, Fiji, Samoa, and Hawaii. Kava (Piper methysticum) has been sought after for hundreds of years for relaxation, decreased anxiety, and mental clarity without the dulling effects of alcohol.

Why partner with Healing Herbals? Premium, lab-tested botanicals and beverages that sell fast: Kava vapes & products (our #1 seller), Kanna sprays & extracts, Blue Lotus, Kratom extracts & powders, exclusive Korthal alcohol-free THC/CBD/Kratom/Kava drinks. High margins (100–150% on wholesale), private labeling, custom blends, low MOQ, fast delivery.

Wholesale offers: 50% OFF at healingherbals.store – Code: Storefront3 (min $500 before discount). Code applies to packaged products and extracts under 1 g / herbs under 1 oz; for bulk see pricing doc below. Zelle to (631) 871-7641 for extra 2.5% off. We prefer $250 MOQ.

Our two most popular nicotine replacement products (see images): Kava Extract Juice and Blue Lotus Extract Juice – vape-ready, replaceable tops, refillable. Wholesale $27.50 each, suggested retail $50 each.

Catalogs: 2025 product catalog (packaged & finished goods) – https://acrobat.adobe.com/id/urn:aaid:sc:VA6C2:f8168b99-2269-4e2b-8887-7781b959a710 | Bulk herbs & extracts (Kanna, Kava, Blue Lotus, Amanita, Kratom & more) – https://docs.google.com/document/d/1TB1pHCUEMJsMYjuiMs380r1Lly5bfE3UqCVKzxUZWB0/edit?usp=drivesdk | Korthal (exclusive wholesale) – https://acrobat.adobe.com/id/urn:aaid:sc:VA6C2:a6d3213b-821e-4c3a-b6ae-506bd5fa1587

To order wholesale: Robert "Robbie" Lattig (631) 871-7641 or E-mail for Wholesale: Herbalhealingsmarketing@gmail.com. Local Oahu: Eric (808) 393-0153.

Mahalo nui loa! Eric & Robbie – Healing Herbals Team`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f0fdf4;border:2px solid #15803d;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(21,128,61,0.22),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#15803d 0%,#166534 45%,#14532d 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #22c55e;text-shadow:0 1px 2px rgba(0,0,0,0.15);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">Healing Herbals Wholesale 2025</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Premium botanicals for smoke shops</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">Kava Collection · Blue Lotus · Kanna · Kratom · Korthal. Lab-tested, high margins.</p>
</div>
<div style="padding:32px 28px;color:#14532d;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#15803d;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #86efac;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;"><strong>Healing Herbals Kava Collection</strong> – top-quality kava and botanicals from Vanuatu, Fiji, Samoa, and Hawaii. Kava (Piper methysticum) has been sought after for hundreds of years for relaxation, decreased anxiety, and mental clarity without the dulling effects of alcohol.</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">Why partner with us? Premium, lab-tested botanicals that sell fast: <strong>Kava vapes & products</strong> (our #1 seller), <strong>Kanna</strong> sprays & extracts, <strong>Blue Lotus</strong>, <strong>Kratom</strong> extracts & powders, exclusive <strong>Korthal</strong> alcohol-free drinks. High margins (100–150% on wholesale), private labeling, custom blends, low MOQ, fast delivery.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#15803d;text-transform:uppercase;">Wholesale offers</p>
<ul style="margin:0 auto 16px;padding-left:22px;font-size:14px;line-height:1.75;display:table;text-align:left;">
<li style="margin-bottom:6px;"><strong>50% OFF</strong> at healingherbals.store – Code: <strong>Storefront3</strong> (min $500 before discount). Applies to packaged products and extracts under 1 g / herbs under 1 oz; for bulk see links below.</li>
<li style="margin-bottom:6px;"><strong>Extra 2.5% OFF</strong> with Zelle to (631) 871-7641</li>
<li style="margin-bottom:0;">We prefer $250 MOQ. Direct invoice available.</li>
</ul>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#15803d;text-transform:uppercase;">Our two most popular nicotine replacement products</p>
<table style="margin:0 auto 22px;border-collapse:collapse;font-size:13px;text-align:left;">
<tr style="background:#dcfce7;"><th style="padding:10px 14px;border:1px solid #86efac;">Product</th><th style="padding:10px 14px;border:1px solid #86efac;">Wholesale</th><th style="padding:10px 14px;border:1px solid #86efac;">Retail</th></tr>
<tr><td style="padding:10px 14px;border:1px solid #86efac;">Kava Extract Juice (vape, replaceable top, refillable)</td><td style="padding:10px 14px;border:1px solid #86efac;">$27.50</td><td style="padding:10px 14px;border:1px solid #86efac;">$50</td></tr>
<tr><td style="padding:10px 14px;border:1px solid #86efac;">Blue Lotus Extract Juice (vape, replaceable top, refillable)</td><td style="padding:10px 14px;border:1px solid #86efac;">$27.50</td><td style="padding:10px 14px;border:1px solid #86efac;">$50</td></tr>
</table>
<p style="margin:24px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#15803d;text-transform:uppercase;">Wholesale / smoke shop – full product list</p>
<table style="margin:0 auto 16px;border-collapse:collapse;font-size:12px;text-align:left;width:100%;max-width:560px;">
<tr style="background:#dcfce7;"><th style="padding:8px 10px;border:1px solid #86efac;">Category / Product</th><th style="padding:8px 10px;border:1px solid #86efac;">Wholesale</th><th style="padding:8px 10px;border:1px solid #86efac;">Retail</th></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;font-weight:600;background:#ecfdf5;">Kanna</td><td colspan="2" style="padding:6px 10px;border:1px solid #86efac;"></td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Loose leaf rough cut or milled (kilo / lb)</td><td style="padding:6px 10px;border:1px solid #86efac;">$225 / $145</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">2.8% loose leaf (kilo / lb)</td><td style="padding:6px 10px;border:1px solid #86efac;">$545 / $325</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Resin / Channa Budder (25g–10 kg)</td><td style="padding:6px 10px;border:1px solid #86efac;">$15/g–$1.45/g</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">2.5%–8.6% white / beige / high-alkaloid extracts</td><td style="padding:6px 10px;border:1px solid #86efac;">From $165–$995</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Nasal sprays (regular / 2x)</td><td style="padding:6px 10px;border:1px solid #86efac;">$12.50 / $17.50</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Kanna vape juice (herb / extract infused L)</td><td style="padding:6px 10px;border:1px solid #86efac;">$95 / $525</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;font-weight:600;background:#ecfdf5;">Blue Lotus</td><td colspan="2" style="padding:6px 10px;border:1px solid #86efac;"></td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Flower (lb / kilo; 5–100 kg tiered)</td><td style="padding:6px 10px;border:1px solid #86efac;">$60 / $99; from $95–$80/kg</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Powdered extract (kilo / lb / 250g / 100g)</td><td style="padding:6px 10px;border:1px solid #86efac;">$275 / $190 / $135 / $95</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Resin extract</td><td style="padding:6px 10px;border:1px solid #86efac;">$379.99/kg–$100/100g</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Refined high potency extract</td><td style="padding:6px 10px;border:1px solid #86efac;">$2,995/kg–$75/10g</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Vape juice (gallon / ½ gal); medium/high potency ½ gal</td><td style="padding:6px 10px;border:1px solid #86efac;">$225 / $145; $575 / $975</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Liquid extract 20% (gal–100 gal)</td><td style="padding:6px 10px;border:1px solid #86efac;">$325–$250/gal</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">White Lotus flower / extract; Red Lotus; 98% Nuciferine</td><td style="padding:6px 10px;border:1px solid #86efac;">From $70–$545</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;font-weight:600;background:#ecfdf5;">Kratom</td><td colspan="2" style="padding:6px 10px;border:1px solid #86efac;"></td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">81% / 70% freebase extract (100g / kg)</td><td style="padding:6px 10px;border:1px solid #86efac;">$750–$3,895; $575–$3,400</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">70% salt base (kg)</td><td style="padding:6px 10px;border:1px solid #86efac;">$4,200</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Red / Green / White vein (kg)</td><td style="padding:6px 10px;border:1px solid #86efac;">$7.49–$25</td><td style="padding:6px 10px;border:1px solid #86efac;">$15–$50</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">7-OH extract; 7-OH tablets 20mg (50–1000)</td><td style="padding:6px 10px;border:1px solid #86efac;">Inquire; $195–$1,150</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;font-weight:600;background:#ecfdf5;">Kava</td><td colspan="2" style="padding:6px 10px;border:1px solid #86efac;"></td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">85% / 70% kavalactone paste (kg / lb / 250g / 100g)</td><td style="padding:6px 10px;border:1px solid #86efac;">$1,645–$325; $1,385–$275</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Potent extract powder; instant 11.4% / heady 6.4% / body 6.6%</td><td style="padding:6px 10px;border:1px solid #86efac;">$515/kg–$105; $499–$195</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Micronized; medium grind (Fiji, Vanuatu, Tonga, Waka)</td><td style="padding:6px 10px;border:1px solid #86efac;">$135/lb–$225/kg; $90–$100/kg</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Liquid extract 5% (gal–100 gal); leaf per kg</td><td style="padding:6px 10px;border:1px solid #86efac;">$325–$250/gal; $185–$135</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;font-weight:600;background:#ecfdf5;">Amanita Muscaria</td><td colspan="2" style="padding:6px 10px;border:1px solid #86efac;"></td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Pantherina; Premium Closed Caps; Regalis; Grade A/B</td><td style="padding:6px 10px;border:1px solid #86efac;">$250–$1,295; $375–$1,050; $225–$775; $115–$250</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Tincture 1L; extract (lb / kg)</td><td style="padding:6px 10px;border:1px solid #86efac;">$425; $1,500 / $2,350</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;font-weight:600;background:#ecfdf5;">Alternative herbs</td><td colspan="2" style="padding:6px 10px;border:1px solid #86efac;"></td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Akuamma seed / extract powder / resin (low/high potency)</td><td style="padding:6px 10px;border:1px solid #86efac;">$45–$2,600/kg</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Mimosa Hostilis; Mad honey; African dream bean; Wild dagga</td><td style="padding:6px 10px;border:1px solid #86efac;">$275/kg; $275; $275; $195</td><td style="padding:6px 10px;border:1px solid #86efac;">—</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;font-weight:600;background:#ecfdf5;">House products (15-item min)</td><td colspan="2" style="padding:6px 10px;border:1px solid #86efac;"></td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Kanna nasal sprays (reg / 2x / 3x); mouth sprays (reg–4x)</td><td style="padding:6px 10px;border:1px solid #86efac;">$15–$25; $7.50–$25</td><td style="padding:6px 10px;border:1px solid #86efac;">$30–$50; $15–$50</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">High potency Kanna vapes; Kanna capsules; Kanna &amp; Blue Lotus gummies</td><td style="padding:6px 10px;border:1px solid #86efac;">$45/g, $25/half; $15/pack; $15/pack</td><td style="padding:6px 10px;border:1px solid #86efac;">$90/g, $50/half; $30; $30</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">High potency Blue Lotus vapes; regular vapes (Blue Lotus / Kanna)</td><td style="padding:6px 10px;border:1px solid #86efac;">$25/g, $15/half; $10</td><td style="padding:6px 10px;border:1px solid #86efac;">$50/g, $30/half; $20</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Tinctures (Blue Lotus, Kanna, Sun Opener, California Poppy, Dagga, Wild Lettuce, Kava); mini Kava tincture</td><td style="padding:6px 10px;border:1px solid #86efac;">$13 each; $7.50</td><td style="padding:6px 10px;border:1px solid #86efac;">$26 each; $15</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Kava shot bottles (72–5,000+ qty)</td><td style="padding:6px 10px;border:1px solid #86efac;">$4.375–$2.95/bottle</td><td style="padding:6px 10px;border:1px solid #86efac;">$8.75–$10</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;font-weight:600;background:#ecfdf5;">Individual retail (finished products)</td><td colspan="2" style="padding:6px 10px;border:1px solid #86efac;"></td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Kava Extract Juice; Blue Lotus Extract Juice (vape, refillable)</td><td style="padding:6px 10px;border:1px solid #86efac;">$27.50 each</td><td style="padding:6px 10px;border:1px solid #86efac;">$50 each</td></tr>
<tr><td style="padding:6px 10px;border:1px solid #86efac;">Kava shots, seltzers, tinctures, instant, gummies; Kanna, Kratom; Korthal drinks</td><td style="padding:6px 10px;border:1px solid #86efac;">See house &amp; catalog</td><td style="padding:6px 10px;border:1px solid #86efac;">healingherbals.store</td></tr>
</table>
<p style="margin:20px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#15803d;text-transform:uppercase;">Catalogs</p>
<ul style="margin:0 auto 16px;padding-left:22px;font-size:13px;line-height:1.7;display:table;text-align:left;">
<li style="margin-bottom:8px;"><a href="https://acrobat.adobe.com/id/urn:aaid:sc:VA6C2:f8168b99-2269-4e2b-8887-7781b959a710" style="color:#15803d;font-weight:600;">2025 product catalog</a> (packaged &amp; finished goods)</li>
<li style="margin-bottom:8px;"><a href="https://docs.google.com/document/d/1TB1pHCUEMJsMYjuiMs380r1Lly5bfE3UqCVKzxUZWB0/edit?usp=drivesdk" style="color:#15803d;font-weight:600;">Bulk herbs &amp; extracts</a> (Kanna, Kava, Blue Lotus, Amanita, Kratom &amp; more)</li>
<li style="margin-bottom:0;"><a href="https://acrobat.adobe.com/id/urn:aaid:sc:VA6C2:a6d3213b-821e-4c3a-b6ae-506bd5fa1587" style="color:#15803d;font-weight:600;">Korthal</a> (exclusive wholesale)</li>
</ul>
<div style="background:linear-gradient(145deg,#dcfce7 0%,#bbf7d0 100%);border:2px solid #15803d;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(21,128,61,0.2);">
<p style="margin:0 0 10px;font-size:15px;color:#14532d;line-height:1.55;"><strong>To order wholesale:</strong> Robert "Robbie" Lattig <strong>(631) 871-7641</strong> · <a href="mailto:Herbalhealingsmarketing@gmail.com" style="color:#15803d;font-weight:600;">E-mail for Wholesale</a></p>
<p style="margin:0;font-size:14px;color:#166534;"><strong>Local Oahu:</strong> Eric (Healing Herbals) <strong>(808) 393-0153</strong></p>
</div>
<div style="margin-top:20px;text-align:center;"><img src="{{BASE_URL}}/promo/owner.png" alt="Owner" width="400" style="display:block;max-width:100%;height:auto;margin:0 auto;border:0;border-radius:16px;box-shadow:0 12px 32px -8px rgba(0,0,0,0.15);" /><p style="margin:8px 0 0;font-size:13px;color:#166534;font-weight:600;">Owner</p></div>
<div style="margin-top:28px;padding-top:24px;border-top:2px solid #86efac;"><p style="margin:0 0 10px;font-size:13px;color:#166534;">Our two most popular nicotine replacement products – Kava & Blue Lotus extract juices (vape-ready, replaceable tops, refillable). Wholesale $27.50 · Retail $50 each.</p><img src="{{BASE_URL}}/promo/healingherbals-bluelotus.png" alt="Blue Lotus Extract Juice" width="280" style="display:block;max-width:100%;height:auto;margin:0 auto;border:0;border-radius:20px;box-shadow:0 20px 52px -12px rgba(0,0,0,0.18);" /><img src="{{BASE_URL}}/promo/healingherbals-kava.png" alt="Kava Extract Juice" width="280" style="display:block;max-width:100%;height:auto;margin:12px auto 0;border:0;border-radius:20px;box-shadow:0 20px 52px -12px rgba(0,0,0,0.18);" /></div>
</div>
</div>`,
  },
  "healing-herbals-individual": {
    subject: "Healing Herbals – Kava & Blue Lotus for relaxation (vapes, shots, tinctures)",
    text: `Hi {{Name}},

Healing Herbals Kava Collection – top-quality kava and Blue Lotus from Vanuatu, Fiji, Samoa, and Hawaii. Kava (Piper methysticum) has been sought after for hundreds of years for relaxation, decreased anxiety, and mental clarity without the dulling effects of alcohol.

Our two most popular nicotine replacement products: Kava Extract Juice and Blue Lotus Extract Juice – vape-ready, replaceable tops, refillable – $50 each. Plus Kava shots, tinctures, seltzers, instant mixes, gummies; Kanna, Kratom; full catalog at healingherbals.store (50% off with code Storefront3, min $500 before discount).

Order: Herbalhealingsmarketing@gmail.com or Robbie (631) 871-7641. Local Oahu: Eric (808) 393-0153.

Mahalo nui loa! Eric & Robbie – Healing Herbals Team`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f0fdf4;border:2px solid #15803d;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(21,128,61,0.22),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#15803d 0%,#166534 45%,#14532d 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #22c55e;text-shadow:0 1px 2px rgba(0,0,0,0.15);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">Healing Herbals</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Kava & Blue Lotus – relaxation, naturally</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">Kava Collection · Blue Lotus · lab-tested. Vapes, shots, tinctures, gummies.</p>
</div>
<div style="padding:32px 28px;color:#14532d;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#15803d;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #86efac;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;"><strong>Healing Herbals Kava Collection</strong> – top-quality kava and Blue Lotus from Vanuatu, Fiji, Samoa, and Hawaii. Kava (Piper methysticum) has been sought after for hundreds of years for relaxation, decreased anxiety, and mental clarity. Kavalactones and botanical compounds work without the dulling effects of alcohol.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#15803d;text-transform:uppercase;">Our two most popular nicotine replacement products</p>
<ul style="margin:0 auto 16px;padding-left:22px;font-size:14px;line-height:1.75;display:table;text-align:left;">
<li style="margin-bottom:6px;"><strong>Kava Extract Juice</strong> & <strong>Blue Lotus Extract Juice</strong> – suitable for vapes, replaceable tops, refillable juice – <strong>$50 each</strong></li>
<li style="margin-bottom:6px;">Kava shots, tinctures, seltzers, instant mixes, gummies; Kanna, Kratom</li>
<li style="margin-bottom:0;">Full catalog at <strong><a href="https://healingherbals.store" style="color:#15803d;">healingherbals.store</a></strong> (50% off with code Storefront3, min $500 before discount)</li>
</ul>
<div style="background:linear-gradient(145deg,#dcfce7 0%,#bbf7d0 100%);border:2px solid #15803d;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(21,128,61,0.2);">
<p style="margin:0 0 10px;font-size:15px;color:#14532d;line-height:1.55;"><strong>Order:</strong> <a href="mailto:Herbalhealingsmarketing@gmail.com" style="color:#15803d;">Herbalhealingsmarketing@gmail.com</a> or Robbie (631) 871-7641</p>
<p style="margin:0;font-size:14px;color:#166534;"><strong>Local Oahu:</strong> Eric (Healing Herbals) <strong>(808) 393-0153</strong></p>
</div>
<div style="margin-top:28px;padding-top:24px;border-top:2px solid #86efac;"><p style="margin:0 0 10px;font-size:13px;color:#166534;">Our two most popular nicotine replacement products – Kava & Blue Lotus extract juices (vape-ready, replaceable tops, refillable). $50 each.</p><img src="{{BASE_URL}}/promo/healingherbals-bluelotus.png" alt="Blue Lotus Extract Juice" width="280" style="display:block;max-width:100%;height:auto;margin:0 auto;border:0;border-radius:20px;box-shadow:0 20px 52px -12px rgba(0,0,0,0.18);" /><img src="{{BASE_URL}}/promo/healingherbals-kava.png" alt="Kava Extract Juice" width="280" style="display:block;max-width:100%;height:auto;margin:12px auto 0;border:0;border-radius:20px;box-shadow:0 20px 52px -12px rgba(0,0,0,0.18);" /></div>
</div>
</div>`,
  },
};
