#!/usr/bin/env python3
"""
Import phone-exported contacts (CSV or VCF) and merge into E Lion master CSV.

Usage:
  python scripts/import_phone_export.py <path_to_export.csv_or_vcf>

Output:
  contacts/leads/elion-master-contacts.csv (merged, deduped)
"""

from __future__ import annotations

import csv
import re
import sys
from pathlib import Path
from typing import Dict, List


ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / "contacts" / "leads" / "elion-master-contacts.csv"


def norm_email(v: str) -> str:
    v = (v or "").strip().lower()
    return v if "@" in v else ""


def norm_phone(v: str) -> str:
    d = re.sub(r"\D", "", v or "")
    return d if len(d) >= 7 else ""


def guess_segment(name: str, org: str) -> str:
    hay = f"{name} {org}".lower()
    hints = ("pastor", "church", "ministry", "bishop", "chaplain", "director", "president")
    return "leaders" if any(h in hay for h in hints) else "laymen"


def read_master() -> List[Dict[str, str]]:
    if not MASTER.exists():
        return []
    with MASTER.open("r", newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def parse_csv(path: Path) -> List[Dict[str, str]]:
    out: List[Dict[str, str]] = []
    with path.open("r", newline="", encoding="utf-8-sig", errors="ignore") as f:
        rows = list(csv.DictReader(f))
    for r in rows:
        # Try common field names
        name = (r.get("name") or r.get("Name") or r.get("full_name") or "").strip()
        first = (r.get("first_name") or r.get("First Name") or "").strip()
        last = (r.get("last_name") or r.get("Last Name") or "").strip()
        if not name:
            name = " ".join(x for x in [first, last] if x).strip()
        org = (r.get("company") or r.get("Company") or r.get("organization") or r.get("nameOfOrganization") or "").strip()
        email = norm_email(r.get("email") or r.get("Email") or r.get("E-mail Address") or "")
        phone = norm_phone(r.get("phone") or r.get("Phone") or r.get("mobile") or r.get("Mobile Phone") or "")
        if not email and not phone:
            continue
        out.append(
            {
                "email": email,
                "name": name,
                "nameOfOrganization": org,
                "phone": phone,
                "segment": guess_segment(name, org),
                "source": f"phone-export:{path.name}",
                "status": "unsent",
            }
        )
    return out


def parse_vcf(path: Path) -> List[Dict[str, str]]:
    text = path.read_text(encoding="utf-8", errors="ignore")
    cards = text.split("BEGIN:VCARD")
    out: List[Dict[str, str]] = []
    for card in cards:
        if "END:VCARD" not in card:
            continue
        lines = [ln.strip() for ln in card.splitlines() if ln.strip()]
        name = ""
        org = ""
        email = ""
        phone = ""
        for ln in lines:
            u = ln.upper()
            if u.startswith("FN:"):
                name = ln.split(":", 1)[1].strip()
            elif u.startswith("ORG:"):
                org = ln.split(":", 1)[1].strip()
            elif "EMAIL" in u and ":" in ln and not email:
                email = norm_email(ln.split(":", 1)[1].strip())
            elif "TEL" in u and ":" in ln and not phone:
                phone = norm_phone(ln.split(":", 1)[1].strip())
        if not email and not phone:
            continue
        out.append(
            {
                "email": email,
                "name": name,
                "nameOfOrganization": org,
                "phone": phone,
                "segment": guess_segment(name, org),
                "source": f"phone-export:{path.name}",
                "status": "unsent",
            }
        )
    return out


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: python scripts/import_phone_export.py <path_to_export.csv_or_vcf>")
        sys.exit(1)

    src = Path(sys.argv[1]).expanduser().resolve()
    if not src.exists():
        print(f"File not found: {src}")
        sys.exit(1)

    ext = src.suffix.lower()
    if ext == ".csv":
        imported = parse_csv(src)
    elif ext in {".vcf", ".vcard"}:
        imported = parse_vcf(src)
    else:
        print("Only .csv and .vcf are supported.")
        sys.exit(1)

    master = read_master()
    by_email: Dict[str, Dict[str, str]] = {}
    phone_only: Dict[str, Dict[str, str]] = {}

    for row in master:
        em = norm_email(row.get("email", ""))
        ph = norm_phone(row.get("phone", ""))
        if em:
            by_email[em] = row
        elif ph:
            phone_only[ph] = row

    added = 0
    merged = 0
    for row in imported:
        em = norm_email(row["email"])
        ph = norm_phone(row["phone"])
        if em and em in by_email:
            base = by_email[em]
            if not base.get("phone") and ph:
                base["phone"] = ph
                merged += 1
            if not base.get("name") and row.get("name"):
                base["name"] = row["name"]
            if not base.get("nameOfOrganization") and row.get("nameOfOrganization"):
                base["nameOfOrganization"] = row["nameOfOrganization"]
            continue
        if (not em) and ph and ph in phone_only:
            continue
        master.append(row)
        if em:
            by_email[em] = row
        elif ph:
            phone_only[ph] = row
        added += 1

    master_sorted = sorted(
        master,
        key=lambda r: (
            r.get("status", "unsent"),
            r.get("segment", "laymen"),
            (r.get("name", "") or "").lower(),
            (r.get("email", "") or "").lower(),
            (r.get("phone", "") or ""),
        ),
    )
    MASTER.parent.mkdir(parents=True, exist_ok=True)
    with MASTER.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=["email", "name", "nameOfOrganization", "phone", "segment", "source", "status"],
        )
        writer.writeheader()
        for row in master_sorted:
            writer.writerow(
                {
                    "email": row.get("email", ""),
                    "name": row.get("name", ""),
                    "nameOfOrganization": row.get("nameOfOrganization", ""),
                    "phone": row.get("phone", ""),
                    "segment": row.get("segment", "laymen"),
                    "source": row.get("source", ""),
                    "status": row.get("status", "unsent"),
                }
            )

    print(f"Imported rows parsed: {len(imported)}")
    print(f"Added new rows: {added}")
    print(f"Merged phone/name enrichments: {merged}")
    print(f"Master CSV updated: {MASTER}")


if __name__ == "__main__":
    main()
