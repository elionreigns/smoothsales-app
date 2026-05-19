# Task Killer email composer (SmoothSales)

Templates for **Task Exterminator Torpedo** and the SmoothSales dashboard **Custom** service.

## Template IDs

| ID | Audience | Sign as |
|----|----------|---------|
| `coral-business` | Business / tourism / tech outreach | **Eric Hans Schaefer** — coralcrownsolutions.com, Tourism Industry & Technology since 2008, trust badges, official seal styling |
| `coral-music` | Music / creative outreach | **E Lion** — 2016 Family Feud Grand Prize Winner, music-note creative layout |

## Placeholders

- `{{Name}}` — recipient first name (from sidebar or API `recipients[].name`)
- `{{Body}}` — your custom message (plain text; newlines become `<br>` in HTML)

## SmoothSales UI

1. **Service:** Custom (Task Killer composer — Business / Music)
2. **Audience:** Business or Music
3. Fill **Subject** (optional) and **Email body**
4. Paste emails + names in sidebar → **Send to all**

## API (`POST /api/send-campaign`)

Headers: `X-Smoothsales-Access: <SMOOTHSALES_BYPASS_KEY>`

```json
{
  "templateId": "coral-business",
  "recipients": [{ "email": "them@example.com", "name": "Jordan" }],
  "composerBody": "Plain text body merged into {{Body}}.",
  "subjectOverride": "Optional custom subject"
}
```

**Torpedo / Task Killer strike** (full HTML from client):

```json
{
  "templateId": "coral-music",
  "recipients": [{ "email": "...", "name": "..." }],
  "subjectOverride": "...",
  "bodyOverride": "<!DOCTYPE html>...full html..."
}
```

When `bodyOverride` is set, the server sends that HTML as-is (per-recipient `{{Name}}` should already be merged client-side).

## Standalone preview URLs

See `standalone.md` — add:

- `coral-business?access=CROWN&name=There&body=Your+message`
- `coral-music?access=CROWN&name=There&body=Your+message`

(Newsletter route uses `name` query param; body via template default until standalone supports `body` param.)

## Deploy

After changing templates, redeploy **smoothsales-app** on Vercel. Task Killer on Site5/Vercel uses the same `/api/send-campaign` endpoint.
