#!/usr/bin/env python3
"""
Build segmented E Lion newsletter lead lists from Diamond Rolodex sources.

Inputs:
  - D:\\Limitless Backup\\Diamond Rolodex\\data\\rolodex.sqlite
  - D:\\Limitless Backup\\Diamond Rolodex\\data\\plaxo_ab_outlook.csv

Outputs:
  - contacts/leads/elion-leaders-unsent.csv
  - contacts/leads/elion-laymen-unsent.csv
  - contacts/leads/elion-phone-only.csv

The script preserves prior sent suppression if these files exist:
  - contacts/leads/elion-leaders-sent.csv
  - contacts/leads/elion-laymen-sent.csv
"""

from __future__ import annotations

import csv
import re
import sqlite3
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Set


ROOT = Path(__file__).resolve().parents[1]
LEADS_DIR = ROOT / "contacts" / "leads"
ROLDEX_DATA = Path(r"D:\Limitless Backup\Diamond Rolodex\data")
SQLITE_PATH = ROLDEX_DATA / "rolodex.sqlite"
PLAXO_CSV = ROLDEX_DATA / "plaxo_ab_outlook.csv"

LEADERS_SENT = LEADS_DIR / "elion-leaders-sent.csv"
LAYMEN_SENT = LEADS_DIR / "elion-laymen-sent.csv"

LEADERS_UNSENT = LEADS_DIR / "elion-leaders-unsent.csv"
LAYMEN_UNSENT = LEADS_DIR / "elion-laymen-unsent.csv"
PHONE_ONLY = LEADS_DIR / "elion-phone-only.csv"
MASTER_CONTACTS = LEADS_DIR / "elion-master-contacts.csv"


LEADER_HINTS = (
    "pastor",
    "bishop",
    "apostle",
    "prophet",
    "reverend",
    "rev.",
    "elder",
    "deacon",
    "church",
    "chaplain",
    "ministry",
    "ministries",
    "temple",
    "synagogue",
    "fellowship",
    "mission",
    "foundation",
    "nonprofit",
    "director",
    "president",
    "ceo",
    "organization",
    "org",
)

EMAIL_RE = re.compile(r"^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$", re.IGNORECASE)

# Keep this conservative: block only obviously disposable / no-reply / test-like emails.
DISPOSABLE_DOMAINS = {
    "mailinator.com",
    "guerrillamail.com",
    "10minutemail.com",
    "tempmail.com",
    "yopmail.com",
    "trashmail.com",
    "fakeinbox.com",
    "getairmail.com",
    "spamgourmet.com",
    "maildrop.cc",
    "guerrillamailblock.com",
}
NO_REPLY_KEYWORDS = {"no-reply", "noreply", "do-not-reply", "donotreply", "no_reply"}
SUSPICIOUS_LOCAL_PART_PREFIXES = {"test", "spam", "info", "support", "sales", "contact", "admin", "webmaster", "help", "hello"}


