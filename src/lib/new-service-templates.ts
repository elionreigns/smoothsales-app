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

const SOFT_CLOSE_TEXT =
  " Thanks for your time. If this ever becomes a fit, we would love to hear from you. Take care.";
const SOFT_CLOSE_HTML =
  `<p style="margin:24px 0 0;font-size:14px;color:#475569;">Thanks for your time. If this ever becomes a fit, we would love to hear from you. Take care.</p>`;

/** Card wrapper used by every new template. `accent` is a hex color for header + buttons. */
function card(accent: string, accentSoft: string, kicker: string, headline: string, sub: string, body: string): string {
  return `<div style="font-family:'Segoe UI',system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border:1px solid ${accentSoft};border-radius:24px;overflow:hidden;box-shadow:0 20px 50px -15px ${accentSoft},0 10px 28px -8px rgba(0,0,0,0.08);">
<div style="background:linear-gradient(145deg,${accent} 0%,${accent} 60%,${accent} 100%);color:#fff;padding:30px 26px;text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;opacity:0.95;">${kicker}</p>
<h1 style="margin:0;font-size:24px;font-weight:800;letter-spacing:-0.02em;line-height:1.22;">${headline}</h1>
<p style="margin:14px 0 0;font-size:14px;line-height:1.5;opacity:0.95;">${sub}</p>
</div>
<div style="padding:30px 26px;color:#1e293b;">
<p style="margin:0 0 18px;font-size:15px;font-weight:600;color:#0f172a;">Hi {{Name}},</p>
${body}
${NS_FOOTER_HTML}
</div>
</div>`;
}

/** Button helper. */
function btn(href: string, label: string, accent: string): string {
  return `<p style="margin:18px 0 6px;"><a href="${href}" style="display:inline-block;background:${accent};color:#fff;padding:13px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:14px;">${label}</a></p>`;
}

