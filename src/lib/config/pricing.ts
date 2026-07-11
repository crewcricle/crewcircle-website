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
      "Card Snap — snap business cards straight to contacts",
      "Aura — ABN lookup, BAS reminders, ATO rates at a glance",
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
      "Pick any single app — Tax Flow, Local Meet, Smart GL or Crew Roster",
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
      "All six apps in one login",
      "Tax Flow + Local Meet AI flagships",
      "Smart GL + Crew Roster full apps",
      "Priority support",
    ],
    highlight: true,
    cta: { label: "Get the Bundle", href: "/#contact" },
  },
];
