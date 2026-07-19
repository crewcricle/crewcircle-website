export interface PricingTier {
  name: string;
  price: number;
  period: "month" | "forever";
  blurb: string;
  features: string[];
  highlight?: boolean;
  cta: { label: string; href: string };
}

// Prices are placeholders — adjust before any paid launch.
export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    blurb: "The everyday helpers, on the house.",
    features: [
      "CardSnap — snap business cards straight to contacts",
      "AuRate — ABN lookup, BAS reminders, ATO rates at a glance",
      "No account needed",
    ],
    cta: { label: "Grab the free tools", href: "/#apps" },
  },
  {
    name: "Solo",
    price: 9,
    period: "month",
    blurb: "One AI tool for one headache.",
    features: [
      "Pick any single app — TaxFlowAI, LocalMate, SmartGL or CrewRoster",
      "Every AI feature included",
      "Email support",
    ],
    cta: { label: "Start Solo", href: "/#apps" },
  },
  {
    name: "Crew Bundle",
    price: 29,
    period: "month",
    blurb: "Every tool — the full AI back-office.",
    features: [
      "All tools in one login",
      "TaxFlowAI + LocalMate AI flagships",
      "SmartGL + CrewRoster full apps",
      "Priority support",
    ],
    highlight: true,
    cta: { label: "Get the Bundle", href: "/#contact" },
  },
];
