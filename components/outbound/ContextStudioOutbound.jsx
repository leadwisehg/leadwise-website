/* global React */
// ─────────────────────────────────────────────────────────
// CONTEXT STUDIO — outbound page version
// Same diptych as home (template + generated email),
// but the generated email TYPES OUT as the user scrolls.
// Progress is bound to the section's scroll position.
// ─────────────────────────────────────────────────────────

const { useState: useStateCS, useEffect: useEffectCS, useRef: useRefCS, useMemo: useMemoCS } = React;

// Tokens that appear in the generated email — split into plain
// text and "snippet" tokens so we can render the snippets with
// their accent treatment as they reveal.
const GEN_BLOCKS = [
{ kind: "p", parts: [{ t: "text", v: "Hi Jane," }] },
{ kind: "p", parts: [
  { t: "text", v: "Saw that " },
  { t: "snip", v: "Precision Metal" },
  { t: "text", v: " is currently " },
  { t: "snip", v: "running without a production manager" },
  { t: "text", v: "." }]
},
{ kind: "p", parts: [
  { t: "text", v: "These roles are critical and usually leads to a drop in efficiency and quality." }]
},
{ kind: "p", parts: [
  { t: "text", v: "We've helped " },
  { t: "snip", v: "Atlas Metal Systems" },
  { t: "text", v: " maintain production continuity with an interim manager who took over immediately while the permanent hire is being secured." }]
},
{ kind: "p", strong: true, parts: [
  { t: "text", v: "Worth a 15 minutes call?" }]
}];


// Total character count across all blocks (used to map progress → reveal).
const GEN_TOTAL_CHARS = GEN_BLOCKS.reduce(
  (sum, b) => sum + b.parts.reduce((s, p) => s + p.v.length, 0),
  0
);

// Slice the blocks down to `chars` characters worth of content.
function sliceBlocks(chars) {
  let remaining = chars;
  const out = [];
  for (const block of GEN_BLOCKS) {
    if (remaining <= 0) break;
    const newParts = [];
    for (const part of block.parts) {
      if (remaining <= 0) break;
      if (part.v.length <= remaining) {
        newParts.push(part);
        remaining -= part.v.length;
      } else {
        newParts.push({ ...part, v: part.v.slice(0, remaining) });
        remaining = 0;
      }
    }
    if (newParts.length) out.push({ ...block, parts: newParts });
  }
  return out;
}

// Token component for the raw template (left).
function CSToken({ children }) {
  return (
    <span style={{
      color: "var(--fg-faint)",
      fontFamily: "var(--f-mono)",
      fontSize: 12,
      background: "rgba(242,242,240,0.04)",
      padding: "1px 4px",
      border: "1px dashed var(--line)",
      whiteSpace: "nowrap"
    }}>{children}</span>);

}

// Snippet (accent) renderer for the generated email.
function CSSnippet({ children }) {
  return (
    <span style={{
      background: "var(--accent-faint)",
      color: "var(--accent)",
      padding: "1px 5px",
      border: "1px solid var(--accent-dim)",
      fontSize: 12.5,
      fontFamily: "var(--f-mono)",
      letterSpacing: "0.01em"
    }}>{children}</span>);

}

// ─── Raw template email (left) ───
function CSRawTemplateEmail() {
  return (
    <div style={{
      border: "1px solid var(--line)",
      background: "var(--bg-2)",
      fontFamily: "var(--f-body)",
      position: "relative"
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "10px 14px",
        borderBottom: "1px solid var(--line)",
        background: "rgba(242,242,240,0.02)"
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(242,242,240,0.18)" }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(242,242,240,0.18)" }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(242,242,240,0.18)" }} />
        <span className="mono" style={{ marginLeft: 10, fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.06em" }}>
          TEMPLATE · RAW
        </span>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "62px 1fr", gap: 10,
        padding: "12px 16px",
        borderBottom: "1px solid var(--line)",
        alignItems: "baseline"
      }}>
        <span className="mono" style={{ fontSize: 10.5, color: "var(--fg-faint)", letterSpacing: "0.08em" }}>To:</span>
        <span className="mono" style={{ fontSize: 12, color: "var(--fg)" }}>jane.wu@precisionmetal.com</span>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "62px 1fr", gap: 10,
        padding: "10px 16px 12px",
        borderBottom: "1px solid var(--line)",
        alignItems: "baseline"
      }}>
        <span className="mono" style={{ fontSize: 10.5, color: "var(--fg-faint)", letterSpacing: "0.08em" }}>Subject:</span>
        <span style={{ fontFamily: "var(--f-display)", fontSize: 14.5, color: "var(--fg)", lineHeight: 1.35 }}>
          12 open roles, capacity under pressure?
        </span>
      </div>
      <div style={{ padding: "14px 16px 16px", fontSize: 13, lineHeight: 1.7, color: "var(--fg-dim)" }}>
        <p style={{ margin: "0 0 10px" }}>Hi <CSToken>{"{{firstName}}"}</CSToken>,</p>
        <p style={{ margin: "0 0 10px" }}>
          Saw that <CSToken>{"{{company}}"}</CSToken> is currently <CSToken>{"{{signal_event}}"}</CSToken>.
        </p>
        <p style={{ margin: "0 0 10px" }}>
          <CSToken>{"{{bridge_sentence_relating_pain}}"}</CSToken>.
        </p>
        <p style={{ margin: "0 0 10px" }}>
          We've helped <CSToken>{"{{competitor}}"}</CSToken> <CSToken>{"{{solution_outcome}}"}</CSToken>.
        </p>
        <p style={{ margin: "0 0 10px" }}><CSToken>{"{{CTA}}"}</CSToken></p>
        <p style={{ margin: 0 }}><CSToken>{"{{signature}}"}</CSToken></p>
      </div>
    </div>);

}

