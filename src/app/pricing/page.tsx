import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRICING_TIERS } from '@/lib/config/pricing';

export const metadata: Metadata = {
  title: 'Pricing — CrewCircle',
  description:
    'Simple, transparent pricing for small business. Start free with Card Snap and Aura, then upgrade to AI-powered tools when you are ready.',
};

function formatPrice(price: number, period: string): string {
  if (price === 0) return 'Free';
  return `$${price}/${period}`;
}

export default function PricingPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">
          Pricing
        </span>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
          Simple pricing for small business.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Pick the tools you need. Start free, upgrade when the AI is doing the
          heavy lifting.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
          {PRICING_TIERS.map((tier) => {
            const isHighlighted = tier.highlight === true;

            return (
              <div
                key={tier.name}
                className={
                  isHighlighted
                    ? 'rounded-2xl border border-accent bg-accent text-accent-foreground p-8 flex flex-col'
                    : 'rounded-2xl border border-border bg-background p-8 flex flex-col'
                }
              >
                <h2 className="text-xl font-semibold">{tier.name}</h2>

                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {formatPrice(tier.price, tier.period)}
                  </span>
                </div>

                <p
                  className={
                    isHighlighted
                      ? 'mt-2 text-sm text-accent-foreground/80'
                      : 'mt-2 text-sm text-muted-foreground'
                  }
                >
                  {tier.blurb}
                </p>

                <div
                  className={
                    isHighlighted
                      ? 'mt-6 border-t border-accent-foreground/20'
                      : 'mt-6 border-t border-border'
                  }
                />

                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={
                          isHighlighted
                            ? 'w-5 h-5 shrink-0 text-accent-foreground'
                            : 'w-5 h-5 shrink-0 text-accent'
                        }
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <Button
                    variant={isHighlighted ? 'default' : 'accent'}
                    size="xl"
                    className="w-full"
                    render={<Link href={tier.cta.href} />}
                  >
                    {tier.cta.label}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-12 text-center text-muted-foreground">
          All prices in AUD, GST included. Not sure which fits?{' '}
          <Button
            variant="link"
            render={<Link href="/#contact" />}
          >
            Let&apos;s talk
          </Button>
        </p>
      </div>
    </section>
  );
}
