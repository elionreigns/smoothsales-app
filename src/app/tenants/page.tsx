import Link from "next/link";

export const metadata = {
  title: "Eric & Ashley Schaefer — Tenant Profile · East Honolulu 2BR search",
  description:
    "A qualified, quiet, paid-in-full Hawaii couple searching for a 2BR in East Honolulu. Deposit ready, references ready, ESA paperwork ready. Everything a landlord needs in under a minute.",
  openGraph: {
    title: "Eric & Ashley Schaefer — East Honolulu 2BR search",
    description:
      "Qualified Hawaii couple. Deposit + first month ready. References, employment, ESA paperwork all on file. Ready to apply same day.",
    images: [
      "https://smoothsales-app.vercel.app/assets/team/eric-ashley-family-feud-2016.png",
    ],
    type: "profile",
  },
};

const FEUD_IMG =
  "https://smoothsales-app.vercel.app/assets/team/eric-ashley-family-feud-2016.png";

// Inline-styled for maximum email/share-sheet compatibility. This page is
// intended to be texted/emailed as a single URL that renders perfectly on
// any device with no JS, no tracking, no forms.
export default function TenantsPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
  *,*::before,*::after { box-sizing:border-box; }
  :root { --teal:#0d9488; --teal-dark:#0f766e; --ink:#0f172a; --body:#334155; --mute:#64748b; --bg:#f8fafc; --card:#fff; --line:rgba(15,23,42,0.08); }
  html,body { margin:0; padding:0; background:var(--bg); color:var(--ink); font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif; -webkit-font-smoothing:antialiased; }
  a { color:var(--teal-dark); }
  .wrap { max-width:720px; margin:0 auto; padding:24px 18px 96px; }
  .hero { background:linear-gradient(135deg,#134e4a 0%,#0d9488 100%); color:#ecfeff; border-radius:24px; padding:30px 26px 34px; box-shadow:0 20px 40px -20px rgba(13,148,136,0.6); position:relative; overflow:hidden; }
  .hero::after { content:""; position:absolute; right:-60px; top:-60px; width:220px; height:220px; background:radial-gradient(circle,rgba(255,255,255,0.18),transparent 70%); }
  .kicker { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; font-weight:700; color:rgba(236,254,255,0.9); margin:0 0 10px; }
  .hero h1 { margin:0 0 10px; font-size:30px; line-height:1.15; font-weight:800; letter-spacing:-0.01em; }
  .hero .sub { margin:0; font-size:16px; line-height:1.55; color:rgba(236,254,255,0.95); max-width:48ch; }
  .ctas { display:flex; flex-wrap:wrap; gap:10px; margin-top:22px; position:relative; z-index:1; }
  .btn { display:inline-flex; align-items:center; gap:8px; padding:13px 18px; border-radius:999px; font-weight:700; font-size:15px; text-decoration:none; white-space:nowrap; }
  .btn-primary { background:#fff; color:var(--teal-dark); box-shadow:0 6px 18px -6px rgba(0,0,0,0.35); }
  .btn-ghost { background:rgba(255,255,255,0.14); color:#fff; border:1px solid rgba(255,255,255,0.35); }
  .card { background:var(--card); border:1px solid var(--line); border-radius:20px; padding:22px 22px 24px; margin:18px 0 0; box-shadow:0 1px 2px rgba(15,23,42,0.04); }
  .card h2 { margin:0 0 8px; font-size:13px; letter-spacing:0.14em; text-transform:uppercase; color:var(--teal-dark); font-weight:800; }
  .card h3 { margin:0 0 14px; font-size:22px; line-height:1.25; font-weight:800; letter-spacing:-0.01em; color:var(--ink); }
  .card p { margin:0 0 12px; font-size:15px; line-height:1.7; color:var(--body); }
  .card p:last-child { margin-bottom:0; }
  .card strong { color:var(--ink); }
  .stats { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin:14px 0 4px; }
  @media (min-width:560px) { .stats { grid-template-columns:repeat(4,1fr); } }
  .stat { background:#ecfeff; border:1px solid rgba(13,148,136,0.22); border-radius:14px; padding:12px 10px; text-align:center; }
  .stat b { display:block; font-size:20px; font-weight:800; color:#0f766e; line-height:1.1; }
  .stat span { font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:#0f766e; opacity:0.85; margin-top:4px; display:block; }
  .feud { display:flex; gap:14px; align-items:flex-start; background:#fffbeb; border:1px solid rgba(217,119,6,0.32); border-radius:16px; padding:16px 18px; margin:14px 0 4px; }
  .feud img { width:112px; height:auto; border-radius:12px; border:1px solid rgba(217,119,6,0.28); flex-shrink:0; }
  .feud .body { font-size:14px; line-height:1.6; color:#78350f; }
  .feud-kicker { font-size:10px; font-weight:800; letter-spacing:0.16em; text-transform:uppercase; color:#b45309; margin:0 0 8px; display:block; }
  @media (max-width:460px) { .feud { flex-direction:column; } .feud img { width:100%; max-width:180px; } }
  .checklist { list-style:none; padding:0; margin:4px 0 0; }
  .checklist li { position:relative; padding-left:30px; margin:0 0 10px; font-size:15px; line-height:1.6; color:var(--body); }
  .checklist li::before { content:"✓"; position:absolute; left:0; top:-1px; width:22px; height:22px; line-height:22px; text-align:center; background:#ecfeff; color:#0f766e; border-radius:50%; font-weight:800; font-size:13px; }
  .contact-grid { display:grid; grid-template-columns:1fr; gap:10px; margin-top:14px; }
  @media (min-width:520px) { .contact-grid { grid-template-columns:1fr 1fr; } }
  .contact-card { display:block; background:#f0fdfa; border:1px solid rgba(13,148,136,0.25); border-radius:14px; padding:14px 16px; text-decoration:none; color:var(--ink); }
  .contact-card .label { font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:var(--teal-dark); font-weight:800; }
  .contact-card .val { margin-top:4px; font-size:17px; font-weight:700; color:var(--ink); word-break:break-word; }
  .pets { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:12px; }
  .pet { background:#f0fdf4; border:1px solid rgba(22,163,74,0.22); border-radius:14px; padding:14px; font-size:14px; line-height:1.55; color:#166534; }
  .pet b { display:block; color:#14532d; font-size:15px; margin-bottom:4px; }
  .foot { margin-top:26px; padding:20px 4px 0; border-top:1px solid var(--line); text-align:center; font-size:13px; color:var(--mute); line-height:1.6; }
  .foot b { color:var(--ink); font-weight:700; }
  .sticky { position:fixed; left:0; right:0; bottom:0; padding:10px 12px calc(10px + env(safe-area-inset-bottom)); background:rgba(255,255,255,0.96); border-top:1px solid var(--line); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); display:flex; gap:8px; z-index:50; }
  .sticky .btn { flex:1; justify-content:center; padding:14px 10px; font-size:14px; }
  .sticky .btn-primary { background:var(--teal-dark); color:#fff; }
  .sticky .btn-secondary { background:#fff; color:var(--teal-dark); border:1px solid rgba(13,148,136,0.3); }
  @media (min-width:721px) { .sticky { display:none; } }
`,
        }}
      />
      <div className="wrap">
        <header className="hero">
          <p className="kicker">Tenant profile · Eric &amp; Ashley Schaefer</p>
          <h1>Quiet, paid-in-full couple looking for a 2BR in East Honolulu.</h1>
          <p className="sub">
            Deposit and first month ready today. References and ESA paperwork on
            file. We can tour this week and apply same day. No agent — just us.
          </p>
          <div className="ctas">
            <Link className="btn btn-primary" href="tel:8083930153">
              Call / text Eric · (808) 393-0153
            </Link>
            <Link
              className="btn btn-ghost"
              href="mailto:elionreigns@gmail.com?subject=About%20your%20East%20Honolulu%20rental"
            >
              Email us
            </Link>
          </div>
        </header>

        <section className="card">
          <h2>The short version</h2>
          <h3>
            Exactly what you want in a tenant — and exactly why we're easy to say
            yes to.
          </h3>
          <div className="stats">
            <div className="stat">
              <b>4+ yrs</b>
              <span>at our current place</span>
            </div>
            <div className="stat">
              <b>0</b>
              <span>late payments, ever</span>
            </div>
            <div className="stat">
              <b>2BR/2BA</b>
              <span>East Honolulu target</span>
            </div>
            <div className="stat">
              <b>Same day</b>
              <span>to apply + sign</span>
            </div>
          </div>
          <p style={{ marginTop: 14 }}>
            We&apos;re Eric &amp; Ashley Schaefer — a married couple, no kids yet,
            working from home, involved in ministry through our local Christian
            church. We&apos;ve lived in our current East Honolulu place 4+ years
            and we&apos;d like to stay in the area. We&apos;re asking up front
            because we&apos;d rather save everyone time: if we&apos;re not a fit,
            one line (&quot;gone&quot; / &quot;no pets&quot; / etc.) lets us move
            on without bothering you twice.
          </p>
        </section>

        <section className="card">
          <h2>What we&apos;re looking for</h2>
          <h3>2BR/2BA · Pool + gym · ESA-friendly · East Honolulu</h3>
          <ul className="checklist">
            <li>
              <b>Neighborhoods:</b> Hawaii Kai, Aina Haina, Kahala, Niu Valley,
              Kuliouou, Portlock, Waialae-Iki.
            </li>
            <li>
              <b>Budget:</b> $1,900–$2,800/mo (we&apos;ll stretch for the right
              place with pool + gym).
            </li>
            <li>
              <b>Must-haves:</b> 2 bedrooms, 2 baths, covered parking, in-unit or
              building laundry, ground floor OR elevator access.
            </li>
            <li>
              <b>Strongly prefer:</b> pool + gym in the building.
            </li>
            <li>
              <b>Nice to have:</b> jacuzzi, ocean or marina view.
            </li>
            <li>
              <b>Lease:</b> 12-month minimum; renew-eager.
            </li>
            <li>
              <b>Move-in:</b> within 30–45 days of signing, flexible to match
              your turnover window.
            </li>
          </ul>
        </section>

        <section className="card">
          <h2>Our family</h2>
          <h3>
            Two people · Two registered emotional support animals · All home most
            of the day.
          </h3>
          <p>
            Both ESAs have current vet records, are fully vaccinated, and are
            home with us most of the day so the unit gets cared for, not
            abandoned. We&apos;re happy to share paperwork and arrange a
            meet-and-greet.
          </p>
          <div className="pets">
            <div className="pet">
              <b>Stella</b>
              13-year-old Pembroke corgi · ~25 lb · double coat · calm, social,
              rarely barks. Sleeps most of the day — she&apos;s a senior.
            </div>
            <div className="pet">
              <b>Mittens</b>
              2-year-old shorthair cat · indoor only · litter-box trained ·
              nearly invisible to guests.
            </div>
          </div>
        </section>

        <section className="card">
          <h2>A small trust-builder</h2>
          <h3>We honor what we sign.</h3>
          <div className="feud">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FEUD_IMG}
              alt="The Schaefer family — Family Feud grand-prize winners, Oct 27–Nov 3, 2016"
            />
            <div className="body">
              <span className="feud-kicker">
                Public record · Oct 27 – Nov 3, 2016
              </span>
              <b>Our family (the Schaefers) won Family Feud in 2016</b> — five
              shows in a row, the grand prize: <b>$67,000+ cash plus a new car</b>.
              Easy to look up. We mention it not to brag but because it&apos;s a
              public, checkable signal of who we are: when we sign something — a
              lease, a handshake — we honor it. We&apos;ll be the same kind of
              tenant.
            </div>
          </div>
        </section>

        <section className="card">
          <h2>What we bring to signing day</h2>
          <h3>Ready before you ask.</h3>
          <ul className="checklist">
            <li>
              <b>Full deposit + first month&apos;s rent</b> — paid at lease
              signing, same day.
            </li>
            <li>
              <b>Employment / income verification</b> — both of us, ready to
              share.
            </li>
            <li>
              <b>Credit + rental history</b> — references from our current
              landlord of 4+ years.
            </li>
            <li>
              <b>ESA documentation</b> — letter and vet records for Stella and
              Mittens.
            </li>
            <li>
              <b>Cosigners on standby</b> — family members happy to cosign if
              that helps.
            </li>
            <li>
              <b>Renter&apos;s insurance</b> — will be bound before move-in.
            </li>
          </ul>
        </section>

        <section className="card">
          <h2>Lifestyle (the real &quot;who you&apos;re renting to&quot;)</h2>
          <h3>Quiet, home most of the time, church-rooted.</h3>
          <p>
            We both work from home, so there are no late nights, no roommates
            cycling through, no parties. Our rhythm is built around our church
            community — weekly Bible studies, Sunday worship and service, and
            midweek ministry through the year. It&apos;s the backbone of how we
            honor our commitments, including the lease.
          </p>
          <p>
            We treat where we live the way we&apos;d treat our own house. We
            don&apos;t smoke. No loud hobbies. Guests are rare and quiet.
          </p>
        </section>

        <section className="card">
          <h2>How to reach us</h2>
          <h3>Phone first is fastest. Email works too.</h3>
          <div className="contact-grid">
            <Link className="contact-card" href="tel:8083930153">
              <div className="label">Call / text Eric</div>
              <div className="val">(808) 393-0153</div>
            </Link>
            <Link
              className="contact-card"
              href="mailto:elionreigns@gmail.com?subject=About%20your%20East%20Honolulu%20rental"
            >
              <div className="label">Email us</div>
              <div className="val">elionreigns@gmail.com</div>
            </Link>
          </div>
          <p style={{ marginTop: 14, fontSize: 13, color: "var(--mute)" }}>
            If you see a listing you think fits, please forward it — we&apos;re
            also happy to be added to any &quot;coming-soon&quot; or off-market
            list you keep. A single text (&quot;have one&quot;) works.
          </p>
        </section>

        <section className="card">
          <h2>Thank you</h2>
          <h3>
            We know landlords get flooded with applications. We wrote this page
            so you wouldn&apos;t have to dig.
          </h3>
          <p>
            If we&apos;re not the right fit, a one-line reply lets us stop and
            move on. If we are — we can tour this week and sign next.
          </p>
          <p style={{ marginTop: 10 }}>
            <strong>Eric &amp; Ashley Schaefer</strong> · elionreigns@gmail.com ·
            (808) 393-0153
          </p>
        </section>

        <footer className="foot">
          <p>
            <b>Eric &amp; Ashley Schaefer</b> · East Honolulu 2BR search · updated
            April 2026
          </p>
          <p>
            This page is our full tenant profile. No forms, no tracking beyond
            the link you clicked. Share the URL with any landlord, owner, or
            agent who asks &quot;tell me about yourselves.&quot;
          </p>
        </footer>
      </div>
      <div className="sticky">
        <Link className="btn btn-primary" href="tel:8083930153">
          📞 Call · (808) 393-0153
        </Link>
        <Link
          className="btn btn-secondary"
          href="mailto:elionreigns@gmail.com?subject=About%20your%20East%20Honolulu%20rental"
        >
          ✉ Email us
        </Link>
      </div>
    </>
  );
}
