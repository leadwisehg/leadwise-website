/* global React */
// ─────────────────────────────────────────────────────────
// SIGNAL → SEND — mini animated 6-stage pipeline
// 4×4 accent square travels left→right pausing 600ms per stage.
// Loop = 6000ms total, then 1200ms pause + reset w/ swapped data.
// Replies counter ticks +1 each completed loop.
// ─────────────────────────────────────────────────────────

const STS_STAGES = ["SIGNAL DETECTED", "ENRICH", "SCORE", "COPY", "SEND", "REPLY"];

const STS_POOL = [
  { co: "ACME · SERIES B",       enrich: "+CONTACTS",  score: "91/100", copy: "v3 · 48s", send: "INBOX 02", reply: "+1" },
  { co: "NORTHWIND · VP HIRE",   enrich: "+CONTACTS",  score: "78/100", copy: "v2 · 36s", send: "INBOX 01", reply: "+1" },
  { co: "FABRIKAM · OFFICE",     enrich: "+CONTACTS",  score: "88/100", copy: "v1 · 41s", send: "INBOX 03", reply: "+1" },
  { co: "VERTEX · CRO HIRE",     enrich: "+CONTACTS",  score: "86/100", copy: "v3 · 52s", send: "INBOX 02", reply: "+1" },
  { co: "HOOLI · SERIES C",      enrich: "+CONTACTS",  score: "94/100", copy: "v2 · 39s", send: "INBOX 04", reply: "+1" },
  { co: "TYRELL · SALES HIRE",   enrich: "+CONTACTS",  score: "79/100", copy: "v1 · 44s", send: "INBOX 01", reply: "+1" }
];

function SignalToSendPipeline() {
  const wrapRef = React.useRef(null);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [poolIdx, setPoolIdx] = React.useState(0);
  const [replies, setReplies] = React.useState(38);
  const [counterPulse, setCounterPulse] = React.useState(false);
  const reduce = React.useRef(false);

  React.useEffect(() => {
    reduce.current = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  React.useEffect(() => {
    if (reduce.current) {
      setActiveIdx(STS_STAGES.length - 1);
      return;
    }
    let inView = false;
    let timeouts = [];
    const obs = new IntersectionObserver(([e]) => { inView = e.isIntersecting; },
      { threshold: 0.2 });
    if (wrapRef.current) obs.observe(wrapRef.current);

    const runLoop = () => {
      if (!inView) {
        timeouts.push(setTimeout(runLoop, 1000));
        return;
      }
      // Walk through stages 0→5, pausing 600ms at each. 6 stages × 1000ms = 6000ms total.
      // We use 1000ms per stage so stage = pause(600) + travel(400) ≈ matches spec.
      STS_STAGES.forEach((_, i) => {
        timeouts.push(setTimeout(() => setActiveIdx(i), i * 1000));
      });
      // After reaching REPLY, increment counter
      timeouts.push(setTimeout(() => {
        setReplies((r) => r + 1);
        setCounterPulse(true);
        setTimeout(() => setCounterPulse(false), 200);
      }, (STS_STAGES.length - 1) * 1000 + 200));
      // 1200ms pause, then swap pool item & restart
      timeouts.push(setTimeout(() => {
        setPoolIdx((p) => (p + 1) % STS_POOL.length);
        setActiveIdx(0);
        runLoop();
      }, STS_STAGES.length * 1000 + 1200));
    };
    runLoop();
    return () => { timeouts.forEach(clearTimeout); obs.disconnect(); };
  }, []);

  const data = STS_POOL[poolIdx];
  const captions = [data.co, data.enrich, data.score, data.copy, data.send, data.reply];

  return (
    <section className="section" style={{ paddingTop: 64, paddingBottom: 96 }}>
      <div className="container">
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 28
        }}>
          <span className="hint">└ FROM SIGNAL TO SEND · 6-STAGE FLOW</span>
          <span className="hint">
            REPLIES TODAY ·{" "}
            <span style={{
              color: "var(--accent)",
              fontVariantNumeric: "tabular-nums",
              transition: "transform 200ms ease-out",
              display: "inline-block",
              transform: counterPulse ? "scale(1.15)" : "scale(1)"
            }}>{replies}</span>
          </span>
        </div>

        <div ref={wrapRef} style={{
          position: "relative",
          border: "1px solid var(--line)",
          background: "rgba(14,14,16,0.4)",
          padding: "44px 24px 28px"
        }}>
          <span className="crop-tl" /><span className="crop-tr" />
          <span className="crop-bl" /><span className="crop-br" />

          {/* Pipeline row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${STS_STAGES.length}, 1fr)`,
            alignItems: "center",
            position: "relative"
          }}>
            {STS_STAGES.map((label, i) => {
              const isActive = i === activeIdx;
              return (
                <div key={i} style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                  position: "relative"
                }}>
                  {/* Connector line to the right of all but last stage */}
                  {i < STS_STAGES.length - 1 && (
                    <div style={{
                      position: "absolute",
                      top: 22,
                      left: "calc(50% + 60px)",
                      right: "calc(-50% + 60px)",
                      borderTop: "1px dashed var(--line-strong)",
                      height: 0
                    }} />
                  )}

                  {/* Pill */}
                  <div style={{
                    position: "relative",
                    border: `1px solid ${isActive ? "var(--accent)" : "var(--line-strong)"}`,
                    padding: "10px 14px",
                    background: isActive ? "var(--accent-faint)" : "transparent",
                    fontFamily: "var(--f-mono)",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    color: isActive ? "var(--accent)" : "var(--fg-dim)",
                    textAlign: "center",
                    minWidth: 110,
                    transition: "all 200ms ease-out"
                  }}>
                    {label}
                    {/* Corner ticks when active */}
                    {isActive && [
                      { top: -3, left: -3, bt: 1, bl: 1 },
                      { top: -3, right: -3, bt: 1, br: 1 },
                      { bottom: -3, left: -3, bb: 1, bl: 1 },
                      { bottom: -3, right: -3, bb: 1, br: 1 }
                    ].map((p, k) => (
                      <span key={k} style={{
                        position: "absolute",
                        width: 5, height: 5,
                        ...(p.top !== undefined ? { top: p.top } : {}),
                        ...(p.bottom !== undefined ? { bottom: p.bottom } : {}),
                        ...(p.left !== undefined ? { left: p.left } : {}),
                        ...(p.right !== undefined ? { right: p.right } : {}),
                        borderTop: p.bt ? "1px solid var(--accent)" : "none",
                        borderBottom: p.bb ? "1px solid var(--accent)" : "none",
                        borderLeft: p.bl ? "1px solid var(--accent)" : "none",
                        borderRight: p.br ? "1px solid var(--accent)" : "none"
                      }} />
                    ))}
                  </div>

                  {/* Caption */}
                  <span className="mono" style={{
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    color: isActive ? "var(--fg)" : "var(--fg-faint)",
                    textAlign: "center",
                    minHeight: 14,
                    transition: "color 200ms ease-out"
                  }}>
                    {captions[i]}
                  </span>
                </div>
              );
            })}

            {/* Traveling marker — 4×4 accent square, sits at midline of active pill */}
            <div style={{
              position: "absolute",
              top: 22,
              left: `calc(${(activeIdx + 0.5) / STS_STAGES.length * 100}% - 2px)`,
              width: 4, height: 4,
              background: "var(--accent)",
              boxShadow: "0 0 6px var(--accent)",
              transition: "left 400ms ease-out",
              pointerEvents: "none",
              opacity: 0
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SignalToSendPipeline });
