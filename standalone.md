# Standalone Template Links + SMS Teasers

Use these URLs to open any email template as a mobile-friendly standalone page (perfect for texting).

## Required access query
- This doc is standardized to `access=CROWN`.
- If you change `SMOOTHSALES_STANDALONE_KEY`, update this file to match.

Base app URL (Vercel): https://smoothsales-app.vercel.app

General format:
- https://smoothsales-app.vercel.app/newsletter/<templateId>?access=CROWN&name=TheirName&org=TheirOrg

## Base templates (current)

**Copy/paste:** Use only the **Standalone** URL in the browser or in `?name=`—do not append the “SMS teaser” or “Preview API” text. If that extra text ends up inside `name=`, it will appear inside “Hi …” on the page (the app now strips common mistakes, but clean URLs are best).

- **botox**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/botox?access=CROWN&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=botox`

- **tech**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/tech?access=CROWN&name=there&org=YourBusiness
  - Preview API (JSON): `GET /api/sms-preview?templateId=tech`

- **coral-business** (Task Killer composer — Eric Hans Schaefer)
  - Standalone: https://smoothsales-app.vercel.app/newsletter/coral-business?access=CROWN&name=there
  - Preview API: `GET /api/sms-preview?templateId=coral-business`

- **coral-music** (Task Killer composer — E Lion / Family Feud 2016)
  - Standalone: https://smoothsales-app.vercel.app/newsletter/coral-music?access=CROWN&name=there
  - Preview API: `GET /api/sms-preview?templateId=coral-music`

- **prayer-individual**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/prayer-individual?access=CROWN&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=prayer-individual`

- **prayer-church**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/prayer-church?access=CROWN&name=there&org=YourChurch
  - Preview API (JSON): `GET /api/sms-preview?templateId=prayer-church`

- **tourism-hawaii**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/tourism-hawaii?access=CROWN&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=tourism-hawaii`

- **tourism-hawaii-featured-tour**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/tourism-hawaii-featured-tour?access=CROWN&name=there&org=TourCompany
  - Preview API (JSON): `GET /api/sms-preview?templateId=tourism-hawaii-featured-tour`

- **tourism-usa**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/tourism-usa?access=CROWN&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=tourism-usa`

- **elion-fans**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-fans?access=CROWN&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-fans`

- **elion-artists**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-artists?access=CROWN&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-artists`

- **elion-brands**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-brands?access=CROWN&name=there&org=Brand
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-brands`

- **elion-gear-sponsor**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-gear-sponsor?access=CROWN&name=there&org=AudioBrand
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-gear-sponsor`

- **elion-clothing-sponsor**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-clothing-sponsor?access=CROWN&name=ClothingTeam&org=ApparelBrand
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-clothing-sponsor`

- **elion-producers**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-producers?access=CROWN&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-producers`

- **elion-venue-church**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-venue-church?access=CROWN&name=there&org=Church
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-venue-church`

- **elion-venue-show**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-venue-show?access=CROWN&name=there&org=Venue
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-venue-show`

- **elion-venue-dj**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-venue-dj?access=CROWN&name=there&org=Event
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-venue-dj`

- **elion-venue-major**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-venue-major?access=CROWN&name=there&org=Venue
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-venue-major`

- **elion-leaders**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-leaders?access=CROWN&name=there&org=Organization
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-leaders`

- **elion-laymen**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-laymen?access=CROWN&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-laymen`

- **elion-levelup**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-levelup?access=CROWN&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-levelup`

- **elion-products-programs**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-products-programs?access=CROWN&name=there&org=Company
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-products-programs`

- **elion-record-label-mainstream**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-record-label-mainstream?access=CROWN&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-record-label-mainstream`

- **elion-record-label-christian**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-record-label-christian?access=CROWN&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-record-label-christian`

- **wedding-couples**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/wedding-couples?access=CROWN&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=wedding-couples`

- **wedding-contractors**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/wedding-contractors?access=CROWN&name=there&org=Vendor
  - Preview API (JSON): `GET /api/sms-preview?templateId=wedding-contractors`

- **p48x-personal**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/p48x-personal?access=CROWN&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=p48x-personal`

