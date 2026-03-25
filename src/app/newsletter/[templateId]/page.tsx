import { getTemplate, substitutePlaceholders, type TemplateId } from "@/lib/templates";
import { isAuthRequired } from "@/lib/auth";

function isAllowedTemplateId(id: string): id is TemplateId {
  // Keep this tight for share links.
  return id === "elion-leaders" || id === "elion-laymen";
}

export default function NewsletterTemplatePage({
  params,
  searchParams,
}: {
  params: { templateId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const templateIdRaw = params.templateId || "";
  if (!isAllowedTemplateId(templateIdRaw)) {
    return <div style={{ fontFamily: "sans-serif", padding: 24 }}>Not found.</div>;
  }

  // Optional lightweight protection: require ?access=... if auth is required.
  // This lets you text/share the page but still keeps it non-public by default.
  if (isAuthRequired()) {
    const access = typeof searchParams?.access === "string" ? searchParams?.access : "";
    const key = process.env.SMOOTHSALES_BYPASS_KEY || process.env.SMOOTHSALES_PASSWORD || "";
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
  }

  const name = typeof searchParams?.name === "string" ? searchParams?.name : "there";
  const org = typeof searchParams?.org === "string" ? searchParams?.org : "";

  const t = getTemplate(templateIdRaw);
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const htmlWithImages = t.html.replace(/\{\{BASE_URL\}\}/g, baseUrl);
  const substituted = substitutePlaceholders(htmlWithImages, t.text, {
    Name: name,
    "Name of Organization": org,
  });

  // Render as a standalone HTML "landing page" for SMS sharing.
  return (
    <div style={{ background: "#0b1220", minHeight: "100vh", padding: "28px 14px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
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
              <div style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>Shareable newsletter page</div>
              <div style={{ fontSize: 13, color: "#94a3b8" }}>
                Template: <code style={{ color: "#e2e8f0" }}>{templateIdRaw}</code>
              </div>
            </div>
            <a
              href="/"
              style={{
                color: "#0b1220",
                background: "#f59e0b",
                textDecoration: "none",
                padding: "10px 14px",
                borderRadius: 999,
                fontWeight: 800,
              }}
            >
              Back to SmoothSales
            </a>
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: substituted.html }} />
      </div>
    </div>
  );
}

