/* global React, Frame, SectionLabel, Arrow, FooterCTA */

// ─────────────────────────────────────────────────────────
// SIGNALS LIBRARY
// ─────────────────────────────────────────────────────────

const SIGNALS = [
{ code: "SIG.001", name: "Open critical leadership role", cat: "People", sources: "LinkedIn Jobs, company careers page", lat: "< 6h", desc: "Open roles like COO, Plant Manager, or Head of Sales signal immediate execution gaps requiring external support.", strength: 94 },
{ code: "SIG.002", name: "Leadership departure (unfilled)", cat: "People", sources: "LinkedIn, press releases", lat: "< 24h", desc: "Recent departure of a key leader without replacement often creates urgent operational instability and short-term need for support.", strength: 96 },
{ code: "SIG.003", name: "Executive leadership change (new hire)", cat: "People", sources: "LinkedIn, company announcements", lat: "< 6h", desc: "New executives bring new priorities and are most receptive to external partners within their first 90 days.", strength: 92 },
{ code: "SIG.004", name: "M&A / acquisition event", cat: "Capital", sources: "Financial press, press releases", lat: "< 12h", desc: "Acquisitions trigger integration challenges, leadership gaps, and restructuring phases requiring external operational support.", strength: 96 },
{ code: "SIG.005", name: "Private equity investment", cat: "Capital", sources: "Pitchbook, press, PE reports", lat: "< 24h", desc: "PE-backed companies enter acceleration phases with strong pressure on execution and leadership performance.", strength: 91 },
{ code: "SIG.006", name: "Operational restructuring", cat: "Public", sources: "Press, internal announcements", lat: "< 24h", desc: "Internal restructuring signals inefficiencies or performance issues, often requiring external expertise to stabilize operations.", strength: 93 },
{ code: "SIG.007", name: "Expansion / new site opening", cat: "Public", sources: "Press releases, local news", lat: "< 24h", desc: "New site launches create execution pressure and coordination challenges, often exposing leadership and operational gaps.", strength: 90 },
{ code: "SIG.008", name: "Production capacity increase", cat: "Public", sources: "Industry news, company updates", lat: "< 48h", desc: "New lines or capacity expansions increase operational complexity and require strong on-site leadership to maintain performance.", strength: 89 },
{ code: "SIG.009", name: "Critical function hiring spike", cat: "Hiring", sources: "LinkedIn Jobs, careers pages", lat: "Daily", desc: "Sudden increase in hiring for operations or sales indicates scaling pressure and upcoming execution challenges.", strength: 85 },
{ code: "SIG.010", name: "Long time-to-fill critical role", cat: "Hiring", sources: "LinkedIn, job boards", lat: "Weekly", desc: "Roles open for 60+ days signal hiring difficulty and often justify interim or external support solutions.", strength: 93 },
{ code: "SIG.011", name: "New market entry", cat: "Public", sources: "Press, company announcements", lat: "< 48h", desc: "Entering a new geography or segment introduces execution risks and operational complexity requiring external support.", strength: 88 },
{ code: "SIG.012", name: "Turnaround situation (performance decline)", cat: "Public", sources: "Press, industry reports", lat: "Weekly", desc: "Signs of declining performance or restructuring often indicate urgent need for external operational or strategic support.", strength: 95 },
{ code: "SIG.013", name: "Major client win / contract secured", cat: "Public", sources: "Press releases, LinkedIn", lat: "< 24h", desc: "Winning large contracts creates delivery pressure and scaling challenges requiring immediate operational reinforcement.", strength: 87 },
{ code: "SIG.014", name: "Large contract renewal / extension", cat: "Public", sources: "Press, company news", lat: "< 48h", desc: "Renewals signal long-term commitments requiring stability and performance, often exposing operational gaps.", strength: 84 },
{ code: "SIG.015", name: "Board or ownership change", cat: "Capital", sources: "Press, filings", lat: "< 24h", desc: "New ownership or board members often drive strategic shifts and reassessment of external partners.", strength: 90 },
{ code: "SIG.016", name: "Internal transformation program", cat: "Public", sources: "Press, company communications", lat: "Weekly", desc: "Announcements of transformation or optimization initiatives signal internal gaps and need for execution support.", strength: 88 },
{ code: "SIG.017", name: "Supply chain disruption / issue", cat: "Public", sources: "Industry news, press", lat: "< 24h", desc: "Operational disruptions create immediate need for experienced leadership to stabilize processes and maintain output.", strength: 91 },
{ code: "SIG.018", name: "Regulatory / compliance pressure", cat: "Regulatory", sources: "Regulatory updates, press", lat: "< 24h", desc: "New regulations force companies to adapt quickly, often requiring external expertise and leadership.", strength: 86 },
{ code: "SIG.019", name: "Operational incident / downtime", cat: "Public", sources: "News, local reports", lat: "< 12h", desc: "Production issues or downtime events signal immediate operational instability and urgent need for intervention.", strength: 92 },
{ code: "SIG.020", name: "Strategic partnership announcement", cat: "Public", sources: "Press releases, LinkedIn", lat: "< 24h", desc: "New partnerships often precede scaling efforts and execution pressure requiring additional support.", strength: 82 },
{ code: "SIG.021", name: "Plant or site leadership vacancy", cat: "People", sources: "LinkedIn, company announcements", lat: "< 12h", desc: "A plant or site director role left vacant creates immediate operational risk and need for experienced interim leadership.", strength: 95 },
{ code: "SIG.022", name: "Underperforming business unit", cat: "Public", sources: "Press, financial updates", lat: "Weekly", desc: "Reports of declining performance in a division often lead to restructuring efforts and demand for external operational expertise.", strength: 93 },
{ code: "SIG.023", name: "Post-acquisition integration phase", cat: "Capital", sources: "Press releases, M&A news", lat: "< 48h", desc: "After acquisition close, companies face integration challenges across teams, systems, and leadership — requiring external support.", strength: 96 },
{ code: "SIG.024", name: "New executive mandate / transformation plan", cat: "Public", sources: "Press, LinkedIn posts", lat: "< 24h", desc: "New leadership announcing transformation or optimization plans signals upcoming execution gaps and need for support.", strength: 91 },
{ code: "SIG.025", name: "Operational cost reduction initiative", cat: "Public", sources: "Press, company updates", lat: "Weekly", desc: "Cost-cutting programs often indicate inefficiencies and restructuring needs, creating demand for external operational expertise.", strength: 89 },
{ code: "SIG.026", name: "Delayed or failed hiring process", cat: "Hiring", sources: "Job boards, LinkedIn", lat: "Weekly", desc: "Repeated or extended hiring for the same critical role signals difficulty filling the position and need for interim solutions.", strength: 94 },
{ code: "SIG.027", name: "New production contract ramp-up", cat: "Public", sources: "Press, LinkedIn announcements", lat: "< 24h", desc: "Securing a major production contract creates immediate pressure to scale operations and maintain delivery performance.", strength: 90 },
{ code: "SIG.028", name: "Management team reshuffle", cat: "People", sources: "LinkedIn, press releases", lat: "< 24h", desc: "Multiple leadership changes at once signal instability and create opportunities for external support during transition phases.", strength: 92 },
{ code: "SIG.029", name: "Carve-out / spin-off operation", cat: "Capital", sources: "Financial news, press", lat: "< 48h", desc: "Separating a business unit creates operational complexity and leadership gaps requiring temporary external support.", strength: 95 },
{ code: "SIG.030", name: "Rapid revenue growth phase", cat: "Public", sources: "Press, company updates", lat: "Weekly", desc: "Fast growth often outpaces internal capabilities, creating gaps in execution and need for experienced external operators.", strength: 87 }];


