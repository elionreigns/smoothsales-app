import { getTemplate, substitutePlaceholders, type TemplateId } from "@/lib/templates";

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

  const name = typeof searchParams?.name === "string" ? searchParams?.name : "there";
  const org = typeof searchParams?.org === "string" ? searchParams?.org : "";

  let t: { subject: string; html: string; text: string };
  try {
    t = getTemplate(templateIdRaw);
  } catch {
    return <div style={{ fontFamily: "sans-serif", padding: 24 }}>Not found.</div>;
  }
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  let baseUrlOrigin = baseUrl;
  try {
    baseUrlOrigin = new URL(baseUrl).origin;
  } catch {
    // If the env var is malformed/missing a scheme, keep the raw value.
  }

  const htmlWithImages = t.html.replace(/\{\{BASE_URL\}\}/g, baseUrlOrigin);
  const substituted = substitutePlaceholders(htmlWithImages, t.text, {
    Name: name,
    "Name of Organization": org,
  });

  // Render as a standalone HTML "landing page" for SMS sharing.
  return (
    <div style={{ background: "#0b1220", minHeight: "100vh", padding: "28px 14px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 18,
            padding: 14,
            marginBottom: 14,
            color: "#e2e8f0",
            fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
          }}
        >
          <div style={{ display: "flex", gap: 10, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontWeight: 900, letterSpacing: "-0.02em", fontSize: 14, textTransform: "uppercase", opacity: 0.9 }}>
                Shareable page
              </div>
              <div style={{ fontSize: 13, color: "#94a3b8" }}>
                <span style={{ color: "#e2e8f0", fontWeight: 700 }}>{t.subject}</span>
                <span style={{ opacity: 0.7 }}> · </span>
                <code style={{ color: "#e2e8f0" }}>{templateIdRaw}</code>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href="/"
                style={{
                  color: "#0b1220",
                  background: "#f59e0b",
                  textDecoration: "none",
                  padding: "10px 14px",
                  borderRadius: 999,
                  fontWeight: 900,
                }}
              >
                Open SmoothSales
              </a>
            </div>
          </div>
        </div>

        <style>{`
          /* Make standalone/mobile link rendering feel more like a readable web page. */
          a { text-decoration: underline; text-decoration-thickness: 1px; }
          img { max-width: 100%; height: auto; }
        `}</style>
        <div style={{ transform: "translateZ(0)" }} dangerouslySetInnerHTML={{ __html: substituted.html }} />
      </div>
    </div>
  );
}

