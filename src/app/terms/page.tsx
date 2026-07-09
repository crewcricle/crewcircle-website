import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
         <p className="text-lg text-muted-foreground mb-6">
            Last updated: May 1, 2026
          </p>

          <div className="space-y-8">
            <p className="text-foreground leading-relaxed">Welcome to crew circle!</p>
            <p className="text-foreground leading-relaxed">These Terms of Service (&quot;Terms&quot;) govern your use of our website crewcircle.com and our services. Please read them carefully.</p>
           <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Acceptance of Terms</h2>
           <p className="text-muted-foreground leading-relaxed">By accessing or using our website and services, you agree to be bound by these Terms. If you do not agree, please do not use our services.</p>

           <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Services Provided</h2>
           <p className="text-muted-foreground leading-relaxed">CrewCircle provides workforce management, accounting, business card scanning, and Xero assistance tools for Australian small businesses.</p>

           <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">User Accounts</h2>
           <p className="text-muted-foreground leading-relaxed">To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account and password.</p>

           <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">User Conduct</h2>
           <p className="text-muted-foreground leading-relaxed">You agree to use our services only for lawful purposes and in accordance with these Terms.</p>

           <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Intellectual Property</h2>
           <p className="text-muted-foreground leading-relaxed">The website and its original content, features, and functionality are owned by CrewCircle and are protected by international copyright, trademark, and other laws.</p>

           <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Third-Party Links</h2>
           <p className="text-muted-foreground leading-relaxed">Our website may contain links to third-party websites or services that are not owned or controlled by CrewCircle.</p>

           <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Disclaimer of Warranties</h2>
           <p className="text-muted-foreground leading-relaxed">Our services are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. CrewCircle disclaims all warranties of any kind, whether express or implied.</p>

           <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Limitation of Liability</h2>
           <p className="text-muted-foreground leading-relaxed">In no event shall CrewCircle be liable for any indirect, incidental, special, consequential, or punitive damages.</p>

           <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Governing Law</h2>
           <p className="text-muted-foreground leading-relaxed">These Terms shall be governed by and construed in accordance with the laws of Australia, without regard to its conflict of law principles.</p>

           <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Changes to Terms</h2>
           <p className="text-muted-foreground leading-relaxed">We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide notice.</p>

           <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Contact Us</h2>
           <p className="text-muted-foreground leading-relaxed">If you have any questions about these Terms, please contact us at legal@crewcircle.com.</p>
          </div>

          <div className="mt-12 text-center">
            <Button variant="accent" size="xl" render={<Link href="/" />}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
 }
