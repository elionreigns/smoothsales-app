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

function escapeCsvCell(s) {
  const v = String(s ?? "");
  if (/[",\r\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

function normEmail(s) {
  return String(s ?? "").trim().toLowerCase();
}

const masterPath = process.argv[2] || "contacts/leads/elion-master-contacts.csv";
const importPath = process.argv[3] || "contacts/leads/diamond-rolodex-export.csv";

const masterRaw = fs.readFileSync(masterPath, "utf8");
const masterLines = masterRaw.split(/\r?\n/).filter(Boolean);
const masterHeader = splitCsvLine(masterLines[0]);
const idx = (n) => masterHeader.indexOf(n);
const iEmail = idx("email");
const iSegment = idx("segment");
const iSource = idx("source");
const iStatus = idx("status");

if (iEmail < 0 || iSegment < 0 || iSource < 0 || iStatus < 0) {
  throw new Error("Master CSV missing required columns. Expected: email,segment,source,status");
}

const seen = new Set();
for (let i = 1; i < masterLines.length; i++) {
  const cols = splitCsvLine(masterLines[i]);
  const email = normEmail(cols[iEmail]);
  if (email) seen.add(email);
}

const importRaw = fs.readFileSync(importPath, "utf8");
const importLines = importRaw.split(/\r?\n/).filter(Boolean);
const importHeader = splitCsvLine(importLines[0]);
const ieEmail = importHeader.indexOf("email");
const ieSource = importHeader.indexOf("source");
if (ieEmail < 0) throw new Error("Import CSV missing email column");

let added = 0;
const newRows = [];
for (let i = 1; i < importLines.length; i++) {
  const cols = splitCsvLine(importLines[i]);
  const email = normEmail(cols[ieEmail]);
  if (!email || !email.includes("@")) continue;
  if (seen.has(email)) continue;
  const src = ieSource >= 0 ? String(cols[ieSource] ?? "").trim() : "diamond-rolodex";

  const row = Array(masterHeader.length).fill("");
  row[iEmail] = email;
  row[iSegment] = "laymen";
  row[iSource] = src || "diamond-rolodex";
  row[iStatus] = "unsent";
  newRows.push(row.map(escapeCsvCell).join(","));
  seen.add(email);
  added++;
}

if (added > 0) {
  const out = masterRaw.replace(/\s*$/, "") + "\n" + newRows.join("\n") + "\n";
  fs.writeFileSync(masterPath, out, "utf8");
}

console.log(
  JSON.stringify(
    {
      masterPath,
      importPath,
      added,
      uniqueEmailsAfter: seen.size,
    },
    null,
    2
  )
);

