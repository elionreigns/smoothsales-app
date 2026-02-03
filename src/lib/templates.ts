/**
 * Pre-made email templates for SmoothSales campaigns.
 */
export type TemplateId =
  | "botox"
  | "tech"
  | "prayer-individual"
  | "prayer-church"
  | "tourism-hawaii"
  | "tourism-usa"
  | "elion-fans"
  | "elion-artists"
  | "elion-brands"
  | "elion-producers"
  | "elion-venue-church"
  | "elion-venue-show"
  | "elion-venue-dj"
  | "wedding-couples"
  | "wedding-contractors";

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
  { value: "wedding-couples", label: "Hawaii Wedding Plans – Couples planning a wedding" },
  { value: "wedding-contractors", label: "Hawaii Wedding Plans – Contractors / vendors (submit to be featured)" },
];

const CONTACT_LINE_HTML = `<p style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(0,0,0,0.08);color:#64748b;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;opacity:0.9;">Reach us at <a href="mailto:coralcrowntechnologies@gmail.com" style="color:#0ea5e9;text-decoration:none;font-weight:600;">coralcrowntechnologies@gmail.com</a> or (808) 393-0153 for any of these services.</p>`;
const CONTACT_LINE_TEXT = `\n\nReach us at coralcrowntechnologies@gmail.com or (808) 393-0153 for any of these services.`;

