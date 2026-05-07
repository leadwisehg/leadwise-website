/* global React */
// ─────────────────────────────────────────────────────────
// SIGNAL ENGINE TERMINAL — live scrolling signal log
// 8 visible rows, new row fades in at top every 4–6s.
// Strength ≥ 85 in accent. Status QUEUED solid, WATCH dim.
// ─────────────────────────────────────────────────────────

// Each signal type gets a distinct, restrained background color so
// rows scan visually at a glance — all derived from a single muted
// editorial palette to keep harmony with the page accent.
const SIG_TYPES = {
  "SIG.001": { name: "Hiring", bg: "rgba(186,139,142,0.16)", fg: "#e3b9bb" }, // accent family
  "SIG.002": { name: "Tech Stack", bg: "rgba(150,170,190,0.16)", fg: "#b6cadd" }, // cool blue
  "SIG.003": { name: "Funding", bg: "rgba(201,178,138,0.18)", fg: "#e0c993" }, // sand
  "SIG.004": { name: "Expansion", bg: "rgba(142,186,164,0.16)", fg: "#aedcc4" }, // mint
  "SIG.005": { name: "Exec Move", bg: "rgba(186,160,210,0.16)", fg: "#cfb6e0" }, // lilac
  "SIG.006": { name: "Earnings", bg: "rgba(214,174,150,0.16)", fg: "#e5c2a6" }, // peach
  "SIG.007": { name: "M&A / Press", bg: "rgba(202,150,150,0.18)", fg: "#deb0b0" }, // rose
  "SIG.008": { name: "Job Posts", bg: "rgba(176,196,144,0.16)", fg: "#d0dcae" } // olive
};

const SE_POOL = [
{ sig: "SIG.001", co: "Northwind Ltd", evt: "Head of Growth hired", str: 78, status: "QUEUED" },
{ sig: "SIG.002", co: "Initech", evt: "Tech stack change", str: 71, status: "QUEUED" },
{ sig: "SIG.003", co: "Acme Corp", evt: "Series B · $40M", str: 91, status: "QUEUED" },
{ sig: "SIG.004", co: "Fabrikam", evt: "Office opening · London", str: 88, status: "QUEUED" },
{ sig: "SIG.005", co: "Vertex Holdings", evt: "Exec hire · CRO", str: 86, status: "QUEUED" },
{ sig: "SIG.006", co: "Soylent Industries", evt: "Earnings beat · Q2", str: 69, status: "WATCH" },
{ sig: "SIG.007", co: "Contoso", evt: "Press · M&A rumor", str: 64, status: "WATCH" },
{ sig: "SIG.008", co: "Stark Co", evt: "Job posting · 12 roles", str: 67, status: "WATCH" },
{ sig: "SIG.001", co: "Wayne Industries", evt: "VP Marketing hired", str: 73, status: "QUEUED" },
{ sig: "SIG.002", co: "Pied Piper", evt: "Migration · GCP → AWS", str: 81, status: "QUEUED" },
{ sig: "SIG.003", co: "Hooli", evt: "Series C · $180M", str: 94, status: "QUEUED" },
{ sig: "SIG.004", co: "Dunder Mifflin", evt: "Office opening · Berlin", str: 76, status: "QUEUED" },
{ sig: "SIG.005", co: "Oscorp", evt: "Exec hire · CFO", str: 89, status: "QUEUED" },
{ sig: "SIG.006", co: "Nakatomi Trading", evt: "Earnings · miss", str: 58, status: "WATCH" },
{ sig: "SIG.007", co: "Cyberdyne", evt: "Press · acquisition", str: 92, status: "QUEUED" },
{ sig: "SIG.008", co: "Massive Dynamic", evt: "Job posting · 30 roles", str: 85, status: "QUEUED" },
{ sig: "SIG.001", co: "Tyrell Corp", evt: "Head of Sales hired", str: 79, status: "QUEUED" },
{ sig: "SIG.002", co: "Globex", evt: "Tech stack · Snowflake", str: 74, status: "QUEUED" },
{ sig: "SIG.003", co: "Umbrella Co", evt: "Series A · $12M", str: 83, status: "QUEUED" },
{ sig: "SIG.004", co: "Bluth Company", evt: "Office opening · NYC", str: 70, status: "QUEUED" },
{ sig: "SIG.005", co: "Vandelay Imports", evt: "Exec hire · COO", str: 87, status: "QUEUED" },
{ sig: "SIG.006", co: "Pearson Hardman", evt: "Earnings beat · Q3", str: 72, status: "QUEUED" },
{ sig: "SIG.007", co: "Los Pollos Hmns", evt: "Press · lawsuit", str: 61, status: "WATCH" },
{ sig: "SIG.008", co: "Primatech", evt: "Job posting · 8 roles", str: 66, status: "WATCH" },
{ sig: "SIG.001", co: "Wonka Industries", evt: "VP Product hired", str: 82, status: "QUEUED" }];


