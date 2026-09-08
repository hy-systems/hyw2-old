import type { Metadata } from "next";
import { Orbs } from "../../components/fx";
import { Reveal, LinkButton, Arrow, IDot } from "../../components/primitives";

export const metadata: Metadata = {
  title: "Services",
  description:
    "The full automation catalog across three tiers: foundational capture, dynamic operations, and elite algorithmic systems, with indicative build and retainer ranges.",
  alternates: { canonical: "/services" },
};

interface ServiceItem {
  name: string;
  buildRange: string;
  retainerRange: string;
}

interface ServiceTier {
  id: string;
  index: string;
  tierLabel: string;
  name: string;
  classification: string;
  buildRange: string;
  retainerRange: string;
  items: ServiceItem[];
}

const tiers: ServiceTier[] = [
  {
    id: "t3",
    index: "T3",
    tierLabel: "Tier 3",
    name: "Foundational Capture",
    classification: "Local trade and service business",
    buildRange: "$1,500 - $4,000 build",
    retainerRange: "$200 - $500 / mo retainer",
    items: [
      { name: "Premium Website Development", buildRange: "$2,000 - $4,500", retainerRange: "$200 - $400 / mo" },
      { name: "Missed-Call Text-Back", buildRange: "$400 - $700", retainerRange: "$150 - $250 / mo" },
      { name: "CRM Pipeline and Lead Management", buildRange: "$1,200 - $2,200", retainerRange: "$250 - $400 / mo" },
      { name: "Review Request Automation", buildRange: "$600 - $1,000", retainerRange: "$200 - $300 / mo" },
      { name: "Social Media Scheduling and Reposting", buildRange: "$900 - $1,500", retainerRange: "$200 - $300 / mo" },
      { name: "Invoice and Payment Reminder Automation", buildRange: "$700 - $1,300", retainerRange: "$250 - $350 / mo" },
      { name: "Email Drip Sequence", buildRange: "$600 - $1,200", retainerRange: "$150 - $250 / mo" },
      { name: "Basic Webhook Integration", buildRange: "$400 - $800", retainerRange: "Usually bundled" },
      { name: "Basic AI Chat Agent", buildRange: "$1,100 - $1,900", retainerRange: "$300 - $400 / mo" },
      { name: "Speed-to-Lead Automation", buildRange: "$900 - $1,500", retainerRange: "$250 - $350 / mo" },
      { name: "Quote / Estimate Generation Automation", buildRange: "$1,100 - $1,900", retainerRange: "$250 - $350 / mo" },
      { name: "Appointment Confirmation and Reminder Texts", buildRange: "$500 - $900", retainerRange: "$200 - $300 / mo" },
      { name: "FAQ / Hours / Service-Area Auto-Responder", buildRange: "$300 - $700", retainerRange: "Often free add-on" },
    ],
  },
  {
    id: "t2",
    index: "T2",
    tierLabel: "Tier 2",
    name: "Dynamic Operations",
    classification: "Growing SMB and established service business",
    buildRange: "$3,000 - $12,000 build",
    retainerRange: "$500 - $2,000 / mo retainer",
    items: [
      { name: "Database Reactivation Campaign", buildRange: "$3,000 - $5,500", retainerRange: "$600 - $900 / mo" },
      { name: "AI Appointment Setter System", buildRange: "$4,000 - $7,500", retainerRange: "$800 - $1,200 / mo" },
      { name: "Lead Generation and Enrichment System", buildRange: "$4,500 - $8,000", retainerRange: "$900 - $1,500 / mo" },
      { name: "AI Proposal and Quote Automation", buildRange: "$2,500 - $4,500", retainerRange: "$450 - $750 / mo" },
      { name: "AI Recruiting and Onboarding Automation", buildRange: "$3,500 - $6,500", retainerRange: "$600 - $1,000 / mo" },
      { name: "No-Show Reduction Sequence", buildRange: "$2,200 - $3,800", retainerRange: "$400 - $600 / mo" },
      { name: "AI Chat Agent, Mid-Complexity", buildRange: "$3,200 - $5,800", retainerRange: "$550 - $850 / mo" },
      { name: "Review Flywheel with Sentiment Routing", buildRange: "$2,500 - $4,500", retainerRange: "$450 - $750 / mo" },
      { name: "Abandoned Cart Recovery + Service Chatbot", buildRange: "$5,000 - $9,000", retainerRange: "$1,200 - $1,800 / mo" },
      { name: "VIP Customer Identification System", buildRange: "$3,000 - $5,000", retainerRange: "$600 - $1,000 / mo" },
      { name: "Member / Client Win-Back Sequence", buildRange: "$3,200 - $5,800", retainerRange: "$700 - $1,100 / mo" },
      { name: "Estimate Follow-Up Automation", buildRange: "$2,200 - $3,800", retainerRange: "$400 - $600 / mo" },
      { name: "Seasonal / Maintenance Reminder Automation", buildRange: "$2,500 - $4,500", retainerRange: "$500 - $800 / mo" },
    ],
  },
  {
    id: "t1",
    index: "T1",
    tierLabel: "Tier 1",
    name: "Elite Algorithmic",
    classification: "Enterprise and mid-market",
    buildRange: "$10,000 - $100,000+ build",
    retainerRange: "$2,000 - $10,000+ / mo retainer",
    items: [
      { name: "AI SDR System", buildRange: "$25,000 - $45,000", retainerRange: "$3,000 - $5,000 / mo" },
      { name: "AI Voice Agent, Inbound and Outbound", buildRange: "$18,000 - $35,000", retainerRange: "$2,500 - $4,500 / mo" },
      { name: "Custom AI Chatbot, System-Integrated", buildRange: "$15,000 - $28,000", retainerRange: "$2,000 - $3,500 / mo" },
      { name: "AI Data Extraction and Processing Pipeline", buildRange: "$14,000 - $24,000", retainerRange: "$1,800 - $3,000 / mo" },
      { name: "AI Revenue Engine, Full Bundle", buildRange: "$40,000 - $65,000", retainerRange: "$4,500 - $7,500 / mo" },
      { name: "Multi-Agent / Department-Wide System", buildRange: "$55,000 - $100,000+", retainerRange: "$6,000 - $10,000+ / mo" },
      { name: "AI Readiness Audit / Automation Roadmap", buildRange: "$5,000 - $15,000", retainerRange: "No retainer, standalone" },
      { name: "RAG-Based Document Intelligence System", buildRange: "$22,000 - $38,000", retainerRange: "$2,500 - $4,000 / mo" },
      { name: "Industry Compliance Automation", buildRange: "$30,000 - $50,000", retainerRange: "$4,000 - $6,500 / mo" },
    ],
  },
];

