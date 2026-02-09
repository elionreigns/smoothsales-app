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
    subject: "Botox Oahu – Get the exact price before you book (no guesswork, no surprise fees)",
    text: `Hi {{Name}},

This is a quick follow-up to our first email. We offered you our clear Botox pricing and same-day availability on Oahu – physician-led care, no guesswork, no surprise fees.

You deserve to know exactly what you would pay before you commit. Many clients tell us they wished they had asked for the sheet sooner instead of wondering or overpaying elsewhere. There is no obligation: one reply or a quick call to (808) 393-0153 and we will send the price sheet so you can compare and decide with real numbers.${CONTACT_FOOTER}`,
    html: box(
      "#0d9488",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">This is a quick follow-up. We offered you <strong>clear pricing</strong> and <strong>same-day availability</strong> for physician-led Botox on Oahu – no guesswork, no surprise fees.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">You deserve to know exactly what you would pay before you book. Many clients say they wished they had asked for the sheet sooner instead of wondering or overpaying elsewhere. There is no obligation: one reply or call and we will send the sheet so you can decide with real numbers.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#0d9488;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Send me the price sheet</a></p>`
    ),
  },
  "botox-followup-2": {
    subject: "Why smart clients ask for our Botox price sheet before they book",
    text: `Hi {{Name}},

We reached out because we believe you should see our pricing up front – physician-led care, transparent rates, same-day availability on Oahu.

The reason we are following up: every day you delay, you are either guessing at costs or paying elsewhere without comparing. Many clients tell us they wished they had asked sooner. We are not here to pressure you – we are here so you can make an informed decision. One reply and we will send the sheet; you can then compare and choose with confidence.${CONTACT_FOOTER}`,
    html: box(
      "#0d9488",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We reached out so you could see our <strong>pricing up front</strong> – physician-led, transparent, same-day. The reason we are following up: every day you delay, you are either guessing at costs or paying elsewhere without comparing.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Many clients say they wished they had asked sooner. We are not here to pressure you – we are here so you can make an informed decision. One reply and we will send the sheet so you can compare and choose with confidence.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#0d9488;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Request the price sheet</a></p>`
    ),
  },
  "botox-followup-3": {
    subject: "Final note – Botox Oahu price sheet (when you're ready, no obligation)",
    text: `Hi {{Name}},

This is our last note. We offered our Botox Oahu price sheet and same-day availability so you could see exactly what physician-led treatment costs and when we have openings.

If you would like the sheet – to compare, to plan, or simply to have the numbers – just reply and we will send it over. No obligation, no pressure. We would rather you have the info and decide when the time is right.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#0d9488",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">This is our last note. We offered our price sheet so you could see exactly what physician-led Botox on Oahu costs – and when we have same-day availability.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you would like it – to compare, to plan, or simply to have the numbers – just reply and we will send it. No obligation. We would rather you have the info and decide when the time is right.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#0d9488;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "tech-followup-1": {
    subject: "Hawaii businesses that are easy to find and book get more jobs – here’s how",
    text: `Hi {{Name}},

Following up: we reached out because your business deserves to be easy to find and easy to book – websites, online booking, Google Business & SEO for Hawaii local businesses (power washing, pool, detailing, cleaning, construction, food trucks, restaurants).

When customers cannot find you or book you easily, they go to the next result. We are local, we speak plain English, and we build what actually gets used – no jargon, no runaround. One reply with what you need (new site, booking, SEO, or all of the above) and we will send you a short overview and next steps.${CONTACT_FOOTER}`,
    html: box(
      "#0369a1",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We reached out so you can <strong>get found and get booked</strong> – websites, online booking, SEO for Hawaii local businesses. When customers cannot find you or book you easily, they go to the next result.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We are here on the islands, we speak plain English, and we build what gets used – no jargon, no runaround. One reply with what you need and we will send a short overview and next steps.</p><p style="margin:0 0 20px;"><a href="mailto:sales@coralcrownsolutions.com" style="display:inline-block;background:#0369a1;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Tell us what you need</a></p>`
    ),
  },
  "tech-followup-2": {
    subject: "Every day your site or booking is unclear is a day a competitor gets the job",
    text: `Hi {{Name}},

Quick nudge: we build websites and online booking that actually get used – for power washing, pool, detailing, cleaning, construction, food trucks, restaurants. We are here on the islands.

The reason we are following up: every day your site or booking is unclear or hard to use is a day someone else gets the job. We have seen it over and over – businesses that get found and make booking simple see more leads and more closed jobs. One reply and we will send a short overview so you can see what is possible – no obligation, no jargon.${CONTACT_FOOTER}`,
    html: box(
      "#0369a1",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We build sites and booking that <strong>get used</strong> – and we are here on the islands. The reason we are following up: every day your site or booking is unclear is a day someone else gets the job.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Businesses that get found and make booking simple see more leads and more closed jobs. One reply and we will send a short overview so you can see what is possible – no obligation, no jargon.</p><p style="margin:0 0 20px;"><a href="mailto:sales@coralcrownsolutions.com" style="display:inline-block;background:#0369a1;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get an overview</a></p>`
    ),
  },
  "tech-followup-3": {
    subject: "Last note – When you’re ready to get found and get booked in Hawaii",
    text: `Hi {{Name}},

This is our last note. We offered to help with a new site, online booking, or getting found in Hawaii – so your business can stop leaving leads on the table.

When you are ready to make that happen, we are here. No pressure: just reply with what you need and we will send options. We would rather you have the info and reach out when the time is right.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#0369a1",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">This is our last note. We offered to help you get found and get booked in Hawaii – so your business can stop leaving leads on the table.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">When you are ready, we are here. Just reply with what you need and we will send options. No pressure.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:sales@coralcrownsolutions.com" style="display:inline-block;background:#0369a1;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "prayer-individual-followup-1": {
    subject: "Prayer Authority – Free community + Dream Interpreter, Urim & Thummim, Spousal Translator (10 seconds to join)",
    text: `Hi {{Name}},

Following up: we invited you to Prayer Authority – a free Christian prayer community with real spiritual tech: personal dashboard, prayer requests that connect you with believers worldwide, Dream Interpreter, Urim & Thummim, Spousal Translator, Biblical Counsel (12 advisors), and more.

Thousands have joined because it is free forever (Ruby tier), takes 10 seconds with Google, and actually helps them pray and grow – not just another app. No cost, no obligation. Reply "yes" or "tell me more" and we will get you the link so you can sign in and explore.${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We invited you to <strong>Prayer Authority</strong> – free community plus tools like Dream Interpreter, Urim &amp; Thummim, Spousal Translator, and Biblical Counsel. Thousands have joined because it is free, takes 10 seconds with Google, and actually helps them pray and grow.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">That is why we are following up: we want you to have the same access. No cost, no obligation. Reply and we will get you the link so you can sign in and explore.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Join or learn more</a></p>`
    ),
  },
  "prayer-individual-followup-2": {
    subject: "Why thousands joined Prayer Authority – free tools that actually help you pray and grow",
    text: `Hi {{Name}},

We offered you a free place to share prayer requests, pray for others, and use spiritual tech – Dream Interpreter (interpret dreams biblically), Urim & Thummim (seek God's will), Spousal Translator (turn raw words into loving language your spouse will respond to), and 12 biblical counselors.

If you have been meaning to connect with a prayer community that has real tools – not just a login – one reply and we will send the link. It takes 10 seconds with Google, and Ruby (free forever) includes core tools. No cost.${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you a <strong>free</strong> place to share requests, pray for others, and use tools that actually help – Dream Interpreter, Urim &amp; Thummim, Spousal Translator, biblical counsel. Thousands have joined because it is not just another app – it is real spiritual tech.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you have been meaning to connect with a community that has these tools, one reply and we will send the link. 10 seconds with Google; Ruby is free forever. No cost.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the link</a></p>`
    ),
  },
  "prayer-individual-followup-3": {
    subject: "Final note – Prayer Authority (free community + chatbots when you’re ready)",
    text: `Hi {{Name}},

This is our last note. We offered you free access to Prayer Authority – prayer community plus Dream Interpreter, Urim & Thummim, Spousal Translator, Biblical Counsel, and more.

If you ever want to join – to share requests, pray for others, or use the chatbots – we are here. No pressure: just reply when the time is right and we will get you the link.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">This is our last note. We offered you free access to Prayer Authority – community plus Dream Interpreter, Urim &amp; Thummim, Spousal Translator, and more.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to join, we are here. Just reply when the time is right and we will get you the link. No pressure.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "prayer-church-followup-1": {
    subject: "Prayer Authority for your church – Give your congregation tools they’ll actually use",
    text: `Hi {{Name}},

Following up: we offered to bring Prayer Authority to your church – prayer requests that connect your people worldwide, P48X Journal, Dream Interpreter, Urim & Thummim, Spousal Translator, Biblical Counsel (12 advisors), and more.

Your people get real spiritual tech, not just another app they log into once. Free (Ruby) and premium (Diamond) tiers so you can scale – small groups, youth, or church-wide. Reply with your church name and we will send the overview and next steps so you can see how other congregations are using it.${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered to bring <strong>Prayer Authority</strong> to your church – prayer requests, P48X Journal, Dream Interpreter, Urim &amp; Thummim, Spousal Translator, Biblical Counsel. Your people get <strong>real tools</strong>, not just another app they log into once.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Free and premium tiers so you can scale – small groups, youth, or church-wide. That is why we are following up: we want your congregation to have this. Reply with your church name and we will send the overview and next steps.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Request church overview</a></p>`
    ),
  },
  "prayer-church-followup-2": {
    subject: "Congregations that use Prayer Authority give members tools that help them grow – not just log in",
    text: `Hi {{Name}},

Quick nudge: congregations use Prayer Authority so members can share requests, use Dream Interpreter, Urim & Thummim, Spousal Translator, and biblical counsel – tools that help people grow, not just log in and forget.

If you are open to giving your people something they will actually use – for prayer, for marriage, for discerning God's will, for dream interpretation – one reply and we will send the church overview and a short guide. We can also schedule a quick call to walk your team through sign-up. No obligation.${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Congregations use Prayer Authority so members get <strong>tools they actually use</strong> – prayer requests, Dream Interpreter, Urim &amp; Thummim, Spousal Translator, biblical counsel. Tools that help people grow, not just log in.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you want that for your church, one reply and we will send the overview and next steps. We can also schedule a quick call to walk your team through sign-up. No obligation.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the overview</a></p>`
    ),
  },
  "prayer-church-followup-3": {
    subject: "Final note – Prayer Authority for your church (when you’re ready to explore)",
    text: `Hi {{Name}},

This is our last note. We offered Prayer Authority for your church – tools and community your congregation can actually use: prayer requests, Dream Interpreter, Urim & Thummim, Spousal Translator, Biblical Counsel.

If you ever want to explore it – for small groups, youth, or church-wide – we are here. Just reply with your church name and we will send the overview. No pressure.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">This is our last note. We offered Prayer Authority for your church – tools and community your people can actually use.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to explore it, we are here. Just reply with your church name and we will send the overview. No pressure.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "tourism-hawaii-followup-1": {
    subject: "Don’t book Hawaii tours until you’ve seen our exclusive discounts (luaus, helicopter, Pearl Harbor & more)",
    text: `Hi {{Name}},

Following up: we offered you exclusive wholesale discounts on Hawaii tours – luaus, helicopter, Pearl Harbor, snorkeling, Road to Hana, volcano, and more – plus a free webinar (60–75 min) that shows you how to get them.

Booking without checking our offers can mean overpaying. Many travelers only find out after they have already paid full price. We want you to have the details and webinar link before you book. One reply and we will send everything so you can compare and save.${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you <strong>exclusive tour discounts</strong> and a free webinar for Hawaii – luaus, helicopter, Pearl Harbor, snorkeling, Road to Hana, volcano, and more. Booking without checking our offers can mean overpaying.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Many travelers only find out after they have already paid full price. We want you to have the details before you book. One reply and we will send the webinar link and full details so you can compare and save.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the details</a></p>`
    ),
  },
  "tourism-hawaii-followup-2": {
    subject: "Many people overpay for Hawaii tours because they book before checking wholesale rates",
    text: `Hi {{Name}},

Quick nudge: our webinar and exclusive discounts could save you real money on your Hawaii trip. Many people book first and only later find out they could have paid less through wholesale.

We offered you the link and the details so you can decide before you commit. Reply and we will send them – then you can watch the webinar, see the rates, and book with confidence. No obligation to book; we just want you to have the info.${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Our <strong>exclusive discounts</strong> and webinar could save you real money on your Hawaii trip. Many people book first and only later find out they could have paid less.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We want you to have the info before you book. Reply and we will send the link and details – then you can watch the webinar, see the rates, and book with confidence. No obligation.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Send me the link</a></p>`
    ),
  },
  "tourism-hawaii-followup-3": {
    subject: "Final note – Time for Fun Hawaii tour discounts & webinar (when you’re ready)",
    text: `Hi {{Name}},

This is our last note. We offered our Hawaii tour discounts and webinar link so you could save before you book – luaus, helicopter, Pearl Harbor, snorkeling, Road to Hana, volcano, and more.

If you ever want the details or the webinar link, we are here. Just reply and we will send them. No obligation.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">This is our last note. We offered our Hawaii tour discounts and webinar so you could save before you book.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want the details or the link, we are here. Just reply and we will send them. No obligation.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "tourism-usa-followup-1": {
    subject: "1 of 4 complimentary vacations – real offer from H.I.E. Wholesale Travel (see for yourself)",
    text: `Hi {{Name}},

Following up: we offered you the chance to choose 1 of 4 complimentary vacations through H.I.E. Wholesale Travel – Carnival Cruise (3–5 nights), 7 Night Condo Stay, 7 Day Caribbean Cruise for Two, or Mexico Getaway (8d/7n). You pay only required fees and taxes when you are ready to go.

Many people do not believe it until they claim one – that is why we are following up. No obligation to book; we just want you to have the next step so you can see for yourself. Reply and we will send it. Valid 18 months; Hawaii-based, A+ BBB.${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you <strong>1 of 4 complimentary vacations</strong> through H.I.E. Wholesale Travel – Carnival Cruise, 7 Night Condo, Caribbean Cruise for Two, or Mexico Getaway. You pay only fees and taxes when you are ready.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Many people do not believe it until they claim one. No obligation to book; we just want you to have the next step so you can see for yourself. Reply and we will send it. Valid 18 months; A+ BBB.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the next step</a></p>`
    ),
  },
  "tourism-usa-followup-2": {
    subject: "4 complimentary vacations – it sounds too good to be true (it’s real – here’s how to claim one)",
    text: `Hi {{Name}},

Quick nudge: 4 vacation options, complimentary – it sounds too good to be true, but it is real. H.I.E. Wholesale Travel is Hawaii-based, A+ BBB, with 500,000+ active users. Attend one educational webinar (60–75 min) on wholesale travel, then choose your package.

Many people do not claim because they assume it is a gimmick. We want you to have the details so you can decide. Reply and we will get you the next step – no obligation. If you never use it, there is no cost whatsoever.${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">4 vacation options, <strong>complimentary</strong> – it sounds too good to be true, but it is real. Attend one webinar, then choose your package. Many people do not claim because they assume it is a gimmick.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We want you to have the details so you can decide. Reply and we will get you the next step. No obligation. If you never use it, there is no cost.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the details</a></p>`
    ),
  },
  "tourism-usa-followup-3": {
    subject: "Final note – 4 complimentary vacations (when you’re ready to claim one)",
    text: `Hi {{Name}},

This is our last note. We offered you 1 of 4 complimentary vacations through H.I.E. Wholesale Travel – Carnival Cruise, 7 Night Condo, Caribbean Cruise for Two, or Mexico Getaway.

If you ever want to claim one – or just get the next step to see how it works – we are here. Just reply and we will send the details. No obligation.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">This is our last note. We offered you 1 of 4 complimentary vacations through H.I.E. Wholesale Travel.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to claim one or get the next step, we are here. Just reply and we will send the details. No obligation.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "wedding-couples-followup-1": {
    subject: "Plan your Hawaiian wedding in one place – venues, vendors & interactive planner (no more spreadsheets)",
    text: `Hi {{Name}},

Following up: we offered you one place to plan your dream Hawaiian wedding – Oahu, Maui, Kauai, Big Island – venues, vendors, and an interactive planner so you are not chasing spreadsheets and scattered links.

Many couples tell us it saved them time and stress because everything is in one place: real vendors, articles for every step, and a planner that actually works. That is why we are following up: we want you to have the link. Click below or reply and we will get you started. No cost to explore.${CONTACT_FOOTER}`,
    html: box(
      "#be185d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you <strong>one place</strong> to plan your dream Hawaiian wedding – Oahu, Maui, Kauai, Big Island – venues, vendors, interactive planner. Many couples say it saved them time and stress because they were not chasing spreadsheets.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Everything in one place: real vendors, articles for every step. That is why we are following up: we want you to have the link. Click below or reply and we will get you started. No cost to explore.</p><p style="margin:0 0 20px;"><a href="https://www.hawaiiweddingplans.com" style="display:inline-block;background:#be185d;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">HawaiiWeddingPlans.com</a></p>`
    ),
  },
  "wedding-couples-followup-2": {
    subject: "Couples who plan in one place save time and stress – here’s the link (Hawaii Wedding Plans)",
    text: `Hi {{Name}},

Quick nudge: we offered you Hawaii Wedding Plans – interactive planner, real vendors, articles for every step. Planning in one place instead of scattered links and emails really does save time and stress; that is what couples tell us over and over.

The reason we are following up: we do not want you to miss the chance to try it before you get deep into planning. Reply and we will get you the link so you can see for yourself – venues, vendors, one dashboard. No cost.${CONTACT_FOOTER}`,
    html: box(
      "#be185d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you an <strong>interactive planner</strong>, real vendors, and articles for every step. Planning in one place instead of scattered links and emails saves time and stress – that is what couples tell us.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We do not want you to miss the chance to try it before you get deep into planning. Reply and we will get you the link so you can see for yourself. No cost.</p><p style="margin:0 0 20px;"><a href="https://www.hawaiiweddingplans.com" style="display:inline-block;background:#be185d;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get started</a></p>`
    ),
  },
  "wedding-couples-followup-3": {
    subject: "Final note – Hawaii Wedding Plans (one place to plan it all, when you’re ready)",
    text: `Hi {{Name}},

This is our last note. We offered you one place to plan your Hawaiian wedding – venues, vendors, interactive planner – so you do not have to chase spreadsheets and scattered links.

If you ever want to use it – now or later in your planning – we are here. Just click the link below or reply and we will get you started. No cost.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#be185d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">This is our last note. We offered you one place to plan your Hawaiian wedding – venues, vendors, interactive planner.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to use it – now or later – we are here. Just click below or reply. No cost.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="https://www.hawaiiweddingplans.com" style="display:inline-block;background:#be185d;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">HawaiiWeddingPlans.com</a></p>`
    ),
  },
  "wedding-contractors-followup-1": {
    subject: "Couples planning Hawaii weddings use our site to build packages – get your listing in front of them",
    text: `Hi {{Name}},

Following up: we offered to feature your service or venue on Hawaii Wedding Plans. Couples use our site to build packages – venues, photographers, caterers, and more – so they can compare and book in one place.

If you are not listed, they are finding someone else. Your listing gets in front of them when they are ready to book. No cost to submit; we just want you to have the chance to be seen. Reply and we will send the submit link so you can get your business in front of couples planning their Hawaii wedding.${CONTACT_FOOTER}`,
    html: box(
      "#15803d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered to <strong>feature your service or venue</strong> on Hawaii Wedding Plans. Couples use our site to build packages – if you are not listed, they are finding someone else.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Your listing gets in front of them when they are ready to book. No cost to submit. That is why we are following up: we want you in front of them. Reply and we will send the submit link.</p><p style="margin:0 0 20px;"><a href="https://www.hawaiiweddingplans.com/submit/" style="display:inline-block;background:#15803d;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Submit to be featured</a></p>`
    ),
  },
  "wedding-contractors-followup-2": {
    subject: "Every day you’re not on Hawaii Wedding Plans is a day couples may book a competitor",
    text: `Hi {{Name}},

Quick nudge: photographers, venues, caterers, and more get in front of couples who are actively planning their Hawaii wedding on our site. Every day you are not listed is a day they might book someone else.

We offered you the submit form – no cost, no obligation. Reply and we will send it so you can get your business in front of couples while they are still deciding. The sooner you are listed, the sooner you can show up in their package.${CONTACT_FOOTER}`,
    html: box(
      "#15803d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Photographers, venues, caterers get in front of couples <strong>actively planning</strong> their Hawaii wedding. Every day you are not listed is a day they might book someone else.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you the submit form – no cost. Reply and we will send it so you can get in front of couples while they are still deciding. The sooner you are listed, the sooner you show up in their package.</p><p style="margin:0 0 20px;"><a href="https://www.hawaiiweddingplans.com/submit/" style="display:inline-block;background:#15803d;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the form</a></p>`
    ),
  },
  "wedding-contractors-followup-3": {
    subject: "Final note – Get featured on Hawaii Wedding Plans (when you’re ready)",
    text: `Hi {{Name}},

This is our last note. We offered you a spot on Hawaii Wedding Plans so couples planning their Hawaii wedding can find you when they build their packages.

If you ever want to be featured – photographers, venues, caterers, and more are already on the site – we are here. Just reply and we will send the submit link. No cost.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#15803d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">This is our last note. We offered you a spot so couples planning their Hawaii wedding can find you.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to be featured, we are here. Just reply and we will send the submit link. No cost.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="https://www.hawaiiweddingplans.com/submit/" style="display:inline-block;background:#15803d;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "p48x-personal-followup-1": {
    subject: "P48X – Book, free app, 24+ hr audiobook & member chatbots (transform what you think about)",
    text: `Hi {{Name}},

Following up: we offered you P48X – Philippians 4:8 Expounded – to help you fix your mind on what is true, honorable, pure, and lovely. You get the book, a free app for daily reflections (connect Google Calendar, get daily prompts), and over 24 hours of audiobook – free chapters on YouTube, full access when you join as a member, plus member-only chatbots: Dream Interpreter, Spousal Translator, Urim & Thummim, Biblical Counsel (12 advisors).

That is why we are following up: we want you to have the link so you can explore the free chapters and app with no obligation. One reply and we will send it.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you <strong>P48X</strong> – to transform your mind with Philippians 4:8: book, free app, <strong>24+ hours of audiobook</strong> (free chapters + full access as a member), and member-only chatbots (Dream Interpreter, Spousal Translator, Urim &amp; Thummim, Biblical Counsel).</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">That is why we are following up: we want you to have the link so you can explore the free chapters and app with no obligation. One reply and we will send it.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the link</a></p>`
    ),
  },
  "p48x-personal-followup-2": {
    subject: "What you think shapes who you become – P48X gives you the book, app & 24+ hr audiobook",
    text: `Hi {{Name}},

We offered you P48X because what you think shapes who you become. The book walks through each virtue in Philippians 4:8; the free app gives you daily prompts and journaling; the 24+ hours of audiobook let you listen in the author's voice. Members also get access to biblically trained chatbots: Dream Interpreter, Spousal Translator, Urim & Thummim, Biblical Counsel.

There is no cost to explore the free chapters and app – so you can try before you commit. Reply and we will send the details and links so you can see for yourself.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you P48X because <strong>what you think shapes who you become</strong>. The book, app, and 24+ hours of audiobook help you focus on what is true and good – and members get the chatbots (Dream Interpreter, Spousal Translator, Urim &amp; Thummim, Biblical Counsel).</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">No cost to explore the free chapters and app – try before you commit. Reply and we will send the details and links so you can see for yourself.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the details</a></p>`
    ),
  },
  "p48x-personal-followup-3": {
    subject: "Final note – P48X book, app, 24+ hr audiobook & member chatbots (when you’re ready)",
    text: `Hi {{Name}},

This is our last note. We offered you P48X – book, free app, 24+ hours of audiobook, and member-only chatbots – to help you fix your mind on what is true and lovely.

If you ever want to check it out – the free chapters and app are enough to get started – we are here. Just reply and we will send the link. No obligation.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">This is our last note. We offered you P48X – book, app, 24+ hr audiobook, and member chatbots – to help you fix your mind on what is true and lovely.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to check it out – the free chapters and app are enough to get started – we are here. Just reply and we will send the link. No obligation.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "p48x-physical-distributors-followup-1": {
    subject: "P48X wholesale – Add a high-margin title to your store (faith & general markets)",
    text: `Hi {{Name}},

Following up: we offered you wholesale printed copies of P48X (Philippians 4:8 Expounded by Eric Schaefer) for your store. It sells well in faith-based and general markets – customers buy it for themselves and give it as gifts, and carrying it can add a high-margin item without the runaround of complex terms.

That is why we are following up: we want you to have the numbers. Reply and we will send pricing, minimums, and order details so you can see if it fits your store. We typically respond within 24–48 hours.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you <strong>wholesale P48X</strong> for your store. It sells well in faith and general markets – customers buy it for themselves and give it as gifts. Carrying it can add a <strong>high-margin item</strong> without complex terms.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">That is why we are following up: we want you to have the numbers. Reply and we will send pricing, minimums, and order details. We typically respond within 24–48 hours.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Request pricing</a></p>`
    ),
  },
  "p48x-physical-distributors-followup-2": {
    subject: "P48X sells in faith & general markets – straightforward wholesale (no runaround)",
    text: `Hi {{Name}},

Quick nudge: P48X sells well in faith and general markets – it is a book people buy for themselves and give as gifts. Author Eric Schaefer is also E Lion (Holy Hip-Hop, Family Feud grand prize), so the book has strong appeal for faith-based retailers, churches, and inspirational readers.

Wholesale terms are straightforward; we do not do runaround. Reply and we will send the sheet so you can see pricing and minimums and decide if it fits your store. No obligation.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">P48X sells well in faith and general markets – people buy it for themselves and give it as gifts. Strong appeal for faith-based retailers, churches, and inspirational readers.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Wholesale terms are straightforward; we do not do runaround. Reply and we will send the sheet so you can see pricing and minimums. No obligation.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the sheet</a></p>`
    ),
  },
  "p48x-physical-distributors-followup-3": {
    subject: "Final note – P48X wholesale for your store (when you’re ready)",
    text: `Hi {{Name}},

This is our last note. We offered you wholesale P48X so you could add a strong title to your store – faith and general markets, straightforward terms.

If you ever want to carry it – or just get the pricing sheet to compare – we are here. Just reply and we will send the details. No obligation.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">This is our last note. We offered you wholesale P48X so you could add a strong title to your store.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to carry it or get the pricing sheet, we are here. Just reply and we will send the details. No obligation.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "p48x-affiliate-sellers-followup-1": {
    subject: "P48X affiliate – 15% on every sale you refer, no inventory (we fulfill everything)",
    text: `Hi {{Name}},

Following up: we offered you a P48X affiliate spot – 15% on every direct book sale you refer, no cap. You do not carry inventory; we handle fulfillment. You share the book and app with your audience (blog, social, church, friends) and earn when they buy.

Many partners promote P48X because it fits faith and general audiences and the terms are simple. That is why we are following up: we want you to have the partner link so you can start sharing and earning. Reply and we will send it.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you a <strong>P48X affiliate</strong> spot – <strong>15%</strong> on every sale you refer, no cap. No inventory – we fulfill. You share the book and app with your audience and earn.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Many partners promote P48X because the terms are simple. That is why we are following up: we want you to have the partner link. Reply and we will send it so you can start sharing and earning.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get partner link</a></p>`
    ),
  },
  "p48x-affiliate-sellers-followup-2": {
    subject: "15% on every P48X sale – you share, we ship (no inventory, no cap)",
    text: `Hi {{Name}},

Quick nudge: 15% on every P48X sale you refer, no cap. Many partners promote the book and app to their audience – they do not stock or ship anything; we do. One simple rule: the buyer says they got it from you and emails us with the receipt; you get 15% off your own book purchases or equivalent credit.

Reply and we will get you set up so you can start sharing and earning. No cost to join; no minimum.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;"><strong>15%</strong> on every sale you refer, no cap. Many partners promote the book and app – they do not stock or ship; we do. One simple rule: the buyer says they got it from you and emails us with the receipt.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Reply and we will get you set up so you can start sharing and earning. No cost to join; no minimum.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get set up</a></p>`
    ),
  },
  "p48x-affiliate-sellers-followup-3": {
    subject: "Final note – P48X affiliate 15% (no inventory, when you’re ready)",
    text: `Hi {{Name}},

This is our last note. We offered you 15% on P48X sales – no inventory, we fulfill. You share the book and app with your audience; when they buy and email us with a receipt showing they got it from you, you get the credit.

If you ever want to partner – or just get the partner link to have on hand – we are here. Just reply and we will send it. No obligation.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">This is our last note. We offered you 15% on P48X sales – no inventory, we fulfill.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to partner or get the partner link, we are here. Just reply and we will send it. No obligation.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "healing-herbals-smoke-shop-followup-1": {
    subject: "Healing Herbals wholesale – Kava, Blue Lotus, Kanna, Kratom + suggested retail (40% markup)",
    text: `Hi {{Name}},

Following up: we offered you wholesale Healing Herbals – Kava, Blue Lotus, Kanna, Kratom (vapes, shots, tinctures, bulk) – with clear suggested retail so you can price and sell with confidence. We provide suggested retail on everything (40% markup where not already set); our two most popular nicotine-replacement products are Kava Extract Juice and Blue Lotus Extract Juice at wholesale $27.50 each, suggested retail $50 each.

Your customers are already looking for quality botanicals; we give you product that moves and margins that work. Reply and we will send the 2025 wholesale sheet with full product list and suggested retail.${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you <strong>wholesale Healing Herbals</strong> – Kava, Blue Lotus, Kanna, Kratom (vapes, shots, tinctures) – with <strong>clear suggested retail</strong> (40% markup where not already set). Your customers are already looking for quality botanicals; we give you product that moves.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">That is why we are following up: we want you to have the 2025 sheet with full product list and suggested retail. Reply and we will send it.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Request wholesale sheet</a></p>`
    ),
  },
  "healing-herbals-smoke-shop-followup-2": {
    subject: "Quality botanicals + suggested retail (40%) – product that moves off the shelf",
    text: `Hi {{Name}},

Quick nudge: we offered you quality Kava, Blue Lotus, Kanna, Kratom with clear suggested retail (40% markup on items that did not already have a retail price) so you can price and sell with confidence. Product that moves means repeat orders – and we have high margins (100–150% on wholesale for many items), low MOQ, and fast delivery.

Reply and we will send the wholesale overview and minimums so you can see the full range and suggested retail. Robbie (631) 871-7641 or Herbalhealingsmarketing@gmail.com for wholesale; local Oahu Eric (808) 393-0153.${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you <strong>quality botanicals</strong> and <strong>clear suggested retail</strong> (40% markup where not already set) – so you can price and sell with confidence. Product that moves means repeat orders; we have high margins, low MOQ, fast delivery.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Reply and we will send the wholesale overview and minimums. Robbie (631) 871-7641 or Herbalhealingsmarketing@gmail.com for wholesale; local Oahu Eric (808) 393-0153.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the overview</a></p>`
    ),
  },
  "healing-herbals-smoke-shop-followup-3": {
    subject: "Final note – Healing Herbals wholesale (Kava, Blue Lotus, Kanna, Kratom + suggested retail)",
    text: `Hi {{Name}},

This is our last note. We offered you wholesale Healing Herbals – Kava, Blue Lotus, Kanna, Kratom – with suggested retail so you could stock quality botanicals your customers want and price with confidence.

If you ever want to partner – or just get the 2025 sheet to compare – we are here. Reply and we will send it. Robbie (631) 871-7641 or Herbalhealingsmarketing@gmail.com; local Oahu Eric (808) 393-0153.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">This is our last note. We offered you wholesale Healing Herbals with suggested retail so you could stock what your customers want.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to partner or get the 2025 sheet, we are here. Reply and we will send it. No obligation.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "healing-herbals-individual-followup-1": {
    subject: "Kava & Blue Lotus for real relaxation – vapes, shots, tinctures (no hangover)",
    text: `Hi {{Name}},

Following up: we offered you our Kava and Blue Lotus options (vapes, shots, tinctures) for relaxation – top-quality from Vanuatu, Fiji, Samoa, and Hawaii. Many customers say it helps them wind down without the dulling effects of alcohol or the next-day hangover.

Our two most popular products are Kava Extract Juice and Blue Lotus Extract Juice – vape-ready, replaceable tops, refillable – $50 each. Plus Kava shots, tinctures, seltzers, instant mixes, gummies; full catalog at healingherbals.store (50% off with code Storefront3, min $500 before discount). That is why we are following up: we want you to have the link so you can try for yourself. Reply and we will send it.${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you our <strong>Kava and Blue Lotus</strong> options (vapes, shots, tinctures) for relaxation – many customers say it helps them wind down without the hangover. Top-quality from Vanuatu, Fiji, Samoa, and Hawaii.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Kava Extract Juice and Blue Lotus Extract Juice – $50 each; full catalog at healingherbals.store. That is why we are following up: we want you to have the link so you can try for yourself. Reply and we will send it.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the link</a></p>`
    ),
  },
  "healing-herbals-individual-followup-2": {
    subject: "Wind down without the hangover – Kava & Blue Lotus (vapes, shots, tinctures)",
    text: `Hi {{Name}},

Quick nudge: we offered you Kava and Blue Lotus in forms that fit your routine – vapes, shots, tinctures. Kava (Piper methysticum) has been sought after for hundreds of years for relaxation, decreased anxiety, and mental clarity without the dulling effects of alcohol.

Many customers tell us it helps them wind down without the hangover. Reply and we will send the details and product link so you can see what fits you – and the full catalog at healingherbals.store with code Storefront3 (50% off, min $500 before discount). Order: Herbalhealingsmarketing@gmail.com or Robbie (631) 871-7641; local Oahu Eric (808) 393-0153.${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We offered you Kava and Blue Lotus in forms that fit your routine – vapes, shots, tinctures. Many customers say it helps them <strong>wind down without the hangover</strong> – relaxation and mental clarity without the dulling effects of alcohol.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Reply and we will send the details and product link so you can see what fits you. Full catalog at healingherbals.store; order via Herbalhealingsmarketing@gmail.com or Robbie (631) 871-7641; local Oahu Eric (808) 393-0153.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the details</a></p>`
    ),
  },
  "healing-herbals-individual-followup-3": {
    subject: "Final note – Healing Herbals Kava & Blue Lotus (when you’re ready to try)",
    text: `Hi {{Name}},

This is our last note. We offered you our Kava and Blue Lotus products for relaxation – vapes, shots, tinctures – from the Healing Herbals Kava Collection (Vanuatu, Fiji, Samoa, Hawaii).

If you ever want to try them – or just get the product link and catalog info – we are here. Reply and we will send the details. Order: Herbalhealingsmarketing@gmail.com or Robbie (631) 871-7641; local Oahu Eric (808) 393-0153.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">This is our last note. We offered you our Kava and Blue Lotus products for relaxation – vapes, shots, tinctures.</p><p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to try them or get the product link, we are here. Reply and we will send the details. No obligation.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
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
