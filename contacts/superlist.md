# SmoothSales – Campaign Superlist (Lead Building)

**Goal:** 200 **new** leads per audience (never contacted). Real contact emails + phone where possible. Send one campaign per day when Resend allows.

**CSV format for send:** `email,name,nameOfOrganization` (phone in separate column for calling; optional: `phone,notes`).

**Before sending:** Remove any lead whose email appears in `leads/contacted-emails.json` (run `python collect_emails.py` from repo root to regenerate that list from all servicebot + autobot CSVs). Never email the same address twice.

---

## 1. Botox Oahu

| Audience     | Template ID | Existing contacts (already sent) | Lead list to build (200 new) |
|-------------|-------------|----------------------------------|------------------------------|
| Individual  | `botox`     | autobot/contacts/botox.csv (placeholder) | `leads/botox-individual-200-new.csv` |
| Corporate   | `botox`     | (same template)                  | `leads/botox-corporate-200-new.csv`  |

**Lead sources:** Hawaii med spas, wellness centers, OB-GYN offices, dermatology practices, aesthetic nurses, Facebook/Instagram aesthetic groups (Oahu), Event planners (corporate).

---

## 2. Tech (Coral Crown)

| Audience     | Template ID | Existing contacts (already sent) | Lead list to build (200 new) |
|-------------|-------------|----------------------------------|------------------------------|
| Individual  | `tech`      | autobot/contacts/tech.csv        | `leads/tech-individual-200-new.csv` |
| Corporate   | `tech`      | servicebot: coralcrown-tech-hawaii-50.csv (~50 sent) | `leads/tech-corporate-200-new.csv` |

**Lead sources:** Hawaii SMB directories, restaurants, tour operators, salons, contractors, retail, chambers of commerce (Oahu, Maui, Big Island). Prefer contact/owner emails, not just info@.

---

## 3. Prayer Authority

| Audience | Template ID        | Existing contacts (already sent) | Lead list to build (200 new) |
|----------|--------------------|-----------------------------------|------------------------------|
| Individual | `prayer-individual` | autobot/contacts/prayer-individual.csv | `leads/prayer-individual-200-new.csv` |
| Church   | `prayer-church`    | autobot/contacts/prayer-church.csv     | `leads/prayer-church-200-new.csv` |

**Lead sources:** Church websites (staff pages, contact forms), pastors, worship leaders, small group directors. Individual: Christian influencers, bloggers, ministry leaders.

---

## 4. Tourism (Time for Fun)

| Audience       | Template ID                   | Existing contacts (already sent) | Lead list to build (200 new) |
|----------------|-------------------------------|-----------------------------------|------------------------------|
| Hawaii        | `tourism-hawaii`             | autobot/contacts/tourism-hawaii.csv | `leads/tourism-hawaii-200-new.csv` |
| USA           | `tourism-usa`                | autobot/contacts/tourism-usa.csv    | `leads/tourism-usa-200-new.csv` |
| Featured tour | `tourism-hawaii-featured-tour` | servicebot: timeforfun-featured-yacht-80.csv (~83 sent), yachts-contracts-80.csv (~80 sent) | `leads/tourism-featured-tour-200-new.csv` |

**Lead sources:** Hawaii tour operators (not yet in list), travel agents, vacation planners, yacht/charter companies (other islands, mainland), H.I.E. webinar lists (USA).

---

## 5. E Lion Music