function TierBlock({ tier, delay }: { tier: ServiceTier; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div style={{ marginBottom: 26 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 14 }}>
          <div>
            <div
              className="mono"
              style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--acc1)" }}
            >
              {tier.tierLabel} ({tier.index}) / {tier.classification}
            </div>
            <h2 className="h3" style={{ marginTop: 8, color: "var(--txt)" }}>
              {tier.tierLabel}: {tier.name}
            </h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="mono" style={{ fontSize: "0.95rem", color: "var(--txt)", fontWeight: 700 }}>
              {tier.buildRange}
            </div>
            <div className="mono" style={{ fontSize: "0.75rem", color: "var(--txt3)", marginTop: 4 }}>
              {tier.retainerRange}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }}>
        {tier.items.map((it) => (
          <div
            key={it.name}
            style={{
              background: "var(--bg1)",
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 14,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.98rem", color: "var(--txt1)" }}>
              <span style={{ color: "var(--acc1)" }}>
                <IDot width={9} height={9} />
              </span>
              {it.name}
            </span>
            <span style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
              <span className="mono" style={{ fontSize: "0.85rem", color: "var(--txt)", fontWeight: 600 }}>
                {it.buildRange}
              </span>
              <span className="mono" style={{ fontSize: "0.78rem", color: "var(--txt3)" }}>
                {it.retainerRange}
              </span>
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export default function ServicesPage() {
  return (
    <>
      <section className="page-head">
        <Orbs />
        <div className="wrap" style={{ position: "relative", zIndex: 3 }}>
          <Reveal>
            <div className="eyebrow">Services</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h2" style={{ marginTop: 24, maxWidth: 900 }}>
              Every automation, every tier, indicative pricing.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="lede" style={{ marginTop: 24, maxWidth: 680 }}>
              Figures below are indicative ranges, not quotes. Your exact build and retainer are
              scoped during the audit based on your specific systems and bottleneck.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ background: "var(--bg)" }}>
        <div className="wrap" style={{ paddingBottom: 110, display: "grid", gap: 90 }}>
          {tiers.map((tier, i) => (
            <TierBlock key={tier.id} tier={tier} delay={i * 60} />
          ))}

          <Reveal delay={60}>
            <div
              style={{
                display: "flex",
                gap: 28,
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                borderTop: "1px solid var(--line)",
                paddingTop: 44,
              }}
            >
              <p className="big-quote" style={{ maxWidth: 620, fontSize: "clamp(1.25rem,2.4vw,1.8rem)" }}>
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
