import { Hero } from '@/components/home/hero';
import { FeatureShowcase } from '@/components/home/feature-showcase';
import { HowItWorks } from '@/components/home/how-it-works';
import { Cta } from '@/components/home/cta';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeatureShowcase />
      <HowItWorks />
      <Cta />
    </div>
  );
}
