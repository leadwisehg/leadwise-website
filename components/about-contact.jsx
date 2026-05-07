/* global React, Frame, SectionLabel, Arrow */
const { useState: useStateX } = React;

// ─────────────────────────────────────────────────────────
// SECOND DASHBOARD — Signal timeline, smaller
// ─────────────────────────────────────────────────────────

function SignalTimeline() {
  const events = [
  { t: "00:02", co: "Meridian Capital", evt: "CFO departure announced", conf: 0.91, kind: "hot" },
  { t: "00:14", co: "Helix Partners", evt: "Raised £42M Series C", conf: 0.84, kind: "hot" },
  { t: "00:31", co: "Northline Insure", evt: "Hiring 12 underwriters", conf: 0.67, kind: "warm" },
  { t: "01:08", co: "Clearloop Health", evt: "Regulatory approval granted", conf: 0.78, kind: "warm" },
  { t: "01:52", co: "Vertex Software", evt: "Acquired Tegra Labs", conf: 0.88, kind: "hot" },
  { t: "02:40", co: "Datagrid Analytics", evt: "New CTO from Stripe", conf: 0.73, kind: "warm" }];


  return (
    <Frame label="FIG.02 — SIGNAL STREAM" meta="LAST 3 HOURS" style={{ padding: 0, background: "rgba(14,14,16,0.5)" }}>
      <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>Signal Timeline</span>
        <span className="mono" style={{ fontSize: 10.5, color: "var(--accent)" }}>6 events · ingesting</span>
      </div>
      <div>
        {events.map((e, i) =>
        <div key={i} className="feed-row" style={{
          display: "grid", gridTemplateColumns: "60px 1fr 200px 90px",
          padding: "14px 24px", borderBottom: i < events.length - 1 ? "1px solid var(--line)" : "none",
          alignItems: "center", gap: 16
        }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.08em" }}>{e.t}</span>
            <div>
              <div style={{ color: "var(--fg)", fontSize: 14 }}>{e.evt}</div>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--fg-faint)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>{e.co}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, height: 3, background: "var(--fg-ghost)", position: "relative" }}>
                <div style={{
                position: "absolute", top: 0, left: 0, bottom: 0,
                width: `${e.conf * 100}%`,
                background: e.kind === "hot" ? "var(--accent)" : "rgba(214,174,150,0.7)"
              }} />
              </div>
              <span className="mono" style={{ fontSize: 10.5, color: "var(--fg-dim)" }}>{e.conf.toFixed(2)}</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <Pill kind={e.kind}>{e.kind}</Pill>
            </div>
          </div>
        )}
      </div>
    </Frame>);

}

// ─────────────────────────────────────────────────────────
// APPROACH — tabbed product mock (Signal Graph / Context / Sequence)
// ─────────────────────────────────────────────────────────

const pmTabs = [
{ id: "campaign", label: "Campaign Performance" },
{ id: "signals", label: "Detected opportunities" },
{ id: "context", label: "Signal Analysis" },
{ id: "sequence", label: "Sequence Engine" }];


const pmSignals = [
{ tag: "Open role", tone: "accent", title: "Precision Metal hiring a Production manager", meta: "Industrial · Raleigh, NC · 2h ago", score: 92 },
{ tag: "Expansion", tone: "green", title: "Atlas Components opened a new production site", meta: "Semiconductor · Houston, TX · 5h ago", score: 88 },
{ tag: "Exec change", tone: "amber", title: "Kestrel Logistics appointed a new COO, ex-DHL", meta: "Logistics · 1d ago", score: 84 },
{ tag: "M&A", tone: "blue", title: "Nordex Systems acquired by PE fund SilverOak", meta: "IT · 2d ago", score: 77 },
{ tag: "Open role", tone: "accent", title: "Vantage Group has an open Plant Manager position", meta: "Energy · 2d ago", score: 74 }];


const pmTones = {
  accent: { dot: "var(--accent)", fg: "var(--accent)", bg: "var(--accent-faint)" },
  green: { dot: "#7BC99A", fg: "#7BC99A", bg: "rgba(123,201,154,0.1)" },
  amber: { dot: "#D9A769", fg: "#D9A769", bg: "rgba(217,167,105,0.1)" },
  blue: { dot: "#7A9CC2", fg: "#7A9CC2", bg: "rgba(122,156,194,0.1)" }
};

function PmSbItem({ label, active, count }) {
  return (
    <div style={{
      padding: "9px 16px",
      display: "flex", alignItems: "center", gap: 10,
      fontSize: 12, fontFamily: "var(--f-mono)", letterSpacing: "0.02em",
      color: active ? "var(--accent)" : "#ffffff",
      background: active ? "var(--accent-faint)" : "transparent",
      borderLeft: active ? "1px solid var(--accent)" : "1px solid transparent",
      margin: "1px 0",
      cursor: "default"
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: 999,
        background: active ? "var(--accent)" : "var(--fg-ghost)"
      }} />
      <span style={{ flex: 1 }}>{label}</span>
      {count && <span style={{ fontSize: 10.5, color: "var(--fg-faint)" }}>{count}</span>}
    </div>);

}

