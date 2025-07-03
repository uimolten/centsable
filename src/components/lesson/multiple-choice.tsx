import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { MultipleChoiceStep } from '@/types/lesson';

interface MultipleChoiceProps {
  step: MultipleChoiceStep;
  userAnswers: string[];
  onSelectAnswer: (answer: string) => void;
  hasAnswered: boolean;
  isCorrect: boolean | null;
}

export function MultipleChoice({ step, userAnswers, onSelectAnswer, hasAnswered, isCorrect }: MultipleChoiceProps) {
  return (
    <motion.div
      key={step.question}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
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
              disabled={hasAnswered}
            >
              {option}
            </Button>
          );
        })}
      </div>
    </motion.div>
  );
}
