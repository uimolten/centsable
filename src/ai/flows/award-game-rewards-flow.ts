
'use server';
/**
 * @fileOverview A server-side flow for awarding XP and Cents based on minigame performance, with a global daily rate limit.
 */

import { ai } from '@/ai/genkit';
import { doc, runTransaction, Timestamp, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { addXp } from './add-xp-flow';
import { AwardGameRewardsInputSchema, AwardGameRewardsOutputSchema, AwardGameRewardsInput, AwardGameRewardsOutput } from '@/types/actions';
import type { UserData } from '@/types/user';
import { toZonedTime } from 'date-fns-tz';
import { startOfDay, isBefore } from 'date-fns';

const REWARD_LIMIT = 2;
const PACIFIC_TIMEZONE = 'America/Los_Angeles';
const SCORE_THRESHOLD = 1000;
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
    
    // Standardize reward logic for games that have a score threshold
    if (score <= SCORE_THRESHOLD) {
        return { success: true, xpAwarded: 0, centsAwarded: 0, message: "Score did not meet threshold for reward." };
    }
    
    try {
        const userDocRef = doc(db, "users", userId);

        const result = await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(userDocRef);
            if (!userDoc.exists()) {
              throw new Error("User not found.");
            }
            
            const userData = userDoc.data() as UserData;
            const rewardHistory = (userData.dailyRewardClaims ?? []).map(t => t.toDate());

            // --- Daily Reset Logic ---
            const nowInPacific = toZonedTime(new Date(), PACIFIC_TIMEZONE);
            let fiveAmTodayPacific = startOfDay(nowInPacific);
            fiveAmTodayPacific.setHours(5);

            // If it's before 5 AM, the reset time is 5 AM *yesterday*.
            if (isBefore(nowInPacific, fiveAmTodayPacific)) {
                fiveAmTodayPacific.setDate(fiveAmTodayPacific.getDate() - 1);
            }
            
            const recentRewards = rewardHistory.filter(ts => isBefore(fiveAmTodayPacific, toZonedTime(ts, PACIFIC_TIMEZONE)));
            
            if (recentRewards.length >= REWARD_LIMIT) {
              return { success: true, xpAwarded: 0, centsAwarded: 0, message: 'Daily reward limit reached.' };
            }

            // If we are here, we can award points.
            await addXp({ userId, amount: XP_AWARD, cents: CENTS_AWARD });

            // Update the user's global reward history
            transaction.update(userDocRef, {
                dailyRewardClaims: arrayUnion(Timestamp.now())
            });

            return { success: true, xpAwarded: XP_AWARD, centsAwarded: CENTS_AWARD };
        });

        return result;

    } catch (error) {
        console.error("Error awarding game rewards:", error);
        const message = error instanceof Error ? error.message : 'Failed to award game rewards.';
        return { success: false, xpAwarded: 0, centsAwarded: 0, message };
    }
  }
);
