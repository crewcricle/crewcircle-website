import Link from 'next/link';
import Image from 'next/image';
import { HERO_CONTENT } from '@/lib/constants';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

      <div className="relative w-full max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
              {HERO_CONTENT.headline}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {HERO_CONTENT.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 text-base"
              >
                {HERO_CONTENT.cta}
              </Link>
              <Link
                href="/#apps"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-all duration-200 text-base"
              >
                {HERO_CONTENT.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-80 h-96 rounded-2xl overflow-hidden border border-border shadow-lg">
                <Image
                  src="/hero-small-biz.jpg"
                  alt="Small business owner"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-accent/10 -z-10" />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-border text-xs text-foreground font-medium shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Real human, no sales team
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
