import csv
import re
import sqlite3
import sys


EMAIL_RE = re.compile(r"[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}", re.IGNORECASE)


def normalize_email(s: str) -> str:
    return (s or "").strip().lower()


def main() -> int:
    db_path = r"D:\Limitless Backup\Diamond Rolodex\data\rolodex.sqlite"
    out_csv = "contacts/leads/diamond-rolodex-export.csv"

    con = sqlite3.connect(db_path)
    cur = con.cursor()

    cur.execute("select name from sqlite_master where type='table' order by name")
    tables = [r[0] for r in cur.fetchall()]
    if not tables:
        print("No tables found in sqlite db:", db_path)
        return 1

    rows = []

    # Heuristic: scan all text columns for email-like strings.
    for t in tables:
        cur.execute(f"pragma table_info({t})")
        cols = cur.fetchall()  # cid, name, type, notnull, dflt_value, pk
        text_cols = [c[1] for c in cols if str(c[2] or "").upper() in ("TEXT", "VARCHAR", "CHAR", "CLOB", "")]
        if not text_cols:
            continue

        # Pull limited rows per table to avoid huge memory use.
        col_sql = ", ".join([f'"{c}"' for c in text_cols])
        try:
            cur.execute(f"select {col_sql} from {t}")
        except Exception:
            continue

        for row in cur.fetchall():
            for cell in row:
                if not cell:
                    continue
                if not isinstance(cell, str):
                    continue
                for m in EMAIL_RE.finditer(cell):
                    email = normalize_email(m.group(0))
                    if email:
                        rows.append((email, t))

    # Deduplicate
    seen = set()
    deduped = []
    for email, table in rows:
        if email in seen:
            continue
        seen.add(email)
        deduped.append((email, table))

    with open(out_csv, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["email", "source"])
        for email, table in sorted(deduped):
            w.writerow([email, f"diamond-rolodex:{table}"])

    print(f"Wrote {len(deduped)} unique emails to {out_csv}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

