/* global React, Frame, SectionLabel, Arrow, BracketIcon */

// ─────────────────────────────────────────────────────────
// TOOL STACK PAGE
// ─────────────────────────────────────────────────────────

// Real tools in the LeadWise stack, with logo assets and category tags.
// Categories control the filter chips + grid grouping.
const STACK_TOOLS = [
// SIGNALS — triggers + discovery
{ logo: "linkedin", name: "LinkedIn Sales Nav", cat: "Signals", role: "Role changes, company deltas, intent", tier: "Licensed" },
{ logo: "ocean", name: "Ocean.io", cat: "Signals", role: "Lookalike discovery across 250M companies", tier: "Licensed" },
{ logo: "apify", name: "Apify", cat: "Signals", role: "Headless scrapers for web triggers", tier: "Licensed" },
{ logo: "trigify", name: "Trigify", cat: "Signals", role: "LinkedIn engagement triggers, post-level intent", tier: "Licensed" },
{ logo: "unify", name: "Unify", cat: "Signals", role: "Anonymous visitor + intent identification", tier: "Licensed" },
{ logo: "rb2b", name: "RB2B", cat: "Signals", role: "Person-level website visitor identification", tier: "Licensed" },
{ logo: "zoominfo", name: "ZoomInfo", cat: "Signals", role: "Enterprise contact + intent dataset", tier: "Licensed" },

// ENRICHMENT — data + orchestration
{ logo: "clay", name: "Clay", cat: "Enrichment", role: "Enrichment orchestration, waterfall logic", tier: "Licensed" },
{ logo: "claygent", name: "Claygent", cat: "Enrichment", role: "Per-row AI reasoning agent inside Clay", tier: "Licensed" },
{ logo: "apollo", name: "Apollo", cat: "Enrichment", role: "Contact graph, firmographic layer", tier: "Licensed" },
{ logo: "prospeo", name: "Prospeo", cat: "Enrichment", role: "Email finder + waterfall provider", tier: "Licensed" },
{ logo: "icypeas", name: "Icypeas", cat: "Enrichment", role: "High-accuracy verification layer", tier: "Licensed" },
{ logo: "findymail", name: "Findymail", cat: "Enrichment", role: "B2B email discovery, GDPR-clean", tier: "Licensed" },
{ logo: "fullenrich", name: "FullEnrich", cat: "Enrichment", role: "Mobile + email waterfall", tier: "Licensed" },
{ logo: "zerobounce", name: "ZeroBounce", cat: "Enrichment", role: "Email verification + deliverability scoring", tier: "Licensed" },
{ logo: "millionverifier", name: "MillionVerifier", cat: "Enrichment", role: "Bulk email verification layer", tier: "Licensed" },

// INTELLIGENCE — reasoning, drafting
{ logo: "claude", name: "Claude", cat: "Intelligence", role: "Context reasoning, per-lead drafting", tier: "Licensed" },
{ logo: "openai", name: "OpenAI · GPT-4", cat: "Intelligence", role: "Classification + structured extraction", tier: "Licensed" },
{ logo: "perplexity", name: "Perplexity", cat: "Intelligence", role: "Live research with source attribution", tier: "Licensed" },
{ logo: "claudecode", name: "Claude Code", cat: "Intelligence", role: "Agentic coding for custom data pipelines", tier: "Licensed" },

// SENDING — outbound infrastructure
{ logo: "instantly", name: "Instantly", cat: "Sending", role: "Sending rotation + inbox warm-up", tier: "Licensed" },
{ logo: "lemlist", name: "Lemlist", cat: "Sending", role: "Multi-channel cadence engine", tier: "Licensed" },
{ logo: "magiclead", name: "MagicLead", cat: "Sending", role: "LinkedIn automation layer", tier: "Licensed" },
{ logo: "heyreach", name: "Heyreach.io", cat: "Sending", role: "LinkedIn outreach at agency scale", tier: "Licensed" },
{ logo: "warmly", name: "Warmly", cat: "Sending", role: "Inbox warm-up + sender reputation", tier: "Licensed" },
{ logo: "cloudflare", name: "Cloudflare", cat: "Sending", role: "DNS · SPF · DKIM · DMARC config", tier: "Licensed" },

// ORCHESTRATION — workflow glue
{ logo: "make", name: "Make", cat: "Orchestration", role: "Workflow glue across systems", tier: "Licensed" },
{ logo: "n8n", name: "n8n", cat: "Orchestration", role: "Self-hosted automation, EU-compliant", tier: "Licensed" },

// CRM — handoff destinations
{ logo: "hubspot", name: "HubSpot", cat: "CRM", role: "Sync booked meetings + lead records", tier: "Licensed" },
{ logo: "attio", name: "Attio", cat: "CRM", role: "Modern CRM workspace sync", tier: "Licensed" },
{ logo: "salesforce", name: "Salesforce", cat: "CRM", role: "Enterprise CRM handoff", tier: "Licensed" },

// INFRASTRUCTURE — runs the system
{ logo: "supabase", name: "Supabase", cat: "Infrastructure", role: "Postgres data store + auth", tier: "Licensed" },
{ logo: "vercel", name: "Vercel", cat: "Infrastructure", role: "Edge deployment + serverless functions", tier: "Licensed" },
{ logo: "cursor", name: "Cursor", cat: "Infrastructure", role: "AI-native development environment", tier: "Licensed" },

// WORKSPACE — CRM + record-keeping
{ logo: "notion", name: "Notion", cat: "Workspace", role: "Client playbooks + trigger libraries", tier: "Licensed" }];


