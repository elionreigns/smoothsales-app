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
    subject: "Re: Botox Oahu - Clear pricing & same-day availability (quick follow-up)",
    text: `Hi {{Name}},\n\nFollowing up - we would still love to send you our clear pricing and same-day availability for physician-led Botox on Oahu. No obligation; just the info so you can decide. Reply or call (808) 393-0153 and we will get it to you.${CONTACT_FOOTER}`,
    html: box(
      "#0d9488",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up - we would still love to send you our <strong>clear pricing</strong> and <strong>same-day availability</strong> for physician-led Botox on Oahu. No obligation; just the info so you can decide.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#0d9488;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Reply or request the sheet</a></p>`
    ),
  },
  "botox-followup-2": {
    subject: "One more reason to get our Botox Oahu pricing",
    text: `Hi {{Name}},\n\nQuick nudge: physician-led care, transparent pricing, same-day availability. Many clients say they wished they would asked sooner. One reply and we will send the price sheet - no pressure.${CONTACT_FOOTER}`,
    html: box(
      "#0d9488",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Physician-led care, transparent pricing, same-day availability. Many clients say they wished they would asked sooner.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#0d9488;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Request the price sheet</a></p>`
    ),
  },
  "botox-followup-3": {
    subject: "Last note - Botox Oahu pricing",
    text: `Hi {{Name}},\n\nLast note from our side: if you would like our Botox Oahu pricing and availability, just reply and we will send it over.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#0d9488",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you would like our Botox Oahu pricing and availability, just reply and we will send it over.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#0d9488;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "tech-followup-1": {
    subject: "Re: Coral Crown Tech - Websites, chatbots, hosting (following up)",
    text: `Hi {{Name}},\n\nFollowing up - we would still love to help you unlock your digital presence: websites, chatbots, hosting. Local team, clear communication. Reply with what you are looking for and we will send options.${CONTACT_FOOTER}`,
    html: box(
      "#0369a1",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up - we would still love to help with <strong>websites, chatbots, hosting</strong>. Local team, clear communication.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#0369a1;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Tell us what you need</a></p>`
    ),
  },
  "tech-followup-2": {
    subject: "One more reason to go with Coral Crown Tech",
    text: `Hi {{Name}},\n\nQuick nudge: we build sites and chatbots that actually get used - and we are here on the islands. No runaround, no jargon. One reply and we will send a short overview of what we can do for you.${CONTACT_FOOTER}`,
    html: box(
      "#0369a1",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">We build sites and chatbots that actually get used - and we are here on the islands. No runaround, no jargon.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#0369a1;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get an overview</a></p>`
    ),
  },
  "tech-followup-3": {
    subject: "Last note - Coral Crown Tech",
    text: `Hi {{Name}},\n\nLast note: if you ever want to explore a new site, chatbot, or hosting, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#0369a1",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to explore a new site, chatbot, or hosting, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#0369a1;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "prayer-individual-followup-1": {
    subject: "Re: Prayer Authority - Free prayer community (following up)",
    text: `Hi {{Name}},\n\nFollowing up - we would still love to have you in Prayer Authority: free Christian prayer community and spiritual tech. No cost, no obligation. Reply "yes" or "tell me more" and we will get you the link.${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up - we would still love to have you in <strong>Prayer Authority</strong>: free Christian prayer community and spiritual tech. No cost.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Join or learn more</a></p>`
    ),
  },
  "prayer-individual-followup-2": {
    subject: "One more reason to join Prayer Authority",
    text: `Hi {{Name}},\n\nQuick nudge: a free place to share requests, pray for others, and grow. If you have been meaning to connect with a prayer community, one reply and we will send the details.${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">A free place to share requests, pray for others, and grow. One reply and we will send the details.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the link</a></p>`
    ),
  },
  "prayer-individual-followup-3": {
    subject: "Last note - Prayer Authority",
    text: `Hi {{Name}},\n\nLast note: if you ever want to join a free prayer community, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to join a free prayer community, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "prayer-church-followup-1": {
    subject: "Re: Prayer Authority for your church (following up)",
    text: `Hi {{Name}},\n\nFollowing up - we would still love to bring Prayer Authority to your church: tools and community for your congregation. No cost to explore. Reply with your church name and we will send the overview.${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up - we would still love to bring <strong>Prayer Authority</strong> to your church: tools and community for your congregation.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Request church overview</a></p>`
    ),
  },
  "prayer-church-followup-2": {
    subject: "One more reason to add Prayer Authority at your church",
    text: `Hi {{Name}},\n\nQuick nudge: congregations use Prayer Authority to share requests and stay connected. If you are open to exploring, one reply and we will send the church overview and next steps.${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Congregations use Prayer Authority to share requests and stay connected. One reply and we will send the church overview.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the overview</a></p>`
    ),
  },
  "prayer-church-followup-3": {
    subject: "Last note - Prayer Authority for your church",
    text: `Hi {{Name}},\n\nLast note: if you ever want to explore Prayer Authority for your church, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#6d28d9",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to explore Prayer Authority for your church, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#6d28d9;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "tourism-hawaii-followup-1": {
    subject: "Re: Time for Fun Hawaii - Tour discounts & webinar (following up)",
    text: `Hi {{Name}},\n\nFollowing up - we would still love to get you our exclusive tour discounts and webinar for Hawaii. One reply and we will send the details.${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up - we would still love to get you our <strong>exclusive tour discounts</strong> and webinar for Hawaii.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the details</a></p>`
    ),
  },
  "tourism-hawaii-followup-2": {
    subject: "One more reason to grab our Hawaii tour offers",
    text: `Hi {{Name}},\n\nQuick nudge: exclusive discounts and a webinar that could save you time and money on your Hawaii trip. Reply and we will send the link.${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Exclusive discounts and a webinar that could save you time and money on your Hawaii trip.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Send me the link</a></p>`
    ),
  },
  "tourism-hawaii-followup-3": {
    subject: "Last note - Time for Fun Hawaii",
    text: `Hi {{Name}},\n\nLast note: if you ever want our Hawaii tour discounts or webinar link, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want our Hawaii tour discounts or webinar link, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "tourism-usa-followup-1": {
    subject: "Re: 4 Complimentary Vacations - Time for Fun USA (following up)",
    text: `Hi {{Name}},\n\nFollowing up - you can still choose 1 of 4 complimentary vacations through H.I.E. Wholesale Travel. No obligation to book. Reply and we will send the next step.${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up - you can still <strong>choose 1 of 4 complimentary vacations</strong> through H.I.E. Wholesale Travel. No obligation.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the next step</a></p>`
    ),
  },
  "tourism-usa-followup-2": {
    subject: "One more reason to claim your complimentary vacation",
    text: `Hi {{Name}},\n\nQuick nudge: 4 vacation options, complimentary - many people do not realize this is available. Reply and we will get you the details.${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">4 vacation options, complimentary - many people do not realize this is available.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the details</a></p>`
    ),
  },
  "tourism-usa-followup-3": {
    subject: "Last note - 4 complimentary vacations",
    text: `Hi {{Name}},\n\nLast note: if you ever want to claim one of the 4 complimentary vacations, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#059669",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to claim one of the 4 complimentary vacations, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#059669;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "wedding-couples-followup-1": {
    subject: "Re: Plan your dream Hawaiian wedding (following up)",
    text: `Hi {{Name}},\n\nFollowing up - we would still love to help you plan your dream Hawaiian wedding. Oahu, Maui, Kauai, Big Island - venues, vendors, and one place to plan it all. Reply and we will send the link.${CONTACT_FOOTER}`,
    html: box(
      "#be185d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up - we would still love to help you plan your <strong>dream Hawaiian wedding</strong>. Oahu, Maui, Kauai, Big Island - one place to plan it all.</p><p style="margin:0 0 20px;"><a href="https://www.hawaiiweddingplans.com" style="display:inline-block;background:#be185d;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">HawaiiWeddingPlans.com</a></p>`
    ),
  },
  "wedding-couples-followup-2": {
    subject: "One more reason to plan with Hawaii Wedding Plans",
    text: `Hi {{Name}},\n\nQuick nudge: interactive planner, real vendors, and articles for every step. Many couples say it saved them time and stress. Reply and we will get you started.${CONTACT_FOOTER}`,
    html: box(
      "#be185d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Interactive planner, real vendors, and articles for every step. Many couples say it saved them time and stress.</p><p style="margin:0 0 20px;"><a href="https://www.hawaiiweddingplans.com" style="display:inline-block;background:#be185d;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get started</a></p>`
    ),
  },
  "wedding-couples-followup-3": {
    subject: "Last note - Hawaii Wedding Plans",
    text: `Hi {{Name}},\n\nLast note: if you ever want to plan your Hawaiian wedding in one place, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#be185d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to plan your Hawaiian wedding in one place, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="https://www.hawaiiweddingplans.com" style="display:inline-block;background:#be185d;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">HawaiiWeddingPlans.com</a></p>`
    ),
  },
  "wedding-contractors-followup-1": {
    subject: "Re: Get featured on Hawaii Wedding Plans (following up)",
    text: `Hi {{Name}},\n\nFollowing up - we would still love to feature your service or venue on Hawaii Wedding Plans. Couples use our site to build packages - your listing gets in front of them. Reply and we will send the submit link.${CONTACT_FOOTER}`,
    html: box(
      "#15803d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up - we would still love to <strong>feature your service or venue</strong> on Hawaii Wedding Plans. Couples use our site to build packages.</p><p style="margin:0 0 20px;"><a href="https://www.hawaiiweddingplans.com/submit/" style="display:inline-block;background:#15803d;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Submit to be featured</a></p>`
    ),
  },
  "wedding-contractors-followup-2": {
    subject: "One more reason to get listed on Hawaii Wedding Plans",
    text: `Hi {{Name}},\n\nQuick nudge: photographers, venues, caterers, and more get in front of couples planning their Hawaii wedding. No cost to submit. Reply and we will send the form.${CONTACT_FOOTER}`,
    html: box(
      "#15803d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Photographers, venues, caterers get in front of couples planning their Hawaii wedding. No cost to submit.</p><p style="margin:0 0 20px;"><a href="https://www.hawaiiweddingplans.com/submit/" style="display:inline-block;background:#15803d;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the form</a></p>`
    ),
  },
  "wedding-contractors-followup-3": {
    subject: "Last note - Get featured on Hawaii Wedding Plans",
    text: `Hi {{Name}},\n\nLast note: if you ever want to be featured on Hawaii Wedding Plans, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#15803d",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to be featured on Hawaii Wedding Plans, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="https://www.hawaiiweddingplans.com/submit/" style="display:inline-block;background:#15803d;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "p48x-personal-followup-1": {
    subject: "Re: P48X - Book, app & audiobook (following up)",
    text: `Hi {{Name}},\n\nFollowing up - we would still love to share P48X with you: transform your mind with Philippians 4:8 (book, app, audiobook). One reply and we will send the link.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up - we would still love to share <strong>P48X</strong> with you: book, app, audiobook - Philippians 4:8 in practice.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the link</a></p>`
    ),
  },
  "p48x-personal-followup-2": {
    subject: "One more reason to try P48X",
    text: `Hi {{Name}},\n\nQuick nudge: readers say P48X (book + app + audiobook) helps them focus on what is true and good. No cost to explore. Reply and we will send the details.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Readers say P48X helps them focus on what is true and good. No cost to explore.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the details</a></p>`
    ),
  },
  "p48x-personal-followup-3": {
    subject: "Last note - P48X (book, app, audiobook)",
    text: `Hi {{Name}},\n\nLast note: if you ever want to check out P48X, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to check out P48X, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "p48x-physical-distributors-followup-1": {
    subject: "Re: P48X wholesale for your store (following up)",
    text: `Hi {{Name}},\n\nFollowing up - we would still love to get you wholesale printed copies of P48X (Eric Schaefer) for your store. Reply and we will send pricing and minimums.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up - we would still love to get you <strong>wholesale printed copies of P48X</strong> for your store.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Request pricing</a></p>`
    ),
  },
  "p48x-physical-distributors-followup-2": {
    subject: "One more reason to carry P48X",
    text: `Hi {{Name}},\n\nQuick nudge: P48X sells well in faith and general markets. Wholesale terms are straightforward. Reply and we will send the sheet.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">P48X sells well in faith and general markets. Wholesale terms are straightforward.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the sheet</a></p>`
    ),
  },
  "p48x-physical-distributors-followup-3": {
    subject: "Last note - P48X wholesale",
    text: `Hi {{Name}},\n\nLast note: if you ever want to carry P48X in your store, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to carry P48X in your store, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "p48x-affiliate-sellers-followup-1": {
    subject: "Re: P48X - 15% on direct sales (following up)",
    text: `Hi {{Name}},\n\nFollowing up - we would still love to have you as a P48X affiliate: 15% on direct book sales. No inventory, we handle fulfillment. Reply and we will send the partner link.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up - we would still love to have you as a <strong>P48X affiliate: 15%</strong> on direct book sales. No inventory.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get partner link</a></p>`
    ),
  },
  "p48x-affiliate-sellers-followup-2": {
    subject: "One more reason to join P48X affiliates",
    text: `Hi {{Name}},\n\nQuick nudge: 15% on every sale you refer, no cap. Many partners promote the book and app to their audience. Reply and we will get you set up.${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">15% on every sale you refer, no cap. Many partners promote the book and app to their audience.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get set up</a></p>`
    ),
  },
  "p48x-affiliate-sellers-followup-3": {
    subject: "Last note - P48X affiliate (15%)",
    text: `Hi {{Name}},\n\nLast note: if you ever want to partner and earn 15% on P48X sales, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#b45309",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to partner and earn 15% on P48X sales, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#b45309;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "healing-herbals-smoke-shop-followup-1": {
    subject: "Re: Healing Herbals wholesale - Kava, Blue Lotus, Kanna, Kratom (following up)",
    text: `Hi {{Name}},\n\nFollowing up - we would still love to partner with your smoke shop: wholesale Kava, Blue Lotus, Kanna, Kratom (vapes, shots, tinctures). Reply and we will send the 2025 wholesale sheet.${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up - we would still love to partner with your smoke shop: <strong>wholesale Kava, Blue Lotus, Kanna, Kratom</strong>.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Request wholesale sheet</a></p>`
    ),
  },
  "healing-herbals-smoke-shop-followup-2": {
    subject: "One more reason to stock Healing Herbals",
    text: `Hi {{Name}},\n\nQuick nudge: quality botanicals, clear suggested retail, and product that moves. Reply and we will send the wholesale overview and minimums.${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Quality botanicals, clear suggested retail, and product that moves.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the overview</a></p>`
    ),
  },
  "healing-herbals-smoke-shop-followup-3": {
    subject: "Last note - Healing Herbals wholesale",
    text: `Hi {{Name}},\n\nLast note: if you ever want to stock Healing Herbals (Kava, Blue Lotus, Kanna, Kratom), we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to stock Healing Herbals, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
    ),
  },
  "healing-herbals-individual-followup-1": {
    subject: "Re: Healing Herbals - Kava & Blue Lotus (following up)",
    text: `Hi {{Name}},\n\nFollowing up - we would still love to share our Kava and Blue Lotus options (vapes, shots, tinctures) for relaxation. Reply and we will send the product link.${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Following up - we would still love to share our <strong>Kava and Blue Lotus</strong> options (vapes, shots, tinctures) for relaxation.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the link</a></p>`
    ),
  },
  "healing-herbals-individual-followup-2": {
    subject: "One more reason to try Healing Herbals",
    text: `Hi {{Name}},\n\nQuick nudge: Kava and Blue Lotus in forms that fit your routine - vapes, shots, tinctures. Many customers say it helps them wind down. Reply and we will send the details.${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">Kava and Blue Lotus in forms that fit your routine. Many customers say it helps them wind down.</p><p style="margin:0 0 20px;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;">Get the details</a></p>`
    ),
  },
  "healing-herbals-individual-followup-3": {
    subject: "Last note - Healing Herbals (Kava & Blue Lotus)",
    text: `Hi {{Name}},\n\nLast note: if you ever want to try our Kava or Blue Lotus products, we are here.${SOFT_CLOSE}${CONTACT_FOOTER}`,
    html: box(
      "#166534",
      `<p style="margin:0 0 18px;font-size:15px;line-height:1.65;">If you ever want to try our Kava or Blue Lotus products, we are here.</p>${SOFT_CLOSE_HTML}<p style="margin:20px 0 0;"><a href="mailto:coralcrowntechnologies@gmail.com" style="display:inline-block;background:#166534;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;">Reach out anytime</a></p>`
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
