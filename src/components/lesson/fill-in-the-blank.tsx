

import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import type { FillInTheBlankStep } from '@/types/lesson';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface FillInTheBlankProps {
  step: FillInTheBlankStep;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
  hasAnswered: boolean;
  isCorrect: boolean | null;
  incorrectAttempts: number;
}

export function FillInTheBlank({ step, userAnswer, onAnswerChange, hasAnswered, isCorrect, incorrectAttempts }: FillInTheBlankProps) {
  const parts = step.question.split('________');
  const isCompleteAndCorrect = hasAnswered && isCorrect === true;

  return (
    <motion.div
      key="fill-in-the-blank"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col items-center justify-center gap-6"
    >
      {step.image && (
        <div className="flex justify-center">
            <Image
                src={step.image}
                alt={step.text ?? 'Lesson illustration'}
                width={400}
                height={225}
                className="rounded-lg bg-muted object-cover"
                data-ai-hint={step.imageHint}
            />
        </div>
      )}
      <div className="text-2xl md:text-3xl font-semibold leading-relaxed text-center p-8 bg-card/50 backdrop-blur-lg border border-border/20 rounded-2xl">
        <span dangerouslySetInnerHTML={{ __html: parts[0] }} />
        <Input
          type="text"
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          className={cn(
            "inline-block w-48 text-2xl font-bold text-center mx-2 bg-background/70 border-b-2 border-border/50 h-12 rounded-none p-0 focus-visible:ring-0 focus:border-primary",
            hasAnswered && "border-2",
            isCorrect === true && "border-green-500 bg-green-500/10",
            hasAnswered && isCorrect === false && "border-destructive bg-red-500/10 animate-shake"
          )}
          autoFocus
          disabled={isCompleteAndCorrect}
        />
        <span dangerouslySetInnerHTML={{ __html: parts[1] }} />
      </div>

      {incorrectAttempts >= 3 && !hasAnswered && (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-primary text-lg font-semibold bg-primary/10 py-2 px-4 rounded-md"
        >
            Hint: The answer starts with the letter "{step.correctAnswer.charAt(0).toUpperCase()}".
        </motion.div>
      )}
    </motion.div>
  );
}
