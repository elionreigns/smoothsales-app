/**
 * Follow-up templates for all non-E Lion campaigns (Botox, Tech, Prayer, Tourism, Wedding, P48X, Healing Herbals).
 * Used when the original email gets no response within 4 days.
 * Schedule: follow-up 1 at 4 days, then 5 days, then 5 days (4, 9, 14 days from initial).
 * Follow-up 3 (last) includes a soft close: thanks, take care, feel free to reach out if it is ever a fit.
 */

const CONTACT_FOOTER = "\n\nReach us: coralcrowntechnologies@gmail.com or (808) 393-0153.";
const CONTACT_HTML = `<p style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(0,0,0,0.08);color:#64748b;font-size:12px;">Reach us: <a href="mailto:coralcrowntechnologies@gmail.com" style="color:#0ea5e9;">Email</a> or (808) 393-0153.</p>`;
const SOFT_CLOSE =
  " Thanks for your time. If you ever see this and it is a fit, we would love to hear from you. Take care.";
const SOFT_CLOSE_HTML = "\u003Cp style=\"margin:24px 0 0;font-size:14px;color:#475569;\"\u003EThanks for your time. If you ever see this and it is a fit, we would love to hear from you. Take care.\u003C/p\u003E";

function box(color: string, content: string): string {
  return "<div style=\"font-family:sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border:2px solid " + color + ";border-radius:20px;padding:28px;color:#1e293b;\"><p style=\"margin:0 0 16px;font-size:15px;\">Hi {{Name}},</p>" + content + CONTACT_HTML + "</div>";
}

export type OtherFollowUpTemplateId =
  | "botox-followup-1"
  | "botox-followup-2"
  | "botox-followup-3"
  | "tech-followup-1"
  | "tech-followup-2"
  | "tech-followup-3"
  | "prayer-individual-followup-1"
  | "prayer-individual-followup-2"
  | "prayer-individual-followup-3"
  | "prayer-church-followup-1"
  | "prayer-church-followup-2"
  | "prayer-church-followup-3"
  | "tourism-hawaii-followup-1"
  | "tourism-hawaii-followup-2"
  | "tourism-hawaii-followup-3"
  | "tourism-usa-followup-1"
  | "tourism-usa-followup-2"
  | "tourism-usa-followup-3"
  | "wedding-couples-followup-1"
  | "wedding-couples-followup-2"
  | "wedding-couples-followup-3"
  | "wedding-contractors-followup-1"
  | "wedding-contractors-followup-2"
  | "wedding-contractors-followup-3"
  | "p48x-personal-followup-1"
  | "p48x-personal-followup-2"
  | "p48x-personal-followup-3"
  | "p48x-physical-distributors-followup-1"
  | "p48x-physical-distributors-followup-2"
  | "p48x-physical-distributors-followup-3"
  | "p48x-affiliate-sellers-followup-1"
  | "p48x-affiliate-sellers-followup-2"
  | "p48x-affiliate-sellers-followup-3"
  | "healing-herbals-smoke-shop-followup-1"
  | "healing-herbals-smoke-shop-followup-2"
  | "healing-herbals-smoke-shop-followup-3"
  | "healing-herbals-individual-followup-1"
  | "healing-herbals-individual-followup-2"
  | "healing-herbals-individual-followup-3";

export const ALL_OTHER_FOLLOW_UP_TEMPLATES: Record<
  OtherFollowUpTemplateId,
  { subject: string; html: string; text: string }
