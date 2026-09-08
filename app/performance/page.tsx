import type { Metadata } from "next";
import { Orbs } from "../../components/fx";
import { Reveal, LinkButton, Arrow, IDot } from "../../components/primitives";
import type {
  PerformanceMetric,
  DeployedStackItem,
  CaseStudy,
} from "../../lib/types";
import { aud, num } from "../../lib/format";

export const metadata: Metadata = {
  title: "Performance",
  description:
    "A data-logging view of modeled infrastructure impact and the deployed automation stack behind it. Verified client results are shared under NDA during the audit.",
  alternates: { canonical: "/performance" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://hysystems.com.au/performance",
    siteName: "HY Systems",
    title: "Performance / HY Systems",
    description:
      "Modeled infrastructure impact on stated assumptions, plus the exact deployed stack. No unverifiable revenue claims.",
    images: [{ url: "/og-cover.png", width: 1200, height: 630, alt: "HY Systems performance model" }],
  },
};

/*
 * COMPLIANCE NOTICE (Australian Consumer Law, s18 / s29).
 * The figures below are MODELED PROJECTIONS derived from the same stated
 * assumptions as the on-site ROI calculator. They are not attributable client
 * results. Do NOT relabel this data as real performance, testimonials, or
 * historical outcomes. Before publishing any figure as a real result, replace
 * the `caseStudies` entries with verified, written-consent client data and set
 * `verified: true`. Presenting modeled numbers as actual client outcomes is
 * misleading conduct and exposes HY Systems to regulatory and civil liability.
 */

const projection: PerformanceMetric[] = [
  { label: "Previous Monthly Revenue", to: 48000, kind: "currency", fillPct: 55 },
  { label: "Modeled Monthly Revenue", from: 48000, to: 86000, kind: "currency", fillPct: 100 },
  { label: "Modeled Lead Conversion Increase", to: 38, kind: "percent", fillPct: 76 },
  { label: "Manual Hours Eliminated / Week", to: 14, kind: "hours", fillPct: 64 },
];

const deployedStack: DeployedStackItem[] = [
  { tier: "Tier 3", system: "Missed-call text-back with payment-gated booking" },
  { tier: "Tier 3", system: "Post-service review generation (email and SMS)" },
  { tier: "Tier 2", system: "Dormant database reactivation sequence" },
  { tier: "Tier 2", system: "AI conversational qualification agent" },
  { tier: "Tier 2", system: "Automated appointment-setting and booking pipeline" },
];

// Verified, consent-backed client results go here with verified: true.
// Until then the page renders an honest empty state plus one labeled model.
const caseStudies: CaseStudy[] = [
  {
    id: "model-residential-trades",
    client: "Illustrative model",
    sector: "Residential trades",
    window: "Modeled over 90 days",
    verified: false,
    summary:
      "A composite scenario built on the same assumptions as the on-site ROI calculator: a 40% close rate on answered leads and 60% recovery of missed demand via automated text-back. It is a projection, not a client outcome.",
    metrics: projection,
    stack: deployedStack,
  },
];

function fmtValue(m: PerformanceMetric): string {
  switch (m.kind) {
    case "currency":
      return aud(m.to);
    case "percent":
      return "+" + num(m.to) + "%";
    case "hours":
      return num(m.to) + " hrs";
    default:
      return num(m.to);
  }
}

function MetricCard({ m }: { m: PerformanceMetric }) {
  return (
    <div className="metric">
      <div className="metric__label">{m.label}</div>
      <div className="metric__val">{fmtValue(m)}</div>
      {typeof m.from === "number" ? (
        <div className="metric__from">from {m.kind === "currency" ? aud(m.from) : num(m.from)}</div>
      ) : null}
      <div className="bar">
        <i style={{ width: Math.max(0, Math.min(100, m.fillPct)) + "%" }} />
      </div>
    </div>
  );
}

