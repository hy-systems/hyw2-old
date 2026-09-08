import type { Metadata } from "next";
import { Orbs } from "../../components/fx";
import {
  Reveal,
  LinkButton,
  Arrow,
  ICheck,
  IDot,
  IDatabase,
  ICal,
  ICpu,
} from "../../components/primitives";
import type { AutomationTier } from "../../lib/types";

export const metadata: Metadata = {
  title: "Infrastructure",
  description:
    "Three tiers of autonomous automation infrastructure for Australian trade and service businesses: foundational capture, dynamic operations, and elite algorithmic processing.",
  alternates: { canonical: "/infrastructure" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://hysystems.com.au/infrastructure",
    siteName: "HY Systems",
    title: "Infrastructure / HY Systems",
    description:
      "Foundational capture, dynamic operations, and elite algorithmic processing. Three tiers, engineered not improvised.",
    images: [{ url: "/og-cover.png", width: 1200, height: 630, alt: "HY Systems infrastructure tiers" }],
  },
};

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Web infrastructure and AI automation",
  provider: { "@type": "Organization", name: "HY Systems", url: "https://hysystems.com.au" },
  areaServed: { "@type": "Country", name: "Australia" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Automation tiers",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Foundational Capture",
          description: "Data capture and routing: validated forms, CRM entry, follow-up sequences, instant notification.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dynamic Operations",
          description: "Calendar sync, scheduling with deposit capture, review generation, database reactivation.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Elite Algorithmic",
          description: "AI conversational agents, automated closing pipelines, predictive alerts, custom API integration.",
        },
      },
    ],
  },
};

const tiers: AutomationTier[] = [
  {
    id: "t3",
    index: "T3",
    name: "Foundational Capture",
    classification: "Data capture and routing",
    premise: "The absolute minimum required for survival.",
    capabilities: [
      "Intelligent contact forms with validation",
      "Automated CRM data entry",
      "Email follow-up sequences",
      "Instant lead notification via SMS and Slack",
    ],
    spec: [
      "Server-side validation and spam filtering on every submission",
      "Field-level mapping into pipeline stages the moment a lead arrives",
      "Trigger-based email cadences with dynamic merge fields",
      "Sub-minute push routing to the operator on call",
    ],
    outcome: "No inbound contact is lost, mislogged, or left waiting.",
  },
  {
    id: "t2",
    index: "T2",
    name: "Dynamic Operations",
    classification: "Dynamic operational logic",
    premise: "The system begins to run the business.",
    capabilities: [
      "Two-way calendar synchronisation",
      "Automated scheduling with deposit capture",
      "Review generation via email and SMS post-service",
      "Database reactivation campaigns for dormant leads",
    ],
    spec: [
      "Bi-directional sync across Google and Outlook calendars",
      "Payment-gated booking that secures the slot on deposit",
      "Conditional review requests fired on job completion",
      "Segmented reactivation sequences targeting cold records",
    ],
    outcome:
      "Scheduling, payment, reputation, and re-engagement execute without manual touch.",
  },
  {
    id: "t1",
    index: "T1",
    name: "Elite Algorithmic",
    classification: "Elite algorithmic processing",
    premise: "The human operator exits the fulfilment bottleneck.",
    capabilities: [
      "AI conversational agents for complex queries",
      "Fully automated high-ticket closing pipelines",
      "Predictive inventory and demand alerts",
      "Custom API integration across legacy systems",
    ],
    spec: [
      "Context-aware agents trained on your service catalogue",
      "Multi-step nurture and close, with human handoff only at signature",
      "Threshold-based predictive alerts on stock and demand",
      "Bespoke middleware bridging isolated software into one event bus",
    ],
    outcome: "The system answers, qualifies, closes, and reorders autonomously.",
    elite: true,
  },
];

const ICONS: Record<string, React.ReactNode> = {
  t1: <IDatabase />,
  t2: <ICal />,
  t3: <ICpu />,
};

export default function InfrastructurePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <section className="page-head">
        <Orbs />
        <div className="wrap" style={{ position: "relative", zIndex: 3 }}>
          <Reveal>
            <div className="eyebrow">Infrastructure</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h2" style={{ marginTop: 24, maxWidth: 920 }}>
              Three tiers of autonomous infrastructure. Engineered, not improvised.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="lede" style={{ marginTop: 24, maxWidth: 680 }}>
              We do not sell tasks. We deploy systems. Each tier compounds on the last, removing
              human latency from capture, operations, and fulfilment in sequence.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ background: "var(--bg)" }}>
        <div className="wrap" style={{ paddingBottom: 110 }}>
          <div className="tiers">
            {tiers.map((t, i) => (
              <Reveal key={t.id} delay={i * 90} style={{ display: "flex" }}>
                <article
                  className="tier"
                  tabIndex={0}
                  data-elite={t.elite ? "true" : undefined}
                  aria-label={`${t.name} tier`}
                  style={{ width: "100%" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ color: "var(--acc1)" }}>{ICONS[t.id]}</span>
                    <span className="mono" style={{ fontSize: "0.82rem", color: "var(--txt3)", letterSpacing: "0.06em" }}>
                      Tier {t.index.replace("T", "")} ({t.index})
                    </span>
                  </div>

                  <h2 className="h3" style={{ marginTop: 26, color: "var(--txt)" }}>
                    {t.name}
                  </h2>
                  <div
                    className="mono"
                    style={{
                      marginTop: 10,
                      fontSize: "0.68rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--acc1)",
                    }}
                  >
                    {t.classification}
                  </div>
                  <p className="body" style={{ marginTop: 14, fontSize: "0.95rem" }}>
                    {t.premise}
                  </p>

                  <div className="tier__rule" />

                  <div>
                    {t.capabilities.map((c) => (
                      <div key={c} className="tier__cap">
                        <ICheck width={18} height={18} />
                        <span className="body" style={{ fontSize: "0.92rem", color: "var(--txt1)" }}>
                          {c}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="tier__spec" aria-hidden="false">
                    <div
                      className="mono"
                      style={{
                        fontSize: "0.62rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--txt3)",
                        marginBottom: 12,
                      }}
                    >
                      Technical specification
                    </div>
                    {t.spec.map((s) => (
                      <div key={s} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "7px 0" }}>
                        <span style={{ color: "var(--acc2)", marginTop: 5 }}>
                          <IDot width={10} height={10} />
                        </span>
                        <span className="body" style={{ fontSize: "0.86rem", color: "var(--txt2)" }}>
                          {s}
                        </span>
                      </div>
                    ))}
                    <p
                      className="body"
                      style={{
                        marginTop: 14,
                        fontSize: "0.88rem",
                        color: "var(--txt1)",
                        borderLeft: "2px solid var(--acc)",
                        paddingLeft: 14,
                      }}
                    >
                      {t.outcome}
                    </p>
                  </div>

                  <div className="tier__hint">
                    <span style={{ color: "var(--acc1)" }}>
                      <IDot width={8} height={8} />
                    </span>
                    Hover to expand specification
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div
              style={{
                marginTop: 64,
                display: "flex",
                gap: 28,
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <p className="big-quote" style={{ maxWidth: 620, fontSize: "clamp(1.3rem,2.6vw,2rem)" }}>
                Your tier is determined by your bottleneck, not your budget.
              </p>
              <LinkButton href="/audit" variant="primary">
                Initiate Infrastructure Audit <Arrow />
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
