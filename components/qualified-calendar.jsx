/* global React */
const { useState: useStateQC, useEffect: useEffectQC } = React;

// ─────────────────────────────────────────────────────────
// QUALIFIED LEADS & BOOKED CALLS — week calendar
// Cells drop in one by one with a stagger
// ─────────────────────────────────────────────────────────

const QC_DAYS = ["MON", "TUE", "WED", "THU", "FRI"];
const QC_HOURS = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"];

// [day, hour, label]
const QC_BOOKINGS = [
["MON", "9 AM", "Consultation · BuildIQ"],
["TUE", "9 AM", "Consultation · BuildIQ"],
["WED", "9 AM", "Call · ScaleUp Inc"],
["THU", "9 AM", "Demo Call · SalesFlow"],
["FRI", "9 AM", "Sales Call · DataSync"],

["MON", "10 AM", "Discovery · Acme"],
["TUE", "10 AM", "Discovery · Nexus"],
["THU", "10 AM", "Discovery · DigitalCo"],

["MON", "11 AM", "Sales Call · MetricLab"],
["TUE", "11 AM", "Sales Call · DataFlow"],
["WED", "11 AM", "Product Demo · Innov8"],
["FRI", "11 AM", "Strategy Call · Revv"],

["THU", "12 PM", "Strategy Call · ProSync"],

["WED", "1 PM", "Discovery · Markett"],
["FRI", "1 PM", "Discovery · ScaleCo"],

["MON", "2 PM", "Demo · TechStart Inc"],
["TUE", "2 PM", "Demo · VentureHub"],
["WED", "2 PM", "Sales Call · Growthly"],
["THU", "2 PM", "Consultation · GroOps"],
["FRI", "2 PM", "Consultation · Markk"],

["TUE", "3 PM", "Strategy Session · Vert"],
["THU", "3 PM", "Demo · RevTech"],

["MON", "4 PM", "Strategy · CloudFlow"],
["WED", "4 PM", "Consultation · Enterp"]];


function QualifiedCalendar() {
  const [visibleCount, setVisibleCount] = useStateQC(0);
  const [armed, setArmed] = useStateQC(false);
  const sectionRef = React.useRef(null);

  // Trigger when section enters viewport
  useEffectQC(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !armed) {
            setArmed(true);
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [armed]);

  // Stagger drop-ins
  useEffectQC(() => {
    if (!armed) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setVisibleCount(i);
      if (i >= QC_BOOKINGS.length) clearInterval(id);
    }, 90);
    return () => clearInterval(id);
  }, [armed]);

  // Lookup map
  const cellMap = {};
  QC_BOOKINGS.forEach((b, idx) => {
    cellMap[b[0] + "|" + b[1]] = { label: b[2], idx };
  });

  return (
    <section className="section" ref={sectionRef}>
      <div className="container">
        {/* Header label */}
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "start", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="label-accent" style={{ fontSize: "10px", width: "207px", padding: "0px", height: "58px", letterSpacing: "0.6px" }}>[ 04 / QUALIFIED PIPELINE ]</span>
            <span className="label"></span>
          </div>
          <div>
            <h2 style={{ lineHeight: 1.05, marginBottom: 14, letterSpacing: "-0.015em", fontSize: "42px" }}>
              Qualified leads & <em style={{ fontStyle: "italic", color: "#ba8b8e", fontFamily: "var(--f-display)", fontWeight: 300 }}>booked calls</em>.
            </h2>
            <p style={{ color: "#ffffff", fontSize: 16, lineHeight: 1.55, maxWidth: "60ch" }}>
              Only qualified, interested responses and booked calls reach your pipeline — no noise, no cold drag.
            </p>
          </div>
        </div>

        {/* Calendar frame */}
        <div style={{
          position: "relative",
          border: "1px solid var(--line)",
          background: "rgba(186,139,142,0.025)"
        }}>
          <span className="crop-tl"></span>
          <span className="crop-tr"></span>
          <span className="crop-bl"></span>
          <span className="crop-br"></span>

          {/* Calendar header strip */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "16px 22px",
            borderBottom: "1px solid var(--line)"
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ba8b8e" strokeWidth="1.5">
              <rect x="3" y="5" width="18" height="16" rx="1" />
              <path d="M3 9h18M8 3v4M16 3v4" />
            </svg>
            <span className="mono" style={{ fontSize: 12, color: "#ffffff", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              This Week
            </span>
            <span style={{ flex: 1 }} />
            <span className="mono" style={{ fontSize: 11, color: "var(--fg-dim)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Jan 13 — 17 · 2026
            </span>
          </div>

          {/* Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "92px repeat(5, 1fr)",
            gridAutoRows: "60px"
          }}>
            {/* Top-left blank */}
            <div style={{ borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }} />
            {/* Day headers */}
            {QC_DAYS.map((d, i) =>
            <div
              key={d}
              style={{
                borderBottom: "1px solid var(--line)",
                borderRight: i < 4 ? "1px solid var(--line)" : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--f-mono)",
                fontSize: 11, letterSpacing: "0.22em",
                color: "var(--fg)",
                textTransform: "uppercase"
              }}>{d}</div>
            )}
            {/* Body rows */}
            {QC_HOURS.map((h, hi) =>
            <React.Fragment key={h}>
                <div style={{
                borderRight: "1px solid var(--line)",
                borderBottom: hi < QC_HOURS.length - 1 ? "1px solid var(--line)" : "none",
                display: "flex", alignItems: "center", justifyContent: "flex-end",
                paddingRight: 16,
                fontFamily: "var(--f-mono)",
                fontSize: 11, letterSpacing: "0.12em",
                color: "var(--fg-faint)"
              }}>{h}</div>
                {QC_DAYS.map((d, di) => {
                const cell = cellMap[d + "|" + h];
                const visible = cell && cell.idx < visibleCount;
                return (
                  <div
                    key={d + h}
                    style={{
                      borderRight: di < 4 ? "1px solid var(--line)" : "none",
                      borderBottom: hi < QC_HOURS.length - 1 ? "1px solid var(--line)" : "none",
                      padding: 6,
                      display: "flex", alignItems: "center", justifyContent: "stretch"
                    }}>
                    {cell &&
                    <div
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        border: "1px solid #ba8b8e",
                        background: "rgba(186,139,142,0.12)",
                        color: "#ba8b8e",
                        fontFamily: "var(--f-mono)",
                        fontSize: 10.5,
                        letterSpacing: "0.02em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(-12px)",
                        transition: "opacity 360ms ease, transform 460ms cubic-bezier(0.34, 1.4, 0.5, 1)"
                      }}>
                        {cell.label}
                      </div>
                    }
                  </div>);

              })}
              </React.Fragment>
            )}
          </div>
        </div>

        {/* Footer status row */}
        <div style={{
          marginTop: 16,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontFamily: "var(--f-mono)", fontSize: 10.5,
          color: "var(--fg-dim)", letterSpacing: "0.1em", textTransform: "uppercase"
        }}>
          <span><span style={{ color: "#ba8b8e" }}>///</span> 24 booked · this week</span>
          <span>signal-sourced · qualified · no noise</span>
        </div>
      </div>
    </section>);

}