
"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useAuth } from '@/hooks/use-auth';
import { units as rawUnitsData, DEV_MODE_UNLOCK_ALL } from '@/data/learn-data';
import { isUnitCompleted } from '@/lib/lesson-utils';
import type { Activity, ActivityState, Unit } from '@/types/learn';

import { AnimatePresence } from 'framer-motion';
import { LearningPathway } from '@/components/learn/learning-pathway';
import { RightSidebar } from '@/components/learn/right-sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';


export default function LearnPage() {
  const router = useRouter();
  const { user, userData, loading } = useAuth();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

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

    // Set initial selected activity
    if (!selectedActivity) {
      const firstActive = processedUnits.flatMap(u => u.activities).find(a => a.state === 'active');
      if (firstActive) {
        setSelectedActivity(firstActive);
      }
    }

    return processedUnits;
  }, [userData, selectedActivity]);

  const selectedUnit = useMemo(() => {
    return units.find(unit => unit.activities.some(act => act.id === selectedActivity?.id));
  }, [units, selectedActivity]);

  const handleSelectActivity = (activity: Activity) => {
    if (activity.state !== 'locked') {
      setSelectedActivity(activity);
    }
  };

  const handleStartActivity = (activity: Activity) => {
    if (activity.state !== 'locked') {
      router.push(`/learn/${activity.id}`);
    }
  };

  if (loading) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-8 py-8">
            <main className="lg:col-span-9 space-y-8">
                <Skeleton className="h-48 w-full max-w-lg mx-auto" />
                <Skeleton className="h-96 w-full" />
            </main>
            <aside className="hidden lg:block lg:col-span-3">
                 <Skeleton className="h-64 w-full" />
            </aside>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 px-8 py-8">
      {/* Main Lessons Column */}
      <main className="lg:col-span-9">
        <LearningPathway 
            units={units}
            onSelectActivity={handleSelectActivity}
            selectedActivityId={selectedActivity?.id}
        />
      </main>

      {/* --- Right Sidebar (Desktop) --- */}
      <aside className="hidden lg:block lg:col-span-3">
        <div className="sticky top-24">
            <Card className="bg-card/50 backdrop-blur-lg border border-border/10">
                <CardContent className="p-6">
                    <AnimatePresence mode="wait">
                        <RightSidebar 
                            key={selectedActivity?.id ?? 'empty'}
                            activity={selectedActivity}
                            unit={selectedUnit}
                            onStart={handleStartActivity}
                        />
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
      </aside>
    </div>
  );
}
