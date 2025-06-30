import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatedBackground } from '@/components/animated-background';

export function Cta() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 text-center container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black font-headline">
          Ready to Start Your First Quest?
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Join thousands of teens mastering their money. Your journey starts now.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild className="text-lg font-semibold shadow-glow transition-all duration-300 hover:shadow-glow-lg">
            <Link href="/lessons">Go to Lessons</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
