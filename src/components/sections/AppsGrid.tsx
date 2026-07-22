'use client';

import { useState } from 'react';
import { APPS } from '@/lib/config/apps';
import AppCard from '@/components/ui/AppCard';
import AppDemoTabs from '@/components/sections/AppDemoTabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const SOLUTIONS = [
  {
    id: 'tradies',
    label: 'Tradies',
    description: 'Rostering, invoicing, BAS, award compliance — all sorted.',
    apps: ['crewroster', 'taxflowai'],
  },
  {
    id: 'cafes',
    label: 'Cafés & Hospitality',
    description: 'Review replies, local SEO, rebooking, menu sync — hands off.',
    apps: ['localmate'],
  },
  {
    id: 'clinics',
    label: 'Allied Health Clinics',
    description: 'Shift scheduling, patient comms, compliance, bookkeeping.',
    apps: ['crewroster', 'taxflowai', 'localmate'],
  },
  {
    id: 'retail',
    label: 'Retail & Services',
    description: 'Stock alerts, staff rostering, local visibility, tax help.',
    apps: ['localmate', 'crewroster'],
  },
];

export default function AppsGrid() {
  const betaApps = APPS.filter((app) => app.beta);

  return (
    <section id="apps" className="py-24 md:py-32 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-3 block">
            Built in-house
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our apps
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Three apps are live today — TaxFlowAI, LocalMate, and CrewRoster.
            Three more helpers are launching in August 2026.
          </p>
        </div>

        <AppDemoTabs />

        <div className="mt-16 mb-10">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Coming August 2026
          </h3>
          <p className="text-muted-foreground text-sm">
            SmartGL, CardSnap, AuRate — bookkeeping, cards, ATO admin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {betaApps.map((app) => (
            <AppCard key={app.slug} app={app} compact />
          ))}
        </div>

        {/* Solutions tabs merged with Our Apps */}
        <div className="mt-20">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-3 block">
              By persona
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Which one are you?
            </h3>
          </div>

          <SolutionsTabs />
        </div>
      </div>
    </section>
  );
}

function SolutionsTabs() {
  const [active, setActive] = useState(SOLUTIONS[0].id);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex flex-wrap border-b border-border">
        {SOLUTIONS.map((sol) => (
          <button
            key={sol.id}
            onClick={() => setActive(sol.id)}
            className={`px-4 py-3 text-sm font-semibold transition-colors ${
              active === sol.id
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {sol.label}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <h4 className="text-2xl font-bold text-foreground mb-2">
              {SOLUTIONS.find(s => s.id === active)?.label}
            </h4>
            <p className="text-accent font-medium mb-4">
              {SOLUTIONS.find(s => s.id === active)?.description}
            </p>
            <ul className="space-y-2 mb-6">
              {SOLUTIONS.find(s => s.id === active)?.apps.map((appSlug) => {
                const app = APPS.find(a => a.slug === appSlug);
                return app ? (
                  <li key={app.slug} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {app.name} — {app.oneLiner}
                  </li>
                ) : null;
              })}
            </ul>
            {SOLUTIONS.find(s => s.id === active)?.apps.map((appSlug) => {
              const app = APPS.find(a => a.slug === appSlug);
              return app?.links.web ? (
                <Button
                  key={app.slug}
                  variant="default"
                  className="w-full md:w-auto hover:bg-accent hover:text-accent-foreground"
                  render={<Link href={app.links.web} />}
                >
                  Try {app.name}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              ) : null;
            })}
          </div>

          <div className="relative aspect-video bg-gradient-to-br from-accent/10 to-primary/10 border-l border-border flex items-center justify-center">
            <span className="text-muted-foreground text-sm">
              {SOLUTIONS.find(s => s.id === active)?.label} preview
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
