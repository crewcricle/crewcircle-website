import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import ServicesSection from '@/components/sections/ServicesSection';
import ImpactSection from '@/components/sections/ImpactSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';

const AppsGrid = dynamic(() => import('@/components/sections/AppsGrid'), {
  loading: () => (
    <div className="py-16 md:py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mx-auto" />
      </div>
    </div>
  ),
});

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <AppsGrid />
      <ServicesSection />
      <ImpactSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
