import { IMPACT_STORIES } from '@/lib/constants';
import { TrendingUp, ShieldCheck, Clock, UtensilsCrossed } from 'lucide-react';

const STORY_ICONS = [TrendingUp, ShieldCheck, Clock, UtensilsCrossed] as const;

export default function ImpactSection() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">
            Proven results
          </span>
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
                className="rounded-xl border border-border bg-card p-8 md:p-10 hover:shadow-md hover:border-accent/20 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-200">
                    <Icon className="w-6 h-6 text-accent group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {story.title}
                  </h3>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {story.description}
                </p>

                <div className="border-t border-border pt-6">
                  <div className="grid grid-cols-3 gap-6">
                    {story.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="text-2xl md:text-3xl font-bold text-accent">
                          {metric.value}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground mt-1.5 leading-tight font-medium">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
