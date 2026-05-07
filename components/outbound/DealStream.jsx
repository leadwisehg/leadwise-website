/* global React */
// ─────────────────────────────────────────────────────────
// DEAL STREAM — Bloomberg-ticker-style results feed.
// 8 visible rows, new row fades in at top every 5–8s.
// CLOSED WON rows render entirely in accent.
// Aggregate counters at the bottom tick when matching events arrive.
// ─────────────────────────────────────────────────────────

const DS_POOL = [
  { type: "MEETING BOOKED", seg: "FINTECH · MIDMARKET",  chain: "SIG.003 → SEQ.A2 → REPLY", weight: { meet: 1 } },
  { type: "MEETING BOOKED", seg: "SAAS · ENTERPRISE",    chain: "SIG.007 → SEQ.B1 → REPLY", weight: { meet: 1 } },
  { type: "CLOSED WON",     seg: "£85K LTV",             chain: "SIG.004 → SEQ.A1 → CALL",  weight: { won: 1, ltv: 85 } },
  { type: "QUALIFIED LEAD", seg: "INTERIM EXEC SEARCH",  chain: "SIG.001 → SEQ.A3 → REPLY", weight: { lead: 1 } },
  { type: "MEETING BOOKED", seg: "INDUSTRIAL · EU",      chain: "SIG.005 → SEQ.A2 → REPLY", weight: { meet: 1 } },
  { type: "CLOSED WON",     seg: "£42K LTV",             chain: "SIG.003 → SEQ.B2 → CALL",  weight: { won: 1, ltv: 42 } },
  { type: "QUALIFIED LEAD", seg: "SAAS · MIDMARKET",     chain: "SIG.002 → SEQ.A1 → REPLY", weight: { lead: 1 } },
  { type: "MEETING BOOKED", seg: "FINTECH · ENTERPRISE", chain: "SIG.006 → SEQ.B1 → REPLY", weight: { meet: 1 } },
  { type: "QUALIFIED LEAD", seg: "FINTECH · ENTERPRISE", chain: "SIG.003 → SEQ.A2 → REPLY", weight: { lead: 1 } },
  { type: "MEETING BOOKED", seg: "RETAIL · MIDMARKET",   chain: "SIG.008 → SEQ.A3 → REPLY", weight: { meet: 1 } },
  { type: "CLOSED WON",     seg: "£128K LTV",            chain: "SIG.005 → SEQ.A1 → CALL",  weight: { won: 1, ltv: 128 } },
  { type: "QUALIFIED LEAD", seg: "HEALTHTECH · GROWTH",  chain: "SIG.004 → SEQ.B1 → REPLY", weight: { lead: 1 } },
  { type: "MEETING BOOKED", seg: "LOGISTICS · UK",       chain: "SIG.001 → SEQ.A2 → REPLY", weight: { meet: 1 } },
  { type: "QUALIFIED LEAD", seg: "INSURTECH · EU",       chain: "SIG.007 → SEQ.A1 → REPLY", weight: { lead: 1 } },
  { type: "MEETING BOOKED", seg: "DEVTOOLS · MIDMARKET", chain: "SIG.003 → SEQ.B2 → REPLY", weight: { meet: 1 } },
  { type: "CLOSED WON",     seg: "£57K LTV",             chain: "SIG.001 → SEQ.A2 → CALL",  weight: { won: 1, ltv: 57 } },
  { type: "QUALIFIED LEAD", seg: "MARTECH · ENTERPRISE", chain: "SIG.002 → SEQ.A3 → REPLY", weight: { lead: 1 } },
  { type: "MEETING BOOKED", seg: "PROPTECH · UK",        chain: "SIG.005 → SEQ.B1 → REPLY", weight: { meet: 1 } },
  { type: "QUALIFIED LEAD", seg: "FINTECH · GROWTH",     chain: "SIG.006 → SEQ.A2 → REPLY", weight: { lead: 1 } },
  { type: "MEETING BOOKED", seg: "B2B SAAS · GROWTH",    chain: "SIG.004 → SEQ.A1 → REPLY", weight: { meet: 1 } },
  { type: "CLOSED WON",     seg: "£94K LTV",             chain: "SIG.007 → SEQ.A1 → CALL",  weight: { won: 1, ltv: 94 } },
  { type: "QUALIFIED LEAD", seg: "CYBERSEC · ENTERPRISE",chain: "SIG.008 → SEQ.B2 → REPLY", weight: { lead: 1 } },
  { type: "MEETING BOOKED", seg: "EDUTECH · MIDMARKET",  chain: "SIG.002 → SEQ.A2 → REPLY", weight: { meet: 1 } },
  { type: "QUALIFIED LEAD", seg: "AI INFRA · GROWTH",    chain: "SIG.003 → SEQ.A1 → REPLY", weight: { lead: 1 } },
  { type: "MEETING BOOKED", seg: "FINTECH · UK",         chain: "SIG.001 → SEQ.B1 → REPLY", weight: { meet: 1 } },
  { type: "CLOSED WON",     seg: "£36K LTV",             chain: "SIG.002 → SEQ.A2 → CALL",  weight: { won: 1, ltv: 36 } },
  { type: "QUALIFIED LEAD", seg: "SAAS · ENTERPRISE",    chain: "SIG.005 → SEQ.A3 → REPLY", weight: { lead: 1 } },
  { type: "MEETING BOOKED", seg: "MOBILITY · EU",        chain: "SIG.004 → SEQ.A2 → REPLY", weight: { meet: 1 } },
  { type: "QUALIFIED LEAD", seg: "RETAIL · ENTERPRISE",  chain: "SIG.006 → SEQ.B1 → REPLY", weight: { lead: 1 } },
  { type: "MEETING BOOKED", seg: "HEALTHTECH · UK",      chain: "SIG.008 → SEQ.A1 → REPLY", weight: { meet: 1 } }
];

