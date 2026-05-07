/* global React, Footer, Arrow,
   LivePipelinePanel, EngagementTimeline, SignalEngineTerminal,
   ContextStudioOutbound, QualifiedCalendar */

// ─────────────────────────────────────────────────────────
// OUTBOUND PAGE — flowing top-down narrative
// Section order:
//   1. Hero                — H1 + Live Pipeline panel
//   2. Engagement Timeline — 6-stage flow (signal → reply)
//   3. Signal Engine       — live terminal (what fires stage 1)
//   4. Context Studio      — grounded openers (what stage 4 produces)
//   5. Qualified Pipeline  — calendar (what stage 6 yields)
//   6. Who this is for     — closing prose
// Each section connects via a downward FlowConnector.
// ─────────────────────────────────────────────────────────

// ── Downward connector: vertical dashed line + chevron + label.
// Sits between sections so the page reads as one process.
function FlowConnector({ label }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      padding: "8px 0 16px",
      pointerEvents: "none"
    }} aria-hidden>
      <div style={{
        width: 1,
        height: 56,
        background: "linear-gradient(to bottom, transparent, var(--accent-dim) 30%, var(--accent) 100%)"
      }} />
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
        <path d="M1 1 L7 8 L13 1" stroke="var(--accent)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label &&
      <span className="mono" style={{
        fontSize: 9.5,
        letterSpacing: "0.22em",
        color: "var(--fg-faint)",
        textTransform: "uppercase",
        marginTop: 4
      }}>
          {label}
        </span>
      }
    </div>);

}

function OutboundPage({ onNav }) {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section style={{ paddingTop: 80, paddingBottom: 40 }}>
        <div className="container">
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 48
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="label-accent">[ SERVICES / OUTBOUND SYSTEMS ]</span>
              <span className="hint">SUPERCHARGED OUTREACH · BUILD 2.4-LW-AI</span>
            </div>
            <span className="hint">12-WEEK FOUNDATION · 6-MONTH SCALE</span>
          </div>

          <div className="ob-hero-grid" style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 1fr",
            gap: 56,
            alignItems: "end"
          }}>
            <h1 style={{
              fontFamily: "var(--f-display)",
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              fontSize: "clamp(40px, 5.2vw, 76px)",
              margin: 0,
              textAlign: "left"
            }}>
              Build your pipeline in 12 weeks,<br />
              then scale with ongoing optimization.
            </h1>

            <LivePipelinePanel />
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .ob-hero-grid {
              grid-template-columns: 1fr !important;
              align-items: stretch !important;
            }
          }
        `}</style>
      </section>

      {/* hero → timeline */}
      <div className="container"><FlowConnector label="The 6-stage flow" /></div>

      {/* ── 1. Engagement Timeline = signal → send → reply ── */}
      <EngagementTimeline />

      {/* timeline → signal engine (zoom into stage 01) */}
      <div className="container"><FlowConnector label="↓  Stage 01 · what fires the trigger" /></div>

      {/* ── 2. Signal Engine ─────────────────────────────── */}
      <SignalEngineTerminal />

      {/* signal engine → context studio (zoom into stage 04) */}
      <div className="container"><FlowConnector label="↓  Stage 04 · what we send" /></div>

      {/* ── 3. Context Studio ────────────────────────────── */}
      <ContextStudioOutbound onNav={onNav} />

      {/* context studio → calendar (zoom into stage 06) */}
      <div className="container"><FlowConnector label="↓  Stage 06 · what lands on your calendar" /></div>

      {/* ── 4. Qualified pipeline calendar ───────────────── */}
      <QualifiedCalendar />

      {/* calendar → why-it-matters */}
      <div className="container"><FlowConnector label="The 6-month horizon" /></div>

      {/* ── 5. Who this is for — prose ───────────────────── */}
      <WhyItMatters onNav={onNav} />

      <Footer onNav={onNav} />
    </>);

}

// ─── Who this is for / why the 6-month horizon — prose section ─
function WhyItMatters({ onNav }) {
  const points = [
  {
    n: "01",
    t: "Outbound campaigns need time to mature",
    b: "The first 12 weeks are essential to building the system — clean data, warm domains, tuned sequences. None of that pays off in week one."
  },
  {
    n: "02",
    t: "The real value is in the next 6 months",
    b: "Once the foundation is in place, ongoing optimization compounds. Reply rates rise, signal libraries deepen, attribution gets tighter."
  },
  {
    n: "03",
    t: "Predictable pipeline, not lucky leads",
    b: "After 6 months your pipeline is forecastable. We commit to monthly meeting and pipeline targets, and report against them in plain language."
  }];


  return (
    <section className="section" style={{ paddingTop: 40, paddingBottom: 96 }}>
      <div className="container">
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 36
        }}>
          <span className="label-accent" style={{ fontSize: 10 }}>[ 05 / WHO THIS IS FOR ]</span>
          <span className="hint">3 REASONS · THE 6-MONTH HORIZON</span>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.2fr",
          gap: 60, alignItems: "start"
        }}>
          <div>
            <h3 style={{
              fontFamily: "var(--f-display)",
              fontWeight: 300,
              fontSize: "clamp(32px, 4vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              margin: 0,
              marginBottom: 18
            }}>
              Why our 6-month approach is key to consistent growth.
            </h3>
            <p style={{
              color: "var(--fg-dim)",
              fontSize: 15.5,
              lineHeight: 1.65,
              maxWidth: "46ch",
              margin: 0,
              marginBottom: 28
            }}>
              The 12-week phase is the build. The next 6 months are where outbound
              stops being a project and starts being an asset — predictable, tunable,
              and yours.
            </p>
            <a
              href="#"
              onClick={(e) => {e.preventDefault();onNav && onNav("contact");}}
              className="btn btn-primary">
              
              Start building your pipeline <span className="arrow">→</span>
            </a>
          </div>
          <div style={{
            display: "flex", flexDirection: "column", gap: 0,
            border: "1px solid var(--line)"
          }}>
            {points.map((p, i) =>
            <div key={p.n} style={{
              padding: "30px 32px",
              borderBottom: i < points.length - 1 ? "1px solid var(--line)" : "none",
              display: "grid",
              gridTemplateColumns: "60px 1fr",
              gap: 24,
              alignItems: "start"
            }}>
                <span className="mono" style={{
                color: "var(--accent)", fontSize: 11, letterSpacing: "0.18em"
              }}>
                  {p.n}
                </span>
                <div>
                  <h4 style={{
                  fontFamily: "var(--f-display)",
                  fontWeight: 400,
                  fontSize: 20,
                  lineHeight: 1.25,
                  margin: 0,
                  marginBottom: 10
                }}>
                    {p.t}
                  </h4>
                  <p style={{
                  color: "var(--fg-dim)",
                  fontSize: 14,
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: "58ch"
                }}>
                    {p.b}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

Object.assign(window, { OutboundPage });