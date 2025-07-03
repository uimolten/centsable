
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import type { FillInTheBlankStep } from '@/types/lesson';
import { cn } from '@/lib/utils';

interface FillInTheBlankProps {
  step: FillInTheBlankStep;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
  hasAnswered: boolean;
  incorrectAttempts: number;
}

export function FillInTheBlank({ step, userAnswer, onAnswerChange, hasAnswered, incorrectAttempts }: FillInTheBlankProps) {
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
          className={cn(
            "inline-block w-48 text-2xl font-bold text-center mx-2 bg-muted/50 border-border/50 h-12",
            hasAnswered && "border-2",
            hasAnswered && "border-destructive animate-shake"
          )}
          autoFocus
        />
        <span>{parts[1]}</span>
      </div>

      {incorrectAttempts >= 3 && (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-primary text-lg"
        >
            Hint: The answer starts with the letter "{step.correctAnswer.charAt(0).toUpperCase()}".
        </motion.div>
      )}
    </motion.div>
  );
}