const CATEGORIES = ["All", "Signals", "Enrichment", "Intelligence", "Sending", "Orchestration", "CRM", "Infrastructure", "Workspace"];

// In-house software — represented without a logo, as a distinct "Built" strand.
const BUILT_MODULES = [
{ code: "LW/Harvester", name: "Signal harvester", note: "Proprietary crawlers listening to 40+ sources. Timestamped + deduplicated." },
{ code: "LW/Axiom", name: "ICP scoring model", note: "Your ICP axioms, weighted. Every signal scored for P(fit) before a send." },
{ code: "LW/Scribe", name: "Per-lead drafting", note: "Retrieval-augmented drafts grounded in the trigger + prospect's context." },
{ code: "LW/Ledger", name: "Attribution engine", note: "Back-traces every booked meeting to the signal that triggered it." }];


// Logos that are transparent marks (need a white plate behind them with padding so they
// don't render flush to the tile edge). Everything else is treated as a full-bleed app icon
// that already provides its own coloured background.
const TRANSPARENT_MARKS = new Set([
"claude", "openai", "perplexity", "clay", "notion",
"claudecode", "heyreach", "zerobounce",
"cloudflare", "vercel", "salesforce", "attio"]
);

// Per-logo objectPosition nudges — for source PNGs whose mark isn't dead-centered.
const LOGO_POSITION = {};

// Small logo tile — full-bleed for branded app icons, white-plated with padding for transparent marks.
function LogoTile({ slug, size = 56 }) {
  const isMark = TRANSPARENT_MARKS.has(slug);
  return (
    <span style={{
      width: size, height: size, borderRadius: 12,
      background: isMark ? "#fff" : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", flexShrink: 0,
      boxShadow: isMark ? "0 0 0 1px rgba(255,255,255,0.06)" : "none"
    }}>
      <img src={`assets/logos/${slug}.png`} alt=""
      style={{
        width: isMark ? "70%" : "100%",
        height: isMark ? "70%" : "100%",
        objectFit: isMark ? "contain" : "cover",
        objectPosition: LOGO_POSITION[slug] || "center",
        display: "block",
        borderRadius: isMark ? 0 : 12
      }} />
    </span>);

}

