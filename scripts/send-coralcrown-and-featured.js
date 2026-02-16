#!/usr/bin/env node
/**
 * Send (1) Coral Crown Tech to 50 Hawaii businesses, (2) Time for Fun Featured Tour to 80 yacht/sailboat companies.
 * Usage: node scripts/send-coralcrown-and-featured.js [baseUrl]
 * Example: node scripts/send-coralcrown-and-featured.js https://smoothsales-app.vercel.app
 */

const fs = require("fs");
const path = require("path");

const baseUrl =
  process.env.SMOOTHSALES_URL ||
  process.argv[2] ||
  "http://localhost:3000";

function loadCsv(csvPath) {
  const raw = fs.readFileSync(csvPath, "utf-8");
  const lines = raw.split(/\r?\n/).filter((line) => line.trim());
  const header = lines[0].toLowerCase();
  const emailIdx = header.includes("email") ? header.split(",").indexOf("email") : 0;
  const nameIdx = header.includes("name") ? header.split(",").findIndex((h) => h.trim().toLowerCase() === "name") : -1;
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
  return recipients;
}

async function sendCampaign(templateId, recipients, label) {
  if (recipients.length === 0) {
    console.log(label + ": no recipients, skip.");
    return { sent: 0, failed: 0, total: 0 };
  }
  console.log("Sending " + label + " to " + recipients.length + " recipients...");
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/send-campaign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ templateId, recipients }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error(label + " failed:", res.status, data.error || data);
    return { sent: 0, failed: recipients.length, total: recipients.length };
  }
  console.log(label + " – Sent:", data.sent, "| Failed:", data.failed, "| Total:", data.total);
  if (data.details && data.failed > 0) {
    data.details.filter((d) => !d.ok).forEach((d) => console.error("  -", d.to, d.error));
  }
  return data;
}

async function run() {
  const contactsDir = path.join(__dirname, "..", "contacts");
  const techCsv = path.join(contactsDir, "coralcrown-tech-hawaii-50.csv");
  const yachtCsv = path.join(contactsDir, "timeforfun-featured-yacht-80.csv");

  if (!fs.existsSync(techCsv)) {
    console.error("CSV not found:", techCsv);
    process.exit(1);
  }
  if (!fs.existsSync(yachtCsv)) {
    console.error("CSV not found:", yachtCsv);
    process.exit(1);
  }

  const techRecipients = loadCsv(techCsv);
  const yachtRecipients = loadCsv(yachtCsv);

  console.log("Coral Crown Tech:", techRecipients.length, "| Featured Yacht:", yachtRecipients.length, "| Total:", techRecipients.length + yachtRecipients.length);
  console.log("Base URL:", baseUrl);
  console.log("");

  const r1 = await sendCampaign("tech", techRecipients, "Coral Crown Tech (Hawaii businesses)");
  await new Promise((r) => setTimeout(r, 2000));
  const r2 = await sendCampaign("tourism-hawaii-featured-tour", yachtRecipients, "Time for Fun Featured Tour (yacht/sailboat)");

  console.log("");
  console.log("Summary – Tech:", r1.sent + "/" + r1.total, "| Featured:", r2.sent + "/" + r2.total, "| Total sent:", r1.sent + r2.sent);
}

run();
