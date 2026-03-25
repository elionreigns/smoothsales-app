# Standalone Template Links + SMS Teasers

Use these URLs to open any email template as a mobile-friendly standalone page (perfect for texting).

## Required access query
- Replace YOUR_ACCESS_KEY with either:
  - SMOOTHSALES_STANDALONE_KEY (recommended), or
  - default CROWN if you did not set that env var.

Base app URL (Vercel): https://smoothsales-app.vercel.app

General format:
- https://smoothsales-app.vercel.app/newsletter/<templateId>?access=YOUR_ACCESS_KEY&name=TheirName&org=TheirOrg

## Base templates (current)

**Copy/paste:** Use only the **Standalone** URL in the browser or in `?name=`—do not append the “SMS teaser” or “Preview API” text. If that extra text ends up inside `name=`, it will appear inside “Hi …” on the page (the app now strips common mistakes, but clean URLs are best).

- **botox**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/botox?access=YOUR_ACCESS_KEY&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=botox`

- **tech**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/tech?access=YOUR_ACCESS_KEY&name=there&org=YourBusiness
  - Preview API (JSON): `GET /api/sms-preview?templateId=tech`

- **prayer-individual**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/prayer-individual?access=YOUR_ACCESS_KEY&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=prayer-individual`

- **prayer-church**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/prayer-church?access=YOUR_ACCESS_KEY&name=there&org=YourChurch
  - Preview API (JSON): `GET /api/sms-preview?templateId=prayer-church`

- **tourism-hawaii**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/tourism-hawaii?access=YOUR_ACCESS_KEY&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=tourism-hawaii`

- **tourism-hawaii-featured-tour**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/tourism-hawaii-featured-tour?access=YOUR_ACCESS_KEY&name=there&org=TourCompany
  - Preview API (JSON): `GET /api/sms-preview?templateId=tourism-hawaii-featured-tour`

- **tourism-usa**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/tourism-usa?access=YOUR_ACCESS_KEY&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=tourism-usa`

- **elion-fans**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-fans?access=YOUR_ACCESS_KEY&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-fans`

- **elion-artists**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-artists?access=YOUR_ACCESS_KEY&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-artists`

- **elion-brands**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-brands?access=YOUR_ACCESS_KEY&name=there&org=Brand
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-brands`

- **elion-producers**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-producers?access=YOUR_ACCESS_KEY&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-producers`

- **elion-venue-church**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-venue-church?access=YOUR_ACCESS_KEY&name=there&org=Church
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-venue-church`

- **elion-venue-show**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-venue-show?access=YOUR_ACCESS_KEY&name=there&org=Venue
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-venue-show`

- **elion-venue-dj**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-venue-dj?access=YOUR_ACCESS_KEY&name=there&org=Event
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-venue-dj`

- **elion-venue-major**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-venue-major?access=YOUR_ACCESS_KEY&name=there&org=Venue
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-venue-major`

- **elion-leaders**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-leaders?access=YOUR_ACCESS_KEY&name=there&org=Organization
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-leaders`

- **elion-laymen**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-laymen?access=YOUR_ACCESS_KEY&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-laymen`

- **elion-levelup**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-levelup?access=YOUR_ACCESS_KEY&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-levelup`

- **elion-products-programs**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-products-programs?access=YOUR_ACCESS_KEY&name=there&org=Company
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-products-programs`

- **elion-record-label-mainstream**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-record-label-mainstream?access=YOUR_ACCESS_KEY&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-record-label-mainstream`

- **elion-record-label-christian**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/elion-record-label-christian?access=YOUR_ACCESS_KEY&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=elion-record-label-christian`

- **wedding-couples**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/wedding-couples?access=YOUR_ACCESS_KEY&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=wedding-couples`

- **wedding-contractors**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/wedding-contractors?access=YOUR_ACCESS_KEY&name=there&org=Vendor
  - Preview API (JSON): `GET /api/sms-preview?templateId=wedding-contractors`

- **p48x-personal**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/p48x-personal?access=YOUR_ACCESS_KEY&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=p48x-personal`

- **p48x-physical-distributors**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/p48x-physical-distributors?access=YOUR_ACCESS_KEY&name=there&org=Store
  - Preview API (JSON): `GET /api/sms-preview?templateId=p48x-physical-distributors`

- **p48x-affiliate-sellers**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/p48x-affiliate-sellers?access=YOUR_ACCESS_KEY&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=p48x-affiliate-sellers`

- **healing-herbals-smoke-shop**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/healing-herbals-smoke-shop?access=YOUR_ACCESS_KEY&name=there&org=Shop
  - Preview API (JSON): `GET /api/sms-preview?templateId=healing-herbals-smoke-shop`

- **healing-herbals-individual**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/healing-herbals-individual?access=YOUR_ACCESS_KEY&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=healing-herbals-individual`

- **yachts-contracts**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/yachts-contracts?access=YOUR_ACCESS_KEY&name=there&org=CharterCompany
  - Preview API (JSON): `GET /api/sms-preview?templateId=yachts-contracts`

- **yachts-clients**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/yachts-clients?access=YOUR_ACCESS_KEY&name=there
  - Preview API (JSON): `GET /api/sms-preview?templateId=yachts-clients`

- **stella-brands**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/stella-brands?access=YOUR_ACCESS_KEY&name=there&org=Brand
  - Preview API (JSON): `GET /api/sms-preview?templateId=stella-brands`

- **stella-media**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/stella-media?access=YOUR_ACCESS_KEY&name=there&org=Outlet
  - Preview API (JSON): `GET /api/sms-preview?templateId=stella-media`

- **stella-talent**
  - Standalone: https://smoothsales-app.vercel.app/newsletter/stella-talent?access=YOUR_ACCESS_KEY&name=there&org=Casting
  - Preview API (JSON): `GET /api/sms-preview?templateId=stella-talent`

## Using this for SMS
- Call GET /api/sms-preview?templateId=<templateId> to get the exact **2-sentence** teaser + the correct standalone URL with your access key.
- Then paste the resulting message into your SMS sender (or use POST /api/send-sms).
- **Stable links in SMS:** Set **NEXT_PUBLIC_APP_URL** on Vercel to your canonical host (e.g. `https://smoothsales-app.vercel.app`). Otherwise the preview may use a one-off `*.vercel.app` deployment URL.
- **Auth:** Send header `X-Smoothsales-Access` with `SMOOTHSALES_PASSWORD` or `SMOOTHSALES_BYPASS_KEY` (or default app password) when calling `/api/sms-preview` or `/api/send-sms`.

## Example (elion-leaders)
- Teaser: Would you take 60 seconds to see what P48X + PrayerAuthority could add to your church or leaders group? If it resonates, click to view the exact pitch and I’ll tailor options + a setlist for your dates.

## Example (elion-laymen)
- Teaser: Can I ask a quick favor and show you the P48X book + audiobook and my PrayerAuthority tools in one place? Click the link to read the full message and take the easiest next step.

