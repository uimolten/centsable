
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

const REWARD_LIMIT = 2;
const REWARD_TIMEFRAME_HOURS = 3;

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

    if (score > 2000) {
      xpAwarded = 30;
      centsAwarded = 15;
    } else if (score > 1000) {
      xpAwarded = 15;
      centsAwarded = 5;
    } else {
       xpAwarded = 5; // Participation reward
    }
    
    if (xpAwarded === 0) {
        return { success: true, xpAwarded: 0, centsAwarded: 0 };
    }
    
    try {
        const userDocRef = doc(db, "users", userId);

        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(userDocRef);
            if (!userDoc.exists()) {
              throw new Error("User not found.");
            }
            
            const userData = userDoc.data() as UserData;
            const gameData = userData.gameSummaries?.[gameId] ?? {};
            const rewardHistory = (gameData.rewardHistory ?? []).map(t => t.toDate());

            // Filter out timestamps older than the timeframe
            const threeHoursAgo = new Date();
            threeHoursAgo.setHours(threeHoursAgo.getHours() - REWARD_TIMEFRAME_HOURS);
            
            const recentRewards = rewardHistory.filter(ts => ts > threeHoursAgo);

            if (recentRewards.length >= REWARD_LIMIT) {
              xpAwarded = 0;
              centsAwarded = 0;
              // Don't award anything, but don't throw an error.
              // We just silently skip the reward.
              return;
            }

            // If we are here, we can award points.
            await addXp({ userId, amount: xpAwarded, cents: centsAwarded });

            // Update the user's reward history for this game
            transaction.set(userDocRef, {
                gameSummaries: {
                    ...userData.gameSummaries,
                    [gameId]: {
                        ...gameData,
                        rewardHistory: arrayUnion(Timestamp.now())
                    }
                }
            }, { merge: true });
        });

        return { success: true, xpAwarded, centsAwarded };
    } catch (error) {
        console.error("Error awarding game rewards:", error);
        return { success: false, xpAwarded: 0, centsAwarded: 0 };
    }
  }
);
