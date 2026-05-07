/* global React, Frame, SectionLabel, Arrow, BracketIcon */
const { useState: useStateE } = React;

// ─────────────────────────────────────────────────────────
// HOW IT WORKS — Four steps (highlights one card)
// ─────────────────────────────────────────────────────────

const HIW_STEPS = [
{
  n: "01",
  title: "Define Your ICP",
  body: "Personalised sequences go live across email channels — warmed-up domains, tested copy, and tight targeting.",
  icon: (c) =>
  <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.1" width="28" height="28">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" fill={c} />
      </svg>

},
{
  n: "02",
  title: "System Creation & Search",
  body: "Personalised sequences go live across email channels — warmed-up domains, tested copy, and tight targeting.",
  icon: (c) =>
  <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.1" width="28" height="28">
        <rect x="3" y="4" width="18" height="16" />
        <path d="M3 9h18M8 4v5M16 4v5" />
      </svg>

},
{
  n: "03",
  title: "Campaign Launch",
  body: "Qualified, interested prospects land directly in your inbox — ready for your team to close.",
  icon: (c) =>
  <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.1" width="28" height="28">
        <path d="M3 12l18-9-7 18-3-8-8-1z" />
      </svg>

},
{
  n: "04",
  title: "Convert Warm Leads",
  body: "Qualified, interested prospects land directly in your inbox → ready for your team to close.",
  icon: (c) =>
  <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.1" width="28" height="28">
        <path d="M4 4h16v14H5.5L4 20z" />
        <path d="M8 10h8M8 13h5" />
      </svg>

}];


function HowItWorks() {
  const [active, setActive] = useStateE(2);
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <SectionLabel index="[ 02 / HOW IT WORKS ]" title="THE PROCESS" meta="4 STEPS" />
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 60, alignItems: "end", marginBottom: 56 }}>
          <h2>
            Four steps from cold list<br />
            to <em style={{ fontStyle: "normal", position: "relative" }}>
              <span style={{ background: "linear-gradient(180deg, transparent 62%, var(--accent-faint) 62%)", padding: "0 0.08em" }}>
                warm conversations
              </span>
            </em>.
          </h2>
          <p className="lead" style={{ paddingBottom: 12 }}>A structured outbound process, engineered to remove guesswork and deliver results every day. 


          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {HIW_STEPS.map((s, i) => {
            const isActive = active === i;
            const bg = isActive ? "var(--accent)" : "transparent";
            const fg = isActive ? "#0a0a0b" : "var(--fg)";
            const sub = isActive ? "rgba(10,10,11,0.78)" : "var(--fg-dim)";
            const iconColor = isActive ? "#0a0a0b" : "var(--accent)";
            return (
              <div key={s.n} onMouseEnter={() => setActive(i)} style={{
                position: "relative",
                border: isActive ? "1px solid var(--accent)" : "1px solid var(--line)",
                background: bg,
                padding: "36px 28px",
                minHeight: 300,
                transition: "background 220ms ease, border-color 220ms ease",
                cursor: "pointer"
              }}>
                {/* crop marks visible on non-active */}
                {!isActive && <>
                  <span className="crop-tl" />
                  <span className="crop-tr" />
                  <span className="crop-bl" />
                  <span className="crop-br" />
                </>}
                <div style={{
                  fontFamily: "var(--f-display)", fontWeight: 300,
                  fontSize: 40, letterSpacing: "-0.02em", color: fg, marginBottom: 44,
                  fontStyle: "italic", opacity: isActive ? 1 : 0.85
                }}>
                  {s.n}
                </div>
                <div style={{ marginBottom: 20 }}>{s.icon(iconColor)}</div>
                <h3 style={{ color: fg, marginBottom: 14, fontSize: 22 }}>{s.title}</h3>
                <p style={{ color: sub, fontSize: 16, maxWidth: "32ch" }}>{s.body}</p>
              </div>);

          })}
        </div>
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────
// WORKFLOW — 12-week timeline with expandable milestones
// ─────────────────────────────────────────────────────────

const WORKFLOW = [
{ wk: "WEEK 01", ph: "PHASE 01", title: "Foundation & Research", items: ["ICP definition & research", "Domain & email warm-up (3 weeks min)"] },
{ wk: "WEEK 03", ph: "PHASE 02", title: "Build & Prepare", items: ["Data collection & enrichment", "Sequence creation", "Email copy creation"] },
{ wk: "WEEK 04", ph: "PHASE 03", title: "Launch", items: ["Campaign goes live", "Initial response monitoring"] },
{ wk: "WEEK 08", ph: "PHASE 04", title: "Optimize & Scale", items: ["Ongoing A/B iterations", "Increase sending volume", "Pipeline reporting"] },
{ wk: "WEEK 12", ph: "PHASE 05", title: "Campaign ending", items: ["Final reporting", "Service renewal"] }];


