export interface AppDef {
  name: string;
  slug: string;
  oneLiner: string;
  features: string[];
  icon: string;
  theme: 'orange' | 'blue' | 'green' | 'purple';
  ctaType: 'demo' | 'visit' | 'download';
  links: {
    web?: string;
    appStore?: string;
    playStore?: string;
    chromeStore?: string;
  };
  description: string;
  featured?: boolean;
}

export const APPS: AppDef[] = [
  {
    name: 'Tax Flow',
    slug: 'tax-flow',
    oneLiner: 'Tax sorted by AI, not by you.',
    features: ['Snap & forget receipts', 'GST tracked for you', 'ATO-ready BAS'],
    icon: 'Calculator',
    theme: 'orange',
    ctaType: 'visit',
    links: {
      web: 'https://taxflow.crewcircle.com.au',
    },
    description:
      'Our flagship AI agent. Snap a receipt or forward an invoice and it works out the GST, keeps track of what you owe, and hands your accountant a BAS that is already ATO-ready. No shoebox of dockets, no panic the night before lodgement.',
    featured: true,
  },
  {
    name: 'Local Meet',
    slug: 'local-meet',
    oneLiner: 'Meet the right locals, no awkward networking.',
    features: ['Smart local matching', 'People near you', 'Real faces, real crew'],
    icon: 'Users',
    theme: 'blue',
    ctaType: 'visit',
    links: {
      web: 'https://localmate.crewcircle.com.au',
    },
    description:
      'Our second AI-built app. It quietly learns who is worth knowing — the supplier who always delivers, the tradie round the corner, the cafe owner who sends you customers — and introduces you to the right locals so your network actually shows up in real life, not just in your feed.',
    featured: true,
  },
  {
    name: 'Smart GL',
    slug: 'smart-gl',
    oneLiner: 'AI does the books for your crew.',
    features: ['AI categorisation', 'GST/BAS reports', 'Ledger tracking'],
    icon: 'BookOpen',
    theme: 'blue',
    ctaType: 'visit',
    links: {
      web: '#', // placeholder — no production URL yet
    },
    description:
      'A full bookkeeping app with AI baked in. It categorises wages, supplier bills, and expenses automatically, then generates GST/BAS reports ready for your accountant. No cloud dependence, your data stays private.',
  },
  {
    name: 'Crew Roster',
    slug: 'crew-roster',
    oneLiner: 'Digital timesheet for your crew, sorted.',
    features: ['Roster scheduling', 'GPS clock-in/out', 'Award compliance'],
    icon: 'Timer',
    theme: 'orange',
    ctaType: 'visit',
    links: {
      web: 'https://roster.crewcircle.com',
    },
    description:
      'A full rostering app that automates the week. GPS-tracked shifts, award compliance rules baked in, and automated payroll export. Your crew signs in from the job site, you get the hours sorted automatically.',
  },
  {
    name: 'Card Snap',
    slug: 'card-snap',
    oneLiner: 'Snap cards for your crew.',
    features: ['ML Kit OCR', 'Contact save', 'Card history'],
    icon: 'Camera',
    theme: 'green',
    ctaType: 'download',
    links: {
      web: '/cardsnap',
      appStore: '#ios',
      playStore: '#android',
    },
    description:
      'A free little helper. Snap a photo of any business card and the details land straight in your contacts. On-device OCR means nothing leaves your phone. Export to CSV, search history, never lose a contact again.',
  },
  {
    name: 'Aura',
    slug: 'aura',
    oneLiner: 'The free sidekick for your day-to-day.',
    features: ['ABN lookup', 'BAS reminders', 'ATO rates at a glance'],
    icon: 'Wrench',
    theme: 'purple',
    ctaType: 'download',
    links: {
      chromeStore: '#chrome',
    },
    description:
      'A free Chrome helper that keeps the everyday admin sorted — validate an ABN in a click, never miss a BAS deadline, and pull ATO rates without leaving your browser. No account, no cost, just the small stuff done.',
  },
];
