#!/usr/bin/env node
/**
 * Send elion-laymen to up to N unsent master contacts that have both email and non-empty name.
 *
 * Usage:
 *   SMOOTHSALES_URL=https://smoothsales-app.vercel.app node scripts/send-laymen-named-unsent.js 120
 *
 * Optional env:
 *   LAYMEN_NAMED_LIMIT=120  (overrides argv)
 */

const fs = require("fs");
const path = require("path");

const BATCH_SIZE = 20;
const TEMPLATE_ID = "elion-laymen";

function splitCsvLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out;
}

function escapeCsvCell(v) {
  const s = String(v ?? "");
  if (/[",\r\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function normEmail(s) {
  return String(s ?? "").trim().toLowerCase();
}

function greetingName(raw) {
  const s = String(raw ?? "").trim();
  if (!s) return "there";
  const first = s.split(/\s+/)[0];
  return first || "there";
}

const limit = Number(process.env.LAYMEN_NAMED_LIMIT || process.argv[2] || "120");
if (!Number.isFinite(limit) || limit < 1) {
  console.error("Usage: node scripts/send-laymen-named-unsent.js [count]");
  process.exit(1);
}

const baseUrl = process.env.SMOOTHSALES_URL || "http://localhost:3000";
const accessKey = process.env.SMOOTHSALES_BYPASS_KEY || process.env.SMOOTHSALES_PASSWORD || "13lion$ales";

const masterPath = path.join(__dirname, "..", "contacts", "leads", "elion-master-contacts.csv");
if (!fs.existsSync(masterPath)) {
  console.error("Master CSV not found:", masterPath);
  process.exit(1);
}

const raw = fs.readFileSync(masterPath, "utf8");
const lines = raw.split(/\r?\n/).filter(Boolean);
const header = splitCsvLine(lines[0]);

const ensureCol = (name) => {
  let i = header.indexOf(name);
  if (i >= 0) return i;
  header.push(name);
  return header.length - 1;
};

const iEmail = header.indexOf("email");
const iName = header.indexOf("name");
const iStatus = header.indexOf("status");
const iSentAt = ensureCol("sentAt");
const iLastTpl = ensureCol("lastTemplateId");

if (iEmail < 0 || iName < 0 || iStatus < 0) {
  console.error("Master CSV missing columns: email, name, status");
  process.exit(1);
}

const rows = [];
for (let i = 1; i < lines.length; i++) rows.push(splitCsvLine(lines[i]));

const targets = [];
const seen = new Set();

for (let r = 0; r < rows.length; r++) {
  if (targets.length >= limit) break;
  const row = rows[r];
  const email = normEmail(row[iEmail]);
  const fullName = String(row[iName] ?? "").trim();
  const status = String(row[iStatus] ?? "").trim().toLowerCase();
  if (!email || !email.includes("@")) continue;
  if (status !== "unsent") continue;
  if (!fullName) continue;
  if (seen.has(email)) continue;
  seen.add(email);
  targets.push({
    rowIndex: r,
    email,
    name: greetingName(fullName),
  });
}

console.log(
  JSON.stringify(
    {
      masterPath,
      requestedLimit: limit,
      selected: targets.length,
      templateId: TEMPLATE_ID,
    },
    null,
    2,
  ),
);

if (targets.length === 0) {
  console.error("No matching unsent rows with both email and name.");
  process.exit(1);
}

async function sendBatch(batch) {
  const recipients = batch.map((t) => ({ email: t.email, name: t.name }));
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/send-campaign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Smoothsales-Access": accessKey,
    },
    body: JSON.stringify({ templateId: TEMPLATE_ID, recipients }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Send failed ${res.status}: ${data.error || JSON.stringify(data)}`);
  }
  return new Set((data.details || []).filter((d) => d.ok).map((d) => String(d.to || "").toLowerCase()));
}

async function main() {
  let totalOk = 0;
  const nowIso = new Date().toISOString();

  for (let i = 0; i < targets.length; i += BATCH_SIZE) {
    const batch = targets.slice(i, i + BATCH_SIZE);
    console.log(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} recipients`);
    const okSet = await sendBatch(batch);
    for (const t of batch) {
      if (!okSet.has(t.email)) continue;
      totalOk++;
      const row = rows[t.rowIndex];
      row[iStatus] = "sent";
      row[iSentAt] = nowIso;
      row[iLastTpl] = TEMPLATE_ID;
    }
  }

  const outLines = [];
  outLines.push(header.map(escapeCsvCell).join(","));
  for (const row of rows) {
    while (row.length < header.length) row.push("");
    outLines.push(row.map(escapeCsvCell).join(","));
  }
  fs.writeFileSync(masterPath, outLines.join("\n") + "\n", "utf8");

  console.log(JSON.stringify({ updatedMaster: masterPath, sentOk: totalOk, attempted: targets.length }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
