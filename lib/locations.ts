// Structured data for programmatic, hyper-localized SEO routes.
// Each entry must carry genuinely localized copy: thin, duplicated suburb pages
// are treated as doorway spam by search engines. Expand the array to scale.

export interface LocationFaq {
  q: string;
  a: string;
}

export interface LocationData {
  slug: string;
  suburbName: string;
  region: string;
  postcode: string;
  targetKeyword: string;
  localizedDescription: string;
  faqs: LocationFaq[];
}

export const LOCATIONS: LocationData[] = [
  {
    slug: "boronia",
    suburbName: "Boronia",
    region: "VIC",
    postcode: "3155",
    targetKeyword: "Web Design and Automation in Boronia",
    localizedDescription:
      "HY Systems is based in Boronia and builds autonomous web and AI infrastructure for trade and service businesses across the Knox corridor. We engineer the site that wins the click and the system that captures, qualifies, and books the lead, so calls missed on the tools no longer become revenue lost to a competitor.",
    faqs: [
      {
        q: "Do you work with trade businesses in Boronia?",
        a: "Yes. Our core clients are plumbers, electricians, and HVAC operators across Boronia and the surrounding Knox suburbs who lose jobs to missed calls and slow follow-up.",
      },
      {
        q: "What does a build include?",
        a: "A conversion-focused website plus the automation layer: missed-call text-back, CRM pipeline, automated follow-up, and review generation. The exact tier depends on your bottleneck.",
      },
      {
        q: "How fast can a system go live?",
        a: "Most builds move from brief to live system in under seven days, subject to the assets and access provided during the audit.",
      },
    ],
  },
  {
    slug: "ferntree-gully",
    suburbName: "Ferntree Gully",
    region: "VIC",
    postcode: "3156",
    targetKeyword: "Web Design and Automation in Ferntree Gully",
    localizedDescription:
      "Ferntree Gully service businesses compete on response speed, not just price. HY Systems deploys the infrastructure that answers every inbound lead in seconds: instant text-back on missed calls, automated booking, and follow-up that runs until the job is won, with no manual administration on your end.",
    faqs: [
      {
        q: "Can you replace our current scheduling process?",
        a: "Yes. We automate scheduling with deposit capture and two-way calendar sync, removing the back-and-forth that consumes billable hours.",
      },
      {
        q: "We already have a website. Is that a problem?",
        a: "No. We either rebuild it for conversion or wire automation infrastructure behind it. The audit determines which is the higher-leverage move.",
      },
      {
        q: "Do you lock us into long contracts?",
        a: "Engagement terms are set out in a written scope of work after your audit. There is no retainer required to receive the diagnostic.",
      },
    ],
  },
  {
    slug: "wantirna",
    suburbName: "Wantirna",
    region: "VIC",
    postcode: "3152",
    targetKeyword: "Web Design and Automation in Wantirna",
    localizedDescription:
      "For Wantirna operators, every unanswered enquiry is a job handed to the next business that picks up. HY Systems builds the autonomous capture and follow-up layer that keeps that from happening, paired with a premium web presence engineered to command higher pricing rather than compete on the bottom of the market.",
    faqs: [
      {
        q: "What kind of results should we expect?",
        a: "We do not publish guaranteed figures. The audit quantifies your specific revenue leak in dollars and models what the system is engineered to recover.",
      },
      {
        q: "Is the automation hard to manage?",
        a: "No. The system is designed to run without manual maintenance. You receive qualified, booked leads rather than a tool to operate.",
      },
      {
        q: "Do you service the wider Knox area?",
        a: "Yes. We operate out of Boronia and work with businesses across Wantirna and greater Melbourne.",
      },
    ],
  },
  {
    slug: "ringwood",
    suburbName: "Ringwood",
    region: "VIC",
    postcode: "3134",
    targetKeyword: "Web Design and Automation in Ringwood",
    localizedDescription:
      "Ringwood is a competitive market for trade and service businesses. HY Systems gives you the structural advantage: a fast, authoritative website and an AI-driven infrastructure that captures demand around the clock, qualifies it, and routes it to a booking without a person ever touching the first response.",
    faqs: [
      {
        q: "How is this different from a marketing agency?",
        a: "We do not sell ad spend or social posts. We build the infrastructure that converts the demand you already generate into booked, paying jobs.",
      },
      {
        q: "What systems do you build on?",
        a: "Primarily HighLevel and Vercel, wired together with event-driven automation. The stack is chosen to fit your operation, not the other way around.",
      },
      {
        q: "Where do we start?",
        a: "With a revenue leak audit. We map your inbound flow, quantify the loss, and return a written build specification.",
      },
    ],
  },
  {
    slug: "bayswater",
    suburbName: "Bayswater",
    region: "VIC",
    postcode: "3153",
    targetKeyword: "Web Design and Automation in Bayswater",
    localizedDescription:
      "Bayswater service businesses run lean, which makes wasted leads expensive. HY Systems removes the leak at the source with automated capture, instant response, and follow-up that never forgets, freeing your team from the phone and the admin while protecting the revenue you are already earning.",
    faqs: [
      {
        q: "We miss calls when we are on site. Can you fix that?",
        a: "Yes. Missed-call text-back opens the conversation by SMS the instant a call goes unanswered, before the lead dials a competitor.",
      },
      {
        q: "Do you handle the technical setup?",
        a: "Entirely. We build, deploy, and test the full system. You provide access and assets during onboarding.",
      },
      {
        q: "Is there a minimum business size?",
        a: "Our infrastructure suits established operators with revenue to protect. Pre-revenue businesses are not a fit.",
      },
    ],
  },
];

export function getLocation(slug: string): LocationData | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return LOCATIONS.map((l) => l.slug);
}
