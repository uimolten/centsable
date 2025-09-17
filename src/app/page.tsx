
"use client";

import { Hero } from '@/components/home/hero';
import { HowItWorks } from '@/components/home/how-it-works';
import { Cta } from '@/components/home/cta';
import { MagicBento } from '@/components/home/magic-bento';
import { motion } from 'framer-motion';
import BlurText from '@/components/ui/blur-text';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import { resetAllUsersProgress } from '@/ai/flows/reset-all-users-progress-flow';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const { isAdmin, authLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const runAdminReset = async () => {
      // Ensure the user is an admin and the flow hasn't been run in this session
      if (isAdmin && !sessionStorage.getItem('admin_progress_reset_done')) {
        console.log('Admin detected, attempting to reset user progress...');
        sessionStorage.setItem('admin_progress_reset_done', 'true'); // Prevent re-running in the same session
        
        try {
          const result = await resetAllUsersProgress();
          if (result.success) {
            toast({
              title: "Admin Action: Success!",
              description: `Reset learning progress for ${result.usersReset} users.`,
              duration: 10000,
            });
          } else {
            throw new Error(result.message || "An unknown error occurred during reset.");
          }
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Admin Action: Reset Failed",
            description: error.message,
            duration: 10000,
          });
        }
      }
    };

    if (!authLoading) {
      runAdminReset();
    }
  }, [isAdmin, authLoading, toast]);


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
