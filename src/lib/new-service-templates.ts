/**
 * Templates for the four NEW SmoothSales services added April 2026:
 *   1. apartments   – audience: individual / realtor
 *   2. corgi-care   – audience: hair-maintenance / teeth-cleaning / military-bases
 *   3. luxury-resource – audience: fareharbor / direct
 *   4. rap-central  – audience: rappers
 *
 * Persuasion principles applied (Lieberman + Boothman):
 *   - Subject lines stay short, lowercase-ish, curiosity / no-oriented questions
 *   - Initial body opens with a "really useful attitude" + sensory mirror
 *   - Follow-ups apply Law of Association (positive resource), Reciprocity (free useful info),
 *     No-oriented questions, and Confirm-Decision asks
 *
 * Each audience exposes:
 *   {audience}                       – initial
 *   {audience}-followup-1 .. -4      – follow-ups (Lieberman ladder)
 */

const NS_FOOTER_TEXT = `\n\nWe're here when you're ready.\nCoral Crown Solutions · coralcrowntechnologies@gmail.com · (808) 393-0153\nReply or call – we're happy to help.`;
const NS_FOOTER_HTML = `<p style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(0,0,0,0.08);color:#64748b;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;opacity:0.95;">We're here when you're ready</p><p style="margin:6px 0 0;font-size:14px;color:#334155;">Coral Crown Solutions · <a href="mailto:coralcrowntechnologies@gmail.com" style="color:#0ea5e9;text-decoration:none;font-weight:600;">coralcrowntechnologies@gmail.com</a> · (808) 393-0153</p><p style="margin:8px 0 0;font-size:12px;color:#64748b;">Reply or call – we're happy to help.</p>`;

// Apartment footer — we write these as a couple (not a company). Different
// reply address and label on purpose so landlords/realtors see a real
// household instead of a business entity.
const APT_FOOTER_TEXT = `\n\nA Hawaii couple looking for a spot to call home.\nEric & Ashley Schaefer · elionreigns@gmail.com · (808) 393-0153\nReply or call – easiest, fastest, no middleman.`;
const APT_FOOTER_HTML = `<p style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(0,0,0,0.08);color:#64748b;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;opacity:0.95;">A Hawaii couple looking for a spot to call home</p><p style="margin:6px 0 0;font-size:14px;color:#334155;"><strong>Eric &amp; Ashley Schaefer</strong> · <a href="mailto:elionreigns@gmail.com" style="color:#0d9488;text-decoration:none;font-weight:600;">elionreigns@gmail.com</a> · (808) 393-0153</p><p style="margin:8px 0 0;font-size:12px;color:#64748b;">Reply or call – easiest, fastest, no middleman.</p>`;

const CORGI_FOOTER_TEXT = `\n\nA Hawaii couple, our 13-year-old corgi Stella, and her 2-year-old cat sister Mittens.\nEric & Ashley Schaefer · elionreigns@gmail.com · (808) 393-0153\nReply or call – we're easy to reach.`;
const CORGI_FOOTER_HTML = `<p style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(0,0,0,0.08);color:#64748b;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;opacity:0.95;">Stella's family</p><p style="margin:6px 0 0;font-size:14px;color:#334155;"><strong>Eric &amp; Ashley Schaefer</strong> · <a href="mailto:elionreigns@gmail.com" style="color:#0e7490;text-decoration:none;font-weight:600;">elionreigns@gmail.com</a> · (808) 393-0153</p><p style="margin:8px 0 0;font-size:12px;color:#64748b;">Reply or call – we're easy to reach.</p>`;

const SOFT_CLOSE_TEXT =
  " Thanks for your time. If this ever becomes a fit, we would love to hear from you. Take care.";
const SOFT_CLOSE_HTML =
  `<p style="margin:24px 0 0;font-size:14px;color:#475569;">Thanks for your time. If this ever becomes a fit, we would love to hear from you. Take care.</p>`;

/** Card wrapper used by every new template. `accent` is a hex color for header + buttons. */
function card(accent: string, accentSoft: string, kicker: string, headline: string, sub: string, body: string, footerHtml: string = NS_FOOTER_HTML): string {
  return `<div style="font-family:'Segoe UI',system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border:1px solid ${accentSoft};border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px ${accentSoft},0 10px 28px -8px rgba(0,0,0,0.08);">
<div style="background:linear-gradient(145deg,${accent} 0%,${accent} 60%,${accent} 100%);color:#fff;padding:30px 26px;text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;opacity:0.95;">${kicker}</p>
<h1 style="margin:0;font-size:24px;font-weight:800;letter-spacing:-0.02em;line-height:1.22;">${headline}</h1>
<p style="margin:14px 0 0;font-size:14px;line-height:1.5;opacity:0.95;">${sub}</p>
</div>
<div style="padding:30px 26px;color:#1e293b;">
<p style="margin:0 0 18px;font-size:15px;font-weight:600;color:#0f172a;">Hi {{Name}},</p>
${body}
${footerHtml}
</div>
</div>`;
}

/** Button helper. */
function btn(href: string, label: string, accent: string): string {
  return `<p style="margin:18px 0 6px;"><a href="${href}" style="display:inline-block;background:${accent};color:#fff;padding:13px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:14px;">${label}</a></p>`;
}

