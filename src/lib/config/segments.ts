export interface Segment {
  slug: string;
  name: string;
  /** lucide-react icon name — imported explicitly in the Solutions page */
  icon: 'Wrench' | 'Coffee' | 'Stethoscope' | 'ShoppingBag';
  tagline: string;
  pain: string;
  outcome: string;
  /** slugs from src/lib/config/apps.ts */
  appSlugs: string[];
}

export const SEGMENTS: Segment[] = [
  {
    slug: 'tradies',
    name: 'Tradies',
    icon: 'Wrench',
    tagline: 'Less paperwork, more on the tools.',
    pain: 'You’re flat out on site. Receipts pile up, BAS creeps up, and rostering the crew is a whiteboard nightmare.',
    outcome:
      'Snap receipts as they land, let AI sort the GST, and roster the crew from the job site. BAS becomes a non-event.',
    appSlugs: ['tax-flow', 'crew-roster', 'aura'],
  },
  {
    slug: 'cafes',
    name: 'Cafés & Restaurants',
    icon: 'Coffee',
    tagline: 'Run the floor, not the spreadsheets.',
    pain: 'Rosters, wages, and supplier bills eat your mornings. BAS is a mystery you pay someone else to worry about.',
    outcome:
      'Automate the roster with award rates built in, track GST as you go, and keep the day-to-day admin free with Aura.',
    appSlugs: ['crew-roster', 'tax-flow', 'aura'],
  },
  {
    slug: 'clinics',
    name: 'Allied Health',
    icon: 'Stethoscope',
    tagline: 'Patient care first, admin last.',
    pain: 'Solo or small practice, you’re the receptionist, bookkeeper and clinician. Compliance and BAS compete with care.',
    outcome:
      'Keep GST and BAS sorted automatically, validate ABNs instantly, and spend the saved hours on patients.',
    appSlugs: ['tax-flow', 'aura', 'smart-gl'],
  },
  {
    slug: 'retail',
    name: 'Retail & Shops',
    icon: 'ShoppingBag',
    tagline: 'Sell more, admin less.',
    pain: 'Stock, staff, and supplier invoices. The back office grows faster than the floor.',
    outcome:
      'Roster staff to demand, categorise expenses automatically, and never miss a BAS deadline again.',
    appSlugs: ['crew-roster', 'smart-gl', 'aura'],
  },
];
