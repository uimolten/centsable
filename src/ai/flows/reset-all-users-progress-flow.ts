
'use server';
/**
 * @fileOverview An administrative flow to reset all users' learning progress.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { db } from "@/lib/firebase";
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import type { UserData } from '@/types/user';

const ResetAllUsersProgressInputSchema = z.object({
  adminUserId: z.string().describe("The UID of the user attempting to run this flow, for verification."),
});
type ResetAllUsersProgressInput = z.infer<typeof ResetAllUsersProgressInputSchema>;

const ResetAllUsersProgressOutputSchema = z.object({
  success: z.boolean(),
  usersReset: z.number(),
  message: z.string().optional(),
});
type ResetAllUsersProgressOutput = z.infer<typeof ResetAllUsersProgressOutputSchema>;

/**
 * Verifies if the provided user ID belongs to an admin.
 * Throws an error if the user is not authenticated or not an admin.
 */
async function verifyAdmin(userId: string) {
    if (!userId) {
        throw new Error('Authentication required.');
    }
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists()) {
        throw new Error('User not found.');
    }
    
    const userData = userDoc.data() as UserData;
    if (userData.role !== 'admin') {
        throw new Error('Missing or insufficient permissions.');
    }
}

export async function resetAllUsersProgress(input: ResetAllUsersProgressInput): Promise<ResetAllUsersProgressOutput> {
  return resetAllUsersProgressFlow(input);
}

const resetAllUsersProgressFlow = ai.defineFlow(
  {
    name: 'resetAllUsersProgressFlow',
    inputSchema: ResetAllUsersProgressInputSchema,
    outputSchema: ResetAllUsersProgressOutputSchema,
    description: "WARNING: This flow will reset the learning progress (XP, level, completed lessons) for ALL users in the database.",
  },
  async ({ adminUserId }) => {
    try {
      // 1. Securely verify the user is an admin before doing anything else.
      await verifyAdmin(adminUserId);

      // 2. If verification passes, proceed with the operation.
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
          // We keep cents, quests, and other non-learning data intact
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
