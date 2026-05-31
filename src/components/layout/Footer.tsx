import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <Image
              src="/crewcircle-logo.svg"
              alt="CrewCircle"
              width={160}
              height={40}
              className="w-auto h-8 brightness-0 invert mb-4"
            />
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

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/40">
          <p>
            &copy; {new Date().getFullYear()} CrewCircle. All rights reserved. AI
            that sorts your small biz, no dramas.
          </p>
        </div>
      </div>
    </footer>
  );
}
