
'use server';
/**
 * @fileOverview An administrative flow to reset all users' learning progress.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { db } from "@/lib/firebase";
import { collection, getDocs, writeBatch } from "firebase/firestore";

const ResetAllUsersProgressOutputSchema = z.object({
  success: z.boolean(),
  usersReset: z.number(),
  message: z.string().optional(),
});
type ResetAllUsersProgressOutput = z.infer<typeof ResetAllUsersProgressOutputSchema>;


export async function resetAllUsersProgress(): Promise<ResetAllUsersProgressOutput> {
  return resetAllUsersProgressFlow();
}

const resetAllUsersProgressFlow = ai.defineFlow(
  {
    name: 'resetAllUsersProgressFlow',
    outputSchema: ResetAllUsersProgressOutputSchema,
    description: "WARNING: This flow will reset the learning progress (XP, level, completed lessons) for ALL users in the database.",
  },
  async () => {
    try {
      const usersRef = collection(db, "users");
      const userDocsSnapshot = await getDocs(usersRef);

      if (userDocsSnapshot.empty) {
        return { success: true, usersReset: 0, message: 'No users found to reset.' };
      }

      const batch = writeBatch(db);
      
      userDocsSnapshot.forEach(userDoc => {
        batch.update(userDoc.ref, {
          completedLessons: [],
          lessonsCompleted: 0,
          xp: 0,
          level: 1,
        });
      });

      await batch.commit();

      return { success: true, usersReset: userDocsSnapshot.size };
    } catch (error) {
      console.error("Error resetting user progress:", error);
      const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
      return { success: false, usersReset: 0, message };
    }
  }
);
