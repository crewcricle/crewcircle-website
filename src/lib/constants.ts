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
}

export const APPS: AppDef[] = [
  {
    name: 'Crew Roster',
    slug: 'crew-roster',
    oneLiner: 'Digital timesheet for your crew, sorted.',
    features: ['Roster scheduling', 'GPS clock-in/out', 'Award compliance'],
    icon: '⏱',
    theme: 'orange',
    ctaType: 'visit',
    links: {
      web: 'https://roster.crewcircle.co',
    },
    description: 'Replace paper timesheets with digital clock-ins. GPS-tracked shifts, award compliance rules baked in, and automated payroll export. Your crew signs in from the job site, you get the hours sorted automatically at the end of the week.',
  },
  {
    name: 'Smart GL',
    slug: 'smart-gl',
    oneLiner: 'AI does the books for your crew.',
    features: ['AI categorisation', 'GST/BAS reports', 'Ledger tracking'],
    icon: '📒',
    theme: 'blue',
    ctaType: 'visit',
    links: {
      web: 'https://smart-hf50tubpw-sensibleanalytic-4114s-projects.vercel.app',
    },
    description: 'AI-powered bookkeeping that categorises wages, supplier bills, and expenses automatically. Generates GST/BAS reports ready for your accountant. No cloud dependence, your data stays private.',
  },
  {
    name: 'Card Snap',
    slug: 'card-snap',
    oneLiner: 'Snap cards for your crew.',
    features: ['ML Kit OCR', 'Contact save', 'Card history'],
    icon: '📷',
    theme: 'green',
    ctaType: 'download',
    links: {
      web: '/cardsnap',
      appStore: '#ios',
      playStore: '#android',
    },
    description: 'Snap a photo of any business card and watch the details land straight in your contacts. Uses on-device ML Kit OCR so nothing leaves your phone. Export to CSV, search history, never lose a contact again.',
  },
  {
    name: 'XeroAssist',
    slug: 'xero-assist',
    oneLiner: 'Xero spanner for your crew.',
    features: ['ABN validation', 'BAS tracker', 'ATO rates'],
    icon: '🔧',
    theme: 'purple',
    ctaType: 'download',
    links: {
      chromeStore: '#chrome',
    },
    description: 'Chrome extension that gives Xero superpowers. Validate ABNs instantly, track BAS deadlines, pull ATO rates without leaving your browser. Built for bookkeepers who live in Xero every day.',
  },
];

export const FOUNDER = {
  name: 'Prabhat Ranjan',
  title: 'Founding Engineer',
  location: 'Sydney, Australia',
  education: 'IIT-BHU (Indian Institute of Technology)',
  shortBio:
    "Building practical AI tools that work offline and keep your data private. Previously built data infrastructure at Canva, JPMorgan, MSCI, and BNP Paribas here in Sydney. Now I'm building software that helps Aussie small businesses run smoother. No enterprise bullshit, no sales pitch, just stuff that works.",
  currentFocus:
    'Building SensibleDB, an embedded graph-vector database that lets you build AI without sending your data to the cloud.',
  experience: [
    { company: 'Canva', role: 'Engineering Lead' },
    { company: 'JPMorgan', role: 'Engineering Lead' },
    { company: 'MSCI', role: 'Software Engineer' },
    { company: 'BNP Paribas', role: 'Software Engineer' },
  ],
  specialties: [
    'Knowledge Graphs & Vector Search',
    'Local-First AI Architecture',
    'Rust Systems Programming',
    'RAG Pipeline Design',
    'Data Platform Engineering',
    'Privacy-Preserving Systems',
    'Domain Analytics',
    'Agent Memory Systems',
  ],
  certifications: [
    { issuer: 'Anthropic', credential: 'Agent Skills for Enterprise' },
    { issuer: 'Anthropic', credential: 'MCP Advanced' },
    { issuer: 'Hugging Face', credential: 'AI Agents Fundamentals' },
  ],
  anthropicPartnership: {
    badge: 'Anthropic Partner (In Progress)',
    note: 'Certified in Agent Skills & MCP Advanced',
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/prabhatr/',
    github: 'https://github.com/rprabhat',
    website: 'https://sensibleanalytics.co',
    substack: 'https://prabhatranjan.substack.com',
  },
  calendly: 'https://calendly.com/prabhat-ranjan/30min',
};

