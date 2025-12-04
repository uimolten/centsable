
'use server';
/**
 * @fileOverview A server-side flow for saving user learning progress.
 * @deprecated This flow is deprecated in favor of addXpFlow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from 'firebase-admin/firestore';
import { SaveProgressInputSchema, SaveProgressOutputSchema, type SaveProgressInput, type SaveProgressOutput } from '@/types/actions';

export async function saveProgress(input: SaveProgressInput): Promise<SaveProgressOutput> {
  return saveProgressFlow(input);
}

const saveProgressFlow = ai.defineFlow(
  {
    name: 'saveProgressFlow',
    inputSchema: SaveProgressInputSchema,
    outputSchema: SaveProgressOutputSchema,
    description: 'This flow is deprecated. Use addXpFlow instead.'
  },
  async ({ userId, lessonId, xpGained, centsGained }) => {
    try {
      const userDocRef = adminDb.collection("users").doc(userId);
      const userDoc = await userDocRef.get();

      if (!userDoc.exists) {
        return { success: false, message: 'User not found.' };
      }

      const userData = userDoc.data();
      
      // Prevent re-awarding for the same lesson
      if (userData?.completedLessons?.includes(lessonId)) {
        return { success: true, message: 'Progress already saved for this lesson.' };
      }
      
      await userDocRef.update({
        completedLessons: FieldValue.arrayUnion(lessonId),
        lessonsCompleted: FieldValue.increment(1),
        xp: FieldValue.increment(xpGained),
        cents: FieldValue.increment(centsGained),
        streak: FieldValue.increment(1)
      });
      
      return { success: true };
    } catch (error) {
      console.error("Error saving progress:", error);
      return { success: false, message: 'Failed to save progress in the database.' };
    }
  }
);
