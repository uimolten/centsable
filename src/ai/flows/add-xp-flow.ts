
'use server';
/**
 * @fileOverview A server-side flow for securely adding XP, handling level-ups, and awarding cents.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { doc, runTransaction, arrayUnion, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { LEVEL_THRESHOLDS } from '@/lib/level-config';
import type { UserData } from '@/types/user';

export const AddXpInputSchema = z.object({
  userId: z.string().describe('The UID of the user to grant XP to.'),
  amount: z.number().int().positive().describe('The amount of XP to add.'),
  lessonId: z.string().optional().describe('The optional ID of the lesson completed.'),
});
export type AddXpInput = z.infer<typeof AddXpInputSchema>;

export const AddXpOutputSchema = z.object({
  success: z.boolean(),
  leveledUp: z.boolean().describe('Indicates if the user leveled up.'),
  newLevel: z.number().optional().describe('The user\'s new level if they leveled up.'),
  rewardCents: z.number().optional().describe('The cents awarded for leveling up.'),
  message: z.string().optional(),
});
export type AddXpOutput = z.infer<typeof AddXpOutputSchema>;

export async function addXp(input: AddXpInput): Promise<AddXpOutput> {
  return addXpFlow(input);
}

const addXpFlow = ai.defineFlow(
  {
    name: 'addXpFlow',
    inputSchema: AddXpInputSchema,
    outputSchema: AddXpOutputSchema,
  },
  async ({ userId, amount, lessonId }) => {
    try {
      const userDocRef = doc(db, "users", userId);
      
      const result = await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userDocRef);
        if (!userDoc.exists()) {
          throw new Error('User not found.');
        }

        const userData = userDoc.data() as UserData;
        
        // Prevent re-awarding XP for the same lesson
        if (lessonId && userData.completedLessons?.includes(lessonId)) {
          return { success: true, leveledUp: false, message: 'XP for this lesson already awarded.' };
        }

        const currentXp = userData.xp ?? 0;
        const currentLevel = userData.level ?? 1;
        const newXp = currentXp + amount;
        
        let newLevel = currentLevel;
        let leveledUp = false;
        let totalCentsReward = 0;

        // Check for level up
        const nextLevelThreshold = LEVEL_THRESHOLDS.find(t => t.level === currentLevel + 1);
        
        if (nextLevelThreshold && newXp >= nextLevelThreshold.totalXPNeeded) {
            leveledUp = true;
            newLevel = currentLevel + 1;
            totalCentsReward = nextLevelThreshold.rewardCents;
            // In a more complex system, you could handle multiple level-ups in one go here
        }

        const updates: any = {
          xp: newXp,
        };

        if (lessonId) {
          updates.completedLessons = arrayUnion(lessonId);
          updates.lessonsCompleted = increment(1);
        }

        if (leveledUp) {
          updates.level = newLevel;
          updates.cents = increment(totalCentsReward);
        }

        transaction.update(userDocRef, updates);

        if (leveledUp) {
            return { success: true, leveledUp: true, newLevel, rewardCents: totalCentsReward };
        }
        
        return { success: true, leveledUp: false };
      });
      
      return result;

    } catch (error) {
      console.error("Error adding XP:", error);
      const message = error instanceof Error ? error.message : 'Failed to add XP in the database.';
      return { success: false, leveledUp: false, message };
    }
  }
);

    