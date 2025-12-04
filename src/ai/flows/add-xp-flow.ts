
'use server';
/**
 * @fileOverview A server-side flow for securely adding XP, handling level-ups, and awarding cents.
 */

import { ai } from '@/ai/genkit';
import { runTransaction, arrayUnion, increment } from "firebase/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { LEVEL_THRESHOLDS } from '@/lib/level-config';
import type { UserData } from '@/types/user';
import { AddXpInputSchema, AddXpOutputSchema, type AddXpInput, type AddXpOutput } from '@/types/actions';

export async function addXp(input: AddXpInput): Promise<AddXpOutput> {
  return addXpFlow(input);
}

const addXpFlow = ai.defineFlow(
  {
    name: 'addXpFlow',
    inputSchema: AddXpInputSchema,
    outputSchema: AddXpOutputSchema,
  },
  async ({ userId, amount, cents, lessonId }) => {
    try {
      const userDocRef = adminDb.collection("users").doc(userId);
      
      const result = await adminDb.runTransaction(async (transaction) => {
        const userDoc = await transaction.get(userDocRef);
        if (!userDoc.exists) {
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
        let totalCentsReward = cents ?? 0;
        let levelUpRewardCents = 0;

        // Check for level up
        const nextLevelThreshold = LEVEL_THRESHOLDS.find(t => t.level === currentLevel + 1);
        
        if (nextLevelThreshold && newXp >= nextLevelThreshold.totalXPNeeded) {
            leveledUp = true;
            newLevel = currentLevel + 1;
            levelUpRewardCents = nextLevelThreshold.rewardCents;
            totalCentsReward += levelUpRewardCents;
            // In a more complex system, you could handle multiple level-ups in one go here
        }

        const updates: any = {
          xp: increment(amount),
        };

        if (totalCentsReward > 0) {
            updates.cents = increment(totalCentsReward);
        }

        if (lessonId) {
          updates.completedLessons = arrayUnion(lessonId);
          updates.lessonsCompleted = increment(1);
        }

        if (leveledUp) {
          updates.level = newLevel;
        }

        transaction.update(userDocRef, updates);

        if (leveledUp) {
            return { success: true, leveledUp: true, newLevel, rewardCents: levelUpRewardCents };
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
