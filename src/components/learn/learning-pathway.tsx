
import type { Unit, Activity } from '@/types/learn';
import { UnitHeader } from './unit-header';
import { ActivityNode } from './activity-node';
import React from 'react';

interface LearningPathwayProps {
  units: Unit[];
  onSelectActivity: (activity: Activity) => void;
  selectedActivityId?: string;
}

export function LearningPathway({ units, onSelectActivity, selectedActivityId }: LearningPathwayProps) {
  const allActivities = React.useMemo(() => units.flatMap(unit => unit.activities), [units]);
  const totalActivities = allActivities.length;
  
  const lastCompletedIndex = React.useMemo(() => {
    return allActivities.reduce((lastIndex, activity, currentIndex) => {
      return activity.state === 'completed' ? currentIndex : lastIndex;
    }, -1);
  }, [allActivities]);
  
  // We add 0.5 to approximately center the progress line on the last completed node.
  // This is a visual approximation as nodes are not perfectly evenly spaced.
  const progressPercentage = totalActivities > 0 && lastCompletedIndex > -1
    ? ((lastCompletedIndex + 0.5) / totalActivities) * 100
    : 0;

  return (
    <div className="relative w-full">
      {/* Central path line */}
      <div className="absolute top-0 left-1/2 w-1 bg-border/20 h-full -translate-x-1/2" />
      {/* Progress line */}
      <div 
        className="absolute top-0 left-1/2 w-1 bg-primary transition-all duration-1000 ease-in-out -translate-x-1/2"
        style={{ 
          height: `${progressPercentage}%`,
          boxShadow: `0 0 10px 1px hsl(var(--primary) / 0.7)` 
        }} 
      />

      <div className="space-y-16">
        {units.map(unit => (
          <div key={unit.id}>
            <UnitHeader 
              Icon={unit.unitIcon} 
              title={unit.title} 
              description={unit.description}
            />
            <div className="mt-8 space-y-8 relative">
              {unit.activities.map((activity, index) => (
                <ActivityNode
                  key={activity.id}
                  activity={activity}
                  onSelect={onSelectActivity}
                  position={index % 2 === 0 ? 'left' : 'right'}
                  isSelected={activity.id === selectedActivityId}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
