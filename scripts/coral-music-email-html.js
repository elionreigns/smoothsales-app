/**
 * coral-music HTML builder — mirrored for local Resend fallback in custom-shell.
 * Keep in sync with servicebot/src/lib/coral-task-killer-templates.ts MUSIC_HTML.
 */

function escHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escBodyForEmail(plain) {
  return escHtml(plain).replace(/\n/g, '<br>');
}

const DEFAULT_FESTIVAL_BODY =
  "I'm reaching out to ask whether your festival is accepting 2027 artists for a paid festival set. E Lion is a faith-rooted Holy Hip-Hop artist from Honolulu with a 2016 Family Feud grand-prize win, 1,000+ live performances, 10M+ YouTube views, and an interactive festival EPK. I can deliver a clean 5–8 song set with audience interaction and promote the date to my audience. For a mainland booking, I'm looking for a paid performance fee plus round-trip Hawaii travel, hotel, and local ground transportation covered by the promoter. If the fit is right, I'm glad to send a set list, tech needs, and a short call time.";

function buildCoralMusicEmailHtml({ name = 'there', org = 'your festival', body } = {}) {
  const who = escHtml(name || 'there');
  const fest = escHtml(org || 'your festival');
  const bodyHtml = escBodyForEmail(body || DEFAULT_FESTIVAL_BODY);

  return [
    '<!DOCTYPE html><html><head><meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1">',
    '<meta name="color-scheme" content="light dark">',
    '<style>',
    '@media only screen and (max-width:620px){',
    '.epk-wrap{width:100%!important;max-width:100%!important}',
    '.epk-pad{padding:20px 16px!important}',
    '.epk-h1{font-size:22px!important}',
    '.epk-stat-cell{display:block!important;width:100%!important;margin-bottom:8px!important}',
    '.epk-photo-cell{display:block!important;width:100%!important;padding:6px 0!important}',
    '.epk-btn{display:block!important;width:100%!important;margin:8px 0!important;text-align:center!important;box-sizing:border-box!important}',
    '}',
    '</style></head>',
    '<body style="margin:0;padding:0;background:#0b0b12;font-family:Segoe UI,system-ui,sans-serif;color:#f0e6ff;">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b12;padding:16px 8px;"><tr><td align="center">',
    '<table role="presentation" class="epk-wrap" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border:2px solid #ffd700;border-radius:20px;overflow:hidden;background:#14141f;">',

    '<tr><td style="background:linear-gradient(145deg,#1a0a2e,#2d1b4e 50%,#0f3460);padding:28px 24px;text-align:center;" class="epk-pad">',
    '<img src="https://www.elionmusic.com/elionmusiclogoz.png" width="88" height="88" alt="E Lion Music" style="display:block;margin:0 auto 12px;border-radius:50%;">',
    '<p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.2em;color:#ffd700;text-transform:uppercase;">Electronic Press Kit · Festival Booking</p>',
    '<h1 class="epk-h1" style="margin:0;font-size:26px;color:#fff;font-weight:800;">E Lion</h1>',
    '<p style="margin:10px 0 0;font-size:13px;color:#e8d4ff;">2027 Festival Booking · Honolulu Holy Hip-Hop · Hawaii → mainland</p>',
    '</td></tr>',

    '<tr><td class="epk-pad" style="padding:24px 28px;background:#14141f;">',
    '<p style="margin:0 0 16px;font-size:17px;font-weight:600;color:#fff;">Hi ', who, ',</p>',
    '<div style="font-size:15px;line-height:1.65;color:#e0d4f8;margin-bottom:20px;">', bodyHtml, '</div>',

    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;"><tr>',
    '<td class="epk-stat-cell" width="33%" style="text-align:center;padding:10px 6px;background:#1c1c2a;border-radius:12px;">',
    '<div style="font-size:22px;font-weight:800;color:#ffd700;">30K+</div><div style="font-size:11px;color:#a8a0b8;">Pandora monthly</div></td>',
    '<td class="epk-stat-cell" width="33%" style="text-align:center;padding:10px 6px;background:#1c1c2a;border-radius:12px;">',
    '<div style="font-size:22px;font-weight:800;color:#ffd700;">500K+</div><div style="font-size:11px;color:#a8a0b8;">Total streams</div></td>',
    '<td class="epk-stat-cell" width="33%" style="text-align:center;padding:10px 6px;background:#1c1c2a;border-radius:12px;">',
    '<div style="font-size:22px;font-weight:800;color:#ffd700;">115M+</div><div style="font-size:11px;color:#a8a0b8;">Family Feud reach</div></td>',
    '</tr></table>',

    '<p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#ff6bcb;text-transform:uppercase;">Why book E Lion</p>',
    '<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#d4c8f0;">',
    '<strong>1,000+ live shows</strong> · <strong>10M+ YouTube views</strong> · Waikiki Shell, Blaisdell, HebrewFest. ',
    'Clean <strong>5–8 song Holy Hip-Hop set</strong> with speaking, audience interaction, and promoter-friendly timing. E Lion promotes the date to his audience and can bring merch.</p>',
    '<div style="margin:0 0 18px;padding:14px 16px;border-left:3px solid #ffd700;background:#1c1c2a;border-radius:10px;color:#f3eaff;font-size:14px;line-height:1.6;"><strong style="color:#ffd700;">Booking package requested:</strong> paid performance fee plus round-trip Hawaii travel, hotel, and local ground transportation for a mainland date. Set list, tech needs, and a short call are available on request.</div>',

    '<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#ff6bcb;text-transform:uppercase;">Celebrity proof · CD slider highlights</p>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>',
    '<td class="epk-photo-cell" width="33%" style="padding:4px;text-align:center;">',
    '<a href="https://www.elionmusic.com/downloads/festival-epk/"><img src="https://www.elionmusic.com/images/cdz/elion-cd-hustle-with-steve-harvey.webp" width="170" alt="E Lion with Steve Harvey" style="max-width:100%;height:auto;border-radius:10px;border:2px solid rgba(255,215,0,0.3);"></a></td>',
    '<td class="epk-photo-cell" width="33%" style="padding:4px;text-align:center;">',
    '<a href="https://www.elionmusic.com/downloads/festival-epk/"><img src="https://www.elionmusic.com/images/cdz/elion-cd-hustle-with-nick-cannon.webp" width="170" alt="E Lion with Nick Cannon" style="max-width:100%;height:auto;border-radius:10px;border:2px solid rgba(255,215,0,0.3);"></a></td>',
    '<td class="epk-photo-cell" width="33%" style="padding:4px;text-align:center;">',
    '<a href="https://www.elionmusic.com/downloads/festival-epk/"><img src="https://www.elionmusic.com/images/cdz/elion-cd-hustle-with-fabio.webp" width="170" alt="E Lion with Fabio" style="max-width:100%;height:auto;border-radius:10px;border:2px solid rgba(255,215,0,0.3);"></a></td>',
    '</tr></table>',

    '<p style="margin:16px 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;color:#ff6bcb;text-transform:uppercase;">Links &amp; proof</p>',
    '<p style="margin:0 0 16px;font-size:14px;line-height:1.7;">',
    '<a href="https://www.elionmusic.com/downloads/festival-epk/" style="color:#00d4ff;">Festival EPK</a> · ',
    '<a href="https://www.elionmusic.com/downloads/" style="color:#00d4ff;">Downloads</a> · ',
    '<a href="https://www.elionmusic.com/presskit/" style="color:#00d4ff;">Press Kit</a> · ',
    '<a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" style="color:#00d4ff;">Family Feud Grand Prize</a> · ',
    '<a href="https://www.pandora.com/artist/e-lion/AR9vZJllkt3JmVq" style="color:#00d4ff;">Pandora</a> · ',
    '<a href="https://youtube.com/@elionreigns" style="color:#00d4ff;">YouTube</a> · ',
    '<a href="https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA" style="color:#00d4ff;">Spotify</a> · ',
    '<a href="https://www.elionmusic.com/rap/" style="color:#00d4ff;">Catalog</a> · ',
    '<a href="https://www.elionmusic.com/wiki/" style="color:#00d4ff;">Wiki</a></p>',

    '<p style="margin:0 0 12px;"><a class="epk-btn" href="https://www.elionmusic.com/downloads/festival-epk/" style="display:inline-block;background:linear-gradient(135deg,#ffd700,#c9a227);color:#1a1200;padding:14px 28px;text-decoration:none;border-radius:999px;font-weight:700;font-size:15px;">View Festival EPK →</a></p>',
    '<p style="margin:0 0 10px;"><a class="epk-btn" href="https://www.elionmusic.com/presskit/" style="display:inline-block;background:rgba(255,107,203,0.2);color:#ff6bcb;border:2px solid #ff6bcb;padding:12px 24px;text-decoration:none;border-radius:999px;font-weight:700;font-size:14px;">Press Kit &amp; Booking</a></p>',

    '<p style="margin:20px 0 0;font-size:14px;color:#c8b8ff;">— E Lion<br>',
    '<span style="font-size:12px;">elionreigns@gmail.com · (808) 393-0153</span></p>',
    '</td></tr>',

    '<tr><td style="padding:14px;text-align:center;font-size:11px;color:#7a7090;border-top:1px dashed rgba(255,107,203,0.3);background:#0f0f18;">',
    'E Lion Music · <a href="https://www.elionmusic.com" style="color:#ffd700;">elionmusic.com</a> · Growing every platform — ready for live shows',
    '</td></tr>',

    '</table></td></tr></table></body></html>',
  ].join('');
}

