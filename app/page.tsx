"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Orbs, ParticleField } from "../components/fx";
import {
  SplitText,
  Reveal,
  Spotlight,
  LinkButton,
  Arrow,
  IPhone,
  IChat,
  IHook,
  IPipe,
  IDot,
  ICross,
  IShield,
  IClock,
  ICheck,
  ICpu,
  IRoute,
  ICal,
  IDatabase,
  IBolt,
  IGraph,
  IPlug,
} from "../components/primitives";

// Below-the-fold interactive island: defer its JS until the route is interactive.
const RoiCalculator = dynamic(
  () => import("../components/roi-calculator").then((m) => m.RoiCalculator),
  {
    ssr: false,
    loading: () => (
      <div className="roi-grid" aria-hidden="true" style={{ minHeight: 360, opacity: 0.5 }} />
    ),
  }
);

const arsenalTiers = [
  {
    tierLabel: "Tier 3",
    tierIndex: "T3",
    tierName: "Foundational Capture",
    items: [
      { icon: <IPhone />, title: "Missed-Call Text-Back", desc: "The instant a call goes unanswered, an automated SMS opens the conversation before they dial a competitor." },
      { icon: <IPipe />, title: "CRM Pipeline and Lead Management", desc: "Every lead staged, tracked, and actioned in a structured pipeline with zero manual entry." },
      { icon: <IChat />, title: "Review Request Automation", desc: "Job marked complete triggers an automated Google review request timed for peak satisfaction." },
      { icon: <ICal />, title: "Social Media Scheduling and Reposting", desc: "A standing content calendar posts and reposts across platforms without a hand on the keyboard." },
      { icon: <IClock />, title: "Invoice and Payment Reminder Automation", desc: "Unpaid invoices trigger an automatic SMS follow-up sequence at 3, 7, and 14 days." },
      { icon: <IChat />, title: "Email Drip Sequence", desc: "New leads enter a 5-7 email nurture sequence over two weeks, fully automated." },
      { icon: <IHook />, title: "Basic Webhook Integration", desc: "A form submission triggers an action in another app with zero manual handoff." },
      { icon: <ICpu />, title: "Basic AI Chat Agent", desc: "An embedded chat agent answers FAQs and takes quote requests around the clock." },
      { icon: <IBolt />, title: "Speed-to-Lead Automation", desc: "Every new web lead gets an instant automated SMS or email response within seconds." },
      { icon: <IPipe />, title: "Quote / Estimate Generation Automation", desc: "A submitted form auto-generates and sends a templated quote, no manual drafting." },
      { icon: <ICal />, title: "Appointment Confirmation and Reminder Texts", desc: "Automated confirmation and reminder texts cut no-shows before they happen." },
      { icon: <IChat />, title: "FAQ / Hours / Service-Area Auto-Responder", desc: "Automatic replies to common SMS and DM questions about hours, service area, and pricing." },
    ],
  },
  {
    tierLabel: "Tier 2",
    tierIndex: "T2",
    tierName: "Dynamic Operations",
    items: [
      { icon: <IDatabase />, title: "Database Reactivation Campaign", desc: "Dormant past-customer lists get an AI-personalized re-engagement sequence that turns old contacts into new jobs." },
      { icon: <ICal />, title: "AI Appointment Setter System", desc: "New leads are contacted, qualified, and booked into a calendar within 60 seconds of enquiry." },
      { icon: <IGraph />, title: "Lead Generation and Enrichment System", desc: "Targeted prospect lists are pulled, enriched with research, and pushed into an outreach sequence automatically." },
      { icon: <IPipe />, title: "AI Proposal and Quote Automation", desc: "A tailored proposal document generates and sends itself, then follows up if there is no response in 48 hours." },
      { icon: <ICheck />, title: "AI Recruiting and Onboarding Automation", desc: "Applicants are screened, scored, and scheduled automatically, with onboarding sequences handling the rest." },
      { icon: <IClock />, title: "No-Show Reduction Sequence", desc: "Smart multi-touch reminders plus an automatic rebooking flow recover appointments that would otherwise be lost." },
      { icon: <IChat />, title: "AI Chat Agent, Mid-Complexity", desc: "A web-embedded agent trained on your services qualifies and routes conversations in real time." },
      { icon: <IRoute />, title: "Review Flywheel with Sentiment Routing", desc: "Happy customers get the review ask. Unhappy customers get routed to a recovery sequence instead." },
      { icon: <ICross />, title: "Abandoned Cart Recovery + Service Chatbot", desc: "Abandoned carts trigger automated recovery sequences while a live chatbot handles service questions." },
      { icon: <IShield />, title: "VIP Customer Identification System", desc: "High-LTV customers are flagged automatically and routed into a dedicated retention sequence." },
      { icon: <IDatabase />, title: "Member / Client Win-Back Sequence", desc: "Churned members and clients receive an AI-personalized win-back sequence before they are gone for good." },
      { icon: <IClock />, title: "Estimate Follow-Up Automation", desc: "Sent estimates that go quiet get an automatic, persistent follow-up sequence chasing the close." },
      { icon: <ICal />, title: "Seasonal / Maintenance Reminder Automation", desc: "Recurring-service clients get automatic seasonal and maintenance reminders that generate repeat bookings." },
    ],
  },
  {
    tierLabel: "Tier 1",
    tierIndex: "T1",
    tierName: "Elite Algorithmic",
    items: [
      { icon: <IGraph />, title: "AI SDR System", desc: "Research, personalization, and outreach at scale replace or augment an entire outbound sales team." },
      { icon: <IPhone />, title: "AI Voice Agent, Inbound and Outbound", desc: "An AI voice system makes and takes hundreds of calls a day, qualifying leads and booking appointments without a human on the line." },
      { icon: <ICpu />, title: "Custom AI Chatbot, System-Integrated", desc: "A chatbot trained on your internal docs, CRM, and ticketing system handles complex queries end to end." },
      { icon: <IDatabase />, title: "AI Data Extraction and Processing Pipeline", desc: "Unstructured documents, invoices, and contracts are converted into clean, structured data automatically." },
      { icon: <IBolt />, title: "AI Revenue Engine, Full Bundle", desc: "Voice, speed-to-lead, appointment setting, no-show reduction, and review flywheel combined into one autonomous system." },
      { icon: <IRoute />, title: "Multi-Agent / Department-Wide System", desc: "Multiple interconnected agents handle cross-department data flows with custom model integration." },
      { icon: <IShield />, title: "AI Readiness Audit / Automation Roadmap", desc: "A standalone diagnostic mapping exactly where automation will and will not move the needle before a dollar is committed to a build." },
      { icon: <IPlug />, title: "RAG-Based Document Intelligence System", desc: "Retrieval-augmented search over your full knowledge base answers questions instead of just storing documents." },
      { icon: <IShield />, title: "Industry Compliance Automation", desc: "Built-in audit trails and governance checkpoints for regulated industries, from prior authorization to access logging." },
    ],
  },
];

