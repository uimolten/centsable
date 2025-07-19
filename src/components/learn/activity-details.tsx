
"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Activity, Unit } from '@/types/learn';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityDetailsProps {
  activity: Activity | null;
  unit?: Unit;
  onStart: (activity: Activity) => void;
  onClose: () => void;
  isSheet?: boolean;
}

export function ActivityDetails({ activity, unit, onStart, onClose, isSheet = false }: ActivityDetailsProps) {
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
        <Card className={cn("bg-card/70 backdrop-blur-lg border border-border/20 w-80 relative", isSheet && "bg-transparent border-none shadow-none")}>
            {!isSheet && (
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={onClose}>
                    <X className="h-5 w-5" />
                </Button>
            )}
            <CardContent className="p-6">
                <div className="w-full flex flex-col gap-6 text-center">
                    <div>
                    <h3 className="text-2xl font-bold font-headline">{activity.title}</h3>
                    <p className="text-muted-foreground">Unit: {unit.title} | Type: {activityTypeLabel}</p>
                    </div>
                    
                    <div>
                    <h4 className="font-semibold text-foreground mb-2 text-lg">Rewards for Completion:</h4>
                    <div className="space-y-2 text-md">
                        <div className="flex items-center justify-between p-3 bg-background/50 rounded-md">
                        <span className="text-muted-foreground">Base Reward</span>
                        <span className="font-bold text-primary">{activity.xp} XP</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-background/50 rounded-md">
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
                </div>
            </CardContent>
        </Card>
    </motion.div>
  );
}
