export interface PricingTier {
  name: string;
  price: number;
  period: "month" | "year" | "forever";
  blurb: string;
  features: string[];
  highlight?: boolean;
  cta: { label: string; href: string };
}

export interface PricingSection {
  appName: string;
  appSlug: string;
  description: string;
  note?: string;
  tiers: PricingTier[];
}

export const PRICING_SECTIONS: PricingSection[] = [
  {
    appName: "LocalMate",
    appSlug: "localmate",
    description:
      "Local business automation for Australian trades, cafés, clinics, and shops. Pick a plan that runs the jobs you actually need.",
    note: "14-day free trial. No credit card required. Cancel anytime. Prices are in AUD and include GST.",
    tiers: [
      {
        name: "Starter",
        price: 49,
        period: "month",
        blurb: "Track the keywords that bring customers to your suburb.",
        features: [
          "Rank Report — weekly local SEO email",
          "5 suburb keywords tracked",
          "Email support",
        ],
        cta: {
          label: "Start free trial",
          href: "https://localmate.crewcircle.com.au",
        },
      },
      {
        name: "Growth",
        price: 79,
        period: "month",
        blurb: "Reply to reviews and watch competitors while you work.",
        features: [
          "Review Guard — AI-drafted Google/Yelp replies",
          "Rank Report — weekly local SEO email",
          "Competitor Watch — Monday morning brief",
          "Email support",
        ],
        highlight: true,
        cta: {
          label: "Start free trial",
          href: "https://localmate.crewcircle.com.au",
        },
      },
      {
        name: "Complete",
        price: 100,
        period: "month",
        blurb: "The full set-and-forget local marketing assistant.",
        features: [
          "Everything in Growth",
          "Rebook — lapsed patient SMS follow-up",
          "Menu Sync — Google Sheets to GBP + Square",
          "Priority support",
        ],
        cta: {
          label: "Start free trial",
          href: "https://localmate.crewcircle.com.au",
        },
      },
    ],
  },
  {
    appName: "TaxFlowAI",
    appSlug: "taxflowai",
    description:
      "ATO tax research and advisory AI built for Australian accounting firms. Billed yearly.",
    note: "Prices are in AUD and exclude GST. Both plans include the ATO correspondence module.",
    tiers: [
      {
        name: "Starter",
        price: 2400,
        period: "year",
        blurb: "For smaller firms starting to automate tax research.",
        features: [
          "300 research queries / month",
          "50 documents / month",
          "ATO correspondence module",
          "Email support",
        ],
        cta: {
          label: "Request access",
          href: "https://taxflow.crewcircle.com.au",
        },
      },
      {
        name: "Professional",
        price: 6000,
        period: "year",
        blurb: "For firms that want unlimited research plus a private knowledge base.",
        features: [
          "Unlimited research queries",
          "Unlimited documents",
          "ATO correspondence module",
          "Firm knowledge base",
          "Regulatory alerts",
          "Priority support",
        ],
        highlight: true,
        cta: {
          label: "Request access",
          href: "https://taxflow.crewcircle.com.au",
        },
      },
    ],
  },
];

export const FREE_TOOLS_BLURB =
  "CardSnap and AuRate are free helpers. They are launching soon on the App Store, Google Play, and Chrome Web Store.";
