
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
        <div className="p-6 text-center text-muted-foreground w-full max-w-sm">
            <p>Select a lesson node on the path to see its details.</p>
        </div>
    )
  }

  const activityTypeLabel = activity.type.charAt(0).toUpperCase() + activity.type.slice(1);

  return (
    <motion.div
      key={activity.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-full max-w-sm flex flex-col gap-8 text-center"
    >
        <div>
          <h3 className="text-3xl font-bold font-headline">{activity.title}</h3>
          <p className="text-muted-foreground">Unit: {unit.title} | Type: {activityTypeLabel}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-foreground mb-2 text-xl">Rewards for Completion:</h4>
          <div className="space-y-2 text-lg">
            <div className="flex items-center justify-between p-4 bg-background/50 rounded-md">
              <span className="text-muted-foreground">Base Reward</span>
              <span className="font-bold text-primary">{activity.xp} XP</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-background/50 rounded-md">
              <span className="text-muted-foreground">Accuracy Bonus</span>
              <span className="font-bold text-primary">+5 XP</span>
            </div>
          </div>
        </div>

        <div>
          <Button 
            className="w-full text-lg font-semibold shadow-glow" 
            size="lg"
            onClick={() => onStart(activity)}
            disabled={activity.state === 'locked'}
          >
            {activity.state === 'completed' ? 'Review Lesson' : `Start ${activityTypeLabel}`}
          </Button>
        </div>
    </motion.div>
  );
}
