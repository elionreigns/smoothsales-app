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
  | "elion-venue-dj";

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
];

const CONTACT_LINE_HTML = `<p style="margin-top:12px;color:#555;font-size:13px;">Reach us at <a href="mailto:coralcrowntechnologies@gmail.com">coralcrowntechnologies@gmail.com</a> or (808) 393-0153 for any of these services.</p>`;
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
  | "elion";
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

const ELION_TEMPLATE_MAP: Record<Exclude<ElionSub, "">, TemplateId> = {
  fans: "elion-fans",
  artists: "elion-artists",
  brands: "elion-brands",
  producers: "elion-producers",
  "venue-church": "elion-venue-church",
  "venue-show": "elion-venue-show",
  "venue-dj": "elion-venue-dj",
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
  elionSub: ElionSub
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
  return [];
}

/** True when service + required sub-option are selected so we can show pitch/campaign. */
export function hasRequiredSelection(
  service: ServiceSelection,
  tourismSub: TourismSub,
  prayerSub: PrayerSub,
  botoxSub: BotoxSub,
  techSub: TechSub,
  elionSub: ElionSub
): boolean {
  if (!service) return false;
  if (service === "prayer") return prayerSub !== "";
  if (service === "tourism") return tourismSub !== "";
  if (service === "botox") return botoxSub !== "";
  if (service === "tech") return techSub !== "";
  if (service === "elion") return elionSub !== "";
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
    html: `<div style="font-family:Georgia,'Times New Roman',serif;max-width:600px;background:#f0fdfa;border:1px solid #0d9488;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(13,148,136,0.18),0 4px 12px rgba(0,0,0,0.06);">
<div style="background:linear-gradient(145deg,#0d9488 0%,#0f766e 40%,#115e59 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #14b8a6;text-shadow:0 1px 2px rgba(0,0,0,0.15);">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">Botox Oahu</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">You deserve clear pricing and physician-led care</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;line-height:1.45;">Same-day availability, transparent prices, and a team that treats you like family.</p>
</div>
<div style="padding:32px 28px;color:#134e4a;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#0f766e;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #99f6e4;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;"><span style="display:inline-block;background:#ccfbf1;color:#0f766e;font-weight:700;padding:2px 8px;border-radius:6px;font-size:12px;margin-right:6px;">Main ask</span> Come in for a visit. Whether it is Botox, fillers, weight loss, or any of our services, we have made it easy to look and feel your best – no guesswork on cost, no long waits. Most people need 25–40 units for forehead, frown lines, and crow's feet; at <strong style="color:#0d9488;">$11.11/unit</strong> that is about $278–$444. We also offer a <strong>90-unit package for $1000</strong>. You can choose Dr. Schaefer (MD) or our nurse injectors and save $1 per unit; same quality, fresh product drawn in front of you.</p>
<div style="background:#fff;border:2px solid #5eead4;border-radius:14px;padding:24px 24px;margin:28px 0;box-shadow:0 4px 16px rgba(13,148,136,0.12),inset 0 1px 0 rgba(255,255,255,0.8);">
<p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#0f766e;text-transform:uppercase;">Price snapshot</p>
<p style="margin:0;font-size:13px;line-height:1.65;color:#134e4a;"><strong>Botox</strong> $11.11/unit · 90-unit pkg $1000 · <strong>Daxxify</strong> 4–6 months · <strong>Fillers</strong> from $450 · Buy 2 Get 1 Free · <strong>Weight loss</strong> GLP-1 from $100/week · <strong>EM Slim Neo</strong> 4 sessions $1000 · <strong>Stem cells</strong> from $850 · <strong>NAD+/B12</strong> $100 or 4 for $300 · Pico 3 for $900 · Tattoo removal buy 3, 4th free.</p>
</div>
<p style="margin:30px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#0f766e;text-transform:uppercase;">Why patients choose us</p>
<p style="margin:0 0 20px;font-size:14px;line-height:1.7;">Dr. Kathryn Schaefer, MD brings over <strong>25 years</strong> of experience and a commitment to <strong>natural-looking results</strong>. You get personal care: under-15-minute visits, free parking at Aina Haina, and a complimentary 2-week touch-up on injectables. We also offer a free online cost calculator so you can plan your visit with confidence.</p>
<ul style="margin:0 0 28px;padding-left:22px;font-size:14px;line-height:1.8;">
<li style="margin-bottom:10px;"><strong>Botox & Daxxify:</strong> $11.11/unit; 90-unit pkg $1000; nurse option saves $1/unit; Daxxify lasts 4–6 months</li>
<li style="margin-bottom:10px;"><strong>Dermal fillers:</strong> Juvéderm Volbella, Vollure, Voluma, Versa from $450; Buy 2 Get 1 Free; lips, cheeks, smile lines</li>
<li style="margin-bottom:10px;"><strong>Migraine:</strong> Botox for chronic migraines (15+ headache days); insurance-friendly; PREEMPT protocol</li>
<li style="margin-bottom:10px;"><strong>Weight loss:</strong> Physician-monitored GLP-1 from $100/week</li>
<li style="margin-bottom:10px;"><strong>Body & wellness:</strong> EM Slim Neo 4 sessions $1000; LipoHIFU; NAD+ and B12</li>
<li style="margin-bottom:10px;"><strong>Skin & laser:</strong> RF microneedling, CO2 laser, Pico 3 for $900, tattoo removal buy 3 get 4th free</li>
<li style="margin-bottom:0;"><strong>Regenerative:</strong> Wharton's Jelly stem cells from $850; Latisse, laser hair removal, mole removal; Nitronox available</li>
</ul>
<div style="background:linear-gradient(145deg,#ccfbf1 0%,#99f6e4 100%);border:2px solid #0d9488;border-radius:14px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(13,148,136,0.2);">
<p style="margin:0 0 16px;font-size:15px;color:#134e4a;line-height:1.55;"><strong>Getting you scheduled:</strong> 850 W Hind Dr, Suite 109, Honolulu (Aina Haina) – free parking. Mon, Tue, Thu, Fri 8am–5pm.</p>
<p style="margin:0;"><a href="https://www.botoxoahu.com" style="display:inline-block;background:linear-gradient(145deg,#0d9488 0%,#0f766e 100%);color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 4px 14px rgba(13,148,136,0.4);">BotoxOahu.com</a> <span style="color:#134e4a;font-weight:600;margin-left:12px;">or (808) 261-1121</span></p>
</div>
<div style="margin-top:28px;padding-top:24px;border-top:2px solid #99f6e4;"><img src="{{BASE_URL}}/promo/botoxcard.png" alt="Botox Oahu" width="280" style="display:block;max-width:100%;height:auto;border:0;border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,0.1);" /></div>
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
    html: `<div style="font-family:'Segoe UI',system-ui,sans-serif;max-width:600px;background:#f8fafc;border:1px solid #1e293b;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(30,41,59,0.22),0 4px 12px rgba(0,0,0,0.06);">
<div style="background:linear-gradient(145deg,#1e293b 0%,#334155 45%,#475569 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #3b82f6;text-shadow:0 1px 2px rgba(0,0,0,0.2);">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">Coral Crown Solutions</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Unlock your digital kingdom</h1>
<p style="margin:14px 0 0;font-size:14px;opacity:0.95;">We'd be honored to be your all-in-one partner – from custom code to creative content.</p>
</div>
<div style="padding:32px 28px;color:#334155;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1e40af;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #cbd5e1;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;"><span style="display:inline-block;background:#dbeafe;color:#1e40af;font-weight:700;padding:2px 8px;border-radius:6px;font-size:12px;margin-right:6px;">Main ask</span> Let us build or grow your online presence – whether you're an entrepreneur, artist, actor, or creator, we deliver custom solutions (no bloated themes) and stay with you from launch to marketing.</p>
<p style="margin:28px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1e40af;text-transform:uppercase;">Who we empower</p>
<ul style="margin:0 0 22px;padding-left:22px;font-size:14px;line-height:1.75;">
<li style="margin-bottom:8px;"><strong>Entrepreneurs:</strong> Custom websites, e-commerce (Amazon/Etsy), targeted ad campaigns</li>
<li style="margin-bottom:8px;"><strong>Artists:</strong> Fee-free music players, digital distribution, custom CDs & USBs</li>
<li style="margin-bottom:8px;"><strong>Actors & models:</strong> Digital portfolios, professional headshots, career tools</li>
<li style="margin-bottom:0;"><strong>Creators & talents:</strong> Platform development, monetization, content creation</li>
</ul>
<p style="margin:26px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1e40af;text-transform:uppercase;">Why choose us</p>
<p style="margin:0 0 22px;font-size:14px;line-height:1.7;">Custom solutions from scratch – no bloated themes. One partner from initial code to marketing. Proven results across e-commerce, games, and platforms.</p>
<div style="background:#eff6ff;border:2px solid #3b82f6;border-radius:14px;padding:20px 22px;margin:22px 0;box-shadow:0 4px 14px rgba(59,130,246,0.12);">
<p style="margin:0 0 10px;font-size:13px;color:#1e3a8a;font-style:italic;">"They updated my Shopify website, helped with graphics, and made it easy to implement AI in my business!"</p>
<p style="margin:0;font-size:13px;color:#1e3a8a;font-style:italic;">"Coral Crown took my business to the next level with the best SEO and site upgrades. I recommend!"</p>
</div>
<p style="margin:26px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#1e40af;text-transform:uppercase;">What we offer</p>
<ul style="margin:0 0 20px;padding-left:22px;font-size:14px;line-height:1.75;">
<li style="margin-bottom:8px;"><strong>Websites:</strong> Custom build, $20/mo hosting + maintenance, FREE SSL, SEO</li>
<li style="margin-bottom:8px;"><strong>E-commerce:</strong> Amazon, Etsy, eBay; shopping carts on Instagram, TikTok, Facebook</li>
<li style="margin-bottom:8px;"><strong>Digital advertising:</strong> Facebook, X, YouTube – verified accounts, targeted campaigns</li>
<li style="margin-bottom:0;"><strong>For creatives:</strong> Music players, Spotify/Apple Music distribution, custom CDs & USBs, photography & video</li>
</ul>
<p style="margin:0 0 26px;font-size:14px;line-height:1.5;"><strong>Hosting:</strong> $5/mo hosting only; $20/mo hosting + maintenance with free SSL. Unlimited WHM, 99.9% uptime.</p>
<div style="background:linear-gradient(145deg,#dbeafe 0%,#e0f2fe 100%);border:2px solid #0ea5e9;border-radius:14px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(14,165,233,0.2);">
<p style="margin:0 0 16px;font-size:15px;color:#0c4a6e;line-height:1.5;"><strong>Next step:</strong> We'll put together a plan that fits your goals and budget.</p>
<p style="margin:0;"><a href="https://www.coralcrownsolutions.com" style="display:inline-block;background:linear-gradient(145deg,#2563eb 0%,#1d4ed8 100%);color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 4px 14px rgba(37,99,235,0.4);">CoralCrownSolutions.com</a></p>
</div>
<div style="margin-top:28px;padding-top:24px;border-top:2px solid #cbd5e1;"><img src="{{BASE_URL}}/promo/coralcrownfront.jpg" alt="Coral Crown Solutions" width="280" style="display:block;max-width:100%;height:auto;border:0;border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,0.1);" /><img src="{{BASE_URL}}/promo/coralcrownback.jpg" alt="Coral Crown Solutions" width="280" style="display:block;max-width:100%;height:auto;border:0;margin-top:12px;border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,0.1);" /></div>
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
    html: `<div style="font-family:Georgia,'Times New Roman',serif;max-width:600px;background:#fffbeb;border:1px solid #b45309;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(180,83,9,0.2),0 4px 12px rgba(0,0,0,0.06);">
<div style="background:linear-gradient(145deg,#b45309 0%,#92400e 45%,#78350f 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #f59e0b;text-shadow:0 1px 2px rgba(0,0,0,0.2);">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">Free to join</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Join Prayer Authority</h1>
<p style="margin:14px 0 0;font-size:15px;opacity:0.95;">A global Christian prayer community – instant access, spiritual tech that strengthens your walk.</p>
</div>
<div style="padding:32px 28px;color:#78350f;">
<p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#92400e;text-transform:uppercase;">Hello</p>
<p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.4;border-bottom:2px solid #fde68a;padding-bottom:16px;">Hi {{Name}},</p>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;"><span style="display:inline-block;background:#fef3c7;color:#92400e;font-weight:700;padding:2px 8px;border-radius:6px;font-size:12px;margin-right:6px;">Main ask</span> We'd love to have you in our community. Sign up with Google in 10 seconds – no forms, no commitment – and get instant access to your dashboard and every tool built to help you pray, grow in Scripture, and connect with believers worldwide.</p>
<p style="margin:28px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#92400e;text-transform:uppercase;">Why so many are joining</p>
<p style="margin:0 0 16px;font-size:14px;line-height:1.7;">Prayer Authority is where <strong>faith meets action</strong>. Submit prayer requests and receive support from believers around the globe. Use spiritual tech: <strong>P48X Journal</strong>, <strong>Battle Sword</strong>, <strong>Scriptural Vitamins</strong>, <strong>Dreamstone</strong>, <strong>Urim & Thummim</strong>, <strong>12-Counselor panel</strong>, <strong>Spousal Translator</strong>, Complimentor, Bible Trivia, Pray Out Loud, and more.</p>
<p style="margin:0 0 26px;font-size:14px;line-height:1.7;"><strong>Ruby</strong> (free forever) includes core tools; <strong>Diamond</strong> (premium) adds Dreamstone, 12-Counselor, Spousal Translator, Urim & Thummim. Every tool is built to help you fix your thoughts on what is true, honorable, and praiseworthy.</p>
<div style="background:linear-gradient(145deg,#fef3c7 0%,#fde68a 100%);border:2px solid #b45309;border-radius:14px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(180,83,9,0.2);">
<p style="margin:0 0 18px;font-size:15px;color:#78350f;line-height:1.55;"><strong>Getting you in:</strong> Click below to join with Google – instant access to your dashboard and all member tools. No pressure, just a place where prayer and Scripture come together.</p>
<p style="margin:0;"><a href="https://www.prayerauthority.com" style="display:inline-block;background:linear-gradient(145deg,#b45309 0%,#92400e 100%);color:#fff;padding:14px 32px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 4px 14px rgba(180,83,9,0.4);">Join free – Prayer Authority</a></p>
</div>
<div style="margin-top:28px;padding-top:24px;border-top:2px solid #fde68a;"><img src="{{BASE_URL}}/promo/prayerauthorityfront.jpg" alt="Prayer Authority" width="280" style="display:block;max-width:100%;height:auto;border:0;border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,0.1);" /><img src="{{BASE_URL}}/promo/prayerauthorityback.jpg" alt="Prayer Authority" width="280" style="display:block;max-width:100%;height:auto;border:0;margin-top:12px;border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,0.1);" /></div>
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
    html: `<div style="font-family:Georgia,'Times New Roman',serif;max-width:600px;background:#fef9c3;border:1px solid #92400e;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(146,64,14,0.2),0 4px 12px rgba(0,0,0,0.06);">
<div style="background:linear-gradient(145deg,#92400e 0%,#78350f 45%,#654321 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #f59e0b;text-shadow:0 1px 2px rgba(0,0,0,0.2);">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">For your church</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Prayer Authority for your church</h1>
<p style="margin:12px 0 0;font-size:15px;opacity:0.95;">Bring prayer tools and a global community to your congregation – we'd be honored to partner with you.</p>
</div>
<div style="padding:28px 26px;color:#78350f;">
<p style="margin:0 0 18px;font-size:16px;line-height:1.55;">Hi {{Name}},</p>
<p style="margin:0 0 22px;font-size:15px;line-height:1.65;"><strong>Main ask:</strong> Let your church experience Prayer Authority – a platform that gives every member access to prayer requests, Scripture tools, dream interpretation, and biblical counsel. We've built it so congregations can grow together in faith and connection.</p>
<h3 style="margin:26px 0 12px;font-size:16px;color:#92400e;font-weight:700;padding-left:12px;border-left:4px solid #f59e0b;">Why churches love it</h3>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;"><strong>Ruby</strong> (free forever) and <strong>Diamond</strong> (premium) tiers – get your entire church signed up and members get dashboards, prayer tools, and community. Features include prayer requests with worldwide support, <strong>P48X Journal</strong>, <strong>Battle Sword</strong>, <strong>Scriptural Vitamins</strong>, <strong>Dreamstone</strong> (dream interpretation), <strong>12-Counselor panel</strong>, <strong>Urim & Thummim</strong>, Spousal Translator, Complimentor, Bible Trivia, Pray Out Loud. Ideal for small groups, youth, and church-wide engagement.</p>
<p style="margin:0 0 20px;font-size:14px;line-height:1.65;">Prayer Authority is committed to a secure, respectful environment – every tool exists to help your people grow closer to God and fulfill the calling He's placed on their lives.</p>
<div style="background:linear-gradient(135deg,#fef08a 0%,#fde047 100%);border:2px solid #92400e;border-radius:12px;padding:20px 22px;margin:24px 0;box-shadow:0 2px 8px rgba(146,64,14,0.12);">
<p style="margin:0;font-size:15px;color:#78350f;line-height:1.5;"><strong>Next step:</strong> Get your leadership and key volunteers signed up first, then roll out to your congregation. Reply to this email or visit <a href="https://www.prayerauthority.com" style="color:#92400e;font-weight:600;">PrayerAuthority.com</a> – we're here to help you onboard.</p>
</div>
<div style="margin-top:24px;padding-top:20px;border-top:2px solid #fde047;"><img src="{{BASE_URL}}/promo/prayerauthorityfront.jpg" alt="Prayer Authority" width="280" style="display:block;max-width:100%;height:auto;border:0;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);" /><img src="{{BASE_URL}}/promo/prayerauthorityback.jpg" alt="Prayer Authority" width="280" style="display:block;max-width:100%;height:auto;border:0;margin-top:10px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);" /></div>
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
    html: `<div style="font-family:sans-serif;max-width:600px;background:#dcfce7;border:2px solid #15803d;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(21,128,61,0.22),0 4px 12px rgba(0,0,0,0.06);">
<div style="background:linear-gradient(145deg,#15803d 0%,#166534 45%,#14532d 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #22c55e;text-shadow:0 1px 2px rgba(0,0,0,0.15);">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">Time for Fun Hawaii</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Discover the best Hawaii tours with exclusive discounts</h1>
<p style="margin:12px 0 0;font-size:15px;opacity:0.95;">Aloha! Time for Fun Hawaii – Oahu, Maui & Big Island. Two ways to save.</p>
</div>
<div style="padding:28px 26px;color:#14532d;">
<p style="margin:0 0 18px;font-size:16px;line-height:1.55;">Hi {{Name}},</p>
<p style="margin:0 0 22px;font-size:15px;line-height:1.65;"><strong>Main ask:</strong> We'd love to help you unlock incredible savings on your dream Hawaiian vacation. Watch our short webinar and get exclusive wholesale rates on Hawaii's top tours – or skip the webinar and still book with us; we'll call and help you plan.</p>
<h3 style="margin:26px 0 12px;font-size:16px;color:#15803d;font-weight:700;padding-left:12px;border-left:4px solid #22c55e;">Why book with us</h3>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;">Welcome to <strong>Time for Fun Hawaii</strong> – Hawaii's premier tour booking platform. From breathtaking adventures to insider tips, we're here so you can experience more during your time on the islands.</p>
<ol style="margin:0 0 18px;padding-left:22px;font-size:14px;line-height:1.75;">
<li style="margin-bottom:8px;"><strong>Watch our webinar</strong> (60–75 min on Zoom) – get exclusive wholesale discounts on Pearl Harbor tours, Hawaiian luaus, helicopter tours, snorkeling, Road to Hana, volcano tours, and more.</li>
<li style="margin-bottom:0;"><strong>No time?</strong> Add tours to your tour bag, send it to us, and we'll call you to help set up your vacation – no webinar required.</li>
</ol>
<p style="margin:0 0 20px;font-size:14px;line-height:1.65;"><strong>Webinar schedule:</strong> 60–75 min on Zoom. Mon–Tue 12:45AM & 2:45PM HST; Wed–Sun 8:45AM, 10:45AM, 12:45PM HST (check-in 15 min before). One attendee 25–71, US/Canadian, $40k+ household income. Couples attend together; single females welcome. Computer or tablet (no phones).</p>
<div style="background:linear-gradient(145deg,#fef08a 0%,#facc15 100%);border:2px solid #15803d;border-radius:14px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(21,128,61,0.2);">
<p style="margin:0 0 16px;font-size:15px;color:#14532d;line-height:1.5;"><strong>Ready to start your Hawaiian adventure?</strong> Call <strong>(808) 393-0153</strong> or register for our webinar.</p>
<p style="margin:0 0 12px;"><a href="https://www.timeforfunhawaii.com" style="display:inline-block;background:linear-gradient(145deg,#15803d 0%,#166534 100%);color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 4px 14px rgba(21,128,61,0.4);">Register – Time for Fun Hawaii</a></p>
<p style="margin:0;font-size:14px;"><a href="https://www.youtube.com/watch?v=StNgZM1DuSg" style="color:#166534;font-weight:600;">Watch our how-to video</a> – see how easy it is.</p>
</div>
<div style="margin-top:28px;padding-top:24px;border-top:2px solid #86efac;"><img src="{{BASE_URL}}/promo/timeforfunhawaii.jpg" alt="Time for Fun Hawaii" width="280" style="display:block;max-width:100%;height:auto;border:0;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);" /><img src="{{BASE_URL}}/promo/timeforfunhawaiiback.jpg" alt="Time for Fun Hawaii" width="280" style="display:block;max-width:100%;height:auto;border:0;margin-top:10px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);" /></div>
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
    html: `<div style="font-family:sans-serif;max-width:600px;background:#e0f2fe;border:2px solid #0369a1;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(3,105,161,0.22),0 4px 12px rgba(0,0,0,0.06);">
<div style="background:linear-gradient(145deg,#0369a1 0%,#0c4a6e 45%,#0e7490 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #0ea5e9;text-shadow:0 1px 2px rgba(0,0,0,0.2);">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">Time for Fun USA</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Choose 1 of 4 complimentary vacations</h1>
<p style="margin:12px 0 0;font-size:15px;opacity:0.95;">Attend our webinar – then pick the vacation that's perfect for you. Our thank-you to you.</p>
</div>
<div style="padding:28px 26px;color:#0c4a6e;">
<p style="margin:0 0 18px;font-size:16px;line-height:1.55;">Hi {{Name}},</p>
<p style="margin:0 0 22px;font-size:15px;line-height:1.65;"><strong>Main ask:</strong> We'd love to give you a complimentary vacation. Attend our 60–75 minute educational webinar on wholesale travel – then choose one of four incredible packages: Carnival Cruise (3–5 nights), 7 Night Condo Stay in the US, 7 Day Caribbean Cruise for Two, or Mexico Getaway (8 days / 7 nights). You pay only required fees and taxes when you're ready to go.</p>
<h3 style="margin:26px 0 12px;font-size:16px;color:#0369a1;font-weight:700;padding-left:12px;border-left:4px solid #0ea5e9;">Why you'll love it</h3>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;"><strong>H.I.E. Wholesale Travel Company</strong> – Hawaii-based, A+ BBB, 500,000+ active users. We've made it simple: attend one presentation, learn about wholesale travel, and walk away with your choice of vacation. Valid 18 months. If you never use it, there's no cost whatsoever.</p>
<ul style="margin:0 0 18px;padding-left:22px;font-size:14px;line-height:1.75;">
<li style="margin-bottom:6px;"><strong>Carnival Cruise</strong> (3, 4, or 5 nights) – Bahamas, Caribbean, Mexico; meals and entertainment included</li>
<li style="margin-bottom:6px;"><strong>7 Night Condo Stay</strong> – US destinations; full kitchens, perfect for families</li>
<li style="margin-bottom:6px;"><strong>7 Day Caribbean Cruise for Two</strong> – major ports; unforgettable experience</li>
<li style="margin-bottom:0;"><strong>Mexico Getaway</strong> (8d/7n) – stunning beaches, tropical paradise</li>
</ul>
<p style="margin:0 0 20px;font-size:14px;line-height:1.65;"><strong>Requirements:</strong> 25+, US or Canadian citizen, $40k+ household income. Married or cohabitating couples attend together; single females may attend alone. Desktop, laptop, or tablet with camera and microphone (no phones). Not at work or on lunch break.</p>
<div style="background:linear-gradient(145deg,#f97316 0%,#ea580c 100%);color:#fff;padding:24px 26px;margin:28px 0;border-radius:14px;box-shadow:0 4px 16px rgba(249,115,22,0.35);">
<p style="margin:0 0 16px;font-size:15px;line-height:1.5;"><strong>Register now – we'll get you scheduled.</strong></p>
<p style="margin:0;"><a href="https://www.timeforfunusa.com" style="display:inline-block;background:rgba(255,255,255,0.25);color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;border:2px solid rgba(255,255,255,0.6);">TimeForFunUSA.com</a></p>
</div>
<div style="margin-top:28px;padding-top:24px;border-top:2px solid #7dd3fc;"><img src="{{BASE_URL}}/promo/timeforfunusa.jpg" alt="Time for Fun USA" width="280" style="display:block;max-width:100%;height:auto;border:0;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);" /><img src="{{BASE_URL}}/promo/timeforfunusaback.jpg" alt="Time for Fun USA" width="280" style="display:block;max-width:100%;height:auto;border:0;margin-top:10px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);" /></div>
</div>
</div>`,
  },
  "elion-fans": {
    subject: "E Lion Music – Holy Hip-Hop from Hawaii. Stream everywhere.",
    text: `Hi {{Name}},

We'd love for you to hit play on E Lion – Holy Hip-Hop from Hawaii that's been turning heads for over 15 years. Your taste in music says a lot, and we think you'll dig the blend of faith, flow, and island vibes.

Why E Lion: He's not just another Christian rapper – he's a prophetic voice with 1,000+ performances, 10M+ YouTube views, 30K+ CDs sold hand-to-hand, and Family Feud grand prize winner (2016 – first Hawaiian family to win 5 consecutive episodes). His sound is "Hip Hope" – hip-hop meets worship, Hawaiian and Hebrew themes, music that uplifts. Albums like Father Nature, Bible Battle Royale, Lightclub, and Just Us; author of P48X (Philippians 4:8). You can stream everywhere: Spotify, Apple Music, Amazon Music, TikTok, Pandora, SoundCloud, Deezer, iHeartRadio.

Where to start: Pick your platform and hit follow. Full catalog, bio, and more at elionmusic.com – and if you love it, share it with someone who needs the vibe.

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;background:#1c1917;border:2px solid #f59e0b;border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(245,158,11,0.3),0 4px 12px rgba(0,0,0,0.2);">
<div style="background:linear-gradient(145deg,#f59e0b 0%,#d97706 45%,#b45309 100%);color:#fff;padding:32px 28px;border-bottom:4px solid #fbbf24;text-shadow:0 1px 2px rgba(0,0,0,0.2);">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;opacity:0.9;">E Lion Music</p>
<h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">Holy Hip-Hop from Hawaii</h1>
<p style="margin:12px 0 0;font-size:15px;opacity:0.95;">We'd love for you to hit play. Your taste in music says a lot – we think you'll dig this.</p>
</div>
<div style="padding:28px 26px;color:#fef3c7;">
<p style="margin:0 0 18px;font-size:16px;line-height:1.55;">Hi {{Name}},</p>
<p style="margin:0 0 22px;font-size:15px;line-height:1.65;"><strong>Main ask:</strong> Hit follow and stream E Lion on your favorite platform. He's been making "Hip Hope" – hip-hop that uplifts – for over 15 years, and we'd be honored to have you in the mix.</p>
<h3 style="margin:26px 0 12px;font-size:16px;color:#fbbf24;font-weight:700;padding-left:12px;border-left:4px solid #f59e0b;">Why E Lion</h3>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;">E Lion (Eric Hans Schaefer) isn't just another Christian rapper – he's a prophetic voice with <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>, <strong>30K+ CDs sold</strong> hand-to-hand, and <strong>Family Feud grand prize winner</strong> (2016 – first Hawaiian family to win 5 consecutive episodes). His sound blends hip-hop with worship, Hawaiian and Hebrew themes. Albums: Father Nature, Bible Battle Royale, Lightclub, Just Us; author of <strong>P48X</strong> (Philippians 4:8).</p>
<p style="margin:0 0 20px;font-size:14px;line-height:1.6;"><strong>Stream everywhere:</strong> <a href="https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA" style="color:#fbbf24;">Spotify</a> · <a href="https://music.apple.com/us/artist/e-lion/1111804063" style="color:#fbbf24;">Apple Music</a> · <a href="https://www.amazon.com/music/player/artists/B01GOGAW4W/e-lion" style="color:#fbbf24;">Amazon Music</a> · <a href="https://www.tiktok.com/@elionreigns" style="color:#fbbf24;">TikTok</a> · <a href="https://www.pandora.com/artist/e-lion/AR9vZJllkt3JmVq" style="color:#fbbf24;">Pandora</a> · <a href="https://soundcloud.com/elionrapmusic" style="color:#fbbf24;">SoundCloud</a> · <a href="https://www.deezer.com/us/artist/354652062" style="color:#fbbf24;">Deezer</a> · <a href="https://www.iheart.com/artist/e-lion-46608091/" style="color:#fbbf24;">iHeartRadio</a></p>
<div style="background:#292524;border:2px solid #f59e0b;border-radius:14px;padding:24px 26px;margin:28px 0;box-shadow:0 4px 16px rgba(0,0,0,0.4);">
<p style="margin:0 0 16px;font-size:15px;color:#fef3c7;line-height:1.5;"><strong>Where to start:</strong> Full catalog, bio, and more. If you love it, share it with someone who needs the vibe.</p>
<p style="margin:0;"><a href="https://www.elionmusic.com" style="display:inline-block;background:linear-gradient(145deg,#f59e0b 0%,#d97706 100%);color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;box-shadow:0 4px 14px rgba(245,158,11,0.4);">elionmusic.com</a></p>
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

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;background:#f5f3ff;border:2px solid #7c3aed;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(124,58,237,0.28),0 4px 12px rgba(0,0,0,0.06);">
<div style="background:linear-gradient(135deg,#7c3aed 0%,#5b21b6 50%,#4c1d95 100%);color:#fff;padding:28px 26px;border-bottom:3px solid #a78bfa;">
<h1 style="margin:0;font-size:24px;font-weight:700;letter-spacing:-0.02em;line-height:1.25;">Let's collaborate</h1>
<p style="margin:12px 0 0;font-size:15px;opacity:0.95;">E Lion would be honored to work with you – free. We respect what you're doing and believe our audiences would connect.</p>
</div>
<div style="padding:28px 26px;color:#4c1d95;">
<p style="margin:0 0 18px;font-size:16px;line-height:1.55;">Hi {{Name}},</p>
<p style="margin:0 0 22px;font-size:15px;line-height:1.65;"><strong>Main ask:</strong> E Lion is reaching out to peer artists for <strong>free collaboration</strong> – custom verses, features, cross-promotion. We're not looking for a handout; we're looking for creatives who want to grow together and make something that reaches both our audiences.</p>
<h3 style="margin:26px 0 12px;font-size:16px;color:#6d28d9;font-weight:700;padding-left:12px;border-left:4px solid #7c3aed;">Why it makes sense</h3>
<p style="margin:0 0 20px;font-size:14px;line-height:1.65;">E Lion brings <strong>15+ years</strong>, <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>, and <strong>Family Feud grand prize</strong> (2016 – first Hawaiian family to win 5 consecutive episodes). Holy Hip-Hop from Hawaii – Hawaiian and Hebrew fusion, broadcast-friendly. Music on Spotify, Apple Music, Amazon, TikTok, Pandora, SoundCloud, Deezer, iHeartRadio. Press: <a href="https://www.elionmusic.com/articles/bored-city-interview-e-lion" style="color:#6d28d9;">Bored City</a>, <a href="https://www.elionmusic.com/articles/spotlight-interview-e-lion" style="color:#6d28d9;">Spotlight</a>, <a href="https://www.elionmusic.com/articles/tbk247-island-roots-faith-healing-music" style="color:#6d28d9;">TBK247</a>, <a href="https://www.elionmusic.com/wiki/" style="color:#6d28d9;">Wiki</a>.</p>
<div style="background:linear-gradient(135deg,#ede9fe 0%,#ddd6fe 100%);border:2px solid #7c3aed;border-radius:12px;padding:20px 22px;margin:24px 0;box-shadow:0 2px 8px rgba(124,58,237,0.12);">
<p style="margin:0;font-size:15px;color:#4c1d95;line-height:1.5;"><strong>Next step:</strong> Reply to this email or hit <a href="https://www.elionmusic.com" style="color:#6d28d9;font-weight:600;">elionmusic.com</a> and say you're in. We'll send you the catalog, pick a direction, and get down to details – tempo, vibe, credits. We'd love to make something fire with you.</p>
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

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;background:#eff6ff;border:2px solid #1e40af;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(30,64,175,0.24),0 4px 12px rgba(0,0,0,0.06);">
<div style="background:linear-gradient(135deg,#1e40af 0%,#1e3a8a 50%,#1d4ed8 100%);color:#fff;padding:28px 26px;border-bottom:3px solid #3b82f6;">
<h1 style="margin:0;font-size:24px;font-weight:700;letter-spacing:-0.02em;line-height:1.25;">Partner with E Lion</h1>
<p style="margin:12px 0 0;font-size:15px;opacity:0.95;">We'd love to work with a brand like yours – your product deserves visibility with an audience that trusts the artist.</p>
</div>
<div style="padding:28px 26px;color:#1e3a8a;">
<p style="margin:0 0 18px;font-size:16px;line-height:1.55;">Hi {{Name}},</p>
<p style="margin:0 0 22px;font-size:15px;line-height:1.65;"><strong>Main ask:</strong> E Lion is open to <strong>sponsored brand partnerships</strong> – he'll wear or use your products in exchange for store credit or specific items from your site. We're not asking for a free ride – we're offering real exposure to a proven, family-friendly audience in exchange for product or credit.</p>
<h3 style="margin:26px 0 12px;font-size:16px;color:#1d4ed8;font-weight:700;padding-left:12px;border-left:4px solid #3b82f6;">Why E Lion</h3>
<p style="margin:0 0 20px;font-size:14px;line-height:1.65;">Proven reach: an estimated <strong>115–145 million unique viewers</strong> have seen his Family Feud grand prize run (2016, 5 consecutive wins; 183–234M total views in syndication). Plus <strong>10M+ YouTube views</strong>, <strong>1,000+ live performances</strong>, <strong>30K+ CDs sold</strong>, and music on Spotify, Apple Music, Amazon, TikTok, Pandora, SoundCloud, Deezer, iHeartRadio. First Hawaiian family to win Family Feud – high recall, positive association. <a href="https://www.elionmusic.com/rap/" style="color:#1d4ed8;">Official profile</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#1d4ed8;">Grand prize coverage</a></p>
<div style="background:linear-gradient(135deg,#dbeafe 0%,#bfdbfe 100%);border:2px solid #1e40af;border-radius:12px;padding:20px 22px;margin:24px 0;box-shadow:0 2px 8px rgba(30,64,175,0.1);">
<p style="margin:0;font-size:15px;color:#1e3a8a;line-height:1.5;"><strong>Next step:</strong> Reply with what you have in mind (apparel, gear, etc.). We'll get down to details – what E Lion would wear/use, how we'll tag and credit you, and where your brand appears. <a href="https://www.elionmusic.com" style="color:#1d4ed8;font-weight:600;">elionmusic.com</a></p>
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
    html: `<div style="font-family:sans-serif;max-width:600px;background:#fff7ed;border:2px solid #ea580c;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(234,88,12,0.24),0 4px 12px rgba(0,0,0,0.06);">
<div style="background:linear-gradient(135deg,#ea580c 0%,#c2410c 50%,#9a3412 100%);color:#fff;padding:28px 26px;border-bottom:3px solid #fb923c;">
<h1 style="margin:0;font-size:24px;font-weight:700;letter-spacing:-0.02em;line-height:1.25;">Your beats. Full credit.</h1>
<p style="margin:12px 0 0;font-size:15px;opacity:0.95;">E Lion wants exclusive access to your beats – you get full credit on every release and every platform.</p>
</div>
<div style="padding:28px 26px;color:#9a3412;">
<p style="margin:0 0 18px;font-size:16px;line-height:1.55;">Hi {{Name}},</p>
<p style="margin:0 0 22px;font-size:15px;line-height:1.65;"><strong>Main ask:</strong> E Lion would like <strong>exclusive access to your beats</strong> for his recordings. In exchange, <strong>your name is credited on all releases</strong> and across his networks – Spotify, Apple Music, Amazon Music, TikTok, Pandora, SoundCloud, Deezer, iHeartRadio. Your sound gets in front of millions; your name stays on the record.</p>
<h3 style="margin:26px 0 12px;font-size:16px;color:#c2410c;font-weight:700;padding-left:12px;border-left:4px solid #ea580c;">Why work with E Lion</h3>
<p style="margin:0 0 20px;font-size:14px;line-height:1.65;"><strong>15+ years</strong> in music, <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>, Family Feud grand prize winner. Style: Holy Hip-Hop – Hawaiian and Hebrew fusion, high-energy, clean, broadcast-friendly. He's serious about quality and serious about giving producers their due – no ghost credits.</p>
<p style="margin:0 0 20px;font-size:14px;"><a href="https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA" style="color:#c2410c;">Spotify</a> · <a href="https://music.apple.com/us/artist/e-lion/1111804063" style="color:#c2410c;">Apple Music</a> · <a href="https://www.elionmusic.com" style="color:#c2410c;">elionmusic.com</a></p>
<div style="background:linear-gradient(135deg,#ffedd5 0%,#fed7aa 100%);border:2px solid #ea580c;border-radius:12px;padding:20px 22px;margin:24px 0;box-shadow:0 2px 8px rgba(234,88,12,0.12);">
<p style="margin:0;font-size:15px;color:#9a3412;line-height:1.5;"><strong>Next step:</strong> Reply if you're down to send beats for exclusive use. We'll get into format, BPM range, and how you want to be credited. We're ready when you are.</p>
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

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:Georgia,serif;max-width:600px;background:#fffbeb;border:2px solid #b45309;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(180,83,9,0.22),0 4px 12px rgba(0,0,0,0.06);">
<div style="background:linear-gradient(135deg,#b45309 0%,#92400e 50%,#78350f 100%);color:#fff;padding:28px 26px;border-bottom:3px solid #f59e0b;">
<h1 style="margin:0;font-size:24px;font-weight:700;letter-spacing:-0.02em;line-height:1.25;">Bring E Lion to your church</h1>
<p style="margin:12px 0 0;font-size:15px;opacity:0.95;">We'd be honored to serve your congregation – full concert, keynote, or a blend. Your people deserve worship that meets them where they are.</p>
</div>
<div style="padding:28px 26px;color:#78350f;">
<p style="margin:0 0 18px;font-size:16px;line-height:1.55;">Hi {{Name}},</p>
<p style="margin:0 0 22px;font-size:15px;line-height:1.65;"><strong>Main ask:</strong> E Lion is available for <strong>church events</strong> – full concert (1 hour+ of original Holy Hip-Hop, 15-minute speaking segments, P48X book promotion, Prayer Authority app demo) or conference keynote (15–45 min with musical segments and meet & greet). We'd love to partner with you for a service or conference.</p>
<h3 style="margin:26px 0 12px;font-size:16px;color:#92400e;font-weight:700;padding-left:12px;border-left:4px solid #f59e0b;">Why E Lion</h3>
<p style="margin:0 0 20px;font-size:14px;line-height:1.65;"><strong>15+ years</strong> in ministry and music, <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>, Family Feud grand prize winner (2016 – first Hawaiian family to win 5 consecutive episodes). Prophetic endorsements from major Christian leaders; performed at Waikiki Shell, Blaisdell, HebrewFest, and churches nationwide. Custom set list – you choose which songs fit your service. <a href="https://www.elionmusic.com/rap/" style="color:#92400e;">Full catalog & profile</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#92400e;">Family Feud coverage</a></p>
<div style="background:linear-gradient(135deg,#fef3c7 0%,#fde68a 100%);border:2px solid #b45309;border-radius:12px;padding:20px 22px;margin:24px 0;box-shadow:0 2px 8px rgba(180,83,9,0.12);">
<p style="margin:0;font-size:15px;color:#78350f;line-height:1.5;"><strong>Next step:</strong> Reply with your ideal date(s) and type of event. We'll send a set list, credentials, and get down to details – rate, rider, and how we can serve your people. <a href="https://www.elionmusic.com" style="color:#92400e;font-weight:600;">elionmusic.com</a></p>
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

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;background:#fef2f2;border:2px solid #b91c1c;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(185,28,28,0.26),0 4px 12px rgba(0,0,0,0.06);">
<div style="background:linear-gradient(135deg,#b91c1c 0%,#991b1b 50%,#7f1d1d 100%);color:#fff;padding:28px 26px;border-bottom:3px solid #f87171;">
<h1 style="margin:0;font-size:24px;font-weight:700;letter-spacing:-0.02em;line-height:1.25;">Book E Lion for your stage</h1>
<p style="margin:12px 0 0;font-size:15px;opacity:0.95;">Full concert, custom set list – your stage deserves an artist who can draw and deliver.</p>
</div>
<div style="padding:28px 26px;color:#7f1d1d;">
<p style="margin:0 0 18px;font-size:16px;line-height:1.55;">Hi {{Name}},</p>
<p style="margin:0 0 22px;font-size:15px;line-height:1.65;"><strong>Main ask:</strong> E Lion is available for <strong>festivals and stage shows</strong> – full concert (1 hour+ of original Holy Hip-Hop, 15-minute speaking segments, audience interaction). Custom set list – you select which songs he performs at your venue.</p>
<h3 style="margin:26px 0 12px;font-size:16px;color:#b91c1c;font-weight:700;padding-left:12px;border-left:4px solid #f87171;">Reach & credentials</h3>
<p style="margin:0 0 20px;font-size:14px;line-height:1.65;">An estimated <strong>115–145 million unique viewers</strong> have seen his Family Feud grand prize run (2016; 183–234M total views in syndication). <strong>15+ years</strong>, <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>. First Hawaiian family to win 5 consecutive episodes. Performed at Waikiki Shell, Blaisdell, HebrewFest, and venues across the US and internationally. Music on Spotify, Apple Music, Amazon, TikTok, Pandora, SoundCloud, Deezer, iHeartRadio. <a href="https://www.elionmusic.com/rap/" style="color:#b91c1c;">Profile & catalog</a> · <a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#b91c1c;">Family Feud coverage</a></p>
<div style="background:linear-gradient(135deg,#fee2e2 0%,#fecaca 100%);border:2px solid #b91c1c;border-radius:12px;padding:20px 22px;margin:24px 0;box-shadow:0 2px 8px rgba(185,28,28,0.12);">
<p style="margin:0;font-size:15px;color:#7f1d1d;line-height:1.5;"><strong>Next step:</strong> Reply with your event name, date(s), and slot. We'll send credentials, set list, and get down to rider and rate. <a href="https://www.elionmusic.com" style="color:#b91c1c;font-weight:600;">elionmusic.com</a></p>
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

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;background:#1e1b4b;border:2px solid #a78bfa;border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(167,139,250,0.35),0 4px 12px rgba(0,0,0,0.15);">
<div style="background:linear-gradient(135deg,#4c1d95 0%,#5b21b6 50%,#6d28d9 100%);color:#fff;padding:28px 26px;border-bottom:3px solid #c4b5fd;">
<h1 style="margin:0;font-size:24px;font-weight:700;letter-spacing:-0.02em;line-height:1.25;">DJ E Lion – Book your event</h1>
<p style="margin:12px 0 0;font-size:15px;opacity:0.95;">He spins his own music and more – family-friendly, high-energy. Your crowd gets a clean set and a host who's been on stage 1,000+ times.</p>
</div>
<div style="padding:28px 26px;color:#e9d5ff;">
<p style="margin:0 0 18px;font-size:16px;line-height:1.55;">Hi {{Name}},</p>
<p style="margin:0 0 22px;font-size:15px;line-height:1.65;"><strong>Main ask:</strong> <strong>DJ E Lion</strong> is available to DJ your event – his own music and other artists, family-friendly Holy Hip-Hop vibe. Perfect for parties, youth events, and any venue that wants a clean, high-energy set without the edge.</p>
<h3 style="margin:26px 0 12px;font-size:16px;color:#a78bfa;font-weight:700;padding-left:12px;border-left:4px solid #a78bfa;">Why DJ E Lion</h3>
<p style="margin:0 0 20px;font-size:14px;line-height:1.65;"><strong>15+ years</strong> in music, <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>, Family Feud grand prize winner (2016). He knows how to read a room and keep the vibe right. Music on Spotify, Apple Music, Amazon, TikTok, Pandora, SoundCloud, Deezer, iHeartRadio.</p>
<div style="background:#312e81;border:2px solid #a78bfa;border-radius:12px;padding:20px 22px;margin:24px 0;box-shadow:0 2px 12px rgba(0,0,0,0.4);">
<p style="margin:0;font-size:15px;color:#e9d5ff;line-height:1.5;"><strong>Next step:</strong> Reply with your event type, date(s), and duration. We'll get into rate and what you need (PA, tables, etc.). <a href="https://www.elionmusic.com" style="color:#a78bfa;font-weight:600;">elionmusic.com</a> – let's turn it up.</p>
</div>
</div>
</div>`,
  },
};
