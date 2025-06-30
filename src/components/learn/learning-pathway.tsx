import type { Unit, Activity } from '@/types/learn';
import { UnitHeader } from './unit-header';
import { ActivityNode } from './activity-node';

interface LearningPathwayProps {
  units: Unit[];
  onSelectActivity: (activity: Activity) => void;
  selectedActivityId?: string;
}

export function LearningPathway({ units, onSelectActivity, selectedActivityId }: LearningPathwayProps) {
  return (
    <div className="relative w-full">
      {/* Central path line */}
      <div className="absolute top-0 left-1/2 w-1 bg-border/20 h-full -translate-x-1/2" />

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
