/* global React, SectionLabel, Footer */

// ─────────────────────────────────────────────────────────
// LEGAL PAGES — Terms & Conditions, Privacy Policy
// Both pages share LegalDocument: a hero + sticky-TOC + body
// layout in the brand language. Sections drive the layout.
// ─────────────────────────────────────────────────────────

const TERMS_SECTIONS = [
  {
    code: "01",
    title: "Introduction",
    body: [
      "These Terms and Conditions (\u201cTerms\u201d) govern your use of services provided by LeadWise AI LLC (\u201cLeadWise AI\u201d, \u201cwe\u201d, \u201cus\u201d, or \u201cour\u201d), a company established in the state of Wyoming with registered address at 30 N Gould St, Sheridan, WY 82801.",
      "By using our services, you agree to these Terms. You may not use our services if you disagree with any part of the terms.",
    ],
  },
  {
    code: "02",
    title: "Services Provided",
    body: ["LeadWise AI agrees to provide the Client with Services, including:"],
    list: [
      "Email domain & account setup and warm-up",
      "Data scraping and enrichment",
      "Audience research and targeting",
      "Campaign optimization and automation",
      "Inbox management",
    ],
  },
  {
    code: "03",
    title: "Client Responsibilities",
    body: ["The Client agrees to:"],
    list: [
      "Being at least 18 years old to use LeadWise AI's services.",
      "Provide necessary access and information for the Company to perform the Services.",
      "Ensure compliance with all applicable laws and regulations.",
    ],
  },
  {
    code: "04",
    title: "Confidentiality",
    body: [
      "Both parties agree to maintain the confidentiality of proprietary information and not to disclose such information to any third party without prior written consent, except as required by law.",
    ],
  },
  {
    code: "05",
    title: "Payment Terms",
    sub: [
      {
        title: "5.1 Minimum Commitment",
        body: ["By using our services, you agree to a minimum engagement period of three (3) months (\u201cMinimum Term\u201d)."],
      },
      {
        title: "5.2 Fees",
        body: ["You agree to pay the monthly service fee as outlined in your signed agreement. All payments are processed securely through Stripe."],
      },
      {
        title: "5.3 Refund Policy",
        body: ["You may cancel within three (3) business days of signing up and receive a full refund, provided that no work has begun. After this window, all payments are final and non-refundable."],
      },
    ],
  },
  {
    code: "06",
    title: "Data and Records Management",
    body: [
      "You are fully responsible for storing, securing, and managing any data or records associated with the leads generated through our services. LeadWise AI does not retain copies of lead data or provide backup storage.",
    ],
  },
  {
    code: "07",
    title: "Intellectual Property",
    body: [
      "All materials created and provided in the course of providing Services shall remain the property of LeadWise AI.",
    ],
  },
  {
    code: "08",
    title: "No Warranty",
    body: [
      "Our services are offered on an \u201cas-is\u201d basis, with no guarantees or warranties, whether stated or implied, regarding performance, reliability, or outcomes.",
    ],
  },
  {
    code: "09",
    title: "Limitation of Liability",
    body: [
      "LeadWise AI shall not be held responsible for any indirect, incidental, consequential, special, or punitive damages resulting from your use of our services.",
    ],
  },
  {
    code: "10",
    title: "Indemnification",
    body: [
      "You agree to indemnify, and hold LeadWise AI harmless from any claims, legal actions, or liabilities resulting from your violation of these Terms or misuse of our services.",
    ],
  },
  {
    code: "11",
    title: "Termination",
    body: [
      "Either party may terminate this Agreement after the Minimum Term by providing written notice at least ten (10) days before the end of the current billing period.",
    ],
  },
  {
    code: "12",
    title: "Governing Law and Dispute",
    body: [
      "This Agreement shall be governed by and construed in accordance with the laws of the State of Wyoming, without regard to its conflict of law principles.",
      "Any disputes will be settled through arbitration conducted by the American Arbitration Association, following its expedited commercial rules for a faster resolution process.",
    ],
  },
  {
    code: "13",
    title: "Entire Agreement",
    body: [
      "This Agreement constitutes the entire understanding between the parties and supersedes all prior agreements, representations, or understandings, whether written or oral. LeadWise AI reserves the right to modify these Terms and Conditions at any time.",
    ],
  },
  {
    code: "14",
    title: "Contact Us",
    body: [
      "If you have any questions about the above \u00abTerms & Conditions\u00bb, please contact us at support@leadwise-ai.com.",
    ],
  },
];

