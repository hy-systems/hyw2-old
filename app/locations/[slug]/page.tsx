import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Orbs } from "../../../components/fx";
import {
  Reveal,
  LinkButton,
  Arrow,
  IShield,
  IClock,
  IDot,
  ICheck,
} from "../../../components/primitives";
import { getLocation, getAllLocationSlugs } from "../../../lib/locations";

const SITE = "https://hysystems.com.au";

// Pre-render every known suburb at build time.
export function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const loc = getLocation(params.slug);
  if (!loc) {
    return { title: "Location not found", robots: { index: false, follow: false } };
  }
  const title = `${loc.targetKeyword}`;
  const description = loc.localizedDescription.slice(0, 158);
  const url = `${SITE}/locations/${loc.slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/locations/${loc.slug}` },
    openGraph: {
      type: "website",
      locale: "en_AU",
      url,
      siteName: "HY Systems",
      title: `${title} / HY Systems`,
      description,
      images: [{ url: "/og-cover.png", width: 1200, height: 630, alt: title }],
    },
  };
}

const capabilities = [
  "A conversion-built website that commands premium pricing",
  "Missed-call text-back that answers every lead in seconds",
  "Automated booking, follow-up, and review generation",
];

export default function LocationPage({ params }: { params: { slug: string } }) {
  const loc = getLocation(params.slug);
  if (!loc) notFound();

  const url = `${SITE}/locations/${loc.slug}`;

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `HY Systems / ${loc.suburbName}`,
    url,
    image: `${SITE}/og-cover.png`,
    email: "info@hysystems.com.au",
    telephone: "+61450935568",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Boronia",
      addressRegion: "VIC",
      postalCode: "3155",
      addressCountry: "AU",
    },
    areaServed: {
      "@type": "Place",
      name: `${loc.suburbName}, ${loc.region} ${loc.postcode}`,
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: loc.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessLd, faqLd]) }}
      />

      <section className="page-head">
        <Orbs />
        <div className="wrap" style={{ position: "relative", zIndex: 3 }}>
          <Reveal>
            <div className="eyebrow">{loc.suburbName} / VIC</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h2" style={{ marginTop: 24, maxWidth: 900 }}>
              {loc.targetKeyword}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="lede" style={{ marginTop: 24, maxWidth: 720 }}>
              {loc.localizedDescription}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="trust" style={{ marginTop: 36 }}>
              <span className="trust__item">
                <IShield width={15} height={15} /> Based in Boronia VIC
              </span>
              <span className="trust__item">
                <IDot width={10} height={10} /> Serving {loc.suburbName} {loc.postcode}
              </span>
              <span className="trust__item">
                <IClock width={15} height={15} /> Audit returned within 1 business day
              </span>
            </div>
          </Reveal>
          <Reveal delay={260}>
            <div style={{ marginTop: 38 }}>
              <LinkButton href="/audit" variant="primary">
                Book Revenue Leak Audit <Arrow />
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ background: "var(--bg)" }}>
        <div className="wrap" style={{ paddingTop: 90, paddingBottom: 60 }}>
          <Reveal>
            <h2 className="h3" style={{ color: "var(--txt)", marginBottom: 24 }}>
              What we deploy for {loc.suburbName} operators
            </h2>
          </Reveal>
          <div>
            {capabilities.map((c, i) => (
              <Reveal key={c} delay={i * 70}>
                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    padding: "16px 0",
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  <span style={{ color: "var(--acc1)", marginTop: 2 }}>
                    <ICheck width={20} height={20} />
                  </span>
                  <span className="body" style={{ fontSize: "1rem", color: "var(--txt1)" }}>
                    {c}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg1)", borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ paddingTop: 90, paddingBottom: 90 }}>
          <Reveal>
            <div className="eyebrow">Questions</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="h2" style={{ marginTop: 22, marginBottom: 32, maxWidth: 720 }}>
              {loc.suburbName}, answered.
            </h2>
          </Reveal>
          <div style={{ maxWidth: 760 }}>
            {loc.faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <div style={{ borderTop: "1px solid var(--line)", padding: "24px 0" }}>
                  <h3 className="h3" style={{ color: "var(--txt)", fontSize: "1.15rem" }}>
                    {f.q}
                  </h3>
                  <p className="body" style={{ marginTop: 12 }}>
                    {f.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div style={{ marginTop: 44 }}>
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
