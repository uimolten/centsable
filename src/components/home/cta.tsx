"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GridBackground } from '@/components/grid-background';
import BlurText from '../ui/blur-text';

export function Cta() {
  return (
    <GridBackground>
      <section className="relative py-20 md:py-32 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center container mx-auto px-4 sm:px-6 lg:px-8"
        >
           <BlurText
            text="Ready to Start Your First Quest?"
            delay={50}
            animateBy="words"
            className="text-4xl md:text-5xl font-black font-headline"
          />
           <BlurText
            text="Join thousands of teens mastering their money. Your journey starts now."
            delay={50}
            animateBy="words"
            className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground"
          />
          <div className="mt-8 flex justify-center px-4 sm:px-0">
            <Button size="lg" asChild className="text-lg font-semibold shadow-glow transition-all duration-300 hover:shadow-glow-lg w-full sm:w-auto">
              <Link href="/auth?view=signup">Start Learning</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </GridBackground>
  );
}
