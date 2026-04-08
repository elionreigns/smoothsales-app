#!/usr/bin/env node
/**
 * Import and send a researched Hawaii Christian leadership list (60+ emails).
 *
 * - Adds researched contacts to elion-master-contacts.csv if missing
 * - Sends elion-leaders to all researched contacts (unique emails)
 * - Marks successful sends in master CSV (status/sentAt/lastTemplateId)
 */

const fs = require("fs");
const path = require("path");

const TEMPLATE_ID = "elion-leaders";
const BATCH_SIZE = 20;

const RESEARCHED_CONTACTS = [
  { email: "info@firstaog.com", name: "First Assembly Team", nameOfOrganization: "First Assembly of God Honolulu" },
  { email: "info@enewhope.org", name: "New Hope Team", nameOfOrganization: "New Hope Oahu" },
  { email: "ohana@enewhope.org", name: "New Hope Ohana", nameOfOrganization: "New Hope Oahu" },
  { email: "info@kawaiahao.org", name: "Kawaiahao Team", nameOfOrganization: "Kawaiahao Church" },
  { email: "info@wolhawaii.com", name: "Word of Life Team", nameOfOrganization: "Word of Life Christian Center" },
  { email: "info@cathedralofourladyofpeace.com", name: "Cathedral Office", nameOfOrganization: "Cathedral Basilica of Our Lady of Peace" },
  { email: "info@gracebiblehawaii.com", name: "Grace Bible Team", nameOfOrganization: "Grace Bible Church Hawaii" },
  { email: "office@kailuaumc.org", name: "Kailua UMC Office", nameOfOrganization: "Kailua United Methodist Church" },
  { email: "info@oahuchurch.org", name: "Oahu Church Team", nameOfOrganization: "Oahu Church of Christ" },
  { email: "info1@gracehonolulu.org", name: "Grace Honolulu Office", nameOfOrganization: "Grace Bible Church Honolulu" },
  { email: "shauncastro@gracehonolulu.org", name: "Shaun Castro", nameOfOrganization: "Grace Bible Church Honolulu Youth Ministry" },
  { email: "sspeterpaul.youthministry@gmail.com", name: "Youth Ministry Team", nameOfOrganization: "Saints Peter and Paul Honolulu" },
  { email: "chapelhickam@gmail.com", name: "Hickam Chapel Team", nameOfOrganization: "Hickam Chapel Center" },
  { email: "aidan.e.hernandez3.mil@us.navy.mil", name: "Aidan Hernandez", nameOfOrganization: "Pearl Harbor Memorial Chapel" },
  { email: "kagofficemanager@gmail.com", name: "Kailua Assembly Office", nameOfOrganization: "Kailua Assembly of God" },
  { email: "community@ywamhonolulu.com", name: "YWAM Team", nameOfOrganization: "YWAM Honolulu" },
  { email: "hym@hawaiiaog.com", name: "HYM Team", nameOfOrganization: "Hawaii Youth Ministries AG" },
  { email: "hym.hawaiiyouthministry@gmail.com", name: "Hawaii Youth Ministries", nameOfOrganization: "Hawaii Youth Ministries" },
  { email: "info@yfchawaii.org", name: "YFC Hawaii Team", nameOfOrganization: "Youth For Christ Hawaii" },
  { email: "web@calvarychapelhonolulu.com", name: "Calvary Honolulu Team", nameOfOrganization: "Calvary Chapel Honolulu" },
  { email: "frontdesk@hawaiisda.com", name: "SDA Front Desk", nameOfOrganization: "Hawaii Conference SDA" },
  { email: "info@hawaiisda.com", name: "Hawaii SDA Team", nameOfOrganization: "Hawaii Conference SDA" },
  { email: "hcucc@hcucc.org", name: "HCUCC Office", nameOfOrganization: "Hawaii Conference UCC" },
  { email: "dpopham@hcucc.org", name: "David Popham", nameOfOrganization: "Hawaii Conference UCC" },
  { email: "jroach@hcucc.org", name: "Jonathan Roach", nameOfOrganization: "Hawaii Conference UCC" },
  { email: "lyamashiro@hcucc.org", name: "Lori Yamashiro", nameOfOrganization: "Hawaii Conference UCC" },
  { email: "jbuto@hcucc.org", name: "Julie Buto", nameOfOrganization: "Hawaii Conference UCC" },
  { email: "cnuuhiwa@hcucc.org", name: "Christine Nuuhiwa", nameOfOrganization: "Hawaii Conference UCC" },
  { email: "aosalvo@hcucc.org", name: "Ann Osalvo", nameOfOrganization: "Hawaii Conference UCC" },
  { email: "kyoung@hcucc.org", name: "Kristen Young", nameOfOrganization: "Hawaii Conference UCC" },
  { email: "cohawaii@gmail.com", name: "Contemplative Outreach", nameOfOrganization: "Contemplative Outreach Hawaii" },
  { email: "bcorrea@foursquare.org", name: "Bunny Correa", nameOfOrganization: "Foursquare Pacific District Hawaii" },
  { email: "herb@thechristianbeat.org", name: "Herb Longs", nameOfOrganization: "The Christian Beat" },
  { email: "info@lifechristianhawaii.org", name: "Life Christian Team", nameOfOrganization: "LIFE Christian Church Hawaii" },
  { email: "office@honoluluchristian.org", name: "Honolulu Christian Office", nameOfOrganization: "Honolulu Christian Church" },
  { email: "gunther@agapehi.org", name: "Gunther Muller", nameOfOrganization: "Agape Christian Fellowship Oahu" },
  { email: "kai@agapehi.org", name: "Lanaki Adric", nameOfOrganization: "Agape Christian Fellowship Oahu" },
  { email: "office@calvarychapelkaneohe.com", name: "Calvary Kaneohe Office", nameOfOrganization: "Calvary Chapel Kaneohe" },
  { email: "aloha@kcc1834.org", name: "KCC Team", nameOfOrganization: "Kaneohe Congregational Church" },
  { email: "pastortimnelson@gmail.com", name: "Pastor Tim Nelson", nameOfOrganization: "Kaneohe SDA Church" },
  { email: "wmcmm2013@gmail.com", name: "Windward Missionary Team", nameOfOrganization: "Windward Missionary Church" },
  { email: "preacher@leewardchurch.com", name: "Leeward Church Preacher", nameOfOrganization: "Leeward Church of Christ" },
  { email: "stjoseph@rcchawaii.org", name: "St Joseph Office", nameOfOrganization: "St Joseph Church Waipahu" },
  { email: "info@newhopeleeward.org", name: "New Hope Leeward Team", nameOfOrganization: "New Hope Leeward" },
  { email: "waipahuucc@gmail.com", name: "Waipahu UCC Team", nameOfOrganization: "Waipahu United Church of Christ" },
  { email: "hello@firstchurchwaipahu.com", name: "First Church Team", nameOfOrganization: "First Church Hawaii Waipahu" },
  { email: "admin@calvaryclc.com", name: "Calvary Leeward Coast", nameOfOrganization: "Calvary Chapel Leeward Coast" },
  { email: "info@hopechapelmililani.org", name: "Hope Chapel Team", nameOfOrganization: "Hope Chapel Mililani" },
  { email: "pastor@clcmililani.org", name: "Rev Keith Wolter", nameOfOrganization: "Christ Lutheran Church Mililani" },
  { email: "office@clcmililani.org", name: "CLC Office", nameOfOrganization: "Christ Lutheran Church Mililani" },
  { email: "rich@nhcohawaii.org", name: "NHCO Team", nameOfOrganization: "New Hope Central Oahu" },
  { email: "mcc@mcchawaii.edu", name: "Mililani Community Team", nameOfOrganization: "Mililani Community Church" },
  { email: "info@tccoahu.org", name: "Trinity Central Oahu Team", nameOfOrganization: "Trinity Church Central Oahu" },
  { email: "info@cchonolulu.org", name: "Community Church Team", nameOfOrganization: "Community Church of Honolulu" },
  { email: "info@centralunionchurch.org", name: "Central Union Team", nameOfOrganization: "Central Union Church" },
  { email: "cuwindward@gmail.com", name: "CU Windward Team", nameOfOrganization: "Central Union Windward" },
  { email: "citychurchhnl@gmail.com", name: "City Church Team", nameOfOrganization: "City Church Honolulu" },
  { email: "shc.wilder@rcchawaii.org", name: "Sacred Heart Office", nameOfOrganization: "Sacred Heart Church Honolulu" },
  { email: "nhco@nhcohawaii.org", name: "NHCO Office", nameOfOrganization: "New Hope Christian Outreach" },
  { email: "info@saltandlighthawaii.org", name: "Salt and Light Team", nameOfOrganization: "Salt and Light Hawaii" },
  { email: "ministry@kroccenterhawaii.org", name: "Kroc Ministry Team", nameOfOrganization: "Kroc Center Hawaii" },
  { email: "fiahchurch@gmail.com", name: "FIAH Team", nameOfOrganization: "Faith in Action Hawaii Church" },
  { email: "office@unifiedhawaii.org", name: "Unified Hawaii Office", nameOfOrganization: "Unified Church Hawaii" },
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

const baseUrl = process.env.SMOOTHSALES_URL || "http://localhost:3000";
const accessKey = process.env.SMOOTHSALES_BYPASS_KEY || process.env.SMOOTHSALES_PASSWORD || "13lion$ales";
const masterPath = path.join(__dirname, "..", "contacts", "leads", "elion-master-contacts.csv");
const outPath = path.join(__dirname, "..", "contacts", "leads", "researched-hawaii-leaders-60.csv");

if (!fs.existsSync(masterPath)) {
  console.error("Master CSV not found:", masterPath);
  process.exit(1);
}

const lines = fs.readFileSync(masterPath, "utf8").split(/\r?\n/).filter(Boolean);
const header = splitCsvLine(lines[0]);
const rows = [];
for (let i = 1; i < lines.length; i++) rows.push(splitCsvLine(lines[i]));

const col = (name) => header.indexOf(name);
const ensureCol = (name) => {
  const i = col(name);
  if (i >= 0) return i;
  header.push(name);
  return header.length - 1;
};

const iEmail = col("email");
const iName = ensureCol("name");
const iOrg = ensureCol("nameOfOrganization");
const iPhone = ensureCol("phone");
const iSegment = ensureCol("segment");
const iSource = ensureCol("source");
const iStatus = ensureCol("status");
const iSentAt = ensureCol("sentAt");
const iLastTpl = ensureCol("lastTemplateId");

if (iEmail < 0) {
  console.error("Master CSV missing email column");
  process.exit(1);
}

const indexByEmail = new Map();
for (let r = 0; r < rows.length; r++) {
  const email = normEmail(rows[r][iEmail]);
  if (email) indexByEmail.set(email, r);
}

const deduped = [];
const seen = new Set();
for (const c of RESEARCHED_CONTACTS) {
  const email = normEmail(c.email);
  if (!email.includes("@")) continue;
  if (seen.has(email)) continue;
  seen.add(email);
  deduped.push({ ...c, email });
}

// Add new entries to master if missing.
for (const c of deduped) {
  if (indexByEmail.has(c.email)) continue;
  const row = new Array(header.length).fill("");
  row[iEmail] = c.email;
  row[iName] = c.name || "";
  row[iOrg] = c.nameOfOrganization || "";
  row[iPhone] = "";
  row[iSegment] = "leaders";
  row[iSource] = "researched-web:hawaii-oahu-christian-leaders-2026-04-08";
  row[iStatus] = "unsent";
  rows.push(row);
  indexByEmail.set(c.email, rows.length - 1);
}

// Build send target set (all researched contacts).
const sendTargets = [];
for (const c of deduped) {
  const idx = indexByEmail.get(c.email);
  if (idx == null) continue;
  const row = rows[idx];
  sendTargets.push({
    rowIndex: idx,
    email: c.email,
    name: firstName(c.name || row[iName] || "there"),
    nameOfOrganization: c.nameOfOrganization || row[iOrg] || "",
    source: row[iSource] || "researched-web:hawaii-oahu-christian-leaders-2026-04-08",
    status: row[iStatus] || "unsent",
  });
}

const outLines = [
  ["email", "name", "nameOfOrganization", "source", "status"].join(","),
  ...sendTargets.map((t) =>
    [t.email, t.name, t.nameOfOrganization, t.source, t.status].map(escapeCsvCell).join(",")
  ),
];
fs.writeFileSync(outPath, outLines.join("\n") + "\n", "utf8");

console.log(
  JSON.stringify(
    {
      researchedContacts: RESEARCHED_CONTACTS.length,
      deduped: deduped.length,
      sendTargets: sendTargets.length,
      outPath,
      templateId: TEMPLATE_ID,
    },
    null,
    2
  )
);

if (sendTargets.length < 60) {
  console.error(`Need at least 60, but only ${sendTargets.length} researched contacts were available.`);
  process.exit(1);
}

async function sendBatch(batch) {
  const recipients = batch.map((x) => ({
    email: x.email,
    name: x.name || "there",
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

  for (let i = 0; i < sendTargets.length; i += BATCH_SIZE) {
    const batch = sendTargets.slice(i, i + BATCH_SIZE);
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

  console.log(JSON.stringify({ attempted: sendTargets.length, sentOk, masterPath }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

