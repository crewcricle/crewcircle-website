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
  beta?: boolean;
}

export const APPS: AppDef[] = [
  {
    name: 'TaxFlowAI',
    slug: 'taxflowai',
    oneLiner: 'ATO tax research, done.',
    features: ['Cited ATO answers', 'ATO letter response drafting', 'Firm knowledge base', 'Document generation'],
    icon: 'Calculator',
    theme: 'orange',
    ctaType: 'visit',
    links: {
      web: 'https://taxflow.crewcircle.com.au',
    },
    description:
      'AI research assistant built for Australian tax professionals and accounting firms. Ask ATO questions in plain English and get cited answers drawn from public rulings, tax determinations, and legislation. Upload an ATO letter and get a drafted response, generate firm-branded documents, and build a private knowledge base from your own precedents. Every answer shows its sources.',
    featured: true,
  },
  {
    name: 'LocalMate',
    slug: 'localmate',
    oneLiner: 'Local business automation for Aussie SMBs.',
    features: ['AI review replies', 'Local SEO tracking', 'Competitor monitoring', 'Rebooking follow-ups'],
    icon: 'Users',
    theme: 'blue',
    ctaType: 'visit',
    links: {
      web: 'https://localmate.crewcircle.com.au',
    },
    description:
      'Local business automation for Australian SMBs. One dashboard runs five AI jobs: Review Guard drafts replies to Google and Yelp reviews; Rank Report tracks your local SEO weekly; Competitor Watch keeps an eye on nearby rivals; Rebook follows up lapsed customers by SMS and email; Menu Sync pushes updates from Google Sheets to Google Business Profile and Square. Built to save hours every week.',
    featured: true,
  },
  {
    name: 'SmartGL',
    slug: 'smartgl',
    oneLiner: 'AI bookkeeping with Australian GST in mind.',
    features: ['Bank feed sync', 'AI categorisation', 'Double-entry ledger', 'GST/BAS ready'],
    icon: 'BookOpen',
    theme: 'blue',
    ctaType: 'visit',
    links: {
      web: '#', // placeholder — no production URL yet
    },
    description:
      'AI bookkeeping engine that connects to Australian bank feeds, categorises transactions automatically, and maintains a double-entry ledger. Built around the Formance ledger with Australian GST and BAS reporting in mind. Currently in beta — ideal for early accounting firms and bookkeepers who want to test the workflow.',
    featured: false,
    beta: true,
  },
  {
    name: 'CrewRoster',
    slug: 'crewroster',
    oneLiner: 'Rostering and timesheets for your crew.',
    features: ['Shift scheduling', 'GPS clock-in/out', 'Payroll export', 'Award compliance'],
    icon: 'Timer',
    theme: 'orange',
    ctaType: 'visit',
    links: {
      web: 'https://roster.crewcircle.com',
    },
    description:
      'Digital rostering and timesheets for shift-based crews. Schedule shifts, record GPS clock-in and clock-out, and export hours for payroll. Award compliance helpers are being added. Currently in beta and open for early crews.',
    featured: false,
    beta: true,
  },
  {
    name: 'CardSnap',
    slug: 'cardsnap',
    oneLiner: 'Snap cards, save contacts.',
    features: ['On-device OCR', 'Contact save', 'CSV export', 'Search history'],
    icon: 'Camera',
    theme: 'green',
    ctaType: 'download',
    links: {
      web: '/cardsnap',
      appStore: '#ios',
      playStore: '#android',
    },
    description:
      'Free business-card scanner. Snap a card with your phone and the contact details land straight in your address book. On-device OCR means nothing leaves your phone. Export to CSV, search your history, and never lose a lead again.',
    featured: false,
    beta: true,
  },
  {
    name: 'AuRate',
    slug: 'aurate',
    oneLiner: 'ATO admin in one click.',
    features: ['ABN lookup', 'ATO rates', 'BAS reminders', 'Chrome extension'],
    icon: 'Wrench',
    theme: 'purple',
    ctaType: 'download',
    links: {
      chromeStore: '#chrome',
    },
    description:
      'Free Chrome sidekick for Australian sole traders and small businesses. Validate an ABN in one click, check ATO rates and thresholds, and get BAS deadline reminders without leaving your browser. No account required.',
    featured: false,
    beta: true,
  },
];
