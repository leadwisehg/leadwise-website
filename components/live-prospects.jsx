/* global React */

// ─────────────────────────────────────────────────────────
// LIVE PROSPECT VIEW — ported from leadwise_1 reference
// 50 rows · industry & lead filters · search · sortable
// ─────────────────────────────────────────────────────────

const PROSPECTS_50 = [
{ name: "Sarah Chen", role: "VP of Sales", seniority: "VP", company: "Datagrid Analytics", industry: "Manufacturing", lead: "Hot", signal: "Replied to email", strength: 4 },
{ name: "Marcus Okafor", role: "Head of RevOps", seniority: "Director", company: "Bolt Logistics", industry: "Logistics", lead: "Warm", signal: "Booked meeting", strength: 4 },
{ name: "Priya Ramanathan", role: "Founder & CEO", seniority: "C-Suite", company: "Clearloop Health", industry: "Heavy Industry", lead: "Hot", signal: "Requested pricing", strength: 4 },
{ name: "James Thornton", role: "Director of Growth", seniority: "Director", company: "Meridian Capital", industry: "Finance", lead: "Warm", signal: "Positive reply", strength: 3 },
{ name: "Aisha Kapoor", role: "Head of Growth", seniority: "Director", company: "Northwind Retail", industry: "Automotive", lead: "Warm", signal: "Opened pricing page", strength: 3 },
{ name: "Daniel Weiss", role: "Chief Revenue Officer", seniority: "C-Suite", company: "Vertex Software", industry: "Manufacturing", lead: "Hot", signal: "Replied to email", strength: 4 },
{ name: "Elena Rossi", role: "VP Marketing", seniority: "VP", company: "Luma Commerce", industry: "Automotive", lead: "Warm", signal: "Clicked CTA", strength: 3 },
{ name: "Tomás Rivera", role: "Head of Sales", seniority: "Director", company: "Cascade Fintech", industry: "Finance", lead: "Cold", signal: "Visited LinkedIn", strength: 1 },
{ name: "Nia Johnson", role: "CEO", seniority: "C-Suite", company: "Brightroot Media", industry: "PE Fund", lead: "Warm", signal: "Content download", strength: 3 },
{ name: "Kenji Watanabe", role: "Director of BD", seniority: "Director", company: "Helix Therapeutics", industry: "Heavy Industry", lead: "Cold", signal: "Email opened", strength: 2 },
{ name: "Lauren Hughes", role: "VP Operations", seniority: "VP", company: "Forge Freight", industry: "Logistics", lead: "Warm", signal: "Replied to email", strength: 3 },
{ name: "Raj Patel", role: "Founder", seniority: "C-Suite", company: "Orbit Payments", industry: "Finance", lead: "Hot", signal: "Booked meeting", strength: 4 },
{ name: "Chloé Martin", role: "Head of Partnerships", seniority: "Director", company: "Signal Studios", industry: "PE Fund", lead: "Warm", signal: "Positive reply", strength: 3 },
{ name: "David Nkrumah", role: "VP Engineering", seniority: "VP", company: "Nimbus Platform", industry: "Manufacturing", lead: "Cold", signal: "Email opened", strength: 1 },
{ name: "Sophia Bergman", role: "Chief of Staff", seniority: "Director", company: "Linden Labs", industry: "Manufacturing", lead: "Warm", signal: "Content download", strength: 2 },
{ name: "Hiro Tanaka", role: "Director of Marketing", seniority: "Director", company: "Tsuki Beauty", industry: "Automotive", lead: "Warm", signal: "Pricing page visit", strength: 3 },
{ name: "Isabella Oduya", role: "COO", seniority: "C-Suite", company: "Sunrise Clinics", industry: "Heavy Industry", lead: "Hot", signal: "Requested pricing", strength: 4 },
{ name: "Patrick O'Sullivan", role: "Head of Demand Gen", seniority: "Director", company: "Axis Insurance", industry: "Finance", lead: "Warm", signal: "Replied to email", strength: 3 },
{ name: "Mei Lin", role: "Founder", seniority: "C-Suite", company: "Rootstock Grocers", industry: "Automotive", lead: "Cold", signal: "LinkedIn profile view", strength: 1 },
{ name: "Omar Haddad", role: "VP of Sales", seniority: "VP", company: "Kite Cargo", industry: "Logistics", lead: "Warm", signal: "Clicked CTA", strength: 3 },
{ name: "Grace Mitchell", role: "CMO", seniority: "C-Suite", company: "Paloma PR", industry: "PE Fund", lead: "Hot", signal: "Booked meeting", strength: 4 },
{ name: "Viktor Dvorak", role: "Director of RevOps", seniority: "Director", company: "Stella Health", industry: "Heavy Industry", lead: "Warm", signal: "Positive reply", strength: 3 },
{ name: "Amara Obi", role: "Head of Sales", seniority: "Director", company: "Pixel & Co", industry: "PE Fund", lead: "Cold", signal: "Email opened", strength: 1 },
{ name: "Leo Santana", role: "VP Product", seniority: "VP", company: "Quanta SaaS", industry: "Manufacturing", lead: "Warm", signal: "Content download", strength: 2 },
{ name: "Fiona Walsh", role: "Chief Revenue Officer", seniority: "C-Suite", company: "Drift Exchange", industry: "Finance", lead: "Hot", signal: "Requested demo", strength: 4 },
{ name: "Yusuf Siddiqui", role: "Director of Ops", seniority: "Director", company: "Wayfinder Freight", industry: "Logistics", lead: "Warm", signal: "Pricing page visit", strength: 3 },
{ name: "Eleanor Fitzgerald", role: "CEO", seniority: "C-Suite", company: "Laurel Marketplace", industry: "Automotive", lead: "Warm", signal: "Replied to email", strength: 3 },
{ name: "Anil Varma", role: "VP of Growth", seniority: "VP", company: "Loom Analytics", industry: "Manufacturing", lead: "Hot", signal: "Booked meeting", strength: 4 },
{ name: "Camille Dubois", role: "Head of Demand", seniority: "Director", company: "Rouge Finance", industry: "Finance", lead: "Cold", signal: "LinkedIn engagement", strength: 1 },
{ name: "Benjamin Cohen", role: "Director of Growth", seniority: "Director", company: "Hana Wellness", industry: "Heavy Industry", lead: "Warm", signal: "Clicked CTA", strength: 2 },
{ name: "Zara Hussain", role: "Founder", seniority: "C-Suite", company: "Paper Crane Press", industry: "PE Fund", lead: "Warm", signal: "Positive reply", strength: 3 },
{ name: "Carlos Mendoza", role: "VP Sales", seniority: "VP", company: "Portside Logistics", industry: "Logistics", lead: "Cold", signal: "Email opened", strength: 1 },
{ name: "Helena Vogel", role: "Chief Marketing Officer", seniority: "C-Suite", company: "Cairn Cloud", industry: "Manufacturing", lead: "Hot", signal: "Requested pricing", strength: 4 },
{ name: "Jasmine Pereira", role: "Director of BD", seniority: "Director", company: "Olive Insurance", industry: "Finance", lead: "Warm", signal: "Replied to email", strength: 3 },
{ name: "Thabo Molefe", role: "Head of Sales", seniority: "Director", company: "Terra E-Commerce", industry: "Automotive", lead: "Warm", signal: "Content download", strength: 2 },
{ name: "Noa Goldberg", role: "VP Operations", seniority: "VP", company: "Mira Medical", industry: "Heavy Industry", lead: "Cold", signal: "Pricing page visit", strength: 2 },
{ name: "Finn Murphy", role: "CEO", seniority: "C-Suite", company: "Harbor Studio", industry: "PE Fund", lead: "Hot", signal: "Booked meeting", strength: 4 },
{ name: "Yuki Sato", role: "Director of Growth", seniority: "Director", company: "Zenith SaaS Group", industry: "Manufacturing", lead: "Warm", signal: "Positive reply", strength: 3 },
{ name: "Alejandro Ruiz", role: "VP of Marketing", seniority: "VP", company: "Vela Finance", industry: "Finance", lead: "Warm", signal: "Clicked CTA", strength: 3 },
{ name: "Brooke Anderson", role: "Head of Partnerships", seniority: "Director", company: "Fieldnote Retail", industry: "Automotive", lead: "Cold", signal: "Email opened", strength: 1 },
{ name: "Mateo Fernández", role: "Chief Strategy Officer", seniority: "C-Suite", company: "Beacon Shipping", industry: "Logistics", lead: "Warm", signal: "Replied to email", strength: 3 },
{ name: "Ines Lopes", role: "VP Clinical Ops", seniority: "VP", company: "Verity Biotech", industry: "Heavy Industry", lead: "Hot", signal: "Requested demo", strength: 4 },
{ name: "Gabriel Johansson", role: "Director of Content", seniority: "Director", company: "Northlight Studios", industry: "PE Fund", lead: "Warm", signal: "Content download", strength: 2 },
{ name: "Rachel Kim", role: "Founder", seniority: "C-Suite", company: "Aster Commerce", industry: "Automotive", lead: "Warm", signal: "Pricing page visit", strength: 3 },
{ name: "Malik Washington", role: "VP RevOps", seniority: "VP", company: "Flux Platform", industry: "Manufacturing", lead: "Hot", signal: "Booked meeting", strength: 4 },
{ name: "Ingrid Olsen", role: "Head of Marketing", seniority: "Director", company: "Pier Capital", industry: "Finance", lead: "Cold", signal: "LinkedIn engagement", strength: 1 },
{ name: "Seun Adebayo", role: "Chief Commercial Officer", seniority: "C-Suite", company: "Clover Medical", industry: "Heavy Industry", lead: "Warm", signal: "Replied to email", strength: 3 },
{ name: "Victoria Ashworth", role: "VP Sales", seniority: "VP", company: "Halston Media Co", industry: "PE Fund", lead: "Hot", signal: "Requested pricing", strength: 4 },
{ name: "Dmitri Volkov", role: "Director of Ops", seniority: "Director", company: "Granite Freight", industry: "Logistics", lead: "Cold", signal: "Email opened", strength: 2 },
{ name: "Amelia Brooks", role: "Head of Growth", seniority: "Director", company: "Canopy CRM", industry: "Manufacturing", lead: "Warm", signal: "Positive reply", strength: 3 }];


