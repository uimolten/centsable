import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { Activity, Unit } from '@/types/learn';

interface RightSidebarProps {
  activity: Activity | null;
  unit?: Unit;
  onStart: (activity: Activity) => void;
}

export function RightSidebar({ activity, unit, onStart }: RightSidebarProps) {
  if (!activity || !unit) {
    return (
        <div className="p-6 text-center text-muted-foreground">
            <p>Select an activity to see details.</p>
        </div>
    )
  }

  return (
    <motion.div
      key={activity.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Rewards for Completion:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-md">
              <span className="text-muted-foreground">Base Reward</span>
              <span className="font-bold text-primary">{activity.xp} XP</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-md">
              <span className="text-muted-foreground">Accuracy Bonus</span>
              <span className="font-bold text-primary">+5 XP for 90% accuracy</span>
            </div>
          </div>
        </div>
        <div>
          <Button 
            className="w-full text-lg font-semibold shadow-glow" 
            size="lg"
            onClick={() => onStart(activity)}
            disabled={activity.state !== 'active'}
          >
            {activity.state === 'completed' ? 'Completed' : 'Start'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
