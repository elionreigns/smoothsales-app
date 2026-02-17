# Campaigns – Coral Crown Tech & Time for Fun Featured Tour

## Sent (130 total)

### 1. Coral Crown Tech – Hawaii businesses (50 sent, 1 failed)
- **Template:** `tech` (Coral Crown – websites, custom shopping carts, online booking)
- **CSV:** `contacts/coralcrown-tech-hawaii-50.csv`
- **CTA:** coralcrownsolutions.com · (808) 393-0153 · coralcrowntechnologies@gmail.com
- **Failed:** info@paradhisehelicopters.com (rate limit; correct email: info@paradisehelicopters.com – CSV fixed for next run)

### 2. Time for Fun Hawaii – Featured tour / yacht & sailboat (83 sent, 0 failed)
- **Template:** `tourism-hawaii-featured-tour`
- **CSV:** `contacts/timeforfun-featured-yacht-80.csv`
- **Message:** We’d like to feature your private yacht/sailboat tours; we send referrals. Email coralcrowntechnologies@gmail.com with your info.
- **CTA:** coralcrowntechnologies@gmail.com · (808) 393-0153

## How to send again

```bash
# Tech (50 Hawaii businesses)
node scripts/send-campaign.js https://smoothsales-app.vercel.app tech contacts/coralcrown-tech-hawaii-50.csv

# Featured tour (yacht/sailboat)
node scripts/send-campaign.js https://smoothsales-app.vercel.app tourism-hawaii-featured-tour contacts/timeforfun-featured-yacht-80.csv
```

Set `SMOOTHSALES_URL` if you prefer, e.g. `SMOOTHSALES_URL=https://smoothsales-app.vercel.app node scripts/send-campaign.js ... tourism-hawaii-featured-tour contacts/timeforfun-featured-yacht-80.csv`

## E Lion – Record label campaigns (mainstream + Christian)

**Same as Level Up:** Use dedicated scripts that call the deployed app (like `send-levelup-3.js`).

**Templates:** `elion-record-label-mainstream` (Shine BTS), `elion-record-label-christian` (world tour vision).

**Requirement:** Deploy the smoothsales app to Vercel so the new template IDs are live. Then run:

```bash
# Mainstream record labels (50) – same pattern as levelup
node scripts/send-record-label-mainstream.js https://smoothsales-app.vercel.app

# Christian record labels (100)
node scripts/send-record-label-christian.js https://smoothsales-app.vercel.app
```

Or with env: `SMOOTHSALES_URL=https://smoothsales-app.vercel.app node scripts/send-record-label-mainstream.js`

Or from the SmoothSales app UI: **E Lion Music** → **Record label (mainstream)** or **Record label (Christian)** → **Initial** → upload CSV → Send campaign.

## Bounces

If Resend reports bounces, remove or fix those addresses in the CSVs and re-run as needed.
