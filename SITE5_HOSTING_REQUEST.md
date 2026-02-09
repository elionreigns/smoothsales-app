# Message to Send to Site5 – Self-Host (Move Off Vercel/GitHub), Permissions to Enable

Copy the text from **SITE5_MESSAGE_TO_SEND.txt** (or below) and send it to Site5 support. It states you want to **fully self-host** what’s on Vercel/GitHub, **link your GitHub project**, and lists **exact permissions** you need them to enable.

---

## What you’re asking for

1. **Move off Vercel/GitHub** – Host the SmoothSales (Next.js) app on your Site5 server instead of Vercel.
2. **Link what you built** – GitHub repo: https://github.com/elionreigns/smoothsales-app
3. **Password-protected subdomain** – e.g. app.coralcrownsolutions.com, behind HTTP auth.
4. **Permissions to enable** – Node 18+, long-running Node process (Passenger or proxy), subdomain for app only, password protect, SSL.

---

## After they respond

- If they **don’t support Node.js** on your plan, they may offer a VPS; use **servicebot/SELF_HOST.md** there.
- If they **do** support Node: follow their steps to deploy (clone or upload the repo, `npm ci`, `npm run build`, `npm start` or their command), set **RESEND_API_KEY** in `.env`, then enable password protection for the subdomain in cPanel/WHM.
