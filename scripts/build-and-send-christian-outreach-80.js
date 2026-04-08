#!/usr/bin/env node
/**
 * Build a fresh Christian leadership outreach list and send elion-leaders.
 *
 * Criteria:
 * - Valid email
 * - status=unsent
 * - Match role/org keywords tied to pastors, youth leaders, churches, ministries,
 *   conferences, worship, and christian concerts/events.
 *
 * Outputs:
 * - contacts/leads/christian-outreach-80.csv (new list)
 * - Updates elion-master-contacts.csv for successful sends
 */

const fs = require("fs");
const path = require("path");

const TEMPLATE_ID = "elion-leaders";
const LIMIT = Number(process.env.CHRISTIAN_OUTREACH_LIMIT || process.argv[2] || "80");
const BATCH_SIZE = 20;
const DRY_RUN = process.argv.includes("--dry-run");

const INCLUDE_RE = [
  /pastor/i,
  /youth/i,
  /church/i,
  /chapel/i,
  /ministry|ministries/i,
  /christian/i,
  /bible/i,
  /worship/i,
  /conference/i,
  /event/i,
  /revival/i,
  /fellowship/i,
  /mission/i,
  /prayer/i,
  /kingdom/i,
  /gospel/i,
  /ihop/i,
  /concert/i,
  /music/i,
];

const EXCLUDE_RE = [
  /craigslist/i,
  /noreply/i,
  /no-?reply/i,
  /customersatisfaction/i,
  /support@/i,
  /submitrequest@/i,
  /security@/i,
  /instagram/i,
  /facebook/i,
  /ecwid/i,
  /mail\.google/i,
];

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
  console.error("Usage: node scripts/build-and-send-christian-outreach-80.js [count]");
  process.exit(1);
}

const baseUrl = process.env.SMOOTHSALES_URL || "http://localhost:3000";
const accessKey = process.env.SMOOTHSALES_BYPASS_KEY || process.env.SMOOTHSALES_PASSWORD || "13lion$ales";

const masterPath = path.join(__dirname, "..", "contacts", "leads", "elion-master-contacts.csv");
const outPath = path.join(__dirname, "..", "contacts", "leads", "christian-outreach-80.csv");

if (!fs.existsSync(masterPath)) {
  console.error("Master CSV not found:", masterPath);
  process.exit(1);
}

const raw = fs.readFileSync(masterPath, "utf8");
const lines = raw.split(/\r?\n/).filter(Boolean);
const header = splitCsvLine(lines[0]);

const col = (n) => header.indexOf(n);
const iEmail = col("email");
const iName = col("name");
const iOrg = col("nameOfOrganization");
const iSource = col("source");
const iStatus = col("status");
const iSentAt = col("sentAt") >= 0 ? col("sentAt") : header.push("sentAt") - 1;
const iLastTpl = col("lastTemplateId") >= 0 ? col("lastTemplateId") : header.push("lastTemplateId") - 1;

if (iEmail < 0 || iStatus < 0 || iName < 0 || iOrg < 0 || iSource < 0) {
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
  const status = String(row[iStatus] ?? "").trim().toLowerCase();
  if (!email || !email.includes("@")) continue;
  if (status !== "unsent") continue;
  if (seen.has(email)) continue;

  const name = String(row[iName] ?? "").trim();
  const org = String(row[iOrg] ?? "").trim();
  const source = String(row[iSource] ?? "").trim();
  const hay = `${email} | ${name} | ${org} | ${source}`;

  if (EXCLUDE_RE.some((re) => re.test(hay))) continue;
  if (!INCLUDE_RE.some((re) => re.test(hay))) continue;

  seen.add(email);
  selected.push({
    rowIndex: r,
    email,
    name,
    nameOfOrganization: org,
    source,
    sendName: firstName(name),
  });
}

const outLines = [
  ["email", "name", "nameOfOrganization", "source"].join(","),
  ...selected.map((x) => [x.email, x.name, x.nameOfOrganization, x.source].map(escapeCsvCell).join(",")),
];
fs.writeFileSync(outPath, outLines.join("\n") + "\n", "utf8");

console.log(
  JSON.stringify(
    {
      limit: LIMIT,
      selected: selected.length,
      outPath,
      templateId: TEMPLATE_ID,
      dryRun: DRY_RUN,
    },
    null,
    2
  )
);

if (selected.length === 0) {
  console.error("No matching outreach contacts found.");
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

  console.log(JSON.stringify({ attempted: selected.length, sentOk, masterPath }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