/** Followup card – simpler box, with accent. */
function fbox(accent: string, body: string, footerHtml: string = NS_FOOTER_HTML): string {
  return `<div style="font-family:'Segoe UI',system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border:2px solid ${accent};border-radius:20px;padding:26px;color:#1e293b;">
<p style="margin:0 0 16px;font-size:15px;font-weight:600;">Hi {{Name}},</p>
${body}
${footerHtml}
</div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const HOUSING_NEEDS_TEXT =
  "We are an expecting couple (wife is pregnant, baby due summer 2026) with two registered emotional support animals: Stella, our 13-year-old Pembroke corgi, and Mittens, our 2-year-old cat. Both are calm, clean, fully vetted, and home all day with us (we both work from home). We are looking in East Honolulu (Hawaii Kai, Aina Haina, Kahala, or Niu Valley) for a 2BR/2BA at $1,900 to $2,400 per month, with a pool and gym, in-unit or building laundry, covered parking, and a ground floor or elevator access (because of the pregnancy). Twelve-month lease, move-in within 30 to 45 days, excellent rental history, full deposit plus first month at signing.";

// Family Feud credibility block — our family (the Schaefers) won 5 shows and
// the grand prize ($67,000+ cash plus a new car) over Oct 27–Nov 3, 2016. This
// is public record and a massive trust signal for landlords who get ignored or
// ghosted constantly. We use a hosted Vercel URL for the photo so the image
// auto-deploys with the servicebot app and never needs an FTP upload.
const FAMILY_FEUD_IMG_URL =
  "https://smoothsales-app.vercel.app/assets/team/eric-ashley-family-feud-2016.png";

const FAMILY_FEUD_TEXT =
  "A small thing that helps people trust us quickly: my family (the Schaefers) won Family Feud in 2016 — five shows in a row, the grand prize, $67,000+ cash and a brand-new car, filmed October 27 through November 3, 2016. It is easy to look up. I mention it not to brag, but because when we sign something (a lease, a loan, a handshake), we honor it — that is how we were raised and how we played on TV. We will be the same kind of tenant.";

const FAMILY_FEUD_HTML = `<div style="background:#fffbeb;border:1px solid rgba(217,119,6,0.35);border-radius:16px;padding:18px 20px;margin:20px 0;">
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#b45309;">A small trust-builder</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
<tr>
<td style="vertical-align:top;padding-right:14px;width:140px;">
<img src="${FAMILY_FEUD_IMG_URL}" alt="The Schaefer family — Family Feud grand-prize winners, Oct 27–Nov 3, 2016" width="140" style="display:block;border-radius:12px;border:1px solid rgba(217,119,6,0.25);max-width:140px;height:auto;" />
</td>
<td style="vertical-align:top;font-size:14px;line-height:1.6;color:#78350f;">
<p style="margin:0 0 8px;">My family (the <strong>Schaefers</strong>) won <strong>Family Feud</strong> in 2016 — <strong>five shows in a row</strong>, grand prize, $67,000+ cash plus a brand-new car. Filmed <strong>Oct 27–Nov 3, 2016</strong>, easy to look up.</p>
<p style="margin:0;">I mention it not to brag, but because it is a public, checkable signal of who we are: when we sign something (a lease, a handshake), we honor it. We will be the same kind of tenant.</p>
</td>
</tr>
</table>
</div>`;

const FAMILY_FEUD_COMPACT_HTML = `<div style="background:#fffbeb;border:1px solid rgba(217,119,6,0.35);border-radius:14px;padding:14px 16px;margin:16px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
<tr>
<td style="vertical-align:middle;padding-right:12px;width:92px;">
<img src="${FAMILY_FEUD_IMG_URL}" alt="Schaefer family — Family Feud 2016 grand-prize winners" width="92" style="display:block;border-radius:10px;border:1px solid rgba(217,119,6,0.25);max-width:92px;height:auto;" />
</td>
<td style="vertical-align:middle;font-size:13px;line-height:1.55;color:#78350f;">
<p style="margin:0;"><strong>Quick context on trust:</strong> my family won <strong>Family Feud</strong> in 2016 — 5 shows, grand prize, $67k+ and a car (Oct 27–Nov 3, 2016, public record). We honor what we sign.</p>
</td>
</tr>
</table>
</div>`;

// Realtor ("principal") variant of the housing-needs block — replaces the
// "we both work from home" parenthetical with ministry / church lifestyle
// credibility. Realtors pre-qualify tenants on lifestyle + reliability, so
// this surfaces the actual signal earlier. Individual-landlord emails keep
// the WFH framing (some landlords prefer less personal info up front).
const HOUSING_NEEDS_REALTOR_TEXT =
  "We are an expecting couple (wife is pregnant, baby due summer 2026) with two registered emotional support animals: Stella, our 13-year-old Pembroke corgi, and Mittens, our 2-year-old cat. Both are calm, clean, fully vetted, and home with us most of the day. Our work is ministry: we serve with the Christian church in East Honolulu, are active in weekly Bible studies, and in worship and service on Sundays and throughout the week. That rhythm keeps us home most evenings and weekends, and it is the backbone of how we honor our commitments. We are looking in East Honolulu (Hawaii Kai, Aina Haina, Kahala, or Niu Valley) for a 2BR/2BA at $1,900 to $2,400 per month, with a pool and gym, in-unit or building laundry, covered parking, and a ground floor or elevator access (because of the pregnancy). Twelve-month lease, move-in within 30 to 45 days, excellent rental history, full deposit plus first month at signing.";

const HOUSING_NEEDS_REALTOR_HTML =
  `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">We are an <strong>expecting couple</strong> (wife is pregnant, baby due summer 2026) with <strong>two registered emotional support animals</strong>: <strong>Stella</strong>, our 13-year-old Pembroke corgi, and <strong>Mittens</strong>, our 2-year-old cat. Both are calm, clean, fully vetted, and home with us most of the day.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.7;"><strong>Our work is ministry.</strong> We serve with the Christian church in East Honolulu, are active in weekly <strong>Bible studies</strong>, and in worship and service on Sundays and throughout the week. That rhythm keeps us home most evenings and weekends, and it is the backbone of how we honor our commitments — lease, payments, and caring for the place we live in.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">We are looking in <strong>East Honolulu (Hawaii Kai, Aina Haina, Kahala, or Niu Valley)</strong> for a <strong>2BR/2BA at $1,900 to $2,400 per month</strong>, with a <strong>pool and gym</strong>, in-unit or building laundry, covered parking, and <strong>ground floor or elevator access</strong> (because of the pregnancy). ESA paperwork on file and ready to share.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;"><strong>About us as tenants:</strong> 12-month lease, move-in within 30–45 days, excellent rental history (references on request), full deposit + first month at signing, and we will take great care of the unit — we have lived in our current place 4+ years.</p>`;

const HOUSING_NEEDS_HTML =
  `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">We are an <strong>expecting couple</strong> (wife is pregnant, baby due summer 2026) with <strong>two registered emotional support animals</strong>: <strong>Stella</strong>, our 13-year-old Pembroke corgi, and <strong>Mittens</strong>, our 2-year-old cat. Both are calm, clean, fully vetted, and home with us all day (we both work from home). We are looking in <strong>East Honolulu (Hawaii Kai, Aina Haina, Kahala, or Niu Valley)</strong> for a <strong>2BR/2BA at $1,900 to $2,400 per month</strong>, with a <strong>pool and gym</strong>, in-unit or building laundry, covered parking, and <strong>ground floor or elevator access</strong> (because of the pregnancy). ESA paperwork on file and ready to share.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;"><strong>About us as tenants:</strong> 12-month lease, move-in within 30–45 days, excellent rental history (references on request), full deposit + first month at signing, and we will take great care of the unit – we have lived in our current place 4+ years.</p>`;

const STELLA_BLURB_TEXT =
  "Stella is our 13-year-old Pembroke corgi – sweet, social, and a true family member. She has a classic double coat. In the past, a groomer convinced us to shave her, and we now know that was a mistake (it damages the protective guard hairs and can grow back patchy). We are looking for someone who understands double coats and will deshed + blow out + lightly tidy – never shave.";

const STELLA_BLURB_HTML =
  `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;"><strong>Stella</strong> is our <strong>13-year-old Pembroke corgi</strong> – sweet, social, and a true family member. She has a classic <strong>double coat</strong>. In the past a groomer talked us into shaving her, and we now know that was a mistake (it damages the protective guard hairs and can grow back patchy or coarse).</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">What we want: a full deshedding bath, a proper <strong>high-velocity blowout</strong>, undercoat rake / Furminator pass, and a light tidy of feet, sanitary area, and skirt. <strong>Never shave the body</strong>. Hypoallergenic / oatmeal shampoo with a thorough rinse if you have it.</p>`;

const LUXURY_BLURB_TEXT =
  "Hawaii Luxury Resource is a curated booking and concierge layer for Hawaii's top tour and activity operators. We feature your business on our site, run paid traffic to your booking page, and send qualified guests directly to you — at zero cost to you up front. We carry 200+ Oahu/Maui/Big Island/Kauai experiences (FareHarbor + Peek + private operators) and we work two ways: as your FareHarbor affiliate (you add us in the FareHarbor dashboard, default 10% affiliate commission, reviewed annually) OR through a direct commission contract (10% on confirmed and completed bookings, NET-15 settlement).";

const LUXURY_BLURB_HTML =
  `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;"><strong>Hawaii Luxury Resource</strong> is a curated booking + concierge layer for Hawaii's top tour and activity operators. We feature your business on our site, run paid traffic to your booking page, and send <strong>qualified guests</strong> directly to you — at <strong>zero cost up front</strong>. We carry 200+ Oahu / Maui / Big Island / Kauai experiences and we work two ways: <strong>as your FareHarbor affiliate</strong> (default 10% affiliate commission, reviewed annually) <strong>or via a direct commission contract</strong> (10% on confirmed + completed bookings, NET-15).</p>`;

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type NewServiceTemplateId =
  // Apartments
  | "apartments-individual"
  | "apartments-individual-followup-1"
  | "apartments-individual-followup-2"
  | "apartments-individual-followup-3"
  | "apartments-individual-followup-4"
  | "apartments-realtor"
  | "apartments-realtor-followup-1"
  | "apartments-realtor-followup-2"
  | "apartments-realtor-followup-3"
  | "apartments-realtor-followup-4"
  // Corgi Care
  | "corgi-care-hair"
  | "corgi-care-hair-followup-1"
  | "corgi-care-hair-followup-2"
  | "corgi-care-hair-followup-3"
  | "corgi-care-hair-followup-4"
  | "corgi-care-teeth"
  | "corgi-care-teeth-followup-1"
  | "corgi-care-teeth-followup-2"
  | "corgi-care-teeth-followup-3"
  | "corgi-care-teeth-followup-4"
  | "corgi-care-teeth-book-me"
  | "corgi-care-hair-book-me"
  | "corgi-care-military"
  | "corgi-care-military-followup-1"
  | "corgi-care-military-followup-2"
  | "corgi-care-military-followup-3"
  | "corgi-care-military-followup-4"
  // Luxury Resource
  | "luxury-resource-fareharbor"
  | "luxury-resource-fareharbor-followup-1"
  | "luxury-resource-fareharbor-followup-2"
  | "luxury-resource-fareharbor-followup-3"
  | "luxury-resource-fareharbor-followup-4"
  | "luxury-resource-direct"
  | "luxury-resource-direct-followup-1"
  | "luxury-resource-direct-followup-2"
  | "luxury-resource-direct-followup-3"
  | "luxury-resource-direct-followup-4"
  // Rap Central
  | "rap-central-rappers"
  | "rap-central-rappers-followup-1"
  | "rap-central-rappers-followup-2"
  | "rap-central-rappers-followup-3"
  | "rap-central-rappers-followup-4"
  | "rap-central-managers"
  | "rap-central-managers-followup-1"
  | "rap-central-managers-followup-2"
  | "rap-central-managers-followup-3"
  | "rap-central-managers-followup-4"
  | "rap-central-promoters"
  | "rap-central-promoters-followup-1"
  | "rap-central-promoters-followup-2"
  | "rap-central-promoters-followup-3"
  | "rap-central-promoters-followup-4"
  // Corgi Care sponsor (Stella brand pitch)
  | "corgi-care-sponsor"
  | "corgi-care-sponsor-followup-1"
  | "corgi-care-sponsor-followup-2"
  | "corgi-care-sponsor-followup-3"
  | "corgi-care-sponsor-followup-4";

export type ApartmentsSub = "" | "individual" | "realtor";
export type CorgiCareSub = "" | "hair" | "teeth" | "military" | "sponsor";
export type LuxuryResourceSub = "" | "fareharbor" | "direct";
export type RapCentralSub = "" | "rappers" | "managers" | "promoters";

// ─────────────────────────────────────────────────────────────────────────────
// APARTMENTS – INDIVIDUAL (Craigslist / FB Marketplace / FSBO landlords)
// ─────────────────────────────────────────────────────────────────────────────
const APT_INDIVIDUAL = {
  subject: "Couple Searching for a 2BR in East Honolulu (Pool and Gym Priorities)",
  text: `Hi {{Name}},

I am writing as a real tenant (not an agent) who saw your listing and wanted to reach out personally before someone else did. My wife Ashley and I are looking for a place for our growing family, and yours looks like it could genuinely be the one.

${HOUSING_NEEDS_TEXT}

${FAMILY_FEUD_TEXT}

If your unit is still available and matches, I would love to set up a viewing this week. We can come during whatever time works best for you — evenings and weekends are fine. References, proof of income, and a deposit are ready to go.

If it is no longer available — no worries at all — I would just appreciate knowing so I can stop checking. And if you happen to know other landlords in the same building or neighborhood with similar units, I would be grateful for the introduction.

Thank you for your time, {{Name}}. We are real, ready, and respectful, and we will treat the place like our own.

Eric & Ashley
(808) 393-0153
${APT_FOOTER_TEXT}`,
  html: card(
    "#0d9488",
    "rgba(13,148,136,0.18)",
    "Tenant inquiry — East Honolulu",
    "Is your unit still available for our growing family?",
    "Quiet, prepared, paid-in-full couple ready to view this week.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">I am writing as a <strong>real tenant</strong> (not an agent) who saw your listing and wanted to reach out personally before someone else did. My wife Ashley and I are looking for a place for our growing family, and yours looks like it could genuinely be the one.</p>
${HOUSING_NEEDS_HTML}
${FAMILY_FEUD_HTML}
<div style="background:#ecfdf5;border:1px solid rgba(13,148,136,0.25);border-radius:14px;padding:16px 18px;margin:18px 0;">
<p style="margin:0;font-size:14px;color:#065f46;line-height:1.6;"><strong>Next step:</strong> If your unit is still available and matches, I would love to set up a viewing this week. We can come during any time that works for you – evenings and weekends fine. <strong>References, proof of income, and full deposit are ready.</strong></p>
</div>
<p style="margin:0 0 12px;font-size:14px;line-height:1.7;color:#334155;">If it is no longer available – no worries – just a quick "taken" reply helps me stop checking. And if you happen to know other owners in the same building or neighborhood with similar units, an introduction would mean a lot.</p>
<p style="margin:0 0 6px;font-size:14px;font-weight:700;">Thank you, {{Name}}.</p>
<p style="margin:0 0 0;font-size:14px;color:#334155;">Eric &amp; Ashley · (808) 393-0153 · elionreigns@gmail.com</p>
${btn("tel:8083930153", "Call / text Eric – (808) 393-0153", "#0d9488")}`,
    APT_FOOTER_HTML,
  ),
};

const APT_INDIVIDUAL_FU1 = {
  subject: "Checking In on Your East Honolulu Listing",
  text: `Hi {{Name}},

Quick follow-up on my message about your East Honolulu rental. I do not want to clutter your inbox – just want to make sure my first email did not get buried.

If the unit is still open, we are still very interested and can view this week. If it is gone, no problem – just one short reply ("gone" / "not for you" / etc.) and I will stop reaching out.

If there is anything we did not address (pet policy, lease length, deposit, anything) – please ask. We would rather talk it through than have you skip past us.

Eric & Ashley – (808) 393-0153${APT_FOOTER_TEXT}`,
  html: fbox(
    "#0d9488",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Quick follow-up on my message about your East Honolulu rental. I do not want to clutter your inbox – just want to make sure my first note did not get buried.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If the unit is still open, we are still very interested and can view <strong>this week</strong>. If it is gone, no problem – a one-word reply ("gone") and I will stop reaching out.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">Anything we did not address (pet policy, lease length, deposit) – please ask. We would rather talk it through than have you skip past us.</p>
${btn("tel:8083930153", "Call / text – (808) 393-0153", "#0d9488")}`,
    APT_FOOTER_HTML,
  ),
};

const APT_INDIVIDUAL_FU2 = {
  subject: "Still Looking for the Right Tenant for Your Unit?",
  text: `Hi {{Name}},

I do not want to be a pest – this is the second nudge. I asked above on purpose: most landlords I have talked to say the hardest part of renting out their place is finding someone they actually trust.

That is exactly what we are trying to be. A quiet, expecting couple with two registered ESAs (Stella, our 13-year-old Pembroke corgi, and Mittens, our 2-year-old cat), both of us working from home (so the place gets cared for, not abandoned), full deposit ready, references ready.

${FAMILY_FEUD_TEXT}

If your unit is taken, no problem. If it is still open and the issue is the ESAs, the timing, or anything else, please just say so. We can usually work around it.

Eric & Ashley – (808) 393-0153${APT_FOOTER_TEXT}`,
  html: fbox(
    "#0d9488",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">I do not want to be a pest – this is the second nudge. I asked above on purpose: most landlords I have talked to say the hardest part of renting out their place is finding someone they actually <strong>trust</strong>.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">That is what we are trying to be. A quiet, expecting couple with two registered ESAs (<strong>Stella</strong>, our 13-year-old Pembroke corgi, and <strong>Mittens</strong>, our 2-year-old cat), both of us working from home (so the place gets cared for, not abandoned), full deposit ready, references ready.</p>
${FAMILY_FEUD_COMPACT_HTML}
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">If it is taken, no problem. If it is still open and the issue is the ESAs, the timing, or anything else, please just say so. We can usually work around it.</p>
${btn("tel:8083930153", "Talk it through – (808) 393-0153", "#0d9488")}`,
    APT_FOOTER_HTML,
  ),
};

const APT_INDIVIDUAL_FU3 = {
  subject: "A Small Thank You and an Easy Win for Your Property",
  text: `Hi {{Name}},

Thanks for hosting your listing – it is genuinely useful to renters like us. I will not keep emailing forever; this is the second-to-last note.

One small offer: if you ever rent out this or any other Hawaii unit and want a clean, paying tenant on file, we can be that. Email + phone below – no pressure, no expiration.

If you happen to know any other owners in East Honolulu with similar units – an intro is the best gift you could give us right now, and we are happy to return the favor (referrals, fair Yelp/Google review, whatever helps).

Eric & Ashley – (808) 393-0153 · elionreigns@gmail.com${APT_FOOTER_TEXT}`,
  html: fbox(
    "#0d9488",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Thanks for hosting your listing – it is genuinely useful to renters like us. I will not keep emailing forever; this is the second-to-last note.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;"><strong>One small offer:</strong> if you ever rent out this or any other Hawaii unit and want a clean, paying tenant on file, we can be that. No pressure, no expiration.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">If you know any other owners in East Honolulu with similar units, an introduction would mean a lot – and we are happy to return the favor (fair Yelp/Google review, referrals, whatever helps).</p>
${btn("mailto:elionreigns@gmail.com?subject=Introducing%20a%20landlord", "Send an introduction", "#0d9488")}`,
    APT_FOOTER_HTML,
  ),
};

const APT_INDIVIDUAL_FU4 = {
  subject: "Final Note on Your East Honolulu Listing and Wishing You Well",
  text: `Hi {{Name}},

Last note. We have moved on to actively touring other places, but I wanted to close the loop properly rather than just disappear.

If your unit ever becomes available again or if your timing changes, please reach out – my number and email are below and they will not change. We are the kind of tenants you wish you had: pay on time, quiet, take care of the place.

Wishing you well with your rental, {{Name}}.${SOFT_CLOSE_TEXT}

Eric & Ashley – (808) 393-0153${APT_FOOTER_TEXT}`,
  html: fbox(
    "#94a3b8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Last note. We have moved on to actively touring other places, but I wanted to close the loop rather than just disappear.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If your unit becomes available again or your timing changes, please reach out – my number and email are below and they will not change. We are the kind of tenants you wish you had: pay on time, quiet, take care of the place.</p>
${SOFT_CLOSE_HTML}
<p style="margin:14px 0 0;font-size:14px;color:#334155;">Eric &amp; Ashley – (808) 393-0153</p>`,
    APT_FOOTER_HTML,
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// APARTMENTS – REALTOR / PROPERTY MANAGER
// ─────────────────────────────────────────────────────────────────────────────
const APT_REALTOR = {
  subject: "East Honolulu 2BR Search — Qualified Couple Ready to Apply Same Day",
  text: `Hi {{Name}},

I am writing as a principal (representing only my wife and myself, no outside agent) because your firm is well known for East Honolulu rentals and I would like to be on your active prospects list. The search we are running is narrow on purpose so it is easy for you to filter.

${HOUSING_NEEDS_REALTOR_TEXT}

${FAMILY_FEUD_TEXT}

What we are asking from your office:
1. Match us against your current East Honolulu vacancies (Hawaii Kai, Aina Haina, Kahala, Niu Valley, Kuliouou, Portlock).
2. Add us to any coming-soon or off-market notice list you maintain — we are happy to pre-tour and pre-apply.
3. If we are not a fit for your firm, an introduction to a colleague who handles this profile would mean a lot.

We have a one-page tenant resume (employment, income, references, ESA letters and vet records for Stella and Mittens, cosigners on standby) — happy to send the moment you ask. Application fees, deposits, first month — all standard, paid same day at signing.

Best way to reach me is direct: (808) 393-0153 or this email. Thank you, {{Name}} — looking forward to working with your office.

Eric & Ashley Schaefer${APT_FOOTER_TEXT}`,
  html: card(
    "#1d4ed8",
    "rgba(29,78,216,0.18)",
    "Qualified renter intro — East Honolulu",
    "Add us to your prospects list",
    "Quiet, paid-in-full, ready to apply same day.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">I am writing as a <strong>principal</strong> (representing only my wife and myself, no outside agent) because your firm is well known for East Honolulu rentals and I would like to be on your active prospects list. The search we are running is narrow on purpose so it is easy for you to filter.</p>
${HOUSING_NEEDS_REALTOR_HTML}
${FAMILY_FEUD_HTML}
<p style="margin:18px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.14em;color:#1d4ed8;text-transform:uppercase;">What we are asking</p>
<ol style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.75;">
<li>Match us against your current East Honolulu vacancies (Hawaii Kai, Aina Haina, Kahala, Niu Valley, Kuliouou, Portlock).</li>
<li>Add us to any <strong>"coming-soon" / off-market notice list</strong> you keep – we will pre-tour and pre-apply.</li>
<li>If we are not a fit for your firm, an introduction to a colleague who handles this profile would mean a lot.</li>
</ol>
<div style="background:#eff6ff;border:1px solid rgba(29,78,216,0.25);border-radius:14px;padding:16px 18px;margin:18px 0;">
<p style="margin:0;font-size:14px;color:#1e3a8a;line-height:1.6;"><strong>Tenant packet ready on request:</strong> employment, income, references, ESA letters and vet records for <strong>Stella</strong> (13-year-old Pembroke corgi) and <strong>Mittens</strong> (2-year-old cat), cosigners on standby. Application fees, deposits, first month — paid same day at signing.</p>
</div>
<p style="margin:0 0 14px;font-size:14px;color:#334155;">Direct line: (808) 393-0153 · elionreigns@gmail.com</p>
<p style="margin:0;font-size:14px;font-weight:600;">Thank you, {{Name}} – looking forward to working with you.</p>
${btn("mailto:elionreigns@gmail.com?subject=Tenant%20packet%20request", "Request our tenant packet", "#1d4ed8")}`,
    APT_FOOTER_HTML,
  ),
};

const APT_REALTOR_FU1 = {
  subject: "Ready to View East Honolulu Units This Week",
  text: `Hi {{Name}},

Quick check-in. We are actively touring this week and into next, so if any East Honolulu units fitting our spec (2BR at $1,900 to $2,400 per month, pool and gym, ESA-friendly) hit your active list since my first email, please send them over.

We can move on a unit within 24 hours of seeing it – tenant packet ready, deposit ready, lease ready to sign.

If nothing new yet – also fine. Just a quick "still nothing" reply lets me prioritize who to chase.

Eric – (808) 393-0153${APT_FOOTER_TEXT}`,
  html: fbox(
    "#1d4ed8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Quick check-in. We are actively touring this week and into next, so if any East Honolulu units fitting our spec (2BR at $1,900 to $2,400 per month, pool and gym, ESA-friendly) hit your active list since my first email, please send them over.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;"><strong>We can move on a unit within 24 hours</strong> of seeing it – tenant packet ready, deposit ready, lease ready to sign.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">If nothing new yet – also fine. Just a quick "still nothing" reply lets me prioritize.</p>
${btn("mailto:elionreigns@gmail.com?subject=Updated%20East%20Honolulu%20list", "Send your updated list", "#1d4ed8")}`,
    APT_FOOTER_HTML,
  ),
};

const APT_REALTOR_FU2 = {
  subject: "Should We Work With Another Realtor for Our East Honolulu Search?",
  text: `Hi {{Name}},

Honest question – not a complaint. If East Honolulu 2BRs are not your firm's focus right now, I would rather you tell me so I can route my search through someone else.

We are a strong, narrow lead (qualified income, full deposit, narrow zip codes) and the time to move is now (lease signed within 30 days). If your firm's pipeline does not have units in that range, an introduction to whoever does would actually help us both.

${FAMILY_FEUD_TEXT}

Or, if it IS your focus and you just have not seen the right inventory yet – say the word and I will keep checking in.

Eric – (808) 393-0153${APT_FOOTER_TEXT}`,
  html: fbox(
    "#1d4ed8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Honest question – not a complaint. If East Honolulu 2BRs are not your firm's focus right now, I would rather you tell me so I can route my search through someone else.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">We are a <strong>strong, narrow lead</strong> (qualified income, full deposit, narrow zip codes) and the time to move is <strong>now</strong> (lease signed within 30 days). If your pipeline does not have units in that range, an introduction to whoever does would actually help us both.</p>
${FAMILY_FEUD_COMPACT_HTML}
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">Or if it IS your focus and you just have not seen the right inventory yet – say the word and I will keep checking in.</p>
${btn("tel:8083930153", "Call Eric – (808) 393-0153", "#1d4ed8")}`,
    APT_FOOTER_HTML,
  ),
};

const APT_REALTOR_FU3 = {
  subject: "Complete Tenant Packet and a Small Reciprocal Offer for Your Time",
  text: `Hi {{Name}},

Two things:

1. Attached/below is our one-page tenant resume so you have it on file — feel free to forward to colleagues. It includes income, references, ESA letters and vet records for Stella and Mittens, and what we are looking for.

2. A small reciprocal offer: when we sign, we will drop a fair, public 5-star review of your office on Google or Yelp (we have a 10-year Hawaii network and actually move the needle there), and we will send every friend or family member moving to Oahu your way first. No ask, no strings.

Either way, thank you for considering us. The narrow box (East Honolulu, 2BR, $1.9–$2.4k, pool + gym, pets) is hard to fill – we will be the easy yes when it does.

Eric – (808) 393-0153 · elionreigns@gmail.com${APT_FOOTER_TEXT}`,
  html: fbox(
    "#1d4ed8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Two things:</p>
<p style="margin:0 0 12px;font-size:15px;line-height:1.65;"><strong>1. Tenant resume ready on request</strong> — one page, income, references, ESA letters and vet records for Stella and Mittens, and what we are looking for. Reply and I will send.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;"><strong>2. A small reciprocal offer</strong> – when we sign, we will drop a fair, public 5-star review of your office on Google or Yelp, and we will send every friend or family member moving to Oahu your way first. We have a 10-year Hawaii network that actually moves the needle. No ask, no strings.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">Either way, thank you for considering us. The narrow box is hard to fill – we will be the easy yes when it does.</p>
${btn("mailto:elionreigns@gmail.com?subject=Tenant%20resume", "Request tenant resume", "#1d4ed8")}`,
    APT_FOOTER_HTML,
  ),
};

const APT_REALTOR_FU4 = {
  subject: "Final Note to Your Office and We Will Not Chase Further",
  text: `Hi {{Name}},

Last note from me. We are likely going to land somewhere within the next 2–3 weeks, so I will stop chasing after this.

If anything that fits the box (East Honolulu, 2BR, $1.9–$2.4k, pool + gym, pets) lands on your desk before then, my line is open. After that, please keep our info on file – we know plenty of people who rent in Hawaii and we are happy to refer good agents we have worked with.

Wishing you a great month, {{Name}}.${SOFT_CLOSE_TEXT}

Eric – (808) 393-0153${APT_FOOTER_TEXT}`,
  html: fbox(
    "#94a3b8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Last note. We are likely landing somewhere within the next 2–3 weeks, so I will stop chasing after this.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If anything fitting the box (East Honolulu, 2BR, $1.9–$2.4k, pool + gym, pets) lands on your desk before then, my line is open. After that, please keep us on file – we know plenty of people who rent in Hawaii and we are happy to refer good agents.</p>
${SOFT_CLOSE_HTML}
<p style="margin:14px 0 0;font-size:14px;color:#334155;">Eric – (808) 393-0153</p>`,
    APT_FOOTER_HTML,
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// CORGI CARE – HAIR (groomers / mobile groomers, Oahu)
// ─────────────────────────────────────────────────────────────────────────────
const CORGI_HAIR = {
  subject: "Grooming Quote for Our 13 Year Old Double Coat Pembroke Corgi (Deshed and Blowout, No Shaving)",
  text: `Hi {{Name}},

I would love to book a grooming appointment for our 13-year-old corgi, Stella.

${STELLA_BLURB_TEXT}

What I am hoping you can quote:
- Full deshedding bath (hypoallergenic / oatmeal shampoo if available)
- High-velocity blowout (the air-pressure dryer that pulls undercoat out)
- Undercoat rake / Furminator pass
- Light tidy of feet, sanitary area, and skirt
- Nail trim + grind
- Ear clean (gentle – she is older)

What I am NOT asking for: shaving the body, kennel-style "puppy cut," or anything that touches the guard hairs.

Please let me know:
1. Your earliest availability (week of / day of week / time of day).
2. Total all-in price (no surprise add-ons).
3. Whether you are mobile (you come to Hawaii Kai 96825) or salon (we drive to you).
4. Any senior-dog accommodations you offer (frequent rest breaks, low-stress handling).

Thank you so much, {{Name}} – looking forward to your reply.

Eric – (808) 393-0153${CORGI_FOOTER_TEXT}`,
  html: card(
    "#b45309",
    "rgba(180,83,9,0.18)",
    "Grooming appointment request – senior corgi",
    "Stella, 13-year-old Pembroke corgi",
    "Deshed + high-velocity blowout · no shaving · gentle handling.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">I would love to book a grooming appointment for our 13-year-old corgi, Stella.</p>
${STELLA_BLURB_HTML}
<p style="margin:18px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.14em;color:#b45309;text-transform:uppercase;">What I am hoping you can quote</p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li>Full deshedding bath (hypoallergenic / oatmeal shampoo if available)</li>
<li><strong>High-velocity blowout</strong> – the air-pressure dryer that pulls the undercoat out</li>
<li>Undercoat rake / Furminator pass</li>
<li>Light tidy of feet, sanitary area, and skirt</li>
<li>Nail trim + grind</li>
<li>Gentle ear clean (she is older)</li>
</ul>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;"><strong>What I am NOT asking for:</strong> shaving the body, kennel-style "puppy cut," or anything that touches the guard hairs.</p>
<div style="background:#fffbeb;border:1px solid rgba(180,83,9,0.25);border-radius:14px;padding:16px 18px;margin:18px 0;">
<p style="margin:0 0 10px;font-size:14px;color:#78350f;line-height:1.6;"><strong>Please let me know:</strong></p>
<ol style="margin:0;padding-left:20px;font-size:14px;line-height:1.65;color:#78350f;">
<li>Your earliest availability (week of / day of week / time of day).</li>
<li>Total all-in price (no surprise add-ons).</li>
<li>Mobile (you come to Hawaii Kai 96825) or salon (we come to you).</li>
<li>Any senior-dog accommodations (rest breaks, low-stress handling).</li>
</ol>
</div>
<p style="margin:0 0 12px;font-size:14px;font-weight:600;">Thank you so much, {{Name}}.</p>
${btn("tel:8083930153", "Call Eric – (808) 393-0153", "#b45309")}`,
    CORGI_FOOTER_HTML,
  ),
};

const CORGI_HAIR_FU1 = {
  subject: "Still Hoping to Book a Grooming Appointment for Stella",
  text: `Hi {{Name}},

Quick follow-up on grooming for Stella – my 13-year-old corgi. I do not want to keep emailing if you are full or this is not the right ask – just a one-line reply ("booked out" / "not seniors" / etc.) and I will move on.

If you do have an opening, I am flexible on the day and time, and I can be on the road in 15 minutes for Hawaii Kai-area appointments. Just let me know your soonest slot and the total price.

Eric – (808) 393-0153${CORGI_FOOTER_TEXT}`,
  html: fbox(
    "#b45309",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Quick follow-up on grooming for <strong>Stella – my 13-year-old corgi</strong>. I do not want to keep emailing if you are full – a one-line reply ("booked out" / "not seniors") is more than enough.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If you do have an opening, I am flexible on day and time, and can be on the road in 15 minutes for Hawaii Kai-area appointments.</p>
${btn("tel:8083930153", "Call Eric – (808) 393-0153", "#b45309")}`,
    CORGI_FOOTER_HTML,
  ),
};

const CORGI_HAIR_FU2 = {
  subject: "Would Stella Be Too Much Work for Your Grooming Schedule?",
  text: `Hi {{Name}},

Asking the no-question on purpose. Sometimes groomers see "13-year-old double-coat" and quietly skip past – I would rather you just tell me if she is more than you want to take on.

She is calm, leashes well, no aggression, no separation panic. The double coat is the only "work" – and the only thing she needs is a thorough deshed + high-velocity blowout, never shaving. If your team is comfortable with that, I am ready to book.

If not – truly no offense – please send me one name of a groomer you trust who handles double coats well. I would owe you one.

Eric – (808) 393-0153${CORGI_FOOTER_TEXT}`,
  html: fbox(
    "#b45309",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Asking on purpose. Sometimes groomers see "13-year-old double-coat" and quietly skip past – I would rather you just tell me if Stella is more than you want to take on.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">She is calm, leashes well, no aggression, no separation panic. The <strong>double coat is the only work</strong> – and the only thing she needs is a thorough deshed + high-velocity blowout, <strong>never shaving</strong>. If your team is comfortable with that, I am ready to book.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">If not – truly no offense – please send me one name of a groomer you trust who handles double coats well. I would owe you one.</p>
${btn("tel:8083930153", "Talk it through – (808) 393-0153", "#b45309")}`,
    CORGI_FOOTER_HTML,
  ),
};

const CORGI_HAIR_FU3 = {
  subject: "A Small Thank You and an Honest Yelp and Google Review From Our Family",
  text: `Hi {{Name}},

Almost done with the chasing. Just wanted to add this:

If you do book Stella in and we are happy, I will gladly leave a thoughtful, real Yelp + Google review (with photos), and refer other corgi / double-coat owners I know to you. That is the easiest way I know to say thank you.

If now is not the right time but you want to grab my info for later, totally fine – I am at (808) 393-0153 / elionreigns@gmail.com.

Eric${CORGI_FOOTER_TEXT}`,
  html: fbox(
    "#b45309",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Almost done with the chasing. Just wanted to add this:</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If you book Stella in and we are happy, I will gladly leave a <strong>thoughtful, real Yelp + Google review with photos</strong>, and refer other corgi / double-coat owners I know to you. That is the easiest way I know to say thank you.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">If now is not the right time but you want to grab my info for later, totally fine – (808) 393-0153 / elionreigns@gmail.com.</p>`,
    CORGI_FOOTER_HTML,
  ),
};

const CORGI_HAIR_FU4 = {
  subject: "Final Note and Stella Sends Her Tail Wag Either Way",
  text: `Hi {{Name}},

Last email, promise. We are going to keep looking for the right groomer for Stella – your shop was high on our list, but I do not want to be a nuisance.

If anything changes (cancellation, new opening, new senior-dog program), my contact does not change: (808) 393-0153.${SOFT_CLOSE_TEXT}

Eric & Stella the cutest corgi${CORGI_FOOTER_TEXT}`,
  html: fbox(
    "#94a3b8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Last email, promise. We will keep looking for the right groomer for Stella – your shop was high on our list, but I do not want to be a nuisance.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If anything changes (cancellation, new opening, new senior-dog program), my contact does not change: <strong>(808) 393-0153</strong>.</p>
${SOFT_CLOSE_HTML}
<p style="margin:14px 0 0;font-size:14px;color:#334155;">Eric &amp; Stella the cutest corgi.</p>`,
    CORGI_FOOTER_HTML,
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// CORGI CARE – TEETH (vet clinics + dental practices)
// ─────────────────────────────────────────────────────────────────────────────
const CORGI_TEETH = {
  subject: "All Inclusive Quote Request for a Routine Corgi Dental Cleaning (Healthy 13 Year Old, About 25 Pounds)",
  text: `Hi {{Name}},

I am pricing a full anesthesia dental cleaning for my dog, Stella – a 13-year-old, ~25-lb Pembroke corgi, generally healthy, no known extractions needed.

Could you please send me a one-line, all-in quote for:
- Routine dental cleaning (scaling + polish)
- Pre-op exam
- Pre-anesthesia bloodwork
- Anesthesia (gas/IV as your protocol)
- Digital dental X-rays (full mouth)
- Standard recovery monitoring

If extractions end up being needed at exam time, what is your typical per-tooth add-on?

Budget context (so we are not wasting your time): we are aiming to land between $300 and $500 all-in for a healthy mouth, and we know Oahu prices range higher. If you are above that range but include something extra (like X-rays, longer recovery, surgical specialist), please say so – we can adjust.

Best way to reach me is direct: (808) 393-0153 or this email. Thank you, {{Name}}.

Eric & Ashley Schaefer${CORGI_FOOTER_TEXT}`,
  html: card(
    "#0e7490",
    "rgba(14,116,144,0.18)",
    "Pre-booking quote request – Stella the corgi",
    "Routine dental cleaning – all-in price please",
    "13-yr Pembroke corgi · ~25 lb · healthy mouth · no known extractions.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">I am pricing a full anesthesia dental cleaning for my dog, <strong>Stella – a 13-year-old, ~25-lb Pembroke corgi</strong>, generally healthy, no known extractions needed.</p>
<p style="margin:18px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.14em;color:#0e7490;text-transform:uppercase;">Could you please send me a one-line, all-in quote for:</p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li>Routine dental cleaning (scaling + polish)</li>
<li>Pre-op exam</li>
<li>Pre-anesthesia bloodwork</li>
<li>Anesthesia (gas / IV per your protocol)</li>
<li>Digital dental X-rays (full mouth)</li>
<li>Standard recovery monitoring</li>
</ul>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;">If extractions end up being needed at exam time, what is your typical <strong>per-tooth add-on</strong>?</p>
<div style="background:#ecfeff;border:1px solid rgba(14,116,144,0.25);border-radius:14px;padding:16px 18px;margin:18px 0;">
<p style="margin:0;font-size:14px;color:#155e75;line-height:1.6;"><strong>Budget context:</strong> we are aiming to land between <strong>$300 and $500 all-in</strong> for a healthy mouth, and we know Oahu prices range higher. If you are above that range but include something extra (full X-rays, longer recovery, surgical specialist), please just say so – we can adjust.</p>
</div>
<p style="margin:0 0 12px;font-size:14px;font-weight:600;">Thank you, {{Name}}.</p>
<p style="margin:0;font-size:14px;color:#334155;">Direct line: (808) 393-0153 · elionreigns@gmail.com</p>
${btn("tel:8083930153", "Call Eric – (808) 393-0153", "#0e7490")}`,
    CORGI_FOOTER_HTML,
  ),
};

const CORGI_TEETH_FU1 = {
  subject: "Still Hoping to Get an All Inclusive Dental Cleaning Quote",
  text: `Hi {{Name}},

Quick nudge on the dental quote for Stella (13-yr corgi, ~25 lb, healthy mouth). I know quote requests can pile up – just trying to make sure mine did not slip through.

If you can spare 60 seconds, even a rough range ("$X–$Y for our healthy-mouth package") would help me figure out where to book.

Eric – (808) 393-0153${CORGI_FOOTER_TEXT}`,
  html: fbox(
    "#0e7490",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Quick nudge on the dental quote for <strong>Stella (13-yr corgi, ~25 lb, healthy mouth)</strong>. I know quote requests pile up – just making sure mine did not slip through.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If you can spare 60 seconds, even a rough range ("$X–$Y for our healthy-mouth package") would help me figure out where to book.</p>
${btn("tel:8083930153", "Call Eric – (808) 393-0153", "#0e7490")}`,
    CORGI_FOOTER_HTML,
  ),
};

const CORGI_TEETH_FU2 = {
  subject: "Is Your Healthy Mouth Dental Package Above Five Hundred Dollars All In?",
  text: `Hi {{Name}},

Asking the direct question on purpose so neither of us wastes time. If your typical all-in for a healthy 25-lb corgi dental (cleaning + bloodwork + X-rays + anesthesia) is over $500, I would rather know upfront so I can budget or look elsewhere.

If you ARE in or near our range, please send the package details and I will book this week.

Either way I appreciate the honest answer.

Eric – (808) 393-0153${CORGI_FOOTER_TEXT}`,
  html: fbox(
    "#0e7490",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Asking the direct question on purpose so neither of us wastes time.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If your typical all-in for a healthy 25-lb corgi dental (cleaning + bloodwork + X-rays + anesthesia) is <strong>over $500</strong>, I would rather know upfront so I can budget or look elsewhere.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If you ARE in or near our range, please send the package details and <strong>I will book this week</strong>.</p>
${btn("mailto:elionreigns@gmail.com?subject=Stella%20dental%20quote", "Send the package details", "#0e7490")}`,
    CORGI_FOOTER_HTML,
  ),
};

const CORGI_TEETH_FU3 = {
  subject: "An Honest Review and Referrals From Our Corgi Owner Network",
  text: `Hi {{Name}},

If we end up booking Stella with you and the experience is good, I will leave a thoughtful Yelp + Google review (with photos and the actual price you quoted, so other owners can find you), and I will refer other dog owners I know on Oahu.

That is my way of saying thank you for transparent pricing and good care.

If now is not the right time, no problem – I will move on. Either way, thanks for considering.

Eric – (808) 393-0153${CORGI_FOOTER_TEXT}`,
  html: fbox(
    "#0e7490",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If we book Stella with you and the experience is good, I will leave a <strong>thoughtful Yelp + Google review</strong> (with photos and the actual price you quoted, so other owners can find you), and refer other dog owners on Oahu.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">That is my way of saying thank you for transparent pricing and good care.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">If now is not the right time, no problem – I will move on. Either way, thanks for considering.</p>`,
    CORGI_FOOTER_HTML,
  ),
};

const CORGI_TEETH_FU4 = {
  subject: "Final Note and Stella Thanks You Either Way",
  text: `Hi {{Name}},

Last note. We will move forward with whichever clinic gets back to us first with a clear, all-in price. If your office wants to be in the running, even a quick range works.

If we miss each other this round – please keep us on file for future visits. Stella will need cleanings every 1–2 years for the rest of her life and we are loyal once we find a good fit.${SOFT_CLOSE_TEXT}

Eric – (808) 393-0153${CORGI_FOOTER_TEXT}`,
  html: fbox(
    "#94a3b8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Last note. We will move forward with whichever clinic gets back to us first with a clear, all-in price.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If we miss each other this round – please keep us on file. Stella will need cleanings every 1–2 years for the rest of her life and we are loyal once we find a good fit.</p>
${SOFT_CLOSE_HTML}`,
    CORGI_FOOTER_HTML,
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// CORGI CARE – BOOK ME (high-intent ready-to-book with 3 proposed slots)
// Sent when we want an appointment THIS WEEK, not a quote conversation.
// ─────────────────────────────────────────────────────────────────────────────
const CORGI_TEETH_BOOK_ME = {
  subject: "Ready to Book Stella's Dental This Week — Three Slots That Work For Us",
  text: `Hi {{Name}},

Short and direct so we can both save time.

We are ready to book a routine anesthesia dental cleaning for Stella, our 13-year-old Pembroke corgi (~25 lb, generally healthy, no known extractions). We have our budget set ($300–$500 all-in is ideal; we will stretch for a great fit).

Any of these three slots would work for us:

  • Thursday, April 23 — morning (9:00 – 11:00 AM)
  • Saturday, April 25 — any time you have open
  • Monday, April 27 — afternoon (1:00 – 4:00 PM)

Can you hold one of those for Stella and reply with "CONFIRM + [slot]"? If none of those fit, please send your next two available openings and we will lock it in the same day.

We will fill out paperwork, send her vaccine records, and pre-pay or put a card on file — whatever you need to reserve the slot.

Thank you, {{Name}}. Calling is fastest for us — (808) 393-0153.

Eric & Ashley Schaefer${CORGI_FOOTER_TEXT}`,
  html: card(
    "#0e7490",
    "rgba(14,116,144,0.18)",
    "Booking request – Stella the corgi · dental",
    "Ready to book this week – three slots that work for us",
    "13-yr Pembroke corgi · ~25 lb · healthy mouth · we will lock a slot today.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">Short and direct so we can both save time.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">We are ready to book a routine anesthesia dental cleaning for <strong>Stella – our 13-year-old Pembroke corgi (~25 lb, generally healthy, no known extractions)</strong>. Budget target: <strong>$300–$500 all-in</strong>, we will stretch for the right fit.</p>
<div style="background:#ecfeff;border:1px solid rgba(14,116,144,0.28);border-radius:14px;padding:16px 18px;margin:18px 0;">
<p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.14em;color:#0e7490;text-transform:uppercase;">Any of these three slots work</p>
<ul style="margin:0;padding-left:20px;font-size:15px;line-height:1.8;color:#134e4a;">
<li><strong>Thursday, April 23</strong> – morning (9:00 – 11:00 AM)</li>
<li><strong>Saturday, April 25</strong> – any time you have open</li>
<li><strong>Monday, April 27</strong> – afternoon (1:00 – 4:00 PM)</li>
</ul>
</div>
<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">Can you hold one of those and reply with <strong>"CONFIRM + [slot]"</strong>? If none of those fit, please send your next two available openings and we will lock it in the same day.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#475569;">Happy to fill out paperwork, send vaccine records, and pre-pay or put a card on file — whatever you need to reserve the slot.</p>
<p style="margin:0 0 12px;font-size:14px;font-weight:600;">Thank you, {{Name}}.</p>
${btn("tel:8083930153", "Call now – (808) 393-0153", "#0e7490")}`,
    CORGI_FOOTER_HTML,
  ),
};

const CORGI_HAIR_BOOK_ME = {
  subject: "Ready to Book Stella's Groom This Week — Three Slots That Work For Us",
  text: `Hi {{Name}},

Short and direct so we can both save time.

We are ready to book a full groom for Stella, our 13-year-old Pembroke corgi. She is calm, leashes well, no aggression, no separation panic. The only ask: a thorough deshed + high-velocity blowout, NO shaving of the body. Standard budget $100–$150 is fine, I will stretch for the right groomer.

Any of these three slots would work for us:

  • Thursday, April 23 — morning (9:00 – 11:00 AM)
  • Saturday, April 25 — any time you have open
  • Monday, April 27 — afternoon (1:00 – 4:00 PM)

Can you hold one of those for Stella and reply with "CONFIRM + [slot]"? If mobile, we are in Hawaii Kai (96825). If salon, we can drive to you. If none of those fit, please send your next two available openings and we will lock it in the same day.

Thank you, {{Name}}. Calling is fastest for us — (808) 393-0153.

Eric – Stella's dad${CORGI_FOOTER_TEXT}`,
  html: card(
    "#b45309",
    "rgba(180,83,9,0.18)",
    "Booking request – Stella the corgi · groom",
    "Ready to book this week – three slots that work for us",
    "13-yr Pembroke corgi · deshed + blowout · no shaving · we will lock a slot today.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">Short and direct so we can both save time.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">We are ready to book a full groom for <strong>Stella – our 13-year-old Pembroke corgi</strong>. Calm, leashes well, no aggression, no separation panic. The only ask: a thorough <strong>deshed + high-velocity blowout, NO shaving</strong> of the body. Standard budget $100–$150 is fine – will stretch for the right groomer.</p>
<div style="background:#fffbeb;border:1px solid rgba(180,83,9,0.28);border-radius:14px;padding:16px 18px;margin:18px 0;">
<p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.14em;color:#b45309;text-transform:uppercase;">Any of these three slots work</p>
<ul style="margin:0;padding-left:20px;font-size:15px;line-height:1.8;color:#78350f;">
<li><strong>Thursday, April 23</strong> – morning (9:00 – 11:00 AM)</li>
<li><strong>Saturday, April 25</strong> – any time you have open</li>
<li><strong>Monday, April 27</strong> – afternoon (1:00 – 4:00 PM)</li>
</ul>
</div>
<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">Can you hold one of those and reply with <strong>"CONFIRM + [slot]"</strong>? If mobile, we are in Hawaii Kai (96825). If salon, we can drive to you. If none of those fit, please send your next two available openings and we will lock it in the same day.</p>
<p style="margin:0 0 12px;font-size:14px;font-weight:600;">Thank you, {{Name}}.</p>
${btn("tel:8083930153", "Call now – (808) 393-0153", "#b45309")}`,
    CORGI_FOOTER_HTML,
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// CORGI CARE – MILITARY BASES (VTF / Schofield / JBPHH)
// ─────────────────────────────────────────────────────────────────────────────
const CORGI_MILITARY = {
  subject: "VTF Dental Cleaning Rates for a Military Family Member and Her Corgi",
  text: `Hi {{Name}},

I am writing on behalf of my wife's cousin – she is an active-duty military member here on Oahu and she is trying to book a routine dental cleaning for her corgi. I am helping her gather quotes because she is on an unpredictable schedule.

Could you please send the rates for the following at {{Name of Organization}}:
- Routine dental cleaning on a healthy ~25-lb corgi (scaling + polish)
- Pre-op exam
- Pre-anesthesia bloodwork
- Anesthesia + monitoring
- Full-mouth digital dental X-rays
- Per-tooth add-on if extractions become necessary

A few specific questions:
1. What is the all-in / bottom-dollar price for a DoD-ID-eligible cleaning with X-rays?
2. Is there a separate active-duty discount, dependent rate, or VTF-member rate?
3. Is the dog required to be on the service member's DoD ID, or can a transferred owner record (Ownership Transfer Form) work?
4. What is the typical wait time for a dental appointment right now?

Once she has the bottom-dollar number she will set the date directly with you. Best way to reach me in the meantime: (808) 393-0153 / coralcrowntechnologies@gmail.com.

Mahalo nui loa, {{Name}}.

Eric Schaefer${NS_FOOTER_TEXT}`,
  html: card(
    "#166534",
    "rgba(22,101,52,0.2)",
    "VTF / military veterinary inquiry",
    "Bottom-dollar dental rate, please",
    "Helping my wife's cousin (active duty) book her corgi.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">I am writing on behalf of my wife's cousin – she is an <strong>active-duty military member</strong> here on Oahu and she is trying to book a routine dental cleaning for her corgi. I am helping her gather quotes because she is on an unpredictable schedule.</p>
<p style="margin:18px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.14em;color:#166534;text-transform:uppercase;">Please send rates for:</p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li>Routine dental cleaning on a healthy ~25-lb corgi (scaling + polish)</li>
<li>Pre-op exam · pre-anesthesia bloodwork</li>
<li>Anesthesia + monitoring · full-mouth digital dental X-rays</li>
<li>Per-tooth add-on if extractions become necessary</li>
</ul>
<div style="background:#f0fdf4;border:1px solid rgba(22,101,52,0.25);border-radius:14px;padding:16px 18px;margin:18px 0;">
<p style="margin:0 0 10px;font-size:14px;color:#14532d;line-height:1.6;"><strong>A few specific questions:</strong></p>
<ol style="margin:0;padding-left:20px;font-size:14px;line-height:1.65;color:#14532d;">
<li>What is the <strong>all-in / bottom-dollar price</strong> for a DoD-ID-eligible cleaning with X-rays?</li>
<li>Active-duty discount, dependent rate, or VTF-member rate?</li>
<li>Does the dog need to be on the service member's DoD ID, or can a transferred owner record (Ownership Transfer Form) work?</li>
<li>Typical wait time for a dental appointment right now?</li>
</ol>
</div>
<p style="margin:0 0 12px;font-size:14px;line-height:1.7;color:#334155;">Once she has the bottom-dollar number she will set the date directly with you.</p>
<p style="margin:0 0 8px;font-size:14px;font-weight:600;">Mahalo nui loa, {{Name}}.</p>
<p style="margin:0;font-size:14px;color:#334155;">Eric Schaefer · (808) 393-0153 · coralcrowntechnologies@gmail.com</p>
${btn("tel:8083930153", "Call Eric – (808) 393-0153", "#166534")}`,
  ),
};

const CORGI_MILITARY_FU1 = {
  subject: "Checking Back on the VTF Dental Rate for Our Military Corgi Owner",
  text: `Hi {{Name}},

Quick follow-up on my note last week. Just trying to confirm the bottom-dollar dental rate for my wife's cousin's corgi so she can book a date.

If the cleanest answer right now is "call this number / show up Tuesday morning," that works too – just let me know.

Mahalo, Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#166534",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Quick follow-up on my note last week. Just confirming the <strong>bottom-dollar dental rate</strong> for my wife's cousin's corgi so she can book.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If the cleanest answer right now is "call this number / show up Tuesday morning," that works too – just let me know.</p>
${btn("tel:8083930153", "Call Eric – (808) 393-0153", "#166534")}`,
  ),
};

const CORGI_MILITARY_FU2 = {
  subject: "Are Non Department of Defense Card Sponsorships Still Allowed for VTF Dental?",
  text: `Hi {{Name}},

Asking specifically because we have heard from other military families that the rules around dependent vs. service-member ID, and whether a transferred-ownership dog still qualifies, change from time to time.

If you can confirm whether her corgi (currently on her record, she is the active-duty member) is straightforwardly eligible at the VTF rate, we can move directly to picking a date.

If there is a paperwork step she needs to do first (Ownership Transfer Form, vet record transfer), please point me to the form and I will help her fill it out.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#166534",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Asking specifically because we have heard the rules around dependent vs. service-member ID, and whether a transferred-ownership dog still qualifies, can change.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If you can confirm her corgi (she is the active-duty member, dog on her record) is <strong>straightforwardly eligible at the VTF rate</strong>, we can move directly to picking a date.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">If there is a paperwork step (Ownership Transfer Form, vet record transfer), please point me to the form and I will help her fill it out.</p>
${btn("mailto:coralcrowntechnologies@gmail.com?subject=VTF%20eligibility%20%2B%20forms", "Send the form / next step", "#166534")}`,
  ),
};

const CORGI_MILITARY_FU3 = {
  subject: "A Small Thank You and Referrals to Other Military Corgi Families",
  text: `Hi {{Name}},

Thanks for whatever you have time to share. If we land at your VTF for the cleaning and the experience is good, I will be happy to:
- Mention your team (or you specifically) by name to other military / dependent families on Oahu we know
- Drop a warm note in any base community group / FB group where corgi and small-dog owners share recommendations

Always nice to repay good service in kind. Hope to hear back when you get a moment.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#166534",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Thanks for whatever you have time to share. If we land at your VTF and the experience is good, I will be happy to:</p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li>Mention your team (or you specifically) by name to other military / dependent families on Oahu</li>
<li>Drop a warm note in any base community group where small-dog owners share recommendations</li>
</ul>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">Always nice to repay good service in kind. Hope to hear back when you get a moment.</p>`,
  ),
};

const CORGI_MILITARY_FU4 = {
  subject: "Final Note and Mahalo for Your Service Either Way",
  text: `Hi {{Name}},

Last note. We will keep digging until she has a slot and an all-in number, but I do not want to keep filling your inbox.

If anything ever changes about VTF dental availability or rates, I would be grateful for a heads-up to (808) 393-0153.${SOFT_CLOSE_TEXT}

Mahalo nui loa for your service.

Eric${NS_FOOTER_TEXT}`,
  html: fbox(
    "#94a3b8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Last note. We will keep digging until she has a slot and an all-in number, but I do not want to keep filling your inbox.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If anything ever changes about VTF dental availability or rates, I would be grateful for a heads-up to <strong>(808) 393-0153</strong>.</p>
${SOFT_CLOSE_HTML}
<p style="margin:14px 0 0;font-size:14px;color:#334155;">Mahalo nui loa for your service.</p>`,
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// LUXURY RESOURCE – FAREHARBOR PARTNERS (already on FareHarbor)
// ─────────────────────────────────────────────────────────────────────────────
const LUX_FH = {
  subject: "Sign Us On as Your Affiliate and Increase Your Bookings Either Direct or Through FareHarbor",
  text: `Hi {{Name}},

I am launching Hawaii Luxury Resource, with over 20+ years in the tourism industry — from working with the top tourism companies, to introducing the Water Jetpack to Hawaii, to building countless websites along the way. We're working on a new luxury website which also carries some basic activities, but is more focused on the high-end clients who aren't necessarily on a budget and just want the best quality of service — and we thought of you and {{Name of Organization}}.

The ask is simple: sign us on as your affiliate so we can start sending guests your way. You can do that one of two ways, whichever your team prefers:

1) As a FareHarbor affiliate (3-minute add in your dashboard — FareHarbor pays out, you never invoice us)
2) Through a direct commission contract (10% on confirmed + completed bookings, NET-15 settlement)

Either way:
- Commission: 10% (your standard FareHarbor affiliate rate)
- Cost up front / ongoing / if we send zero bookings: zero
- Reporting: handled entirely by FareHarbor (or by us, on a monthly statement, if direct)
- We never increase your published price — the commission comes out of your proceeds

How to add us on FareHarbor (~3 min):
1. Sign in to FareHarbor → Help → "Add an affiliate" / "Manage affiliates"
2. Select "Add affiliate" and enter:
     Name: Hawaii Luxury Resource (Eric Schaefer)
     Email: coralcrowntechnologies@gmail.com
     Type: Individual / Online Affiliate
     Commission: 10%
3. FareHarbor will send us our affiliate code + lightboxes — we drop them on the right pages on hawaiiluxuryresource.com and we are live.

If you would rather have us call and walk through it together, Ashley on our side handles vendor onboarding. Reach her at 808-994-9034 (or text).

What you get from us:
- Featured placement on our curated catalog (we vet every operator — not a spammy aggregator)
- Targeted paid traffic from couples, group travel, and luxury concierge searches
- Pre-qualified guests who arrive expecting your premium price, not bargain-hunting
- Year-round visibility, not just one-off blasts

Thank you for considering it, {{Name}}.

Eric Schaefer
Hawaii Luxury Resource · Coral Crown Solutions
hawaiiluxuryresource.com · (808) 994-9034 (Ashley) · (808) 393-0153 (Eric)${NS_FOOTER_TEXT}`,
  html: card(
    "#a16207",
    "rgba(161,98,7,0.2)",
    "Sign us on as your affiliate — Hawaii Luxury Resource",
    "Increase your bookings — direct or through FareHarbor.",
    "20+ years in Hawaii tourism. Water Jetpack intro. Countless websites.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">I am launching <strong>Hawaii Luxury Resource</strong>, with over <strong>20+ years in the tourism industry</strong> — from working with the top tourism companies, to <strong>introducing the Water Jetpack to Hawaii</strong>, to building countless websites along the way. We're working on a new luxury website which also carries some basic activities, but is more focused on the <strong>high-end clients who aren't necessarily on a budget and just want the best quality of service</strong> — and we thought of you and <strong>{{Name of Organization}}</strong>.</p>
${LUXURY_BLURB_HTML}
<p style="margin:14px 0;font-size:15px;line-height:1.7;">The ask is simple: sign us on as your affiliate so we can start sending guests your way. You can do that one of two ways — whichever your team prefers:</p>
<ol style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.75;">
<li><strong>As a FareHarbor affiliate</strong> (3-minute add in your dashboard — FareHarbor pays out, you never invoice us)</li>
<li><strong>Through a direct commission contract</strong> (10% on confirmed + completed bookings, NET-15 settlement)</li>
</ol>
<div style="background:#fffbeb;border:1px solid rgba(161,98,7,0.3);border-radius:14px;padding:18px 20px;margin:18px 0;">
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.14em;color:#854d0e;text-transform:uppercase;">Either way</p>
<ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.7;color:#451a03;">
<li><strong>Commission:</strong> 10% (your standard FareHarbor affiliate rate)</li>
<li><strong>Reporting:</strong> handled entirely by FareHarbor (or by us, monthly, if direct)</li>
<li><strong>Cost up front / ongoing / if zero bookings:</strong> zero</li>
<li>We never increase your published price — the commission comes out of your proceeds</li>
</ul>
</div>
<p style="margin:18px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.14em;color:#a16207;text-transform:uppercase;">3-minute add (your team has done this before)</p>
<ol style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.75;">
<li>Sign in to FareHarbor → Help → <em>"Add an affiliate"</em> / <em>"Manage affiliates"</em></li>
<li>Select "Add affiliate" and enter:<br>
<span style="font-family:ui-monospace,Consolas,monospace;font-size:13px;background:#fef3c7;padding:8px 10px;border-radius:8px;display:inline-block;margin-top:6px;">
Name: Hawaii Luxury Resource (Eric Schaefer)<br>
Email: coralcrowntechnologies@gmail.com<br>
Type: Individual / Online Affiliate<br>
Commission: 10% (default)
</span></li>
<li>FareHarbor sends us our affiliate code + lightboxes – we drop them on the right pages on hawaiiluxuryresource.com and we are live.</li>
</ol>
<div style="background:#fef3c7;border:1px solid rgba(161,98,7,0.35);border-radius:14px;padding:16px 18px;margin:18px 0;">
<p style="margin:0;font-size:14px;color:#451a03;line-height:1.65;"><strong>Want us to call your team and walk through it?</strong> Ashley on our side handles vendor onboarding and contracts. Call or text <strong>808-994-9034</strong> – she can have you up and running in one call.</p>
</div>
<p style="margin:18px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.14em;color:#a16207;text-transform:uppercase;">What you get from us</p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li>Featured placement on our curated catalog (we vet every operator – not a spammy aggregator)</li>
<li>Targeted paid traffic from couples, group travel, luxury concierge searches</li>
<li><strong>Pre-qualified guests</strong> – ours arrive expecting your premium price</li>
<li>Year-round visibility – not just one-off blasts</li>
</ul>
${btn("tel:8089949034", "Call Ashley – (808) 994-9034", "#a16207")}
<p style="margin:6px 0 0;font-size:13px;color:#64748b;">Or reply to this email and we will route the right next step.</p>`,
  ),
};

const LUX_FH_FU1 = {
  subject: "Did Our Affiliate Partnership Request Reach the Right Person on Your Team?",
  text: `Hi {{Name}},

Quick follow-up on my note about adding Hawaii Luxury Resource as a FareHarbor affiliate for {{Name of Organization}}.

Wanted to make sure it landed with whoever in your office handles bookings or operations – sometimes the affiliate add gets queued behind operations work and just sits.

If you can forward this to the right person (or reply with their name and I will reach out directly), I will take it from there. Or call Ashley at 808-994-9034 – she handles all our vendor onboarding and can move it through with one phone call.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#a16207",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Quick follow-up on adding Hawaii Luxury Resource as a FareHarbor affiliate for <strong>{{Name of Organization}}</strong>.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Wanted to make sure it landed with whoever handles bookings or operations – the affiliate add can get queued behind operations work and sit.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">Forward this to the right person (or reply with their name) and I will reach out directly. Or call <strong>Ashley at 808-994-9034</strong> – she handles vendor onboarding and can move it through in one call.</p>
${btn("tel:8089949034", "Call Ashley – (808) 994-9034", "#a16207")}`,
  ),
};

