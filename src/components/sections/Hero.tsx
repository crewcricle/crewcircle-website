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

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
          <span className="sr-only">CrewCircle — </span>Sorted.
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Tools for your crew.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#apps"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-md text-lg font-bold hover:bg-primary/90 transition-colors"
            >
              Get it
            </Link>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          Tradies. That&apos;s it.
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
            {['Tradies', 'Cafés', 'Shops', 'Healthcare'].map((industry) => (
              <span
                key={industry}
                className="px-4 py-1.5 bg-muted text-muted-foreground rounded-full text-sm font-medium"
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              {HERO_CONTENT.subheadline}
              {HERO_CONTENT.subheadline}
            </p>
            </p>


            <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
              <Link
                href="#contact"
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-primary-foreground rounded-lg text-base font-semibold hover:bg-primary/90 transition-all duration-200 shadow-sm"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-primary-foreground rounded-lg text-base font-semibold hover:bg-primary/90 transition-all duration-200 shadow-sm"
              >
                {HERO_CONTENT.cta}
              </Link>
              <Link
                href="#apps"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-border bg-background text-foreground rounded-lg text-base font-medium hover:bg-muted transition-all duration-200"
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
