import { IMPACT_STORIES } from '@/lib/constants';
import { TrendingUp, ShieldCheck, Clock, UtensilsCrossed } from 'lucide-react';

const STORY_ICONS = [TrendingUp, ShieldCheck, Clock, UtensilsCrossed] as const;

export default function ImpactSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Results that speak
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From enterprise to your local crew — real impact from real
            engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {IMPACT_STORIES.map((story, idx) => {
            const Icon = STORY_ICONS[idx % STORY_ICONS.length];
            return (
              <div
                key={story.title}
                className="rounded-xl border border-border bg-background p-8 md:p-10 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {story.title}
                  </h3>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {story.description}
                </p>

                <div className="grid grid-cols-3 gap-6">
                  {story.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="text-2xl md:text-3xl font-bold text-primary">
                        {metric.value}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground mt-1 leading-tight">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