function buildCoralMusicEmailText({ name = 'there', org = 'your festival', body } = {}) {
  const who = name || 'there';
  const fest = org || 'your festival';
  const b = body || DEFAULT_FESTIVAL_BODY;
  return [
    `Hi ${who},`,
    '',
    b,
    '',
    `Festival: ${fest}`,
    '',
    'Booking request: paid 5–8 song set, plus round-trip Hawaii travel, hotel, and local ground transportation for a mainland date.',
    '',
    'Stats: 30K+ Pandora monthly listeners · 500K+ streams · 115M+ Family Feud reach · 10M+ YouTube · 1,000+ live shows',
    '',
    'Festival EPK: https://www.elionmusic.com/downloads/festival-epk/',
    'Downloads: https://www.elionmusic.com/downloads/',
    'Press Kit: https://www.elionmusic.com/presskit/',
    'Family Feud Grand Prize: https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize',
    'Pandora: https://www.pandora.com/artist/e-lion/AR9vZJllkt3JmVq',
    'YouTube: https://youtube.com/@elionreigns',
    'Spotify: https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA',
    'Catalog: https://www.elionmusic.com/rap/',
    'Wiki: https://www.elionmusic.com/wiki/',
    '',
    '— E Lion',
    'elionreigns@gmail.com · (808) 393-0153',
    'https://www.elionmusic.com',
  ].join('\n');
}

module.exports = {
  buildCoralMusicEmailHtml,
  buildCoralMusicEmailText,
  DEFAULT_FESTIVAL_BODY,
  escBodyForEmail,
};