const LUX_FH_FU2 = {
  subject: "Is There a Reason Not to Add a Free Affiliate Driving High End Bookings to Your Operation?",
  text: `Hi {{Name}},

Honest no-question. Most FareHarbor operators add affiliates without a second thought because there is literally no risk: you set a default 10% rate, FareHarbor pays it out only on real bookings, and your gross-per-guest stays positive. So I want to ask the obvious: is there a reason your team would not want to add us?

If the answer is "we just have not gotten to it" – totally normal, and one phone call to Ashley (808-994-9034) wraps it up.

If the answer is "we have an exclusivity arrangement" or "we are reorganizing affiliates" – please tell me and I will respect that and stop reaching out.

If the answer is something else – I want to hear it.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#a16207",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Honest no-question. Most FareHarbor operators add affiliates without a second thought because there is literally no risk: <strong>FareHarbor only pays the affiliate on real bookings</strong>, and your gross-per-guest stays positive.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">So – is there a reason your team would not want to add us?</p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li><em>"We just have not gotten to it"</em> → one phone call to Ashley (808-994-9034) wraps it up.</li>
<li><em>"We have an exclusivity arrangement"</em> / <em>"reorganizing affiliates"</em> → please tell me and I will respect that.</li>
<li>Anything else → I want to hear it.</li>
</ul>
${btn("tel:8089949034", "Call Ashley – (808) 994-9034", "#a16207")}`,
  ),
};

