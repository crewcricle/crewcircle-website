import { APPS } from '@/lib/constants';
import AppCard from '@/components/ui/AppCard';

export default function AppsGrid() {
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
            Four tools, one mission: sorting your business so you can focus on
            what matters. Built for Aussie tradies, cafés, shops and healthcare
            teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {APPS.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            More apps coming soon. Sign up to get notified.
          </p>
        </div>
      </div>
    </section>
  );
}
