# Newsletter Maximizer

This document is the operating plan for sending high-volume E Lion / Eric Hans Schaefer campaigns with clean deliverability, contact tracking, and future SMS support.

## 1) Campaign Architecture

- **Service:** `elion`
- **New audiences:**
  - `leaders` (pastors, church leaders, ministry/org leaders)
  - `laymen` (friends, supporters, broader personal network)
- **Template ids:**
  - `elion-leaders`
  - `elion-laymen`

Both templates include:
- Official E Lion and Prayer Authority links
- P48X book + audiobook links
- Streaming platform links
- HOPE Weekends invite
- Register button for Prayer Authority

## 2) Contact Source of Truth

Diamond Rolodex dataset discovered at:
- `D:\Limitless Backup\Diamond Rolodex\data\rolodex.sqlite` (200 rows in `contacts`)
- `D:\Limitless Backup\Diamond Rolodex\data\social_contacts.json` (Instagram-heavy, minimal email utility)

Core `contacts` table fields:
- `first_name`, `last_name`
- `email`
- `phone`, `mobile`
- `account_name`
- `title`
- `modified_time`

## 3) Unsent -> Sent Workflow (Email)

### Goal
Send to batches (e.g., 200/day), then automatically move successfully sent recipients to a "sent" ledger so they are excluded from future sends.

### Recommended files
- `contacts/leads/elion-leaders-unsent.csv`
- `contacts/leads/elion-laymen-unsent.csv`
- `contacts/leads/elion-leaders-sent.csv`
- `contacts/leads/elion-laymen-sent.csv`

### Required CSV columns
- `email,name,nameOfOrganization`
- Optional: `phone,notes,segment`

### Rules
- Deduplicate by lowercased email.
- Exclude prior sent emails.
- Keep phone if present for future SMS.
- If no email but phone exists, keep in a phone-only queue (do not drop).

## 4) Deliverability Guardrails (Critical)

- Keep DNS configured:
  - SPF includes sender
  - DKIM aligned with sending domain
  - DMARC in monitor mode initially (`p=none`) until data is stable
- Warm up volume gradually:
  - Day 1-2: 20-50/day
  - Day 3-5: 75-150/day
  - Then scale toward 200/day if complaint/bounce rates remain low
- Keep list hygiene:
  - remove hard bounces immediately
  - suppress role/spamtrap-looking emails
  - avoid over-linking and ALL-CAPS style
- Use real personalization (`{{Name}}`) and segment-appropriate copy.

## 5) DMARC Report Interpretation

DMARC aggregate reports (`*.xml` / `*.xml.gz`) are typically **status telemetry**, not abuse accusations.

Your referenced file:
- `c:\Users\erict\OneDrive\Desktop\enterprise.protection.outlook.com!coralcrownsolutions.com!1774051200!1774137600.xml.gz`

Usually means:
- receiving servers are reporting authentication outcomes
- if SPF/DKIM pass + aligned, DMARC is working as expected
- failures indicate alignment/config work, not necessarily that someone "reported" you manually

## 6) SMS Campaign Plan (Compliance-First)

Before bulk texting:
- use a provider with A2P 10DLC / verified sender compliance
- capture explicit opt-in consent
- include STOP/HELP semantics in every first message
- maintain opt-out suppression permanently
- do not text without consent, even if number exists in contacts

Suggested path:
- Step 1: send email campaign first
- Step 2: SMS only to opted-in contacts, linking to hosted newsletter page
- Step 3: track click + opt-in upgrades for future sequences

## 7) Phone Link / Device Export Strategy

To improve contact quality:
- Export contacts from Phone Link / device address book into CSV/VCF
- Normalize into:
  - `name`
  - `email`
  - `phone`
  - `source`
  - `segment` (`leaders` or `laymen`)
- Merge with Rolodex SQLite rows, dedupe by email then phone

## 8) Immediate Next Actions

1. Finalize `leaders` and `laymen` templates (done in code).
2. Generate segmented unsent CSVs from Rolodex source.
3. Send a single-recipient test to `elionreigns@gmail.com`.
4. Review inbox placement + spam score indicators.
5. Launch small batch and monitor failures.
6. Auto-move sent addresses from unsent list after successful send.

## 9) Success Metrics

- Inbox placement rate (primary tabs/inbox)
- Hard bounce rate < 2%
- Spam complaint rate < 0.1%
- Open/click trends by segment
- Net growth of opted-in SMS audience