const LUX_FH_FU3 = {
  subject: "A Reciprocal Offer to Make the Affiliate Partnership Easy to Say Yes To",
  text: `Hi {{Name}},

A small reciprocal offer to make this even more worth your team's time:

Once you add us as a FareHarbor affiliate, I will:
1. Push {{Name of Organization}} to the FEATURED row of our catalog (above the standard listings) for the first 30 days, at no extra cost or commission tier
2. Write a short editorial blurb about your tour for our journal section
3. Run our concierge intake form straight into your FareHarbor calendar so the leads are pre-warmed before they even click

Cost to you: still zero. Risk: still zero. Upside: you start getting our traffic for one of the most-trafficked rooms on the site.

Reply or call Ashley at 808-994-9034 to lock it in. Thank you, {{Name}}.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#a16207",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">A small reciprocal offer to make this even more worth your team's time:</p>
<p style="margin:0 0 10px;font-size:15px;line-height:1.65;">Once you add us as a FareHarbor affiliate, I will:</p>
<ol style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li>Push <strong>{{Name of Organization}}</strong> to the <strong>FEATURED row</strong> of our catalog (above standard listings) for the first 30 days – no extra commission tier</li>
<li>Write a short editorial blurb about your tour for our journal</li>
<li>Run our concierge intake form straight into your FareHarbor calendar so leads are <strong>pre-warmed</strong> before they click</li>
</ol>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Cost: zero. Risk: zero. Upside: traffic to one of the most-visited rooms on the site.</p>
${btn("tel:8089949034", "Call Ashley to lock it in – (808) 994-9034", "#a16207")}`,
  ),
};

