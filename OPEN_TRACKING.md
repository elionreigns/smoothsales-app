# Email open tracking & alerts

When someone **opens** a campaign email, you can get an alert at **coralcrowntechnologies@gmail.com** (or another address) with who opened it and the subject.

## How it works

1. **Resend** adds a tiny tracking pixel to each email when open tracking is enabled.
2. When the recipient’s client loads images, Resend records an open and sends a webhook to your app.
3. The app’s webhook handler receives `email.opened` and sends a short notification email to you.

## Setup (one-time)

### 1. Enable open tracking in Resend

- Go to [Resend Dashboard](https://resend.com/domains) → **Domains**.
- Open the domain you send from (or the one you’ll use).
- Turn **Open tracking** (and optionally **Click tracking**) **On**.

If you’re still using **onboarding@resend.dev**, open tracking may already be available; check the Resend docs or dashboard.

### 2. Add the webhook in Resend

- Go to [Resend Dashboard](https://resend.com/webhooks) → **Webhooks** → **Add webhook**.
- **Endpoint URL:**  
  `https://smoothsales-app.vercel.app/api/webhooks/resend`  
  (or your real app URL if different.)
- **Events:** enable **email.opened** (and **email.clicked** if you want click alerts).
- Save. Copy the **Signing secret** (`whsec_...`) if you want to verify webhooks later.

### 3. Environment variable (optional)

- In Vercel (or your host): **Project → Settings → Environment Variables**
- **OPEN_ALERT_TO** = `coralcrowntechnologies@gmail.com`  
  (omit to use that default; set to another address to get alerts there instead.)

Redeploy after changing env vars.

## What you’ll get

When someone opens an email, you’ll receive a message like:

- **Subject:** `Opened: [first 50 chars of the campaign subject]`
- **Body:**  
  - Who opened it (recipient email)  
  - Full subject of the email they opened  
  - Time of the open  
  - Resend email ID  

## Caveats

- **Opens are inferred.** They’re triggered when the tracking image is loaded. Many clients block images by default, so some opens are never reported. A few clients (e.g. Apple Mail Privacy Protection) may load images in the background and cause extra “opens.”
- **One alert per open.** If the same person opens the same email multiple times, you may get multiple alerts (Resend can send one event per load).

## Security (optional)

To verify that webhook requests really come from Resend, set **RESEND_WEBHOOK_SECRET** to the webhook’s signing secret. The handler can then be updated to verify the `svix-id`, `svix-timestamp`, and `svix-signature` headers before processing.
