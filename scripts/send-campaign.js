#!/usr/bin/env node
/**
 * Send any campaign to recipients in a CSV.
 * Usage:
 *   node scripts/send-campaign.js <baseUrl> <templateId> <csvPath>
 *   node scripts/send-campaign.js https://smoothsales-app.vercel.app tech contacts/coralcrown-tech-hawaii-50.csv
 *   node scripts/send-campaign.js https://smoothsales-app.vercel.app tourism-hawaii-featured-tour contacts/timeforfun-featured-yacht-80.csv
 */
const fs = require("fs");
const path = require("path");

const baseUrl = process.env.SMOOTHSALES_URL || process.argv[2] || "http://localhost:3000";
const templateId = process.argv[3];
const csvArg = process.argv[4];

if (!templateId || !csvArg) {
  console.error("Usage: node scripts/send-campaign.js <baseUrl> <templateId> <csvPath>");
  process.exit(1);
}

const csvPath = path.resolve(path.dirname(__dirname), csvArg);
if (!fs.existsSync(csvPath)) {
  console.error("CSV not found:", csvPath);
  process.exit(1);
}

const raw = fs.readFileSync(csvPath, "utf-8");
const lines = raw.split(/\r?\n/).filter((line) => line.trim());
const header = lines[0].toLowerCase();
const emailIdx = header.includes("email") ? header.split(",").indexOf("email") : 0;
const nameIdx = header.split(",").findIndex((h) => h.trim().toLowerCase() === "name");

const recipients = [];
for (let i = 1; i < lines.length; i++) {
  const row = lines[i];
  const parts = row.split(",").map((p) => p.trim().replace(/^"|"$/g, ""));
  const email = (parts[emailIdx] || "").trim().toLowerCase();
  if (email && email.includes("@")) {
    recipients.push({
      email,
      name: nameIdx >= 0 && parts[nameIdx] ? parts[nameIdx] : undefined,
    });
  }
}

if (recipients.length === 0) {
  console.error("No valid recipients in CSV.");
  process.exit(1);
}

console.log(`Sending ${templateId} to ${recipients.length} recipients via ${baseUrl}`);

async function run() {
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/send-campaign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ templateId, recipients }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("Send failed:", res.status, data.error || data);
    process.exit(1);
  }
  console.log("Sent:", data.sent, "| Failed:", data.failed, "| Total:", data.total);
  if (data.details && data.failed > 0) {
    data.details.filter((d) => !d.ok).forEach((d) => console.error("  -", d.to, d.error));
  }
}

run();