const LUX_FH_FU4 = {
  subject: "Final Note and Our Affiliate Door Stays Open Whenever You Are Ready",
  text: `Hi {{Name}},

Last touch. We will keep building out the catalog and routing guests through the operators who said yes. The door is always open if you change your mind – nothing we are setting up today expires the offer.

If you ever want to revisit:
- Default 10% affiliate commission, reviewed annually
- Featured placement on our curated catalog
- Ashley (vendor onboarding): 808-994-9034
- Eric (founder): 808-393-0153 / coralcrowntechnologies@gmail.com${SOFT_CLOSE_TEXT}

Wishing you a strong season, {{Name}}.${NS_FOOTER_TEXT}`,
  html: fbox(
    "#94a3b8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Last touch. We will keep building the catalog and routing guests through operators who said yes. The door is always open – nothing about today's offer expires.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If you ever want to revisit:</p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li>Default 10% affiliate commission, reviewed annually</li>
<li>Featured placement on our curated catalog</li>
<li>Ashley (vendor onboarding): <strong>808-994-9034</strong></li>
<li>Eric (founder): 808-393-0153 / coralcrowntechnologies@gmail.com</li>
</ul>
${SOFT_CLOSE_HTML}
<p style="margin:14px 0 0;font-size:14px;color:#334155;">Wishing you a strong season, {{Name}}.</p>`,
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// LUXURY RESOURCE – DIRECT (non-FareHarbor operators – contract attached)
// ─────────────────────────────────────────────────────────────────────────────
const LUX_DIRECT = {
  subject: "Sign Us On as Your Direct Affiliate and Increase Your Bookings (Hawaii Luxury Resource, Contract Ready)",
  text: `Hi {{Name}},

I am launching Hawaii Luxury Resource, with over 20+ years in the tourism industry — from working with the top tourism companies, to introducing the Water Jetpack to Hawaii, to building countless websites along the way. We're working on a new luxury website which also carries some basic activities, but is more focused on the high-end clients who aren't necessarily on a budget and just want the best quality of service — and we thought of you and {{Name of Organization}}.

Because {{Name of Organization}} books direct (not on FareHarbor), the cleanest way to sign us on as your affiliate is a one-page direct commission referral agreement. That lets us start sending you pre-qualified luxury guests immediately, with settlement and reporting handled without either of us guessing.

The terms:
- Commission: 10% on confirmed AND completed bookings we send you (we eat refunds and no-shows)
- Tracking: Each guest carries a UTM tag (utm_source=hawaiiluxuryresource, utm_campaign=YOUR_NAME, ref=HLR) — visible on the inquiry, in form fields, or in the email subject when we route a guest to you
- Settlement: NET-15 from the date the guest's tour completes — ACH or check, your call
- Reporting: We send a monthly ledger (PDF + CSV) listing every booking we credited to you, the guest name, dates, and amount — you sign off, we cash out
- Branding: your name, your photos, your booking flow. We never present {{Name of Organization}} as our own product
- Cost to you: zero up front, zero ongoing, zero if we send zero bookings

The contract is already drafted (one page, plain English, attorney-reviewed). Ashley on our side handles vendor onboarding and contract close-outs – she will email it over the moment you tell us "send it." She is at 808-994-9034 (call or text) and she will set it up with you, no back-and-forth.

What you get:
- Featured listing on hawaiiluxuryresource.com
- Pre-qualified guests (couples, group travel, luxury concierge buyers)
- Year-round paid traffic from us pointing to your business
- Editorial blurb in our journal section
- Our intake form pre-warming the lead before they reach you

Reply with one of these:
[ ] "Send the contract" – Ashley sends within 1 business day
[ ] "Call me first" – Ashley calls you at the number you give us
[ ] "Not a fit / not now" – we will respect that and move on

PS – if you actually do run on FareHarbor and would rather skip a contract entirely: open this 30-second guide and add Hawaii Luxury Resource as an individual affiliate (commission auto-tracked through your existing FareHarbor settlement). https://smoothsales-app.vercel.app/newsletter/luxury-resource-fareharbor?access=CROWN&name={{Name}}&org={{Name of Organization}}

Thank you, {{Name}} – looking forward to working with you.

Eric Schaefer
Hawaii Luxury Resource · Coral Crown Solutions
hawaiiluxuryresource.com · Ashley (vendor onboarding): (808) 994-9034 · Eric: (808) 393-0153${NS_FOOTER_TEXT}`,
  html: card(
    "#7c2d12",
    "rgba(124,45,18,0.2)",
    "Sign us on as your direct affiliate — Hawaii Luxury Resource",
    "10% direct commission, one-page contract ready to sign.",
    "20+ years in Hawaii tourism. Water Jetpack intro. Countless websites.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">I am launching <strong>Hawaii Luxury Resource</strong>, with over <strong>20+ years in the tourism industry</strong> — from working with the top tourism companies, to <strong>introducing the Water Jetpack to Hawaii</strong>, to building countless websites along the way. We're working on a new luxury website which also carries some basic activities, but is more focused on the <strong>high-end clients who aren't necessarily on a budget and just want the best quality of service</strong> — and we thought of you and <strong>{{Name of Organization}}</strong>.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">Because <strong>{{Name of Organization}}</strong> books direct (not on FareHarbor), the cleanest way to sign us on as your affiliate is a one-page <strong>direct commission referral agreement</strong>. That lets us start sending you pre-qualified luxury guests immediately, with settlement and reporting handled without either of us guessing.</p>
<div style="background:#fef2f2;border:1px solid rgba(124,45,18,0.3);border-radius:14px;padding:18px 20px;margin:18px 0;">
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.14em;color:#7c2d12;text-transform:uppercase;">The terms</p>
<ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.7;color:#7f1d1d;">
<li><strong>Commission:</strong> 10% on <strong>confirmed AND completed</strong> bookings (we eat refunds + no-shows)</li>
<li><strong>Tracking:</strong> UTM tag on every guest (<code>utm_source=hawaiiluxuryresource</code>, <code>utm_campaign=YOUR_NAME</code>, <code>ref=HLR</code>) — visible in inquiry, form fields, or email subject</li>
<li><strong>Settlement:</strong> NET-15 from tour completion · ACH or check</li>
<li><strong>Reporting:</strong> Monthly ledger (PDF + CSV) listing every credited booking — sign off, cash out</li>
<li><strong>Branding:</strong> your name, your photos, your booking flow. We never present <strong>{{Name of Organization}}</strong> as our own product</li>
<li><strong>Cost to you up front / ongoing / if zero bookings:</strong> zero</li>
</ul>
</div>
<div style="background:#fef3c7;border:1px solid rgba(161,98,7,0.35);border-radius:14px;padding:16px 18px;margin:18px 0;">
<p style="margin:0 0 6px;font-size:14px;color:#451a03;line-height:1.6;"><strong>The contract is already drafted</strong> (one page, plain English, attorney-reviewed). Ashley on our side handles vendor onboarding and contract close-outs.</p>
<p style="margin:0;font-size:14px;color:#451a03;line-height:1.6;">She will email it the moment you tell us "send it." Reach her at <strong>808-994-9034</strong> – she will set it up with you in one call, no back-and-forth.</p>
</div>
<p style="margin:18px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.14em;color:#7c2d12;text-transform:uppercase;">What you get</p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li>Featured listing on hawaiiluxuryresource.com</li>
<li>Pre-qualified guests – couples, group travel, luxury concierge buyers</li>
<li>Year-round paid traffic pointing to your business</li>
<li>Editorial blurb in our journal section</li>
<li>Intake form pre-warming the lead before they reach you</li>
</ul>
<div style="background:#f8fafc;border:2px dashed #cbd5e1;border-radius:14px;padding:18px 20px;margin:20px 0;">
<p style="margin:0 0 10px;font-size:14px;color:#0f172a;line-height:1.6;"><strong>Reply with one of these:</strong></p>
<p style="margin:6px 0;font-size:14px;color:#334155;">☐ <strong>"Send the contract"</strong> – Ashley sends within 1 business day</p>
<p style="margin:6px 0;font-size:14px;color:#334155;">☐ <strong>"Call me first"</strong> – Ashley calls at the number you give us</p>
<p style="margin:6px 0;font-size:14px;color:#334155;">☐ <strong>"Not a fit / not now"</strong> – we respect that and move on</p>
</div>
<div style="background:#eef2ff;border:1px solid rgba(67,56,202,0.25);border-radius:14px;padding:14px 16px;margin:14px 0;">
<p style="margin:0;font-size:13px;color:#312e81;line-height:1.6;"><strong>PS – on FareHarbor already?</strong> If your bookings actually run through FareHarbor, you can skip the contract entirely – just add us as an individual affiliate (commission auto-tracked through your existing FareHarbor settlement). <a href="https://smoothsales-app.vercel.app/newsletter/luxury-resource-fareharbor?access=CROWN&amp;name={{Name}}&amp;org={{Name of Organization}}" style="color:#4338ca;font-weight:600;text-decoration:underline;">Open the 30-second guide →</a></p>
</div>
<p style="margin:0 0 8px;font-size:14px;font-weight:600;">Thank you, {{Name}}.</p>
${btn("tel:8089949034", "Call Ashley – (808) 994-9034", "#7c2d12")}`,
  ),
};

const LUX_DIRECT_FU1 = {
  subject: "Did Our Direct Affiliate Proposal Reach the Right Person on Your Team?",
  text: `Hi {{Name}},

Quick follow-up on the direct-commission referral proposal for {{Name of Organization}}. Wanted to make sure it landed with the right person – sometimes operators have a separate sales / partnerships contact who handles new referral relationships.

If that is you – take whatever time you need; I just want to know it is in your queue.

If it is someone else – please forward, or reply with their name and I will reach out directly. Or have them call Ashley at 808-994-9034.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#7c2d12",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Quick follow-up on the direct-commission referral proposal for <strong>{{Name of Organization}}</strong>. Wanted to make sure it landed with the right person.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If that is you – take whatever time you need; I just want to know it is in your queue.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">If it is someone else – please forward, or reply with their name. Or have them call <strong>Ashley at 808-994-9034</strong>.</p>
${btn("tel:8089949034", "Call Ashley – (808) 994-9034", "#7c2d12")}`,
  ),
};

const LUX_DIRECT_FU2 = {
  subject: "Anything in the Direct Affiliate Contract Giving Your Team Pause?",
  text: `Hi {{Name}},

Honest direct question. Most operators say yes within a few days because the structure is genuinely zero-risk. If something in the proposal is giving you pause, I would rather know what it is so we can adjust or remove it.

Common things people ask about:
- Exclusivity – we do NOT require it. Sign with us AND keep all your other channels.
- Commission rate – 10% is the default; lower is unusual but we have done it for very high-volume operators. We will not go higher than 10% in your direction without it being written and mutual.
- Payment terms – NET-15 is standard but we will do NET-30 if your AP cycle requires it. We can also do quarterly ledger if monthly is too much paperwork.
- Branding – your name, your photos, your booking flow. We never present {{Name of Organization}} as our own product.

Whatever it is – let us know. Or call Ashley directly at 808-994-9034 and talk it out in 5 minutes.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#7c2d12",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Honest direct question. Most operators say yes within a few days because the structure is genuinely zero-risk. If something in the proposal is giving you pause, I would rather know what it is so we can adjust or remove it.</p>
<p style="margin:0 0 10px;font-size:15px;line-height:1.65;">Common things people ask about:</p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li><strong>Exclusivity:</strong> we do NOT require it. Sign with us AND keep all your other channels.</li>
<li><strong>Commission rate:</strong> 10% is the default; lower is unusual but we have done it for very high-volume operators. Higher only if mutual + written.</li>
<li><strong>Payment terms:</strong> NET-15 is standard but NET-30 is fine if your AP needs. Quarterly ledger if monthly is too much paperwork.</li>
<li><strong>Branding:</strong> your name, your photos, your booking flow. We never present <strong>{{Name of Organization}}</strong> as our own product.</li>
</ul>
${btn("tel:8089949034", "Talk it out with Ashley – (808) 994-9034", "#7c2d12")}`,
  ),
};

const LUX_DIRECT_FU3 = {
  subject: "A Reciprocal Offer to Lock In the Direct Affiliate Partnership",
  text: `Hi {{Name}},

To make saying yes even easier, here is a small reciprocal offer:

If you sign with us this month, we will:
1. Feature {{Name of Organization}} on the homepage hero rotation of hawaiiluxuryresource.com for 14 days
2. Pay your first $500 of commission as guaranteed minimum (so even if our first month sends you fewer bookings, you still get paid – we absorb the rest)
3. Build a custom UTM-tagged landing page on our site for your tour with your photos, your description, your call-to-action

That is real money on our end with no obligation on yours.

If now is not the right time – fine. We will keep the slot warm for 30 days then move on. Either way, my line and Ashley's line stay open: 808-393-0153 / 808-994-9034.

Eric${NS_FOOTER_TEXT}`,
  html: fbox(
    "#7c2d12",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">To make saying yes even easier, here is a small reciprocal offer:</p>
<p style="margin:0 0 10px;font-size:15px;line-height:1.65;">If you sign with us this month, we will:</p>
<ol style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li>Feature <strong>{{Name of Organization}}</strong> on the homepage hero rotation of hawaiiluxuryresource.com for <strong>14 days</strong></li>
<li>Pay your first <strong>$500 of commission as guaranteed minimum</strong> – even if our first month sends you fewer bookings, you still get paid; we absorb the rest</li>
<li>Build a <strong>custom UTM-tagged landing page</strong> on our site for your tour with your photos, your description, your call-to-action</li>
</ol>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Real money on our end. Zero obligation on yours.</p>
${btn("tel:8089949034", "Lock in with Ashley – (808) 994-9034", "#7c2d12")}`,
  ),
};

const LUX_DIRECT_FU4 = {
  subject: "Final Note and Our Direct Affiliate Terms Stay Locked",
  text: `Hi {{Name}},

Last touch. We have moved on to actively building partnerships with the operators who said yes, but the offer for {{Name of Organization}} stays good until you tell us otherwise.

For your records:
- Default 10% commission, reviewed annually (§ 6.6 of the contract)
- NET-15 settlement, monthly ledger
- No exclusivity
- Ashley (vendor onboarding): 808-994-9034
- Eric (founder): 808-393-0153 / coralcrowntechnologies@gmail.com${SOFT_CLOSE_TEXT}

Best of luck with your season, {{Name}}.${NS_FOOTER_TEXT}`,
  html: fbox(
    "#94a3b8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Last touch. We have moved on to actively building partnerships with the operators who said yes, but the offer for <strong>{{Name of Organization}}</strong> stays good until you tell us otherwise.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">For your records:</p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li>Default 10% commission, reviewed annually (§ 6.6)</li>
<li>NET-15 settlement, monthly ledger</li>
<li>No exclusivity</li>
<li>Ashley (vendor onboarding): <strong>808-994-9034</strong></li>
<li>Eric (founder): 808-393-0153</li>
</ul>
${SOFT_CLOSE_HTML}
<p style="margin:14px 0 0;font-size:14px;color:#334155;">Best of luck with your season, {{Name}}.</p>`,
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// RAP CENTRAL – RAPPERS + MANAGEMENT (booking engine onboarding)
// ─────────────────────────────────────────────────────────────────────────────
const RAP_CENTRAL_BRAND_IMG_BASE = "https://smoothsales-app.vercel.app/assets/rap";

const RAP_CENTRAL_BRAND_HTML = `<div style="text-align:center;margin:0 0 18px;">
<img src="${RAP_CENTRAL_BRAND_IMG_BASE}/rap-booking-engine-banner.png" alt="The Premiere Rap Artist Booking Engine" width="560" style="display:block;margin:0 auto 10px;max-width:100%;height:auto;border-radius:8px;" />
<img src="${RAP_CENTRAL_BRAND_IMG_BASE}/rap-com-logo.png" alt="Rap Central (formerly Rap.com)" width="96" height="96" style="display:inline-block;margin:0 auto;width:96px;height:96px;border-radius:14px;" />
</div>`;

const RAP_CENTRAL_MANIFESTO_TEXT = `--- Thug's Mansion (why we're here) ---
Rap Central is Thug's Mansion, and exists to meet every challenge those involved in the rap industry face today. We are determined to break the mold and forge a new path for artists. We are finding the best resources for you, interviewing experts, discovering new talent, bringing together rap artists from all over the globe, finding tours you can perform on, and endorsing cool brands. We welcome you to the family.

"Ain't no place I'd rather be, chillin' with homies and family, sky high, iced out paradise in the sky, ain't no place I'd rather be, only place that's right for me, chromed out mansion in paradise in the sky." — Tupac

Thug's Mansion tribute: https://youtu.be/sGN0N8Sz2mk
Original Rap.com (2016 archive): https://web.archive.org/web/20160313071239/http://rap.com/`;

const RAP_CENTRAL_MANIFESTO_HTML = `<div style="background:linear-gradient(135deg,rgba(126,34,206,0.08),rgba(0,0,0,0.04));border:1px solid rgba(126,34,206,0.28);border-radius:14px;padding:18px 20px;margin:22px 0 6px;">
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.14em;color:#7e22ce;text-transform:uppercase;">Thug's Mansion — why we're here</p>
<p style="margin:0 0 12px;font-size:14px;line-height:1.65;color:#334155;">Rap Central is Thug's Mansion, and exists to meet every challenge those involved in the rap industry face today. We are determined to break the mold and forge a new path for artists. We are finding the best resources for you, interviewing experts, discovering new talent, bringing together rap artists from all over the globe, finding tours you can perform on, and endorsing cool brands. We welcome you to the family.</p>
<blockquote style="margin:0 0 12px;padding:10px 14px;border-left:3px solid #7e22ce;font-style:italic;background:rgba(255,255,255,0.5);border-radius:0 8px 8px 0;font-size:13.5px;line-height:1.6;color:#334155;">"Ain't no place I'd rather be, chillin' with homies and family, sky high, iced out paradise in the sky, ain't no place I'd rather be, only place that's right for me, chromed out mansion in paradise in the sky." <span style="display:block;margin-top:6px;font-style:normal;font-weight:700;color:#7e22ce;">— Tupac</span></blockquote>
<a href="https://youtu.be/sGN0N8Sz2mk" style="display:block;position:relative;margin:10px 0;border-radius:10px;overflow:hidden;text-decoration:none;" target="_blank" rel="noopener"><img src="https://i.ytimg.com/vi/sGN0N8Sz2mk/hqdefault.jpg" alt="Thug's Mansion tribute video thumbnail" width="480" height="270" style="display:block;width:100%;max-width:480px;height:auto;border-radius:10px;filter:brightness(0.82);" /><span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:42px;color:#fff;text-shadow:0 4px 14px rgba(0,0,0,0.5);pointer-events:none;">▶</span></a>
<p style="margin:6px 0 0;font-size:12.5px;line-height:1.55;color:#475569;">Original Rap.com (2016 archive): <a href="https://web.archive.org/web/20160313071239/http://rap.com/" target="_blank" rel="noopener" style="color:#7e22ce;font-weight:600;">web.archive.org/rap.com</a> · Thug's Mansion tribute: <a href="https://youtu.be/sGN0N8Sz2mk" target="_blank" rel="noopener" style="color:#7e22ce;font-weight:600;">youtu.be/sGN0N8Sz2mk</a></p>
</div>`;

const RAP_RAPPERS = {
  subject: "Rap Central Artist Booking Engine (Formerly Rap.com) and a Five Percent Flat Fee to Route Promoter Offers Directly to You",
  text: `Hi {{Name}},

I used to run Rap.com (here's the 2016 archive: https://web.archive.org/web/20160313071239/http://rap.com/) and we're relaunching 10 years later as Rap Central — the artist booking network that connects promoters directly with talent, with tools for lyricists, producers, and everyone else in the rap industry.

The core of it is the Rap Artist Booking Engine: a single coordination layer where event promoters submit structured booking requests, and our system routes them directly to artists (or management) — with deal terms, dates, riders, and budgets pre-filled and ready to accept, counter, or pass.

The pitch in one paragraph:
- For artists: zero up-front cost, zero exclusivity, zero competing booking offers from us. We take 5% of the total payment ONLY when a deal closes through our engine. If a promoter you would have heard from anyway sends you an offer, we collect nothing.
- For promoters: a single, vetted intake that gets a real response within 48–72 hours, with confirmed dates and an actual contract path.

What we need from {{Name of Organization}} to get you on the engine (~5 minutes by email):
1. Confirmed booking contact (management, agent, or attorney) – name + email
2. Show requirements / rider essentials – sound, stage, timing, set length
3. Travel + accommodations standards – flights (class + city of origin), ground transport, hotel star rating + suite preference, per-diem
4. Minimum performance fee tiers – festival headline, opening, club / private
5. Restrictions – geography, calendar blackouts, brand exclusivities, etc.

Once we have those, you can stay completely passive — the engine routes only requests that match your tiers and preferences directly to your designated booking contact, with our 5% built into the gross. Your team replies "yes / no / counter" and the rest is paperwork.

This is built to be the fastest, lowest-friction way for serious promoters to reach serious artists — without the noise of cold DMs, scraped emails, or unverified pitches.

If you (or whoever handles bookings for you) wants to chat first, my number is 808-393-0153 and our partnerships line is 808-994-9034. Or reply with the booking contact and we will reach out directly.

Thank you for considering it.

Eric Schaefer
Rap Central (formerly Rap.com) – Rap Artist Booking Engine
coralcrowntechnologies@gmail.com

${RAP_CENTRAL_MANIFESTO_TEXT}${NS_FOOTER_TEXT}`,
  html: card(
    "#7e22ce",
    "rgba(126,34,206,0.22)",
    "Rap Central — formerly Rap.com",
    "5% to route promoter offers directly to you",
    "Zero up-front. Zero exclusivity. Zero competing offers from us.",
    `${RAP_CENTRAL_BRAND_HTML}
<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">I used to run <strong>Rap.com</strong> — <a href="https://web.archive.org/web/20160313071239/http://rap.com/" target="_blank" rel="noopener" style="color:#7e22ce;font-weight:600;">here's the 2016 archive</a> — and we're relaunching 10 years later as <strong>Rap Central</strong>, the artist booking network that connects promoters directly with talent, with tools for lyricists, producers, and everyone else in the rap industry.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">The core of it is the <strong>Rap Artist Booking Engine</strong>: a single coordination layer where event promoters submit structured booking requests, and our system routes them directly to artists (or management) — with deal terms, dates, riders, and budgets pre-filled and ready to accept, counter, or pass.</p>
<div style="background:#faf5ff;border:1px solid rgba(126,34,206,0.25);border-radius:14px;padding:18px 20px;margin:18px 0;">
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.14em;color:#581c87;text-transform:uppercase;">The pitch in one paragraph</p>
<p style="margin:0 0 10px;font-size:14px;color:#581c87;line-height:1.7;"><strong>For artists:</strong> zero up-front cost, zero exclusivity, zero competing booking offers from us. We take <strong>5% of the total payment ONLY when a deal closes through our engine</strong>. If a promoter you would have heard from anyway sends you an offer, we collect nothing.</p>
<p style="margin:0;font-size:14px;color:#581c87;line-height:1.7;"><strong>For promoters:</strong> a single vetted intake that gets a real response within 48–72 hours, with confirmed dates and an actual contract path.</p>
</div>
<p style="margin:18px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.14em;color:#7e22ce;text-transform:uppercase;">What we need from {{Name of Organization}} (~5 minutes by email)</p>
<ol style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.75;">
<li>Confirmed <strong>booking contact</strong> (management / agent / attorney) – name + email</li>
<li>Show requirements / rider essentials – sound, stage, timing, set length</li>
<li>Travel + accommodations – flights (class + city of origin), ground transport, hotel star + suite preference, per-diem</li>
<li>Minimum <strong>performance fee tiers</strong> – festival headline, opening, club / private</li>
<li>Restrictions – geography, calendar blackouts, brand exclusivities, etc.</li>
</ol>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;">Once we have those, you can stay <strong>completely passive</strong> — the engine routes only requests that match your tiers and preferences directly to your designated booking contact, with our 5% built into the gross. Your team replies "yes / no / counter" and the rest is paperwork.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;">This is built to be the fastest, lowest-friction way for serious promoters to reach serious artists — without the noise of cold DMs, scraped emails, or unverified pitches.</p>
<div style="background:#f3e8ff;border:1px solid rgba(126,34,206,0.3);border-radius:14px;padding:16px 18px;margin:18px 0;">
<p style="margin:0;font-size:14px;color:#581c87;line-height:1.6;">Reply with the booking contact and we will reach out directly. Or call us first: <strong>(808) 393-0153</strong> Eric / <strong>(808) 994-9034</strong> partnerships.</p>
</div>
${btn("mailto:coralcrowntechnologies@gmail.com?subject=Rap%20Central%20booking%20engine%20-%20{{Name of Organization}}", "Reply with booking contact", "#7e22ce")}
${RAP_CENTRAL_MANIFESTO_HTML}`,
  ),
};

const RAP_RAPPERS_FU1 = {
  subject: "Did Our Rap Central Booking Engine Note Reach the Right Person on Your Team?",
  text: `Hi {{Name}},

Quick follow-up on the Rap Central (formerly Rap.com — 2016 archive: https://web.archive.org/web/20160313071239/http://rap.com/) booking engine note. Wanted to make sure it landed with whoever handles {{Name of Organization}}'s bookings – sometimes the right person is a manager, agent, or attorney rather than the public-facing email.

If you can forward to them (or send me their direct email), I will move it through quietly with no inbox flood for you. Or have them text/call our partnerships line at 808-994-9034.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#7e22ce",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Quick follow-up on the <strong>Rap Central</strong> (formerly Rap.com — <a href="https://web.archive.org/web/20160313071239/http://rap.com/" target="_blank" rel="noopener" style="color:#7e22ce;font-weight:600;">2016 archive</a>) booking engine note. Just making sure it landed with whoever handles bookings for <strong>{{Name of Organization}}</strong>.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">Forward to them (or send me their direct email) and I will move it through quietly. Or have them text/call partnerships at <strong>808-994-9034</strong>.</p>
${btn("tel:8089949034", "Partnerships line – (808) 994-9034", "#7e22ce")}`,
  ),
};

const RAP_RAPPERS_FU2 = {
  subject: "Is a Five Percent Flat Fee Lower Than What You Currently Pay for Cold Inbound Booking Inquiries?",
  text: `Hi {{Name}},

Honest question, not a pitch. Most artists I have talked to either pay an agent 10–15% on cold inbound or eat the time-cost of sorting cold DMs themselves. The Rap Central (formerly Rap.com) engine is 5% on closed deals only, with the lead-quality filter built in.

So the real question for you: is 5% with structured intake worth it vs. what you currently do for cold inbound? If yes – let us add you. If no – tell me why and I will respect it.

Either way, no exclusivity, no opt-in fee, no commitment until a deal actually closes.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#7e22ce",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Honest question. Most artists either pay an agent <strong>10–15% on cold inbound</strong> or eat the time-cost of sorting cold DMs themselves. The <strong>Rap Central</strong> (formerly Rap.com) engine is <strong>5% on closed deals only</strong>, with lead-quality filtering built in.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Real question: is 5% with structured intake worth it vs. what you currently do for cold inbound? If yes – let us add you. If no – tell me why and I will respect it.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">No exclusivity, no opt-in fee, no commitment until a deal actually closes.</p>
${btn("tel:8089949034", "Partnerships – (808) 994-9034", "#7e22ce")}`,
  ),
};

