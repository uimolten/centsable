"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GridBackground } from '../grid-background';
import BlurText from '../ui/blur-text';

export function Hero() {
  const { user, loading } = useAuth();
  
  const getCtaLink = () => {
    if (loading) return '#'; // Prevent navigation while auth state is loading
    return user ? '/learn' : '/auth?view=signup';
  };

  return (
    <GridBackground>
      <section className="relative w-full pt-20 pb-20 md:pt-24 md:pb-24 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative z-10 container mx-auto px-4"
        >
          <div className="text-5xl md:text-7xl font-black text-foreground font-headline">
            <BlurText
              text="Your Adventure in"
              delay={50}
              animateBy="words"
            />
             <BlurText
              text="Financial Mastery"
              delay={50}
              animateBy="words"
              className="bg-gradient-to-r from-primary to-green-400 text-transparent bg-clip-text"
            />
          </div>
          
           <BlurText
              text="Learn budgeting, investing, and more through fun games and interactive challenges. Stop guessing, start growing."
              delay={50}
              animateBy="words"
              className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground"
            />

          <div className="mt-8 flex justify-center px-4 sm:px-0">
            <Button 
              size="lg" 
              asChild 
              className={cn(
                  "text-lg font-semibold shadow-glow transition-all duration-300 hover:shadow-glow-lg w-full sm:w-auto",
                  loading && "opacity-50 cursor-not-allowed"
              )}
              disabled={loading}
            >
              <Link href={getCtaLink()}>Start Your First Quest</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, ease: 'easeInOut', delay: 0.2 }}
            className="relative z-10 mt-16 container mx-auto px-4"
          >
            <div className="relative aspect-[16/10] max-w-5xl mx-auto rounded-xl border-2 border-border/10 bg-card/50 shadow-2xl shadow-primary/10">
                <Image
                  src="/images/app-screenshot.png"
                  alt="Centsable Application Screenshot"
                  data-ai-hint="app screenshot"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
            </div>
          </motion.div>
      </section>
    </GridBackground>
  );
}
