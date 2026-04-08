#!/usr/bin/env node
/**
 * Vetted Oahu/Hawaii faith-org outreach sender for elion-leaders.
 *
 * - Filters master CSV to local Hawaii/Oahu + church/ministry/youth/conference aligned contacts.
 * - Defaults to unsent only.
 * - Sends up to N recipients (default 100) via /api/send-campaign with templateId=elion-leaders.
 * - Personalizes Name from first token of name field; falls back to "there".
 * - Writes a vetted target list CSV for review.
 */

const fs = require("fs");
const path = require("path");

const TEMPLATE_ID = "elion-leaders";
const BATCH_SIZE = 20;
const LIMIT = Number(process.env.OAHU_LEADERS_LIMIT || process.argv[2] || "100");
const INCLUDE_SENT = process.argv.includes("--include-sent");
const DRY_RUN = process.argv.includes("--dry-run");

const LOCAL_RE =
  /(hawaii|oahu|honolulu|waikiki|kailua|kaneohe|kapolei|ewa|waipahu|mililani|wahiawa|windward|leeward|kakaako|manoa|pacrim|ibethel\.org|hawaii\.edu|hawaiiantel|@aloha\.com)/i;
const FAITH_RE =
  /(church|chapel|ministry|ministries|christian|bible|worship|prayer|pastor|fellowship|conference|youth|mission|kingdom|hope|ihop|revival)/i;

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

function firstName(raw) {
  const s = String(raw ?? "").trim();
  if (!s) return "there";
  return s.split(/\s+/)[0] || "there";
}

if (!Number.isFinite(LIMIT) || LIMIT < 1) {
  console.error("Usage: node scripts/send-oahu-leaders-outreach.js [count] [--dry-run] [--include-sent]");
  process.exit(1);
}

const baseUrl = process.env.SMOOTHSALES_URL || "http://localhost:3000";
const accessKey = process.env.SMOOTHSALES_BYPASS_KEY || process.env.SMOOTHSALES_PASSWORD || "13lion$ales";
const masterPath = path.join(__dirname, "..", "contacts", "leads", "elion-master-contacts.csv");
const vettedOutPath = path.join(__dirname, "..", "contacts", "leads", "oahu-leaders-vetted-targets.csv");

if (!fs.existsSync(masterPath)) {
  console.error("Master CSV not found:", masterPath);
  process.exit(1);
}

const raw = fs.readFileSync(masterPath, "utf8");
const lines = raw.split(/\r?\n/).filter(Boolean);
const header = splitCsvLine(lines[0]);

const idx = (name) => header.indexOf(name);
const iEmail = idx("email");
const iName = idx("name");
const iOrg = idx("nameOfOrganization");
const iPhone = idx("phone");
const iSource = idx("source");
const iStatus = idx("status");
const iSentAt = idx("sentAt") >= 0 ? idx("sentAt") : header.push("sentAt") - 1;
const iLastTpl = idx("lastTemplateId") >= 0 ? idx("lastTemplateId") : header.push("lastTemplateId") - 1;

if (iEmail < 0 || iName < 0 || iOrg < 0 || iSource < 0 || iStatus < 0) {
  console.error("Master CSV missing required columns.");
  process.exit(1);
}

const rows = [];
for (let i = 1; i < lines.length; i++) rows.push(splitCsvLine(lines[i]));

const selected = [];
const seen = new Set();

for (let r = 0; r < rows.length; r++) {
  if (selected.length >= LIMIT) break;
  const row = rows[r];
  const email = normEmail(row[iEmail]);
  if (!email || !email.includes("@")) continue;
  if (seen.has(email)) continue;
  const status = String(row[iStatus] ?? "").trim().toLowerCase();
  if (!INCLUDE_SENT && status !== "unsent") continue;

  const name = String(row[iName] ?? "").trim();
  const org = String(row[iOrg] ?? "").trim();
  const source = String(row[iSource] ?? "").trim();
  const phone = String(row[iPhone] ?? "").trim();
  const hay = [name, org, source, email, phone].join(" | ");
  const has808 = /^1?808/.test(phone.replace(/[^\d]/g, ""));
  if (!LOCAL_RE.test(hay) && !has808) continue;
  if (!FAITH_RE.test(hay)) continue;

  seen.add(email);
  selected.push({
    rowIndex: r,
    email,
    name,
    nameOfOrganization: org,
    phone,
    source,
    status,
    sendName: firstName(name),
  });
}

// Write vetted target export for transparency/review.
const outLines = [
  ["email", "name", "nameOfOrganization", "phone", "source", "status"].join(","),
  ...selected.map((x) =>
    [x.email, x.name, x.nameOfOrganization, x.phone, x.source, x.status].map(escapeCsvCell).join(",")
  ),
];
fs.writeFileSync(vettedOutPath, outLines.join("\n") + "\n", "utf8");

console.log(
  JSON.stringify(
    {
      templateId: TEMPLATE_ID,
      selected: selected.length,
      limit: LIMIT,
      includeSent: INCLUDE_SENT,
      dryRun: DRY_RUN,
      vettedOutPath,
    },
    null,
    2
  )
);

if (selected.length === 0) {
  console.error("No matching local Oahu/Hawaii faith-aligned contacts found.");
  process.exit(1);
}

if (DRY_RUN) process.exit(0);

async function sendBatch(batch) {
  const recipients = batch.map((x) => ({
    email: x.email,
    name: x.sendName,
    nameOfOrganization: x.nameOfOrganization || undefined,
  }));
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/send-campaign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Smoothsales-Access": accessKey,
    },
    body: JSON.stringify({ templateId: TEMPLATE_ID, recipients }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Send failed ${res.status}: ${data.error || JSON.stringify(data)}`);
  return new Set((data.details || []).filter((d) => d.ok).map((d) => String(d.to || "").toLowerCase()));
}

async function main() {
  let sentOk = 0;
  const nowIso = new Date().toISOString();

  for (let i = 0; i < selected.length; i += BATCH_SIZE) {
    const batch = selected.slice(i, i + BATCH_SIZE);
    console.log(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length}`);
    const okSet = await sendBatch(batch);
    for (const item of batch) {
      if (!okSet.has(item.email)) continue;
      sentOk++;
      const row = rows[item.rowIndex];
      row[iStatus] = "sent";
      row[iSentAt] = nowIso;
      row[iLastTpl] = TEMPLATE_ID;
    }
  }

  const merged = [header.map(escapeCsvCell).join(",")];
  for (const row of rows) {
    while (row.length < header.length) row.push("");
    merged.push(row.map(escapeCsvCell).join(","));
  }
  fs.writeFileSync(masterPath, merged.join("\n") + "\n", "utf8");

  console.log(JSON.stringify({ sentOk, attempted: selected.length, masterPath }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

