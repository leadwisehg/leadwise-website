/* global React */
// ─────────────────────────────────────────────────────────
// LIVE PIPELINE — KPI instrument panel for the hero
// 1px wireframe box w/ corner ticks, 4 KPI rows w/ ASCII bars.
// Counts up on viewport enter, drifts every 6s thereafter.
// ─────────────────────────────────────────────────────────

function LivePipelinePanel() {
  // Targets — what the panel "settles" to on first render.
  const KPIS = [
    { id: "sent",    label: "EMAILS SENT",    base: 65612, step: [50, 300] },
    { id: "reached", label: "PEOPLE REACHED", base: 32806, step: [50, 300] },
    { id: "replies", label: "REPLIES",        base:   950, step: [1, 4]    },
    { id: "leads",   label: "LEADS BOOKED",   base:   156, step: [1, 4], accent: true }
  ];

  const wrapRef = React.useRef(null);
  const [values, setValues] = React.useState(KPIS.map(() => 0));
  const [secondsAgo, setSecondsAgo] = React.useState(12);
  const [pulseDot, setPulseDot] = React.useState(true);
  const startedRef = React.useRef(false);
  const reduce = React.useRef(false);

  // Reduced motion check
  React.useEffect(() => {
    reduce.current = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Count-up on viewport enter
  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          if (reduce.current) {
            setValues(KPIS.map(k => k.base));
            return;
          }
          // Stagger 200ms per row, 1200ms ease-out count
          KPIS.forEach((k, i) => {
            const delay = i * 200;
            const dur = 1200;
            const start = performance.now() + delay;
            const tick = (now) => {
              const t = Math.max(0, Math.min(1, (now - start) / dur));
              const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
              setValues((vs) => {
                const nv = vs.slice();
                nv[i] = Math.round(k.base * eased);
                return nv;
              });
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
        }
      });
    }, { threshold: 0.25 });
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  // Live drift — every 6000ms, increment + reset stale-time
  React.useEffect(() => {
    if (reduce.current) return;
    let inView = false;
    const obs = new IntersectionObserver(([e]) => { inView = e.isIntersecting; },
      { threshold: 0.1 });
    if (wrapRef.current) obs.observe(wrapRef.current);

    const driftId = setInterval(() => {
      if (!inView || !startedRef.current) return;
      setValues((vs) => vs.map((v, i) => {
        const [a, b] = KPIS[i].step;
        return v + a + Math.floor(Math.random() * (b - a + 1));
      }));
      setSecondsAgo(1);
    }, 6000);

    const tickId = setInterval(() => {
      if (!inView) return;
      setSecondsAgo((s) => s + 1);
    }, 1000);

    return () => { clearInterval(driftId); clearInterval(tickId); obs.disconnect(); };
  }, []);

  // Live dot pulse — handled w/ inline keyframes via style block (1200ms)
  React.useEffect(() => {
    if (reduce.current) return;
    const id = setInterval(() => setPulseDot(p => !p), 1200);
    return () => clearInterval(id);
  }, []);

  // Bar generator — 10 chars wide, scaled by ratio of value to max base
  // Use the per-KPI base as the "max" reference so the visual rhythm matches the spec
  // (sent ≈ 8/10 filled, reached ≈ 5/10, replies ≈ 1/10, leads ≈ 1/10).
  const barFor = (i, val) => {
    const ratios = [0.85, 0.55, 0.10, 0.10]; // visual targets per spec
    const ratio = ratios[i];
    const filled = Math.max(1, Math.round(ratio * 10));
    return "▓".repeat(filled) + "░".repeat(10 - filled);
  };

  const fmt = (n) => n.toLocaleString("en-US");

  return (
    <div ref={wrapRef} style={{
      position: "relative",
      border: "1px solid var(--line)",
      background: "rgba(14,14,16,0.55)",
      padding: "22px 24px 18px"
    }}>
      {/* corner ticks */}
      <span className="crop-tl" /><span className="crop-tr" />
      <span className="crop-bl" /><span className="crop-br" />

      {/* top label */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <span className="label-accent" style={{ fontSize: 10 }}>
          [ LIVE PIPELINE · LAST 30 DAYS ]
        </span>
        <span className="hint" style={{ fontSize: 9 }}>OUT.LIVE/v2.4</span>
      </div>

      {/* KPI rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {KPIS.map((k, i) => {
          const isAccent = !!k.accent;
          const color = isAccent ? "var(--accent)" : "var(--fg)";
          const dim = isAccent ? "var(--accent)" : "var(--fg-faint)";
          return (
            <div key={k.id} style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              gap: 18,
              alignItems: "baseline"
            }}>
              <span className="mono" style={{
                fontSize: 10.5,
                letterSpacing: "0.16em",
                color: isAccent ? "var(--accent)" : "var(--fg-dim)"
              }}>
                {k.label}
              </span>
              <span className="mono" style={{
                fontSize: 14,
                color,
                letterSpacing: "0.04em",
                fontVariantNumeric: "tabular-nums",
                minWidth: 78,
                textAlign: "right"
              }}>
                {fmt(values[i])}
              </span>
              <span className="mono" style={{
                fontSize: 12,
                color: dim,
                letterSpacing: "0.04em",
                whiteSpace: "pre"
              }}>
                {barFor(i, values[i])}
              </span>
            </div>
          );
        })}
      </div>

      {/* bottom row */}
      <div style={{
        marginTop: 20,
        paddingTop: 14,
        borderTop: "1px solid var(--line)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <span className="hint" style={{ fontSize: 9 }}>
          LAST UPDATE · {secondsAgo}s AGO
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            display: "inline-block",
            width: 7, height: 7, borderRadius: "50%",
            background: "var(--accent)",
            opacity: pulseDot ? 1 : 0.3,
            transition: "opacity 1200ms ease-out",
            boxShadow: pulseDot ? "0 0 8px var(--accent)" : "none"
          }} />
          <span className="hint" style={{ fontSize: 9, color: "var(--accent)" }}>LIVE</span>
        </span>
      </div>
    </div>
  );
}

Object.assign(window, { LivePipelinePanel });
