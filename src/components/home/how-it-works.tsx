"use client";

import { BookOpen, Gamepad2, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export function HowItWorks() {
  const steps = [
    {
      icon: BookOpen,
      title: 'Learn',
      description: 'Complete bite-sized, engaging lessons on key financial topics.',
    },
    {
      icon: Gamepad2,
      title: 'Play',
      description: 'Apply your knowledge in fun mini-games that reinforce concepts.',
    },
    {
      icon: Trophy,
      title: 'Master',
      description: 'Track your progress, earn achievements, and grow your confidence.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };


  return (
    <section className="py-20 md:py-32 bg-background/50">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black font-headline">A Simple Path to Mastery</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Learn, play, and master your finances in three easy steps.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants} className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-card border border-border/10 mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary">
                  <step.icon className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold font-headline">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
