import { TESTIMONIALS } from '@/lib/config/testimonials';
import { IMPACT_STORIES } from '@/lib/config/content';
import { TrendingUp, ShieldCheck, Clock, UtensilsCrossed, Quote } from 'lucide-react';

const STORY_ICONS = [TrendingUp, ShieldCheck, Clock, UtensilsCrossed] as const;

export default function ProofSection() {
  return (
    <section id="proof" className="py-24 md:py-32 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">
            Real outcomes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why small business owners trust CrewCircle
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tools built for Aussie tradies, cafés, clinics and shops — plus the engineering depth behind them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-border bg-background p-6 flex flex-col"
            >
              <Quote className="w-6 h-6 text-accent/40 mb-4" />
              <p className="text-foreground/90 leading-relaxed flex-1">{t.quote}</p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">
                  {t.role}, {t.business}
                </p>
                <span className="inline-block mt-2 text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                  {t.segment}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-16">
          <div className="max-w-2xl mb-10">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Engineering depth that scales
            </h3>
            <p className="text-muted-foreground">
              The same rigour applied to CrewCircle apps has delivered results for larger projects too.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {IMPACT_STORIES.map((story, idx) => {
              const Icon = STORY_ICONS[idx % STORY_ICONS.length];
              return (
                <div
                  key={story.title}
                  className="rounded-xl border border-border bg-card p-6 md:p-8 hover:shadow-md hover:border-accent/20 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-200">
                      <Icon className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-colors" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground">
                      {story.title}
                    </h4>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {story.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    {story.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="text-xl md:text-2xl font-bold text-accent">
                          {metric.value}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 leading-tight">
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
      </div>
    </section>
  );
}
