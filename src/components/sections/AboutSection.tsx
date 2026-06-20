import { FOUNDER } from '@/lib/config/founder';
import { CREWCIRCLE_SOCIAL } from '@/lib/config/social';
import { Award, Code, ExternalLink, GraduationCap, MapPin, User } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-3 block">
            Meet the founder
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Who&apos;s behind this
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Just a builder who&apos;s been doing this for 15+ years. No sales
            team, no suits, no nonsense.
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
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {FOUNDER.education}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>{FOUNDER.shortBio}</p>
              <p className="text-sm text-muted-foreground/80">
                {FOUNDER.currentFocus}
              </p>
            </div>

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

            {/* Certifications */}
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {FOUNDER.certifications.map((cert) => (
                  <span
                    key={`${cert.issuer}-${cert.credential}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/5 border border-accent/20 text-xs font-medium text-accent"
                  >
                    {cert.issuer} &middot; {cert.credential}
                  </span>
                ))}
              </div>
            </div>

            {/* Anthropic Partnership */}
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {FOUNDER.anthropicPartnership.badge}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {FOUNDER.anthropicPartnership.note}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {/* Specialties */}
            <div className="rounded-xl border border-border bg-muted/30 p-6">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                Specialties
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
               <div className="space-y-2.5">
                 <a
                   href={CREWCIRCLE_SOCIAL.linkedin}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-background border border-border hover:border-accent/40 transition-colors text-sm font-medium text-foreground group"
                 >
                   <span>LinkedIn</span>
                   <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                 </a>
                 <a
                   href={CREWCIRCLE_SOCIAL.twitter}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-background border border-border hover:border-accent/40 transition-colors text-sm font-medium text-foreground group"
                 >
                   <span>X (Twitter)</span>
                   <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                 </a>
                 <a
                   href={CREWCIRCLE_SOCIAL.github}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-background border border-border hover:border-accent/40 transition-colors text-sm font-medium text-foreground group"
                 >
                   <span>GitHub</span>
                   <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                 </a>
                 <a
                   href={CREWCIRCLE_SOCIAL.youtube}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-background border border-border hover:border-accent/40 transition-colors text-sm font-medium text-foreground group"
                 >
                   <span>YouTube</span>
                   <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                 </a>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