// ─── Generated email (right) — animated ───
function CSGeneratedEmail({ progress }) {
  // progress is 0..1
  const charsToShow = Math.round(progress * GEN_TOTAL_CHARS);
  const blocks = useMemoCS(() => sliceBlocks(charsToShow), [charsToShow]);
  const isTyping = progress > 0 && progress < 1;
  const isDone = progress >= 1;
  const isIdle = progress <= 0;

  const statusLabel = isIdle ?
  "WAITING FOR SIGNAL…" :
  isTyping ?
  "GENERATING · GROUNDED IN SIGNAL" :
  "GENERATED · GROUNDED IN SIGNAL";

  return (
    <div style={{
      border: "1px solid var(--accent-dim)",
      background: "var(--bg-2)",
      fontFamily: "var(--f-body)",
      position: "relative",
      boxShadow: "0 0 0 1px var(--accent-dim) inset"
    }}>
      {/* header bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "10px 14px",
        borderBottom: "1px solid var(--line)",
        background: "rgba(242,242,240,0.02)"
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: 999,
          background: "var(--accent)",
          animation: isTyping ? "csPulse 1s ease-in-out infinite" : "none"
        }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(242,242,240,0.18)" }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "rgba(242,242,240,0.18)" }} />
        <span className="mono" style={{
          marginLeft: 10, fontSize: 10,
          color: isIdle ? "var(--fg-faint)" : "var(--accent)",
          letterSpacing: "0.06em"
        }}>
          {statusLabel}
        </span>
        <span style={{ flex: 1 }} />
        <span className="mono" style={{
          fontSize: 9.5,
          color: "var(--fg-faint)",
          letterSpacing: "0.14em",
          fontVariantNumeric: "tabular-nums"
        }}>
          {String(Math.round(progress * 100)).padStart(3, "0")}%
        </span>
      </div>

      {/* progress sliver */}
      <div style={{
        height: 1,
        background: "rgba(186,139,142,0.10)",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: `${progress * 100}%`,
          background: "var(--accent)",
          transition: "width 80ms linear"
        }} />
      </div>

      {/* To: */}
      <div style={{
        display: "grid", gridTemplateColumns: "62px 1fr", gap: 10,
        padding: "12px 16px",
        borderBottom: "1px solid var(--line)",
        alignItems: "baseline"
      }}>
        <span className="mono" style={{ fontSize: 10.5, color: "var(--fg-faint)", letterSpacing: "0.08em" }}>To:</span>
        <span className="mono" style={{ fontSize: 12, color: "var(--fg)" }}>jane.wu@precisionmetal.com</span>
      </div>

      {/* Subject */}
      <div style={{
        display: "grid", gridTemplateColumns: "62px 1fr", gap: 10,
        padding: "10px 16px 12px",
        borderBottom: "1px solid var(--line)",
        alignItems: "baseline"
      }}>
        <span className="mono" style={{ fontSize: 10.5, color: "var(--fg-faint)", letterSpacing: "0.08em" }}>Subject:</span>
        <span style={{ fontFamily: "var(--f-display)", fontSize: 14.5, color: "var(--fg)", lineHeight: 1.35 }}>
          12 open roles, capacity under pressure?
        </span>
      </div>

      {/* Body — animated reveal */}
      <div style={{
        padding: "14px 16px 16px",
        fontSize: 13,
        lineHeight: 1.7,
        color: "var(--fg-dim)",
        minHeight: 220
      }}>
        {blocks.length === 0 &&
        <p style={{
          margin: 0,
          color: "var(--fg-faint)",
          fontFamily: "var(--f-mono)",
          fontSize: 12,
          letterSpacing: "0.06em"
        }}>
            <span style={{
            display: "inline-block",
            width: 8, height: 14,
            background: "var(--accent)",
            verticalAlign: "text-bottom",
            animation: "csCaret 1s steps(2) infinite"
          }} />
            <span style={{ marginLeft: 8 }}>scroll to generate…</span>
          </p>
        }
        {blocks.map((block, bi) => {
          const isLast = bi === blocks.length - 1;
          return (
            <p key={bi} style={{
              margin: bi === blocks.length - 1 ? 0 : "0 0 10px",
              color: block.strong ? "var(--fg)" : undefined
            }}>
              {block.parts.map((part, pi) => {
                if (part.t === "snip") return <CSSnippet key={pi}>{part.v}</CSSnippet>;
                return <span key={pi}>{part.v}</span>;
              })}
              {/* caret on last visible char while typing */}
              {isLast && isTyping &&
              <span style={{
                display: "inline-block",
                width: 7, height: 14,
                background: "var(--accent)",
                verticalAlign: "text-bottom",
                marginLeft: 2,
                animation: "csCaret 0.85s steps(2) infinite"
              }} />
              }
            </p>);

        })}
      </div>
    </div>);

}

