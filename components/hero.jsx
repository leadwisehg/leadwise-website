/* global React */
const { useState: useStateH, useEffect: useEffectH, useMemo: useMemoH } = React;

// Mock dataset for the hero dashboard
const HERO_ROWS = [
{ name: "Sarah Chen", role: "VP of Sales", sen: "VP", co: "Datagrid Analytics", ind: "SaaS", lead: "hot", sig: "Replied to email", str: "strong", hue: 340 },
{ name: "Marcus Okafor", role: "Head of RevOps", sen: "Director", co: "Bolt Logistics", ind: "Logistics", lead: "warm", sig: "Booked meeting", str: "strong", hue: 35 },
{ name: "Priya Ramanathan", role: "Founder & CEO", sen: "C-Suite", co: "Clearloop Health", ind: "Healthtech", lead: "hot", sig: "Requested pricing", str: "strong", hue: 20 },
{ name: "James Thornton", role: "Director of Growth", sen: "Director", co: "Meridian Capital", ind: "Fintech", lead: "warm", sig: "Positive reply", str: "good", hue: 160 },
{ name: "Aisha Kapoor", role: "Head of Growth", sen: "Director", co: "Northwind Retail", ind: "E-commerce", lead: "warm", sig: "Opened pricing page", str: "good", hue: 280 },
{ name: "Daniel Weiss", role: "Chief Revenue Officer", sen: "C-Suite", co: "Vertex Software", ind: "SaaS", lead: "hot", sig: "Replied to email", str: "strong", hue: 220 },
{ name: "Elena Rossi", role: "VP Marketing", sen: "VP", co: "Luma Commerce", ind: "E-commerce", lead: "warm", sig: "Clicked CTA", str: "good", hue: 140 },
{ name: "Tomás Rivera", role: "Head of Sales", sen: "Director", co: "Cascade Fintech", ind: "Fintech", lead: "cold", sig: "Visited LinkedIn", str: "low", hue: 15 },
{ name: "Ingrid Søren", role: "Chief of Staff", sen: "C-Suite", co: "Helix Partners", ind: "Finance", lead: "hot", sig: "Inbound reply", str: "strong", hue: 260 },
{ name: "Rahul Varma", role: "Ops Director", sen: "Director", co: "Northline Insure", ind: "Insurance", lead: "warm", sig: "Forwarded internally", str: "good", hue: 80 }];


