import { getTemplate, substitutePlaceholders, type TemplateId } from "@/lib/templates";
import { CORAL_COMPOSER_DEFAULT_BODY, isCoralTaskKillerTemplateId } from "@/lib/coral-task-killer-templates";
import { getSmsTeaser } from "@/lib/sms";
import { sanitizeStandaloneName, sanitizeStandaloneOrg } from "@/lib/standalone-query";

function isTemplateId(id: string): id is TemplateId {
  // Runtime guard: TemplateId is a union; we rely on getTemplate throwing if unknown.
  return typeof id === "string" && id.length > 0;
}

export default function NewsletterTemplatePage({
  params,
  searchParams,
}: {
  params: { templateId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const templateIdRaw = params.templateId || "";
  if (!isTemplateId(templateIdRaw)) {
    return <div style={{ fontFamily: "sans-serif", padding: 24 }}>Not found.</div>;
  }

  // Always require ?access=... for share links so these pages don't become public/indexable.
  const access = typeof searchParams?.access === "string" ? searchParams?.access : "";
  // Standalone link key should be different from the main app password.
  // Set SMOOTHSALES_STANDALONE_KEY in Vercel; default is "CROWN".
  const key = process.env.SMOOTHSALES_STANDALONE_KEY?.trim() || "CROWN";
  if (!access || !key || access !== key) {
    return (
      <div style={{ fontFamily: "sans-serif", padding: 24, maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ margin: "0 0 8px", fontSize: 20 }}>Access required</h1>
        <p style={{ margin: 0, color: "#475569" }}>
          Add <code>?access=YOUR_KEY</code> to view this page.
        </p>
      </div>
    );
  }

  const name = sanitizeStandaloneName(
    typeof searchParams?.name === "string" ? searchParams?.name : undefined,
    "there",
  );
  const org = sanitizeStandaloneOrg(typeof searchParams?.org === "string" ? searchParams?.org : undefined);

  let t: { subject: string; html: string; text: string };
  try {
    t = getTemplate(templateIdRaw);
  } catch {
    return <div style={{ fontFamily: "sans-serif", padding: 24 }}>Not found.</div>;
  }
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://www.coralcrownsolutions.com";
  let baseUrlOrigin = baseUrl;
  try {
    baseUrlOrigin = new URL(baseUrl).origin;
  } catch {
    // If the env var is malformed/missing a scheme, keep the raw value.
  }

  const htmlWithImages = t.html.replace(/\{\{BASE_URL\}\}/g, baseUrlOrigin);
  const bodyParam =
    typeof searchParams?.body === "string" ? decodeURIComponent(searchParams.body.replace(/\+/g, " ")) : "";
  const bodyForTemplate =
    bodyParam.trim() ||
    (isCoralTaskKillerTemplateId(templateIdRaw) ? CORAL_COMPOSER_DEFAULT_BODY : "");
  const substituted = substitutePlaceholders(htmlWithImages, t.text, {
    Name: name,
    "Name of Organization": org,
    ...(bodyForTemplate ? { Body: bodyForTemplate } : {}),
  });

  const teaser = getSmsTeaser(templateIdRaw);
  const greeting =
    name && name.toLowerCase() !== "there" ? `Hi ${name},` : null;

  // Polished standalone page: intro copy only (same words as the SMS hook), then the newsletter. No app links or admin tooling.
  return (
    <div style={{ background: "#0b1220", minHeight: "100vh", padding: "28px 14px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 20,
            padding: "22px 24px",
            marginBottom: 20,
            color: "#f1f5f9",
            fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
          }}
        >
          {greeting ? (
            <p style={{ margin: "0 0 12px", fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff" }}>{greeting}</p>
          ) : null}
          <p
            style={{
              margin: 0,
              fontSize: 17,
              lineHeight: 1.65,
              fontWeight: 400,
              color: "rgba(241,245,249,0.95)",
            }}
          >
            {teaser}
          </p>
        </div>

        <style>{`
          /* Standalone/mobile: readable links, images, and email tables */
          .standalone-newsletter-wrap {
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
          }
          .standalone-newsletter-wrap table {
            max-width: 100% !important;
            width: 100% !important;
          }
          .standalone-newsletter-wrap img {
            max-width: 100% !important;
            height: auto !important;
          }
          .standalone-newsletter-wrap a {
            text-decoration: underline;
            text-decoration-thickness: 1px;
            word-break: break-word;
          }
          .standalone-newsletter-wrap .epk-wrap {
            margin: 0 auto;
          }
          @media only screen and (max-width: 640px) {
            .standalone-newsletter-wrap .epk-pad {
              padding: 20px 16px !important;
            }
            .standalone-newsletter-wrap .epk-stat-cell,
            .standalone-newsletter-wrap .epk-photo-cell {
              display: block !important;
              width: 100% !important;
            }
            .standalone-newsletter-wrap .epk-btn {
              display: block !important;
              width: 100% !important;
              margin: 8px 0 !important;
              text-align: center !important;
              box-sizing: border-box !important;
            }
          }
        `}</style>
        <div
          className="standalone-newsletter-wrap"
          style={{ transform: "translateZ(0)" }}
          dangerouslySetInnerHTML={{ __html: substituted.html }}
        />
      </div>
    </div>
  );
}