function PmSignalRow({ tag, tone, title, meta, score }) {
  const t = pmTones[tone];
  return (
    <div style={{
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      padding: "12px 14px",
      display: "flex", alignItems: "center", gap: 14
    }}>
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "3px 8px",
        background: t.bg, color: t.fg,
        border: "1px solid " + t.fg, borderColor: t.fg + "40",
        borderRadius: 999,
        flexShrink: 0,
        whiteSpace: "nowrap"
      }}>
        <span style={{ width: 5, height: 5, borderRadius: 999, background: t.dot }} />
        {tag}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, color: "var(--fg)", fontWeight: 400, letterSpacing: "-0.005em" }}>{title}</div>
        <div className="mono" style={{ fontSize: 10.5, color: "var(--fg-faint)", marginTop: 3, letterSpacing: "0.04em" }}>{meta}</div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexShrink: 0 }}>
        <span className="mono" style={{ fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.06em" }}>MATCH</span>
        <span style={{
          fontFamily: "var(--f-display)", fontWeight: 300,
          fontSize: 18, color: "var(--accent)", letterSpacing: "-0.02em"
        }}>{score}</span>
      </div>
    </div>);

}

function SignalsView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 240px", minHeight: 460 }}>
      {/* Sidebar */}
      <aside style={{
        background: "rgba(242,242,240,0.02)",
        borderRight: "1px solid var(--line)",
        padding: "14px 0"
      }}>
        <div style={{ padding: "0 16px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid var(--line)", marginBottom: 10 }}>
          <span style={{ width: 8, height: 8, background: "var(--accent)", borderRadius: 2 }} />
          <span className="mono" style={{ fontSize: 11, color: "var(--fg)", letterSpacing: "0.06em", textTransform: "uppercase" }}>DETECTED OPPORTUNITIES</span>
        </div>
        <PmSbItem label="Live signals" active />
        <PmSbItem label="My ICP" count="3" />
        <PmSbItem label="Accounts" />
        <PmSbItem label="Sequences" />
        <PmSbItem label="Alerts" />
      </aside>
      {/* Main */}
      <main style={{ display: "flex", flexDirection: "column", background: "var(--bg)" }}>
        <div style={{
          padding: "16px 20px",
          display: "flex", alignItems: "center", gap: 12,
          borderBottom: "1px solid var(--line)"
        }}>
          <div>
            <div style={{ fontFamily: "var(--f-display)", fontWeight: 400, fontSize: 17, color: "var(--fg)", letterSpacing: "-0.01em" }}>Live signals</div>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--fg-faint)", marginTop: 2, letterSpacing: "0.04em" }}>24 NEW · LAST HOUR</div>
          </div>
          <div style={{ flex: 1 }} />
          <button style={pmBtn}>Filter</button>
          <button style={pmBtnPrimary}>+ New sequence</button>
        </div>
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          {pmSignals.map((s, i) => <PmSignalRow key={i} {...s} />)}
        </div>
      </main>
      {/* Agent panel */}
      <aside style={{
        background: "rgba(186,139,142,0.04)",
        borderLeft: "1px solid var(--line)",
        display: "flex", flexDirection: "column"
      }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--line)" }}>
          <span className="label-accent">✦ WHY THIS MATCHES</span>
        </div>
        <div style={{ padding: 16, fontSize: 12.5, lineHeight: 1.6, color: "var(--fg-dim)" }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.08em", marginBottom: 10, color: "rgb(186, 139, 142)" }}>TIER-1 TRIGGER</div>
          <p style={{ margin: 0, color: "var(--fg-dim)" }}>
            An open Production Manager role typically creates immediate pressure on production and team coordination until the position is filled. Companies often require interim support to ensure continuity. <span style={{ color: "var(--accent)", fontWeight: 500 }}>     92/100</span>.
          </p>
          <div style={{
            marginTop: 16,
            padding: "10px 14px",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase",
            textAlign: "center",
            cursor: "pointer"
          }}>
            Draft a sequence →
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14 }}>
            {["Industrial", "US · NYC"].map((c) =>
            <span key={c} className="mono" style={{
              fontSize: 10, color: "var(--fg-dim)",
              padding: "3px 7px",
              border: "1px solid var(--line)",
              letterSpacing: "0.04em"
            }}>{c}</span>
            )}
          </div>
        </div>
      </aside>
    </div>);

}

