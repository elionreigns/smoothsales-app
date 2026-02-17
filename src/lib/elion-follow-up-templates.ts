/**
 * E Lion follow-up email templates.
 * Used when the original campaign gets no response within 4 days.
 * Schedule: follow-up 1 at 4 days, follow-up 2 at 5 days after that, follow-up 3 at 5 days after that
 * (i.e. 4, 9, 14 days from initial send).
 *
 * All E Lion base templates (elion-fans, elion-artists, elion-brands, elion-producers,
 * elion-venue-church, elion-venue-show, elion-venue-dj) have 3 follow-ups each.
 * No template literals (backticks) - string concatenation only for SWC compatibility.
 */

export const ELION_FOLLOW_UP_DAYS = [4, 5, 5] as const;

export type ElionBaseCampaignId =
  | "elion-fans"
  | "elion-artists"
  | "elion-brands"
  | "elion-producers"
  | "elion-venue-church"
  | "elion-venue-show"
  | "elion-venue-dj"
  | "elion-venue-major"
  | "elion-record-label-mainstream"
  | "elion-record-label-christian";

export type ElionFollowUpTemplateId = `${ElionBaseCampaignId}-followup-${1 | 2 | 3}`;

export function isElionFollowUpTemplateId(id: string): id is ElionFollowUpTemplateId {
  return /^elion-(fans|artists|brands|producers|venue-church|venue-show|venue-dj|venue-major|record-label-mainstream|record-label-christian)-followup-[123]$/.test(id);
}

export function getElionFollowUpTemplate(
  id: ElionFollowUpTemplateId
): { subject: string; html: string; text: string } {
  const t = ELION_FOLLOW_UP_TEMPLATES[id];
  if (!t) throw new Error("Unknown follow-up template: " + id);
  return t;
}

const CONTACT_FOOTER = "\n\nWe're here when you're ready.\nCoral Crown Solutions · coralcrowntechnologies@gmail.com · (808) 393-0153\nReply or call – we're happy to help.";
const CONTACT_HTML = "<p style=\"margin-top:24px;padding-top:20px;border-top:1px solid rgba(0,0,0,0.08);color:#64748b;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;opacity:0.95;\">We're here when you're ready</p><p style=\"margin:6px 0 0;font-size:14px;color:#334155;\">Coral Crown Solutions · <a href=\"mailto:coralcrowntechnologies@gmail.com\" style=\"color:#0ea5e9;text-decoration:none;font-weight:600;\">coralcrowntechnologies@gmail.com</a> · (808) 393-0153</p><p style=\"margin:8px 0 0;font-size:12px;color:#64748b;\">Reply or call – we're happy to help.</p>";
const SOFT_CLOSE = " Thanks for your time. If this ever becomes a fit, we would love to hear from you. Take care.";
const SOFT_CLOSE_HTML = "<p style=\"margin:24px 0 0;font-size:14px;color:#475569;\">Thanks for your time. If this ever becomes a fit, we would love to hear from you. Take care.</p>";

function box(color: string, content: string): string {
  return "<div style=\"font-family:sans-serif;max-width:600px;margin:0 auto;background:#eff6ff;border:2px solid " + color + ";border-radius:20px;padding:28px;color:#1e3a8a;\"><p style=\"margin:0 0 16px;font-size:15px;\">Hi {{Name}},</p>" + content + CONTACT_HTML + "</div>";
}

export const ELION_FOLLOW_UP_TEMPLATES: Record<
  ElionFollowUpTemplateId,
  { subject: string; html: string; text: string }