const INDUSTRY_CHIPS = [
{ v: "all", l: "All" }, { v: "Automotive", l: "Automotive" }, { v: "Manufacturing", l: "Manufacturing" },
{ v: "Heavy Industry", l: "Heavy Industry" }, { v: "Logistics", l: "Logistics" },
{ v: "Finance", l: "Finance" }, { v: "PE Fund", l: "PE Fund" }];

const LEAD_CHIPS = [
{ v: "all", l: "All" }, { v: "Hot", l: "Hot" },
{ v: "Warm", l: "Warm" }, { v: "Cold", l: "Cold" }];


const AVATAR_PALETTE = ["#e9b7b8", "#8aa3e8", "#b8e88a", "#e8c48a", "#c98ae8", "#8ae8db", "#e88aa3", "#d8e88a"];
function lp_initials(n) {return n.split(" ").map((w) => w[0]).slice(0, 2).join("");}
function lp_color(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
  return AVATAR_PALETTE[h % AVATAR_PALETTE.length];
}

function PillLP({ kind }) {
  const cfg = {
    Hot: { fg: "#f5a05b", bd: "rgba(245,160,91,0.35)", bg: "rgba(245,160,91,0.10)" },
    Warm: { fg: "var(--accent)", bd: "var(--accent-dim, rgba(233,183,184,0.3))", bg: "var(--accent-faint, rgba(233,183,184,0.08))" },
    Cold: { fg: "#7a8aad", bd: "rgba(122,138,173,0.30)", bg: "rgba(122,138,173,0.08)" }
  }[kind];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 10px",
      fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.04em",
      color: cfg.fg, border: "1px solid " + cfg.bd, background: cfg.bg,
      borderRadius: 2
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />
      {kind}
    </span>);

}

