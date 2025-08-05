
"use client";

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useAuth } from '@/hooks/use-auth';
import { units as rawUnitsData, DEV_MODE_UNLOCK_ALL } from '@/data/learn-data';
import type { Activity, ActivityState } from '@/types/learn';

import { LeftSidebar } from '@/components/learn/left-sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription } from '@/components/ui/sheet';
import { Target } from 'lucide-react';
import { LearningPathway } from '@/components/learn/learning-pathway';
import { ActivityDetails } from '@/components/learn/activity-details';


export default function LearnPage() {
  const router = useRouter();
  const { user, userData, loading } = useAuth();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  

  const units = useMemo(() => {
    if (!userData && !DEV_MODE_UNLOCK_ALL) {
      return rawUnitsData.map(unit => ({
        ...unit,
        activities: unit.activities.map(act => ({ ...act, state: 'locked' as ActivityState }))
      }));
    }

    let isFirstActiveSet = false;
    const processedUnits = rawUnitsData.map((unit, unitIndex) => {
      let isPreviousUnitCompleted = unitIndex === 0;
      if (unitIndex > 0) {
        const previousUnit = rawUnitsData[unitIndex - 1];
        const completedLessonsForPrevUnit = previousUnit.activities
          .filter(act => userData?.completedLessons?.includes(act.id))
          .length;
        isPreviousUnitCompleted = completedLessonsForPrevUnit === previousUnit.activities.length;
      }

      const activities = unit.activities.map(activity => {
        const isCompleted = userData?.completedLessons?.includes(activity.id) ?? false;
        let state: ActivityState = 'locked';

        if (DEV_MODE_UNLOCK_ALL) {
          state = isCompleted ? 'completed' : 'active';
        } else {
          if (isCompleted) {
            state = 'completed';
          } else if (!isFirstActiveSet && isPreviousUnitCompleted) {
             const previousActivityIndex = unit.activities.findIndex(a => a.id === activity.id) - 1;
             if(previousActivityIndex < 0 || userData?.completedLessons?.includes(unit.activities[previousActivityIndex].id)) {
                state = 'active';
                isFirstActiveSet = true;
             }
          }
        }
        
        return { ...activity, state };
      });
      return { ...unit, activities };
    });

    return processedUnits;
  }, [userData]);

  const selectedUnit = useMemo(() => {
    if (!selectedActivity) return undefined;
    return units.find(unit => unit.activities.some(act => act.id === selectedActivity.id));
  }, [selectedActivity, units]);

  useEffect(() => {
    if (selectedActivity && !isDesktop) {
      setIsSheetOpen(true);
    } else {
      setIsSheetOpen(false);
    }
  }, [selectedActivity, isDesktop]);

  const handleSelectActivity = (activity: Activity) => {
    if (activity.state === 'locked') {
        setSelectedActivity(null);
        return;
    }
    
    // If the same activity is clicked, deselect it. Otherwise, select the new one.
    setSelectedActivity(prev => (prev?.id === activity.id ? null : activity));
  };

  const handleStartActivity = (activity: Activity) => {
    if (activity.state !== 'locked') {
      router.push(`/learn/${activity.id}`);
    }
  };

  const handleCloseDetails = () => {
    setSelectedActivity(null);
  };

  if (loading) {
    return (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[3fr_6fr_3fr] gap-x-8 px-4 md:px-8 py-8">
            <aside className="hidden lg:block">
                 <Skeleton className="h-[500px] w-full" />
            </aside>
            <main className="space-y-8">
                <Skeleton className="h-48 w-full max-w-lg mx-auto" />
                <Skeleton className="h-96 w-full" />
            </main>
            <aside className="hidden lg:block">
                 <Skeleton className="h-64 w-full" />
            </aside>
        </div>
    )
  }

  const rightSidebarContent = (
    <ActivityDetails 
      activity={selectedActivity}
      unit={selectedUnit}
      onStart={handleStartActivity}
      onClose={handleCloseDetails}
      isSheet={!isDesktop}
    />
  );

  return (
    <>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[3fr_6fr_3fr] gap-x-8 px-4 md:px-8 py-8">
        {/* --- Left Sidebar (Desktop) --- */}
        <aside className="hidden lg:block">
            <div className="sticky top-24">
                <LeftSidebar />
            </div>
        </aside>

        {/* Main Lessons Column */}
        <main className="relative">
            <div className="max-w-xl mx-auto">
                <LearningPathway 
                    units={units}
                    onSelectActivity={handleSelectActivity}
                    selectedActivityId={selectedActivity?.id}
                />
            </div>
        </main>
        
        {/* --- Right Sidebar (Desktop) --- */}
        <aside className="hidden lg:block">
             <div className="sticky top-24">
                {rightSidebarContent}
            </div>
        </aside>
      </div>
      
      {/* Mobile Quest Button */}
      {!isDesktop && (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="fixed bottom-6 right-6 z-40 rounded-full w-16 h-16 shadow-glow" size="icon">
                    <Target className="w-8 h-8"/>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 border-none w-full max-w-md bg-transparent">
                <SheetTitle className="sr-only">Daily Quests</SheetTitle>
                <LeftSidebar isSheet={true} />
            </SheetContent>
        </Sheet>
      )}

      {/* Mobile/Tablet Activity Details Sheet */}
      {!isDesktop && (
        <Sheet open={isSheetOpen} onOpenChange={(isOpen) => {
          setIsSheetOpen(isOpen);
          if (!isOpen) {
            setSelectedActivity(null);
          }
        }}>
          <SheetContent side="bottom" className="p-0 border-none bg-card/80 backdrop-blur-lg rounded-t-2xl h-[85vh]">
             <SheetHeader>
               <SheetTitle className="sr-only">Lesson Details</SheetTitle>
               <SheetDescription className="sr-only">Details about the selected lesson, practice, or quiz.</SheetDescription>
             </SheetHeader>
             <div className="h-full flex flex-col items-center justify-center p-6">
               {rightSidebarContent}
             </div>
           </SheetContent>
        </Sheet>
      )}
    </>
  );
}
