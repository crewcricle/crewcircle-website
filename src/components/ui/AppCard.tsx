'use client';

import Link from 'next/link';
import { AppDef } from '@/lib/constants';
import { Timer, BookOpen, Camera, Wrench, ArrowRight, Download, ExternalLink } from 'lucide-react';

const appIcons: Record<string, React.ReactNode> = {
  Timer: <Timer className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Camera: <Camera className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
};

interface AppCardProps {
  app: AppDef;
}

export default function AppCard({ app }: AppCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md hover:border-accent/20 transition-all duration-200 group relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-200">
          {appIcons[app.icon] || <Wrench className="w-6 h-6" />}
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">{app.name}</h3>
          <p className="text-sm text-muted-foreground">{app.oneLiner}</p>
        </div>
      </div>

      <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
        {app.description}
      </p>

      <ul className="space-y-2 mb-6 border-t border-border/50 pt-4">
        {app.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <div className="space-y-3">
        {app.links.web && (
          <Link
            href={app.links.web}
            className="group/btn flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-200"
          >
            Visit {app.name}
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        )}

        {app.ctaType === 'demo' && (
          <Link
            href="/demo"
            className="group/btn flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-200"
          >
            Try it
            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        )}

        {app.ctaType === 'download' && (
          <div className="flex gap-2">
            {app.links.appStore && (
              <Link
                href={app.links.appStore}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 bg-secondary text-secondary-foreground rounded-lg text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                <Download className="w-3.5 h-3.5" />
                App Store
              </Link>
            )}
            {app.links.playStore && (
              <Link
                href={app.links.playStore}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 bg-secondary text-secondary-foreground rounded-lg text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                <Download className="w-3.5 h-3.5" />
                Play Store
              </Link>
            )}
            {app.links.chromeStore && (
              <Link
                href={app.links.chromeStore}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 bg-secondary text-secondary-foreground rounded-lg text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                <Download className="w-3.5 h-3.5" />
                Chrome
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
