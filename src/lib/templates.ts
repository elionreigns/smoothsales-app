/**
 * Pre-made email templates for SmoothSales campaigns.
 * Keys: botox | tech | prayer-individual | prayer-church | tourism-hawaii | tourism-usa
 */
export type TemplateId =
  | "botox"
  | "tech"
  | "prayer-individual"
  | "prayer-church"
  | "tourism-hawaii"
  | "tourism-usa";

export const TEMPLATE_OPTIONS: { value: TemplateId; label: string }[] = [
  { value: "botox", label: "Botox Oahu – Price sheet & specials" },
  { value: "tech", label: "Coral Crown Tech – Websites, chatbots, Amazon/Etsy" },
  { value: "prayer-individual", label: "Prayer Authority – Individual member" },
  { value: "prayer-church", label: "Prayer Authority – Church organization" },
  { value: "tourism-hawaii", label: "Time for Fun Hawaii – Tours & webinar" },
  { value: "tourism-usa", label: "Time for Fun USA – Tours & deals" },
];

export function getTemplate(id: TemplateId): { subject: string; html: string; text: string } {
  const t = TEMPLATES[id];
  return { subject: t.subject, html: t.html, text: t.text };
}

/** Service/sub types used by the UI. */
export type ServiceSelection =
  | ""
  | "botox"
  | "tech"
  | "prayer"
  | "tourism";
export type TourismSub = "" | "hawaii" | "usa";
export type PrayerSub = "" | "individual" | "church";

/**
 * Returns only the template options that match the current service (and sub-option).
 * Use this so the bottom template dropdown only shows the right templates.
 */
export function getTemplatesForSelection(
  service: ServiceSelection,
  tourismSub: TourismSub,
  prayerSub: PrayerSub
): { value: TemplateId; label: string }[] {
  if (service === "botox") return TEMPLATE_OPTIONS.filter((o) => o.value === "botox");
  if (service === "tech") return TEMPLATE_OPTIONS.filter((o) => o.value === "tech");
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
  return [];
}

