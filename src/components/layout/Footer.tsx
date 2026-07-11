import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { FOOTER_LINKS } from '@/lib/config/content';
import { SOCIAL_ICONS } from '@/lib/config/social';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <Logo className="h-8 w-8 mb-4" />
            <p className="text-sm text-primary-foreground/60 max-w-xs leading-relaxed">
              Practical AI that sorts your small biz, no dramas. Built for Aussie
              businesses by Aussie builders.
            </p>
          </div>

          <div>
            <h4 className="text-primary-foreground font-semibold mb-4 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-primary-foreground font-semibold mb-4 text-sm uppercase tracking-wider">
              Our Apps
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.apps.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-primary-foreground font-semibold mb-4 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {SOCIAL_ICONS.map(({ href, icon, label }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground/40 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  aria-label={label}
                  render={<Link href={href} target="_blank" rel="noopener noreferrer" />}
                >
                  {icon('w-5 h-5')}
                </Button>
              ))}
            </div>
            <p className="text-sm text-primary-foreground/40">
              &copy; {new Date().getFullYear()} CrewCircle. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
