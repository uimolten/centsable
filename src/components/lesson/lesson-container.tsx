"use client";

import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AnswerFeedback } from './answer-feedback';
import type { Step } from '@/types/lesson';

interface LessonContainerProps {
  children: React.ReactNode;
  progress: number;
  currentStep: Step;
  isCorrect: boolean | null;
  hasAnswered: boolean;
  userAnswers: string[];
  onAction: () => void;
}

export function LessonContainer({
  children,
  progress,
  currentStep,
  isCorrect,
  hasAnswered,
  userAnswers,
  onAction,
}: LessonContainerProps) {
  const router = useRouter();

  const getButtonText = () => {
    const stepType = currentStep.type;
    const isStepWithoutCheck = stepType === 'intro' || stepType === 'concept' || stepType === 'scenario' || stepType === 'complete';
    const isInteractiveComplete = (stepType === 'tap-the-pairs' || stepType === 'interactive-sort') && hasAnswered;

    if (isStepWithoutCheck || isInteractiveComplete || (hasAnswered && isCorrect)) {
      return "Continue";
    }
    
    if (hasAnswered && isCorrect === false) {
      return "Try Again";
    }

    return "Check";
  };
  
  const isCheckDisabled = () => {
    const stepType = currentStep.type;
    if (stepType === 'multiple-choice' || stepType === 'fill-in-the-blank') {
        return userAnswers.length === 0 || (userAnswers.length > 0 && userAnswers[0] === '');
    }
    return false;
  }

  const isButtonDisabled = () => {
    const buttonText = getButtonText();
    if (buttonText === 'Check') {
        return isCheckDisabled();
    }
    return false;
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex-shrink-0 p-4 border-b border-border/10">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/learn')}>
            <X className="h-6 w-6" />
          </Button>
          <Progress value={progress} className="h-4 flex-grow" />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-2xl p-4 md:p-8">
            {children}
        </div>
      </main>

      <footer className="flex-shrink-0 border-t border-border/10 relative overflow-hidden">
        <AnimatePresence>
            {hasAnswered && isCorrect !== null && <AnswerFeedback isCorrect={isCorrect} />}
        </AnimatePresence>
        <div className="container mx-auto p-4 flex justify-end h-24 items-center">
            <Button
                size="lg"
                className={cn(
                  "text-lg font-bold min-w-[150px]",
                  (hasAnswered && isCorrect) ? "shadow-glow bg-green-500/80 hover:bg-green-500 text-foreground" : "",
                  (hasAnswered && isCorrect === false) ? "bg-red-500/80 hover:bg-red-500 text-foreground" : ""
                )}
                onClick={onAction}
                disabled={isButtonDisabled()}
            >
                {getButtonText()}
            </Button>
        </div>
      </footer>
    </div>
  );
}
