import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E Lion | Artist Partnership Pitch",
  description:
    "500K+ streams, a weekly live band in Honolulu, and a clear ask for gear to record vocals better. Press kit, music, and contact for E Lion (Eric Schaefer).",
  openGraph: {
    title: "E Lion | Artist Partnership Pitch",
    description:
      "500K+ streams, a weekly live band including Magic Island Friday fireworks sets, and a partnership ask for vocal-recording gear.",
    images: [{ url: "/pitch/believe.jpg", width: 1200, height: 1200, alt: "Believe — E Lion" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E Lion | Artist Partnership Pitch",
    images: ["/pitch/believe.jpg"],
  },
};

const PRESS_KIT = "https://elionmusic.com/presskit/";
const MUSIC = "https://elionmusic.com/#cd-world";
const EMAIL = "elionreigns@gmail.com";
const PHONE_DISPLAY = "808-393-0153";
const PHONE_TEL = "+18083930153";

const proof = [
  {
    label: "500K+",
    detail: "streams across releases",
  },
  {
    label: "Weekly",
    detail: "live-band sets for a crowd, including Fridays at Magic Island during the fireworks",
  },
  {
    label: "DJ + studio",
    detail: "DJing for groups, and new music — some made with Suno — released on my Pandora station",
  },
];

const returns = [
  "Studio and live content featuring your gear, with tags",
  "An honest review or demo video",
  "Stage mentions at my weekly shows",
];

export default function ElionQuicktouchPitchPage() {
  return (
    <main className="pitch">
      <div className="wrap">
        <header className="hero">
          <img
            className="logo"
            src="/pitch/elion-logo.webp"
            alt="E Lion Music"
            width={640}
            height={660}
          />
          <p className="kicker">Artist partnership · Honolulu</p>
          <h1>
            500K+ streams, a live band every week, and vocals still recorded on onboard audio.
          </h1>
          <p className="lede">
            I&apos;m E Lion (Eric Schaefer), an independent artist in Honolulu. That gap is why
            I&apos;m looking for equipment to record my voice better.
          </p>
          <div className="cta-row">
            <a className="btn btn-gold" href={PRESS_KIT}>
              Press kit
            </a>
            <a className="btn btn-ghost" href={MUSIC}>
              Listen to the music
            </a>
          </div>
        </header>

        <figure className="cover">
          <img
            src="/pitch/believe.webp"
            alt="Believe — E Lion"
            width={1200}
            height={1200}
          />
        </figure>

        <section className="card" aria-labelledby="proof-heading">
          <h2 id="proof-heading">What I&apos;m already doing</h2>
          <ul className="proof">
            {proof.map((item) => (
              <li key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card" aria-labelledby="ask-heading">
          <h2 id="ask-heading">The ask</h2>
          <p>
            Would you help me record my vocals the way the rest of the work already sounds? I&apos;m
            looking for artist-relations support — a microphone, interface, or related vocal-chain
            gear. A loan, artist pricing, or a simple &ldquo;not right now&rdquo; would all help.
            One reply is all it takes.
          </p>
        </section>

        <section className="card" aria-labelledby="return-heading">
          <h2 id="return-heading">What you get in return</h2>
          <ul className="returns">
            {returns.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="card contact" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Let&apos;s talk</h2>
          <p className="name">E Lion (Eric Schaefer)</p>
          <p>
            <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            <span className="dot" aria-hidden="true">
              ·
            </span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <p className="links">
            <a href={PRESS_KIT}>elionmusic.com/presskit</a>
            <span className="dot" aria-hidden="true">
              ·
            </span>
            <a href={MUSIC}>elionmusic.com/#cd-world</a>
          </p>
          <img
            className="sign"
            src="/pitch/elion-autograph.png"
            alt="E Lion"
            width={700}
            height={184}
          />
        </section>
      </div>

      <style>{`
        .pitch {
          min-height: 100vh;
          background:
            radial-gradient(1200px 600px at 50% -10%, rgba(201, 154, 58, 0.16), transparent 55%),
            radial-gradient(800px 500px at 100% 20%, rgba(88, 40, 140, 0.18), transparent 50%),
            #070910;
          color: #f4ecde;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          padding: 28px 16px 64px;
        }
        .wrap {
          width: min(720px, 100%);
          margin: 0 auto;
        }
        .hero {
          text-align: center;
          margin-bottom: 28px;
        }
        .logo {
          width: min(168px, 46vw);
          height: auto;
          margin: 8px auto 18px;
          display: block;
          filter: drop-shadow(0 10px 28px rgba(0, 0, 0, 0.45));
        }
        .kicker {
          margin: 0 0 12px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #e3c37a;
        }
        h1, h2 {
          font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif;
          letter-spacing: -0.02em;
          color: #fff8ea;
        }
        h1 {
          margin: 0 auto 16px;
          font-size: clamp(1.7rem, 6.4vw, 2.55rem);
          line-height: 1.15;
          font-weight: 600;
          max-width: 22ch;
        }
        .lede {
          margin: 0 auto 22px;
          max-width: 38rem;
          font-size: 1.05rem;
          line-height: 1.65;
          color: rgba(244, 236, 222, 0.88);
        }
        .cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        .btn {
          display: inline-block;
          padding: 12px 18px;
          border-radius: 999px;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          line-height: 1.2;
        }
        .btn-gold {
          background: linear-gradient(180deg, #f0d48a, #c8962e);
          color: #1a1204;
        }
        .btn-ghost {
          background: transparent;
          color: #f4ecde;
          border: 1px solid rgba(227, 195, 122, 0.45);
        }
        .cover {
          margin: 8px 0 24px;
        }
        .cover img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 18px;
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(227, 195, 122, 0.22);
        }
        .card {
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          padding: 22px 20px;
          margin-bottom: 14px;
        }
        h2 {
          margin: 0 0 12px;
          font-size: 1.55rem;
          font-weight: 600;
        }
        .card p, .proof span, .returns li {
          margin: 0;
          font-size: 1.02rem;
          line-height: 1.65;
          color: rgba(244, 236, 222, 0.9);
        }
        .proof, .returns {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 14px;
        }
        .proof li {
          display: grid;
          gap: 2px;
        }
        .proof strong {
          color: #e3c37a;
          font-size: 1.05rem;
        }
        .returns li {
          padding-left: 1.1em;
          position: relative;
        }
        .returns li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.62em;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e3c37a;
        }
        .contact {
          text-align: center;
        }
        .name {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 1.45rem;
          font-weight: 600;
          color: #fff8ea;
          margin: 0 0 8px !important;
        }
        .contact a {
          color: #f0d48a;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .dot {
          margin: 0 0.45em;
          color: rgba(244, 236, 222, 0.45);
        }
        .links {
          margin-top: 10px !important;
          font-size: 0.95rem !important;
        }
        .sign {
          width: min(260px, 70%);
          height: auto;
          margin: 18px auto 0;
          display: block;
          filter: brightness(0) invert(1) sepia(1) saturate(3.2) hue-rotate(8deg) opacity(0.92);
        }
        @media (min-width: 720px) {
          .pitch { padding: 44px 24px 80px; }
          .card { padding: 26px 28px; }
        }
      `}</style>
    </main>
  );
}
