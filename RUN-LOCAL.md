# SmoothSales (local dashboard)

**Production:** https://smoothsales-app.vercel.app — same app (deployed from this repo).

## Windows: path must not contain `#`

If the repo lives under something like `...\Cursor Sites #2\...`, **Next.js 14 will 500** with errors like
`app-router.js#` in the React Client manifest — the `#` in the folder name is treated like a URL fragment.

**Verified fix:** keep a copy under a path **with no `#`**, e.g. `C:\dev\smoothsales-app`, then run dev there.

```powershell
# One-time copy (from your real repo folder, adjust source):
$src  = "C:\Users\erict\OneDrive\Desktop\Cursor Sites #2\HELICOPTER TOURS ON OAHU\servicebot"
$dest = "C:\dev\smoothsales-app"
New-Item -ItemType Directory -Force -Path "C:\dev" | Out-Null
if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
robocopy $src $dest /E /XD node_modules .next .git

cd C:\dev\smoothsales-app
npm install
npm run dev
```

Open **http://localhost:3000** (or 3001/3002 if something else is using the port). After a fresh copy, `npm run build` also succeeds in `C:\dev\smoothsales-app`.

When you change code in the OneDrive tree, re-copy changed files (or re-run the `robocopy` block) before testing locally, **or** open the `C:\dev\smoothsales-app` folder in Cursor and work there, then back-merge to your main clone.

**Vercel** builds from git — **not** this Windows path — so **production is unaffected** by the `#` issue.

## Run the dashboard (any machine without `#` in the path)

```powershell
cd "…\servicebot"
npm install
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev
```

- **Password gate:** default in code is `13lion$ales` unless you set `SMOOTHSALES_PASSWORD` in `.env.local`.
- **Or bypass:** `http://localhost:3000/?access=YOUR_BYPASS_KEY` (same as `SMOOTHSALES_BYPASS_KEY` on Vercel if you set one).
- **Copy `.env.local.example` → `.env.local`** and add `RESEND_API_KEY` if you want real sends from localhost.

## Layout note (2026-04-27)

`src/app/layout.tsx` uses Google Fonts via `<link>` instead of `next/font/google`, so the font loader is not sensitive to odd paths. The **`#` in the project directory** is still a blocker for the **App Router** on Windows; use `C:\dev\smoothsales-app` (or similar) for local dev.