export const IMPACT_STORIES = [
  {
    title: 'Healthcare Platform',
    description:
      'Built AI-powered clinical decision support platform that transformed healthcare delivery operations.',
    metrics: [
      { value: '83%', label: 'Subscription revenue growth' },
      { value: '3×', label: 'Client capacity increase' },
      { value: '76%', label: 'Infrastructure cost reduction' },
    ],
  },
  {
    title: 'Financial Services',
    description:
      'Delivered enterprise-grade analytics platform serving global investment firms with zero-downtime operations.',
    metrics: [
      { value: '400+', label: 'Funds managed' },
      { value: '7', label: 'New ESG clients onboarded' },
      { value: '0', label: 'Downtime incidents' },
    ],
  },
  {
    title: 'Tradie Crew Roster',
    description:
      'Replaced paper timesheets with GPS-tracked digital clock-ins for a 30-person construction crew. No more lost hours, no more payroll guesswork.',
    metrics: [
      { value: '12', label: 'Hours saved per week' },
      { value: '100%', label: 'Payroll accuracy' },
      { value: '4.8★', label: 'Crew satisfaction' },
    ],
  },
  {
    title: 'Local Cafe Chain',
    description:
      'Built a custom AI-powered inventory tracker for a 5-store cafe group. Cut food waste by flagging expiry patterns and automating supplier orders.',
    metrics: [
      { value: '22%', label: 'Food waste reduction' },
      { value: '3', label: 'Hours saved daily' },
      { value: '$18K', label: 'Annual savings' },
    ],
  },
];

export const SERVICES = [
  {
    title: 'AI Strategy & Consulting',
    description:
      'We help you figure out where AI actually moves the needle for your business. No hype, just practical roadmaps.',
    icon: 'Lightbulb',
    features: ['Workflow audit', 'AI opportunity mapping', 'ROI modelling'],
  },
  {
    title: 'Custom AI Tools',
    description:
      'From smart forms to AI-powered dashboards, we build tools that automate the boring stuff so your crew can focus.',
    icon: 'Wrench',
    features: ['Tailored software', 'Existing system integration', 'Training included'],
  },
  {
    title: 'Data & Analytics',
    description:
      'Turn your business data into decisions. We set up dashboards, reporting, and alerts that actually make sense.',
    icon: 'BarChart3',
    features: ['KPI dashboards', 'Automated reporting', 'Real-time alerts'],
  },
  {
    title: 'Ongoing Support',
    description:
      'Tech changes fast. We keep your tools running, your crew trained, and your business ahead of the curve.',
    icon: 'HeadphonesIcon',
    features: ['Priority support', 'Regular updates', 'Crew training sessions'],
  },
];

export const NAV_ITEMS = [
  { label: 'About', href: '/#about', hasDropdown: false },
  { label: 'Services', href: '/#services', hasDropdown: false },
  { label: 'Our Apps', href: '/#apps', hasDropdown: false },
  { label: 'Blog', href: '/blog', hasDropdown: false },
  { label: 'Contact', href: '/#contact', hasDropdown: false },
];

export const FOOTER_LINKS = {
  services: [
    { label: 'AI Strategy', href: '/#services' },
    { label: 'Custom Tools', href: '/#services' },
    { label: 'Data & Analytics', href: '/#services' },
    { label: 'Support', href: '/#services' },
  ],
  apps: [
    { label: 'Crew Roster', href: 'https://roster.crewcircle.co' },
    { label: 'Smart GL', href: 'https://smart-hf50tubpw-sensibleanalytic-4114s-projects.vercel.app' },
    { label: 'Card Snap', href: '/cardsnap' },
    { label: 'XeroAssist', href: 'https://xero-assist.crewcircle.co' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/cardsnap/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Documentation', href: '/docs' },
  ],
};

export const HERO_CONTENT = {
  headline: 'Software that actually sorts your small biz.',
  subheadline:
    "We build practical tools that sort out the boring stuff. Rostering, bookkeeping, compliance. So you can get back to running your business. No jargon, no enterprise nonsense, just real software that works.",
  cta: "Let's talk",
  secondaryCta: 'See what I build',
};

export const TRUST_METRICS = [
  { value: '15+', label: 'Years building software' },
  { value: '4', label: 'Enterprise clients' },
  { value: 'IIT-BHU', label: 'Engineering alumnus' },
  { value: 'Sydney', label: 'Based & building' },
];

export const AUSSIE_TERMS = {
  tagline: 'Sorted.',
  subtitle: 'AI for your crew.',
  cta: 'Ready?',
  exploreBtn: 'Our services',
  viewAllBtn: 'All tools',
  getStartedBtn: "Let's talk",
};