| Audience   | Template ID                        | Existing contacts (already sent) | Lead list to build (200 new) |
|------------|------------------------------------|-----------------------------------|------------------------------|
| Fans       | `elion-fans`                       | autobot/contacts/elion-fans.csv   | `leads/elion-fans-200-new.csv` |
| Artists    | `elion-artists`                    | autobot/contacts/elion-artists.csv | `leads/elion-artists-200-new.csv` |
| Brands     | `elion-brands`                    | autobot/contacts/elion-brands.csv + *-send | `leads/elion-brands-200-new.csv` |
| Producers  | `elion-producers`                  | autobot/contacts/elion-producers.csv | `leads/elion-producers-200-new.csv` |
| Venue: Church | `elion-venue-church`            | autobot: venues-churches-*, elion-venue-church*.csv | `leads/elion-venue-church-200-new.csv` |
| Venue: Show | `elion-venue-show`              | autobot: venues-shows-*, elion-venue-show*.csv | `leads/elion-venue-show-200-new.csv` |
| Venue: DJ  | `elion-venue-dj`                  | autobot/contacts/elion-venue-dj.csv | `leads/elion-venue-dj-200-new.csv` |
| Venue: Major | `elion-venue-major`              | autobot: venues-major*, elion-venue-major*.csv | `leads/elion-venue-major-200-new.csv` |
| Level Up (A&R) | `elion-levelup`               | servicebot: levelup-3, levelup-4 (~61 sent) | `leads/elion-levelup-200-new.csv` |
| Record label (mainstream) | `elion-record-label-mainstream` | servicebot: elion-record-label-mainstream-50, -25-more, -retry (~77) | `leads/elion-record-label-mainstream-200-new.csv` |
| Record label (Christian) | `elion-record-label-christian`  | servicebot: elion-record-label-christian-100, -25-more, -150-new, -retry, -retry-8 (~400+ sent) | `leads/elion-record-label-christian-200-new.csv` |

**Lead sources:** Labels: A&R directories, label websites (A&R/submissions), Rapzilla, CHH blogs. Venues: church booking contacts, festival bookers, club promoters. Producers: beat-sell sites, producer credits on albums.

---

## 6. Wedding Planner (Hawaii Wedding Plans)

| Audience    | Template ID            | Existing contacts (already sent) | Lead list to build (200 new) |
|-------------|------------------------|-----------------------------------|------------------------------|
| Couples     | `wedding-couples`      | autobot/contacts/wedding-couples.csv | `leads/wedding-couples-200-new.csv` |
| Contractors | `wedding-contractors`  | servicebot: hawaii-wedding-plans-oahu-vendors-120.csv (120 sent); autobot/wedding-contractors | `leads/wedding-contractors-200-new.csv` |

**Lead sources:** Couples: wedding expos, The Knot/WeddingWire leads (if available), Hawaii destination wedding FB groups. Contractors: Maui/Big Island/Kauai vendors (photographers, venues, florists, planners) not in Oahu 120.

---

## 7. P48X

| Audience              | Template ID                   | Existing contacts (already sent) | Lead list to build (200 new) |
|-----------------------|-------------------------------|-----------------------------------|------------------------------|
| Personal              | `p48x-personal`               | autobot/contacts/p48x-personal.csv | `leads/p48x-personal-200-new.csv` |
| Physical distributors | `p48x-physical-distributors`  | autobot/contacts/p48x-physical-distributors.csv | `leads/p48x-physical-distributors-200-new.csv` |
| Affiliate sellers     | `p48x-affiliate-sellers`      | autobot/contacts/p48x-affiliate-sellers.csv | `leads/p48x-affiliate-sellers-200-new.csv` |

**Lead sources:** Christian bookstores (new locations), faith-based retail, church bookstores, Amazon/BookTok Christian book influencers. Affiliate: Christian bloggers, podcasters, ministries.

---

## 8. Healing Herbals

| Audience   | Template ID                      | Existing contacts (already sent) | Lead list to build (200 new) |
|------------|----------------------------------|-----------------------------------|------------------------------|
| Smoke Shop | `healing-herbals-smoke-shop`     | autobot: healing-herbals-smoke-shop*.csv, *80-send, *validated-send | `leads/healing-herbals-smoke-shop-200-new.csv` |
| Individual | `healing-herbals-individual`      | (none in servicebot)              | `leads/healing-herbals-individual-200-new.csv` |

**Lead sources:** Smoke shops (state directories, not yet contacted), vape shops, CBD/kava bars. Individual: wellness newsletters, kava/blue lotus communities, no email from existing smoke-shop lists.

---

## 9. Yachts (Private Charter)

| Audience  | Template ID         | Existing contacts (already sent) | Lead list to build (200 new) |
|-----------|---------------------|-----------------------------------|------------------------------|
| Contracts | `yachts-contracts`  | servicebot: yachts-contracts-80.csv (~80 sent) | `leads/yachts-contracts-200-new.csv` |
| Clients   | `yachts-clients`    | (questionnaire – usually not cold list) | N/A or `leads/yachts-clients-200-new.csv` for trip planners |