const RAP_RAPPERS_FU3 = {
  subject: "A Featured Spotlight on Rap Central for Every Artist Who Onboards This Month",
  text: `Hi {{Name}},

Small reciprocal offer to make joining the engine even more worth your team's time:

If you onboard this month, I will give {{Name of Organization}} a featured artist spotlight on Rap Central (formerly Rap.com — here's the 2016 archive: https://web.archive.org/web/20160313071239/http://rap.com/) – above-the-fold homepage rotation, dedicated artist page with your booking link (your team's email or your engine intake), and a journal article about your last project / current tour.

That is real organic traffic from a domain dedicated to rap, no extra cost, no exclusivity. Even if you never close a single engine booking through us, you keep the spotlight and the page.

Reply with your booking contact (or have them reach out at 808-994-9034) and we will set it up this week.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#7e22ce",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Small reciprocal offer to make joining the engine even more worth your team's time:</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If you onboard this month, I will give <strong>{{Name of Organization}}</strong> a <strong>featured artist spotlight on Rap Central</strong> (formerly Rap.com — <a href="https://web.archive.org/web/20160313071239/http://rap.com/" target="_blank" rel="noopener" style="color:#7e22ce;font-weight:600;">2016 archive</a>) – above-the-fold homepage rotation, dedicated artist page with your booking link, and a journal article about your last project / current tour.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">Real organic traffic from a rap-dedicated domain, no extra cost, no exclusivity. Even if you never close an engine booking through us, you keep the spotlight and the page.</p>
${btn("mailto:coralcrowntechnologies@gmail.com?subject=Rap%20Central%20spotlight%20-%20{{Name of Organization}}", "Reply with booking contact", "#7e22ce")}`,
  ),
};

const RAP_RAPPERS_FU4 = {
  subject: "Final Note and the Rap Central Door Stays Open",
  text: `Hi {{Name}},

Last note. We will keep building the engine and onboarding the artists who said yes. The door is open for {{Name of Organization}} whenever you (or your team) want to revisit.

For the file:
- 5% only on closed deals, no opt-in fee, no exclusivity
- Featured artist spotlight if onboarded
- Partnerships: 808-994-9034
- Eric: 808-393-0153 / coralcrowntechnologies@gmail.com${SOFT_CLOSE_TEXT}

Respect to {{Name of Organization}}.

Eric${NS_FOOTER_TEXT}`,
  html: fbox(
    "#94a3b8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Last note. We will keep building the engine and onboarding the artists who said yes. The door is open for <strong>{{Name of Organization}}</strong> whenever you want to revisit.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">For the file:</p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li>5% only on closed deals · no opt-in fee · no exclusivity</li>
<li>Featured artist spotlight if onboarded</li>
<li>Partnerships: <strong>808-994-9034</strong></li>
<li>Eric: 808-393-0153</li>
</ul>
${SOFT_CLOSE_HTML}
<p style="margin:14px 0 0;font-size:14px;color:#334155;">Respect to {{Name of Organization}}.</p>`,
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// RAP CENTRAL – MANAGERS / BOOKING AGENTS (Contract #5, 3%/2% split)
// ─────────────────────────────────────────────────────────────────────────────

const RAP_MGR_ACCENT = "#0e7490";
const RAP_MGR_ACCENT_SOFT = "rgba(14,116,144,0.18)";
const RAP_MGR_CONTRACT_URL = "https://www.prayerauthority.com/rap.com-static/contracts/booking-agent-agreement.html";
const RAP_MGR_ROLODEX_URL = "https://www.prayerauthority.com/rap.com-static/rolodex.html#managers";
const RAP_MGR_PARTNERS_URL = "https://www.prayerauthority.com/rap.com-static/partners/managers.html";
const RAP_MGR_INTAKE_HELP_URL =
  "https://www.prayerauthority.com/business-docs/services/rap-central/RAP-MANAGER-PROMOTER-HANDOFF.md";

const RAP_MGR = {
  subject: "Would 3% extra on Rap-Central-sourced bookings be useful at {{Name of Organization}}?",
  text: `Hi {{Name}},

I run Rap Central (formerly Rap.com — here's the 2016 archive so you know we are not new to this: https://web.archive.org/web/20160313071239/http://rap.com/). We are relaunching as a curated artist-to-promoter booking network ten years later.

We already have your firm listed in our public routing rolodex because we know your roster well and the artists we pitch regularly come through teams like yours. I wanted to send a heads up on Contract #5, which is specifically written so routing through us does not touch your existing deal with your artist.

How it works for a manager / booking agent:
- Your management or agency commission with your artist stays 100 percent the way you have it today.
- On any show Rap Central sources, the artist pays a flat 5 percent booking fee — split 3 percent to you for the routing / approval layer, 2 percent to us for vetted promoter infrastructure.
- Shows you source on your own owe us nothing. Written intro records decide what is ours.
- Non-exclusive, month to month, 30-day out, symmetric 18-month anti-circumvention so nobody gets cut out either way.

Why we added the 3 percent: your approval layer is real work (contract review, production, settlement). Most routing networks ignore that and just take a flat cut on top of the artist. We wanted a structure a veteran manager would actually sign.

The full contract is here (v1.0, e-signable, no DocuSign account needed): ${RAP_MGR_CONTRACT_URL}

What we need from you so we do not mispitch promoters: a one-time snapshot (bullets are fine) — (1) fee floor and any flex, (2) what the promoter must provide on production / PA, (3) travel and lodging, (4) hospitality must-haves, (5) blackouts and boundaries, (6) who signs and payee. Checklist: ${RAP_MGR_INTAKE_HELP_URL}

No rush. If it is interesting, sign it at your pace and we start feeding vetted promoter briefs that match your artists' Base Fee Floor.

Eric Schaefer
Coral Crown Solutions, LLC — Rap Central partnerships
(808) 393-0153${NS_FOOTER_TEXT}`,
  html: card(
    RAP_MGR_ACCENT,
    RAP_MGR_ACCENT_SOFT,
    "Rap Central · Contract #5 — Manager / agent routing",
    "Would 3% on Rap-Central-sourced bookings be useful at {{Name of Organization}}?",
    "Your artist deal stays untouched. We route vetted promoter briefs, you keep approval, fee split is 3/2.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">I run <strong>Rap Central</strong> (formerly Rap.com — <a href="https://web.archive.org/web/20160313071239/http://rap.com/" target="_blank" rel="noopener" style="color:${RAP_MGR_ACCENT};font-weight:600;">2016 archive</a>). We are relaunching as a curated artist-to-promoter booking network ten years later, and your firm is already listed in our public routing rolodex because we know your roster.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;"><strong>How Contract #5 works for you:</strong></p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;color:#1e293b;">
<li>Your management / agency commission with your artist stays <strong>100% untouched</strong>.</li>
<li>On shows <em>we</em> source, the artist pays a flat <strong>5% booking fee</strong>, split <strong>3% to you</strong> (routing / approval layer) + 2% to us (vetted promoter infra).</li>
<li>Shows <em>you</em> source owe us nothing. Written intro records decide what's ours.</li>
<li>Non-exclusive, month-to-month, 30-day out, symmetric 18-month anti-circumvention.</li>
</ul>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;"><strong>Why the 3%:</strong> your approval layer is real work. Most routing networks ignore that and just stack a fee on top of the artist. We wanted a structure a veteran manager would actually sign.</p>
${btn(RAP_MGR_CONTRACT_URL, "Read &amp; e-sign Contract #5 →", RAP_MGR_ACCENT)}
<p style="margin:14px 0 0;font-size:14px;line-height:1.65;color:#334155;"><strong>So we don&rsquo;t mispitch promoters</strong> — when you&rsquo;re ready, send a <strong>one-time snapshot</strong> (bullets are fine): (1) fee floor + flex, (2) what the <strong>promoter must provide</strong> (PA, mics, subs, in-ears&hellip;), (3) travel &amp; lodging, (4) hospitality must-haves, (5) blackouts &amp; boundaries, (6) who signs &amp; payee. <a href="${RAP_MGR_INTAKE_HELP_URL}" style="color:${RAP_MGR_ACCENT};font-weight:600;">Full intake checklist (same wording we use internally)</a>.</p>
<p style="margin:14px 0 0;font-size:13px;line-height:1.6;color:#64748b;">No rush. Sign at your pace and we start feeding vetted promoter briefs that match your artists' Base Fee Floor.</p>`,
  ),
};

const RAP_MGR_FU1 = {
  subject: "Quick clarification on the 3/2 split for {{Name of Organization}}",
  text: `Hi {{Name}},

Following up on the Contract #5 note. Two questions we get from most managers, in case they are yours:

1) "Does this touch my artist deal?"
   No. Your commission with your artist flows exactly the way it does today. Rap Central's 5 percent comes out of the artist's gross performance fee on its own line. Your 3 percent referral comes out of that 5 — not out of your management cut, not out of the artist's take-home.

2) "What if I book them somewhere we found on our own?"
   You owe us nothing. Rap Central only earns on shows we introduced via written intro. Ambiguous cases default to no fee to us.

If the structure still feels interesting, the contract is still here: ${RAP_MGR_CONTRACT_URL}
Live rolodex (your firm is already listed): ${RAP_MGR_ROLODEX_URL}

If you already signed or are close: reply with the six-line snapshot (fee floor, what you need from promoters on production, travel, hospitality, blackouts, who signs) so our promoter desk has your real rider — checklist: ${RAP_MGR_INTAKE_HELP_URL}

Eric — (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    RAP_MGR_ACCENT,
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Two questions we get from most managers, in case they're yours:</p>
<p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#0f172a;">1) Does this touch my artist deal?</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;">No. Your commission with your artist flows exactly as it does today. Rap Central's 5% comes out of the artist's gross performance fee on its own line. Your 3% routing share comes out of that 5 — not out of your management cut and not out of the artist's take-home.</p>
<p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#0f172a;">2) What if I book them somewhere we found on our own?</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;">You owe us nothing. Rap Central only earns on shows we introduced in writing. Ambiguous cases default to no fee to us.</p>
${btn(RAP_MGR_CONTRACT_URL, "Re-read the contract →", RAP_MGR_ACCENT)}
<p style="margin:14px 0 0;font-size:14px;line-height:1.65;color:#334155;">Signed or close? Reply with the <strong>six-line snapshot</strong> (fee floor, promoter production minimums, travel, hospitality, blackouts, who signs) so we brief promoters correctly — <a href="${RAP_MGR_INTAKE_HELP_URL}" style="color:${RAP_MGR_ACCENT};font-weight:600;">checklist</a>.</p>
<p style="margin:14px 0 0;font-size:13px;color:#64748b;">Live rolodex (your firm is already listed): <a href="${RAP_MGR_ROLODEX_URL}" style="color:${RAP_MGR_ACCENT};font-weight:600;">rap-central-static/rolodex#managers</a>.</p>`,
  ),
};

