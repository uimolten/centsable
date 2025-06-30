"use client";

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { LeftSidebar } from '@/components/learn/left-sidebar';
import { LearningPathway } from '@/components/learn/learning-pathway';
import { RightSidebar } from '@/components/learn/right-sidebar';
import { units as initialUnitsData, Unit, Activity } from '@/data/learn-data';

export default function LearnPage() {
  const [units, setUnits] = useState<Unit[]>(initialUnitsData);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(units[0].activities[0]);
  
  const handleSelectActivity = (activity: Activity) => {
    if (activity.state !== 'locked') {
      setSelectedActivity(activity);
    }
  };

  const handleStartActivity = (activity: Activity) => {
    // This is a simulation of completing an activity.
    // In a real app, this would happen after the user finishes the lesson/quiz.
    console.log("Starting activity:", activity.title);
    
    // Mark current as completed
    const newUnits = units.map(unit => ({
      ...unit,
      activities: unit.activities.map(act => 
        act.id === activity.id ? { ...act, state: 'completed' as const } : act
      )
    }));

    // Find and unlock the next one
    let nextActivityFound = false;
    for (const unit of newUnits) {
      for (const act of unit.activities) {
        if (nextActivityFound && act.state === 'locked') {
          act.state = 'active';
          setSelectedActivity(act); // Select the new active activity
          setUnits(newUnits);
          return;
        }
        if (act.id === activity.id) {
          nextActivityFound = true;
        }
      }
    }
    
    // If we reached the end
    if(nextActivityFound) {
      setSelectedActivity(null);
      setUnits(newUnits);
    }
  };

  const findUnitForActivity = (activity: Activity | null): Unit | undefined => {
    if (!activity) return undefined;
    return units.find(unit => unit.activities.some(act => act.id === activity.id));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        
        {/* Left Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <LeftSidebar />
        </div>

        {/* Center Content */}
        <div className="lg:col-span-3">
          <LearningPathway 
            units={units}
            onSelectActivity={handleSelectActivity}
            selectedActivityId={selectedActivity?.id}
          />
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <AnimatePresence>
            {selectedActivity && (
              <RightSidebar
                key={selectedActivity.id}
                activity={selectedActivity}
                unit={findUnitForActivity(selectedActivity)}
                onStart={handleStartActivity}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
