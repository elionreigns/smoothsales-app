# SMS Campaign Maximizer (1000-number “dump” → clicks → replies)

This is the practical system to:
- paste **1000+ numbers**
- choose a **TemplateId**
- send a **2-sentence (question + next-step statement)** SMS + a **link to the standalone template page**
- iterate until you see real replies/bookings/purchases

## 1) What we implemented

### A) Standalone HTML pages for *every* email template

- URL shape:
  - `/newsletter/[templateId]?access=YOUR_KEY&name=TheirName&org=TheirOrg`
- These pages render the email HTML as a mobile-friendly landing page.
- They are **access-key protected** so you can text them privately without making them public.

**Access key used**
- `SMOOTHSALES_BYPASS_KEY` (preferred) or `SMOOTHSALES_PASSWORD`

### B) “Question + next-step statement” SMS teasers (per template)

We generate a 2-sentence teaser per `templateId` and append the landing URL.

- Preview endpoint:
  - `GET /api/sms-preview?templateId=elion-leaders`
  - Returns: `teaser`, `landingUrl`, and full `sms` string.

### C) Send SMS endpoint (Twilio)

- `POST /api/send-sms`
- You can paste numbers as:
  - array of strings, or
  - one big string (newline/comma/semicolon separated)
- Numbers are normalized to **E.164** (US 10-digit becomes `+1XXXXXXXXXX`).
- Supports `dryRun: true` to preview without sending.

## 2) Twilio environment variables you need (Vercel)

Set these in **Vercel → Project → Settings → Environment Variables**:

- **Required**
  - `TWILIO_ACCOUNT_SID`
  - `TWILIO_AUTH_TOKEN`
- **One of these is required**
  - `TWILIO_FROM_NUMBER` (recommended for starting)
  - OR `TWILIO_MESSAGING_SERVICE_SID` (recommended once scaling/rotating numbers)

Also make sure you have:
- `NEXT_PUBLIC_APP_URL` (your real app URL) so links are correct
- `SMOOTHSALES_STANDALONE_KEY` (or default `CROWN`) so SMS links can open the landing pages
- `SMOOTHSALES_BYPASS_KEY` (or `SMOOTHSALES_PASSWORD`) so you can call the SMS APIs from scripts

### Calling the SMS APIs (auth)
Because the app is locked down, call these endpoints with:
- Header: `x-smoothsales-access: <SMOOTHSALES_BYPASS_KEY-or-SMOOTHSALES_PASSWORD>`
- Or unlock via the browser UI first (cookie)

## 3) How to run an SMS blast (safe workflow)

### Step 1: Preview the exact SMS for a template

- Open:
  - `/api/sms-preview?templateId=elion-leaders`

If the teaser is too long, we tighten the copy until it fits comfortably with the link.

### Step 2: Dry-run send (no messages actually sent)

Send JSON to `/api/send-sms` with `dryRun: true`.

Example body:

```json
{
  "templateId": "elion-leaders",
  "numbers": "808-555-1111\n808-555-2222\n+18085553333",
  "dryRun": true
}
```

### Step 3: Send for real (small batch first)

Start with 20–50 numbers (not 1000) to confirm:
- link opens
- message fits
- opt-out handling is clear
- no carrier filtering surprises

Then scale.

## 4) Compliance + “opt-in for more texts” (critical)

If you plan to text thousands of numbers, you must treat this like a real program:

- **Identify yourself** (first text should say who you are).
- **Give an opt-out**:
  - “Reply STOP to opt out”
- **Do not text people who didn’t consent** (or at least keep it strictly personal/relationship-based).
- If you’re using A2P 10DLC (US), you’ll likely need:
  - brand registration
  - campaign registration
  - approved message use-case wording

We can implement an opt-out list next (store STOP replies and block them), but that requires an inbound SMS webhook endpoint + persistence.

## 5) Why people open but don’t reply (the fix)

Opens don’t equal intent. Usually the failure is:
- unclear “what do you want me to do?”
- too many links / too much cognitive load
- no easy reply path (one-word reply)
- no “micro-commitment”

**Next iteration target:** each template must have a single “next step”:
- Leaders: “Reply ‘DATES’ and I’ll send 3 options + setlist.”
- Laymen: “Reply ‘BOOK’ and I’ll send the exact Apple Books link + audiobook link.”
- Label/venue: “Reply ‘DEMO’ and I’ll send the 3-track private shortlist.”

We’ll update the templates to make the reply action obvious and minimal.

## 6) DMARC + spam: what it means (and what it doesn’t)

### What DMARC reports are
- Your DMARC report file (from Microsoft/Outlook) is a **feedback report** showing:
  - who is sending mail “as your domain”
  - whether **SPF/DKIM aligned**
  - whether DMARC would pass/fail

### Does DMARC tell you “it went to spam”?
- **No.** DMARC reports are about authentication alignment, not inbox placement.

### What *does* it indicate?
- If your DMARC shows **pass/aligned** for your sending stream, that’s good:
  - lower spoofing risk
  - better deliverability foundation

### Why opens suggest “not spam” (mostly)
- If someone opened, at least that message was visible and images loaded (or Apple loaded them).
- BUT some opens can be inflated by privacy features.

## 7) Rebump system (follow-ups) — what’s actually possible

### Important reality
- “Unread” is not a reliable signal.
- Open tracking is incomplete (image blocking) and sometimes noisy (Apple MPP).

### Practical rebump rule (what works anyway)
- Follow-up after 2–4 business days unless:
  - they replied, or
  - you got a strong open/click signal and you want to personalize the follow-up

We already have open-alert emails working; next step is automating “stop followups if opened/replied,” which requires a database (or Vercel KV) to remember per-recipient status.

