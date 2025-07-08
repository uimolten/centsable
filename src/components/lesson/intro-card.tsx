import { motion } from 'framer-motion';
import type { IntroStep } from '@/types/lesson';

interface IntroCardProps {
  step: IntroStep;
}

export function IntroCard({ step }: IntroCardProps) {
  // The intro step's text is handled by the SpeechBubble in LessonContainer.
  // The mascot is also handled by LessonContainer.
  // This component is now just a placeholder for animations and layout consistency.
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center h-full min-h-[300px]"
    >
      {/* No content needed here as it's handled by the main LessonContainer */}
    </motion.div>
  );
}