function Workflow() {
  const [active, setActive] = useStateE(1);
  return (
    <section className="section" id="workflow">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ width: 20, height: 1, background: "var(--line)" }} />
            <span className="label-accent" style={{ fontSize: "1px", fontFamily: "\"JetBrains Mono\"" }}>THE LEADWISE WORKFLOW</span>
            <span style={{ width: 20, height: 1, background: "var(--line)" }} />
          </div>
          <h2 style={{ maxWidth: "16ch", margin: "0 auto 20px" }}>
            The first 12 weeks preparing for ongoing pipeline growth<br />
            <em style={{ fontStyle: "normal", color: "var(--accent)" }}></em>
          </h2>
          <p style={{ color: "var(--fg-dim)", maxWidth: "54ch", margin: "0 auto" }}>
            Click any milestone to expand. Each phase builds on the last — research, build, launch, scale.
          </p>
        </div>

        <Frame style={{ padding: "56px 48px 40px", background: "rgba(14,14,16,0.5)" }}>
          {/* Week labels row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", marginBottom: 14 }}>
            {WORKFLOW.map((w, i) =>
            <div key={i} style={{ textAlign: "center" }}>
                <span className="hint" style={{ color: active === i ? "var(--accent)" : "var(--fg-faint)" }}>{w.wk}</span>
              </div>
            )}
          </div>

          {/* Rail with nodes */}
          <div style={{ position: "relative", height: 22, marginBottom: 14 }}>
            <div style={{
              position: "absolute", top: 10, left: 30, right: 30, height: 1,
              background: "var(--accent)", opacity: 0.55
            }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", position: "relative", height: "100%" }}>
              {WORKFLOW.map((_, i) => {
                const isActive = active === i;
                return (
                  <div key={i} style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                    <button onClick={() => setActive(i)} style={{
                      width: isActive ? 18 : 12, height: isActive ? 18 : 12,
                      borderRadius: "50%",
                      background: isActive ? "var(--accent)" : "transparent",
                      border: isActive ? "3px solid rgba(186,139,142,0.28)" : "1.5px solid rgba(186,139,142,0.6)",
                      cursor: "pointer", padding: 0,
                      boxShadow: isActive ? "0 0 0 6px rgba(186,139,142,0.12)" : "none",
                      transition: "all 220ms ease"
                    }} />
                  </div>);

              })}
            </div>
          </div>

          {/* Phase labels */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", marginBottom: 14 }}>
            {WORKFLOW.map((w, i) =>
            <div key={i} style={{ textAlign: "center" }}>
                <span className="label" style={{ color: active === i ? "var(--accent)" : "var(--fg-dim)" }}>{w.ph}</span>
              </div>
            )}
          </div>

          {/* Titles row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
            {WORKFLOW.map((w, i) => {
              const isActive = active === i;
              return (
                <div key={i} onClick={() => setActive(i)} style={{ cursor: "pointer", textAlign: "center" }}>
                  <div style={{
                    fontFamily: "var(--f-display)", fontWeight: 300,
                    fontSize: 26, letterSpacing: "-0.015em",
                    color: isActive ? "var(--fg)" : "var(--fg-dim)",
                    transition: "color 200ms ease", marginBottom: 18
                  }}>{w.title}</div>

                  {/* detail panel */}
                  <div style={{
                    maxHeight: isActive ? 240 : 0,
                    overflow: "hidden",
                    transition: "max-height 420ms cubic-bezier(.2,.7,.2,1), opacity 260ms ease",
                    opacity: isActive ? 1 : 0
                  }}>
                    <div style={{
                      border: "1px solid var(--line)",
                      padding: "18px 22px",
                      textAlign: "left",
                      background: "rgba(186,139,142,0.04)"
                    }}>
                      {w.items.map((it, k) =>
                      <div key={k} style={{
                        display: "flex", gap: 10, alignItems: "center",
                        padding: "4px 0",
                        fontSize: 13, color: "var(--fg-dim)"
                      }}>
                          <span style={{ width: 10, height: 1, background: "var(--accent)" }} />
                          <span>{it}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>);

            })}
          </div>

          {/* Bottom meta strip */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, paddingTop: 18, borderTop: "1px solid var(--line)" }}>
            <span className="hint">MIN ENGAGEMENT · 12 WEEKS · WEEKLY REVIEW</span>
            <span className="hint"> <span style={{ color: "var(--accent)" }}></span><span style={{ color: "var(--accent)" }}></span></span>
          </div>
        </Frame>

        {/* Section CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 64 }}>
          <a href="#contact" className="btn btn-primary" style={{ fontSize: 15, padding: "20px 36px", letterSpacing: "0.18em" }}>
            Discover more about our outbound services <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────
// WHY — Three differentiator cards with illustrations
// ─────────────────────────────────────────────────────────

function IllusDoneForYou() {
  return (
    <svg viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <g fill="none" stroke="rgba(242,242,240,0.45)" strokeWidth="1">
        <rect x="10" y="30" width="40" height="40" />
        <line x1="18" y1="42" x2="42" y2="42" strokeDasharray="2 2" />
        <line x1="18" y1="50" x2="38" y2="50" strokeDasharray="2 2" />
        <line x1="18" y1="58" x2="42" y2="58" strokeDasharray="2 2" />
        <path d="M 50 50 L 90 50" stroke="var(--accent)" />
        <polygon points="88,47 94,50 88,53" fill="var(--accent)" stroke="none" />
        <circle cx="120" cy="50" r="28" stroke="var(--accent)" />
        <circle cx="120" cy="50" r="18" stroke="rgba(242,242,240,0.4)" />
        <circle cx="120" cy="50" r="3" fill="var(--accent)" stroke="none" />
        <g stroke="var(--accent)">
          <line x1="120" y1="22" x2="120" y2="26" />
          <line x1="120" y1="74" x2="120" y2="78" />
          <line x1="148" y1="50" x2="144" y2="50" />
          <line x1="92" y1="50" x2="96" y2="50" />
        </g>
        <path d="M 150 50 L 190 50" stroke="var(--accent)" />
        <polygon points="188,47 194,50 188,53" fill="var(--accent)" stroke="none" />
        <rect x="190" y="30" width="40" height="40" />
        <path d="M 198 50 L 204 56 L 222 42" stroke="var(--accent)" strokeWidth="1.5" />
      </g>
    </svg>);

}

function IllusPrecision() {
  const dots = [];
  for (let y = 20; y <= 80; y += 20)
  for (let x of [30, 60, 90, 150, 180, 210])
  dots.push(<circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" />);
  return (
    <svg viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <g fill="rgba(242,242,240,0.35)">{dots}</g>
      <g fill="none" stroke="var(--accent)" strokeWidth="1">
        <circle cx="120" cy="50" r="28" />
        <circle cx="120" cy="50" r="18" strokeDasharray="3 3" />
        <circle cx="120" cy="50" r="4" fill="var(--accent)" />
        <line x1="120" y1="14" x2="120" y2="26" />
        <line x1="120" y1="74" x2="120" y2="86" />
        <line x1="84" y1="50" x2="96" y2="50" />
        <line x1="144" y1="50" x2="156" y2="50" />
      </g>
      <text x="120" y="52" textAnchor="middle" fontSize="7" fill="#0a0a0b" fontFamily="var(--f-mono)" fontWeight="700">ICP</text>
    </svg>);

}

function IllusPipeline() {
  return (
    <svg viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <line x1="10" y1="85" x2="230" y2="85" stroke="rgba(242,242,240,0.35)" strokeWidth="0.5" strokeDasharray="2 3" />
      <g>
        <rect x="20" y="65" width="24" height="20" fill="rgba(186,139,142,0.15)" stroke="var(--accent)" strokeWidth="1" />
        <rect x="58" y="52" width="24" height="33" fill="rgba(186,139,142,0.20)" stroke="var(--accent)" strokeWidth="1" />
        <rect x="96" y="38" width="24" height="47" fill="rgba(186,139,142,0.25)" stroke="var(--accent)" strokeWidth="1" />
        <rect x="134" y="24" width="24" height="61" fill="rgba(186,139,142,0.30)" stroke="var(--accent)" strokeWidth="1" />
        <rect x="172" y="10" width="24" height="75" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1" />
      </g>
      <g fill="rgba(242,242,240,0.5)" fontSize="8" fontFamily="var(--f-mono)" textAnchor="middle">
        <text x="32" y="96">W1</text>
        <text x="70" y="96">W4</text>
        <text x="108" y="96">W8</text>
        <text x="146" y="96">W10</text>
        <text x="184" y="96">W12</text>
      </g>
      <g transform="translate(184, 4)">
        <path d="M 0 0 L 12 0 L 16 4 L 12 8 L 0 8 Z" fill="#0a0a0b" stroke="var(--accent)" strokeWidth="1" />
      </g>
      <g stroke="var(--accent)" fill="none" strokeWidth="1">
        <path d="M 215 30 L 225 18" />
        <polyline points="225 18 225 24 219 24" />
      </g>
    </svg>);

}

function WhyLeadwise() {
  const cards = [
  { Illus: IllusDoneForYou, title: "Done-for-you system", body: "We build and manage the entire outbound engine so you can focus on closing — from infrastructure to deliverability to daily sends." },
  { Illus: IllusPrecision, title: "Precision targeting", body: "ICP-led prospecting means every lead matches your exact buyer profile — no spray-and-pray, no wasted touches." },
  { Illus: IllusPipeline, title: "Predictable pipeline", body: "A structured 12-week programme with clear milestones and measurable output — you always know what comes next." }];


  return (
    <section className="section" id="why">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ width: 20, height: 1, background: "var(--line)" }} />
            <span className="label-accent" style={{ fontSize: "18px" }}>WHY CHOOSE LEADWISE</span>
            <span style={{ width: 20, height: 1, background: "var(--line)" }} />
          </div>
          <h2 style={{ maxWidth: "18ch", margin: "0 auto" }}>
            Built for teams that need pipeline, <em style={{ fontStyle: "italic", color: "var(--accent)", fontFamily: "var(--f-display)" }}>through signal-driven systems. </em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {cards.map((c, i) =>
          <Frame key={i} style={{ padding: "36px 32px 40px", minHeight: 340 }}>
              <div style={{ height: 110, marginBottom: 28, border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", padding: 10 }}>
                <c.Illus />
              </div>
              <h3 style={{ marginBottom: 12 }}>{c.title}</h3>
              <p style={{ color: "#ffffff", fontSize: 14, maxWidth: "34ch" }}>{c.body}</p>
            </Frame>
          )}
        </div>

        {/* ── TAM MAPPING ADD-ON ──────────────────────────── */}
        <div style={{ marginTop: 56, position: "relative" }}>
          {/* Connector line + label */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, justifyContent: "center" }}>
            <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--f-mono)", letterSpacing: "0.22em", color: "#ba8b8e", textTransform: "uppercase", fontSize: "13.5px" }}>
              <span style={{ width: 6, height: 6, background: "#ba8b8e", display: "inline-block" }} />
              Foundational layer
              <span style={{ width: 6, height: 6, background: "#ba8b8e", display: "inline-block" }} />
            </span>
            <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
          </div>

          <div style={{
            position: "relative",
            border: "1px solid var(--line)",
            background: "rgba(186,139,142,0.04)",
            padding: "32px 40px",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
            gap: 48,
            alignItems: "center"
          }}>
            <span className="crop-tl"></span>
            <span className="crop-tr"></span>
            <span className="crop-bl"></span>
            <span className="crop-br"></span>

            {/* Left: copy */}
            <div>
              <div className="hint" style={{ marginBottom: 14, color: "#ba8b8e", letterSpacing: "0.22em" }}>
                ▲ TAM MAPPING
              </div>
              <h3 style={{ fontSize: 28, lineHeight: 1.15, marginBottom: 14, fontWeight: 400 }}>
                Know the size of your <em style={{ fontStyle: "italic", color: "#ba8b8e", fontFamily: "var(--f-display)", fontWeight: 300 }}>real</em> addressable market.
              </h3>
              <p style={{ color: "#ffffff", fontSize: 14, lineHeight: 1.6, maxWidth: "60ch" }}>Before a single email goes out, we map your entire addressable market and every account that actually fits your ICP. Then we break it down by signal relevance, geography, and buying stage. You see exactly how many companies are worth reaching, and more importantly, where the real intent sits.

              </p>
            </div>

            {/* Right: schematic stats */}
            <div style={{
              border: "1px solid var(--line)",
              background: "rgba(0,0,0,0.25)",
              padding: 22,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
              position: "relative"
            }}>
              {[
              { k: "TAM", v: "12,480", sub: "ACCOUNTS" },
              { k: "SAM", v: "3,210", sub: "ICP-FIT" },
              { k: "SOM", v: "640", sub: "SIGNAL-ACTIVE" },
              { k: "TIER-1", v: "120", sub: "PRIORITY NOW" }].
              map((s, i) =>
              <div key={s.k} style={{
                padding: "14px 16px",
                borderRight: i % 2 === 0 ? "1px solid var(--line)" : "none",
                borderBottom: i < 2 ? "1px solid var(--line)" : "none"
              }}>
                  <div className="mono" style={{ fontSize: 10, color: "#ba8b8e", letterSpacing: "0.18em", marginBottom: 6 }}>{s.k}</div>
                  <div style={{ fontFamily: "var(--f-display)", fontWeight: 300, fontSize: 30, color: "var(--fg)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 4 }}>
                    {s.v}
                  </div>
                  <div className="mono" style={{ fontSize: 9.5, color: "var(--fg-faint)", letterSpacing: "0.14em" }}>{s.sub}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}

Object.assign(window, { HowItWorks, Workflow, WhyLeadwise });