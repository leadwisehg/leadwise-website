/* global React */

// ─────────────────────────────────────────────────────────
// Market Intelligence — radial scanning motion graphic.
// Three concentric rings (DATA / SIGNALS / INTERPRETATION),
// a single rotating sweep arm, and pre-placed activation
// points that pulse + emit a fade line inward as the arm
// crosses them.
//
// Palette: matches the site — transparent on dark --bg,
// off-white --fg for rings/ticks/labels, --accent (rose
// pink) for sweep arm, active dots, fade lines, center
// square. Pure SVG + CSS animations. ViewBox-driven.
// ─────────────────────────────────────────────────────────

function IntelHeroGraphic() {
  // ── Geometry ──────────────────────────────────────────
  const cx = 200;
  const cy = 200;
  const RINGS = [
    { id: "data",          label: "DATA",           r: 175 },
    { id: "signals",       label: "SIGNALS",        r: 130 },
    { id: "interpretation",label: "INTERPRETATION", r: 85  }
  ];

  // ── Activation points ─────────────────────────────────
  // Angles in degrees, clockwise from 12 o'clock (matches
  // the sweep). Sweep period = 8s → for each point we set
  // a CSS animation-delay so its pulse fires when the arm
  // crosses its angle.
  const POINTS = [
    // DATA ring (3)
    { ring: "data",           angle:  35 },
    { ring: "data",           angle: 158 },
    { ring: "data",           angle: 274 },
    // SIGNALS ring (3) — offset from DATA angles
    { ring: "signals",        angle:  78 },
    { ring: "signals",        angle: 205 },
    { ring: "signals",        angle: 322 },
    // INTERPRETATION ring (2)
    { ring: "interpretation", angle: 120 },
    { ring: "interpretation", angle: 248 }
  ];

  // SIGNALS labels cycle through this list, one per activation
  // event. With 3 SIGNALS points and 8 phrases, the rotation
  // visits a different combination each cycle.
  const SIGNAL_PHRASES = [
    "FUNDING ROUND", "EXEC CHANGE", "HIRING SPIKE", "M&A",
    "EXPANSION", "RESTRUCTURING", "PRODUCT LAUNCH", "REGULATORY SHIFT"
  ];

  // ── Helpers ───────────────────────────────────────────
  const polar = (r, deg) => {
    const rad = (deg - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
  const ringByID = (id) => RINGS.find((r) => r.id === id);

  // 12 ticks per ring, clock-face style.
  const renderTicks = (r) => {
    const ticks = [];
    for (let i = 0; i < 12; i++) {
      const angle = i * 30;
      const inner = polar(r - 4, angle);
      const outer = polar(r + 4, angle);
      ticks.push(
        <line
          key={i}
          x1={inner.x} y1={inner.y}
          x2={outer.x} y2={outer.y}
          stroke="var(--fg)" strokeWidth="0.8" opacity="0.32"
        />
      );
    }
    return ticks;
  };

  // Ring label position outside the ring at ~2 o'clock (60°).
  const ringLabelPos = (r) => polar(r + 18, 60);

  // ── Per-point precomputation ──────────────────────────
  const SWEEP_PERIOD = 8; // seconds
  const enriched = POINTS.map((p, i) => {
    const ring = ringByID(p.ring);
    const pos = polar(ring.r, p.angle);
    const delay = (p.angle / 360) * SWEEP_PERIOD;
    return { ...p, ringR: ring.r, pos, delay, idx: i };
  });

  // ── Reduced motion ────────────────────────────────────
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const signalsPoints = enriched.filter((p) => p.ring === "signals");

  return (
    <div style={{
      width: "100%", maxWidth: 640, aspectRatio: "1 / 1",
      margin: "0 auto", position: "relative",
      // Subtle accent corner-frame, matching the site's crop-marks
      padding: 4
    }}>
      <style>{`
        @keyframes intel-sweep {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes intel-pulse-point {
          0%, 100%   { transform: scale(0); opacity: 0; }
          0.1%       { transform: scale(0); opacity: 0; }
          2%         { transform: scale(1.4); opacity: 1; }
          5%         { transform: scale(1); opacity: 1; }
          15%        { transform: scale(1); opacity: 1; }
          25%        { transform: scale(1); opacity: 0.85; }
        }
        @keyframes intel-line-fade {
          0%, 100%   { opacity: 0; }
          2%         { opacity: 0.6; }
          15%        { opacity: 0; }
        }
        @keyframes intel-center-pulse {
          0%, 100%   { transform: scale(1); }
          92%        { transform: scale(1); }
          96%        { transform: scale(1.18); }
          100%       { transform: scale(1); }
        }
        @keyframes intel-signal-label {
          0%, 100%   { opacity: 0; }
          2%         { opacity: 1; }
          12%        { opacity: 1; }
          15%        { opacity: 0; }
        }
        .intel-sweep-arm {
          transform-origin: 200px 200px;
          animation: intel-sweep 8s linear infinite;
        }
        .intel-point-dot {
          transform-box: fill-box;
          transform-origin: center;
        }
        .intel-center-square {
          transform-box: fill-box;
          transform-origin: center;
          animation: intel-center-pulse 8s ease-in-out infinite;
        }
        .intel-reduced .intel-sweep-arm,
        .intel-reduced .intel-center-square { animation: none; }
        .intel-reduced .intel-point-dot { opacity: 1 !important; transform: scale(1) !important; }
        .intel-reduced .intel-pulse-line { opacity: 0.4 !important; }
        .intel-reduced .intel-signal-label { opacity: 1 !important; }
      `}</style>

      <svg
        viewBox="0 0 400 400"
        width="100%" height="100%"
        className={reduced ? "intel-reduced" : ""}
        aria-label="Market intelligence visualization: continuous scanning across data, signals, and interpretation layers"
        role="img"
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          {/* Sweep gradient: pink fades to nothing across the arm */}
          <linearGradient id="intel-sweep-grad" x1="0" y1="100%" x2="0" y2="0">
            <stop offset="0%"   stopColor="var(--accent)" stopOpacity="0.65" />
            <stop offset="60%"  stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          {/* Soft wedge for the leading edge of the sweep */}
          <radialGradient id="intel-sweep-wedge" cx="50%" cy="100%" r="100%">
            <stop offset="0%"  stopColor="var(--accent)" stopOpacity="0.18" />
            <stop offset="80%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Corner crop-marks (matches site frame language) ── */}
        {[
          { x: 8,   y: 8,   path: "M0,8 L0,0 L8,0" },
          { x: 392, y: 8,   path: "M0,0 L8,0 L8,8" },
          { x: 8,   y: 392, path: "M0,0 L0,8 L8,8" },
          { x: 392, y: 392, path: "M0,8 L8,8 L8,0" }
        ].map((c, i) => (
          <path
            key={`crop-${i}`}
            d={c.path}
            transform={`translate(${c.x - 4}, ${c.y - 4})`}
            fill="none" stroke="var(--accent)" strokeWidth="1"
          />
        ))}

        {/* ── Rings + ticks + labels ───────────────────── */}
        {RINGS.map((ring) => {
          const lp = ringLabelPos(ring.r);
          return (
            <g key={ring.id}>
              <circle
                cx={cx} cy={cy} r={ring.r}
                fill="none" stroke="var(--fg)"
                strokeWidth="1" opacity="0.45"
              />
              {renderTicks(ring.r)}
              {/* Label backplate so the ring stroke doesn't cross the text */}
              <rect
                x={lp.x - 4} y={lp.y - 6}
                width={ring.label.length * 5.6 + 8} height="12"
                fill="var(--bg)"
              />
              <text
                x={lp.x} y={lp.y}
                fill="var(--fg)" opacity="0.85"
                fontSize="9" letterSpacing="0.16em"
                fontFamily="var(--f-mono)"
                textAnchor="start" dominantBaseline="middle"
              >
                {ring.label}
              </text>
            </g>
          );
        })}

        {/* ── Sweep arm (rotating radar) ──────────────── */}
        <g className="intel-sweep-arm">
          {/* soft trailing wedge */}
          <path
            d={`M ${cx},${cy} L ${cx - 28},${cy - 175} A 175 175 0 0 1 ${cx + 28},${cy - 175} Z`}
            fill="url(#intel-sweep-wedge)"
          />
          {/* leading line */}
          <line
            x1={cx} y1={cy}
            x2={cx} y2={cy - 175}
            stroke="url(#intel-sweep-grad)"
            strokeWidth="1.25"
          />
          {/* small leading dot at outer edge */}
          <circle
            cx={cx} cy={cy - 175} r="2.5"
            fill="var(--accent)" opacity="0.85"
          />
        </g>

        {/* ── Activation points + inward fade-lines ──── */}
        {enriched.map((p) => {
          const animDelay = `-${(SWEEP_PERIOD - p.delay).toFixed(3)}s`;
          return (
            <g key={`pt-${p.idx}`}>
              <line
                x1={p.pos.x} y1={p.pos.y}
                x2={cx} y2={cy}
                stroke="var(--accent)" strokeWidth="0.8"
                className="intel-pulse-line"
                style={{
                  opacity: 0,
                  animation: `intel-line-fade ${SWEEP_PERIOD}s linear infinite`,
                  animationDelay: animDelay
                }}
              />
              <circle
                cx={p.pos.x} cy={p.pos.y} r="3.5"
                fill="var(--accent)"
                className="intel-point-dot"
                style={{
                  animation: `intel-pulse-point ${SWEEP_PERIOD}s ease-out infinite`,
                  animationDelay: animDelay
                }}
              />
            </g>
          );
        })}

        {/* ── SIGNALS phrase labels (cycling) ─────────── */}
        {signalsPoints.map((p, sIdx) => {
          const labelOffset = polar(p.ringR + 14, p.angle);
          const textAnchor = p.angle > 180 ? "end" : "start";
          const phrasesToRender = reduced
            ? [SIGNAL_PHRASES[sIdx % SIGNAL_PHRASES.length]]
            : SIGNAL_PHRASES;
          return phrasesToRender.map((phrase, phraseIdx) => {
            const totalPeriod = SWEEP_PERIOD * SIGNAL_PHRASES.length; // 64s
            const phraseCycle = (phraseIdx + sIdx * 3) % SIGNAL_PHRASES.length;
            const phraseDelay = phraseCycle * SWEEP_PERIOD + p.delay;
            const animDelay = reduced ? "0s" : `-${(totalPeriod - phraseDelay).toFixed(3)}s`;
            return (
              <text
                key={`lbl-${sIdx}-${phraseIdx}`}
                x={labelOffset.x} y={labelOffset.y}
                fill="var(--accent)"
                fontSize="8.5" letterSpacing="0.16em"
                fontFamily="var(--f-mono)"
                textAnchor={textAnchor} dominantBaseline="middle"
                className="intel-signal-label"
                style={{
                  opacity: 0,
                  animation: reduced ? "none" : `intel-signal-label ${totalPeriod}s linear infinite`,
                  animationDelay: animDelay
                }}
              >
                {phrase}
              </text>
            );
          });
        })}

        {/* ── Center: filled square + ACCOUNT label ─── */}
        <rect
          x={cx - 5} y={cy - 5} width="10" height="10"
          fill="var(--accent)"
          className="intel-center-square"
        />
        <text
          x={cx} y={cy + 22}
          fill="var(--fg)" opacity="0.85"
          fontSize="9" letterSpacing="0.16em"
          fontFamily="var(--f-mono)"
          textAnchor="middle" dominantBaseline="middle"
        >
          ACCOUNT
        </text>
      </svg>
    </div>
  );
}

Object.assign(window, { IntelHeroGraphic });