const SIG_CATS = ["All", "People", "Capital", "Public", "Hiring", "Regulatory"];

function SignalsPage({ onNav }) {
  const [filter, setFilter] = React.useState("All");
  const filtered = SIGNALS.filter((s) => filter === "All" || s.cat === filter);

  return (
    <>
      <section style={{ paddingTop: 72, paddingBottom: 64 }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
            <span className="label-accent">[ TECH / SIGNALS LIBRARY ]</span>
            <span className="hint">{SIGNALS.length} SIGNAL TYPES · CONTINUOUSLY EXPANDING</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, alignItems: "end" }}>
            <h1 style={{ fontSize: "90px" }}>
              Signal Library<br />- Live and operational<br />
            </h1>
            <p className="lead" style={{ maxWidth: "44ch", paddingBottom: 14 }}>Every message we send is triggered by a real situation.
Below are the signals that consistently turn into conversations.


            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionLabel index="[ 01 / LIBRARY ]" title="· BROWSE BY CATEGORY" meta={`${filtered.length} / ${SIGNALS.length} SHOWN`} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 0, border: "1px solid var(--line)", marginBottom: 28 }}>
            {SIG_CATS.map((c, i) =>
            <button key={c} onClick={() => setFilter(c)} style={{
              padding: "12px 18px",
              background: filter === c ? "var(--accent-faint)" : "transparent",
              color: filter === c ? "var(--accent)" : "var(--fg-dim)",
              border: "none",
              borderRight: i < SIG_CATS.length - 1 ? "1px solid var(--line)" : "none",
              fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.14em",
              textTransform: "uppercase", cursor: "pointer"
            }}>{c}</button>
            )}
          </div>

          <div style={{ border: "1px solid var(--line)" }}>
            {filtered.map((s, i) =>
            <div key={s.code} style={{
              display: "grid", gridTemplateColumns: "120px 1.4fr 1fr 220px",
              padding: "26px 28px",
              borderBottom: i < filtered.length - 1 ? "1px solid var(--line)" : "none",
              gap: 32, alignItems: "start"
            }}>
                <div className="mono" style={{ color: "var(--accent)", fontSize: 12, letterSpacing: "0.1em" }}>{s.code}</div>
                <div>
                  <div style={{ fontFamily: "var(--f-display)", fontWeight: 300, fontSize: 22, marginBottom: 6 }}>{s.name}</div>
                  <div className="hint" style={{ marginBottom: 12 }}>{s.cat.toUpperCase()} · LATENCY {s.lat}</div>
                  <p style={{ color: "var(--fg-dim)", fontSize: 13, lineHeight: 1.6, maxWidth: "52ch" }}>{s.desc}</p>
                </div>
                <div>
                  <div className="hint" style={{ marginBottom: 6 }}>SOURCES</div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--fg-dim)", lineHeight: 1.6 }}>{s.sources}</div>
                </div>
                <div>
                  <div className="hint" style={{ marginBottom: 8 }}>P(MEETING) {s.strength}</div>
                  <div style={{ height: 4, background: "var(--line)", position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, width: `${s.strength}%`, background: "var(--accent)" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <FooterCTA onNav={onNav} />
    </>);

}

// ─────────────────────────────────────────────────────────
// OUTBOUND SYSTEMS — see components/outbound-page.jsx
// ─────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────
// MARKET INTELLIGENCE
// ─────────────────────────────────────────────────────────

const MI_DELIVERABLES = [
{ code: "01", t: "Market entry studies", b: "For product launches and geographic expansion. We quantify demand, segment the addressable market, and identify the accounts most likely to convert first — so the first 90 days aren't spent guessing." },
{ code: "02", t: "Competitive landscape", b: "Who's playing in your space, what they're selling, how they're positioned, and where the unclaimed ground is. Maps, not lists." },
{ code: "03", t: "Industry benchmarks", b: "Pricing, conversion rates, sales cycles, and GTM motions across your category. Know what \"good\" looks like before you measure yourself against it." },
{ code: "04", t: "Buyer timing intelligence", b: "When your ICP is most receptive. What triggers their evaluation cycles. Which market signals — funding, hiring, exec changes, M&A, restructuring — indicate active intent versus passive interest." },
{ code: "05", t: "Product-market fit diagnostics", b: "Before outbound scales, we test whether your offer resonates with a defined segment, and where it needs sharpening. Better to find out in week two than month six." }];

const MI_LAYERS = [
{ t: "Data", b: "Public datasets, proprietary enrichment, hand-collected research. The base layer." },
{ t: "Signals", b: "Real-time market events that change the picture: funding rounds, hiring patterns, executive changes, product launches, regulatory shifts. Recency rules." },
{ t: "Interpretation", b: "Strategic judgement on what the data means for your specific GTM. Not a generic report, a position." }];

const MI_AUDIENCE = [
{ t: "B2B Teams with long sales cycles", b: "Rely on timing to win deals. Targeting companies when a real need emerges, not months too early or too late. " },
{ t: "Interim & executive search firms", b: "Refuse to spray-and-pray and want a defensible thesis behind every campaign." },
{ t: "Industrial operators", b: "Navigate expansion, disruption, and execution pressure in real time. " }];


function IntelPage({ onNav }) {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
            <span className="label-accent">[ SERVICES / MARKET INTELLIGENCE ]</span>
            <span className="hint">RESEARCH-ONLY · VERSION 6.0.4-LW-BETA</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className="hint" style={{ color: "var(--accent)", letterSpacing: "0.18em", marginBottom: 22 }}>
                /// MARKET INTELLIGENCE
              </div>
              <h1 style={{ fontSize: "clamp(48px, 6.4vw, 104px)", lineHeight: 1.02, letterSpacing: "-0.02em", marginBottom: 32 }}>
                Know exactly where<br />you're going.<br />
                <span style={{ color: "var(--accent)" }}>And exactly when to move.</span>
              </h1>
              <p className="lead" style={{ maxWidth: "44ch", marginBottom: 28 }}>
                Market intelligence built for go-to-market decisions — product launches, market entry, competitive positioning, and timing. The strategic layer most outbound agencies skip.
              </p>
              <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                <a href="#" onClick={(e) => {e.preventDefault();onNav && onNav("contact");}} className="btn btn-primary">
                  Book a strategy session <Arrow />
                </a>
                <a href="#" onClick={(e) => {e.preventDefault();onNav && onNav("outbound");}} className="mono" style={{
                  fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "var(--fg)", textDecoration: "none", borderBottom: "1px solid var(--line)", paddingBottom: 4
                }}>
                  See how we work <Arrow />
                </a>
              </div>
            </div>
            <div>
              <IntelHeroGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 1 — THE THESIS ──────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionLabel index="[ 01 ]" title="THE THESIS" meta="UPSTREAM OF CAMPAIGNS" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "start" }}>
            <h2 style={{ fontSize: "clamp(32px, 3.4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.015em", maxWidth: "16ch" }}>
              Most outbound fails before the first email is sent.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 22, paddingTop: 8 }}>
              <p className="lead" style={{ maxWidth: "62ch" }}>Not because of bad copy. Because is was not the right timing.

              </p>
              <p style={{ color: "var(--fg-dim)", fontSize: 16, lineHeight: 1.65, maxWidth: "62ch" }}>Before a single message goes out, the territory has to be understood: the segment, the competition, the buyer behaviour, and the windows when attention is actually available. That work is upstream of campaigns and it's where most agencies have nothing to offer.

              </p>
              <p style={{ fontFamily: "var(--f-display)", fontWeight: 300, fontSize: 22, lineHeight: 1.4, color: "var(--fg)", borderLeft: "1px solid var(--accent)", paddingLeft: 20, marginTop: 10, maxWidth: "56ch" }}>LeadWise AI treats market intelligence as a deliverable, not a side note.

              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2 — WHAT WE DELIVER ─────────────────── */}
      <section className="section">
        <div className="container">
          <SectionLabel index="[ 02 ]" title="WHAT WE DELIVER" meta="FIVE ENGAGEMENTS" />
          <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.015em", marginBottom: 56, maxWidth: "22ch" }}>
            Different views, one outcome:{" "}
            <span style={{ color: "var(--accent)" }}>clarity before motion.</span>
          </h2>
          <div style={{ border: "1px solid var(--line)" }}>
            {MI_DELIVERABLES.map((d, i) =>
            <div key={d.code} style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 1.4fr",
              gap: 40,
              padding: "36px 36px",
              borderBottom: i < MI_DELIVERABLES.length - 1 ? "1px solid var(--line)" : "none",
              alignItems: "baseline"
            }}>
                <div className="mono" style={{ color: "var(--accent)", fontSize: 14, letterSpacing: "0.1em" }}>
                  {d.code}
                </div>
                <div style={{ fontFamily: "var(--f-display)", fontWeight: 300, fontSize: 26, lineHeight: 1.15 }}>
                  {d.t}
                </div>
                <p style={{ color: "var(--fg-dim)", fontSize: 15, lineHeight: 1.65, maxWidth: "60ch" }}>
                  {d.b}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2.5 — TAM MAPPING ───────────────────── */}
      <TamMappingView />

      {/* ─── SECTION 3 — HOW WE WORK ─────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionLabel index="[ 04 ]" title="HOW WE WORK" meta="DATA · SIGNALS · INTERPRETATION" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 64, alignItems: "start", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(30px, 3.2vw, 48px)", lineHeight: 1.08, letterSpacing: "-0.015em", maxWidth: "16ch" }}>Three layers, one roadmap.

            </h2>
            <p className="lead" style={{ maxWidth: "62ch", paddingTop: 8 }}>Most market research stops at data. Most agencies stop at execution. We work in the space between, where data, signals, and judgement converge into a decision you can act on.

            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "1px solid var(--line)" }}>
            {MI_LAYERS.map((l, i) =>
            <div key={l.t} style={{
              padding: "40px 32px",
              borderRight: i < MI_LAYERS.length - 1 ? "1px solid var(--line)" : "none",
              display: "flex", flexDirection: "column", gap: 16
            }}>
                <div className="mono" style={{ color: "var(--accent)", fontSize: 11, letterSpacing: "0.18em" }}>
                  L.0{i + 1}
                </div>
                <div style={{ fontFamily: "var(--f-display)", fontWeight: 300, fontSize: 28, lineHeight: 1.1 }}>
                  {l.t}
                </div>
                <p style={{ color: "var(--fg-dim)", fontSize: 14, lineHeight: 1.65 }}>
                  {l.b}
                </p>
              </div>
            )}
          </div>
          <p style={{
            fontFamily: "var(--f-display)", fontWeight: 300, fontSize: 22, lineHeight: 1.4,
            color: "var(--fg)", marginTop: 40, maxWidth: "60ch"
          }}>The output is not a 60-page deck. It's a working roadmap your team can act on the same week.

          </p>
        </div>
      </section>

      {/* ─── SECTION 4 — WHO THIS IS FOR ─────────────────── */}
      <section className="section">
        <div className="container">
          <SectionLabel index="[ 05 ]" title="WHO THIS IS FOR" />
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 2fr", gap: 64, alignItems: "start" }}>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.015em", maxWidth: "16ch" }}><span style={{ color: "#ac7879" }}><span style={{ color: "rgb(255, 255, 255)" }}>Built for teams where timing is critical.</span></span>

            </h2>
            <div style={{ border: "1px solid var(--line)" }}>
              {MI_AUDIENCE.map((p, i, arr) =>
              <div key={p.t} style={{
                padding: "32px 32px",
                borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none"
              }}>
                  <div style={{ fontFamily: "var(--f-display)", fontWeight: 300, fontSize: 24, marginBottom: 10, lineHeight: 1.15 }}>
                    <span style={{ color: "rgb(172, 120, 121)" }}>{p.t}</span>
                  </div>
                  <p style={{ color: "var(--fg-dim)", fontSize: 15, lineHeight: 1.65, maxWidth: "62ch" }}>
                    {p.b}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5 — CTA ─────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{
            border: "1px solid var(--line)",
            padding: "80px 64px",
            display: "grid", gridTemplateColumns: "1.2fr 1fr",
            gap: 64, alignItems: "center"
          }}>
            <div>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 24, maxWidth: "16ch" }}>
                Stop guessing the market.{" "}
                <span style={{ color: "var(--accent)" }}>Start mapping it.</span>
              </h2>
              <p style={{ color: "var(--fg-dim)", fontSize: 16, lineHeight: 1.65, maxWidth: "56ch" }}>A 30-minute strategy session. We'll tell you what we'd want to know before reaching out to your ICP.

              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <a href="#" onClick={(e) => {e.preventDefault();onNav && onNav("contact");}} className="btn btn-primary" style={{ padding: "20px 36px", fontSize: 13, letterSpacing: "0.16em" }}>
                Book a strategy session <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterCTA onNav={onNav} />
    </>);

}

Object.assign(window, { SignalsPage, IntelPage });