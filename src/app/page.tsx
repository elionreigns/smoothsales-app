"use client";

import { useState, useMemo, useEffect } from "react";
import {
  getTemplatesForSelection,
  hasRequiredSelection,
  getTemplate,
  substitutePlaceholders,
  type TemplateId,
  type HealingHerbalsSub,
} from "@/lib/templates";

type Service = "botox" | "tech" | "prayer" | "tourism" | "elion" | "wedding" | "p48x" | "";
type TourismSub = "hawaii" | "usa" | "";
type PrayerSub = "individual" | "church" | "";
type BotoxSub = "individual" | "corporate" | "";
type TechSub = "individual" | "corporate" | "";
type ElionSub = "fans" | "artists" | "brands" | "producers" | "venue-church" | "venue-show" | "venue-dj" | "";
type WeddingSub = "couples" | "contractors" | "";
type P48XSub = "personal" | "physical-distributors" | "affiliate-sellers" | "";

type Recipient = { email: string; name: string };

export default function SmoothSalesPage() {
  const [service, setService] = useState<Service>("");
  const [tourismSub, setTourismSub] = useState<TourismSub>("");
  const [prayerSub, setPrayerSub] = useState<PrayerSub>("");
  const [botoxSub, setBotoxSub] = useState<BotoxSub>("");
  const [techSub, setTechSub] = useState<TechSub>("");
  const [elionSub, setElionSub] = useState<ElionSub>("");
  const [weddingSub, setWeddingSub] = useState<WeddingSub>("");
  const [p48xSub, setP48xSub] = useState<P48XSub>("");
  const [healingHerbalsSub, setHealingHerbalsSub] = useState<HealingHerbalsSub>("");
  const [emails, setEmails] = useState("");
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [templateId, setTemplateId] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    sent: number;
    total: number;
    failed: number;
    details?: { to: string; ok: boolean; error?: string }[];
  } | null>(null);
  const [error, setError] = useState("");

  const filteredTemplates = useMemo(
    () => getTemplatesForSelection(service, tourismSub, prayerSub, botoxSub, techSub, elionSub, weddingSub, p48xSub, healingHerbalsSub),
    [service, tourismSub, prayerSub, botoxSub, techSub, elionSub, weddingSub, p48xSub, healingHerbalsSub]
  );
  const showPitchAndCampaign = useMemo(
    () => hasRequiredSelection(service, tourismSub, prayerSub, botoxSub, techSub, elionSub, weddingSub, p48xSub, healingHerbalsSub),
    [service, tourismSub, prayerSub, botoxSub, techSub, elionSub, weddingSub, p48xSub, healingHerbalsSub]
  );

  useEffect(() => {
    if (filteredTemplates.length === 0) {
      setTemplateId("");
      return;
    }
    const first = filteredTemplates[0].value;
    setTemplateId((prev) => (filteredTemplates.some((t) => t.value === prev) ? prev : first));
  }, [filteredTemplates]);

  // Sync recipients from pasted emails
  useEffect(() => {
    const list = emails
      .split(/[\n,;]+/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e.includes("@"));
    setRecipients((prev) => {
      const byEmail = new Map(prev.map((r) => [r.email, r]));
      return list.map((email) => ({
        email,
        name: byEmail.get(email)?.name ?? "",
      }));
    });
  }, [emails]);

  const updateRecipientName = (email: string, name: string) => {
    setRecipients((prev) =>
      prev.map((r) => (r.email === email ? { ...r, name } : r))
    );
  };

  const handleSend = async () => {
    setError("");
    setResult(null);
    if (recipients.length === 0) {
      setError("Paste at least one valid email address.");
      return;
    }
    if (!templateId) {
      setError("Select a template above.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/send-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId,
          recipients: recipients.map((r) => ({ email: r.email, name: r.name || undefined })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Send failed");
        return;
      }
      setResult({
        sent: data.sent,
        total: data.total,
        failed: data.failed,
        details: data.details,
      });
    } catch (e) {
      setError("Network error");
    } finally {
      setSending(false);
    }
  };

  const previewName = recipients[0]?.name || "Name";
  const previewHtml = useMemo(() => {
    if (!templateId) return "";
    try {
      const { html } = getTemplate(templateId as TemplateId);
      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
      const withBase = html.replace(/\{\{BASE_URL\}\}/g, baseUrl);
      const { html: personalized } = substitutePlaceholders(withBase, "", {
        Name: previewName,
        "Name of Person": previewName,
        "Name of Organization": previewName,
      });
      return personalized;
    } catch {
      return "";
    }
  }, [templateId, previewName]);

  return (
    <div className="min-h-screen min-w-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-slate-100 overflow-x-hidden">
      <div className="max-w-7xl mx-auto py-5 sm:py-8 lg:py-10 px-3 sm:px-6 flex flex-col lg:flex-row gap-5 sm:gap-8">
        {/* Main column */}
        <div className="flex-1 min-w-0 space-y-5 sm:space-y-8">
          <header className="text-center pb-1 sm:pb-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent drop-shadow-sm" style={{ fontFamily: "var(--font-cormorant)" }}>
              SmoothSales
            </h1>
            <p className="text-slate-400 mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base px-1">Coral Crown Solutions – Botox Oahu, Tech, Prayer Authority, Time for Fun, E Lion Music, Hawaii Wedding Plans, P48X, Healing Herbals</p>
          </header>

          {/* Service selection card – always visible */}
          <section className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-600/80 shadow-2xl shadow-black/20 p-4 sm:p-6 lg:p-7">
            <h2 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3 sm:mb-4">Select service</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Service</label>
                <select
                  value={service}
                  onChange={(e) => {
                    setService(e.target.value as Service);
                    setTourismSub("");
                    setPrayerSub("");
                    setBotoxSub("");
                    setTechSub("");
                    setElionSub("");
                    setWeddingSub("");
                    setP48xSub("");
                    setHealingHerbalsSub("");
                  }}
                  className="w-full sm:max-w-sm bg-slate-700/80 border border-slate-600 rounded-xl px-4 py-3.5 sm:py-3 text-slate-100 text-base focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 min-h-[48px] touch-manipulation"
                >
                  <option value="">Select…</option>
                  <option value="botox">Botox Oahu</option>
                  <option value="tech">Tech (Coral Crown)</option>
                  <option value="prayer">Prayer Authority</option>
                  <option value="tourism">Tourism (Time for Fun)</option>
                  <option value="elion">E Lion Music</option>
                  <option value="wedding">Wedding Planner (Hawaii Wedding Plans)</option>
                  <option value="p48x">P48X (Philippians 4:8 Expounded)</option>
                </select>
              </div>

              {service === "wedding" && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Audience</label>
                  <select
                    value={weddingSub}
                    onChange={(e) => setWeddingSub(e.target.value as WeddingSub)}
                    className="w-full sm:max-w-sm bg-slate-700/80 border border-slate-600 rounded-xl px-4 py-3.5 sm:py-3 text-slate-100 text-base min-h-[48px] touch-manipulation focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="">Select…</option>
                    <option value="couples">Couples (planning a wedding)</option>
                    <option value="contractors">Contractors / vendors (get featured)</option>
                  </select>
                </div>
              )}

              {service === "tourism" && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Region</label>
                  <select
                    value={tourismSub}
                    onChange={(e) => setTourismSub(e.target.value as TourismSub)}
                    className="w-full sm:max-w-sm bg-slate-700/80 border border-slate-600 rounded-xl px-4 py-3.5 sm:py-3 text-slate-100 text-base min-h-[48px] touch-manipulation focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="">Select…</option>
                    <option value="hawaii">Hawaii</option>
                    <option value="usa">USA</option>
                  </select>
                </div>
              )}

              {service === "prayer" && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Audience</label>
                  <select
                    value={prayerSub}
                    onChange={(e) => setPrayerSub(e.target.value as PrayerSub)}
                    className="w-full sm:max-w-sm bg-slate-700/80 border border-slate-600 rounded-xl px-4 py-3.5 sm:py-3 text-slate-100 text-base min-h-[48px] touch-manipulation focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="">Select…</option>
                    <option value="individual">Individual member</option>
                    <option value="church">Church organization</option>
                  </select>
                </div>
              )}

              {service === "botox" && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Audience</label>
                  <select
                    value={botoxSub}
                    onChange={(e) => setBotoxSub(e.target.value as BotoxSub)}
                    className="w-full sm:max-w-sm bg-slate-700/80 border border-slate-600 rounded-xl px-4 py-3.5 sm:py-3 text-slate-100 text-base min-h-[48px] touch-manipulation focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="">Select…</option>
                    <option value="individual">Individual</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>
              )}

              {service === "tech" && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Audience</label>
                  <select
                    value={techSub}
                    onChange={(e) => setTechSub(e.target.value as TechSub)}
                    className="w-full sm:max-w-sm bg-slate-700/80 border border-slate-600 rounded-xl px-4 py-3.5 sm:py-3 text-slate-100 text-base min-h-[48px] touch-manipulation focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="">Select…</option>
                    <option value="individual">Individual</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>
              )}

              {service === "elion" && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Audience</label>
                  <select
                    value={elionSub}
                    onChange={(e) => setElionSub(e.target.value as ElionSub)}
                    className="w-full sm:max-w-sm bg-slate-700/80 border border-slate-600 rounded-xl px-4 py-3.5 sm:py-3 text-slate-100 text-base min-h-[48px] touch-manipulation focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="">Select…</option>
                    <option value="fans">Fans & listeners</option>
                    <option value="artists">Peer artists / collaboration</option>
                    <option value="brands">Sponsored brands</option>
                    <option value="producers">Producers (beats)</option>
                    <option value="venue-church">Venue: Church</option>
                    <option value="venue-show">Venue: Show / festival</option>
                    <option value="venue-dj">Venue: DJ E Lion</option>
                  </select>
                </div>
              )}

              {service === "p48x" && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Audience</label>
                  <select
                    value={p48xSub}
                    onChange={(e) => setP48xSub(e.target.value as P48XSub)}
                    className="w-full sm:max-w-sm bg-slate-700/80 border border-slate-600 rounded-xl px-4 py-3.5 sm:py-3 text-slate-100 text-base min-h-[48px] touch-manipulation focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="">Select…</option>
                    <option value="personal">Personal (readers & listeners)</option>
                    <option value="physical-distributors">Physical distributors (wholesale / retail)</option>
                    <option value="affiliate-sellers">Affiliate sellers (15% on direct sales)</option>
                  </select>
                </div>
              )}
            </div>
          </section>

          {/* Pitch / content + template + preview – only when service + sub selected */}
          {showPitchAndCampaign && (
            <>
              <section className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-600/80 shadow-2xl shadow-black/20 p-4 sm:p-6 lg:p-7">
                <h2 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3 sm:mb-4">
                  Pitch & email template
                </h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Template</label>
                  <select
                    value={templateId}
                    onChange={(e) => setTemplateId(e.target.value)}
                    className="w-full lg:max-w-md bg-slate-700/80 border border-slate-600 rounded-xl px-4 py-3.5 sm:py-3 text-slate-100 text-base min-h-[48px] touch-manipulation focus:ring-2 focus:ring-amber-500/50"
                  >
                    {filteredTemplates.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                {service === "botox" && <BotoxContent />}
                {service === "tech" && <TechContent />}
                {service === "prayer" && <PrayerContent audience={prayerSub} />}
                {service === "tourism" && <TourismContent region={tourismSub} />}
                {service === "elion" && <ElionContent audience={elionSub} />}
                {service === "wedding" && <WeddingContent audience={weddingSub} />}
                {service === "p48x" && <P48XContent audience={p48xSub} />}
                {service === "healing-herbals" && <HealingHerbalsContent audience={healingHerbalsSub} />}
                {/* Email preview */}
                {templateId && (
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-600/80">
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">Email preview (with signature)</p>
                    <div
                      className="bg-white text-slate-800 rounded-2xl p-3 sm:p-5 lg:p-6 max-h-[55vh] sm:max-h-[420px] lg:max-h-[480px] overflow-auto text-left prose prose-slate prose-sm max-w-none shadow-inner ring-1 ring-slate-200/50 [-webkit-overflow-scrolling:touch]"
                      dangerouslySetInnerHTML={{ __html: previewHtml }}
                    />
                  </div>
                )}
              </section>

              {/* Send campaign – only when service selected */}
              <section className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-600/80 shadow-2xl shadow-black/20 p-4 sm:p-6 lg:p-7">
                <h2 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3 sm:mb-4">
                  Send campaign
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mb-3">
                  Paste emails below (one per line or comma/semicolon separated). Recipients appear in the sidebar where you can add names for personalization.
                </p>
                <textarea
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  placeholder="email1@example.com&#10;email2@example.com"
                  rows={5}
                  className="w-full bg-slate-700/80 border border-slate-600 rounded-xl px-4 py-3 text-slate-100 font-mono text-sm placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 min-h-[120px] touch-manipulation"
                />
                <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    onClick={handleSend}
                    disabled={sending || !templateId || recipients.length === 0}
                    className="min-h-[48px] min-w-[140px] bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold px-6 sm:px-7 py-3.5 rounded-xl hover:from-amber-400 hover:to-amber-500 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-amber-900/20 transition transform touch-manipulation"
                  >
                    {sending ? "Sending…" : "Send to all"}
                  </button>
                  {recipients.length > 0 && (
                    <span className="text-slate-400 text-sm">{recipients.length} recipient(s)</span>
                  )}
                </div>
                {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
                {result && (
                  <p className="mt-2 text-slate-300">
                    Sent {result.sent} of {result.total}. Failed: {result.failed}.
                    {result.details?.filter((d) => !d.ok).length ? (
                      <span className="block text-sm text-red-400 mt-1">
                        {result.details.filter((d) => !d.ok).map((d) => `${d.to}: ${d.error}`).join("; ")}
                      </span>
                    ) : null}
                  </p>
                )}
              </section>
            </>
          )}

          {service === "p48x" && !p48xSub && (
            <p className="text-slate-500 text-sm">Select an audience above to continue.</p>
          )}
          {service === "healing-herbals" && !healingHerbalsSub && (
            <p className="text-slate-500 text-sm">Select Smoke Shop or Individual above to continue.</p>
          )}
          {service && !showPitchAndCampaign && (service !== "p48x" || p48xSub !== "") && (service !== "healing-herbals" || healingHerbalsSub !== "") && (
            <p className="text-slate-500 text-sm">Select an option above to continue.</p>
          )}
        </div>

        {/* Right sidebar – recipients with name fields */}
        {showPitchAndCampaign && (
          <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-600/80 shadow-2xl shadow-black/20 p-4 sm:p-5 lg:sticky lg:top-6">
              <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2 sm:mb-3">
                Recipients
              </h3>
              <p className="text-slate-500 text-xs mb-2 sm:mb-3">
                Add a name for personalization (e.g. &quot;Hi [Name],&quot; in the email).
              </p>
              {recipients.length === 0 ? (
                <p className="text-slate-500 text-xs sm:text-sm">Paste emails in the Send campaign area to see them here.</p>
              ) : (
                <ul className="space-y-3 max-h-[50vh] sm:max-h-[60vh] overflow-auto [-webkit-overflow-scrolling:touch]">
                  {recipients.map((r) => (
                    <li key={r.email} className="flex flex-col gap-1">
                      <span className="text-slate-400 font-mono text-xs truncate" title={r.email}>
                        {r.email}
                      </span>
                      <input
                        type="text"
                        value={r.name}
                        onChange={(e) => updateRecipientName(r.email, e.target.value)}
                        placeholder="Name (optional)"
                        className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-3 py-2.5 text-slate-100 text-base sm:text-sm placeholder-slate-500 focus:ring-1 focus:ring-amber-500/50 min-h-[44px] touch-manipulation"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function BotoxContent() {
  return (
    <div className="prose prose-invert prose-sm max-w-none text-slate-300">
      <p><strong className="text-slate-100">Botox Oahu</strong> – Dr. Kathryn Schaefer, MD. Physician-led aesthetics, transparent pricing, same-day availability.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Botox $11.11/unit (90-unit pkg $1000); Daxxify 4–6 months; fillers from $450, Buy 2 Get 1 Free</li>
        <li>Weight loss GLP-1 from $100/week; EM Slim Neo 4 sessions $1000; LipoHIFU; NAD+/B12</li>
        <li>Stem cells from $850; RF microneedling, CO2/Pico laser, tattoo removal; Nitronox available</li>
      </ul>
      <p>850 W Hind Dr, Suite 109, Aina Haina – free parking. <a href="https://www.botoxoahu.com" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">BotoxOahu.com</a> | (808) 261-1121</p>
    </div>
  );
}

function TechContent() {
  return (
    <div className="prose prose-invert prose-sm max-w-none text-slate-300">
      <p><strong className="text-slate-100">Coral Crown Solutions</strong> – Websites, chatbots, e‑commerce.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Websites: $800 build, $20/mo host, domain pointing, $100/mo updates</li>
        <li>Custom chatbots (OpenAI), email & AI agents for booking and shopping carts</li>
        <li>Amazon & Etsy: get products listed, maintain stores</li>
      </ul>
      <p>Pricing depends on scope. Inquire: <a href="https://www.coralcrownsolutions.com" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">CoralCrownSolutions.com</a></p>
    </div>
  );
}

function PrayerContent({ audience }: { audience: PrayerSub }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none text-slate-300">
      <p><strong className="text-slate-100">Prayer Authority</strong> – Christian prayer community & tools. Free to join.</p>
      {audience === "church" ? (
        <p>Pitch for <strong className="text-slate-100">church organizations</strong>: Get your congregation signed up – members get dashboards, prayer tools, community. Ruby (free) and Diamond (premium).</p>
      ) : (
        <p>Pitch for <strong className="text-slate-100">individual members</strong>: Prayer requests, Scripture tools (P48X, Battle Sword, Scriptural Vitamins), dream interpretation, 12-Counselor panel. Sign up with Google.</p>
      )}
      <p><a href="https://www.prayerauthority.com" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">PrayerAuthority.com</a></p>
    </div>
  );
}

function TourismContent({ region }: { region: TourismSub }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none text-slate-300">
      {region === "usa" ? (
        <>
          <p><strong className="text-slate-100">Time for Fun USA (H.I.E. Wholesale Travel)</strong> – Attend a 60–75 min webinar and choose 1 of 4 complimentary vacations: Carnival Cruise, 7 Night Condo, 7 Day Caribbean for Two, Mexico Getaway. Requirements: 25+, US/Canadian, $40k+ income.</p>
          <p><a href="https://www.timeforfunusa.com" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">TimeForFunUSA.com</a></p>
        </>
      ) : (
        <>
          <p><strong className="text-slate-100">Time for Fun Hawaii</strong> – Two ways to save: watch our webinar for wholesale discounts on Oahu, Maui & Big Island (luaus, helicopter, Pearl Harbor, snorkeling, more), or book tours and we’ll call to help. Webinar 60–75 min on Zoom.</p>
          <p><a href="https://www.timeforfunhawaii.com" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">TimeForFunHawaii.com</a> | (808) 393-0153</p>
        </>
      )}
    </div>
  );
}

function ElionContent({ audience }: { audience: ElionSub }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none text-slate-300">
      <p><strong className="text-slate-100">E Lion Music</strong> – Holy Hip-Hop artist, Family Feud grand prize winner (2016), 15+ years, 1,000+ performances, 10M+ YouTube views. P48X author, Prayer Authority founder.</p>
      <p>Stream: <a href="https://open.spotify.com/artist/2S3rAhbq65ECikmOW1k2EA" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">Spotify</a>, <a href="https://music.apple.com/us/artist/e-lion/1111804063" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">Apple Music</a>, <a href="https://www.amazon.com/music/player/artists/B01GOGAW4W/e-lion" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">Amazon Music</a>, <a href="https://www.tiktok.com/@elionreigns" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">TikTok</a>, <a href="https://www.elionmusic.com/rap/" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">Full catalog</a>, <a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">Family Feud</a>, <a href="https://www.elionmusic.com" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">elionmusic.com</a></p>
    </div>
  );
}

function WeddingContent({ audience }: { audience: WeddingSub }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none text-slate-300">
      <p><strong className="text-slate-100">Hawaii Wedding Plans</strong> – Complete wedding planning for Oahu, Maui, Kauai & Big Island. Interactive planner, AI chatbot, island pages, venues, photographers, caterers, themes, and planning articles.</p>
      {audience === "couples" && (
        <>
          <p>For <strong>couples</strong>: Choose your island, build your package. Planning articles: <a href="https://www.hawaiiweddingplans.com/articles/why-hawaii-destination-wedding.php" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">Why Hawaii</a>, <a href="https://www.hawaiiweddingplans.com/articles/how-to-use-wedding-planning-website.php" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">how to use the site</a>, <a href="https://www.hawaiiweddingplans.com/articles/how-to-throw-best-bachelor-party-hawaii.php" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">bachelor party</a>, <a href="https://www.hawaiiweddingplans.com/articles/how-to-throw-best-bachelorette-party-hawaii.php" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">bachelorette party</a>, <a href="https://www.hawaiiweddingplans.com/articles/how-to-pick-best-men-bridesmaids.php" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">picking wedding party</a>, <a href="https://www.hawaiiweddingplans.com/articles/who-not-to-invite-to-wedding.php" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">who not to invite</a>.</p>
          <p><a href="https://www.hawaiiweddingplans.com" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">HawaiiWeddingPlans.com</a> | (808) 994-9034</p>
        </>
      )}
      {audience === "contractors" && (
        <p>For <strong>contractors/vendors</strong>: Submit your service or venue to be featured. <a href="https://hawaiiweddingplans.com/submit/index.php" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">Submit form</a> or email coralcrowntechnologies@gmail.com</p>
      )}
    </div>
  );
}

function P48XContent({ audience }: { audience: P48XSub }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none text-slate-300">
      <p><strong className="text-slate-100">P48X</strong> – Philippians 4:8 Expounded. Book, free app (daily reflections, Google Calendar, journal), and ~15 hrs audiobook in the author&apos;s voice. Buy: <a href="https://www.barnesandnoble.com/w/p48x-eric-schaefer/1147510577?ean=2940181543621" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">Barnes &amp; Noble</a>, <a href="https://books.apple.com/us/book/p48x/id6746675717" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">Apple Books</a>, <a href="https://www.smashwords.com/books/view/1780908" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">Smashwords</a>, <a href="https://www.kobo.com/us/en/ebook/p48x" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">Rakuten Kobo</a>. App: <a href="https://www.prayerauthority.com/prayers/p48x.php" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">Prayer Authority P48X</a>. <a href="https://www.youtube.com/watch?v=tvY4niTN4jA" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">Demo: set up P48X with Google Calendar</a>.</p>
      {audience === "personal" && <p>Personal template: why the book helps, power of right thoughts, app + audiobook, where to buy and sign up, demo video.</p>}
      {audience === "physical-distributors" && <p>Physical distributors: wholesale printed copies, markup for your store; author is E Lion (elionmusic.com), Family Feud grand prize – link to <a href="https://www.elionmusic.com/articles/hawaii-family-wins-grand-prize" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">Family Feud article</a>.</p>}
      {audience === "affiliate-sellers" && <p>Affiliate sellers: we&apos;re looking for people to push the book; 15% off your book purchases when your referral emails us with a receipt.</p>}
    </div>
  );
}

function HealingHerbalsContent({ audience }: { audience: HealingHerbalsSub }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none text-slate-300">
      <p><strong className="text-slate-100">Healing Herbals</strong> – Blue Lotus and Kava Extract. Botanical liquids that fit common vape cartridges (e.g. XROS model line) to replace nicotine.</p>
      {audience === "smoke-shop" && (
        <p>Smoke shop template: <strong>wholesale $27.50</strong> per bottle, <strong>suggested retail $50</strong>. You keep the margin. Reply for wholesale pricing, minimums, and order details.</p>
      )}
      {audience === "individual" && (
        <p>Individual template: <strong>retail $50</strong> per bottle. Reply or call (808) 393-0153 to order.</p>
      )}
      <p><a href="mailto:coralcrowntechnologies@gmail.com" className="text-amber-400 hover:text-amber-300">Email us</a> | (808) 393-0153</p>
    </div>
  );
}
