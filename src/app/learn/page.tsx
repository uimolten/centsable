"use client";

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@/hooks/use-media-query';

import { LeftSidebar } from '@/components/learn/left-sidebar';
import { LearningPathway } from '@/components/learn/learning-pathway';
import { RightSidebar } from '@/components/learn/right-sidebar';
import { units as initialUnitsData, Unit, Activity } from '@/data/learn-data';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';


export default function LearnPage() {
  const [units, setUnits] = useState<Unit[]>(initialUnitsData);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  const handleSelectActivity = (activity: Activity) => {
    if (activity.state !== 'locked') {
      setSelectedActivity(activity);
    }
  };

  const handleStartActivity = (activity: Activity) => {
    // This is a simulation of completing an activity.
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
          
          // On desktop, keep the sidebar open and select the new activity.
          // On mobile/tablet, close the sheet. A user can tap the new active node to see details.
          setSelectedActivity(isDesktop ? act : null);

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
  
  const activityTypeLabel = selectedActivity ? selectedActivity.type.charAt(0).toUpperCase() + selectedActivity.type.slice(1) : '';

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-8 items-start">
        
        <div className="hidden md:block md:col-span-1 lg:col-span-1">
          <LeftSidebar />
        </div>

        <div className="col-span-1 md:col-span-4 lg:col-span-4">
          <LearningPathway 
            units={units}
            onSelectActivity={handleSelectActivity}
            selectedActivityId={selectedActivity?.id}
          />
        </div>

        {isDesktop && (
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
        )}
      </div>

       {!isDesktop && (
        <Sheet open={!!selectedActivity} onOpenChange={(open) => !open && setSelectedActivity(null)}>
            <SheetContent side="right" className="w-full max-w-md p-0 flex flex-col bg-card/80 backdrop-blur-lg border-border/20">
                {selectedActivity && (
                    <>
                        <SheetHeader className="p-6 pb-4 border-b border-border/10">
                           <SheetTitle className="text-2xl font-bold">{selectedActivity.title}</SheetTitle>
                           <SheetDescription>
                            Unit: {findUnitForActivity(selectedActivity)?.title} &bull; Type: {activityTypeLabel}
                           </SheetDescription>
                        </SheetHeader>
                        <ScrollArea className="flex-grow">
                           <div className="p-6">
                                <RightSidebar
                                  activity={selectedActivity}
                                  unit={findUnitForActivity(selectedActivity)}
                                  onStart={handleStartActivity}
                                />
                           </div>
                        </ScrollArea>
                    </>
                )}
            </SheetContent>
        </Sheet>
       )}
    </div>
  );
}
