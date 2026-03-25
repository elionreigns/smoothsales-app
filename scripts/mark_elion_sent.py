#!/usr/bin/env python3
"""
Move recipients from unsent list into sent ledger after a successful send.

Usage:
  python scripts/mark_elion_sent.py leaders contacts/leads/elion-leaders-unsent.csv
  python scripts/mark_elion_sent.py laymen contacts/leads/elion-laymen-unsent.csv
"""

from __future__ import annotations

import csv
import sys
from pathlib import Path
from typing import Dict, List


ROOT = Path(__file__).resolve().parents[1]
LEADS_DIR = ROOT / "contacts" / "leads"

SENT_MAP = {
    "leaders": LEADS_DIR / "elion-leaders-sent.csv",
    "laymen": LEADS_DIR / "elion-laymen-sent.csv",
}


def read_rows(path: Path) -> List[Dict[str, str]]:
    if not path.exists():
        return []
    with path.open("r", newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def write_rows(path: Path, rows: List[Dict[str, str]], fieldnames: List[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def normalize_email(email: str) -> str:
    return (email or "").strip().lower()


def main() -> None:
    if len(sys.argv) < 3:
        print("Usage: python scripts/mark_elion_sent.py <leaders|laymen> <unsent_csv_path>")
        sys.exit(1)

    segment = sys.argv[1].strip().lower()
    unsent_path = (ROOT / sys.argv[2]).resolve()
    sent_path = SENT_MAP.get(segment)

    if segment not in SENT_MAP:
        print("Segment must be leaders or laymen")
        sys.exit(1)
    if not unsent_path.exists():
        print(f"Unsent CSV not found: {unsent_path}")
        sys.exit(1)

    unsent_rows = read_rows(unsent_path)
    sent_rows = read_rows(sent_path)

    existing = {normalize_email(r.get("email", "")) for r in sent_rows if normalize_email(r.get("email", ""))}

    added = 0
    for row in unsent_rows:
        em = normalize_email(row.get("email", ""))
        if not em or em in existing:
            continue
        sent_rows.append(row)
        existing.add(em)
        added += 1

    # Keep unsent header only after successful archival (caller should pass only successful recipients).
    fieldnames = list(unsent_rows[0].keys()) if unsent_rows else ["email", "name", "nameOfOrganization", "phone", "segment", "source"]
    write_rows(sent_path, sent_rows, fieldnames)
    write_rows(unsent_path, [], fieldnames)

    print(f"Archived to sent: {added}")
    print(f"Sent ledger: {sent_path}")
    print(f"Cleared unsent file: {unsent_path}")


if __name__ == "__main__":
    main()
