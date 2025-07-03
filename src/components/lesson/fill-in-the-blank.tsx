import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import type { FillInTheBlankStep } from '@/types/lesson';

interface FillInTheBlankProps {
  step: FillInTheBlankStep;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
}

export function FillInTheBlank({ step, userAnswer, onAnswerChange }: FillInTheBlankProps) {
  const parts = step.question.split('________');

  return (
    <motion.div
      key="fill-in-the-blank"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 text-center"
    >
      <div className="text-2xl md:text-3xl font-bold">
        <span>{parts[0]}</span>
        <Input
          type="text"
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          className="inline-block w-48 text-2xl font-bold text-center mx-2 bg-muted/50 border-border/50 h-12"
          autoFocus
        />
        <span>{parts[1]}</span>
      </div>
    </motion.div>
  );
}