export function getTemplate(id: TemplateId): { subject: string; html: string; text: string } {
  const t = TEMPLATES[id];
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
  | "wedding";
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
  | "venue-dj";
export type WeddingSub = "" | "couples" | "contractors";

const ELION_TEMPLATE_MAP: Record<Exclude<ElionSub, "">, TemplateId> = {
  fans: "elion-fans",
  artists: "elion-artists",
  brands: "elion-brands",
  producers: "elion-producers",
  "venue-church": "elion-venue-church",
  "venue-show": "elion-venue-show",
  "venue-dj": "elion-venue-dj",
};

const WEDDING_TEMPLATE_MAP: Record<Exclude<WeddingSub, "">, TemplateId> = {
  couples: "wedding-couples",
  contractors: "wedding-contractors",
};

/**
 * Returns only the template options that match the current service (and sub-option).
 */
export function getTemplatesForSelection(
  service: ServiceSelection,
  tourismSub: TourismSub,
  prayerSub: PrayerSub,
  botoxSub: BotoxSub,
  techSub: TechSub,
  elionSub: ElionSub,
  weddingSub: WeddingSub
): { value: TemplateId; label: string }[] {
  if (service === "botox") {
    if (botoxSub === "individual" || botoxSub === "corporate") return TEMPLATE_OPTIONS.filter((o) => o.value === "botox");
    return [];
  }
  if (service === "tech") {
    if (techSub === "individual" || techSub === "corporate") return TEMPLATE_OPTIONS.filter((o) => o.value === "tech");
    return [];
  }
  if (service === "prayer") {
    if (prayerSub === "individual") return TEMPLATE_OPTIONS.filter((o) => o.value === "prayer-individual");
    if (prayerSub === "church") return TEMPLATE_OPTIONS.filter((o) => o.value === "prayer-church");
    return [];
  }
  if (service === "tourism") {
    if (tourismSub === "hawaii") return TEMPLATE_OPTIONS.filter((o) => o.value === "tourism-hawaii");
    if (tourismSub === "usa") return TEMPLATE_OPTIONS.filter((o) => o.value === "tourism-usa");
    return [];
  }
  if (service === "elion" && elionSub !== "") {
    const id = ELION_TEMPLATE_MAP[elionSub];
    return TEMPLATE_OPTIONS.filter((o) => o.value === id);
  }
  if (service === "wedding" && weddingSub !== "") {
    const id = WEDDING_TEMPLATE_MAP[weddingSub];
    return TEMPLATE_OPTIONS.filter((o) => o.value === id);
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
  weddingSub: WeddingSub
): boolean {
  if (!service) return false;
  if (service === "prayer") return prayerSub !== "";
  if (service === "tourism") return tourismSub !== "";
  if (service === "botox") return botoxSub !== "";
  if (service === "tech") return techSub !== "";
  if (service === "elion") return elionSub !== "";
  if (service === "wedding") return weddingSub !== "";
  return false;
}

const TEMPLATES: Record<TemplateId, { subject: string; html: string; text: string }> = {
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
    subject: "Coral Crown Solutions – Unlock your digital kingdom",
    text: `Hi {{Name}},

Coral Crown Solutions – Unlock your digital kingdom. We build the websites, create the marketing, and provide the tools for your talent or business to thrive online.

What we offer:
• Websites: Build for $800, host $20/mo, help point your domain, monthly updates $100/mo
• Custom chatbots (OpenAI), email agents & AI agents for booking and custom shopping carts
• Amazon & Etsy: Get your products listed, maintain stores
• Pricing depends on scope, length, and regularity – we’re happy to quote

Inquire: sales@coralcrownsolutions.com | CoralCrownSolutions.com

Coral Crown Solutions`,
    html: `<div style="font-family:'Segoe UI',system-ui,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border:1px solid #1e293b;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(30,41,59,0.22),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#1e293b 0%,#334155 45%,#475569 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #3b82f6;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">Coral Crown Solutions</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Unlock your digital kingdom</h1>
<p style="margin:14px 0 0;font-size:14px;opacity:0.95;">We'd be honored to be your all-in-one partner – from custom code to creative content.</p>
</div>
<div style="padding:32px 28px;color:#334155;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1e40af;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #cbd5e1;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">Let us build or grow your online presence – whether you're an entrepreneur, artist, actor, or creator, we deliver custom solutions (no bloated themes) and stay with you from launch to marketing.</p>
<p style="margin:28px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1e40af;text-transform:uppercase;">Who we empower</p>
<ul style="margin:0 auto 22px;padding-left:22px;font-size:14px;line-height:1.75;display:table;text-align:left;">
<li style="margin-bottom:8px;"><strong>Entrepreneurs:</strong> Custom websites, e-commerce (Amazon/Etsy), targeted ad campaigns</li>
<li style="margin-bottom:8px;"><strong>Artists:</strong> Fee-free music players, digital distribution, custom CDs & USBs</li>
<li style="margin-bottom:8px;"><strong>Actors & models:</strong> Digital portfolios, professional headshots, career tools</li>
<li style="margin-bottom:0;"><strong>Creators & talents:</strong> Platform development, monetization, content creation</li>
</ul>
<p style="margin:26px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1e40af;text-transform:uppercase;">Why choose us</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;">Custom solutions from scratch – no bloated themes. One partner from initial code to marketing. Proven results across e-commerce, games, and platforms. We handle domain setup, SSL, and ongoing updates so you can focus on your business.</p>
<div style="background:#eff6ff;border:2px solid #3b82f6;border-radius:18px;padding:20px 22px;margin:22px 0;box-shadow:0 4px 14px rgba(59,130,246,0.12);">
<p style="margin:0 0 10px;font-size:13px;color:#1e3a8a;font-style:italic;">"They updated my Shopify website, helped with graphics, and made it easy to implement AI in my business!"</p>
<p style="margin:0;font-size:13px;color:#1e3a8a;font-style:italic;">"Coral Crown took my business to the next level with the best SEO and site upgrades. I recommend!"</p>
</div>
<p style="margin:26px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1e40af;text-transform:uppercase;">What we offer</p>
<ul style="margin:0 auto 20px;padding-left:22px;font-size:14px;line-height:1.75;display:table;text-align:left;">
<li style="margin-bottom:8px;"><strong>Websites:</strong> Custom build, $20/mo hosting + maintenance, FREE SSL, SEO</li>
<li style="margin-bottom:8px;"><strong>E-commerce:</strong> Amazon, Etsy, eBay; shopping carts on Instagram, TikTok, Facebook</li>
<li style="margin-bottom:8px;"><strong>Digital advertising:</strong> Facebook, X, YouTube – verified accounts, targeted campaigns</li>
<li style="margin-bottom:0;"><strong>For creatives:</strong> Music players, Spotify/Apple Music distribution, custom CDs & USBs, photography & video</li>
</ul>
<p style="margin:0 0 26px;font-size:14px;line-height:1.5;"><strong>Hosting:</strong> $5/mo hosting only; $20/mo hosting + maintenance with free SSL. Unlimited WHM, 99.9% uptime.</p>
<div style="background:linear-gradient(145deg,#dbeafe 0%,#e0f2fe 100%);border:2px solid #0ea5e9;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(14,165,233,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#0c4a6e;line-height:1.55;"><strong>Next step:</strong> Reply to this email or visit the site below. Tell us your goals and timeline – we'll put together a plan and quote that fits your budget. No obligation, no long-term contract. We typically respond within 24 hours and can schedule a short call to walk through options.</p>
<p style="margin:0 0 10px;"><a href="https://www.coralcrownsolutions.com" style="display:inline-block;background:linear-gradient(145deg,#2563eb 0%,#1d4ed8 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(37,99,235,0.4);">CoralCrownSolutions.com</a></p>
<p style="margin:0;font-size:13px;color:#1e40af;font-style:italic;">P.S. From custom code to AI chatbots – one partner from launch to growth.</p>
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

As a thank you for attending our educational webinar (60–75 min), choose ONE of 4 complimentary vacation packages: Carnival Cruise (3–5 nights), 7 Night Condo Stay, 7 Day Caribbean Cruise for Two, Mexico Getaway (8d/7n). You pay only required fees/taxes. Requirements: 25+, US/Canadian, $40k+ income. Register now – we’ll help you Full details: Carnival 3–5 nights, 7 Night Condo, 7 Day Caribbean for Two, Mexico 8d/7n. Valid 18 months. If never used, no cost.

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

Links: Spotify https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA | Apple Music https://music.apple.com/us/artist/e-lion/1111804063 | Amazon Music https://www.amazon.com/music/player/artists/B01GOGAW4W/e-lion | TikTok https://www.tiktok.com/@elionreigns | Pandora https://www.pandora.com/artist/e-lion/AR9vZJllkt3JmVq | SoundCloud https://soundcloud.com/elionrapmusic | Deezer https://www.deezer.com/us/artist/354652062 | iHeartRadio https://www.iheart.com/artist/e-lion-46608091/ | Full catalog https://www.elionmusic.com/rap/ | Family Feud https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize | Bored City https://www.elionmusic.com/articles/bored-city-interview-e-lion | Spotlight https://www.elionmusic.com/articles/spotlight-interview-e-lion | TBK247 https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music | Wiki https://www.elionmusic.com/wiki/ | elionmusic.com https://www.elionmusic.com

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
<p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#fbbf24;text-transform:uppercase;">Catalog, press & Family Feud</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/rap/" style="color:#fbbf24;">Full catalog & profile</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#fbbf24;">Family Feud grand prize</a> · <a href="https://www.elionmusic.com/articles/bored-city-interview-e-lion" style="color:#fbbf24;">Bored City</a> · <a href="https://www.elionmusic.com/articles/spotlight-interview-e-lion" style="color:#fbbf24;">Spotlight</a> · <a href="https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music" style="color:#fbbf24;">TBK247</a> · <a href="https://www.elionmusic.com/wiki/" style="color:#fbbf24;">Wiki</a></p>
<div style="background:#292524;border:2px solid #f59e0b;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(0,0,0,0.4);">
<p style="margin:0 0 14px;font-size:15px;color:#fef3c7;line-height:1.55;"><strong>Where to start:</strong> Visit elionmusic.com for the full catalog, bio, lyrics, and merch. Pick your platform and hit follow – if you love it, share it with someone who needs the vibe. New music and content drop regularly; follow on social for behind-the-scenes and tour dates.</p>
<p style="margin:0 0 10px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#f59e0b 0%,#d97706 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(245,158,11,0.4);">elionmusic.com</a></p>
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

Links: Spotify https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA | Apple Music https://music.apple.com/us/artist/e-lion/1111804063 | Amazon https://www.amazon.com/music/player/artists/B01GOGAW4W/e-lion | TikTok https://www.tiktok.com/@elionreigns | Pandora https://www.pandora.com/artist/e-lion/AR9vZJllkt3JmVq | SoundCloud https://soundcloud.com/elionrapmusic | Deezer https://www.deezer.com/us/artist/354652062 | iHeartRadio https://www.iheart.com/artist/e-lion-46608091/ | Full catalog https://www.elionmusic.com/rap/ | Family Feud https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize | Bored City https://www.elionmusic.com/articles/bored-city-interview-e-lion | Spotlight https://www.elionmusic.com/articles/spotlight-interview-e-lion | TBK247 https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music | Wiki https://www.elionmusic.com/wiki/ | elionmusic.com https://www.elionmusic.com

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
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#6d28d9;text-transform:uppercase;">Press & Family Feud</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.6;"><a href="https://www.elionmusic.com/articles/bored-city-interview-e-lion" style="color:#6d28d9;">Bored City</a> · <a href="https://www.elionmusic.com/articles/spotlight-interview-e-lion" style="color:#6d28d9;">Spotlight</a> · <a href="https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music" style="color:#6d28d9;">TBK247</a> · <a href="https://www.elionmusic.com/wiki/" style="color:#6d28d9;">Wiki</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#6d28d9;">Family Feud grand prize</a></p>
<div style="background:linear-gradient(145deg,#ede9fe 0%,#ddd6fe 100%);border:2px solid #7c3aed;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(124,58,237,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#4c1d95;line-height:1.55;"><strong>Next step:</strong> Reply to this email or click below and say you're in. We'll send you links to the catalog, pick a direction (one verse, one feature, or something bigger), and get down to details – tempo, vibe, credits, and how we'll cross-promote. We typically respond within 24–48 hours and would love to make something fire with you.</p>
<p style="margin:0 0 10px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#7c3aed 0%,#5b21b6 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(124,58,237,0.4);">elionmusic.com</a></p>
<p style="margin:0;font-size:13px;color:#6d28d9;font-style:italic;">P.S. Free collaboration – no fee, no catch. We're looking for peers to grow with.</p>
</div>
</div>
</div>`,
  },
  "elion-brands": {
    subject: "E Lion Music – Sponsored brand partnership & reach",
    text: `Hi {{Name}},

We'd love to partner with a brand like yours – E Lion is open to wearing or using your products in exchange for store credit or items you choose. Your product deserves visibility with an audience that trusts the artist and watches at scale.

Why E Lion: Proven, family-friendly reach. An estimated 115–145 million unique viewers have seen his Family Feud grand prize run (2016, 5 consecutive wins; 183–234M total views in syndication). Add 10M+ YouTube views, 1,000+ live performances, 30K+ CDs sold, and presence on every major music platform. First Hawaiian family to win Family Feud – high recall, positive association. We're not asking for a free ride – we're offering real exposure in exchange for product or credit, and we'll put your brand in front of people who pay attention.

Next step: Reply with what you have in mind (apparel, gear, etc.) and we'll get down to details – what E Lion would wear/use, how we'll tag and credit you, and where your brand appears.

Links: Spotify https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA | Apple Music https://music.apple.com/us/artist/e-lion/1111804063 | Amazon Music https://www.amazon.com/music/player/artists/B01GOGAW4W/e-lion | TikTok https://www.tiktok.com/@elionreigns | Pandora https://www.pandora.com/artist/e-lion/AR9vZJllkt3JmVq | SoundCloud https://soundcloud.com/elionrapmusic | Deezer https://www.deezer.com/us/artist/354652062 | iHeartRadio https://www.iheart.com/artist/e-lion-46608091/ | Official profile https://www.elionmusic.com/rap/ | Family Feud https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize | Bored City https://www.elionmusic.com/articles/bored-city-interview-e-lion | Spotlight https://www.elionmusic.com/articles/spotlight-interview-e-lion | TBK247 https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music | Wiki https://www.elionmusic.com/wiki/ | elionmusic.com https://www.elionmusic.com

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
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">E Lion is open to <strong>sponsored brand partnerships</strong> – he'll wear or use your products in exchange for store credit or specific items from your site. We're not asking for a free ride – we're offering real exposure to a proven, family-friendly audience in exchange for product or credit.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1d4ed8;text-transform:uppercase;">Why E Lion</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;">Proven reach: an estimated <strong>115–145 million unique viewers</strong> have seen his Family Feud grand prize run (2016, 5 consecutive wins; 183–234M total views in syndication). Plus <strong>10M+ YouTube views</strong>, <strong>1,000+ live performances</strong>, <strong>30K+ CDs sold</strong>, and music on every major platform. First Hawaiian family to win Family Feud – high recall, positive association.</p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1d4ed8;text-transform:uppercase;">Stream, catalog & press</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.6;"><a href="https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA" style="color:#1d4ed8;">Spotify</a> · <a href="https://music.apple.com/us/artist/e-lion/1111804063" style="color:#1d4ed8;">Apple Music</a> · <a href="https://www.amazon.com/music/player/artists/B01GOGAW4W/e-lion" style="color:#1d4ed8;">Amazon Music</a> · <a href="https://www.tiktok.com/@elionreigns" style="color:#1d4ed8;">TikTok</a> · <a href="https://www.pandora.com/artist/e-lion/AR9vZJllkt3JmVq" style="color:#1d4ed8;">Pandora</a> · <a href="https://soundcloud.com/elionrapmusic" style="color:#1d4ed8;">SoundCloud</a> · <a href="https://www.deezer.com/us/artist/354652062" style="color:#1d4ed8;">Deezer</a> · <a href="https://www.iheart.com/artist/e-lion-46608091/" style="color:#1d4ed8;">iHeartRadio</a> · <a href="https://www.elionmusic.com/rap/" style="color:#1d4ed8;">Official profile</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#1d4ed8;">Grand prize coverage</a> · <a href="https://www.elionmusic.com/articles/bored-city-interview-e-lion" style="color:#1d4ed8;">Bored City</a> · <a href="https://www.elionmusic.com/articles/spotlight-interview-e-lion" style="color:#1d4ed8;">Spotlight</a> · <a href="https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music" style="color:#1d4ed8;">TBK247</a> · <a href="https://www.elionmusic.com/wiki/" style="color:#1d4ed8;">Wiki</a></p>
<div style="background:linear-gradient(145deg,#dbeafe 0%,#bfdbfe 100%);border:2px solid #1e40af;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(30,64,175,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#1e3a8a;line-height:1.55;"><strong>Next step:</strong> Reply with what you have in mind (apparel, gear, accessories, etc.). We'll get down to details – what E Lion would wear or use, how we'll tag and credit you on social and in content, and where your brand appears. We typically respond within 24–48 hours. No obligation – let's explore if we're a fit.</p>
<p style="margin:0 0 10px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#2563eb 0%,#1d4ed8 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(37,99,235,0.4);">elionmusic.com</a></p>
<p style="margin:0;font-size:13px;color:#1d4ed8;font-style:italic;">P.S. 115M+ viewers saw the Family Feud run – your brand in front of people who pay attention.</p>
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
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#c2410c;text-transform:uppercase;">Stream, catalog & press</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.6;"><a href="https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA" style="color:#c2410c;">Spotify</a> · <a href="https://music.apple.com/us/artist/e-lion/1111804063" style="color:#c2410c;">Apple Music</a> · <a href="https://www.amazon.com/music/player/artists/B01GOGAW4W/e-lion" style="color:#c2410c;">Amazon Music</a> · <a href="https://www.tiktok.com/@elionreigns" style="color:#c2410c;">TikTok</a> · <a href="https://www.pandora.com/artist/e-lion/AR9vZJllkt3JmVq" style="color:#c2410c;">Pandora</a> · <a href="https://soundcloud.com/elionrapmusic" style="color:#c2410c;">SoundCloud</a> · <a href="https://www.deezer.com/us/artist/354652062" style="color:#c2410c;">Deezer</a> · <a href="https://www.iheart.com/artist/e-lion-46608091/" style="color:#c2410c;">iHeartRadio</a> · <a href="https://www.elionmusic.com/rap/" style="color:#c2410c;">Full catalog</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#c2410c;">Family Feud</a> · <a href="https://www.elionmusic.com/articles/bored-city-interview-e-lion" style="color:#c2410c;">Bored City</a> · <a href="https://www.elionmusic.com/articles/spotlight-interview-e-lion" style="color:#c2410c;">Spotlight</a> · <a href="https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music" style="color:#c2410c;">TBK247</a> · <a href="https://www.elionmusic.com/wiki/" style="color:#c2410c;">Wiki</a></p>
<div style="background:linear-gradient(145deg,#ffedd5 0%,#fed7aa 100%);border:2px solid #ea580c;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(234,88,12,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#9a3412;line-height:1.55;"><strong>Next step:</strong> Reply if you're down to send beats for exclusive use. We'll get into format (WAV/MP3), BPM range, and how you want to be credited (liner notes, metadata, social tags). We're ready when you are – typically we respond within 24–48 hours and can send a short brief so you know the vibe we're going for.</p>
<p style="margin:0 0 10px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#ea580c 0%,#c2410c 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(234,88,12,0.4);">elionmusic.com</a></p>
<p style="margin:0;font-size:13px;color:#c2410c;font-style:italic;">P.S. Your name on every release – no ghost credits. We take producer credit seriously.</p>
</div>
</div>
</div>`,
  },
  "elion-venue-church": {
    subject: "E Lion – Book for your church: concert, keynote, P48X & Prayer Authority",
    text: `Hi {{Name}},

We'd be honored to bring E Lion to your church – whether it's a full concert (1hr+ of Holy Hip-Hop plus speaking), a keynote (15–45 min with music and meet & greet), or a blend. Your congregation deserves worship that meets them where they are, and E Lion has been doing that for over 15 years.

Why E Lion: 1,000+ performances, 10M+ YouTube views, Family Feud grand prize (2016), first Hawaiian family to win 5 consecutive episodes. Prophetic endorsements from major Christian leaders; performed at Waikiki Shell, Blaisdell, HebrewFest, and churches nationwide. He brings P48X book promotion and Prayer Authority app demos – ministry and music in one package. Custom set list; you choose which songs fit your service.

Next step: Reply with your ideal date(s) and type of event (concert vs keynote). We'll send a set list, credentials, and get down to details – rate, rider, and how we can serve your people.

Links: Spotify https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA | Apple Music https://music.apple.com/us/artist/e-lion/1111804063 | Amazon Music https://www.amazon.com/music/player/artists/B01GOGAW4W/e-lion | TikTok https://www.tiktok.com/@elionreigns | Pandora https://www.pandora.com/artist/e-lion/AR9vZJllkt3JmVq | SoundCloud https://soundcloud.com/elionrapmusic | Deezer https://www.deezer.com/us/artist/354652062 | iHeartRadio https://www.iheart.com/artist/e-lion-46608091/ | Full catalog https://www.elionmusic.com/rap/ | Family Feud https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize | Bored City https://www.elionmusic.com/articles/bored-city-interview-e-lion | Spotlight https://www.elionmusic.com/articles/spotlight-interview-e-lion | TBK247 https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music | Wiki https://www.elionmusic.com/wiki/ | elionmusic.com https://www.elionmusic.com

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fffbeb;border:2px solid #b45309;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(180,83,9,0.22),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#b45309 0%,#92400e 50%,#78350f 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #f59e0b;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">E Lion Music</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Bring E Lion to your church</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">Full concert, keynote, or a blend – your people deserve worship that meets them where they are.</p>
</div>
<div style="padding:32px 28px;color:#78350f;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#92400e;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #fde68a;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">E Lion is available for <strong>church events</strong> – full concert (1 hour+ of original Holy Hip-Hop, 15-minute speaking segments, P48X book promotion, Prayer Authority app demo) or conference keynote (15–45 min with musical segments and meet & greet). We'd love to partner with you for a service or conference.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#92400e;text-transform:uppercase;">Why E Lion</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;"><strong>15+ years</strong> in ministry and music, <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>, Family Feud grand prize winner (2016 – first Hawaiian family to win 5 consecutive episodes). Prophetic endorsements from major Christian leaders; performed at Waikiki Shell, Blaisdell, HebrewFest, and churches nationwide. Custom set list – you choose which songs fit your service.</p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#92400e;text-transform:uppercase;">Stream, catalog, press & Family Feud</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.6;"><a href="https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA" style="color:#92400e;">Spotify</a> · <a href="https://music.apple.com/us/artist/e-lion/1111804063" style="color:#92400e;">Apple Music</a> · <a href="https://www.amazon.com/music/player/artists/B01GOGAW4W/e-lion" style="color:#92400e;">Amazon Music</a> · <a href="https://www.tiktok.com/@elionreigns" style="color:#92400e;">TikTok</a> · <a href="https://www.pandora.com/artist/e-lion/AR9vZJllkt3JmVq" style="color:#92400e;">Pandora</a> · <a href="https://soundcloud.com/elionrapmusic" style="color:#92400e;">SoundCloud</a> · <a href="https://www.deezer.com/us/artist/354652062" style="color:#92400e;">Deezer</a> · <a href="https://www.iheart.com/artist/e-lion-46608091/" style="color:#92400e;">iHeartRadio</a> · <a href="https://www.elionmusic.com/rap/" style="color:#92400e;">Full catalog & profile</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#92400e;">Family Feud coverage</a> · <a href="https://www.elionmusic.com/articles/bored-city-interview-e-lion" style="color:#92400e;">Bored City</a> · <a href="https://www.elionmusic.com/articles/spotlight-interview-e-lion" style="color:#92400e;">Spotlight</a> · <a href="https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music" style="color:#92400e;">TBK247</a> · <a href="https://www.elionmusic.com/wiki/" style="color:#92400e;">Wiki</a></p>
<div style="background:#fffbeb;border:2px solid #fde68a;border-radius:18px;padding:18px 20px;margin:0 auto 24px;max-width:520px;">
<p style="margin:0 0 10px;font-size:13px;line-height:1.6;color:#78350f;font-style:italic;">"Thank you for performing at the Movie Night event for New Hope. You're a blessing and I'm always here for you!" <strong style="font-style:normal;color:#92400e;">– Keola Richards (Leader, New Hope Christian Church)</strong></p>
<p style="margin:0;font-size:13px;line-height:1.6;color:#78350f;font-style:italic;">"I never really liked rap until I heard you rap, you're really good. I really believe in you, and I know that I'm not the only one. God's got your back!" <strong style="font-style:normal;color:#92400e;">– Thomas Amarino (President, Gideons Association of Hawaii)</strong></p>
</div>
<div style="background:linear-gradient(145deg,#fef3c7 0%,#fde68a 100%);border:2px solid #b45309;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(180,83,9,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#78350f;line-height:1.55;"><strong>Next step:</strong> Reply with your ideal date(s) and type of event (concert vs keynote). We'll send a set list, credentials, and get down to details – rate, rider, tech needs, and how we can serve your people. We typically respond within 24–48 hours. No obligation – let's see if we're a fit for your calendar.</p>
<p style="margin:0 0 10px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#b45309 0%,#92400e 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(180,83,9,0.4);">elionmusic.com</a></p>
<p style="margin:0;font-size:13px;color:#92400e;font-style:italic;">P.S. P48X book + Prayer Authority app demos – ministry and music in one package.</p>
</div>
</div>
</div>`,
  },
  "elion-venue-show": {
    subject: "E Lion – Book for festival or stage show",
    text: `Hi {{Name}},

E Lion is available for your festival or stage show – full concert (1hr+ set, 15-min speaking, audience interaction), custom set list. Your stage deserves an artist who can draw and deliver, and E Lion has the numbers and the show to back it up.

Why book E Lion: An estimated 115–145 million unique viewers have seen his Family Feud grand prize run (183–234M total views in syndication). Add 15+ years, 1,000+ performances, 10M+ YouTube views – first Hawaiian family to win 5 consecutive episodes. Performed at Waikiki Shell, Blaisdell, HebrewFest, and venues across the US and internationally. You pick the songs; he brings the energy. Music on every major platform.

Next step: Reply with your event name, date(s), and slot – we'll send credentials, a set list, and get down to rider and rate. Let's make it happen.

Links: Spotify https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA | Apple Music https://music.apple.com/us/artist/e-lion/1111804063 | Amazon Music https://www.amazon.com/music/player/artists/B01GOGAW4W/e-lion | TikTok https://www.tiktok.com/@elionreigns | Pandora https://www.pandora.com/artist/e-lion/AR9vZJllkt3JmVq | SoundCloud https://soundcloud.com/elionrapmusic | Deezer https://www.deezer.com/us/artist/354652062 | iHeartRadio https://www.iheart.com/artist/e-lion-46608091/ | Profile & catalog https://www.elionmusic.com/rap/ | Family Feud https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize | Bored City https://www.elionmusic.com/articles/bored-city-interview-e-lion | Spotlight https://www.elionmusic.com/articles/spotlight-interview-e-lion | TBK247 https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music | Wiki https://www.elionmusic.com/wiki/ | elionmusic.com https://www.elionmusic.com

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fef2f2;border:2px solid #b91c1c;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px rgba(185,28,28,0.26),0 10px 28px -8px rgba(0,0,0,0.1);">
<div style="background:linear-gradient(145deg,#b91c1c 0%,#991b1b 50%,#7f1d1d 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #f87171;text-shadow:0 1px 2px rgba(0,0,0,0.2);text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">E Lion Music</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Book E Lion for your stage</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">Full concert, custom set list – your stage deserves an artist who can draw and deliver.</p>
</div>
<div style="padding:32px 28px;color:#7f1d1d;text-align:center;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#b91c1c;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #fecaca;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;">E Lion is available for <strong>festivals and stage shows</strong> – full concert (1 hour+ of original Holy Hip-Hop, 15-minute speaking segments, audience interaction). Custom set list – you select which songs he performs at your venue.</p>
<p style="margin:28px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#b91c1c;text-transform:uppercase;">Reach & credentials</p>
<p style="margin:0 0 18px;font-size:14px;line-height:1.7;">An estimated <strong>115–145 million unique viewers</strong> have seen his Family Feud grand prize run (2016; 183–234M total views in syndication). <strong>15+ years</strong>, <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>. First Hawaiian family to win 5 consecutive episodes. Performed at Waikiki Shell, Blaisdell, HebrewFest, and venues across the US and internationally.</p>
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#b91c1c;text-transform:uppercase;">Stream, catalog, press & Family Feud</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.6;"><a href="https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA" style="color:#b91c1c;">Spotify</a> · <a href="https://music.apple.com/us/artist/e-lion/1111804063" style="color:#b91c1c;">Apple Music</a> · <a href="https://www.amazon.com/music/player/artists/B01GOGAW4W/e-lion" style="color:#b91c1c;">Amazon Music</a> · <a href="https://www.tiktok.com/@elionreigns" style="color:#b91c1c;">TikTok</a> · <a href="https://www.pandora.com/artist/e-lion/AR9vZJllkt3JmVq" style="color:#b91c1c;">Pandora</a> · <a href="https://soundcloud.com/elionrapmusic" style="color:#b91c1c;">SoundCloud</a> · <a href="https://www.deezer.com/us/artist/354652062" style="color:#b91c1c;">Deezer</a> · <a href="https://www.iheart.com/artist/e-lion-46608091/" style="color:#b91c1c;">iHeartRadio</a> · <a href="https://www.elionmusic.com/rap/" style="color:#b91c1c;">Profile & catalog</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#b91c1c;">Family Feud coverage</a> · <a href="https://www.elionmusic.com/articles/bored-city-interview-e-lion" style="color:#b91c1c;">Bored City</a> · <a href="https://www.elionmusic.com/articles/spotlight-interview-e-lion" style="color:#b91c1c;">Spotlight</a> · <a href="https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music" style="color:#b91c1c;">TBK247</a> · <a href="https://www.elionmusic.com/wiki/" style="color:#b91c1c;">Wiki</a></p>
<div style="background:linear-gradient(145deg,#fee2e2 0%,#fecaca 100%);border:2px solid #b91c1c;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(185,28,28,0.2);">
<p style="margin:0 0 14px;font-size:15px;color:#7f1d1d;line-height:1.55;"><strong>Next step:</strong> Reply with your event name, date(s), and slot. We'll send credentials, set list, and get down to rider and rate. We typically respond within 24–48 hours – let's make it happen.</p>
<p style="margin:0 0 10px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#b91c1c 0%,#991b1b 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(185,28,28,0.4);">elionmusic.com</a></p>
<p style="margin:0;font-size:13px;color:#b91c1c;font-style:italic;">P.S. Waikiki Shell, Blaisdell, HebrewFest – your stage, his energy.</p>
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

Links: Spotify https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA | Apple Music https://music.apple.com/us/artist/e-lion/1111804063 | Amazon Music https://www.amazon.com/music/player/artists/B01GOGAW4W/e-lion | TikTok https://www.tiktok.com/@elionreigns | Pandora https://www.pandora.com/artist/e-lion/AR9vZJllkt3JmVq | SoundCloud https://soundcloud.com/elionrapmusic | Deezer https://www.deezer.com/us/artist/354652062 | iHeartRadio https://www.iheart.com/artist/e-lion-46608091/ | Full catalog https://www.elionmusic.com/rap/ | Family Feud https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize | Bored City https://www.elionmusic.com/articles/bored-city-interview-e-lion | Spotlight https://www.elionmusic.com/articles/spotlight-interview-e-lion | TBK247 https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music | Wiki https://www.elionmusic.com/wiki/ | elionmusic.com https://www.elionmusic.com

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
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#a78bfa;text-transform:uppercase;">Stream, catalog, press & Family Feud</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.6;"><a href="https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA" style="color:#a78bfa;">Spotify</a> · <a href="https://music.apple.com/us/artist/e-lion/1111804063" style="color:#a78bfa;">Apple Music</a> · <a href="https://www.amazon.com/music/player/artists/B01GOGAW4W/e-lion" style="color:#a78bfa;">Amazon Music</a> · <a href="https://www.tiktok.com/@elionreigns" style="color:#a78bfa;">TikTok</a> · <a href="https://www.pandora.com/artist/e-lion/AR9vZJllkt3JmVq" style="color:#a78bfa;">Pandora</a> · <a href="https://soundcloud.com/elionrapmusic" style="color:#a78bfa;">SoundCloud</a> · <a href="https://www.deezer.com/us/artist/354652062" style="color:#a78bfa;">Deezer</a> · <a href="https://www.iheart.com/artist/e-lion-46608091/" style="color:#a78bfa;">iHeartRadio</a> · <a href="https://www.elionmusic.com/rap/" style="color:#a78bfa;">Full catalog</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#a78bfa;">Family Feud</a> · <a href="https://www.elionmusic.com/articles/bored-city-interview-e-lion" style="color:#a78bfa;">Bored City</a> · <a href="https://www.elionmusic.com/articles/spotlight-interview-e-lion" style="color:#a78bfa;">Spotlight</a> · <a href="https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music" style="color:#a78bfa;">TBK247</a> · <a href="https://www.elionmusic.com/wiki/" style="color:#a78bfa;">Wiki</a></p>
<div style="background:#312e81;border:2px solid #a78bfa;border-radius:18px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(0,0,0,0.4);">
<p style="margin:0 0 14px;font-size:15px;color:#e9d5ff;line-height:1.55;"><strong>Next step:</strong> Reply with your event type, date(s), and duration. We'll get into rate and what you need (PA, tables, setup time). We typically respond within 24–48 hours – let's turn it up.</p>
<p style="margin:0 0 10px;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#7c3aed 0%,#5b21b6 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(124,58,237,0.4);">elionmusic.com</a></p>
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

Start planning: HawaiiWeddingPlans.com | (808) 994-9034 | coralcrowntechnologies@gmail.com

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
<p style="margin:0 0 14px;font-size:15px;color:#831843;line-height:1.55;"><strong>Start planning:</strong> Visit HawaiiWeddingPlans.com to choose your island and build your package. Need help? Call <strong>(808) 994-9034</strong> or email <a href="mailto:coralcrowntechnologies@gmail.com" style="color:#be185d;">coralcrowntechnologies@gmail.com</a>. Making dreams come true – we are here for you.</p>
<p style="margin:0;"><a href="https://www.hawaiiweddingplans.com" style="display:inline-block;background:linear-gradient(145deg,#be185d 0%,#9d174d 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(190,24,93,0.4);">HawaiiWeddingPlans.com</a></p>
</div>
</div>
</div>`,
  },
  "wedding-contractors": {
    subject: "Get featured on Hawaii Wedding Plans – Submit your service or venue",
    text: `Hi {{Name}},

Hawaii Wedding Plans is the go-to wedding planning platform for Oahu, Maui, Kauai, and Big Island. We would love to feature your service or venue – photographers, videographers, caterers, florists, officiants, musicians/DJs, planners, venues, transportation, and more.

Submit your business: https://hawaiiweddingplans.com/submit/index.php – we will review and get back to you. Or send your information to coralcrowntechnologies@gmail.com.

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
<p style="margin:0 0 14px;font-size:15px;color:#14532d;line-height:1.55;"><strong>Submit your business:</strong> Use our quick submit form – we will review your listing and get back to you. Or send your business name, service type, contact info, website, location, and description to <a href="mailto:coralcrowntechnologies@gmail.com" style="color:#15803d;">coralcrowntechnologies@gmail.com</a>. No obligation – we are building the go-to resource for Hawaii weddings and would love to include you.</p>
<p style="margin:0 0 10px;"><a href="https://hawaiiweddingplans.com/submit/index.php" style="display:inline-block;background:linear-gradient(145deg,#15803d 0%,#166534 100%);color:#fff;padding:16px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 8px 24px -4px rgba(21,128,61,0.4);">Submit – Hawaii Wedding Plans</a></p>
<p style="margin:0;font-size:13px;color:#166534;">Or email: coralcrowntechnologies@gmail.com | (808) 994-9034</p>
</div>
</div>
</div>`,
  },
};
