
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { generateDailyQuests } from '@/ai/flows/generate-daily-quests-flow';
import { isBefore } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import type { Quest } from '@/types/quests';

// This hook manages the state and logic for fetching and refreshing daily quests.
export function useDailyQuests() {
  const { user, userData, refreshUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const processQuests = async () => {
      // Don't do anything if we don't have a logged-in user or their data has not loaded yet.
      // The `userData` object itself is the single source of truth.
      if (!user || !userData) {
        if (!user) {
          setQuests([]);
          setIsLoading(false);
        }
        return;
      }

      // Check if new quests need to be generated.
      const pacificTimeZone = 'America/Los_Angeles';
      const nowInPacific = toZonedTime(new Date(), pacificTimeZone);
      const lastGeneratedDate = userData.lastQuestGenerated 
        ? toZonedTime(userData.lastQuestGenerated.toDate(), pacificTimeZone)
        : null;

      let needsNewQuests = false;
      if (!lastGeneratedDate) {
        needsNewQuests = true; // First time ever.
      } else {
        const fiveAmTodayPacific = new Date(nowInPacific);
        fiveAmTodayPacific.setHours(5, 0, 0, 0);
        
        // If it's after 5 AM today AND the last generation was before 5 AM today, we need new quests.
        if (isBefore(nowInPacific, fiveAmTodayPacific) && isBefore(lastGeneratedDate, fiveAmTodayPacific)) {
            // It's before 5 AM, so we don't generate new ones yet.
            needsNewQuests = false;
        } else if (isBefore(fiveAmTodayPacific, nowInPacific) && isBefore(lastGeneratedDate, fiveAmTodayPacific)) {
            // It's after 5 AM, and the last generation was before the reset time.
            needsNewQuests = true;
        }
      }

      if (needsNewQuests) {
        setIsLoading(true);
        try {
          // Call the secure backend flow to generate quests.
          await generateDailyQuests({ userId: user.uid });
          // The AuthProvider's real-time listener will automatically update the quests.
          // We don't need to manually set state here.
        } catch (error) {
          console.error("Failed to generate new quests:", error);
          setIsLoading(false); // Stop loading on error
        }
      } else {
        // If no new quests are needed, use the ones from the main user data context.
        setQuests(userData.dailyQuests ?? []);
        setIsLoading(false);
      }
    };

    processQuests();
    
    // This effect depends on the userData object. When the real-time listeners
    // in AuthProvider update userData (e.g., after quest generation), this will re-run.
  }, [user, userData]);
  
  // The hook returns the quest list and a loading state for the UI to use.
  return { quests, isLoading };
}