const TEMPLATES: Record<TemplateId, { subject: string; html: string; text: string }> = {
  botox: {
    subject: "Botox Oahu – Physician-led aesthetics, weight loss & specials",
    text: `Botox Oahu – Expert care by Dr. Kathryn Schaefer, MD

Services & pricing:
• Botox: As low as $11.11/unit (90-unit package $1000)
• Daxxify: Lasts longer than Botox, 25% less
• Dermal fillers: From $450 for 0.5cc Volbella | Buy 2, get 1 free on 3-syringe package (save $800)
• Weight loss shots: $100/week (no consult fee with 8-week purchase)
• EM Slim Neo: $125 with package | GLP-1 patient pricing
• Wellness: B12 $25, NAD+ from $55, Glutathione from $55
• Pico laser, RF microneedling, stem cell treatments from $850
• Gift certificates: 10% extra on $100–$500

Located Aina Haina – free parking. Book: https://www.patientfusion.com/doctor/mary-schaefer-md-12622 or call (808) 261-1121.

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;">
<h2>Botox Oahu – Physician-led aesthetics & specials</h2>
<p>Expert care by Dr. Kathryn Schaefer, MD. 25+ years experience. &lt; 15-min wait times.</p>
<h3>Services & pricing</h3>
<ul>
<li>Botox: As low as $11.11/unit (90-unit package $1000)</li>
<li>Daxxify: Lasts longer than Botox, 25% less</li>
<li>Dermal fillers: From $450 | Buy 2, get 1 free (save $800)</li>
<li>Weight loss shots: $100/week (no consult fee with 8-week purchase)</li>
<li>EM Slim / LipoHIFU: GLP-1 patient pricing; 30% off LipoHIFU</li>
<li>Wellness: B12 $25, NAD+ from $55, Glutathione from $55</li>
<li>Gift certificates: 10% extra on $100–$500</li>
</ul>
<p><a href="https://www.botoxoahu.com">BotoxOahu.com</a> | Book: <a href="https://www.patientfusion.com/doctor/mary-schaefer-md-12622">patientfusion.com</a> | (808) 261-1121</p>
<p style="color:#666;font-size:12px;">Coral Crown Solutions | sales@coralcrownsolutions.com</p>
<div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;"><img src="{{BASE_URL}}/promo/botoxcard.png" alt="Botox Oahu" width="280" style="display:block;max-width:100%;height:auto;border:0;" /></div>
</div>`,
  },
  tech: {
    subject: "Coral Crown Solutions – Unlock your digital kingdom",
    text: `Coral Crown Solutions – Unlock your digital kingdom. We build the websites, create the marketing, and provide the tools for your talent or business to thrive online.

What we offer:
• Websites: Build for $800, host $20/mo, help point your domain, monthly updates $100/mo
• Custom chatbots (OpenAI), email agents & AI agents for booking and custom shopping carts
• Amazon & Etsy: Get your products listed, maintain stores
• Pricing depends on scope, length, and regularity – we’re happy to quote

Inquire: sales@coralcrownsolutions.com | CoralCrownSolutions.com

Coral Crown Solutions`,
    html: `<div style="font-family:sans-serif;max-width:600px;">
<h2>Unlock your digital kingdom</h2>
<p>We build the websites, create the marketing, and provide the tools for your talent or business to thrive online. Entrepreneurs, artists, actors/models, creators – custom solutions from scratch, no bloated themes.</p>
<h3>What we offer</h3>
<ul>
<li><strong>Websites:</strong> Build for $800, host $20/mo, domain pointing, monthly updates $100/mo</li>
<li><strong>Chatbots & AI:</strong> Custom-trained chatbots (OpenAI), email agents and AI agents for booking and custom shopping carts</li>
<li><strong>Amazon & Etsy:</strong> Get your products on Amazon and Etsy, maintain your stores</li>
</ul>
<p>Pricing depends on scope, length, and regularity of work. Inquire for a quote.</p>
<p><a href="https://www.coralcrownsolutions.com">CoralCrownSolutions.com</a> | sales@coralcrownsolutions.com</p>
<p style="color:#666;font-size:12px;">Coral Crown Solutions</p>
<div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;"><img src="{{BASE_URL}}/promo/coralcrownfront.jpg" alt="Coral Crown Solutions" width="280" style="display:block;max-width:100%;height:auto;border:0;" /><img src="{{BASE_URL}}/promo/coralcrownback.jpg" alt="Coral Crown Solutions" width="280" style="display:block;max-width:100%;height:auto;border:0;margin-top:8px;" /></div>
</div>`,
  },
  "prayer-individual": {
    subject: "Join Prayer Authority – Free Christian prayer community & tools",
    text: `Prayer Authority – Join a global Christian prayer community

Free to join. Instant access. No commitment.
• Submit prayer requests, receive support from believers worldwide
• Scripture memory tools (P48X Journal, Battle Sword, Scriptural Vitamins)
• Dream interpretation, 12-Counselor panel, Urim & Thummim, and more
• Sign up with Google in seconds – dashboard and all member tools

Join free: https://www.prayerauthority.com/prayers/register.php

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;">
<h2>Join Prayer Authority</h2>
<p>A global Christian prayer community – free to join, instant access, no commitment.</p>
<ul>
<li>Submit prayer requests and receive support from believers worldwide</li>
<li>Scripture memory tools: P48X Journal, Battle Sword, Scriptural Vitamins</li>
<li>Dream interpretation, 12-Counselor panel, Urim & Thummim, and more</li>
<li>Sign up with Google in seconds – full dashboard and member tools</li>
</ul>
<p><a href="https://www.prayerauthority.com/prayers/register.php">Join free – Prayer Authority</a></p>
<p style="color:#666;font-size:12px;">Coral Crown Solutions | sales@coralcrownsolutions.com</p>
<div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;"><img src="{{BASE_URL}}/promo/prayerauthorityfront.jpg" alt="Prayer Authority" width="280" style="display:block;max-width:100%;height:auto;border:0;" /><img src="{{BASE_URL}}/promo/prayerauthorityback.jpg" alt="Prayer Authority" width="280" style="display:block;max-width:100%;height:auto;border:0;margin-top:8px;" /></div>
</div>`,
  },
  "prayer-church": {
    subject: "Prayer Authority for your church – Tools & community for your congregation",
    text: `Prayer Authority – For churches and organizations

Bring Prayer Authority to your congregation:
• Free and premium tiers (Ruby free forever, Diamond premium)
• Prayer requests, community sharing, Scripture tools, dream interpretation, biblical counsel
• Get your entire church signed up – members get dashboards, prayer tools, and community
• Great for small groups, youth, and church-wide engagement

Learn more: https://www.prayerauthority.com

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;">
<h2>Prayer Authority for your church</h2>
<p>Bring prayer tools and community to your congregation.</p>
<ul>
<li>Free (Ruby) and premium (Diamond) tiers</li>
<li>Prayer requests, community sharing, Scripture tools, dream interpretation, biblical counsel</li>
<li>Get your entire church signed up – members get dashboards and full tools</li>
<li>Ideal for small groups, youth, and church-wide engagement</li>
</ul>
<p><a href="https://www.prayerauthority.com">PrayerAuthority.com</a> | sales@coralcrownsolutions.com</p>
<p style="color:#666;font-size:12px;">Coral Crown Solutions</p>
<div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;"><img src="{{BASE_URL}}/promo/prayerauthorityfront.jpg" alt="Prayer Authority" width="280" style="display:block;max-width:100%;height:auto;border:0;" /><img src="{{BASE_URL}}/promo/prayerauthorityback.jpg" alt="Prayer Authority" width="280" style="display:block;max-width:100%;height:auto;border:0;margin-top:8px;" /></div>
</div>`,
  },
  "tourism-hawaii": {
    subject: "Time for Fun Hawaii – Exclusive tour discounts & webinar",
    text: `Time for Fun Hawaii – Save on Oahu, Maui & Big Island tours

Two ways to save:
1) Watch our webinar – get exclusive wholesale discounts on Hawaii's top tours (Oahu, Maui, Big Island): luaus, helicopter tours, Pearl Harbor, snorkeling, Road to Hana, volcano tours, and more.
2) No time? Still book with us – add tours to your cart, we’ll call and help you set up your vacation.

Call (808) 393-0153 | https://www.timeforfunhawaii.com

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;">
<h2>Time for Fun Hawaii</h2>
<p>Exclusive discounts on Oahu, Maui & Big Island tours.</p>
<ol>
<li><strong>Watch our webinar</strong> – get wholesale rates on luaus, helicopter tours, Pearl Harbor, snorkeling, Road to Hana, volcano tours, and more.</li>
<li><strong>No time?</strong> Book with us anyway – we’ll call and help you plan.</li>
</ol>
<p><a href="https://www.timeforfunhawaii.com">TimeForFunHawaii.com</a> | Call (808) 393-0153</p>
<p style="color:#666;font-size:12px;">Coral Crown Solutions | sales@coralcrownsolutions.com</p>
<div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;"><img src="{{BASE_URL}}/promo/timeforfunhawaii.jpg" alt="Time for Fun Hawaii" width="280" style="display:block;max-width:100%;height:auto;border:0;" /><img src="{{BASE_URL}}/promo/timeforfunhawaiiback.jpg" alt="Time for Fun Hawaii" width="280" style="display:block;max-width:100%;height:auto;border:0;margin-top:8px;" /></div>
</div>`,
  },
  "tourism-usa": {
    subject: "Choose 1 of 4 Complimentary Vacations – H.I.E. Wholesale Travel (Time for Fun USA)",
    text: `Time for Fun USA – Tour deals across the USA

As a thank you for attending our educational webinar (60–75 min), choose ONE of 4 complimentary vacation packages: Carnival Cruise (3–5 nights), 7 Night Condo Stay, 7 Day Caribbean Cruise for Two, Mexico Getaway (8d/7n). You pay only required fees/taxes. Requirements: 25+, US/Canadian, $40k+ income. Register now – we’ll help you Full details: Carnival 3–5 nights, 7 Night Condo, 7 Day Caribbean for Two, Mexico 8d/7n. Valid 18 months. If never used, no cost.

https://www.timeforfunusa.com

Coral Crown Solutions | sales@coralcrownsolutions.com`,
    html: `<div style="font-family:sans-serif;max-width:600px;">
<h2>Choose 1 of 4 Complimentary Vacations</h2>
<p><strong>H.I.E. Wholesale Travel Company</strong> – Hawaii-based, A+ BBB. Attend our 60–75 min webinar and pick one: Carnival Cruise (3–5 nights), 7 Night Condo Stay, 7 Day Caribbean Cruise for Two, Mexico Getaway (8d/7n). Valid 18 months. You pay only required fees/taxes. Requirements: 25+, US/Canadian, $40k+ income.</p>
<p><a href="https://www.timeforfunusa.com">Register now – TimeForFunUSA.com</a></p>
<p style="color:#666;font-size:12px;">Coral Crown Solutions | sales@coralcrownsolutions.com</p>
<div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;"><img src="{{BASE_URL}}/promo/timeforfunusa.jpg" alt="Time for Fun USA" width="280" style="display:block;max-width:100%;height:auto;border:0;" /><img src="{{BASE_URL}}/promo/timeforfunusaback.jpg" alt="Time for Fun USA" width="280" style="display:block;max-width:100%;height:auto;border:0;margin-top:8px;" /></div>
</div>`,
  },
};
