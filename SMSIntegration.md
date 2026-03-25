# SMS Integration Guide (Twilio + SmoothSales)

This is the exact setup to send SMS campaigns that point to the standalone newsletter pages.

## 1) Environment variables (Vercel)

Set these in `Project Settings -> Environment Variables`:

- `SMOOTHSALES_STANDALONE_KEY=CROWN`
- `SMOOTHSALES_BYPASS_KEY=<your_api_bypass_key>` (recommended)
- `NEXT_PUBLIC_APP_URL=https://smoothsales-app.vercel.app`
- `TWILIO_ACCOUNT_SID=...`
- `TWILIO_AUTH_TOKEN=...`
- `TWILIO_FROM_NUMBER=+1...` **or** `TWILIO_MESSAGING_SERVICE_SID=MG...`

Optional:

- `SMOOTHSALES_FROM=Eric Hans Schaefer <you@yourdomain.com>` (email sender display)

## 2) How standalone links are built

Standalone format:

- `https://smoothsales-app.vercel.app/newsletter/<templateId>?access=CROWN&name=<Name>&org=<Org>`

The `access` query key is controlled by `SMOOTHSALES_STANDALONE_KEY` (default `CROWN`).

## 3) Preview SMS text before sending

Use:

- `GET /api/sms-preview?templateId=elion-leaders`
- `GET /api/sms-preview?templateId=elion-laymen`

This returns:

- 2-sentence teaser text
- final landing URL with `?access=CROWN`

## 4) Send SMS campaign (API)

Endpoint:

- `POST /api/send-sms`

Headers:

- `Content-Type: application/json`
- `x-smoothsales-access: <SMOOTHSALES_PASSWORD or SMOOTHSALES_BYPASS_KEY>`

Body example:

```json
{
  "templateId": "elion-laymen",
  "numbers": ["+18085551234", "+18085559876"],
  "name": "Friend",
  "dryRun": true
}
```

Use `dryRun: true` first to verify message + URL, then remove it to send.

## 5) Recommended campaign flow for 1,000+ numbers

1. Export/clean numbers to CSV with one number per row.
2. Normalize to E.164 (`+1XXXXXXXXXX`).
3. Send in batches (100-250).
4. Keep `STOP/UNSUBSCRIBE` opt-out language in your SMS policy and honor opt-outs.
5. Track each send batch with timestamp + templateId.

## 6) Opt-in / compliance baseline

For US A2P messaging, use explicit opt-in and clear opt-out.

Suggested footer snippet in first-touch campaigns:

- `Reply STOP to opt out. Reply HELP for help.`

If you expect high volume, configure Twilio A2P 10DLC brand/campaign and use a Messaging Service SID.

## 7) Quick test commands

PowerShell dry run:

```powershell
Invoke-RestMethod -Method Post `
  -Uri "https://smoothsales-app.vercel.app/api/send-sms" `
  -Headers @{ "x-smoothsales-access" = "<YOUR_BYPASS_OR_PASSWORD>" } `
  -ContentType "application/json" `
  -Body '{"templateId":"elion-laymen","numbers":["+18083930153"],"name":"Eric","dryRun":true}'
```

PowerShell live send:

```powershell
Invoke-RestMethod -Method Post `
  -Uri "https://smoothsales-app.vercel.app/api/send-sms" `
  -Headers @{ "x-smoothsales-access" = "<YOUR_BYPASS_OR_PASSWORD>" } `
  -ContentType "application/json" `
  -Body '{"templateId":"elion-laymen","numbers":["+18083930153"],"name":"Eric"}'
```

## 8) Current key paths

- SMS teaser logic: `src/lib/sms.ts`
- SMS preview API: `src/app/api/sms-preview/route.ts`
- SMS send API: `src/app/api/send-sms/route.ts`
- Standalone template page: `src/app/newsletter/[templateId]/page.tsx`
- Template source: `src/lib/templates.ts`

