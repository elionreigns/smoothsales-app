#!/usr/bin/env node
/**
 * Send the E Lion Level Up campaign (elion-levelup) to recipients in contacts/levelup-3.csv.
 *
 * Usage:
 *   SMOOTHSALES_URL=https://your-app.vercel.app node scripts/send-levelup-3.js
 *   node scripts/send-levelup-3.js https://your-app.vercel.app
 *   node scripts/send-levelup-3.js https://your-app.vercel.app "in 24 hours"   # schedule for 24h from now
 *   SCHEDULED_AT="in 24 hours" node scripts/send-levelup-3.js https://your-app.vercel.app
 *
 * Requires: RESEND_API_KEY set in Vercel (the API runs on the server). This script only
 * calls your deployed app's /api/send-campaign endpoint.
 */

const fs = require("fs");
const path = require("path");

const baseUrl =
  process.env.SMOOTHSALES_URL ||
  process.argv[2] ||
  "http://localhost:3000";
const scheduledAt = process.env.SCHEDULED_AT || process.argv[3] || null;
const csvPath = path.join(__dirname, "..", "contacts", "levelup-3.csv");

if (!fs.existsSync(csvPath)) {
  console.error("CSV not found:", csvPath);
  process.exit(1);
}

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

if (recipients.length === 0) {
  console.error("No valid recipients in CSV.");
  process.exit(1);
}

console.log(
  scheduledAt
    ? `Scheduling elion-levelup to ${recipients.length} recipients for ${scheduledAt} via ${baseUrl}`
    : `Sending elion-levelup to ${recipients.length} recipients via ${baseUrl}`
);

async function run() {
  const body = { templateId: "elion-levelup", recipients };
  if (scheduledAt) body.scheduledAt = scheduledAt;
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/send-campaign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("Send failed:", res.status, data.error || data);
    process.exit(1);
  }
  if (data.scheduled) {
    console.log("Scheduled:", data.sent, "| Failed:", data.failed, "| Total:", data.total, "| At:", data.scheduledAt);
  } else {
    console.log("Sent:", data.sent, "| Failed:", data.failed, "| Total:", data.total);
  }
  if (data.details && data.failed > 0) {
    data.details.filter((d) => !d.ok).forEach((d) => console.error("  -", d.to, d.error));
  }
}

run();
