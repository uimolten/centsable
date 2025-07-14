"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  const { user, loading } = useAuth();
  
  const getCtaLink = () => {
    if (loading) return '#'; // Prevent navigation while auth state is loading
    return user ? '/learn' : '/auth?view=signup';
  };

  return (
    <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative z-10 container mx-auto px-4"
      >
        <Button variant="outline" size="sm" asChild className="mb-6 rounded-full bg-card/30 backdrop-blur-sm hover:bg-card/50">
           <Link href="#">
            Announcing our Public Beta <ArrowRight className="ml-2" />
           </Link>
        </Button>

        <h1 className="text-5xl md:text-7xl font-black text-foreground font-headline">
          Your Adventure in <br/><span className="text-primary">Financial Mastery</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Learn budgeting, investing, and more through fun games and interactive challenges. Stop guessing, start growing.
        </p>
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
          className="relative z-10 mt-20 container mx-auto px-4"
        >
          <div className="relative aspect-[16/10] max-w-5xl mx-auto rounded-xl border-2 border-border/10 bg-card/50 shadow-2xl shadow-primary/10">
              <Image
                src="https://placehold.co/1200x750"
                alt="Centsable Application Screenshot"
                data-ai-hint="app screenshot"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
          </div>
        </motion.div>
    </section>
  );
}
