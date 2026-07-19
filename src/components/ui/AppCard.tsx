'use client';

import Link from 'next/link';
import type { AppDef } from '@/lib/config/apps';
import { Timer, BookOpen, Camera, Wrench, Users, Calculator, ArrowRight, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const appIcons: Record<string, React.ReactNode> = {
  Timer: <Timer className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Camera: <Camera className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Calculator: <Calculator className="w-6 h-6" />,
};

interface AppCardProps {
  app: AppDef;
}

export default function AppCard({ app }: AppCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md hover:border-accent/20 transition-all duration-200 group relative overflow-hidden">
      {app.featured && (
        <span className="absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">Featured</span>
      )}
      {app.beta && (
        <span className="absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">Beta</span>
      )}
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
          <Button
            variant="default"
            size="default"
            className="w-full hover:bg-accent hover:text-accent-foreground"
            render={<Link href={app.links.web} />}
          >
            Visit {app.name}
            <ArrowRight className="w-4 h-4 group-hover/button:translate-x-0.5 transition-transform" />
          </Button>
        )}

        {app.ctaType === 'demo' && (
          <Button
            variant="default"
            size="default"
            className="w-full hover:bg-accent hover:text-accent-foreground"
            render={<Link href="/demo" />}
          >
            Try it
            <ExternalLink className="w-4 h-4 group-hover/button:translate-x-0.5 transition-transform" />
          </Button>
        )}

        {app.ctaType === 'download' && (
          <div className="flex gap-2">
            {app.links.appStore && (
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 hover:bg-accent hover:text-accent-foreground"
                render={<Link href={app.links.appStore} />}
              >
                <Download className="w-3.5 h-3.5" />
                App Store
              </Button>
            )}
            {app.links.playStore && (
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 hover:bg-accent hover:text-accent-foreground"
                render={<Link href={app.links.playStore} />}
              >
                <Download className="w-3.5 h-3.5" />
                Play Store
              </Button>
            )}
            {app.links.chromeStore && (
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 hover:bg-accent hover:text-accent-foreground"
                render={<Link href={app.links.chromeStore} />}
              >
                <Download className="w-3.5 h-3.5" />
                Chrome
              </Button>
            )}
          </div>
        )}

        {app.ctaType === 'coming-soon' && (
          <Button
            variant="outline"
            size="default"
            className="w-full"
            disabled
          >
            Coming soon
          </Button>
        )}
      </div>
    </div>
  );
}
