"use client";

import Image from "next/image";
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div variants={cardVariants} className={`bg-card/30 backdrop-blur-lg border border-border/10 rounded-2xl p-6 transition-all duration-300 hover:border-border/20 hover:bg-card/50 ${className}`}>
    {children}
  </motion.div>
);

export function FeatureShowcase() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.2 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={cardVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black font-headline">Everything You Need to Get Centsable</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A new way to learn finance. Engaging, effective, and actually fun.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard className="lg:col-span-2">
            <h3 className="text-2xl font-bold font-headline">Interactive Learning</h3>
            <p className="mt-2 text-muted-foreground">Go from basics to advanced topics with modules that feel like a story, not a textbook.</p>
            <div className="mt-6 aspect-video rounded-lg overflow-hidden relative bg-black/20">
              <Image src="https://placehold.co/800x450" alt="Interactive Lessons Mockup" layout="fill" objectFit="cover" data-ai-hint="lesson screen" className="opacity-75" />
            </div>
          </GlassCard>
          <GlassCard>
            <h3 className="text-2xl font-bold font-headline">Fun Minigames</h3>
            <p className="mt-2 text-muted-foreground">Put your skills to the test with games that make learning stick.</p>
             <div className="mt-6 grid grid-cols-2 gap-4">
               <div className="aspect-square rounded-lg overflow-hidden relative bg-black/20">
                  <Image src="https://placehold.co/400x400" alt="Minigame 1" layout="fill" objectFit="cover" data-ai-hint="block game" className="opacity-75" />
               </div>
               <div className="aspect-square rounded-lg overflow-hidden relative bg-black/20">
                  <Image src="https://placehold.co/400x400" alt="Minigame 2" layout="fill" objectFit="cover" data-ai-hint="finance game" className="opacity-75" />
               </div>
            </div>
          </GlassCard>
          <GlassCard>
            <h3 className="text-2xl font-bold font-headline">Competitive Quizzes</h3>
            <p className="mt-2 text-muted-foreground">Challenge yourself and friends to see who's the master of money.</p>
            <div className="mt-6 aspect-square rounded-lg overflow-hidden relative bg-black/20">
              <Image src="https://placehold.co/400x400" alt="Quiz Mockup" layout="fill" objectFit="cover" data-ai-hint="quiz interface" className="opacity-75" />
            </div>
          </GlassCard>
          <GlassCard className="lg:col-span-2">
            <h3 className="text-2xl font-bold font-headline">Track Your Progress</h3>
            <p className="mt-2 text-muted-foreground">Watch your financial confidence grow with detailed progress tracking and achievements.</p>
            <div className="mt-6 aspect-video rounded-lg overflow-hidden relative bg-black/20">
              <Image src="https://placehold.co/800x450" alt="Progress Tracking Mockup" layout="fill" objectFit="cover" data-ai-hint="dashboard chart" className="opacity-75" />
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </section>
  );
}
