# E Lion outreach round 2 — results and gates

Audit date: 2026-08-03 HST / 2026-08-04 UTC. This file separates messages actually sent from routes that still need a browser, human, or financial step.

## Clothing — 10 researched; 3 direct emails sent

Sent through the live SmoothSales `/api/send-campaign` route using the upgraded sponsor message:

- Twenty Three Apparel Co — `info@twentythreeapparelco.com` — sent
- SAVD — `support@savdstore.com` — sent
- Deferential Clothing — `support@deferentialclothing.com` — sent

Queued or route-gated: His Kingdom First (DNS failure), Purely Sacred, Diakonia & Co., Clothed N' Faith, Poppy Petal, and The Good News Apparel Co. No duplicate message was sent to the queued targets.

## Gear — 10 researched; 2 direct emails sent

Sent through the live SmoothSales `/api/send-campaign` route:

- Fender Artist Relations — `artistsubmissions@fender.com` — sent
- ArtistRelations.com — `info@artistrelations.com` — sent

Queued or route-gated: Ampeg, Zildjian, D'Addario, Ibanez, Line 6, Paiste, Remo, and NUGEN Audio. D'Addario's official guidance says unsolicited solicitations are not accepted, so that target remains a documented route review rather than a blind submission.

## Festivals — 10 researched; 5 direct emails sent

Sent with the upgraded 2027 paid-set/travel-package message and Festival EPK link:

- Manchester Jazz Festival 2027 — `festival@manchesterjazz.com`
- Mostly Jazz Funk & Soul 2027 — `apply@mostlyjazz.co.uk`
- Christian Music Festival Canada — `mollybanerjei@icloud.com`
- Gussapolooza 2027 — `artists@gussapolooza.com` (fee noted; no fee paid)
- Beaver Island Music Festival 2027 — `beaverislandmusicfest@gmail.com` (official form was filled, but the required Artist Agent selector would not accept the browser interaction; direct email sent instead)

Remaining routes:

- SXSW Music 2027 — official application leads to a paid cart/application; no purchase made.
- Rise Cayman — official site researched; no reliable public booking email found in the audit.
- SoulFest MTL 2027 — official site identified; booking route needs verification before sending.
- Halleluya Festival — official site identified; booking route needs verification before sending.
- MPOA Festival 2027 — official contact page identified; booking route needs verification before sending.

## Message and deployment verification

- The festival SmoothSales template now requests a paid 5–8 song set, round-trip Hawaii travel, hotel, and local ground transportation for mainland dates.
- It links to the Festival EPK, Downloads, Press Kit, and music proof without promising an endorsement or backlink.
- Local Next build passed through the `S:` drive mapping to avoid the Windows `#`-in-path tracing bug.
- Production deployment completed to the existing `smoothsales-app` Vercel project and the canonical `https://smoothsales-app.vercel.app/newsletter/coral-music?access=CROWN&name=BOOKER&org=Rise%20Cayman` URL now serves the upgraded 2027 copy.
- The standalone page had one literal organization placeholder in the injected composer body; the page renderer was patched, redeployed, and verified live with `Rise Cayman` substituted and no literal placeholder remaining.

No CAPTCHA was bypassed and no application fee was paid. Human follow-up remains required for CAPTCHA, sign-in, address, and paid-application gates.
