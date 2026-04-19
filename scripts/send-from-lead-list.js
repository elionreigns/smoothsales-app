#!/usr/bin/env node
/**
 * Unified batch sender for the April-2026 services
 * (Apartments, Corgi Care, Luxury Resource, Rap Central).
 *
 * Reads a lead-list CSV (from public_html/business-docs/lead-lists/),
 * picks rows whose `template_sent` column matches the requested templateId,
 * and POSTs them in batches to /api/send-campaign on the live Vercel app.
 *
 * Initial send → registers a follow-up state in Vercel KV so the
 * /api/cron/run-followups job will fire FU1, FU2, FU3, FU4 automatically
 * over the next 14 days IF the recipient's Resend webhook does NOT report
 * an `email.opened` event.
 *
 * USAGE:
 *   node scripts/send-from-lead-list.js \
 *     --csv "../../PRAYER AUTHORITY 2026/2-17-public_html/public_html/business-docs/lead-lists/apartments-east-honolulu.csv" \
 *     --template apartments-realtor \
 *     --base-url https://smoothsales-app.vercel.app \
 *     --access $env:SMOOTHSALES_BYPASS_KEY \
 *     --batch 10 \
 *     [--dry-run]
 *
 * SAFETY:
 *  - --dry-run prints exactly what WOULD be sent, performs no API call.
 *  - Always run with --dry-run FIRST, eyeball the recipient list, then re-run without --dry-run.
 */

const fs = require("fs");
const path = require("path");

const args = parseArgs(process.argv.slice(2));
if (!args.csv || !args.template) {
  console.error("Usage: node send-from-lead-list.js --csv <path> --template <templateId> [--base-url URL] [--access KEY] [--batch N] [--dry-run]");
  process.exit(2);
}

const baseUrl = (args["base-url"] || process.env.SMOOTHSALES_BASE_URL || "https://smoothsales-app.vercel.app").replace(/\/$/, "");
const accessKey = args.access || process.env.SMOOTHSALES_BYPASS_KEY || "";
const batchSize = Number(args.batch || 10);
const dryRun = Boolean(args["dry-run"]);
const templateId = String(args.template).trim();
const csvPath = path.resolve(String(args.csv));
// Optional natural-language or ISO scheduled time (passed straight through to
// Resend's `scheduledAt`). Lets us queue sends for after the daily quota reset
// without burning today's allotment, e.g.  --scheduled-at "in 65 minutes"
const scheduledAt = args["scheduled-at"] ? String(args["scheduled-at"]).trim() : "";

if (!fs.existsSync(csvPath)) {
  console.error(`CSV not found: ${csvPath}`);
  process.exit(2);
}
if (!dryRun && !accessKey) {
  console.error("Missing --access or SMOOTHSALES_BYPASS_KEY env var. Refusing to send.");
  process.exit(2);
}

// ----- CSV parsing -----
function parseCsv(text) {
  const out = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; }
        else { inQuotes = false; }
      } else { cell += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ",") { row.push(cell); cell = ""; }
      else if (ch === "\n") { row.push(cell); out.push(row); row = []; cell = ""; }
      else if (ch === "\r") { /* skip */ }
      else { cell += ch; }
    }
  }
  if (cell.length || row.length) { row.push(cell); out.push(row); }
  return out.filter((r) => r.length && r.some((c) => String(c || "").trim().length));
}

const raw = fs.readFileSync(csvPath, "utf8");
const allRows = parseCsv(raw);
if (allRows.length < 2) {
  console.error("CSV has no data rows.");
  process.exit(2);
}

// First row that doesn't start with "NOTE:" is treated as the header.
let headerIdx = 0;
while (headerIdx < allRows.length && /^note:/i.test(String(allRows[headerIdx][0] || "").trim())) headerIdx++;
const header = allRows[headerIdx].map((h) => String(h || "").trim().toLowerCase());
const dataRows = allRows.slice(headerIdx + 1).filter((r) => !/^note:/i.test(String(r[0] || "").trim()));

function colIdx(...names) {
  for (const n of names) {
    const i = header.indexOf(n.toLowerCase());
    if (i >= 0) return i;
  }
  return -1;
}

// Smart column detection — works across all 3 lead-list shapes.
const iEmail = colIdx("email", "contact_email", "manager_email", "booking_email", "artist_email");
const iEmailFallback1 = colIdx("artist_email");
const iEmailFallback2 = colIdx("booking_email");
const iName = colIdx("contact_name", "business_name", "operator", "manager_name", "artist_stage_name", "title");
const iOrg = colIdx("operator", "title", "business_name", "artist_stage_name");
const iTemplateSent = colIdx("template_sent");

if (iEmail < 0) {
  console.error("Could not find an email column in CSV header:", header);
  process.exit(2);
}
if (iTemplateSent < 0) {
  console.error("Could not find a template_sent column in CSV header. We need it to match against --template.");
  process.exit(2);
}

