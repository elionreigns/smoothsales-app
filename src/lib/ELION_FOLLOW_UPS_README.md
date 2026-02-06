# E Lion follow-up emails

When an **original** E Lion campaign gets **no response within 4 days**, follow-up emails are sent from a **separate follow-up template document**.

## Template document

- **File:** `servicebot/src/lib/elion-follow-up-templates.ts`
- **Content:** 3 follow-up variants (1, 2, 3) for each of the 7 E Lion base templates:
  - elion-fans, elion-artists, elion-brands, elion-producers  
  - elion-venue-church, elion-venue-show, elion-venue-dj
- **Schedule:** First follow-up **4 days** after initial send; second **5 days** after that; third **5 days** after that (i.e. 4, 9, 14 days from initial). Max **4 emails total** (initial + 3 follow-ups).
- **Usage:** `getTemplate(id)` in `templates.ts` checks `isElionFollowUpTemplateId(id)` and, if true, returns content from `getElionFollowUpTemplate(id)` in this document instead of the main TEMPLATES map.

## Flow

1. **Initial send:** Use the normal template (e.g. `elion-brands`, `elion-fans`, …).
2. **Register for follow-up:** After sending, run `node realclawdbot/register-followup-state.js` (for elion-brands it reads `autobot/contacts/elion-brands-send.csv`). For other campaigns, add recipients to `autobot/contacts/follow-up-state.json` under `campaigns["elion-fans"]` (etc.) with `sent_at`, `follow_up_index: 0`.
3. **Run follow-ups:** Every few days run `SMOOTHSALES_URL=https://… node realclawdbot/run-followups.js`. It sends follow-up 1 at 4 days, then 2 at 5 days after that, then 3 at 5 days after that, per campaign.

## Template IDs (for send-campaign API)

All are valid `templateId` values:

- `elion-fans-followup-1`, `elion-fans-followup-2`, `elion-fans-followup-3`
- `elion-artists-followup-1`, `elion-artists-followup-2`, `elion-artists-followup-3`
- `elion-brands-followup-1`, `elion-brands-followup-2`, `elion-brands-followup-3`
- `elion-producers-followup-1`, `elion-producers-followup-2`, `elion-producers-followup-3`
- `elion-venue-church-followup-1`, `elion-venue-church-followup-2`, `elion-venue-church-followup-3`
- `elion-venue-show-followup-1`, `elion-venue-show-followup-2`, `elion-venue-show-followup-3`
- `elion-venue-dj-followup-1`, `elion-venue-dj-followup-2`, `elion-venue-dj-followup-3`
