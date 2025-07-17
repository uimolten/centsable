
"use client";

import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { QuestIcon } from '@/components/learn/quest-icon';
import { LeftSidebar } from '@/components/learn/left-sidebar';
import { LearningPathway } from '@/components/learn/learning-pathway';
import { RightSidebar } from '@/components/learn/right-sidebar';
import { units as initialUnitsData, Unit, Activity, DEV_MODE_UNLOCK_ALL } from '@/data/learn-data';
import { isUnitCompleted } from '@/lib/lesson-utils';


export default function LearnPage() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isQuestSheetOpen, setIsQuestSheetOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userData, loading: authLoading, refreshUserData } = useAuth();

  const units = useMemo(() => {
    if (authLoading || !userData) {
      return initialUnitsData.map(unit => ({
        ...unit,
        activities: unit.activities.map(act => ({...act, state: 'locked'}))
      }));
    }

    if (DEV_MODE_UNLOCK_ALL) {
      return initialUnitsData.map(unit => ({
        ...unit,
        activities: unit.activities.map(act => ({...act, state: 'completed'}))
      }));
    }
    
    const completedLessons = userData.completedLessons || [];
    
    const newUnits = initialUnitsData.map(unit => ({
      ...unit,
      activities: unit.activities.map(act => ({
        ...act,
        state: completedLessons.includes(act.id) ? 'completed' : 'locked'
      }))
    }));
    
    let firstLockedFound = false;
    for (const unit of newUnits) {
      for (const act of unit.activities) {
        if (act.state === 'locked' && !firstLockedFound) {
          act.state = 'active';
          firstLockedFound = true;
          break;
        }
      }
      if(firstLockedFound) break;
    }
    
    // If no lessons completed, the first activity should be active
    if (completedLessons.length === 0 && newUnits.length > 0 && newUnits[0].activities.length > 0) {
        newUnits[0].activities[0].state = 'active';
    }


    return newUnits;
  }, [userData, authLoading]);

  useEffect(() => {
    const completedActivityId = searchParams.get('completed');
    if (completedActivityId) {
      refreshUserData?.();
      router.replace('/learn', { scroll: false });
    }
  }, [searchParams, refreshUserData, router]);
  
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
        
        <aside className="hidden lg:block lg:col-span-3 sticky top-24">
          <LeftSidebar />
        </aside>

        <main className="col-span-1 lg:col-span-6">
          <LearningPathway 
            units={units}
            onSelectActivity={handleSelectActivity}
            selectedActivityId={selectedActivity?.id}
          />
        </main>

        {isDesktop ? (
            <aside className="hidden lg:block lg:col-span-3 sticky top-24">
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
            </aside>
        ) : (
            <>
                {/* Mobile Quest Button */}
                <Sheet open={isQuestSheetOpen} onOpenChange={setIsQuestSheetOpen}>
                    <SheetTrigger asChild>
                        <Button className="lg:hidden fixed bottom-6 left-6 z-40 h-14 w-14 rounded-full shadow-lg flex items-center justify-center">
                            <QuestIcon questId="quiz_whiz" className="w-8 h-8"/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-sm p-0 flex flex-col bg-card/80 backdrop-blur-lg border-border/20">
                         <SheetHeader>
                           <SheetTitle className="sr-only">Daily Quests</SheetTitle>
                           <SheetDescription className="sr-only">View your daily quests and progress.</SheetDescription>
                         </SheetHeader>
                         <LeftSidebar />
                    </SheetContent>
                </Sheet>

                {/* Mobile Activity Details Sheet */}
                <Sheet open={!!selectedActivity} onOpenChange={(open) => !open && setSelectedActivity(null)}>
                    <SheetContent side="bottom" className="w-full max-w-full h-[60%] p-0 flex flex-col bg-card/80 backdrop-blur-lg border-border/20 rounded-t-2xl">
                      {selectedActivity && (
                        <AnimatePresence>
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
                                   <div className="p-6 flex justify-center">
                                        <RightSidebar
                                          activity={selectedActivity}
                                          unit={findUnitForActivity(selectedActivity)}
                                          onStart={handleStartActivity}
                                        />
                                   </div>
                                </ScrollArea>
                            </motion.div>
                        </AnimatePresence>
                      )}
                    </SheetContent>
                </Sheet>
            </>
        )}
      </div>
    </div>
  );
}