const RAP_MGR_FU2 = {
  subject: "Three promoter briefs on the desk this week — any of your artists a fit?",
  text: `Hi {{Name}},

Concrete instead of abstract: three promoter briefs that cleared vetting this week:

- CHH college + chapel tour, Mountain West circuit, spring 2026, sub-$35k ask per date
- Mid-size club, Pacific NW, late-night hip-hop showcase, sub-$50k per headliner
- Hawai'i tour stop (Oahu + Maui), summer 2026, 3,000 cap venue, $75-$120k band

These are routed through Contract #4 promoters (license + insurance verified, no wage-claim history on record). If any of your artists on {{Name of Organization}}'s roster would be a fit, reply and I will pull the full brief on your side of the wall.

If Contract #5 is not on your radar yet, no problem — you can read or sign it here without committing to any of the three briefs above: ${RAP_MGR_CONTRACT_URL}

Eric — (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    RAP_MGR_ACCENT,
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Concrete instead of abstract — three promoter briefs that cleared Contract #4 vetting this week:</p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;color:#1e293b;">
<li>CHH <strong>college + chapel tour</strong>, Mountain West circuit, spring 2026, sub-$35k per date.</li>
<li><strong>Mid-size club</strong>, Pacific NW, late-night hip-hop showcase, sub-$50k per headliner.</li>
<li><strong>Hawai'i tour stop</strong> (Oahu + Maui), summer 2026, 3,000 cap, $75-$120k band.</li>
</ul>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">If anyone on the <strong>{{Name of Organization}}</strong> roster fits, reply and I'll pull the full brief on your side of the wall.</p>
${btn(RAP_MGR_CONTRACT_URL, "Read Contract #5 →", RAP_MGR_ACCENT)}`,
  ),
};

const RAP_MGR_FU3 = {
  subject: "Small reciprocal: a featured manager / agency card on our rolodex this month",
  text: `Hi {{Name}},

Small reciprocal offer to make signing Contract #5 easier to say yes to:

If {{Name of Organization}} onboards this month, I'll give the firm a featured card on our Managers, Agents and Labels rolodex (${RAP_MGR_ROLODEX_URL}) — bumped above-the-fold, your roster highlighted, and a line about your signature work. That is real organic exposure from a rap-dedicated domain, cost to you: zero.

Even if we never close a routed show through Contract #5, the feature stays up for 90 days on the house.

The contract: ${RAP_MGR_CONTRACT_URL}
Reply with a good email or a time and I will walk it end to end in 10 minutes.

Eric — (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    RAP_MGR_ACCENT,
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Small reciprocal to make signing Contract #5 easier to say yes to:</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If <strong>{{Name of Organization}}</strong> onboards this month, I'll give the firm a <strong>featured card on our Managers, Agents &amp; Labels rolodex</strong> — bumped above the fold, your roster highlighted, a line about your signature work. Real organic exposure from a rap-dedicated domain, <strong>cost to you: zero</strong>.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;">Even if we never close a routed show through Contract #5, the feature stays up for 90 days on the house.</p>
${btn("mailto:coralcrowntechnologies@gmail.com?subject=Rap%20Central%20%E2%80%94%20Contract%20%235%20walkthrough%20for%20{{Name of Organization}}", "Reply with a time — 10 min walkthrough", RAP_MGR_ACCENT)}`,
  ),
};

const RAP_MGR_FU4 = {
  subject: "Final note — the door stays open for {{Name of Organization}}",
  text: `Hi {{Name}},

Last note on this thread. We will keep building and onboarding the firms that said yes. The door is open for {{Name of Organization}} whenever you or your team want to revisit.

For the file:
- Contract #5 (routing agreement): ${RAP_MGR_CONTRACT_URL}
- 3 percent to you + 2 percent to us on Rap-Central-sourced shows only
- Your artist deal: untouched
- Non-exclusive, 30-day out, symmetric 18-month anti-circumvention
- Partnerships: (808) 994-9034 · coralcrowntechnologies@gmail.com
- Me: (808) 393-0153${SOFT_CLOSE_TEXT}

Respect to {{Name of Organization}}.

Eric${NS_FOOTER_TEXT}`,
  html: fbox(
    "#94a3b8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Last note on this thread. We'll keep building and onboarding the firms that said yes. The door is open for <strong>{{Name of Organization}}</strong> whenever you or your team want to revisit.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">For the file:</p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li><a href="${RAP_MGR_CONTRACT_URL}" style="color:${RAP_MGR_ACCENT};font-weight:600;">Contract #5 (routing agreement)</a></li>
<li>3% to you + 2% to us on Rap-Central-sourced shows only</li>
<li>Your artist deal: untouched</li>
<li>Non-exclusive, 30-day out, symmetric 18-month anti-circumvention</li>
<li>Partnerships: <strong>(808) 994-9034</strong> · coralcrowntechnologies@gmail.com</li>
<li>Eric: (808) 393-0153</li>
</ul>
${SOFT_CLOSE_HTML}
<p style="margin:14px 0 0;font-size:14px;color:#334155;">Respect to <strong>{{Name of Organization}}</strong>.</p>`,
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// RAP CENTRAL – PROMOTERS / VENUES (Contract #4, $0 promoter fee)
// ─────────────────────────────────────────────────────────────────────────────

const RAP_PROM_ACCENT = "#b8860b";
const RAP_PROM_ACCENT_SOFT = "rgba(184,134,11,0.18)";
const RAP_PROM_CONTRACT_URL = "https://www.prayerauthority.com/rap.com-static/contracts/promoter-agreement.html";
const RAP_PROM_PARTNERS_URL = "https://www.prayerauthority.com/rap.com-static/partners/promoters.html";

const RAP_PROMOTERS = {
  subject: "A vetted rap-artist brief pipeline for {{Name of Organization}} — $0 fee on your side",
  text: `Hi {{Name}},

I run Rap Central (formerly Rap.com — here's the 2016 archive so you know we are not new to this: https://web.archive.org/web/20160313071239/http://rap.com/). We are relaunching as a curated artist-to-promoter booking network ten years later.

{{Name of Organization}} is exactly the kind of buyer we built Contract #4 for — serious mid-market and festival-tier rooms with real production, real settlements, and a history of booking hip-hop. I wanted to send a heads up on what Contract #4 (Promoter / Venue Booking Agreement v1.0) actually does for you.

How it works for a promoter / venue / festival:
- Zero routing fee from you. Ever. The Rap Central 5 percent is paid by the artist out of their gross performance fee — it never sits on top of your ask.
- Every artist we route has a signed Contract #3 on file, Base Fee Floor we can share in the brief, and a designated booking contact who replies inside 48-72 hours.
- License and insurance check on intake. Nothing sketchy goes to an artist.
- 30-day out clause and non-exclusive. You keep every promoter relationship you already have.

What we need from you to send you vetted artist briefs:
- A signed Contract #4 (v1.0, e-signable, no DocuSign account required): ${RAP_PROM_CONTRACT_URL}
- Your 2026 target windows, room capacity tiers, and the rap / CHH lanes {{Name of Organization}} actually books.

If there is a good window on your calendar for 2026 and you tell me the ask, I will pull 3 matched artists back to you within a week — no commitment until a brief lands you want to run.

Eric Schaefer
Coral Crown Solutions, LLC — Rap Central partnerships
(808) 393-0153${NS_FOOTER_TEXT}`,
  html: card(
    RAP_PROM_ACCENT,
    RAP_PROM_ACCENT_SOFT,
    "Rap Central · Contract #4 — Promoter / venue routing",
    "A vetted rap-artist brief pipeline for {{Name of Organization}} — $0 fee on your side",
    "Every artist routed: signed Contract #3 on file, Base Fee Floor disclosed, 48-72 hour response SLA.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">I run <strong>Rap Central</strong> (formerly Rap.com — <a href="https://web.archive.org/web/20160313071239/http://rap.com/" target="_blank" rel="noopener" style="color:${RAP_PROM_ACCENT};font-weight:600;">2016 archive</a>). We are relaunching as a curated artist-to-promoter booking network ten years later.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;"><strong>How Contract #4 works for you:</strong></p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;color:#1e293b;">
<li><strong>Zero routing fee from you.</strong> Ever. The 5% is paid by the artist out of gross — it never sits on top of your ask.</li>
<li>Every artist we route has a <strong>signed Contract #3</strong> on file, Base Fee Floor disclosed, and a designated booking contact.</li>
<li>License + insurance check on intake. <strong>48-72 hour response SLA</strong> from artist teams.</li>
<li>Non-exclusive, 30-day out clause, symmetric 18-month anti-circumvention.</li>
</ul>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;"><strong>What we need from you:</strong> a signed Contract #4 and your 2026 target windows, cap tiers, and rap / CHH lanes you actually book.</p>
${btn(RAP_PROM_CONTRACT_URL, "Read &amp; e-sign Contract #4 →", RAP_PROM_ACCENT)}
<p style="margin:14px 0 0;font-size:13px;line-height:1.6;color:#64748b;">Tell me the window and ask — I'll pull 3 matched artists inside a week. No commitment until a brief lands you want to run.</p>`,
  ),
};

const RAP_PROMOTERS_FU1 = {
  subject: "Two questions most promoters ask us about the 5% artist-side fee",
  text: `Hi {{Name}},

Following up on the Contract #4 note. Two questions we get from most promoters, in case they are yours:

1) "Is the 5% actually coming off my ask, or off the artist's take?"
   Off the artist's take. The Rap Central 5 percent is a line inside the artist's settlement, not a markup on top of your offer. Your deal-memo number is the deal-memo number.

2) "What if the artist's agent or manager is already involved?"
   Then Contract #5 is also in play on the artist's side — the agent takes 3 percent, we take 2 percent, all out of the same 5 percent the artist agreed to. From your side, nothing changes. One deal memo, one settlement, one wire.

If the structure still feels interesting, the contract is still here: ${RAP_PROM_CONTRACT_URL}
Promoter pitch page with the full model: ${RAP_PROM_PARTNERS_URL}

Eric — (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    RAP_PROM_ACCENT,
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Two questions we get from most promoters, in case they're yours:</p>
<p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#0f172a;">1) Is the 5% actually coming off my ask?</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;">No. The 5% is a line <em>inside</em> the artist's settlement — not a markup on top of your offer. Your deal-memo number is the deal-memo number.</p>
<p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#0f172a;">2) What if the artist's agent or manager is already involved?</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;">Then Contract #5 runs on the artist's side: 3% to the agent, 2% to us, all out of the same 5% the artist already agreed to. From your side, <strong>nothing changes</strong>. One deal memo, one settlement, one wire.</p>
${btn(RAP_PROM_CONTRACT_URL, "Re-read Contract #4 →", RAP_PROM_ACCENT)}
<p style="margin:14px 0 0;font-size:13px;color:#64748b;">Promoter pitch page with the full model: <a href="${RAP_PROM_PARTNERS_URL}" style="color:${RAP_PROM_ACCENT};font-weight:600;">partners/promoters</a>.</p>`,
  ),
};

const RAP_PROMOTERS_FU2 = {
  subject: "Four artists we could route to {{Name of Organization}} right now",
  text: `Hi {{Name}},

Concrete instead of abstract — four artists on the current Rap Central rolodex who would be a realistic fit for a {{Name of Organization}} 2026 booking window, sorted by tier:

- Headline / theater-tier: Lecrae, Andy Mineo, Tobe Nwigwe — arena-tier market reach, disciplined production riders, 48-72 hour response SLA through their teams.
- Mid-market / club-tier: KB, Hulvey, Wande, Marty — 1k-2.5k cap rooms, strong regional college pull, flexible routing.
- Indie / hungry-tier: nobigdyl., WHATUPRG, Big Lou (Hawai'i), Island Reign (Hawai'i) — 500-1,200 cap, low-risk first bookings for a new Contract #4 relationship.
- Festival & church-tour: Social Club Misfits, Trip Lee, GAWVI — full-production festival sets, CHH crossover.

Each one is already on Contract #3 with us, Base Fee Floor disclosed, and routed through their actual manager / agent (not cold DMs).

If any of these tiers match a hold on your calendar, reply with the window and I will pull the full brief inside a week. Contract #4 here: ${RAP_PROM_CONTRACT_URL}

Eric — (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    RAP_PROM_ACCENT,
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Four artists on the Rap Central rolodex we could route to <strong>{{Name of Organization}}</strong> right now:</p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;color:#1e293b;">
<li><strong>Headline / theater-tier:</strong> Lecrae, Andy Mineo, Tobe Nwigwe.</li>
<li><strong>Mid-market / club-tier:</strong> KB, Hulvey, Wande, Marty.</li>
<li><strong>Indie / hungry-tier:</strong> nobigdyl., WHATUPRG, Big Lou (Hawai&#699;i), Island Reign (Hawai&#699;i).</li>
<li><strong>Festival &amp; church-tour:</strong> Social Club Misfits, Trip Lee, GAWVI.</li>
</ul>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;">Each one is on <strong>Contract #3</strong> with us, Base Fee Floor disclosed, routed through their actual manager / agent.</p>
${btn(RAP_PROM_CONTRACT_URL, "Read Contract #4 →", RAP_PROM_ACCENT)}
<p style="margin:14px 0 0;font-size:13px;color:#64748b;">Tell me which tier and window and I'll pull the full brief inside a week.</p>`,
  ),
};

const RAP_PROMOTERS_FU3 = {
  subject: "Small reciprocal: featured venue card on the Rap Central rolodex",
  text: `Hi {{Name}},

Small reciprocal offer to make signing Contract #4 easier to say yes to:

If {{Name of Organization}} signs Contract #4 this month, I'll give your venue / festival a featured card on the Rap Central rolodex — bumped above the fold, your room capacity + technical sheet highlighted, and a direct link to your booking team. That's real organic exposure from a rap-dedicated domain in front of every manager and agent we work with, cost to you: zero.

Even if we never close a routed show together through Contract #4, the feature stays up for 90 days on the house.

The contract: ${RAP_PROM_CONTRACT_URL}
Reply with a good time and I will walk it end to end in 10 minutes.

Eric — (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    RAP_PROM_ACCENT,
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Small reciprocal to make signing Contract #4 easier to say yes to:</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If <strong>{{Name of Organization}}</strong> signs this month, I'll give your venue / festival a <strong>featured card on the Rap Central rolodex</strong> — bumped above the fold, your room cap + tech sheet highlighted, direct link to your booking team. Real organic exposure from a rap-dedicated domain in front of every manager and agent we work with, <strong>cost to you: zero</strong>.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;">Even if we never close a routed show together, the feature stays up for 90 days on the house.</p>
${btn("mailto:coralcrowntechnologies@gmail.com?subject=Rap%20Central%20%E2%80%94%20Contract%20%234%20walkthrough%20for%20{{Name of Organization}}", "Reply with a time — 10 min walkthrough", RAP_PROM_ACCENT)}`,
  ),
};

