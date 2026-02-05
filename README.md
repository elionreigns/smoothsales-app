# SmoothSales App

Service outreach and bulk email campaigns for Coral Crown Solutions. One dashboard: select service (Botox Oahu, Tech, Prayer Authority, Tourism Hawaii/USA), preview pitch content, then send pre-made email templates to a list of recipients.

---

## What it does

- **Main dropdown:** Botox | Tech | Prayer | Tourism
- **Tourism sub-dropdown:** Hawaii (Time for Fun Hawaii) | USA (Time for Fun USA)
- **Prayer sub-options:** Individual member | Church organization
- **Content:** Pitch / price sheet / info per service (Botox Oahu, Coral Crown Tech, Prayer Authority, Time for Fun)
- **Email campaign:** Paste emails (one per line or comma/semicolon separated), choose template, send to all via Resend

---

## Local setup

1. **Clone** (or you’re already in the repo):
   ```bash
   git clone https://github.com/YOUR_ORG/smoothsales-app.git
   cd smoothsales-app
   ```

2. **Install:**
   ```bash
   npm install
   ```

3. **Env (optional for local send):** Create `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxx
   SMOOTHSALES_FROM="Coral Crown Solutions <sales@coralcrownsolutions.com>"
   ```
   If you don’t set these, the app runs but **Send to all** will fail until Resend is configured in production.

4. **Run:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

---

## GitHub setup (new repo)

1. **Create repo on GitHub**
   - Name: `smoothsales-app` (or `smooth-sales-app`)
   - Visibility: Private (recommended) or Public
   - Do **not** add README / .gitignore / license (we already have them).

2. **Add remote and push** (from your machine, inside `servicebot` or the repo root):
   ```bash
   cd path/to/servicebot
   git init
   git add .
   git commit -m "Initial SmoothSales app"
   git branch -M main
   git remote add origin https://github.com/YOUR_ORG/smoothsales-app.git
   git push -u origin main
   ```
   Replace `YOUR_ORG` with your GitHub username or org.

---

## Vercel setup