/** Followup card – simpler box, with accent. */
function fbox(accent: string, body: string): string {
  return `<div style="font-family:'Segoe UI',system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border:2px solid ${accent};border-radius:20px;padding:26px;color:#1e293b;">
<p style="margin:0 0 16px;font-size:15px;font-weight:600;">Hi {{Name}},</p>
${body}
${NS_FOOTER_HTML}
</div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const HOUSING_NEEDS_TEXT =
  "We are an expecting couple (wife is pregnant – baby due summer 2026), 2 well-behaved dogs (corgi + corgi mix, hypoallergenic-shampoo trained), and we both work from home. We are looking in East Honolulu (Hawaii Kai / Aina Haina / Kahala / Niu Valley) for a 2BR/2BA at $1,900–$2,400/mo, with pool + gym, in-unit or building W/D, covered parking, ground floor or elevator (because of pregnancy), and pet-friendly (or ESA-acceptable). 12-month lease, move-in within 30–45 days, excellent rental history, full deposit + first month at signing.";

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

const HOUSING_NEEDS_HTML =
  `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">We are an <strong>expecting couple</strong> (wife is pregnant – baby due summer 2026), 2 well-behaved dogs (corgi + corgi mix), and we both work from home. We are looking in <strong>East Honolulu (Hawaii Kai / Aina Haina / Kahala / Niu Valley)</strong> for a <strong>2BR/2BA at $1,900–$2,400/mo</strong>, with <strong>pool + gym</strong>, in-unit or building W/D, covered parking, <strong>ground floor or elevator</strong> (because of pregnancy), and pet-friendly (or ESA-acceptable).</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;"><strong>About us as tenants:</strong> 12-month lease, move-in within 30–45 days, excellent rental history (references on request), full deposit + first month at signing, and we will take great care of the unit – we have lived in our current place 4+ years.</p>`;

const STELLA_BLURB_TEXT =
  "Stella is our 13-year-old Pembroke corgi – sweet, social, and a true family member. She has a classic double coat. In the past, a groomer convinced us to shave her, and we now know that was a mistake (it damages the protective guard hairs and can grow back patchy). We are looking for someone who understands double coats and will deshed + blow out + lightly tidy – never shave.";

const STELLA_BLURB_HTML =
  `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;"><strong>Stella</strong> is our <strong>13-year-old Pembroke corgi</strong> – sweet, social, and a true family member. She has a classic <strong>double coat</strong>. In the past a groomer talked us into shaving her, and we now know that was a mistake (it damages the protective guard hairs and can grow back patchy or coarse).</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">What we want: a full deshedding bath, a proper <strong>high-velocity blowout</strong>, undercoat rake / Furminator pass, and a light tidy of feet, sanitary area, and skirt. <strong>Never shave the body</strong>. Hypoallergenic / oatmeal shampoo with a thorough rinse if you have it.</p>`;

const LUXURY_BLURB_TEXT =
  "Hawaii Luxury Resource is a curated booking and concierge layer for Hawaii's top tour and activity operators. We feature your business on our site, run paid traffic to your booking page, and send qualified guests directly to you – at zero cost to you up front. We carry 200+ Oahu/Maui/Big Island/Kauai experiences (FareHarbor + Peek + private operators) and we work two ways: as your FareHarbor affiliate (you add us in the FareHarbor dashboard, we earn the affiliate commission you set, default 10%, never going down – only up based on volume) OR through a direct commission contract (10% on confirmed and completed bookings, NET-15 settlement).";

const LUXURY_BLURB_HTML =
  `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;"><strong>Hawaii Luxury Resource</strong> is a curated booking + concierge layer for Hawaii's top tour and activity operators. We feature your business on our site, run paid traffic to your booking page, and send <strong>qualified guests</strong> directly to you – at <strong>zero cost up front</strong>. We carry 200+ Oahu / Maui / Big Island / Kauai experiences and we work two ways: <strong>as your FareHarbor affiliate</strong> (default 10%, never going down) <strong>or via a direct commission contract</strong> (10% on confirmed + completed bookings, NET-15).</p>`;

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
  | "rap-central-rappers-followup-4";

export type ApartmentsSub = "" | "individual" | "realtor";
export type CorgiCareSub = "" | "hair" | "teeth" | "military";
export type LuxuryResourceSub = "" | "fareharbor" | "direct";
export type RapCentralSub = "" | "rappers";

// ─────────────────────────────────────────────────────────────────────────────
// APARTMENTS – INDIVIDUAL (Craigslist / FB Marketplace / FSBO landlords)
// ─────────────────────────────────────────────────────────────────────────────
const APT_INDIVIDUAL = {
  subject: "serious East Honolulu tenant (Family Feud grand-prize family) – is your unit still open?",
  text: `Hi {{Name}},

I saw your listing and wanted to reach out personally before someone else did. ${HOUSING_NEEDS_TEXT}

${FAMILY_FEUD_TEXT}

If your unit is still available and matches, I would love to set up a viewing this week. We can come during whatever time works best for you – evenings and weekends fine. References, proof of income, and a deposit are ready to go.

If it is no longer available – no worries at all – I would just appreciate knowing so I can stop checking. And if you happen to know other landlords in the same building or neighborhood with similar units, I would be grateful for the introduction.

Thank you for your time, {{Name}}. We are real, ready, and respectful – and we will treat the place like our own.

Eric & Liana
(808) 393-0153
${NS_FOOTER_TEXT}`,
  html: card(
    "#0d9488",
    "rgba(13,148,136,0.18)",
    "Tenant inquiry – East Honolulu",
    "Is your unit still available?",
    "Quiet, prepared, paid-in-full couple ready to view this week.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">I saw your listing and wanted to reach out personally before someone else did.</p>
${HOUSING_NEEDS_HTML}
${FAMILY_FEUD_HTML}
<div style="background:#ecfdf5;border:1px solid rgba(13,148,136,0.25);border-radius:14px;padding:16px 18px;margin:18px 0;">
<p style="margin:0;font-size:14px;color:#065f46;line-height:1.6;"><strong>Next step:</strong> If your unit is still available and matches, I would love to set up a viewing this week. We can come during any time that works for you – evenings and weekends fine. <strong>References, proof of income, and full deposit are ready.</strong></p>
</div>
<p style="margin:0 0 12px;font-size:14px;line-height:1.7;color:#334155;">If it is no longer available – no worries – just a quick "taken" reply helps me stop checking. And if you happen to know other owners in the same building or neighborhood with similar units, an introduction would mean a lot.</p>
<p style="margin:0 0 6px;font-size:14px;font-weight:700;">Thank you, {{Name}}.</p>
<p style="margin:0 0 0;font-size:14px;color:#334155;">Eric &amp; Liana · (808) 393-0153 · coralcrowntechnologies@gmail.com</p>
${btn("tel:8083930153", "Call / text Eric – (808) 393-0153", "#0d9488")}`,
  ),
};

const APT_INDIVIDUAL_FU1 = {
  subject: "did i miss your reply about the unit?",
  text: `Hi {{Name}},

Quick follow-up on my message about your East Honolulu rental. I do not want to clutter your inbox – just want to make sure my first email did not get buried.

If the unit is still open, we are still very interested and can view this week. If it is gone, no problem – just one short reply ("gone" / "not for you" / etc.) and I will stop reaching out.

If there is anything we did not address (pet policy, lease length, deposit, anything) – please ask. We would rather talk it through than have you skip past us.

Eric & Liana – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#0d9488",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Quick follow-up on my message about your East Honolulu rental. I do not want to clutter your inbox – just want to make sure my first note did not get buried.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If the unit is still open, we are still very interested and can view <strong>this week</strong>. If it is gone, no problem – a one-word reply ("gone") and I will stop reaching out.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">Anything we did not address (pet policy, lease length, deposit) – please ask. We would rather talk it through than have you skip past us.</p>
${btn("tel:8083930153", "Call / text – (808) 393-0153", "#0d9488")}`,
  ),
};

const APT_INDIVIDUAL_FU2 = {
  subject: "have you given up on finding the right tenant?",
  text: `Hi {{Name}},

I do not want to be a pest – this is the second nudge. I asked above on purpose: most landlords I have talked to say the hardest part of renting out their place is finding someone they actually trust.

That is exactly what we are trying to be. Quiet expecting couple, two well-mannered dogs, both working from home (so the place gets cared for, not abandoned), full deposit ready, references ready.

${FAMILY_FEUD_TEXT}

If your unit is taken – no problem. If it is still open and the issue is the dogs, the timing, or anything else – please just say so. We can usually work around it.

Eric & Liana – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#0d9488",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">I do not want to be a pest – this is the second nudge. I asked above on purpose: most landlords I have talked to say the hardest part of renting out their place is finding someone they actually <strong>trust</strong>.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">That is what we are trying to be. Quiet expecting couple, two well-mannered dogs, both working from home (so the place gets cared for, not abandoned), full deposit ready, references ready.</p>
${FAMILY_FEUD_COMPACT_HTML}
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">If it is taken – no problem. If it is still open and the issue is the dogs, the timing, or anything else, please just say so. We can usually work around it.</p>
${btn("tel:8083930153", "Talk it through – (808) 393-0153", "#0d9488")}`,
  ),
};

const APT_INDIVIDUAL_FU3 = {
  subject: "small thank you – and one offer",
  text: `Hi {{Name}},

Thanks for hosting your listing – it is genuinely useful to renters like us. I will not keep emailing forever; this is the second-to-last note.

One small offer: if you ever rent out this or any other Hawaii unit and want a clean, paying tenant on file, we can be that. Email + phone below – no pressure, no expiration.

If you happen to know any other owners in East Honolulu with similar units – an intro is the best gift you could give us right now, and we are happy to return the favor (referrals, fair Yelp/Google review, whatever helps).

Eric & Liana – (808) 393-0153 · coralcrowntechnologies@gmail.com${NS_FOOTER_TEXT}`,
  html: fbox(
    "#0d9488",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Thanks for hosting your listing – it is genuinely useful to renters like us. I will not keep emailing forever; this is the second-to-last note.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;"><strong>One small offer:</strong> if you ever rent out this or any other Hawaii unit and want a clean, paying tenant on file, we can be that. No pressure, no expiration.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">If you know any other owners in East Honolulu with similar units, an introduction would mean a lot – and we are happy to return the favor (fair Yelp/Google review, referrals, whatever helps).</p>
${btn("mailto:coralcrowntechnologies@gmail.com?subject=Introducing%20a%20landlord", "Send an introduction", "#0d9488")}`,
  ),
};

const APT_INDIVIDUAL_FU4 = {
  subject: "last note – wishing you well either way",
  text: `Hi {{Name}},

Last note. We have moved on to actively touring other places, but I wanted to close the loop properly rather than just disappear.

If your unit ever becomes available again or if your timing changes, please reach out – my number and email are below and they will not change. We are the kind of tenants you wish you had: pay on time, quiet, take care of the place.

Wishing you well with your rental, {{Name}}.${SOFT_CLOSE_TEXT}

Eric & Liana – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#94a3b8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Last note. We have moved on to actively touring other places, but I wanted to close the loop rather than just disappear.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If your unit becomes available again or your timing changes, please reach out – my number and email are below and they will not change. We are the kind of tenants you wish you had: pay on time, quiet, take care of the place.</p>
${SOFT_CLOSE_HTML}
<p style="margin:14px 0 0;font-size:14px;color:#334155;">Eric &amp; Liana – (808) 393-0153</p>`,
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// APARTMENTS – REALTOR / PROPERTY MANAGER
// ─────────────────────────────────────────────────────────────────────────────
const APT_REALTOR = {
  subject: "qualified East Honolulu tenant – 2BR, $1.9–$2.4k, pool/gym, pets, Family-Feud-grand-prize family",
  text: `Hi {{Name}},

I am writing because your firm is well known for East Honolulu rentals, and I would like to be on your active prospects list.

The lookup we are running is narrow on purpose so it is easy for you to filter. ${HOUSING_NEEDS_TEXT}

${FAMILY_FEUD_TEXT}

What we are asking from you:
1. Match us against your current East Honolulu vacancies (Hawaii Kai, Aina Haina, Kahala, Niu Valley, Kuliouou, Portlock).
2. Add us to any "coming-soon" or "off-market" notice list you keep – we are happy to pre-tour and pre-apply.
3. If we are not a fit for your firm, an introduction to a colleague who handles this profile would mean a lot.

We have a one-page tenant resume (employment, income, references, vet records for the dogs, cosigners on standby) – happy to send the moment you ask. Application fees, deposits, first month – all standard, paid same day at signing.

Best way to reach me is direct: (808) 393-0153 or this email. Thank you, {{Name}} – looking forward to working with you.

Eric Schaefer
Coral Crown Solutions${NS_FOOTER_TEXT}`,
  html: card(
    "#1d4ed8",
    "rgba(29,78,216,0.18)",
    "Qualified renter intro – East Honolulu",
    "Add us to your prospects list",
    "Quiet, paid-in-full, ready to apply same-day.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">Your firm is well known for East Honolulu rentals, and I would like to be on your active prospects list. The search we are running is narrow on purpose so it is easy for you to filter.</p>
${HOUSING_NEEDS_HTML}
${FAMILY_FEUD_HTML}
<p style="margin:18px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.14em;color:#1d4ed8;text-transform:uppercase;">What we are asking</p>
<ol style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.75;">
<li>Match us against your current East Honolulu vacancies (Hawaii Kai, Aina Haina, Kahala, Niu Valley, Kuliouou, Portlock).</li>
<li>Add us to any <strong>"coming-soon" / off-market notice list</strong> you keep – we will pre-tour and pre-apply.</li>
<li>If we are not a fit for your firm, an introduction to a colleague who handles this profile would mean a lot.</li>
</ol>
<div style="background:#eff6ff;border:1px solid rgba(29,78,216,0.25);border-radius:14px;padding:16px 18px;margin:18px 0;">
<p style="margin:0;font-size:14px;color:#1e3a8a;line-height:1.6;"><strong>Tenant packet ready on request:</strong> employment, income, references, vet records for the dogs, cosigners on standby. Application fees, deposits, first month – paid same day at signing.</p>
</div>
<p style="margin:0 0 14px;font-size:14px;color:#334155;">Direct line: (808) 393-0153 · coralcrowntechnologies@gmail.com</p>
<p style="margin:0;font-size:14px;font-weight:600;">Thank you, {{Name}} – looking forward to working with you.</p>
${btn("mailto:coralcrowntechnologies@gmail.com?subject=Tenant%20packet%20request", "Request our tenant packet", "#1d4ed8")}`,
  ),
};

const APT_REALTOR_FU1 = {
  subject: "ready to view East Honolulu units this week – is your list refreshed?",
  text: `Hi {{Name}},

Quick check-in. We are actively touring this week and into next, so if any East Honolulu units fitting our spec (2BR, $1.9–$2.4k, pool + gym, pet-friendly) hit your active list since my first email, please send them over.

We can move on a unit within 24 hours of seeing it – tenant packet ready, deposit ready, lease ready to sign.

If nothing new yet – also fine. Just a quick "still nothing" reply lets me prioritize who to chase.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#1d4ed8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Quick check-in. We are actively touring this week and into next, so if any East Honolulu units fitting our spec (2BR, $1.9–$2.4k, pool + gym, pet-friendly) hit your active list since my first email, please send them over.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;"><strong>We can move on a unit within 24 hours</strong> of seeing it – tenant packet ready, deposit ready, lease ready to sign.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">If nothing new yet – also fine. Just a quick "still nothing" reply lets me prioritize.</p>
${btn("mailto:coralcrowntechnologies@gmail.com?subject=Updated%20East%20Honolulu%20list", "Send your updated list", "#1d4ed8")}`,
  ),
};

const APT_REALTOR_FU2 = {
  subject: "should we work with someone else for the East Honolulu search?",
  text: `Hi {{Name}},

Honest question – not a complaint. If East Honolulu 2BRs are not your firm's focus right now, I would rather you tell me so I can route my search through someone else.

We are a strong, narrow lead (qualified income, full deposit, narrow zip codes) and the time to move is now (lease signed within 30 days). If your firm's pipeline does not have units in that range, an introduction to whoever does would actually help us both.

${FAMILY_FEUD_TEXT}

Or, if it IS your focus and you just have not seen the right inventory yet – say the word and I will keep checking in.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#1d4ed8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Honest question – not a complaint. If East Honolulu 2BRs are not your firm's focus right now, I would rather you tell me so I can route my search through someone else.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">We are a <strong>strong, narrow lead</strong> (qualified income, full deposit, narrow zip codes) and the time to move is <strong>now</strong> (lease signed within 30 days). If your pipeline does not have units in that range, an introduction to whoever does would actually help us both.</p>
${FAMILY_FEUD_COMPACT_HTML}
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">Or if it IS your focus and you just have not seen the right inventory yet – say the word and I will keep checking in.</p>
${btn("tel:8083930153", "Call Eric – (808) 393-0153", "#1d4ed8")}`,
  ),
};

const APT_REALTOR_FU3 = {
  subject: "free tenant resume + a small reciprocal offer",
  text: `Hi {{Name}},

Two things:

1. Attached/below is our one-page tenant resume so you have it on file – feel free to forward to colleagues. It includes income, references, dog vet records, and what we are looking for.

2. A small reciprocal offer: I run Coral Crown Solutions (websites, online booking, SEO for Hawaii businesses). If your firm ever needs a fresh listing landing page, an inbound lead form, or simple SEO tune-up, I am happy to do it at cost in exchange for being on your active prospects list. No obligation.

Either way, thank you for considering us. The narrow box (East Honolulu, 2BR, $1.9–$2.4k, pool + gym, pets) is hard to fill – we will be the easy yes when it does.

Eric – (808) 393-0153 · coralcrowntechnologies@gmail.com${NS_FOOTER_TEXT}`,
  html: fbox(
    "#1d4ed8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Two things:</p>
<p style="margin:0 0 12px;font-size:15px;line-height:1.65;"><strong>1. Tenant resume ready on request</strong> – one page, income, references, dog vet records, and what we are looking for. Reply and I will send.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;"><strong>2. A small reciprocal offer</strong> – I run Coral Crown Solutions (websites, online booking, SEO for Hawaii businesses). If your firm needs a fresh listing landing page, an inbound lead form, or simple SEO tune-up, I am happy to do it <strong>at cost</strong> in exchange for being on your active prospects list. No obligation.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">Either way, thank you for considering us. The narrow box is hard to fill – we will be the easy yes when it does.</p>
${btn("mailto:coralcrowntechnologies@gmail.com?subject=Tenant%20resume%20%2B%20Coral%20Crown%20offer", "Request tenant resume", "#1d4ed8")}`,
  ),
};

const APT_REALTOR_FU4 = {
  subject: "last note – will not chase further",
  text: `Hi {{Name}},

Last note from me. We are likely going to land somewhere within the next 2–3 weeks, so I will stop chasing after this.

If anything that fits the box (East Honolulu, 2BR, $1.9–$2.4k, pool + gym, pets) lands on your desk before then, my line is open. After that, please keep our info on file – we know plenty of people who rent in Hawaii and we are happy to refer good agents we have worked with.

Wishing you a great month, {{Name}}.${SOFT_CLOSE_TEXT}

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#94a3b8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Last note. We are likely landing somewhere within the next 2–3 weeks, so I will stop chasing after this.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If anything fitting the box (East Honolulu, 2BR, $1.9–$2.4k, pool + gym, pets) lands on your desk before then, my line is open. After that, please keep us on file – we know plenty of people who rent in Hawaii and we are happy to refer good agents.</p>
${SOFT_CLOSE_HTML}
<p style="margin:14px 0 0;font-size:14px;color:#334155;">Eric – (808) 393-0153</p>`,
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// CORGI CARE – HAIR (groomers / mobile groomers, Oahu)
// ─────────────────────────────────────────────────────────────────────────────
const CORGI_HAIR = {
  subject: "double-coat corgi (13 yrs) – deshed + blowout (no shaving)",
  text: `Hi {{Name}},

I would love to book {{Name of Organization}} for a grooming appointment for our 13-year-old corgi, Stella.

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

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: card(
    "#b45309",
    "rgba(180,83,9,0.18)",
    "Grooming appointment request – senior corgi",
    "Stella, 13-year-old Pembroke corgi",
    "Deshed + high-velocity blowout · no shaving · gentle handling.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">I would love to book <strong>{{Name of Organization}}</strong> for a grooming appointment for our 13-year-old corgi, Stella.</p>
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
  ),
};

const CORGI_HAIR_FU1 = {
  subject: "still trying to book Stella's appointment – any opening?",
  text: `Hi {{Name}},

Quick follow-up on grooming for Stella – my 13-year-old corgi. I do not want to keep emailing if you are full or this is not the right ask – just a one-line reply ("booked out" / "not seniors" / etc.) and I will move on.

If you do have an opening, I am flexible on the day and time, and I can be on the road in 15 minutes for Hawaii Kai-area appointments. Just let me know your soonest slot and the total price.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#b45309",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Quick follow-up on grooming for <strong>Stella – my 13-year-old corgi</strong>. I do not want to keep emailing if you are full – a one-line reply ("booked out" / "not seniors") is more than enough.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If you do have an opening, I am flexible on day and time, and can be on the road in 15 minutes for Hawaii Kai-area appointments.</p>
${btn("tel:8083930153", "Call Eric – (808) 393-0153", "#b45309")}`,
  ),
};

const CORGI_HAIR_FU2 = {
  subject: "would Stella be too much work?",
  text: `Hi {{Name}},

Asking the no-question on purpose. Sometimes groomers see "13-year-old double-coat" and quietly skip past – I would rather you just tell me if she is more than you want to take on.

She is calm, leashes well, no aggression, no separation panic. The double coat is the only "work" – and the only thing she needs is a thorough deshed + high-velocity blowout, never shaving. If your team is comfortable with that, I am ready to book.

If not – truly no offense – please send me one name of a groomer you trust who handles double coats well. I would owe you one.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#b45309",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Asking on purpose. Sometimes groomers see "13-year-old double-coat" and quietly skip past – I would rather you just tell me if Stella is more than you want to take on.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">She is calm, leashes well, no aggression, no separation panic. The <strong>double coat is the only work</strong> – and the only thing she needs is a thorough deshed + high-velocity blowout, <strong>never shaving</strong>. If your team is comfortable with that, I am ready to book.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">If not – truly no offense – please send me one name of a groomer you trust who handles double coats well. I would owe you one.</p>
${btn("tel:8083930153", "Talk it through – (808) 393-0153", "#b45309")}`,
  ),
};

const CORGI_HAIR_FU3 = {
  subject: "small thank-you + a fair Yelp/Google review on the table",
  text: `Hi {{Name}},

Almost done with the chasing. Just wanted to add this:

If you do book Stella in and we are happy, I will gladly leave a thoughtful, real Yelp + Google review (with photos), and refer other corgi / double-coat owners I know to you. That is the easiest way I know to say thank you.

If now is not the right time but you want to grab my info for later, totally fine – I am at (808) 393-0153 / coralcrowntechnologies@gmail.com.

Eric${NS_FOOTER_TEXT}`,
  html: fbox(
    "#b45309",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Almost done with the chasing. Just wanted to add this:</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If you book Stella in and we are happy, I will gladly leave a <strong>thoughtful, real Yelp + Google review with photos</strong>, and refer other corgi / double-coat owners I know to you. That is the easiest way I know to say thank you.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">If now is not the right time but you want to grab my info for later, totally fine – (808) 393-0153 / coralcrowntechnologies@gmail.com.</p>`,
  ),
};

const CORGI_HAIR_FU4 = {
  subject: "last note – Stella sends her tail-wag",
  text: `Hi {{Name}},

Last email, promise. We are going to keep looking for the right groomer for Stella – your shop was high on our list, but I do not want to be a nuisance.

If anything changes (cancellation, new opening, new senior-dog program), my contact does not change: (808) 393-0153.${SOFT_CLOSE_TEXT}

Eric & Stella the cutest corgi${NS_FOOTER_TEXT}`,
  html: fbox(
    "#94a3b8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Last email, promise. We will keep looking for the right groomer for Stella – your shop was high on our list, but I do not want to be a nuisance.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If anything changes (cancellation, new opening, new senior-dog program), my contact does not change: <strong>(808) 393-0153</strong>.</p>
${SOFT_CLOSE_HTML}
<p style="margin:14px 0 0;font-size:14px;color:#334155;">Eric &amp; Stella the cutest corgi.</p>`,
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// CORGI CARE – TEETH (vet clinics + dental practices)
// ─────────────────────────────────────────────────────────────────────────────
const CORGI_TEETH = {
  subject: "all-in price for a routine corgi dental cleaning – healthy 13-yr ~25 lb",
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

Eric Schaefer${NS_FOOTER_TEXT}`,
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
<p style="margin:0;font-size:14px;color:#334155;">Direct line: (808) 393-0153 · coralcrowntechnologies@gmail.com</p>
${btn("tel:8083930153", "Call Eric – (808) 393-0153", "#0e7490")}`,
  ),
};

const CORGI_TEETH_FU1 = {
  subject: "still hoping for that all-in dental quote",
  text: `Hi {{Name}},

Quick nudge on the dental quote for Stella (13-yr corgi, ~25 lb, healthy mouth). I know quote requests can pile up – just trying to make sure mine did not slip through.

If you can spare 60 seconds, even a rough range ("$X–$Y for our healthy-mouth package") would help me figure out where to book.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#0e7490",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Quick nudge on the dental quote for <strong>Stella (13-yr corgi, ~25 lb, healthy mouth)</strong>. I know quote requests pile up – just making sure mine did not slip through.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If you can spare 60 seconds, even a rough range ("$X–$Y for our healthy-mouth package") would help me figure out where to book.</p>
${btn("tel:8083930153", "Call Eric – (808) 393-0153", "#0e7490")}`,
  ),
};

const CORGI_TEETH_FU2 = {
  subject: "is your healthy-mouth package over $500?",
  text: `Hi {{Name}},

Asking the direct question on purpose so neither of us wastes time. If your typical all-in for a healthy 25-lb corgi dental (cleaning + bloodwork + X-rays + anesthesia) is over $500, I would rather know upfront so I can budget or look elsewhere.

If you ARE in or near our range, please send the package details and I will book this week.

Either way I appreciate the honest answer.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#0e7490",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Asking the direct question on purpose so neither of us wastes time.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If your typical all-in for a healthy 25-lb corgi dental (cleaning + bloodwork + X-rays + anesthesia) is <strong>over $500</strong>, I would rather know upfront so I can budget or look elsewhere.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If you ARE in or near our range, please send the package details and <strong>I will book this week</strong>.</p>
${btn("mailto:coralcrowntechnologies@gmail.com?subject=Stella%20dental%20quote", "Send the package details", "#0e7490")}`,
  ),
};

const CORGI_TEETH_FU3 = {
  subject: "free thank-you – fair review + corgi-owner referrals",
  text: `Hi {{Name}},

If we end up booking Stella with you and the experience is good, I will leave a thoughtful Yelp + Google review (with photos and the actual price you quoted, so other owners can find you), and I will refer other dog owners I know on Oahu.

That is my way of saying thank you for transparent pricing and good care.

If now is not the right time, no problem – I will move on. Either way, thanks for considering.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#0e7490",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If we book Stella with you and the experience is good, I will leave a <strong>thoughtful Yelp + Google review</strong> (with photos and the actual price you quoted, so other owners can find you), and refer other dog owners on Oahu.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">That is my way of saying thank you for transparent pricing and good care.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">If now is not the right time, no problem – I will move on. Either way, thanks for considering.</p>`,
  ),
};

const CORGI_TEETH_FU4 = {
  subject: "last note – Stella's mouth thanks you anyway",
  text: `Hi {{Name}},

Last note. We will move forward with whichever clinic gets back to us first with a clear, all-in price. If your office wants to be in the running, even a quick range works.

If we miss each other this round – please keep us on file for future visits. Stella will need cleanings every 1–2 years for the rest of her life and we are loyal once we find a good fit.${SOFT_CLOSE_TEXT}

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#94a3b8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Last note. We will move forward with whichever clinic gets back to us first with a clear, all-in price.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If we miss each other this round – please keep us on file. Stella will need cleanings every 1–2 years for the rest of her life and we are loyal once we find a good fit.</p>
${SOFT_CLOSE_HTML}`,
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// CORGI CARE – MILITARY BASES (VTF / Schofield / JBPHH)
// ─────────────────────────────────────────────────────────────────────────────
const CORGI_MILITARY = {
  subject: "VTF dental rates – helping my wife's cousin (military) book her corgi",
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
  subject: "checking back on the VTF dental rate",
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
  subject: "are non-DoD-card transfers still allowed for VTF dental?",
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
  subject: "small thank-you – we will recommend you to other corgi families",
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
  subject: "last note – mahalo for your service either way",
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
  subject: "free FareHarbor traffic – add Hawaii Luxury Resource as your affiliate (10%, only goes up)",
  text: `Hi {{Name}},

I run Hawaii Luxury Resource – a curated booking and concierge layer for Hawaii's top tour and activity operators (200+ live experiences across all four islands) – and I would love to feature {{Name of Organization}} and start sending you guests.

The setup for FareHarbor partners is dead simple, totally free, and takes you about three minutes. We are asking to be added as your affiliate inside your FareHarbor dashboard. Once we are in, every booking we send you carries our affiliate code and FareHarbor pays out the commission you set – no invoicing, no chasing, no extra paperwork on your end.

Our defaults to make this an easy yes:
- Commission: 10% (your standard FareHarbor affiliate rate)
- Direction: rate can ONLY go up over time, never down – we have a written commission-review clause that says rates only increase based on volume / quality of leads
- Reporting: handled entirely by FareHarbor
- Cost to you: zero up front, zero ongoing
- Cost if we send zero bookings: still zero

How to add us (your team has done this before – takes 3 min):
1. Sign in to FareHarbor → Help → "Add an affiliate" / "Manage affiliates"
2. Select "Add affiliate" and enter:
     Name: Hawaii Luxury Resource (Eric Schaefer)
     Email: coralcrowntechnologies@gmail.com
     Type: Individual / Online Affiliate
     Commission: 10% (default)
3. FareHarbor will send us our affiliate code and lightboxes – we drop them on the right pages on hawaiiluxuryresource.com and we are live.

If you would rather have us call your team and walk through it together, that is great too – Ashley on our side handles vendor onboarding and contracts. Reach her at 808-994-9034 (or text). She can have you up and running in one call.

What you get from us:
- A featured placement on our curated catalog (we are doing real homework on every operator – we are NOT a spammy aggregator)
- Targeted paid traffic from couples, group travel, luxury concierge searches
- Pre-qualified guests (ours arrive expecting your premium price, not bargain-hunting)
- Year-round visibility – not just one-off blasts

Thank you for considering it, {{Name}} – this is the easiest add you will say yes to all month.

Eric Schaefer
Hawaii Luxury Resource · Coral Crown Solutions
hawaiiluxuryresource.com · (808) 994-9034 (Ashley) · (808) 393-0153 (Eric)${NS_FOOTER_TEXT}`,
  html: card(
    "#a16207",
    "rgba(161,98,7,0.2)",
    "FareHarbor affiliate request – Hawaii Luxury Resource",
    "Add us as your affiliate. 10% – never down, only up.",
    "Free, 3-minute add. Free traffic. Pre-qualified luxury guests.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">I run <strong>Hawaii Luxury Resource</strong> – a curated booking and concierge layer for Hawaii's top tour and activity operators (200+ live experiences across all four islands) – and I would love to feature <strong>{{Name of Organization}}</strong> and start sending you guests.</p>
${LUXURY_BLURB_HTML}
<div style="background:#fffbeb;border:1px solid rgba(161,98,7,0.3);border-radius:14px;padding:18px 20px;margin:18px 0;">
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.14em;color:#854d0e;text-transform:uppercase;">Defaults that make this an easy yes</p>
<ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.7;color:#451a03;">
<li><strong>Commission:</strong> 10% (your standard FareHarbor affiliate rate)</li>
<li><strong>Direction:</strong> rate can ONLY go up – never down – with a written commission-review clause</li>
<li><strong>Reporting:</strong> handled entirely by FareHarbor</li>
<li><strong>Cost up front / ongoing / if zero bookings:</strong> zero</li>
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
  subject: "did the FareHarbor affiliate request reach the right person?",
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
  subject: "is there a reason to NOT add a free 10% affiliate?",
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
  subject: "small reciprocal offer – free placement + a featured slot",
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
  subject: "last note – door is open whenever you are ready",
  text: `Hi {{Name}},

Last touch. We will keep building out the catalog and routing guests through the operators who said yes. The door is always open if you change your mind – nothing we are setting up today expires the offer.

If you ever want to revisit:
- Default 10% commission, only goes up
- Featured slot on first month
- Ashley (vendor onboarding): 808-994-9034
- Eric (founder): 808-393-0153 / coralcrowntechnologies@gmail.com${SOFT_CLOSE_TEXT}

Wishing you a strong season, {{Name}}.${NS_FOOTER_TEXT}`,
  html: fbox(
    "#94a3b8",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Last touch. We will keep building the catalog and routing guests through operators who said yes. The door is always open – nothing about today's offer expires.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If you ever want to revisit:</p>
<ul style="margin:0 0 14px;padding-left:22px;font-size:14px;line-height:1.7;">
<li>Default 10% commission, only goes up</li>
<li>Featured slot on first month</li>
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
  subject: "Hawaii Luxury Resource – 10% referral partnership, contract ready (Ashley will close it)",
  text: `Hi {{Name}},

I run Hawaii Luxury Resource – a curated booking and concierge layer for Hawaii's top tour and activity operators – and I would like to feature {{Name of Organization}} on our catalog and start sending you guests.

Because you are not on FareHarbor (or your guests book direct with you), we use a clean direct-commission referral agreement so this is fast and clear:

The deal:
- Commission: 10% on confirmed AND completed bookings sent by us (we eat refunds and no-shows)
- Tracking: Each guest carries a UTM tag (utm_source=hawaiiluxuryresource, utm_campaign=YOUR_NAME, ref=HLR) – you will see it on the inquiry, in form fields, or in the email subject we send when we route a guest to you
- Settlement: NET-15 from the date the guest's tour completes – ACH or check, your call
- Reporting: We send a monthly ledger (PDF + CSV) listing every booking we credited to you, the guest name, dates, and amount – you sign-off, we cash out
- Direction: This rate can ONLY go up over time, never down (written into the contract – § 6.6 Annual Commission Review)
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
    "Direct referral partnership – Hawaii Luxury Resource",
    "10% referral. Contract ready. Ashley will close it.",
    "Pre-qualified luxury guests. Paid traffic. Zero risk to you.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">I run <strong>Hawaii Luxury Resource</strong> – a curated booking and concierge layer for Hawaii's top tour and activity operators – and I would like to feature <strong>{{Name of Organization}}</strong> on our catalog and start sending you guests.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">Because you are not on FareHarbor (or your guests book direct with you), we use a clean <strong>direct-commission referral agreement</strong> so this is fast and clear.</p>
<div style="background:#fef2f2;border:1px solid rgba(124,45,18,0.3);border-radius:14px;padding:18px 20px;margin:18px 0;">
<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.14em;color:#7c2d12;text-transform:uppercase;">The deal</p>
<ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.7;color:#7f1d1d;">
<li><strong>Commission:</strong> 10% on <strong>confirmed AND completed</strong> bookings (we eat refunds + no-shows)</li>
<li><strong>Tracking:</strong> UTM tag on every guest (<code>utm_source=hawaiiluxuryresource</code>, <code>utm_campaign=YOUR_NAME</code>, <code>ref=HLR</code>) – visible in inquiry, form fields, or email subject</li>
<li><strong>Settlement:</strong> NET-15 from tour completion · ACH or check</li>
<li><strong>Reporting:</strong> Monthly ledger (PDF + CSV) listing every credited booking – sign-off, cash out</li>
<li><strong>Direction:</strong> Rate can ONLY go up – never down (written § 6.6 Annual Commission Review)</li>
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
  subject: "did the Hawaii Luxury Resource referral proposal reach the right person?",
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
  subject: "what is in the contract that gives you pause?",
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
  subject: "small reciprocal offer to lock in the partnership",
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
  subject: "last note – door open, terms locked",
  text: `Hi {{Name}},

Last touch. We have moved on to actively building partnerships with the operators who said yes, but the offer for {{Name of Organization}} stays good until you tell us otherwise.

For your records:
- Default 10% commission, only goes up over time (§ 6.6 of the contract)
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
<li>Default 10% commission, only goes up over time (§ 6.6)</li>
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
const RAP_RAPPERS = {
  subject: "rap.com booking engine – 5% to route promoter offers directly to you",
  text: `Hi {{Name}},

I run rap.com and the new Rap Artist Booking Engine. We are building a single coordination layer where event promoters from around the country submit structured booking requests, and our system routes them directly to artists (or their management) – with the deal terms, dates, riders, and budgets pre-filled and ready for you to accept, counter, or pass.

The pitch in one paragraph:
- For artists: zero up-front cost, zero exclusivity, zero competing booking offers from us. We take 5% of the total payment ONLY when a deal closes through our engine. If a promoter you would have heard from anyway sends you an offer, we collect nothing.
- For promoters: a single, vetted intake that gets a real response within 48–72 hours, with confirmed dates and an actual contract path.

What we need from {{Name of Organization}} to get you on the engine (~5 minutes by email):
1. Confirmed booking contact (your management, agent, or attorney) – name + email
2. Show requirements / rider essentials (sound, stage, timing, sample length)
3. Travel + accommodations standards (flights – class + city of origin, ground transport, hotel star rating + suite preference, per-diem)
4. Min performance fee tiers you would consider (festival headline, opening, club / private)
5. Restrictions (geography, calendar blackout, brand exclusivities, etc.)

Once we have those, you can stay completely passive – the engine routes only requests that match your tiers and preferences directly to your designated booking contact, with our 5% built in to the gross. Your team replies "yes / no / counter" and the rest is paperwork.

This is built to be the fastest, lowest-friction way for serious promoters to reach serious artists – without the noise of cold DMs, scraped emails, or unverified "I have your number" pitches.

If you (or whoever handles bookings for you) wants to chat first, my number is 808-393-0153 and our partnerships line for the rap engine is 808-994-9034. Or reply with the booking contact and we will reach out directly.

Thank you for considering it.

Eric Schaefer
rap.com – Rap Artist Booking Engine
coralcrowntechnologies@gmail.com${NS_FOOTER_TEXT}`,
  html: card(
    "#7e22ce",
    "rgba(126,34,206,0.22)",
    "rap.com – Rap Artist Booking Engine",
    "5% to route promoter offers directly to you",
    "Zero up-front. Zero exclusivity. Zero competing offers from us.",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.7;">I run <strong>rap.com</strong> and the new <strong>Rap Artist Booking Engine</strong>. We are building a single coordination layer where event promoters submit structured booking requests, and our system routes them directly to artists (or management) – with deal terms, dates, riders, and budgets pre-filled and ready to accept, counter, or pass.</p>
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
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#334155;">Once we have those, you can stay <strong>completely passive</strong> – the engine routes only requests that match your tiers and preferences directly to your designated booking contact, with our 5% built into the gross. Your team replies "yes / no / counter" and the rest is paperwork.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.7;">This is built to be the fastest, lowest-friction way for serious promoters to reach serious artists – without the noise of cold DMs, scraped emails, or unverified "I have your number" pitches.</p>
<div style="background:#f3e8ff;border:1px solid rgba(126,34,206,0.3);border-radius:14px;padding:16px 18px;margin:18px 0;">
<p style="margin:0;font-size:14px;color:#581c87;line-height:1.6;">Reply with the booking contact and we will reach out directly. Or call us first: <strong>(808) 393-0153</strong> Eric / <strong>(808) 994-9034</strong> partnerships.</p>
</div>
${btn("mailto:coralcrowntechnologies@gmail.com?subject=rap.com%20booking%20engine%20-%20{{Name of Organization}}", "Reply with booking contact", "#7e22ce")}`,
  ),
};

const RAP_RAPPERS_FU1 = {
  subject: "did the rap.com booking engine note reach your team?",
  text: `Hi {{Name}},

Quick follow-up on the rap.com Rap Artist Booking Engine note. Wanted to make sure it landed with whoever handles {{Name of Organization}}'s bookings – sometimes the right person is a manager, agent, or attorney rather than the public-facing email.

If you can forward to them (or send me their direct email), I will move it through quietly with no inbox flood for you. Or have them text/call our partnerships line at 808-994-9034.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#7e22ce",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Quick follow-up on the rap.com booking engine note. Just making sure it landed with whoever handles bookings for <strong>{{Name of Organization}}</strong>.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">Forward to them (or send me their direct email) and I will move it through quietly. Or have them text/call partnerships at <strong>808-994-9034</strong>.</p>
${btn("tel:8089949034", "Partnerships line – (808) 994-9034", "#7e22ce")}`,
  ),
};

const RAP_RAPPERS_FU2 = {
  subject: "is 5% lower than what you currently pay for cold inbound?",
  text: `Hi {{Name}},

Honest question, not a pitch. Most artists I have talked to either pay an agent 10–15% on cold inbound or eat the time-cost of sorting cold DMs themselves. The rap.com engine is 5% on closed deals only, with the lead-quality filter built in.

So the real question for you: is 5% with structured intake worth it vs. what you currently do for cold inbound? If yes – let us add you. If no – tell me why and I will respect it.

Either way, no exclusivity, no opt-in fee, no commitment until a deal actually closes.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#7e22ce",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Honest question. Most artists either pay an agent <strong>10–15% on cold inbound</strong> or eat the time-cost of sorting cold DMs themselves. The rap.com engine is <strong>5% on closed deals only</strong>, with lead-quality filtering built in.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Real question: is 5% with structured intake worth it vs. what you currently do for cold inbound? If yes – let us add you. If no – tell me why and I will respect it.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">No exclusivity, no opt-in fee, no commitment until a deal actually closes.</p>
${btn("tel:8089949034", "Partnerships – (808) 994-9034", "#7e22ce")}`,
  ),
};

const RAP_RAPPERS_FU3 = {
  subject: "small thing for the artist – featured spotlight on rap.com",
  text: `Hi {{Name}},

Small reciprocal offer to make joining the engine even more worth your team's time:

If you onboard this month, I will give {{Name of Organization}} a featured artist spotlight on rap.com – above-the-fold homepage rotation, dedicated artist page with your booking link (your team's email or your engine intake), and a journal article about your last project / current tour.

That is real organic traffic from a domain dedicated to rap, no extra cost, no exclusivity. Even if you never close a single engine booking through us, you keep the spotlight and the page.

Reply with your booking contact (or have them reach out at 808-994-9034) and we will set it up this week.

Eric – (808) 393-0153${NS_FOOTER_TEXT}`,
  html: fbox(
    "#7e22ce",
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">Small reciprocal offer to make joining the engine even more worth your team's time:</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;">If you onboard this month, I will give <strong>{{Name of Organization}}</strong> a <strong>featured artist spotlight on rap.com</strong> – above-the-fold homepage rotation, dedicated artist page with your booking link, and a journal article about your last project / current tour.</p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.65;color:#334155;">Real organic traffic from a rap-dedicated domain, no extra cost, no exclusivity. Even if you never close an engine booking through us, you keep the spotlight and the page.</p>
${btn("mailto:coralcrowntechnologies@gmail.com?subject=rap.com%20spotlight%20-%20{{Name of Organization}}", "Reply with booking contact", "#7e22ce")}`,
  ),
};

const RAP_RAPPERS_FU4 = {
  subject: "last note – respect either way, door stays open",
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
  { value: "corgi-care-teeth", label: "Corgi Care – Teeth cleaning ($300–$500 budget, civilian vets)" },
  { value: "corgi-care-military", label: "Corgi Care – Military VTF (cousin's corgi, bottom-dollar rate)" },
  { value: "luxury-resource-fareharbor", label: "Luxury Resource – FareHarbor partner (add us as affiliate)" },
  { value: "luxury-resource-direct", label: "Luxury Resource – Direct (non-FareHarbor – contract attached)" },
  { value: "rap-central-rappers", label: "Rap Central – Rappers + management (5% booking engine)" },
];
