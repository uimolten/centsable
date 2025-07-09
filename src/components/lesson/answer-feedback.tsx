
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface AnswerFeedbackProps {
  isCorrect: boolean;
  onAction: () => void;
  buttonText: string;
  isButtonDisabled: boolean;
  correctAnswerText?: string;
  onBack: () => void;
  isFirstStep: boolean;
  customMessage?: string;
  customReinforcement?: string;
  isSortIncomplete?: boolean;
}

export function AnswerFeedback({ isCorrect, onAction, buttonText, isButtonDisabled, correctAnswerText, onBack, isFirstStep, customMessage, customReinforcement, isSortIncomplete }: AnswerFeedbackProps) {
  const standardMessage = isCorrect ? 'Awesome! ✨' : 'Not quite.';
  const message = customMessage ?? standardMessage;
  
  let standardReinforcement = isCorrect ? 'You\'re on a roll!' : correctAnswerText ? `The correct answer is: ${correctAnswerText}` : "Let's review that one.";
  
  if (isSortIncomplete) {
    standardReinforcement = "Please sort all items into a category before checking your answer.";
  }

  const reinforcement = customReinforcement ?? standardReinforcement;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: '0%' }}
      exit={{ y: '100%' }}
      transition={{ ease: 'easeInOut', duration: 0.3 }}
      className={cn(
        'absolute bottom-0 left-0 w-full p-6 z-20',
        isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
      )}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex-grow text-center sm:text-left">
          <p className={cn(
            "text-xl font-bold",
            isCorrect ? 'text-green-300' : 'text-red-300'
            )}>{message}</p>
          <p className="text-foreground/80">{reinforcement}</p>
        </div>
        <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="text-lg font-bold bg-transparent border-foreground/50 hover:bg-foreground/10"
              onClick={onBack}
              disabled={isFirstStep}
            >
              Back
            </Button>
            <Button
              size="lg"
              className={cn(
                "text-lg font-bold w-full sm:w-auto min-w-[200px] active:scale-95 transition-transform",
                isCorrect ? 'bg-green-500/80 hover:bg-green-500 text-foreground' : 'bg-amber-500 hover:bg-amber-600'
              )}
              onClick={onAction}
              disabled={isButtonDisabled}
            >
              {buttonText}
            </Button>
        </div>
      </div>
    </motion.div>
  );
}