1. **Import project**
   - [Vercel Dashboard](https://vercel.com) → Add New → Project
   - Import **GitHub** → select `smoothsales-app` (or the repo you created)
   - Root directory: leave default (or set to `servicebot` if the repo root is the parent folder)
   - Framework: Next.js (auto-detected)
   - Deploy.

2. **Environment variables** (Project → Settings → Environment Variables):
   - `RESEND_API_KEY` = your Resend API key (required for sending).
   - `SMOOTHSALES_FROM` = optional; e.g. `Coral Crown Solutions <sales@coralcrownsolutions.com>` (must verify that domain in Resend first).
   - `NEXT_PUBLIC_APP_URL` = optional; full app URL (e.g. `https://smoothsales-app.vercel.app`) so email templates can load business-card images from `/promo/`. If unset, the app uses Vercel’s `VERCEL_URL` automatically.

3. **Redeploy** after adding env vars so the build uses them at runtime.

### Why does the Vercel app say "RESEND_API_KEY is not set"?

The **Vercel** deployment runs on Vercel’s servers. It does **not** use your local `.env` or `.env.local`. So even if the key works when you run the app locally (or when Claw talks to your local SmoothSales), the **Vercel** app will show that error until the key is set **in Vercel**:

1. Open [Vercel Dashboard](https://vercel.com) → your SmoothSales project.
2. Go to **Settings** → **Environment Variables**.
3. Add **`RESEND_API_KEY`** with your Resend API key (e.g. `re_xxxx…`). Apply to **Production** (and Preview if you use preview URLs).
4. **Redeploy**: Deployments tab → ⋮ on the latest deployment → **Redeploy** (or push a new commit). Env vars are baked in at deploy time, so a redeploy is required after adding or changing them.

After that, “Send to all” on the Vercel app (and Claw calling that Vercel URL) will work.

---

## Resend setup (sending from sales@coralcrownsolutions.com)

**You do not need a new Resend account.** One Resend account can have multiple domains verified and send from different addresses (e.g. helicopter project from one address, SmoothSales from `sales@coralcrownsolutions.com`). The “one email” limit is per **domain** you verify, not per account.

### Option A – Same Resend account (recommended)

1. **Add and verify domain**
   - [Resend Dashboard](https://resend.com/domains) → Add Domain
   - Domain: `coralcrownsolutions.com`
   - Add the DNS records Resend shows (MX, TXT, etc.) at your domain registrar.
   - Wait until the domain shows as verified.

2. **Send from address**
   - Once the domain is verified, you can use `sales@coralcrownsolutions.com` as the “From” address.
   - In Vercel, set:
     - `SMOOTHSALES_FROM="Coral Crown Solutions <sales@coralcrownsolutions.com>"`
   - If you don’t set `SMOOTHSALES_FROM`, the app still defaults to that address in code; sending will work only after the domain is verified in Resend.

3. **API key**
   - Use the **same** Resend API key as your helicopter project, or create a new API key in the same account (e.g. “SmoothSales”) and set it as `RESEND_API_KEY` in Vercel for this project.

No need for a second Resend account; one account can send from multiple verified domains.

### Option B – New Resend account

- Only if you want SmoothSales completely separate: create a new Resend account, verify `coralcrownsolutions.com` there, create an API key, and set it as `RESEND_API_KEY` in Vercel.

Use Option A if you want one place to manage all sending (helicopter + SmoothSales).

---

## Hosting / domain

- **App URL:** Vercel assigns a URL like `smoothsales-app.vercel.app`. You can keep using it or add a custom domain (e.g. `smoothsales.coralcrownsolutions.com` or `sales.coralcrownsolutions.com`) in Vercel → Project → Settings → Domains.
- **Email “From”:** Sending as `sales@coralcrownsolutions.com` is done through Resend (domain verification above), not through Vercel. The app only needs `RESEND_API_KEY` and optionally `SMOOTHSALES_FROM`.

---

## Checklist

- [ ] GitHub repo created (`smoothsales-app`)
- [ ] Code pushed to `main`
- [ ] Vercel project created and connected to GitHub
- [ ] `RESEND_API_KEY` set in Vercel (same or new Resend account)
- [ ] (Optional) `SMOOTHSALES_FROM` set in Vercel
- [ ] Domain `coralcrownsolutions.com` verified in Resend if you want to send from `sales@coralcrownsolutions.com`
- [ ] Redeploy after env changes
- [ ] Test “Send to all” with your own email

---

## Email signatures (business cards)

Templates include business card images in the signature, served from `/promo/` (see `public/promo/`). Images are loaded in emails via the app’s public URL (`NEXT_PUBLIC_APP_URL` or Vercel’s URL). Ensure the app is deployed so image links work in sent emails.

---

## Templates

Pre-made templates (see `src/lib/templates.ts`):

| Template            | Subject / use |
|---------------------|----------------|
| Botox Oahu          | Price sheet & specials (Botox, fillers, weight loss, wellness, etc.) |
| Tech                | Coral Crown – websites $800, host $20/mo, chatbots, Amazon/Etsy |
| Prayer – Individual | Prayer Authority – free sign-up, tools, community |
| Prayer – Church     | Prayer Authority – church/organization pitch |
| Tourism – Hawaii    | Time for Fun Hawaii – webinar, Oahu/Maui/Big Island |
| Tourism – USA       | Time for Fun USA – tour deals |

Edit copy in `src/lib/templates.ts` and redeploy to change emails.

---

## What you need to do (summary)

1. **Create the GitHub repo** (e.g. `smoothsales-app`), then from the `servicebot` folder (or repo root):  
   `git init && git add . && git commit -m "Initial SmoothSales" && git remote add origin https://github.com/YOUR_ORG/smoothsales-app.git && git push -u origin main`

2. **Vercel:** New project → Import from GitHub → select the repo → add env vars `RESEND_API_KEY` (and optionally `SMOOTHSALES_FROM`) → deploy.

3. **Resend:** In your existing Resend account, add domain `coralcrownsolutions.com` and verify it so you can send from `sales@coralcrownsolutions.com`. Use the same API key (or a new key in the same account) for SmoothSales.

After that, open the Vercel URL, pick a service and template, paste emails, and use **Send to all**.