**Lead sources:** Charter operators (Florida, California, Caribbean, Mediterranean), sailboat clubs, yacht brokers, concierge services. Clients: high-end travel agents, luxury concierge.

---

## 10. Stella the Cutest Corgi

| Audience | Template ID | Existing contacts (already sent) | Lead list to build |
|----------|-------------|-----------------------------------|--------------------|
| Brands / Sponsors | `stella-brands` | (new service) | `leads/stella-brands-200-new.csv` |
| Media / Features | `stella-media` | (new service) | `leads/stella-media-200-new.csv` |
| Talent / Casting | `stella-talent` | (new service) | `leads/stella-talent-200-new.csv` |

**Lead sources:** Pet treat and supplement brands, dog food companies, pet lifestyle magazines, commercial casting teams, pet talent agencies, pet influencer managers, production companies, ad agencies with pet campaigns.

---

## Summary: Lead lists to build

| # | Service        | Audience              | Template ID                   | Target file |
|---|----------------|------------------------|-------------------------------|-------------|
| 1 | Botox Oahu     | Individual             | botox                         | leads/botox-individual-200-new.csv |
| 2 | Botox Oahu     | Corporate              | botox                         | leads/botox-corporate-200-new.csv |
| 3 | Tech           | Individual             | tech                          | leads/tech-individual-200-new.csv |
| 4 | Tech           | Corporate              | tech                          | leads/tech-corporate-200-new.csv |
| 5 | Prayer         | Individual             | prayer-individual             | leads/prayer-individual-200-new.csv |
| 6 | Prayer         | Church                 | prayer-church                 | leads/prayer-church-200-new.csv |
| 7 | Tourism        | Hawaii                 | tourism-hawaii                | leads/tourism-hawaii-200-new.csv |
| 8 | Tourism        | USA                    | tourism-usa                   | leads/tourism-usa-200-new.csv |
| 9 | Tourism        | Featured tour          | tourism-hawaii-featured-tour  | leads/tourism-featured-tour-200-new.csv |
|10 | E Lion         | Fans                   | elion-fans                    | leads/elion-fans-200-new.csv |
|11 | E Lion         | Artists                | elion-artists                 | leads/elion-artists-200-new.csv |
|12 | E Lion         | Brands                 | elion-brands                  | leads/elion-brands-200-new.csv |
|13 | E Lion         | Producers              | elion-producers               | leads/elion-producers-200-new.csv |
|14 | E Lion         | Venue: Church          | elion-venue-church            | leads/elion-venue-church-200-new.csv |
|15 | E Lion         | Venue: Show            | elion-venue-show              | leads/elion-venue-show-200-new.csv |
|16 | E Lion         | Venue: DJ              | elion-venue-dj                | leads/elion-venue-dj-200-new.csv |
|17 | E Lion         | Venue: Major           | elion-venue-major             | leads/elion-venue-major-200-new.csv |
|18 | E Lion         | Level Up               | elion-levelup                 | leads/elion-levelup-200-new.csv |
|19 | E Lion         | Record label mainstream| elion-record-label-mainstream | leads/elion-record-label-mainstream-200-new.csv |
|20 | E Lion         | Record label Christian | elion-record-label-christian  | leads/elion-record-label-christian-200-new.csv |
|21 | Wedding        | Couples                | wedding-couples               | leads/wedding-couples-200-new.csv |
|22 | Wedding        | Contractors            | wedding-contractors           | leads/wedding-contractors-200-new.csv |
|23 | P48X           | Personal               | p48x-personal                 | leads/p48x-personal-200-new.csv |
|24 | P48X           | Physical distributors  | p48x-physical-distributors    | leads/p48x-physical-distributors-200-new.csv |
|25 | P48X           | Affiliate sellers      | p48x-affiliate-sellers        | leads/p48x-affiliate-sellers-200-new.csv |
|26 | Healing Herbals| Smoke Shop             | healing-herbals-smoke-shop     | leads/healing-herbals-smoke-shop-200-new.csv |
|27 | Healing Herbals| Individual             | healing-herbals-individual     | leads/healing-herbals-individual-200-new.csv |
|28 | Yachts         | Contracts              | yachts-contracts              | leads/yachts-contracts-200-new.csv |
|29 | Yachts         | Clients                | yachts-clients                | leads/yachts-clients-200-new.csv (optional) |
|30 | Stella         | Brands / Sponsors      | stella-brands                 | leads/stella-brands-200-new.csv |
|31 | Stella         | Media / Features       | stella-media                  | leads/stella-media-200-new.csv |
|32 | Stella         | Talent / Casting       | stella-talent                 | leads/stella-talent-200-new.csv |

