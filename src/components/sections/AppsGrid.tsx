'use client';

import { useState } from 'react';
import { APPS } from '@/lib/config/apps';
import AppCard from '@/components/ui/AppCard';
import AppDemoTabs from '@/components/sections/AppDemoTabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Timer, BookOpen, Camera, Wrench, Users, Calculator } from 'lucide-react';

const appIcons: Record<string, React.ReactNode> = {
  Timer: <Timer className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Camera: <Camera className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Calculator: <Calculator className="w-6 h-6" />,
};

const SOLUTIONS = [
  {
    id: 'tradies',
    label: 'Tradies',
    description: 'Rostering, invoicing, BAS, award compliance - all sorted.',
    apps: ['crewroster', 'taxflowai'],
  },
  {
    id: 'cafes',
    label: 'Cafes & Hospitality',
    description: 'Review replies, local SEO, rebooking, menu sync - hands off.',
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
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden p-6 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SOLUTIONS.map((sol) => (
          <div
            key={sol.id}
            className="bg-muted/50 border border-border rounded-xl p-6 hover:border-accent/20 hover:shadow-md transition-all duration-200 flex flex-col"
          >
            <h4 className="text-lg font-bold text-foreground mb-2">{sol.label}</h4>
            <p className="text-accent font-medium mb-4 text-sm">{sol.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
              {sol.apps.map((appSlug) => {
                const app = APPS.find((a) => a.slug === appSlug);
                return app ? (
                  <Link
                    key={app.slug}
                    href={app.links.web || '#'}
                    className="flex flex-col gap-3 p-3 bg-background rounded-lg border border-border hover:border-accent/20 transition-all duration-200"
                    target={app.links.web ? '_blank' : undefined}
                    rel={app.links.web ? 'noopener noreferrer' : undefined}
                  >
                    <div className="bg-accent/10 text-accent rounded-lg flex items-center justify-center w-12 h-12 shrink-0">
                      {appIcons[app.icon] || <Wrench className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-foreground truncate text-sm">{app.name}</h5>
                      <p className="text-xs text-muted-foreground truncate">{app.oneLiner}</p>
                      <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
                        {app.description}
                      </p>
                    </div>
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
