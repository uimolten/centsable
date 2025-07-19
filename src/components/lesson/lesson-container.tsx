

"use client";

import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Check, X, Heart, Flame, ChevronLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Step } from '@/types/lesson';
import { Mascot } from './mascot';
import { SpeechBubble } from './speech-bubble';
import { AnswerFeedback } from './answer-feedback';
import React from 'react';

interface LessonContainerProps {
  children: React.ReactNode;
  progress: number;
  currentStep: Step;
  isCorrect: boolean | null;
  hasAnswered: boolean;
  userAnswers: string[];
  onAction: () => void;
  instructionText: string;
  lives: number;
  streak: number;
  incorrectAttempts: number;
  onBack: () => void;
  isFirstStep: boolean;
  isSortIncomplete: boolean;
}

export function LessonContainer({
  children,
  progress,
  currentStep,
  isCorrect,
  hasAnswered,
  userAnswers,
  onAction,
  instructionText,
  lives,
  streak,
  incorrectAttempts,
  onBack,
  isFirstStep,
  isSortIncomplete,
}: LessonContainerProps) {
  const router = useRouter();

  const getButtonText = () => {
    if (!currentStep) return "Continue";
    const stepType = currentStep.type;
    const isStepWithoutCheck = ['intro', 'concept', 'scenario', 'complete', 'goal-summary', 'goal-builder'].includes(stepType);
    
    if (hasAnswered && isCorrect === false) return "Try Again";
    if (isStepWithoutCheck || (hasAnswered && isCorrect)) return "Continue";
    return "Check";
  };
  
  const isButtonDisabled = () => {
    const buttonText = getButtonText();
    if (buttonText === 'Check' || (buttonText === 'Continue' && currentStep?.type === 'goal-builder')) {
        return userAnswers.length === 0 || (userAnswers.length > 0 && String(userAnswers[0]).trim() === '');
    }
    return false;
  }
  
  const getCorrectAnswerText = () => {
    if (!currentStep) return undefined;
    if (currentStep.type === 'multiple-choice') {
      const correctIds = Array.isArray(currentStep.correctAnswer) ? currentStep.correctAnswer : [currentStep.correctAnswer];
      return currentStep.options.filter(o => correctIds.includes(o.id)).map(o => o.text).join(', ');
    }
    if (currentStep.type === 'fill-in-the-blank') {
      return currentStep.correctAnswer;
    }
    if (currentStep.type === 'multiple-choice' && currentStep.reinforcement) {
        return currentStep.reinforcement;
    }
    return undefined;
  }

  const showFooter = currentStep?.type !== 'complete';

  return (
    <div 
      className="relative flex flex-col h-screen overflow-hidden font-body select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
        {/* Glowing aura elements */}
        <div className="absolute top-0 left-1/4 h-96 w-96 bg-primary/10 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 right-1/4 h-80 w-80 bg-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-10 flex flex-col h-full">
          <header className="flex-shrink-0 p-4">
            <div className="container mx-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => router.push('/learn')}>
                <X className="h-7 w-7" />
              </Button>
              <div className="relative flex-grow h-4 rounded-full bg-muted">
                 <div className="absolute inset-0 h-full w-full overflow-hidden rounded-full">
                  <div
                      className="h-full bg-primary transition-all duration-500 ease-out"
                      style={{ 
                        width: `${progress}%`,
                        boxShadow: `0 0 10px 1px hsl(var(--primary) / 0.7)` 
                      }} 
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-rose-500 font-bold">
                  <Heart className="h-6 w-6" fill="currentColor" />
                  <span className="text-lg">{lives}</span>
              </div>
              <div className="flex items-center gap-2 text-orange-400 font-bold">
                  <Flame className="h-6 w-6" fill="currentColor" />
                  <span className="text-lg">{streak}</span>
              </div>
            </div>
          </header>

          <main className="flex-grow flex flex-col items-center justify-start pt-4 md:pt-8 overflow-y-auto p-4 w-full space-y-4">
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4">
                <SpeechBubble text={instructionText} />
                <Mascot isHappy={isCorrect} isSad={isCorrect === false} />
            </div>

            <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
                {children}
            </div>
          </main>

          {showFooter && (
            <footer className="flex-shrink-0 relative h-28">
              <AnimatePresence mode="wait">
                {hasAnswered && isCorrect !== null ? (
                  <AnswerFeedback
                    key="feedback"
                    isCorrect={isCorrect}
                    onAction={onAction}
                    buttonText={getButtonText()}
                    isButtonDisabled={isButtonDisabled()}
                    correctAnswerText={incorrectAttempts >= 3 ? getCorrectAnswerText() : undefined}
                    onBack={onBack}
                    isFirstStep={isFirstStep}
                    isSortIncomplete={isSortIncomplete}
                    customReinforcement={isCorrect ? currentStep?.reinforcement : undefined}
                  />
                ) : (
                  <motion.div
                    key="action"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="container mx-auto p-4 flex justify-center items-center gap-4 h-full"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg font-bold"
                      onClick={onBack}
                      disabled={isFirstStep}
                    >
                      Back
                    </Button>
                    <Button
                      size="lg"
                      className={cn(
                        "text-lg font-bold min-w-[200px] shadow-lg active:scale-95 transition-transform",
                        getButtonText() === 'Continue' && "shadow-glow",
                        getButtonText() === 'Try Again' && "bg-amber-500 hover:bg-amber-600"
                      )}
                      onClick={onAction}
                      disabled={isButtonDisabled()}
                    >
                      {getButtonText()}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </footer>
          )}
        </div>
    </div>
  );
}
