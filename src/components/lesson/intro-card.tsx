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
      className="flex items-center justify-center h-full min-h-[300px]"
    >
      {step.mascotImage && (
        <div className="flex justify-center">
          <Image
            src={step.mascotImage}
            alt="Centsable Mascot"
            width={300}
            height={300}
          />
        </div>
      )}
    </motion.div>
  );
}