// Hero tile — bigger, tilted. Same per-logo treatment as LogoTile.
function HeroLogoTile({ slug, size, angle, shadow }) {
  const isMark = TRANSPARENT_MARKS.has(slug);
  return (
    <div style={{
      width: size, height: size,
      borderRadius: size * 0.22,
      background: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      transform: `rotate(${angle}deg)`,
      boxShadow: shadow || "0 24px 48px -18px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.08)"
    }}>
      <img src={`assets/logos/${slug}.png`} alt=""
      style={{
        width: isMark ? "70%" : "100%",
        height: isMark ? "70%" : "100%",
        objectFit: isMark ? "contain" : "cover",
        display: "block"
      }} />
    </div>);

}

function StackPage({ onNav }) {
  const [filter, setFilter] = React.useState("All");
  const [query, setQuery] = React.useState("");

  const filtered = STACK_TOOLS.filter((t) =>
  (filter === "All" || t.cat === filter) && (
  query === "" || (t.name + " " + t.role + " " + t.cat).toLowerCase().includes(query.toLowerCase()))
  );

  const countByCat = CATEGORIES.reduce((acc, c) => {
    acc[c] = c === "All" ? STACK_TOOLS.length : STACK_TOOLS.filter((t) => t.cat === c).length;
    return acc;
  }, {});

  // Hero composition: hand-placed tile positions for the "logo pile".
  // Each entry = { slug, top, left, size, angle }.  Coordinates are relative to
  // a 760×380 stage so the tiles overlap believably.
  const heroTiles = [
  { slug: "clay", x: 110, y: 40, size: 96, angle: -8 },
  { slug: "apollo", x: 220, y: 20, size: 108, angle: 4 },
  { slug: "linkedin", x: 345, y: 50, size: 92, angle: -3 },
  { slug: "notion", x: 455, y: 30, size: 100, angle: 6 },
  { slug: "claude", x: 570, y: 55, size: 104, angle: -5 },
  { slug: "openai", x: 160, y: 160, size: 100, angle: 3 },
  { slug: "perplexity", x: 285, y: 170, size: 96, angle: -6 },
  { slug: "apify", x: 400, y: 165, size: 92, angle: 5 },
  { slug: "instantly", x: 510, y: 175, size: 96, angle: -4 },
  { slug: "lemlist", x: 620, y: 160, size: 92, angle: 8 },
  { slug: "ocean", x: 225, y: 280, size: 84, angle: -4 },
  { slug: "make", x: 330, y: 288, size: 88, angle: 3 },
  { slug: "n8n", x: 435, y: 282, size: 84, angle: -7 },
  { slug: "fullenrich", x: 538, y: 290, size: 84, angle: 5 }];


  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{ paddingTop: 72, paddingBottom: 64, overflow: "hidden" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
            <span className="label-accent">[ PAGE 02 / TECH STACK ]</span>
            <span className="hint">{STACK_TOOLS.length} LICENSED · </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <h1 style={{ fontSize: "clamp(52px, 7vw, 120px)", marginBottom: 28 }}>
                Take a look<br />at our<br />tech stack.
              </h1>
              <p className="lead" style={{ marginBottom: 28, maxWidth: "42ch" }}>As tech fanatics, we continuously learn, test, and implement new tools to drive performance and growth



              </p>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", borderTop: "1px solid var(--line)", paddingTop: 22 }}>
                <div>
                  <div className="mono" style={{ color: "var(--accent)", fontSize: 32, fontWeight: 300, lineHeight: 1 }}>{"\n"}</div>
                  <div className="hint" style={{ marginTop: 6 }}></div>
                </div>
                <div>
                  <div className="mono" style={{ color: "var(--fg)", fontSize: 32, fontWeight: 300, lineHeight: 1 }}>{BUILT_MODULES.length}</div>
                  <div className="hint" style={{ marginTop: 6 }}></div>
                </div>
                <div>
                  <div className="mono" style={{ color: "var(--fg-dim)", fontSize: 32, fontWeight: 300, lineHeight: 1 }}>{CATEGORIES.length - 1}</div>
                  <div className="hint" style={{ marginTop: 6 }}></div>
                </div>
              </div>
            </div>

            {/* Schematic stack diagram — brand-aligned */}
            <div style={{
              position: "relative",
              height: 400,
              border: "1px solid var(--line)",
              background: "var(--bg-2)",
              padding: "24px 28px",
              display: "flex", flexDirection: "column",
              overflow: "hidden"
            }}>
              {/* Top chrome */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                paddingBottom: 14, borderBottom: "1px solid var(--line)", marginBottom: 18
              }}>
                <span className="mono" style={{ fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.18em" }}>
                  LW/STACK · v24.11
                </span>
                <span className="mono" style={{ fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.18em" }}>
                  ◆ {STACK_TOOLS.length} COMPONENTS
                </span>
              </div>

              {/* Layer rows — each row = a category with node count + bar */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
                {CATEGORIES.filter((c) => c !== "All").map((cat, i) => {
                  const count = STACK_TOOLS.filter((t) => t.cat === cat).length;
                  const maxCount = Math.max(...CATEGORIES.filter((c) => c !== "All").map((c) => STACK_TOOLS.filter((t) => t.cat === c).length));
                  const widthPct = count / maxCount * 100;
                  return (
                    <div key={cat} style={{
                      display: "grid",
                      gridTemplateColumns: "20px 1fr 28px",
                      alignItems: "center", gap: 12
                    }}>
                      {/* index */}
                      <span className="mono" style={{ fontSize: 9, color: "var(--fg-faint)", letterSpacing: "0.1em" }}>
                        L{String(i + 1).padStart(2, "0")}
                      </span>

                      {/* row */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                          <span className="mono" style={{
                            fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase",
                            color: "var(--fg-dim)"
                          }}>
                            {cat}
                          </span>
                          <span className="hint" style={{ fontSize: 9 }}>
                            {STACK_TOOLS.filter((t) => t.cat === cat).map((t) => t.name.split(/[\s·]/)[0]).slice(0, 3).join(" · ")}
                            {count > 3 ? ` · +${count - 3}` : ""}
                          </span>
                        </div>
                        {/* bar with node ticks */}
                        <div style={{ position: "relative", height: 2, background: "var(--line)" }}>
                          <div style={{
                            position: "absolute", inset: 0, width: `${widthPct}%`,
                            background: "var(--accent)",
                            opacity: 0.85
                          }} />
                          {/* tick nodes for each tool */}
                          {Array.from({ length: count }).map((_, j) =>
                          <span key={j} style={{
                            position: "absolute",
                            left: `${(j + 0.5) / count * widthPct}%`,
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 6, height: 6,
                            borderRadius: "50%",
                            background: "var(--bg-2)",
                            border: "1px solid var(--accent)"
                          }} />
                          )}
                        </div>
                      </div>

                      {/* count */}
                      <span className="mono" style={{
                        fontSize: 13, color: "var(--fg)", textAlign: "right",
                        fontWeight: 300
                      }}>
                        {String(count).padStart(2, "0")}
                      </span>
                    </div>);

                })}
              </div>

              {/* Bottom chrome */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                paddingTop: 14, borderTop: "1px solid var(--line)", marginTop: 14
              }}>
                <span className="hint" style={{ fontSize: 9 }}>↳ ARCHITECTURE / STACK MAP</span>
                <span className="hint" style={{ fontSize: 9 }}>{CATEGORIES.length - 1} LAYERS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ROADMAP ────────────────────────────── */}
      {typeof TechStackRoadmapView !== "undefined" && <TechStackRoadmapView />}

      {/* ── FILTER + GRID ─────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <SectionLabel index="[ 02 / TECH STACK ]" title="· BROWSE" meta={`${filtered.length} / ${STACK_TOOLS.length} SHOWN`} />

          {/* Control bar */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 280px", gap: 0,
            border: "1px solid var(--line)", marginBottom: 28
          }}>
            {/* category chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 0, borderRight: "1px solid var(--line)", width: "1169px" }}>
              {CATEGORIES.map((c, i) =>
              <button key={c} onClick={() => setFilter(c)} style={{
                padding: "14px 20px",
                background: filter === c ? "var(--accent-faint)" : "transparent",
                color: filter === c ? "var(--accent)" : "var(--fg-dim)",
                border: "none",
                borderRight: i < CATEGORIES.length - 1 ? "1px solid var(--line)" : "none",
                fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.14em",
                textTransform: "uppercase", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 10
              }}>
                  <span>{c}</span>
                  <span style={{
                  color: filter === c ? "var(--accent)" : "var(--fg-faint)",
                  fontSize: 10
                }}>{countByCat[c]}</span>
                </button>
              )}
            </div>
            {/* search */}
            <div style={{ display: "flex", alignItems: "center", padding: "0 18px", gap: 10 }}>
              <span className="mono" style={{ color: "var(--fg-faint)", fontSize: 12 }}>⌕</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools…"
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  color: "var(--fg)", fontFamily: "var(--f-mono)", fontSize: 12,
                  padding: "14px 0"
                }} />
              
              {query &&
              <button onClick={() => setQuery("")} className="hint" style={{
                background: "none", border: "none", cursor: "pointer", color: "var(--fg-dim)"
              }}>CLEAR</button>
              }
            </div>
          </div>

          {/* Grid of tools */}
          {filtered.length === 0 ?
          <Frame style={{ padding: 40, textAlign: "center" }}>
              <p style={{ color: "var(--fg-dim)" }}>No tools match that filter.</p>
            </Frame> :

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            border: "1px solid var(--line)"
          }}>
              {filtered.map((t, i) => {
              const col = i % 3;
              const row = Math.floor(i / 3);
              const lastRow = Math.floor((filtered.length - 1) / 3);
              return (
                <div key={t.name} className="feed-row" style={{
                  padding: "24px 24px",
                  borderRight: col < 2 ? "1px solid var(--line)" : "none",
                  borderBottom: row < lastRow ? "1px solid var(--line)" : "none",
                  display: "flex", gap: 18, alignItems: "flex-start",
                  minHeight: 128
                }}>
                    <LogoTile slug={t.logo} size={56} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontFamily: "var(--f-display)", fontWeight: 400, fontSize: 18, color: "var(--fg)" }}>{t.name}</span>
                      </div>
                      <div className="hint" style={{ marginBottom: 10 }}>{t.cat.toUpperCase()}</div>
                      <p style={{ fontSize: 13, color: "var(--fg-dim)", lineHeight: 1.5 }}>{t.role}</p>
                    </div>
                  </div>);

            })}
            </div>
          }
        </div>
      </section>

      <FooterCTA onNav={onNav} />
    </>);

}

