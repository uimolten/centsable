
"use client";

import { Hero } from '@/components/home/hero';
import { HowItWorks } from '@/components/home/how-it-works';
import { Cta } from '@/components/home/cta';
import { MagicBento } from '@/components/home/magic-bento';
import { motion } from 'framer-motion';
import BlurText from '@/components/ui/blur-text';

export default function Home() {
  return (
    <div className="relative w-full">
        <Hero />
        <section className="py-20 md:py-32 bg-background">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="text-center mb-12">
                     <BlurText
                        text="Everything You Need to Get Centsable"
                        delay={50}
                        animateBy="words"
                        className="text-4xl md:text-5xl font-black font-headline"
                      />
                     <BlurText
                        text="A new way to learn finance. Engaging, effective, and actually fun."
                        delay={50}
                        animateBy="words"
                        className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground"
                      />
                </div>
                <div className="flex justify-center">
                    <MagicBento 
                        enableStars={true}
                        enableSpotlight={true}
                        enableBorderGlow={true}
                        enableTilt={true}
                        enableMagnetism={true}
                        clickEffect={true}
                        spotlightRadius={150}
                        particleCount={12}
                        glowColor="var(--primary-hsl-raw)"
                    />
                </div>
            </motion.div>
        </section>
        <HowItWorks />
        <Cta />
    </div>
  );
}
