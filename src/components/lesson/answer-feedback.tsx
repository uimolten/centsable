import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface AnswerFeedbackProps {
  isCorrect: boolean;
}

export function AnswerFeedback({ isCorrect }: AnswerFeedbackProps) {
  const message = isCorrect ? 'Great job! ✨' : 'Let\'s try that again.';
  const Icon = isCorrect ? Check : X;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: '0%' }}
      exit={{ y: '100%' }}
      transition={{ ease: 'easeInOut', duration: 0.3 }}
      className={cn(
        'absolute bottom-0 left-0 w-full p-4 h-full flex items-center',
        isCorrect ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
      )}
    >
      <div className="container mx-auto flex items-center gap-4">
        <Icon className="h-8 w-8" />
        <p className="text-xl font-bold">{message}</p>
      </div>
    </motion.div>
  );
}