> = {
  "botox-followup-1": {
    subject: "Re: Botox Oahu – You deserve to know the price before you book",
    text: `Hi {{Name}},\n\nQuick follow-up: in our first email we offered our clear Botox pricing and same-day availability on Oahu – no guesswork, no surprise fees. You deserve to know exactly what you would pay before you commit. One reply or call (808) 393-0153 and we will send the price sheet. No obligation.${CONTACT_FOOTER}`,
    html: box(
      "#0d9488",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you <strong>clear pricing</strong> and <strong>same-day availability</strong> for physician-led Botox on Oahu – no guesswork, no surprise fees. You deserve to know exactly what you would pay before you book. One click or reply and we will send the sheet. No obligation.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#0d9488;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Send me the price sheet</a></p>`
    ),
  },
  "botox-followup-2": {
    subject: "Botox Oahu – Why so many ask for our pricing first",
    text: `Hi {{Name}},\n\nWe reached out because we believe you should see our pricing up front – physician-led care, transparent rates, same-day availability. Many clients tell us they wished they had asked sooner instead of guessing or overpaying elsewhere. One reply and we will send the sheet; no pressure.${CONTACT_FOOTER}`,
    html: box(
      "#0d9488",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We reached out so you could see our <strong>pricing up front</strong> – physician-led, transparent, same-day. Many clients say they wished they had asked sooner instead of guessing or overpaying elsewhere. That is why we keep sending the sheet: so you can decide with real numbers. One reply and we will get it to you.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#0d9488;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Request the price sheet</a></p>`
    ),
  },
  "botox-followup-3": {
    subject: "Last note – Botox Oahu pricing (no obligation)",
    text: `Hi {{Name}},\n\nLast note: we offered our Botox Oahu price sheet and same-day availability so you can compare and decide. If you would like it, just reply and we will send it over – no obligation.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#0d9488",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered our price sheet so you can see exactly what physician-led Botox on Oahu costs – and when we have same-day availability. If you would like it, just reply and we will send it. No obligation.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#0d9488;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "tech-followup-1": {
    subject: "Re: Get found online – websites & booking for Hawaii businesses",
    text: `Hi {{Name}},\n\nFollowing up: we reached out because your business deserves to be easy to find and easy to book – websites, online booking, Google Business & SEO for Hawaii local businesses. When customers cannot find you or book you easily, you are leaving leads on the table. We are local, we speak plain English, and we build what actually gets used. Reply with what you need and we will send options.${CONTACT_FOOTER}`,
    html: box(
      "#0369a1",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We reached out so you can <strong>get found and get booked</strong> – websites, online booking, SEO for Hawaii local businesses. When customers cannot find you or book you easily, you are leaving leads on the table. We are here on the islands, we speak plain English, and we build what gets used. Reply with what you need and we will send options.</p><p style="margin:0 0 20px;"><a href="mailto:sales@coralcrownsolutions.com" style="display:inline-block;background:#0369a1;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Tell us what you need</a></p>`
    ),
  },
  "tech-followup-2": {
    subject: "Your business could be missing leads – websites & booking that work",
    text: `Hi {{Name}},\n\nQuick nudge: we build websites and online booking that actually get used – for power washing, pool, detailing, cleaning, construction, food trucks, restaurants. We are here on the islands. The reason we followed up: every day your site or booking is unclear is a day someone else gets the job. One reply and we will send a short overview – no jargon, no runaround.${CONTACT_FOOTER}`,
    html: box(
      "#0369a1",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We build sites and booking that <strong>get used</strong> – and we are here on the islands. Every day your site or booking is unclear is a day someone else gets the job. That is why we want to help: get found, book more jobs. One reply and we will send a short overview – no jargon.</p><p style="margin:0 0 20px;"><a href="mailto:sales@coralcrownsolutions.com" style="display:inline-block;background:#0369a1;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get an overview</a></p>`
    ),
  },
  "tech-followup-3": {
    subject: "Last note – Websites & booking for Hawaii (when you are ready)",
    text: `Hi {{Name}},\n\nLast note: we offered to help with a new site, online booking, or getting found in Hawaii. When you are ready to stop leaving leads on the table, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#0369a1",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered to help you get found and get booked in Hawaii. When you are ready to make that happen, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:sales@coralcrownsolutions.com" style="display:inline-block;background:#0369a1;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "prayer-individual-followup-1": {
    subject: "Re: Prayer Authority – Free community + Dream Interpreter, Urim & Thummim, Spousal Translator",
    text: `Hi {{Name}},\n\nFollowing up: we invited you to Prayer Authority – a free Christian prayer community with real spiritual tech: dashboard, prayer requests, Dream Interpreter, Urim & Thummim, Spousal Translator, Biblical Counsel, and more. Thousands have joined because it is free, takes 10 seconds with Google, and actually helps them pray and grow. No cost, no obligation. Reply "yes" or "tell me more" and we will get you the link.${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We invited you to <strong>Prayer Authority</strong> – free community plus tools like Dream Interpreter, Urim &amp; Thummim, Spousal Translator, and Biblical Counsel. Thousands joined because it is free, takes 10 seconds with Google, and actually helps them pray and grow. That is why we are following up: we want you to have the same access. Reply and we will get you the link.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Join or learn more</a></p>`
    ),
  },
  "prayer-individual-followup-2": {
    subject: "Prayer Authority – Why so many are joining (free, 10 seconds)",
    text: `Hi {{Name}},\n\nQuick nudge: we offered you a free place to share prayer requests, pray for others, and use spiritual tech – Dream Interpreter, Urim & Thummim, Spousal Translator, 12 biblical counselors. If you have been meaning to connect with a prayer community that actually has tools that help, one reply and we will send the link. No cost.${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you a <strong>free</strong> place to share requests, pray for others, and use tools that actually help – Dream Interpreter, Urim &amp; Thummim, Spousal Translator, biblical counsel. If you have been meaning to connect with a community that has real spiritual tech, one reply and we will send the link. No cost.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the link</a></p>`
    ),
  },
  "prayer-individual-followup-3": {
    subject: "Last note – Prayer Authority (free community + chatbots)",
    text: `Hi {{Name}},\n\nLast note: we offered you free access to Prayer Authority – prayer community plus Dream Interpreter, Urim & Thummim, Spousal Translator, and more. If you ever want to join, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you free access to Prayer Authority – community plus Dream Interpreter, Urim &amp; Thummim, Spousal Translator, and more. If you ever want to join, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "prayer-church-followup-1": {
    subject: "Re: Prayer Authority for your church – Tools your congregation will actually use",
    text: `Hi {{Name}},\n\nFollowing up: we offered to bring Prayer Authority to your church – prayer requests, P48X Journal, Dream Interpreter, Urim & Thummim, Spousal Translator, Biblical Counsel, and more. Your people get real spiritual tech, not just another app. Free (Ruby) and premium (Diamond) tiers so you can scale. Reply with your church name and we will send the overview and next steps.${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered to bring <strong>Prayer Authority</strong> to your church – prayer requests, P48X Journal, Dream Interpreter, Urim &amp; Thummim, Spousal Translator, Biblical Counsel. Your people get <strong>real tools</strong>, not just another app. Free and premium tiers so you can scale. That is why we are following up: we want your congregation to have this. Reply with your church name and we will send the overview.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Request church overview</a></p>`
    ),
  },
  "prayer-church-followup-2": {
    subject: "Your church could have prayer tools that people actually use",
    text: `Hi {{Name}},\n\nQuick nudge: congregations use Prayer Authority so members can share requests, use Dream Interpreter, Urim & Thummim, Spousal Translator, and biblical counsel – tools that help people grow, not just log in. If you are open to giving your people something they will actually use, one reply and we will send the church overview.${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Congregations use Prayer Authority so members get <strong>tools they actually use</strong> – prayer requests, Dream Interpreter, Urim &amp; Thummim, Spousal Translator, biblical counsel. If you want that for your church, one reply and we will send the overview and next steps.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the overview</a></p>`
    ),
  },
  "prayer-church-followup-3": {
    subject: "Last note – Prayer Authority for your church (tools + community)",
    text: `Hi {{Name}},\n\nLast note: we offered Prayer Authority for your church – tools and community your congregation can actually use. If you ever want to explore it, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered Prayer Authority for your church – tools and community your people can actually use. If you ever want to explore it, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "tourism-hawaii-followup-1": {
    subject: "Re: Time for Fun Hawaii – Don’t book tours without our exclusive discounts",
    text: `Hi {{Name}},\n\nFollowing up: we offered you exclusive wholesale discounts on Hawaii tours (luaus, helicopter, Pearl Harbor, snorkeling, Road to Hana, volcano, and more) plus a free webinar that shows you how to get them. Booking without checking our offers can mean overpaying. One reply and we will send the details and webinar link.${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you <strong>exclusive tour discounts</strong> and a webinar for Hawaii – luaus, helicopter, Pearl Harbor, snorkeling, Road to Hana, volcano, and more. Booking without checking our offers can mean overpaying. That is why we are following up: we want you to have the details before you book. One reply and we will send them.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the details</a></p>`
    ),
  },
  "tourism-hawaii-followup-2": {
    subject: "You could be overpaying for Hawaii tours – get our discounts first",
    text: `Hi {{Name}},\n\nQuick nudge: our webinar and exclusive discounts could save you real money on your Hawaii trip – many people book first and only later find out they could have paid less. We offered you the link and the details. Reply and we will send them so you can decide before you book.${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Our <strong>exclusive discounts</strong> and webinar could save you real money on your Hawaii trip – many people book first and only later find out they could have paid less. We want you to have the info before you book. Reply and we will send the link and details.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Send me the link</a></p>`
    ),
  },
  "tourism-hawaii-followup-3": {
    subject: "Last note – Time for Fun Hawaii (tour discounts + webinar)",
    text: `Hi {{Name}},\n\nLast note: we offered our Hawaii tour discounts and webinar link so you could save before you book. If you ever want them, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered our Hawaii tour discounts and webinar so you could save before you book. If you ever want them, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "tourism-usa-followup-1": {
    subject: "Re: 4 complimentary vacations – this is a real offer (Time for Fun USA)",
    text: `Hi {{Name}},\n\nFollowing up: we offered you the chance to choose 1 of 4 complimentary vacations through H.I.E. Wholesale Travel. No obligation to book – many people do not believe it until they claim one. We want you to have the next step so you can see for yourself. Reply and we will send it.${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you <strong>1 of 4 complimentary vacations</strong> through H.I.E. Wholesale Travel. Many people do not believe it until they claim one – that is why we are following up. No obligation to book; we just want you to have the next step. Reply and we will send it.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the next step</a></p>`
    ),
  },
  "tourism-usa-followup-2": {
    subject: "4 complimentary vacations – many don’t claim because it sounds too good",
    text: `Hi {{Name}},\n\nQuick nudge: 4 vacation options, complimentary – it sounds too good to be true, but it is real. We offered you the details. Reply and we will get you the next step so you can see for yourself. No obligation.${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">4 vacation options, <strong>complimentary</strong> – it sounds too good to be true, but it is real. Many people do not claim because they assume it is a gimmick. We want you to have the details so you can decide. Reply and we will get you the next step.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the details</a></p>`
    ),
  },
  "tourism-usa-followup-3": {
    subject: "Last note – 4 complimentary vacations (when you’re ready)",
    text: `Hi {{Name}},\n\nLast note: we offered you 1 of 4 complimentary vacations through H.I.E. Wholesale Travel. If you ever want to claim one, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you 1 of 4 complimentary vacations. If you ever want to claim one, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "wedding-couples-followup-1": {
    subject: "Re: Plan your dream Hawaiian wedding in one place (Hawaii Wedding Plans)",
    text: `Hi {{Name}},\n\nFollowing up: we offered you one place to plan your Hawaiian wedding – Oahu, Maui, Kauai, Big Island – venues, vendors, and an interactive planner so you are not chasing spreadsheets. Many couples tell us it saved them time and stress. That is why we are following up: we want you to have the link. Reply and we will send it.${CONTACT_FOOTER}`,
    html: box(
      "#be185d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you <strong>one place</strong> to plan your dream Hawaiian wedding – Oahu, Maui, Kauai, Big Island – venues, vendors, interactive planner. Many couples say it saved them time and stress because they were not chasing spreadsheets. That is why we are following up: we want you to have the link. Click below or reply and we will get you started.</p><p style="margin:0 0 20px;"><a href="https://www.hawaiiweddingplans.com" style="display:inline-block;background:#be185d;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">HawaiiWeddingPlans.com</a></p>`
    ),
  },
  "wedding-couples-followup-2": {
    subject: "One place for your Hawaii wedding – couples say it saves time and stress",
    text: `Hi {{Name}},\n\nQuick nudge: we offered you Hawaii Wedding Plans – interactive planner, real vendors, articles for every step. Planning in one place instead of scattered links and emails really does save time and stress. Reply and we will get you the link so you can see for yourself.${CONTACT_FOOTER}`,
    html: box(
      "#be185d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you an <strong>interactive planner</strong>, real vendors, and articles for every step. Planning in one place instead of scattered links and emails saves time and stress – that is what couples tell us. Reply and we will get you the link so you can see for yourself.</p><p style="margin:0 0 20px;"><a href="https://www.hawaiiweddingplans.com" style="display:inline-block;background:#be185d;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get started</a></p>`
    ),
  },
  "wedding-couples-followup-3": {
    subject: "Last note – Hawaii Wedding Plans (one place to plan it all)",
    text: `Hi {{Name}},\n\nLast note: we offered you one place to plan your Hawaiian wedding – venues, vendors, interactive planner. If you ever want to use it, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#be185d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you one place to plan your Hawaiian wedding – venues, vendors, interactive planner. If you ever want to use it, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="https://www.hawaiiweddingplans.com" style="display:inline-block;background:#be185d;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">HawaiiWeddingPlans.com</a></p>`
    ),
  },
  "wedding-contractors-followup-1": {
    subject: "Re: Get in front of couples planning their Hawaii wedding (Hawaii Wedding Plans)",
    text: `Hi {{Name}},\n\nFollowing up: we offered to feature your service or venue on Hawaii Wedding Plans. Couples use our site to build packages – if you are not listed, they are finding someone else. Your listing gets in front of them when they are ready to book. No cost to submit. Reply and we will send the submit link.${CONTACT_FOOTER}`,
    html: box(
      "#15803d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered to <strong>feature your service or venue</strong> on Hawaii Wedding Plans. Couples use our site to build packages – if you are not listed, they are finding someone else. That is why we are following up: we want you in front of them. No cost to submit. Reply and we will send the link.</p><p style="margin:0 0 20px;"><a href="https://www.hawaiiweddingplans.com/submit/" style="display:inline-block;background:#15803d;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Submit to be featured</a></p>`
    ),
  },
  "wedding-contractors-followup-2": {
    subject: "Couples are looking for you – get listed on Hawaii Wedding Plans",
    text: `Hi {{Name}},\n\nQuick nudge: photographers, venues, caterers, and more get in front of couples who are actively planning their Hawaii wedding. Every day you are not listed is a day they might book someone else. We offered you the submit form – no cost. Reply and we will send it.${CONTACT_FOOTER}`,
    html: box(
      "#15803d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Photographers, venues, caterers get in front of couples <strong>actively planning</strong> their Hawaii wedding. Every day you are not listed is a day they might book someone else. We offered you the submit form – no cost. Reply and we will send it.</p><p style="margin:0 0 20px;"><a href="https://www.hawaiiweddingplans.com/submit/" style="display:inline-block;background:#15803d;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the form</a></p>`
    ),
  },
  "wedding-contractors-followup-3": {
    subject: "Last note – Get featured on Hawaii Wedding Plans (couples are looking)",
    text: `Hi {{Name}},\n\nLast note: we offered you a spot on Hawaii Wedding Plans so couples planning their Hawaii wedding can find you. If you ever want to be featured, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#15803d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you a spot so couples planning their Hawaii wedding can find you. If you ever want to be featured, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="https://www.hawaiiweddingplans.com/submit/" style="display:inline-block;background:#15803d;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "p48x-personal-followup-1": {
    subject: "Re: P48X – Transform your mind (book, app, 24+ hr audiobook & member chatbots)",
    text: `Hi {{Name}},\n\nFollowing up: we offered you P48X – Philippians 4:8 Expounded – to help you fix your mind on what is true, honorable, pure, and lovely. You get the book, a free app for daily reflections, and over 24 hours of audiobook (free chapters plus full access when you join as a member – plus Dream Interpreter, Spousal Translator, Urim & Thummim, Biblical Counsel). That is why we are following up: we want you to have the link. One reply and we will send it.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you <strong>P48X</strong> – to transform your mind with Philippians 4:8: book, free app, <strong>24+ hours of audiobook</strong> (free chapters + full access as a member), and member-only chatbots (Dream Interpreter, Spousal Translator, Urim &amp; Thummim, Biblical Counsel). That is why we are following up: we want you to have the link. One reply and we will send it.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the link</a></p>`
    ),
  },
  "p48x-personal-followup-2": {
    subject: "P48X – What you think shapes who you become (book + app + audiobook)",
    text: `Hi {{Name}},\n\nQuick nudge: we offered you P48X because what you think shapes who you become. The book, app, and 24+ hours of audiobook help you focus on what is true and good – and members get access to biblically trained chatbots (Dream Interpreter, Spousal Translator, Urim & Thummim, Biblical Counsel). No cost to explore the free chapters and app. Reply and we will send the details.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you P48X because <strong>what you think shapes who you become</strong>. The book, app, and 24+ hours of audiobook help you focus on what is true and good – and members get the chatbots. No cost to explore the free chapters and app. Reply and we will send the details.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the details</a></p>`
    ),
  },
  "p48x-personal-followup-3": {
    subject: "Last note – P48X (book, app, 24+ hr audiobook & member chatbots)",
    text: `Hi {{Name}},\n\nLast note: we offered you P48X – book, app, audiobook, and member-only chatbots – to help you fix your mind on what is true and lovely. If you ever want to check it out, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you P48X – book, app, 24+ hr audiobook, and member chatbots – to help you fix your mind on what is true and lovely. If you ever want to check it out, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "p48x-physical-distributors-followup-1": {
    subject: "Re: P48X wholesale – Add a high-margin title to your store",
    text: `Hi {{Name}},\n\nFollowing up: we offered you wholesale printed copies of P48X (Philippians 4:8 Expounded by Eric Schaefer) for your store. It sells well in faith and general markets – carrying it can add a high-margin item your customers are already looking for. Reply and we will send pricing and minimums.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you <strong>wholesale P48X</strong> for your store. It sells well in faith and general markets – carrying it can add a <strong>high-margin item</strong> your customers are already looking for. That is why we are following up: we want you to have the numbers. Reply and we will send pricing and minimums.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Request pricing</a></p>`
    ),
  },
  "p48x-physical-distributors-followup-2": {
    subject: "P48X sells – wholesale terms are straightforward (no runaround)",
    text: `Hi {{Name}},\n\nQuick nudge: P48X sells well in faith and general markets – it is a book people buy for themselves and give as gifts. Wholesale terms are straightforward; we do not do runaround. Reply and we will send the sheet so you can see if it fits your store.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">P48X sells well in faith and general markets – people buy it for themselves and give it as gifts. Wholesale terms are straightforward; we do not do runaround. Reply and we will send the sheet so you can see if it fits your store.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the sheet</a></p>`
    ),
  },
  "p48x-physical-distributors-followup-3": {
    subject: "Last note – P48X wholesale for your store",
    text: `Hi {{Name}},\n\nLast note: we offered you wholesale P48X so you could add a strong title to your store. If you ever want to carry it, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you wholesale P48X so you could add a strong title to your store. If you ever want to carry it, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "p48x-affiliate-sellers-followup-1": {
    subject: "Re: P48X affiliate – 15% on every sale, no inventory (we fulfill)",
    text: `Hi {{Name}},\n\nFollowing up: we offered you a P48X affiliate spot – 15% on every direct book sale you refer, no cap. You do not carry inventory; we handle fulfillment. You share the book and app with your audience and earn. That is why we are following up: we want you to have the partner link. Reply and we will send it.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you a <strong>P48X affiliate</strong> spot – <strong>15%</strong> on every sale you refer, no cap. No inventory – we fulfill. You share the book and app with your audience and earn. That is why we are following up: we want you to have the partner link. Reply and we will send it.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get partner link</a></p>`
    ),
  },
  "p48x-affiliate-sellers-followup-2": {
    subject: "15% on P48X sales – no inventory, we handle everything",
    text: `Hi {{Name}},\n\nQuick nudge: 15% on every P48X sale you refer, no cap. Many partners promote the book and app to their audience – they do not stock or ship anything; we do. Reply and we will get you set up so you can start sharing and earning.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;"><strong>15%</strong> on every sale you refer, no cap. Many partners promote the book and app – they do not stock or ship; we do. Reply and we will get you set up so you can start sharing and earning.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get set up</a></p>`
    ),
  },
  "p48x-affiliate-sellers-followup-3": {
    subject: "Last note – P48X affiliate (15%, no inventory)",
    text: `Hi {{Name}},\n\nLast note: we offered you 15% on P48X sales – no inventory, we fulfill. If you ever want to partner, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you 15% on P48X sales – no inventory, we fulfill. If you ever want to partner, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "healing-herbals-smoke-shop-followup-1": {
    subject: "Re: Healing Herbals wholesale – Kava, Blue Lotus, Kanna, Kratom (your customers are looking)",
    text: `Hi {{Name}},\n\nFollowing up: we offered you wholesale Healing Herbals – Kava, Blue Lotus, Kanna, Kratom (vapes, shots, tinctures). Your customers are already looking for quality botanicals with clear suggested retail; we give you product that moves. Reply and we will send the 2025 wholesale sheet.${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you <strong>wholesale Healing Herbals</strong> – Kava, Blue Lotus, Kanna, Kratom (vapes, shots, tinctures). Your customers are already looking for quality botanicals with clear suggested retail – we give you product that moves. That is why we are following up: we want you to have the sheet. Reply and we will send it.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Request wholesale sheet</a></p>`
    ),
  },
  "healing-herbals-smoke-shop-followup-2": {
    subject: "Quality botanicals + clear retail – product that moves off the shelf",
    text: `Hi {{Name}},\n\nQuick nudge: we offered you quality Kava, Blue Lotus, Kanna, Kratom with clear suggested retail so you can price and sell with confidence. Product that moves means repeat orders. Reply and we will send the wholesale overview and minimums.${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you <strong>quality botanicals</strong> and <strong>clear suggested retail</strong> – so you can price and sell with confidence. Product that moves means repeat orders. Reply and we will send the wholesale overview and minimums.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the overview</a></p>`
    ),
  },
  "healing-herbals-smoke-shop-followup-3": {
    subject: "Last note – Healing Herbals wholesale (Kava, Blue Lotus, Kanna, Kratom)",
    text: `Hi {{Name}},\n\nLast note: we offered you wholesale Healing Herbals so you could stock quality botanicals your customers want. If you ever want to partner, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you wholesale Healing Herbals so you could stock what your customers want. If you ever want to partner, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "healing-herbals-individual-followup-1": {
    subject: "Re: Healing Herbals – Kava & Blue Lotus for real relaxation (no hangover)",
    text: `Hi {{Name}},\n\nFollowing up: we offered you our Kava and Blue Lotus options (vapes, shots, tinctures) for relaxation – many customers say it helps them wind down without the hangover. That is why we are following up: we want you to have the product link so you can try for yourself. Reply and we will send it.${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you our <strong>Kava and Blue Lotus</strong> options (vapes, shots, tinctures) for relaxation – many customers say it helps them wind down without the hangover. That is why we are following up: we want you to have the link so you can try for yourself. Reply and we will send it.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the link</a></p>`
    ),
  },
  "healing-herbals-individual-followup-2": {
    subject: "Kava & Blue Lotus – wind down without the hangover (vapes, shots, tinctures)",
    text: `Hi {{Name}},\n\nQuick nudge: we offered you Kava and Blue Lotus in forms that fit your routine – vapes, shots, tinctures. Many customers tell us it helps them wind down without the hangover. Reply and we will send the details so you can see what fits you.${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you Kava and Blue Lotus in forms that fit your routine – vapes, shots, tinctures. Many customers say it helps them <strong>wind down without the hangover</strong>. Reply and we will send the details so you can see what fits you.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the details</a></p>`
    ),
  },
  "healing-herbals-individual-followup-3": {
    subject: "Last note – Healing Herbals (Kava & Blue Lotus, when you’re ready)",
    text: `Hi {{Name}},\n\nLast note: we offered you our Kava and Blue Lotus products for relaxation. If you ever want to try them, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you our Kava and Blue Lotus products for relaxation. If you ever want to try them, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
};

export function isOtherFollowUpTemplateId(id: string): id is OtherFollowUpTemplateId {
  return id in ALL_OTHER_FOLLOW_UP_TEMPLATES;
}

export function getOtherFollowUpTemplate(
  id: OtherFollowUpTemplateId
): { subject: string; html: string; text: string } {
  const t = ALL_OTHER_FOLLOW_UP_TEMPLATES[id];
  if (!t) throw new Error(`Unknown follow-up template: ${id}`);
  return t;
}