const PRIVACY_SECTIONS = [
  {
    code: "00",
    title: "Preamble",
    body: [
      "Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.",
    ],
  },
  {
    code: "01",
    title: "Information We Collect",
    body: ["We collect information to help businesses connect with qualified leads. This may include:"],
    list: [
      "Contact details (name, email, phone number, company)",
      "Website activity (via cookies and analytics tools)",
      "Business information shared with us voluntarily",
    ],
  },
  {
    code: "02",
    title: "How We Use Your Information",
    body: ["We use collected data to:"],
    list: [
      "Provide our lead generation and outreach services",
      "Improve our platform and communications",
      "Send updates, insights, and promotional content (you can opt out anytime)",
    ],
  },
  {
    code: "03",
    title: "Data Sharing",
    body: [
      "We do not sell your data. We only share information with trusted partners who help us deliver our services, and only when necessary.",
    ],
  },
  {
    code: "04",
    title: "Data Security",
    body: [
      "We use secure technologies and industry best practices to protect your information.",
    ],
  },
  {
    code: "05",
    title: "Your Rights",
    body: [
      "You can request to access, update, or delete your personal data by contacting us at contact@leadwise-ai.com.",
    ],
  },
  {
    code: "06",
    title: "Cookies",
    body: [
      "We use cookies to understand user behaviour and enhance your experience. You can manage your cookie preferences in your browser settings.",
    ],
  },
  {
    code: "07",
    title: "Changes to This Policy",
    body: [
      "We may update this policy from time to time. Any changes will be posted on this page.",
    ],
  },
];