// ----- Filter to recipients matching this templateId -----
const recipients = [];
for (const row of dataRows) {
  // For rapper CSV: if primary email column empty, fall back to artist_email then booking_email.
  let email = String(row[iEmail] || "").trim().toLowerCase();
  if (!email && iEmailFallback1 >= 0) email = String(row[iEmailFallback1] || "").trim().toLowerCase();
  if (!email && iEmailFallback2 >= 0) email = String(row[iEmailFallback2] || "").trim().toLowerCase();
  if (!email || !email.includes("@")) continue;
  if (email.startsWith("(per ")) continue; // placeholder rows (e.g. "(per ad)")
  if (email.includes("varies")) continue;

  const tplCell = String(row[iTemplateSent] || "").trim().toLowerCase();
  if (tplCell && tplCell !== templateId.toLowerCase()) continue;

  const nameCell = iName >= 0 ? String(row[iName] || "").trim() : "";
  // For vendor CSVs the "operator" column is BOTH the contact's name and the
  // organization name (one-person shops or where the operator IS the brand).
  // Previously we dropped the org when both indices resolved to the same column,
  // which left {{Name of Organization}} as a literal placeholder in subjects.
  // Now we always carry the operator/name string through as the org as well.
  let orgCell = iOrg >= 0 && iOrg !== iName ? String(row[iOrg] || "").trim() : "";
  if (!orgCell && nameCell) orgCell = nameCell;
  // Drop "Various individual landlords" / "various agents" — those are saved-search aggregator rows.
  if (/^various\b/i.test(nameCell)) continue;

  recipients.push({
    email,
    name: nameCell || "there",
    nameOfOrganization: orgCell || undefined,
  });
}

// De-dupe by email (some CSVs have shared inboxes across rows).
const seen = new Set();
const deduped = [];
for (const r of recipients) {
  if (seen.has(r.email)) continue;
  seen.add(r.email);
  deduped.push(r);
}

console.log(JSON.stringify({
  csv: csvPath,
  template: templateId,
  baseUrl,
  totalRowsScanned: dataRows.length,
  matchingRecipients: deduped.length,
  batchSize,
  dryRun,
}, null, 2));

if (deduped.length === 0) {
  console.error("No matching recipients with that template_sent value. Nothing to send.");
  process.exit(0);
}

if (dryRun) {
  console.log("---- DRY RUN ----");
  for (const r of deduped) console.log(`  ${r.email}  (${r.name}${r.nameOfOrganization ? " / " + r.nameOfOrganization : ""})`);
  console.log("---- END DRY RUN ----");
  console.log("Re-run without --dry-run to actually send.");
  process.exit(0);
}

// ----- Send -----
async function sendBatch(batch) {
  const res = await fetch(`${baseUrl}/api/send-campaign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Smoothsales-Access": accessKey,
    },
    body: JSON.stringify({
      templateId,
      recipients: batch,
      ...(scheduledAt ? { scheduledAt } : {}),
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Send failed ${res.status}: ${data.error || JSON.stringify(data)}`);
  return data;
}

(async () => {
  let totalSent = 0;
  let totalFailed = 0;
  const allFailures = [];
  const tStart = Date.now();

  for (let i = 0; i < deduped.length; i += batchSize) {
    const batch = deduped.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    process.stdout.write(`Batch ${batchNum} (${batch.length}) ... `);
    try {
      const r = await sendBatch(batch);
      totalSent += r.sent || 0;
      totalFailed += r.failed || 0;
      if (r.details) {
        for (const d of r.details) if (!d.ok) allFailures.push(d);
      }
      console.log(`sent ${r.sent}/${r.total}`);
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
      totalFailed += batch.length;
      for (const r of batch) allFailures.push({ to: r.email, ok: false, error: e.message });
    }
    // Polite pacing between batches (each batch already throttles internally at 700ms/email).
    await new Promise((r) => setTimeout(r, 1500));
  }

  const elapsed = ((Date.now() - tStart) / 1000).toFixed(1);
  console.log("\n=== SUMMARY ===");
  console.log(JSON.stringify({
    template: templateId,
    matchingRecipients: deduped.length,
    totalSent,
    totalFailed,
    elapsedSec: elapsed,
    autoFollowUps: "Vercel cron at /api/cron/run-followups will fire FU1-FU4 daily for unopened emails. See vercel.json.",
  }, null, 2));

  if (allFailures.length) {
    console.log("\nFailures:");
    for (const f of allFailures.slice(0, 25)) console.log(`  ${f.to}: ${f.error}`);
    if (allFailures.length > 25) console.log(`  ...and ${allFailures.length - 25} more`);
  }
})().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});

// ---- arg parser ----
function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next == null || next.startsWith("--")) { out[key] = true; }
    else { out[key] = next; i++; }
  }
  return out;
}
