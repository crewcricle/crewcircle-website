import { APPS } from '@/lib/config/apps';
import AppCard from '@/components/ui/AppCard';
import AppDemoTabs from '@/components/sections/AppDemoTabs';

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

        <div className="mb-16">
          <AppDemoTabs />
        </div>

        <div className="mt-16 mb-10">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Coming August 2026
          </h3>
          <p className="text-muted-foreground">
            Smaller tools for bookkeeping, business cards, and ATO admin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {betaApps.map((app) => (
            <AppCard key={app.slug} app={app} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
