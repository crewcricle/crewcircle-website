export type LocationSlug = 'sydney' | 'melbourne' | 'brisbane' | 'perth' | 'adelaide';

export interface LocationProfile {
  slug: LocationSlug;
  city: string;
  state: string;
  tagline: string;
  intro: string;
  prioritySegments: string[];
}

export const LOCATIONS: LocationProfile[] = [
  {
    slug: 'sydney',
    city: 'Sydney',
    state: 'NSW',
    tagline: 'AI that sorts the boring stuff for Sydney small business',
    intro:
      'From the Eastern Suburbs to Western Sydney, tradies, cafés, clinics and shops are using CrewCircle to sort rostering, tax and compliance — without the enterprise price tag.',
    prioritySegments: ['tradies', 'cafes', 'clinics', 'retail'],
  },
  {
    slug: 'melbourne',
    city: 'Melbourne',
    state: 'VIC',
    tagline: 'Practical AI tools for Melbourne small business',
    intro:
      "Melbourne's cafés, tradies and independent retailers run on tight margins. CrewCircle automates the back-office so you can stay on the tools instead of the spreadsheet.",
    prioritySegments: ['cafes', 'tradies', 'retail', 'clinics'],
  },
  {
    slug: 'brisbane',
    city: 'Brisbane',
    state: 'QLD',
    tagline: 'AI back-office for Brisbane small business',
    intro:
      'Brisbane tradies and allied-health practices are sorting rosters, invoices and BAS in minutes with CrewCircle — built for the way Queensland businesses actually work.',
    prioritySegments: ['tradies', 'clinics', 'cafes', 'retail'],
  },
  {
    slug: 'perth',
    city: 'Perth',
    state: 'WA',
    tagline: 'Smart tools for Perth small business',
    intro:
      'Perth operators — from mines-adjacent tradies to suburban cafés and clinics — use CrewCircle to keep the paperwork sorted and stay focused on the work that pays.',
    prioritySegments: ['tradies', 'retail', 'cafes', 'clinics'],
  },
  {
    slug: 'adelaide',
    city: 'Adelaide',
    state: 'SA',
    tagline: 'AI that works for Adelaide small business',
    intro:
      "Adelaide's tight-knit small-business community is picking up CrewCircle to automate rostering, bookkeeping and compliance — practical software that just works.",
    prioritySegments: ['retail', 'cafes', 'tradies', 'clinics'],
  },
];

export function getLocation(slug: string): LocationProfile | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
