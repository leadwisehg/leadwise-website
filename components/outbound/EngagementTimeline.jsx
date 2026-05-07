/* global React */
// ─────────────────────────────────────────────────────────
// ENGAGEMENT TIMELINE — interactive 6-stage strip + detail panel
// Auto-advances every 4s when idle. Click a node, arrow-key, or
// hover to control. Replaces the duplicate "12 weeks" hero block
// and the old sticky scrub track + per-week sections.
// ─────────────────────────────────────────────────────────

const TIMELINE_STAGES = [
{
  code: "01",
  label: "SIGNAL",
  name: "Signal detected",
  duration: "Real-time",
  inputs: "48+ trigger types · Funding, hiring, exec moves, M&A",
  ships: "Trigger event · Source citation · First-touch timestamp",
  kpiMove: "0 → 142,000 accounts indexed · trigger fires < 1h"
},
{
  code: "02",
  label: "ENRICH",
  name: "Enrich & Resolve",
  duration: "< 5 min",
  inputs: "Account record · Signal context · Buying-committee map",
  ships: "Verified contacts · Tech stack · Reporting line",
  kpiMove: "1 trigger → 3–6 verified contacts per account"
},
{
  code: "03",
  label: "SCORE",
  name: "Score & Prioritise",
  duration: "< 1 min",
  inputs: "Fit criteria · Signal strength · ICP weights",
  ships: "Strength score 0–100 · Tier-1 / Tier-2 routing",
  kpiMove: "31,200 SAM → 3,800 Tier-1 accounts queued"
},
{
  code: "04",
  label: "COPY",
  name: "Copy & Compose",
  duration: "< 90 sec",
  inputs: "Signal payload · ICP voice · Win patterns",
  ships: "Grounded opener · 2–3 step sequence · A/B variant",
  kpiMove: "3 sequences live · 12 personalisation tokens per draft"
},
{
  code: "05",
  label: "SEND",
  name: "Send & Calibrate",
  duration: "Ongoing",
  inputs: "Warm domain stack · Sequence A/B/C · Deliverability baseline",
  ships: "First sends · Reply triage SOP · Daily readout",
  kpiMove: "0 → 65,000 sends/mo · Reply rate +0.8 → +2.6%"
},
{
  code: "06",
  label: "REPLY",
  name: "Reply & Book",
  duration: "Ongoing",
  inputs: "Interested replies · Live signals · CRM feedback",
  ships: "Qualified hand-off · Booked calls · Weekly refresh",
  kpiMove: "150+ booked calls / mo · No noise, no cold drag"
}];


