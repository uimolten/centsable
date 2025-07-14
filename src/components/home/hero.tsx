
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { AnimatedBackground } from '@/components/animated-background';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const slideImages = [
  { src: 'https://placehold.co/1200x800', hint: 'lesson screen', alt: 'Interactive lesson screen for Centsable' },
  { src: 'https://placehold.co/1200x800', hint: 'quiz interface', alt: 'Engaging quiz interface from a Centsable minigame' },
  { src: 'https://placehold.co/1200x800', hint: 'dashboard chart', alt: 'User progress dashboard showing XP and achievements' },
  { src: 'https://placehold.co/1200x800', hint: 'finance game', alt: 'A fun financial minigame in action' },
];

export function Hero() {
  const { user, loading } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slideImages.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);
  
  const getCtaLink = () => {
    if (loading) return '#'; // Prevent navigation while auth state is loading
    return user ? '/learn' : '/auth?view=signup';
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full -z-20 bg-black">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <Image
              src={slideImages[currentSlide].src}
              alt={slideImages[currentSlide].alt}
              data-ai-hint={slideImages[currentSlide].hint}
              layout="fill"
              objectFit="cover"
              className="opacity-20"
              priority={currentSlide === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-black text-foreground font-headline">
          Your Adventure in <span className="text-primary">Financial Mastery</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
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
    </section>
  );
}
