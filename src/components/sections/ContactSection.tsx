import { Calendar, ExternalLink } from 'lucide-react';
import { FOUNDER } from '@/lib/constants';
import ContactForm from '@/components/ContactForm';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-3 block">
            Get started
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let&apos;s talk
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Got a problem AI could solve? Not sure where to start?{' '}
            <span className="text-foreground font-medium">
              Give me a yarn
            </span>{' '}
            I&apos;ll help you figure it out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Calendar booking */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="rounded-xl border border-border bg-muted/30 p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Quick chat
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Skip the form and book a 30-minute call directly. No sales
                pitch, just a conversation about what you&apos;re trying to
                solve.
              </p>
              <a
                href={FOUNDER.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-all duration-200"
              >
                <Calendar className="w-4 h-4" />
                Book a 30-min call
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