function ContextView() {
  const timeline = [
  { day: "TODAY", title: "Production Manager role opened — Dallas", tone: "accent" },
  { day: "3D AGO", title: "Maintenance Supervisor role opened", tone: "amber" },
  { day: "10D AGO", title: "New assembly line installed", tone: "green" },
  { day: "4W AGO", title: "Capacity expansion announced", tone: "blue" }];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", minHeight: 460 }}>
      <aside style={{
        background: "rgba(242,242,240,0.02)",
        borderRight: "1px solid var(--line)",
        padding: "14px 0"
      }}>
        <div style={{ padding: "0 16px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid var(--line)", marginBottom: 10 }}>
          <span style={{ width: 8, height: 8, background: "var(--accent)", borderRadius: 2 }} />
          <span className="mono" style={{ fontSize: 11, color: "var(--fg)", letterSpacing: "0.06em", textTransform: "uppercase" }}>SIGNAL ANALYSIS</span>
        </div>
        <PmSbItem label="Accounts" active />
        <PmSbItem label="Lists" count="8" />
        <PmSbItem label="Saved views" />
        <PmSbItem label="ICP rules" />
      </aside>
      <main style={{ background: "var(--bg)", display: "flex", flexDirection: "column" }}>
        {/* Account head */}
        <div style={{
          padding: "16px 20px",
          display: "flex", alignItems: "center", gap: 14,
          borderBottom: "1px solid var(--line)"
        }}>
          <div style={{
            width: 40, height: 40,
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--f-display)", fontWeight: 400, fontSize: 16, letterSpacing: "-0.02em"
          }}>PM</div>
          <div>
            <div style={{ fontFamily: "var(--f-display)", fontWeight: 400, fontSize: 18, color: "var(--fg)", letterSpacing: "-0.01em" }}>Precision Metal </div>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--fg-faint)", marginTop: 2, letterSpacing: "0.04em" }}>precisionmetal.COM · Manufacturing · 320 FTE · Dallas, TX</div>
          </div>
          <div style={{ flex: 1 }} />
          <span style={{
            padding: "5px 12px",
            border: "1px solid var(--accent)", color: "var(--accent)",
            fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase"
          }}>ICP MATCH · 92</span>
          <button style={pmBtnPrimary}>Start sequence →</button>
        </div>
        {/* Two-col body */}
        <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 20 }}>
          <div>
            <div className="hint" style={{ marginBottom: 12 }}>TRIGGER TIMELINE</div>
            <div style={{ border: "1px solid var(--line)" }}>
              {timeline.map((t, i) => {
                const tone = pmTones[t.tone];
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "11px 14px",
                    borderBottom: i < timeline.length - 1 ? "1px solid var(--line)" : "none"
                  }}>
                    <span className="mono" style={{ fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.06em", width: 56 }}>{t.day}</span>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: tone.dot, flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5, color: "var(--fg)" }}>{t.title}</span>
                  </div>);

              })}
            </div>
          </div>
          <div>
            <div className="hint" style={{ marginBottom: 12 }}>SITUATION ANALYSIS</div>
            <div style={{
              border: "1px solid var(--accent-dim)",
              background: "var(--accent-faint)",
              padding: 16
            }}>
              <div className="label-accent" style={{ marginBottom: 10 }}>✦ WHY THIS IS RELEVANT</div>
              <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: "var(--fg-dim)" }}>Precision Metal is currently hiring a Production Manager — a role central to day-to-day operations and output stability.

Gaps at this level often create immediate pressure on coordination, performance, and decision-making on the shop floor.

Companies in this situation typically require short-term operational support to maintain continuity while the hiring process is ongoing.</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14 }}>
                {["+32 PTS · CRITICAL ROLE OPEN", "+21 PTS · CAPACITY INCREASE", "+18 PTS · HIRING ACTIVITY"].map((c) => <span key={c} className="mono" style={{ fontSize: 10, color: "var(--accent)",
                  padding: "3px 7px",
                  border: "1px solid var(--accent)",
                  letterSpacing: "0.06em"
                }}>{c}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>);

}

