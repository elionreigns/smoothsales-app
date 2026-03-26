#!/usr/bin/env node
/**
 * Send campaign templates to a small test inbox list.
 * Usage:
 *   node scripts/send-all-base-templates-test.js [baseUrl] [csvPath]
 *   node scripts/send-all-base-templates-test.js --all [baseUrl] [csvPath]
 *   SMOOTHSALES_URL=https://smoothsales-app.vercel.app node scripts/send-all-base-templates-test.js --all
 *
 * Default: only base templates (TEMPLATE_OPTIONS / marketing “roots”).
 * With --all (or SEND_ALL_TEMPLATES=1): every templateId accepted by /api/send-campaign (follow-ups + v2 + Stella, etc.).
 *
 * If csvPath is omitted or the file is missing, uses built-in test addresses (edit in script if needed).
 */
const fs = require("fs");
const path = require("path");

const rawArgs = process.argv.slice(2);
const useAll =
  rawArgs.includes("--all") || process.env.SEND_ALL_TEMPLATES === "1";
const argsNoFlags = rawArgs.filter((a) => a !== "--all");

let baseUrl = process.env.SMOOTHSALES_URL || "http://localhost:3000";
let csvArg;
if (argsNoFlags[0]?.startsWith("http")) {
  baseUrl = argsNoFlags[0];
  csvArg = argsNoFlags[1];
} else if (argsNoFlags[0]) {
  csvArg = argsNoFlags[0];
}
const accessKey = process.env.SMOOTHSALES_BYPASS_KEY || process.env.SMOOTHSALES_PASSWORD || "13lion$ales";

const BUILTIN_RECIPIENTS = [
  { email: "elionreigns@gmail.com", name: "Eric" },
  { email: "ashleydanielleschaefer@gmail.com", name: "Ashley" },
];

/** Must match TEMPLATE_OPTIONS in src/lib/templates.ts (base templates only). */
const BASE_TEMPLATE_IDS = [
  "botox",
  "tech",
  "prayer-individual",
  "prayer-church",
  "tourism-hawaii",
  "tourism-hawaii-featured-tour",
  "tourism-usa",
  "elion-fans",
  "elion-artists",
  "elion-brands",
  "elion-producers",
  "elion-venue-church",
  "elion-venue-show",
  "elion-venue-dj",
  "elion-venue-major",
  "elion-leaders",
  "elion-laymen",
  "elion-levelup",
  "elion-products-programs",
  "elion-record-label-mainstream",
  "elion-record-label-christian",
  "wedding-couples",
  "wedding-contractors",
  "p48x-personal",
  "p48x-physical-distributors",
  "p48x-affiliate-sellers",
  "healing-herbals-smoke-shop",
  "healing-herbals-individual",
  "yachts-contracts",
  "yachts-clients",
  "stella-brands",
  "stella-media",
  "stella-talent",
];