function DealStream() {
  const wrapRef = React.useRef(null);
  const reduce = React.useRef(false);

  const seed = React.useMemo(() => DS_POOL.slice(0, 8).map((r, i) => ({
    ...r, id: `seed-${i}`
  })), []);

  const [rows, setRows] = React.useState(seed);
  const [counts, setCounts] = React.useState({ leads: 156, meet: 38, won: 7, ltv: 312 });
  const [pulse, setPulse] = React.useState({ leads: false, meet: false, won: false, ltv: false });
  const idRef = React.useRef(2000);

  React.useEffect(() => {
    reduce.current = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  React.useEffect(() => {
    if (reduce.current) return;
    let inView = false;
    let timeoutId = null;
    const obs = new IntersectionObserver(([e]) => { inView = e.isIntersecting; },
      { threshold: 0.15 });
    if (wrapRef.current) obs.observe(wrapRef.current);

    const schedule = () => {
      const delay = 5000 + Math.random() * 3000;
      timeoutId = setTimeout(() => {
        if (inView) {
          const pick = DS_POOL[Math.floor(Math.random() * DS_POOL.length)];
          const newRow = { ...pick, id: `r-${idRef.current++}` };
          setRows((rs) => [newRow, ...rs.slice(0, 7)]);
          setCounts((c) => {
            const nc = { ...c };
            const w = pick.weight;
            if (w.lead) nc.leads += w.lead;
            if (w.meet) nc.meet  += w.meet;
            if (w.won)  nc.won   += w.won;
            if (w.ltv)  nc.ltv   += w.ltv;
            return nc;
          });
          const pkey = pick.weight.lead ? "leads" : pick.weight.won ? "won" : "meet";
          setPulse((p) => ({ ...p, [pkey]: true, ltv: !!pick.weight.ltv }));
          setTimeout(() => setPulse({ leads: false, meet: false, won: false, ltv: false }), 200);
        }
        schedule();
      }, delay);
    };
    schedule();
    return () => { if (timeoutId) clearTimeout(timeoutId); obs.disconnect(); };
  }, []);

  const fmt = (n) => n.toLocaleString("en-US");

  return (
    <section className="section" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="container">
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 28
        }}>
          <span className="label-accent" style={{ fontSize: 10 }}>03 / RESULTS · LIVE FEED</span>
          <span className="hint" style={{ fontSize: 9 }}>STREAMING · ROLLING 8 EVENTS</span>
        </div>

        <div ref={wrapRef} style={{
          position: "relative",
          border: "1px solid var(--line)",
          background: "rgba(10,10,12,0.85)"
        }}>
          <span className="crop-tl" /><span className="crop-tr" />
          <span className="crop-bl" /><span className="crop-br" />

          <div style={{
            fontFamily: "var(--f-mono)",
            fontSize: 12,
            lineHeight: 1.5
          }}>
            {rows.map((r, i) => {
              const isWon = r.type === "CLOSED WON";
              const color = isWon ? "var(--accent)" : "var(--fg)";
              const dim = isWon ? "var(--accent)" : "var(--fg-dim)";
              return (
                <div key={r.id} style={{
                  display: "grid",
                  gridTemplateColumns: "28px 50px 200px 1fr 360px",
                  gap: 16,
                  padding: "14px 22px",
                  borderBottom: i < rows.length - 1 ? "1px solid var(--line)" : "none",
                  alignItems: "center",
                  animation: i === 0 ? "lwDealIn 200ms ease-out" : "none"
                }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: "var(--accent)",
                    boxShadow: "0 0 6px var(--accent)",
                    animation: "lwDealPulse 1200ms ease-out infinite"
                  }} />
                  <span style={{ color: "var(--accent)", letterSpacing: "0.06em" }}>+1</span>
                  <span style={{ color, letterSpacing: "0.12em", fontSize: 11.5 }}>{r.type}</span>
                  <span style={{ color: dim, letterSpacing: "0.04em" }}>{r.seg}</span>
                  <span style={{ color: dim, textAlign: "right", letterSpacing: "0.04em" }}>{r.chain}</span>
                </div>
              );
            })}
          </div>

          {/* Aggregate footer */}
          <div style={{
            padding: "16px 22px",
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(14,14,16,0.6)"
          }}>
            <span className="hint" style={{ fontSize: 9 }}>THIS MONTH</span>
            <div style={{ display: "flex", gap: 32, fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: "0.14em" }}>
              {[
                ["LEADS",      counts.leads,         "leads", false],
                ["MEETINGS",   counts.meet,          "meet",  false],
                ["CLOSED WON", counts.won,           "won",   true],
                ["LTV",        `£${fmt(counts.ltv)}K`, "ltv",  true]
              ].map(([label, val, key, accent]) => (
                <span key={key} style={{
                  color: "var(--fg-dim)",
                  display: "inline-flex",
                  gap: 8,
                  alignItems: "baseline"
                }}>
                  <span style={{
                    color: accent ? "var(--accent)" : "var(--fg)",
                    fontVariantNumeric: "tabular-nums",
                    transition: "transform 200ms ease-out",
                    display: "inline-block",
                    transform: pulse[key] ? "scale(1.15)" : "scale(1)"
                  }}>{val}</span>
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lwDealIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lwDealPulse {
          0%   { opacity: 1; }
          50%  { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { DealStream });