function initials(name) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function HeroDashboard() {
  const [industry, setIndustry] = useStateH("All");
  const [lead, setLead] = useStateH("All");

  const rows = useMemoH(() => {
    return HERO_ROWS.filter((r) =>
    (industry === "All" || r.ind === industry) && (
    lead === "All" || r.lead === lead.toLowerCase())
    );
  }, [industry, lead]);

  const inds = ["All", "Automotive", "Manufacturing", "Heavy Industry", "Logistics", "Finance", "PE Fund"];
  const leads = ["All", "Hot", "Warm", "Cold"];

  const Chip = ({ active, children, onClick }) =>
  <button onClick={onClick} style={{
    padding: "5px 12px", border: "1px solid " + (active ? "var(--accent)" : "var(--line)"),
    background: active ? "var(--accent-faint)" : "transparent",
    color: active ? "var(--accent)" : "var(--fg-dim)",
    fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: "0.08em",
    textTransform: "uppercase", cursor: "pointer", transition: "all 140ms ease"
  }}>{children}</button>;


  return (
    <Frame className="full" style={{ background: "rgba(14,14,16,0.6)", backdropFilter: "blur(1px)" }}>
      {/* Top bar */}
      <div style={{ padding: "22px 24px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="blink" style={{ width: 7, height: 7, borderRadius: "50%", background: "#6ee7a0", boxShadow: "0 0 8px #6ee7a0", display: "inline-block" }} />
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--fg)" }}>Live Campaign Feed</span>
        </div>
        <div className="mono" style={{ fontSize: 11, color: "var(--fg-dim)" }}>
          <span style={{ color: "var(--accent)" }}>{rows.length}</span> <span style={{ color: "var(--fg-faint)" }}>of 50 prospects</span>
        </div>
      </div>

      {/* Filter row */}
      <div style={{ padding: "16px 24px", display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", borderBottom: "1px solid var(--line)" }}>
        <span className="label">Industry:</span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {inds.map((i) => <Chip key={i} active={industry === i} onClick={() => setIndustry(i)}>{i}</Chip>)}
        </div>
        <span style={{ width: 1, height: 20, background: "var(--line)" }} />
        <span className="label">Lead:</span>
        <div style={{ display: "flex", gap: 6 }}>
          {leads.map((l) => <Chip key={l} active={lead === l} onClick={() => setLead(l)}>{l}</Chip>)}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid var(--line)", padding: "6px 12px", minWidth: 200 }}>
          <span className="mono" style={{ color: "var(--fg-faint)", fontSize: 11 }}>⌕</span>
          <span className="mono" style={{ fontSize: 10.5, color: "var(--fg-faint)", letterSpacing: "0.08em" }}>Search name or company…</span>
        </div>
      </div>

      {/* Table */}
      <div className="no-scrollbar" style={{ maxHeight: 360, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: "left" }}>
              {["Name", "Role", "Seniority", "Company", "Industry", "Lead", "Signal Type", "Strength"].map((h) =>
              <th key={h} style={{
                padding: "10px 16px",
                fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "var(--fg-faint)",
                borderBottom: "1px solid var(--line)", fontWeight: 500
              }}>{h} <span style={{ opacity: 0.4 }}>↕</span></th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) =>
            <tr key={i} className="feed-row" style={{ borderBottom: "1px solid var(--line)" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar initials={initials(r.name)} hue={r.hue} />
                    <span style={{ color: "var(--fg)" }}>{r.name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", color: "var(--fg-dim)" }}>{r.role}</td>
                <td style={{ padding: "12px 16px", color: "var(--fg-dim)" }}>{r.sen}</td>
                <td style={{ padding: "12px 16px", color: "var(--fg)" }}>{r.co}</td>
                <td style={{ padding: "12px 16px", color: "var(--fg-dim)" }}>{r.ind}</td>
                <td style={{ padding: "12px 16px" }}><Pill kind={r.lead}>{r.lead[0].toUpperCase() + r.lead.slice(1)}</Pill></td>
                <td style={{ padding: "12px 16px", color: "var(--fg-dim)" }}>{r.sig}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <SignalBars strength={r.str} />
                    <span className="mono" style={{ fontSize: 10.5, color: "var(--fg-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {r.str === "strong" ? "Strong" : r.str === "good" ? "Good" : "Low"}
                    </span>
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer strip */}
      <div style={{ padding: "10px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line)" }}>
        <span className="mono" style={{ fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          ENGINE/v4.2 · HMAC-SIGNALS · LAST SYNC 00:00:02
        </span>
        <span className="mono" style={{ fontSize: 10, color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          ● STREAMING
        </span>
      </div>
    </Frame>);

}

function Hero({ onNav }) {
  return (
    <section style={{ paddingTop: 80, paddingBottom: 120, position: "relative" }}>
      <div className="container">
        {/* Blueprint annotation above */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <TargetMarker />
            <span className="label-accent">[ 00 / INDEX ]</span>
            <span className="hint" style={{ opacity: "1" }}><span style={{ color: "rgb(255, 255, 255)" }}>GTM ENGINEERING · FOR B2B COMPANIES WITH +$50K MRR</span></span>
          </div>
          <span className="hint">LAT 51.5074° · LON -0.1278° · UTC+00</span>
        </div>

        {/* Headline */}
        <div style={{ maxWidth: 1200 }}>
          <h1 className="rise" style={{ marginBottom: 24 }}>
            <span style={{ color: "var(--accent)" }}></span>{" "}
            <em style={{ fontStyle: "normal", position: "relative" }}>
              <span style={{
                background: "linear-gradient(180deg, transparent 62%, var(--accent-faint) 62%)",
                padding: "0 0.08em", fontSize: "100px"
              }}>We build GTM systems that drive revenue growth</span>
            </em>
          </h1>

          {/* Tagline directly under headline */}
          <p className="lead" style={{ fontSize: 22, color: "#fff", marginBottom: 56, maxWidth: 880 }}>
            We scrape, we enrich, we outreach, <span style={{ color: "var(--accent)" }}>You close</span>.
          </p>
        </div>

        {/* Descriptor block + CTAs */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, marginBottom: 72, alignItems: "end" }}>
          <div>
            <span className="label-accent" style={{ marginBottom: 18, display: "inline-block", fontSize: "20px" }}>
              [ SIGNAL-BASED GTM INFRASTRUCTURE ]
            </span>
            <p style={{ color: "#ffffff", fontSize: 17, lineHeight: 1.55, maxWidth: "52ch" }}>
              LeadWise AI identifies buying signals and designs outbound systems
              that generate qualified meetings.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="#" onClick={(e) => {e.preventDefault();onNav("signals");}} className="btn btn-primary" style={{ padding: "22px 28px", fontSize: 14 }}>
                Signal Library <Arrow />
              </a>
              <a href="#" onClick={(e) => {e.preventDefault();onNav("contact");}} className="btn" style={{ padding: "22px 28px", fontSize: 14 }}>
                Talk with us <Arrow />
              </a>
            </div>
            <span className="hint">RESPONSE ← 24H · NO SDR FLOOR REQUIRED</span>
          </div>
        </div>
      </div>
    </section>);

}

Object.assign(window, { Hero, HeroDashboard });