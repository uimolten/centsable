import type { Activity, ActivityState } from '@/types/learn';
import { cn } from '@/lib/utils';
import { BookOpen, Check, Trophy, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActivityNodeProps {
  activity: Activity;
  position: 'left' | 'right';
  onSelect: (activity: Activity) => void;
  isSelected: boolean;
}

const typeIcons = {
  lesson: BookOpen,
  practice: Check,
  quiz: Trophy,
};

const stateStyles: Record<ActivityState, string> = {
  locked: 'bg-muted/50 text-muted-foreground border-muted-foreground/20 cursor-not-allowed',
  active: 'bg-primary text-primary-foreground border-primary/50 shadow-glow scale-110',
  completed: 'bg-green-500/30 text-green-300 border-green-500/30',
};

export function ActivityNode({ activity, position, onSelect, isSelected }: ActivityNodeProps) {
  const Icon = typeIcons[activity.type];
  const isLocked = activity.state === 'locked';

  return (
    <div className={cn(
      "relative flex items-center",
      position === 'left' ? 'justify-start' : 'justify-end'
    )}>
      <div className={cn(
        "absolute top-1/2 h-1 w-1/2 -translate-y-1/2",
        "bg-gradient-to-r from-transparent via-border/20 to-border/50",
        position === 'left' ? 'right-1/2' : 'left-1/2 rotate-180'
      )}/>

      <div className="relative group">
        <Button
          variant="ghost"
          className={cn(
            "relative h-20 w-20 rounded-full border-4 transition-all duration-300",
            stateStyles[activity.state],
            isSelected && !isLocked && "ring-4 ring-offset-2 ring-offset-background ring-primary/80",
            "hover:scale-105"
          )}
          onClick={() => onSelect(activity)}
          disabled={isLocked}
        >
          {activity.state === 'active' && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
          )}

          <div className="relative z-10 flex flex-col items-center">
             {isLocked ? <Lock className="w-8 h-8"/> : <Icon className="w-8 h-8" />}
          </div>
          
          {activity.state === 'completed' && (
              <CheckCircle2 className="absolute -top-2 -right-2 h-8 w-8 text-green-400 bg-background rounded-full"/>
          )}
        </Button>

        <div className={cn(
            "absolute bottom-full mb-2 w-48 text-center transition-all duration-300",
            "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
            position === 'left' ? 'left-1/2 -translate-x-1/2' : 'right-1/2 translate-x-1/2',
            isSelected && "opacity-100"
        )}>
            <p className="font-bold text-foreground bg-background/50 backdrop-blur-sm p-2 rounded-md">{activity.title}</p>
        </div>
      </div>
    </div>
  );
}
