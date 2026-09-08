import type { Metadata } from "next";
import { Reveal } from "../../components/primitives";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How HY Systems collects, uses, and protects information.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    h: "Information we collect",
    p: "We collect the information you submit through the audit application: name, company, email, phone, website, revenue band, and the operational detail you provide. We also collect standard technical data such as IP address and browser type.",
  },
  {
    h: "How we use it",
    p: "We use submitted information solely to evaluate fit, prepare your audit, and contact you about the engagement. We do not sell or rent personal information to third parties.",
  },
  {
    h: "Data handling",
    p: "Application data may be processed by our customer relationship and automation infrastructure for the purpose of servicing your enquiry. Access is limited to HY Systems personnel and the systems required to operate the business.",
  },
  {
    h: "Analytics and advertising",
    p: "When you submit the audit form, we may send a conversion signal to advertising and analytics platforms including Meta and Google to measure marketing performance. Where contact identifiers such as your email or phone are used for this purpose, they are irreversibly hashed before transmission, so these platforms do not receive your raw details. You can opt out by contacting info@hysystems.com.au.",
  },
  {
    h: "Your rights",
    p: "You may request access to, correction of, or deletion of the personal information we hold about you. Contact info@hysystems.com.au and we will respond within a reasonable period.",
  },
  {
    h: "Contact",
    p: "Questions about this policy can be directed to info@hysystems.com.au. ABN 33 273 774 384.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="page-head">
      <div className="wrap" style={{ position: "relative", zIndex: 3, paddingBottom: 100 }}>
        <Reveal>
          <div className="eyebrow">Legal</div>
        </Reveal>
        <Reveal delay={70}>
          <h1 className="h2" style={{ marginTop: 22, maxWidth: 760 }}>
            Privacy Policy
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
