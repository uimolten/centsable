
'use server';
/**
 * @fileOverview A server-side flow for awarding XP and Cents based on minigame performance, with a global daily rate limit.
 */

import { ai } from '@/ai/genkit';
import { doc, runTransaction, Timestamp, arrayUnion } from "firebase/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { addXp } from './add-xp-flow';
import { AwardGameRewardsInputSchema, AwardGameRewardsOutputSchema, AwardGameRewardsInput, AwardGameRewardsOutput } from '@/types/actions';
import type { UserData } from '@/types/user';
import { toZonedTime } from 'date-fns-tz';
import { startOfDay, isBefore, subDays } from 'date-fns';

const REWARD_THRESHOLDS: Record<string, number> = {
  'credit-swipe': 1250,
  'budget-busters': 1000,
  'savings-sorter': 2000,
};

const REWARD_LIMIT = 2;
const PACIFIC_TIMEZONE = 'America/Los_Angeles';
const XP_AWARD = 50;
const CENTS_AWARD = 10;

export async function awardGameRewards(input: AwardGameRewardsInput): Promise<AwardGameRewardsOutput> {
  return awardGameRewardsFlow(input);
}

const awardGameRewardsFlow = ai.defineFlow(
  {
    name: 'awardGameRewardsFlow',
    inputSchema: AwardGameRewardsInputSchema,
    outputSchema: AwardGameRewardsOutputSchema,
  },
  async ({ userId, gameId, score }) => {
    
    const scoreThreshold = REWARD_THRESHOLDS[gameId] ?? Infinity;
    if (score < scoreThreshold) {
        return { success: false, xpAwarded: 0, centsAwarded: 0, message: "Score did not meet threshold for reward." };
    }
    
    try {
        const userDocRef = doc(adminDb, "users", userId);

        const result = await runTransaction(adminDb, async (transaction) => {
            const userDoc = await transaction.get(userDocRef);
            if (!userDoc.exists()) {
              throw new Error("User not found.");
            }
            
            const userData = userDoc.data() as UserData;
            const rewardHistory = (userData.dailyRewardClaims ?? []).map(t => t.toDate());

            // --- Daily Reset Logic ---
            const nowInPacific = toZonedTime(new Date(), PACIFIC_TIMEZONE);
            
            // Determine the last reset time (5 AM PT today or yesterday)
            let lastResetTime = startOfDay(nowInPacific);
            lastResetTime.setHours(5);
            if (isBefore(nowInPacific, lastResetTime)) {
                // If it's before 5 AM today, the reset time was 5 AM yesterday.
                lastResetTime = subDays(lastResetTime, 1);
            }
            
            const recentRewards = rewardHistory.filter(ts => isBefore(lastResetTime, toZonedTime(ts, PACIFIC_TIMEZONE)));
            
            if (recentRewards.length >= REWARD_LIMIT) {
              return { success: false, xpAwarded: 0, centsAwarded: 0, message: 'Daily reward limit reached.' };
            }

            // If we are here, we can award points.
            // Note: We are not using the addXp flow here to keep reward logic self-contained
            // and avoid potential circular dependencies or complex transactions.
            transaction.update(userDocRef, {
                xp: (userData.xp ?? 0) + XP_AWARD,
                cents: (userData.cents ?? 0) + CENTS_AWARD,
                dailyRewardClaims: arrayUnion(Timestamp.now())
            });

            return { success: true, xpAwarded: XP_AWARD, centsAwarded: CENTS_AWARD, message: 'Reward claimed!' };
        });

        return result;

    } catch (error) {
        console.error("Error awarding game rewards:", error);
        const message = error instanceof Error ? error.message : 'Failed to award game rewards.';
        return { success: false, xpAwarded: 0, centsAwarded: 0, message };
    }
  }
);