- **p48x-physical-distributors**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/p48x-physical-distributors?access=CROWN&name=there&org=Store
  - Preview API (JSON): `GET /api/sms-preview?templateId=p48x-physical-distributors`

- **p48x-affiliate-sellers**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/p48x-affiliate-sellers?access=CROWN&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=p48x-affiliate-sellers`

- **healing-herbals-smoke-shop**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/healing-herbals-smoke-shop?access=CROWN&name=there&org=Shop
  - Preview API (JSON): `GET /api/sms-preview?templateId=healing-herbals-smoke-shop`

- **healing-herbals-individual**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/healing-herbals-individual?access=CROWN&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=healing-herbals-individual`

- **yachts-contracts**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/yachts-contracts?access=CROWN&name=there&org=CharterCompany
  - Preview API (JSON): `GET /api/sms-preview?templateId=yachts-contracts`

- **yachts-clients**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/yachts-clients?access=CROWN&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=yachts-clients`

- **stella-brands**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/stella-brands?access=CROWN&name=there&org=Brand
  - Preview API (JSON): `GET /api/sms-preview?templateId=stella-brands`

- **stella-media**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/stella-media?access=CROWN&name=there&org=Outlet
  - Preview API (JSON): `GET /api/sms-preview?templateId=stella-media`

- **stella-talent**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/stella-talent?access=CROWN&name=there&org=Casting
  - Preview API (JSON): `GET /api/sms-preview?templateId=stella-talent`

## April 2026 — new services (Apartments, Corgi Care, Luxury Resource, Rap Central)

Each base template below also has FU1, FU2, FU3, FU4 variants — append `-followup-1`, `-followup-2`, `-followup-3`, or `-followup-4` to the templateId.
The Vercel cron at `/api/cron/run-followups` (daily 17:00 UTC / 07:00 HST) automatically fires the next follow-up if Resend has NOT reported `email.opened` for the prior message.

### Apartments — for finding Ron + pregnant wife a 2-3BR in East Honolulu
- **apartments-individual** (Craigslist + FB Marketplace direct landlords)
  - Standalone: https://smoothsales-app.vercel.app/newsletter/apartments-individual?access=CROWN&name=there
- **apartments-realtor** (realtors, AOAOs, brokerage rental desks)
  - Standalone: https://smoothsales-app.vercel.app/newsletter/apartments-realtor?access=CROWN&name=there&org=BrokerageName

### Corgi Care — Stella (13 yo double-coat corgi, no shave) + wife's cousin (military)
- **corgi-care-hair** (groomers who hand-scissor / blow-out / no-shave double coats)
  - Standalone: https://smoothsales-app.vercel.app/newsletter/corgi-care-hair?access=CROWN&name=there&org=GroomerName
- **corgi-care-teeth** ($300–$500 budget for full dental)
  - Standalone: https://smoothsales-app.vercel.app/newsletter/corgi-care-teeth?access=CROWN&name=there&org=VetClinic
- **corgi-care-military** (base vet clinics — relayed via wife's cousin)
  - Standalone: https://smoothsales-app.vercel.app/newsletter/corgi-care-military?access=CROWN&name=there&org=BaseClinic

### Luxury Resource of Hawaii — affiliate program for the 208-item catalog
- **luxury-resource-fareharbor** (operators already on FareHarbor — add LXR as individual affiliate, 10%)
  - Standalone: https://smoothsales-app.vercel.app/newsletter/luxury-resource-fareharbor?access=CROWN&name=there&org=OperatorName
- **luxury-resource-direct** (operators NOT on FareHarbor — direct referral contract, 10%)
  - Standalone: https://smoothsales-app.vercel.app/newsletter/luxury-resource-direct?access=CROWN&name=there&org=OperatorName

### Rap Central — Rap Artist Booking Engine (5% to LXR)
- **rap-central-rappers** (artists + management — 5% commission booking engine)
  - Standalone: https://smoothsales-app.vercel.app/newsletter/rap-central-rappers?access=CROWN&name=there&org=Artist

## Head Hunting — One Page Miracle allies (16 audiences)

Each audience has an initial template and **`-followup-1`**. Open in SmoothSales with `?service=head-hunt&audience=<slug>` or use standalone URLs below (`name` + `org` personalize the greeting).

| Audience slug | Standalone preview |
|---------------|-------------------|
| music-promo | https://smoothsales-app.vercel.app/newsletter/headhunt-music-promo?access=CROWN&name=there&org=Station |
| music-video | https://smoothsales-app.vercel.app/newsletter/headhunt-music-video?access=CROWN&name=there&org=Studio |
| pastor-theology | https://smoothsales-app.vercel.app/newsletter/headhunt-pastor-theology?access=CROWN&name=there&org=Church |
| prayer-healing | https://smoothsales-app.vercel.app/newsletter/headhunt-prayer-healing?access=CROWN&name=there&org=Ministry |
| ai-automation | https://smoothsales-app.vercel.app/newsletter/headhunt-ai-automation?access=CROWN&name=there&org=Builder |
| social-growth | https://smoothsales-app.vercel.app/newsletter/headhunt-social-growth?access=CROWN&name=there&org=Agency |
| house-cleaning-build | https://smoothsales-app.vercel.app/newsletter/headhunt-house-cleaning-build?access=CROWN&name=there&org=Operator |
| house-cleaning-crew | https://smoothsales-app.vercel.app/newsletter/headhunt-house-cleaning-crew?access=CROWN&name=there&org=Recruiter |
| auto-hhr | https://smoothsales-app.vercel.app/newsletter/headhunt-auto-hhr?access=CROWN&name=there&org=Shop |
| corgi-community | https://smoothsales-app.vercel.app/newsletter/headhunt-corgi-community?access=CROWN&name=there&org=Club |
| publish-books | https://smoothsales-app.vercel.app/newsletter/headhunt-publish-books?access=CROWN&name=there&org=Bookstore |
| print-merch | https://smoothsales-app.vercel.app/newsletter/headhunt-print-merch?access=CROWN&name=there&org=PrintShop |
| web-seo-music | https://smoothsales-app.vercel.app/newsletter/headhunt-web-seo-music?access=CROWN&name=there&org=Agency |
| web-seo-tourism | https://smoothsales-app.vercel.app/newsletter/headhunt-web-seo-tourism?access=CROWN&name=there&org=Agency |
| capital-partner | https://smoothsales-app.vercel.app/newsletter/headhunt-capital-partner?access=CROWN&name=there&org=Fund |
| coral-partner | https://smoothsales-app.vercel.app/newsletter/headhunt-coral-partner?access=CROWN&name=there&org=Agency |

- **SMS teaser:** `GET /api/sms-preview?templateId=headhunt-music-promo` (any `headhunt-*` id)
- **SmoothSales UI:** https://smoothsales-app.vercel.app/?service=head-hunt&audience=music-promo

## Using this for SMS
- Call GET /api/sms-preview?templateId=<templateId> to get the exact **2-sentence** teaser + the correct standalone URL with your access key.
- Then paste the resulting message into your SMS sender (or use POST /api/send-sms).
- **Stable links in SMS:** Set **NEXT_PUBLIC_APP_URL** on Vercel to your canonical host (e.g. `https://smoothsales-app.vercel.app`). Otherwise the preview may use a one-off `*.vercel.app` deployment URL.
- **Auth:** Send header `X-Smoothsales-Access` with `SMOOTHSALES_PASSWORD` or `SMOOTHSALES_BYPASS_KEY` (or default app password) when calling `/api/sms-preview` or `/api/send-sms`.

## Example (elion-leaders)
- Teaser: Would you take 60 seconds to see what P48X + PrayerAuthority could add to your church or leaders group? If it resonates, click to view the exact pitch and I’ll tailor options + a setlist for your dates.

## Example (elion-laymen)
- Teaser: Want one place to see my new songs, P48X, and Prayer Authority tools? Click the link to read the full message and take the easiest next step.

