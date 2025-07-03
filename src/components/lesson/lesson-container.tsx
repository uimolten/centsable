"use client";

import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Check, X, Gem, Star, PiggyBank } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Step } from '@/types/lesson';
import { AnimatedBackground } from '@/components/animated-background';

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
    
    if (hasAnswered && isCorrect === false) {
      return "Try Again";
    }

    if (isStepWithoutCheck || isInteractiveComplete || (hasAnswered && isCorrect)) {
      return "Continue";
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
    <div className="relative flex flex-col h-screen bg-background overflow-hidden">
      <AnimatedBackground />

      {/* Decorative Icons for fun! */}
      <Gem className="absolute top-[15%] left-[5%] h-12 w-12 md:h-16 md:w-16 text-primary/10 rotate-12 opacity-50" />
      <Star className="absolute top-[20%] right-[8%] h-8 w-8 md:h-12 md:w-12 text-yellow-400/10 -rotate-12 opacity-50" />
      <PiggyBank className="absolute bottom-[25%] left-[10%] h-16 w-16 md:h-20 md:w-20 text-pink-400/10 rotate-[15deg] opacity-50" />
      <Star className="absolute bottom-[20%] right-[12%] h-8 w-8 md:h-10 md:w-10 text-yellow-400/10 rotate-45 opacity-50" />

      <div className="relative z-10 flex flex-col h-full">
        <header className="flex-shrink-0 p-4 border-b border-border/10 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/learn')}>
              <X className="h-6 w-6" />
            </Button>
            <Progress value={progress} className="h-4 flex-grow" />
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center overflow-y-auto p-4">
          <div className="w-full max-w-2xl">
              {children}
          </div>
        </main>

        <footer className={cn(
          "flex-shrink-0 border-t border-border/10 relative transition-colors duration-300 bg-background/50 backdrop-blur-lg",
          hasAnswered && isCorrect !== null 
            ? (isCorrect ? 'bg-green-500/20' : 'bg-red-500/20')
            : ''
        )}>
          <div className="container mx-auto p-4 flex justify-between h-24 items-center">
              <div>
                  <AnimatePresence>
                      {hasAnswered && isCorrect !== null && (
                      <motion.div
                          key="feedback-text"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ ease: 'easeInOut', duration: 0.3 }}
                          className={cn(
                          "flex items-center gap-4 text-xl font-bold",
                          isCorrect ? 'text-green-300' : 'text-red-300'
                          )}
                      >
                          {isCorrect ? <Check className="h-8 w-8" /> : <X className="h-8 w-8" />}
                          <span>{isCorrect ? 'Great job! ✨' : 'Let\'s try that again.'}</span>
                      </motion.div>
                      )}
                  </AnimatePresence>
              </div>
            
              <div>
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
          </div>
        </footer>
      </div>
    </div>
  );
}