const method = [
  {
    n: "01",
    t: "Audit",
    d: "We map every inbound path, expose where revenue leaks, and return a written specification. No retainer to find out.",
  },
  {
    n: "02",
    t: "Architect",
    d: "We design the system: text-back triggers, AI routing logic, webhook events, and pipeline stages, modelled to your operation.",
  },
  {
    n: "03",
    t: "Automate",
    d: "We build and deploy on HighLevel and Vercel. Every call captured, every lead qualified, every follow-up fired automatically.",
  },
  {
    n: "04",
    t: "Scale",
    d: "We monitor, tune conversion, and extend the infrastructure as volume grows. The system compounds.",
  },
];

const without = [
  "No web presence, or one left untouched for years",
  "Generic templates identical to every competitor",
  "Calls ring out after hours and on the job",
  "Manual scheduling consumes billable time",
  "No follow-up. Leads go cold overnight.",
];

const withHY = [
  "A precision-built site engineered for conversion, not vanity",
  "A brand presence that commands premium pricing",
  "Every missed call answered in under 60 seconds",
  "AI books and routes with zero manual input",
  "Automated follow-up until the lead closes",
];

const uptime = [
  { v: "24/7", k: "Autonomous uptime" },
  { v: "0ms", k: "Zero-latency lead processing" },
  { v: "< 7 days", k: "From audit to deployment" },
];