// ─────────────────────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────────────────────

function AboutPage({ onNav }) {
  // Marker types: 'check' ✓  |  'x' ✕  |  'rocket' 🚀  |  'basic' (text)
  const compareRows = [
  { feature: "AI POWERED PROSPECTING & OUTREACH", lw: "check", other: "x" },
  { feature: "SMART DATA ENRICHMENT", lw: "check", other: "basic" },
  { feature: "MULTI CHANNEL CAMPAIGNS", lw: "check", other: "check" },
  { feature: "AUTOMATED CRM ENRICHMENT", lw: "check", other: "x" },
  { feature: "LIMITLESS OUTREACH", lw: "rocket", other: "x" }];



  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section style={{ paddingTop: 72, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
            <span className="label-accent">[ PAGE 03 / ABOUT ]</span>
            <span className="hint">FOUNDED 2025 · LONDON</span>
          </div>
          <h1 style={{ fontSize: "clamp(52px, 7.5vw, 128px)", marginBottom: 24, maxWidth: "16ch" }}>
            Outbound works,<br />
            <span style={{ color: "rgb(186, 139, 142)" }}>When timing is right.</span><br />
            We take care of it.<span style={{ color: "var(--accent)" }}></span>
          </h1>
        </div>
      </section>

      {/* ─── VISION + MISSION ─────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionLabel index="[ 01 / VISION ]" title="· MISSION" meta="WHAT WE ARE BUILDING TOWARD" />
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            border: "1px solid var(--line)"
          }}>
            <div style={{ padding: "48px 44px", borderRight: "1px solid var(--line)" }}>
              <div className="hint" style={{ marginBottom: 18, color: "var(--accent)" }}>↳ VISION</div>
              <h2 style={{
                fontFamily: "var(--f-display)", fontWeight: 300,
                fontSize: "clamp(32px, 3.4vw, 48px)", lineHeight: 1.1,
                letterSpacing: "-0.01em", marginBottom: 18, maxWidth: "18ch"
              }}>Outbound should only happen when there is a reason

              </h2>
              <p style={{ color: "var(--fg-dim)", lineHeight: 1.6, maxWidth: "44ch" }}>Most outbound fails because timing isn't right. 
Pipeline should be generated by acting on real situations, not by sending more messages to the same lists. 

              </p>
            </div>
            <div style={{ padding: "48px 44px" }}>
              <div className="hint" style={{ marginBottom: 18, color: "var(--accent)" }}>↳ MISSION</div>
              <h2 style={{
                fontFamily: "var(--f-display)", fontWeight: 300,
                fontSize: "clamp(32px, 3.4vw, 48px)", lineHeight: 1.1,
                letterSpacing: "-0.01em", marginBottom: 18, maxWidth: "18ch"
              }}>We turn real-world signals into pipeline

              </h2>
              <p style={{ color: "var(--fg-dim)", lineHeight: 1.6, maxWidth: "44ch" }}>We design and run systems that detect when companies actually need you, and activate outreach at that moment.

No guesswork. No volume play. Just timing, execution, and results. 

              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT THE COMPANY ────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionLabel index="[ 02.1 / ABOUT ]" title="· THE COMPANY" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "start" }}>
            <div className="hint">2025 · LONDON</div>
            <p className="lead" style={{ maxWidth: "60ch" }}>Founded in 2025, LeadWise AI builds signal-driven outbound systems for B2B companies operating in complex sales environments. We focus on timing, by identifying when companies actually need you, and turning that into qualified meetings.




            </p>
          </div>
        </div>
      </section>

      {/* ─── ABOUT THE FOUNDER ────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionLabel index="[ 02.2 / ABOUT ]" title="· THE FOUNDER" />
          <div style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 48,
            alignItems: "start",
            border: "1px solid var(--line)",
            padding: 36
          }}>
            {/* Founder image */}
            <div style={{
              width: 240, height: 280,
              border: "1px solid var(--line)",
              position: "relative"
            }}>
              <img
                src="assets/founder.jpg"
                alt="Christopher Maiorana"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <span className="crop-tl"></span>
              <span className="crop-tr"></span>
              <span className="crop-bl"></span>
              <span className="crop-br"></span>
            </div>

            {/* Founder copy */}
            <div>
              <div className="hint" style={{ marginBottom: 12, color: "var(--accent)" }}>FOUNDER · CEO</div>
              <h2 style={{
                fontFamily: "var(--f-display)", fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.01em", marginBottom: 22, maxWidth: "20ch", fontSize: "60px"
              }}>Christopher Maiorana

              </h2>

              <p style={{ color: "var(--fg-dim)", lineHeight: 1.7, marginBottom: 18, maxWidth: "62ch" }}>
                <span style={{ color: "var(--fg-faint)", fontStyle: "italic" }}>My sales journey started 5 years ago, working across banking, fintech, private equity, and consulting. I specialise in simplifying sales operations and building reliable outreach systems in highly competitive environments. For the past two years, I’ve focused on cold outreach at scale and automation, mastering infrastructure, data, deliverability, sequencing, and engineering systems that actually drive pipeline. Independent and analytical by nature, I wanted to build something of my own. That’s why I went all in and founded LEADWISE AI.



                </span>
              </p>
              <p style={{ color: "var(--fg-dim)", lineHeight: 1.7, marginBottom: 18, maxWidth: "62ch" }}>
                <span style={{ color: "var(--fg-faint)", fontStyle: "italic" }}>



                </span>
              </p>
              <p style={{ color: "var(--fg-dim)", lineHeight: 1.7, maxWidth: "62ch" }}>
                <span style={{ color: "var(--fg-faint)", fontStyle: "italic" }}>


                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US · COMPARISON TABLE ─────────────── */}
      <section className="section">
        <div className="container">
          <SectionLabel index="[ 03 / WHY US ]" title="· WHAT MAKES THE DIFFERENCE" meta="LEADWISE VS. THE REST" />
          <div style={{ border: "1px solid var(--line)" }}>
            {/* Table header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1.4fr 1.4fr",
              borderBottom: "1px solid var(--line)",
              background: "rgba(14,14,16,0.5)"
            }}>
              <div className="hint" style={{ padding: "18px 24px", fontFamily: "sans-serif" }}>↳ Compare Features</div>
              <div style={{
                padding: "18px 24px",
                borderLeft: "1px solid var(--line)",
                background: "var(--accent-faint)",
                color: "var(--accent)",
                textAlign: "center"
              }} className="mono">
                <span style={{ fontSize: 11, letterSpacing: "0.18em" }}>● LEADWISE AI</span>
              </div>
              <div className="hint" style={{ padding: "18px 24px", borderLeft: "1px solid var(--line)", textAlign: "center" }}>
                ○ OTHERS
              </div>
            </div>

            {/* Rows */}
            {compareRows.map((r, i) => {
              const renderMark = (kind, accent) => {
                if (kind === "basic") {
                  return (
                    <span style={{
                      fontFamily: "var(--f-mono)", fontSize: 12,
                      letterSpacing: "0.16em",
                      color: "var(--fg-dim)"
                    }}>basic</span>);

                }
                if (kind === "rocket") {
                  return (
                    <span style={{ fontSize: 22, lineHeight: 1, display: "inline-block", transform: "rotate(-12deg)" }}>🚀</span>);

                }
                if (kind === "x") {
                  return (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ color: "var(--fg-faint)" }}>
                      <circle cx="11" cy="11" r="9" />
                      <line x1="5" y1="17" x2="17" y2="5" />
                    </svg>);

                }
                return (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ color: accent ? "var(--accent)" : "var(--fg)" }}>
                    <circle cx="11" cy="11" r="9" />
                    <path d="M6.5 11.2 L9.8 14.4 L15.5 7.8" />
                  </svg>);

              };
              return (
                <div key={r.feature} style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1.4fr 1.4fr",
                  borderBottom: i < compareRows.length - 1 ? "1px solid var(--line)" : "none"
                }}>
                  <div style={{
                    padding: "26px 28px",
                    fontFamily: "var(--f-mono)", fontSize: 12,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "var(--fg)",
                    display: "flex", alignItems: "center"
                  }}>
                    {r.feature}
                  </div>
                  <div style={{
                    padding: "26px 28px",
                    borderLeft: "1px solid var(--line)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    {renderMark(r.lw, true)}
                  </div>
                  <div style={{
                    padding: "26px 28px",
                    borderLeft: "1px solid var(--line)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    {renderMark(r.other, false)}
                  </div>
                </div>);

            })}
          </div>

          <div style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
            <a href="#" onClick={(e) => {e.preventDefault();onNav("contact");}} className="btn btn-primary">
              Talk to us <Arrow />
            </a>
          </div>
        </div>
      </section>

      <FooterCTA onNav={onNav} />
    </>);

}

