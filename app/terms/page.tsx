import type { Metadata } from "next";
import { Reveal } from "../../components/primitives";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing engagements with HY Systems.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    h: "Scope",
    p: "These terms govern the audit application and any subsequent engagement with HY Systems. Submitting an application does not create a contract. A binding engagement begins only on a signed scope of work.",
  },
  {
    h: "Deliverables",
    p: "Deliverables, timelines, and fees are defined in the written specification provided after your audit. Any figures shown on this site, including calculator outputs and modeled projections, are illustrative and are not a guarantee of results.",
  },
  {
    h: "Payment",
    p: "Engagement terms, including deposits and milestones, are set out in the scope of work. Work commences once the agreed deposit is received.",
  },
  {
    h: "Performance representations",
    p: "Modeled figures on this site are projections based on stated assumptions. Actual outcomes depend on factors specific to your business. We make no representation that any specific revenue or conversion result will be achieved.",
  },
  {
    h: "Contact",
    p: "Questions about these terms can be directed to info@hysystems.com.au. ABN 33 273 774 384.",
  },
];

export default function TermsPage() {
  return (
    <section className="page-head">
      <div className="wrap" style={{ position: "relative", zIndex: 3, paddingBottom: 100 }}>
        <Reveal>
          <div className="eyebrow">Legal</div>
        </Reveal>
        <Reveal delay={70}>
          <h1 className="h2" style={{ marginTop: 22, maxWidth: 760 }}>
            Terms of Service
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mono" style={{ marginTop: 14, fontSize: "0.7rem", color: "var(--txt3)", letterSpacing: "0.06em" }}>
            Last updated 18 June 2026
          </p>
        </Reveal>
        <div style={{ marginTop: 44, maxWidth: 720, display: "grid", gap: 30 }}>
          {sections.map((s, i) => (
            <Reveal key={s.h} delay={140 + i * 50}>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 24 }}>
                <h2 className="h3" style={{ color: "var(--txt)", fontSize: "1.2rem" }}>
                  {s.h}
                </h2>
                <p className="body" style={{ marginTop: 12 }}>
                  {s.p}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
