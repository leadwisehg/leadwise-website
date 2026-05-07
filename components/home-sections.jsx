/* global React, Frame, SectionLabel, TargetMarker, Pill, Arrow, BracketIcon */

function LogoStrip() {
  const names = ["LOPHER", "LEWIS ACCESS", "MC AAL", "SNR PARTNERS", "TOWERS & SANDERS", "FRMWRK HOUSE", "BLACKWOOD", "HASSOCK WOOD"];
  return (
    <section style={{ padding: "60px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 10, minWidth: 220 }}>
          <span className="label-accent">[ 00.1 ]</span>
          <span className="label">Teams that trust LeadWise AI</span>
        </div>
        <div style={{ flex: 1, overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
          <div className="marquee mono" style={{ fontSize: 14, letterSpacing: "0.2em", color: "#ffffff", textTransform: "uppercase" }}>
            {[...names, ...names, ...names].map((n, i) =>
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 40 }}>
                {n}<span style={{ color: "var(--accent)", marginLeft: 20 }}>◆</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────
// METHOD — Signals sneak peek (4 of the strongest)
// ─────────────────────────────────────────────────────────

const METHOD_STEPS = [
{
  n: "01",
  code: "SIG.001",
  cat: "PEOPLE",
  title: "Open critical leadership role",
  body: "Open roles like COO, Plant Manager, Production Manager signal immediate execution gaps, often requiring fast external support.",
  annot: "LINKEDIN JOBS · INDEED",
  readout: [
  ["Strength", "94 / 100"],
  ["Latency", "< 6h"],
  ["Window", "30–60 days"]]

},
{
  n: "02",
  code: "SIG.002",
  cat: "PEOPLE",
  title: "VP-level role change",
  body: "Director+ joins and exits in your target functions. The strongest single trigger for a discovery call within 30 days — a new operator wants to make a mark, fast.",
  annot: "LINKEDIN · APOLLO",
  readout: [
  ["Strength", "95 / 100"],
  ["Latency", "< 6h"],
  ["Window", "30 days"]]

},
{
  n: "03",
  code: "SIG.003",
  cat: "PUBLIC",
  title: "Expansion / Growth phase",
  body: "New markets, site / office openings, or rapid hiring indicate scaling pressure, where teams often need external expertise to execute without slowing down.",
  annot: "PRESS RELEASE · LOCAL NEWS · COMPANY SITE",
  readout: [
  ["Strength", "90 / 100"],
  ["Latency", "< 24h"],
  ["Window", "60–120 days"]]

},
{
  n: "04",
  code: "SIG.004",
  cat: "CAPITAL",
  title: "M&A event",
  body: "Acquisitions, carve-outs, or restructuring phases create operational friction, increasing the likelihood of engaging external support to stabilize execution.",
  annot: "FINANCIAL NEWS · PRESS · PE / VC REPORTS",
  readout: [
  ["Strength", "96 / 100"],
  ["Latency", "< 12h"],
  ["Window", "90–120 days"]]

}];


function Method({ onNav }) {
  return (
    <section id="how" className="section">
      <div className="container">
        <SectionLabel index="[ 05 / SIGNALS ]" title="· A SNEAK PEEK" meta="4 OF 40+ IN THE LIBRARY" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0, marginBottom: 40 }}>
          <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ marginBottom: 28, color: "rgb(255, 255, 255)" }}>
              Take a look at the signals driving our outreach engine.<br />
              <span style={{ color: "var(--fg-dim)" }}></span>
            </h2>
          </div>
        </div>

        <div className="signals-marquee" style={{ position: "relative", overflow: "hidden", paddingTop: 16, paddingBottom: 8 }}>
          <div className="signals-track" style={{
            display: "flex",
            gap: 28,
            width: "max-content",
            animation: "signalMarquee 40s linear infinite"
          }}>
            {[...METHOD_STEPS, ...METHOD_STEPS].map((s, i) =>
            <div key={i} style={{ width: "calc((100vw - 2 * var(--container-pad, 32px)) / 2 - 14px)", maxWidth: 600, flex: "0 0 auto" }}>
                <Frame label={s.code} meta={s.annot} style={{ padding: 32, minHeight: 260, height: "100%" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 20, height: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <BracketIcon size={32}>
                        <span style={{ color: "var(--accent)", fontFamily: "var(--f-mono)", fontSize: 11 }}>{s.n}</span>
                      </BracketIcon>
                      <span className="hint" style={{ transform: "rotate(0deg)" }}>{s.cat}</span>
                    </div>

                    <h3 style={{ color: "var(--fg)" }}>{s.title}</h3>
                    <p style={{ color: "var(--fg-dim)", maxWidth: "58ch", flex: 1 }}>{s.body}</p>

                    <div style={{ display: "flex", gap: 40, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
                      {s.readout.map(([k, v]) =>
                    <div key={k}>
                          <div className="hint" style={{ marginBottom: 4 }}>{k}</div>
                          <div className="mono" style={{ color: "var(--fg)", fontSize: 14, letterSpacing: "0.02em" }}>{v}</div>
                        </div>
                    )}
                    </div>
                  </div>
                </Frame>
              </div>
            )}
          </div>
          <style>{`
            @keyframes signalMarquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .signals-marquee:hover .signals-track { animation-play-state: paused; }
          `}</style>
        </div>

        {/* Section CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 64 }}>
          <a href="#" onClick={(e) => {e.preventDefault();onNav && onNav('signals');}} className="btn btn-primary" style={{ fontSize: 15, padding: "20px 36px", letterSpacing: "0.18em" }}>
            Explore the full Signals library <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────
// STATS — grounded openers (email + reasoning)
// ─────────────────────────────────────────────────────────

function Stats({ onNav }) {
  const bullets = [
  "Grounded drafts with source citations",
  "Peer comparables from your own closed-won",
  "Edit-in-place and approve with one click"];

  const sources = ["PR Newswire", "LinkedIn", "SEC filing"];

  return (
    <section className="section">
      <div className="container">
        <SectionLabel index="[ 06 / CONTEXT STUDIO ]" title="· GROUNDED OPENERS" />
        {/* ── Template → Generated (stacked) + copy ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Two email boxes stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <RawTemplateEmail />
            <GeneratedEmail />
          </div>

          {/* Right-side copy */}
          <div>
            <span className="label-accent" style={{ marginBottom: 20, display: "inline-block" }}>
              // TEMPLATE → GENERATED
            </span>
            <h2 style={{
              marginBottom: 24,
              fontSize: "clamp(40px, 4.5vw, 64px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05
            }}>
              Bespoke,{" "}
              <em style={{ fontFamily: "var(--f-display)", fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>
                scalable
              </em>{" "}
              outreach.
            </h2>
            <p style={{ color: "var(--fg-dim)", maxWidth: "52ch", marginBottom: 16, fontSize: 15.5, lineHeight: 1.6 }}>
              Every draft uses the signal as context and generates AI snippets. No hallucinated context.
            </p>
            <p style={{ color: "var(--fg-dim)", maxWidth: "52ch", marginBottom: 28, fontSize: 15.5, lineHeight: 1.6 }}>
              If no recent signal or event is found, we drop the prospect.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, borderTop: "1px solid var(--line)", paddingTop: 24, marginBottom: 32 }}>
              {[
              "Grounded drafts with relevant and unique snippets",
              "Ongoing A/B testing — syntax, approach, subject line",
              "2–3 email sequence (long sequences kill momentum and relevancy)"].
              map((b) =>
              <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <span style={{
                  width: 18, height: 18, flexShrink: 0,
                  border: "1px solid var(--accent)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginTop: 2
                }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span style={{ color: "var(--fg)", fontSize: 15 }}>{b}</span>
                </div>
              )}
            </div>
            <a href="#" onClick={(e) => {e.preventDefault();onNav && onNav("contact");}} className="btn btn-primary">
              Start building your pipeline <span className="arrow">→</span>
            </a>
          </div>
        </div>

      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────
// Raw template email (left of diptych)
// ─────────────────────────────────────────────────────────
function RawTemplateEmail() {
  const Token = ({ children }) =>
  <span style={{
    color: "var(--fg-faint)",
    fontFamily: "var(--f-mono)",
    fontSize: 12,
    background: "rgba(242,242,240,0.04)",
    padding: "1px 4px",
    border: "1px dashed var(--line)",
    whiteSpace: "nowrap"
  }}>{children}</span>;

  return (
    <div style={{
      border: "1px solid var(--line)",
      background: "var(--bg-2)",
      fontFamily: "var(--f-body)",
      position: "relative"
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "10px 14px",
        borderBottom: "1px solid var(--line)",
        background: "rgba(242,242,240,0.02)"
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(242,242,240,0.18)" }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(242,242,240,0.18)" }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(242,242,240,0.18)" }} />
        <span className="mono" style={{ marginLeft: 10, fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.06em" }}>
          TEMPLATE · RAW
        </span>
      </div>

      {/* To: */}
      <div style={{
        display: "grid", gridTemplateColumns: "62px 1fr", gap: 10,
        padding: "12px 16px",
        borderBottom: "1px solid var(--line)",
        alignItems: "baseline"
      }}>
        <span className="mono" style={{ fontSize: 10.5, color: "var(--fg-faint)", letterSpacing: "0.08em" }}>To:</span>
        <span className="mono" style={{ fontSize: 12, color: "var(--fg)" }}>jane.wu@precisionmetal.com</span>
      </div>

      {/* Subject */}
      <div style={{
        display: "grid", gridTemplateColumns: "62px 1fr", gap: 10,
        padding: "10px 16px 12px",
        borderBottom: "1px solid var(--line)",
        alignItems: "baseline"
      }}>
        <span className="mono" style={{ fontSize: 10.5, color: "var(--fg-faint)", letterSpacing: "0.08em" }}>Subject:</span>
        <span style={{ fontFamily: "var(--f-display)", fontSize: 14.5, color: "var(--fg)", lineHeight: 1.35 }}>
          12 open roles, capacity under pressure?
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 16px 16px", fontSize: 13, lineHeight: 1.7, color: "var(--fg-dim)" }}>
        <p style={{ margin: "0 0 10px" }}>Hi <Token>{"{{firstName}}"}</Token>,</p>
        <p style={{ margin: "0 0 10px" }}>
          Saw that <Token>{"{{company}}"}</Token> is currently <Token>{"{{signal_event}}"}</Token>.
        </p>
        <p style={{ margin: "0 0 10px" }}>
          <Token>{"{{bridge_sentence_relating_pain}}"}</Token>.
        </p>
        <p style={{ margin: "0 0 10px" }}>
          We've helped <Token>{"{{competitor}}"}</Token> <Token>{"{{solution_outcome}}"}</Token>.
        </p>
        <p style={{ margin: "0 0 10px" }}><Token>{"{{CTA}}"}</Token></p>
        <p style={{ margin: 0 }}><Token>{"{{signature}}"}</Token></p>
      </div>
    </div>);

}

// ─────────────────────────────────────────────────────────
// Generated email (right of diptych)
// ─────────────────────────────────────────────────────────
function GeneratedEmail() {
  const Snippet = ({ children }) =>
  <span style={{
    background: "var(--accent-faint)",
    color: "var(--accent)",
    padding: "1px 5px",
    border: "1px solid var(--accent-dim)",
    fontSize: 12.5,
    fontFamily: "var(--f-mono)",
    letterSpacing: "0.01em"
  }}>{children}</span>;

  return (
    <div style={{
      border: "1px solid var(--accent-dim)",
      background: "var(--bg-2)",
      fontFamily: "var(--f-body)",
      position: "relative",
      boxShadow: "0 0 0 1px var(--accent-dim) inset"
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "10px 14px",
        borderBottom: "1px solid var(--line)",
        background: "rgba(242,242,240,0.02)"
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)" }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(242,242,240,0.18)" }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(242,242,240,0.18)" }} />
        <span className="mono" style={{ marginLeft: 10, fontSize: 10, color: "var(--accent)", letterSpacing: "0.06em" }}>
          GENERATED · GROUNDED IN SIGNAL
        </span>
      </div>

      {/* To: */}
      <div style={{
        display: "grid", gridTemplateColumns: "62px 1fr", gap: 10,
        padding: "12px 16px",
        borderBottom: "1px solid var(--line)",
        alignItems: "baseline"
      }}>
        <span className="mono" style={{ fontSize: 10.5, color: "var(--fg-faint)", letterSpacing: "0.08em" }}>To:</span>
        <span className="mono" style={{ fontSize: 12, color: "var(--fg)" }}>jane.wu@precisionmetal.com</span>
      </div>

      {/* Subject */}
      <div style={{
        display: "grid", gridTemplateColumns: "62px 1fr", gap: 10,
        padding: "10px 16px 12px",
        borderBottom: "1px solid var(--line)",
        alignItems: "baseline"
      }}>
        <span className="mono" style={{ fontSize: 10.5, color: "var(--fg-faint)", letterSpacing: "0.08em" }}>Subject:</span>
        <span style={{ fontFamily: "var(--f-display)", fontSize: 14.5, color: "var(--fg)", lineHeight: 1.35 }}>
          12 open roles, capacity under pressure?
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 16px 16px", fontSize: 13, lineHeight: 1.7, color: "var(--fg-dim)" }}>
        <p style={{ margin: "0 0 10px" }}>Hi Jane,</p>
        <p style={{ margin: "0 0 10px" }}>
          Saw that <Snippet>Precision Metal</Snippet> is currently{" "}
          <Snippet>running without a production manager</Snippet>.
        </p>
        <p style={{ margin: "0 0 10px" }}>
          These roles are critical and usually leads to a drop in efficiency and quality.
        </p>
        <p style={{ margin: "0 0 10px" }}>
          We've helped <Snippet>Atlas Metal Systems</Snippet> maintain production continuity with an interim manager who took over immediately while the permanent hire is being secured.
        </p>
        <p style={{ margin: 0, color: "var(--fg)" }}>Worth a 15 minutes call?</p>
      </div>
    </div>);

}

// ─────────────────────────────────────────────────────────
// ICP — who we build for
// ─────────────────────────────────────────────────────────

const ICPs = [
{
  code: "ICP/01",
  title: "B2B firms with high-value, long-cycle offers",
  body: "A steady flow of qualified opportunities.\nCompanies undergoing exec changes, restructurings, carve-outs, or growth phases where interim leadership is the right intervention.",
  signals: ["CFO/CEO departure", "PE acquisition", "Restructuring filing", "Rapid headcount shift", "New investor mandate"]
},
{
  code: "ICP/02",
  title: "Interim management & executive search",
  body: "Finance, insurance, complex services.\nSectors where a $50K+ ACV depends on reaching a human at exactly the right moment, with the right framing of a real problem.",
  signals: ["Funding event", "Hiring spike in fn.", "Tech stack change", "Market expansion", "Regulatory trigger"]
}];


// Minimal line-icon set for ICP target categories
function IcpIconExec() {
  return (
    <svg viewBox="0 0 120 80" fill="none" stroke="#ba8b8e" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "auto" }}>
      <circle cx="60" cy="28" r="11" />
      <path d="M40 66c4-12 12-18 20-18s16 6 20 18" />
      <path d="M22 70h76" stroke="rgba(186,139,142,0.45)" strokeDasharray="2 3" />
      <circle cx="28" cy="40" r="4" />
      <circle cx="92" cy="40" r="4" />
      <path d="M28 44v8M92 44v8" />
    </svg>);

}
function IcpIconHighValue() {
  return (
    <svg viewBox="0 0 120 80" fill="none" stroke="#ba8b8e" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "auto" }}>
      <rect x="22" y="26" width="76" height="40" />
      <path d="M22 38h76" />
      <circle cx="60" cy="52" r="8" />
      <path d="M60 48v8M56 52h8" />
      <path d="M30 18v8M48 14v12M72 14v12M90 18v8" />
    </svg>);

}
function IcpIconLongCycle() {
  return (
    <svg viewBox="0 0 120 80" fill="none" stroke="#ba8b8e" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "auto" }}>
      <circle cx="60" cy="40" r="22" />
      <path d="M60 18v22l14 8" />
      <path d="M22 40h6M92 40h6M60 8v6M60 66v6" stroke="rgba(186,139,142,0.6)" />
    </svg>);

}
function IcpIconRestructure() {
  return (
    <svg viewBox="0 0 120 80" fill="none" stroke="#ba8b8e" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "auto" }}>
      <rect x="20" y="22" width="22" height="14" />
      <rect x="78" y="22" width="22" height="14" />
      <rect x="20" y="50" width="22" height="14" />
      <rect x="78" y="50" width="22" height="14" />
      <path d="M42 29h36M42 57h36" stroke="rgba(186,139,142,0.6)" />
      <path d="M60 36v8" />
      <path d="M56 40l4 4 4-4" />
    </svg>);

}

const ICP_TARGETS = [
{ n: "001", Icon: IcpIconExec, title: "Interim management & executive search", body: "Firms placing senior leaders into roles where speed and discretion decide the outcome." },
{ n: "002", Icon: IcpIconHighValue, title: "B2B firms with high-value offers", body: "Finance, insurance, complex services — where a $50K+ ACV depends on reaching a human at the right moment." },
{ n: "003", Icon: IcpIconLongCycle, title: "Long sales-cycle businesses", body: "Multi-stakeholder buying with months of evaluation, where signal-driven timing compounds into pipeline." }];


function ICPSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionLabel index="[ 04 / BUILT FOR ]" title="· WHO WE TARGET" meta="3 CORE SEGMENTS" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 320px))", gap: 48, marginTop: 32, justifyContent: "center" }}>
          {ICP_TARGETS.map((p) =>
          <div key={p.n} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "rgba(255,255,255,0.55)" }}>{p.n}</div>
              <div style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <div style={{ width: "70%" }}><p.Icon /></div>
              </div>
              <h3 style={{ fontSize: 20, lineHeight: 1.25, color: "#ba8b8e", fontWeight: 400, marginTop: 4 }}>{p.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.55, maxWidth: "32ch" }}>{p.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

Object.assign(window, { LogoStrip, Method, Stats, ICPSection });