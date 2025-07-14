import { Hero } from '@/components/home/hero';
import { FeatureShowcase } from '@/components/home/feature-showcase';
import { HowItWorks } from '@/components/home/how-it-works';
import { Cta } from '@/components/home/cta';
import { GridBackground } from '@/components/grid-background';

export default function Home() {
  return (
    <div className="relative w-full">
        <Hero />
        <FeatureShowcase />
        <HowItWorks />
        <Cta />
    </div>
  );
}