> = {
  "elion-fans-followup-1": {
    subject: "E Lion – Holy Hip-Hop from Hawaii (quick follow-up: stream & follow)",
    text: "Hi {{Name}},\n\nThis is a quick follow-up to our first email. We reached out because we think you would enjoy E Lion – Holy Hip-Hop from Hawaii that has been turning heads for over 15 years. His sound is \"Hip Hope\": hip-hop meets worship, Hawaiian and Hebrew themes, music that uplifts without compromising on quality.\n\nWhy hit follow: E Lion has 1,000+ performances, 10M+ YouTube views, 30K+ CDs sold hand-to-hand, and he is the Family Feud grand prize winner (2016 – first Hawaiian family to win 5 consecutive episodes). You can stream everywhere – Spotify, Apple Music, Amazon Music, TikTok, Pandora, SoundCloud – and the full catalog, bio, and links are at elionmusic.com. Many listeners tell us they wished they had found him sooner.\n\nOne click and you are in: visit elionmusic.com or your favorite platform and hit follow. If you love it, share it with someone who needs the vibe." + CONTACT_FOOTER,
    html: box(
      "#1e40af",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is a quick follow-up. We reached out because we think you would enjoy E Lion – Holy Hip-Hop from Hawaii that has been turning heads for over 15 years. His sound is \"Hip Hope\": hip-hop meets worship, Hawaiian and Hebrew themes.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">E Lion has <strong>1,000+ performances</strong>, <strong>10M+ YouTube views</strong>, and is the <strong>Family Feud grand prize winner</strong> (2016). Stream everywhere – Spotify, Apple Music, Amazon, TikTok, Pandora – and the full catalog is at elionmusic.com.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">One click and you are in. Visit the link below or your favorite platform and hit follow. If you love it, share it with someone who needs the vibe.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#1d4ed8;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-fans-followup-2": {
    subject: "One more nudge – E Lion (Family Feud winner, 10M+ views – hit follow)",
    text: "Hi {{Name}},\n\nQuick nudge: we are following up because we do not want you to miss out on E Lion. His music is on every major platform – Spotify, Apple Music, Amazon, TikTok, Pandora, SoundCloud, Deezer, iHeartRadio – and he was the first Hawaiian family to win the Family Feud grand prize (5 consecutive episodes, 2016).\n\nAlbums like Father Nature, Bible Battle Royale, Lightclub, and Just Us have reached listeners worldwide. He is also the author of P48X (Philippians 4:8 Expounded). Whether you are into Holy Hip-Hop, island vibes, or faith-forward music that actually bumps, one click gets you there.\n\nIf you have not hit follow yet, visit elionmusic.com or search E Lion on your favorite platform. No pressure – we just want you to have the option when you are ready." + CONTACT_FOOTER,
    html: box(
      "#1e40af",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Quick nudge: we are following up because we do not want you to miss out. E Lion is on every major platform – Spotify, Apple, TikTok, Pandora, SoundCloud – and he was the <strong>first Hawaiian family to win Family Feud</strong> (5 consecutive episodes, 2016).</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Albums like Father Nature, Bible Battle Royale, Lightclub, and Just Us have reached listeners worldwide. Whether you are into Holy Hip-Hop, island vibes, or faith-forward music that actually bumps, one click gets you there.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">If you have not hit follow yet, visit elionmusic.com or search E Lion on your favorite platform. No pressure – we just want you to have the option.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#1d4ed8;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-fans-followup-3": {
    subject: "Last note – E Lion (when you're ready to stream Holy Hip-Hop from Hawaii)",
    text: "Hi {{Name}},\n\nThis is our last note. We offered you the chance to stream and follow E Lion – Holy Hip-Hop from Hawaii, Family Feud grand prize winner, 15+ years and 10M+ views. His music is on every platform and the full catalog is at elionmusic.com.\n\nIf you are into Holy Hip-Hop or island vibes, he is worth a follow. No pressure – we would rather you have the link and decide when the time is right. New music and content drop regularly; if you ever want to check him out, we are here." + SOFT_CLOSE + CONTACT_FOOTER,
    html: box(
      "#1e40af",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is our last note. We offered you the chance to stream and follow E Lion – Holy Hip-Hop from Hawaii, Family Feud grand prize winner, 15+ years and 10M+ views. Full catalog at elionmusic.com.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">If you are into Holy Hip-Hop or island vibes, he is worth a follow. No pressure – we would rather you have the link and decide when the time is right.</p>" + SOFT_CLOSE_HTML + "<p style=\"margin:16px 0 0;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#1d4ed8;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;\">elionmusic.com</a></p>"
    ),
  },
  "elion-artists-followup-1": {
    subject: "E Lion – Free collab still on the table (verse, feature, cross-promo)",
    text: "Hi {{Name}},\n\nThis is a quick follow-up. E Lion is still open to a free collaboration with peer artists – one verse, one feature, or something bigger. We are not looking for a handout; we are looking for creatives who want to grow together and cross-promote so both audiences discover something new.\n\nWhy it makes sense: E Lion brings 15+ years, 1,000+ performances, 10M+ YouTube views, and the Family Feud grand prize (2016). Holy Hip-Hop from Hawaii – Hawaiian and Hebrew fusion, broadcast-friendly, no compromise on quality. He has worked with artists and venues nationwide and his catalog is on every major platform.\n\nIf you are open to it, reply \"in\" or \"tell me more\" and we will send you links to the catalog, pick a direction (tempo, vibe, credits), and get down to details. We typically respond within 24–48 hours and would love to make something fire with you." + CONTACT_FOOTER,
    html: box(
      "#7c3aed",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is a quick follow-up. E Lion is still open to a <strong>free collaboration</strong> – one verse, one feature, or something bigger. We are looking for creatives who want to grow together and cross-promote.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">E Lion brings <strong>15+ years</strong>, <strong>1,000+ performances</strong>, <strong>10M+ views</strong>, and the <strong>Family Feud grand prize</strong>. Holy Hip-Hop from Hawaii – broadcast-friendly, no compromise on quality. Catalog on every major platform.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Reply \"in\" or \"tell me more\" and we will send catalog links, pick a direction, and get down to details. We typically respond within 24–48 hours.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#6d28d9;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-artists-followup-2": {
    subject: "One more reason to collab – E Lion (Family Feud, 100+ songs, full credit)",
    text: "Hi {{Name}},\n\nQuick nudge: we are following up because the offer is still on the table. Free collaboration, full credit on every release, and real cross-promotion so both of our audiences hear the track. E Lion has 100+ songs live on Spotify, Apple Music, Amazon, TikTok, and more – and he was the first Hawaiian family to win Family Feud. Your name would sit next to his on every release.\n\nWe have seen collabs like this open doors for both artists. One verse or one feature can lead to more – and we are not asking for a fee, just a mutual fit and a willingness to promote together.\n\nReply \"yes\" or \"tell me more\" and we will get into format, tempo, and credits. No obligation – we just want you to have the option when the timing is right." + CONTACT_FOOTER,
    html: box(
      "#7c3aed",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Quick nudge: the offer is still on the table. <strong>Free collaboration</strong>, <strong>full credit</strong> on every release, and real cross-promotion. E Lion has 100+ songs live and was the first Hawaiian family to win Family Feud. Your name would sit next to his on every release.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">We have seen collabs like this open doors for both artists. One verse or one feature can lead to more – no fee, just a mutual fit and willingness to promote together.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Reply \"yes\" or \"tell me more\" and we will get into format, tempo, and credits. No obligation.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#6d28d9;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-artists-followup-3": {
    subject: "Last note – E Lion collab (free, when you're ready)",
    text: "Hi {{Name}},\n\nThis is our last note. We offered you a free collaboration with E Lion – verse, feature, or something bigger – with full credit and cross-promotion. He brings 15+ years, 10M+ views, and Family Feud credentials; we are looking for peers who want to grow together.\n\nIf the timing is right – now or later – we are still down. One reply and we will take it from there: we will send catalog links, pick a direction, and get into details. No pressure." + SOFT_CLOSE + CONTACT_FOOTER,
    html: box(
      "#7c3aed",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is our last note. We offered you a <strong>free collaboration</strong> with E Lion – full credit and cross-promotion. He brings 15+ years, 10M+ views, and Family Feud credentials.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">If the timing is right – now or later – we are still down. One reply and we will send catalog links, pick a direction, and get into details. No pressure.</p>" + SOFT_CLOSE_HTML + "<p style=\"margin:16px 0 0;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#6d28d9;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;\">elionmusic.com</a></p>"
    ),
  },
  "elion-brands-followup-1": {
    subject: "E Lion – Sponsor spot + link on elionmusic.com (your brand in front of his audience)",
    text: "Hi {{Name}},\n\nThis is a quick follow-up. E Lion is still open to adding your brand as an official sponsor on elionmusic.com – with a direct link to your website – in exchange for store credit or specific gear and apparel. We are looking for partners in recording gear (mics, preamps, cameras, lighting), music software (DAWs, artist tools), and apparel (Hawaii brands, graphic tees, premium looks).\n\nWhy E Lion: 100+ songs on Spotify, Apple Music, Amazon, TikTok, Pandora, and more. Family Feud grand prize (2016, 5 wins) – an estimated 115–145 million unique viewers saw the run. 10M+ YouTube views, 1,000+ live performances, 30K+ CDs sold. High traffic to elionmusic.com and a proven fan base. We are not asking for a free ride – we are offering real visibility and a link in exchange for product or credit.\n\nReply with what you have in mind (gear, software, or apparel) and we will confirm how we add you as a sponsor and what E Lion would wear or use. We typically respond within 24–48 hours." + CONTACT_FOOTER,
    html: box(
      "#1e40af",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is a quick follow-up. E Lion is still open to adding your brand as an <strong>official sponsor on elionmusic.com</strong> with a link to your site – in exchange for store credit or gear/apparel. We are looking for partners in recording gear, music software, and apparel.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Why E Lion: <strong>100+ songs</strong> on all platforms, <strong>Family Feud grand prize</strong> (115M+ viewers), <strong>10M+ YouTube views</strong>, <strong>1,000+ performances</strong>. High traffic to elionmusic.com. We offer real visibility in exchange for product or credit.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Reply with what you have in mind and we will confirm how we add you and what E Lion would wear or use. We typically respond within 24–48 hours.</p><p style=\"margin:24px 0 0;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#1d4ed8;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-brands-followup-2": {
    subject: "One more reason – E Lion sponsor (115M+ Family Feud reach + link to your site)",
    text: "Hi {{Name}},\n\nQuick nudge: your brand in front of an estimated 115M+ Family Feud viewers and an artist with 100+ songs live on every major platform. We add you as an official sponsor on elionmusic.com with a link to your website; you provide product or store credit (recording gear, software, or apparel). No long-term contract – just a clear exchange that puts your name in front of an audience that trusts the artist.\n\nE Lion has played Waikiki Shell, Blaisdell, and venues nationwide. His fans buy music, merch, and follow his recommendations. Sponsor placement means real visibility – not a one-off post, but a permanent spot on the site where his team and new listeners go.\n\nReply \"yes\" or \"tell me more\" and we will get into what you offer and how we list you. No obligation." + CONTACT_FOOTER,
    html: box(
      "#1e40af",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Your brand in front of <strong>115M+ Family Feud viewers</strong> and an artist with <strong>100+ songs live</strong>. We add you as a sponsor on elionmusic.com with a link; you provide product or credit. No long-term contract – just a clear exchange.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">E Lion has played Waikiki Shell, Blaisdell, and venues nationwide. His fans follow his recommendations. Sponsor placement means real visibility – a permanent spot on the site.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Reply \"yes\" or \"tell me more\" and we will get into what you offer and how we list you. No obligation.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#1d4ed8;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-brands-followup-3": {
    subject: "Last note – E Lion sponsor spot (we add you + link, when you're ready)",
    text: "Hi {{Name}},\n\nThis is our last note. We are still offering sponsor placement and a link on elionmusic.com in exchange for product or store credit – recording gear, music software, or apparel. E Lion has 100+ songs live, Family Feud reach, and 10M+ YouTube views; your brand would sit alongside his on the site where his team and fans look for partners and gear.\n\nIf you are open – now or in the future – one quick reply gets you on the page. We will confirm what we need and how we list you. No pressure." + SOFT_CLOSE + CONTACT_FOOTER,
    html: box(
      "#1e40af",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is our last note. We are still offering <strong>sponsor placement + link on elionmusic.com</strong> for product or store credit. E Lion has 100+ songs, Family Feud reach, 10M+ views – your brand would sit alongside his on the site.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">If you are open – now or later – one quick reply gets you on the page. We will confirm what we need and how we list you. No pressure.</p>" + SOFT_CLOSE_HTML + "<p style=\"margin:16px 0 0;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#1d4ed8;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;\">elionmusic.com</a></p>"
    ),
  },
  "elion-producers-followup-1": {
    subject: "E Lion – Still looking for beats (your name on every release)",
    text: "Hi {{Name}},\n\nThis is a quick follow-up. E Lion would still love exclusive access to your beats for upcoming releases. You get full credit on every track and every platform – no ghost credits, no disappearing producer name. Your name stays on the record wherever it goes: Spotify, Apple Music, Amazon, TikTok, and beyond.\n\nWhy send to E Lion: 15+ years in the game, 10M+ YouTube views, Family Feud grand prize winner (2016), and 100+ songs already live. He works with producers who bring quality and clarity; we get into format, BPM, and credits up front so there are no surprises. Many producers have seen their work reach new audiences through his catalog and live shows.\n\nReply with a link to your beats or \"tell me more\" and we will get into format, tempo, and how we credit you. We typically respond within 24–48 hours." + CONTACT_FOOTER,
    html: box(
      "#ea580c",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is a quick follow-up. E Lion would still love <strong>exclusive access to your beats</strong>. You get <strong>full credit</strong> on every release and every platform – no ghost credits.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Why send to E Lion: 15+ years, 10M+ views, Family Feud winner, 100+ songs live. We get into format, BPM, and credits up front. Many producers have seen their work reach new audiences through his catalog.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Reply with a link or \"tell me more\" and we will get into format and credits. We typically respond within 24–48 hours.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#c2410c;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-producers-followup-2": {
    subject: "One more reason to send beats – E Lion (100+ songs, all platforms)",
    text: "Hi {{Name}},\n\nQuick nudge: your name on every release – no ghost credits, no \"prod. by ???\". E Lion has 100+ songs live on every major platform and was the first Hawaiian family to win Family Feud. When he drops a track, it goes to Spotify, Apple Music, Amazon, TikTok, Pandora, and more; your producer credit goes with it.\n\nWe are looking for beats that fit Holy Hip-Hop and island vibes – something that bumps and still leaves room for message and melody. If you have a pack or a few singles you think would work, reply with a link or \"tell me more\" and we will listen and get back to you with format and credit details.\n\nNo obligation. We would rather have your info and reach out when the right track is in the pipeline." + CONTACT_FOOTER,
    html: box(
      "#ea580c",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Your name on every release – <strong>no ghost credits</strong>. E Lion has 100+ songs live and was the first Hawaiian family to win Family Feud. When he drops a track, your producer credit goes with it to every platform.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">We are looking for beats that fit Holy Hip-Hop and island vibes. If you have a pack or singles that would work, reply with a link or \"tell me more\" and we will listen and get back with format and credit details.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">No obligation. We would rather have your info and reach out when the right track is in the pipeline.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#c2410c;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-producers-followup-3": {
    subject: "Last note – E Lion beats (when you're ready to get your name on a release)",
    text: "Hi {{Name}},\n\nThis is our last note. We are still looking for beats for exclusive use with full credit – your name on every release, every platform. E Lion has 100+ songs live and drops new music regularly; when the right beat fits, we want to know where to find you.\n\nIf the timing is right – now or later – one reply and we will get into format, BPM, and how we credit you. No pressure. We would rather have your link on file and reach out when a project fits." + SOFT_CLOSE + CONTACT_FOOTER,
    html: box(
      "#ea580c",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is our last note. We are still looking for beats for <strong>exclusive use with full credit</strong> – your name on every release. E Lion has 100+ songs live and drops new music regularly.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">If the timing is right – now or later – one reply and we will get into format, BPM, and credits. No pressure.</p>" + SOFT_CLOSE_HTML + "<p style=\"margin:16px 0 0;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#c2410c;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;\">elionmusic.com</a></p>"
    ),
  },
  "elion-venue-church-followup-1": {
    subject: "E Lion – Worship, DJ & youth rap for your church (quick follow-up)",
    text: "Hi {{Name}},\n\nThis is a quick follow-up. We would still be honored to bring E Lion to your church – whether you need a full concert, a keynote with music, a youth night, or DJ E Lion for an event. He has 1,000+ performances under his belt, the Family Feud grand prize (2016), and he regularly ministers at churches and venues that want Holy Hip-Hop and island vibes with a clear message.\n\nHe can tailor a set list to your theme (P48X, Prayer Authority, or general worship and outreach) and bring energy that connects with youth and adults. Waikiki Shell, Blaisdell, HebrewFest, and churches nationwide have already hosted him – we can send credentials and a sample set list so you can see the fit.\n\nReply with a date or \"tell me more\" and we will send a set list, rider, and rate. We typically respond within 24–48 hours." + CONTACT_FOOTER,
    html: box(
      "#b45309",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is a quick follow-up. We would still be honored to bring E Lion to your church – <strong>full concert</strong>, <strong>keynote</strong>, <strong>youth night</strong>, or <strong>DJ</strong>. He has 1,000+ performances and the Family Feud grand prize.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">He can tailor a set list to your theme (P48X, Prayer Authority, or general worship). Waikiki Shell, Blaisdell, HebrewFest, and churches nationwide have hosted him. We can send credentials and a sample set list.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Reply with a date or \"tell me more\" and we will send set list, rider, and rate. We typically respond within 24–48 hours.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#92400e;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-venue-church-followup-2": {
    subject: "One more reason to book E Lion – worship, youth night, or DJ (Family Feud winner)",
    text: "Hi {{Name}},\n\nQuick nudge: full concert or keynote, custom set list, ministry and music in one package. E Lion has played Waikiki Shell, Blaisdell, HebrewFest, and churches across the islands and mainland. He brings Holy Hip-Hop that uplifts – no compromise on message or quality – and he can adapt to your format: worship night, youth rally, outreach event, or DJ set.\n\nMany churches tell us their youth connected in a new way when they heard someone who speaks their language and still points to Scripture. If you have been considering a different kind of night – something that draws a crowd and leaves them with something to think about – we would love to send you a set list and details.\n\nReply with your ideal date(s) and we will send credentials and rate. No obligation." + CONTACT_FOOTER,
    html: box(
      "#b45309",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Full concert or keynote, <strong>custom set list</strong>, ministry and music in one package. E Lion has played Waikiki Shell, Blaisdell, HebrewFest, and churches nationwide. He can adapt to your format: worship night, youth rally, outreach, or DJ set.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Many churches say their youth connected in a new way. If you have been considering a different kind of night – something that draws a crowd and leaves them with something to think about – we would love to send a set list and details.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Reply with your ideal date(s) and we will send credentials and rate. No obligation.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#92400e;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-venue-church-followup-3": {
    subject: "Last note – E Lion for your church (when you're ready)",
    text: "Hi {{Name}},\n\nThis is our last note. E Lion is still available for church events – concert, keynote, youth night, or DJ. He has 1,000+ performances, the Family Feud grand prize, and a set list that fits worship, outreach, and youth ministry. We have sent you the offer twice; we do not want to fill your inbox, but we did want you to have the option.\n\nIf you ever want to explore a date – this season or next – reply with your church name and ideal timing and we will send a set list and details. No pressure." + SOFT_CLOSE + CONTACT_FOOTER,
    html: box(
      "#b45309",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is our last note. E Lion is still available for church events – concert, keynote, youth night, or DJ. 1,000+ performances, Family Feud grand prize, set list that fits worship and youth ministry.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">If you ever want to explore a date – this season or next – reply with your church name and ideal timing and we will send a set list and details. No pressure.</p>" + SOFT_CLOSE_HTML + "<p style=\"margin:16px 0 0;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#92400e;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;\">elionmusic.com</a></p>"
    ),
  },
  "elion-venue-show-followup-1": {
    subject: "E Lion – Book him for your stage (115M+ reach, local draw, door + merch)",
    text: "Hi {{Name}},\n\nThis is a quick follow-up. E Lion is still available for your festival or stage show. You book the stage – we bring the crowd. He has already packed Waikiki Shell, Blaisdell, and HebrewFest; he promotes every show to his local fanbase so people show up, and he works with you on door tickets and merch (shirts, hats, USBs, CDs) so your night runs smooth.\n\nAn estimated 115–145 million viewers saw his Family Feud grand prize run. 15+ years, 1,000+ performances, 10M+ YouTube views. He delivers a full set – 1hr+ original Holy Hip-Hop, speaking, and audience interaction – custom to fit your night. Venues keep saying yes because he draws and he delivers.\n\nReply with event name and date(s) and we will send credentials, set list, and rate. We typically respond within 24–48 hours." + CONTACT_FOOTER,
    html: box(
      "#b91c1c",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is a quick follow-up. E Lion is still available for your festival or stage. <strong>You book the stage – we bring the crowd.</strong> He has packed Waikiki Shell, Blaisdell, HebrewFest; he promotes every show to his fanbase and works with you on door tickets and merch.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">An estimated <strong>115–145M</strong> saw his Family Feud run. 15+ years, 1,000+ performances, 10M+ views. Full set – 1hr+ Holy Hip-Hop, speaking, audience interaction – custom to your night.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Reply with event name and date(s) and we will send credentials, set list, and rate. We typically respond within 24–48 hours.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#991b1b;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-venue-show-followup-2": {
    subject: "One more reason – E Lion packs venues (Waikiki Shell, Blaisdell – set list + merch)",
    text: "Hi {{Name}},\n\nQuick nudge: full concert, custom set list, and an artist who can actually draw and deliver. E Lion was the first Hawaiian family to win Family Feud (5 consecutive episodes); he has played Waikiki Shell, Blaisdell, and Republik-style rooms. He brings his own fanbase to the room and works with you on door and merch so the night is a win for the venue.\n\nMany promoters tell us they wanted an act that would show up, perform at a high level, and leave the crowd talking. E Lion does that – Holy Hip-Hop, island vibes, and a set that runs tight. If you have a slot this season or next, we would love to get into rider and rate.\n\nReply with your slot and we will send a set list and make it happen. No obligation." + CONTACT_FOOTER,
    html: box(
      "#b91c1c",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Full concert, <strong>custom set list</strong>, artist who can draw and deliver. First Hawaiian family to win Family Feud. Waikiki Shell, Blaisdell, Republik-style rooms. He brings his fanbase and works with you on door and merch.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Many promoters want an act that shows up, performs at a high level, and leaves the crowd talking. E Lion does that – Holy Hip-Hop, island vibes, tight set.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Reply with your slot and we will send set list and make it happen. No obligation.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#991b1b;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-venue-show-followup-3": {
    subject: "Last note – E Lion for your stage (when you're ready to fill the room)",
    text: "Hi {{Name}},\n\nThis is our last note. E Lion is still available for festivals and stage shows. He has 115M+ Family Feud reach, 1,000+ performances, and a track record of packing rooms and working with venues on door and merch. We have sent you the offer twice; we do not want to clutter your inbox, but we did want you to have the option.\n\nIf you ever have a slot – this season or next – reply and we will send credentials, set list, and rate. One reply and we can make it happen. No pressure." + SOFT_CLOSE + CONTACT_FOOTER,
    html: box(
      "#b91c1c",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is our last note. E Lion is still available for festivals and stage shows. 115M+ Family Feud reach, 1,000+ performances, track record of packing rooms and working with venues on door and merch.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">If you ever have a slot – this season or next – reply and we will send credentials, set list, and rate. No pressure.</p>" + SOFT_CLOSE_HTML + "<p style=\"margin:16px 0 0;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#991b1b;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;\">elionmusic.com</a></p>"
    ),
  },
  "elion-venue-dj-followup-1": {
    subject: "DJ E Lion for your event – quick follow-up (book the DJ, he brings the vibe)",
    text: "Hi {{Name}},\n\nThis is a quick follow-up. DJ E Lion is still available for your event – wedding, party, church bash, corporate, or festival. He has 1,000+ stages under his belt and brings a family-friendly, high-energy set that mixes his own Holy Hip-Hop and island vibes with clean edits and crowd-ready tracks. He is the same E Lion who won Family Feud and has 10M+ YouTube views – so you get a name people recognize and a DJ who knows how to read a room.\n\nWe get into what you need: duration, PA, tables, and whether you want him to MC or just spin. Many clients book him for events where they want energy without worry – something the whole room can enjoy.\n\nReply with event type and date(s) and we will get into rate and setup. We typically respond within 24–48 hours." + CONTACT_FOOTER,
    html: box(
      "#6d28d9",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is a quick follow-up. <strong>DJ E Lion</strong> is still available for your event – wedding, party, church bash, corporate, or festival. <strong>1,000+ stages</strong>, family-friendly, high-energy. Same E Lion who won Family Feud and has 10M+ views.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">We get into what you need: duration, PA, tables, MC or just spin. Many clients book him for events where they want energy without worry.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Reply with event type and date(s) and we will get into rate and setup. We typically respond within 24–48 hours.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#5b21b6;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-venue-dj-followup-2": {
    subject: "One more reason – DJ E Lion (Holy Hip-Hop, island vibes, 15+ years)",
    text: "Hi {{Name}},\n\nQuick nudge: DJ E Lion brings a clean set – his own music and more – with 15+ years of experience and the Family Feud credential that makes him a conversation starter. He has spun at churches, parties, and events where the host wanted a vibe that was high-energy but still appropriate for mixed crowds. You get a name, a catalog, and a DJ who shows up on time and works with your setup.\n\nReply with duration and what you need (PA, tables, MC or just music) and we will turn it up. We can send a sample set list and rate so you can decide if he fits your event. No obligation." + CONTACT_FOOTER,
    html: box(
      "#6d28d9",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">DJ E Lion brings a <strong>clean set</strong> – his own music and more – <strong>15+ years</strong> and Family Feud. He has spun at churches, parties, and events where hosts wanted high-energy but appropriate for mixed crowds.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">You get a name, a catalog, and a DJ who shows up on time and works with your setup. Reply with duration and what you need (PA, tables, MC or just music) and we will send sample set list and rate.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">No obligation.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#5b21b6;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-venue-dj-followup-3": {
    subject: "Last note – DJ E Lion for your event (when you're ready)",
    text: "Hi {{Name}},\n\nThis is our last note. DJ E Lion is still available if you have a date. He brings Holy Hip-Hop, island vibes, and 15+ years of experience – family-friendly, high-energy, and a name that draws. We have sent you the offer twice; we do not want to fill your inbox, but we did want you to have the option.\n\nIf you ever want to book him – this season or next – one reply and we will get into rate and setup. No pressure." + SOFT_CLOSE + CONTACT_FOOTER,
    html: box(
      "#6d28d9",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is our last note. DJ E Lion is still available if you have a date. Holy Hip-Hop, island vibes, 15+ years – family-friendly, high-energy, a name that draws.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">If you ever want to book him – this season or next – one reply and we will get into rate and setup. No pressure.</p>" + SOFT_CLOSE_HTML + "<p style=\"margin:16px 0 0;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#5b21b6;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;\">elionmusic.com</a></p>"
    ),
  },
  "elion-venue-major-followup-1": {
    subject: "E Lion – Opening for major artists at your venue (quick follow-up)",
    text: "Hi {{Name}},\n\nThis is a quick follow-up. E Lion is still interested in opening slots at your venue when you host major artists. He has already played Waikiki Shell and Blaisdell and has the experience to warm up a room without overshadowing the headliner. Full set, professional rider, and a team that works with your production so the night runs smooth.\n\nHe brings 15+ years, 1,000+ performances, and the Family Feud grand prize – so he is a name that adds credibility to your bill and can draw local fans who might not have come otherwise. If you have or expect opening slots for local or regional artists, we would love to send credentials and a set list so you can keep him in mind.\n\nReply if you have or expect opening slots and we will send credentials and stay in touch. We typically respond within 24–48 hours." + CONTACT_FOOTER,
    html: box(
      "#15803d",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is a quick follow-up. E Lion is still interested in <strong>opening slots</strong> at your venue when you host major artists. He has played <strong>Waikiki Shell and Blaisdell</strong> – full set, professional rider, team that works with your production.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">15+ years, 1,000+ performances, Family Feud grand prize – a name that adds credibility to your bill and can draw local fans. If you have or expect opening slots, we would love to send credentials and a set list.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Reply and we will send credentials and stay in touch. We typically respond within 24–48 hours.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#166534;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-venue-major-followup-2": {
    subject: "One more reason – E Lion for opening slots (Family Feud, 10M+ views, local draw)",
    text: "Hi {{Name}},\n\nQuick nudge: 15+ years, 1,000+ performances, Family Feud grand prize. E Lion has already played Waikiki Shell and Blaisdell and knows how to open for a major act – energy that builds, no diva behavior, and a set that leaves the crowd ready for the headliner. He has 10M+ YouTube views and a local fanbase that shows up when he is on the bill.\n\nIf you have opening slots for local or regional artists – or you are putting together a bill and want a strong opener – reply and we will send a set list and credentials. We are happy to stay in touch so when the right slot comes up you have his info on file.\n\nNo obligation. We just want you to know he is available when the fit is right." + CONTACT_FOOTER,
    html: box(
      "#15803d",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\"><strong>15+ years</strong>, <strong>1,000+ performances</strong>, <strong>Family Feud grand prize</strong>. E Lion has played Waikiki Shell and Blaisdell – he knows how to open for a major act. Energy that builds, no diva behavior. <strong>10M+ views</strong>, local fanbase that shows up.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">If you have opening slots for local or regional artists, reply and we will send set list and credentials. We are happy to stay in touch so when the right slot comes up you have his info.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">No obligation.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#166534;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-venue-major-followup-3": {
    subject: "Last note – E Lion opening slots (when you're ready)",
    text: "Hi {{Name}},\n\nThis is our last note. E Lion is still interested in opening for major artists at your venue when the right slot comes up. He has Waikiki Shell and Blaisdell experience, a full set, and a professional rider – and he brings a local draw and Family Feud credibility that can help fill the room before the headliner hits the stage.\n\nWe have sent you the offer twice; we do not want to clutter your inbox. If you ever have an opening slot – this season or next – reply anytime and we will send credentials and a set list. No pressure." + SOFT_CLOSE + CONTACT_FOOTER,
    html: box(
      "#15803d",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is our last note. E Lion is still interested in opening when the right slot comes up. Waikiki Shell and Blaisdell experience, full set, professional rider – local draw and Family Feud credibility.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">If you ever have an opening slot – this season or next – reply anytime and we will send credentials and set list. No pressure.</p>" + SOFT_CLOSE_HTML + "<p style=\"margin:16px 0 0;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#166534;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;\">elionmusic.com</a></p>"
    ),
  },
  "elion-record-label-mainstream-followup-1": {
    subject: "E Lion – Record label pitch (100+ songs, Family Feud 115M+, Shine BTS – funding, festivals)",
    text: "Hi {{Name}},\n\nQuick follow-up. E Lion – 100+ songs on every platform, Family Feud grand prize (115M+ saw), Shine behind-the-scenes – is still looking for a record label or partner. He needs funding to record in proper studios, travel and perform at festivals and conferences, and get out of Hawaii. Suno for some production, but he writes every lyric. 10M+ YouTube views, 1,000+ performances, 30K+ CDs sold.\n\nIf you have a second, watch the Shine BTS: https://www.youtube.com/watch?v=4Qqs7JSOHmA – then stream him on Spotify, Apple Music, or elionmusic.com. If there is a fit for funding, distribution, or a deal, reply and we will send a one-sheet and links. We typically respond within 24–48 hours." + CONTACT_FOOTER,
    html: box(
      "#b45309",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Quick follow-up. E Lion – <strong>100+ songs</strong> on every platform, <strong>Family Feud grand prize (115M+ saw)</strong>, <strong>Shine BTS</strong> – is still looking for a label or partner. Funding for studios, travel, festivals, get him out of Hawaii. He writes every lyric; some tracks use Suno.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Watch Shine BTS: <a href=\"https://www.youtube.com/watch?v=4Qqs7JSOHmA\" style=\"color:#b45309;\">YouTube</a>. Stream: Spotify, Apple Music, <a href=\"https://www.elionmusic.com\" style=\"color:#b45309;\">elionmusic.com</a>. If there is a fit for funding, distribution, or a deal, reply and we will send a one-sheet. We typically respond within 24–48 hours.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.youtube.com/watch?v=4Qqs7JSOHmA\" style=\"display:inline-block;background:rgba(180,83,9,0.2);color:#b45309;border:2px solid #d97706;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:700;\">Shine BTS</a> <a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#d97706;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-record-label-mainstream-followup-2": {
    subject: "One more reason – E Lion (100+ songs, 115M+ Family Feud – label / funding / festivals)",
    text: "Hi {{Name}},\n\nQuick nudge. E Lion has 100+ songs live, Family Feud reach (115–145M viewers), and a clear ask: funding to record in proper studios, travel and perform at festivals and conferences, and get out of Hawaii. He has a video guy, makes new music constantly (Suno + his lyrics), and has been compared to Justin Bieber. Shine behind-the-scenes: https://www.youtube.com/watch?v=4Qqs7JSOHmA\n\nIf your label is looking for an artist with catalog, proof, and hunger – reply and we will send a one-sheet, streaming links, and the BTS. No obligation; we just want you to have the option when the fit is right." + CONTACT_FOOTER,
    html: box(
      "#b45309",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">E Lion has <strong>100+ songs</strong>, <strong>Family Feud reach (115M+)</strong>, and a clear ask: funding, studios, travel, festivals – get him out of Hawaii. Video guy, new music constantly (Suno + his lyrics). <a href=\"https://www.youtube.com/watch?v=4Qqs7JSOHmA\" style=\"color:#b45309;\">Shine BTS</a>.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">If your label is looking for an artist with catalog, proof, and hunger – reply and we will send a one-sheet and links. No obligation.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#d97706;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-record-label-mainstream-followup-3": {
    subject: "Last note – E Lion label pitch (100+ songs, Shine BTS – when you're ready)",
    text: "Hi {{Name}},\n\nThis is our last note. E Lion – 100+ songs on every platform, Family Feud (115M+ saw), Shine behind-the-scenes – is still looking for a label or partner for funding, distribution, and festivals. We have sent the pitch twice; we do not want to fill your inbox.\n\nIf the fit is right – now or later – one reply and we will send a one-sheet, streaming links, and the BTS. No pressure." + SOFT_CLOSE + CONTACT_FOOTER,
    html: box(
      "#b45309",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is our last note. E Lion – 100+ songs, Family Feud (115M+), Shine BTS – still looking for a label or partner. If the fit is right – now or later – one reply and we will send a one-sheet and links. No pressure.</p>" + SOFT_CLOSE_HTML + "<p style=\"margin:16px 0 0;\"><a href=\"https://www.youtube.com/watch?v=4Qqs7JSOHmA\" style=\"display:inline-block;background:rgba(180,83,9,0.2);color:#b45309;border:2px solid #d97706;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;\">Shine BTS</a> <a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#d97706;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;\">elionmusic.com</a></p>"
    ),
  },
  "elion-record-label-christian-followup-1": {
    subject: "E Lion – Christian label pitch (100+ songs, Family Feud 115M+, world tour vision)",
    text: "Hi {{Name}},\n\nQuick follow-up. E Lion – Holy Hip-Hop from Hawaii, 100+ songs on every platform, Family Feud grand prize (115M+ saw) – is still looking for a Christian record label or partner. He put together a 2012 world tour video and would like to see it come to pass. Funding for studios, travel, festivals, get him out of Hawaii. He writes every lyric; some tracks use Suno. 10M+ views, 1,000+ performances, 30K+ CDs.\n\nWatch the world tour video: https://www.youtube.com/watch?v=2ZqlEh2ye4g – then stream on Spotify, Apple Music, or elionmusic.com. If there is a fit for funding, distribution, or a deal, reply and we will send a one-sheet. We typically respond within 24–48 hours." + CONTACT_FOOTER,
    html: box(
      "#6d28d9",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Quick follow-up. E Lion – Holy Hip-Hop from Hawaii, <strong>100+ songs</strong>, <strong>Family Feud (115M+ saw)</strong> – is still looking for a Christian label or partner. He has a <strong>2012 world tour video</strong> and would like to see it come to pass. Funding, studios, travel, festivals.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">Watch: <a href=\"https://www.youtube.com/watch?v=2ZqlEh2ye4g\" style=\"color:#6d28d9;\">World Tour video</a>. Stream: <a href=\"https://www.elionmusic.com\" style=\"color:#6d28d9;\">elionmusic.com</a>. If there is a fit, reply and we will send a one-sheet. We typically respond within 24–48 hours.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.youtube.com/watch?v=2ZqlEh2ye4g\" style=\"display:inline-block;background:rgba(109,40,217,0.2);color:#6d28d9;border:2px solid #7c3aed;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:700;\">World Tour video</a> <a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#7c3aed;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-record-label-christian-followup-2": {
    subject: "One more reason – E Lion (Holy Hip-Hop, 100+ songs, world tour – label / funding)",
    text: "Hi {{Name}},\n\nQuick nudge. E Lion – Holy Hip-Hop from Hawaii, 100+ songs live, Family Feud reach – is still looking for a Christian label or partner. He put together a 2012 world tour video and would like to see it come to pass. Messianic rapper, Hawaiian and Hebrew fusion, broadcast-friendly. Funding for studios, travel, festivals.\n\nWorld tour video: https://www.youtube.com/watch?v=2ZqlEh2ye4g. Full catalog at elionmusic.com. If your label is looking for an artist with catalog, proof, and a clear vision – reply and we will send a one-sheet. No obligation." + CONTACT_FOOTER,
    html: box(
      "#6d28d9",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">E Lion – Holy Hip-Hop, <strong>100+ songs</strong>, <strong>Family Feud reach</strong>. He has a <strong>2012 world tour video</strong> and would like to see it come to pass. Messianic rapper, broadcast-friendly. Funding, studios, festivals.</p><p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\"><a href=\"https://www.youtube.com/watch?v=2ZqlEh2ye4g\" style=\"color:#6d28d9;\">World Tour video</a> · <a href=\"https://www.elionmusic.com\" style=\"color:#6d28d9;\">elionmusic.com</a>. If your label is looking for catalog, proof, and vision – reply and we will send a one-sheet. No obligation.</p><p style=\"margin:0 0 20px;\"><a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#7c3aed;color:#fff;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;\">elionmusic.com</a></p>"
    ),
  },
  "elion-record-label-christian-followup-3": {
    subject: "Last note – E Lion Christian label pitch (world tour vision – when you're ready)",
    text: "Hi {{Name}},\n\nThis is our last note. E Lion – Holy Hip-Hop, 100+ songs, Family Feud (115M+ saw), 2012 world tour vision – is still looking for a Christian label or partner. We have sent the pitch twice; we do not want to fill your inbox.\n\nIf the fit is right – now or later – one reply and we will send a one-sheet and the world tour video link. No pressure." + SOFT_CLOSE + CONTACT_FOOTER,
    html: box(
      "#6d28d9",
      "<p style=\"margin:0 0 18px;font-size:15px;line-height:1.65;\">This is our last note. E Lion – Holy Hip-Hop, 100+ songs, Family Feud, world tour vision – still looking for a Christian label or partner. If the fit is right – now or later – one reply and we will send a one-sheet and the world tour link. No pressure.</p>" + SOFT_CLOSE_HTML + "<p style=\"margin:16px 0 0;\"><a href=\"https://www.youtube.com/watch?v=2ZqlEh2ye4g\" style=\"display:inline-block;background:rgba(109,40,217,0.2);color:#6d28d9;border:2px solid #7c3aed;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;\">World Tour video</a> <a href=\"https://www.elionmusic.com\" style=\"display:inline-block;background:#7c3aed;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:600;\">elionmusic.com</a></p>"
    ),
  },
};
