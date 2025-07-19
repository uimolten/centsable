
import type { Unit, Activity } from '@/types/learn';
import { UnitHeader } from './unit-header';
import { ActivityNode } from './activity-node';
import React from 'react';

interface LearningPathwayProps {
  units: Unit[];
  onSelectActivity: (activity: Activity, element: HTMLButtonElement) => void;
  selectedActivityId?: string;
  popoverContent?: React.ReactNode;
}

export function LearningPathway({ units, onSelectActivity, selectedActivityId, popoverContent }: LearningPathwayProps) {
  const allActivities = React.useMemo(() => units.flatMap(unit => unit.activities), [units]);
  const totalActivities = allActivities.length;
  
  const lastCompletedIndex = React.useMemo(() => {
    return allActivities.reduce((lastIndex, activity, currentIndex) => {
      return activity.state === 'completed' ? currentIndex : lastIndex;
    }, -1);
  }, [allActivities]);
  
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
                <div key={activity.id} className="relative">
                  <ActivityNode
                    activity={activity}
                    onSelect={onSelectActivity}
                    position={index % 2 === 0 ? 'left' : 'right'}
                    isSelected={activity.id === selectedActivityId}
                  />
                  {activity.id === selectedActivityId && popoverContent && (
                    <div className="absolute z-20 w-80"
                      style={{
                        top: '50%',
                        left: index % 2 === 0 ? 'calc(50% + 60px)' : 'auto',
                        right: index % 2 !== 0 ? 'calc(50% + 60px)' : 'auto',
                        transform: 'translateY(-50%)'
                      }}
                    >
                      {popoverContent}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