function SignalEngineTerminal() {
  const wrapRef = React.useRef(null);
  const reduce = React.useRef(false);

  const seed = React.useMemo(() => {
    const now = new Date();
    const initial = [
    { sig: "SIG.003", co: "Acme Corp", evt: "Series B · $40M", str: 91, status: "QUEUED", t: -3 },
    { sig: "SIG.001", co: "Northwind Ltd", evt: "Head of Growth hired", str: 78, status: "QUEUED", t: -6 },
    { sig: "SIG.007", co: "Contoso", evt: "Press · M&A rumor", str: 64, status: "WATCH", t: -13 },
    { sig: "SIG.004", co: "Fabrikam", evt: "Office opening · London", str: 88, status: "QUEUED", t: -22 },
    { sig: "SIG.002", co: "Initech", evt: "Tech stack change", str: 71, status: "QUEUED", t: -29 },
    { sig: "SIG.005", co: "Vertex Holdings", evt: "Exec hire · CRO", str: 86, status: "QUEUED", t: -36 },
    { sig: "SIG.001", co: "Wayne Industries", evt: "VP Marketing hired", str: 73, status: "QUEUED", t: -53 },
    { sig: "SIG.008", co: "Stark Co", evt: "Job posting · 12 roles", str: 67, status: "WATCH", t: -72 }];

    return initial.map((r, i) => ({
      ...r,
      id: `seed-${i}`,
      time: new Date(now.getTime() + r.t * 1000)
    }));
  }, []);

  const [rows, setRows] = React.useState(seed);
  const idCounter = React.useRef(1000);

  React.useEffect(() => {
    reduce.current = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  React.useEffect(() => {
    if (reduce.current) return;
    let inView = false;
    let timeoutId = null;
    const obs = new IntersectionObserver(([e]) => {inView = e.isIntersecting;},
    { threshold: 0.2 });
    if (wrapRef.current) obs.observe(wrapRef.current);

    const schedule = () => {
      const delay = 4000 + Math.random() * 2000;
      timeoutId = setTimeout(() => {
        if (inView) {
          const pick = SE_POOL[Math.floor(Math.random() * SE_POOL.length)];
          const newRow = {
            ...pick,
            id: `r-${idCounter.current++}`,
            time: new Date()
          };
          setRows((rs) => [newRow, ...rs.slice(0, 7)]);
        }
        schedule();
      }, delay);
    };
    schedule();
    return () => {if (timeoutId) clearTimeout(timeoutId);obs.disconnect();};
  }, []);

  const fmtTime = (d) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  // Shared column template — header and rows must match exactly.
  const COLS = "70px 140px 1.7fr 1.3fr 120px 92px";

  return (
    <section className="section" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "0.85fr 1.15fr",
          gap: 56,
          alignItems: "start"
        }}>
          {/* Left column */}
          <div>
            <div className="label-accent" style={{ marginBottom: 22, fontSize: 10 }}>[ 02 / THE SIGNAL ENGINE ]

            </div>
            <h2 style={{
              fontFamily: "var(--f-display)",
              fontWeight: 300,
              fontSize: "clamp(36px, 4.4vw, 60px)",
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
              margin: 0,
              marginBottom: 24
            }}>
              Outbound starts when something changes.
            </h2>
            <p style={{
              color: "var(--fg-dim)",
              fontSize: 15.5,
              lineHeight: 1.6,
              maxWidth: "44ch",
              margin: 0
            }}>
              Funding, hiring, exec moves, M&amp;A. We watch 48+ signal types and
              queue accounts within 24 hours of a trigger firing — so your first
              message lands when attention is highest.
            </p>
          </div>

          {/* Right column — terminal */}
          <div ref={wrapRef} style={{
            position: "relative",
            border: "1px solid var(--line)",
            background: "rgba(10,10,12,0.85)"
          }}>
            <span className="crop-tl" /><span className="crop-tr" />
            <span className="crop-bl" /><span className="crop-br" />

            {/* Header bar */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 18px",
              borderBottom: "1px solid var(--line)"
            }}>
              <span className="label-accent" style={{ fontSize: 10 }}>
                [ SIGNAL STREAM · LIVE ]
              </span>
              <span className="hint" style={{ fontSize: 9 }}>
                48+ TYPES TRACKED · 24H QUEUE
              </span>
            </div>

            {/* Column header row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: COLS,
              gap: 12,
              padding: "10px 18px",
              borderBottom: "1px solid var(--line)",
              background: "rgba(14,14,16,0.6)"
            }}>
              {["Time", "Signal type", "Company", "Event", "Strength", "Status"].map((h, i) =>
              <span key={h} style={{
                fontFamily: "var(--f-mono)",
                fontSize: 9.5,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--fg-faint)",
                textAlign: i === 5 ? "right" : "left"
              }}>{h}</span>
              )}
            </div>

            {/* Body */}
            <div style={{ padding: "6px 0" }}>
              {rows.map((r, i) => {
                const isHot = r.str >= 85;
                const isWatch = r.status === "WATCH";
                const type = SIG_TYPES[r.sig] || { name: r.sig, bg: "var(--accent-faint)", fg: "var(--fg)" };
                const strColor = isHot ? "var(--accent)" : "var(--fg)";
                const statusBg = isWatch ? "transparent" : "rgba(186,139,142,0.14)";
                const statusFg = isWatch ? "var(--fg-faint)" : "var(--accent)";
                const statusBorder = isWatch ? "var(--line-strong)" : "var(--accent-dim)";

                return (
                  <div key={r.id} style={{
                    display: "grid",
                    gridTemplateColumns: COLS,
                    gap: 12,
                    padding: "10px 18px",
                    alignItems: "center",
                    animation: i === 0 ? "lwSigIn 200ms ease-out" : "none"
                  }}>
                    {/* Time — mono for tabular alignment */}
                    <span style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 11,
                      color: "var(--fg-faint)",
                      letterSpacing: "0.04em"
                    }}>{fmtTime(r.time)}</span>

                    {/* Signal type — colored chip with type name */}
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "4px 9px",
                      background: type.bg,
                      color: type.fg,
                      fontFamily: "var(--f-body)",
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: "0.01em",
                      width: "fit-content",
                      whiteSpace: "nowrap"
                    }}>
                      <span style={{
                        width: 5, height: 5,
                        background: type.fg,
                        flexShrink: 0
                      }} />
                      {type.name}
                    </span>

                    {/* Company — body font, prominent */}
                    <span style={{
                      fontFamily: "var(--f-body)",
                      fontSize: 14,
                      color: "var(--fg)",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>{r.co}</span>

                    {/* Event — body font */}
                    <span style={{
                      fontFamily: "var(--f-body)",
                      fontSize: 13.5,
                      color: "var(--fg-dim)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>{r.evt}</span>

                    {/* Strength — mono number + tiny bar */}
                    <span style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8
                    }}>
                      <span style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 11.5,
                        color: strColor,
                        fontVariantNumeric: "tabular-nums",
                        minWidth: 38
                      }}>{r.str}</span>
                      <span style={{
                        flex: 1,
                        height: 4,
                        background: "rgba(242,242,240,0.08)",
                        position: "relative",
                        overflow: "hidden"
                      }}>
                        <span style={{
                          position: "absolute",
                          left: 0, top: 0, bottom: 0,
                          width: `${r.str}%`,
                          background: strColor
                        }} />
                      </span>
                    </span>

                    {/* Status — pill */}
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "3px 10px",
                      border: `1px solid ${statusBorder}`,
                      background: statusBg,
                      color: statusFg,
                      fontFamily: "var(--f-mono)",
                      fontSize: 9.5,
                      letterSpacing: "0.16em",
                      justifySelf: "end"
                    }}>{r.status}</span>
                  </div>);

              })}
            </div>

            {/* Bottom caption */}
            <div style={{
              padding: "12px 18px",
              borderTop: "1px solid var(--line)",
              display: "flex",
              justifyContent: "flex-end"
            }}>
              <span className="hint" style={{ fontSize: 9, color: "var(--accent)" }}>
                → EXPLORE THE FULL SIGNAL LIBRARY
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lwSigIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </section>);

}

Object.assign(window, { SignalEngineTerminal });