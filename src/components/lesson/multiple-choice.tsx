
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { MultipleChoiceStep } from '@/types/lesson';
import { useState, useEffect } from 'react';

interface MultipleChoiceProps {
  step: MultipleChoiceStep;
  userAnswers: string[];
  onSelectAnswer: (answer: string) => void;
  hasAnswered: boolean;
  isCorrect: boolean | null;
  incorrectAttempts: number;
}

export function MultipleChoice({ step, userAnswers, onSelectAnswer, hasAnswered, isCorrect, incorrectAttempts }: MultipleChoiceProps) {
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    if (incorrectAttempts >= 3 && !hint) {
      const correctAnswers = Array.isArray(step.correctAnswer) ? step.correctAnswer : [step.correctAnswer];
      const incorrectOption = step.options.find(opt => !correctAnswers.includes(opt));
      if (incorrectOption) {
        setHint(`Hint: It's not "${incorrectOption}".`);
      }
    }
    // Reset hint if the step changes (due to key change on parent)
    return () => {
      setHint(null);
    }
  }, [incorrectAttempts, step, hint]);
  
  const isCompleteAndCorrect = hasAnswered && isCorrect === true;

  return (
    <motion.div
      key={step.question}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 bg-card/50 backdrop-blur-lg border border-border/20 rounded-2xl p-8 md:p-12"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center">{step.question}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {step.options.map((option, index) => {
          const isSelected = userAnswers.includes(option);
          const isTheCorrectAnswer = Array.isArray(step.correctAnswer)
            ? step.correctAnswer.includes(option)
            : step.correctAnswer === option;

          return (
            <Button
              key={index}
              variant="outline"
              size="lg"
              className={cn(
                "text-lg h-auto py-4 whitespace-normal justify-start",
                isSelected && "bg-accent",
                hasAnswered && isSelected && !isCorrect && "bg-destructive/50 border-destructive text-destructive-foreground animate-shake",
                hasAnswered && isTheCorrectAnswer && "bg-green-500/50 border-green-500 text-foreground"
              )}
              onClick={() => onSelectAnswer(option)}
              disabled={isCompleteAndCorrect}
            >
              {option}
            </Button>
          );
        })}
      </div>
      {hint && (
       <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-primary text-lg text-center"
      >
        {hint}
      </motion.div>
    )}
    </motion.div>
  );
}