export default function PerformancePage() {
  const verified = caseStudies.filter((c) => c.verified);
  const illustrative = caseStudies.filter((c) => !c.verified).slice(0, 1);

  return (
    <>
      <section className="page-head">
        <Orbs />
        <div className="wrap" style={{ position: "relative", zIndex: 3 }}>
          <Reveal>
            <div className="eyebrow">Performance</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h2" style={{ marginTop: 24, maxWidth: 900 }}>
              The system, logged. Modeled impact and the stack that produces it.
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="lede" style={{ marginTop: 24, maxWidth: 700 }}>
              This is a data view, not a highlight reel. The dashboard below is a modeled
              projection on stated assumptions. Verified client results are shared, with consent,
              during the audit.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Modeled projection dashboard */}
      <section style={{ background: "var(--bg)" }}>
        <div className="wrap" style={{ paddingBottom: 90 }}>
          <Reveal>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
                marginBottom: 26,
              }}
            >
              <div className="live" style={{ color: "var(--txt2)" }}>
                <span className="dot" /> Projection model / live assumptions
              </div>
              <span className="tag tag--modeled">
                <span className="dotw" /> Modeled projection
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="metric-grid metric-grid--4">
              {projection.map((m) => (
                <MetricCard key={m.label} m={m} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mono" style={{ fontSize: "0.66rem", color: "var(--txt3)", marginTop: 18, lineHeight: 1.7, maxWidth: 760 }}>
              Method: 40% close rate on answered leads, 60% recovery of missed demand via
              automated text-back. Figures are illustrative of the model and are not attributable
              to a specific client.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Deployed stack */}
      <section style={{ background: "var(--bg1)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ paddingTop: 90, paddingBottom: 90 }}>
          <Reveal>
            <div className="eyebrow">Deployed Stack</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="h2" style={{ marginTop: 22, marginBottom: 36, maxWidth: 720 }}>
              The exact automations behind the model.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }}>
            {deployedStack.map((s, i) => (
              <Reveal key={s.system} delay={i * 60}>
                <div
                  style={{
                    background: "var(--bg)",
                    padding: "22px 26px",
                    display: "flex",
                    alignItems: "center",
                    gap: 22,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: "0.66rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: s.tier === "Tier 3" ? "var(--acc2)" : "var(--acc1)",
                      border: "1px solid var(--line2)",
                      padding: "5px 10px",
                      flex: "none",
                    }}
                  >
                    {s.tier}
                  </span>
                  <span className="body" style={{ fontSize: "0.98rem", color: "var(--txt1)" }}>
                    {s.system}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Verified case studies + honest empty state */}
      <section style={{ background: "var(--bg)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ paddingTop: 90, paddingBottom: 30 }}>
          <Reveal>
            <div className="eyebrow">Verified Results</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="h2" style={{ marginTop: 22, marginBottom: 36, maxWidth: 720 }}>
              Attributable client outcomes.
            </h2>
          </Reveal>

          {verified.length === 0 ? (
            <Reveal delay={120}>
              <div
                style={{
                  border: "1px solid var(--line2)",
                  background: "var(--bg1)",
                  padding: "clamp(28px,4vw,44px)",
                }}
              >
                <span className="verify">
                  <span className="verify__pulse" /> Data verification pending
                </span>
                <p className="big-quote" style={{ marginTop: 18, fontSize: "clamp(1.25rem,2.4vw,1.8rem)" }}>
                  We hold client results to an evidence standard before they appear here.
                </p>
                <p className="body" style={{ marginTop: 16, maxWidth: 620 }}>
                  Verified, consent-backed outcomes are presented in full context during your
                  audit. We do not publish unverifiable revenue claims. The model above shows how
                  the system is engineered to perform. The audit shows what it has done.
                </p>
              </div>
            </Reveal>
          ) : (
            <div style={{ display: "grid", gap: 24 }}>
              {verified.map((c) => (
                <Reveal key={c.id}>
                  <article style={{ border: "1px solid var(--line2)", background: "var(--bg1)", padding: "clamp(24px,3vw,36px)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                      <h3 className="h3" style={{ color: "var(--txt)" }}>
                        {c.client}
                      </h3>
                      <span className="tag">
                        <span className="dotw" /> Verified
                      </span>
                    </div>
                    <div className="mono" style={{ fontSize: "0.68rem", color: "var(--txt3)", marginTop: 8, letterSpacing: "0.08em" }}>
                      {c.sector} / {c.window}
                    </div>
                    <p className="body" style={{ marginTop: 16, maxWidth: 680 }}>
                      {c.summary}
                    </p>
                    <div className="metric-grid metric-grid--4" style={{ marginTop: 26 }}>
                      {c.metrics.map((m) => (
                        <MetricCard key={m.label} m={m} />
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Illustrative model, clearly delineated from verified results */}
      {illustrative.length > 0 ? (
        <section style={{ background: "var(--bg)" }}>
          <div className="wrap" style={{ paddingTop: 10, paddingBottom: 30 }}>
            {illustrative.map((c) => (
              <Reveal key={c.id}>
                <article
                  style={{
                    border: "1px solid rgba(255,177,60,0.4)",
                    background: "var(--bg1)",
                    padding: "clamp(24px,3vw,36px)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <h3 className="h3" style={{ color: "var(--txt)" }}>
                      {c.client}
                    </h3>
                    <span className="tag tag--illustrative">
                      <span className="dotw" /> Illustrative / not a client result
                    </span>
                  </div>
                  <div className="mono" style={{ fontSize: "0.68rem", color: "var(--txt3)", marginTop: 8, letterSpacing: "0.08em" }}>
                    {c.sector} / {c.window}
                  </div>
                  <p className="body" style={{ marginTop: 16, maxWidth: 680 }}>
                    {c.summary}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* Persistent CTA dock */}
      <section style={{ background: "var(--bg)" }}>
        <div className="wrap" style={{ paddingBottom: 70 }}>
          <div className="dock">
            <div className="dock__pill">
              <span className="body" style={{ fontSize: "0.95rem", color: "var(--txt1)" }}>
                See what the system would recover for you.
              </span>
              <LinkButton href="/audit" variant="primary" style={{ padding: "12px 20px", fontSize: "0.85rem" }}>
                Book Revenue Leak Audit <Arrow />
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
