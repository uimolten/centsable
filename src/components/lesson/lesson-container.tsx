
"use client";

import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Check, X, Heart, Flame } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Step } from '@/types/lesson';
import { AnimatedBackground } from '@/components/animated-background';
import { Mascot } from './mascot';
import { SpeechBubble } from './speech-bubble';
import { AnswerFeedback } from './answer-feedback';

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
}: LessonContainerProps) {
  const router = useRouter();

  const getButtonText = () => {
    const stepType = currentStep.type;
    const isStepWithoutCheck = ['intro', 'concept', 'scenario', 'complete', 'goal-summary', 'goal-builder'].includes(stepType);
    
    if (hasAnswered && isCorrect === false) return "Try Again";
    if (isStepWithoutCheck || (hasAnswered && isCorrect)) return "Continue";
    return "Check";
  };
  
  const isButtonDisabled = () => {
    const buttonText = getButtonText();
    if (buttonText === 'Check' || (buttonText === 'Continue' && currentStep.type === 'goal-builder')) {
        return userAnswers.length === 0 || (userAnswers.length > 0 && String(userAnswers[0]).trim() === '');
    }
    return false;
  }
  
  const getCorrectAnswerText = () => {
    if (currentStep.type === 'multiple-choice') {
      const correctIds = Array.isArray(currentStep.correctAnswer) ? currentStep.correctAnswer : [currentStep.correctAnswer];
      return currentStep.options.filter(o => correctIds.includes(o.id)).map(o => o.text).join(', ');
    }
    if (currentStep.type === 'fill-in-the-blank') {
      return currentStep.correctAnswer;
    }
    return undefined;
  }

  return (
    <div className="relative flex flex-col h-screen bg-background overflow-hidden font-body">
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col h-full">
        <header className="flex-shrink-0 p-4">
          <div className="container mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/learn')}>
              <X className="h-7 w-7" />
            </Button>
            <div className="relative flex-grow h-4 rounded-full bg-muted/30">
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

        <main className="flex-grow flex flex-col items-center justify-between overflow-y-auto p-4 w-full">
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4">
              <Mascot isHappy={isCorrect} isSad={isCorrect === false} />
              <SpeechBubble text={instructionText} />
          </div>

          <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-4">
              {children}
          </div>
        </main>

        <footer className="flex-shrink-0 relative h-28">
           <AnimatePresence mode="wait">
            {hasAnswered && isCorrect !== null ? (
              <AnswerFeedback
                key="feedback"
                isCorrect={isCorrect}
                onAction={onAction}
                buttonText={getButtonText()}
                isButtonDisabled={isButtonDisabled()}
                correctAnswerText={getCorrectAnswerText()}
              />
            ) : (
              <motion.div
                key="action"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="container mx-auto p-4 flex justify-center h-full items-center"
              >
                <Button
                  size="lg"
                  className={cn(
                    "text-lg font-bold w-full max-w-sm shadow-lg active:scale-95 transition-transform",
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
      </div>
    </div>
  );
}
