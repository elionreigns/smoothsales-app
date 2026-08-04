#!/usr/bin/env node
/** Send the upgraded festival HTML to the verified direct-email routes. */
const fs = require('fs');
const path = require('path');
const { buildCoralMusicEmailHtml, buildCoralMusicEmailText } = require('./coral-music-email-html.js');

const defaultCsvPath = path.resolve(__dirname, '..', 'contacts', 'leads', 'ELION-OUTREACH-ROUND2-FESTIVAL-EMAILS-2026-08-03.csv');
const csvArg = process.argv.find((arg) => arg.toLowerCase().endsWith('.csv'));
const csvPath = csvArg ? path.resolve(process.cwd(), csvArg) : defaultCsvPath;
const dryRun = process.argv.includes('--dry-run');
const baseUrl = (process.env.SMOOTHSALES_URL || 'https://smoothsales-app.vercel.app').replace(/\/$/, '');
const accessKey = process.env.SMOOTHSALES_BYPASS_KEY || process.env.SMOOTHSALES_PASSWORD || '13lion$ales';

function parseCsv(raw) {
  return raw.trim().split(/\r?\n/).slice(1).filter(Boolean).map((line) => {
    const [email, name] = line.split(',');
    return { email: email.trim().toLowerCase(), name: name.trim() };
  });
}

const recipients = parseCsv(fs.readFileSync(csvPath, 'utf8'));
const subject = 'E Lion — 2027 festival booking from Hawaii (paid set + travel package)';
if (dryRun) {
  console.log(JSON.stringify({ dryRun: true, subject, recipients }, null, 2));
  process.exit(0);
}

async function main() {
  const details = [];
  for (const recipient of recipients) {
    const html = buildCoralMusicEmailHtml({ name: recipient.name, org: recipient.name });
    const text = buildCoralMusicEmailText({ name: recipient.name, org: recipient.name });
    const res = await fetch(`${baseUrl}/api/send-campaign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Smoothsales-Access': accessKey },
      body: JSON.stringify({
        templateId: 'coral-music',
        subjectOverride: subject,
        bodyOverride: html,
        bodyTextOverride: text,
        recipients: [{ email: recipient.email, name: recipient.name, nameOfOrganization: recipient.name }],
      }),
    });
    const data = await res.json().catch(() => ({}));
    details.push({ recipient, status: res.status, ok: res.ok && data.sent === 1, data: res.ok ? data.details : data });
  }
  console.log(JSON.stringify({ sent: details.filter((d) => d.ok).length, total: details.length, details }, null, 2));
  if (details.some((d) => !d.ok)) process.exitCode = 1;
}
main().catch((err) => { console.error(err.message); process.exit(1); });
