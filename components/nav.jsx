/* global React */
const { useState: useStateNav, useEffect: useEffectNav, useRef: useRefNav } = React;

function Nav({ page = "home", onNav }) {
  const [scrolled, setScrolled] = useStateNav(false);
  const [openMenu, setOpenMenu] = useStateNav(null); // 'tech' | 'services' | null
  const closeTimer = useRefNav(null);

  useEffectNav(() => {
    const on = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", on);
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);

  const openWithDelay = (id) => {
    if (closeTimer.current) {clearTimeout(closeTimer.current);closeTimer.current = null;}
    setOpenMenu(id);
  };
  const closeWithDelay = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const items = [
  { id: "home", label: "Home", hidden: true },
  {
    id: "stack", label: "Tech",
    menu: [
    { label: "Tool Stack", sub: "Composable AI/GTM stack", target: "stack" },
    { label: "Signals Library", sub: "Buying-intent signal sets", target: "signals" }]

  },
  {
    id: "services", label: "Services",
    menu: [
    { label: "Outbound Systems", sub: "Pipeline you can ship", target: "outbound" },
    { label: "Market Intelligence", sub: "Account & signal research", target: "intel" }]

  },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" }];


  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "rgba(10,10,11,0.82)" : "transparent",
      backdropFilter: scrolled ? "blur(12px) saturate(140%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(12px) saturate(140%)" : "none",
      borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      transition: "all 260ms ease"
    }}>
      <div className="container" style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        height: 72, gap: 32
      }}>
        {/* Wordmark */}
        <a href="#" onClick={(e) => {e.preventDefault();onNav("home");}} style={{
          display: "flex", alignItems: "center", gap: 10, justifySelf: "start"
        }}>
          <img
            src="assets/leadwise-mark.png"
            alt=""
            style={{
              width: 28, height: 28,
              display: "block",
              imageRendering: "pixelated",
              objectFit: "contain",
              flexShrink: 0
            }} />
          
          <span className="mono" style={{
            fontSize: 12, letterSpacing: "0.28em", color: "var(--fg)",
            textTransform: "uppercase", fontWeight: 500
          }}>L E A D W I S E</span>
          <span className="mono" style={{
            fontSize: 12,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--accent)",
            fontWeight: 700,
            marginLeft: 2
          }}>AI</span>
        </a>

        {/* Center links */}
        <div style={{ display: "flex", gap: 4, alignItems: "center", border: "1px solid var(--line)", padding: "6px" }}>
          {items.filter((it) => !it.hidden).map((it) => {
            const childTargets = it.menu ? it.menu.map((m) => m.target) : [];
            const active = page === it.id || childTargets.includes(page);
            const hasMenu = !!it.menu;
            const isOpen = openMenu === it.id;

            const linkStyle = {
              padding: "8px 16px",
              fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: active || isOpen ? "var(--accent)" : "var(--fg-dim)",
              background: active ? "var(--accent-faint)" : "transparent",
              transition: "all 160ms ease",
              display: "inline-flex", alignItems: "center", gap: 6,
              cursor: "pointer"
            };

            return (
              <div
                key={it.id}
                style={{ position: "relative" }}
                onMouseEnter={hasMenu ? () => openWithDelay(it.id) : undefined}
                onMouseLeave={hasMenu ? closeWithDelay : undefined}>
                
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasMenu) {
                      // Click on parent goes to its main page if it has one
                      if (it.id === "stack") onNav("stack");else
                      setOpenMenu(isOpen ? null : it.id);
                    } else {
                      onNav(it.id);
                    }
                  }}
                  style={linkStyle}
                  onMouseEnter={(e) => {if (!active && !isOpen) e.currentTarget.style.color = "var(--fg)";}}
                  onMouseLeave={(e) => {if (!active && !isOpen) e.currentTarget.style.color = "var(--fg-dim)";}}>
                  
                  {it.label}
                  {hasMenu &&
                  <span style={{
                    fontSize: 8, opacity: 0.6,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 160ms ease"
                  }}>▼</span>
                  }
                </a>

                {hasMenu && isOpen &&
                <div
                  onMouseEnter={() => openWithDelay(it.id)}
                  onMouseLeave={closeWithDelay}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    minWidth: 280,
                    background: "rgba(10,10,11,0.96)",
                    backdropFilter: "blur(14px) saturate(140%)",
                    WebkitBackdropFilter: "blur(14px) saturate(140%)",
                    border: "1px solid var(--line)",
                    padding: 6,
                    zIndex: 60,
                    boxShadow: "0 24px 48px -12px rgba(0,0,0,0.6)"
                  }}>
                  
                    {/* tiny connector strip so cursor can travel */}
                    <div style={{
                    position: "absolute", top: -10, left: 0, right: 0, height: 10
                  }} />
                    {it.menu.map((m) =>
                  <a
                    key={m.label}
                    href="#"
                    onClick={(e) => {e.preventDefault();onNav(m.target);setOpenMenu(null);}}
                    style={{
                      display: "block",
                      padding: "12px 14px",
                      textDecoration: "none",
                      borderBottom: "1px solid transparent",
                      transition: "background 140ms ease"
                    }}
                    onMouseEnter={(e) => {e.currentTarget.style.background = "var(--accent-faint)";}}
                    onMouseLeave={(e) => {e.currentTarget.style.background = "transparent";}}>
                    
                        <div className="mono" style={{
                      fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
                      color: "var(--fg)", marginBottom: 3
                    }}>{m.label}</div>
                        <div style={{
                      fontSize: 11, color: "var(--fg-faint)", lineHeight: 1.35
                    }}>{m.sub}</div>
                      </a>
                  )}
                  </div>
                }
              </div>);

          })}
        </div>

        {/* Right CTA cluster */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", justifySelf: "end" }}>
          <span className="mono" style={{
            fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.14em", textTransform: "uppercase"
          }}>
            <span className="blink" style={{ color: "var(--accent)" }}>●</span> SYS.ONLINE
          </span>
          <a href="#" onClick={(e) => {e.preventDefault();onNav("contact");}} className="btn btn-primary">
            Talk to us <Arrow />
          </a>
        </div>
      </div>
    </nav>);

}

Object.assign(window, { Nav });