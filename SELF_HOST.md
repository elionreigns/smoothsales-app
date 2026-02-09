# Self-Hosting SmoothSales on Your Own Server (e.g. coralcrownsolutions.com)

You can run SmoothSales on **your own server** and use your domain (e.g. **coralcrownsolutions.com** or **app.coralcrownsolutions.com**) without using Vercel or GitHub for hosting.

---

## What you need

- A server (VPS or shared hosting) with **Node.js 18+** and the ability to run a long-lived process (e.g. `next start` or pm2).
- Your domain (or subdomain) pointing to that server (A record or CNAME).
- A **Resend** account and **RESEND_API_KEY** (resend.com).
- Optional: **nginx** or **Apache** for reverse proxy and **certbot** for SSL.

---

## 1. Build the app

On your **local machine** (or on the server):

```bash
cd servicebot
npm ci
npm run build
```

This creates a production build in `.next/`. You can upload the whole `servicebot` folder to the server, or clone/copy the repo to the server and run the same commands there.

---

## 2. Upload to your server

- **Option A:** Copy the entire `servicebot` folder to the server (e.g. `/var/www/smoothsales` or `~/smoothsales`) via SFTP, rsync, or your host’s file manager.
- **Option B:** On the server, clone your repo (if you use Git) or copy files, then run `npm ci` and `npm run build` on the server.

You do **not** need GitHub for the server to run the app; you only need the built files and `node_modules` (from `npm ci`).

---

## 3. Environment variables on the server

Create a `.env` file **inside** the `servicebot` folder on the server (or set these in your hosting control panel):

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
```

Optional (once your domain is verified in Resend):

```env
SMOOTHSALES_FROM=Coral Crown Solutions <sales@coralcrownsolutions.com>
```

Keep `.env` out of version control (it should already be in `.gitignore`).

---

## 4. Run the app on the server

From the `servicebot` directory on the server:

```bash
npm ci --production
npm start
```

That runs `next start`, which by default listens on **port 3000**. To keep it running after you disconnect, use a process manager, e.g. **pm2**:

```bash
npm install -g pm2
pm2 start npm --name smoothsales -- start
pm2 save
pm2 startup
```

---

## 5. Reverse proxy (nginx) so the app is reachable on port 80/443

Example nginx site config (e.g. `/etc/nginx/sites-available/smoothsales`):

```nginx
server {
    listen 80;
    server_name app.coralcrownsolutions.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and reload nginx:

```bash
sudo ln -s /etc/nginx/sites-available/smoothsales /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Point **app.coralcrownsolutions.com** (or your chosen hostname) to this server via an **A** or **CNAME** record.

---

## 6. SSL (HTTPS) with Let’s Encrypt

```bash
sudo certbot --nginx -d app.coralcrownsolutions.com
```

Follow the prompts. Certbot will adjust the nginx config for HTTPS.

---

## 7. Point Autobot at your URL

On the machine where you run Autobot, set the SmoothSales URL to your hosted app:

- In **autobot/autobot.config.json**:
  ```json
  {
    "smoothsalesUrl": "https://app.coralcrownsolutions.com",
    "contactsDir": "contacts",
    "sentLogPath": "sent-log.json"
  }
  ```
- Or set the environment variable: `SMOOTHSALES_URL=https://app.coralcrownsolutions.com`

Then when you run:

```bash
node autobot/send-campaign.js p48x-personal autobot/contacts/p48x-personal.csv
```

Autobot will call your server’s API to send the campaign; no Vercel or GitHub required.

---

## 8. Resend sender domain

To send from **@coralcrownsolutions.com**, add and verify the domain in the Resend dashboard (DNS records). Then set:

```env
SMOOTHSALES_FROM=Coral Crown Solutions <sales@coralcrownsolutions.com>
```

Until then, you can keep using Resend’s onboarding domain (e.g. onboarding@resend.dev) for testing.

---

## Summary

| Step | Action |
|------|--------|
| 1 | Build: `cd servicebot` → `npm ci` → `npm run build` |
| 2 | Upload/copy `servicebot` to your server |
| 3 | On server: create `.env` with `RESEND_API_KEY` |
| 4 | On server: `npm ci --production` and `npm start` (or pm2) |
| 5 | Nginx (or Apache) reverse proxy to port 3000 |
| 6 | SSL with certbot for your domain |
| 7 | Set `smoothsalesUrl` in autobot to `https://app.coralcrownsolutions.com` (or your URL) |

You do **not** have to leave the app on Vercel or GitHub; you can host it entirely on your own server at coralcrownsolutions.com (or a subdomain).