function CampaignView() {
  // KPI cards — matches the campaign dashboard reference, in our wireframe vocab.
  const kpis = [
  { label: "Emails sent", value: "65,612", delta: null, deltaTone: null },
  { label: "Total people contacted", value: "32,806", delta: null, deltaTone: null },
  { label: "Total opens", value: "20,840", delta: "31.7%", deltaTone: "green" },
  { label: "Unique opens", value: "16,300", delta: "24.8%", deltaTone: "green" },
  { label: "Replies", value: "950", delta: "2.67%", deltaTone: "green" },
  { label: "Bounced", value: "453", delta: "1.2%", deltaTone: "amber" },
  { label: "Unsubscribed", value: "85", delta: "0.22%", deltaTone: "amber" },
  { label: "Leads", value: "156", delta: "16.1%", deltaTone: "accent" }];


  // 10-day series for the area chart (drives the SVG path)
  const days = ["01 Jan", "02 Jan", "03 Jan", "04 Jan", "05 Jan", "06 Jan", "07 Jan", "08 Jan", "09 Jan", "10 Jan"];
  const series = [1450, 1680, 1820, 1950, 2050, 2120, 2080, 2180, 2100, 2240];
  const W = 760,H = 240,PADL = 56,PADR = 16,PADT = 18,PADB = 32;
  const yMax = 2500,yMin = 1000;
  const xStep = (W - PADL - PADR) / (series.length - 1);
  const yScale = (v) => PADT + (H - PADT - PADB) * (1 - (v - yMin) / (yMax - yMin));
  const points = series.map((v, i) => [PADL + i * xStep, yScale(v)]);
  const linePath = points.map(([x, y], i) => i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`).join(" ");
  const areaPath = `${linePath} L ${PADL + (series.length - 1) * xStep} ${H - PADB} L ${PADL} ${H - PADB} Z`;
  const yTicks = [1000, 1500, 2000, 2500];

  const deltaColor = {
    green: "#6ee7a0",
    amber: "#f5a05b",
    accent: "var(--accent)"
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", minHeight: 520 }}>
      {/* Sidebar */}
      <aside style={{
        background: "rgba(242,242,240,0.02)",
        borderRight: "1px solid var(--line)",
        padding: "14px 0"
      }}>
        <div style={{ padding: "0 16px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid var(--line)", marginBottom: 10 }}>
          <span style={{ width: 8, height: 8, background: "var(--accent)", borderRadius: 2 }} />
          <span className="mono" style={{ fontSize: 11, color: "var(--fg)", letterSpacing: "0.06em", textTransform: "uppercase" }}>WORKSPACE</span>
        </div>
        <PmSbItem label="Overview" active />
        <PmSbItem label="Campaigns" count="12" />
        <PmSbItem label="Inbox" count="84" />
        <PmSbItem label="Reports" />
        <PmSbItem label="Domains" />
      </aside>

      {/* Main */}
      <main style={{ background: "var(--bg)", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px",
          display: "flex", alignItems: "center", gap: 12,
          borderBottom: "1px solid var(--line)"
        }}>
          <div>
            <div style={{ fontFamily: "var(--f-display)", fontWeight: 400, fontSize: 18, color: "var(--fg)", letterSpacing: "-0.01em" }}>
              Campaign performance
            </div>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--fg-faint)", marginTop: 2, letterSpacing: "0.04em" }}>
              FULL OVERVIEW · ALL ACTIVE CAMPAIGNS
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <span style={{
            padding: "6px 14px",
            border: "1px solid var(--line)", color: "var(--fg-dim)",
            fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase"
          }}>Last 10 days ▾</span>
          <button style={pmBtnPrimary}>Export →</button>
        </div>

        {/* KPI grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderBottom: "1px solid var(--line)"
        }}>
          {kpis.map((k, i) => {
            const col = i % 4,row = Math.floor(i / 4);
            return (
              <div key={k.label} style={{
                padding: "18px 18px 20px",
                borderRight: col < 3 ? "1px solid var(--line)" : "none",
                borderBottom: row === 0 ? "1px solid var(--line)" : "none"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span className="mono" style={{
                    fontSize: 10, color: "var(--fg-faint)",
                    letterSpacing: "0.08em", textTransform: "uppercase"
                  }}>{k.label}</span>
                  {k.delta &&
                  <span className="mono" style={{
                    fontSize: 10, color: deltaColor[k.deltaTone],
                    letterSpacing: "0.04em",
                    padding: "2px 6px",
                    border: `1px solid ${deltaColor[k.deltaTone]}40`,
                    background: `${k.deltaTone === "accent" ? "var(--accent-faint)" : "transparent"}`
                  }}>{k.delta}</span>
                  }
                </div>
                <div style={{
                  fontFamily: "var(--f-display)",
                  fontWeight: 300,
                  fontSize: 32,
                  color: "var(--fg)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1
                }}>{k.value}</div>
              </div>);

          })}
        </div>

        {/* Chart */}
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
            <div className="hint">EMAILS SENT · DAILY VOLUME</div>
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", gap: 16 }}>
              <span className="mono" style={{ fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.06em" }}>
                <span style={{ color: "var(--accent)" }}>●</span> EMAILS
              </span>
              <span className="mono" style={{ fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.06em" }}>
                ◇ TARGET 2,000
              </span>
            </div>
          </div>

          <div style={{ border: "1px solid var(--line)", padding: 12, background: "rgba(242,242,240,0.015)" }}>
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }}>
              <defs>
                <linearGradient id="lw-camp-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* y grid + labels */}
              {yTicks.map((t) => {
                const y = yScale(t);
                return (
                  <g key={t}>
                    <line x1={PADL} x2={W - PADR} y1={y} y2={y}
                    stroke="rgba(242,242,240,0.06)" strokeDasharray="2 4" />
                    <text x={PADL - 10} y={y + 3} textAnchor="end"
                    style={{ fontFamily: "var(--f-mono)", fontSize: 10, fill: "var(--fg-faint)", letterSpacing: "0.04em" }}>
                      {t.toLocaleString()}
                    </text>
                  </g>);

              })}

              {/* target ref line */}
              <line x1={PADL} x2={W - PADR} y1={yScale(2000)} y2={yScale(2000)}
              stroke="rgba(186,139,142,0.35)" strokeDasharray="3 3" />

              {/* area */}
              <path d={areaPath} fill="url(#lw-camp-area)" />
              {/* line */}
              <path d={linePath} fill="none" stroke="var(--accent)" strokeWidth="1.5" />

              {/* points */}
              {points.map(([x, y], i) =>
              <g key={i}>
                  <circle cx={x} cy={y} r="2.5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.25" />
                </g>
              )}

              {/* x labels (every other day) */}
              {days.map((d, i) => i % 2 === 0 &&
              <text key={d} x={PADL + i * xStep} y={H - 10} textAnchor="middle"
              style={{ fontFamily: "var(--f-mono)", fontSize: 10, fill: "var(--fg-faint)", letterSpacing: "0.06em" }}>
                  {d.toUpperCase()}
                </text>
              )}
            </svg>
          </div>
        </div>

        {/* Footer strip */}
        <div style={{
          padding: "10px 20px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid var(--line)", background: "rgba(242,242,240,0.02)"
        }}>
          <span className="mono" style={{ fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            CAMPAIGN/v4.2 · 12 ACTIVE · LAST SYNC 00:00:08
          </span>
          <span className="mono" style={{ fontSize: 10, color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            ● LIVE
          </span>
        </div>
      </main>
    </div>);

}

function SequenceView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 260px", minHeight: 520 }}>
      <aside style={{
        background: "rgba(242,242,240,0.02)",
        borderRight: "1px solid var(--line)",
        padding: "14px 0"
      }}>
        <div style={{ padding: "0 16px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid var(--line)", marginBottom: 10 }}>
          <span style={{ width: 8, height: 8, background: "var(--accent)", borderRadius: 2 }} />
          <span className="mono" style={{ fontSize: 11, color: "var(--fg)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Sequence Engine</span>
        </div>
        <PmSbItem label="Inbox" count="12" />
        <PmSbItem label="Drafts" active />
        <PmSbItem label="Sent" />
        <PmSbItem label="Reply rates" />
      </aside>
      <main style={{ background: "var(--bg)", padding: 20 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          <span className="mono" style={{ fontSize: 10.5, padding: "4px 9px", border: "1px solid var(--accent)", color: "var(--accent)", letterSpacing: "0.06em" }}>DRAFT · PRECISION METAL</span>
          <span className="mono" style={{ fontSize: 10.5, padding: "4px 9px", border: "1px solid var(--line)", color: "var(--fg-dim)", letterSpacing: "0.06em" }}>GROUNDED IN: PRODUCTION MANAGER OPEN ROLE</span>
        </div>
        <div style={{ border: "1px solid var(--line)", background: "var(--bg-2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", padding: "11px 16px", borderBottom: "1px solid var(--line)", alignItems: "baseline", gap: 10 }}>
            <span className="mono" style={{ fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.06em" }}>TO</span>
            <span className="mono" style={{ fontSize: 12.5, color: "var(--fg)" }}>jane.wu@precisionmetal.com</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", padding: "11px 16px", borderBottom: "1px solid var(--line)", alignItems: "baseline", gap: 10 }}>
            <span className="mono" style={{ fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.06em" }}>SUBJECT</span>
            <span style={{ fontFamily: "var(--f-display)", fontWeight: 400, fontSize: 14, color: "var(--fg)", letterSpacing: "-0.005em" }}>Invitation: Jane & Christopher</span>
          </div>
          <div style={{ padding: "16px", fontSize: 13, lineHeight: 1.65, color: "var(--fg-dim)" }}>
            <p style={{ margin: "0 0 12px" }}>Hi Jane,</p>
            <p style={{ margin: "0 0 12px" }}>Saw that Precision Metal is currently hiring a Production Manager in Dallas.</p>
            <p style={{ margin: "0 0 12px" }}>Roles like this are central to day-to-day operations and having them open might creates short-term pressure on output and coordination across the floor.</p>
            <p style={{ margin: "0 0 12px" }}>We typically support sites in this situation by bringing on experienced interim managers who can step in immediately and maintain continuity while the hiring process runs.</p>
            <p style={{ margin: "0 0 12px" }}>Worth a quick look?</p>
            <p style={{ margin: 0 }}>Christopher</p>
          </div>
          <div style={{
            display: "flex", gap: 8, padding: "12px 14px",
            borderTop: "1px solid var(--line)", background: "rgba(242,242,240,0.02)"
          }}>
            <button style={pmBtn}>↻ Regenerate</button>
            <div style={{ flex: 1 }} />
            <button style={pmBtn}>Save draft</button>
            <button style={pmBtnPrimary}>Schedule →</button>
          </div>
        </div>
      </main>
      <aside style={{
        background: "rgba(186,139,142,0.04)",
        borderLeft: "1px solid var(--line)"
      }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--line)" }}>
          <span className="label-accent">✦ GROUNDED CONTEXT</span>
        </div>
        <div style={{ padding: 16, fontSize: 12, lineHeight: 1.6, color: "var(--fg-dim)" }}>
          <div className="hint" style={{ marginBottom: 10 }}>SOURCES USED</div>
          {[
          "LinkedIn Jobs · Production Manager opening",
          "Company careers page",
          "Recent activity (capacity expansion)"].
          map((s) =>
          <div key={s} style={{ padding: "4px 0", color: "var(--fg-dim)", fontSize: 11.5 }}>→ {s}</div>
          )}
          <div className="hint" style={{ marginTop: 16, marginBottom: 10 }}></div>
          <div style={{ color: "var(--fg-dim)", fontSize: 11.5 }}></div>
        </div>
      </aside>
    </div>);

}

const pmBtn = {
  background: "transparent",
  border: "1px solid var(--line)",
  color: "var(--fg-dim)",
  fontFamily: "var(--f-mono)",
  fontSize: 10.5,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  padding: "6px 11px",
  cursor: "pointer"
};

const pmBtnPrimary = {
  background: "transparent",
  border: "1px solid var(--accent)",
  color: "var(--accent)",
  fontFamily: "var(--f-mono)",
  fontSize: 10.5,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  padding: "6px 11px",
  cursor: "pointer"
};

function Approach() {
  const [tab, setTab] = useStateX("campaign");

  return (
    <section className="section">
      <div className="container">
        <SectionLabel index="[ 01 / INTELLIGENCE LAYER ]" title="· THE PRODUCT" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginBottom: 48, alignItems: "end" }}>
          <h2 style={{ fontSize: "clamp(40px, 4.5vw, 64px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            One <em style={{ fontFamily: "var(--f-display)", fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>operating picture</em> —<br />from signal to send.
          </h2>
          <p style={{ color: "var(--fg-dim)", maxWidth: "52ch" }}>

          </p>
        </div>

        {/* Tab row */}
        <div style={{
          display: "flex", gap: 0,
          borderBottom: "1px solid var(--line)",
          marginBottom: 0
        }}>
          {pmTabs.map((t) => {
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                background: "transparent",
                border: "1px solid var(--line)",
                borderBottom: active ? "1px solid var(--bg)" : "1px solid var(--line)",
                borderRight: "none",
                color: active ? "var(--accent)" : "var(--fg-dim)",
                padding: "12px 20px",
                fontFamily: "var(--f-mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                marginBottom: -1,
                position: "relative",
                transition: "color 150ms ease"
              }}>
                <span style={{ color: active ? "var(--accent)" : "var(--fg-faint)", marginRight: 10 }}>
                  {String(pmTabs.indexOf(t) + 1).padStart(2, "0")}
                </span>
                {t.label}
              </button>);

          })}
          <div style={{ flex: 1, borderBottom: "1px solid var(--line)", marginBottom: -1 }} />
        </div>

        {/* Frame */}
        <div style={{
          border: "1px solid var(--line)",
          borderTop: "none",
          background: "var(--bg)",
          position: "relative"
        }}>
          {/* window bar */}
          <div style={{
            height: 32,
            borderBottom: "1px solid var(--line)",
            display: "flex", alignItems: "center", padding: "0 14px", gap: 8,
            background: "rgba(242,242,240,0.02)"
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(242,242,240,0.18)" }} />
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(242,242,240,0.18)" }} />
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(242,242,240,0.18)" }} />
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <span className="mono" style={{ fontSize: 10.5, color: "var(--fg-faint)", letterSpacing: "0.04em" }}>
                app.leadwise.ai / {tab}
              </span>
            </div>
            <span style={{ width: 40 }} />
          </div>
          <div key={tab} style={{ animation: "rise 400ms ease-out" }}>
            {tab === "signals" && <SignalsView />}
            {tab === "context" && <ContextView />}
            {tab === "sequence" && <SequenceView />}
            {tab === "campaign" && <CampaignView />}
          </div>
        </div>
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────

const FAQ_ITEMS = [
{ q: "What makes LeadWise AI different from other lead gen agencies?", a: "We merge strategic outbound thinking with the latest AI tech. Instead of static lists or generic automation, we build intelligent systems that use live data, AI enrichment, and personalized messaging to target the right prospects at the right moment, leading to constantly turning outbound into qualified pipeline." },
{ q: "What is signal-based outreach?", a: "In 2026, traditional outreach doesn't work anymore. Signal-based outreach focuses on dynamic, real time triggers. Instead of targeting companies based only on who they are, we track real-time signals (hiring, expansion, leadership changes, operational shifts, product launch, funding, etc) that indicate when a need is likely to exist. Outreach is then triggered with that context, maximising relevance, timing and effectiveness." },
{ q: "How do you find and qualify the right leads for my business?", a: "We start by defining your Ideal Customer Profile (ICP) using real, verifiable data. Our AI workflows enrich leads from different sources, filter them by firmographics, intent, and fit. We run quality checks before any outreach begins. You get fewer unqualified leads and far better conversations." },
{ q: "What kind of results can I expect and how soon?", a: "Most clients start seeing replies and qualified meetings within the two weeks after the campaign launch. We begin by setting up your infrastructure, building your prospect list, and testing your personalized email sequence with a gradual ramp-up to protect reputation and deliverability. From there, we optimize weekly to continuously improve results." },
{ q: "How involved will I be in the process?", a: "You will have full visibility at every stage. Before launch, you will review the prospect list and message drafts, so we can make adjustments if needed. Once live, we provide a client portal where you can find all the leads received, weekly progress reports and campaign analytics." },
{ q: "How do you handle email deliverability and compliance?", a: "We warm up new domains, configure SPF/DKIM/DMARC, rotate sending accounts, and continuously monitor health to ensure maximum deliverability. All campaigns are fully compliant with GDPR and CAN-SPAM regulations, protecting both your domains and brand reputation." },
{ q: "What does your pricing model look like?", a: "We operate on a monthly retainer. To allow enough time to generate consistent results, we begin with a 3-month initial commitment. After that, it's month-to-month, with no long-term tie-ins. You stay as long as you are seeing value." },
{ q: "Can you work with my CRM or existing tools?", a: "Absolutely. LeadWise AI connects with major CRMs and sales tools. We can sync your leads, prospects, and activity data into our workflows to ensure everything stays unified, consistent, and up to date." },
{ q: "Do you offer LinkedIn or multi-channel outreach?", a: "While email remains our primary channel, we also run LinkedIn and multi-channel outreach when it suits your audience. This approach blends automation with human context to increase reply rates and create real conversations across multiple touchpoints." }];


function FAQ() {
  const [open, setOpen] = useStateX(0);
  return (
    <section className="section">
      <div className="container">
        <SectionLabel index="[ 07 / FAQ ]" title="· FREQUENT QUERIES" meta={`${FAQ_ITEMS.length} ENTRIES`} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 100 }}>
            <h2 style={{ marginBottom: 24 }}>
              Common<br />questions.
            </h2>
            <p style={{ color: "var(--fg-dim)", marginBottom: 28, maxWidth: "32ch" }}>
              Things founders and operators ask before a diagnostic call. If something isn't covered, say so directly.
            </p>
            <a href="#contact" className="btn">Ask directly <Arrow /></a>
          </div>

          <div style={{ borderTop: "1px solid var(--line)" }}>
            {FAQ_ITEMS.map((it, i) => {
              const isOpen = open === i;
              return (
                <div key={i} style={{ borderBottom: "1px solid var(--line)" }}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "26px 0", background: "transparent", border: "none", cursor: "pointer",
                    textAlign: "left", color: "var(--fg)"
                  }}>
                    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                      <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.12em", width: 40 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span style={{
                        fontFamily: "var(--f-display)", fontWeight: 300,
                        fontSize: 22, letterSpacing: "-0.01em",
                        color: isOpen ? "var(--accent)" : "var(--fg)",
                        transition: "color 180ms ease"
                      }}>{it.q}</span>
                    </div>
                    <span className="mono" style={{ fontSize: 20, color: isOpen ? "var(--accent)" : "var(--fg-faint)", transition: "all 200ms ease" }}>
                      {isOpen ? "–" : "+"}
                    </span>
                  </button>
                  <div style={{
                    maxHeight: isOpen ? 320 : 0,
                    overflow: "hidden", transition: "max-height 360ms cubic-bezier(.2,.7,.2,1)"
                  }}>
                    <div style={{ padding: "0 0 28px 60px" }}>
                      <p style={{ color: "var(--fg-dim)", maxWidth: "62ch" }}>{it.a}</p>
                    </div>
                  </div>
                </div>);

            })}
          </div>
        </div>
      </div>
    </section>);

}

// ─────────────────────────────────────────────────────────
// FOOTER CTA + FOOTER
// ─────────────────────────────────────────────────────────

function FooterCTA({ onNav }) {
  // Kept for backwards-compat — now an alias for Footer (CTA is folded into Footer).
  return <Footer onNav={onNav} />;
}

function Footer({ onNav }) {
  const colSections = [
  {
    title: "/ SYSTEMS",
    links: [
    ["OUTBOUND SYSTEMS", "outbound"],
    ["INBOUND SYSTEMS", "outbound"],
    ["MARKET INTELLIGENCE", "signals"]]

  },
  {
    title: "/ TECH",
    links: [
    ["OUR STACK", "stack"],
    ["AI AGENTS", "outbound"],
    ["SIGNALS LIBRARY", "signals"]]

  },
  {
    title: "/ ABOUT",
    links: [
    ["ABOUT US", "about"],
    ["TERMS & CONDITIONS", "terms"],
    ["PRIVACY POLICY", "privacy"]]

  }];


  return (
    <footer style={{ borderTop: "1px solid var(--line)", padding: "100px 0 32px", marginTop: 80 }}>
      <div className="container">
        {/* ── CTA block ─────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{

            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: 24,
            textTransform: "uppercase",
            fontWeight: 500, fontSize: "50px"
          }}>
            Ready to scale your outbound{" "}
            <span style={{ color: "var(--accent)" }}>?</span>
          </h2>
          <p className="mono" style={{
            fontSize: 14, letterSpacing: "0.04em",
            color: "var(--fg-dim)",
            marginBottom: 36
          }}>
            <span style={{ color: "var(--accent)" }}>///</span>
            {" "}Turn buying signals into booked meetings{" "}
            <span style={{ color: "var(--accent)" }}>///</span>
          </p>
          <a
            href="#"
            onClick={(e) => {e.preventDefault();onNav("contact");}}
            className="btn btn-primary"
            style={{
              padding: "20px 40px",
              fontSize: 13,
              letterSpacing: "0.18em", borderRadius: "0px"

            }}>
            
            TALK WITH US
          </a>
        </div>

        {/* divider */}
        <div style={{ borderTop: "1px solid var(--line)", marginBottom: 48, opacity: "50" }} />

        {/* ── Column grid ───────────────────────────────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
          gap: 48,
          marginBottom: 60
        }}>
          {/* Newsletter column */}
          <div>
            <div className="hint" style={{ marginBottom: 16, color: "var(--fg-dim)" }}>
              <span style={{ color: "var(--accent)" }}>///</span> GET THE LATEST GTM NEWS
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{
                display: "flex",
                border: "1px solid var(--line)",
                marginBottom: 32
              }}>
              
              <input
                type="email"
                placeholder="Email*"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--fg)",
                  padding: "16px 18px",
                  fontFamily: "var(--font-mono, ui-monospace, monospace)",
                  fontSize: 15,
                  letterSpacing: "0.04em"
                }} />
              
              <button
                type="submit"
                className="mono"
                style={{
                  background: "transparent",
                  border: "none",
                  borderLeft: "1px solid var(--line)",
                  color: "var(--accent)",
                  padding: "0 21px",
                  fontSize: 13,
                  letterSpacing: "0.18em",
                  cursor: "pointer"
                }}>
                
                →
              </button>
            </form>

            {/* Social tiles */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              border: "1px solid var(--line)",
              width: "100%"
            }}>
              <a
                href="#"
                aria-label="X / Twitter"
                style={{
                  aspectRatio: "1 / 1",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRight: "1px solid var(--line)",
                  color: "var(--fg-dim)",
                  transition: "color 0.15s, background 0.15s"
                }}
                onMouseEnter={(e) => {e.currentTarget.style.color = "var(--accent)";e.currentTarget.style.background = "var(--accent-faint)";}}
                onMouseLeave={(e) => {e.currentTarget.style.color = "var(--fg-dim)";e.currentTarget.style.background = "transparent";}}>
                
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 3l7.5 10.5L3 21h2l6.5-7.5L17 21h4l-7.5-10.5L21 3h-2l-6 7L8 3H3z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                style={{
                  aspectRatio: "1 / 1",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--fg-dim)",
                  transition: "color 0.15s, background 0.15s"
                }}
                onMouseEnter={(e) => {e.currentTarget.style.color = "var(--accent)";e.currentTarget.style.background = "var(--accent-faint)";}}
                onMouseLeave={(e) => {e.currentTarget.style.color = "var(--fg-dim)";e.currentTarget.style.background = "transparent";}}>
                
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="1" />
                  <path d="M7 10v7M7 7v0.01M11 17v-4a2 2 0 014 0v4M11 10v7" />
                </svg>
              </a>
            </div>
          </div>

          {colSections.map((sec) =>
          <div key={sec.title}>
              <div className="hint" style={{ marginBottom: 24, color: "var(--accent)", letterSpacing: "0.16em" }}>
                {sec.title}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {sec.links.map(([label, dest]) =>
              <li key={label}>
                    <a
                  href="#"
                  onClick={(e) => {e.preventDefault();onNav(dest);}}
                  className="mono"
                  style={{
                    color: "var(--fg)",
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "color 0.15s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg)"}>
                  
                      {label}
                    </a>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>

        {/* ── Bottom strip ───────────────────────────────────── */}
        <div style={{
          borderTop: "1px solid var(--line)",
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span className="hint" style={{ color: "var(--fg-dim)" }}>
            <span style={{ color: "var(--accent)" }}>///</span>{" "}
            30 N GOULD ST STE N · SHERIDAN, WY 82801 · UNITED STATES
          </span>
          <span className="hint">LeadWise AI © 2026</span>
        </div>
      </div>
    </footer>);

}

Object.assign(window, { Approach, FAQ, FooterCTA, Footer, SignalTimeline });