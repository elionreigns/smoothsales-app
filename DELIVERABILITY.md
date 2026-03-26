# Keep campaign emails out of spam (deliverability)

So **recipients** (Hawaii businesses, yacht companies, etc.) see your emails in their **Inbox**, not Spam.

## 1. Verify your sending domain in Resend

You send as **sales@coralcrownsolutions.com**. Resend must be allowed to send for that domain.

1. Log in to [Resend](https://resend.com) → **Domains**.
2. Click **Add Domain** and enter **coralcrownsolutions.com**.
3. Resend will show **DNS records** to add (SPF, DKIM, and optionally a custom return-path). Copy each one.
4. In your **domain DNS** (where coralcrownsolutions.com is hosted – e.g. GoDaddy, Namecheap, Cloudflare, Google Domains):
   - Add the **TXT** and any **MX** records Resend gives you, exactly as shown.
   - Typical names: `resend._domainkey` (DKIM), `send` or return-path subdomain (SPF/MX).
5. In Resend, click **Verify**. It can take a few minutes up to 48 hours for DNS to propagate.

Until the domain is **Verified**, mail can still send but is more likely to be treated as spam or show “via resend.dev”.

## 2. Add a DMARC record (recommended)

DMARC tells Gmail, Yahoo, etc. that only mail that passes SPF or DKIM for **coralcrownsolutions.com** should be accepted. That improves trust and helps avoid spam.

1. In your DNS for **coralcrownsolutions.com**, add a **TXT** record:
   - **Name/host:** `_dmarc` (or `_dmarc.coralcrownsolutions.com` depending on your provider).
   - **Value:**  
     `v=DMARC1; p=none; rua=mailto:coralcrowntechnologies@gmail.com`
   - `p=none` = monitor only (no rejection yet). After you’re sure everything works, you can change to `p=quarantine` or `p=reject`.
2. Save. You can check that it’s live with: [https://mxtoolbox.com/dmarc.aspx](https://mxtoolbox.com/dmarc.aspx) (enter coralcrownsolutions.com).

## 3. Use a consistent From address

In **Vercel** → Project → **Environment Variables**, set:

- **SMOOTHSALES_FROM** = `Coral Crown Solutions <sales@coralcrownsolutions.com>`

Use this same address for all campaigns (no switching between onboarding@resend.dev and sales@…). Consistent, authenticated senders get better deliverability.

## 4. Keep lists and content healthy

- **Remove bounces:** If Resend (or your logs) report bounces, remove those addresses from your CSVs so you don’t keep hitting bad addresses.
- **Content:** Your templates are already professional (no all-caps subject lines, no “FREE!!!”, clear CTAs). Avoid adding lots of links or spammy phrases.
- **Volume:** Sending a lot to new addresses at once can sometimes trigger filters. Throttling (which you already use) helps; so does having SPF/DKIM/DMARC in place.

## Quick checklist

- [ ] **Resend → Domains:** coralcrownsolutions.com added and **Verified** (SPF + DKIM).
- [ ] **DNS:** DMARC TXT record added for coralcrownsolutions.com.
- [ ] **Vercel:** SMOOTHSALES_FROM = `Coral Crown Solutions <sales@coralcrownsolutions.com>`.
- [ ] **Redeploy** after any env change.

After this, campaigns from **sales@coralcrownsolutions.com** are much more likely to land in the inbox for other people instead of spam.