// ─── Main section ───
function ContextStudioOutbound({ onNav }) {
  const sectionRef = useRefCS(null);
  const [progress, setProgress] = useStateCS(0);

  useEffectCS(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Map: section top hits 80% of viewport → progress 0
      //      section bottom hits 20% of viewport → progress 1
      const startY = vh * 0.85; // when rect.top crosses this from below, start
      const endY = vh * 0.20; // when rect.top crosses this, finished
      const range = startY - endY;
      const raw = (startY - rect.top) / range;
      const clamped = Math.max(0, Math.min(1, raw));
      setProgress(clamped);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="container">
        {/* header strip */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 36
        }}>
          <span className="label-accent" style={{ fontSize: 10 }}>[ 03 / EMAIL COPY ]

          </span>
          <span className="hint">TEMPLATE → GENERATED · LIVE</span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 80,
          alignItems: "center"
        }}>
          {/* Two stacked emails */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <CSRawTemplateEmail />
            <CSGeneratedEmail progress={progress} />
          </div>

          {/* Right copy */}
          <div>
            <h2 style={{
              fontFamily: "var(--f-display)",
              fontWeight: 300,
              fontSize: "clamp(36px, 4.4vw, 60px)",
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
              margin: 0,
              marginBottom: 24
            }}>
              Bespoke,{" "}
              <em style={{
                fontFamily: "var(--f-display)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--accent)"
              }}>
                scalable
              </em>{" "}
              outreach.
            </h2>
            <p style={{ color: "var(--fg-dim)", maxWidth: "52ch", marginBottom: 16, fontSize: 15.5, lineHeight: 1.65 }}>
              Every draft uses the live signal as context and generates AI snippets — no hallucinated detail, no canned filler.
            </p>
            <p style={{ color: "var(--fg-dim)", maxWidth: "52ch", marginBottom: 28, fontSize: 15.5, lineHeight: 1.65 }}>
              If no recent signal or event is found, we drop the prospect. No signal, no send.
            </p>
            <div style={{
              display: "flex", flexDirection: "column", gap: 14,
              borderTop: "1px solid var(--line)", paddingTop: 24, marginBottom: 32
            }}>
              {[
              "Grounded drafts with relevant and unique snippets",
              "Ongoing A/B testing — syntax, approach, subject line",
              "2–3 email sequence (long sequences kill momentum and relevancy)"].
              map((b) =>
              <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <span style={{
                  width: 18, height: 18, flexShrink: 0,
                  border: "1px solid var(--accent)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginTop: 2
                }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span style={{ color: "var(--fg)", fontSize: 15 }}>{b}</span>
                </div>
              )}
            </div>
            <a
              href="#"
              onClick={(e) => {e.preventDefault();onNav && onNav("contact");}}
              className="btn btn-primary">
              
              Start building your pipeline <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes csCaret {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes csPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.85); }
        }
        @media (max-width: 900px) {
          section .container > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>);

}

Object.assign(window, { ContextStudioOutbound });