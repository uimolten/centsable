
'use server';
/**
 * @fileOverview A server-side flow for awarding XP and Cents based on minigame performance.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { addXp } from './add-xp-flow';
import { AwardGameRewardsInputSchema, AwardGameRewardsOutputSchema, AwardGameRewardsInput, AwardGameRewardsOutput } from '@/types/actions';


export async function awardGameRewards(input: AwardGameRewardsInput): Promise<AwardGameRewardsOutput> {
  return awardGameRewardsFlow(input);
}

const awardGameRewardsFlow = ai.defineFlow(
  {
    name: 'awardGameRewardsFlow',
    inputSchema: AwardGameRewardsInputSchema,
    outputSchema: AwardGameRewardsOutputSchema,
  },
  async ({ userId, score }) => {
    let xpAwarded = 5; // Base participation reward
    let centsAwarded = 0;

    if (score > 2000) {
      xpAwarded = 30;
      centsAwarded = 15;
    } else if (score > 1000) {
      xpAwarded = 15;
      centsAwarded = 5;
    }
    
    try {
        if (xpAwarded > 0) {
            await addXp({ userId, amount: xpAwarded, cents: centsAwarded });
        }
        return { success: true, xpAwarded, centsAwarded };
    } catch (error) {
        console.error("Error awarding game rewards:", error);
        return { success: false, xpAwarded: 0, centsAwarded: 0 };
    }
  }
);
