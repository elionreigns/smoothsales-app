# Lead lists – 200 new leads per audience (never contacted)

See **../superlist.md** for full map of services/audiences and which existing CSVs have already been sent.

**CSV columns for sending:** `email,name,nameOfOrganization`  
**Optional for call follow-up:** `phone,notes`

**Before sending:**  
1. Exclude any email in `contacted-emails.json` (run `python collect_emails.py` from repo root to regenerate).  
2. Dedupe by email (some lead files may have duplicate emails; keep first occurrence).

Exclude any email that appears in:
- servicebot/contacts/*.csv
- autobot/contacts/*.csv

## Master list + tracking (E Lion)

- **Email + segment:** `elion-master-contacts.csv` — columns include `email`, `name`, `nameOfOrganization`, `phone`, `segment` (`laymen` / `leaders`), `source`, `status` (`unsent` / `sent`). After a campaign, move or mark rows (e.g. set `status` to `sent` and optionally add a column `last_sent_template` or `last_sent_at` in ISO date).
- **Phone-only (SMS):** `elion-phone-only.csv` — `name`, `phone`, `segment`, `source`. Use for Twilio after you match or confirm opt-in; merge into the master row by hand when you also have an email.

## Image / template smoke test (two inboxes)

`contacts/**/*.csv` is gitignored; create a tiny CSV with `email,name` or rely on **built-in** addresses in the script.

```bash
# Uses built-in test inboxes (Eric + Ashley) — edit script to change
node scripts/send-all-base-templates-test.js https://smoothsales-app.vercel.app

# Or pass a CSV path (second arg if no URL, or third after URL)
node scripts/send-all-base-templates-test.js https://smoothsales-app.vercel.app path/to/recipients.csv
```

Sends all **base** templates (same set as the app dropdown) to each recipient.

## SMS: preview text + standalone link

1. **Preview (no Twilio cost):**  
   `GET /api/sms-preview?templateId=<id>` with header `X-Smoothsales-Access: <your bypass or app password>`.  
   Response includes `teaser`, `landingUrl`, and full `sms` (teaser + URL).

2. **Full list of template IDs + manual URL pattern:** see repo root `standalone.md` (same `templateId` values as campaigns).

3. **Send SMS (Twilio):** `POST /api/send-sms` with JSON body:
   - `templateId`, `numbers` (array or comma-separated, US 10-digit ok), optional `name`, `org` (appended to landing URL).
   - Use **`dryRun: true`** first — response includes `messageBody` without sending.
   - **Env on Vercel:** `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and either `TWILIO_FROM_NUMBER` or `TWILIO_MESSAGING_SERVICE_SID`; also `SMOOTHSALES_STANDALONE_KEY` (or default `CROWN`) so links match the gated newsletter page.

4. **Standalone page:** `https://smoothsales-app.vercel.app/newsletter/<templateId>?access=KEY&name=First&org=Org` — must match the key in `SMOOTHSALES_STANDALONE_KEY` / docs in `standalone.md`.