function EngagementTimeline() {
  const [active, setActive] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const [fading, setFading] = React.useState(false);
  const wrapRef = React.useRef(null);
  const lastInteract = React.useRef(Date.now());
  const reduce = React.useRef(false);

  React.useEffect(() => {
    reduce.current = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  React.useEffect(() => {
    if (reduce.current) return;
    let inView = false;
    const obs = new IntersectionObserver(([e]) => {inView = e.isIntersecting;},
    { threshold: 0.2 });
    if (wrapRef.current) obs.observe(wrapRef.current);

    const id = setInterval(() => {
      if (!inView || hovered) return;
      if (Date.now() - lastInteract.current < 4000) return;
      setFading(true);
      setTimeout(() => {
        setActive((a) => (a + 1) % TIMELINE_STAGES.length);
        setFading(false);
      }, 200);
    }, 4000);
    return () => {clearInterval(id);obs.disconnect();};
  }, [hovered]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        lastInteract.current = Date.now();
        setActive((a) => (a + 1) % TIMELINE_STAGES.length);
      } else if (e.key === "ArrowLeft") {
        lastInteract.current = Date.now();
        setActive((a) => (a - 1 + TIMELINE_STAGES.length) % TIMELINE_STAGES.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (i) => {
    if (i === active) return;
    lastInteract.current = Date.now();
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setFading(false);
    }, 200);
  };

  const stage = TIMELINE_STAGES[active];

  return (
    <section className="section" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="container">
        {/* Header strip */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 36
        }}>
          <span className="hint">└ ENGAGEMENT TIMELINE · SIGNAL → SEND · 6 STAGES</span>
          <span className="hint">
            <span style={{ color: "var(--accent)" }}>●</span>{" "}
            ACTIVE STAGE · <span style={{ color: "var(--accent)" }}>{stage.label}</span>
          </span>
        </div>

        {/* Track — its own bounded container, panel sits BELOW it */}
        <div
          ref={wrapRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {setHovered(false);lastInteract.current = Date.now();}}
        >
          <div style={{
            position: "relative",
            height: 90,
            padding: "0 6px"
          }}>
            {/* Base line */}
            <div style={{
              position: "absolute", left: 6, right: 6, top: 30,
              height: 1, background: "var(--line)"
            }} />
            {/* Solid accent fill up to active node */}
            <div style={{
              position: "absolute", left: 6, top: 30, height: 1,
              width: `calc(${active / (TIMELINE_STAGES.length - 1) * 100}% - 0px)`,
              background: "var(--accent)",
              transition: "width 400ms ease-out"
            }} />
            {/* Dashed line right of active */}
            <div style={{
              position: "absolute",
              left: `calc(${active / (TIMELINE_STAGES.length - 1) * 100}% + 6px)`,
              right: 6, top: 30,
              borderTop: "1px dashed var(--accent)",
              opacity: 0.3,
              transition: "left 400ms ease-out"
            }} />

            {/* Stops */}
            {TIMELINE_STAGES.map((s, i) => {
              const isActive = i === active;
              const isPast = i < active;
              const left = `${i / (TIMELINE_STAGES.length - 1) * 100}%`;
              const align =
                i === 0 ? "flex-start" :
                i === TIMELINE_STAGES.length - 1 ? "flex-end" :
                "center";
              const transform =
                i === 0 ? "translateX(0)" :
                i === TIMELINE_STAGES.length - 1 ? "translateX(-100%)" :
                "translateX(-50%)";
              return (
                <button
                  key={s.code}
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${s.label}`}
                  style={{
                    position: "absolute",
                    left, top: 0,
                    transform,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: align
                  }}>
                  <div style={{
                    position: "relative",
                    width: 16, height: 16,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginTop: 22
                  }}>
                    <div style={{
                      width: isActive ? 10 : 6,
                      height: isActive ? 10 : 6,
                      border: `1px solid ${isActive || isPast ? "var(--accent)" : "var(--fg-faint)"}`,
                      background: isActive ? "var(--accent)" : "var(--bg)",
                      transition: "all 200ms ease-out"
                    }} />
                    {isActive &&
                    <>
                        {[
                        { top: -2, left: -2, bt: 1, bl: 1 },
                        { top: -2, right: -2, bt: 1, br: 1 },
                        { bottom: -2, left: -2, bb: 1, bl: 1 },
                        { bottom: -2, right: -2, bb: 1, br: 1 }].
                        map((p, k) =>
                        <span key={k} style={{
                          position: "absolute",
                          width: 4, height: 4,
                          ...(p.top !== undefined ? { top: p.top } : {}),
                          ...(p.bottom !== undefined ? { bottom: p.bottom } : {}),
                          ...(p.left !== undefined ? { left: p.left } : {}),
                          ...(p.right !== undefined ? { right: p.right } : {}),
                          borderTop: p.bt ? "1px solid var(--accent)" : "none",
                          borderBottom: p.bb ? "1px solid var(--accent)" : "none",
                          borderLeft: p.bl ? "1px solid var(--accent)" : "none",
                          borderRight: p.br ? "1px solid var(--accent)" : "none"
                        }} />
                        )}
                      </>
                    }
                  </div>

                  <span className="mono" style={{
                    fontSize: 9.5, marginTop: 12,
                    color: isActive ? "var(--accent)" : "var(--fg-dim)",
                    letterSpacing: "0.18em",
                    textAlign: i === 0 ? "left" : i === TIMELINE_STAGES.length - 1 ? "right" : "center",
                    width: 80,
                    transition: "color 200ms ease-out"
                  }}>
                    {s.label}
                  </span>
                </button>);
            })}
          </div>

          {/* Detail panel — CRM-dashboard layout */}
          <div
            style={{
              marginTop: 48,
              position: "relative",
              border: "1px solid var(--line)",
              background: "rgba(14,14,16,0.55)",
              opacity: fading ? 0 : 1,
              transition: "opacity 200ms ease-out"
            }}>
            <span className="crop-tl" /><span className="crop-tr" />
            <span className="crop-bl" /><span className="crop-br" />

            {/* Header bar — left: stage code + name, right: status chips */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "22px 28px",
              borderBottom: "1px solid var(--line)",
              gap: 24,
              flexWrap: "wrap"
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
                <span style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: "var(--accent)",
                  paddingRight: 16,
                  borderRight: "1px solid var(--line)"
                }}>
                  STAGE {stage.code} / 06
                </span>
                <h3 style={{
                  fontFamily: "var(--f-display)",
                  fontWeight: 400,
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                  margin: 0,
                  color: "var(--fg)"
                }}>
                  {stage.name}
                </h3>
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "6px 12px",
                  border: "1px solid var(--line-strong)",
                  fontFamily: "var(--f-mono)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  color: "var(--fg-dim)"
                }}>
                  {stage.label}
                </span>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "6px 12px",
                  border: "1px solid var(--accent-dim)",
                  background: "var(--accent-faint)",
                  fontFamily: "var(--f-mono)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  color: "var(--accent)"
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--accent)",
                    boxShadow: "0 0 6px var(--accent)"
                  }} />
                  IN PROGRESS
                </span>
              </div>
            </div>

            {/* CRM-style metric grid — 4 cards, 2×2 desktop, 1×4 mobile */}
            <div className="ob-stage-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)"
            }}>
              <StageMetricCard
                glyph="◷"
                label="Duration"
                value={stage.duration}
                kind="single"
                borderRight
              />
              <StageMetricCard
                glyph="↓"
                label="Inputs"
                value={stage.inputs}
                kind="list"
                borderRight
              />
              <StageMetricCard
                glyph="↑"
                label="Ships"
                value={stage.ships}
                kind="list"
                borderRight
                accent
              />
              <StageMetricCard
                glyph="△"
                label="KPI move"
                value={stage.kpiMove}
                kind="kpi"
              />
            </div>

            <style>{`
              @media (max-width: 900px) {
                .ob-stage-grid {
                  grid-template-columns: repeat(2, 1fr) !important;
                }
                .ob-stage-grid > div:nth-child(1),
                .ob-stage-grid > div:nth-child(2) {
                  border-bottom: 1px solid var(--line) !important;
                }
                .ob-stage-grid > div:nth-child(2) {
                  border-right: none !important;
                }
              }
              @media (max-width: 600px) {
                .ob-stage-grid {
                  grid-template-columns: 1fr !important;
                }
                .ob-stage-grid > div {
                  border-right: none !important;
                  border-bottom: 1px solid var(--line) !important;
                }
                .ob-stage-grid > div:last-child {
                  border-bottom: none !important;
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>);
}

// ─── CRM-style metric card ──────────────────────────────
function StageMetricCard({ glyph, label, value, kind, borderRight, accent }) {
  // Split list-style values on " · " into chips/lines for readability
  const parts = kind === "single"
    ? [value]
    : value.split(" · ").map(s => s.trim()).filter(Boolean);

  const valueColor = accent ? "var(--accent)" : "var(--fg)";

  return (
    <div style={{
      padding: "26px 28px",
      borderRight: borderRight ? "1px solid var(--line)" : "none",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      minHeight: 180
    }}>
      {/* Header row: glyph + label */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          width: 22, height: 22,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          border: "1px solid var(--line-strong)",
          fontFamily: "var(--f-mono)",
          fontSize: 12,
          color: "var(--fg-dim)",
          lineHeight: 1
        }}>{glyph}</span>
        <span style={{
          fontFamily: "var(--f-mono)",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--fg-dim)"
        }}>
          {label}
        </span>
      </div>

      {/* Value */}
      {kind === "single" && (
        <div style={{
          fontFamily: "var(--f-display)",
          fontWeight: 300,
          fontSize: 30,
          lineHeight: 1.05,
          color: valueColor,
          letterSpacing: "-0.015em"
        }}>
          {value}
        </div>
      )}

      {kind === "list" && (
        <ul style={{
          listStyle: "none",
          padding: 0, margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 8
        }}>
          {parts.map((p, i) => (
            <li key={i} style={{
              fontFamily: "var(--f-body)",
              fontSize: 14.5,
              lineHeight: 1.4,
              color: valueColor,
              display: "flex",
              alignItems: "baseline",
              gap: 10
            }}>
              <span style={{
                width: 4, height: 4,
                background: accent ? "var(--accent)" : "var(--fg-faint)",
                marginTop: 7,
                flexShrink: 0
              }} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}

      {kind === "kpi" && (
        <ul style={{
          listStyle: "none",
          padding: 0, margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10
        }}>
          {parts.map((p, i) => (
            <li key={i} style={{
              fontFamily: "var(--f-body)",
              fontSize: 14.5,
              lineHeight: 1.35,
              color: "var(--fg)"
            }}>
              <span style={{
                fontFamily: "var(--f-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "var(--accent)"
              }}>
                {p}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Object.assign(window, { EngagementTimeline });
