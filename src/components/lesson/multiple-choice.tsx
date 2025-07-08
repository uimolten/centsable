
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { MultipleChoiceStep } from '@/types/lesson';
import { useState, useEffect } from 'react';

interface MultipleChoiceProps {
  step: MultipleChoiceStep;
  userAnswers: string[];
  onSelectAnswer: (answerId: string) => void;
  hasAnswered: boolean;
  isCorrect: boolean | null;
  incorrectAttempts: number;
}

export function MultipleChoice({ step, userAnswers, onSelectAnswer, hasAnswered, isCorrect, incorrectAttempts }: MultipleChoiceProps) {
  const [eliminatedOptionId, setEliminatedOptionId] = useState<string | null>(null);

  useEffect(() => {
    if (incorrectAttempts >= 3 && !eliminatedOptionId) {
        const correctAnswers = Array.isArray(step.correctAnswer) ? step.correctAnswer : [step.correctAnswer];
        const incorrectOption = step.options.find(opt => !correctAnswers.includes(opt.id));
        if (incorrectOption) {
            setEliminatedOptionId(incorrectOption.id);
        }
    }
  }, [incorrectAttempts, step.options, step.correctAnswer, eliminatedOptionId]);
  
  useEffect(() => {
    setEliminatedOptionId(null);
  }, [step.question]);

  const isCompleteAndCorrect = hasAnswered && isCorrect === true;

  const renderOptionContent = (option: typeof step.options[0]) => {
    if (option.image) {
      return (
        <div className="flex flex-col items-center justify-center gap-2">
          <Image 
            src={option.image} 
            alt={option.text || `Option image`}
            data-ai-hint={option.imageHint}
            width={150}
            height={150}
            className="rounded-lg object-cover aspect-square"
          />
          {option.text && <span className="text-center font-semibold">{option.text}</span>}
        </div>
      );
    }
    return option.text;
  };

  return (
    <motion.div
      key={step.question}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 w-full"
    >
      <div className={cn(
        "grid grid-cols-1 gap-3",
        step.options.some(o => o.image) ? "md:grid-cols-3" : "md:grid-cols-2"
      )}>
        {step.options.map((option) => {
          const isSelected = userAnswers.includes(option.id);
          const isTheCorrectAnswer = Array.isArray(step.correctAnswer)
            ? step.correctAnswer.includes(option.id)
            : step.correctAnswer === option.id;
          const isEliminated = option.id === eliminatedOptionId;

          return (
            <Button
              key={option.id}
              variant="outline"
              size="lg"
              className={cn(
                "text-lg h-auto py-4 whitespace-normal transition-all duration-200 border-2 border-border/30 bg-card/50",
                "hover:bg-accent hover:border-primary",
                option.image ? "flex-col p-4 h-full" : "justify-center",
                isSelected && "bg-accent border-primary",
                hasAnswered && isSelected && isCorrect === false && "bg-destructive/50 border-destructive text-destructive-foreground animate-shake",
                hasAnswered && isTheCorrectAnswer && "bg-green-500/50 border-green-500 text-foreground",
                isEliminated && "opacity-50 bg-muted/30 border-muted-foreground/10 cursor-not-allowed"
              )}
              onClick={() => onSelectAnswer(option.id)}
              disabled={isCompleteAndCorrect || isEliminated}
            >
              {renderOptionContent(option)}
            </Button>
          );
        })}
      </div>
      {eliminatedOptionId && !hasAnswered && (
       <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-primary text-lg text-center font-semibold"
      >
        Hint: I've removed one incorrect option for you.
      </motion.div>
    )}
    </motion.div>
  );
}
