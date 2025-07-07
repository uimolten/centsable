
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { GoalSummaryStep } from '@/types/lesson';

interface GoalSummaryProps {
  step: GoalSummaryStep;
  goalData: Record<string, string | number>;
}

export function GoalSummary({ step, goalData }: GoalSummaryProps) {
  const summaryText = step.textTemplate
    .replace('{item}', String(goalData.item || 'your goal'))
    .replace('{amount}', `$${String(goalData.amount || '0')}`)
    .replace('{timeframe}', String(goalData.timeframe || 'a future date'));

  return (
    <motion.div
      key="goal-summary"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="text-center space-y-8 flex flex-col items-center bg-card/50 backdrop-blur-lg border border-border/20 rounded-2xl p-8 md:p-12"
    >
      <CheckCircle2 className="w-24 h-24 text-primary" />
      <h1 className="text-3xl font-black text-foreground font-headline">QUEST CREATED!</h1>
      <p className="text-xl md:text-2xl font-bold text-muted-foreground leading-relaxed bg-background/50 p-6 rounded-lg">
        {summaryText}
      </p>
      <p className="text-lg text-primary">That's a perfect SMART goal. Now you have a clear mission! ✅</p>
    </motion.div>
  );
}