// ─── Shared layout ──────────────────────────────────────
function LegalDocument({ onNav, label, docCode, version, sections, headlineTop, headlineBottom, intro, sectionMeta }) {
  const idPrefix = docCode.toLowerCase();
  const [active, setActive] = React.useState(sections[0].code);

  React.useEffect(() => {
    const onScroll = () => {
      const tops = sections.map((s) => {
        const el = document.getElementById(`${idPrefix}-${s.code}`);
        return el ? { code: s.code, top: el.getBoundingClientRect().top } : null;
      }).filter(Boolean);
      const past = tops.filter((t) => t.top < 160);
      if (past.length) setActive(past[past.length - 1].code);
      else if (tops[0]) setActive(tops[0].code);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [idPrefix, sections]);

  const goTo = (code) => {
    const el = document.getElementById(`${idPrefix}-${code}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section style={{ paddingTop: 72, paddingBottom: 48 }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
            <span className="label-accent">{label}</span>
            <span className="hint">DOC.{docCode} · v {version} · UPDATED 2026.01</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "end" }}>
            <h1 style={{ fontSize: "clamp(56px, 8vw, 132px)", lineHeight: 0.95 }}>
              {headlineTop}<br />{headlineBottom}
            </h1>
            <p className="lead" style={{ maxWidth: "44ch", paddingBottom: 14 }}>
              {intro}
            </p>
          </div>
        </div>
      </section>

      {/* ── Document body ────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionLabel index="D1" title={`DOCUMENT · ${sections.length} SECTIONS`} meta={sectionMeta} />

          <div style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 60,
            border: "1px solid var(--line)",
            borderTop: "none",
          }}>
            {/* Sticky TOC rail */}
            <aside style={{
              position: "sticky", top: 100, alignSelf: "start",
              padding: "32px 24px",
              borderRight: "1px solid var(--line)",
              maxHeight: "calc(100vh - 120px)",
              overflowY: "auto",
            }}>
              <div className="hint" style={{ marginBottom: 18 }}>↳ CONTENTS</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {sections.map((s) => {
                  const isActive = active === s.code;
                  return (
                    <li key={s.code}>
                      <button
                        onClick={() => goTo(s.code)}
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: 0,
                          textAlign: "left",
                          cursor: "pointer",
                          display: "flex",
                          gap: 10,
                          alignItems: "baseline",
                          width: "100%",
                          color: isActive ? "var(--accent)" : "var(--fg-dim)",
                          transition: "color 0.15s",
                        }}
                        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "var(--fg)"; }}
                        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "var(--fg-dim)"; }}
                      >
                        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", flexShrink: 0, paddingTop: 2 }}>
                          {s.code}
                        </span>
                        <span style={{ fontSize: 12.5, lineHeight: 1.4 }}>{s.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Document body */}
            <div style={{ padding: "40px 48px 56px 0", maxWidth: 760 }}>
              {sections.map((s, i) => (
                <article key={s.code} id={`${idPrefix}-${s.code}`} style={{
                  paddingBottom: 48,
                  marginBottom: 48,
                  borderBottom: i < sections.length - 1 ? "1px solid var(--line)" : "none",
                  scrollMarginTop: 100,
                }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "baseline", marginBottom: 18 }}>
                    <span className="mono" style={{
                      color: "var(--accent)", fontSize: 11, letterSpacing: "0.16em", flexShrink: 0,
                    }}>
                      §{s.code}
                    </span>
                    <h2 style={{
                      fontFamily: "var(--f-display)",
                      fontWeight: 300,
                      fontSize: 30,
                      lineHeight: 1.1,
                      margin: 0,
                    }}>
                      {s.title}
                    </h2>
                  </div>

                  {s.body && s.body.map((p, j) => (
                    <p key={j} style={{
                      color: "var(--fg-dim)",
                      fontSize: 14.5,
                      lineHeight: 1.7,
                      marginBottom: 14,
                      maxWidth: "62ch",
                      textWrap: "pretty",
                    }}>
                      {p}
                    </p>
                  ))}

                  {s.list && (
                    <ul style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "8px 0 0 0",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}>
                      {s.list.map((item, j) => (
                        <li key={j} style={{
                          display: "flex", gap: 14, alignItems: "baseline",
                          color: "var(--fg)", fontSize: 14.5, lineHeight: 1.6,
                        }}>
                          <span className="mono" style={{
                            color: "var(--accent)", fontSize: 10, letterSpacing: "0.1em",
                            flexShrink: 0, paddingTop: 2,
                          }}>
                            ◆
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.sub && s.sub.map((sub, j) => (
                    <div key={j} style={{
                      marginTop: 24,
                      paddingLeft: 20,
                      borderLeft: "1px solid var(--line)",
                    }}>
                      <h3 className="mono" style={{
                        fontSize: 12,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--fg)",
                        marginBottom: 10,
                        fontWeight: 500,
                      }}>
                        {sub.title}
                      </h3>
                      {sub.body.map((p, k) => (
                        <p key={k} style={{
                          color: "var(--fg-dim)",
                          fontSize: 14.5,
                          lineHeight: 1.7,
                          marginBottom: 10,
                          maxWidth: "62ch",
                          textWrap: "pretty",
                        }}>
                          {p}
                        </p>
                      ))}
                    </div>
                  ))}
                </article>
              ))}

              {/* End-of-document footer strip */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 24,
                borderTop: "1px solid var(--accent)",
                alignItems: "center",
              }}>
                <span className="hint">
                  <span style={{ color: "var(--accent)" }}>◆</span> END OF DOCUMENT
                </span>
                <span className="hint">LEADWISE AI LLC · WYOMING</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </>
  );
}

function TermsPage({ onNav }) {
  return (
    <LegalDocument
      onNav={onNav}
      label="[ ABOUT / LEGAL / TERMS ]"
      docCode="TC"
      version="1.0"
      sections={TERMS_SECTIONS}
      headlineTop="Terms &"
      headlineBottom="Conditions."
      intro="The agreement between LeadWise AI LLC and any client engaging our outbound, intelligence, or systems services. Read it before you sign."
      sectionMeta="GOVERNING LAW · STATE OF WYOMING"
    />
  );
}

function PrivacyPage({ onNav }) {
  return (
    <LegalDocument
      onNav={onNav}
      label="[ ABOUT / LEGAL / PRIVACY ]"
      docCode="PP"
      version="1.0"
      sections={PRIVACY_SECTIONS}
      headlineTop="Privacy"
      headlineBottom="Policy."
      intro="How LeadWise AI collects, uses, and safeguards the information you share with us. Plain language, no dark patterns."
      sectionMeta="GDPR-ALIGNED · DATA HANDLING"
    />
  );
}

Object.assign(window, { TermsPage, PrivacyPage });
