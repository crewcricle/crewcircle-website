'use client';

import Link from 'next/link';
import { NAV_ITEMS } from '@/lib/constants';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-600 shadow-md w-8 h-8">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Crew<span className="text-accent">Circle</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="px-5 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all duration-200"
          >
            Get in touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
