/* global React, SectionLabel */

// ─────────────────────────────────────────────────────────
//  M2 / TAM MAPPING — Market Intelligence sub-page module.
//  Sits between M1 (deliverables) and M3 (how we work).
// ─────────────────────────────────────────────────────────

function TamMappingView() {
  const steps = [
    { code: "01", t: "SEGMENT",    b: "Account universe broken into ICP tiers, geos, verticals, tech stacks. Maps, not lists." },
    { code: "02", t: "PRIORITISE", b: "Tier-1 accounts surfaced by intent and timing signals. Where to spend the next 90 days." },
    { code: "03", t: "REFRESH",    b: "Map regenerates weekly as funding, hiring, and exec moves change the picture." }
  ];

  // Artefact rectangle geometry — viewBox 600 × 360, concentric.
  const VB_W = 600, VB_H = 360;
  const rings = [
    { id: "TAM", x: 14,  y: 14,  w: VB_W - 28,  h: VB_H - 28, r: 4,
      label: "[ TAM ]",        caption: "FILTER: CATEGORY UNIVERSE",
      count: "142,000",        tone: "dim" },
    { id: "SAM", x: 78,  y: 64,  w: VB_W - 156, h: VB_H - 128, r: 4,
      label: "[ SAM ]",        caption: "FILTER: GEO · HEADCOUNT 200–2000 · TECH:HUBSPOT",
      count: "31,200",         tone: "fg" },
    { id: "SOM", x: 168, y: 124, w: VB_W - 336, h: VB_H - 248, r: 4,
      label: "[ SOM — ACT HERE ]", caption: "FILTER: ACTIVE TIMING SIGNALS",
      count: "3,800",          tone: "accent" }
  ];

  // Corner-tick (10px arms) at every rectangle corner.
  function Ticks({ x, y, w, h, color }) {
    const L = 10;
    const stroke = { stroke: color, strokeWidth: 1, fill: "none" };
    const corners = [
      // top-left
      <path key="tl" d={`M${x} ${y + L} L${x} ${y} L${x + L} ${y}`} {...stroke} />,
      // top-right
      <path key="tr" d={`M${x + w - L} ${y} L${x + w} ${y} L${x + w} ${y + L}`} {...stroke} />,
      // bottom-left
      <path key="bl" d={`M${x} ${y + h - L} L${x} ${y + h} L${x + L} ${y + h}`} {...stroke} />,
      // bottom-right
      <path key="br" d={`M${x + w - L} ${y + h} L${x + w} ${y + h} L${x + w} ${y + h - L}`} {...stroke} />
    ];
    return <g>{corners}</g>;
  }

  function colorFor(tone) {
    if (tone === "accent") return "var(--accent)";
    if (tone === "fg")     return "rgba(242,242,240,0.55)";
    return "rgba(242,242,240,0.32)";
  }

  return (
    <section className="section">
      <div className="container">
        <SectionLabel index="[ 03 ]" title="TAM MAPPING" meta="THE TERRITORY · BEFORE THE CAMPAIGN" />

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.05fr",
          gap: 64,
          alignItems: "start",
          marginBottom: 56
        }}>
          {/* ── LEFT: copy ─────────────────────────── */}
          <div>
            <h2 style={{
              fontSize: "clamp(30px, 3.2vw, 48px)",
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
              maxWidth: "16ch",
              marginBottom: 28
            }}>
              The map you act on,{" "}
              <span style={{ color: "var(--accent)" }}>not the list you ignore.</span>
            </h2>
            <p className="lead" style={{ maxWidth: "58ch", marginBottom: 24 }}>
              A TAM map isn't a CSV of 500K contacts. It's a structured view of your reachable
              market — segmented by fit, prioritised by timing, and refreshed every week as
              signals change. Outbound, ABM, and exec search all start from the same map.
            </p>

            <p style={{
              fontFamily: "var(--f-display)", fontWeight: 300, fontStyle: "italic",
              fontSize: 20, lineHeight: 1.4,
              color: "var(--accent)",
              borderLeft: "1px solid var(--accent)",
              paddingLeft: 18,
              maxWidth: "44ch",
              marginTop: 32
            }}>
              A TAM map is a working document, not a one-off PDF.
            </p>
          </div>

          {/* ── RIGHT: artefact ───────────────────── */}
          <div className="tam-artefact" style={{
            border: "1px solid var(--line)",
            background: "var(--bg-2)",
            padding: "20px 22px"
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 14, paddingBottom: 12,
              borderBottom: "1px solid var(--line)"
            }}>
              <span className="mono" style={{
                fontSize: 10, letterSpacing: "0.18em", color: "var(--fg-faint)"
              }}>
                EXAMPLE · MID-MARKET B2B SAAS
              </span>
              <span className="mono" style={{
                fontSize: 10, letterSpacing: "0.18em", color: "var(--fg-faint)"
              }}>
                ◆ TAM / SAM / SOM
              </span>
            </div>

            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="xMidYMid meet"
              style={{ width: "100%", height: "auto", display: "block" }}>
              {/* Crosshair (full panel) */}
              <line
                x1={0} y1={VB_H / 2} x2={VB_W} y2={VB_H / 2}
                stroke="rgba(242,242,240,0.18)"
                strokeWidth={1}
                strokeDasharray="4 4" />
              <line
                x1={VB_W / 2} y1={0} x2={VB_W / 2} y2={VB_H}
                stroke="rgba(242,242,240,0.18)"
                strokeWidth={1}
                strokeDasharray="4 4" />

              {rings.map((r) => {
                const c = colorFor(r.tone);
                const isSom = r.id === "SOM";
                return (
                  <g key={r.id}>
                    <rect
                      x={r.x} y={r.y} width={r.w} height={r.h} rx={r.r} ry={r.r}
                      fill="none"
                      stroke={c}
                      strokeWidth={1} />
                    <Ticks x={r.x} y={r.y} w={r.w} h={r.h} color={c} />

                    {/* Top-left label */}
                    <text
                      x={r.x + 10} y={r.y + 16}
                      fontFamily="var(--f-mono)"
                      fontSize="10.5"
                      letterSpacing="2"
                      fill={c}
                      style={{ textTransform: "uppercase" }}>
                      {r.label}
                    </text>

                    {/* Right-edge caption — only on outer rings; SOM stacks below label */}
                    {!isSom && (
                      <text
                        x={r.x + r.w - 10} y={r.y + 16}
                        fontFamily="var(--f-mono)"
                        fontSize="9"
                        letterSpacing="1.5"
                        textAnchor="end"
                        fill={c}>
                        {r.caption}
                      </text>
                    )}
                    {isSom && (
                      <text
                        x={r.x + 10} y={r.y + 30}
                        fontFamily="var(--f-mono)"
                        fontSize="9"
                        letterSpacing="1.5"
                        fill={c}>
                        {r.caption}
                      </text>
                    )}

                    {/* Bottom-right number */}
                    <text
                      x={r.x + r.w - 10} y={r.y + r.h - 10}
                      fontFamily="var(--f-mono)"
                      fontSize={isSom ? 16 : 14}
                      letterSpacing="1"
                      textAnchor="end"
                      fill={c}>
                      {r.count}
                      <tspan
                        fontSize="9"
                        dx="6"
                        fill={isSom ? "var(--accent)" : "rgba(242,242,240,0.4)"}>
                        ACCOUNTS
                      </tspan>
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* ── 3-up sub-grid (segment / prioritise / refresh) ── */}
        <div className="tam-steps" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          border: "1px solid var(--line)"
        }}>
          {steps.map((s, i) => (
            <div key={s.code} style={{
              padding: "40px 32px",
              borderRight: i < steps.length - 1 ? "1px solid var(--line)" : "none",
              display: "flex", flexDirection: "column", gap: 16
            }}>
              <div className="mono" style={{
                color: "var(--accent)", fontSize: 11, letterSpacing: "0.18em"
              }}>
                {s.code}
              </div>
              <div style={{
                fontFamily: "var(--f-display)", fontWeight: 300,
                fontSize: 28, lineHeight: 1.1
              }}>
                {s.t}
              </div>
              <p style={{
                color: "var(--fg-dim)", fontSize: 14, lineHeight: 1.65
              }}>
                {s.b}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section .container .tam-artefact { margin-top: 24px; }
          section .container > div[style*="grid-template-columns: 1fr 1.05fr"],
          section .container > div[style*="grid-template-columns: 1fr 1.05fr;"] {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .tam-steps {
            grid-template-columns: 1fr !important;
          }
          .tam-steps > div {
            border-right: none !important;
            border-bottom: 1px solid var(--line);
          }
          .tam-steps > div:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}

window.TamMappingView = TamMappingView;
