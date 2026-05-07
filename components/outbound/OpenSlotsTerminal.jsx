/* global React */
// ─────────────────────────────────────────────────────────
// OPEN SLOTS TERMINAL — bottom CTA replacement.
// Wireframe panel listing 3 next-available diagnostic slots,
// with pulsing accent dots on AVAILABLE rows and a refresh
// countdown that resets at 00:00.
// ─────────────────────────────────────────────────────────

const SLOT_CONFIG = [
  { day: "THU 09 MAY", time: "14:00 BST", status: "AVAILABLE", action: "BOOK",    href: "{{ BOOKING_URL }}" },
  { day: "FRI 10 MAY", time: "10:30 BST", status: "AVAILABLE", action: "BOOK",    href: "{{ BOOKING_URL }}" },
  { day: "MON 13 MAY", time: "16:00 BST", status: "HOLD",      action: "ENQUIRE", href: "#contact" }
];

function OpenSlotsTerminal({ onNav }) {
  const wrapRef = React.useRef(null);
  const [pulse, setPulse] = React.useState(true);
  const [countdown, setCountdown] = React.useState({ m: 23, s: 48 });
  const reduce = React.useRef(false);

  React.useEffect(() => {
    reduce.current = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  React.useEffect(() => {
    if (reduce.current) return;
    const id = setInterval(() => setPulse(p => !p), 1200);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    let inView = false;
    const obs = new IntersectionObserver(([e]) => { inView = e.isIntersecting; },
      { threshold: 0.2 });
    if (wrapRef.current) obs.observe(wrapRef.current);

    const id = setInterval(() => {
      if (!inView) return;
      setCountdown(({ m, s }) => {
        if (m === 0 && s === 0) return { m: 23, s: 59 };
        if (s === 0) return { m: m - 1, s: 59 };
        return { m, s: s - 1 };
      });
    }, 1000);
    return () => { clearInterval(id); obs.disconnect(); };
  }, []);

  const handleClick = (e, slot) => {
    if (slot.href === "#contact") {
      e.preventDefault();
      if (onNav) onNav("contact");
    } else if (slot.href === "{{ BOOKING_URL }}") {
      e.preventDefault();
      if (onNav) onNav("contact");
    }
  };

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="section" style={{ paddingTop: 64, paddingBottom: 120 }}>
      <div className="container">
        <div ref={wrapRef} style={{
          position: "relative",
          border: "1px solid var(--line)",
          background: "rgba(14,14,16,0.55)"
        }}>
          <span className="crop-tl" /><span className="crop-tr" />
          <span className="crop-bl" /><span className="crop-br" />

          {/* Header */}
          <div style={{
            padding: "20px 26px",
            borderBottom: "1px solid var(--line)",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <span className="label-accent" style={{ fontSize: 10 }}>
              [ NEXT AVAILABLE DIAGNOSTIC SLOTS · 60 MIN · NO SDR FLOOR ]
            </span>
            <span className="hint" style={{ fontSize: 9 }}>UTC+1 · LIVE</span>
          </div>

          {/* Slot rows */}
          <div>
            {SLOT_CONFIG.map((slot, i) => {
              const isAvail = slot.status === "AVAILABLE";
              return (
                <a
                  key={i}
                  href={slot.href}
                  onClick={(e) => handleClick(e, slot)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1fr 1fr 120px",
                    gap: 24,
                    padding: "22px 26px",
                    borderBottom: i < SLOT_CONFIG.length - 1 ? "1px solid var(--line)" : "none",
                    alignItems: "center",
                    fontFamily: "var(--f-mono)",
                    fontSize: 13,
                    letterSpacing: "0.08em",
                    color: isAvail ? "var(--fg)" : "var(--fg-dim)",
                    textDecoration: "none",
                    transition: "background 200ms ease-out"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--accent-faint)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <span>
                    {slot.day} · {slot.time}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                    {isAvail ? (
                      <span style={{
                        width: 7, height: 7, borderRadius: "50%",
                        background: "var(--accent)",
                        boxShadow: pulse ? "0 0 8px var(--accent)" : "none",
                        opacity: pulse ? 1 : 0.3,
                        transition: "opacity 1200ms ease-out"
                      }} />
                    ) : (
                      <span style={{
                        width: 7, height: 7, borderRadius: "50%",
                        border: "1px solid var(--fg-faint)"
                      }} />
                    )}
                    <span style={{
                      color: isAvail ? "var(--accent)" : "var(--fg-faint)",
                      fontSize: 11,
                      letterSpacing: "0.16em"
                    }}>{slot.status}</span>
                  </span>
                  <span />
                  <span style={{
                    textAlign: "right",
                    color: "var(--accent)",
                    fontSize: 11,
                    letterSpacing: "0.18em"
                  }}>
                    → {slot.action}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Footer countdown */}
          <div style={{
            padding: "14px 26px",
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span className="hint" style={{ fontSize: 9 }}>NEXT REFRESH</span>
            <span className="mono" style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              color: "var(--fg)",
              fontVariantNumeric: "tabular-nums"
            }}>
              {pad(countdown.m)}:{pad(countdown.s)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { OpenSlotsTerminal });