export default function HomePage() {
  return (
    <>
      <header
        id="top"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Orbs />
        <ParticleField />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 22%, transparent 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <div
          className="wrap"
          style={{ position: "relative", zIndex: 3, paddingTop: 130, paddingBottom: 90 }}
        >
          <div className="eyebrow fade-up" style={{ animationDelay: "60ms" }}>
            HY Systems / Autonomous Web &amp; AI Infrastructure
          </div>
          <h1 className="h1" style={{ marginTop: 28, maxWidth: 1000 }}>
            <SplitText
              text="We architect autonomous revenue systems for high-revenue local service operators."
              accent={["autonomous", "revenue", "systems"]}
              baseDelay={180}
              stagger={44}
            />
          </h1>
          <p
            className="lede fade-up"
            style={{ marginTop: 30, maxWidth: 660, animationDelay: "760ms" }}
          >
            Invisible online means you do not exist. Slow operations mean you bleed leads every
            day. We deploy the web presence and the autonomous infrastructure that captures,
            qualifies, and closes inbound demand without human constraint.
          </p>
          <div
            className="fade-up"
            style={{
              marginTop: 42,
              display: "flex",
              gap: 32,
              alignItems: "center",
              flexWrap: "wrap",
              animationDelay: "880ms",
            }}
          >
            <LinkButton href="/audit" variant="primary">
              Book Revenue Leak Audit <Arrow />
            </LinkButton>
            <LinkButton href="/infrastructure" variant="ghost">
              See the infrastructure
            </LinkButton>
          </div>
          <div
            className="fade-up"
            style={{
              marginTop: 76,
              display: "flex",
              gap: 56,
              flexWrap: "wrap",
              animationDelay: "1000ms",
            }}
          >
            {[
              ["< 7 days", "From brief to live system"],
              ["24 / 7", "Autonomous routing coverage"],
              ["0", "Leads lost to silence"],
            ].map(([v, k]) => (
              <div key={k}>
                <div className="mono" style={{ fontSize: "1.15rem", color: "var(--txt)", fontWeight: 700 }}>
                  {v}
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: "0.66rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--txt3)",
                    marginTop: 7,
                  }}
                >
                  {k}
                </div>
              </div>
            ))}
          </div>
          <div
            className="fade-up trust"
            style={{ marginTop: 40, animationDelay: "1120ms" }}
          >
            <span className="trust__item">
              <IShield width={15} height={15} /> Melbourne / Boronia VIC
            </span>
            <span className="trust__item">
              <IDot width={10} height={10} /> ABN 33 273 774 384
            </span>
            <span className="trust__item">
              <IClock width={15} height={15} /> Audit returned within 1 business day
            </span>
          </div>
        </div>
      </header>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__t">
          {[0, 1].map((k) => (
            <span key={k}>
              Missed-Call Text-Back&nbsp;&nbsp;AI Conversational Routing&nbsp;&nbsp;API Webhook
              Structures&nbsp;&nbsp;CRM Pipeline Architecture&nbsp;&nbsp;Speed-to-Lead
              Automation&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Thesis */}
      <section style={{ background: "var(--bg)" }}>
        <div className="wrap" style={{ paddingTop: 120, paddingBottom: 60 }}>
          <Reveal>
            <div className="eyebrow">The Thesis</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="h2" style={{ marginTop: 26, maxWidth: 980 }}>
              Invisible online. Leaking offline. Two problems. One system.
            </h2>
          </Reveal>
          <div style={{ marginTop: 46, maxWidth: 780, display: "grid", gap: 30 }}>
            <Reveal delay={130}>
              <p className="body">
                A local service operator without a premium web presence does not compete. It does
                not even appear. The operators who do appear still lose the job when no one answers
                the call, follows up, or books fast enough. That is not a personnel problem. It is
                an infrastructure problem.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="big-quote">
                We deploy the website that wins the click and the system that closes the lead.
                Both. Simultaneously.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="wrap" style={{ paddingBottom: 120 }}>
          <Reveal delay={60}>
            <div className="cols2">
              <div style={{ background: "var(--bg)", padding: "38px 34px" }}>
                <div
                  className="mono"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--txt3)",
                    marginBottom: 24,
                  }}
                >
                  Without infrastructure
                </div>
                {without.map((x) => (
                  <div
                    key={x}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      padding: "13px 0",
                      borderTop: "1px solid var(--line)",
                    }}
                  >
                    <span style={{ color: "var(--txt3)", marginTop: 2 }}>
                      <ICross />
                    </span>
                    <span className="body" style={{ fontSize: "0.96rem", color: "var(--txt2)" }}>
                      {x}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ background: "var(--bg1)", padding: "38px 34px" }}>
                <div
                  className="mono"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--acc1)",
                    marginBottom: 24,
                  }}
                >
                  With HY Systems
                </div>
                {withHY.map((x) => (
                  <div
                    key={x}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      padding: "13px 0",
                      borderTop: "1px solid var(--line)",
                    }}
                  >
                    <span style={{ color: "var(--acc1)", marginTop: 2 }}>
                      <IDot />
                    </span>
                    <span className="body" style={{ fontSize: "0.96rem", color: "var(--txt1)" }}>
                      {x}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Systemic uptime band (replaces public pricing) */}
      <section
        style={{
          background: "var(--bg1)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="wrap" style={{ paddingTop: 72, paddingBottom: 72 }}>
          <h2 className="vh">Operating guarantees</h2>
          <div
            style={{
              display: "grid",
              gap: 40,
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            }}
          >
            {uptime.map((s, i) => (
              <Reveal key={s.k} delay={i * 90}>
                <div
                  style={{
                    fontFamily: "var(--sans)",
                    fontWeight: 600,
                    fontSize: "clamp(2.6rem,5.5vw,4rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {s.v}
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--txt2)",
                    marginTop: 14,
                  }}
                >
                  {s.k}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Arsenal */}
      <section id="arsenal" style={{ background: "var(--bg)" }}>
        <div className="wrap" style={{ paddingTop: 120, paddingBottom: 120 }}>
          <Reveal>
            <div className="eyebrow">The Arsenal</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="h2" style={{ marginTop: 26, marginBottom: 50, maxWidth: 760 }}>
              Premium builds. Bulletproof backend.
            </h2>
          </Reveal>
          <div className="bento">
            <Reveal style={{ gridColumn: "span 6", display: "flex" }}>
              <Spotlight
                className="cell"
                style={{ width: "100%", minHeight: 280, justifyContent: "space-between" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--acc1)" }}>
                    <IPipe />
                  </span>
                  <span className="mono" style={{ fontSize: "0.8rem", color: "var(--txt3)" }}>
                    01
                  </span>
                </div>
                <div style={{ maxWidth: 620 }}>
                  <h3
                    className="h3"
                    style={{ marginTop: 28, color: "var(--txt)", fontSize: "clamp(1.6rem,3vw,2.3rem)" }}
                  >
                    Premium Website Development
                  </h3>
                  <p className="body" style={{ marginTop: 14 }}>
                    Lightning-fast, brutally minimalist frontends engineered strictly for
                    high-ticket conversion. Custom motion, studio-grade aesthetics, and
                    zero-friction UI that commands authority the second the page loads.
                  </p>
                </div>
                <div className="live" style={{ marginTop: 26 }}>
                  <span className="dot" /> Studio-grade architecture active
                </div>
              </Spotlight>
            </Reveal>
            {arsenalTiers.map((tg, ti) => (
              <React.Fragment key={tg.tierIndex}>
                <Reveal
                  delay={(ti + 1) * 60}
                  style={{ gridColumn: "span 6", display: "flex" }}
                >
                  <div
                    style={{
                      width: "100%",
                      padding: "18px 34px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      background: "var(--bg1)",
                    }}
                  >
                    <span
                      className="mono"
                      style={{ fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--acc1)" }}
                    >
                      {tg.tierLabel} ({tg.tierIndex}) — {tg.tierName}
                    </span>
                  </div>
                </Reveal>
                {tg.items.map((s, i) => (
                  <Reveal
                    key={s.title}
                    delay={(ti + 1) * 60 + (i + 1) * 40}
                    style={{ gridColumn: "span 2", display: "flex" }}
                  >
                    <Spotlight className="cell" style={{ width: "100%" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <span style={{ color: "var(--acc1)" }}>{s.icon}</span>
                      </div>
                      <h3 className="h3" style={{ marginTop: 24, color: "var(--txt)", fontSize: "1.2rem" }}>
                        {s.title}
                      </h3>
                      <p className="body" style={{ marginTop: 10, fontSize: "0.9rem" }}>
                        {s.desc}
                      </p>
                    </Spotlight>
                  </Reveal>
                ))}
              </React.Fragment>
            ))}
            <Reveal delay={600} style={{ gridColumn: "span 6", display: "flex" }}>
              <Spotlight className="cell" style={{ width: "100%", justifyContent: "space-between" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span className="eyebrow" style={{ margin: 0 }}>
                    The Stack
                  </span>
                </div>
                <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["HighLevel", "Vercel", "React", "AI Webhooks", "Twilio", "Stripe"].map((c) => (
                    <span key={c} className="chip" data-hover>
                      {c}
                    </span>
                  ))}
                </div>
              </Spotlight>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
              <LinkButton href="/services" variant="primary">
                View the full pricing catalog <Arrow />
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Method */}
      <section style={{ background: "var(--bg1)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ paddingTop: 120, paddingBottom: 120 }}>
          <div className="proc">
            <div className="sticky">
              <Reveal>
                <div className="eyebrow">The Method</div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="h2" style={{ marginTop: 24 }}>
                  Four phases. One outcome.
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className="body" style={{ marginTop: 22, maxWidth: 360 }}>
                  A fixed, transparent process from first contact to a system that runs without
                  you.
                </p>
              </Reveal>
            </div>
            <div>
              {method.map((m, i) => (
                <Reveal key={m.n} delay={i * 80}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: 28,
                      padding: "34px 0",
                      borderTop: "1px solid var(--line)",
                    }}
                  >
                    <span className="mono" style={{ fontSize: "0.9rem", color: "var(--acc1)" }}>
                      {m.n}
                    </span>
                    <div>
                      <h3 className="h3" style={{ color: "var(--txt)" }}>
                        {m.t}
                      </h3>
                      <p className="body" style={{ marginTop: 12, maxWidth: 560 }}>
                        {m.d}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROI calculator */}
      <section id="roi" style={{ background: "var(--bg)" }}>
        <div className="wrap" style={{ paddingTop: 120, paddingBottom: 120 }}>
          <Reveal>
            <div className="eyebrow">The Math</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="h2" style={{ marginTop: 26, marginBottom: 50, maxWidth: 780 }}>
              Calculate what the leak is costing you.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <RoiCalculator />
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "var(--bg1)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ paddingTop: 120, paddingBottom: 120 }}>
          <Reveal>
            <div className="eyebrow">The Decision</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="h2" style={{ marginTop: 26, maxWidth: 820 }}>
              Stop leaking revenue. Start compounding it.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="lede" style={{ marginTop: 24, maxWidth: 640 }}>
              We map your inbound flow, quantify the leak in dollars, and return a build
              specification. This is a diagnostic evaluation, not a sales call.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ marginTop: 40, display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
              <LinkButton href="/audit" variant="primary">
                Initiate Infrastructure Audit <Arrow />
              </LinkButton>
              <LinkButton href="/performance" variant="ghost">
                Review documented performance
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