def looks_spammy_email(email: str) -> bool:
    email_l = email.lower().strip()
    if email_l in {"", "unknown"}:
        return True
    if "@" not in email_l:
        return True

    if any(k in email_l.split("@", 1)[0] for k in NO_REPLY_KEYWORDS):
        return True

    local, domain = email_l.split("@", 1)
    if domain.startswith(".") or domain.endswith("."):
        return True
    if "_" in domain:
        return True
    if domain in DISPOSABLE_DOMAINS:
        return True

    # Basic "fake/test" filtering: short/empty-ish local parts and common test strings.
    if len(local) < 3:
        return True
    if local.startswith(tuple(SUSPICIOUS_LOCAL_PART_PREFIXES)):
        # Allow common legitimate cases from real domains (gmail/yahoo/etc.) by only blocking if domain is not a personal provider.
        personal_providers = ("gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "aol.com", "live.com")
        if domain not in personal_providers:
            return True

    # Reject email patterns with consecutive dots in domain or local.
    if ".." in email_l:
        return True

    return False


def normalize_email(raw: Optional[str]) -> str:
    if not raw:
        return ""
    email = raw.strip().lower()
    email = email.strip("<>;,")
    email = email.replace("mailto:", "")
    email = re.sub(r"\s+", "", email)
    if not EMAIL_RE.match(email):
        return ""
    if looks_spammy_email(email):
        return ""
    return email


def normalize_phone(raw: Optional[str]) -> str:
    if not raw:
        return ""
    digits = re.sub(r"\D", "", raw)
    if len(digits) < 7:
        return ""
    return digits


def full_name(first: str, last: str) -> str:
    return " ".join(part for part in [first.strip(), last.strip()] if part).strip()


def looks_like_leader(title: str, org: str, notes: str = "") -> bool:
    hay = f"{title} {org} {notes}".lower()
    return any(h in hay for h in LEADER_HINTS)


def read_sent_emails(paths: Iterable[Path]) -> Set[str]:
    sent: Set[str] = set()
    for path in paths:
        if not path.exists():
            continue
        with path.open("r", newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                email = normalize_email(row.get("email", ""))
                if email:
                    sent.add(email)
    return sent


@dataclass
class Lead:
    email: str
    name: str
    name_of_organization: str
    phone: str
    source: str
    segment: str


def extract_from_sqlite() -> List[Lead]:
    if not SQLITE_PATH.exists():
        return []
    con = sqlite3.connect(str(SQLITE_PATH))
    cur = con.cursor()
    rows = cur.execute(
        """
        SELECT first_name, last_name, email, phone, mobile, account_name, title
        FROM contacts
        """
    ).fetchall()
    con.close()
    leads: List[Lead] = []
    for first, last, email, phone, mobile, account, title in rows:
        em = normalize_email(email)
        ph = normalize_phone(phone) or normalize_phone(mobile)
        nm = full_name(first or "", last or "")
        org = (account or "").strip()
        ttl = (title or "").strip()
        segment = "leaders" if looks_like_leader(ttl, org) else "laymen"
        if em:
            leads.append(
                Lead(
                    email=em,
                    name=nm,
                    name_of_organization=org,
                    phone=ph,
                    source="rolodex.sqlite",
                    segment=segment,
                )
            )
    return leads


def extract_from_plaxo() -> List[Lead]:
    if not PLAXO_CSV.exists():
        return []
    leads: List[Lead] = []
    with PLAXO_CSV.open("r", newline="", encoding="utf-8-sig", errors="ignore") as f:
        reader = csv.DictReader(f)
        for row in reader:
            first = (row.get("First Name") or "").strip()
            last = (row.get("Last Name") or "").strip()
            org = (row.get("Company") or "").strip()
            title = (row.get("Job Title") or "").strip()
            email_candidates = [
                row.get("E-mail Address", ""),
                row.get("E-mail 2 Address", ""),
                row.get("E-mail 3 Address", ""),
                row.get("Home E-mail Address", ""),
                row.get("Home E-mail Address 2", ""),
                row.get("Home E-mail Address 3", ""),
            ]
            phone_candidates = [
                row.get("Mobile Phone", ""),
                row.get("Business Phone", ""),
                row.get("Home Phone", ""),
                row.get("Other Phone", ""),
            ]
            ph = ""
            for p in phone_candidates:
                ph = normalize_phone(p)
                if ph:
                    break
            nm = full_name(first, last)
            segment = "leaders" if looks_like_leader(title, org) else "laymen"
            for cand in email_candidates:
                em = normalize_email(cand)
                if not em:
                    continue
                leads.append(
                    Lead(
                        email=em,
                        name=nm,
                        name_of_organization=org,
                        phone=ph,
                        source="plaxo_ab_outlook.csv",
                        segment=segment,
                    )
                )
    return leads


def dedupe(leads: List[Lead]) -> Dict[str, Lead]:
    by_email: Dict[str, Lead] = {}
    for lead in leads:
        if lead.email not in by_email:
            by_email[lead.email] = lead
            continue
        # Keep the richer record.
        existing = by_email[lead.email]
        if not existing.name and lead.name:
            existing.name = lead.name
        if not existing.name_of_organization and lead.name_of_organization:
            existing.name_of_organization = lead.name_of_organization
        if not existing.phone and lead.phone:
            existing.phone = lead.phone
    return by_email


def write_csv(path: Path, rows: List[dict], fieldnames: List[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def main() -> None:
    sqlite_leads = extract_from_sqlite()
    plaxo_leads = extract_from_plaxo()
    all_leads = sqlite_leads + plaxo_leads
    by_email = dedupe(all_leads)

    sent_emails = read_sent_emails([LEADERS_SENT, LAYMEN_SENT])
    unsent = [lead for email, lead in by_email.items() if email not in sent_emails]

    leaders: List[dict] = []
    laymen: List[dict] = []
    phone_only: List[dict] = []

    for lead in sorted(unsent, key=lambda x: (x.name.lower(), x.email)):
        row = {
            "email": lead.email,
            "name": lead.name,
            "nameOfOrganization": lead.name_of_organization,
            "phone": lead.phone,
            "segment": lead.segment,
            "source": lead.source,
        }
        if lead.segment == "leaders":
            leaders.append(row)
        else:
            laymen.append(row)

    # Add phone-only leads from sqlite for future SMS (no email present).
    if SQLITE_PATH.exists():
        con = sqlite3.connect(str(SQLITE_PATH))
        cur = con.cursor()
        rows = cur.execute(
            """
            SELECT first_name, last_name, phone, mobile, account_name, title
            FROM contacts
            WHERE (email IS NULL OR trim(email) = '')
            """
        ).fetchall()
        con.close()
        seen_phone: Set[str] = set()
        for first, last, phone, mobile, account, title in rows:
            ph = normalize_phone(phone) or normalize_phone(mobile)
            if not ph or ph in seen_phone:
                continue
            seen_phone.add(ph)
            nm = full_name(first or "", last or "")
            segment = "leaders" if looks_like_leader(title or "", account or "") else "laymen"
            phone_only.append(
                {
                    "name": nm,
                    "phone": ph,
                    "nameOfOrganization": (account or "").strip(),
                    "segment": segment,
                    "source": "rolodex.sqlite",
                }
            )

    write_csv(
        LEADERS_UNSENT,
        leaders,
        ["email", "name", "nameOfOrganization", "phone", "segment", "source"],
    )
    write_csv(
        LAYMEN_UNSENT,
        laymen,
        ["email", "name", "nameOfOrganization", "phone", "segment", "source"],
    )
    write_csv(
        PHONE_ONLY,
        sorted(phone_only, key=lambda x: (x["name"].lower(), x["phone"])),
        ["name", "phone", "nameOfOrganization", "segment", "source"],
    )
    write_csv(
        MASTER_CONTACTS,
        [
            {
                "email": lead.email,
                "name": lead.name,
                "nameOfOrganization": lead.name_of_organization,
                "phone": lead.phone,
                "segment": lead.segment,
                "source": lead.source,
                "status": "unsent",
            }
            for lead in sorted(unsent, key=lambda x: (x.segment, x.name.lower(), x.email))
        ],
        ["email", "name", "nameOfOrganization", "phone", "segment", "source", "status"],
    )

    print(f"Total unique emails: {len(by_email)}")
    print(f"Suppressed sent emails: {len(sent_emails)}")
    print(f"Leaders unsent: {len(leaders)} -> {LEADERS_UNSENT}")
    print(f"Laymen unsent: {len(laymen)} -> {LAYMEN_UNSENT}")
    print(f"Phone-only queue: {len(phone_only)} -> {PHONE_ONLY}")
    print(f"Master unsent CSV: {len(unsent)} -> {MASTER_CONTACTS}")


if __name__ == "__main__":
    main()
