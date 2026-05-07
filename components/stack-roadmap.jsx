/* global React */

// ─────────────────────────────────────────────────────────
//  TECH STACK ROADMAP — horizontal pipeline diagram with
//  Claude Code as orchestrator. Lives directly above the
//  "Licensed Tools · Browse" section on the Tech Stack page.
// ─────────────────────────────────────────────────────────

(function () {
  // Tools we have local PNGs for. Anything not listed renders as
  // a text-only mono-caps tile (no logo), which matches the brief's
  // "optional 16px monochrome logo on the left" rule.
  const HAS_LOGO = new Set([
  "apollo", "linkedin", "apify", "clay", "openai", "claude",
  "claudecode", "prospeo", "findymail", "icypeas", "zerobounce",
  "instantly",
  "attio", "claygent", "cloudflare", "cursor", "hubspot",
  "millionverifier", "salesforce", "supabase", "vercel",
  "warmly", "zoominfo"]
  );
  // Logos that need a white plate (transparent marks).
  const NEEDS_PLATE = new Set([
  "claude", "openai", "clay", "claudecode", "zerobounce",
  "cloudflare", "vercel", "salesforce"]
  );

  // 7 pipeline stages (left → right).
  const STAGES = [
  {
    id: "data", label: "Data / DB",
    tools: [
    { slug: "apollo", name: "Apollo", role: "B2B contact graph + firmographics" },
    { slug: "linkedin", name: "LinkedIn", role: "Sales Nav signals + role changes" },
    { slug: "zoominfo", name: "ZoomInfo", role: "Enterprise contact + intent data" },
    { slug: "apify", name: "Apify", role: "Headless web scrapers" }]

  },
  {
    id: "deliver", label: "Deliverability",
    tools: [
    { slug: "cloudflare", name: "Cloudflare", role: "DNS · SPF · DKIM · DMARC" },
    { slug: "instantly", name: "Instantly", role: "Sending pool + warm-up" },
    { slug: "warmly", name: "Warmly", role: "Inbox warming + reputation" }]

  },
  {
    id: "filter", label: "AI Filter & Score",
    tools: [
    { slug: "clay", name: "Clay", role: "Enrichment orchestration" },
    { slug: "claygent", name: "Claygent", role: "Per-row AI reasoning agent" },
    { slug: "openai", name: "ChatGPT", role: "Classification + structured extraction" }]

  },
  {
    id: "verify", label: "Email Find & Verify",
    tools: [
    { slug: "prospeo", name: "Prospeo", role: "Email finder + waterfall" },
    { slug: "findymail", name: "Findymail", role: "GDPR-clean B2B emails" },
    { slug: "icypeas", name: "Icypeas", role: "High-accuracy verifier" },
    { slug: "zerobounce", name: "ZeroBounce", role: "Deliverability scoring" },
    { slug: "millionverifier", name: "MillionVerifier", role: "Bulk verification layer" }]

  },
  {
    id: "copy", label: "Email Copy",
    tools: [
    { slug: "claude", name: "Claude", role: "Per-lead drafting + tone" },
    { slug: "openai", name: "ChatGPT", role: "Subject lines + variants" }]

  },
  {
    id: "send", label: "Sequencer",
    tools: [
    { slug: "instantly", name: "Instantly", role: "Sending rotation + cadence" }]

  },
  {
    id: "crm", label: "CRM Handoff",
    tools: [
    { slug: "hubspot", name: "HubSpot", role: "Sync to HubSpot CRM" },
    { slug: "attio", name: "Attio", role: "Sync to Attio workspace" },
    { slug: "salesforce", name: "Salesforce", role: "Sync to Salesforce" }]

  }];


  const INFRA = [
  { slug: "supabase", name: "Supabase", note: "data store" },
  { slug: "vercel", name: "Vercel", note: "deploy" },
  { slug: "cursor", name: "Cursor", note: "dev env" }];


  // ── Tiny logo (16px) — monochrome treatment via filter -----
  function MicroLogo({ slug }) {
    if (!HAS_LOGO.has(slug)) {
      // Glyph fallback — first letter, mono-caps, in a 1px square.
      return (
        <span style={{
          width: 16, height: 16, flexShrink: 0,
          border: "1px solid var(--line-strong)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--f-mono)", fontSize: 9,
          color: "var(--fg-dim)", letterSpacing: 0
        }}>{slug[0].toUpperCase()}</span>);

    }
    const isMark = NEEDS_PLATE.has(slug);
    return (
      <span style={{
        width: 16, height: 16, flexShrink: 0,
        background: isMark ? "#fff" : "transparent",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden"
      }}>
        <img src={`assets/logos/${slug}.png`} alt=""
        style={{
          width: isMark ? "70%" : "100%",
          height: isMark ? "70%" : "100%",
          objectFit: isMark ? "contain" : "cover",
          display: "block"
        }} />
      </span>);

  }

  // ── Tool tile -----------------------------------------------
  function ToolTile({ tool, accent }) {
    const [hover, setHover] = React.useState(false);
    return (
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "relative",
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 10px",
          background: "var(--bg-2)",
          border: `1px solid ${hover || accent ? "var(--accent)" : "var(--line)"}`,
          fontFamily: "var(--f-mono)",
          fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase",
          color: hover ? "var(--accent)" : "var(--fg)",
          cursor: "default",
          transition: "border-color 140ms ease, color 140ms ease"
        }}>
        <MicroLogo slug={tool.slug} />
        <span style={{ whiteSpace: "nowrap" }}>{tool.name}</span>

        {hover && tool.role &&
        <div style={{
          position: "absolute",
          bottom: "calc(100% + 6px)", left: 0,
          background: "var(--bg)",
          border: "1px solid var(--accent-dim)",
          padding: "6px 9px",
          fontFamily: "var(--f-mono)",
          fontSize: 9.5, letterSpacing: "0.08em", textTransform: "none",
          color: "var(--fg-dim)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 10
        }}>
            <span style={{ color: "var(--accent)" }}>{tool.name}</span>
            <span style={{ color: "var(--fg-faint)" }}> — {tool.role}</span>
          </div>
        }
      </div>);

  }

  // ── Stage column --------------------------------------------
  function StageColumn({ stage, idx, total }) {
    return (
      <div style={{
        flex: "1 1 0",
        minWidth: 0,
        display: "flex", flexDirection: "column",
        gap: 14,
        position: "relative"
      }}>
        {/* Stage header pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          alignSelf: "flex-start",
          padding: "5px 10px",
          border: "1px solid var(--line-strong)",
          fontFamily: "var(--f-mono)",
          fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase",
          color: "var(--fg-dim)",
          background: "var(--bg)"
        }}>
          <span style={{ color: "var(--accent)" }}>S{String(idx + 1).padStart(2, "0")}</span>
          <span>{stage.label}</span>
          {stage.meta &&
          <span style={{ color: "var(--fg-faint)", marginLeft: 4 }}>· {stage.meta}</span>
          }
        </div>

        {/* Tool stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {stage.tools.map((t) => <ToolTile key={t.slug + t.name} tool={t} />)}
        </div>
      </div>);

  }

  // ── Orchestrator bar (Claude Code + infra) ------------------
  function OrchestratorBar({ glow, setGlow }) {
    return (
      <div style={{
        border: "1px solid var(--line)",
        background: "var(--bg-2)",
        padding: "16px 18px",
        display: "grid",
        gridTemplateColumns: "minmax(220px, 280px) 1px 1fr",
        gap: 18,
        alignItems: "center",
        marginBottom: 0
      }}>
        {/* Claude Code node */}
        <div
          onMouseEnter={() => setGlow(true)}
          onMouseLeave={() => setGlow(false)}
          style={{
            position: "relative",
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 12px",
            border: "1px solid var(--accent)",
            background: "var(--accent-faint)",
            cursor: "default",
            transition: "border-color 140ms ease, background 140ms ease"
          }}>
          <span style={{
            width: 28, height: 28, flexShrink: 0,
            background: "#fff",
            display: "inline-flex", alignItems: "center", justifyContent: "center"
          }}>
            <img src="assets/logos/claudecode.png" alt=""
            style={{ width: "70%", height: "70%", objectFit: "contain" }} />
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{
              fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.18em",
              color: "var(--accent)", textTransform: "uppercase"
            }}>Orchestrator</span>
            <span style={{
              fontFamily: "var(--f-mono)", fontSize: 13, letterSpacing: "0.04em",
              color: "var(--fg)", textTransform: "uppercase"
            }}>Claude Code</span>
          </div>

          {/* connector stub to infra */}
          <span aria-hidden style={{
            position: "absolute", right: -18, top: "50%",
            width: 18, height: 1, background: "var(--accent-dim)"
          }} />
        </div>

        {/* vrule */}
        <div style={{ width: 1, alignSelf: "stretch", background: "var(--line)" }} />

        {/* Infrastructure cluster */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <span className="hint" style={{ color: "var(--fg-faint)" }}>↳ Infrastructure</span>
          {INFRA.map((t) =>
          <div key={t.slug} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 10px",
            border: "1px solid var(--accent-dim)",
            background: "rgba(217, 138, 142, 0.04)",
            fontFamily: "var(--f-mono)", fontSize: 10.5,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "var(--fg)"
          }}>
              <MicroLogo slug={t.slug} />
              <span>{t.name}</span>
              <span style={{ color: "var(--fg-faint)", textTransform: "lowercase", letterSpacing: 0 }}>
                · {t.note}
              </span>
            </div>
          )}
        </div>
      </div>);

  }

  // ── Connector SVG (between orchestrator and stages) ---------
  // 7 dashed lines fan down from orchestrator center to each stage's
  // top-pill. Solid horizontal flow line connects stages.
  function Connectors({ glow }) {
    // Equally divide width into 7 stage slots; line drops to slot center.
    return (
      <div style={{ position: "relative", height: 56, marginTop: -1 }}>
        <svg
          viewBox="0 0 700 56"
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {/* Orchestrator anchor at top center */}
          {STAGES.map((_, i) => {
            const x = 50 + i * 100; // 7 slots, centers at 50,150,...,650
            return (
              <line key={i}
              x1={350} y1={0}
              x2={x} y2={52}
              stroke="var(--accent)"
              strokeWidth={1.2}
              strokeDasharray="3 3"
              opacity={glow ? 1 : 0.7} />);

          })}
          {/* small terminal tick */}
          {STAGES.map((_, i) => {
            const x = 50 + i * 100;
            return (
              <circle key={`d${i}`} cx={x} cy={52} r={1.8}
              fill="var(--accent)"
              opacity={glow ? 1 : 0.85} />);

          })}
        </svg>
      </div>);

  }

  // Solid flow lines + arrows BETWEEN consecutive stage clusters.
  // Drawn as a single SVG layer overlaid on the stage row.
  function StageFlowLines({ fanOutLast }) {
    // 7 stages, gap connectors at indices 0..5 (between i and i+1).
    // For the last stage CRM, we render a fan-out from sequencer.
    // The SVG sits absolutely between columns; we just draw a thin
    // horizontal bar with arrow heads using CSS pseudos at column edges.
    return null; // visual flow handled per-column via right-edge arrow
  }

  // Right-edge arrow that visually connects column i to column i+1.
  function ColumnArrow({ last, fanOut }) {
    if (last) return null;
    return (
      <div aria-hidden style={{
        position: "absolute",
        top: 18,
        right: -14,
        width: 28,
        display: "flex", alignItems: "center",
        pointerEvents: "none"
      }}>
        <span style={{
          flex: 1, height: 1, background: "var(--accent-dim)"
        }} />
        <span style={{
          width: 0, height: 0,
          borderTop: "3px solid transparent",
          borderBottom: "3px solid transparent",
          borderLeft: "5px solid var(--accent)"
        }} />
      </div>);

  }

  // ── Main view -----------------------------------------------
  function TechStackRoadmapView() {
    const [glow, setGlow] = React.useState(false);
    const totalTools = STAGES.reduce((n, s) => n + s.tools.length, 0) + 1 /* claude code */ + INFRA.length;

    return (
      <section className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="container">
          {/* Section header — matches existing pattern */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            gap: 24, marginBottom: 18, flexWrap: "wrap"
          }}>
            <span className="label-accent">[ 01 / TECH STACK ROADMAP ]</span>
            <span className="hint">{totalTools} TOOLS · 7 LAYERS · 1 ORCHESTRATOR</span>
          </div>

          {/* Headline */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 48,
            alignItems: "end",
            marginBottom: 36
          }}>
            <h2 style={{
              fontSize: "clamp(36px, 4.2vw, 60px)",
              margin: 0, lineHeight: 1.05
            }}>
              The stack that runs<br />every campaign.
            </h2>
            <p className="lead" style={{ maxWidth: "44ch" }}>
              <span style={{ color: "var(--accent)" }}>Claude Code</span> orchestrates the entire pipeline
              end-to-end — from raw signals to CRM handoff — with Supabase, Vercel, and Cursor as its
              supporting infrastructure.
            </p>
          </div>

          {/* ── ROADMAP DIAGRAM ───────────────────────────── */}
          <div className="roadmap-wrap" style={{
            border: "1px solid var(--line)",
            background: "var(--bg-2)",
            padding: 24,
            position: "relative"
          }}>
            {/* Top chrome */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              paddingBottom: 14, borderBottom: "1px solid var(--line)", marginBottom: 18
            }}>
              <span className="mono" style={{ fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.18em" }}>
                LW/ROADMAP · ORCHESTRATED BY CLAUDE CODE
              </span>
              <span className="mono" style={{ fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.18em" }}>
                ◆ END-TO-END PIPELINE
              </span>
            </div>

            {/* Orchestrator bar */}
            <OrchestratorBar glow={glow} setGlow={setGlow} />

            {/* Dashed orchestration connectors */}
            <div className="roadmap-connectors">
              <Connectors glow={glow} />
            </div>

            {/* 7-stage horizontal pipeline */}
            <div className="roadmap-stages" style={{
              display: "flex",
              alignItems: "stretch",
              gap: 28,
              position: "relative"
            }}>
              {STAGES.map((s, i) =>
              <div key={s.id} style={{
                flex: "1 1 0",
                minWidth: 0,
                position: "relative"
              }}>
                  <StageColumn stage={s} idx={i} total={STAGES.length} />
                  <ColumnArrow last={i === STAGES.length - 1} fanOut={i === STAGES.length - 2} />
                </div>
              )}
            </div>

            {/* Legend */}
            <div style={{
              display: "flex", gap: 22, flexWrap: "wrap",
              paddingTop: 18, marginTop: 22,
              borderTop: "1px solid var(--line)"
            }}>
              <LegendItem swatch={<Sw kind="stage" />} label="Stage" />
              <LegendItem swatch={<Sw kind="tool" />} label="Tool" />
              <LegendItem swatch={<Sw kind="solid" />} label="Data flow" />
              <LegendItem swatch={<Sw kind="dashed" />} label="Orchestration signal" />
              <span className="hint" style={{ marginLeft: "auto" }}>
                ↳ FANS OUT TO HUBSPOT · ATTIO · SALESFORCE IN PARALLEL
              </span>
            </div>
          </div>
        </div>

        {/* Responsive — vertical stack on small screens */}
        <style>{`
          @media (max-width: 1100px) {
            .roadmap-stages { flex-wrap: wrap !important; }
            .roadmap-stages > div { flex: 1 1 240px !important; }
          }
          @media (max-width: 900px) {
            .roadmap-stages { flex-direction: column !important; gap: 22px !important; }
            .roadmap-stages > div { flex: 1 1 auto !important; width: 100%; }
            .roadmap-connectors { display: none; }
          }
        `}</style>
      </section>);

  }

  function LegendItem({ swatch, label }) {
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.14em",
        textTransform: "uppercase", color: "var(--fg-dim)"
      }}>
        {swatch}
        <span>{label}</span>
      </span>);

  }

  function Sw({ kind }) {
    if (kind === "stage") {
      return <span style={{
        width: 22, height: 12,
        border: "1px solid var(--line-strong)",
        display: "inline-block"
      }} />;
    }
    if (kind === "tool") {
      return <span style={{
        width: 22, height: 12,
        border: "1px solid var(--line)",
        background: "var(--bg-2)",
        display: "inline-block"
      }} />;
    }
    if (kind === "solid") {
      return <svg width="22" height="6" viewBox="0 0 22 6">
        <line x1="0" y1="3" x2="18" y2="3" stroke="var(--accent)" strokeWidth="1" />
        <polygon points="18,1 22,3 18,5" fill="var(--accent)" />
      </svg>;
    }
    if (kind === "dashed") {
      return <svg width="22" height="6" viewBox="0 0 22 6">
        <line x1="0" y1="3" x2="22" y2="3" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
      </svg>;
    }
    return null;
  }

  // Expose globally so stack-page.jsx can mount it.
  window.TechStackRoadmapView = TechStackRoadmapView;
})();