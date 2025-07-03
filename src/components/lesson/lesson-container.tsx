"use client";

import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AnswerFeedback } from './answer-feedback';

interface LessonContainerProps {
  children: React.ReactNode;
  progress: number;
  isCorrect: boolean | null;
  hasAnswered: boolean;
  isCheckDisabled: boolean;
  isContinuable: boolean;
  onCheck: () => void;
}

export function LessonContainer({
  children,
  progress,
  isCorrect,
  hasAnswered,
  isCheckDisabled,
  isContinuable,
  onCheck,
}: LessonContainerProps) {
  const router = useRouter();

  const getButtonText = () => {
    if (isContinuable && hasAnswered && isCorrect !== false) return "Continue";
    if (hasAnswered && isCorrect === false) return "Try Again";
    if (
        isContinuable &&
        !hasAnswered &&
        isCorrect === null
    ) return "Continue";
    return "Check";
  }

  const handleButtonClick = () => {
    onCheck();
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
                  isCorrect ? "shadow-glow" : ""
                )}
                onClick={handleButtonClick}
                disabled={isCheckDisabled && !isContinuable}
            >
                {getButtonText()}
            </Button>
        </div>
      </footer>
    </div>
  );
}
