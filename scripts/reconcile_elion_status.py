#!/usr/bin/env python3
"""
Reconcile E Lion contact status from leaders/laymen unsent/sent CSVs into:
  contacts/leads/elion-master-contacts.csv

This keeps one digest view with status = sent|unsent.
"""

from __future__ import annotations

import csv
from pathlib import Path
from typing import Dict, List


ROOT = Path(__file__).resolve().parents[1]
LEADS = ROOT / "contacts" / "leads"

MASTER = LEADS / "elion-master-contacts.csv"
LEADERS_UNSENT = LEADS / "elion-leaders-unsent.csv"
LAYMEN_UNSENT = LEADS / "elion-laymen-unsent.csv"
LEADERS_SENT = LEADS / "elion-leaders-sent.csv"
LAYMEN_SENT = LEADS / "elion-laymen-sent.csv"


def norm_email(v: str) -> str:
    return (v or "").strip().lower()


def read(path: Path) -> List[Dict[str, str]]:
    if not path.exists():
        return []
    with path.open("r", newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def main() -> None:
    unsent = read(LEADERS_UNSENT) + read(LAYMEN_UNSENT)
    sent = read(LEADERS_SENT) + read(LAYMEN_SENT)
    existing_master = read(MASTER)

    by_email: Dict[str, Dict[str, str]] = {}

    for row in existing_master + unsent + sent:
        em = norm_email(row.get("email", ""))
        if not em:
            continue
        if em not in by_email:
            by_email[em] = row
        else:
            # Keep richer metadata
            cur = by_email[em]
            for key in ("name", "nameOfOrganization", "phone", "segment", "source"):
                if not cur.get(key) and row.get(key):
                    cur[key] = row[key]

    sent_emails = {norm_email(r.get("email", "")) for r in sent if norm_email(r.get("email", ""))}
    unsent_emails = {norm_email(r.get("email", "")) for r in unsent if norm_email(r.get("email", ""))}

    out = []
    for em, row in by_email.items():
        status = "sent" if em in sent_emails else "unsent"
        if em in sent_emails and em in unsent_emails:
            status = "sent"
        out.append(
            {
                "email": em,
                "name": row.get("name", ""),
                "nameOfOrganization": row.get("nameOfOrganization", ""),
                "phone": row.get("phone", ""),
                "segment": row.get("segment", "laymen"),
                "source": row.get("source", ""),
                "status": status,
            }
        )

    out.sort(key=lambda r: (r["status"], r["segment"], r["name"].lower(), r["email"]))
    MASTER.parent.mkdir(parents=True, exist_ok=True)
    with MASTER.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=["email", "name", "nameOfOrganization", "phone", "segment", "source", "status"],
        )
        writer.writeheader()
        for row in out:
            writer.writerow(row)

    print(f"Master contacts: {len(out)}")
    print(f"Status sent: {sum(1 for r in out if r['status']=='sent')}")
    print(f"Status unsent: {sum(1 for r in out if r['status']=='unsent')}")
    print(f"Updated: {MASTER}")


if __name__ == "__main__":
    main()
