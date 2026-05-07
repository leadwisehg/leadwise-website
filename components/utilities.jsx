/* global React */

// ============================================================
// UTILITIES — Crop-mark frame wrapper, pill, section label, target
// ============================================================

function Frame({ children, style, className = "", label, meta, id }) {
  return (
    <div className={`frame ${className}`} style={style} id={id}>
      <span className="crop-tl" />
      <span className="crop-tr" />
      <span className="crop-bl" />
      <span className="crop-br" />
      {(label || meta) &&
      <div style={{
        position: "absolute", top: -9, left: 24, right: 24,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        pointerEvents: "none"
      }}>
          {label &&
        <span className="label" style={{
          background: "var(--bg)", padding: "0 10px", color: "var(--accent)"
        }}>{label}</span>
        }
          {meta &&
        <span className="label" style={{
          background: "var(--bg)", padding: "0 10px", color: "var(--fg-faint)"
        }}>{meta}</span>
        }
        </div>
      }
      {children}
    </div>);

}

function SectionLabel({ index, title, meta }) {
  return (
    <div className="section-label">
      <span className="label-accent">{index}</span>
      <span className="label-accent"></span>
      <span className="label">{title}</span>
      <span className="tick" />
      {meta && <span className="hint">{meta}</span>}
    </div>);

}

function TargetMarker({ size = 10 }) {
  return <span className="target" style={{ width: size, height: size }} />;
}

function Pill({ kind = "default", children }) {
  const cls = {
    hot: "pill pill-hot",
    warm: "pill pill-warm",
    cold: "pill pill-cold",
    default: "pill"
  }[kind];
  return <span className={cls}><span className="pd" />{children}</span>;
}

function Arrow({ dir = "right" }) {
  const map = { right: "→", up: "↑", down: "↓", left: "←", ne: "↗" };
  return <span className="arrow mono" aria-hidden>{map[dir]}</span>;
}

// Tiny wave-bar "signal strength"
function SignalBars({ strength = "strong" }) {
  const levels = { low: 1, good: 2, strong: 3 }[strength] || 0;
  return (
    <span style={{ display: "inline-flex", gap: 2, alignItems: "flex-end", height: 12 }}>
      {[4, 7, 10].map((h, i) =>
      <span key={i} style={{
        width: 3, height: h,
        background: i < levels ? "var(--accent)" : "var(--fg-ghost)",
        display: "inline-block"
      }} />
      )}
    </span>);

}

// Avatar circle
function Avatar({ initials, hue = 200 }) {
  return (
    <span style={{
      width: 28, height: 28, borderRadius: "50%",
      background: `oklch(0.55 0.08 ${hue})`,
      color: "#0a0a0b",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--f-mono)", fontSize: 10, fontWeight: 600,
      letterSpacing: "0.04em"
    }}>{initials}</span>);

}

// A small corner-bracket used as an icon inside feature cards
function BracketIcon({ size = 28, children }) {
  return (
    <span style={{
      width: size, height: size, position: "relative",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      color: "var(--accent)"
    }}>
      <span style={{ position: "absolute", top: 0, left: 0, width: 6, height: 6, borderTop: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" }} />
      <span style={{ position: "absolute", top: 0, right: 0, width: 6, height: 6, borderTop: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" }} />
      <span style={{ position: "absolute", bottom: 0, left: 0, width: 6, height: 6, borderBottom: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" }} />
      <span style={{ position: "absolute", bottom: 0, right: 0, width: 6, height: 6, borderBottom: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" }} />
      {children}
    </span>);

}

Object.assign(window, { Frame, SectionLabel, TargetMarker, Pill, Arrow, SignalBars, Avatar, BracketIcon });