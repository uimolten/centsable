import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Gem, Award, CheckCircle2 } from 'lucide-react';
import type { CompleteStep } from '@/types/lesson';

interface LessonCompleteProps {
  step: CompleteStep;
  onContinue: () => void;
  isReviewMode?: boolean;
}

export function LessonComplete({ step, onContinue, isReviewMode }: LessonCompleteProps) {
  if (isReviewMode) {
    return (
      <motion.div
        key="review"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="text-center space-y-8 flex flex-col items-center bg-card/50 backdrop-blur-lg border border-border/20 rounded-2xl p-8 md:p-12"
      >
        <CheckCircle2 className="w-32 h-32 text-primary" />
        <h1 className="text-4xl font-black text-primary font-headline">Lesson Reviewed!</h1>
        <p className="text-xl text-muted-foreground">
          You've already mastered this lesson. Great job staying sharp!
          <br/>
          (No new rewards were earned.)
        </p>
        <Button size="lg" className="text-lg font-bold shadow-glow" onClick={onContinue}>
          Back to Learn
        </Button>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      key="complete"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="text-center space-y-8 flex flex-col items-center bg-card/50 backdrop-blur-lg border border-border/20 rounded-2xl p-8 md:p-12"
    >
      <Award className="w-32 h-32 text-yellow-400" />
      <h1 className="text-4xl font-black text-primary font-headline">{step.title}</h1>
      <p className="text-xl text-muted-foreground">{step.text}</p>
      
      <div className="flex gap-8 justify-center">
        <div className="flex items-center gap-2 p-4 bg-card/50 rounded-lg">
            <Gem className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">+{step.rewards.xp} XP</span>
        </div>
         <div className="flex items-center gap-2 p-4 bg-card/50 rounded-lg">
            <span className="text-3xl">🪙</span>
            <span className="text-2xl font-bold">+{step.rewards.coins}</span>
        </div>
      </div>

      <Button size="lg" className="text-lg font-bold shadow-glow" onClick={onContinue}>
        Continue
      </Button>
    </motion.div>
  );
}
