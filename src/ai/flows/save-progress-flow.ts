
'use server';
/**
 * @fileOverview A server-side flow for saving user learning progress.
 * @deprecated This flow is deprecated in favor of addXpFlow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { doc, updateDoc, getDoc, arrayUnion, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
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
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        return { success: false, message: 'User not found.' };
      }

      const userData = userDoc.data();
      
      // Prevent re-awarding for the same lesson
      if (userData.completedLessons?.includes(lessonId)) {
        return { success: true, message: 'Progress already saved for this lesson.' };
      }
      
      await updateDoc(userDocRef, {
        completedLessons: arrayUnion(lessonId),
        lessonsCompleted: increment(1),
        xp: increment(xpGained),
        cents: increment(centsGained),
        streak: increment(1)
      });
      
      return { success: true };
    } catch (error) {
      console.error("Error saving progress:", error);
      return { success: false, message: 'Failed to save progress in the database.' };
    }
  }
);

    