
import { motion } from 'framer-motion';
import type { IntroStep } from '@/types/lesson';

interface IntroCardProps {
  step: IntroStep;
}

export function IntroCard({ step }: IntroCardProps) {
  // The introductory text is now rendered in the SpeechBubble component within LessonContainer.
  // This component remains to ensure the structure is consistent and for any future visual elements
  // specific to the intro step.
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center h-full min-h-[300px]"
    >
    </motion.div>
  );
}
