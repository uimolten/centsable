import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatedBackground } from '@/components/animated-background';

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-black text-foreground font-headline">
          Your Adventure in <span className="text-primary">Financial Mastery</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Learn budgeting, investing, and more through fun games and interactive challenges. Stop guessing, start growing.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild className="text-lg font-semibold shadow-glow transition-all duration-300 hover:shadow-glow-lg">
            <Link href="/lessons">Start Your First Quest</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