// ─────────────────────────────────────────────────────────
// CONTACT PAGE
// ─────────────────────────────────────────────────────────

function ContactPage({ onNav }) {
  const [form, setForm] = React.useState({ name: "", company: "", email: "", role: "", acv: "> $25K", volume: "< 100", notes: "" });
  const [sent, setSent] = React.useState(false);

  const Field = ({ label, children, meta }) =>
  <div style={{ borderBottom: "1px solid var(--line)", paddingBottom: 18, marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span className="label">{label}</span>
        {meta && <span className="hint">{meta}</span>}
      </div>
      {children}
    </div>;

  const inputStyle = {
    width: "100%", background: "transparent", border: "none",
    color: "var(--fg)", fontFamily: "var(--f-display)", fontWeight: 300,
    fontSize: 24, outline: "none", padding: "4px 0"
  };

  return (
    <>
      <section style={{ paddingTop: 72, paddingBottom: 120 }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
            <span className="label-accent">[ PAGE 04 / CONTACT ]</span>
            <span className="hint">RESPONSE ← 24H · FOUNDER-LED CALL</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <h1 style={{ fontSize: "clamp(48px, 6vw, 96px)", marginBottom: 28, maxWidth: "14ch" }}>
                Book a<br />30-minute<br />discovery call.
              </h1>
              <p className="lead" style={{ marginBottom: 40 }}>Tell us about your business. We'll get back to you within 24 hours with a clear strategy and two signal worth monitoring for your ICP.



              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, borderTop: "1px solid var(--line)", paddingTop: 28 }}>
                <div>
                  <div className="hint" style={{ marginBottom: 8 }}>EMAIL</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 14 }}>contact@leadwise.ai</div>
                </div>
                <div>
                  <div className="hint" style={{ marginBottom: 8 }}>PHONE · UK</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 14 }}>+44 20 3983 1102</div>
                </div>
                <div>
                  <div className="hint" style={{ marginBottom: 8 }}>ADDRESS</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 14, lineHeight: 1.5 }}>
                    30 N Gould St Ste N<br />
                    Sheridan, WY 82801<br />
                    United States
                  </div>
                </div>
                <div>
                  <div className="hint" style={{ marginBottom: 8 }}></div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 14 }}></div>
                </div>
              </div>
            </div>

            <Frame label="INTAKE FORM / LW-24.1" meta={sent ? "● TRANSMITTED" : "● OPEN"} style={{ padding: "40px 36px" }}>
              {sent ?
              <div style={{ padding: "40px 0", textAlign: "center" }}>
                  <div style={{ fontSize: 42, color: "var(--accent)", marginBottom: 16 }}>●</div>
                  <h3 style={{ marginBottom: 14 }}>Signal received.</h3>
                  <p style={{ color: "var(--fg-dim)", maxWidth: "34ch", margin: "0 auto" }}>
                    A founder will respond personally within 24 hours. In the meantime, feel free to inspect the tool stack.
                  </p>
                </div> :

              <form onSubmit={(e) => {e.preventDefault();setSent(true);}}>
                  <Field label="01 · YOUR NAME" meta="REQ">
                    <input style={inputStyle} placeholder="Ada Mercer" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </Field>
                  <Field label="02 · COMPANY" meta="REQ">
                    <input style={inputStyle} placeholder="Meridian Partners" value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })} required />
                  </Field>
                  <Field label="03 · WORK EMAIL" meta="REQ">
                    <input type="email" style={inputStyle} placeholder="ada@meridian.com" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </Field>
                  <Field label="04 · ROLE">
                    <input style={inputStyle} placeholder="Founder / Head of GTM" value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })} />
                  </Field>
                  <Field label="05 · AVERAGE DEAL SIZE">
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {["< $10K", "$10–25K", "> $25K", "> $100K"].map((v) =>
                    <button type="button" key={v} onClick={() => setForm({ ...form, acv: v })} style={{
                      padding: "8px 14px", border: "1px solid " + (form.acv === v ? "var(--accent)" : "var(--line)"),
                      background: form.acv === v ? "var(--accent-faint)" : "transparent",
                      color: form.acv === v ? "var(--accent)" : "var(--fg-dim)",
                      fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer"
                    }}>{v}</button>
                    )}
                    </div>
                  </Field>
                  <Field label="06 · WHAT ARE YOU SOLVING FOR?">
                    <textarea rows={3} style={{ ...inputStyle, fontSize: 16, resize: "none" }}
                  placeholder="e.g. Replace our SDR motion · find interim CFO mandates · break into fintech…"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                  </Field>
                  <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "space-between", padding: "18px 22px", fontSize: 12 }}>
                    <span>Transmit Intake</span> <Arrow />
                  </button>
                  <div className="hint" style={{ marginTop: 14, textAlign: "center" }}>
                    WE WILL NEVER ADD YOU TO A SEQUENCE.
                  </div>
                </form>
              }
            </Frame>
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </>);

}

Object.assign(window, { StackPage, AboutPage, ContactPage });