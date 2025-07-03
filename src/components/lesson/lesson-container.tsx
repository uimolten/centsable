"use client";

import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  onContinue: () => void;
}

export function LessonContainer({
  children,
  progress,
  isCorrect,
  hasAnswered,
  isCheckDisabled,
  isContinuable,
  onCheck,
  onContinue
}: LessonContainerProps) {
  const router = useRouter();

  const getButtonText = () => {
    if(isContinuable) return "Continue";
    if (hasAnswered && isCorrect) return "Continue";
    if (hasAnswered && !isCorrect) return "Try Again";
    return "Check";
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
            {hasAnswered && <AnswerFeedback isCorrect={isCorrect ?? false} />}
        </AnimatePresence>
        <div className="container mx-auto p-4 flex justify-end h-24 items-center">
            <Button
                size="lg"
                className="text-lg font-bold min-w-[150px] shadow-glow"
                onClick={onCheck}
                disabled={isCheckDisabled}
            >
                {getButtonText()}
            </Button>
        </div>
      </footer>
    </div>
  );
}
