import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FOUNDER } from '@/lib/config/founder';
import { SOCIAL_ICONS } from '@/lib/config/social';
import { Code, MapPin, User } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-3 block">
            Meet the founder
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Who&apos;s behind this
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Built by an engineer who spent 15 years inside big tech, now
            obsessed with sorting the boring stuff for small business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-start gap-5">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent/20 flex-shrink-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 200 200"
                  className="w-16 h-16 text-foreground/30"
                  fill="currentColor"
                >
                  <circle cx="100" cy="70" r="35" />
                  <ellipse cx="100" cy="170" rx="65" ry="50" />
                </svg>
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-green-500 border-2 border-background flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>
              <div className="pt-1">
                <h3 className="text-2xl font-bold text-foreground">
                  {FOUNDER.name}
                </h3>
                <p className="text-accent font-medium text-sm">
                  {FOUNDER.title}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {FOUNDER.location}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {FOUNDER.shortBio}
            </p>

            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Code className="w-4 h-4 text-accent" />
                Where I&apos;ve built stuff
              </h4>
              <div className="space-y-2">
                {FOUNDER.experience.map((exp) => (
                  <div
                    key={exp.company}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-muted/50 border border-border/50"
                  >
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {exp.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-medium text-foreground text-sm">
                        {exp.role}
                      </span>
                      <span className="text-muted-foreground text-sm ml-2">
                        @ {exp.company}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                What I&apos;m good at
              </h4>
              <div className="flex flex-wrap gap-2">
                {FOUNDER.specialties.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium text-foreground/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-accent/5 p-6">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                Follow crew circle
              </h4>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Get the latest updates, insights, and behind-the-scenes content from our crew circle journey.
              </p>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_ICONS.map(({ href, icon, label }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground hover:bg-accent/10"
                    aria-label={label}
                    render={<Link href={href} target="_blank" rel="noopener noreferrer" />}
                  >
                    {icon('w-5 h-5')}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