const RAP_PROMOTERS_FU4 = {
  subject: "Final note — the door stays open for {{Name of Organization}}",
  text: `Hi {{Name}},

Last note on this thread. We will keep building the rolodex and signing rooms that said yes. The door is open for {{Name of Organization}} whenever you or your team want to revisit.

For the file:
- Contract #4 (promoter / venue agreement): ${RAP_PROM_CONTRACT_URL}
- $0 routing fee from your side — ever. The 5% is paid by the artist out of gross.
- Every artist routed: signed Contract #3, designated booking contact, 48-72 hour SLA.
- Non-exclusive, 30-day out, symmetric 18-month anti-circumvention.
- Partnerships: (808) 994-9034 · coralcrowntechnologies@gmail.com
- Me: (808) 393-0153${SOFT_CLOSE_TEXT}

Respect to {{Name of Organization}}.

Eric${NS_FOOTER_TEXT}`,
  html: fbox(
    "#94a3b8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Last note on this thread. We'll keep building the rolodex and signing rooms that said yes. The door is open for <strong>{{Name of Organization}}</strong> whenever you or your team want to revisit.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">For the file:</p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li><a href="${RAP_PROM_CONTRACT_URL}" style="color:${RAP_PROM_ACCENT};font-weight:600;">Contract #4 (promoter / venue agreement)</a></li>
<li>$0 routing fee from your side — ever. The 5% is paid by the artist out of gross.</li>
<li>Every artist routed: signed Contract #3, designated booking contact, 48-72 hour SLA.</li>
<li>Non-exclusive, 30-day out, symmetric 18-month anti-circumvention.</li>
<li>Partnerships: <strong>(808) 994-9034</strong> · coralcrowntechnologies@gmail.com</li>
<li>Eric: (808) 393-0153</li>
</ul>
${SOFT_CLOSE_HTML}
<p style="margin:14px 0 0;font-size:14px;color:#334155;">Respect to <strong>{{Name of Organization}}</strong>.</p>`,
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// CORGI CARE – BRAND SPONSORS (Stella, 13yo corgi, product placement)
// ─────────────────────────────────────────────────────────────────────────────

const CORGI_SPONSOR_ACCENT = "#b45309";
const CORGI_SPONSOR_ACCENT_SOFT = "rgba(180,83,9,0.18)";

const CORGI_SPONSOR_FOOTER_TEXT = `\n\nEric & Ashley Schaefer · Stella (corgi) + Mittens (ESA cat)\nHonolulu, HI · elionreigns@gmail.com · (808) 393-0153\nHonest reviews, honest posture — we'll tell you if it doesn't vibe.`;
const CORGI_SPONSOR_FOOTER_HTML = `<p style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(0,0,0,0.08);color:#64748b;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;opacity:0.95;">For Stella — a high-maintenance dog with an honest family</p><p style="margin:6px 0 0;font-size:14px;color:#334155;"><strong>Eric &amp; Ashley Schaefer</strong> · Stella (corgi) + Mittens (ESA cat) · <a href="mailto:elionreigns@gmail.com" style="color:${CORGI_SPONSOR_ACCENT};text-decoration:none;font-weight:600;">elionreigns@gmail.com</a> · (808) 393-0153</p><p style="margin:8px 0 0;font-size:12px;color:#64748b;">Honest reviews, honest posture — we'll tell you if it doesn't vibe.</p>`;

const CORGI_SPONSOR = {
  subject: "Hi from Stella — a 13-year-old corgi in Honolulu who'd love to feature your brand",
  text: `Hi {{Name}},

I'm reaching out on behalf of Stella, our 13-year-old Pembroke Welsh Corgi in Honolulu. She has a double coat and sensitive skin, which makes her a pretty honest test bed for the senior / coat-care / nutrition side of the pet world — and I've had {{Name of Organization}} on my shortlist of brands we'd love to work with.

Full disclosure up front: Stella is a high-maintenance dog. Her coat needs hand-scissoring (never a shave), she has a sensitive stomach, she's at the age where joints, dental, kidneys and cognition all matter, and she lives in Hawai'i so we have the tropical-climate angle a lot of creators on the mainland cannot offer. We are totally willing to work with all of that in exchange for authentic product placement and sponsorship.

Quick context so you know whether this is even worth a reply:
- We have Stella (13yo corgi) plus Mittens our ESA cat (2yo) — multi-pet household content is available if that's relevant to your line.
- In-home photo + short-video setup: Reels, TikTok, YouTube Shorts, plus lifestyle stills (beach, hike, lanai, couch).
- We are Honolulu-based at 688 Kalanipuu Street, 96825 — so shipping to Hawai'i takes a beat, but the content geography is very distinctive.
- Honest reviews only. If Stella doesn't vibe with the product we say so — which actually makes the good ones land harder.
- We are actively saving up for her teeth cleaning this year (~$400-$600 at a local vet) and ongoing coat maintenance — so dental, dental chews, oral care, coat tools, shampoos, and senior-nutrition brands are especially good fits.

My actual ask: does {{Name of Organization}} have an existing creator / ambassador / seed program we can apply to? If yes, great — point me at the application link. If not, I'd love to put together a small custom placement where you send Stella something from your line and she shows up on our channels with the product in use over 30 days, with full rights to repurpose the content for your own feeds.

Either way — no rush, no pressure. Even a "not right now" is a fine answer.

Thanks so much for reading,

Eric & Ashley Schaefer
Stella (corgi) + Mittens (ESA cat)
Honolulu, HI — elionreigns@gmail.com · (808) 393-0153${CORGI_SPONSOR_FOOTER_TEXT}`,
  html: card(
    CORGI_SPONSOR_ACCENT,
    CORGI_SPONSOR_ACCENT_SOFT,
    "Corgi Care · Brand sponsorship — Stella (13yo corgi)",
    "Hi from Stella — a 13-year-old corgi in Honolulu who'd love to feature your brand",
    "Honest posture: she's high-maintenance, we're 100% willing to work with it for authentic product placement + sponsorship.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">I'm writing on behalf of <strong>Stella</strong>, our 13-year-old Pembroke Welsh Corgi in Honolulu. Double coat, sensitive skin, which makes her a pretty honest test bed for the senior / coat / nutrition side of the pet world — and <strong>{{Name of Organization}}</strong> has been on my shortlist of brands we'd love to work with.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;"><strong>Full disclosure up front.</strong> Stella is a high-maintenance dog. Hand-scissor only (never a shave), sensitive stomach, 13-year-old joints / dental / kidneys / cognition story, and she lives in Hawai'i — so the content geography is distinctive. We're fully willing to work with all of that in exchange for authentic product placement and sponsorship.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;"><strong>Quick context:</strong></p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;color:#1e293b;">
<li>Stella (13yo corgi) + Mittens (our 2yo ESA cat) — multi-pet content available.</li>
<li>In-home Reel / TikTok / YouTube Short + lifestyle stills (beach, hike, lanai, couch).</li>
<li>Honolulu-based (688 Kalanipuu St, 96825) — Hawai'i shipping is a beat, the content is distinctive.</li>
<li>Honest reviews only — if Stella doesn't vibe with a product, we say so.</li>
<li>Currently saving up for her teeth cleaning (~$400-$600 local vet) + ongoing coat maintenance — dental / oral / coat / senior-nutrition / joint / bed / cooling brands are the cleanest fits.</li>
</ul>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;"><strong>The ask:</strong> does <strong>{{Name of Organization}}</strong> have an existing creator / ambassador / seed program we can apply to? Point me at the link if so. If not, I'd love to put together a small custom placement.</p>
${btn("mailto:elionreigns@gmail.com?subject=Re%3A%20Stella%20the%20Corgi%20%E2%80%94%20{{Name of Organization}}%20program", "Reply with your seeds program link →", CORGI_SPONSOR_ACCENT)}
<p style="margin:14px 0 0;font-size:13px;line-height:1.6;color:#64748b;">Either way — no rush, no pressure. A "not right now" is a fine answer.</p>
<p style="margin:14px 0 0;font-size:13px;line-height:1.6;color:#64748b;">Thanks — Eric &amp; Ashley Schaefer · Stella (corgi) + Mittens (ESA cat) · Honolulu HI</p>`,
    CORGI_SPONSOR_FOOTER_HTML,
  ),
};

const CORGI_SPONSOR_FU1 = {
  subject: "Quick follow-up on the Stella pitch — open to any seed program you run",
  text: `Hi {{Name}},

Just a gentle bump on the last note about Stella (our 13-year-old corgi in Honolulu).

If reviewing pitches isn't your lane, I totally get it — would you be willing to just forward my email to whoever on your team runs seeding, creator programs, or pet-parent partnerships? That usually gets the right person in two clicks.

Quick reminders of what we're offering:
- 30-day real-use review (photo + short video), honest angle, senior-dog + double-coat perspective.
- Full rights to repurpose everything we make for your own channels.
- Hawai'i-based content geography if that's a distinctive fit for your brand.

Thanks for the help —

Eric & Ashley Schaefer (for Stella)
elionreigns@gmail.com · (808) 393-0153${CORGI_SPONSOR_FOOTER_TEXT}`,
  html: fbox(
    CORGI_SPONSOR_ACCENT,
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Just a gentle bump on the last note about <strong>Stella</strong> (our 13-year-old corgi in Honolulu).</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If reviewing pitches isn't your lane, totally fine — would you forward to whoever on your team runs <strong>seeding, creator programs, or pet-parent partnerships</strong>? That usually gets to the right person in two clicks.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;"><strong>Quick reminders of what we're offering:</strong></p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;color:#1e293b;">
<li>30-day real-use review (photo + short video), senior-dog + double-coat perspective.</li>
<li>Full rights to repurpose everything we make for your own channels.</li>
<li>Hawai'i-based content geography if that fits your marketing calendar.</li>
</ul>
${btn("mailto:elionreigns@gmail.com?subject=Re%3A%20Stella%20the%20Corgi%20%E2%80%94%20{{Name of Organization}}%20program", "Point me at the right person →", CORGI_SPONSOR_ACCENT)}`,
    CORGI_SPONSOR_FOOTER_HTML,
  ),
};

const CORGI_SPONSOR_FU2 = {
  subject: "Three pieces of Stella content I can send you as proof of posture",
  text: `Hi {{Name}},

Still here — thought it might help to be concrete instead of abstract.

If you reply "yes show me," I'll send back three pieces of ready-to-go Stella content within the week:

1) A short Reel of her coat-brush routine (featuring whatever tool / shampoo / chew you'd want placed — or a neutral stand-in if we don't have product yet).
2) A senior-dog lanai lifestyle still (good for brand-feed repost).
3) A 60-second "a day with our 13-year-old corgi in Honolulu" voiceover-style clip.

No strings. Worst case you see what the baseline deliverable looks like and you file it away for later. Best case we start a real conversation about a seed + posting cycle this quarter.

Totally understand if it's a no from your side — a one-word reply is a gift.

Eric & Ashley (for Stella)
elionreigns@gmail.com · (808) 393-0153${CORGI_SPONSOR_FOOTER_TEXT}`,
  html: fbox(
    CORGI_SPONSOR_ACCENT,
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Being concrete instead of abstract — if you reply <em>"yes show me,"</em> I'll send three pieces of ready-to-go Stella content within the week:</p>
<ol style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;color:#1e293b;">
<li>Short Reel of her coat-brush routine (featuring whatever tool / shampoo / chew you want placed — or a neutral stand-in if we don't have product yet).</li>
<li>Senior-dog lanai lifestyle still (good for brand-feed repost).</li>
<li>60-second "a day with our 13-year-old corgi in Honolulu" voiceover-style clip.</li>
</ol>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;">No strings. Worst case, you see what the baseline deliverable looks like and file it for later.</p>
${btn("mailto:elionreigns@gmail.com?subject=Yes%20show%20me%20Stella%27s%20sample%20content", "Yes — send me the samples →", CORGI_SPONSOR_ACCENT)}`,
    CORGI_SPONSOR_FOOTER_HTML,
  ),
};

const CORGI_SPONSOR_FU3 = {
  subject: "Small reciprocal offer for {{Name of Organization}} — tagged Hawai'i feature",
  text: `Hi {{Name}},

Small reciprocal offer to make it easier to say yes.

If {{Name of Organization}} sends us a seed package this month, Stella will:
- Post a dedicated unboxing (Reel or TikTok) tagged with your brand and linked in our bio for 30 days.
- Do a 30-day honest-use follow-up post with before / during / after angle (especially powerful for dental, coat, joint, or sensitive-skin lines given Stella's age + coat type).
- Give you permanent permission to repost all of that content to your own channels with brand-specific captioning.

And — because we're a Honolulu household and most creators are mainland — we can attach a Hawai'i-lifestyle angle (beach, lanai, hike, hula-adjacent settings) if your marketing calendar has a summer / island / tropical push planned.

If none of that fits, I'll stop reaching out after one more short note. Appreciate you reading this far.

Eric & Ashley (for Stella)
elionreigns@gmail.com · (808) 393-0153${CORGI_SPONSOR_FOOTER_TEXT}`,
  html: fbox(
    CORGI_SPONSOR_ACCENT,
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Small reciprocal offer to make it easier to say yes.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;"><strong>If {{Name of Organization}} sends a seed package this month, Stella will:</strong></p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;color:#1e293b;">
<li>Dedicated unboxing (Reel or TikTok), tagged + linked in bio for 30 days.</li>
<li>30-day honest-use follow-up post with before / during / after angle — especially strong for <strong>dental, coat, joint, or sensitive-skin</strong> lines given Stella's age + coat type.</li>
<li>Permanent permission to repost all of that content to your own channels with brand-specific captioning.</li>
</ul>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;">Because we're a Honolulu household and most creators are mainland, we can attach a <strong>Hawai'i-lifestyle angle</strong> (beach, lanai, hike) if your calendar has a summer / island / tropical push planned.</p>
${btn("mailto:elionreigns@gmail.com?subject=Yes%20%E2%80%94%20send%20a%20seed%20package%20for%20Stella", "Send a seed package →", CORGI_SPONSOR_ACCENT)}`,
    CORGI_SPONSOR_FOOTER_HTML,
  ),
};

const CORGI_SPONSOR_FU4 = {
  subject: "Last note on Stella — door stays open for {{Name of Organization}}",
  text: `Hi {{Name}},

Last note on this thread. I'll stop clogging your inbox here — the door stays open for {{Name of Organization}} whenever it's useful.

For the file, in case it comes up in a brand-planning meeting down the road:
- Stella — 13yo Pembroke Welsh Corgi, double coat, sensitive skin, Honolulu HI.
- Mittens — 2yo ESA cat (available for multi-pet placements).
- In-home Reel / TikTok / YouTube Short setup. Full content rights to the brand. Honest senior-dog perspective.
- Saving up for teeth cleaning + ongoing coat maintenance — dental / oral / coat / senior-nutrition / joint / bed / cooling brands are the best fit.
- Contact: Eric & Ashley Schaefer — elionreigns@gmail.com · (808) 393-0153 · 688 Kalanipuu St, Honolulu HI 96825.${SOFT_CLOSE_TEXT}

Thanks for reading,

Eric & Ashley (for Stella)${CORGI_SPONSOR_FOOTER_TEXT}`,
  html: fbox(
    "#94a3b8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Last note on this thread. I'll stop clogging your inbox — the door stays open for <strong>{{Name of Organization}}</strong> whenever it's useful.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;"><strong>For the file:</strong></p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li><strong>Stella</strong> — 13yo Pembroke Welsh Corgi, double coat, sensitive skin, Honolulu HI.</li>
<li><strong>Mittens</strong> — 2yo ESA cat (multi-pet placement option).</li>
<li>In-home Reel / TikTok / YouTube Short setup. Full content rights to the brand.</li>
<li>Priority categories: dental / oral / coat / senior-nutrition / joint / bed / cooling.</li>
<li>Contact: Eric &amp; Ashley Schaefer — <a href="mailto:elionreigns@gmail.com" style="color:${CORGI_SPONSOR_ACCENT};font-weight:600;">elionreigns@gmail.com</a> · (808) 393-0153 · 688 Kalanipuu St, Honolulu HI 96825.</li>
</ul>
${SOFT_CLOSE_HTML}
<p style="margin:14px 0 0;font-size:14px;color:#334155;">Thanks for reading — Eric &amp; Ashley (for Stella).</p>`,
    CORGI_SPONSOR_FOOTER_HTML,
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// REGISTRY
// ─────────────────────────────────────────────────────────────────────────────

export const NEW_SERVICE_TEMPLATES: Record<NewServiceTemplateId, { subject: string; html: string; text: string }> = {
  // Apartments
  "apartments-individual": APT_INDIVIDUAL,
  "apartments-individual-followup-1": APT_INDIVIDUAL_FU1,
  "apartments-individual-followup-2": APT_INDIVIDUAL_FU2,
  "apartments-individual-followup-3": APT_INDIVIDUAL_FU3,
  "apartments-individual-followup-4": APT_INDIVIDUAL_FU4,
  "apartments-realtor": APT_REALTOR,
  "apartments-realtor-followup-1": APT_REALTOR_FU1,
  "apartments-realtor-followup-2": APT_REALTOR_FU2,
  "apartments-realtor-followup-3": APT_REALTOR_FU3,
  "apartments-realtor-followup-4": APT_REALTOR_FU4,
  // Corgi Care
  "corgi-care-hair": CORGI_HAIR,
  "corgi-care-hair-followup-1": CORGI_HAIR_FU1,
  "corgi-care-hair-followup-2": CORGI_HAIR_FU2,
  "corgi-care-hair-followup-3": CORGI_HAIR_FU3,
  "corgi-care-hair-followup-4": CORGI_HAIR_FU4,
  "corgi-care-teeth": CORGI_TEETH,
  "corgi-care-teeth-followup-1": CORGI_TEETH_FU1,
  "corgi-care-teeth-followup-2": CORGI_TEETH_FU2,
  "corgi-care-teeth-followup-3": CORGI_TEETH_FU3,
  "corgi-care-teeth-followup-4": CORGI_TEETH_FU4,
  "corgi-care-teeth-book-me": CORGI_TEETH_BOOK_ME,
  "corgi-care-hair-book-me": CORGI_HAIR_BOOK_ME,
  "corgi-care-military": CORGI_MILITARY,
  "corgi-care-military-followup-1": CORGI_MILITARY_FU1,
  "corgi-care-military-followup-2": CORGI_MILITARY_FU2,
  "corgi-care-military-followup-3": CORGI_MILITARY_FU3,
  "corgi-care-military-followup-4": CORGI_MILITARY_FU4,
  // Luxury Resource
  "luxury-resource-fareharbor": LUX_FH,
  "luxury-resource-fareharbor-followup-1": LUX_FH_FU1,
  "luxury-resource-fareharbor-followup-2": LUX_FH_FU2,
  "luxury-resource-fareharbor-followup-3": LUX_FH_FU3,
  "luxury-resource-fareharbor-followup-4": LUX_FH_FU4,
  "luxury-resource-direct": LUX_DIRECT,
  "luxury-resource-direct-followup-1": LUX_DIRECT_FU1,
  "luxury-resource-direct-followup-2": LUX_DIRECT_FU2,
  "luxury-resource-direct-followup-3": LUX_DIRECT_FU3,
  "luxury-resource-direct-followup-4": LUX_DIRECT_FU4,
  // Rap Central
  "rap-central-rappers": RAP_RAPPERS,
  "rap-central-rappers-followup-1": RAP_RAPPERS_FU1,
  "rap-central-rappers-followup-2": RAP_RAPPERS_FU2,
  "rap-central-rappers-followup-3": RAP_RAPPERS_FU3,
  "rap-central-rappers-followup-4": RAP_RAPPERS_FU4,
  "rap-central-managers": RAP_MGR,
  "rap-central-managers-followup-1": RAP_MGR_FU1,
  "rap-central-managers-followup-2": RAP_MGR_FU2,
  "rap-central-managers-followup-3": RAP_MGR_FU3,
  "rap-central-managers-followup-4": RAP_MGR_FU4,
  "rap-central-promoters": RAP_PROMOTERS,
  "rap-central-promoters-followup-1": RAP_PROMOTERS_FU1,
  "rap-central-promoters-followup-2": RAP_PROMOTERS_FU2,
  "rap-central-promoters-followup-3": RAP_PROMOTERS_FU3,
  "rap-central-promoters-followup-4": RAP_PROMOTERS_FU4,
  // Corgi Care – Brand sponsors (Stella)
  "corgi-care-sponsor": CORGI_SPONSOR,
  "corgi-care-sponsor-followup-1": CORGI_SPONSOR_FU1,
  "corgi-care-sponsor-followup-2": CORGI_SPONSOR_FU2,
  "corgi-care-sponsor-followup-3": CORGI_SPONSOR_FU3,
  "corgi-care-sponsor-followup-4": CORGI_SPONSOR_FU4,
};

export function isNewServiceTemplateId(id: string): id is NewServiceTemplateId {
  return id in NEW_SERVICE_TEMPLATES;
}

export function getNewServiceTemplate(
  id: NewServiceTemplateId,
): { subject: string; html: string; text: string } {
  return NEW_SERVICE_TEMPLATES[id];
}

/** Pretty labels for the dropdown UI. */
export const NEW_SERVICE_TEMPLATE_OPTIONS: { value: NewServiceTemplateId; label: string }[] = [
  { value: "apartments-individual", label: "Apartments – Individual landlord (Craigslist / FB Marketplace / FSBO)" },
  { value: "apartments-realtor", label: "Apartments – Realtor / property manager" },
  { value: "corgi-care-hair", label: "Corgi Care – Hair (groomers, deshed + blowout, NO shaving)" },
  { value: "corgi-care-hair-book-me", label: "Corgi Care – Hair BOOK ME (ready-to-book, 3 slots proposed)" },
  { value: "corgi-care-teeth", label: "Corgi Care – Teeth cleaning ($300–$500 budget, civilian vets)" },
  { value: "corgi-care-teeth-book-me", label: "Corgi Care – Teeth BOOK ME (ready-to-book, 3 slots proposed)" },
  { value: "corgi-care-military", label: "Corgi Care – Military VTF (cousin's corgi, bottom-dollar rate)" },
  { value: "luxury-resource-fareharbor", label: "Luxury Resource – FareHarbor partner (add us as affiliate)" },
  { value: "luxury-resource-direct", label: "Luxury Resource – Direct (non-FareHarbor – contract attached)" },
  { value: "rap-central-rappers", label: "Rap Central – Rappers + management (5% booking engine)" },
  { value: "rap-central-managers", label: "Rap Central – Managers / booking agents (Contract #5, 3%/2% split)" },
  { value: "rap-central-promoters", label: "Rap Central – Promoters / venues (Contract #4, $0 fee to promoter)" },
  { value: "corgi-care-sponsor", label: "Corgi Care – Brand sponsor / seed program (Stella, 13yo corgi)" },
];
