#!/usr/bin/env node
/**
 * Send every base campaign template (TEMPLATE_OPTIONS) to a small test inbox list.
 * Usage:
 *   node scripts/send-all-base-templates-test.js [baseUrl] [csvPath]
 *   SMOOTHSALES_URL=https://smoothsales-app.vercel.app node scripts/send-all-base-templates-test.js
 *
 * If csvPath is omitted or the file is missing, uses built-in test addresses (edit in script if needed).
 */
const fs = require("fs");
const path = require("path");

let baseUrl = process.env.SMOOTHSALES_URL || "http://localhost:3000";
let csvArg;
if (process.argv[2]?.startsWith("http")) {
  baseUrl = process.argv[2];
  csvArg = process.argv[3];
} else if (process.argv[2]) {
  csvArg = process.argv[2];
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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  const origin = baseUrl.replace(/\/$/, "");
  let ok = 0;
  let fail = 0;
  for (let t = 0; t < BASE_TEMPLATE_IDS.length; t++) {
    const templateId = BASE_TEMPLATE_IDS[t];
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
    if (t < BASE_TEMPLATE_IDS.length - 1) await sleep(1200);
  }
  console.log("\nDone. Templates OK:", ok, "Templates failed:", fail, "| Recipients per template:", recipients.length);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