/** Keep in sync with validIds in src/app/api/send-campaign/route.ts */
const ALL_CAMPAIGN_TEMPLATE_IDS = [
  "botox",
  "tech",
  "prayer-individual",
  "prayer-church",
  "tourism-hawaii",
  "tourism-hawaii-featured-tour",
  "yachts-contracts",
  "yachts-clients",
  "tourism-usa",
  "elion-fans",
  "elion-artists",
  "elion-brands",
  "elion-fans-followup-1",
  "elion-fans-followup-2",
  "elion-fans-followup-3",
  "elion-artists-followup-1",
  "elion-artists-followup-2",
  "elion-artists-followup-3",
  "elion-brands-followup-1",
  "elion-brands-followup-2",
  "elion-brands-followup-3",
  "elion-producers",
  "elion-producers-followup-1",
  "elion-producers-followup-2",
  "elion-producers-followup-3",
  "elion-venue-church",
  "elion-venue-church-followup-1",
  "elion-venue-church-followup-2",
  "elion-venue-church-followup-3",
  "elion-venue-show",
  "elion-venue-show-followup-1",
  "elion-venue-show-followup-2",
  "elion-venue-show-followup-3",
  "elion-venue-dj",
  "elion-venue-dj-followup-1",
  "elion-venue-dj-followup-2",
  "elion-venue-dj-followup-3",
  "elion-venue-major",
  "elion-venue-major-followup-1",
  "elion-leaders",
  "elion-laymen",
  "elion-levelup",
  "elion-products-programs",
  "elion-record-label-mainstream",
  "elion-record-label-mainstream-followup-1",
  "elion-record-label-mainstream-followup-2",
  "elion-record-label-mainstream-followup-3",
  "elion-record-label-christian",
  "elion-record-label-christian-followup-1",
  "elion-record-label-christian-followup-2",
  "elion-record-label-christian-followup-3",
  "elion-venue-major-followup-2",
  "elion-venue-major-followup-3",
  "wedding-couples",
  "wedding-couples-followup-1",
  "wedding-couples-followup-2",
  "wedding-couples-followup-3",
  "wedding-contractors",
  "wedding-contractors-followup-1",
  "wedding-contractors-followup-2",
  "wedding-contractors-followup-3",
  "p48x-personal",
  "p48x-personal-followup-1",
  "p48x-personal-followup-2",
  "p48x-personal-followup-3",
  "p48x-physical-distributors",
  "p48x-physical-distributors-followup-1",
  "p48x-physical-distributors-followup-2",
  "p48x-physical-distributors-followup-3",
  "p48x-affiliate-sellers",
  "p48x-affiliate-sellers-followup-1",
  "p48x-affiliate-sellers-followup-2",
  "p48x-affiliate-sellers-followup-3",
  "healing-herbals-smoke-shop",
  "healing-herbals-smoke-shop-followup-1",
  "healing-herbals-smoke-shop-followup-2",
  "healing-herbals-smoke-shop-followup-3",
  "healing-herbals-individual",
  "healing-herbals-individual-followup-1",
  "healing-herbals-individual-followup-2",
  "healing-herbals-individual-followup-3",
  "botox-followup-1",
  "botox-followup-2",
  "botox-followup-3",
  "tech-followup-1",
  "tech-followup-2",
  "tech-followup-3",
  "prayer-individual-followup-1",
  "prayer-individual-followup-2",
  "prayer-individual-followup-3",
  "prayer-church-followup-1",
  "prayer-church-followup-2",
  "prayer-church-followup-3",
  "tourism-hawaii-followup-1",
  "tourism-hawaii-followup-2",
  "tourism-hawaii-followup-3",
  "tourism-usa-followup-1",
  "tourism-usa-followup-2",
  "tourism-usa-followup-3",
  "botox-v2",
  "tech-v2",
  "prayer-individual-v2",
  "prayer-church-v2",
  "tourism-hawaii-v2",
  "tourism-usa-v2",
  "elion-fans-v2",
  "elion-artists-v2",
  "elion-brands-v2",
  "elion-producers-v2",
  "elion-venue-church-v2",
  "elion-venue-show-v2",
  "elion-venue-dj-v2",
  "elion-venue-major-v2",
  "wedding-couples-v2",
  "wedding-contractors-v2",
  "p48x-personal-v2",
  "p48x-physical-distributors-v2",
  "p48x-affiliate-sellers-v2",
  "healing-herbals-smoke-shop-v2",
  "healing-herbals-individual-v2",
  "stella-brands",
  "stella-media",
  "stella-talent",
];

let recipients = [];
if (csvArg) {
  const csvPath = path.resolve(path.dirname(__dirname), csvArg);
  if (fs.existsSync(csvPath)) {
    const raw = fs.readFileSync(csvPath, "utf-8");
    const lines = raw.split(/\r?\n/).filter((line) => line.trim());
    const header = lines[0].toLowerCase();
    const emailIdx = header.includes("email") ? header.split(",").indexOf("email") : 0;
    const nameIdx = header.split(",").findIndex((h) => h.trim().toLowerCase() === "name");
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(",").map((p) => p.trim().replace(/^"|"$/g, ""));
      const email = (parts[emailIdx] || "").trim().toLowerCase();
      if (email && email.includes("@")) {
        recipients.push({
          email,
          name: nameIdx >= 0 && parts[nameIdx] ? parts[nameIdx] : undefined,
        });
      }
    }
  } else {
    console.warn("CSV not found, using built-in recipients:", csvPath);
  }
}
if (recipients.length === 0) {
  recipients = BUILTIN_RECIPIENTS;
  console.log("Using built-in test recipients:", recipients.map((r) => r.email).join(", "));
}

const templateIds = useAll ? ALL_CAMPAIGN_TEMPLATE_IDS : BASE_TEMPLATE_IDS;
const delayMs = useAll ? 2000 : 1200;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  const origin = baseUrl.replace(/\/$/, "");
  console.log(
    useAll
      ? `Sending ALL ${templateIds.length} campaign templates (--all)`
      : `Sending ${templateIds.length} base templates (use --all for follow-ups + v2 + full API list)`
  );
  let ok = 0;
  let fail = 0;
  for (let t = 0; t < templateIds.length; t++) {
    const templateId = templateIds[t];
    const res = await fetch(`${origin}/api/send-campaign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Smoothsales-Access": accessKey,
      },
      body: JSON.stringify({ templateId, recipients }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) {
      console.error("FAIL", templateId, res.status, data.error || data);
      fail++;
    } else {
      console.log("OK", templateId, "sent", data.sent, "failed", data.failed ?? 0);
      ok++;
    }
    if (t < templateIds.length - 1) await sleep(delayMs);
  }
  console.log("\nDone. Templates OK:", ok, "Templates failed:", fail, "| Recipients per template:", recipients.length);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
