import fs from "node:fs";

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

function inc(map, key) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

function top(map, n = 15) {
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

function norm(s) {
  return String(s ?? "").trim();
}

function normEmail(s) {
  return norm(s).toLowerCase();
}

const csvPath = process.argv[2] || "contacts/leads/elion-master-contacts.csv";
const raw = fs.readFileSync(csvPath, "utf8");
const lines = raw.split(/\r?\n/).filter(Boolean);
if (lines.length < 2) {
  console.error("CSV has no rows:", csvPath);
  process.exit(1);
}

const header = splitCsvLine(lines[0]);
const idx = (name) => header.indexOf(name);

const iEmail = idx("email");
const iSource = idx("source");
const iStatus = idx("status");
const iSegment = idx("segment");

if (iEmail < 0) {
  console.error('Missing required column "email" in', csvPath);
  process.exit(1);
}

const seen = new Set();
let rowsWithEmail = 0;
let dupEmailRows = 0;

const bySource = new Map();
const byStatus = new Map();
const bySegment = new Map();

let apple = 0;
let phoneExport = 0;
let diamond = 0;
const diamondSamples = [];

for (let r = 1; r < lines.length; r++) {
  const cols = splitCsvLine(lines[r]);
  const email = normEmail(cols[iEmail]);
  if (!email) continue;
  rowsWithEmail++;

  if (seen.has(email)) {
    dupEmailRows++;
    continue;
  }
  seen.add(email);

  const source = iSource >= 0 ? norm(cols[iSource]) : "";
  const status = iStatus >= 0 ? norm(cols[iStatus]) || "(blank)" : "(missing)";
  const segment = iSegment >= 0 ? norm(cols[iSegment]) || "(blank)" : "(missing)";

  inc(bySource, source || "(blank)");
  inc(byStatus, status);
  inc(bySegment, segment);

  const srcLower = source.toLowerCase();
  if (srcLower.includes("apple")) apple++;
  if (srcLower.includes("phone-export")) phoneExport++;
  if (srcLower.includes("diamond")) {
    diamond++;
    if (diamondSamples.length < 10) diamondSamples.push({ email, source });
  }
}

const report = {
  csvPath,
  header,
  rowsWithEmail,
  uniqueEmails: seen.size,
  dupEmailRows,
  byStatusTop: top(byStatus, 10),
  bySegmentTop: top(bySegment, 10),
  bySourceTop: top(bySource, 20),
  sourceFlags: { apple, phoneExport, diamond },
  diamondSamples,
};

console.log(JSON.stringify(report, null, 2));

