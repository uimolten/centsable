
'use server';
/**
 * @fileOverview A server-side flow for awarding XP and Cents based on minigame performance, with rate limiting.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { doc, runTransaction, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { addXp } from './add-xp-flow';
import { AwardGameRewardsInputSchema, AwardGameRewardsOutputSchema, AwardGameRewardsInput, AwardGameRewardsOutput } from '@/types/actions';
import type { UserData } from '@/types/user';
import { toZonedTime } from 'date-fns-tz';
import { startOfDay, isBefore } from 'date-fns';


const REWARD_LIMIT = 2;
const PACIFIC_TIMEZONE = 'America/Los_Angeles';

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
    let xpAwarded = 0;
    let centsAwarded = 0;

    if (gameId === 'credit-swipe') {
        if (score > 1000) {
            xpAwarded = 20;
            centsAwarded = 5;
        }
    } else if (gameId === 'budget-busters') {
        if (score > 1000) {
          xpAwarded = 50;
          centsAwarded = 10;
        }
    }
    // No rewards for savings-sorter as it doesn't have a meaningful score threshold yet
    
    if (xpAwarded === 0) {
        return { success: true, xpAwarded: 0, centsAwarded: 0, message: "No reward for this score." };
    }
    
    try {
        const userDocRef = doc(db, "users", userId);

        const result = await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(userDocRef);
            if (!userDoc.exists()) {
              throw new Error("User not found.");
            }
            
            const userData = userDoc.data() as UserData;
            const gameData = userData.gameSummaries?.[gameId] ?? {};
            const rewardHistory = (gameData.rewardHistory ?? []).map(t => t.toDate());

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
              return { success: true, xpAwarded: 0, centsAwarded: 0, message: 'Reward limit reached for today.' };
            }

            // If we are here, we can award points.
            await addXp({ userId, amount: xpAwarded, cents: centsAwarded });

            // Update the user's reward history for this game
            const newRewardHistory = [...(gameData.rewardHistory ?? []), Timestamp.now()];
            
            transaction.set(userDocRef, {
                gameSummaries: {
                    ...userData.gameSummaries,
                    [gameId]: {
                        ...gameData,
                        rewardHistory: newRewardHistory
                    }
                }
            }, { merge: true });

            return { success: true, xpAwarded, centsAwarded };
        });

        return result;

    } catch (error) {
        console.error("Error awarding game rewards:", error);
        const message = error instanceof Error ? error.message : 'Failed to award game rewards.';
        return { success: false, xpAwarded: 0, centsAwarded: 0, message };
    }
  }
);
