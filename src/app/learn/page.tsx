
"use client";

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

import { LeftSidebar } from '@/components/learn/left-sidebar';
import { LearningPathway } from '@/components/learn/learning-pathway';
import { RightSidebar } from '@/components/learn/right-sidebar';
import { units as initialUnitsData, Unit, Activity, DEV_MODE_UNLOCK_ALL } from '@/data/learn-data';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

export default function LearnPage() {
  const [units, setUnits] = useState<Unit[]>(initialUnitsData);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userData, loading: authLoading } = useAuth();

  const updateUserProgress = useCallback(() => {
    if (authLoading || DEV_MODE_UNLOCK_ALL) {
        // If in dev mode, we use the default unlocked state from learn-data.ts
        setUnits(initialUnitsData);
        return;
    };
    
    const completedLessons = userData?.completedLessons || [];
    
    const newUnits = initialUnitsData.map(unit => ({
      ...unit,
      activities: unit.activities.map(act => ({
        ...act,
        state: completedLessons.includes(act.id) ? 'completed' : 'locked'
      }))
    }));
    
    // Unlock the next activity
    let nextActivityUnlocked = false;
    for (const unit of newUnits) {
      for (const act of unit.activities) {
        if (!nextActivityUnlocked && act.state === 'locked') {
          act.state = 'active';
          nextActivityUnlocked = true;
        }
      }
    }

    // Always ensure the very first activity is active if no progress is made
    if (!completedLessons.length && newUnits.length > 0 && newUnits[0].activities.length > 0) {
      newUnits[0].activities[0].state = 'active';
    }

    setUnits(newUnits);
  }, [userData, authLoading]);

  useEffect(() => {
    updateUserProgress();
  }, [updateUserProgress]);
  
  useEffect(() => {
    const completedActivityId = searchParams.get('completed');
    if (completedActivityId) {
      updateUserProgress();
      // Remove the query param from the URL without reloading the page
      router.replace('/learn', { scroll: false });
    }
  }, [searchParams, updateUserProgress, router]);
  
  const handleSelectActivity = (activity: Activity) => {
    if (activity.state !== 'locked') {
      setSelectedActivity(activity);
    }
  };

  const handleStartActivity = (activity: Activity) => {
    if (activity.type === 'lesson' || activity.type === 'practice' || activity.type === 'quiz') {
      router.push(`/learn/${activity.id}`);
    } else {
      console.log("Starting non-lesson activity:", activity.title);
    }
  };

  const findUnitForActivity = (activity: Activity | null): Unit | undefined => {
    if (!activity) return undefined;
    return units.find(unit => unit.activities.some(act => act.id === activity.id));
  };
  
  const activityTypeLabel = selectedActivity ? selectedActivity.type.charAt(0).toUpperCase() + selectedActivity.type.slice(1) : '';

  if (authLoading || units.length === 0) {
      return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="hidden lg:block lg:col-span-3 sticky top-24">
                     <Skeleton className="h-48 w-full" />
                </div>
                <div className="col-span-1 lg:col-span-6 space-y-8">
                     <Skeleton className="h-32 w-full" />
                     <Skeleton className="h-64 w-full" />
                </div>
                 <div className="hidden lg:block lg:col-span-3 sticky top-24">
                     <Skeleton className="h-48 w-full" />
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <LeftSidebar />
        </div>

        <div className="col-span-1 lg:col-span-6">
          <LearningPathway 
            units={units}
            onSelectActivity={handleSelectActivity}
            selectedActivityId={selectedActivity?.id}
          />
        </div>

        {isDesktop && (
            <div className="hidden lg:block lg:col-span-3 sticky top-24">
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
                <AnimatePresence>
                    {selectedActivity && (
                        <motion.div
                            key={selectedActivity.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col h-full"
                        >
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
                        </motion.div>
                    )}
                </AnimatePresence>
            </SheetContent>
        </Sheet>
       )}
    </div>
  );
}