**Total: 32 audience lists × 200 = 6,400 new leads.** Exclude every email/phone already in any existing CSV (servicebot + autobot) so we never double-contact.

---

## How to use (send one campaign per day)

1. Open SmoothSales → pick Service → pick Audience → pick Initial template.
2. Paste or load the corresponding `leads/<audience>-200-new.csv` (columns: `email`, `name`, `nameOfOrganization`; optional `phone` for your call list).
3. Send. Next day, use the next audience’s file.

**Finding real contacts (not just info@):** Use company websites (About / Team / Contact), LinkedIn (decision-makers), Chamber of Commerce, industry directories, “submissions@” or “bookings@” for venues/labels, and event/festival sponsor pages. Add phone from Google, Yelp, or company footer when available.

---

## Lead build status (leads/ folder)

| Audience | File | Status | Notes |
|----------|------|--------|--------|
| Yachts – Contracts | `leads/yachts-contracts-200-new.csv` | ✅ 200 | Mainland USA + Caribbean + Europe + Canada; many with phone |
| Tech – Corporate | `leads/tech-corporate-200-new.csv` | ✅ 200 | Hawaii SMB (restaurants, hotels, tours, retail, real estate, banks); some phone |
| Prayer – Church | `leads/prayer-church-200-new.csv` | ✅ 200 | Mainland churches (TX, GA, FL, CA, CO, NC, etc.); dedupe by email before send |
| Wedding – Contractors | `leads/wedding-contractors-200-new.csv` | ✅ 200 | Maui, Big Island, Kauai vendors (planners, florists, photo, venue, catering, etc.) |
| E Lion – Venue: Church | `leads/elion-venue-church-200-new.csv` | ✅ 200 | Churches with event/venue booking (events@, venue@, facilities@); dedupe before send |
| Healing Herbals – Smoke Shop | `leads/healing-herbals-smoke-shop-200-new.csv` | ✅ 200 | Smoke/head/CBD shops nationwide (CO, NM, TX, AZ, NV, CA, WA, IL, MI, OH, TN, FL, etc.) |
| Tourism – Hawaii | `leads/tourism-hawaii-200-new.csv` | ✅ 200 | Hawaii tour/activity operators (Oahu, Maui, Big Island, Kauai, etc.) |
| Tourism – USA | `leads/tourism-usa-200-new.csv` | ✅ 200 | USA travel agents, vacation clubs, state-by-state agencies |
| Tourism – Featured tour | `leads/tourism-featured-tour-200-new.csv` | ✅ 200 | Yacht/charter + featured tours (Pacific NW, New England, Great Lakes, Hawaii dinner/sunset, intl) |
| Botox – Individual | `leads/botox-individual-200-new.csv` | ✅ 200 | Hawaii med spas, aesthetics, injectables; email domains fixed |
| Tech – Individual | `leads/tech-individual-200-new.csv` | ✅ 200 | Hawaii + mainland SMB owners/managers, tech roles |
| Prayer – Individual | `leads/prayer-individual-200-new.csv` | ✅ 200 | Pastors/ministry leaders (mainland + Hawaii churches) |
| Botox – Corporate | `leads/botox-corporate-200-new.csv` | ✅ 200 | Hawaii chambers, HR/wellness, hotels, foundations, gov |
| Wedding – Couples | `leads/wedding-couples-200-new.csv` | ✅ 200 | Destination wedding inquiries, venues, expo-style |
| Stella – Brands / Sponsors | `leads/stella-brands-200-new.csv` | ✅ 200 | Pet brands, supplements, magazines, casting/talent targets (partnership/PR/influencer contacts) |
| All others | See table above | 🔲 To build | Dedupe against `leads/contacted-emails.json` (1,340 emails). Target 200 new per audience. |

**Contacted-emails.json:** Run `python collect_emails.py` (repo root) to regenerate from all servicebot + autobot CSVs. Before sending any lead file, remove rows whose `email` is in that list.
