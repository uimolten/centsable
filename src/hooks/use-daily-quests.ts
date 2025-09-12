
"use client";

import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { generateDailyQuests } from '@/ai/flows/generate-daily-quests-flow';
import { isSameDay, isBefore } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import type { Quest } from '@/types/quests';

export function useDailyQuests() {
  const { user, userData, refreshUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  const quests = useMemo(() => userData?.dailyQuests ?? [], [userData?.dailyQuests]);

  useEffect(() => {
    const generateQuestsIfNeeded = async () => {
      if (!user || !userData) {
        // If there's no user or user data, we are not loading quests.
        if (!user) setIsLoading(false);
        return;
      }
      
      const pacificTimeZone = 'America/Los_Angeles';
      const nowInPacific = toZonedTime(new Date(), pacificTimeZone);
      
      const lastGeneratedDate = userData.lastQuestGenerated 
        ? toZonedTime(userData.lastQuestGenerated.toDate(), pacificTimeZone)
        : null;

      let needsNewQuests = false;
      if (!lastGeneratedDate) {
        needsNewQuests = true; // First time ever.
      } else {
        // The reset time is 5 AM PT of the CURRENT day.
        const fiveAmTodayPacific = new Date(nowInPacific);
        fiveAmTodayPacific.setHours(5, 0, 0, 0);

        // If it's currently BEFORE 5 AM PT, the last reset window we care about was 5 AM YESTERDAY.
        // But since we only generate quests *after* 5 AM, we just need to check if the last generation
        // was on a different calendar day and happened before today's 5 AM threshold.
        const lastGeneratedIsSameDay = isSameDay(nowInPacific, lastGeneratedDate);
        const nowIsAfter5AM = isBefore(fiveAmTodayPacific, nowInPacific);

        if (!lastGeneratedIsSameDay && nowIsAfter5AM) {
           needsNewQuests = true;
        }
      }

      if (needsNewQuests) {
        setIsLoading(true);
        try {
          await generateDailyQuests({ userId: user.uid });
          await refreshUserData?.(); // This will trigger a re-fetch of userData in the AuthProvider
        } catch (error) {
          console.error("Failed to generate new quests:", error);
        } finally {
          // The AuthProvider's loading state will handle the final isLoading=false
        }
      } else {
        setIsLoading(false);
      }
    };

    generateQuestsIfNeeded();
    
    // This effect should only run when the core user data object changes,
    // not on every minor state update.
  }, [user, userData?.lastQuestGenerated, refreshUserData]);

  return { quests, isLoading };
}