function SignalBar({ s }) {
  const heights = [6, 10, 14, 18];
  return (
    <span style={{ display: "inline-flex", gap: 3, alignItems: "flex-end", height: 18, verticalAlign: "middle" }}>
      {heights.map((h, i) =>
      <span key={i} style={{
        display: "inline-block", width: 4, height: h,
        background: i < s ? "var(--accent)" : "rgba(255,255,255,0.10)",
        borderRadius: 1
      }} />
      )}
    </span>);

}

function LiveProspectView() {
  const [industry, setIndustry] = React.useState("all");
  const [lead, setLead] = React.useState("all");
  const [search, setSearch] = React.useState("");
  const [sortKey, setSortKey] = React.useState(null);
  const [sortDir, setSortDir] = React.useState(1);

  const toggleSort = (k) => {
    if (sortKey === k) setSortDir((d) => d * -1);else
    {setSortKey(k);setSortDir(1);}
  };

  let rows = PROSPECTS_50.filter((p) => {
    if (industry !== "all" && p.industry !== industry) return false;
    if (lead !== "all" && p.lead !== lead) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.company.toLowerCase().includes(q)) return false;
    }
    return true;
  });
  if (sortKey) {
    rows = rows.slice().sort((a, b) => {
      const va = a[sortKey],vb = b[sortKey];
      if (typeof va === "number") return (va - vb) * sortDir;
      return String(va).localeCompare(String(vb)) * sortDir;
    });
  }

  const cols = [
  { k: "name", l: "Name" },
  { k: "role", l: "Role" },
  { k: "seniority", l: "Seniority" },
  { k: "company", l: "Company" },
  { k: "industry", l: "Industry" },
  { k: "lead", l: "Lead" },
  { k: "signal", l: "Signal type" },
  { k: "strength", l: "Strength" }];


  // Style tokens lifted from reference
  const wrapStyle = {
    maxWidth: 1280, margin: "0 auto",
    background: "#0e0e12",
    border: "1px solid rgba(255,255,255,0.08)",
    overflow: "hidden", position: "relative"
  };
  const headStyle = {
    padding: "24px 28px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    background: "#1d1d22"
  };
  const filterBar = {
    padding: "16px 28px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8,
    background: "#1a1a1f"
  };
  const filterLabel = {
    fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
    color: "var(--fg-faint)", marginRight: 8
  };
  const chipStyle = (active) => ({
    padding: "6px 12px",
    background: active ? "var(--accent)" : "transparent",
    border: "1px solid " + (active ? "var(--accent)" : "rgba(255,255,255,0.10)"),
    color: active ? "#0e0e12" : "var(--fg-dim)",
    fontFamily: "var(--f-mono)", fontSize: 12, letterSpacing: "0.02em",
    cursor: "pointer", borderRadius: 2,
    transition: "all 160ms ease"
  });
  const searchStyle = {
    marginLeft: "auto", padding: "7px 14px",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.10)",
    color: "var(--fg)",
    fontFamily: "var(--f-mono)", fontSize: 12,
    minWidth: 240, outline: "none", borderRadius: 2
  };
  const tableWrap = {
    overflowX: "hidden", maxHeight: 560, overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(255,255,255,0.14) transparent"
  };
  const thStyle = (k) => ({
    textAlign: "left", padding: "14px 10px",
    background: "#16161b",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
    color: sortKey === k ? "var(--accent)" : "var(--fg-faint)",
    fontFamily: "var(--f-mono)", fontWeight: 500,
    cursor: "pointer", whiteSpace: "nowrap", userSelect: "none",
    position: "sticky", top: 0, zIndex: 2
  });
  const tdStyle = {
    padding: "14px 10px",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    fontSize: 12.5, color: "var(--fg)",
    verticalAlign: "middle"
  };
  const tdMuted = { ...tdStyle, color: "var(--fg-dim)", fontSize: 12 };

  const footerStyle = {
    padding: "14px 28px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    display: "flex", justifyContent: "space-between",
    fontSize: 11, color: "var(--fg-faint)", letterSpacing: "0.04em",
    fontFamily: "var(--f-mono)", textTransform: "uppercase",
    background: "#1d1d22"
  };

  return (
    <section className="section" id="live-prospects" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <style>{`
        #live-prospects .lp-scroll::-webkit-scrollbar { width: 6px; height: 0; }
        #live-prospects .lp-scroll::-webkit-scrollbar-track { background: transparent; }
        #live-prospects .lp-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 0; }
        #live-prospects .lp-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.22); }
        @media (max-width: 1024px) {
          #live-prospects .lp-col-seniority { display: none; }
        }
        @media (max-width: 860px) {
          #live-prospects .lp-col-industry { display: none; }
        }
      `}</style>
      <div className="container">
        {/* Centered intro */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <span style={{ width: 24, height: 1, background: "var(--line)" }} />
            <span className="label-accent" style={{ fontSize: "18px" }}>LIVE PROSPECT VIEW</span>
            <span style={{ width: 24, height: 1, background: "var(--line)" }} />
          </div>
          <h2 style={{
            fontSize: "clamp(40px, 5.2vw, 76px)", letterSpacing: "-0.02em",
            lineHeight: 1.05, marginBottom: 24, maxWidth: "20ch",
            marginLeft: "auto", marginRight: "auto"
          }}>
            See what your supercharged{" "}
            <em style={{
              fontFamily: "var(--f-display)", fontStyle: "italic",
              fontWeight: 300, color: "rgb(186, 139, 142)"
            }}>inbox would look like</em>
          </h2>
          <p className="lead" style={{ maxWidth: "56ch", margin: "0 auto" }}>We provide an interactive dashboard, where you can see all received leads, track their status and make sure you get all the context needed before reaching out again. 


          </p>
        </div>

        <div style={wrapStyle}>
          {/* head */}
          <div style={headStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%", background: "#4ade80",
                boxShadow: "0 0 0 4px rgba(74,222,128,0.10)"
              }} />
              <span style={{
                fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "var(--fg-dim)"
              }}>Live campaign feed</span>
            </div>
            <div style={{ color: "var(--fg)", fontWeight: 600, fontSize: 13 }}>
              <span style={{ color: "var(--accent)" }}>{rows.length}</span>
              <span style={{ color: "var(--fg-dim)", fontWeight: 400 }}> of {PROSPECTS_50.length} prospects</span>
            </div>
          </div>

          {/* filters */}
          <div style={filterBar}>
            <span style={filterLabel}>INDUSTRY:</span>
            {INDUSTRY_CHIPS.map((c) =>
            <button key={c.v} onClick={() => setIndustry(c.v)} style={chipStyle(industry === c.v)}>{c.l}</button>
            )}
            <span style={{ width: 1, height: 20, background: "rgba(255,255,255,0.10)", margin: "0 8px" }} />
            <span style={filterLabel}>LEAD:</span>
            {LEAD_CHIPS.map((c) =>
            <button key={c.v} onClick={() => setLead(c.v)} style={chipStyle(lead === c.v)}>{c.l}</button>
            )}
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or company…"
              style={searchStyle}
              onFocus={(e) => {e.currentTarget.style.borderColor = "var(--accent)";}}
              onBlur={(e) => {e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";}} />
            
          </div>

          {/* table */}
          <div className="lp-scroll" style={tableWrap}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, tableLayout: "auto" }}>
              <thead>
                <tr>
                  {cols.map((c) =>
                  <th key={c.k} className={"lp-col-" + c.k} style={thStyle(c.k)} onClick={() => toggleSort(c.k)}>
                      {c.l}{" "}
                      <span style={{
                      fontSize: 9, marginLeft: 4,
                      opacity: sortKey === c.k ? 1 : 0.4
                    }}>
                        {sortKey === c.k ? sortDir === 1 ? "↑" : "↓" : "↕"}
                      </span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ?
                <tr>
                    <td colSpan={8} style={{
                    padding: "60px 20px", textAlign: "center",
                    color: "var(--fg-dim)", fontStyle: "italic"
                  }}>
                      No prospects match these filters — try widening your search.
                    </td>
                  </tr> :
                rows.map((p, i) =>
                <tr key={p.name + i}
                onMouseEnter={(e) => {e.currentTarget.style.background = "rgba(233,183,184,0.04)";}}
                onMouseLeave={(e) => {e.currentTarget.style.background = "transparent";}}
                style={{ transition: "background 200ms ease" }}>
                  
                    <td style={tdStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap" }}>
                        <span style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: 26, height: 26, borderRadius: "50%",
                        background: lp_color(p.name),
                        color: "#0e0e12",
                        fontFamily: "var(--f-mono)", fontSize: 10, fontWeight: 600,
                        letterSpacing: "0.02em", flexShrink: 0
                      }}>{lp_initials(p.name)}</span>
                        <strong style={{ fontWeight: 500 }}>{p.name}</strong>
                      </div>
                    </td>
                    <td style={tdMuted} className="lp-col-role">{p.role}</td>
                    <td style={tdMuted} className="lp-col-seniority">{p.seniority}</td>
                    <td style={tdStyle} className="lp-col-company">{p.company}</td>
                    <td style={tdMuted} className="lp-col-industry">{p.industry}</td>
                    <td style={tdStyle} className="lp-col-lead"><PillLP kind={p.lead} /></td>
                    <td style={tdMuted} className="lp-col-signal">{p.signal}</td>
                    <td style={tdStyle} className="lp-col-strength">
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
                        <SignalBar s={p.strength} />
                        <span style={{
                        fontSize: 11, color: "var(--fg-dim)",
                        textTransform: "uppercase", letterSpacing: "0.05em",
                        fontFamily: "var(--f-mono)"
                      }}>
                          {["Low", "Fair", "Good", "Strong"][p.strength - 1]}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* footer */}
          <div style={footerStyle}>
            <span>Updated 2 min ago</span>
            <span>
              Example data · <span style={{ color: "var(--accent)" }}>Your dashboard updates in real-time</span>
            </span>
          </div>
        </div>
      </div>
    </section>);

}

Object.assign(window, { LiveProspectView });