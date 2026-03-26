#!/usr/bin/env node
/**
 * Massive send helper for E Lion contacts in contacts/leads/elion-master-contacts.csv
 *
 * - Sends `elion-laymen` to segment=laymen rows
 * - Sends `elion-leaders` to segment=leaders rows
 * - Updates the master CSV in-place: status=sent, sentAt, lastTemplateId
 *
 * Usage:
 *   SMOOTHSALES_URL=https://smoothsales-app.vercel.app node scripts/send-elion-master.js
 *
 * Notes:
 * - Requires /api/send-campaign auth if enabled (use SMOOTHSALES_BYPASS_KEY / SMOOTHSALES_PASSWORD).
 * - Sends in batches to avoid timeouts and rate limits.
 */

const fs = require("fs");
const path = require("path");

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
const iOrg = header.indexOf("nameOfOrganization");
const iSeg = header.indexOf("segment");
const iStatus = header.indexOf("status");
const iSentAt = ensureCol("sentAt");
const iLastTpl = ensureCol("lastTemplateId");

if (iEmail < 0 || iSeg < 0 || iStatus < 0) {
  console.error("Master CSV missing required columns: email, segment, status");
  process.exit(1);
}

const rows = [];
for (let i = 1; i < lines.length; i++) rows.push(splitCsvLine(lines[i]));

function buildRecipients(segment) {
  const recs = [];
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    const email = normEmail(row[iEmail]);
    const seg = String(row[iSeg] ?? "").trim();
    const st = String(row[iStatus] ?? "").trim();
    if (!email || !email.includes("@")) continue;
    if (seg !== segment) continue;
    if (st !== "unsent") continue;
    recs.push({
      rowIndex: r,
      email,
      name: iName >= 0 ? (row[iName] || undefined) : undefined,
      nameOfOrganization: iOrg >= 0 ? (row[iOrg] || undefined) : undefined,
    });
  }
  return recs;
}

async function sendBatch(templateId, batch) {
  const recipients = batch.map((x) => ({
    email: x.email,
    name: x.name,
    nameOfOrganization: x.nameOfOrganization,
  }));
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/send-campaign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Smoothsales-Access": accessKey,
    },
    body: JSON.stringify({ templateId, recipients }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Send failed ${res.status}: ${data.error || JSON.stringify(data)}`);
  }
  const okSet = new Set((data.details || []).filter((d) => d.ok).map((d) => String(d.to || "").toLowerCase()));
  return { data, okSet };
}

async function runForSegment(segment, templateId) {
  const recs = buildRecipients(segment);
  console.log(`Segment ${segment}: ${recs.length} unsent → template ${templateId}`);
  if (recs.length === 0) return;

  const batchSize = 120;
  for (let i = 0; i < recs.length; i += batchSize) {
    const batch = recs.slice(i, i + batchSize);
    console.log(`  Sending batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(recs.length / batchSize)} (${batch.length})`);
    const { okSet } = await sendBatch(templateId, batch);
    const nowIso = new Date().toISOString();
    for (const item of batch) {
      if (!okSet.has(item.email)) continue;
      const row = rows[item.rowIndex];
      row[iStatus] = "sent";
      row[iSentAt] = nowIso;
      row[iLastTpl] = templateId;
    }
  }
}

async function main() {
  await runForSegment("leaders", "elion-leaders");
  await runForSegment("laymen", "elion-laymen");

  const outLines = [];
  outLines.push(header.map(escapeCsvCell).join(","));
  for (const row of rows) {
    // ensure row has the same column count
    while (row.length < header.length) row.push("");
    outLines.push(row.map(escapeCsvCell).join(","));
  }
  fs.writeFileSync(masterPath, outLines.join("\n") + "\n", "utf8");
  console.log("Updated master CSV:", masterPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

