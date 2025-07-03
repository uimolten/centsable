import Image from 'next/image';
import { motion } from 'framer-motion';
import type { IntroStep } from '@/types/lesson';

interface IntroCardProps {
  step: IntroStep;
}

export function IntroCard({ step }: IntroCardProps) {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center space-y-8 bg-card/50 backdrop-blur-lg border border-border/20 rounded-2xl p-8 md:p-12"
    >
      {step.mascotImage && (
        <div className="flex justify-center">
          <Image
            src={step.mascotImage}
            alt="Centsable Mascot"
            width={200}
            height={200}
            className="rounded-full"
            data-ai-hint="friendly mascot"
          />
        </div>
      )}
      <p className="text-2xl md:text-3xl font-bold text-foreground">{step.text}</p>
    </motion.div>
  );
}
