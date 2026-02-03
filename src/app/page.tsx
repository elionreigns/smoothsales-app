"use client";

import { useState, useMemo, useEffect } from "react";
import { getTemplatesForSelection } from "@/lib/templates";

type Service = "botox" | "tech" | "prayer" | "tourism" | "";
type TourismSub = "hawaii" | "usa" | "";
type PrayerSub = "individual" | "church" | "";

export default function SmoothSalesPage() {
  const [service, setService] = useState<Service>("");
  const [tourismSub, setTourismSub] = useState<TourismSub>("");
  const [prayerSub, setPrayerSub] = useState<PrayerSub>("");
  const [emails, setEmails] = useState("");
  const filteredTemplates = useMemo(
    () => getTemplatesForSelection(service, tourismSub, prayerSub),
    [service, tourismSub, prayerSub]
  );
  const [templateId, setTemplateId] = useState<string>("");

  // When service/sub changes, set template to the only (or first) matching option
  useEffect(() => {
    if (filteredTemplates.length === 0) {
      setTemplateId("");
      return;
    }
    const first = filteredTemplates[0].value;
    setTemplateId((prev) => (filteredTemplates.some((t) => t.value === prev) ? prev : first));
  }, [filteredTemplates]);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent: number; total: number; failed: number; details?: { to: string; ok: boolean; error?: string }[] } | null>(null);
  const [error, setError] = useState("");

  const handleSend = async () => {
    setError("");
    setResult(null);
    const list = emails.split(/[\n,;]+/).map((e) => e.trim()).filter((e) => e.includes("@"));
    if (list.length === 0) {
      setError("Enter at least one valid email address.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/send-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails: list, templateId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Send failed");
        return;
      }
      setResult({ sent: data.sent, total: data.total, failed: data.failed, details: data.details });
    } catch (e) {
      setError("Network error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">SmoothSales</h1>
        <p className="text-slate-600 mb-6">Coral Crown Solutions – service outreach & email campaigns</p>

        {/* Main dropdown */}
        <section className="bg-white rounded-xl shadow p-6 mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Service</label>
          <select
            value={service}
            onChange={(e) => {
              setService(e.target.value as Service);
              setTourismSub("");
              setPrayerSub("");
            }}
            className="w-full max-w-xs border border-slate-300 rounded-lg px-4 py-2"
          >
            <option value="">Select…</option>
            <option value="botox">Botox Oahu</option>
            <option value="tech">Tech (Coral Crown)</option>
            <option value="prayer">Prayer Authority</option>
            <option value="tourism">Tourism (Time for Fun)</option>
          </select>

          {service === "tourism" && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Region</label>
              <select
                value={tourismSub}
                onChange={(e) => setTourismSub(e.target.value as TourismSub)}
                className="w-full max-w-xs border border-slate-300 rounded-lg px-4 py-2"
              >
                <option value="">Select…</option>
                <option value="hawaii">Hawaii</option>
                <option value="usa">USA</option>
              </select>
            </div>
          )}

          {service === "prayer" && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Audience</label>
              <select
                value={prayerSub}
                onChange={(e) => setPrayerSub(e.target.value as PrayerSub)}
                className="w-full max-w-xs border border-slate-300 rounded-lg px-4 py-2"
              >
                <option value="">Select…</option>
                <option value="individual">Individual member</option>
                <option value="church">Church organization</option>
              </select>
            </div>
          )}
        </section>

        {/* Content preview */}
        {service && (
          <section className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Pitch / content</h2>
            {service === "botox" && <BotoxContent />}
            {service === "tech" && <TechContent />}
            {service === "prayer" && <PrayerContent audience={prayerSub} />}
            {service === "tourism" && <TourismContent region={tourismSub} />}
          </section>
        )}

        {/* Email campaign */}
        <section className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Send campaign</h2>
          <p className="text-slate-600 text-sm mb-2">Paste one email per line (or comma/semicolon separated). Choose template and send.</p>
          <textarea
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            placeholder="email1@example.com&#10;email2@example.com"
            rows={6}
            className="w-full border border-slate-300 rounded-lg px-4 py-2 font-mono text-sm"
          />
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="border border-slate-300 rounded-lg px-4 py-2"
              disabled={filteredTemplates.length === 0}
            >
              {filteredTemplates.length === 0 ? (
                <option value="">— Select service and option above —</option>
              ) : (
                filteredTemplates.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))
              )}
            </select>
            <button
              onClick={handleSend}
              disabled={sending || !templateId}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send to all"}
            </button>
          </div>
          {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
          {result && (
            <p className="mt-2 text-slate-700">
              Sent {result.sent} of {result.total}. Failed: {result.failed}.
              {result.details?.filter((d) => !d.ok).length ? (
                <span className="block text-sm text-red-600 mt-1">
                  {result.details.filter((d) => !d.ok).map((d) => `${d.to}: ${d.error}`).join("; ")}
                </span>
              ) : null}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

function BotoxContent() {
  return (
    <div className="prose prose-slate max-w-none text-sm">
      <p><strong>Botox Oahu</strong> – Dr. Kathryn Schaefer, MD. Physician-led aesthetics, weight loss, regenerative medicine.</p>
      <ul>
        <li>Botox from $11.11/unit (90-unit pkg $1000); Daxxify; fillers from $450, Buy 2 get 1 free</li>
        <li>Weight loss shots $100/week; EM Slim, LipoHIFU; wellness (B12, NAD+, Glutathione)</li>
        <li>Pico laser, RF microneedling, stem cell from $850; gift certs 10% extra</li>
      </ul>
      <p>Aina Haina – free parking. <a href="https://www.botoxoahu.com" target="_blank" rel="noreferrer">BotoxOahu.com</a> | (808) 261-1121</p>
    </div>
  );
}

function TechContent() {
  return (
    <div className="prose prose-slate max-w-none text-sm">
      <p><strong>Coral Crown Solutions</strong> – Websites, chatbots, e‑commerce.</p>
      <ul>
        <li>Websites: $800 build, $20/mo host, domain pointing, $100/mo updates</li>
        <li>Custom chatbots (OpenAI), email & AI agents for booking and shopping carts</li>
        <li>Amazon & Etsy: get products listed, maintain stores</li>
      </ul>
      <p>Pricing depends on scope, length, and regularity. Inquire: <a href="https://www.coralcrownsolutions.com" target="_blank" rel="noreferrer">CoralCrownSolutions.com</a> | sales@coralcrownsolutions.com</p>
    </div>
  );
}

function PrayerContent({ audience }: { audience: PrayerSub }) {
  return (
    <div className="prose prose-slate max-w-none text-sm">
      <p><strong>Prayer Authority</strong> – Christian prayer community & tools. Free to join.</p>
      {audience === "church" ? (
        <p>Pitch for <strong>church organizations</strong>: Get your congregation signed up – members get dashboards, prayer tools, community. Ruby (free) and Diamond (premium).</p>
      ) : (
        <p>Pitch for <strong>individual members</strong>: Prayer requests, Scripture tools (P48X, Battle Sword, Scriptural Vitamins), dream interpretation, 12-Counselor panel. Sign up with Google.</p>
      )}
      <p><a href="https://www.prayerauthority.com" target="_blank" rel="noreferrer">PrayerAuthority.com</a></p>
    </div>
  );
}

function TourismContent({ region }: { region: TourismSub }) {
  return (
    <div className="prose prose-slate max-w-none text-sm">
      {region === "usa" ? (
        <>
          <p><strong>Time for Fun USA</strong> – Tour deals across the USA. Webinar for discounts or book directly.</p>
          <p><a href="https://www.timeforfunusa.com" target="_blank" rel="noreferrer">TimeForFunUSA.com</a></p>
        </>
      ) : (
        <>
          <p><strong>Time for Fun Hawaii</strong> – Oahu, Maui, Big Island. Two ways: (1) Watch webinar for wholesale rates on luaus, helicopter, Pearl Harbor, snorkeling, Road to Hana, volcano. (2) Book with us – we call and help plan.</p>
          <p><a href="https://www.timeforfunhawaii.com" target="_blank" rel="noreferrer">TimeForFunHawaii.com</a> | (808) 393-0153</p>
        </>
      )}
    </div>
  );
}
