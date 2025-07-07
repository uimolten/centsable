
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { MultipleChoiceStep, MultipleChoiceOption } from '@/types/lesson';
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
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    if (incorrectAttempts >= 3 && !hint) {
      const correctAnswers = Array.isArray(step.correctAnswer) ? step.correctAnswer : [step.correctAnswer];
      const incorrectOption = step.options.find(opt => !correctAnswers.includes(opt.id));
      if (incorrectOption?.text) {
        setHint(`Hint: It's not "${incorrectOption.text}".`);
      }
    }
    // Reset hint if the step changes (due to key change on parent)
    return () => {
      setHint(null);
    }
  }, [incorrectAttempts, step, hint]);
  
  const isCompleteAndCorrect = hasAnswered && isCorrect === true;

  const renderOptionContent = (option: MultipleChoiceOption) => {
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
          {option.text && <span className="text-center">{option.text}</span>}
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
      className="space-y-6 bg-card/50 backdrop-blur-lg border border-border/20 rounded-2xl p-8 md:p-12"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center">{step.question}</h2>
      <div className={cn(
        "grid grid-cols-1 gap-4",
        step.options.some(o => o.image) ? "md:grid-cols-3" : "md:grid-cols-2"
      )}>
        {step.options.map((option) => {
          const isSelected = userAnswers.includes(option.id);
          const isTheCorrectAnswer = Array.isArray(step.correctAnswer)
            ? step.correctAnswer.includes(option.id)
            : step.correctAnswer === option.id;

          return (
            <Button
              key={option.id}
              variant="outline"
              size="lg"
              className={cn(
                "text-lg h-auto py-4 whitespace-normal",
                option.image ? "flex-col p-4 h-full" : "justify-start",
                isSelected && "bg-accent",
                hasAnswered && isSelected && !isCorrect && "bg-destructive/50 border-destructive text-destructive-foreground animate-shake",
                hasAnswered && isTheCorrectAnswer && "bg-green-500/50 border-green-500 text-foreground"
              )}
              onClick={() => onSelectAnswer(option.id)}
              disabled={isCompleteAndCorrect}
            >
              {renderOptionContent(option)}
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
